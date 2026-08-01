// Cross-device battle sync over Firebase Realtime Database.
//
// Optional layer. The tracker is local-first: state lives in localStorage and
// the app is fully playable with sync off or the network down. When a room is
// joined we mirror changes both ways.
//
// Writes go out as a flattened path diff rather than a whole-document set, so
// RTDB merges them per path. Two players acting in the same phase touch
// disjoint paths (their own frames) and cannot clobber each other.

import { FIREBASE_CONFIG, FIREBASE_SDK_VERSION, isSyncConfigured } from './config.js';
import { applyRemote, deviceId, getBattle, newRoomCode, subscribe } from './state.js';
import { closeModal, esc, openModal, toast } from './ui/dom.js';

const ROOM_KEY = 'ironprotocol.room';

let db = null;
let fb = null;            // { ref, onValue, update, get, set }
let roomCode = null;
let battleRef = null;
let unsubscribeRemote = null;
let applyingRemote = false;
let lastSynced = null;    // snapshot used to compute the outgoing diff
let connected = false;
let status = 'local';     // local | connecting | live | offline | error

// --- Public API ------------------------------------------------------------

export function init() {
  const saved = localStorage.getItem(ROOM_KEY);
  if (saved && isSyncConfigured()) {
    connect(saved).catch((err) => {
      console.warn('Sync reconnect failed', err);
      setStatus('error');
    });
  } else {
    setStatus('local');
  }

  // Push local changes upstream.
  subscribe(() => {
    if (applyingRemote || !battleRef) return;
    pushDiff();
  });
}

export function getStatus() {
  return { status, roomCode, connected };
}

// --- Firebase plumbing -------------------------------------------------------

async function loadFirebase() {
  if (fb) return fb;
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;
  const [app, database] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-database.js`),
  ]);
  const instance = app.initializeApp(FIREBASE_CONFIG);
  db = database.getDatabase(instance);
  fb = {
    ref: database.ref,
    onValue: database.onValue,
    update: database.update,
    get: database.get,
    set: database.set,
    off: database.off,
  };
  return fb;
}

async function connect(code) {
  setStatus('connecting');
  const api = await loadFirebase();

  roomCode = code.toUpperCase();
  localStorage.setItem(ROOM_KEY, roomCode);
  battleRef = api.ref(db, `battles/${roomCode}`);

  // Connection indicator.
  api.onValue(api.ref(db, '.info/connected'), (snap) => {
    connected = snap.val() === true;
    setStatus(connected ? 'live' : 'offline');
  });

  if (unsubscribeRemote) unsubscribeRemote();
  unsubscribeRemote = api.onValue(battleRef, (snap) => {
    const remote = snap.val();
    if (!remote) return;
    applyingRemote = true;
    try {
      // Only adopt the remote as our diff baseline if we actually took it. A
      // battle from an incompatible build is ignored, and treating it as
      // "synced" would make the next outgoing diff nonsense.
      if (applyRemote(normalize(remote))) lastSynced = clone(remote);
    } finally {
      applyingRemote = false;
    }
  });
}

/** Create a room seeded with whatever is on this device. */
export async function createRoom() {
  const code = newRoomCode();
  const api = await loadFirebase();
  await connect(code);

  const battle = getBattle();
  battle.id = code;
  lastSynced = null;
  await api.set(battleRef, serialize(battle));
  lastSynced = clone(serialize(battle));
  return code;
}

/**
 * Join an existing room. The remote battle wins, but this device's own frames
 * come along — you are bringing your lance to their table.
 */
export async function joinRoom(code) {
  const api = await loadFirebase();
  const normalizedCode = code.trim().toUpperCase();
  const snapshot = await api.get(api.ref(db, `battles/${normalizedCode}`));

  if (!snapshot.exists()) throw new Error(`No battle found with code ${normalizedCode}`);

  const mine = Object.values(getBattle().frames || {}).filter((f) => f.ownerId === deviceId());
  await connect(normalizedCode);

  if (mine.length) {
    const updates = {};
    for (const frame of mine) updates[`frames/${frame.id}`] = serializeFrame(frame);
    await api.update(battleRef, updates);
  }
  return normalizedCode;
}

export function leaveRoom() {
  if (unsubscribeRemote) unsubscribeRemote();
  unsubscribeRemote = null;
  battleRef = null;
  roomCode = null;
  lastSynced = null;
  localStorage.removeItem(ROOM_KEY);
  setStatus('local');
}

// --- Outgoing diff -------------------------------------------------------------

function pushDiff() {
  const next = serialize(getBattle());
  if (!lastSynced) {
    lastSynced = clone(next);
    fb.set(battleRef, next).catch(reportWriteError);
    return;
  }
  const updates = {};
  diffInto(lastSynced, next, '', updates);
  if (!Object.keys(updates).length) return;
  lastSynced = clone(next);
  fb.update(battleRef, updates).catch(reportWriteError);
}

function reportWriteError(err) {
  console.warn('Sync write failed', err);
  setStatus('offline');
}

/**
 * Flatten the changes between two objects into RTDB update paths.
 * Arrays and primitives are treated as atomic leaves; only plain objects
 * recurse, which is what gives us per-field merging on frames and locations.
 *
 * Exported for the test suite: this is what keeps two players from overwriting
 * each other, so it is worth asserting directly.
 */
export function diffInto(prev, next, prefix, out) {
  const keys = new Set([...Object.keys(prev || {}), ...Object.keys(next || {})]);
  for (const key of keys) {
    const a = prev?.[key];
    const b = next?.[key];
    const path = prefix ? `${prefix}/${key}` : key;

    if (b === undefined) { out[path] = null; continue; }
    if (isPlainObject(a) && isPlainObject(b)) { diffInto(a, b, path, out); continue; }
    if (JSON.stringify(a) !== JSON.stringify(b)) out[path] = b;
  }
}

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const clone = (v) => JSON.parse(JSON.stringify(v));

/** RTDB drops undefined and empty objects; keep the shape predictable. */
function serialize(battle) {
  return clone({ ...battle, frames: battle.frames || {}, log: battle.log || [] });
}

function serializeFrame(frame) {
  return clone(frame);
}

/** Restore anything RTDB may have stripped on the way back. */
function normalize(remote) {
  const battle = clone(remote);
  battle.frames = battle.frames || {};
  battle.log = battle.log || [];
  for (const frame of Object.values(battle.frames)) {
    frame.weapons = frame.weapons || [];
    frame.crits = frame.crits || [];
    frame.log = frame.log || [];
    frame.systems = frame.systems || {};
    if (frame.systems.amc) frame.systems.amc.bands = frame.systems.amc.bands || [];
  }
  return battle;
}

// --- Status pill ----------------------------------------------------------------

function setStatus(next) {
  status = next;
  const pill = document.getElementById('sync-pill');
  const text = document.getElementById('sync-text');
  if (!pill || !text) return;

  pill.classList.toggle('live', next === 'live');
  pill.classList.toggle('offline', next === 'offline' || next === 'error');

  text.textContent = {
    local: 'Local',
    connecting: 'Connecting…',
    live: roomCode || 'Live',
    offline: `${roomCode || ''} offline`.trim(),
    error: 'Sync error',
  }[next];
}

// --- Sync modal --------------------------------------------------------------------

export function showSyncModal() {
  if (!isSyncConfigured()) {
    openModal(
      `<h2 style="font-size:1.05rem;margin-bottom:.3rem">Sync is not set up</h2>
       <p class="small muted">The tracker is running in local-only mode. Everything works, but this
       device keeps its own copy of the battle.</p>
       <p class="small muted">To share a battle between two phones, create a free Firebase Realtime
       Database and paste its config into <code>docs/js/config.js</code>. Step-by-step instructions
       are in <code>docs/README.md</code>.</p>
       <button class="btn block primary" data-action="modal-cancel" style="margin-top:.8rem">Got it</button>`,
      (action) => { if (action === 'modal-cancel') { closeModal(); return true; } return false; },
    );
    return;
  }

  const body = (error = '') => `
    <h2 style="font-size:1.05rem;margin-bottom:.3rem">Shared Battle</h2>
    ${roomCode ? `
      <p class="small muted">This device is syncing to room <b class="mono" style="color:var(--accent)">${esc(roomCode)}</b>.
      Anyone entering that code joins the same battle.</p>
      <div class="math" style="margin:.7rem 0">
        <div>Status: ${connected ? 'connected' : 'offline — changes will send when the connection returns'}</div>
      </div>
      <button class="btn block danger" data-action="leave-room">Leave Room</button>
    ` : `
      <p class="small muted">Create a room and share the code, or enter the code your opponent gives you.
      Your frames come with you either way.</p>
      <button class="btn block primary" data-action="create-room" style="margin:.8rem 0 .6rem">Create a Room</button>
      <label class="tiny dim">Or join with a code</label>
      <input type="text" id="join-code" placeholder="ABCD" maxlength="4"
             autocapitalize="characters" autocomplete="off" spellcheck="false"
             style="text-transform:uppercase;letter-spacing:.2em;text-align:center;font-weight:600">
      <button class="btn block" data-action="join-room" style="margin-top:.5rem">Join</button>
    `}
    ${error ? `<p class="small" style="color:var(--danger)">${esc(error)}</p>` : ''}
    <button class="btn block ghost" data-action="modal-cancel" style="margin-top:.8rem">Close</button>`;

  openModal(body(), async (action, el, { update }) => {
    if (action === 'modal-cancel') { closeModal(); return true; }

    if (action === 'create-room') {
      try {
        const code = await createRoom();
        closeModal();
        toast(`Room ${code} created — share the code`, 'ok');
      } catch (err) {
        update(body(err.message));
      }
      return true;
    }

    if (action === 'join-room') {
      const input = document.getElementById('join-code');
      const code = input?.value.trim();
      if (!code) { update(body('Enter a room code.')); return true; }
      try {
        await joinRoom(code);
        closeModal();
        toast(`Joined room ${code.toUpperCase()}`, 'ok');
      } catch (err) {
        update(body(err.message));
      }
      return true;
    }

    if (action === 'leave-room') {
      leaveRoom();
      closeModal();
      toast('Left the shared battle — now local only');
      return true;
    }

    return false;
  });
}
