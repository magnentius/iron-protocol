// IF-90A-1 "Colossus" — frame record sheet.
//
// The Assault chassis is the exception on two rules at once: it can never gain
// Flank Speed, and it is always lockable on infrared. Both are stated on the
// sheet rather than left to the rulebook, because both decide how it is played.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")
#show: frame-sheet.with(theme: theme, title: "IF-90A-1 COLOSSUS")

#sheet-header("IF-90A-1", "Colossus", "Heavy Assault Frame — 90 tons, Mass Value 4", "620 pts")

#v(2pt)
#state-strip()
#v(2pt)

#stat-strip(
  ("Initiative", "3"),
  ("Reactor", "18 EP"),
  ("Capacitor", "10 EP"),
  ("Move limit", "3 hex"),
  ("Flank speed", "N/A"),
  ("Jump", "—"),
)

#v(2pt)

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  card(tint: rgb("#8a5a12"), {
    label-text("Reactor pool — 18 EP per round")
    v(4pt)
    pip-row(18, per-row: 9)
    v(3pt)
    text(size: 6.8pt, fill: rgb("#8a5a12"))[
      *An Assault chassis never runs cold* — always lockable on infrared, whatever
      it has spent, so there is no threshold pip to watch. Capped at 3 hexes it
      could never spend the 4 EP that lights anything else up.
    ]
  }),
  card({
    label-text("Capacitor — max 10 EP")
    v(4pt)
    pip-row(10, per-row: 5)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      The deepest reserve in the game: the Rail Gun costs *6 banked EP* a shot.
    ]
  }),
)

#v(2pt)

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("L.Arm · Heavy", [*Thermal Lance* — 3d6 · 4 EP · #chip("IR", kind: "armor")], [Overcharge +2 EP per +1d6, max +2d6 · infinite ammunition · an IRCM suite or Infrared-mode Skin contests it on a 4+]),
    equip-row("R.Arm · Heavy", [*Rail Gun* — 5d6 · AP 3 · #chip("Radar", kind: "armor")], [*Must Overcharge +6 EP from the Capacitor to fire*, so it always cools down for a turn. Inert slugs — infinite, and they never cook off]),
    equip-row("Torso · Medium", [*Guided Missiles* — 4 EP · EMP · #chip("no lock needed", kind: "warn")], [Aimed at a *hex*, not a Frame: nothing contests it and no lock is required. Every Frame in that hex and the 6 around it — *including your own* — takes a Sensor Critical and has its Datalink jammed until the End Phase. No damage; Armor DR is irrelevant. Empty on *1–2*]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Light", [*Smoke Launcher* — 1 EP · #chip("vs VIS", kind: "armor")], [Deployed on your own Activation. Visual locks traced through it take a 4+. Empty on *1*]),
    equip-row("Torso · Light", [*IRCM Suite* — 2 EP per use · #chip("vs IR", kind: "armor")], [The only answer this Frame has on infrared, and it is always exposed there]),
    equip-row("Torso · Light", [*Chaff Dispenser* — free · #chip("vs Radar", kind: "armor")], [Spent whether it worked or not. Empty on *1*]),
    equip-row("Head · Light", [*Tactical Datalink*], [Shares locks across the lance]),
  )),
)

#v(2pt)

#ammo-card((
  ammo-store([Guided Missiles — EMP], [1–2]),
  ammo-store([Smoke Launcher], [1]),
  ammo-store([Chaff Dispenser], [1]),
))

#v(2pt)

#card({
  label-text("Armour DR — cross off the highest on each penetration; damage must strictly exceed the current value")
  v(5pt)
  grid(columns: (1fr, 1fr), gutter: 10pt, row-gutter: 5pt,
    dr-track("Head", 6),      dr-track("Torso", 8),
    dr-track("Left Arm", 6),  dr-track("Right Arm", 6),
    dr-track("Left Leg", 7),  dr-track("Right Leg", 7),
  )
})

#v(2pt)

#label-text("Critical damage log — a marked slot cascades upward to the next unmarked one")
#v(2pt)

#crit-log()
