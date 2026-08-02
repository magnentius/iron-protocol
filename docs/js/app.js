// Iron Protocol — app bootstrap: tab routing, event delegation, render loop.

import { PHASE_NAMES, getBattle, subscribe } from './state.js';
import { closeModal, getModalHandler, isModalOpen, updateModal } from './ui/dom.js';
import * as battleView from './ui/battle.js';
import * as sheetView from './ui/sheet.js';
import * as attackView from './ui/attack.js';
import * as referenceView from './ui/reference.js';
import * as sync from './sync.js';

const views = {
  battle: battleView,
  frames: sheetView,
  attack: attackView,
  reference: referenceView,
};

let activeTab = 'battle';

const viewEl = document.getElementById('view');
const tabbar = document.getElementById('tabbar');

function switchTab(tab) {
  activeTab = tab;
  for (const button of tabbar.querySelectorAll('button')) {
    button.setAttribute('aria-selected', String(button.dataset.tab === tab));
  }
  render();
  window.scrollTo({ top: 0 });
}

battleView.setTabSwitcher(switchTab);

/**
 * Render the active view.
 *
 * Wrapped, because an unguarded throw here is the worst failure this app has:
 * the innerHTML assignment never happens, so the previous screen stays on
 * display while every subsequent tap runs its handler against state you can no
 * longer see. The app looks dead, recovers on reload, and gives no clue why.
 * A visible error that names the fault is strictly better than a silent freeze.
 */
function render() {
  try {
    const battle = getBattle();
    document.getElementById('round-label').textContent = `Round ${battle.round}`;
    document.getElementById('phase-label').textContent = `${PHASE_NAMES[battle.phase]} Phase`;
    viewEl.innerHTML = views[activeTab].render();
    lastRenderError = null;
  } catch (err) {
    lastRenderError = err;
    console.error('Render failed', err);
    viewEl.innerHTML = renderFailure(err);
  }
}

let lastRenderError = null;

function renderFailure(err) {
  const detail = String(err && err.stack ? err.stack : err).slice(0, 600);
  return `
    <div class="card" style="border-color:#4a2320">
      <h3 style="margin:0 0 .4rem;font-size:1rem;color:var(--danger)">This view could not be drawn</h3>
      <p class="small muted" style="margin:0 0 .6rem">
        The battle itself is intact and saved. Switching tabs usually clears it. If it keeps
        happening, the detail below is what to report.
      </p>
      <pre class="tiny" style="white-space:pre-wrap;overflow-x:auto;color:var(--dim)">${
        detail.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
      }</pre>
      <button class="btn block" data-action="recover-render" style="margin-top:.6rem">Try again</button>
    </div>`;
}

// --- Event delegation ---------------------------------------------------------
// Views return HTML strings and mark controls with data-action, so a single
// listener routes everything. Modal handlers get first refusal.

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (isModalOpen()) {
    if (action === 'modal-backdrop' && event.target === el) {
      closeModal();
      render();
      return;
    }
    const handler = getModalHandler();
    if (handler && handler(action, el, { update: updateModal })) {
      if (!isModalOpen()) render();
      return;
    }
    if (action === 'modal-backdrop') return;
  }

  if (el.disabled) return;

  if (action === 'recover-render') { render(); return; }

  try {
    for (const view of [views[activeTab], battleView, sheetView]) {
      if (view.handle && view.handle(action, el)) {
        render();
        return;
      }
    }
  } catch (err) {
    // A handler that throws must not take the whole app down with it.
    console.error(`Action "${action}" failed`, err);
    lastRenderError = err;
    viewEl.innerHTML = renderFailure(err);
  }
});

document.addEventListener('change', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (isModalOpen()) {
    const handler = getModalHandler();
    if (handler && handler(action, el, { update: updateModal })) return;
  }

  try {
    for (const view of [views[activeTab], sheetView]) {
      if (view.handleChange && view.handleChange(action, el)) {
        render();
        return;
      }
    }
  } catch (err) {
    console.error(`Change "${action}" failed`, err);
    viewEl.innerHTML = renderFailure(err);
  }
});

tabbar.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-tab]');
  if (button) switchTab(button.dataset.tab);
});

document.getElementById('sync-pill').addEventListener('click', () => {
  sync.showSyncModal();
});

// Re-render whenever state changes, including remote patches from sync.
subscribe(() => render());

// --- Boot ------------------------------------------------------------------------

sync.init();
render();

// Skip the service worker when developing locally, so edits are never masked by
// a cache. Note this checks hostname: serving from a LAN address for phone
// testing does NOT count as localhost, and the worker will install there.
const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

/**
 * Evict any worker an earlier build left registered here.
 *
 * Skipping registration does not remove a worker that is already installed. One
 * registered before this guard existed stays in charge indefinitely, and while
 * it does it answers fetches from its own cache — which no dev-server header can
 * override, because the request never reaches the server. That produces edits
 * that appear not to apply, and worse, a module graph mixing cached files with
 * fresh ones: a view calling a constant its stale dependency does not export yet.
 *
 * Reload once after clearing so the page is served without a controller. The
 * session flag stops that becoming a loop.
 */
if (isLocalhost && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(async (regs) => {
      if (!regs.length) return;
      await Promise.all(regs.map((reg) => reg.unregister()));
      if (window.caches?.keys) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      console.warn(
        `[iron-protocol] Removed ${regs.length} service worker(s) left registered on localhost `
        + 'by an earlier build, and cleared their caches. They were serving stale modules.',
      );
      if (!sessionStorage.getItem('ironprotocol.swEvicted')) {
        sessionStorage.setItem('ironprotocol.swEvicted', '1');
        location.reload();
      }
    })
    .catch(() => { /* nothing registered, or the API is unavailable */ });
}

if ('serviceWorker' in navigator && !isLocalhost) {
  window.addEventListener('load', () => {
    // updateViaCache: 'none' stops the browser serving sw.js itself out of its
    // HTTP cache, which it will otherwise do for up to 24 hours. Without it a
    // superseded worker can stay in charge — and keep handing out the assets it
    // cached — no matter how many times the site data is cleared.
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        reg.update();
        // Take over as soon as a new worker is ready, rather than on some later visit.
        reg.addEventListener('updatefound', () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              location.reload();
            }
          });
        });
      })
      .catch(() => {
        // Offline support is a bonus; the app works fine without it.
      });
  });
}
