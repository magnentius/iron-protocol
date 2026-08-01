// Iron Protocol — battle state: model, persistence, subscriptions.
//
// Local-first. The battle lives in localStorage and the app is fully playable
// with sync switched off; sync.js mirrors this state to Firebase when a room is
// joined. Rendering always reads from here, never from the network.

import { FRAME_PRESETS, getPreset, instantiate } from './data/frames.js';
import {
  effectiveCapacitorMax, effectiveInitiative, endPhase, energyPhase, isDestroyed, turnOrder,
} from './rules.js';

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
    // Same idea for the End Phase, which also settles on entry: guards against
    // banking twice if the phase is re-entered or arrives from a peer.
    endResolved: false,
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
    b.frames[frame.id] = frame;

    // Deploying after this round's energy has already been generated would
    // otherwise leave the frame sitting at 0 EP for a full round. It also
    // misses that round's Energy Phase entry, so its generation is recorded on
    // the deploy instead — otherwise the log shows a frame with EP it was never
    // seen to earn.
    let detail = null;
    if (b.energyGenerated) {
      const report = energyPhase(frame);
      const line = energyLine(frame, report);
      logFrame(frame, line, report.steps);
      detail = [line];
    }
    logBattle(b, `${frame.callsign} deployed`, detail);
    // Round 1 opens *in* the Energy Phase, so a frame deployed into it should
    // already be holding its EP while that phase is on screen — same reason
    // Energy and End settle on entry rather than on the way out.
    if (b.phase === 'energy' && !b.energyGenerated) generateEnergy(b, []);
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

/**
 * `detail` is an array of lines shown when the entry is expanded — the dice, the
 * DR comparison, each critical rolled. Stored only when non-empty so a quiet
 * entry costs nothing extra to sync.
 *
 * Round and phase are recorded as fields rather than written into the text. The
 * log renders them as a chip, so an entry never has to repeat the phase it
 * already sits under.
 */
export function logBattle(b, text, detail = null, kind = null) {
  b.log = b.log || [];
  const entry = { at: Date.now(), round: b.round, phase: b.phase, text };
  if (detail?.length) entry.detail = detail;
  if (kind) entry.kind = kind;
  b.log.unshift(entry);
  if (b.log.length > 200) b.log.length = 200;
}

export function logFrame(frame, text, detail = null) {
  frame.log = frame.log || [];
  const entry = { at: Date.now(), text };
  // Read the module-level battle directly: getBattle() would mint one, and this
  // is called from unit tests that drive a frame with no battle at all.
  if (battle) { entry.round = battle.round; entry.phase = battle.phase; }
  if (detail?.length) entry.detail = detail;
  frame.log.unshift(entry);
  if (frame.log.length > 50) frame.log.length = 50;
}

/**
 * Record an Activation Phase action in both logs.
 *
 * Movement was reaching the frame log only, so the battle log had nothing to
 * show for the whole phase but its own marker. Mirroring it naively would trade
 * silence for noise: movement is entered a step at a time, and a player crossing
 * five hexes taps Walk five times.
 *
 * So consecutive steps of the same kind by the same frame, in the same phase,
 * coalesce into one entry — "Jackal: Walk ×4 — 5 EP" — with every individual
 * step kept as detail. The summary stays readable and nothing is lost.
 */
export function logAction(frame, key, label, line, cost = 0) {
  const b = getBattle();
  logFrame(frame, line);

  const head = b.log?.[0];
  const sameRun = head?.kind === 'move' && head.frameId === frame.id && head.moveKey === key
    && head.round === b.round && head.phase === b.phase;

  if (sameRun) {
    head.count += 1;
    head.cost += cost;
    head.detail.push(line);
    head.text = movementText(frame, label, head);
    head.at = Date.now();
    return;
  }

  const entry = {
    at: Date.now(), round: b.round, phase: b.phase, kind: 'move',
    frameId: frame.id, moveKey: key, count: 1, cost, detail: [line], text: '',
  };
  entry.text = movementText(frame, label, entry);
  b.log.unshift(entry);
  if (b.log.length > 200) b.log.length = 200;
}

function movementText(frame, label, e) {
  return `${frame.callsign}: ${label}${e.count > 1 ? ` ×${e.count}` : ''}${e.cost ? ` — ${e.cost} EP` : ''}`;
}

// --- Phase advance ----------------------------------------------------------

/** One frame's Energy Phase result, phrased the same wherever it is recorded. */
function energyLine(frame, report) {
  const upkeep = report.upkeep ? `, −${report.upkeep} upkeep` : '';
  const glitch = report.glitch ? ', −1 System Glitch' : '';
  return `+${report.generated} EP${upkeep}${glitch} → ${frame.ep} EP in pool`;
}

/** Generate this round's energy, unless it has already been generated. */
function generateEnergy(b, reports) {
  if (b.energyGenerated) return reports;
  const detail = [];
  for (const frame of framesList(b)) {
    if (isDestroyed(frame)) continue;
    const report = energyPhase(frame);
    reports.push({ frameId: frame.id, type: 'energy', report });
    const line = energyLine(frame, report);
    logFrame(frame, line, report.steps);
    detail.push(`${frame.callsign}: ${line}`);
  }
  b.energyGenerated = true;
  logBattle(b, 'Energy Phase', detail, 'phase');
  return reports;
}

/**
 * Bank unused EP, burn fires, clear one-turn effects — the End Phase's own work.
 *
 * Runs on *entering* the End Phase, so the result is on screen while the phase
 * is showing: pools at zero, capacitors holding what was saved. Doing it on the
 * way out instead made the transfer invisible — the same tap immediately ran the
 * next Energy Phase, which empties the capacitor back into the pool, so the
 * banked charge never survived to a render and the leftover EP looked like it
 * flowed straight into the next round.
 */
function resolveEndPhase(b, reports) {
  if (b.endResolved) return reports;
  const detail = [];
  for (const frame of framesList(b)) {
    if (isDestroyed(frame)) continue;
    const report = endPhase(frame);
    reports.push({ frameId: frame.id, type: 'end', report });
    if (report.fire) {
      const names = report.fire.map((c) => c.name);
      logFrame(frame, 'Electrical Fire burns: 1 Torso Critical', names);
      detail.push(`${frame.callsign}: Electrical Fire — ${names.join(', ')}`);
    }
    // Always logged, not only when something is vented. Energy moving out of
    // the pool and into the Capacitor is the End Phase's whole job, and a
    // player checking why they have 5 EP banked needs to see where it came
    // from — a silent transfer reads as EP going missing.
    const line = report.pool > 0
      ? `${report.pool} EP unused → ${report.banked} to Capacitor (max ${report.capMax})${report.vented > 0 ? `, vented ${report.vented}` : ''} · pool emptied`
      : 'Pool already empty, nothing to store';
    logFrame(frame, line, report.steps);
    detail.push(`${frame.callsign}: ${line}`);
  }
  b.endResolved = true;
  logBattle(b, 'End Phase', detail, 'phase');
  return reports;
}

/**
 * Step the battle to the next phase, running the bookkeeping that belongs to
 * the phase being entered. Both Energy and End settle on entry, so what the
 * phase did is visible while that phase is on screen.
 */
export function advancePhase() {
  return mutate((b) => {
    const index = PHASES.indexOf(b.phase);
    const reports = [];

    if (b.phase === 'end') {
      // The End Phase settled its books on entry; leaving it starts the round.
      resolveEndPhase(b, reports); // no-op unless the phase was somehow skipped
      b.round += 1;
      b.phase = 'energy';
      b.energyGenerated = false;
      b.endResolved = false;
      logBattle(b, `Round ${b.round} begins`, null, 'round');
      generateEnergy(b, reports);
      return reports;
    }

    b.phase = PHASES[index + 1];

    // Safety net: leaving the Energy Phase without having generated (round 1,
    // or a battle restored mid-phase) still gets the frames their EP.
    if (b.phase === 'activation') generateEnergy(b, reports);

    // Energy and End log themselves, with each frame's arithmetic as detail.
    // Activation and Combat have no automatic bookkeeping, so their entry
    // carries the thing worth recording: the order, which reverses between them.
    if (b.phase === 'end') resolveEndPhase(b, reports);
    else logBattle(b, `${PHASE_NAMES[b.phase]} Phase`, activationOrderDetail(b), 'phase');

    return reports;
  });
}

/** The turn order for the phase just entered — reversed between Activation and Combat. */
function activationOrderDetail(b) {
  const order = orderedFrames(b);
  if (!order.length) return null;
  const rule = b.phase === 'combat' ? 'highest Initiative first' : 'lowest Initiative first';
  return [rule, ...order.map((f, i) => `${i + 1}. ${f.callsign} (Init ${effectiveInitiative(f)})`)];
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
