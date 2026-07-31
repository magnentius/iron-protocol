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
 * A roll of 2 is a Core Critical: it bypasses torso Armor DR entirely.
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
// `effect` is a machine-readable tag consumed by rules.applyCrit.
// Rolls of 7+ (possible via HEI +1) resolve as the 6 result.

export const CRIT_TABLES = {
  head: {
    1: { name: 'Sensor Flicker', effect: 'sensorFlicker', text: 'All sensor locks capped at 5 hexes next turn.' },
    2: { name: 'Comm Static', effect: 'commStatic', text: 'Tactical Datalink disabled for the rest of the battle.' },
    3: { name: 'Pilot Stunned', effect: 'pilotStunned', text: 'Generates 0 EP next turn; Capacitor drained to 0.' },
    4: { name: 'Sensor Array Destroyed', effect: 'sensorsDown', text: 'Radar/IR locks disabled. Blind beyond adjacent hexes.' },
    5: { name: 'Cockpit Breach', effect: 'initiativeDown3', text: 'Initiative permanently reduced by 3.' },
    6: { name: 'Pilot K.O.', effect: 'frameDestroyed', text: 'Frame permanently disabled and out of combat.' },
  },
  torso: {
    1: { name: 'System Glitch', effect: 'systemGlitch', text: 'Generates 1 less EP next turn.' },
    2: { name: 'Capacitor Leak', effect: 'capacitorLeak', text: 'Capacitor Max permanently −2; lose 2 stored EP now.' },
    3: { name: 'Reactor Damage', effect: 'reactorDamage', text: 'Reactor output permanently reduced by 2 EP/turn.' },
    4: { name: 'Gyro Lock', effect: 'gyroLock', text: 'Torso twists cost 2 EP (no longer free).' },
    5: { name: 'Ammo Explosion', effect: 'ammoExplosion', text: 'Explosive ammo detonates: 3d6 to Torso, bypassing armor. No explosive ammo? Treat as Reactor Damage.' },
    6: { name: 'Core Melt', effect: 'coreMelt', text: 'Reactor explodes: 2d6 to all adjacent hexes. Frame destroyed.' },
  },
  arm: {
    1: { name: 'Weapon Calibration Error', effect: 'armWeaponsCostMore', text: 'Weapons in this arm cost +1 EP to fire.' },
    2: { name: 'Weapon Damaged', effect: 'weaponDestroyedChoice', text: 'Attacker chooses one weapon in this arm; it is destroyed.' },
    3: { name: 'Shoulder Joint Jammed', effect: 'shoulderJammed', text: 'Weapons in this arm can only fire into the Forward Arc.' },
    4: { name: 'Structural Fracture', effect: 'armorToZero', text: 'Arm Armor DR permanently reduced to 0.' },
    5: { name: 'Ammo Feed Cut', effect: 'ammoFeedCut', text: 'Ammunition-dependent weapons in this arm are disabled.' },
    6: { name: 'Arm Severed', effect: 'limbSevered', text: 'Arm destroyed. All weapons and systems in it are lost.' },
  },
  leg: {
    1: { name: 'Toe Actuator', effect: 'pilotCheckPenalty', text: '−1 penalty to all future Pilot Checks.' },
    2: { name: 'Knee Lock', effect: 'kneeLock', text: 'Walking and reversing cost +1 EP per hex.' },
    3: { name: 'Hip Actuator', effect: 'evasionLimitDown', text: 'Evasion Limit permanently reduced by 1.' },
    4: { name: 'Structural Fracture', effect: 'armorToZero', text: 'Leg Armor DR permanently reduced to 0.' },
    5: { name: 'Thruster Wrecked', effect: 'jumpJetsDisabled', text: 'Jump Jets disabled.' },
    6: { name: 'Leg Severed', effect: 'limbSevered', text: 'Frame falls Prone and is permanently immobilized.' },
  },
};

/** Clamp a crit roll into table range. HEI can push a 6 to 7; 7+ resolves as 6. */
export function lookupCrit(tableKey, roll) {
  const table = CRIT_TABLES[tableKey];
  if (!table) throw new Error(`Unknown crit table: ${tableKey}`);
  const clamped = Math.min(6, Math.max(1, roll));
  return { ...table[clamped], roll: clamped, table: tableKey };
}

// --- Terrain (rules.md 3.1, 3.5) -------------------------------------------

export const TERRAIN = {
  clear: { name: 'Clear', extraEP: 0, cover: 0, evaCap: null, cooling: 0, pilotMod: 0 },
  paved: { name: 'Paved', extraEP: 0, cover: 0, evaCap: null, cooling: 0, pilotMod: 1 },
  rough: { name: 'Rough', extraEP: 1, cover: 0, evaCap: null, cooling: 0, pilotMod: -1 },
  waterShallow: { name: 'Water (Shallow)', extraEP: 1, cover: 0, evaCap: 2, cooling: 1, pilotMod: 0 },
  waterDeep: { name: 'Water (Deep)', extraEP: 2, cover: 0, evaCap: 1, cooling: 2, pilotMod: -1 },
  woodsLight: { name: 'Woods (Light)', extraEP: 1, cover: 1, evaCap: null, cooling: 0, pilotMod: 0 },
  woodsHeavy: { name: 'Woods (Heavy)', extraEP: 2, cover: 2, evaCap: null, cooling: 0, pilotMod: 0 },
  urbanAdjacent: { name: 'Adjacent to Building', extraEP: 0, cover: 2, evaCap: null, cooling: 0, pilotMod: 0 },
};

export const TERRAIN_KEYS = Object.keys(TERRAIN);

// Heavy Woods are impassable on foot to Heavy and Assault frames (rules.md 3.2).
export const HEAVY_WOODS_BLOCKED_CLASSES = ['heavy', 'assault'];

// --- Weight classes (rules.md 1.1) -----------------------------------------

export const WEIGHT_CLASSES = {
  light: { name: 'Light', massValue: 1, tons: [20, 35], baseMovement: 7 },
  medium: { name: 'Medium', massValue: 2, tons: [40, 55], baseMovement: 5 },
  heavy: { name: 'Heavy', massValue: 3, tons: [60, 75], baseMovement: 4 },
  assault: { name: 'Assault', massValue: 4, tons: [80, 100], baseMovement: 3 },
};

export function weightClassForTons(tons) {
  if (tons <= 35) return 'light';
  if (tons <= 55) return 'medium';
  if (tons <= 75) return 'heavy';
  return 'assault';
}

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

export const EVA_PER_HEX = { walk: 1, reverse: 1, jump: 2 };

// --- Weapons (rules.md 5, plus per-frame sheet values) ---------------------
// `damage` is expressed as { dice, sides, flat }. Weapons whose EP cost or
// cooldown differs per frame carry overrides in data/frames.js.

export const WEAPONS = {
  autocannon: {
    name: 'Autocannon',
    hardpoint: 'light',
    epCost: 1, // per burst
    damage: { dice: 1, sides: 6, flat: 0 }, // rolled 3x per burst, resolved separately
    burstDice: 3,
    rapidFire: true,
    explosiveAmmo: true,
    detection: 'any',
    ammoUnit: 'Bursts',
    note: '3-round burst. Each 1d6 resolved separately vs DR. Can fire Full Auto.',
  },
  laser: {
    name: 'Laser',
    hardpoint: 'light',
    epCost: 2,
    damage: { dice: 2, sides: 6, flat: 0 },
    infiniteAmmo: true,
    detection: 'any',
    overcharge: [
      { ep: 1, flat: 2, label: '+1 EP → +2 damage' },
      { ep: 2, flat: 4, label: '+2 EP → +4 damage' },
    ],
  },
  thermalLance: {
    name: 'Thermal Lance',
    hardpoint: 'heavy',
    epCost: 4,
    damage: { dice: 3, sides: 6, flat: 0 },
    infiniteAmmo: true,
    detection: 'any',
    overcharge: [
      { ep: 2, flat: 3, label: '+2 EP → +3 damage' },
      { ep: 4, flat: 6, label: '+4 EP → +6 damage' },
    ],
  },
  railGun: {
    name: 'Rail Gun',
    hardpoint: 'heavy',
    epCost: 6,
    damage: { dice: 3, sides: 6, flat: 10 },
    ap: 3,
    cooldown: 1,
    explosiveAmmo: false, // inert slugs — do not trigger Ammo Explosion
    detection: 'any',
    ammoUnit: 'Slugs',
  },
  disruptorCannon: {
    name: 'Disruptor Cannon',
    hardpoint: 'medium',
    epCost: 3,
    damage: null, // deals no damage
    infiniteAmmo: true,
    detection: 'any',
    bypassesEvasion: true,
    bypassesArmor: true,
    disruptor: true,
    overcharge: [{ ep: 2, label: '+2 EP → force Crit AND drain 1d6 EP' }],
    note: 'Torso hit (7, 12) drains 1d6 EP. Limb/Head hit forces a Critical.',
  },
  guidedMissiles: {
    name: 'Guided Missiles',
    hardpoint: 'medium',
    epCost: 2,
    aoe: true, // bypasses Evasion
    explosiveAmmo: true,
    indirectFire: true,
    ammoUnit: 'Salvos',
    warheads: {
      he: { name: 'High Explosive', damage: { dice: 3, sides: 6, flat: 0 }, splash: { dice: 1, sides: 6, flat: 0 } },
      cluster: { name: 'Cluster', allLocations: { dice: 2, sides: 6, flat: 0 } },
      emp: { name: 'EMP', noDamage: true, critsOnZeroDR: true, scramblesSensors: true },
    },
  },
};

// Autocannon munitions (rules.md 5.1)
export const AMMO_TYPES = {
  ap: { name: 'AP', ap: 1, critMod: 0, damageMod: 0, note: 'Ignores 1 point of Armor DR per hit.' },
  hei: { name: 'HEI', ap: 0, critMod: 1, damageMod: 0, note: 'Adds +1 to Critical Hit rolls.' },
  tracer: { name: 'Tracer', ap: 0, critMod: 0, damageMod: -1, paints: true, note: '−1 per damage die. A hit paints the target: −1 EVA vs all friendly fire this phase.' },
};

// --- Active systems (rules.md 4.2) -----------------------------------------

export const SYSTEM_UPKEEP = {
  amc: 2, // per spectrum band; +2 to cloak a second band (overcharge)
  ecm: 1, // +1 per hex of radius (overcharge)
};

export const SENSOR_BANDS = { vis: 'Visual', ir: 'Infrared', rad: 'Microwave' };

// Spending this much EP in a turn exposes the frame to IR locks (rules.md 4.1).
// Stealth upkeep paid in the Energy Phase counts toward this.
export const IR_LOCK_THRESHOLD = 5;

// A single Full Auto attack may fire at most this many bursts (rules.md 5.0).
export const MAX_FULL_AUTO_BURSTS = 3;

export const PILOT_CHECK_TN = 6;
