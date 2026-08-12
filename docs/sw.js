// Service worker — keeps a battle playable when the signal dies.
//
// Strategy: NETWORK-FIRST for application code, cache only as the offline
// fallback. That is the opposite of the usual advice for a static site, and it
// is deliberate.
//
// This app ships an ES module graph. Modules are cached as individual files, so
// a stale-while-revalidate policy can serve rules.js from an old deploy next to
// tables.js from a new one — the imports no longer line up and the app dies with
// a missing-export error, or worse, runs with half the rules from each version.
// A saved round trip on a handful of small files is not worth that risk.
//
// Offline still works: the last successful load is cached under a versioned key,
// which is only ever written as a whole, so the fallback is a coherent snapshot.

// Bump on every deploy. This is the only manual step, and getting it wrong now
// costs a slow load rather than a broken app.
//
// Carry a serial as well as the date: more than one deploy can land on the same
// day, and a date that has not moved leaves the cache key unchanged while the
// code underneath it has changed.
const VERSION = '2026-08-12.1';
const CACHE = `iron-protocol-${VERSION}`;

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

/** Icons and images never change without a filename change, so cache them. */
const isImmutable = (url) => /\.(png|jpg|jpeg|svg|webp|woff2?)$/i.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Firebase SDK and database traffic must always go straight to the network.
  if (url.origin !== self.location.origin) return;

  if (isImmutable(url)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })),
    );
    return;
  }

  // Everything else — HTML, JS, CSS — comes from the network when it can, so a
  // deploy is picked up on the very next load rather than the one after it.
  //
  // `cache: 'reload'` bypasses the browser's *own* HTTP cache on the way out.
  // Without it the SW asks the network, the HTTP cache answers with the previous
  // deploy, and we are right back to serving stale code one version behind —
  // just with an extra layer of indirection hiding it.
  event.respondWith(
    fetch(new Request(request, { cache: 'reload' }))
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => (
        cached || (request.mode === 'navigate' ? caches.match('./index.html') : undefined)
      ))),
  );
});
