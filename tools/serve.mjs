#!/usr/bin/env node
// Development server for the tracker.
//
//   node tools/serve.mjs [port]
//
// Use this rather than `python3 -m http.server`. That sends only Last-Modified,
// with no Cache-Control and no ETag, so browsers — Safari especially — apply
// heuristic freshness and reuse stale CSS and modules without revalidating.
// The symptom is maddening: you edit a file, reload, and see the old build, so
// a fix looks like it did not work until you hard-refresh.
//
// Everything here is served no-store. Correctness beats speed on localhost.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(new URL('../docs', import.meta.url).pathname);
const PORT = Number(process.argv[2]) || 8000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    // normalize + a root check keeps ../ out of the served tree
    let path = join(ROOT, normalize(decodeURIComponent(url.pathname)));
    if (!path.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }

    try {
      if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }

    const body = await readFile(path);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(path)] || 'application/octet-stream',
      // The whole point: never let a browser reuse a stale asset in development.
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0',
    }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Iron Protocol tracker → http://localhost:${PORT}`);
  console.log('Serving docs/ with caching disabled.');
});
