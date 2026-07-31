#!/usr/bin/env node
// Run the Iron Protocol rules engine tests from the command line.
//   node tools/run-tests.mjs
// The same suite runs in the browser via docs/tests.html.

import { run } from '../docs/tests.js';

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

let passed = 0;
const failures = [];

run({
  describe(name) {
    console.log(`\n${dim(name)}`);
  },
  it(name, fn) {
    try {
      fn();
      passed++;
      console.log(`  ${green('✓')} ${name}`);
    } catch (err) {
      failures.push({ name, message: err.message });
      console.log(`  ${red('✗')} ${name}`);
      console.log(red(err.message.split('\n').map((l) => `      ${l}`).join('\n')));
    }
  },
  eq(actual, expected, label = '') {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) throw new Error(`${label}\n  expected: ${e}\n  actual:   ${a}`);
  },
  ok(value, label = 'expected truthy') {
    if (!value) throw new Error(label);
  },
});

console.log(
  `\n${green(`${passed} passed`)}${failures.length ? `, ${red(`${failures.length} failed`)}` : ''}`,
);
process.exit(failures.length ? 1 : 0);
