// Iron Protocol — the five roster frames (rules.md section 8 + frames/*.md).
//
// Where the roster text and the printable frame sheet disagree, the frame sheet
// wins, since it is the more detailed readout. Divergences are noted inline and
// listed in docs/README.md.

/**
 * Weapon mount shape:
 *   key      — WEAPONS key from data/tables.js
 *   loc      — mount location; determines firing arc
 *   epCost   — overrides the weapon default when the frame sheet differs
 *   ammo     — { <ammoType>: count } for ammo weapons, omitted for infinite
 *   warhead  — for guidedMissiles
 *   guidance — for guidedMissiles: 'vis' | 'ir' | 'rad'
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
    points: 370,
    reactor: 8,
    capacitorMax: 3,
    evasionLimit: 6,
    // Sheet and roster both say 7, above the Light class baseline of 6. Frame value wins.
    movementLimit: 7,
    locations: {
      head: { dr: 2, is: 4 },
      torso: { dr: 2, is: 8 },
      leftArm: { dr: 1, is: 4 },
      rightArm: { dr: 1, is: 4 },
      leftLeg: { dr: 2, is: 5 },
      rightLeg: { dr: 2, is: 5 },
    },
    weapons: [
      { key: 'laser', loc: 'leftArm' },
      { key: 'autocannon', loc: 'rightArm', ammo: { ap: 10 } },
    ],
    systems: {
      jumpJets: true,
      datalink: true,
      amc: null,
      ecm: null,
      flares: 0,
      smoke: 0,
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
    evasionLimit: 5,
    movementLimit: 5,
    locations: {
      head: { dr: 3, is: 5 },
      torso: { dr: 4, is: 10 },
      leftArm: { dr: 2, is: 6 },
      rightArm: { dr: 2, is: 6 },
      leftLeg: { dr: 3, is: 8 },
      rightLeg: { dr: 3, is: 8 },
    },
    weapons: [
      { key: 'laser', loc: 'leftArm' },
      { key: 'disruptorCannon', loc: 'rightArm' },
    ],
    systems: {
      jumpJets: false,
      datalink: true,
      amc: { bands: [] }, // cloaks one spectrum for 2 EP; +2 EP for a second
      ecm: null,
      flares: 0,
      smoke: 0,
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
    points: 430,
    reactor: 12,
    capacitorMax: 6,
    evasionLimit: 4,
    movementLimit: 5,
    locations: {
      head: { dr: 4, is: 6 },
      torso: { dr: 5, is: 12 },
      leftArm: { dr: 3, is: 8 },
      rightArm: { dr: 3, is: 8 },
      leftLeg: { dr: 4, is: 10 },
      rightLeg: { dr: 4, is: 10 },
    },
    weapons: [
      { key: 'autocannon', loc: 'leftArm', ammo: { ap: 5, hei: 5 } },
      { key: 'laser', loc: 'rightArm' },
    ],
    systems: {
      jumpJets: false,
      datalink: true,
      amc: null,
      ecm: { radius: 0 },
      flares: 3,
      smoke: 0,
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
    points: 540,
    reactor: 14,
    capacitorMax: 8,
    evasionLimit: 2,
    movementLimit: 4,
    locations: {
      head: { dr: 4, is: 7 },
      torso: { dr: 6, is: 16 },
      leftArm: { dr: 4, is: 10 },
      rightArm: { dr: 4, is: 10 },
      leftLeg: { dr: 5, is: 12 },
      rightLeg: { dr: 5, is: 12 },
    },
    weapons: [
      // Sheet: 6 EP flat with a 1-turn cooldown, rather than the section 5
      // "0 EP base, requires +6 EP overcharge" phrasing. Same net EP either way.
      { key: 'railGun', loc: 'rightArm', epCost: 6, ammo: { slug: 5 } },
      { key: 'autocannon', loc: 'leftArm', ammo: { ap: 10 } },
      { key: 'guidedMissiles', loc: 'torso', guidance: 'rad', warhead: 'cluster', ammo: { salvo: 4 } },
    ],
    systems: {
      jumpJets: false,
      datalink: true,
      amc: null,
      ecm: null,
      flares: 3,
      smoke: 2,
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
    points: 655,
    reactor: 18,
    capacitorMax: 10,
    evasionLimit: 1,
    movementLimit: 3,
    locations: {
      head: { dr: 4, is: 8 },
      torso: { dr: 7, is: 20 },
      leftArm: { dr: 5, is: 12 },
      rightArm: { dr: 5, is: 12 },
      leftLeg: { dr: 6, is: 15 },
      rightLeg: { dr: 6, is: 15 },
    },
    weapons: [
      { key: 'thermalLance', loc: 'leftArm' },
      // Sheet keeps the section 5 phrasing: 0 EP base, mandatory +6 EP overcharge.
      { key: 'railGun', loc: 'rightArm', epCost: 0, requiresOvercharge: 6, ammo: { slug: 5 } },
      { key: 'guidedMissiles', loc: 'torso', guidance: 'ir', warhead: 'emp', ammo: { salvo: 4 } },
    ],
    systems: {
      jumpJets: false,
      datalink: true,
      amc: null,
      ecm: null,
      flares: 3,
      smoke: 2,
    },
  },
};

export const FRAME_KEYS = Object.keys(FRAME_PRESETS);

export function getPreset(key) {
  const preset = FRAME_PRESETS[key];
  if (!preset) throw new Error(`Unknown frame preset: ${key}`);
  return preset;
}
