// Small rendering helpers. Views return HTML strings; app.js delegates clicks
// by [data-action], so nothing here needs a framework.

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function cls(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Fuel-gauge colour for a segmented bar: green down to half, amber down to a
 * fifth, red below that. The whole filled run takes one colour, so the state
 * reads at a glance from across a table rather than needing segments counted.
 */
function fuelLevel(current, max) {
  const pct = max > 0 ? current / max : 0;
  if (pct >= 0.5) return 'ok';
  if (pct >= 0.2) return 'warn';
  return 'low';
}

/**
 * Horizontal fill bar, coloured by how full it is.
 *
 * Rerolls are always accent-blue: a small allowance is not a low-fuel warning,
 * it is simply how many the defender happens to have.
 */
export function bar(current, max, kind = 'ep') {
  const raw = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
  // A Colossus with 1 EP of a 28-point pool is under 4% — a sliver too thin to
  // see. Anything above zero gets a visible floor, so "nearly empty" never
  // renders identically to "empty".
  const pct = raw > 0 ? Math.max(raw, 3) : 0;
  const level = kind === 'reroll' || kind === 'armor' ? kind : fuelLevel(current, max);
  return `<div class="bar"><i class="${level}" style="width:${pct}%"></i></div>`;
}

/** Labelled meter with a value readout. */
export function meter(label, current, max, kind) {
  return `
    <div class="meter">
      <div class="label"><span>${esc(label)}</span><b>${current}<span class="dim small">/${max}</span></b></div>
      ${bar(current, max, kind)}
    </div>`;
}

/** −/value/+ control. `action` receives a `delta` of -1 or 1. */
export function stepper(action, value, { min = 0, max = Infinity, params = {} } = {}) {
  const attrs = Object.entries(params).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ');
  return `
    <div class="stepper">
      <button type="button" data-action="${action}" data-delta="-1" ${attrs} ${value <= min ? 'disabled' : ''}>−</button>
      <div class="value">${value}</div>
      <button type="button" data-action="${action}" data-delta="1" ${attrs} ${value >= max ? 'disabled' : ''}>+</button>
    </div>`;
}

export function chip(text, kind = '') {
  return `<span class="chip ${kind}">${esc(text)}</span>`;
}

export function empty(title, body, actionHtml = '') {
  return `<div class="empty"><h3>${esc(title)}</h3><p class="small">${esc(body)}</p>${actionHtml}</div>`;
}

// --- Modal -------------------------------------------------------------------

let modalHandler = null;

export function openModal(html, handler = null) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" data-action="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="grabber"></div>
        ${html}
      </div>
    </div>`;
  modalHandler = handler;
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
  modalHandler = null;
  document.body.style.overflow = '';
}

export function isModalOpen() {
  return !!document.querySelector('.modal-backdrop');
}

export function getModalHandler() {
  return modalHandler;
}

/** Replace the modal body without re-running the open animation. */
export function updateModal(html) {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  modal.innerHTML = `<div class="grabber"></div>${html}`;
}

export function confirmModal({ title, body, confirmLabel = 'Confirm', danger = false }, onConfirm) {
  openModal(
    `<h2 style="font-size:1.05rem;margin-bottom:.4rem">${esc(title)}</h2>
     <p class="small muted" style="margin-top:0">${esc(body)}</p>
     <div class="row" style="margin-top:1rem;gap:.5rem">
       <button class="btn grow" data-action="modal-cancel">Cancel</button>
       <button class="btn grow ${danger ? 'danger' : 'primary'}" data-action="modal-confirm">${esc(confirmLabel)}</button>
     </div>`,
    (action) => {
      if (action === 'modal-confirm') {
        closeModal();
        onConfirm();
        return true;
      }
      if (action === 'modal-cancel') {
        closeModal();
        return true;
      }
      return false;
    },
  );
}

// --- Transient toast ----------------------------------------------------------

let toastTimer = null;

export function toast(message, kind = '') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.style.cssText = `
      position:fixed;left:50%;transform:translateX(-50%);
      bottom:calc(var(--nav-h) + 1rem + env(safe-area-inset-bottom));
      background:#1b222d;border:1px solid #253040;color:#dce3ec;
      padding:.6rem .9rem;border-radius:10px;font-size:.82rem;z-index:200;
      max-width:88vw;text-align:center;box-shadow:0 6px 20px rgba(0,0,0,.45)`;
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.style.borderColor = kind === 'error' ? '#4a2320' : kind === 'ok' ? '#1e4634' : '#253040';
  el.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2200);
}

/* --- Log --------------------------------------------------------------------- */

const PHASE_LABEL = { energy: 'Energy', activation: 'Activation', combat: 'Combat', end: 'End' };

/**
 * One log entry. Entries carrying detail render as a native <details>, so the
 * arithmetic behind a line — the dice, the DR comparison, each critical — is one
 * tap away without a headline that nobody can read at arm's length.
 *
 * <details> is deliberate rather than a data-action toggle: expanding is pure DOM
 * state and never routes through the app's click delegate, so opening an entry
 * does not trigger a re-render that would immediately collapse it.
 */
function logEntry(entry) {
  // A phase or round entry already names itself, so it gets the round alone —
  // repeating the phase in its own chip is the redundancy this metadata exists
  // to remove. Everything else is stamped with the phase it happened in.
  const marker = entry.kind === 'phase' || entry.kind === 'round';
  const meta = marker
    ? (entry.round ? `R${entry.round}` : '')
    : [entry.round ? `R${entry.round}` : '', PHASE_LABEL[entry.phase] || ''].filter(Boolean).join(' · ');

  const head = `${meta ? `<span class="dim tiny">${esc(meta)}</span> ` : ''}${esc(entry.text)}`;
  const kindClass = marker ? ` is-${entry.kind}` : '';

  if (!entry.detail?.length) return `<div class="log-entry${kindClass}">${head}</div>`;
  return `
    <details class="log-entry has-detail${kindClass}">
      <summary>${head}</summary>
      <div class="log-detail">${entry.detail.map((d) => `<div>${esc(d)}</div>`).join('')}</div>
    </details>`;
}

export function logList(entries = [], limit = 15) {
  return `<div class="log">${entries.slice(0, limit).map(logEntry).join('')}</div>`;
}

/**
 * Save text to a file. Uses an object URL rather than a data: URI so the size is
 * not capped, and revokes it once the click has been dispatched.
 *
 * On iOS Safari a download may open in a preview or the share sheet instead of
 * saving directly — that is the platform's handling of `download`, not something
 * the page can control.
 */
export function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
