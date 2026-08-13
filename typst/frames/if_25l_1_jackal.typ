// IF-25L-1 "Jackal" — frame record sheet.
//
// Build:  typst compile typst/frames/if_25l_1_jackal.typ
//         typst compile --input theme=screen ... for the dark variant.

#import "../lib/iron-protocol.typ": *

#let theme = sys.inputs.at("theme", default: "print")

#show: frame-sheet.with(theme: theme, title: "IF-25L-1 JACKAL")

#sheet-header(
  "IF-25L-1",
  "Jackal",
  "Light Recon Frame — 25 tons, Mass Value 1",
  "365 pts",
)

#v(3pt)

#status-strip()

#v(3pt)

#stat-strip(
  ("Initiative", "12"),
  ("Reactor", "8 EP"),
  ("Capacitor", "3 EP"),
  ("Move limit", "7 hex"),
  ("Flank speed", "4 hex"),
  ("Jump", "4 hex"),
)

#v(3pt)

// --- Energy -----------------------------------------------------------------

#grid(columns: (1.35fr, 1fr), gutter: 9pt,
  card({
    label-text("Reactor pool — 8 EP per round")
    v(4pt)
    pip-row(8)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Fill in the Energy Phase, erase as spent. The 4th EP in a round leaves a
      heat bloom — lockable on infrared for the rest of it. Skin upkeep is exempt.
    ]
    v(4pt)
    ir-track()
  }),
  card({
    label-text("Capacitor — max 3 EP")
    v(4pt)
    pip-row(3)
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      A standing reserve — never swept into the pool, and the only source of
      Overcharge EP.
    ]
  }),
)

#v(3pt)

// --- Armament ---------------------------------------------------------------

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),
  equip-card("Weapons", (
    equip-row("L.Arm · Light", [*Laser* — 2d6 · 2 EP · #chip("VIS", kind: "armor")], [Overcharge +2 EP per +1d6, max +2d6 · infinite ammunition · woods blind it outright; Smoke or a Visual-mode Skin contest on a 4+]),
    equip-row("R.Arm · Light", [*Autocannon* — 3 × 1d6 · 1 EP/burst · AP 1 · #chip("Radar", kind: "armor")], [Rapid Fire: bypasses Flank Speed, Cover still applies. Full Auto up to 3 bursts. Empty on *1*, or *1–3* on Full Auto]),
  )),
  equip-card("Defensive systems", (
    equip-row("Torso · Light", [*Jump Jets* — 2 EP per hex · max 4 hexes], [A jump of 2+ hexes grants Flank Speed on landing. No terrain or climbing surcharge. Empty on *1–2*. Propellant is a volatile store]),
    equip-row("Head · Light", [*Tactical Datalink*], [A lock held by one datalinked Frame is held by the whole net. Severed by a Structural Fracture to the Head; jammed by an EMP until the End Phase]),
  )),
)

#v(3pt)

// --- Ammo dice --------------------------------------------------------------

#ammo-card((
  ammo-store([Autocannon *— one magazine, however it is fired*], [1, or 1–3 on Full Auto]),
  ammo-store([Jump Jet propellant], [1–2]),
))

#v(3pt)

// --- Armour -----------------------------------------------------------------

#card({
  label-text("Armour DR — cross off the highest remaining on every penetration")
  v(5pt)
  grid(columns: (1fr, 1fr), gutter: 10pt, row-gutter: 5pt,
    dr-track("Head", 3),      dr-track("Torso", 3),
    dr-track("Left Arm", 2),  dr-track("Right Arm", 2),
    dr-track("Left Leg", 3),  dr-track("Right Leg", 3),
  )
})

#v(3pt)

// --- Criticals --------------------------------------------------------------

#label-text("Critical damage log — a marked slot cascades upward to the next unmarked one")
#v(3pt)

#crit-log()

