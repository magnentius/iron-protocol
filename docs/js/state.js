// Iron Protocol — battle state: model, persistence, subscriptions.
//
// Local-first. The battle lives in localStorage and the app is fully playable
// with sync switched off; sync.js mirrors this state to Firebase when a room is
// joined. Rendering always reads from here, never from the network.

import { FRAME_PRESETS, getPreset } from './data/frames.js';
import { LOCATIONS, WEAPONS } from './data/tables.js';
import { effectiveCapacitorMax, endPhase, energyPhase, turnOrder } from './rules.js';

const STORAGE_KEY = 'ironprotocol.battle.v1';
const DEVICE_KEY = 'ironprotocol.deviceId';

export const PHASES = ['energy', 'activation', 'combat', 'end'];
export const PHASE_NAMES = {
  energy: 'Energy',
  activation: 'Activation',
  combat: 'Combat',
  end: 'End',
};

// --- Identity ---------------------------------------------------------------

export function deviceId() {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = randomId(8);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

function randomId(length = 6) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no confusable characters
  let out = '';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return out;
}

export function newRoomCode() {
  return randomId(4);
}

// --- Frame construction -----------------------------------------------------

/**
 * Build a live frame from a roster preset. All mutable battle state lives on
 * this object; the preset itself is never mutated.
 */
export function createFrame(presetKey, { id, ownerId, team = 'a', callsign = null, pilotBonus = 0 } = {}) {
  const preset = getPreset(presetKey);

  const locations = {};
  for (const key of LOCATIONS) {
    const base = preset.locations[key];
    locations[key] = { dr: base.dr, drMax: base.dr, is: base.is, isMax: base.is, destroyed: false };
  }

  const weapons = preset.weapons.map((mount, index) => {
    const def = WEAPONS[mount.key];
    return {
      id: `${mount.key}-${mount.loc}-${index}`,
      key: mount.key,
      loc: mount.loc,
      name: def.name,
      epCost: mount.epCost ?? def.epCost,
      epMod: 0,
      requiresOvercharge: mount.requiresOvercharge || 0,
      guidance: mount.guidance || null,
      warhead: mount.warhead || null,
      ammo: mount.ammo ? { ...mount.ammo } : null,
      ammoMax: mount.ammo ? { ...mount.ammo } : null,
      cooldown: 0,
      firedThisTurn: false,
      destroyed: false,
      disabled: false,
      forwardArcOnly: false,
    };
  });

  return {
    id: id || `${presetKey}-${randomId(4)}`,
    presetKey,
    ownerId: ownerId || deviceId(),
    team,
    callsign: callsign || preset.name,
    designation: preset.designation,
    name: preset.name,
    role: preset.role,
    image: preset.image,

    initiative: preset.initiative,
    initiativeMod: 0,
    tons: preset.tons,
    weightClass: preset.weightClass,
    points: preset.points,

    reactor: preset.reactor,
    reactorMod: 0,
    capacitorMax: preset.capacitorMax,
    capacitorMaxMod: 0,
    evasionLimit: preset.evasionLimit,
    evasionLimitMod: 0,
    movementLimit: preset.movementLimit,
    movementLimitMod: 0,

    // Live turn state
    ep: 0,
    capacitor: 0,
    overchargeAvailable: 0,
    epSpentThisTurn: 0,
    eva: 0,
    hexesMoved: 0,
    terrain: 'clear',
    prone: false,
    painted: false,

    // Persistent damage flags, set by rules.applyCrit
    destroyed: false,
    immobilized: false,
    kneeLock: false,
    gyroLock: false,
    jumpJetsDisabled: false,
    commStatic: false,
    sensorsDown: false,
    sensorsScrambled: false,
    sensorRangeCap: null,
    pilotStunned: false,
    systemGlitch: false,
    pilotCheckMod: 0,
    pilotBonus,

    locations,
    weapons,
    systems: {
      jumpJets: preset.systems.jumpJets,
      datalink: preset.systems.datalink,
      amc: preset.systems.amc ? { active: false, bands: [] } : null,
      ecm: preset.systems.ecm ? { active: false, radius: 0 } : null,
      flares: preset.systems.flares,
      flaresMax: preset.systems.flares,
      smoke: preset.systems.smoke,
      smokeMax: preset.systems.smoke,
    },
    crits: [],
    log: [],
  };
}

export function createBattle({ code = newRoomCode() } = {}) {
  return {
    id: code,
    createdAt: Date.now(),
    round: 1,
    phase: 'energy',
    // Whether this round's reactor generation has already been applied. Round 1
    // starts in the Energy Phase without having been entered, so generation is
    // driven by this flag rather than by the phase transition.
    energyGenerated: false,
    advantagePlayer: null,
    frames: {},
    log: [],
  };
}

// --- Store ------------------------------------------------------------------

let battle = null;
const listeners = new Set();
let suppressPersist = false;

export function getBattle() {
  if (!battle) battle = load() || createBattle();
  return battle;
}

export function setBattle(next, { silent = false, persist = true } = {}) {
  battle = next;
  if (persist) save();
  if (!silent) notify();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) fn(battle);
}

/**
 * Run a mutation against the battle, then persist and notify once.
 * Returns whatever the mutator returned, so callers can surface a report.
 */
export function mutate(fn) {
  const b = getBattle();
  const result = fn(b);
  save();
  notify();
  return result;
}

function save() {
  if (suppressPersist) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(battle));
  } catch (err) {
    console.warn('Could not persist battle state', err);
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Could not read stored battle state', err);
    return null;
  }
}

/** Apply a remote snapshot without echoing it straight back to the network. */
export function applyRemote(next) {
  suppressPersist = false;
  battle = next;
  save();
  notify();
}

export function resetBattle() {
  setBattle(createBattle());
}

// --- Frame helpers ----------------------------------------------------------

export function framesList(b = getBattle()) {
  return Object.values(b.frames || {});
}

export function getFrame(frameId, b = getBattle()) {
  return b.frames?.[frameId] || null;
}

export function myFrames(b = getBattle()) {
  const me = deviceId();
  return framesList(b).filter((f) => f.ownerId === me);
}

export function enemyFrames(b = getBattle()) {
  const me = deviceId();
  return framesList(b).filter((f) => f.ownerId !== me);
}

export function addFrame(presetKey, opts = {}) {
  return mutate((b) => {
    const frame = createFrame(presetKey, opts);
    // Deploying after this round's energy has already been generated would
    // otherwise leave the frame sitting at 0 EP for a full round.
    if (b.energyGenerated) energyPhase(frame);
    b.frames[frame.id] = frame;
    logBattle(b, `${frame.callsign} deployed`);
    return frame;
  });
}

export function removeFrame(frameId) {
  mutate((b) => {
    const frame = b.frames[frameId];
    delete b.frames[frameId];
    if (frame) logBattle(b, `${frame.callsign} withdrawn`);
  });
}

export function orderedFrames(b = getBattle()) {
  return turnOrder(framesList(b), b.phase);
}

// --- Logging ----------------------------------------------------------------

export function logBattle(b, text) {
  b.log = b.log || [];
  b.log.unshift({ at: Date.now(), round: b.round, phase: b.phase, text });
  if (b.log.length > 200) b.log.length = 200;
}

export function logFrame(frame, text) {
  frame.log = frame.log || [];
  frame.log.unshift({ at: Date.now(), text });
  if (frame.log.length > 50) frame.log.length = 50;
}

// --- Phase advance ----------------------------------------------------------

/** Generate this round's energy, unless it has already been generated. */
function generateEnergy(b, reports) {
  if (b.energyGenerated) return reports;
  for (const frame of framesList(b)) {
    if (frame.destroyed) continue;
    const report = energyPhase(frame);
    reports.push({ frameId: frame.id, type: 'energy', report });
    logFrame(frame, report.stunned
      ? 'Energy Phase: pilot stunned — 0 EP, capacitor drained'
      : `Energy Phase: +${report.generated} EP${report.upkeep ? `, −${report.upkeep} upkeep` : ''} → ${report.pool} EP`);
  }
  b.energyGenerated = true;
  return reports;
}

/**
 * Step the battle to the next phase, running the automatic bookkeeping that
 * belongs to the phase being entered (Energy) or left (End).
 */
export function advancePhase() {
  return mutate((b) => {
    const index = PHASES.indexOf(b.phase);
    const reports = [];

    if (b.phase === 'end') {
      for (const frame of framesList(b)) {
        if (frame.destroyed) continue;
        const report = endPhase(frame);
        reports.push({ frameId: frame.id, type: 'end', report });
        if (report.vented > 0) {
          logFrame(frame, `Banked ${report.banked} EP, vented ${report.vented} (Capacitor max ${report.capMax})`);
        }
      }
      b.round += 1;
      b.phase = 'energy';
      b.energyGenerated = false;
      logBattle(b, `Round ${b.round} begins`);
      generateEnergy(b, reports);
      return reports;
    }

    b.phase = PHASES[index + 1];

    // Safety net: leaving the Energy Phase without having generated (round 1,
    // or a battle restored mid-phase) still gets the frames their EP.
    if (b.phase === 'activation') generateEnergy(b, reports);

    logBattle(b, `${PHASE_NAMES[b.phase]} Phase`);
    return reports;
  });
}

/** Explicitly run the Energy Phase for every frame. */
export function runEnergyPhase() {
  return mutate((b) => {
    const reports = generateEnergy(b, []);
    if (reports.length) logBattle(b, 'Energy generated');
    return reports;
  });
}

export { effectiveCapacitorMax, FRAME_PRESETS };
