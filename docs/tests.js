// Iron Protocol — rules engine test suite.
//
// Shared by tests.html (browser) and tools/run-tests.mjs (command line).
// Register a describe/it/eq/ok harness and call run(harness).
//
// Every die roll here is forced, so the suite is fully deterministic. Where a
// test encodes a worked example from rules.md, the section is named.

import * as R from './js/rules.js';
import { instantiate, FRAME_PRESETS, FRAME_KEYS, costOut } from './js/data/frames.js';
import { CRIT_TABLES, CRIT_TABLE_MAX, overkillDice, COUNTERMEASURE_CHECK_TN } from './js/data/tables.js';
import { diffInto } from './js/sync.js';
import { createFrame, createBattle, isCompatible, SCHEMA_VERSION } from './js/state.js';

const frame = (key, patch = {}) => Object.assign(instantiate(key), patch);
/** A deterministic rng walking a fixed list of d6 results. */
const seq = (...rolls) => { let i = 0; return () => (rolls[i++ % rolls.length] - 1) / 6 + 0.0001; };
const diff = (a, b) => { const out = {}; diffInto(a, b, '', out); return out; };

export function run({ describe, it, eq, ok }) {
  // --- Hit location table (rules.md 6.1) -------------------------------------
  describe('Hit Location Table');

  it('2 is a Torso Core Critical on every column', () => {
    for (const zone of ['front', 'rear', 'left', 'right']) {
      const r = R.lookupHitLocation(2, zone);
      eq([r.location, r.coreCritical], ['torso', true], `zone ${zone}`);
    }
  });

  it('12 is a Head hit on every column', () => {
    for (const zone of ['front', 'rear', 'left', 'right']) {
      eq(R.lookupHitLocation(12, zone).location, 'head', `zone ${zone}`);
    }
  });

  it('front and rear share a column — a rear attack finds no softer armor', () => {
    for (let roll = 2; roll <= 12; roll += 1) {
      eq(R.lookupHitLocation(roll, 'rear').location,
         R.lookupHitLocation(roll, 'front').location, `roll ${roll}`);
    }
  });

  it('a side attack concentrates on that side of the chassis', () => {
    eq(R.lookupHitLocation(4, 'left').location, 'leftArm');
    eq(R.lookupHitLocation(4, 'right').location, 'rightArm');
  });

  // --- Threshold armor (rules.md 2.3) ---------------------------------------
  describe('Armor DR is a threshold, not a pool');

  it('damage equal to DR bounces off with no effect at all', () => {
    const f = frame('vanguard'); // torso DR 6
    const r = R.applyDamage(f, 'torso', 6);
    eq([r.penetrated, r.critDice, r.drDegraded], [false, 0, false]);
    eq(f.locations.torso.dr, 6, 'DR must not degrade on a blocked hit');
  });

  it('damage must be STRICTLY greater than DR to penetrate', () => {
    const f = frame('vanguard');
    eq(R.applyDamage(f, 'torso', 7).penetrated, true);
    eq(f.locations.torso.dr, 5, 'penetration degrades DR by exactly 1');
  });

  it('a penetration degrades DR once, however big the hit', () => {
    const f = frame('colossus'); // torso DR 8
    R.applyDamage(f, 'torso', 30);
    eq(f.locations.torso.dr, 7);
  });

  it('DR never degrades below 0', () => {
    const f = frame('jackal');
    f.locations.torso.dr = 0;
    const r = R.applyDamage(f, 'torso', 5);
    eq([r.penetrated, f.locations.torso.dr], [true, 0]);
  });

  it('AP is subtracted from DR before the comparison', () => {
    const f = frame('colossus'); // torso DR 8
    eq(R.applyDamage(f, 'torso', 6, { apX: 3 }).penetrated, true, '6 vs effective DR 5');
  });

  it('a Core Critical treats Torso DR as 0 for the whole attack', () => {
    const f = frame('colossus');
    const r = R.applyDamage(f, 'torso', 3, { coreCritical: true });
    eq([r.dr, r.penetrated], [0, true]);
    eq(r.critDice, 1, 'Overkill is measured against 0, not the real armor');
  });

  // --- Overkill (rules.md 2.3) ----------------------------------------------
  describe('Overkill Margin');

  it('one crit die on any penetration, plus one per full 5 points of excess', () => {
    eq([overkillDice(1), overkillDice(4), overkillDice(5), overkillDice(10), overkillDice(11)],
       [1, 1, 2, 3, 3]);
  });

  it('rules.md 2.3 worked example: 16 damage vs DR 5 is 3 Criticals', () => {
    const f = frame('paladin');
    f.locations.torso.dr = 5;
    eq(R.applyDamage(f, 'torso', 16).critDice, 3);
  });

  it('no penetration means no crit dice', () => {
    eq(overkillDice(0), 0);
  });

  // --- Critical tables (rules.md 6.2) ---------------------------------------
  describe('Critical Hit Tables');

  it('the tables are different lengths: head 5, torso 8, arms and legs 6', () => {
    eq([CRIT_TABLE_MAX.head, CRIT_TABLE_MAX.torso, CRIT_TABLE_MAX.arm, CRIT_TABLE_MAX.leg],
       [5, 8, 6, 6]);
  });

  it('every table places Structural Fracture on the Severity Ladder at 4', () => {
    for (const t of ['head', 'torso', 'arm', 'leg']) {
      ok(CRIT_TABLES[t][4].name.includes('Structural Fracture'), `${t} slot 4`);
    }
  });

  it('torso slots 7 and 8 cannot be rolled naturally — only cascaded into', () => {
    const f = frame('colossus');
    eq(R.rollCrit(f, 'torso', { forcedRoll: 6 }).slot, 6, 'a natural 6 is Ammo Explosion');
  });

  it('a natural 6 on the Head resolves as Pilot K.O., the top of a 5-slot table', () => {
    eq(R.rollCrit(frame('colossus'), 'head', { forcedRoll: 6 }).slot, 5);
  });

  it('Cascading Failure climbs to the next unmarked slot', () => {
    const f = frame('colossus');
    f.locations.torso.crits = { 3: true, 4: true };
    const c = R.rollCrit(f, 'torso', { forcedRoll: 3 });
    eq([c.slot, c.cascaded], [5, true]);
  });

  it('HEI adds +1 before the cascade is resolved', () => {
    eq(R.rollCrit(frame('colossus'), 'torso', { forcedRoll: 3, mod: 1 }).slot, 4);
  });

  it('Structural Fracture drops that location to DR 0', () => {
    const f = frame('colossus');
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 4 }));
    eq(f.locations.torso.dr, 0);
  });

  it('Reactor Damage is permanent', () => {
    const f = frame('colossus');
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 5 }));
    eq(R.effectiveReactor(f), 16);
  });

  it('Capacitor Leak cuts the maximum and drains what is banked', () => {
    const f = frame('paladin', { capacitor: 8 });
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 3 }));
    eq([R.effectiveCapacitorMax(f), f.capacitor], [6, 6]);
  });

  // --- Ammo Explosion (rules.md 6.2, torso 6) -------------------------------
  describe('Ammo Explosion');

  it('detonates a live store and inflicts 2 further Torso Criticals', () => {
    const f = frame('paladin');
    const res = R.resolveCrits(f, 'torso', 1, { rng: seq(6, 1, 2, 3) });
    ok(res.length >= 3, `expected the explosion plus 2 follow-ups, got ${res.length}`);
    ok(f.weapons.find((w) => w.key === 'autocannon').empty, 'explosive ammo is spent');
  });

  it('with nothing left to cook off it becomes Reactor Damage instead', () => {
    const f = frame('colossus'); // inert slugs, no jump jets
    for (const w of f.weapons) w.empty = true;
    const before = R.effectiveReactor(f);
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 6 }));
    eq(R.effectiveReactor(f), before - 2);
  });

  it('Rail Gun slugs are inert and never count as a volatile store', () => {
    const f = frame('colossus');
    for (const w of f.weapons) if (w.key !== 'railGun') w.empty = true;
    eq(R.hasVolatileStore(f), false);
  });

  it('jump jet propellant counts as a volatile store', () => {
    const f = frame('jackal');
    for (const w of f.weapons) w.empty = true;
    eq(R.hasVolatileStore(f), true);
    f.jumpJetsEmpty = true;
    eq(R.hasVolatileStore(f), false);
  });

  // --- Destruction & transfer (rules.md 6.5) --------------------------------
  describe('Location Destruction & Damage Transfer');

  it('a severed arm loses its weapon', () => {
    const f = frame('colossus');
    R.applyCrit(f, R.rollCrit(f, 'leftArm', { forcedRoll: 6 }));
    ok(f.weapons.find((w) => w.loc === 'leftArm').destroyed);
  });

  it('hits on a severed limb blow through to the Torso', () => {
    const f = frame('vanguard');
    f.locations.leftArm.destroyed = true;
    const r = R.applyDamage(f, 'leftArm', 9);
    ok(r.transferred, 'expected a transfer report');
    eq(r.transferred.location, 'torso');
    eq(f.locations.torso.dr, 5, 'the Torso takes the degradation');
  });

  it('losing BOTH legs destroys the Frame (rules.md 6.5.4)', () => {
    const f = frame('paladin');
    R.applyCrit(f, R.rollCrit(f, 'leftLeg', { forcedRoll: 6 }));
    eq(R.isDestroyed(f), false, 'one leg is a crippling wound, not a kill');
    R.applyCrit(f, R.rollCrit(f, 'rightLeg', { forcedRoll: 6 }));
    eq(R.isDestroyed(f), true);
  });

  it('Containment Failure destroys the Frame', () => {
    const f = frame('colossus');
    f.locations.torso.crits = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true };
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 1 }));
    eq(R.isDestroyed(f), true);
  });

  it('Pilot K.O. destroys the Frame', () => {
    const f = frame('jackal');
    R.applyCrit(f, R.rollCrit(f, 'head', { forcedRoll: 5 }));
    eq(R.isDestroyed(f), true);
  });

  // --- Flank Speed (rules.md 2.2) -------------------------------------------
  describe('Flank Speed');

  it('is gained by exiting 4 hexes, not 3', () => {
    const f = frame('vanguard');
    f.hexesMoved = 3; R.updateFlankSpeed(f); eq(f.flankSpeed, false);
    f.hexesMoved = 4; R.updateFlankSpeed(f); eq(f.flankSpeed, true);
  });

  it('a jump of 2+ hexes grants it regardless of distance moved', () => {
    const f = frame('jackal');
    f.hexesMoved = 2; R.updateFlankSpeed(f, { jumpedHexes: 2 });
    eq(f.flankSpeed, true);
  });

  it('a single-hop jump does not', () => {
    const f = frame('jackal');
    f.hexesMoved = 1; R.updateFlankSpeed(f, { jumpedHexes: 1 });
    eq(f.flankSpeed, false);
  });

  it('an Assault chassis is capped one hex short, permanently', () => {
    eq(R.effectiveMovementLimit(frame('colossus')), 3);
  });

  it('water denies it outright', () => {
    const f = frame('vanguard', { terrain: 'waterShallow', hexesMoved: 5 });
    R.updateFlankSpeed(f);
    eq(f.flankSpeed, false);
  });

  it('a Prone Frame cannot have it', () => {
    const f = frame('vanguard', { prone: true, hexesMoved: 6 });
    R.updateFlankSpeed(f);
    eq(f.flankSpeed, false);
  });

  // --- Defensive rerolls (rules.md 2.3, 3.3) --------------------------------
  describe('Flank Speed & Cover rerolls');

  it('Flank Speed and Cover stack', () => {
    const f = frame('vanguard', { flankSpeed: true, terrain: 'woodsHeavy' });
    eq(R.rerollAllowance(f), 3, '1 from Flank Speed + 2 from Heavy Cover');
  });

  it('AoE bypasses Flank Speed and Cover both', () => {
    const f = frame('vanguard', { flankSpeed: true, terrain: 'woodsHeavy' });
    eq(R.rerollAllowance(f, { aoe: true }), 0);
  });

  it('Rapid Fire bypasses Flank Speed but not Cover', () => {
    const f = frame('vanguard', { flankSpeed: true, terrain: 'woodsLight' });
    eq(R.rerollAllowance(f, { rapidFire: true }), 1);
  });

  it('blow-through denies Flank Speed rerolls, Cover still applies', () => {
    const f = frame('vanguard', { flankSpeed: true, terrain: 'woodsLight' });
    eq(R.rerollAllowance(f, { transferred: true }), 1);
  });

  it('rerolls target the highest die and are optional', () => {
    eq(R.applyRerolls([5, 4, 3], 1, { forced: [2] }).dice, [2, 4, 3]);
    eq(R.applyRerolls([2, 1, 3], 2, { forced: [6, 6] }).dice, [2, 1, 3],
       'nothing above the floor is worth rerolling');
  });

  // --- Countermeasure Check (rules.md 4.2) ----------------------------------
  describe('Countermeasure Check');

  it('negates on 4, 5 or 6 and lets 1-3 through', () => {
    eq(COUNTERMEASURE_CHECK_TN, 4);
    for (const roll of [1, 2, 3]) eq(R.countermeasureCheck({ forcedRoll: roll }).negated, false, `roll ${roll}`);
    for (const roll of [4, 5, 6]) eq(R.countermeasureCheck({ forcedRoll: roll }).negated, true, `roll ${roll}`);
  });

  it('a cartridge is spent whether it worked or not', () => {
    const f = frame('vanguard');
    const r = R.useCountermeasure(f, { key: 'chaff', kind: 'cartridge' }, { forcedRoll: 1, forcedAmmoRoll: 1 });
    eq([r.negated, r.ammo.empty, f.chaffEmpty], [false, true, true]);
  });

  it('a sustained suite is never expended', () => {
    const f = frame('vanguard', { ecmActive: true });
    const r = R.useCountermeasure(f, { key: 'ecm', kind: 'sustained' }, { forcedRoll: 5 });
    eq([r.negated, r.ammo], [true, null]);
  });

  it('offers only the systems that answer the attacking band', () => {
    const f = frame('vanguard', { ecmActive: true });
    eq(R.availableCountermeasures(f, 'rad').map((c) => c.key), ['chaff', 'ecm']);
    eq(R.availableCountermeasures(f, 'ir').map((c) => c.key), ['flares']);
    eq(R.availableCountermeasures(f, 'vis').map((c) => c.key), []);
  });

  it('the Vow of Honesty forbids every deception system', () => {
    const f = frame('vanguard', { ecmActive: true, vow: 'honesty' });
    eq(R.availableCountermeasures(f, 'rad'), []);
  });

  // --- Ammo Die (rules.md 5.0) ----------------------------------------------
  describe('Ammo Die');

  it('an autocannon single burst runs Empty only on a 1', () => {
    eq(R.rollAmmoDie(1, { forcedRoll: 1 }).empty, true);
    eq(R.rollAmmoDie(1, { forcedRoll: 2 }).empty, false);
  });

  it('Full Auto burns the belt three times as fast — Empty on 1-3', () => {
    const ac = frame('jackal').weapons.find((w) => w.key === 'autocannon');
    eq([R.ammoDieFor(ac, { bursts: 1 }), R.ammoDieFor(ac, { bursts: 3 })], [1, 3]);
  });

  it('countermeasure cartridges run Empty on a 1 — roughly six uses', () => {
    const f = frame('paladin');
    R.useCountermeasure(f, { key: 'flares', kind: 'cartridge' }, { forcedRoll: 5, forcedAmmoRoll: 2 });
    eq(f.flaresEmpty, false);
    R.useCountermeasure(f, { key: 'flares', kind: 'cartridge' }, { forcedRoll: 5, forcedAmmoRoll: 1 });
    eq(f.flaresEmpty, true);
  });

  it('an Empty weapon cannot fire', () => {
    const f = frame('jackal', { ep: 10 });
    const ac = f.weapons.find((w) => w.key === 'autocannon');
    ac.empty = true;
    eq(R.weaponBlockedReason(f, ac), 'Out of ammunition');
  });

  it('each weapon may fire only once per Combat Phase', () => {
    const f = frame('jackal', { ep: 10 });
    const laser = f.weapons.find((w) => w.key === 'laser');
    laser.firedThisTurn = true;
    eq(R.weaponBlockedReason(f, laser), 'Already fired this Combat Phase');
  });

  // --- Rapid Fire (rules.md 5.0) --------------------------------------------
  describe('Rapid Fire');

  it('each die is tested separately against the DR at declaration', () => {
    const f = frame('specter'); // arm DR 3
    const r = R.resolveRapidFire(f, 'leftArm', { bursts: 1, forcedDice: [6, 4, 1] });
    eq(r.bursts[0].through, 2, '6 and 4 beat DR 3; 1 does not');
  });

  it('one Critical per BURST that gets a die through, not per die', () => {
    const f = frame('specter');
    eq(R.resolveRapidFire(f, 'leftArm', { bursts: 1, forcedDice: [6, 6, 6] }).critDice, 1);
  });

  it('a three-burst Full Auto produces at most 3 Criticals', () => {
    const f = frame('specter');
    const r = R.resolveRapidFire(f, 'leftArm', { bursts: 3, forcedDice: [6, 6, 6, 6, 6, 6, 6, 6, 6] });
    eq(r.critDice, 3);
  });

  it('armor degrades by 1 in total, however many rounds got through', () => {
    const f = frame('specter');
    R.resolveRapidFire(f, 'leftArm', { bursts: 3, forcedDice: [6, 6, 6, 6, 6, 6, 6, 6, 6] });
    eq(f.locations.leftArm.dr, 2, 'DR 3 → 2, once');
  });

  it('nothing through means no crit and no degradation', () => {
    const f = frame('colossus'); // torso DR 8: a single d6 can never beat it
    const r = R.resolveRapidFire(f, 'torso', { bursts: 3, forcedDice: [6, 6, 6, 6, 6, 6, 6, 6, 6] });
    eq([r.critDice, f.locations.torso.dr], [0, 8]);
  });

  it('Rapid Fire never uses the Overkill Margin', () => {
    const f = frame('jackal'); // arm DR 2
    const r = R.resolveRapidFire(f, 'leftArm', { bursts: 1, forcedDice: [6, 6, 6] });
    eq(r.critDice, 1, 'three 6s against DR 2 is still one Critical');
  });

  // --- Special weapons (rules.md 5.2) ---------------------------------------
  describe('Guided Missiles, EMP & Disruptor');

  it('Cluster rolls three locations, one per column', () => {
    const f = frame('colossus');
    const res = R.resolveCluster(f, { forcedLocations: [7, 7, 7], forcedDamage: [10, 10, 10] });
    eq(res.map((r) => r.zone), ['left', 'front', 'right']);
    eq(res.every((r) => r.hit.location === 'torso'), true);
  });

  it('High Explosive splashes 1d6 into every adjacent location', () => {
    const f = frame('jackal');
    const res = R.resolveHighExplosive(f, 'torso', { forcedPrimary: 12, forcedSplash: [6, 6, 6, 6, 6] });
    eq(res.length, 6, 'the torso plus its five neighbours');
    ok(res.slice(1).every((r) => r.splash));
  });

  it('EMP deals no damage but criticals every location already at 0 DR', () => {
    const f = frame('jackal');
    f.locations.leftArm.dr = 0;
    f.locations.rightArm.dr = 0;
    const r = R.resolveEMP(f, { rng: seq(1, 1) });
    eq(r.hits.map((h) => h.location), ['leftArm', 'rightArm']);
    eq(f.locations.torso.dr, 3, 'armored locations are untouched');
    eq(f.sensorsScrambled, true);
  });

  it('EMP severs the Tactical Datalink', () => {
    const f = frame('paladin');
    R.resolveEMP(f);
    eq(f.datalinkSevered, true);
  });

  it('the Disruptor forces a Critical and drains EP, ignoring armor entirely', () => {
    const f = frame('colossus', { ep: 10 });
    const r = R.resolveDisruptor(f, 'torso', { forcedDrain: 4, forcedCrits: [1] });
    eq(r.crits.length, 1);
    eq([f.ep, f.locations.torso.dr], [6, 8], 'DR is never touched by a Disruptor');
  });

  it('an Overcharged Disruptor forces a second Critical', () => {
    const f = frame('colossus', { ep: 10 });
    eq(R.resolveDisruptor(f, 'torso', { overcharged: true, forcedDrain: 1, forcedCrits: [1, 2] }).crits.length, 2);
  });

  // --- Energy (rules.md 2.1, 5.3) -------------------------------------------
  describe('Energy Phase & Overcharge');

  it('banked charge joins the pool and sets the Overcharge Allowance', () => {
    const f = frame('vanguard', { capacitor: 4 });
    R.energyPhase(f);
    eq([f.ep, f.overchargeAvailable, f.capacitor], [16, 4, 0]);
  });

  it('a Frame that banked nothing cannot Overcharge at all', () => {
    const f = frame('vanguard');
    R.energyPhase(f);
    eq(R.spendEP(f, 2, { overcharge: 2 }).ok, false);
  });

  it('sustained suites bill every Energy Phase', () => {
    const f = frame('vanguard', { ecmActive: true });
    const r = R.energyPhase(f);
    eq([r.upkeep, f.ep], [2, 10]);
  });

  it('Adaptive Skin upkeep is exempt from the 5 EP IR threshold', () => {
    const f = frame('specter', { adaptiveSkinActive: true });
    R.energyPhase(f);
    eq(f.epSpentThisTurn, 0, 'a Skin runs cold by design');
    eq(R.isIRLockable(f), false);
  });

  it('spending 5 EP makes a Frame IR-lockable', () => {
    const f = frame('vanguard');
    R.energyPhase(f);
    R.spendEP(f, 5);
    eq(R.isIRLockable(f), true);
  });

  it('water cools the reactor', () => {
    eq(R.energyPhase(frame('jackal', { terrain: 'waterShallow' })).cooling, 1);
    eq(R.energyPhase(frame('jackal', { terrain: 'waterDeep' })).cooling, 2);
  });

  it('Overcharge adds dice, never a flat bonus', () => {
    const f = frame('colossus');
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    eq(R.overchargeDiceFor(lance, 4), 2, '2 EP per die, capped at +2d6');
    eq(R.damageDiceCount(f, lance, { overchargeDice: 2 }), 5);
  });

  it('the Rail Gun cannot fire without its 6 EP Capacitor Overcharge', () => {
    const f = frame('paladin', { ep: 20, overchargeAvailable: 0 });
    const rg = f.weapons.find((w) => w.key === 'railGun');
    ok(R.weaponBlockedReason(f, rg, { overcharge: 0 }).includes('Overcharge'));
  });

  it('firing it always triggers a 1-turn cooldown', () => {
    const f = frame('paladin', { ep: 20, overchargeAvailable: 6 });
    const rg = f.weapons.find((w) => w.key === 'railGun');
    R.consumeWeapon(f, rg, { overcharge: 6 });
    eq(rg.cooldown, 1);
  });

  it('Prone costs a damage die, to a minimum of one', () => {
    const f = frame('colossus', { prone: true });
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    eq(R.damageDiceCount(f, lance), 2, '3d6 → 2d6');
  });

  it('Hardpoint Failure costs another', () => {
    const f = frame('colossus', { hardpointFailure: { leftArm: true } });
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    eq(R.damageDiceCount(f, lance), 2);
  });

  // --- Movement (rules.md 2.2) ----------------------------------------------
  describe('Movement');

  it('reverse costs double a walk', () => {
    const f = frame('vanguard');
    eq([R.movementCost(f, 'walk'), R.movementCost(f, 'reverse')], [1, 2]);
  });

  it('terrain and climbing surcharge a walk', () => {
    eq(R.movementCost(frame('vanguard'), 'walk', { terrain: 'woodsLight', elevationDelta: 1 }), 3);
  });

  it('a jump pays 2 EP per hex and nothing else', () => {
    eq(R.movementCost(frame('jackal'), 'jump', { hexes: 3, terrain: 'woodsHeavy', elevationDelta: 2 }), 6);
  });

  it('Knee Lock adds 1 EP per hex walked', () => {
    eq(R.movementCost(frame('vanguard', { kneeLock: true }), 'walk'), 2);
  });

  it('a Prone Frame crawl-pivots at 2 EP, or 3 on a crippled leg', () => {
    const f = frame('paladin', { prone: true });
    eq(R.movementCost(f, 'pivot'), 2);
    f.locations.leftLeg.destroyed = true;
    eq(R.movementCost(f, 'pivot'), 3);
  });

  it('a Torso Twist is free until Servo Lock', () => {
    eq(R.movementCost(frame('vanguard'), 'torsoTwist'), 0);
    eq(R.movementCost(frame('vanguard', { servoLock: true }), 'torsoTwist'), 2);
  });

  it('Heavy and Assault chassis can never jump', () => {
    ok(R.movementBlockedReason(frame('colossus', { ep: 20 }), 'jump').includes('never jump'));
  });

  it('Heavy Woods are impassable on foot to a Heavy chassis', () => {
    const f = frame('paladin', { ep: 20 });
    ok(R.movementBlockedReason(f, 'walk', { terrain: 'woodsHeavy' }).includes('impassable'));
  });

  it('a crippled Frame can never walk again', () => {
    const f = frame('paladin', { ep: 20 });
    f.locations.leftLeg.destroyed = true;
    ok(R.movementBlockedReason(f, 'walk').includes('Crippled'));
  });

  it('the Movement Limit is enforced', () => {
    const f = frame('colossus', { ep: 20, hexesMoved: 3 });
    ok(R.movementBlockedReason(f, 'walk').includes('Movement Limit'));
  });

  // --- Pilot Checks (rules.md 6.4) ------------------------------------------
  describe('Pilot Checks');

  it('a crippled leg imposes −2, whether severed or Actuator Destroyed', () => {
    const sev = frame('paladin'); sev.locations.leftLeg.destroyed = true;
    const act = frame('paladin'); act.locations.leftLeg.actuatorDestroyed = true;
    eq(R.pilotCheck(sev, { forcedRoll: 7 }).breakdown.crippledLeg, -2);
    eq(R.pilotCheck(act, { forcedRoll: 7 }).breakdown.crippledLeg, -2);
  });

  it('the Vow of Courage covers rising as well as staying upright', () => {
    const f = frame('paladin', { vow: 'courage' });
    f.locations.leftLeg.destroyed = true;
    eq(R.pilotCheck(f, { forcedRoll: 6 }).passed, true, '6 − 2 + 2 = 6, exactly TN');
  });

  it('a dishonored pilot loses the bonus and the Boon', () => {
    const f = frame('paladin', { vow: 'courage', pilotBonus: 3, dishonored: true });
    const c = R.pilotCheck(f, { forcedRoll: 5 });
    eq([c.breakdown.pilot, c.breakdown.courage], [0, 0]);
  });

  it('terrain modifies every check', () => {
    eq(R.pilotCheck(frame('jackal', { terrain: 'paved' }), { forcedRoll: 5 }).breakdown.terrain, 1);
    eq(R.pilotCheck(frame('jackal', { terrain: 'rough' }), { forcedRoll: 5 }).breakdown.terrain, -1);
  });

  it('standing on a crippled leg spends the EP whether it works or not', () => {
    const f = frame('paladin', { ep: 10, prone: true });
    f.locations.leftLeg.destroyed = true;
    const r = R.performMovement(f, 'standUp', { forcedRoll: 2 });
    eq([r.stoodUp, f.ep, f.prone], [false, 7, true]);
  });

  it('a Frame with both legs intact stands automatically', () => {
    const f = frame('vanguard', { ep: 10, prone: true });
    eq(R.performMovement(f, 'standUp').stoodUp, true);
  });

  // --- Falls, collisions, drop strikes (rules.md 2.2, 3.2) ------------------
  describe('Falling, Collisions & Drop Strikes');

  it('a fall rolls 1d6 per Level as ONE pooled roll', () => {
    const f = frame('vanguard');
    const r = R.resolveFall(f, 3, { forcedLocation: 7, forcedDamage: 11 });
    eq([r.damage, r.report.penetrated, f.prone], [11, true, true]);
  });

  it('collision damage is Mass Value x Speed', () => {
    eq(R.collisionDamage(frame('jackal'), 4), 4, 'a Light frame at full tilt manages 4');
    eq(R.collisionDamage(frame('colossus'), 3), 12);
  });

  it('a Drop Strike gives the jumper half, rounded up', () => {
    eq(R.dropStrikeDamage(frame('jackal'), 4), { target: 4, jumper: 2 });
    eq(R.dropStrikeDamage(frame('specter'), 3), { target: 6, jumper: 3 });
  });

  // --- End Phase (rules.md 2.4) ---------------------------------------------
  describe('End Phase');

  it('banks up to the Capacitor Max and vents the rest', () => {
    const f = frame('jackal', { ep: 8 }); // capacitor max 3
    const r = R.endPhase(f);
    eq([r.banked, r.vented, f.capacitor, f.ep], [3, 5, 3, 0]);
  });

  it('clears Flank Speed and one-turn effects', () => {
    const f = frame('vanguard', { flankSpeed: true, servoStutter: true, hexesMoved: 5 });
    R.endPhase(f);
    eq([f.flankSpeed, f.servoStutter, f.hexesMoved], [false, false, 0]);
  });

  it('decrements cooldowns and clears the once-per-phase fired flag', () => {
    const f = frame('paladin');
    const rg = f.weapons.find((w) => w.key === 'railGun');
    rg.cooldown = 1; rg.firedThisTurn = true;
    R.endPhase(f);
    eq([rg.cooldown, rg.firedThisTurn], [0, false]);
  });

  it('an Electrical Fire burns one Torso Critical every End Phase', () => {
    const f = frame('colossus', { electricalFire: true });
    const r = R.endPhase(f, { rng: seq(1) });
    ok(r.fire && r.fire.length === 1);
    eq(f.locations.torso.crits[1], true);
  });

  // --- Turn order (rules.md 2.2, 2.3) ---------------------------------------
  describe('Turn Order');

  it('Activation is lowest Initiative first, Combat highest first', () => {
    const frames = [frame('jackal'), frame('colossus'), frame('vanguard')];
    eq(R.turnOrder(frames, 'activation').map((f) => f.name), ['Colossus', 'Vanguard', 'Jackal']);
    eq(R.turnOrder(frames, 'combat').map((f) => f.name), ['Jackal', 'Vanguard', 'Colossus']);
  });

  it('a named pilot bonus shifts the order', () => {
    const ace = frame('colossus', { pilotBonus: 3 });
    eq(R.effectiveInitiative(ace), 6);
    eq(R.turnOrder([ace, frame('paladin')], 'combat').map((f) => f.name), ['Colossus', 'Paladin']);
  });

  it('destroyed Frames drop out of the order', () => {
    eq(R.turnOrder([frame('jackal', { destroyed: true }), frame('vanguard')], 'combat').length, 1);
  });

  // --- Worked example (rules.md 2.3.1) --------------------------------------
  describe('rules.md 2.3.1 — Colossus Thermal Lance vs Vanguard');

  it('reproduces the book exactly, step for step', () => {
    const vanguard = frame('vanguard', { flankSpeed: true });

    // 6. Roll damage: 3d6 comes up 5, 4, 3 = 12
    const pool = [5, 4, 3];
    eq(R.sum(pool), 12);

    // 7. The Vanguard has Flank Speed: one reroll, and the 5 becomes a 2
    eq(R.rerollAllowance(vanguard), 1);
    const { dice } = R.applyRerolls(pool, 1, { forced: [2] });
    eq(R.sum(dice), 9, 'new total 2 + 4 + 3');

    // 8-10. 9 vs Torso DR 6 penetrates; DR degrades; excess 3 earns no Overkill
    const report = R.applyDamage(vanguard, 'torso', R.sum(dice));
    eq([report.dr, report.penetrated, report.excess], [6, true, 3]);
    eq(vanguard.locations.torso.dr, 5, 'DR 6 → 5, permanently');
    eq(report.critDice, 1, 'excess 3 is under 5, so no extra crit dice');

    // 11. A crit roll of 3 on the Torso table is Capacitor Leak
    const crit = R.rollCrit(vanguard, 'torso', { forcedRoll: 3 });
    eq(crit.name, 'Capacitor Leak');
    R.applyCrit(vanguard, crit);
    eq(R.effectiveCapacitorMax(vanguard), 4, 'Capacitor Max 6 → 4');
  });

  // --- Frame data (rules.md 7.2, 8, frames/*.md) ----------------------------
  describe('Frame Data');

  it('every roster frame costs out to its printed point value exactly', () => {
    for (const key of FRAME_KEYS) {
      const p = FRAME_PRESETS[key];
      eq(costOut(p), p.points, p.name);
    }
  });

  it('no frame carries Internal Structure or an Evasion stat', () => {
    for (const key of FRAME_KEYS) {
      const f = instantiate(key);
      eq(f.evasionLimit, undefined, key);
      for (const loc of Object.values(f.locations)) eq(loc.is, undefined, key);
    }
  });

  it('crit slots are a map, so per-slot sync writes never collide', () => {
    const f = instantiate('colossus');
    eq(Array.isArray(f.locations.torso.crits), false);
    f.locations.torso.crits[4] = true;
    eq(f.locations.torso.crits, { 4: true });
  });

  it('the Colossus is the only chassis that can never reach Flank Speed', () => {
    eq(FRAME_KEYS.filter((k) => FRAME_PRESETS[k].movementLimit < 4), ['colossus']);
  });

  it('armor DR matches the printed frame sheets', () => {
    eq(FRAME_PRESETS.colossus.locations, { head: 6, torso: 8, leftArm: 6, rightArm: 6, leftLeg: 7, rightLeg: 7 });
    eq(FRAME_PRESETS.jackal.locations, { head: 3, torso: 3, leftArm: 2, rightArm: 2, leftLeg: 3, rightLeg: 3 });
  });

  // --- State model & schema migration (docs/js/state.js) --------------------
  describe('State model & schema guard');

  it('a new battle is stamped with the current schema version', () => {
    eq(createBattle({ code: 'TEST' }).version, SCHEMA_VERSION);
  });

  it('createFrame produces something the engine can actually run', () => {
    const f = createFrame('paladin', { ownerId: 'test' });
    eq(R.effectiveReactor(f), 14);
    eq(R.isDestroyed(f), false);
    eq(f.locations.torso.dr, 7);
    R.applyDamage(f, 'torso', 9);
    eq(f.locations.torso.dr, 6, 'the engine mutates it correctly');
  });

  it('createFrame keeps identity separate from combat state', () => {
    const f = createFrame('jackal', { ownerId: 'p1', team: 'b', callsign: 'Wraith', pilotBonus: 2 });
    eq([f.ownerId, f.team, f.callsign, f.pilotBonus], ['p1', 'b', 'Wraith', 2]);
    eq(R.effectiveInitiative(f), 14, 'the pilot bonus reaches the engine');
  });

  it('accepts a battle it just created', () => {
    const b = createBattle({ code: 'AAAA' });
    b.frames.x = createFrame('vanguard', { ownerId: 'test' });
    eq(isCompatible(b), true);
  });

  it('rejects a save carrying the retired Internal Structure model', () => {
    const b = createBattle({ code: 'AAAA' });
    b.frames.x = createFrame('vanguard', { ownerId: 'test' });
    b.frames.x.locations.torso.is = 16;
    eq(isCompatible(b), false, 'an IS pool means pre-overhaul rules');
  });

  it('rejects a save carrying an Evasion stat', () => {
    const b = createBattle({ code: 'AAAA' });
    b.frames.x = createFrame('vanguard', { ownerId: 'test' });
    b.frames.x.evasionLimit = 4;
    eq(isCompatible(b), false);
  });

  it('rejects a save from a different schema version', () => {
    const b = createBattle({ code: 'AAAA' });
    b.version = SCHEMA_VERSION - 1;
    eq(isCompatible(b), false);
  });

  it('rejects crit slots stored as an array — they must merge per path', () => {
    const b = createBattle({ code: 'AAAA' });
    b.frames.x = createFrame('vanguard', { ownerId: 'test' });
    b.frames.x.locations.torso.crits = [4];
    eq(isCompatible(b), false);
  });

  it('rejects junk without throwing', () => {
    for (const junk of [null, undefined, 42, 'battle', {}, { version: SCHEMA_VERSION, frames: { a: {} } }]) {
      eq(isCompatible(junk), false, String(junk));
    }
  });

  // --- Sync (docs/js/sync.js) -----------------------------------------------
  describe('Sync — path diff');

  it('emits only the paths that changed', () => {
    eq(diff({ a: 1, b: { c: 2, d: 3 } }, { a: 1, b: { c: 9, d: 3 } }), { 'b/c': 9 });
  });

  it('marking one crit slot writes one path', () => {
    const out = {};
    diffInto({ crits: { 1: true } }, { crits: { 1: true, 4: true } }, 'locations/torso', out);
    eq(out, { 'locations/torso/crits/4': true });
  });

  it('two players marking different slots do not collide', () => {
    const a = diff({ crits: {} }, { crits: { 3: true } });
    const b = diff({ crits: {} }, { crits: { 6: true } });
    eq([Object.keys(a)[0], Object.keys(b)[0]], ['crits/3', 'crits/6']);
  });

  it('deletes removed keys with null rather than dropping them', () => {
    eq(diff({ frames: { a: { ep: 1 } } }, { frames: {} }), { 'frames/a': null });
  });
}
