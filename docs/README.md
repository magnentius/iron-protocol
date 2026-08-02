# Iron Protocol — Battle Tracker

A mobile web app for running *Iron Protocol* at the table. It carries the bookkeeping the paper
sheets ask you to do by hand: energy and capacitor charge, the Armor DR track and critical slots
for every location, Ammo Dice, sustained system upkeep, weapon cooldowns, and the pile of
permanent critical effects that are easy to apply once and then forget about three rounds later.

Two players, each on their own phone, can share one live battle through a room code.

## Running it

No build step, no dependencies. It is plain HTML, CSS and ES modules.

```bash
node tools/serve.mjs        # then open http://localhost:8000
```

It must be served over HTTP — ES modules do not load from `file://`.

**Use that server rather than `python3 -m http.server`.** Python's sends only
`Last-Modified`, with no `Cache-Control` and no `ETag`, so browsers — Safari especially — apply
heuristic freshness and reuse stale CSS and modules without revalidating. The symptom is
genuinely confusing: you change a file, reload, and still see the old build, so a fix looks like
it did not work until you hard-refresh. `tools/serve.mjs` sends `no-store` on everything.

### Deploying to GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/docs`. Both players
then just open the URL. On a phone, use *Add to Home Screen* to install it — it runs full screen
and works with no signal.

## What it does

**Battle tab** — round and phase control. Advancing the phase runs that phase's checklist for
every frame at once: the Energy Phase generates EP, rolls banked capacitor charge into the pool,
and deducts Adaptive Skin and ECM upkeep, leaving the Capacitor alone; the End Phase
burns any Electrical Fire, adds unused EP to the Capacitor, vents only the overflow, clears Flank Speed and ticks
cooldowns down. Both Energy and End settle on *entry*, so what the phase did is on screen while
that phase is showing — stop on the End Phase and you can see each pool at zero and the charge
sitting in the capacitor, before the next round pulls it back out. Frames are listed in initiative order — reversed during Activation, forward
during Combat — and during the Activation Phase each of your frames gets a terrain selector, a
torso facing control and movement buttons priced live against terrain, elevation and any Knee
Lock damage. Terrain is set here rather than on the frame sheet, because that is where you move:
it decides Cover rerolls, the EP surcharge on entry, reactor cooling, and whether Flank Speed is
possible at all.

**Frames tab** — the full sheet for each frame, laid out to mirror the printed one:

- an **Armor DR track** of boxes from the location's maximum down to zero, tapped to set the
  value directly, exactly as you would cross off the paper tracker;
- that location's **critical slots** at their real table length — head 5, torso 8, arms and legs
  6 — with the marked ones named beneath. Tapping an unmarked slot runs the real effect through
  the engine, so a hand-entered critical silences a weapon, drops DR to 0 or starts a fire just
  as a resolved one does. Unmarking only clears the box: an applied effect cannot be un-applied.

Plus energy, Flank Speed and the reroll allowance it grants, Ammo Die state for every launcher,
sustained systems, terrain, prone state, pilot checks and a running log. Everything is manually
adjustable, so the app never blocks you.

**Attack tab** — a guided resolver following the Combat Phase sequence:

1. attacker, target, weapon (blocked if destroyed, cooling down, Empty, unaffordable, or if the
   sensor band it needs has been shot off);
2. bursts and Overcharge, priced against banked capacitor charge;
3. hit zone;
4. **the defender's Countermeasure Check** — only the systems that answer the attacking band are
   offered, and a 4+ negates the attack outright. A cartridge burns its Ammo Die whether it
   worked or not; a sustained suite is never expended;
5. 2d6 hit location and the damage roll;
6. **Flank Speed and Cover rerolls**, spent by tapping dice — these are the defender's choice and
   are optional, so they are not automated;
7. Armor DR as a threshold, the permanent DR loss, Overkill, and the cascading criticals.

It shows each step of the arithmetic so an opponent can audit it. **Every die can be corrected by
tapping it**, so you can roll physical dice and just enter the numbers.

The **battle log** records the start of every phase, and any entry with working behind it expands
on tap to show it: an attack opens into the weapon and column, the EP spent, the Ammo Die, each
burst's dice against the DR it was tested on, the permanent DR loss and every critical rolled.
Activation actions — movement, torso twists, stand-ups, pilot checks, hand-marked criticals — are
recorded too. Movement is entered a step at a time, so consecutive steps of the same kind by the
same frame collapse into one line (*Jackal: Walk ×4 — 5 EP*) with each step kept as detail. The
Energy and End Phase entries open into each frame's arithmetic; Activation and Combat open into
the turn order, which reverses between them. Round and phase are stored as fields and shown as a
chip, so no entry has to repeat the phase it already sits under.

**Download** writes the whole battle out as a plain text transcript — header, roster, every round
in forward order with all the detail expanded, then each frame's own log, which holds a few things
the shared one does not (a countermeasure check is recorded against the defender alone). Plain
text rather than JSON because the audience is a person: something to keep, paste into a thread, or
settle an argument with. Nothing re-imports it, so a machine format would serve no one. On iOS a
download may open in a preview or the share sheet instead of saving directly — that is Safari's
handling of `download`, not something the page controls.

**Ref tab** — the hit location table, all four critical tables with the Severity Ladder, what
blocks or contests each sensor band, terrain, weapons, Ammo Dice, movement costs and the
resolution cases most often argued over.

## Cross-device sync

Optional. Without it the app is fully functional; the battle is saved to that one device.

Sync is local-first: the battle lives in `localStorage` and the app keeps working if the network
drops, reconnecting and converging when it returns. Writes go out as a flattened path diff rather
than a whole-document overwrite, so the two players touch disjoint paths and cannot clobber each
other's turn. Critical slots are stored as a map keyed by slot number rather than an array, so
two players marking different slots on the same location never conflict.

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

Tap the pill in the top right. One player taps **Create a Room** and reads out the four-character
code; the other enters it and taps **Join**. Joining brings your own frames with you into their
battle. The pill turns green when connected and shows the room code.

## Updates and the service worker

The service worker is **network-first for application code** — HTML, JS and CSS — and
cache-first only for icons. That is the opposite of the usual advice for a static site, and it
is deliberate: this app ships an ES module graph, and a stale-while-revalidate policy can serve
`rules.js` from one deploy next to `tables.js` from another. The imports stop lining up and the
app either dies on a missing export or, worse, runs with half its rules from each version.

The practical symptom of getting this wrong is an app that works after a manual refresh and is
broken again on the next visit, because every load serves you the *previous* deploy. Saving one
round trip on a handful of small files is not worth that.

Offline still works. The last successful load is cached under a versioned key, so the fallback
is a coherent snapshot rather than a mix.

Bump `VERSION` in `sw.js` when deploying. It carries a serial as well as a date, because more than
one deploy can land on the same day and a date that has not moved leaves the cache key unchanged
while the code under it has changed.

The worker is skipped on `localhost`, and the app also **unregisters any worker it finds already
registered there**. Skipping registration does not evict one an earlier build installed, and while
that worker is in charge it answers fetches from its own cache — which no dev-server header can
override, because the request never reaches the server. The symptom is edits that appear not to
apply, and in the worst case a module graph mixing cached files with fresh ones, where a view calls
a constant its stale dependency does not export yet. Note the check is on hostname: serving from a
LAN address to test on a phone is *not* localhost, and the worker installs normally there.

## Saved battles and schema versions

The battle shape carries a `version`. When the rules overhaul replaced Internal Structure and
Evasion with threshold Armor DR and cascading critical slots, there stopped being any sensible
way to convert an old save — so a battle written by an incompatible build is **detected and
discarded rather than half-loaded**, and the app tells you why instead of leaving you wondering
where your game went.

The check looks at shape as well as version number, because a battle written by a mid-overhaul
build can carry the right version and the wrong fields. A remote battle from an incompatible
build is ignored rather than adopted, and does not become the sync baseline.

## Testing

The rules engine (`js/rules.js`) is pure — no DOM, no storage, no network, and every random draw
takes an injectable `rng`, so the suite is fully deterministic. It asserts the engine against
`rules.md`, including the worked example from §2.3.1 step for step, and proves every roster frame
costs out to its printed point value under the §7.2 construction rules.

Open `tests.html` in a browser, or from the repo root with Node installed:

```bash
node tools/run-tests.mjs
```

145 tests across 25 suites. The browser runner exercises the real ES module graph; the CLI runner
is the same suite.

## Rules coverage

The cases the engine implements that are most often argued over at the table. All are resolved
explicitly in `rules.md` §2.3, §5.0 and §6.

| Case | Ruling |
| :--- | :--- |
| Armor DR is a threshold | Damage must be **strictly greater** than DR to do anything. Equal or less and the plate holds — no partial damage, no degradation |
| Penetration | Costs that location 1 DR permanently, once, however big the hit |
| Overkill Margin | One crit die on any penetration, plus one per full 5 points of excess |
| Cascading Failure | A critical landing on a marked slot climbs to the next unmarked one; past the top of the table, the top result applies |
| Table lengths | Head 5, Torso 8, Arms and Legs 6. Torso 7–8 cannot be rolled naturally — only cascaded into, or reached by HEI's +1 |
| Countermeasure Check | Every deployed countermeasure — cartridge or suite — contests a lock on a **4+**. Terrain alone blocks outright |
| Ammo Die | Nothing reloads. Autocannon Empty on 1 (Full Auto 1–3), missiles and jump propellant 1–2, cartridges 1 |
| Jump Jets | 2 EP per hex and nothing else — no terrain or climbing surcharge. A 2+ hex jump grants Flank Speed; a single hop does not. Every jump burns propellant |
| Capacitor | A standing reserve, not a per-turn allowance. The Energy Phase never touches it, so banked charge carries from round to round until spent. Costs draw the pool down first, then the reserve |
| Overcharge | Paid exclusively from the Capacitor, so what it holds *is* the ceiling — there is no separate Allowance to track. An empty Capacitor cannot Overcharge however full the pool, and spending the reserve on ordinary costs spends the same charge |
| Overcharge adds dice | Never a flat bonus — a flat increase would sit outside the reroll system entirely |
| Rapid Fire | Each die tested separately against the DR at declaration. One critical per **burst** that landed a round, never Overkill. Armor degrades by 1 in total |
| One attack per weapon | Each weapon fires once per Combat Phase, however much EP remains |
| Full Auto | Capped at 3 bursts, one hit location for the barrage |
| Torso Facing | Twisted 60° left or right of Leg Facing, or centred. Set once per activation, after all movement. Free unless Servo Lock has been taken, then 2 EP |
| Disruptor Cannon | No damage. Ignores Armor DR and Flank Speed. Every hit forces a critical and drains 1d6 EP. Needs a Radar lock |
| Cover | Light Woods 1 reroll, Heavy Woods and building-adjacent 2. Stacks with the one Flank Speed grants, and survives what strips it — only AoE bypasses Cover |
| AoE | Bypasses Flank Speed *and* Cover; Armor DR still applies |
| Prone (−1d6) | Drop one die, minimum one. Rapid Fire loses a die per burst; weapons rolling no dice are unaffected |
| Crippled legs | A severed leg **or** a destroyed actuator imposes −2 on every Pilot Check. Both legs gone destroys the frame |
| Collisions | Flat Mass Value × Speed, suffered by both frames. Armor DR applies; Flank Speed does not |
| Damage transfer | A hit on a severed limb resolves against Torso DR normally. Flank Speed grants no rerolls against it; Cover still does |
| Ammo Explosion | Only detonates if a volatile store remains. Rail Gun slugs are inert. Nothing to cook off means Reactor Damage instead |

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
    state.js            battle model, mutations, localStorage, schema guard
    transcript.js       battle log → plain text, pure and testable
    sync.js             Firebase Realtime Database adapter
    config.js           Firebase config — yours goes here
    app.js              bootstrap, tab routing, event delegation
    data/frames.js      the five roster frames, and the construction costs
    data/tables.js      hit location, criticals, weapons, terrain, countermeasures
    ui/                 battle, sheet, attack and reference views
```

Views return HTML strings and tag controls with `data-action`; one delegated listener in `app.js`
routes everything. There is no framework and nothing to build.

Interactive controls are sized to a 44px minimum touch target. That matters most on the critical
slots: a mis-tap there applies an effect through the engine that cannot be undone.

---

*Iron Protocol* © 2026 John Karakashian, released under
[CC BY-NC-SA 4.0](../LICENSE.md).
