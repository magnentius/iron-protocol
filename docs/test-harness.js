// Shared test harness for both runners — tests.html in the browser and
// tools/run-tests.mjs on the command line.
//
// Collect, then run. `it()` queues rather than executing, and drain() walks the
// queue awaiting each case in turn. That indirection buys one thing: a test may
// be async and still be reported honestly.
//
// The naive harness called fn() and caught what it threw, which silently passes
// every async test ever written — an async fn returns a promise immediately, so
// the try block always completes and a later rejection surfaces as an unhandled
// rejection, long after the case has been printed green. A test that cannot
// fail is worse than no test, because it is counted.
//
// Collecting first is safe here because the suite mutates nothing between its
// it() calls: setup lives inside the case bodies. Anything else would now run
// before the first test rather than between two of them.

export function createHarness({ onSuite, onPass, onFail }) {
  const queue = [];

  const api = {
    describe(name) {
      queue.push({ suite: name });
    },

    it(name, fn) {
      queue.push({ name, fn });
    },

    eq(actual, expected, label = '') {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(`${label}\n  expected: ${e}\n  actual:   ${a}`);
    },

    ok(value, label = 'expected truthy') {
      if (!value) throw new Error(label);
    },

    /**
     * Assert that an async call rejects, and hand back the error to inspect.
     *
     * Without this the obvious spelling of a rejection test — try/catch around
     * an await — passes when the call unexpectedly succeeds, because nothing
     * was thrown to catch.
     */
    async rejects(fn, label = 'expected a rejection') {
      try {
        await fn();
      } catch (err) {
        return err;
      }
      throw new Error(label);
    },
  };

  /** Sequential on purpose: the suite shares one battle and one localStorage. */
  async function drain() {
    let passed = 0;
    const failures = [];

    for (const item of queue) {
      if (item.suite) {
        onSuite(item.suite);
        continue;
      }
      try {
        await item.fn();
        passed += 1;
        onPass(item.name);
      } catch (err) {
        failures.push({ name: item.name, message: err.message });
        onFail(item.name, err);
      }
    }

    return { passed, failures };
  }

  return { api, drain };
}
