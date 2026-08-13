// IF-45M-1 "Specter" — frame record sheet.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")
#show: frame-sheet.with(theme: theme, title: "IF-45M-1 SPECTER")

#sheet-header("IF-45M-1", "Specter", "Medium Stealth Frame — 45 tons, Mass Value 2", "435 pts")

#v(3pt)
#state-strip()
#v(3pt)

#stat-strip(
  ("Initiative", "10"),
  ("Reactor", "9 EP"),
  ("Capacitor", "4 EP"),
  ("Move limit", "5 hex"),
  ("Flank speed", "4 hex"),
  ("Jump", "—"),
)

#v(3pt)

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  card({
    label-text("Reactor pool — 9 EP per round")
    v(4pt)
    pip-row(9)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Fill in the Energy Phase, erase as spent. A 4th EP spent in a round — from
      this pool *or* the Capacitor — leaves a heat bloom, and the Frame stays
      lockable on infrared for the rest of it. Adaptive Skin upkeep is exempt, so
      buying stealth never exposes you.
    ]
  }),
  card({
    label-text("Capacitor — max 4 EP")
    v(4pt)
    pip-row(4)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      A standing reserve. The Disruptor's Overcharge is paid from here.
    ]
  }),
)

#v(3pt)

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("L.Arm · Medium", [*Laser* — 2d6 · 2 EP · #chip("VIS", kind: "armor")], [Overcharge +2 EP per +1d6, max +2d6 · infinite ammunition · woods blind it outright; Smoke or a Visual-mode Skin contest on a 4+]),
    equip-row("R.Arm · Medium", [*Disruptor Cannon* — no damage · 3 EP · #chip("Radar", kind: "armor")], [Ignores Armor DR *and* Flank Speed entirely. Every hit forces 1 Critical and drains 1d6 EP. Overcharge +2 EP for a second Critical. Chaff and ECM contest on a 4+]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Medium", [*Adaptive Skin* — 2 EP upkeep], [Cloaks one band; attacks on it take a 4+. Overcharge +2 EP for a second band, which puts the suite offline next round. Re-tunable during Activation, then *locked when Combat begins*]),
    equip-row("Head · Light", [*Tactical Datalink*], [A lock held by one datalinked Frame is held by the whole net]),
  )),
)

#v(3pt)

#card({
  label-text("Adaptive Skin — mark the cloaked band each Energy Phase")
  v(4pt)
  grid(columns: (auto, 1fr), gutter: 10pt, align: (horizon, horizon),
    stack(dir: ltr, spacing: 5pt,
      chip("Active", kind: "ok"), chip("VIS", kind: "armor"),
      chip("IR", kind: "armor"), chip("Radar", kind: "armor")),
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Mark one band, or two if Overcharged. Neither weapon aboard carries an
      Ammo Die — the Specter never runs dry, only out of energy.
    ],
  )
})

#v(3pt)

#card({
  label-text("Armour DR — cross off the highest on each penetration; damage must strictly exceed the current value")
  v(5pt)
  grid(columns: (1fr, 1fr), gutter: 10pt, row-gutter: 5pt,
    dr-track("Head", 4),      dr-track("Torso", 5),
    dr-track("Left Arm", 3),  dr-track("Right Arm", 3),
    dr-track("Left Leg", 4),  dr-track("Right Leg", 4),
  )
})

#v(3pt)

#label-text("Critical damage log — a marked slot cascades upward to the next unmarked one")
#v(3pt)

#crit-log()
