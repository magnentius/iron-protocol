// Iron Protocol — rules engine.
//
// Pure functions only: no DOM, no I/O, no module-level mutable state. Every
// random draw takes an injectable `rng`, so the whole engine is deterministic
// under test. Section references point at rules.md, which is the source of truth.
//
// Three things worth understanding before reading further:
//
//   1. Armor DR is a THRESHOLD, not a pool. Damage must be strictly greater than
//      DR to do anything at all; if it is, the location permanently loses 1 DR and
//      the attacker rolls on the Critical Hit Table. There is no Internal Structure.
//   2. Criticals CASCADE UPWARD. Each location tracks which slots are marked; a
//      roll landing on a marked slot climbs to the next unmarked one. The tables
//      are different lengths (head 5, torso 8, arms and legs 6).
//   3. Defence is rerolls and negation, never subtraction. Flank Speed and Cover
//      let the defender reroll the attacker's damage dice; countermeasures negate
//      the whole attack on a Countermeasure Check.

import {
  LOCATIONS,
  LOCATION_NAMES,
  CRIT_TABLE_FOR,
  CRIT_TABLE_MAX,
  ADJACENT_LOCATIONS,
  lookupHitLocation,
  lookupCrit,
  cascadeSlot,
  TERRAIN,
  WEIGHT_CLASSES,
  JUMP_CAPABLE_CLASSES,
  HEAVY_WOODS_BLOCKED_CLASSES,
  MOVE_COSTS,
  FLANK_SPEED_THRESHOLD,
  JUMP_FLANK_SPEED_HEXES,
  overkillDice,
  WEAPONS,
  AMMO_TYPES,
  AMMO_DIE,
  COUNTERMEASURE_CHECK_TN,
  IR_LOCK_THRESHOLD,
  MAX_FULL_AUTO_BURSTS,
  PILOT_CHECK_TN,
  PILOT_CHECK_MODIFIERS,
} from './data/tables.js';

export { lookupHitLocation, lookupCrit, cascadeSlot };

// --- dice ------------------------------------------------------------------

export function rollDie(sides = 6, rng = Math.random) {
  return Math.floor(rng() * sides) + 1;
}

export function rollDice(count, sides = 6, rng = Math.random) {
  return Array.from({ length: count }, () => rollDie(sides, rng));
}

export function roll2d6(rng = Math.random) {
  const a = rollDie(6, rng);
  const b = rollDie(6, rng);
  return { dice: [a, b], total: a + b };
}

export const sum = (nums) => nums.reduce((a, b) => a + b, 0);

// --- derived stats ---------------------------------------------------------

export function effectiveReactor(frame) {
  return Math.max(0, frame.reactor + (frame.reactorMod || 0));
}

export function effectiveCapacitorMax(frame) {
  return Math.max(0, frame.capacitorMax + (frame.capacitorMaxMod || 0));
}

export function effectiveInitiative(frame) {
  const pilot = frame.dishonored ? 0 : (frame.pilotBonus || 0);
  return frame.initiative + (frame.initiativeMod || 0) + pilot;
}

export function effectiveMovementLimit(frame) {
  const stutter = frame.servoStutter ? 2 : 0;
  return Math.max(0, frame.movementLimit + (frame.movementLimitMod || 0) - stutter);
}

export function massValue(frame) {
  return WEIGHT_CLASSES[frame.weightClass].massValue;
}

/** A Frame becomes IR-lockable once it has spent this much EP in a turn (4.1). */
export function isIRLockable(frame) {
  return (frame.epSpentThisTurn || 0) >= IR_LOCK_THRESHOLD;
}

export function isDestroyed(frame) {
  if (frame.destroyed) return true;
  if (frame.locations.torso.destroyed || frame.locations.head.destroyed) return true;
  // Both legs gone = completely disabled (rules.md 6.5.4).
  return frame.locations.leftLeg.destroyed && frame.locations.rightLeg.destroyed;
}

/** A leg that is severed, or whose actuator is destroyed (rules.md 6.4). */
export function hasCrippledLeg(frame) {
  return ['leftLeg', 'rightLeg'].some(
    (l) => frame.locations[l].destroyed || frame.locations[l].actuatorDestroyed,
  );
}

export function canJump(frame) {
  return Boolean(frame.systems?.jumpJets)
    && JUMP_CAPABLE_CLASSES.includes(frame.weightClass)
    && !frame.jumpJetsEmpty
    && !hasCrippledLeg(frame);
}

// --- Energy Phase (rules.md 2.1) -------------------------------------------

export function energyPhase(frame, { terrain = frame.terrain } = {}) {
  const report = { generated: 0, cooling: 0, upkeep: 0, glitch: 0, net: 0, steps: [] };
  const base = effectiveReactor(frame);
  report.generated = base;
  report.steps.push(`Reactor generates ${base} EP`);

  const cooling = TERRAIN[terrain]?.cooling || 0;
  if (cooling) {
    report.cooling = cooling;
    report.steps.push(`${TERRAIN[terrain].name}: +${cooling} EP cooling`);
  }

  if (frame.systemGlitch) {
    report.glitch = 1;
    report.steps.push('System Glitch: −1 EP this turn');
    frame.systemGlitch = false;
  }

  // Sustained suites bill every Energy Phase, whether they are tested or not.
  let upkeep = 0;
  if (frame.adaptiveSkinActive) upkeep += 2 + ((frame.adaptiveSkinBands || 1) > 1 ? 2 : 0);
  if (frame.ecmActive) upkeep += 2 + (frame.ecmRadius || 0);
  if (frame.calibrationDrift) upkeep += 1; // Head crit 2
  report.upkeep = upkeep;
  if (upkeep) report.steps.push(`System upkeep: −${upkeep} EP`);

  report.net = Math.max(0, base + cooling - report.glitch - upkeep);

  // Banked charge joins the pool, and the capacitor size at the moment it empties
  // is the turn's Overcharge Allowance (rules.md 5.3).
  report.fromCapacitor = frame.capacitor || 0;
  frame.overchargeAvailable = frame.capacitor || 0;
  frame.ep = report.net + (frame.capacitor || 0);
  frame.capacitor = 0;

  // Adaptive Skin upkeep is exempt from the IR threshold; everything else counts.
  frame.epSpentThisTurn = Math.max(0, upkeep - (frame.adaptiveSkinActive ? 2 : 0));
  frame.hexesMoved = 0;
  frame.flankSpeed = false;
  frame.torsoTwistedThisTurn = false;
  report.steps.push(`Pool ${frame.ep} EP · Overcharge Allowance ${frame.overchargeAvailable} EP`);
  return report;
}

// --- Movement (rules.md 2.2) -----------------------------------------------

export function movementCost(frame, action, { elevationDelta = 0, hexes = 1, terrain = frame.terrain } = {}) {
  const t = TERRAIN[terrain] || TERRAIN.clear;
  switch (action) {
    case 'walk':
    case 'reverse': {
      const base = action === 'walk' ? MOVE_COSTS.walk : MOVE_COSTS.reverse;
      const climb = elevationDelta > 0 ? MOVE_COSTS.climbUp * elevationDelta : 0;
      return base + t.extraEP + climb + (frame.kneeLock ? 1 : 0);
    }
    // A jump pays 2 EP per hex and nothing else: no terrain, no climbing.
    case 'jump':
      return MOVE_COSTS.jumpPerHex * hexes;
    case 'pivot':
      if (frame.prone) return hasCrippledLeg(frame) ? MOVE_COSTS.severedLegPivot : MOVE_COSTS.pronePivot;
      return MOVE_COSTS.pivot;
    case 'standUp':
      return MOVE_COSTS.standUp;
    case 'torsoTwist':
      return frame.servoLock ? 2 : 0;
    default:
      throw new Error(`Unknown movement action: ${action}`);
  }
}

export function movementBlockedReason(frame, action, { terrain = frame.terrain, hexes = 1 } = {}) {
  if (isDestroyed(frame)) return 'Frame destroyed';
  const severedLeg = ['leftLeg', 'rightLeg'].some((l) => frame.locations[l].destroyed);
  const moving = ['walk', 'reverse', 'jump'].includes(action);

  if (severedLeg && moving) return 'Crippled — can never walk, reverse or jump again';
  if (frame.prone && moving) return 'Prone — must Stand Up first';
  // Standing up while already upright would silently burn the 3 EP.
  if (action === 'standUp' && !frame.prone) return 'Already standing';
  if (action === 'torsoTwist') return torsoTwistBlockedReason(frame);
  if (action === 'jump') {
    // Report the restriction that cannot be fixed before the one that can:
    // an Assault chassis is not missing jets, it may never mount them at all.
    if (!JUMP_CAPABLE_CLASSES.includes(frame.weightClass)) return 'Heavy and Assault chassis can never jump';
    if (!frame.systems?.jumpJets) return 'No Jump Jets mounted';
    if (frame.jumpJetsEmpty) return 'Jump Jet propellant is dry';
    if (hasCrippledLeg(frame)) return 'A Frame launches and lands on its legs';
  }
  if (['walk', 'reverse'].includes(action) && terrain === 'woodsHeavy'
      && HEAVY_WOODS_BLOCKED_CLASSES.includes(frame.weightClass)) {
    return 'Heavy Woods are impassable on foot to this chassis';
  }
  if (moving && (frame.hexesMoved || 0) + hexes > effectiveMovementLimit(frame)) {
    return `Movement Limit ${effectiveMovementLimit(frame)} reached`;
  }
  return null;
}

/**
 * Torso Facing (rules.md 1.2) is tracked relative to Leg Facing, which is how a
 * player thinks about it at the table: the torso is twisted left, centred, or
 * twisted right. It decides every firing arc (1.3) and the attacker's Hit Zone
 * against this frame (1.4).
 */
export const TORSO_FACINGS = ['left', 'center', 'right'];

export function torsoTwistBlockedReason(frame) {
  if (isDestroyed(frame)) return 'Frame destroyed';
  if (frame.prone) return 'A Prone Frame cannot twist its torso';
  if (frame.torsoTwistedThisTurn) return 'Already twisted this activation';
  return null;
}

/**
 * Twist the torso to a facing. Free, unless a Servo Lock critical has been taken,
 * and only once per activation — it happens after all movement is complete.
 */
export function twistTorso(frame, facing, { rng = Math.random } = {}) {
  if (!TORSO_FACINGS.includes(facing)) throw new Error(`Unknown torso facing: ${facing}`);
  const blocked = torsoTwistBlockedReason(frame);
  if (blocked) return { ok: false, reason: blocked };
  if (facing === (frame.torsoFacing || 'center')) {
    return { ok: false, reason: 'The torso is already facing that way' };
  }
  const cost = movementCost(frame, 'torsoTwist');
  if ((frame.ep || 0) < cost) return { ok: false, reason: `Needs ${cost} EP, has ${frame.ep || 0}` };
  if (cost) spendEP(frame, cost);
  const from = frame.torsoFacing || 'center';
  frame.torsoFacing = facing;
  frame.torsoTwistedThisTurn = true;
  return { ok: true, cost, from, to: facing };
}

/** Which hexsides a weapon can reach, given where the torso is pointing. */
export function weaponArc(frame, weapon) {
  const facing = frame.torsoFacing || 'center';
  const arm = weapon.loc === 'leftArm' ? 'left' : weapon.loc === 'rightArm' ? 'right' : null;
  const forward = { left: 'Front-Left, Front, Front-Right (twisted left)',
                    center: 'Front-Left, Front, Front-Right',
                    right: 'Front-Left, Front, Front-Right (twisted right)' }[facing];
  if (!arm) return { arcs: forward, note: 'Torso mounts are a fixed forward battery — 3 hexsides.' };
  return {
    arcs: `${forward}, plus the ${arm === 'left' ? 'Left-Rear' : 'Right-Rear'} hexside`,
    note: 'Arm mounts traverse: 4 of the 6 hexsides. Only arms can engage a target on the flank.',
  };
}

export function performMovement(frame, action, opts = {}) {
  // A torso twist is a facing change, not movement. Delegate so this entry point
  // cannot spend the EP without actually turning the torso.
  if (action === 'torsoTwist') {
    if (!opts.facing) return { ok: false, reason: 'A torso twist needs a facing — use twistTorso()' };
    return twistTorso(frame, opts.facing, opts);
  }
  const blocked = movementBlockedReason(frame, action, opts);
  if (blocked) return { ok: false, reason: blocked };
  const cost = movementCost(frame, action, opts);
  if ((frame.ep || 0) < cost) return { ok: false, reason: `Needs ${cost} EP, has ${frame.ep || 0}` };

  spendEP(frame, cost);

  if (action === 'standUp') {
    // A crippled leg must pass a Pilot Check to rise. The EP is spent either way.
    if (hasCrippledLeg(frame)) {
      const check = pilotCheck(frame, { rng: opts.rng, forcedRoll: opts.forcedRoll });
      if (check.passed) frame.prone = false;
      return { ok: true, cost, stoodUp: check.passed, check };
    }
    frame.prone = false;
    return { ok: true, cost, stoodUp: true };
  }

  const hexes = action === 'jump' ? (opts.hexes || 1) : 1;
  if (['walk', 'reverse', 'jump'].includes(action)) {
    frame.hexesMoved = (frame.hexesMoved || 0) + hexes;
  }
  if (opts.terrain) frame.terrain = opts.terrain;

  updateFlankSpeed(frame, { jumpedHexes: action === 'jump' ? hexes : 0 });

  // A jump costs propellant as well as EP: roll the Ammo Die afterwards, and on
  // a 1 or 2 the tanks are dry for the rest of the battle (rules.md 2.2).
  let propellant = null;
  if (action === 'jump') {
    propellant = rollAmmoDie(AMMO_DIE.jumpJets.empty, { rng: opts.rng, forcedRoll: opts.forcedAmmoRoll });
    if (propellant.empty) frame.jumpJetsEmpty = true;
  }

  return { ok: true, cost, hexes, flankSpeed: frame.flankSpeed, propellant };
}

/**
 * Flank Speed (rules.md 2.2): exit 4+ hexes in an activation, or complete a jump
 * of 2+ hexes. Water denies it outright, as does being Prone. The threshold is
 * fixed, which is why an Assault chassis capped at 3 can never reach it.
 */
export function updateFlankSpeed(frame, { jumpedHexes = 0 } = {}) {
  const t = TERRAIN[frame.terrain] || TERRAIN.clear;
  if (frame.prone || t.blocksFlankSpeed) {
    frame.flankSpeed = false;
    return false;
  }
  const byDistance = (frame.hexesMoved || 0) >= FLANK_SPEED_THRESHOLD;
  const byJump = jumpedHexes >= JUMP_FLANK_SPEED_HEXES;
  frame.flankSpeed = Boolean(byDistance || byJump);
  return frame.flankSpeed;
}

export function spendEP(frame, amount, { overcharge = 0 } = {}) {
  if (overcharge > (frame.overchargeAvailable || 0)) {
    return { ok: false, reason: `Overcharge Allowance is ${frame.overchargeAvailable || 0} EP` };
  }
  const total = amount + overcharge;
  if ((frame.ep || 0) < total) return { ok: false, reason: `Needs ${total} EP, has ${frame.ep || 0}` };
  frame.ep -= total;
  frame.overchargeAvailable = (frame.overchargeAvailable || 0) - overcharge;
  frame.epSpentThisTurn = (frame.epSpentThisTurn || 0) + total;
  return { ok: true, spent: total };
}

// --- Defensive rerolls (rules.md 2.3 step 7, 3.3) --------------------------

/**
 * How many of the attacker's damage dice the defender may force a reroll of.
 * Flank Speed grants 1, Cover 1 (Light) or 2 (Heavy), and they stack.
 * Rapid Fire bypasses Flank Speed; AoE bypasses Flank Speed and Cover both.
 */
export function rerollAllowance(frame, { aoe = false, rapidFire = false, transferred = false } = {}) {
  if (aoe) return 0;
  const cover = TERRAIN[frame.terrain]?.cover || 0;
  const denied = rapidFire || transferred || frame.prone;
  const flank = frame.flankSpeed && !denied ? 1 : 0;
  const loyalty = frame.loyaltyCover || 0; // Vow of Loyalty Boon, from an ally
  return flank + cover + loyalty;
}

/**
 * Apply the defender's rerolls to a damage pool. Rerolls are optional and the
 * defender chooses the dice, so the sensible policy is to reroll the highest die
 * and stop once nothing worth rerolling remains.
 */
export function applyRerolls(pool, allowance, { rng = Math.random, floor = 3, forced = null } = {}) {
  const dice = [...pool];
  const log = [];
  for (let i = 0; i < allowance; i += 1) {
    const highest = Math.max(...dice);
    if (highest <= floor) break;
    const idx = dice.indexOf(highest);
    dice[idx] = forced?.[i] ?? rollDie(6, rng);
    log.push(`rerolled ${highest} → ${dice[idx]}`);
  }
  return { dice, log };
}

// --- Countermeasure Check (rules.md 4.2) -----------------------------------

/**
 * Every deployed countermeasure — cartridge or sustained suite — negates an
 * attack on a 4+. Terrain never rolls; woods, buildings and elevation block
 * outright. Only the ground is reliable.
 */
export function countermeasureCheck({ rng = Math.random, forcedRoll = null } = {}) {
  const rolled = forcedRoll ?? rollDie(6, rng);
  return { rolled, tn: COUNTERMEASURE_CHECK_TN, negated: rolled >= COUNTERMEASURE_CHECK_TN };
}

/** Which of the defender's systems can contest an attack made on this band. */
export function availableCountermeasures(frame, band) {
  const out = [];
  const sys = frame.systems || {};
  // Vow of Honesty forbids every deception system, the pilot's own and allies'.
  if (frame.vow === 'honesty' && !frame.dishonored) return out;
  if (band === 'ir' && sys.flares && !frame.flaresEmpty) out.push({ key: 'flares', kind: 'cartridge' });
  if (band === 'rad' && sys.chaff && !frame.chaffEmpty) out.push({ key: 'chaff', kind: 'cartridge' });
  if (band === 'vis' && frame.inSmoke) out.push({ key: 'smoke', kind: 'cartridge' });
  if (band === 'rad' && frame.ecmActive) out.push({ key: 'ecm', kind: 'sustained' });
  if (frame.adaptiveSkinActive && (frame.adaptiveSkinBandKeys || []).includes(band)) {
    out.push({ key: 'adaptiveSkin', kind: 'sustained' });
  }
  return out;
}

/**
 * Resolve one countermeasure. A cartridge is spent whether it worked or not and
 * then rolls its Ammo Die; a sustained suite is never expended.
 */
export function useCountermeasure(frame, cm, { rng = Math.random, forcedRoll = null, forcedAmmoRoll = null } = {}) {
  const check = countermeasureCheck({ rng, forcedRoll });
  const out = { ...check, key: cm.key, kind: cm.kind, ammo: null };
  if (cm.kind === 'cartridge' && cm.key !== 'smoke') {
    out.ammo = rollAmmoDie(AMMO_DIE.countermeasure.empty, { rng, forcedRoll: forcedAmmoRoll });
    if (out.ammo.empty) frame[`${cm.key}Empty`] = true;
  }
  return out;
}

// --- Damage (rules.md 2.3, 6.1) --------------------------------------------

/**
 * Resolve a damage total against one location.
 *
 * Armor DR is a threshold: `damage > DR` penetrates; anything else bounces off
 * with no effect whatsoever — no partial damage, no degradation.
 *
 * opts:
 *   apX          — Armor Piercing, subtracted from DR
 *   coreCritical — a natural 2 on the hit location table: torso DR counts as 0
 *   transferred  — blow-through from a severed limb
 *   skipDegrade  — Rapid Fire degrades DR once for the whole attack, not per die
 */
export function applyDamage(frame, locKey, damage, opts = {}) {
  const { apX = 0, coreCritical = false, transferred = false, skipDegrade = false } = opts;
  const report = {
    location: locKey,
    locationName: LOCATION_NAMES[locKey],
    raw: damage,
    dr: 0,
    excess: 0,
    penetrated: false,
    drDegraded: false,
    critDice: 0,
    transferred: null,
    steps: [],
  };

  const loc = frame.locations[locKey];

  // A hit on an already-severed limb blows through to the Torso (rules.md 6.5.5).
  if (loc.destroyed && locKey !== 'torso') {
    report.steps.push(`${LOCATION_NAMES[locKey]} is gone — the hit transfers to the Torso`);
    report.transferred = applyDamage(frame, 'torso', damage, { apX, transferred: true });
    return report;
  }

  const baseDR = loc.dr;
  const dr = coreCritical ? 0 : Math.max(0, baseDR - apX);
  report.dr = dr;
  if (coreCritical) report.steps.push('Core Critical — Torso Armor DR is 0 for this whole attack');
  else if (apX) report.steps.push(`Armor DR ${baseDR} − AP ${apX} = ${dr}`);

  if (damage <= dr) {
    report.steps.push(`${damage} vs DR ${dr} — the armor holds. No damage, no degradation.`);
    return report;
  }

  report.penetrated = true;
  report.excess = damage - dr;

  if (!skipDegrade && loc.dr > 0) {
    loc.dr -= 1;
    report.drDegraded = true;
    report.steps.push(`Penetrated — ${LOCATION_NAMES[locKey]} DR ${loc.dr + 1} → ${loc.dr}, permanently`);
  }

  report.critDice = overkillDice(report.excess);
  const extra = report.critDice - 1;
  report.steps.push(
    `${damage} vs DR ${dr}, excess ${report.excess}`
    + (extra > 0 ? ` — Overkill adds ${extra} crit ${extra === 1 ? 'die' : 'dice'}` : '')
    + ` → ${report.critDice} Critical${report.critDice === 1 ? '' : 's'}`,
  );
  return report;
}

// --- Critical hits (rules.md 6.2) ------------------------------------------

export function critTableFor(locKey) {
  return CRIT_TABLE_FOR[locKey];
}

/** Roll one Critical, resolving Cascading Failure against slots already marked. */
export function rollCrit(frame, locKey, { mod = 0, rng = Math.random, forcedRoll = null } = {}) {
  const table = CRIT_TABLE_FOR[locKey];
  const natural = forcedRoll ?? rollDie(6, rng);
  const marked = frame.locations[locKey].crits || {};
  const target = Math.min(CRIT_TABLE_MAX[table], Math.max(1, natural + mod));
  const { slot, overflowed } = cascadeSlot(table, natural + mod, marked);
  return {
    ...lookupCrit(table, slot),
    location: locKey,
    natural,
    mod,
    cascaded: slot !== target,
    overflowed,
  };
}

/** Mark the slot and apply its mechanical effect. */
export function applyCrit(frame, crit, { rng = Math.random } = {}) {
  const locKey = crit.location;
  const loc = frame.locations[locKey];
  loc.crits = loc.crits || {};
  loc.crits[crit.slot] = true;

  const out = { applied: crit, followUps: [], notes: [] };

  switch (crit.effect) {
    // --- head
    case 'sensorGhosting':
      frame.locksDropped = true;
      break;
    case 'calibrationDrift':
      frame.calibrationDrift = true;
      break;
    case 'sensorBandDestroyed': {
      const r = rollDie(6, rng);
      const band = r <= 2 ? 'ir' : r <= 4 ? 'vis' : 'rad';
      frame.sensorBandsDestroyed = { ...(frame.sensorBandsDestroyed || {}), [band]: true };
      out.notes.push(`1d6 = ${r}: ${band.toUpperCase()} array permanently destroyed`);
      break;
    }
    case 'headFracture':
      loc.dr = 0;
      frame.datalinkSevered = true;
      break;

    // --- torso
    case 'systemGlitch': frame.systemGlitch = true; break;
    case 'servoLock': frame.servoLock = true; break;
    case 'capacitorLeak':
      frame.capacitorMaxMod = (frame.capacitorMaxMod || 0) - 2;
      frame.capacitor = Math.max(0, (frame.capacitor || 0) - 2);
      break;
    case 'armorToZero': loc.dr = 0; break;
    case 'reactorDamage': frame.reactorMod = (frame.reactorMod || 0) - 2; break;
    case 'ammoExplosion':
      if (hasVolatileStore(frame)) {
        emptyVolatileStores(frame);
        out.notes.push('A volatile store cooks off — that system is Empty for good');
        out.followUps.push({ location: 'torso', count: 2, reason: 'Ammo Explosion' });
      } else {
        frame.reactorMod = (frame.reactorMod || 0) - 2;
        out.notes.push('Nothing left to cook off — Reactor Damage applied instead');
      }
      break;
    case 'electricalFire': frame.electricalFire = true; break;
    case 'containmentFailure':
      frame.destroyed = true;
      loc.destroyed = true;
      out.notes.push('The Capacitor bank discharges: 2d6 to every adjacent hex');
      break;

    // --- arms
    case 'targetingJitter':
      frame.targetingJitter = { ...(frame.targetingJitter || {}), [locKey]: true };
      break;
    case 'armWeaponsCostMore':
      frame.armEPMod = { ...(frame.armEPMod || {}), [locKey]: ((frame.armEPMod || {})[locKey] || 0) + 1 };
      break;
    case 'hardpointFailure':
      frame.hardpointFailure = { ...(frame.hardpointFailure || {}), [locKey]: true };
      break;
    case 'weaponDestroyed': {
      // Each arm carries a single hardpoint, so there is nothing to choose.
      const mounted = (frame.weapons || []).find((w) => w.loc === locKey && !w.destroyed);
      if (mounted) { mounted.destroyed = true; out.notes.push(`${mounted.name} destroyed`); }
      else out.notes.push('The arm was empty — slot marked, nothing lost');
      break;
    }

    // --- legs
    case 'servoStutter': frame.servoStutter = true; break;
    case 'kneeLock': frame.kneeLock = true; break;
    case 'hipActuator': frame.movementLimitMod = (frame.movementLimitMod || 0) - 2; break;
    case 'actuatorDestroyed':
      loc.actuatorDestroyed = true;
      frame.prone = true;
      break;

    // --- shared
    case 'limbSevered': {
      loc.destroyed = true;
      for (const w of frame.weapons || []) if (w.loc === locKey) w.destroyed = true;
      if (locKey.includes('Leg')) {
        frame.prone = true;
        const other = locKey === 'leftLeg' ? 'rightLeg' : 'leftLeg';
        if (frame.locations[other].destroyed) {
          frame.destroyed = true;
          out.notes.push('Both legs gone — the Frame is disabled (rules.md 6.5.4)');
        }
      }
      break;
    }
    case 'frameDestroyed':
      frame.destroyed = true;
      loc.destroyed = true;
      break;
    default:
      break;
  }

  return out;
}

/**
 * Roll and apply `count` Criticals to one location, honouring cascade between
 * them and queueing any follow-ups (an Ammo Explosion adds two more).
 */
export function resolveCrits(frame, locKey, count, { mod = 0, rng = Math.random, forcedRolls = null } = {}) {
  const results = [];
  const pending = [{ locKey, count }];
  let guard = 0;
  while (pending.length && guard < 32) {
    const job = pending.shift();
    for (let i = 0; i < job.count; i += 1) {
      guard += 1;
      if (isDestroyed(frame)) return results;
      const forced = forcedRolls ? forcedRolls[results.length] ?? null : null;
      const crit = rollCrit(frame, job.locKey, { mod, rng, forcedRoll: forced });
      const applied = applyCrit(frame, crit, { rng });
      results.push({ crit, applied });
      for (const f of applied.followUps) pending.push({ locKey: f.location, count: f.count });
    }
  }
  return results;
}

// --- Volatile stores (rules.md 6.2, Torso slot 6) --------------------------

export function hasVolatileStore(frame) {
  const liveAmmo = (frame.weapons || []).some((w) => {
    const def = WEAPONS[w.key];
    return def?.explosiveAmmo && !w.empty && !w.destroyed;
  });
  const propellant = Boolean(frame.systems?.jumpJets) && !frame.jumpJetsEmpty;
  return liveAmmo || propellant;
}

export function emptyVolatileStores(frame) {
  for (const w of frame.weapons || []) {
    if (WEAPONS[w.key]?.explosiveAmmo) w.empty = true;
  }
  if (frame.systems?.jumpJets) frame.jumpJetsEmpty = true;
}

// --- Ammo Die (rules.md 5.0) -----------------------------------------------

/** Roll a system's Ammo Die. At or below the threshold it is Empty for good. */
export function rollAmmoDie(threshold, { rng = Math.random, forcedRoll = null } = {}) {
  const rolled = forcedRoll ?? rollDie(6, rng);
  return { rolled, threshold, empty: rolled <= threshold };
}

export function ammoDieFor(weapon, { bursts = 1 } = {}) {
  const def = WEAPONS[weapon.key];
  if (!def?.ammoDie) return null;
  if (def.rapidFire) {
    return bursts > 1 ? AMMO_DIE.autocannonFullAuto.empty : AMMO_DIE.autocannonSingle.empty;
  }
  return def.ammoDie.empty;
}

export function ammoTypeInfo(key) {
  return AMMO_TYPES[key] || null;
}

// --- Weapons ---------------------------------------------------------------

export function weaponDef(weapon) {
  const def = WEAPONS[weapon.key];
  if (!def) throw new Error(`Unknown weapon: ${weapon.key}`);
  return def;
}

/** The sensor band a weapon needs. Missiles use whichever band their seeker had. */
export function weaponBand(weapon) {
  const def = weaponDef(weapon);
  return def.detection === 'guidance' ? weapon.guidance : def.detection;
}

export function weaponEPCost(frame, weapon, { bursts = 1, overcharge = 0 } = {}) {
  const def = weaponDef(weapon);
  const armMod = (frame.armEPMod || {})[weapon.loc] || 0;
  const dishonor = frame.dishonored ? 1 : 0;
  const base = (def.rapidFire ? def.epCost * bursts : def.epCost) + armMod + dishonor;
  return { base, overcharge, total: base + overcharge };
}

/** Damage dice, after Overcharge, Prone and Hardpoint Failure. */
export function damageDiceCount(frame, weapon, { overchargeDice = 0 } = {}) {
  const def = weaponDef(weapon);
  if (!def.damage) return 0;
  let dice = def.damage.dice + overchargeDice;
  if (frame.prone) dice -= 1;
  if ((frame.hardpointFailure || {})[weapon.loc]) dice -= 1;
  return Math.max(1, dice);
}

/** Overcharge adds dice at 2 EP each, never a flat bonus (rules.md 5.3). */
export function overchargeDiceFor(weapon, epSpent) {
  const def = weaponDef(weapon);
  if (!def.overcharge?.epPerDie) return 0;
  return Math.min(def.overcharge.maxDice, Math.floor(epSpent / def.overcharge.epPerDie));
}

export function weaponBlockedReason(frame, weapon, { bursts = 1, overcharge = 0 } = {}) {
  const def = weaponDef(weapon);
  if (weapon.destroyed) return 'Weapon destroyed';
  if (frame.locations[weapon.loc]?.destroyed) return `${LOCATION_NAMES[weapon.loc]} severed`;
  if (weapon.empty) return 'Out of ammunition';
  if (weapon.firedThisTurn) return 'Already fired this Combat Phase';
  if ((weapon.cooldown || 0) > 0) return `Cooling down (${weapon.cooldown} turn)`;
  if (bursts > MAX_FULL_AUTO_BURSTS) return `Full Auto is capped at ${MAX_FULL_AUTO_BURSTS} bursts`;

  const band = weaponBand(weapon);
  if (band && band !== 'any' && (frame.sensorBandsDestroyed || {})[band]) {
    return `${band.toUpperCase()} array destroyed — cannot establish a lock`;
  }
  if (frame.locksDropped) return 'Sensor Ghosting — no locks held';

  const need = def.requiresOvercharge || 0;
  if (need && overcharge < need) return `Requires a ${need} EP Overcharge from the Capacitor`;
  const cost = weaponEPCost(frame, weapon, { bursts, overcharge });
  if (overcharge > (frame.overchargeAvailable || 0)) {
    return `Overcharge Allowance is ${frame.overchargeAvailable || 0} EP`;
  }
  if ((frame.ep || 0) < cost.total) return `Needs ${cost.total} EP, has ${frame.ep || 0}`;
  return null;
}

/** Pay for a shot, mark it fired, set any cooldown, and roll the Ammo Die. */
export function consumeWeapon(frame, weapon, { bursts = 1, overcharge = 0, rng = Math.random, forcedAmmoRoll = null } = {}) {
  const def = weaponDef(weapon);
  const cost = weaponEPCost(frame, weapon, { bursts, overcharge });
  const paid = spendEP(frame, cost.base, { overcharge });
  if (!paid.ok) return { ok: false, reason: paid.reason };

  weapon.firedThisTurn = true;
  // Any Overcharge triggers a 1-turn cooldown, which is why the Rail Gun always
  // cools down: firing it requires one.
  if (overcharge > 0 || def.cooldown) {
    weapon.cooldown = Math.max(weapon.cooldown || 0, def.cooldown || 1);
  }

  let ammo = null;
  const threshold = ammoDieFor(weapon, { bursts });
  if (threshold != null) {
    ammo = rollAmmoDie(threshold, { rng, forcedRoll: forcedAmmoRoll });
    if (ammo.empty) weapon.empty = true;
  }
  return { ok: true, spent: cost.total, ammo };
}

// --- Special weapon resolutions --------------------------------------------

/**
 * Rapid Fire (rules.md 5.0): each 1d6 is tested separately against the DR the
 * location had when the attack was declared. Each BURST that puts at least one
 * die through generates one Critical. Armor degrades by 1 in total however many
 * rounds got through, and Overkill never applies.
 */
export function resolveRapidFire(frame, locKey, { bursts = 1, apX = 0, coreCritical = false, rng = Math.random, forcedDice = null } = {}) {
  const loc = frame.locations[locKey];
  const dr = coreCritical ? 0 : Math.max(0, loc.dr - apX);
  const report = { location: locKey, dr, bursts: [], critDice: 0, drDegraded: false, steps: [] };

  let idx = 0;
  for (let b = 0; b < bursts; b += 1) {
    const dice = [];
    for (let d = 0; d < 3; d += 1) {
      dice.push(forcedDice?.[idx] ?? rollDie(6, rng));
      idx += 1;
    }
    const through = dice.filter((v) => v > dr).length;
    report.bursts.push({ dice, through });
    if (through > 0) report.critDice += 1;
    report.steps.push(`Burst ${b + 1}: [${dice.join(', ')}] vs DR ${dr} — ${through} through`);
  }

  if (report.critDice > 0 && loc.dr > 0) {
    loc.dr -= 1;
    report.drDegraded = true;
    report.steps.push(`${LOCATION_NAMES[locKey]} DR ${loc.dr + 1} → ${loc.dr} — once for the whole attack`);
  }
  if (report.critDice === 0) report.steps.push('Nothing penetrated');
  return report;
}

/** Cluster: three locations, one per column, 2d6 to each (rules.md 5.2). */
export function resolveCluster(frame, { rng = Math.random, forcedLocations = null, forcedDamage = null } = {}) {
  const zones = ['left', 'front', 'right'];
  const results = [];
  zones.forEach((zone, i) => {
    if (isDestroyed(frame)) return;
    const roll = forcedLocations?.[i] ?? roll2d6(rng).total;
    const hit = lookupHitLocation(roll, zone);
    const damage = forcedDamage?.[i] ?? sum(rollDice(2, 6, rng));
    results.push({ zone, roll, hit, damage, report: applyDamage(frame, hit.location, damage, { coreCritical: hit.coreCritical }) });
  });
  return results;
}

/** High Explosive: 3d6 primary, 1d6 splash to every adjacent location. */
export function resolveHighExplosive(frame, locKey, { rng = Math.random, forcedPrimary = null, forcedSplash = null } = {}) {
  const primary = forcedPrimary ?? sum(rollDice(3, 6, rng));
  const results = [{ location: locKey, damage: primary, report: applyDamage(frame, locKey, primary) }];
  (ADJACENT_LOCATIONS[locKey] || []).forEach((adj, i) => {
    if (isDestroyed(frame)) return;
    const damage = forcedSplash?.[i] ?? rollDie(6, rng);
    results.push({ location: adj, damage, splash: true, report: applyDamage(frame, adj, damage) });
  });
  return results;
}

/**
 * EMP: no damage at all, bypasses Armor DR. Scrambles sensors for a turn, severs
 * the Datalink, and inflicts a Critical on every location already at 0 DR.
 * Catches friendly Frames in the blast too — the caller decides who is in it.
 */
export function resolveEMP(frame, { rng = Math.random } = {}) {
  frame.sensorsScrambled = true;
  frame.datalinkSevered = true;
  const hits = [];
  for (const locKey of LOCATIONS) {
    if (isDestroyed(frame)) break;
    const loc = frame.locations[locKey];
    if (loc.destroyed || loc.dr > 0) continue;
    hits.push({ location: locKey, crits: resolveCrits(frame, locKey, 1, { rng }) });
  }
  return { scrambled: true, hits };
}

/**
 * Disruptor: no damage. Ignores Armor DR and Flank Speed, forces a Critical on
 * the location rolled, and drains 1d6 EP. Overcharge forces a second Critical.
 */
export function resolveDisruptor(frame, locKey, { overcharged = false, rng = Math.random, forcedDrain = null, forcedCrits = null } = {}) {
  const crits = resolveCrits(frame, locKey, overcharged ? 2 : 1, { rng, forcedRolls: forcedCrits });
  const drainRoll = forcedDrain ?? rollDie(6, rng);
  const drained = Math.min(frame.ep || 0, drainRoll);
  frame.ep = Math.max(0, (frame.ep || 0) - drainRoll);
  return { crits, drainRoll, drained };
}

// --- Falling, collisions & drop strikes (rules.md 2.2, 3.2) ----------------

/** Falling damage: 1d6 per Level as ONE pooled roll (rules.md 3.2). */
export function resolveFall(frame, levels, { rng = Math.random, forcedLocation = null, forcedDamage = null } = {}) {
  const roll = forcedLocation ?? roll2d6(rng).total;
  const hit = lookupHitLocation(roll, 'front');
  const damage = forcedDamage ?? sum(rollDice(levels, 6, rng));
  const report = applyDamage(frame, hit.location, damage, { coreCritical: hit.coreCritical });
  frame.prone = true;
  return { levels, roll, hit, damage, report };
}

/** Collision: flat Mass Value x Speed, suffered by BOTH Frames (rules.md 2.2). */
export function collisionDamage(movingFrame, hexesMoved) {
  return massValue(movingFrame) * hexesMoved;
}

/** Kinetic Drop Strike: the target takes it all, the jumper takes half, rounded up. */
export function dropStrikeDamage(jumper, hexesJumped) {
  const full = massValue(jumper) * hexesJumped;
  return { target: full, jumper: Math.ceil(full / 2) };
}

// --- Pilot Checks (rules.md 6.4) -------------------------------------------

export function pilotCheck(frame, { modifier = 0, rng = Math.random, forcedRoll = null } = {}) {
  const terrain = TERRAIN[frame.terrain]?.pilotMod || 0;
  const crippledLeg = hasCrippledLeg(frame) ? PILOT_CHECK_MODIFIERS.crippledLeg : 0;
  const pilot = frame.dishonored ? 0 : (frame.pilotBonus || 0);
  // The Vow of Courage covers staying upright and getting back up alike.
  const courage = frame.vow === 'courage' && !frame.dishonored ? 2 : 0;
  const total = terrain + crippledLeg + pilot + courage + modifier;
  const roll = forcedRoll ?? roll2d6(rng).total;
  return {
    roll,
    modifier: total,
    result: roll + total,
    tn: PILOT_CHECK_TN,
    passed: roll + total >= PILOT_CHECK_TN,
    breakdown: { terrain, crippledLeg, pilot, courage, other: modifier },
  };
}

// --- End Phase (rules.md 2.4) ----------------------------------------------

export function endPhase(frame, { rng = Math.random } = {}) {
  const report = { pool: 0, banked: 0, vented: 0, capMax: 0, fire: null, steps: [] };

  // An Electrical Fire burns before anything is tidied away.
  if (frame.electricalFire && !isDestroyed(frame)) {
    report.fire = resolveCrits(frame, 'torso', 1, { rng });
    report.steps.push('Electrical Fire: 1 Torso Critical');
  }

  // Read the cap *after* the fire: an Electrical Fire that rolls Capacitor Leak
  // shrinks the maximum this very phase, so less is banked and more is vented.
  const capMax = effectiveCapacitorMax(frame);
  const pool = frame.ep || 0;
  const banked = Math.min(capMax, pool);
  report.capMax = capMax;
  report.pool = pool;
  report.banked = banked;
  report.vented = Math.max(0, pool - banked);
  report.steps.push(`${banked} EP stored in Capacitor (max ${capMax})`);
  if (report.vented) report.steps.push(`${report.vented} EP vented`);

  // Unused energy moves left into the Capacitor; the pool always ends empty,
  // whether it was banked or vented (rules.md 2.4).
  frame.capacitor = banked;
  frame.ep = 0;
  frame.epSpentThisTurn = 0;
  frame.flankSpeed = false;
  frame.hexesMoved = 0;
  frame.torsoTwistedThisTurn = false;
  frame.servoStutter = false;   // lasts one turn
  frame.locksDropped = false;   // Sensor Ghosting clears
  frame.sensorsScrambled = false;
  frame.targetingJitter = {};

  for (const w of frame.weapons || []) {
    w.firedThisTurn = false;
    if ((w.cooldown || 0) > 0) w.cooldown -= 1;
  }
  return report;
}

// --- Turn order (rules.md 2.2, 2.3) ----------------------------------------

/**
 * Activation runs lowest Initiative first; Combat runs highest first. The flip
 * every round is the rule most worth automating.
 */
export function turnOrder(frames, phase) {
  const live = frames.filter((f) => !isDestroyed(f));
  const sorted = [...live].sort((a, b) => effectiveInitiative(a) - effectiveInitiative(b));
  return phase === 'combat' ? sorted.reverse() : sorted;
}
