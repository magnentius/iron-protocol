// IF-75H-1 "Paladin" — frame record sheet.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")
#show: frame-sheet.with(theme: theme, title: "IF-75H-1 PALADIN")

#sheet-header("IF-75H-1", "Paladin", "Heavy Fire-Support Frame — 75 tons, Mass Value 3", "555 pts")

#v(3pt)
#state-strip()
#v(3pt)

// Written once, read by the stat strip, the card headers and the pip counts.
#let reactor = 14
#let capacitor = 8

#stat-strip(
  ("Initiative", "5"),
  ("Reactor", str(reactor) + " EP"),
  ("Capacitor", str(capacitor) + " EP"),
  ("Move limit", "4 hex"),
  ("Flank speed", "4 hex"),
  ("Jump", "—"),
)

#v(3pt)

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  reactor-card(reactor)[
      Fill in the Energy Phase, erase as spent. A 4th EP spent in a round — from
    this pool *or* the Capacitor — leaves a heat bloom, and the Frame stays
    lockable on infrared for the rest of it. A Heavy cannot enter Heavy Woods
    on foot, so terrain will not hide it either.
  ],
  capacitor-card(capacitor)[
      The Rail Gun needs *6 banked EP* to fire at all.
  ],
)

#v(3pt)

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("R.Arm · Heavy", [*Rail Gun* — 5d6 · AP 3 · #chip("Radar", kind: "armor")], [*Must Overcharge +6 EP from the Capacitor to fire*, so it always cools down for a turn. Inert slugs — infinite, and they never cook off]),
    equip-row("L.Arm · Light", [*Autocannon* — 3 × 1d6 · 1 EP/burst · AP 1 · #chip("VIS", kind: "armor")], [Visual fire control — a different band from the Rail Gun, so no single countermeasure silences both]),
    equip-row("Torso · Medium", [*Guided Missiles* — 4 EP · Cluster · #chip("IR guided", kind: "armor")], [Roll three Hit Locations, one per column, 2d6 to each. AoE: bypasses Flank Speed *and* Cover. Indirect fire permitted]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Light", [*Smoke Launcher* — 1 EP · #chip("vs VIS", kind: "armor")], [Deployed on your own Activation, into your hex or one adjacent. Visual locks traced through it take a 4+]),
    equip-row("Torso · Light", [*IRCM Suite* — 2 EP per use · #chip("vs IR", kind: "armor")], [Never runs dry, but drawn from the reserve the Rail Gun needs]),
    equip-row("Torso · Light", [*Chaff Dispenser* — free · #chip("vs Radar", kind: "armor")], [Spent whether it worked or not]),
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
