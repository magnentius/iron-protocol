# Iron Protocol — Battle Tracker

A mobile web app for running *Iron Protocol* at the table. It carries the bookkeeping the
paper sheets ask you to do by hand: energy and capacitor charge, evasion, armor and internal
structure per location, ammunition, active stealth upkeep, weapon cooldowns, and the pile of
permanent critical-hit effects that are easy to apply once and then forget about three rounds
later.

Two players, each on their own phone, can share one live battle through a room code.

## Running it

No build step, no dependencies. It is plain HTML, CSS and ES modules.

```bash
cd docs
python3 -m http.server 8000
# then open http://localhost:8000
```

It must be served over HTTP — ES modules do not load from `file://`.

### Deploying to GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/docs`. Both
players then just open the URL. On a phone, use *Add to Home Screen* to install it — it runs
full screen and works with no signal.

## What it does

**Battle tab** — round and phase control. Advancing the phase runs that phase's checklist for
every frame at once: the Energy Phase generates EP, rolls banked capacitor charge into the
pool and deducts AMC/ECM upkeep; the End Phase banks unused EP, vents the excess, clears
evasion and ticks cooldowns down. Frames are listed in initiative order — reversed during
Activation, forward during Combat — and during the Activation Phase each of your frames gets
movement buttons priced live against terrain, elevation and any Knee Lock damage.

**Frames tab** — the full sheet for each frame: armor and structure per location, energy,
evasion, ammunition by munition type, stealth systems, terrain, prone state, pilot checks and
a running log. Everything is manually adjustable, so the app never blocks you.

**Attack tab** — a guided resolver following the Combat Phase sequence: pick a weapon (blocked
if it is destroyed, cooling down, out of ammo or unaffordable), choose overcharge, pick the hit
zone, roll 2d6 for location, roll damage, then subtract evasion and armor. It shows each step
of the arithmetic so an opponent can audit it, then applies the damage, degrades the armor and
rolls the critical. **Every die can be corrected by tapping it**, so you can roll physical dice
and just enter the numbers.

**Ref tab** — the hit location table, all four critical tables, the sensor and stealth matrix,
terrain, weapons and movement costs.

## Cross-device sync

Optional. Without it the app is fully functional; the battle is saved to that one device.

Sync is local-first: the battle lives in `localStorage` and the app keeps working if the
network drops, reconnecting and converging when it returns. Writes go out as a flattened path
diff rather than a whole-document overwrite, so the two players touch disjoint paths and cannot
clobber each other's turn.

### Setup (about 10 minutes, one time)

1. Go to the [Firebase console](https://console.firebase.google.com) and create a project.
   Google Analytics is not needed.
2. In the left sidebar choose **Build → Realtime Database → Create Database**. Pick a location,
   and start in **locked mode** — the next step replaces the rules anyway.
3. Open the **Rules** tab and paste in the contents of [`firebase.rules.json`](../firebase.rules.json),
   then publish. Read the comment at the top of that file: access is by knowledge of the room
   code, which suits a two-player game with nothing sensitive in it, but it is not
   authentication.
4. Back in **Project settings → General**, scroll to *Your apps* and register a **Web app**.
   Copy the `firebaseConfig` object it shows you.
5. Paste those values into [`docs/js/config.js`](js/config.js) and commit.

These config values are public by design — Firebase web config is not a secret, and shipping it
in a static site is the documented usage. Access is controlled by the security rules, not by
hiding the keys.

### Using it

Tap the pill in the top right. One player taps **Create a Room** and reads out the
four-character code; the other enters it and taps **Join**. Joining brings your own frames with
you into their battle. The pill turns green when connected and shows the room code.

## Testing

The rules engine (`js/rules.js`) is pure — no DOM, no storage, no network — and is covered by a
test suite that asserts it against `rules.md`, including the worked examples from §2.2.1 and
§2.3.1.

Open `tests.html` in a browser, or from the repo root with Node installed:

```bash
node tools/run-tests.mjs
```

## Rules coverage

These cases used to be ambiguous or contradictory across `rules.md`, `reference.md` and the
frame sheets. They are now resolved in **rules.md §5.0, §6.4 and the reference sheet**, and the
tracker implements them:

| Case | Ruling |
| :--- | :--- |
| Overcharge Allowance | Whatever was banked in the Capacitor at the start of the turn caps Overcharge EP for that turn |
| Rapid Fire + evasion | Each EVA point cancels the single highest remaining die |
| Rapid Fire + armor | The attack degrades DR by 1 in total and rolls one critical, however many dice got through |
| One attack per weapon | Each weapon fires once per Combat Phase, however much EP remains |
| Full Auto | Capped at 3 bursts per attack |
| Disruptor Cannon | No damage; bypasses EVA and DR; torso hit drains 1d6 EP, any other location forces a critical |
| AoE | Bypasses evasion *and* terrain cover; armor DR still applies |
| Prone (−1d6) | Drop one die, keep flat bonuses; Rapid Fire loses one die per burst; no effect on Disruptor or EMP |
| Severed leg | Falls prone with no check; may spend 3 EP on a Pilot Check to stand, shedding all prone penalties; never walks again |
| Collisions | Armor DR applies and penetration rolls a critical; evasion does not apply |
| Damage transfer | Goes straight to Torso structure without degrading Torso armor |
| Tracers | Paint the target if not negated by evasion, even when armor stops the round dead |
| Flares | Negate one attack made on an IR lock, from the Front or Rear zone only |

Earlier contradictions — the Laser's damage, the Jackal's movement limit and critical table,
Knee Lock, and the Rail Gun's cooldown — have been corrected at the source rather than papered
over here.

## Layout

```
docs/
  index.html            app shell
  tests.html            rules engine test runner
  tests.js              the test suite, shared with tools/run-tests.mjs
  sw.js                 service worker (skipped on localhost)
  css/app.css
  js/
    rules.js            pure rules engine — no DOM, storage or network
    state.js            battle model, mutations, localStorage
    sync.js             Firebase Realtime Database adapter
    config.js           Firebase config — yours goes here
    app.js              bootstrap, tab routing, event delegation
    data/frames.js      the five roster frames
    data/tables.js      hit location, criticals, weapons, terrain
    ui/                 battle, sheet, attack and reference views
```

Views return HTML strings and tag controls with `data-action`; one delegated listener in
`app.js` routes everything. There is no framework and nothing to build.

---

*Iron Protocol* © 2026 John Karakashian, released under
[CC BY-NC-SA 4.0](../LICENSE.md).
