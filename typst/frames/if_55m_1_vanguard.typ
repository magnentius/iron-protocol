// IF-55M-1 "Vanguard" — frame record sheet.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")
#show: frame-sheet.with(theme: theme, title: "IF-55M-1 VANGUARD")

#sheet-header("IF-55M-1", "Vanguard", "Medium Skirmisher Frame — 55 tons, Mass Value 2", "455 pts")

#v(2pt)
#state-strip()
#v(2pt)

#stat-strip(
  ("Initiative", "6"),
  ("Reactor", "12 EP"),
  ("Capacitor", "6 EP"),
  ("Move limit", "5 hex"),
  ("Flank speed", "4 hex"),
  ("Jump", "—"),
)

#v(2pt)

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  card({
    label-text("Reactor pool — 12 EP per round")
    v(4pt)
    pip-row(12, per-row: 6)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Fill in the Energy Phase, erase as spent. A 4th EP spent in a round — from
      this pool *or* the Capacitor — leaves a heat bloom, and the Frame stays
      lockable on infrared for the rest of it. The largest reactor of any Medium.
    ]
  }),
  card({
    label-text("Capacitor — max 6 EP")
    v(4pt)
    pip-row(6)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Pays for Laser Overcharges *and* the IRCM suite — jamming costs firepower.
    ]
  }),
)

#v(2pt)

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("L.Arm · Medium", [*Autocannon* — 3 × 1d6 · 1 EP/burst · AP 1 · #chip("Radar", kind: "armor")], [Rapid Fire: bypasses Flank Speed, Cover still applies. Full Auto up to 3 bursts. Empty on *1*, or *1–3* on Full Auto]),
    equip-row("R.Arm · Medium", [*Laser* — 2d6 · 2 EP · #chip("VIS", kind: "armor")], [Overcharge +2 EP per +1d6, max +2d6 · infinite ammunition. A second band, so no single countermeasure silences both arms]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Medium", [*ECM Suite* — 2 EP upkeep · #chip("vs Radar", kind: "armor")], [Contests every Radar lock on a 4+ and never runs out. 0-hex radius; Overcharge +1 EP per +1 hex to umbrella allies, triggering a 1-turn cooldown]),
    equip-row("Torso · Light", [*IRCM Suite* — 2 EP per use · #chip("vs IR", kind: "armor")], [Powered, not expendable: never dry, but spends the charge an Overcharge needs]),
    equip-row("Torso · Light", [*Chaff Dispenser* — free · #chip("vs Radar", kind: "armor")], [Spent whether it worked or not. Empty on *1*]),
    equip-row("Head · Light", [*Tactical Datalink*], [Shares locks across the lance]),
  )),
)

#v(2pt)

#ammo-card((
  ammo-store([Autocannon], [1, or 1–3 on Full Auto]),
  ammo-store([Chaff Dispenser], [1]),
))

#v(2pt)

#card({
  label-text("Armour DR — cross off the highest on each penetration; damage must strictly exceed the current value")
  v(5pt)
  grid(columns: (1fr, 1fr), gutter: 10pt, row-gutter: 5pt,
    dr-track("Head", 5),      dr-track("Torso", 6),
    dr-track("Left Arm", 4),  dr-track("Right Arm", 4),
    dr-track("Left Leg", 5),  dr-track("Right Leg", 5),
  )
})

#v(2pt)

#label-text("Critical damage log — a marked slot cascades upward to the next unmarked one")
#v(2pt)

#crit-log()
