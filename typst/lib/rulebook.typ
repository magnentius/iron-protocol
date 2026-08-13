// Iron Protocol — rulebook template.
//
// Shares its palette, fonts and card treatment with the record sheets, so the
// book and the sheets read as one set. What differs is what a book needs and a
// sheet does not: running heads, a generated table of contents, epigraphs, and
// a measure comfortable for 1,300 lines of prose rather than a reference grid.
//
// Section numbers are literal text, not Typst's automatic numbering. The rules
// engine cites 27 of them in source comments (rules.md 5.0, rules.md 7.2.1 and
// so on), and auto-numbering cannot produce "5.0" at all — it would renumber
// 7.2.0 upward and silently invalidate every one of those citations.

#import "iron-protocol.typ": palette-print, palette-screen, sans, serif, mono, edition

#let pal = state("rules-pal", palette-print)

// --- Shell ------------------------------------------------------------------

#let rulebook(theme: "print", title: "Iron Protocol", body) = {
  let p = if theme == "screen" { palette-screen } else { palette-print }
  pal.update(p)

  set document(title: title, author: "John Karakashian")
  set page(
    paper: "us-letter",
    margin: (x: 2.2cm, top: 2.1cm, bottom: 1.9cm),
    fill: p.paper,
    header: context {
      // Nothing on the title page or the contents.
      if counter(page).get().first() <= 2 { return }
      let here-sec = query(selector(heading.where(level: 1)).before(here()))
      let name = if here-sec.len() > 0 { here-sec.last().body } else { [] }
      set text(font: mono, size: 7pt, fill: p.dim)
      grid(columns: (1fr, auto), align: (left, right),
        upper(title), name)
      v(-6pt)
      line(length: 100%, stroke: 0.4pt + p.border)
    },
    footer: context {
      if counter(page).get().first() <= 1 { return }
      set text(font: mono, size: 7pt, fill: p.muted)
      grid(columns: (1fr, auto, 1fr), align: (left, center, right),
        text(fill: p.dim)[#edition], counter(page).display(), [])
    },
  )

  set text(font: serif, size: 10pt, fill: p.ink, lang: "en")
  set par(justify: true, leading: 0.62em, first-line-indent: 0pt, spacing: 0.85em)

  // Headings carry their own numbers as text; Typst only styles them.
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    block(width: 100%, above: 0pt, below: 14pt, {
      set text(font: sans, size: 21pt, weight: "bold", fill: p.ink)
      block(it.body)
      v(4pt)
      line(length: 100%, stroke: 1.2pt + p.ink)
    })
  }
  show heading.where(level: 2): it => block(above: 18pt, below: 8pt, {
    set text(font: sans, size: 13.5pt, weight: "bold", fill: p.ink)
    it.body
  })
  show heading.where(level: 3): it => block(above: 14pt, below: 6pt, {
    set text(font: sans, size: 11pt, weight: "bold", fill: p.accent)
    it.body
  })
  show heading.where(level: 4): it => block(above: 11pt, below: 5pt, {
    set text(font: sans, size: 9.5pt, weight: "bold", fill: p.muted)
    upper(it.body)
  })

  show link: it => text(fill: p.accent, it)

  // Tables: the book has 40 of them and they are read, not admired.
  set table(
    stroke: (x, y) => (
      top: if y == 0 { 0.7pt + p.border } else if y == 1 { 0.5pt + p.border } else { 0.3pt + p.border.transparentize(55%) },
      bottom: 0.7pt + p.border,
    ),
    inset: (x: 6pt, y: 4.5pt),
    fill: (x, y) => if y == 0 { p.surface } else { none },
  )
  show table.cell.where(y: 0): set text(font: mono, size: 7.5pt, fill: p.muted, weight: "regular")

  set list(marker: ([•], [–], [·]), indent: 6pt, spacing: 0.65em)
  set enum(indent: 6pt, spacing: 0.65em)

  body
}

// --- Parts ------------------------------------------------------------------

/// Rationale, marked so it can be skipped. Never rules.
#let design-note(body) = context {
  let p = pal.get()
  block(
    width: 100%, above: 10pt, below: 10pt,
    fill: p.accent.transparentize(93%),
    stroke: (left: 2pt + p.accent.transparentize(40%)),
    inset: (x: 9pt, y: 7pt),
    {
      text(font: mono, size: 6.8pt, fill: p.accent, tracking: 0.12em)[DESIGN NOTE]
      v(3pt)
      set text(size: 9pt, fill: p.ink)
      body
    },
  )
}

/// The chapter epigraphs.
#let epigraph(quote, source) = context {
  let p = pal.get()
  block(width: 100%, above: 2pt, below: 14pt, inset: (left: 10pt),
    stroke: (left: 1.5pt + p.border), {
      set text(size: 9.5pt, style: "italic", fill: p.muted)
      quote
      linebreak()
      text(font: mono, size: 7.5pt, style: "normal")[— #source]
    })
}

/// A worked example: the arithmetic shown step by step.
#let example(body) = context {
  let p = pal.get()
  block(width: 100%, above: 10pt, below: 10pt,
    fill: p.surface, stroke: 0.5pt + p.border, radius: 3pt,
    inset: (x: 9pt, y: 7pt), body)
}

/// A cross-reference to a numbered section. The label must exist or the build
/// fails — which is the whole reason this document is no longer markdown.
#let sec(num) = link(label("s-" + num.replace(".", "-")))[Section #num]

/// Attach the anchor a `sec()` call resolves to.
#let anchor(num) = [#metadata(num)#label("s-" + num.replace(".", "-"))]

#let cover(title, subtitle, art, tagline: none) = context {
  let p = pal.get()
  set page(header: none, footer: none)
  align(center + horizon, block(width: 100%, {
    text(font: mono, size: 9pt, fill: p.accent, tracking: 0.3em)[IRON PROTOCOL]
    v(10pt)
    text(font: sans, size: 40pt, weight: "bold", fill: p.ink)[#title]
    v(6pt)
    text(size: 12pt, style: "italic", fill: p.muted)[#subtitle]
    v(24pt)
    if art != none { image(art, width: 74%) }
    v(14pt)
    text(font: mono, size: 8pt, fill: p.muted, tracking: 0.1em)[#upper(edition)]
    if tagline != none {
      v(18pt)
      block(width: 72%, align(center, text(size: 9pt, style: "italic", fill: p.dim, tagline)))
    }
  }))
  pagebreak()
}
