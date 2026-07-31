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

/** Horizontal fill bar. */
export function bar(current, max, kind = 'ep') {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
  return `<div class="bar"><i class="${kind}" style="width:${pct}%"></i></div>`;
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
