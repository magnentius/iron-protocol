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

#card({
  grid(columns: (auto, 1fr), gutter: 8pt, align: (horizon, horizon),
    stack(dir: ltr, spacing: 4pt,
      chip("Prone", kind: "warn"), chip("Flank Speed", kind: "ok"), chip("Destroyed", kind: "danger")),
    text(size: 6.3pt, fill: rgb("#5d6b7d"))[
      *Terrain* Clear · Paved · Rough · Water · Woods · Building #h(0.8em)
      *Torso facing* Left 60° · Centred · Right 60°, set once after all movement
    ],
  )
})

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
    pip-row(8, mark: 4, mark-label: "IR lockable")
    v(3pt)
    text(size: 6.5pt, fill: rgb("#5d6b7d"))[
      Fill in the Energy Phase, erase as spent. The 4th EP in a round leaves a
      heat bloom — lockable on infrared for the rest of it. Skin upkeep is exempt.
    ]
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

#card({
  label-text("Armament & systems")
  v(5pt)
  set text(size: 7.5pt)
  grid(columns: (auto, 1fr), gutter: 7pt, row-gutter: 4pt, align: (left, left),

    chip("L.Arm · Light", kind: "accent"),
    [
      *Laser* — 2d6 damage · 2 EP · #chip("VIS", kind: "armor") \
      #text(size: 6.8pt, fill: rgb("#5d6b7d"))[
        Overcharge +2 EP per +1d6, max +2d6 · ammunition infinite ·
        woods blind it outright; Smoke or a Visual-mode Skin contest on a 4+
      ]
    ],

    chip("R.Arm · Light", kind: "accent"),
    [
      *Autocannon* — 3 × 1d6 burst · 1 EP per burst · AP 1 · #chip("Radar", kind: "armor") \
      #text(size: 6.8pt, fill: rgb("#5d6b7d"))[
        Rapid Fire: bypasses Flank Speed, Cover still applies. Full Auto up to 3
        bursts. Ammo Die — Empty on *1*, or *1–3* on Full Auto
      ]
    ],

    chip("Torso · Light", kind: "accent"),
    [
      *Jump Jets* — 2 EP per hex · max 4 hexes \
      #text(size: 6.8pt, fill: rgb("#5d6b7d"))[
        A jump of 2+ hexes grants Flank Speed on landing. No terrain or climbing
        surcharge. Ammo Die — Empty on *1–2*. Propellant is a volatile store
      ]
    ],

    chip("Head · Light", kind: "accent"),
    [
      *Tactical Datalink* \
      #text(size: 6.8pt, fill: rgb("#5d6b7d"))[
        A lock held by one datalinked Frame is held by the whole net. Severed by
        a Structural Fracture to the Head; jammed by an EMP until the End Phase
      ]
    ],
  )
})

#v(3pt)

// --- Ammo dice --------------------------------------------------------------

#card({
  label-text("Ammunition — tick a use; nothing reloads in the field")
  v(4pt)
  grid(columns: (1fr, 1fr, 1fr), gutter: 8pt, align: (left, left, left),
    { text(font: mono, size: 6.5pt, fill: rgb("#5d6b7d"))[Autocannon · empty on 1]; v(2pt); pip-row(6) },
    { text(font: mono, size: 6.5pt, fill: rgb("#5d6b7d"))[Full Auto · empty on 1–3]; v(2pt); pip-row(2) },
    { text(font: mono, size: 6.5pt, fill: rgb("#5d6b7d"))[Jump propellant · empty on 1–2]; v(2pt); pip-row(3) },
  )
})

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

#grid(columns: (1fr, 1fr), gutter: 9pt, align: (top, top),

  stack(dir: ttb, spacing: 6pt,
    crit-table("Head — 5 slots", (
      crit-slot(1, "Sensor Ghosting", "drop all locks; none until end of next activation"),
      crit-slot(2, "Calibration Drift", "1 EP each Energy Phase or no locks"),
      crit-slot(3, "Sensor Array Destroyed", "1d6 — 1–2 IR, 3–4 VIS, 5–6 Radar; permanent"),
      crit-slot(4, "Structural Fracture", "Head DR to 0; Datalink severed", tier: "fracture"),
      crit-slot(5, "Pilot K.O.", "Frame disabled — destroyed", tier: "fatal"),
    )),
    crit-table("Torso — 8 slots", (
      crit-slot(1, "System Glitch", "−1 EP generated next round"),
      crit-slot(2, "Servo Lock", "Torso Twist costs 2 EP"),
      crit-slot(3, "Capacitor Leak", "Cap Max −2; lose 2 stored EP now"),
      crit-slot(4, "Structural Fracture", "Torso DR to 0", tier: "fracture"),
      crit-slot(5, "Reactor Damage", "−2 EP per round, permanently"),
      crit-slot(6, "Ammo Explosion", "volatile store detonates; +2 Torso crits", tier: "fatal"),
      crit-slot(7, "Electrical Fire", "1 crit each End Phase; 3 EP and a 4+ to smother"),
      crit-slot(8, "Containment Failure", "2d6 to adjacent hexes; destroyed", tier: "fatal"),
    )),
  ),

  stack(dir: ttb, spacing: 6pt,
    crit-table("Arms — 6 slots each (L / R)", (
      crit-slot(1, "Targeting Jitter", "−1 damage on this arm's next attack"),
      crit-slot(2, "Actuator Strain", "weapons in this arm cost +1 EP"),
      crit-slot(3, "Hardpoint Failure", "−1 damage die, permanently"),
      crit-slot(4, "Structural Fracture", "this arm's DR to 0", tier: "fracture"),
      crit-slot(5, "Weapon Destroyed", "the mounted weapon is lost"),
      crit-slot(6, "Arm Severed", "arm and everything in it destroyed", tier: "fatal"),
    )),
    crit-table("Legs — 6 slots each (L / R)", (
      crit-slot(1, "Servo Stutter", "Move Limit −2 until end of next activation"),
      crit-slot(2, "Knee Lock", "Walk and Reverse cost +1 EP per hex"),
      crit-slot(3, "Hip Actuator", "Move Limit −2, permanently"),
      crit-slot(4, "Structural Fracture", "this leg's DR to 0", tier: "fracture"),
      crit-slot(5, "Actuator Destroyed", "Prone; check to rise at −2; cannot jump", tier: "fatal"),
      crit-slot(6, "Leg Severed", "Prone; crippled; never walks again", tier: "fatal"),
    )),
  ),
)

