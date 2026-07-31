// Iron Protocol — rules engine.
//
// Pure logic: no DOM, no storage, no network. Functions mutate the frame object
// passed in and return a plain report describing what happened, which the UI
// renders and the sync layer turns into writes.
//
// Loaded standalone by tests.html.

import {
  ADJACENT_LOCATIONS,
  AMMO_TYPES,
  CRIT_TABLE_FOR,
  IR_LOCK_THRESHOLD,
  LOCATION_NAMES,
  LOCATIONS,
  MAX_FULL_AUTO_BURSTS,
  MOVE_COSTS,
  PILOT_CHECK_TN,
  SYSTEM_UPKEEP,
  TERRAIN,
  WEAPONS,
  WEIGHT_CLASSES,
  lookupCrit,
  lookupHitLocation,
} from './data/tables.js';

// --- Dice -------------------------------------------------------------------

export function rollDie(sides = 6, rng = Math.random) {
  return Math.floor(rng() * sides) + 1;
}

export function rollDice(count, sides = 6, rng = Math.random) {
  return Array.from({ length: count }, () => rollDie(sides, rng));
}

export function roll2d6(rng = Math.random) {
  const dice = rollDice(2, 6, rng);
  return { dice, total: dice[0] + dice[1] };
}

export const sum = (nums) => nums.reduce((a, b) => a + b, 0);

// --- Derived stats ----------------------------------------------------------
// Every permanent critical effect lives in a `*Mod` field so it keeps applying
// on every later turn. This is the main thing the app does that paper does not.

export function effectiveReactor(frame) {
  return Math.max(0, frame.reactor + (frame.reactorMod || 0));
}

export function effectiveCapacitorMax(frame) {
  return Math.max(0, frame.capacitorMax + (frame.capacitorMaxMod || 0));
}

export function effectiveInitiative(frame) {
  return frame.initiative + (frame.initiativeMod || 0);
}

export function effectiveMovementLimit(frame) {
  return Math.max(0, frame.movementLimit + (frame.movementLimitMod || 0));
}

/** Evasion Limit after Hip Actuator crits and any terrain cap (water). */
export function effectiveEvasionLimit(frame) {
  const base = Math.max(0, frame.evasionLimit + (frame.evasionLimitMod || 0));
  const cap = TERRAIN[frame.terrain]?.evaCap;
  return cap == null ? base : Math.min(base, cap);
}

export function coverBonus(frame) {
  return TERRAIN[frame.terrain]?.cover || 0;
}

export function massValue(frame) {
  return WEIGHT_CLASSES[frame.weightClass].massValue;
}

/**
 * Evasion applied against one specific attack.
 *
 * Movement-generated EVA is lost while Prone and is bypassed entirely by rear
 * attacks; terrain cover survives both (rules.md 1.3, 6.3). AoE and physical
 * impacts bypass Evasion outright, and since cover is expressed as bonus EVA,
 * it is bypassed too.
 */
export function evasionAgainst(frame, { zone = 'front', aoe = false, bypassesEvasion = false } = {}) {
  if (aoe || bypassesEvasion) return 0;
  const movement = frame.prone || zone === 'rear' ? 0 : frame.eva || 0;
  const painted = frame.painted ? 1 : 0; // Tracer marking (rules.md 5.1)
  return Math.max(0, movement + coverBonus(frame) - painted);
}

/** Frames spending 5+ EP in a turn light up on infrared (rules.md 4.1). */
export function isIRLockable(frame) {
  return (frame.epSpentThisTurn || 0) >= IR_LOCK_THRESHOLD;
}

export function isDestroyed(frame) {
  return !!frame.destroyed;
}

// --- Energy Phase (rules.md 2.1) -------------------------------------------

/**
 * Generate EP, roll banked capacitor charge into the pool, pay stealth upkeep.
 * Returns a report so the UI can show the breakdown.
 */
export function energyPhase(frame) {
  const report = {
    frameId: frame.id,
    generated: 0,
    cooling: 0,
    glitch: 0,
    banked: frame.capacitor || 0,
    upkeep: 0,
    upkeepDetail: [],
    stunned: false,
    pool: 0,
  };

  // Pilot Stunned: 0 EP this turn and the capacitor is drained (rules.md 6.2).
  if (frame.pilotStunned) {
    frame.pilotStunned = false;
    frame.capacitor = 0;
    frame.ep = 0;
    frame.overchargeAvailable = 0;
    report.stunned = true;
    return report;
  }

  const cooling = TERRAIN[frame.terrain]?.cooling || 0;
  const glitch = frame.systemGlitch ? 1 : 0;
  frame.systemGlitch = false; // one turn only

  const generated = Math.max(0, effectiveReactor(frame) + cooling - glitch);
  const banked = frame.capacitor || 0;

  // Overcharge may only be paid from banked capacitor EP (rules.md 5.4), so we
  // track how much of the pool came from the capacitor.
  frame.overchargeAvailable = banked;
  frame.capacitor = 0;

  let pool = generated + banked;

  const upkeep = [];
  if (frame.systems?.amc?.active) {
    const bands = Math.max(1, frame.systems.amc.bands?.length || 1);
    const cost = SYSTEM_UPKEEP.amc * bands;
    upkeep.push({ system: 'AMC', cost, detail: `${bands} spectrum${bands > 1 ? 's' : ''}` });
  }
  if (frame.systems?.ecm?.active) {
    const radius = frame.systems.ecm.radius || 0;
    const cost = SYSTEM_UPKEEP.ecm + radius;
    upkeep.push({ system: 'ECM', cost, detail: radius ? `+${radius} hex radius` : 'host only' });
  }

  const upkeepTotal = sum(upkeep.map((u) => u.cost));
  pool = Math.max(0, pool - upkeepTotal);
  frame.overchargeAvailable = Math.min(frame.overchargeAvailable, pool);

  frame.ep = pool;
  frame.epSpentThisTurn = upkeepTotal;
  frame.hexesMoved = 0;

  Object.assign(report, {
    generated,
    cooling,
    glitch,
    banked,
    upkeep: upkeepTotal,
    upkeepDetail: upkeep,
    pool,
  });
  return report;
}

// --- Movement (rules.md 2.2, 3.2) ------------------------------------------

/**
 * EP cost of a single movement action.
 * @param action 'walk' | 'reverse' | 'pivot' | 'jump' | 'standUp' | 'torsoTwist'
 */
export function movementCost(frame, action, { elevationDelta = 0, hexes = 1, terrain = frame.terrain } = {}) {
  const terrainExtra = TERRAIN[terrain]?.extraEP || 0;
  const climb = elevationDelta > 0 ? elevationDelta * MOVE_COSTS.climbUp : 0;
  const kneeLock = frame.kneeLock ? 1 : 0;

  switch (action) {
    case 'walk':
      return MOVE_COSTS.walk + terrainExtra + climb + kneeLock;
    case 'reverse':
      return MOVE_COSTS.reverse + terrainExtra + climb + kneeLock;
    case 'jump':
      return MOVE_COSTS.jumpPerHex * hexes;
    case 'pivot':
      if (frame.immobilized) return MOVE_COSTS.severedLegPivot;
      if (frame.prone) return MOVE_COSTS.pronePivot;
      return MOVE_COSTS.pivot;
    case 'standUp':
      return MOVE_COSTS.standUp;
    case 'torsoTwist':
      return frame.gyroLock ? 2 : 0;
    default:
      throw new Error(`Unknown movement action: ${action}`);
  }
}

/** Why a movement action is unavailable, or null if it is legal. */
export function movementBlockedReason(frame, action, { terrain = frame.terrain, hexes = 1 } = {}) {
  if (frame.destroyed) return 'Frame destroyed';

  // A crippled Frame may still haul itself upright on its remaining leg — it
  // just needs a Pilot Check to do it (rules.md 6.5.4).
  if (action === 'standUp') {
    return frame.prone ? null : 'Not prone';
  }
  if (action === 'torsoTwist') {
    return frame.prone ? 'Prone — cannot torso twist' : null;
  }

  if (frame.prone && action !== 'pivot') return 'Prone — must stand up first';
  if (frame.immobilized && action !== 'pivot') return 'Immobilized (leg severed)';

  if (action === 'jump') {
    if (!frame.systems?.jumpJets) return 'No jump jets';
    if (frame.jumpJetsDisabled) return 'Jump jets wrecked';
    if (hexes > 4) return 'Max jump is 4 hexes';
  }
  if (terrain === 'woodsHeavy' && (action === 'walk' || action === 'reverse')) {
    const cls = frame.weightClass;
    if (cls === 'heavy' || cls === 'assault') return 'Heavy Woods impassable on foot for this weight class';
  }
  if (action === 'walk' || action === 'reverse' || action === 'jump') {
    const moved = frame.hexesMoved || 0;
    const limit = effectiveMovementLimit(frame);
    if (moved + (action === 'jump' ? hexes : 1) > limit) return `Movement limit reached (${limit} hexes)`;
  }
  return null;
}

/**
 * Spend EP on a movement action and accrue Evasion.
 * Caller should check movementBlockedReason first.
 */
export function performMovement(frame, action, opts = {}) {
  const cost = movementCost(frame, action, opts);
  const spend = spendEP(frame, cost);
  const report = { action, cost, ...spend, evaGained: 0, hexes: 0 };
  if (!spend.ok) return report;

  const hexes = action === 'jump' ? opts.hexes || 1 : 1;

  if (action === 'walk' || action === 'reverse' || action === 'jump') {
    frame.hexesMoved = (frame.hexesMoved || 0) + hexes;
    report.hexes = hexes;
    const perHex = action === 'jump' ? 2 : 1; // jumping generates 2 EVA per hex
    const limit = effectiveEvasionLimit(frame);
    const before = frame.eva || 0;
    frame.eva = Math.min(limit, before + perHex * hexes);
    report.evaGained = frame.eva - before;
  }

  if (action === 'standUp') {
    if (frame.immobilized) {
      // Balancing on one leg and the gyro: the EP is spent either way.
      const check = pilotCheck(frame, { rng: opts.rng, forcedRoll: opts.forcedRoll ?? null });
      report.pilotCheck = check;
      if (check.passed) frame.prone = false;
    } else {
      frame.prone = false;
    }
  }
  if (opts.terrain) {
    frame.terrain = opts.terrain;
    // Re-cap evasion if the new hex is water.
    frame.eva = Math.min(frame.eva || 0, effectiveEvasionLimit(frame));
  }

  return report;
}

// --- Energy spending --------------------------------------------------------

/**
 * Deduct EP from the pool. Overcharge EP must come from banked capacitor
 * charge, tracked in frame.overchargeAvailable (rules.md 5.4).
 */
export function spendEP(frame, amount, { overcharge = 0 } = {}) {
  if (amount > (frame.ep || 0)) {
    return { ok: false, reason: `Needs ${amount} EP, has ${frame.ep || 0}` };
  }
  if (overcharge > (frame.overchargeAvailable || 0)) {
    return {
      ok: false,
      reason: `Overcharge needs ${overcharge} EP from the Capacitor, only ${frame.overchargeAvailable || 0} banked`,
    };
  }
  frame.ep -= amount;
  frame.overchargeAvailable = Math.max(0, (frame.overchargeAvailable || 0) - overcharge);
  frame.epSpentThisTurn = (frame.epSpentThisTurn || 0) + amount;
  return { ok: true, spent: amount, remaining: frame.ep };
}

// --- Damage (rules.md 2.3, 6.1, 6.5) ---------------------------------------

export { lookupHitLocation };

/**
 * Apply one packet of damage to one location.
 *
 * @param opts.evasion       EVA to subtract (see evasionAgainst)
 * @param opts.apX           Armor Piercing rating — ignores this much DR
 * @param opts.treatDRAsZero Core Critical / Disruptor: DR is 0 but still degrades
 * @param opts.direct        Transfer & Ammo Explosion: skip EVA, DR and degradation
 * @param opts.overrideDR    Resolve against this DR instead of the live value
 * @param opts.skipDegrade   Do not degrade DR here (caller degrades once per attack)
 */
export function applyDamage(frame, locKey, damage, opts = {}) {
  const {
    evasion = 0,
    apX = 0,
    treatDRAsZero = false,
    direct = false,
    overrideDR = null,
    skipDegrade = false,
  } = opts;
  const report = {
    location: locKey,
    locationName: LOCATION_NAMES[locKey],
    raw: damage,
    evasion: 0,
    afterEvasion: damage,
    dr: 0,
    toIS: 0,
    penetrated: false,
    drDegraded: false,
    destroyed: false,
    transferred: null,
    shouldRollCrit: false,
    steps: [],
  };

  let loc = frame.locations[locKey];

  // A hit on an already-severed limb blows through to the Torso (rules.md 6.5.5).
  if (loc.destroyed && locKey !== 'torso') {
    report.steps.push(`${LOCATION_NAMES[locKey]} already destroyed — damage transfers to Torso`);
    const transfer = applyDamage(frame, 'torso', damage, { direct: true });
    report.transferred = transfer;
    report.destroyed = true;
    return report;
  }

  let remaining = damage;

  if (!direct) {
    report.evasion = evasion;
    remaining = Math.max(0, remaining - evasion);
    report.afterEvasion = remaining;
    if (evasion) report.steps.push(`${damage} − ${evasion} EVA = ${remaining}`);

    const baseDR = overrideDR ?? loc.dr;
    const dr = treatDRAsZero ? 0 : Math.max(0, baseDR - apX);
    report.dr = dr;
    const afterDR = remaining - dr;
    if (treatDRAsZero) {
      report.steps.push(`Armor DR bypassed`);
    } else if (dr || apX) {
      const apNote = apX ? ` (DR ${baseDR} − AP ${apX})` : '';
      report.steps.push(`${remaining} − ${dr} DR${apNote} = ${Math.max(0, afterDR)}`);
    }
    remaining = afterDR;
  } else {
    report.steps.push('Bypasses Evasion and Armor DR');
  }

  if (remaining <= 0) {
    report.toIS = 0;
    report.steps.push('Armor holds — no damage');
    return report;
  }

  report.penetrated = true;
  report.toIS = remaining;
  report.shouldRollCrit = true;

  // Penetrating the armor permanently degrades it by 1 (rules.md 2.3 step 8).
  // Transferred and internal-blast damage never touched the armor, so it does not.
  if (!direct && !skipDegrade && loc.dr > 0) {
    loc.dr -= 1;
    report.drDegraded = true;
    report.steps.push(`Armor penetrated — ${LOCATION_NAMES[locKey]} DR permanently ${loc.dr + 1} → ${loc.dr}`);
  }

  const isBefore = loc.is;
  loc.is = Math.max(0, loc.is - remaining);
  report.steps.push(`${remaining} to Internal Structure (${isBefore} → ${loc.is})`);

  if (loc.is === 0) {
    loc.destroyed = true;
    report.destroyed = true;
    const excess = remaining - isBefore;
    report.steps.push(`${LOCATION_NAMES[locKey]} DESTROYED`);
    applyLocationDestruction(frame, locKey, report);

    // Excess from a severed limb carries into the Torso (rules.md 6.5.3/6.5.4).
    if (excess > 0 && (locKey.endsWith('Arm') || locKey.endsWith('Leg'))) {
      report.steps.push(`${excess} excess damage transfers to Torso`);
      report.transferred = applyDamage(frame, 'torso', excess, { direct: true });
    }
  }

  return report;
}

function applyLocationDestruction(frame, locKey, report) {
  if (locKey === 'torso') {
    frame.destroyed = true;
    report.steps.push('Torso destroyed — reactor breach, FRAME DESTROYED (2d6 to adjacent hexes)');
    return;
  }
  if (locKey === 'head') {
    frame.destroyed = true;
    report.steps.push('Cockpit destroyed — pilot killed, FRAME DESTROYED');
    return;
  }
  if (locKey.endsWith('Arm')) {
    disableWeaponsIn(frame, locKey, 'severed');
    report.steps.push('All weapons and systems in the arm are lost');
    return;
  }
  if (locKey.endsWith('Leg')) {
    frame.prone = true;
    frame.immobilized = true;
    disableWeaponsIn(frame, locKey, 'severed');
    const bothLegsGone = frame.locations.leftLeg.destroyed && frame.locations.rightLeg.destroyed;
    if (bothLegsGone) {
      frame.destroyed = true;
      report.steps.push('Both legs destroyed — FRAME DISABLED');
    } else {
      report.steps.push('Frame falls Prone and is permanently immobilized');
    }
  }
}

/**
 * Set a location's Internal Structure directly, applying the same destruction
 * consequences the damage pipeline would. Used by the frame sheet's manual
 * steppers so hand-entered damage behaves exactly like a resolved attack.
 */
export function setLocationStructure(frame, locKey, value) {
  const loc = frame.locations[locKey];
  const wasDestroyed = !!loc.destroyed;

  loc.is = Math.max(0, Math.min(loc.isMax, value));
  loc.destroyed = loc.is === 0;

  if (loc.destroyed && !wasDestroyed) {
    applyLocationDestruction(frame, locKey, { steps: [] });
    return;
  }

  if (!loc.destroyed && wasDestroyed) {
    // The player is correcting a mistake — walk the consequences back.
    for (const weapon of frame.weapons) {
      if (weapon.loc === locKey && weapon.destroyedReason === 'severed') {
        weapon.destroyed = false;
        delete weapon.destroyedReason;
      }
    }
    const legsGone = frame.locations.leftLeg.destroyed || frame.locations.rightLeg.destroyed;
    if (!legsGone) {
      frame.immobilized = false;
      frame.prone = false;
    }
    const coreGone = frame.locations.head.destroyed || frame.locations.torso.destroyed;
    const bothLegsGone = frame.locations.leftLeg.destroyed && frame.locations.rightLeg.destroyed;
    if (!coreGone && !bothLegsGone) frame.destroyed = false;
  }
}

function disableWeaponsIn(frame, locKey, reason) {
  for (const weapon of frame.weapons) {
    if (weapon.loc === locKey) {
      weapon.destroyed = true;
      weapon.destroyedReason = reason;
    }
  }
}

// --- Rapid Fire (rules.md 5, Autocannon) -----------------------------------

/**
 * Resolve a Rapid Fire burst. Evasion removes whole hits rather than damage
 * points; each surviving die is resolved against Armor DR separately.
 *
 * Two points the rules leave open, resolved here (see docs/README.md):
 *
 * 1. Which dice miss is unspecified. We negate the highest rolls first, matching
 *    how EVA otherwise comes off the top of a damage total.
 * 2. Every die resolves against the DR the location had when the burst started,
 *    and the burst degrades DR by 1 in total. Degrading per die would let one
 *    Full Auto barrage strip an entire armor plate in a single attack, which
 *    reads as a misapplication of the once-per-attack degradation rule.
 */
export function resolveRapidFire(frame, locKey, dice, opts = {}) {
  const { evasion = 0, apX = 0, damageMod = 0, treatDRAsZero = false } = opts;

  const adjusted = dice.map((d) => Math.max(0, d + damageMod));
  const order = adjusted.map((value, index) => ({ value, index })).sort((a, b) => b.value - a.value);
  const missed = new Set(order.slice(0, Math.min(evasion, order.length)).map((d) => d.index));

  const loc = frame.locations[locKey];
  const drAtStart = loc.dr;

  const report = {
    location: locKey,
    locationName: LOCATION_NAMES[locKey],
    dice: adjusted,
    missedIndexes: [...missed],
    hits: [],
    totalToIS: 0,
    shouldRollCrit: false,
    destroyed: false,
    drDegraded: false,
    steps: [],
  };

  if (evasion) {
    report.steps.push(`${evasion} EVA negates ${missed.size} of ${dice.length} hits`);
  }

  let penetrated = false;
  adjusted.forEach((value, index) => {
    if (missed.has(index)) return;
    if (frame.destroyed) return;
    const hit = applyDamage(frame, locKey, value, {
      evasion: 0,
      apX,
      treatDRAsZero,
      overrideDR: drAtStart,
      skipDegrade: true,
    });
    report.hits.push(hit);
    report.totalToIS += hit.toIS;
    if (hit.penetrated) penetrated = true;
    if (hit.shouldRollCrit) report.shouldRollCrit = true;
    if (hit.destroyed) report.destroyed = true;
  });

  // One penetration event per attack, however many dice got through.
  if (penetrated && !loc.destroyed && loc.dr > 0) {
    loc.dr -= 1;
    report.drDegraded = true;
    report.steps.push(`Armor penetrated — ${LOCATION_NAMES[locKey]} DR ${loc.dr + 1} → ${loc.dr}`);
  }

  return report;
}

// --- Missile warheads (rules.md 5.2) ---------------------------------------

/** Cluster: 2d6 resolved once against every location. */
export function resolveCluster(frame, rollFor) {
  const results = [];
  for (const locKey of LOCATIONS) {
    if (frame.destroyed) break;
    const damage = rollFor(locKey);
    results.push(applyDamage(frame, locKey, damage, { evasion: 0 })); // AoE bypasses EVA
  }
  return results;
}

/** High Explosive: full damage to the hit location, 1d6 splash to adjacent ones. */
export function resolveHighExplosive(frame, locKey, primaryDamage, splashFor) {
  const primary = applyDamage(frame, locKey, primaryDamage, { evasion: 0 });
  const splash = [];
  for (const adjacent of ADJACENT_LOCATIONS[locKey]) {
    if (frame.destroyed) break;
    splash.push(applyDamage(frame, adjacent, splashFor(adjacent), { evasion: 0 }));
  }
  return { primary, splash };
}

/** EMP: no damage, but a critical on every location sitting at 0 Armor DR. */
export function resolveEMP(frame, rollCritDie) {
  frame.sensorsScrambled = true;
  const crits = [];
  for (const locKey of LOCATIONS) {
    const loc = frame.locations[locKey];
    if (loc.destroyed || loc.dr > 0) continue;
    const crit = lookupCrit(CRIT_TABLE_FOR[locKey], rollCritDie());
    // Keep applyCrit's return value: it carries follow-up payloads such as the
    // weapon choices for a Weapon Damaged result.
    const applied = applyCrit(frame, crit, locKey);
    crits.push({ location: locKey, crit: { ...crit, ...applied, location: locKey } });
  }
  return { crits, scrambled: true };
}

// --- Disruptor Cannon (rules.md 5, Specter sheet) --------------------------

/**
 * No damage. Bypasses Evasion and Armor DR. A Torso hit (2d6 of 7 or 12) drains
 * 1d6 EP; any other location forces a Critical Hit on that location.
 */
export function resolveDisruptor(frame, locKey, { drainRoll = 0, critRoll = 0, overcharged = false } = {}) {
  const report = { location: locKey, locationName: LOCATION_NAMES[locKey], drained: 0, crit: null, steps: [] };
  const isTorsoHit = locKey === 'torso';

  if (isTorsoHit || overcharged) {
    const drain = Math.min(frame.ep || 0, drainRoll);
    frame.ep = Math.max(0, (frame.ep || 0) - drain);
    frame.overchargeAvailable = Math.min(frame.overchargeAvailable || 0, frame.ep);
    report.drained = drain;
    report.steps.push(`Drained ${drain} EP (rolled ${drainRoll})`);
  }

  if (!isTorsoHit || overcharged) {
    const target = isTorsoHit ? 'torso' : locKey;
    const crit = lookupCrit(CRIT_TABLE_FOR[target], critRoll);
    // Keep applyCrit's return value: it carries follow-up payloads such as the
    // weapon choices for a Weapon Damaged result.
    const applied = applyCrit(frame, crit, target);
    report.crit = { ...crit, ...applied, location: target };
    report.steps.push(`Forced Critical on ${LOCATION_NAMES[target]}: ${crit.name}`);
  }

  return report;
}

// --- Critical hits (rules.md 6.2) ------------------------------------------

export function critTableFor(locKey) {
  return CRIT_TABLE_FOR[locKey];
}

/** Roll a critical for a location. `mod` is +1 for HEI ammo. */
export function rollCrit(locKey, { mod = 0, rng = Math.random, forcedRoll = null } = {}) {
  const raw = forcedRoll ?? rollDie(6, rng);
  const modified = raw + mod;
  const crit = lookupCrit(CRIT_TABLE_FOR[locKey], modified);
  return { ...crit, rawRoll: raw, mod, modifiedRoll: modified, location: locKey };
}

/**
 * Apply a critical's mechanical effect to the frame. Permanent effects land in
 * durable fields so later turns keep honoring them.
 */
export function applyCrit(frame, crit, locKey = crit.location) {
  const loc = frame.locations[locKey];
  const applied = { ...crit, location: locKey, notes: [] };

  switch (crit.effect) {
    case 'sensorFlicker':
      frame.sensorRangeCap = 5; // cleared in endPhase
      break;
    case 'commStatic':
      frame.commStatic = true;
      if (frame.systems) frame.systems.datalink = false;
      break;
    case 'pilotStunned':
      frame.pilotStunned = true;
      break;
    case 'sensorsDown':
      frame.sensorsDown = true;
      break;
    case 'initiativeDown3':
      frame.initiativeMod = (frame.initiativeMod || 0) - 3;
      break;
    case 'frameDestroyed':
      frame.destroyed = true;
      break;

    case 'systemGlitch':
      frame.systemGlitch = true;
      break;
    case 'capacitorLeak':
      frame.capacitorMaxMod = (frame.capacitorMaxMod || 0) - 2;
      frame.capacitor = Math.max(0, (frame.capacitor || 0) - 2);
      frame.ep = Math.max(0, (frame.ep || 0) - 2);
      break;
    case 'reactorDamage':
      frame.reactorMod = (frame.reactorMod || 0) - 2;
      break;
    case 'gyroLock':
      frame.gyroLock = true;
      break;
    case 'ammoExplosion': {
      // Only explosive ammo cooks off; inert Rail Gun slugs and energy weapons
      // do not. With no explosive ammo aboard, treat as Reactor Damage.
      if (hasExplosiveAmmo(frame)) {
        applied.pendingAmmoExplosion = true; // caller rolls 3d6, applies direct to torso
        applied.notes.push('Explosive ammo detonates: roll 3d6 direct to Torso');
      } else {
        frame.reactorMod = (frame.reactorMod || 0) - 2;
        applied.notes.push('No explosive ammo aboard — resolved as Reactor Damage (−2 EP/turn)');
      }
      break;
    }
    case 'coreMelt':
      frame.destroyed = true;
      applied.notes.push('2d6 damage to all adjacent hexes');
      break;

    case 'armWeaponsCostMore':
      for (const w of frame.weapons) if (w.loc === locKey) w.epMod = (w.epMod || 0) + 1;
      break;
    case 'weaponDestroyedChoice': {
      const candidates = frame.weapons.filter((w) => w.loc === locKey && !w.destroyed);
      applied.choices = candidates.map((w) => w.id);
      applied.notes.push(
        candidates.length
          ? 'Attacker chooses which weapon in this arm is destroyed'
          : 'No weapons left in this arm — no effect',
      );
      break;
    }
    case 'shoulderJammed':
      for (const w of frame.weapons) if (w.loc === locKey) w.forwardArcOnly = true;
      break;
    case 'armorToZero':
      loc.dr = 0;
      break;
    case 'ammoFeedCut':
      for (const w of frame.weapons) {
        if (w.loc === locKey && w.ammo) w.disabled = true;
      }
      break;
    case 'limbSevered':
      loc.destroyed = true;
      loc.is = 0;
      applyLocationDestruction(frame, locKey, { steps: applied.notes });
      break;

    case 'pilotCheckPenalty':
      frame.pilotCheckMod = (frame.pilotCheckMod || 0) - 1;
      break;
    case 'kneeLock':
      frame.kneeLock = true;
      break;
    case 'evasionLimitDown':
      frame.evasionLimitMod = (frame.evasionLimitMod || 0) - 1;
      frame.eva = Math.min(frame.eva || 0, effectiveEvasionLimit(frame));
      break;
    case 'jumpJetsDisabled':
      frame.jumpJetsDisabled = true;
      break;
    default:
      throw new Error(`Unhandled critical effect: ${crit.effect}`);
  }

  frame.crits = frame.crits || [];
  frame.crits.push({
    location: locKey,
    table: crit.table,
    roll: crit.modifiedRoll ?? crit.roll,
    name: crit.name,
    text: crit.text,
    round: frame.round ?? null,
  });

  return applied;
}

export function hasExplosiveAmmo(frame) {
  return frame.weapons.some((w) => {
    if (w.destroyed || !w.ammo) return false;
    const def = WEAPONS[w.key];
    if (!def?.explosiveAmmo) return false;
    return Object.values(w.ammo).some((count) => count > 0);
  });
}

// --- Weapons ----------------------------------------------------------------

export function weaponDef(weapon) {
  return WEAPONS[weapon.key];
}

/**
 * How many damage dice a weapon rolls, after the Prone penalty (rules.md 5.0, 6.3).
 *
 * Prone removes one die from the pool to a minimum of one. Flat bonuses survive
 * (a Rail Gun becomes 2d6+10), Rapid Fire loses a die from each burst, and
 * weapons that roll no damage dice are unaffected.
 */
export function damageDiceCount(frame, weapon, { bursts = 1 } = {}) {
  const def = WEAPONS[weapon.key];
  if (!def?.damage) return 0;
  const penalty = frame.prone ? 1 : 0;

  if (def.rapidFire) {
    const perBurst = Math.max(1, def.burstDice - penalty);
    return perBurst * bursts;
  }
  return Math.max(1, def.damage.dice - penalty);
}

/** Dice a missile warhead rolls, after the Prone penalty. */
export function warheadDiceCount(frame, spec) {
  if (!spec) return 0;
  return Math.max(1, spec.dice - (frame.prone ? 1 : 0));
}

export function weaponEPCost(weapon) {
  const base = weapon.epCost ?? WEAPONS[weapon.key].epCost;
  return Math.max(0, base + (weapon.epMod || 0));
}

export function weaponAmmoRemaining(weapon) {
  if (!weapon.ammo) return Infinity;
  return sum(Object.values(weapon.ammo));
}

/** Why a weapon cannot be fired right now, or null if it can. */
export function weaponBlockedReason(frame, weapon, { ammoType = null, bursts = 1 } = {}) {
  if (frame.destroyed) return 'Frame destroyed';
  if (weapon.destroyed) return 'Weapon destroyed';
  if (weapon.disabled) return 'Ammo feed cut';
  if (weapon.cooldown > 0) return `Cooling down (${weapon.cooldown} turn${weapon.cooldown > 1 ? 's' : ''})`;
  // Each weapon fires once per Combat Phase (rules.md 2.3).
  if (weapon.firedThisTurn) return 'Already fired this phase';

  const def = WEAPONS[weapon.key];
  if (def.rapidFire && bursts > MAX_FULL_AUTO_BURSTS) {
    return `Full Auto is limited to ${MAX_FULL_AUTO_BURSTS} bursts per attack`;
  }
  if (weapon.ammo) {
    const available = ammoType ? weapon.ammo[ammoType] || 0 : weaponAmmoRemaining(weapon);
    const needed = def.rapidFire ? bursts : 1;
    if (available < needed) return 'Out of ammunition';
  }

  const required = weaponEPCost(weapon) * (def.rapidFire ? bursts : 1);
  const mandatory = weapon.requiresOvercharge || 0;
  if (required + mandatory > (frame.ep || 0)) {
    return `Needs ${required + mandatory} EP, has ${frame.ep || 0}`;
  }
  if (mandatory > (frame.overchargeAvailable || 0)) {
    return `Requires ${mandatory} EP of banked Capacitor charge (has ${frame.overchargeAvailable || 0})`;
  }
  return null;
}

/** Deduct ammo, mark the weapon as fired, and set the cooldown after a shot. */
export function consumeWeapon(frame, weapon, { ammoType = null, bursts = 1, overcharged = false } = {}) {
  const def = WEAPONS[weapon.key];
  weapon.firedThisTurn = true;
  if (weapon.ammo) {
    const key = ammoType || Object.keys(weapon.ammo)[0];
    const count = def.rapidFire ? bursts : 1;
    weapon.ammo[key] = Math.max(0, (weapon.ammo[key] || 0) - count);
  }
  const cooldown = def.cooldown || 0;
  if (overcharged || cooldown) {
    // Overcharging any weapon triggers a 1-turn cooldown (rules.md 5.4).
    weapon.cooldown = Math.max(cooldown, overcharged ? 1 : 0);
  }
}

export function ammoTypeInfo(key) {
  return AMMO_TYPES[key] || null;
}

// --- Pilot checks (rules.md 6.4) -------------------------------------------

export function pilotCheck(frame, { modifier = 0, rng = Math.random, forcedRoll = null } = {}) {
  const roll = forcedRoll ?? roll2d6(rng).total;
  const terrainMod = TERRAIN[frame.terrain]?.pilotMod || 0;
  const pilotBonus = frame.pilotBonus || 0;
  const critMod = frame.pilotCheckMod || 0;
  const total = roll + terrainMod + pilotBonus + critMod + modifier;
  return {
    roll,
    terrainMod,
    pilotBonus,
    critMod,
    modifier,
    total,
    tn: PILOT_CHECK_TN,
    passed: total >= PILOT_CHECK_TN,
  };
}

// --- Collisions & Drop Strikes (rules.md 2.2) ------------------------------

export function collisionDicePool(frame, hexesMoved) {
  return massValue(frame) + hexesMoved;
}

export function dropStrikeDicePool(jumper, hexesJumped) {
  return massValue(jumper) + hexesJumped;
}

// --- End Phase (rules.md 2.4) ----------------------------------------------

export function endPhase(frame) {
  const capMax = effectiveCapacitorMax(frame);
  const pool = frame.ep || 0;
  const banked = Math.min(pool, capMax);
  const vented = pool - banked;

  frame.capacitor = banked;
  frame.overchargeAvailable = banked;
  frame.ep = 0;
  frame.eva = 0;
  frame.painted = false;
  frame.hexesMoved = 0;
  frame.epSpentThisTurn = 0;
  frame.sensorRangeCap = null; // Sensor Flicker lasts one turn
  frame.sensorsScrambled = false;

  for (const weapon of frame.weapons) {
    if (weapon.cooldown > 0) weapon.cooldown -= 1;
    weapon.firedThisTurn = false; // each weapon fires once per Combat Phase
  }

  return { banked, vented, capMax };
}

// --- Turn order (rules.md 2.2, 2.3) ----------------------------------------

/**
 * Activation runs lowest initiative first; Combat runs highest first. This flip
 * every round is the rule most worth automating.
 */
export function turnOrder(frames, phase) {
  const active = frames.filter((f) => !f.destroyed);
  const sorted = [...active].sort((a, b) => effectiveInitiative(a) - effectiveInitiative(b));
  return phase === 'combat' ? sorted.reverse() : sorted;
}
