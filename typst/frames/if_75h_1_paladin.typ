// IF-75H-1 "Paladin" — frame record sheet.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")
#show: frame-sheet.with(theme: theme, title: "IF-75H-1 PALADIN")

#sheet-header("IF-75H-1", "Paladin", "Heavy Fire-Support Frame — 75 tons, Mass Value 3", "555 pts")

#v(3pt)
#state-strip()
#v(3pt)

#stat-strip(
  ("Initiative", "5"),
  ("Reactor", "14 EP"),
  ("Capacitor", "8 EP"),
  ("Move limit", "4 hex"),
  ("Flank speed", "4 hex"),
  ("Jump", "—"),
)

#v(3pt)

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  card({
    label-text("Reactor pool — 14 EP per round")
    v(4pt)
    pip-row(14, per-row: 7)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      The 4th EP in a round leaves a heat bloom. A Heavy cannot enter Heavy
      Woods on foot, so terrain will not hide it either.
    ]
    v(4pt)
    ir-track()
  }),
  card({
    label-text("Capacitor — max 8 EP")
    v(4pt)
    pip-row(8)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      The Rail Gun needs *6 banked EP* to fire at all.
    ]
  }),
)

#v(3pt)

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("R.Arm · Heavy", [*Rail Gun* — 5d6 · AP 3 · #chip("Radar", kind: "armor")], [*Must Overcharge +6 EP from the Capacitor to fire*, so it always cools down for a turn. Inert slugs — infinite, and they never cook off]),
    equip-row("L.Arm · Light", [*Autocannon* — 3 × 1d6 · 1 EP/burst · AP 1 · #chip("VIS", kind: "armor")], [Visual fire control — a different band from the Rail Gun, so no single countermeasure silences both. Empty on *1*, or *1–3* on Full Auto]),
    equip-row("Torso · Medium", [*Guided Missiles* — 4 EP · Cluster · #chip("IR guided", kind: "armor")], [Roll three Hit Locations, one per column, 2d6 to each. AoE: bypasses Flank Speed *and* Cover. Indirect fire permitted. Empty on *1–2*]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Light", [*Smoke Launcher* — 1 EP · #chip("vs VIS", kind: "armor")], [Deployed on your own Activation, into your hex or one adjacent. Visual locks traced through it take a 4+. Empty on *1*]),
    equip-row("Torso · Light", [*IRCM Suite* — 2 EP per use · #chip("vs IR", kind: "armor")], [Never runs dry, but drawn from the reserve the Rail Gun needs]),
    equip-row("Torso · Light", [*Chaff Dispenser* — free · #chip("vs Radar", kind: "armor")], [Spent whether it worked or not. Empty on *1*]),
    equip-row("Head · Light", [*Tactical Datalink*], [Shares locks across the lance]),
  )),
)

#v(3pt)

#ammo-card((
  ammo-store([Autocannon], [1, or 1–3 on Full Auto]),
  ammo-store([Guided Missiles], [1–2]),
  ammo-store([Smoke Launcher], [1]),
  ammo-store([Chaff Dispenser], [1]),
))

#v(3pt)

#card({
  label-text("Armour DR — cross off the highest on each penetration; damage must strictly exceed the current value")
  v(5pt)
  grid(columns: (1fr, 1fr), gutter: 10pt, row-gutter: 5pt,
    dr-track("Head", 5),      dr-track("Torso", 7),
    dr-track("Left Arm", 5),  dr-track("Right Arm", 5),
    dr-track("Left Leg", 6),  dr-track("Right Leg", 6),
  )
})

#v(3pt)

#label-text("Critical damage log — a marked slot cascades upward to the next unmarked one")
#v(3pt)

#crit-log()
