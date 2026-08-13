# Iron Protocol

**A Tactical Game of Iron Frame Combat**

![Iron Protocol Logo](images/logo.jpg)

*Iron Protocol* is a hex-grid tabletop wargame of heavy mechanical combat. It fuses the tactical resource management, locational damage, and critical tables of classic mecha wargames with the fluid turn-order dynamics, initiative-based activations, and torso twisting of tactical dogfighters.

---

## 📥 Download and play

**[Latest release](../../releases/latest)** — the edition date is on the cover and every sheet.

| | |
| :--- | :--- |
| 📓 **[Rulebook](../../releases/latest)** | 62 pages, US Letter |
| 📋 **[Record sheets](../../releases/latest)** | All five Frames, one page each — grab the `.zip` for the set |
| 📱 **[Battle Tracker](https://play.ironproto.app)** | Runs in a browser; *Add to Home Screen* on a phone and it works offline |

Everything in a release carries the same **edition date**, printed on the rulebook cover and in the footer of every sheet — so you can always tell how current your printout is, and whether a sheet and the rulebook came from the same set. A printout marked `Draft` was built locally rather than released.

New to the game? Start with **Trial by Fire** (§1.4.1), a 1v1 Vanguard mirror match. Identical Frames means every difference in the outcome comes from your decisions rather than the matchup.

---

## 📂 Repository Guide

* 📓 **[rules.typ](typst/rules.typ)**: The full master rulebook — core phases, terrain, sensors and stealth, weapons, damage and criticals, the construction rules, pilot vows and the five technical readouts. Written in [Typst](https://typst.app); cross-references are resolved at compile time, so a stale one fails the build rather than misdirecting a player. Download the built PDF from the [latest release](../../releases/latest); every push also attaches one to the [Rulebook & Sheets workflow](../../actions/workflows/build-sheets.yml). To build it yourself:

```bash
typst compile --root . --font-path typst/fonts --ignore-system-fonts \
  typst/rules.typ iron-protocol-rules.pdf
```
* 📋 **Quick reference**: the **Ref tab** of the [Battle Tracker](docs/) carries the turn sequence, the sensor matrix, terrain, weapons, Ammo Dice, movement costs and all four critical tables. It is generated from the same constants the rules engine resolves against, so unlike the hand-written sheet it replaces, it cannot fall out of step with the rulebook.
* 🛠️ **[Frame Record Sheets](typst/frames/)**: Printable sheets for the five standard frames (**IF-25L-1 Jackal**, **IF-45M-1 Specter**, **IF-55M-1 Vanguard**, **IF-75H-1 Paladin**, and **IF-90A-1 Colossus**), each on a single page, with real tracking boxes for energy pools, armor DR, critical slots and Ammo Dice. Written in [Typst](https://typst.app) against [vendored free fonts](typst/fonts/), so every build produces the same document. Download them from the [latest release](../../releases/latest), or build them yourself:

```bash
typst compile --root . --font-path typst/fonts --ignore-system-fonts \
  typst/frames/if_25l_1_jackal.typ jackal.pdf
```
* 🧪 **[playtest.md](playtest.md)**: Twelve scenarios used as a test suite for the rules engine, from a 1v1 introductory duel up to a 4v4 slugfest, each written to stress a specific system — armor degradation, sensor stealth, the Overcharge economy, the Vow system, action economy, vertical terrain and impact damage, the wrecked-Frame endgame, electromagnetic warfare, and the full Vow system.
* 📱 **[Battle Tracker](docs/)**: A mobile web app that carries the bookkeeping for you — energy and capacitor charge, the Armor DR track and critical slots for every location, Ammo Dice, and the permanent critical effects that are easy to lose track of. It includes a guided attack resolver that walks the Combat Phase sequence — countermeasures, hit location, damage, Flank Speed and Cover rerolls, Armor DR, Overkill and cascading criticals — showing its arithmetic at each step, and two players on separate phones can share one live battle via a room code. See **[docs/README.md](docs/README.md)** to run or deploy it.

---

## ⚙️ Workflows, Versions and Releases

Three GitHub Actions workflows. They are kept separate because the book, the app
and a published edition change at different rates, fail in different ways, and
only one of them needs a credential.

| Workflow | Runs when | Does |
| :--- | :--- | :--- |
| **[Rulebook & Sheets](.github/workflows/build-sheets.yml)** | a push or PR touching `typst/**` | Builds the rulebook and all five sheets, in print and screen themes, and attaches them to the run as a 90-day artifact. Fast feedback; publishes nothing. |
| **[Deploy tracker](.github/workflows/deploy.yml)** | a push touching `docs/**`, `www/**` or the Firebase config — or a successful **Release**, since the landing page advertises the edition | Runs the test suite, stamps the service worker and the landing page edition, deploys both Hosting targets and the database rules, then polls until both hosts serve the build it just made. |
| **[Release](.github/workflows/release.yml)** | a tag matching `v*` | Builds everything with the edition date stamped in, checks every sheet still fits one page, and publishes a GitHub Release with the rulebook, the five sheets and a zip of the set. |

### How versions work

Releases are tagged by **date**, not semver:

```
v2026.08.13        the edition published that day
v2026.08.13.2      a second edition the same day
```

A player holds a printed sheet and wants to know how current it is. `2026-08-13`
answers that at a glance; `v1.4.0` does not. What a date cannot express is
*magnitude*, so a change that invalidates printouts belongs in the release title
rather than in a digit.

**The edition date is printed on the artifacts**, which is the part that reaches
players: on the rulebook cover, in its running footer, and in the footer of every
record sheet. Everything in a release carries the *same* date, including sheets
that did not change, so a sheet and the rulebook can always be told to be from
one set. A build made locally reads `Draft <date>` instead, and can never be
mistaken for a published one.

The Battle Tracker's service worker version is **derived, never hand-edited**:

```bash
git describe --tags --always     # → v2026.08.13-2-ga9ff788
```

That string becomes `VERSION` in `docs/sw.js` at deploy time. It is a cache key,
and if it fails to change when the code does, every client keeps serving the
previous build from an unchanged key — a manual step with a silent failure mode,
so it is not a manual step.

The edition shown on the landing page is derived the same way, from a different
question — the last edition actually *released*, rather than a key that must
change on every commit:

```bash
git describe --tags --abbrev=0   # → v2026.08.13.2
```

Nothing in the repository records the current edition by hand. It was recorded
twice, in this file and in `www/index.html`, and both were copies of something
the tag already knew; a copy like that goes stale without anything failing, and
the page simply advertises the wrong edition until somebody notices.

### Cutting a release

```bash
git tag v2026.08.13
git push origin v2026.08.13
```

That is the whole process, and it is one edit. The Release workflow derives
`2026-08-13` from the tag, stamps it into every document and publishes them; its
success then triggers Deploy tracker, which re-stamps the landing page so the
site and the release agree without either being told twice.

Nothing is built by hand and no PDF is committed to the repository: they are
derived from the sources and the constants those sources quote, so a stored copy
would only be one more thing that can disagree with the original.

### What CI will not let through

- **A sheet that runs to two pages.** Overflow is silent — the PDF still builds —
  and you would find out at the table. Both PDF workflows fail on it.
- **A stale cross-reference.** The rulebook's section links are resolved at
  compile time, so pointing at a section that does not exist fails the build
  rather than misdirecting a reader.
- **A failing test suite.** Nothing deploys over red.
- **A deploy that did not take.** The final step polls both hosts until they serve
  the version just stamped, because a green deploy step is not proof of what is
  being served.
- **A sync field the database rules do not name.** `firebase.rules.json` ends with
  `$other: false`, so a field added to the battle and not to the rules makes every
  write fail — invisibly, until two people share a battle. A test asserts the two
  agree.

### Setup

Deploying needs one repository secret, **`FIREBASE_SERVICE_ACCOUNT`** — a service
account key with Firebase Hosting Admin and Realtime Database Admin. Without it
the deploy workflow fails at that step with a named error and nothing else is
affected. The other two workflows need no secrets.

Building documents locally needs [Typst](https://typst.app); the fonts are
[vendored](typst/fonts/), so no font installation is required.

---

## 📜 License & Copyright

**Copyright (c) 2026 John Karakashian**

*Iron Protocol* is released under the **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](LICENSE.md)**. 

You are entirely free to share, copy, and remix the rules to create your own homebrew content, custom frames, or campaigns, provided you credit the original project, link back to this repository, and do not use the material for commercial purposes. Any derivative works must be distributed under this same license.
