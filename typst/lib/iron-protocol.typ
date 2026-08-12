// Iron Protocol — shared Typst template.
//
// Carries the Battle Tracker's visual identity onto paper. The tracker is dark
// because it is a phone at a dim table; a sheet is a printer and a pencil, so
// the ground inverts while the hue, the monospace numerals and the semantic
// colours stay put. Both themes are defined here and selected by `theme`, so
// one source builds a print sheet and a screen sheet.

#let palette-print = (
  paper:    rgb("#f7f9fb"),
  surface:  rgb("#eef2f6"),
  surface2: rgb("#e3e9ef"),
  border:   rgb("#c3ccd7"),
  ink:      rgb("#141a23"),   // the app's own --surface, a blue-cast near-black
  muted:    rgb("#5d6b7d"),
  dim:      rgb("#8593a5"),
  accent:   rgb("#0e7899"),   // --accent #4dd2ff, darkened to hold on white
  danger:   rgb("#b3342c"),
  warn:     rgb("#8a5a12"),
  ok:       rgb("#2f7a52"),
  armor:    rgb("#3d6f9c"),
)

#let palette-screen = (
  paper:    rgb("#0b0e13"),
  surface:  rgb("#141a23"),
  surface2: rgb("#1b222d"),
  border:   rgb("#253040"),
  ink:      rgb("#dce3ec"),
  muted:    rgb("#8593a5"),
  dim:      rgb("#5d6b7d"),
  accent:   rgb("#4dd2ff"),
  danger:   rgb("#ff5f56"),
  warn:     rgb("#ffb347"),
  ok:       rgb("#57d38c"),
  armor:    rgb("#6ea8d8"),
)

// Fonts are vendored in typst/fonts/ and used exclusively — build with
//   typst compile --root . --font-path typst/fonts --ignore-system-fonts
// so that every machine produces the same document. The sheets were designed
// against Iowan Old Style, Helvetica Neue and Menlo, none of which can be
// redistributed; these are the free faces closest to them:
//
//   XCharter        Matthew Carter's Charter, extended. Same sturdy old-style
//                   and large x-height as Iowan, which is what keeps 6.5pt text
//                   readable — the size most of a record sheet is set in.
//   TeX Gyre Heros  a genuine Helvetica clone from GUST.
//   DejaVu Sans Mono  ships with Typst, and shares Bitstream Vera ancestry with
//                   Menlo, so it is effectively the same face.
//
// Licences sit beside the files: GUST-FONT-LICENSE.txt and XCharter-README.txt.
#let sans  = "TeX Gyre Heros"
#let serif = "XCharter"
#let mono  = "DejaVu Sans Mono"

#let pal = state("pal", palette-print)

// --- Document shell ---------------------------------------------------------

#let frame-sheet(theme: "print", title: none, body) = {
  let p = if theme == "screen" { palette-screen } else { palette-print }
  pal.update(p)

  set page(
    paper: "us-letter",
    margin: (x: 1.25cm, y: 0.7cm),
    fill: p.paper,
    footer: context [
      #set text(size: 6.5pt, font: mono, fill: p.dim)
      #grid(columns: (1fr, auto),
        align: (left, right),
        [IRON PROTOCOL · FRAME RECORD SHEET],
        [#title #h(0.6em) #counter(page).display()],
      )
    ],
  )
  set text(font: serif, size: 9pt, fill: p.ink)
  set par(leading: 0.55em)
  body
}

// --- Small parts ------------------------------------------------------------

/// Uppercase tracking label — the app's .section-title, in print.
#let label-text(s) = context {
  let p = pal.get()
  text(font: mono, size: 6.5pt, fill: p.muted, tracking: 0.12em, upper(s))
}

/// A status pill. `kind` selects a semantic colour rather than a literal.
#let chip(s, kind: "accent") = context {
  let p = pal.get()
  let c = if kind == "danger" { p.danger } else if kind == "warn" { p.warn
    } else if kind == "ok" { p.ok } else if kind == "armor" { p.armor } else { p.accent }
  box(
    fill: c.transparentize(88%),
    stroke: 0.4pt + c.transparentize(45%),
    radius: 2pt,
    inset: (x: 4pt, y: 2pt),
    text(font: mono, size: 6.5pt, fill: c, weight: "bold", tracking: 0.06em, upper(s)),
  )
}

/// A tinted card, the print equivalent of the tracker's .card surface.
#let card(body, tint: none) = context {
  let p = pal.get()
  block(
    width: 100%,
    fill: if tint == none { p.surface } else { tint.transparentize(92%) },
    stroke: 0.5pt + p.border,
    radius: 3pt,
    inset: (x: 7pt, y: 5pt),
    body,
  )
}

// --- Trackers: the things markdown cannot draw ------------------------------

/// A row of pips to fill in. `mark` labels one pip (the IR threshold).
#let pip-row(n, mark: none, mark-label: "IR", per-row: 12) = context {
  let p = pal.get()
  let pip(i) = {
    let hot = mark != none and i == mark
    box(baseline: 25%, stack(dir: ttb, spacing: 1.5pt,
      circle(
        radius: 3.6pt,
        fill: if hot { p.warn.transparentize(80%) } else { p.paper },
        stroke: (if hot { 0.9pt + p.warn } else { 0.5pt + p.border }),
      ),
      text(font: mono, size: 5pt, fill: if hot { p.warn } else { p.dim })[#i],
    ))
  }
  let rows = calc.ceil(n / per-row)
  stack(dir: ttb, spacing: 4pt, ..range(rows).map(r => {
    let lo = r * per-row + 1
    let hi = calc.min(n, (r + 1) * per-row)
    stack(dir: ltr, spacing: 3pt, ..range(lo, hi + 1).map(pip))
  }))
  if mark != none {
    linebreak()
    text(font: mono, size: 6pt, fill: p.warn)[#h(1pt) ▲ #mark-label at #mark EP]
  }
}

/// Armour DR track: boxes crossed off from the highest down to zero.
#let dr-track(loc, max) = context {
  let p = pal.get()
  let cell(v) = box(
    width: 15pt, height: 15pt,
    fill: if v == 0 { p.danger.transparentize(90%) } else { p.paper },
    stroke: (if v == 0 { 0.6pt + p.danger.transparentize(40%) } else { 0.6pt + p.armor.transparentize(35%) }),
    radius: 2pt,
    align(center + horizon,
      text(font: mono, size: 8pt, weight: "bold",
        fill: if v == 0 { p.danger } else { p.armor })[#v]),
  )
  grid(columns: (52pt, 1fr), align: (left + horizon, left + horizon), gutter: 5pt,
    text(font: sans, size: 8pt, weight: "bold")[#loc],
    stack(dir: ltr, spacing: 3pt, ..range(max, -1, step: -1).map(cell)),
  )
}

/// One critical slot: a box to tick, its number, and what it does.
#let crit-slot(n, name, effect, tier: none) = context {
  let p = pal.get()
  let c = if tier == "fracture" { p.warn } else if tier == "fatal" { p.danger } else { p.muted }
  grid(columns: (auto, auto, 1fr), gutter: 3.5pt, align: (horizon, horizon, horizon),
    box(width: 9pt, height: 9pt, radius: 1.5pt, stroke: 0.6pt + p.border, fill: p.paper),
    text(font: mono, size: 7pt, fill: c, weight: "bold")[#n],
    text(size: 6.8pt)[#text(weight: "bold", fill: c)[#name] #text(fill: p.muted, size: 6.3pt)[#effect]],
  )
}

#let crit-table(title, slots) = context {
  let p = pal.get()
  card(stack(dir: ttb, spacing: 2pt,
    label-text(title),
    ..slots,
  ))
}

// --- Header -----------------------------------------------------------------

#let sheet-header(designation, name, role, points) = context {
  let p = pal.get()
  block(width: 100%, inset: (bottom: 4pt), stroke: (bottom: 1.2pt + p.ink), {
    grid(columns: (1fr, auto), align: (left + bottom, right + bottom),
      stack(dir: ttb, spacing: 2pt,
        text(font: mono, size: 7pt, fill: p.accent, tracking: 0.16em)[#upper(designation)],
        text(font: sans, size: 21pt, weight: "bold", fill: p.ink)[#name],
        text(font: serif, size: 8.5pt, style: "italic", fill: p.muted)[#role],
      ),
      stack(dir: ttb, spacing: 2pt,
        align(right, label-text("Deployment cost")),
        text(font: mono, size: 15pt, weight: "bold", fill: p.ink)[#points],
      ),
    )
  })
}

/// The stat strip: everything you read off without thinking.
#let stat-strip(..pairs) = context {
  let p = pal.get()
  let items = pairs.pos()
  grid(
    columns: items.len(),
    stroke: 0.5pt + p.border,
    ..items.map(it => block(width: 100%, inset: (x: 5pt, y: 3pt), fill: p.surface,
      stack(dir: ttb, spacing: 2pt,
        label-text(it.at(0)),
        text(font: mono, size: 11pt, weight: "bold", fill: p.ink)[#it.at(1)],
      ))),
  )
}

// --- The critical log -------------------------------------------------------
//
// Identical on every Frame in the game: Head 5, Torso 8, Arms 6, Legs 6, each
// climbing the same Severity Ladder. It lives here rather than in five sheets
// so a rules change lands once — the whole argument for this template.

#let crit-log() = grid(columns: (1fr, 1fr), gutter: 8pt, align: (top, top),

  stack(dir: ttb, spacing: 5pt,
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

  stack(dir: ttb, spacing: 5pt,
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

/// The status / terrain / facing strip carried by every sheet.
#let status-strip() = context {
  let p = pal.get()
  card({
    grid(columns: (auto, 1fr), gutter: 8pt, align: (horizon, horizon),
      stack(dir: ltr, spacing: 4pt,
        chip("Prone", kind: "warn"), chip("Flank Speed", kind: "ok"), chip("Destroyed", kind: "danger")),
      text(size: 6.3pt, fill: p.muted)[
        *Terrain* Clear · Paved · Rough · Water · Woods · Building #h(0.8em)
        *Torso facing* Left 60° · Centred · Right 60°, set once after all movement
      ],
    )
  })
}

/// One equipment entry, stacked so it fits a half-width column.
#let equip-row(mount, head, detail) = context {
  let p = pal.get()
  stack(dir: ttb, spacing: 1pt,
    { chip(mount) + h(4pt) + text(size: 7.4pt)[#head] },
    text(size: 6.4pt, fill: p.muted)[#detail],
  )
}

/// A titled equipment card — weapons on one side, defensive systems on the other.
#let equip-card(title, rows) = card({
  label-text(title)
  v(4pt)
  stack(dir: ttb, spacing: 4pt, ..rows)
})
