// Iron Protocol — the five roster frames (rules.md section 8 + frames/*.md).
//
// The printable frame sheet is the source of truth. Every value here is checked
// against frames/*.md by the test suite, and every frame is proved to cost out
// exactly under the section 7.2 construction rules.
//
// Note there is no Internal Structure and no Evasion. Armor DR is a Frame's only
// durability stat, and it is a threshold rather than a pool (rules.md 7.2.1).

/**
 * Weapon mount shape:
 *   key       — WEAPONS key from data/tables.js
 *   loc       — mount location; determines firing arc (rules.md 1.3)
 *   hardpoint — size of the mount it occupies
 *   ammoType  — autocannon only: 'ap' | 'hei', chosen at build time (rules.md 5.1)
 *   warhead   — guidedMissiles only: 'he' | 'cluster' | 'emp'
 *   guidance  — guidedMissiles only: 'vis' | 'ir' | 'rad'
 *
 * Systems are booleans: each mounted launcher carries its own Ammo Die, so there
 * are no counters to track.
 */

export const FRAME_PRESETS = {
  jackal: {
    key: 'jackal',
    designation: 'IF-25L-1',
    name: 'Jackal',
    role: 'Light Recon Frame',
    image: 'if_25l_1_jackal.jpg',
    initiative: 12,
    tons: 25,
    weightClass: 'light',
    points: 365,
    reactor: 8,
    capacitorMax: 3,
    movementLimit: 7,
    hardpoints: { head: '1L', torso: '2L', leftArm: '1L', rightArm: '1L' },
    locations: { head: 3, torso: 3, leftArm: 2, rightArm: 2, leftLeg: 3, rightLeg: 3 },
    weapons: [
      { key: 'laser', loc: 'leftArm', hardpoint: 'light' },
      { key: 'autocannon', loc: 'rightArm', hardpoint: 'light', ammoType: 'ap' },
    ],
    systems: {
      datalink: true,
      jumpJets: true, // Torso Light hardpoint; propellant is a volatile store
      adaptiveSkin: false,
      ecm: false,
      dircm: false,
      chaff: false,
      smoke: false,
    },
  },

  specter: {
    key: 'specter',
    designation: 'IF-45M-1',
    name: 'Specter',
    role: 'Medium Stealth Frame',
    image: 'if_45m_1_specter.jpg',
    initiative: 10,
    tons: 45,
    weightClass: 'medium',
    points: 435,
    reactor: 9,
    capacitorMax: 4,
    movementLimit: 5,
    hardpoints: { head: '1L', torso: '1M+2L', leftArm: '1M', rightArm: '1M' },
    locations: { head: 4, torso: 5, leftArm: 3, rightArm: 3, leftLeg: 4, rightLeg: 4 },
    weapons: [
      { key: 'laser', loc: 'leftArm', hardpoint: 'medium' },
      { key: 'disruptorCannon', loc: 'rightArm', hardpoint: 'medium' },
    ],
    systems: {
      datalink: true,
      jumpJets: false,
      adaptiveSkin: true, // Torso Medium hardpoint; both Light mounts left empty
      ecm: false,
      dircm: false,
      chaff: false,
      smoke: false,
    },
  },

  vanguard: {
    key: 'vanguard',
    designation: 'IF-55M-1',
    name: 'Vanguard',
    role: 'Medium Skirmisher Frame',
    image: 'if_55m_1_vanguard.jpg',
    initiative: 6,
    tons: 55,
    weightClass: 'medium',
    points: 455,
    reactor: 12,
    capacitorMax: 6,
    movementLimit: 5,
    hardpoints: { head: '1L', torso: '1M+2L', leftArm: '1M', rightArm: '1M' },
    locations: { head: 5, torso: 6, leftArm: 4, rightArm: 4, leftLeg: 5, rightLeg: 5 },
    weapons: [
      { key: 'autocannon', loc: 'leftArm', hardpoint: 'medium', ammoType: 'ap' },
      { key: 'laser', loc: 'rightArm', hardpoint: 'medium' },
    ],
    systems: {
      datalink: true,
      jumpJets: false,
      adaptiveSkin: false,
      ecm: true, // Torso Medium hardpoint
      dircm: true,
      chaff: true,
      smoke: false,
    },
  },

  paladin: {
    key: 'paladin',
    designation: 'IF-75H-1',
    name: 'Paladin',
    role: 'Heavy Fire-Support Frame',
    image: 'if_75h_1_paladin.jpg',
    initiative: 5,
    tons: 75,
    weightClass: 'heavy',
    points: 555,
    reactor: 14,
    capacitorMax: 8,
    movementLimit: 4,
    hardpoints: { head: '1L', torso: '1M+3L', leftArm: '1H', rightArm: '1H' },
    locations: { head: 5, torso: 7, leftArm: 5, rightArm: 5, leftLeg: 6, rightLeg: 6 },
    weapons: [
      { key: 'railGun', loc: 'rightArm', hardpoint: 'heavy' },
      { key: 'autocannon', loc: 'leftArm', hardpoint: 'heavy', ammoType: 'ap' },
      { key: 'guidedMissiles', loc: 'torso', hardpoint: 'medium', guidance: 'ir', warhead: 'cluster' },
    ],
    systems: {
      datalink: true,
      jumpJets: false,
      adaptiveSkin: false,
      ecm: false,
      dircm: true,
      chaff: true,
      smoke: true,
    },
  },

  colossus: {
    key: 'colossus',
    designation: 'IF-90A-1',
    name: 'Colossus',
    role: 'Heavy Assault Frame',
    image: 'if_90a_1_colossus.jpg',
    initiative: 3,
    tons: 90,
    weightClass: 'assault',
    points: 680,
    reactor: 18,
    capacitorMax: 10,
    movementLimit: 3, // one hex short of the Flank Speed threshold, permanently
    hardpoints: { head: '1L', torso: '2M+3L', leftArm: '1H', rightArm: '1H' },
    locations: { head: 6, torso: 8, leftArm: 6, rightArm: 6, leftLeg: 7, rightLeg: 7 },
    weapons: [
      { key: 'thermalLance', loc: 'leftArm', hardpoint: 'heavy' },
      { key: 'railGun', loc: 'rightArm', hardpoint: 'heavy' },
      { key: 'guidedMissiles', loc: 'torso', hardpoint: 'medium', guidance: 'vis', warhead: 'emp' },
    ],
    systems: {
      datalink: true,
      jumpJets: false, // Assault chassis can never mount them
      adaptiveSkin: false,
      ecm: false,
      dircm: true,
      chaff: true,
      smoke: true,
    },
  },
};

export const FRAME_KEYS = Object.keys(FRAME_PRESETS);

export function getPreset(key) {
  const preset = FRAME_PRESETS[key];
  if (!preset) throw new Error(`Unknown frame preset: ${key}`);
  return preset;
}

/**
 * Build a fresh combat-ready frame from a preset.
 *
 * This is the canonical in-play shape the rules engine operates on. state.js
 * wraps it with ids, ownership and sync fields; the engine itself never needs
 * to know about any of that.
 *
 * Note `crits` is a MAP of slot -> true, not an array. Firebase merges per path,
 * so two players marking different slots on the same location never conflict.
 */
export function instantiate(presetKey) {
  const preset = getPreset(presetKey);
  const locations = {};
  for (const [key, dr] of Object.entries(preset.locations)) {
    locations[key] = { dr, drMax: dr, crits: {}, destroyed: false, actuatorDestroyed: false };
  }
  const weapons = preset.weapons.map((mount, i) => ({
    id: `${mount.key}-${mount.loc}-${i}`,
    key: mount.key,
    name: mount.key,
    loc: mount.loc,
    hardpoint: mount.hardpoint,
    ammoType: mount.ammoType || null,
    guidance: mount.guidance || null,
    warhead: mount.warhead || null,
    empty: false,
    destroyed: false,
    firedThisTurn: false,
    cooldown: 0,
  }));
  return {
    presetKey,
    designation: preset.designation,
    name: preset.name,
    role: preset.role,
    image: preset.image,
    initiative: preset.initiative,
    initiativeMod: 0,
    pilotBonus: 0,
    vow: null,
    dishonored: false,
    tons: preset.tons,
    weightClass: preset.weightClass,
    points: preset.points,
    reactor: preset.reactor,
    reactorMod: 0,
    capacitorMax: preset.capacitorMax,
    capacitorMaxMod: 0,
    movementLimit: preset.movementLimit,
    movementLimitMod: 0,
    locations,
    weapons,
    systems: { ...preset.systems },

    // live turn state
    ep: 0,
    capacitor: 0,
    epSpentThisTurn: 0,
    hexesMoved: 0,
    flankSpeed: false,
    terrain: 'clear',
    prone: false,
    torsoFacing: 'center',        // relative to Leg Facing (rules.md 1.2)
    torsoTwistedThisTurn: false,  // once per activation
    destroyed: false,

    // sustained systems
    adaptiveSkinActive: false,
    adaptiveSkinBands: 1,
    adaptiveSkinBandKeys: [],
    ecmActive: false,
    ecmRadius: 0,
    inSmoke: false,
    chaffEmpty: false,
    smokeEmpty: false,
    jumpJetsEmpty: false,

    // persistent damage flags, set by rules.applyCrit
    systemGlitch: false,
    servoLock: false,
    servoStutter: false,
    kneeLock: false,
    electricalFire: false,
    calibrationDrift: false,
    locksDropped: false,
    datalinkSevered: false,
    sensorsScrambled: false,
    sensorBandsDestroyed: {},
    hardpointFailure: {},
    targetingJitter: {},
    armEPMod: {},
    loyaltyCover: 0,
  };
}

// --- Construction costs (rules.md 7.2) -------------------------------------
// Kept beside the presets so the test suite can prove each roster frame costs
// out to its printed point value exactly.

export const CHASSIS = {
  light: { base: 180, init: 8, move: 5, reactor: 6, capacitor: 2, maxInit: 12, maxMove: 7,
           dr: { head: 3, torso: 3, arm: 2, leg: 3 }, cap: { head: 4, torso: 4, arm: 3, leg: 4 } },
  medium: { base: 230, init: 6, move: 4, reactor: 6, capacitor: 2, maxInit: 10, maxMove: 5,
            dr: { head: 4, torso: 5, arm: 3, leg: 4 }, cap: { head: 5, torso: 6, arm: 4, leg: 5 } },
  heavy: { base: 280, init: 4, move: 3, reactor: 5, capacitor: 2, maxInit: 6, maxMove: 4,
           dr: { head: 5, torso: 7, arm: 5, leg: 6 }, cap: { head: 6, torso: 8, arm: 6, leg: 7 } },
  assault: { base: 330, init: 2, move: 2, reactor: 5, capacitor: 2, maxInit: 4, maxMove: 3,
             dr: { head: 5, torso: 8, arm: 6, leg: 7 }, cap: { head: 6, torso: 9, arm: 7, leg: 8 } },
};

export const UPGRADE_COSTS = {
  initiative: 15,
  movement: 20,
  armorDR: 5, // per +1 DR to a single location
  reactor: 10,
  capacitor: 5,
};

export const EQUIPMENT_COSTS = {
  smoke: 10,
  dircm: 15,
  chaff: 15,
  datalink: 15,
  jumpJets: 20,
  ecm: 25,
  adaptiveSkin: 30,
  autocannon: 10,
  laser: 15,
  guidedMissiles: 20,
  disruptorCannon: 25,
  thermalLance: 30,
  railGun: 35,
};

export const PILOT_COSTS = { 1: 15, 2: 30, 3: 45 };

/** Sum a preset's cost under the section 7.2 construction rules. */
export function costOut(preset) {
  const c = CHASSIS[preset.weightClass];
  let total = c.base;
  total += (preset.initiative - c.init) * UPGRADE_COSTS.initiative;
  total += (preset.movementLimit - c.move) * UPGRADE_COSTS.movement;
  total += (preset.reactor - c.reactor) * UPGRADE_COSTS.reactor;
  total += (preset.capacitorMax - c.capacitor) * UPGRADE_COSTS.capacitor;
  for (const [loc, dr] of Object.entries(preset.locations)) {
    const band = loc.includes('Arm') ? 'arm' : loc.includes('Leg') ? 'leg' : loc;
    total += (dr - c.dr[band]) * UPGRADE_COSTS.armorDR;
  }
  for (const w of preset.weapons) total += EQUIPMENT_COSTS[w.key];
  for (const [sys, on] of Object.entries(preset.systems)) {
    if (on && EQUIPMENT_COSTS[sys]) total += EQUIPMENT_COSTS[sys];
  }
  return total;
}
