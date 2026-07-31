// Iron Protocol — rules engine test suite.
//
// Shared by tests.html (browser) and tools/run-tests.mjs (command line).
// Register a describe/it/eq/ok harness and call run(harness).

import * as R from './js/rules.js';
import { createFrame } from './js/state.js';
import { CRIT_TABLES } from './js/data/tables.js';
import { diffInto } from './js/sync.js';

const frame = (key, patch = {}) => Object.assign(createFrame(key, { ownerId: 'test' }), patch);

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

  it('front and rear share a column', () => {
    for (let roll = 2; roll <= 12; roll++) {
      eq(R.lookupHitLocation(roll, 'front').location, R.lookupHitLocation(roll, 'rear').location, `roll ${roll}`);
    }
  });

  it('a roll of 3 differs per hit zone', () => {
    eq(R.lookupHitLocation(3, 'front').location, 'rightArm', 'front');
    eq(R.lookupHitLocation(3, 'left').location, 'leftLeg', 'left side');
    eq(R.lookupHitLocation(3, 'right').location, 'rightLeg', 'right side');
  });

  it('7 and 8 are always Torso', () => {
    for (const zone of ['front', 'left', 'right']) {
      eq(R.lookupHitLocation(7, zone).location, 'torso');
      eq(R.lookupHitLocation(8, zone).location, 'torso');
    }
  });

  it('9 front is Left Leg but 9 from the sides is Torso', () => {
    eq(R.lookupHitLocation(9, 'front').location, 'leftLeg');
    eq(R.lookupHitLocation(9, 'left').location, 'torso');
    eq(R.lookupHitLocation(9, 'right').location, 'torso');
  });

  // --- The worked example from rules.md 2.3.1 --------------------------------
  describe('rules.md 2.3.1 — Colossus Thermal Lance vs Vanguard');

  it('12 damage − 3 EVA − 5 DR = 4 to Internal Structure', () => {
    const vanguard = frame('vanguard', { eva: 3 });
    const report = R.applyDamage(vanguard, 'torso', 12, { evasion: R.evasionAgainst(vanguard, { zone: 'front' }) });
    eq(report.afterEvasion, 9, 'after evasion');
    eq(report.dr, 5, 'armor DR applied');
    eq(report.toIS, 4, 'damage to internal structure');
  });

  it('Torso IS drops 12 → 8 and DR permanently degrades 5 → 4', () => {
    const vanguard = frame('vanguard', { eva: 3 });
    R.applyDamage(vanguard, 'torso', 12, { evasion: 3 });
    eq(vanguard.locations.torso.is, 8, 'internal structure');
    eq(vanguard.locations.torso.dr, 4, 'armor DR');
  });

  it('a crit roll of 3 on the Torso is Reactor Damage, −2 EP/turn permanently', () => {
    const vanguard = frame('vanguard');
    const crit = R.rollCrit('torso', { forcedRoll: 3 });
    eq(crit.name, 'Reactor Damage');
    R.applyCrit(vanguard, crit);
    eq(vanguard.reactorMod, -2, 'reactor modifier');
    eq(R.effectiveReactor(vanguard), 10, 'effective reactor (12 − 2)');
  });

  // --- Damage pipeline --------------------------------------------------------
  describe('Damage, Armor & Degradation');

  it('armor that holds takes no damage and does not degrade', () => {
    const f = frame('vanguard', { eva: 3 });
    const report = R.applyDamage(f, 'torso', 7, { evasion: 3 });
    eq(report.toIS, 0, 'no structure damage');
    eq(report.drDegraded, false, 'DR intact');
    eq(f.locations.torso.dr, 5, 'DR unchanged');
    eq(f.locations.torso.is, 12, 'IS unchanged');
  });

  it('AP reduces effective DR', () => {
    const f = frame('vanguard');
    const report = R.applyDamage(f, 'torso', 6, { apX: 3 });
    eq(report.dr, 2, 'DR 5 − AP 3');
    eq(report.toIS, 4, 'damage through');
  });

  it('a Core Critical bypasses DR entirely but still degrades it', () => {
    const f = frame('colossus');
    const report = R.applyDamage(f, 'torso', 6, { treatDRAsZero: true });
    eq(report.toIS, 6, 'full damage to IS despite DR 7');
    eq(f.locations.torso.dr, 6, 'DR still degrades by 1');
  });

  it('DR never degrades below 0', () => {
    const f = frame('jackal');
    f.locations.leftArm.dr = 0;
    R.applyDamage(f, 'leftArm', 3);
    eq(f.locations.leftArm.dr, 0);
  });

  it('Armor DR cannot go negative from AP either', () => {
    const f = frame('jackal');
    const report = R.applyDamage(f, 'leftArm', 4, { apX: 5 });
    eq(report.dr, 0, 'DR floors at 0');
    eq(report.toIS, 4);
  });

  // --- Destruction and transfer (rules.md 6.5) --------------------------------
  describe('Location Destruction & Damage Transfer');

  it('excess damage from a severed arm transfers to the Torso', () => {
    const f = frame('jackal'); // left arm 4 IS / 1 DR, torso 8 IS
    const report = R.applyDamage(f, 'leftArm', 10); // 10 − 1 DR = 9, 4 destroys, 5 excess
    ok(f.locations.leftArm.destroyed, 'arm destroyed');
    eq(f.locations.leftArm.is, 0, 'arm IS');
    ok(report.transferred, 'transfer report present');
    eq(f.locations.torso.is, 3, 'torso 8 − 5 excess');
    eq(f.locations.torso.dr, 2, 'transfer bypasses armor, so torso DR does not degrade');
  });

  it('a hit on an already-severed limb blows through to the Torso', () => {
    const f = frame('jackal');
    f.locations.rightArm.destroyed = true;
    f.locations.rightArm.is = 0;
    const report = R.applyDamage(f, 'rightArm', 5, { evasion: 2 });
    ok(report.transferred, 'transferred');
    eq(f.locations.torso.is, 3, 'full 5 to torso, bypassing EVA and DR');
  });

  it('severing a weapon arm destroys the weapons mounted in it', () => {
    const f = frame('vanguard'); // left arm: 3 DR / 8 IS, autocannon mounted
    R.applyDamage(f, 'leftArm', 11); // 11 − 3 DR = 8, exactly severs it
    const autocannon = f.weapons.find((w) => w.loc === 'leftArm');
    ok(autocannon.destroyed, 'weapon destroyed with the arm');
    eq(R.weaponBlockedReason(f, autocannon), 'Weapon destroyed');
  });

  it('losing one leg knocks the frame prone and immobilizes it', () => {
    const f = frame('vanguard'); // left leg: 4 DR / 10 IS
    R.applyDamage(f, 'leftLeg', 14);
    ok(f.prone, 'prone');
    ok(f.immobilized, 'immobilized');
    ok(!f.destroyed, 'still in the fight');
  });

  it('losing both legs disables the frame', () => {
    const f = frame('vanguard');
    R.applyDamage(f, 'leftLeg', 14);
    R.applyDamage(f, 'rightLeg', 14);
    ok(f.destroyed, 'frame disabled');
  });

  it('massive overkill on a limb blows through and kills the frame', () => {
    const f = frame('vanguard'); // arm 3 DR / 8 IS, torso 12 IS
    R.applyDamage(f, 'leftArm', 40); // 37 through, 8 severs the arm, 29 into a 12 IS torso
    ok(f.locations.leftArm.destroyed, 'arm severed');
    ok(f.destroyed, 'torso overwhelmed — frame destroyed');
  });

  it('Torso destruction destroys the frame', () => {
    const f = frame('jackal');
    R.applyDamage(f, 'torso', 40);
    ok(f.destroyed);
  });

  it('Head destruction destroys the frame', () => {
    const f = frame('jackal');
    R.applyDamage(f, 'head', 40);
    ok(f.destroyed);
  });

  // --- Evasion (rules.md 1.3, 3.3, 6.3) --------------------------------------
  describe('Evasion, Cover & Hit Zones');

  it('terrain cover adds to movement evasion', () => {
    const f = frame('vanguard', { eva: 3, terrain: 'woodsLight' });
    eq(R.evasionAgainst(f, { zone: 'front' }), 4, '3 EVA + 1 light cover');
  });

  it('a rear attack bypasses movement evasion but not cover', () => {
    const f = frame('vanguard', { eva: 3, terrain: 'woodsHeavy' });
    eq(R.evasionAgainst(f, { zone: 'rear' }), 2, 'heavy cover only');
  });

  it('a prone frame keeps cover but loses movement evasion', () => {
    const f = frame('vanguard', { eva: 4, terrain: 'woodsLight', prone: true });
    eq(R.evasionAgainst(f, { zone: 'front' }), 1, 'cover only');
  });

  it('AoE damage bypasses evasion entirely', () => {
    const f = frame('vanguard', { eva: 4, terrain: 'woodsHeavy' });
    eq(R.evasionAgainst(f, { aoe: true }), 0);
  });

  it('Tracer painting strips 1 EVA', () => {
    const f = frame('vanguard', { eva: 3, painted: true });
    eq(R.evasionAgainst(f, { zone: 'front' }), 2);
  });

  it('deep water caps the evasion limit at 1', () => {
    const f = frame('jackal', { terrain: 'waterDeep' });
    eq(R.effectiveEvasionLimit(f), 1, 'Jackal limit 6 capped to 1');
  });

  // --- Energy phase (rules.md 2.1) -------------------------------------------
  describe('Energy Phase');

  it('generates reactor EP and rolls banked capacitor charge into the pool', () => {
    const f = frame('vanguard', { capacitor: 4 });
    const report = R.energyPhase(f);
    eq(report.generated, 12, 'reactor');
    eq(report.pool, 16, '12 generated + 4 banked');
    eq(f.ep, 16);
    eq(f.overchargeAvailable, 4, 'only banked EP may pay for overcharge');
  });

  it('shallow water cooling adds 1 EP', () => {
    const f = frame('jackal', { terrain: 'waterShallow' });
    const report = R.energyPhase(f);
    eq(report.generated, 9, 'reactor 8 + 1 cooling');
  });

  it('deep water cooling adds 2 EP', () => {
    const f = frame('jackal', { terrain: 'waterDeep' });
    eq(R.energyPhase(f).generated, 10);
  });

  it('AMC upkeep costs 2 EP for one spectrum, 4 for two', () => {
    const one = frame('specter');
    one.systems.amc = { active: true, bands: ['vis'] };
    eq(R.energyPhase(one).upkeep, 2);

    const two = frame('specter');
    two.systems.amc = { active: true, bands: ['vis', 'ir'] };
    eq(R.energyPhase(two).upkeep, 4);
  });

  it('ECM upkeep is 1 EP plus 1 per hex of radius', () => {
    const f = frame('vanguard');
    f.systems.ecm = { active: true, radius: 2 };
    eq(R.energyPhase(f).upkeep, 3);
  });

  it('Pilot Stunned zeroes generation and drains the capacitor', () => {
    const f = frame('vanguard', { capacitor: 6, pilotStunned: true });
    const report = R.energyPhase(f);
    ok(report.stunned, 'reported as stunned');
    eq(f.ep, 0, 'no EP');
    eq(f.capacitor, 0, 'capacitor drained');
    eq(f.pilotStunned, false, 'effect consumed after one turn');
  });

  it('System Glitch costs 1 EP for one turn only', () => {
    const f = frame('vanguard', { systemGlitch: true });
    eq(R.energyPhase(f).generated, 11, 'reactor 12 − 1');
    eq(R.energyPhase(f).generated, 12, 'back to normal next turn');
  });

  it('Reactor Damage keeps applying every turn', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 3 }));
    eq(R.energyPhase(f).generated, 10);
    eq(R.energyPhase(f).generated, 10, 'still reduced on later turns');
  });

  // --- End phase (rules.md 2.4) ----------------------------------------------
  describe('End Phase');

  it('banks unused EP up to the capacitor max and vents the rest', () => {
    const f = frame('vanguard', { ep: 9 }); // capacitor max 6
    const report = R.endPhase(f);
    eq(report.banked, 6);
    eq(report.vented, 3);
    eq(f.capacitor, 6);
    eq(f.ep, 0);
  });

  it('clears evasion and movement, and ticks weapon cooldowns down', () => {
    const f = frame('paladin', { ep: 2, eva: 2, hexesMoved: 3 });
    f.weapons.find((w) => w.key === 'railGun').cooldown = 1;
    R.endPhase(f);
    eq(f.eva, 0, 'evasion cleared');
    eq(f.hexesMoved, 0, 'movement reset');
    eq(f.weapons.find((w) => w.key === 'railGun').cooldown, 0, 'cooldown ticked');
  });

  it('Capacitor Leak permanently lowers how much can be banked', () => {
    const f = frame('vanguard', { ep: 9 });
    R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 2 }));
    eq(f.capacitorMaxMod, -2);
    eq(R.endPhase(f).banked, 4, 'capacitor max 6 − 2');
  });

  // --- Movement (rules.md 2.2, 3.2) ------------------------------------------
  describe('Movement');

  it('rules.md 2.2.1 example 1 — Vanguard spends 7 EP and gains 3 EVA', () => {
    const f = frame('vanguard', { ep: 12 });
    R.performMovement(f, 'walk', { elevationDelta: 1, terrain: 'clear' }); // 1 + 1 climb
    R.performMovement(f, 'pivot');                                          // 1
    R.performMovement(f, 'walk', { terrain: 'woodsLight' });                 // 1 + 1 woods
    R.performMovement(f, 'walk', { terrain: 'woodsLight' });                 // 1 + 1 woods
    eq(f.ep, 5, '12 − 7 EP');
    eq(f.eva, 3, 'three hexes exited');
  });

  it('rules.md 2.2.1 example 2 — Specter jumps 3 hexes for 6 EP, EVA capped at 5', () => {
    const f = frame('specter', { ep: 12 });
    R.performMovement(f, 'jump', { hexes: 3 });
    eq(f.ep, 6, '3 hexes x 2 EP');
    eq(f.eva, 5, '6 EVA generated, capped at the limit of 5');
  });

  it('reversing costs 2 EP', () => {
    const f = frame('vanguard', { ep: 10 });
    eq(R.movementCost(f, 'reverse'), 2);
  });

  it('Knee Lock adds 1 EP to walking and reversing', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('leftLeg', { forcedRoll: 2 }));
    eq(R.movementCost(f, 'walk'), 2, 'walk');
    eq(R.movementCost(f, 'reverse'), 3, 'reverse');
    eq(R.movementCost(f, 'pivot'), 1, 'pivot unaffected');
  });

  it('Gyro Lock makes the torso twist cost 2 EP instead of being free', () => {
    const f = frame('vanguard');
    eq(R.movementCost(f, 'torsoTwist'), 0, 'free by default');
    R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 4 }));
    eq(R.movementCost(f, 'torsoTwist'), 2);
  });

  it('standing up costs 3 EP and clears prone', () => {
    const f = frame('vanguard', { ep: 5, prone: true });
    R.performMovement(f, 'standUp');
    eq(f.ep, 2);
    eq(f.prone, false);
  });

  it('a prone frame cannot walk until it stands', () => {
    const f = frame('vanguard', { ep: 10, prone: true });
    eq(R.movementBlockedReason(f, 'walk'), 'Prone — must stand up first');
    eq(R.movementBlockedReason(f, 'standUp'), null);
  });

  it('Heavy Woods are impassable on foot for Heavy and Assault frames', () => {
    const colossus = frame('colossus', { ep: 10 });
    ok(R.movementBlockedReason(colossus, 'walk', { terrain: 'woodsHeavy' }), 'assault blocked');
    const specter = frame('specter', { ep: 10 });
    eq(R.movementBlockedReason(specter, 'walk', { terrain: 'woodsHeavy' }), null, 'medium may enter');
  });

  it('the movement limit stops further movement', () => {
    const f = frame('colossus', { ep: 20, hexesMoved: 3 }); // limit 3
    ok(R.movementBlockedReason(f, 'walk'), 'limit reached');
  });

  it('only Light and Medium frames have jump jets available', () => {
    const f = frame('paladin', { ep: 20 });
    eq(R.movementBlockedReason(f, 'jump', { hexes: 2 }), 'No jump jets');
  });

  it('a wrecked thruster disables jumping', () => {
    const f = frame('jackal', { ep: 20 });
    eq(R.movementBlockedReason(f, 'jump', { hexes: 2 }), null, 'fine before the crit');
    R.applyCrit(f, R.rollCrit('leftLeg', { forcedRoll: 5 }));
    eq(R.movementBlockedReason(f, 'jump', { hexes: 2 }), 'Jump jets wrecked');
  });

  it('a severed leg leaves only pivoting, at 3 EP', () => {
    const f = frame('vanguard', { ep: 10 });
    R.applyDamage(f, 'leftLeg', 14);
    eq(R.movementBlockedReason(f, 'walk'), 'Prone — must stand up first');
    eq(R.movementCost(f, 'pivot'), 3);
  });

  // --- Crippled frames (rules.md 6.5.4) ----------------------------------------
  describe('Crippled Frames');

  it('losing a leg knocks the frame down with no check allowed', () => {
    const f = frame('paladin', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 17); // 5 DR + 12 IS
    ok(f.prone, 'prone');
    ok(f.immobilized, 'crippled');
  });

  it('a crippled frame may attempt to stand, and succeeds on a passed check', () => {
    const f = frame('paladin', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 17);
    eq(R.movementBlockedReason(f, 'standUp'), null, 'the attempt is allowed');
    const report = R.performMovement(f, 'standUp', { forcedRoll: 9 });
    ok(report.pilotCheck.passed, 'check passed');
    eq(f.prone, false, 'now standing');
    eq(f.ep, 17, '3 EP spent');
  });

  it('a failed check leaves it down but still costs the 3 EP', () => {
    const f = frame('paladin', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 17);
    const report = R.performMovement(f, 'standUp', { forcedRoll: 2 });
    eq(report.pilotCheck.passed, false);
    ok(f.prone, 'still down');
    eq(f.ep, 17, 'EP spent anyway');
  });

  it('a frame with both legs intact stands without any check', () => {
    const f = frame('vanguard', { ep: 10, prone: true });
    const report = R.performMovement(f, 'standUp');
    eq(report.pilotCheck, undefined, 'no check rolled');
    eq(f.prone, false);
  });

  it('standing up sheds every prone penalty', () => {
    const f = frame('paladin', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 17);
    const railGun = f.weapons.find((w) => w.key === 'railGun');
    eq(R.damageDiceCount(f, railGun), 2, 'prone: 2d6 + 10');
    eq(R.movementBlockedReason(f, 'torsoTwist'), 'Prone — cannot torso twist');
    R.performMovement(f, 'standUp', { forcedRoll: 10 });
    eq(R.damageDiceCount(f, railGun), 3, 'standing: full 3d6 + 10');
    eq(R.movementBlockedReason(f, 'torsoTwist'), null, 'can traverse its torso again');
  });

  it('but it can never walk, reverse or jump again', () => {
    const f = frame('specter', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 11);
    R.performMovement(f, 'standUp', { forcedRoll: 12 });
    eq(f.prone, false, 'standing');
    eq(R.movementBlockedReason(f, 'walk'), 'Immobilized (leg severed)');
    eq(R.movementBlockedReason(f, 'reverse'), 'Immobilized (leg severed)');
    eq(R.movementBlockedReason(f, 'jump', { hexes: 1 }), 'Immobilized (leg severed)');
    eq(R.movementBlockedReason(f, 'pivot'), null, 'pivoting is all that is left');
  });

  it('a named pilot is better at getting the machine back up', () => {
    const ace = frame('paladin', { ep: 20, pilotBonus: 3 });
    R.applyDamage(ace, 'leftLeg', 17);
    ok(R.performMovement(ace, 'standUp', { forcedRoll: 4 }).pilotCheck.passed, '4 + 3 clears TN 6');
    const rookie = frame('paladin', { ep: 20 });
    R.applyDamage(rookie, 'leftLeg', 17);
    eq(R.performMovement(rookie, 'standUp', { forcedRoll: 4 }).pilotCheck.passed, false);
  });

  it('hand-entering a kill on the sheet applies the same consequences', () => {
    const f = frame('paladin');
    R.setLocationStructure(f, 'leftLeg', 0);
    ok(f.prone, 'falls prone');
    ok(f.immobilized, 'crippled');
    R.setLocationStructure(f, 'leftArm', 0);
    ok(f.weapons.find((w) => w.loc === 'leftArm').destroyed, 'arm weapons lost');
    R.setLocationStructure(f, 'rightLeg', 0);
    ok(f.destroyed, 'both legs gone — disabled');
  });

  it('correcting a mis-entered kill walks the consequences back', () => {
    const f = frame('paladin');
    R.setLocationStructure(f, 'leftLeg', 0);
    R.setLocationStructure(f, 'rightLeg', 0);
    ok(f.destroyed, 'destroyed by the double leg loss');
    R.setLocationStructure(f, 'rightLeg', 12); // undo the mistake
    eq(f.destroyed, false, 'no longer destroyed');
    ok(f.immobilized, 'but still crippled by the leg it really did lose');
  });

  it('losing the second leg still disables the frame outright', () => {
    const f = frame('vanguard', { ep: 20 });
    R.applyDamage(f, 'leftLeg', 14);
    R.performMovement(f, 'standUp', { forcedRoll: 11 });
    ok(!f.destroyed, 'fighting on after the first leg');
    R.applyDamage(f, 'rightLeg', 14);
    ok(f.destroyed, 'nothing left to stand on');
  });

  // --- Energy spending & overcharge (rules.md 5.4) ---------------------------
  describe('Energy Spending & Overcharge');

  it('overcharge EP must come from banked capacitor charge', () => {
    const f = frame('vanguard', { ep: 10, overchargeAvailable: 1 });
    const refused = R.spendEP(f, 4, { overcharge: 2 });
    eq(refused.ok, false, 'refused with only 1 EP banked');
    f.overchargeAvailable = 3;
    eq(R.spendEP(f, 4, { overcharge: 2 }).ok, true, 'allowed with 3 banked');
    eq(f.overchargeAvailable, 1, 'banked charge consumed');
  });

  it('spending is refused when the pool is too small', () => {
    const f = frame('jackal', { ep: 1 });
    eq(R.spendEP(f, 4).ok, false);
    eq(f.ep, 1, 'pool untouched on refusal');
  });

  it('EP spent this turn accumulates for the infrared threshold', () => {
    const f = frame('vanguard', { ep: 12 });
    R.spendEP(f, 4);
    eq(R.isIRLockable(f), false, '4 EP stays cold');
    R.spendEP(f, 1);
    eq(R.isIRLockable(f), true, '5 EP lights up on IR');
  });

  // --- Weapons ----------------------------------------------------------------
  describe('Weapons');

  it('a weapon on cooldown cannot fire', () => {
    const f = frame('paladin', { ep: 20 });
    const railGun = f.weapons.find((w) => w.key === 'railGun');
    railGun.cooldown = 1;
    ok(R.weaponBlockedReason(f, railGun).startsWith('Cooling down'));
  });

  it('an empty magazine blocks firing', () => {
    const f = frame('paladin', { ep: 20 });
    const railGun = f.weapons.find((w) => w.key === 'railGun');
    railGun.ammo.slug = 0;
    eq(R.weaponBlockedReason(f, railGun), 'Out of ammunition');
  });

  it('a full magazine is not reported empty just because another munition was named', () => {
    const f = frame('paladin', { ep: 20 });
    const autocannon = f.weapons.find((w) => w.key === 'autocannon');
    // 'slug' belongs to the Rail Gun; the Autocannon must not be checked against it.
    eq(R.weaponBlockedReason(f, autocannon, { ammoType: null }), null, 'no munition named');
    eq(R.weaponBlockedReason(f, autocannon, { ammoType: 'ap' }), null, 'its own munition');
  });

  it('insufficient EP blocks firing', () => {
    const f = frame('colossus', { ep: 2 });
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    ok(R.weaponBlockedReason(f, lance).startsWith('Needs 4 EP'));
  });

  it("the Colossus Rail Gun demands banked charge for its mandatory overcharge", () => {
    const f = frame('colossus', { ep: 20, overchargeAvailable: 0 });
    const railGun = f.weapons.find((w) => w.key === 'railGun');
    ok(R.weaponBlockedReason(f, railGun).includes('banked Capacitor'), 'blocked without banked EP');
    f.overchargeAvailable = 6;
    eq(R.weaponBlockedReason(f, railGun), null, 'allowed with 6 banked');
  });

  it('Weapon Calibration Error raises the EP cost of that arm', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('rightArm', { forcedRoll: 1 }));
    const laser = f.weapons.find((w) => w.loc === 'rightArm');
    eq(R.weaponEPCost(laser), 3, 'laser 2 EP + 1');
    const autocannon = f.weapons.find((w) => w.loc === 'leftArm');
    eq(R.weaponEPCost(autocannon), 1, 'other arm unaffected');
  });

  it('Ammo Feed Cut disables ammo weapons but not energy weapons', () => {
    const f = frame('vanguard', { ep: 12 });
    R.applyCrit(f, R.rollCrit('leftArm', { forcedRoll: 5 }));
    eq(R.weaponBlockedReason(f, f.weapons.find((w) => w.loc === 'leftArm')), 'Ammo feed cut');
    eq(R.weaponBlockedReason(f, f.weapons.find((w) => w.loc === 'rightArm')), null, 'laser unaffected');
  });

  it('a weapon may only fire once per Combat Phase', () => {
    const f = frame('colossus', { ep: 30, overchargeAvailable: 20 });
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    eq(R.weaponBlockedReason(f, lance), null, 'available before firing');
    R.consumeWeapon(f, lance, {});
    eq(R.weaponBlockedReason(f, lance), 'Already fired this phase');
    // Its other weapons are unaffected.
    const missiles = f.weapons.find((w) => w.key === 'guidedMissiles');
    eq(R.weaponBlockedReason(f, missiles), null, 'a different weapon may still fire');
  });

  it('the End Phase rearms every weapon for the next round', () => {
    const f = frame('vanguard', { ep: 12 });
    for (const w of f.weapons) R.consumeWeapon(f, w, { ammoType: 'ap' });
    ok(f.weapons.every((w) => w.firedThisTurn), 'all fired');
    R.endPhase(f);
    ok(f.weapons.every((w) => !w.firedThisTurn), 'all rearmed');
  });

  it('Full Auto is capped at 3 bursts per attack', () => {
    const f = frame('vanguard', { ep: 20 });
    const autocannon = f.weapons.find((w) => w.key === 'autocannon');
    eq(R.weaponBlockedReason(f, autocannon, { ammoType: 'ap', bursts: 3 }), null, '3 is allowed');
    ok(R.weaponBlockedReason(f, autocannon, { ammoType: 'ap', bursts: 4 })?.includes('Full Auto'), '4 is refused');
  });

  it('overcharging any weapon triggers a 1-turn cooldown', () => {
    const f = frame('colossus');
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    R.consumeWeapon(f, lance, { overcharged: true });
    eq(lance.cooldown, 1);
  });

  it('firing consumes the chosen ammo type', () => {
    const f = frame('vanguard');
    const autocannon = f.weapons.find((w) => w.key === 'autocannon');
    R.consumeWeapon(f, autocannon, { ammoType: 'hei', bursts: 2 });
    eq(autocannon.ammo, { ap: 5, hei: 3 });
  });

  // --- Prone damage penalty (rules.md 5.0, 6.3) --------------------------------
  describe('Prone Damage Penalty');

  it('a prone attacker rolls one die fewer', () => {
    const f = frame('colossus');
    const lance = f.weapons.find((w) => w.key === 'thermalLance');
    eq(R.damageDiceCount(f, lance), 3, 'standing');
    f.prone = true;
    eq(R.damageDiceCount(f, lance), 2, 'prone');
  });

  it('flat damage bonuses survive the penalty', () => {
    const f = frame('paladin', { prone: true });
    const railGun = f.weapons.find((w) => w.key === 'railGun');
    eq(R.damageDiceCount(f, railGun), 2, 'Rail Gun becomes 2d6 + 10, keeping the flat 10');
  });

  it('Rapid Fire loses one die from every burst', () => {
    const f = frame('vanguard', { prone: true });
    const autocannon = f.weapons.find((w) => w.key === 'autocannon');
    eq(R.damageDiceCount(f, autocannon, { bursts: 1 }), 2, 'one burst: 2 dice not 3');
    eq(R.damageDiceCount(f, autocannon, { bursts: 3 }), 6, 'three bursts: 6 dice not 9');
  });

  it('the pool never drops below one die', () => {
    const f = frame('vanguard', { prone: true });
    const laser = f.weapons.find((w) => w.key === 'laser');
    eq(R.damageDiceCount(f, laser), 1, '2d6 becomes 1d6, not 0');
  });

  it('weapons that roll no damage dice are unaffected', () => {
    const f = frame('specter', { prone: true });
    const disruptor = f.weapons.find((w) => w.key === 'disruptorCannon');
    eq(R.damageDiceCount(f, disruptor), 0);
  });

  // --- Rapid Fire (rules.md 5) -----------------------------------------------
  describe('Rapid Fire');

  it('evasion removes whole hits rather than damage points', () => {
    const f = frame('jackal'); // torso DR 2, IS 8
    const report = R.resolveRapidFire(f, 'torso', [6, 5, 1], { evasion: 1 });
    eq(report.missedIndexes, [0], 'the highest die is negated');
    eq(report.hits.length, 2, 'two dice still resolve');
  });

  it('each die is resolved against Armor DR separately', () => {
    const f = frame('vanguard'); // torso DR 5
    const report = R.resolveRapidFire(f, 'torso', [6, 4, 3], { evasion: 0 });
    eq(report.totalToIS, 1, 'only the 6 beats DR 5; the 4 and 3 bounce');
    eq(f.locations.torso.dr, 4, 'the one penetrating hit degrades DR');
  });

  it('AP ammo lets weaker dice through', () => {
    const f = frame('vanguard');
    const report = R.resolveRapidFire(f, 'torso', [6, 5, 5], { evasion: 0, apX: 1 });
    eq(report.totalToIS, 4, 'DR 5 − AP 1 = 4, so 6/5/5 deal 2/1/1');
  });

  it('a burst degrades armor once, not once per penetrating die', () => {
    const f = frame('vanguard'); // torso DR 5
    R.resolveRapidFire(f, 'torso', [6, 6, 6], { evasion: 0 });
    eq(f.locations.torso.dr, 4, 'one penetration event for the whole burst');
    eq(f.locations.torso.is, 9, 'each die resolved against the DR it started at: 1+1+1');
  });

  it('Tracer rounds subtract 1 from every die', () => {
    const f = frame('jackal'); // torso DR 2
    const report = R.resolveRapidFire(f, 'torso', [3, 3, 1], { damageMod: -1 });
    eq(report.dice, [2, 2, 0], 'each die reduced, floored at 0');
    eq(report.totalToIS, 0, 'nothing beats DR 2');
  });

  it('evasion higher than the dice count negates the whole burst', () => {
    const f = frame('vanguard');
    const report = R.resolveRapidFire(f, 'torso', [6, 6, 6], { evasion: 5 });
    eq(report.hits.length, 0);
    eq(f.locations.torso.is, 12, 'untouched');
  });

  // --- Missiles (rules.md 5.2) ------------------------------------------------
  describe('Guided Missiles');

  it('Cluster warheads hit every location', () => {
    const f = frame('colossus'); // tough enough to survive the salvo intact
    const results = R.resolveCluster(f, () => 7);
    eq(results.length, 6, 'all six locations');
    ok(f.locations.head.is < 8, 'head damaged through DR 4');
    ok(f.locations.leftLeg.is < 15, 'legs damaged through DR 6');
    eq(f.locations.torso.is, 20, 'torso DR 7 holds against a 7');
  });

  it('a Cluster salvo that destroys the head stops there', () => {
    const f = frame('jackal'); // head 2 DR / 4 IS — a 7 vaporises it
    R.resolveCluster(f, () => 7);
    ok(f.destroyed, 'frame destroyed by the head hit');
  });

  it('High Explosive splashes from the primary location to adjacent ones', () => {
    const f = frame('vanguard');
    const { primary, splash } = R.resolveHighExplosive(f, 'torso', 14, () => 6);
    eq(primary.toIS, 9, '14 − 5 DR');
    eq(splash.length, 5, 'head, both arms, both legs');
  });

  it('EMP crits only locations already stripped to 0 Armor DR', () => {
    const f = frame('vanguard');
    f.locations.leftArm.dr = 0;
    const { crits } = R.resolveEMP(f, () => 1);
    eq(crits.length, 1, 'only the exposed arm');
    eq(crits[0].location, 'leftArm');
    ok(f.sensorsScrambled, 'sensors scrambled');
  });

  it('an EMP Weapon Damaged crit reports its weapon choices', () => {
    const f = frame('vanguard');
    f.locations.leftArm.dr = 0;
    const { crits } = R.resolveEMP(f, () => 2);
    eq(crits[0].crit.name, 'Weapon Damaged');
    eq(crits[0].crit.choices, [f.weapons.find((w) => w.loc === 'leftArm').id]);
  });

  // --- Disruptor Cannon -------------------------------------------------------
  describe('Disruptor Cannon');

  it('a Torso hit drains EP and deals no damage', () => {
    const f = frame('vanguard', { ep: 10 });
    const report = R.resolveDisruptor(f, 'torso', { drainRoll: 4 });
    eq(report.drained, 4);
    eq(f.ep, 6);
    eq(f.locations.torso.is, 12, 'no structural damage');
  });

  it('a limb hit forces a critical instead', () => {
    const f = frame('vanguard', { ep: 10 });
    const report = R.resolveDisruptor(f, 'leftLeg', { critRoll: 3 });
    eq(report.crit.name, 'Hip Actuator');
    eq(f.evasionLimitMod, -1, 'crit applied');
    eq(f.ep, 10, 'no EP drained on a limb hit');
  });

  it('overcharging does both at once', () => {
    const f = frame('vanguard', { ep: 10 });
    const report = R.resolveDisruptor(f, 'leftArm', { drainRoll: 3, critRoll: 1, overcharged: true });
    eq(report.drained, 3, 'EP drained');
    ok(report.crit, 'and a crit forced');
  });

  it('a drain cannot take more EP than the frame has', () => {
    const f = frame('vanguard', { ep: 2 });
    eq(R.resolveDisruptor(f, 'torso', { drainRoll: 6 }).drained, 2);
    eq(f.ep, 0);
  });

  it('a forced Weapon Damaged crit reports the weapons the attacker may pick', () => {
    const f = frame('vanguard', { ep: 10 }); // autocannon in the left arm
    const report = R.resolveDisruptor(f, 'leftArm', { critRoll: 2 });
    eq(report.crit.name, 'Weapon Damaged');
    eq(report.crit.choices, [f.weapons.find((w) => w.loc === 'leftArm').id], 'choices reach the caller');
  });

  // --- Criticals --------------------------------------------------------------
  describe('Critical Hits');

  it('every entry on every crit table applies without error', () => {
    for (const [table, rows] of Object.entries(CRIT_TABLES)) {
      for (const roll of Object.keys(rows)) {
        const loc = table === 'arm' ? 'leftArm' : table === 'leg' ? 'leftLeg' : table;
        const f = frame('vanguard');
        R.applyCrit(f, R.rollCrit(loc, { forcedRoll: Number(roll) }), loc);
      }
    }
  });

  it('HEI ammo adds +1 to the crit roll', () => {
    const crit = R.rollCrit('torso', { forcedRoll: 2, mod: 1 });
    eq(crit.modifiedRoll, 3);
    eq(crit.name, 'Reactor Damage', 'a 2 becomes a 3');
  });

  it('a modified roll of 7 resolves as the 6 result', () => {
    eq(R.rollCrit('torso', { forcedRoll: 6, mod: 1 }).name, 'Core Melt');
  });

  it('Ammo Explosion becomes Reactor Damage with no explosive ammo aboard', () => {
    const f = frame('colossus');
    for (const w of f.weapons) if (w.ammo) w.ammo = { slug: 5 }; // inert slugs only
    f.weapons = f.weapons.filter((w) => w.key !== 'guidedMissiles'); // drop explosive warheads
    const applied = R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 5 }));
    eq(f.reactorMod, -2, 'resolved as Reactor Damage');
    ok(!applied.pendingAmmoExplosion, 'no detonation');
  });

  it('Ammo Explosion detonates when explosive ammo is aboard', () => {
    const f = frame('vanguard'); // autocannon shells are explosive
    const applied = R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 5 }));
    ok(applied.pendingAmmoExplosion, 'detonation pending a 3d6 roll');
  });

  it('Structural Fracture strips a limb to 0 Armor DR', () => {
    const f = frame('colossus');
    R.applyCrit(f, R.rollCrit('leftArm', { forcedRoll: 4 }), 'leftArm');
    eq(f.locations.leftArm.dr, 0);
  });

  it('Cockpit Breach permanently lowers initiative by 3', () => {
    const f = frame('jackal');
    R.applyCrit(f, R.rollCrit('head', { forcedRoll: 5 }));
    eq(R.effectiveInitiative(f), 9, '12 − 3');
  });

  it('Comm Static severs the tactical datalink', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('head', { forcedRoll: 2 }));
    eq(f.systems.datalink, false);
  });

  it('Pilot K.O. and Core Melt destroy the frame', () => {
    const ko = frame('vanguard');
    R.applyCrit(ko, R.rollCrit('head', { forcedRoll: 6 }));
    ok(ko.destroyed, 'pilot K.O.');

    const melt = frame('vanguard');
    R.applyCrit(melt, R.rollCrit('torso', { forcedRoll: 6 }));
    ok(melt.destroyed, 'core melt');
  });

  it('Arm Severed through the crit table destroys that arm and its weapons', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('leftArm', { forcedRoll: 6 }), 'leftArm');
    ok(f.locations.leftArm.destroyed, 'arm gone');
    ok(f.weapons.find((w) => w.loc === 'leftArm').destroyed, 'autocannon lost');
  });

  it('crits accumulate in the frame log', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 1 }));
    R.applyCrit(f, R.rollCrit('torso', { forcedRoll: 3 }));
    eq(f.crits.length, 2);
  });

  // --- Turn order (rules.md 2.2, 2.3) ----------------------------------------
  describe('Turn Order');

  it('activation runs lowest initiative first', () => {
    const frames = [frame('jackal'), frame('colossus'), frame('vanguard')];
    eq(R.turnOrder(frames, 'activation').map((f) => f.initiative), [3, 6, 12]);
  });

  it('combat reverses to highest initiative first', () => {
    const frames = [frame('jackal'), frame('colossus'), frame('vanguard')];
    eq(R.turnOrder(frames, 'combat').map((f) => f.initiative), [12, 6, 3]);
  });

  it('destroyed frames drop out of the order', () => {
    const dead = frame('jackal', { destroyed: true });
    eq(R.turnOrder([dead, frame('vanguard')], 'combat').length, 1);
  });

  it('a Cockpit Breach re-sorts the frame', () => {
    const jackal = frame('jackal');
    R.applyCrit(jackal, R.rollCrit('head', { forcedRoll: 5 })); // 12 → 9
    const specter = frame('specter'); // 10
    eq(R.turnOrder([jackal, specter], 'combat').map((f) => f.callsign), ['Specter', 'Jackal']);
  });

  // --- Pilot checks -----------------------------------------------------------
  describe('Pilot Checks');

  it('paved ground grants +1 and rough ground −1', () => {
    eq(R.pilotCheck(frame('vanguard', { terrain: 'paved' }), { forcedRoll: 5 }).total, 6);
    eq(R.pilotCheck(frame('vanguard', { terrain: 'rough' }), { forcedRoll: 5 }).total, 4);
  });

  it('a named pilot bonus applies to the check', () => {
    const f = frame('vanguard', { pilotBonus: 3 });
    ok(R.pilotCheck(f, { forcedRoll: 4 }).passed, '4 + 3 clears TN 6');
  });

  it('a Toe Actuator crit permanently penalises pilot checks', () => {
    const f = frame('vanguard');
    R.applyCrit(f, R.rollCrit('leftLeg', { forcedRoll: 1 }));
    eq(R.pilotCheck(f, { forcedRoll: 6 }).total, 5);
  });

  // --- Collisions -------------------------------------------------------------
  describe('Collisions & Drop Strikes');

  it('collision dice are mass value plus hexes moved', () => {
    eq(R.collisionDicePool(frame('colossus'), 3), 7, 'assault mass 4 + 3 hexes');
    eq(R.collisionDicePool(frame('jackal'), 5), 6, 'light mass 1 + 5 hexes');
  });

  it('drop strike dice are the jumper mass plus hexes jumped', () => {
    eq(R.dropStrikeDicePool(frame('specter'), 4), 6);
  });

  // --- Sync diff ---------------------------------------------------------------
  // This is what stops two phones overwriting each other, so assert it directly.
  describe('Sync — path diff');

  const diff = (prev, next) => { const out = {}; diffInto(prev, next, '', out); return out; };

  it('emits nothing when nothing changed', () => {
    eq(diff({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }), {});
  });

  it('emits only the leaf path that changed', () => {
    eq(diff({ a: 1, b: { c: 2, d: 3 } }, { a: 1, b: { c: 9, d: 3 } }), { 'b/c': 9 });
  });

  it('two players editing different frames produce disjoint paths', () => {
    const before = {
      frames: {
        vanguard: { ep: 12, locations: { torso: { is: 12, dr: 5 } } },
        colossus: { ep: 18, locations: { torso: { is: 20, dr: 7 } } },
      },
    };
    const after = JSON.parse(JSON.stringify(before));
    after.frames.vanguard.ep = 9;                       // player A moves
    after.frames.colossus.locations.torso.is = 16;      // player B takes a hit
    const paths = Object.keys(diff(before, after));
    eq(paths.sort(), ['frames/colossus/locations/torso/is', 'frames/vanguard/ep']);
  });

  it('deletes removed keys with null rather than dropping them', () => {
    eq(diff({ frames: { a: { ep: 1 } } }, { frames: {} }), { 'frames/a': null });
  });

  it('treats arrays as atomic leaves', () => {
    const out = diff({ w: [{ ammo: 5 }] }, { w: [{ ammo: 4 }] });
    eq(Object.keys(out), ['w'], 'the whole array is written, not w/0/ammo');
  });

  it('a newly deployed frame is written as one atomic object', () => {
    const out = diff({ frames: {} }, { frames: { specter: { ep: 9, id: 'specter' } } });
    eq(Object.keys(out), ['frames/specter'], 'one write, not a path per field');
    eq(out['frames/specter'], { ep: 9, id: 'specter' });
  });
}
