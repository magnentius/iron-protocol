// Iron Protocol — battle state: model, persistence, subscriptions.
//
// Local-first. The battle lives in localStorage and the app is fully playable
// with sync switched off; sync.js mirrors this state to Firebase when a room is
// joined. Rendering always reads from here, never from the network.

import { FRAME_PRESETS, getPreset, instantiate } from './data/frames.js';
import { effectiveCapacitorMax, endPhase, energyPhase, isDestroyed, turnOrder } from './rules.js';

// Bump this whenever the frame or battle shape changes incompatibly. A stored
// battle from an older schema is discarded rather than migrated: the overhaul
// replaced Internal Structure and Evasion with threshold Armor DR and cascading
// crit slots, so there is nothing sensible to map an old save onto.
export const SCHEMA_VERSION = 2;

const STORAGE_KEY = 'ironprotocol.battle.v2';
const LEGACY_KEYS = ['ironprotocol.battle.v1'];
const DEVICE_KEY = 'ironprotocol.deviceId';

export const PHASES = ['energy', 'activation', 'combat', 'end'];
export const PHASE_NAMES = {
  energy: 'Energy',
  activation: 'Activation',
  combat: 'Combat',
  end: 'End',
};

// Set when a stored battle had to be thrown away, so the UI can say so plainly
// instead of the player wondering where their game went.
let loadNotice = null;
export function takeLoadNotice() {
  const n = loadNotice;
  loadNotice = null;
  return n;
}

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
 * Build a live frame from a roster preset.
 *
 * The combat shape comes from data/frames.js `instantiate()`, which is what the
 * rules engine understands. Everything added here is about identity, ownership
 * and presentation — the engine never needs any of it.
 */
export function createFrame(presetKey, { id, ownerId, team = 'a', callsign = null, pilotBonus = 0, vow = null } = {}) {
  const preset = getPreset(presetKey);
  const frame = instantiate(presetKey);

  return Object.assign(frame, {
    id: id || `${presetKey}-${randomId(4)}`,
    ownerId: ownerId || deviceId(),
    team,
    callsign: callsign || preset.name,
    pilotBonus,
    vow,
    dishonored: false,
    log: [],
  });
}

export function createBattle({ code = newRoomCode() } = {}) {
  return {
    id: code,
    version: SCHEMA_VERSION,
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

/**
 * Is this object shaped like a battle this build can actually run?
 *
 * Checked structurally as well as by version number, because a battle written
 * by a mid-overhaul build may carry the right version and the wrong shape.
 */
export function isCompatible(candidate) {
  if (!candidate || typeof candidate !== 'object') return false;
  if (candidate.version !== SCHEMA_VERSION) return false;
  const frames = Object.values(candidate.frames || {});
  return frames.every((f) => {
    const torso = f?.locations?.torso;
    if (!torso) return false;
    // The retired model: an Internal Structure pool and an Evasion stat.
    if (torso.is !== undefined || f.evasionLimit !== undefined) return false;
    // The current model: DR plus a map of marked crit slots.
    return typeof torso.dr === 'number' && torso.crits !== undefined && !Array.isArray(torso.crits);
  });
}

function load() {
  // Sweep away saves from the pre-overhaul rules so they cannot be picked up.
  for (const key of LEGACY_KEYS) {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      loadNotice = 'A saved battle from the previous rules was discarded — the damage model changed and it could not be converted.';
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isCompatible(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      loadNotice = 'A saved battle from an incompatible version was discarded. Starting fresh.';
      return null;
    }
    return parsed;
  } catch (err) {
    console.warn('Could not read stored battle state', err);
    localStorage.removeItem(STORAGE_KEY);
    loadNotice = 'The saved battle could not be read and was discarded.';
    return null;
  }
}

/** Apply a remote snapshot without echoing it straight back to the network. */
export function applyRemote(next) {
  if (!isCompatible(next)) {
    loadNotice = 'The shared battle was created by an incompatible version and was ignored.';
    notify();
    return false;
  }
  suppressPersist = false;
  battle = next;
  save();
  notify();
  return true;
}

/**
 * Clear the battle, keeping the room code.
 *
 * createBattle() mints a fresh code by default, which is right for a new game
 * but wrong here: sync stays bound to `battles/<old code>`, so a reset that
 * changed the id would orphan the local battle and let the peer's next snapshot
 * overwrite it — the reset would silently undo itself. Keeping the code means
 * the clear propagates to the room, as a player would expect.
 */
export function resetBattle() {
  const code = battle?.id;
  setBattle(createBattle(code ? { code } : {}));
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
    if (isDestroyed(frame)) continue;
    const report = energyPhase(frame);
    reports.push({ frameId: frame.id, type: 'energy', report });
    const upkeep = report.upkeep ? `, −${report.upkeep} upkeep` : '';
    const glitch = report.glitch ? ', −1 System Glitch' : '';
    logFrame(frame, `Energy Phase: +${report.generated} EP${upkeep}${glitch} → ${frame.ep} EP in pool`);
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
        if (isDestroyed(frame)) continue;
        const report = endPhase(frame);
        reports.push({ frameId: frame.id, type: 'end', report });
        if (report.fire) {
          logFrame(frame, 'Electrical Fire burns: 1 Torso Critical');
        }
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
