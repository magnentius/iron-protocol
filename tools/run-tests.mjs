#!/usr/bin/env node
// Run the Iron Protocol rules engine tests from the command line.
//   node tools/run-tests.mjs
// The same suite runs in the browser via docs/tests.html.

import { run } from '../docs/tests.js';
import { createHarness } from '../docs/test-harness.js';

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const indent = (message) => red(message.split('\n').map((l) => `      ${l}`).join('\n'));

const { api, drain } = createHarness({
  onSuite: (name) => console.log(`\n${dim(name)}`),
  onPass: (name) => console.log(`  ${green('✓')} ${name}`),
  onFail: (name, err) => {
    console.log(`  ${red('✗')} ${name}`);
    console.log(indent(err.message));
  },
});

run(api);
let { passed, failures } = await drain();

// --- Security rules drift (node only) ----------------------------------------
//
// The database rules end with `$other: { .validate: false }`, so any battle
// field they do not name is rejected. A field added to createBattle() and not
// to the rules makes every write fail with a permission error — and because the
// app is fully usable with sync switched off, that stays invisible until two
// people actually try to share a battle. This caught `version` and
// `endResolved` already. Node-only: the rules live outside docs/, so the
// browser runner cannot read them.
{
  const { readFileSync } = await import('node:fs');
  const { createBattle } = await import('../docs/js/state.js');

  const name = 'database rules name every field createBattle writes';
  try {
    const raw = readFileSync(new URL('../firebase.rules.json', import.meta.url), 'utf8');
    // Rules files allow // comments; strip them before parsing.
    const rules = JSON.parse(raw.replace(/^\s*\/\/.*$/gm, ''));
    const battle = rules.rules.battles.$code;
    const allowed = Object.keys(battle).filter((k) => !k.startsWith('.') && k !== '$other');
    const written = Object.keys(createBattle({ code: 'TEST' }));
    const missing = written.filter((k) => !allowed.includes(k));

    if (missing.length) {
      throw new Error(
        `these fields would be rejected by $other: ${missing.join(', ')}\n`
        + '      add them to firebase.rules.json, or sync fails on the first write',
      );
    }
    passed += 1;
    console.log(`\n${dim('Security rules')}`);
    console.log(`  ${green('✓')} ${name}`);
  } catch (err) {
    failures.push({ name, message: err.message });
    console.log(`\n${dim('Security rules')}`);
    console.log(`  ${red('✗')} ${name}`);
    console.log(indent(err.message));
  }
}

console.log(
  `\n${green(`${passed} passed`)}${failures.length ? `, ${red(`${failures.length} failed`)}` : ''}`,
);
process.exit(failures.length ? 1 : 0);
