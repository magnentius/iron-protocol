// Service worker — cache the app shell so a battle survives a dead signal.
//
// Bump CACHE when shipping changes, otherwise returning players keep the old
// shell until the cache is evicted.

const CACHE = 'iron-protocol-v1';

const SHELL = [
  './',
  './index.html',
  './css/app.css',
  './manifest.webmanifest',
  './icons/icon.svg',
  './js/app.js',
  './js/state.js',
  './js/rules.js',
  './js/sync.js',
  './js/config.js',
  './js/data/frames.js',
  './js/data/tables.js',
  './js/ui/dom.js',
  './js/ui/battle.js',
  './js/ui/sheet.js',
  './js/ui/attack.js',
  './js/ui/reference.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // Individual failures must not abort the whole install.
      .then((cache) => Promise.allSettled(SHELL.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Firebase SDK and database traffic must always go to the network.
  if (url.origin !== self.location.origin) return;

  // Network-first for navigations so a deployed update is picked up promptly,
  // falling back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  // Cache-first for the static shell, refreshing in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
