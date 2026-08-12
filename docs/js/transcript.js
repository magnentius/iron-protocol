// Battle log → plain text transcript.
//
// Pure: takes a battle, returns a string. No DOM, no download, no clock beyond
// what the entries already carry — so the suite can assert the whole format.
//
// Plain text rather than JSON because the audience is a person: an after-action
// record to keep, paste into a thread, or settle an argument with. Nothing here
// re-imports, so a machine format would serve no one.

import { isDestroyed } from './rules.js';
import { PHASE_NAMES } from './state.js';

const RULE = '─'.repeat(64);

function clock(ms) {
  if (!ms) return '        ';
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function stampDate(ms = Date.now()) {
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** Oldest first. The logs are stored newest-first for display; a record reads forwards. */
const chronological = (log = []) => [...log].reverse();

function frameRoster(frames) {
  if (!frames.length) return ['  (none)'];
  return frames.map((f) => (
    `  ${f.callsign} — ${f.designation}${f.hex ? ` · Hex ${f.hex}` : ''}${f.vow ? ` · Vow of ${f.vow}` : ''}${isDestroyed(f) ? ' · DESTROYED' : ''}`
  ));
}

export function battleTranscript(battle, { now = Date.now() } = {}) {
  const frames = Object.values(battle.frames || {});
  const out = [
    'IRON PROTOCOL — BATTLE LOG',
    `Room ${battle.id || '—'} · Round ${battle.round} · ${PHASE_NAMES[battle.phase] || battle.phase} Phase`,
    ...(battle.mapName ? [`Map ${battle.mapName}`] : []),
    `Exported ${stampDate(now)}`,
    '',
    'FRAMES',
    ...frameRoster(frames),
    '',
  ];

  const entries = chronological(battle.log);
  if (!entries.length) {
    out.push('No entries yet.');
    return out.join('\n');
  }

  let round = null;
  for (const e of entries) {
    if (e.round !== round) {
      round = e.round;
      out.push(RULE, `ROUND ${round}`, RULE);
    }
    // Phase and round markers name themselves; everything else is stamped with
    // the phase it happened in, matching how the app renders the same entry.
    const marker = e.kind === 'phase' || e.kind === 'round';
    const tag = marker ? '' : `${(PHASE_NAMES[e.phase] || '').padEnd(10)} `;
    out.push(`${clock(e.at)}  ${tag}${e.text}`);
    for (const d of e.detail || []) out.push(`${' '.repeat(10)}${marker ? '' : ' '.repeat(11)}· ${d}`);
  }

  // Frame logs carry a few things the shared log does not — countermeasure
  // checks in particular are recorded against the defender alone.
  out.push('', RULE, 'FRAME LOGS', RULE);
  for (const f of frames) {
    out.push('', `${f.callsign} — ${f.designation}`);
    const log = chronological(f.log);
    if (!log.length) { out.push('  (nothing recorded)'); continue; }
    for (const e of log) {
      const where = e.round ? `R${e.round} ${(PHASE_NAMES[e.phase] || '').padEnd(10)}` : '';
      out.push(`  ${clock(e.at)}  ${where} ${e.text}`);
    }
  }

  return out.join('\n');
}

/** `iron-protocol-A7K2-r3-2026-08-01.txt` */
export function transcriptFilename(battle, now = Date.now()) {
  const d = new Date(now);
  const p = (n) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  return `iron-protocol-${battle.id || 'battle'}-r${battle.round}-${date}.txt`;
}
