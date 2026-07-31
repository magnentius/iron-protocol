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

function render() {
  const battle = getBattle();
  document.getElementById('round-label').textContent = `Round ${battle.round}`;
  document.getElementById('phase-label').textContent = `${PHASE_NAMES[battle.phase]} Phase`;
  viewEl.innerHTML = views[activeTab].render();
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

  for (const view of [views[activeTab], battleView, sheetView]) {
    if (view.handle && view.handle(action, el)) {
      render();
      return;
    }
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

  for (const view of [views[activeTab], sheetView]) {
    if (view.handleChange && view.handleChange(action, el)) {
      render();
      return;
    }
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

// Skip the service worker on localhost: cache-first would otherwise serve stale
// modules through every edit. It still installs on the deployed site.
const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

if ('serviceWorker' in navigator && !isLocalhost) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Offline support is a bonus; the app works fine without it.
    });
  });
}
