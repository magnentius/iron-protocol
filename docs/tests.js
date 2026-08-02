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
import { battleTranscript, transcriptFilename } from './js/transcript.js';
import { meter } from './js/ui/dom.js';
import {
  addFrame, advancePhase, createFrame, createBattle, getBattle, isCompatible, logAction,
  removeFrame, renameFrame, setBattle,
  SCHEMA_VERSION,
} from './js/state.js';

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

  // --- Terrain & Cover (rules.md 3.1, 3.3) ----------------------------------
  describe('Terrain & Cover');

  it('Light Woods grant one reroll, Heavy Woods two', () => {
    eq(R.rerollAllowance(frame('vanguard', { terrain: 'woodsLight' })), 1);
    eq(R.rerollAllowance(frame('vanguard', { terrain: 'woodsHeavy' })), 2);
  });

  it('standing adjacent to a building is Heavy Cover', () => {
    eq(R.rerollAllowance(frame('vanguard', { terrain: 'urbanAdjacent' })), 2);
  });

  it('open ground gives nothing', () => {
    for (const t of ['clear', 'paved', 'rough', 'waterShallow', 'waterDeep']) {
      eq(R.rerollAllowance(frame('vanguard', { terrain: t })), 0, t);
    }
  });

  it('Cover stacks on top of Flank Speed', () => {
    eq(R.rerollAllowance(frame('vanguard', { terrain: 'woodsHeavy', flankSpeed: true })), 3);
  });

  it('Cover survives what strips Flank Speed', () => {
    const f = frame('vanguard', { terrain: 'woodsHeavy', flankSpeed: true });
    eq(R.rerollAllowance(f, { rapidFire: true }), 2, 'Rapid Fire bypasses Flank Speed only');
    eq(R.rerollAllowance(f, { transferred: true }), 2, 'blow-through likewise');
    eq(R.rerollAllowance(f, { aoe: true }), 0, 'AoE bypasses both');
  });

  it('terrain surcharges entry and water denies Flank Speed', () => {
    eq(R.movementCost(frame('vanguard'), 'walk', { terrain: 'woodsHeavy' }), 3);
    const f = frame('vanguard', { terrain: 'waterDeep', hexesMoved: 6 });
    R.updateFlankSpeed(f);
    eq(f.flankSpeed, false);
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
    // Enough EP for the IRCM suite — a powered countermeasure is gated on energy
    // the way a cartridge is gated on its magazine.
    const f = frame('vanguard', { ecmActive: true, ep: 6 });
    eq(R.availableCountermeasures(f, 'rad').map((c) => c.key), ['chaff', 'ecm']);
    eq(R.availableCountermeasures(f, 'ir').map((c) => c.key), ['dircm']);
    eq(R.availableCountermeasures(f, 'vis').map((c) => c.key), []);
  });

  it('an IRCM suite is offered only when its EP can be paid', () => {
    eq(R.availableCountermeasures(frame('vanguard', { ep: 2 }), 'ir').map((c) => c.key), ['dircm']);
    eq(R.availableCountermeasures(frame('vanguard', { ep: 1 }), 'ir').map((c) => c.key), [],
       'a frame that cannot pay cannot defend itself on infrared');
    eq(R.availableCountermeasures(frame('vanguard', { ep: 0, capacitor: 2 }), 'ir').map((c) => c.key),
       ['dircm'], 'the reserve counts');
  });

  it('the IRCM suite bills its EP whether it worked or not', () => {
    const hit = frame('vanguard', { ep: 6 });
    R.useCountermeasure(hit, { key: 'dircm', kind: 'powered' }, { forcedRoll: 5 });
    const miss = frame('vanguard', { ep: 6 });
    R.useCountermeasure(miss, { key: 'dircm', kind: 'powered' }, { forcedRoll: 1 });
    eq([hit.ep, miss.ep], [4, 4]);
  });

  it('the IRCM suite never runs out — it has no Ammo Die', () => {
    const f = frame('vanguard', { ep: 20 });
    for (let i = 0; i < 8; i += 1) {
      const r = R.useCountermeasure(f, { key: 'dircm', kind: 'powered' }, { forcedRoll: 5 });
      eq(r.ammo, null, `use ${i + 1}`);
    }
    eq(f.ep, 4, 'eight activations at 2 EP');
    eq(R.availableCountermeasures(f, 'ir').map((c) => c.key), ['dircm'], 'still available');
  });

  it('IRCM competes with Overcharge for the same banked charge', () => {
    const f = frame('vanguard', { ep: 0, capacitor: 4 });
    R.useCountermeasure(f, { key: 'dircm', kind: 'powered' }, { forcedRoll: 2 });
    eq(f.capacitor, 2, 'jamming spent half the Overcharge budget');
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
    R.useCountermeasure(f, { key: 'chaff', kind: 'cartridge' }, { forcedRoll: 5, forcedAmmoRoll: 2 });
    eq(f.chaffEmpty, false);
    R.useCountermeasure(f, { key: 'chaff', kind: 'cartridge' }, { forcedRoll: 5, forcedAmmoRoll: 1 });
    eq(f.chaffEmpty, true);
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

  it('the Energy Phase does not touch the Capacitor — the reserve persists', () => {
    const f = frame('vanguard', { capacitor: 4 });
    R.energyPhase(f);
    eq([f.ep, f.capacitor], [12, 4], 'pool is this turn\u2019s generation; the reserve keeps');
  });

  it('the reserve is spendable on anything, pool first', () => {
    const f = frame('vanguard', { ep: 12, capacitor: 4 });
    const r = R.spendEP(f, 14);
    eq([r.ok, f.ep, f.capacitor], [true, 0, 2], '12 from the pool, 2 from the reserve');
  });

  it('a reserve survives round after round until it is spent', () => {
    const f = frame('vanguard', { capacitor: 3 });
    for (let i = 0; i < 5; i += 1) { R.energyPhase(f); R.endPhase(f); }
    ok(f.capacitor > 0, 'five untouched rounds and the charge is still there');
  });

  it('movement is paid out of the reserve once the pool is dry', () => {
    const f = frame('jackal', { ep: 0, capacitor: 3 });
    const r = R.performMovement(f, 'pivot');
    eq([r.ok, f.ep, f.capacitor], [true, 0, 2]);
  });

  it('a cost spanning both is split pool-first', () => {
    const f = frame('jackal', { ep: 1, capacitor: 3 });
    R.performMovement(f, 'reverse'); // 2 EP
    eq([f.ep, f.capacitor], [0, 2], '1 from the pool, 1 from the reserve');
  });

  it('nothing can be paid when pool and reserve together fall short', () => {
    const f = frame('jackal', { ep: 0, capacitor: 1 });
    eq(R.performMovement(f, 'reverse').ok, false, '2 EP needed, 1 available');
  });

  it('the Rail Gun draws its mandatory Overcharge from the Capacitor', () => {
    const f = frame('paladin', { ep: 20, capacitor: 6 });
    const rg = f.weapons.find((w) => w.key === 'railGun');
    eq(R.consumeWeapon(f, rg, { overcharge: 6 }).ok, true);
    eq(f.capacitor, 0, 'the whole reserve went into the shot');
    const g = frame('paladin', { ep: 20, capacitor: 5 });
    eq(R.consumeWeapon(g, g.weapons.find((w) => w.key === 'railGun'), { overcharge: 6 }).ok, false,
       'a full pool cannot cover an Overcharge the Capacitor is short of');
  });

  it('a Frame with an empty Capacitor cannot Overcharge, however full its pool', () => {
    const f = frame('vanguard');
    R.energyPhase(f);
    eq([f.ep > 0, R.spendEP(f, 2, { overcharge: 2 }).ok], [true, false],
       'Overcharge is paid exclusively from banked charge (rules.md 5.3)');
  });

  it('Overcharge comes off the Capacitor, base cost off the pool', () => {
    const f = frame('vanguard', { ep: 12, capacitor: 4 });
    R.spendEP(f, 2, { overcharge: 2 });
    eq([f.ep, f.capacitor], [10, 2]);
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
    const f = frame('paladin', { ep: 20, capacitor: 6 });
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

  // --- Torso Facing (rules.md 1.2, 1.3, 2.2) --------------------------------
  describe('Torso Facing');

  it('a fresh Frame is centred', () => {
    eq(instantiate('vanguard').torsoFacing, 'center');
  });

  it('twisting actually changes the facing', () => {
    const f = frame('vanguard', { ep: 10 });
    const r = R.twistTorso(f, 'left');
    eq([r.ok, r.from, r.to, f.torsoFacing], [true, 'center', 'left', 'left']);
  });

  it('is free until a Servo Lock critical', () => {
    const f = frame('vanguard', { ep: 10 });
    eq(R.movementCost(f, 'torsoTwist'), 0);
    R.applyCrit(f, R.rollCrit(f, 'torso', { forcedRoll: 2 }));
    eq([f.servoLock, R.movementCost(f, 'torsoTwist')], [true, 2]);
  });

  it('a Servo Locked twist actually costs the 2 EP', () => {
    const f = frame('vanguard', { ep: 10, servoLock: true });
    R.twistTorso(f, 'right');
    eq(f.ep, 8);
  });

  it('only once per activation', () => {
    const f = frame('vanguard', { ep: 10 });
    eq(R.twistTorso(f, 'left').ok, true);
    const second = R.twistTorso(f, 'right');
    eq([second.ok, f.torsoFacing], [false, 'left'], 'the second twist is refused');
    ok(second.reason.includes('Already twisted'));
  });

  it('the allowance comes back next turn', () => {
    const f = frame('vanguard', { ep: 10 });
    R.twistTorso(f, 'left');
    R.endPhase(f);
    R.energyPhase(f);
    eq(R.twistTorso(f, 'center').ok, true);
  });

  it('twisting to the facing it already has is refused', () => {
    const f = frame('vanguard', { ep: 10 });
    eq(R.twistTorso(f, 'center').ok, false);
  });

  it('a Prone Frame cannot twist', () => {
    const f = frame('vanguard', { ep: 10, prone: true });
    eq(R.twistTorso(f, 'left').ok, false);
  });

  it('arms cover four hexsides, torso mounts only three', () => {
    const f = frame('paladin');
    const arm = f.weapons.find((w) => w.loc === 'leftArm');
    const torso = f.weapons.find((w) => w.loc === 'torso');
    ok(R.weaponArc(f, arm).arcs.includes('Left-Rear'), 'an arm reaches its own flank');
    ok(!R.weaponArc(f, torso).arcs.includes('Rear'), 'a torso battery is fixed forward');
  });

  // --- Jump Jet propellant (rules.md 2.2) -----------------------------------
  describe('Jump Jet propellant');

  it('a jump rolls the Ammo Die on landing', () => {
    const f = frame('jackal', { ep: 20 });
    const r = R.performMovement(f, 'jump', { hexes: 2, forcedAmmoRoll: 4 });
    eq([r.ok, r.propellant.rolled, r.propellant.empty, f.jumpJetsEmpty], [true, 4, false, false]);
  });

  it('a 1 or 2 leaves the tanks dry for the rest of the battle', () => {
    const f = frame('jackal', { ep: 20 });
    R.performMovement(f, 'jump', { hexes: 2, forcedAmmoRoll: 2 });
    eq(f.jumpJetsEmpty, true);
    ok(R.movementBlockedReason(f, 'jump').includes('dry'));
  });

  it('walking never touches the propellant', () => {
    const f = frame('jackal', { ep: 20 });
    R.performMovement(f, 'walk');
    eq([f.jumpJetsEmpty, R.performMovement(f, 'walk').propellant], [false, null]);
  });

  it('dry tanks stop counting as a volatile store', () => {
    const f = frame('jackal', { ep: 20 });
    for (const w of f.weapons) w.empty = true;
    eq(R.hasVolatileStore(f), true, 'propellant is volatile while it lasts');
    R.performMovement(f, 'jump', { hexes: 2, forcedAmmoRoll: 1 });
    eq(R.hasVolatileStore(f), false, 'a spent scout is a safer one');
  });

  it('a 2+ hex jump grants Flank Speed; a single hop does not', () => {
    const two = frame('jackal', { ep: 20 });
    R.performMovement(two, 'jump', { hexes: 2, forcedAmmoRoll: 6 });
    eq(two.flankSpeed, true);
    const one = frame('jackal', { ep: 20 });
    R.performMovement(one, 'jump', { hexes: 1, forcedAmmoRoll: 6 });
    eq(one.flankSpeed, false);
  });

  it('Stand Up is refused when the Frame is already standing', () => {
    const f = frame('vanguard', { ep: 12 });
    eq(R.movementBlockedReason(f, 'standUp'), 'Already standing');
  });

  it('and refusing it does not silently burn the 3 EP', () => {
    const f = frame('vanguard', { ep: 12 });
    const r = R.performMovement(f, 'standUp');
    eq([r.ok, f.ep], [false, 12], 'the EP must be untouched');
  });

  it('a Prone Frame can still stand', () => {
    const f = frame('vanguard', { ep: 12, prone: true });
    eq(R.movementBlockedReason(f, 'standUp'), null);
    eq([R.performMovement(f, 'standUp').ok, f.prone, f.ep], [true, false, 9]);
  });

  it('no movement action both costs EP and does nothing', () => {
    // Guards against the class of bug where a control looks wired but is not.
    for (const action of ['walk', 'reverse', 'jump', 'standUp', 'torsoTwist']) {
      const f = frame('jackal', { ep: 30, prone: action === 'standUp' });
      if (R.movementBlockedReason(f, action, { hexes: 2 })) continue;
      const before = JSON.stringify([f.hexesMoved, f.prone, f.flankSpeed, f.torsoFacing, f.jumpJetsEmpty]);
      const res = R.performMovement(f, action, { hexes: 2, forcedAmmoRoll: 6, facing: 'left' });
      if (!res.ok) continue; // refusing outright is fine; silently charging is not
      const after = JSON.stringify([f.hexesMoved, f.prone, f.flankSpeed, f.torsoFacing, f.jumpJetsEmpty]);
      ok(before !== after, `${action} spent EP but changed nothing else`);
    }
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

  it('empties the pool whether the EP was banked or vented', () => {
    const under = frame('jackal', { ep: 2 });   // fits in the capacitor
    const over = frame('jackal', { ep: 8 });    // does not
    R.endPhase(under); R.endPhase(over);
    eq([under.ep, under.capacitor, over.ep, over.capacitor], [0, 2, 0, 3]);
  });

  it('reports the pool it started from, so the log can show the transfer', () => {
    const f = frame('vanguard', { ep: 4 });
    const r = R.endPhase(f);
    eq([r.pool, r.banked, r.vented], [4, 4, 0]);
  });

  it('a Capacitor Leak from the End Phase fire shrinks the bank that same phase', () => {
    // Torso crit 3 is Capacitor Leak: max drops 2, so less banks and more vents.
    const f = frame('vanguard', { ep: 99, electricalFire: true });
    const before = R.effectiveCapacitorMax(f);
    const r = R.endPhase(f, { rng: seq(3) });
    eq([r.capMax, f.capacitor], [before - 2, before - 2]);
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

  // state.js persists through localStorage; the CLI runner has no DOM. Node does
  // expose a global `localStorage`, but it is inert without --localstorage-file,
  // so test whether it actually works rather than whether the name is defined.
  function withStorage(fn) {
    let usable = false;
    try { usable = typeof globalThis.localStorage?.setItem === 'function'; } catch { /* throws when unconfigured */ }
    if (usable) return fn();

    const prior = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    const m = new Map();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k) => (m.has(k) ? m.get(k) : null),
        setItem: (k, v) => m.set(k, String(v)),
        removeItem: (k) => m.delete(k),
      },
    });
    try {
      return fn();
    } finally {
      if (prior) Object.defineProperty(globalThis, 'localStorage', prior);
      else delete globalThis.localStorage;
    }
  }

  /** Drive a battle from the Energy Phase to the phase named. */
  function runTo(phase) {
    const b = createBattle({ code: 'ENDP' });
    b.frames.x = createFrame('jackal', { ownerId: 'test' }); // reactor 8, cap max 3
    setBattle(b, { silent: true });
    while (getBattle().phase !== phase) advancePhase();
    return getBattle().frames.x;
  }

  it('the End Phase banks on entry, so the charge is visible while it is showing', () => {
    // The regression this guards: settling on the way *out* of the End Phase put
    // the banking and the next Energy Phase in one tap, and Energy empties the
    // capacitor back into the pool. Nothing ever rendered with charge banked, so
    // leftover EP appeared to flow straight into the next round.
    withStorage(() => {
      const f = runTo('end');
      eq([f.ep, f.capacitor], [0, 3], 'pool emptied, 3 banked while the End Phase is on screen');
    });
  });

  it('the reserve is still there at the next Energy Phase', () => {
    withStorage(() => {
      runTo('end');
      advancePhase(); // End -> next round's Energy
      const b = getBattle();
      eq(b.round, 2);
      eq([b.frames.x.ep, b.frames.x.capacitor], [8, 3],
         'pool is this round\u2019s reactor output; the banked 3 is untouched');
    });
  });

  it('re-entering the End Phase does not bank twice', () => {
    withStorage(() => {
      const f = runTo('end');
      const banked = f.capacitor;
      advancePhase(); advancePhase(); advancePhase(); advancePhase(); // all the way round
      eq(getBattle().phase, 'end');
      eq(getBattle().frames.x.capacitor, banked, 'one bank per End Phase');
    });
  });

  it('the reroll ceiling matches what can actually be held at once', () => {
    // Flank Speed 1 + Heavy Woods 2 + Vow of Loyalty 1.
    const f = frame('vanguard', { terrain: 'woodsHeavy', flankSpeed: true, loyaltyCover: 1 });
    eq(R.rerollAllowance(f), R.MAX_REROLL_ALLOWANCE);
  });

  it('a meter with an unknown maximum shows the value, never "undefined"', () => {
    const html = meter('Rerolls', 2, undefined, 'reroll');
    eq(/undefined|NaN/.test(html), false, html);
    ok(html.includes('>2<') || html.includes('>2'), 'the value itself still shows');
  });

  // --- Battle log ------------------------------------------------------------
  describe('Battle log');

  const battleLog = () => getBattle().log;
  const findEntry = (re) => battleLog().find((e) => re.test(e.text));

  it('marks the start of every phase', () => {
    withStorage(() => {
      runTo('end');
      const marks = battleLog().filter((e) => e.kind === 'phase').map((e) => e.text);
      eq(marks.includes('Energy Phase'), true);
      eq(marks.includes('Activation Phase'), true);
      eq(marks.includes('Combat Phase'), true);
      eq(marks.includes('End Phase'), true);
    });
  });

  it('records the phase as a field, not inside the text', () => {
    withStorage(() => {
      const f = runTo('end');
      const e = f.log.find((x) => /unused|already empty/.test(x.text));
      ok(e, 'the End Phase banking is logged');
      eq(e.phase, 'end', 'stamped structurally');
      eq(/End Phase/.test(e.text), false, 'and not repeated in the prose');
    });
  });

  it('a phase entry carries each frame arithmetic as expandable detail', () => {
    withStorage(() => {
      runTo('end');
      const energy = battleLog().find((e) => e.text === 'Energy Phase');
      eq(energy.detail.length, 1);
      eq(/Jackal: \+8 EP/.test(energy.detail[0]), true, energy.detail[0]);
    });
  });

  it('Activation and Combat record the order, which reverses between them', () => {
    withStorage(() => {
      const b = createBattle({ code: 'ORDR' });
      b.frames.a = createFrame('jackal', { ownerId: 't' });   // Init 12
      b.frames.b = createFrame('paladin', { ownerId: 't' });  // Init 5
      setBattle(b, { silent: true });
      while (getBattle().phase !== 'combat') advancePhase();
      const act = battleLog().find((e) => e.text === 'Activation Phase');
      const com = battleLog().find((e) => e.text === 'Combat Phase');
      eq(/Paladin/.test(act.detail[1]), true, 'Activation opens with the lowest Initiative');
      eq(/Jackal/.test(com.detail[1]), true, 'Combat opens with the highest');
    });
  });

  it('a frame deployed after generation still shows where its EP came from', () => {
    withStorage(() => {
      const b = createBattle({ code: 'LATE' });
      setBattle(b, { silent: true });
      addFrame('jackal', { ownerId: 't' });   // triggers round 1 generation
      addFrame('paladin', { ownerId: 't' });  // arrives after it
      const late = findEntry(/Paladin deployed/);
      ok(late.detail, 'the deploy entry carries its energy, since it missed the phase entry');
      eq(/\+14 EP/.test(late.detail[0]), true, late.detail[0]);
    });
  });

  it('Activation Phase actions reach the battle log, not just the frame', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'ACTV' }), { silent: true });
      const f = addFrame('jackal', { ownerId: 't' });
      logAction(f, 'walk', 'Walk', 'Walk — 1 EP', 1);
      const e = getBattle().log[0];
      eq(e.text, 'Jackal: Walk — 1 EP');
      eq(f.log[0].text, 'Walk — 1 EP', 'and still reaches the frame log');
    });
  });

  it('repeated steps of the same kind coalesce instead of flooding the log', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'COAL' }), { silent: true });
      const f = addFrame('jackal', { ownerId: 't' });
      const before = getBattle().log.length;
      for (let i = 0; i < 4; i += 1) logAction(f, 'walk', 'Walk', `Walk — 1 EP`, 1);
      const log = getBattle().log;
      eq(log.length, before + 1, 'four taps, one entry');
      eq(log[0].text, 'Jackal: Walk ×4 — 4 EP');
      eq(log[0].detail.length, 4, 'every individual step is still there');
    });
  });

  it('a different action starts a new entry rather than merging', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'MIXD' }), { silent: true });
      const f = addFrame('jackal', { ownerId: 't' });
      logAction(f, 'walk', 'Walk', 'Walk — 1 EP', 1);
      logAction(f, 'pivot', 'Pivot', 'Pivot — 1 EP', 1);
      logAction(f, 'walk', 'Walk', 'Walk — 1 EP', 1);
      eq(getBattle().log.slice(0, 3).map((e) => e.text),
         ['Jackal: Walk — 1 EP', 'Jackal: Pivot — 1 EP', 'Jackal: Walk — 1 EP']);
    });
  });

  it('two frames moving in turn do not merge into each other', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'TWOF' }), { silent: true });
      const a = addFrame('jackal', { ownerId: 't' });
      const b = addFrame('paladin', { ownerId: 't' });
      logAction(a, 'walk', 'Walk', 'Walk — 1 EP', 1);
      logAction(b, 'walk', 'Walk', 'Walk — 1 EP', 1);
      eq(getBattle().log.slice(0, 2).map((e) => e.text),
         ['Paladin: Walk — 1 EP', 'Jackal: Walk — 1 EP']);
    });
  });

  it('banked charge persists across rounds until it is spent', () => {
    withStorage(() => {
      const f = runTo('end');
      eq(f.capacitor, 3, 'banked at the End Phase');
      advancePhase();
      eq([f.ep, f.capacitor], [8, 3], 'a new pool, and the reserve untouched');
    });
  });

  it('the End Phase adds to the reserve rather than replacing it', () => {
    withStorage(() => {
      const f = runTo('end');            // Jackal: cap max 3, banks 3
      eq(f.capacitor, 3);
      advancePhase();                    // round 2 Energy, pool 8
      f.ep = 1;                          // spend almost everything
      while (getBattle().phase !== 'end') advancePhase();
      eq(f.capacitor, 3, 'already full — the extra 1 overflows and vents');
    });
  });

  it('the Energy Phase entry names the reserve it left alone', () => {
    withStorage(() => {
      runTo('end');
      advancePhase();
      const e = getBattle().log.find((x) => x.text === 'Energy Phase' && x.round === 2);
      ok(/Capacitor holds 3 EP in reserve/.test(e.detail[0]), e.detail[0]);
    });
  });

  it('stamps battle entries with the round and phase they happened in', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'STMP' }), { silent: true });
      addFrame('jackal', { ownerId: 't' });
      const e = findEntry(/deployed/);
      eq([e.round, e.phase], [1, 'energy']);
    });
  });

  // --- Callsigns -------------------------------------------------------------
  describe('Same-model callsigns');

  const deploy = (key, opts = {}) => addFrame(key, { ownerId: 't', ...opts });
  const names = () => Object.values(getBattle().frames).map((f) => f.callsign);

  it('a lone frame keeps the plain model name', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'ONE1' }), { silent: true });
      deploy('vanguard');
      eq(names(), ['Vanguard']);
    });
  });

  it('a second of the same model renames the first retroactively', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'TWO2' }), { silent: true });
      deploy('vanguard');
      deploy('vanguard');
      eq(names(), ['Vanguard Alpha', 'Vanguard Bravo']);
    });
  });

  it('further frames continue down the phonetic alphabet', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'MANY' }), { silent: true });
      for (let i = 0; i < 4; i += 1) deploy('vanguard');
      eq(names(), ['Vanguard Alpha', 'Vanguard Bravo', 'Vanguard Charlie', 'Vanguard Delta']);
    });
  });

  it('different models are lettered independently', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'MIXD' }), { silent: true });
      deploy('vanguard'); deploy('jackal');
      deploy('vanguard'); deploy('jackal');
      eq(names(), ['Vanguard Alpha', 'Jackal Alpha', 'Vanguard Bravo', 'Jackal Bravo']);
    });
  });

  it('an opponent\u2019s identical frame is left alone', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'OPPO' }), { silent: true });
      deploy('vanguard');
      addFrame('vanguard', { ownerId: 'them' });
      eq(names(), ['Vanguard', 'Vanguard'], 'suffixing across owners would be a sync conflict');
    });
  });

  it('a callsign supplied by the caller is never renamed', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'NAMD' }), { silent: true });
      deploy('vanguard', { callsign: 'Warhorse' });
      deploy('vanguard');
      eq(names(), ['Warhorse', 'Vanguard'], 'and the newcomer has no sibling to disambiguate from');
    });
  });

  it('withdrawing one does not reshuffle the rest', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'GONE' }), { silent: true });
      deploy('vanguard'); deploy('vanguard'); deploy('vanguard');
      const alpha = Object.values(getBattle().frames).find((f) => f.phonetic === 'Alpha');
      removeFrame(alpha.id);
      eq(names(), ['Vanguard Bravo', 'Vanguard Charlie'], 'the log already calls them that');
      deploy('vanguard');
      eq(names().includes('Vanguard Alpha'), true, 'the freed letter is available again');
    });
  });

  it('the retroactive rename is recorded in the log', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'RNAM' }), { silent: true });
      deploy('vanguard'); deploy('vanguard');
      ok(getBattle().log.some((e) => e.text === 'Vanguard is now Vanguard Alpha'),
         JSON.stringify(getBattle().log.map((e) => e.text)));
    });
  });

  it('a custom callsign replaces the letter and opts out of lettering', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'CUST' }), { silent: true });
      deploy('vanguard'); const b2 = deploy('vanguard');
      renameFrame(b2.id, 'Warhorse');
      eq(names(), ['Vanguard Alpha', 'Warhorse']);
      eq(getBattle().frames[b2.id].phonetic, undefined, 'the letter is gone, not just hidden');
    });
  });

  it('clearing the field reverts to the model name and re-letters', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'REVT' }), { silent: true });
      deploy('vanguard'); const b2 = deploy('vanguard');
      renameFrame(b2.id, 'Warhorse');
      renameFrame(b2.id, '   ');
      eq(names(), ['Vanguard Alpha', 'Vanguard Bravo'], 'back under the app\u2019s naming');
    });
  });

  it('reverting re-letters a sibling that was left bare', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'BARE' }), { silent: true });
      const a = deploy('vanguard', { callsign: 'Warhorse' });
      deploy('vanguard');            // no ambiguity, so it stays plain
      eq(names(), ['Warhorse', 'Vanguard']);
      renameFrame(a.id, '');         // now there are two Vanguards again
      eq(names().sort(), ['Vanguard Alpha', 'Vanguard Bravo']);
    });
  });

  it('a renamed frame does not letter later arrivals', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'LATR' }), { silent: true });
      const a = deploy('vanguard');
      renameFrame(a.id, 'Warhorse');
      deploy('vanguard');
      eq(names(), ['Warhorse', 'Vanguard'], 'nothing to disambiguate');
    });
  });

  it('a callsign is trimmed and length-capped', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'TRIM' }), { silent: true });
      const f = deploy('vanguard');
      renameFrame(f.id, '  ' + 'x'.repeat(60) + '  ');
      eq(getBattle().frames[f.id].callsign.length, 24);
    });
  });

  it('the rename is logged on both the battle and the frame', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'RLOG' }), { silent: true });
      const f = deploy('vanguard');
      renameFrame(f.id, 'Warhorse');
      ok(getBattle().log.some((e) => e.text === 'Vanguard is now Warhorse'));
      ok(getBattle().frames[f.id].log.some((e) => /Callsign changed from Vanguard/.test(e.text)));
    });
  });

  it('renaming to the same name logs nothing', () => {
    withStorage(() => {
      setBattle(createBattle({ code: 'SAME' }), { silent: true });
      const f = deploy('vanguard');
      const before = getBattle().log.length;
      renameFrame(f.id, 'Vanguard');
      eq(getBattle().log.length, before);
    });
  });

  // --- Transcript export -----------------------------------------------------
  describe('Battle log export');

  const AT = Date.parse('2026-08-01T14:32:05');

  function exported() {
    const f = runTo('end');
    logAction(f, 'walk', 'Walk', 'Walk — 1 EP', 1);
    return battleTranscript(getBattle(), { now: AT });
  }

  it('carries a header, the roster and every round', () => {
    withStorage(() => {
      const t = exported();
      ok(t.includes('IRON PROTOCOL — BATTLE LOG'), 'header');
      ok(t.includes('Room ENDP'), 'room code');
      ok(/Jackal — IF-25L/.test(t), 'roster names the frame and designation');
      ok(t.includes('ROUND 1'), 'round heading');
    });
  });

  it('reads forwards — oldest entry first, opposite of the display order', () => {
    withStorage(() => {
      // Scope past the header, which names the phase the battle is currently in.
      const body = exported().slice(exported().indexOf('ROUND 1'));
      ok(body.indexOf('Energy Phase') < body.indexOf('End Phase'),
         'the Energy Phase must appear before the End Phase');
    });
  });

  it('includes the detail that the app hides behind a tap', () => {
    withStorage(() => {
      const t = exported();
      ok(/· Jackal: \+8 EP/.test(t), 'the Energy Phase arithmetic is written out');
      ok(/· Walk — 1 EP/.test(t), 'and so is each movement step');
    });
  });

  it('appends the per-frame logs, which hold what the shared log does not', () => {
    withStorage(() => {
      const t = exported();
      ok(t.includes('FRAME LOGS'), 'section present');
      ok(t.indexOf('FRAME LOGS') > t.indexOf('ROUND 1'), 'after the battle log');
    });
  });

  it('names the file after the room, round and date', () => {
    withStorage(() => {
      runTo('end');
      eq(transcriptFilename(getBattle(), AT), 'iron-protocol-ENDP-r1-2026-08-01.txt');
    });
  });

  it('survives a battle with nothing logged yet', () => {
    const t = battleTranscript(createBattle({ code: 'MTPY' }), { now: AT });
    ok(t.includes('No entries yet.'), t.slice(0, 120));
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

  it('resetting clears the battle but keeps the room code', () => {
    // A changed id would orphan a synced battle and let the peer overwrite it.
    const b = createBattle({ code: 'ABCD' });
    b.frames.x = createFrame('vanguard', { ownerId: 'test' });
    b.round = 5;
    const fresh = createBattle({ code: b.id });
    eq([fresh.id, Object.keys(fresh.frames).length, fresh.round], ['ABCD', 0, 1]);
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
