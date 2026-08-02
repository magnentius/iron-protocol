// Iron Protocol — core rules tables.
// Transcribed from rules.md. Section references in comments point at the source
// of truth; when rules.md and a frame sheet disagree, see docs/README.md.

export const LOCATIONS = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

export const LOCATION_NAMES = {
  head: 'Head',
  torso: 'Torso',
  leftArm: 'Left Arm',
  rightArm: 'Right Arm',
  leftLeg: 'Left Leg',
  rightLeg: 'Right Leg',
};

// Which critical table a location rolls on.
export const CRIT_TABLE_FOR = {
  head: 'head',
  torso: 'torso',
  leftArm: 'arm',
  rightArm: 'arm',
  leftLeg: 'leg',
  rightLeg: 'leg',
};

// Adjacency for High Explosive splash damage (rules.md 5.2). "Adjacent locations"
// on the chassis: the torso touches everything, limbs touch only the torso.
export const ADJACENT_LOCATIONS = {
  head: ['torso'],
  torso: ['head', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'],
  leftArm: ['torso'],
  rightArm: ['torso'],
  leftLeg: ['torso'],
  rightLeg: ['torso'],
};

// --- Hit Location Table (rules.md 6.1) -------------------------------------
// Indexed by 2d6 roll, then by the hit zone the attack came from.
// Front and Rear share a column.

export const HIT_ZONES = {
  front: 'Front',
  rear: 'Rear',
  left: 'Left Side',
  right: 'Right Side',
};

const HIT_LOCATION_TABLE = {
  //     left side attack   front / rear attack   right side attack
  2: { left: 'torso', frontRear: 'torso', right: 'torso' }, // Core Critical
  3: { left: 'leftLeg', frontRear: 'rightArm', right: 'rightLeg' },
  4: { left: 'leftArm', frontRear: 'rightArm', right: 'rightArm' },
  5: { left: 'leftArm', frontRear: 'rightLeg', right: 'rightArm' },
  6: { left: 'leftLeg', frontRear: 'torso', right: 'rightLeg' },
  7: { left: 'torso', frontRear: 'torso', right: 'torso' },
  8: { left: 'torso', frontRear: 'torso', right: 'torso' },
  9: { left: 'torso', frontRear: 'leftLeg', right: 'torso' },
  10: { left: 'rightArm', frontRear: 'leftArm', right: 'leftArm' },
  11: { left: 'rightLeg', frontRear: 'leftArm', right: 'leftLeg' },
  12: { left: 'head', frontRear: 'head', right: 'head' }, // Sensors
};

/**
 * Resolve a 2d6 roll to a hit location.
 * A roll of 2 is a Core Critical: treat torso Armor DR as 0 for the whole attack.
 * @returns {{ location: string, coreCritical: boolean, headHit: boolean }}
 */
export function lookupHitLocation(roll, zone) {
  const column = zone === 'left' ? 'left' : zone === 'right' ? 'right' : 'frontRear';
  const row = HIT_LOCATION_TABLE[roll];
  if (!row) throw new Error(`Hit location roll out of range: ${roll}`);
  return {
    location: row[column],
    coreCritical: roll === 2,
    headHit: roll === 12,
  };
}

// --- Critical Hit Tables (rules.md 6.2) ------------------------------------
//
// Every table climbs the same Severity Ladder, so the same number means the same
// *kind* of damage wherever it lands:
//   1 Temporary Glitch · 2 System Strain · 3 Performance Degradation
//   4 Structural Fracture (DR → 0) · 5 Component Loss · 6 Catastrophic Destruction
//
// Tables are NOT all six slots long. The Head stops at 5 (a cockpit hit that
// reaches the top kills the pilot outright); the Torso runs to 8, and slots 7-8
// are reachable only by cascade or by HEI's +1. `effect` is a machine-readable
// tag consumed by rules.applyCrit.

export const CRIT_TABLES = {
  head: {
    1: { name: 'Sensor Ghosting', effect: 'sensorGhosting', text: 'Drops all held locks; cannot establish new ones until the end of its next activation.' },
    2: { name: 'Sensor Calibration Drift', effect: 'calibrationDrift', text: 'Must spend 1 EP each Energy Phase or establish no locks that turn.' },
    3: { name: 'Sensor Array Destroyed', effect: 'sensorBandDestroyed', text: 'Roll 1d6: 1-2 IR, 3-4 VIS, 5-6 Radar. That band is permanently destroyed.' },
    4: { name: 'Structural Fracture', effect: 'headFracture', text: 'Head Armor DR permanently 0, and the Tactical Datalink is severed.' },
    5: { name: 'Pilot K.O.', effect: 'frameDestroyed', text: 'Frame permanently disabled and out of combat.' },
  },
  torso: {
    1: { name: 'System Glitch', effect: 'systemGlitch', text: 'Generates 1 less EP next turn.' },
    2: { name: 'Servo Lock', effect: 'servoLock', text: 'Torso Twists cost 2 EP (no longer free).' },
    3: { name: 'Capacitor Leak', effect: 'capacitorLeak', text: 'Capacitor Max permanently −2; lose 2 stored EP immediately.' },
    4: { name: 'Structural Fracture', effect: 'armorToZero', text: 'Torso Armor DR permanently reduced to 0.' },
    5: { name: 'Reactor Damage', effect: 'reactorDamage', text: 'Reactor output permanently reduced by 2 EP per turn.' },
    6: { name: 'Ammo Explosion', effect: 'ammoExplosion', text: 'A remaining volatile store detonates: that system is Empty, and the Torso suffers 2 more Criticals. No volatile store? Apply Reactor Damage instead.' },
    7: { name: 'Electrical Fire', effect: 'electricalFire', text: '1 Torso Critical each End Phase. Smother with 3 EP and a 4+, or automatically by ending an Activation in water.' },
    8: { name: 'Containment Failure', effect: 'containmentFailure', text: 'Capacitor bank discharges: 2d6 to all adjacent hexes. Frame destroyed.' },
  },
  arm: {
    1: { name: 'Targeting Jitter', effect: 'targetingJitter', text: 'Weapons in this arm take −1 damage on their next attack.' },
    2: { name: 'Actuator Strain', effect: 'armWeaponsCostMore', text: 'Weapons in this arm cost +1 EP to fire.' },
    3: { name: 'Hardpoint Failure', effect: 'hardpointFailure', text: 'Attacks from this arm permanently roll 1 fewer damage die (min 1). Rapid Fire loses one die per Burst.' },
    4: { name: 'Structural Fracture', effect: 'armorToZero', text: 'This arm’s Armor DR permanently reduced to 0.' },
    5: { name: 'Weapon Destroyed', effect: 'weaponDestroyed', text: 'The weapon in this arm is destroyed. Each arm has one hardpoint, so this silences it without severing it.' },
    6: { name: 'Arm Severed', effect: 'limbSevered', text: 'Arm destroyed. All weapons and systems mounted in it are lost.' },
  },
  leg: {
    1: { name: 'Servo Stutter', effect: 'servoStutter', text: 'Movement Limit −2 hexes until the end of its next activation.' },
    2: { name: 'Knee Lock', effect: 'kneeLock', text: 'Walking and reversing cost +1 EP per hex.' },
    3: { name: 'Hip Actuator', effect: 'hipActuator', text: 'Movement Limit permanently −2 hexes.' },
    4: { name: 'Structural Fracture', effect: 'armorToZero', text: 'This leg’s Armor DR permanently reduced to 0.' },
    5: { name: 'Actuator Destroyed', effect: 'actuatorDestroyed', text: 'Falls Prone. May only Stand Up with 3 EP and a Pilot Check at −2. Can no longer jump.' },
    6: { name: 'Leg Severed', effect: 'limbSevered', text: 'Leg destroyed. Falls Prone and is permanently crippled. Both legs gone = Frame destroyed.' },
  },
};

/** Highest slot on each table — the rung at which the location is destroyed. */
export const CRIT_TABLE_MAX = {
  head: 5,
  torso: 8,
  arm: 6,
  leg: 6,
};

/**
 * Clamp a crit roll into a table's range. Tables are different lengths, so a
 * natural 6 on the Head resolves as the 5 (Pilot K.O.), while a 6 on the Torso
 * is Ammo Explosion with two rungs still above it.
 */
export function lookupCrit(tableKey, roll) {
  const table = CRIT_TABLES[tableKey];
  if (!table) throw new Error(`Unknown crit table: ${tableKey}`);
  const max = CRIT_TABLE_MAX[tableKey];
  const clamped = Math.min(max, Math.max(1, roll));
  return { ...table[clamped], slot: clamped, roll, table: tableKey };
}

/**
 * Cascading Failure (rules.md 6.2): if the rolled slot is already marked, the
 * damage climbs to the next unmarked slot. If it climbs past the top of the
 * table, the top result applies again.
 * @param {object} marked - map of slot number -> true
 */
export function cascadeSlot(tableKey, roll, marked = {}) {
  const max = CRIT_TABLE_MAX[tableKey];
  let slot = Math.min(max, Math.max(1, roll));
  while (slot <= max && marked[slot]) slot += 1;
  return { slot: Math.min(slot, max), overflowed: slot > max };
}

// --- Terrain (rules.md 3.1, 3.5) -------------------------------------------
// `cover` is the number of damage-dice rerolls the defender may force.

export const TERRAIN = {
  clear: { name: 'Clear', extraEP: 0, cover: 0, blocksFlankSpeed: false, cooling: 0, pilotMod: 0 },
  paved: { name: 'Paved', extraEP: 0, cover: 0, blocksFlankSpeed: false, cooling: 0, pilotMod: 1 },
  rough: { name: 'Rough', extraEP: 1, cover: 0, blocksFlankSpeed: false, cooling: 0, pilotMod: -1 },
  waterShallow: { name: 'Water (Shallow)', extraEP: 1, cover: 0, blocksFlankSpeed: true, cooling: 1, pilotMod: 0, extinguishesFire: true },
  waterDeep: { name: 'Water (Deep)', extraEP: 2, cover: 0, blocksFlankSpeed: true, cooling: 2, pilotMod: -1, extinguishesFire: true },
  woodsLight: { name: 'Woods (Light)', extraEP: 1, cover: 1, blocksFlankSpeed: false, cooling: 0, pilotMod: 0 },
  woodsHeavy: { name: 'Woods (Heavy)', extraEP: 2, cover: 2, blocksFlankSpeed: false, cooling: 0, pilotMod: 0 },
  urbanAdjacent: { name: 'Adjacent to Building', extraEP: 0, cover: 2, blocksFlankSpeed: false, cooling: 0, pilotMod: 0 },
};

export const TERRAIN_KEYS = Object.keys(TERRAIN);

// Heavy Woods are impassable on foot to Heavy and Assault frames (rules.md 3.2).
export const HEAVY_WOODS_BLOCKED_CLASSES = ['heavy', 'assault'];

// --- Weight classes (rules.md 1.1) -----------------------------------------

export const WEIGHT_CLASSES = {
  light: { name: 'Light', massValue: 1, tons: [20, 35], maxMovement: 7 },
  medium: { name: 'Medium', massValue: 2, tons: [40, 55], maxMovement: 5 },
  heavy: { name: 'Heavy', massValue: 3, tons: [60, 75], maxMovement: 4 },
  assault: { name: 'Assault', massValue: 4, tons: [80, 100], maxMovement: 3 },
};

export function weightClassForTons(tons) {
  if (tons <= 35) return 'light';
  if (tons <= 55) return 'medium';
  if (tons <= 75) return 'heavy';
  return 'assault';
}

// Only Light and Medium chassis may mount Jump Jets (rules.md 2.2).
export const JUMP_CAPABLE_CLASSES = ['light', 'medium'];

// --- Movement costs (rules.md 2.2) -----------------------------------------

export const MOVE_COSTS = {
  walk: 1,
  reverse: 2,
  pivot: 1,
  jumpPerHex: 2,
  standUp: 3,
  pronePivot: 2,
  severedLegPivot: 3,
  climbUp: 1, // per level, added to terrain cost
};

// Exiting this many hexes in an activation grants Flank Speed (rules.md 2.2).
// Fixed across all chassis: an Assault frame capped at 3 can never reach it.
export const FLANK_SPEED_THRESHOLD = 4;

// A jump of this many hexes grants Flank Speed regardless of the usual threshold.
export const JUMP_FLANK_SPEED_HEXES = 2;

// --- Damage resolution (rules.md 2.3, 6.2) ---------------------------------

// Armor DR is a threshold: damage must be STRICTLY greater to penetrate.
// For every this many points of excess, the attacker rolls one extra crit die.
export const OVERKILL_STEP = 5;

/** Number of Critical Hit dice earned, given damage in excess of Armor DR. */
export function overkillDice(excess) {
  if (excess <= 0) return 0;
  return 1 + Math.floor(excess / OVERKILL_STEP);
}

// --- Weapons (rules.md 5) --------------------------------------------------
// `damage` is { dice, sides, flat }. Overcharge adds DICE, never flat: a flat
// bonus would sit outside the reroll system entirely (see the design note in 5).

export const WEAPONS = {
  autocannon: {
    name: 'Autocannon',
    hardpoint: 'light',
    epCost: 1, // per burst
    damage: { dice: 1, sides: 6, flat: 0 }, // 3 of these per burst, resolved separately
    burstDice: 3,
    rapidFire: true,
    explosiveAmmo: true,
    detection: 'mount',   // fire control slaved to optics or radar, fixed per Frame
    ammoDie: { empty: 1, fullAutoEmpty: 3, expect: '6 attacks' },
    note: '3-round burst. Each 1d6 tested separately vs DR. Can fire Full Auto.',
  },
  laser: {
    name: 'Laser',
    hardpoint: 'light',
    epCost: 2,
    damage: { dice: 2, sides: 6, flat: 0 },
    infiniteAmmo: true,
    detection: 'vis',
    overcharge: { epPerDie: 2, maxDice: 2 },
  },
  thermalLance: {
    name: 'Thermal Lance',
    hardpoint: 'heavy',
    epCost: 4,
    damage: { dice: 3, sides: 6, flat: 0 },
    infiniteAmmo: true,
    detection: 'ir',
    overcharge: { epPerDie: 2, maxDice: 2 },
  },
  railGun: {
    name: 'Rail Gun',
    hardpoint: 'heavy',
    epCost: 0,
    requiresOvercharge: 6, // must come from the Capacitor; always triggers cooldown
    damage: { dice: 5, sides: 6, flat: 0 },
    ap: 3,
    cooldown: 1,
    explosiveAmmo: false, // inert slugs — never trigger Ammo Explosion
    infiniteAmmo: true,
    detection: 'rad',
  },
  disruptorCannon: {
    name: 'Disruptor Cannon',
    hardpoint: 'medium',
    epCost: 3,
    damage: null, // deals no damage at all
    infiniteAmmo: true,
    detection: 'rad',
    bypassesFlankSpeed: true,
    bypassesArmor: true,
    disruptor: true,
    overcharge: { forcesSecondCrit: true, ep: 2 },
    note: 'Every hit forces 1 Critical on the location rolled and drains 1d6 EP.',
  },
  guidedMissiles: {
    name: 'Guided Missiles',
    hardpoint: 'medium',
    epCost: 4,
    aoe: true, // bypasses Flank Speed and Cover; Armor DR still applies
    explosiveAmmo: true,
    indirectFire: true,
    detection: 'guidance', // whichever band the seeker was built for
    ammoDie: { empty: 2, expect: '3 salvos' },
    warheads: {
      he: { name: 'High Explosive', damage: { dice: 3, sides: 6, flat: 0 }, splash: { dice: 1, sides: 6, flat: 0 } },
      cluster: { name: 'Cluster', perLocation: { dice: 2, sides: 6, flat: 0 }, locations: 3 },
      emp: { name: 'EMP', noDamage: true, critsOnZeroDR: true, scramblesSensors: true, radiusHexes: 1 },
    },
  },
};

// Autocannon munitions (rules.md 5.1). A single type is chosen at build time.
export const AMMO_TYPES = {
  ap: { name: 'AP', ap: 1, critMod: 0, note: 'Ignores 1 point of Armor DR per hit.' },
  hei: { name: 'HEI', ap: 0, critMod: 1, note: 'Adds +1 to Critical Hit rolls caused by this weapon.' },
};

// --- Ammo Die (rules.md 5.0) -----------------------------------------------
// Nothing reloads in the field. After an attack, roll 1d6; at or below the
// threshold the system is Empty for the rest of the battle.

export const AMMO_DIE = {
  autocannonSingle: { empty: 1, expect: '6 attacks' },
  autocannonFullAuto: { empty: 3, expect: '2 attacks' },
  guidedMissiles: { empty: 2, expect: '3 salvos' },
  countermeasure: { empty: 1, expect: '6 uses' }, // Chaff / Smoke — the expendables
  jumpJets: { empty: 2, expect: '3 jumps' },
};

// --- Sensors & countermeasures (rules.md 4) --------------------------------

export const SENSOR_BANDS = { vis: 'Visual', ir: 'Infrared', rad: 'Microwave' };

export const SYSTEM_UPKEEP = {
  adaptiveSkin: 2, // +2 to cloak a second band (overcharge)
  ecm: 2, // +1 per hex of radius (overcharge)
};

// Every deployed countermeasure — cartridge or sustained suite — negates an
// attack on this roll or better. Terrain never rolls; it blocks outright.
export const COUNTERMEASURE_CHECK_TN = 4;

/**
 * Powered countermeasures bill EP per activation instead of carrying a magazine.
 *
 * The IR suite is a directed jammer, not a pyrotechnic decoy: it does not run
 * out, it draws power. Charged per attack rather than as turn upkeep, so it
 * stays a decision — and it competes for the same banked charge Overcharge needs.
 */
export const COUNTERMEASURE_EP = { dircm: 2 };

/** Which countermeasure answers which band. */
export const COUNTERMEASURE_FOR_BAND = {
  ir: ['dircm', 'adaptiveSkin'],
  rad: ['chaff', 'ecm', 'adaptiveSkin'],
  vis: ['smoke', 'adaptiveSkin'],
};

// Spending this much EP in a turn exposes the frame to IR locks (rules.md 4.1).
// Adaptive Skin upkeep paid in the Energy Phase does NOT count toward this.
export const IR_LOCK_THRESHOLD = 5;

// A single Full Auto attack may fire at most this many bursts (rules.md 5.0).
export const MAX_FULL_AUTO_BURSTS = 3;

// --- Pilot Checks (rules.md 6.4) -------------------------------------------

export const PILOT_CHECK_TN = 6;

// Applied to every Pilot Check, cumulatively.
export const PILOT_CHECK_MODIFIERS = {
  crippledLeg: -2, // severed, or Actuator Destroyed
};
