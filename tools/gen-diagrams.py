#!/usr/bin/env python3
"""Draws images/arcs.svg and images/zones.svg — the two Section 1.3 figures.

    python3 tools/gen-diagrams.py        # from the repo root

The SVGs are committed; this is what regenerates them when the arc or hit-zone
rules change. Editing the SVGs by hand is fine too, but then this script is
stale and the next run will overwrite the edit, so change it here instead.

Hex orientation is flat top and bottom edge, vertices left and right, so the
six neighbours sit at N, NE, SE, S, SW and NW — one per hexside. That is the
only orientation in which a Frame can face a hexside and have a hex directly
ahead of it, which is what Section 1.2 requires. Torso Facing is north in both
diagrams and every bearing below is degrees clockwise from it.

Every fill is opaque, mixed against the paper colour rather than laid over the
page with alpha, so one file renders identically in the print and screen
builds instead of needing a variant per theme.
"""
import math
from pathlib import Path

DST = Path("images")

# Mirrors palette-print in typst/lib/iron-protocol.typ. The screen palette is
# deliberately not used: a light figure reads on both papers, a dark one does
# not print.
PAPER   = "#f7f9fb"
SURFACE = "#eef2f6"
BORDER  = "#c3ccd7"
INK     = "#141a23"
MUTED   = "#5d6b7d"
DIM     = "#8593a5"
ACCENT  = "#0e7899"
DANGER  = "#b3342c"
WARN    = "#8a5a12"
OK      = "#2f7a52"
ARMOR   = "#3d6f9c"

# One hue per sector, so no two that touch on the map read alike.
FRONT, LEFT, RIGHT, REAR = ARMOR, WARN, OK, DANGER

# Vendored in typst/fonts/ and embedded in Typst respectively, so the text in
# these files renders under --ignore-system-fonts like everything else.
MONO = "DejaVu Sans Mono"


def mix(fg: str, bg: str, t: float) -> str:
    """Opaque blend of fg over bg at fraction t."""
    f = [int(fg[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(bg[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join("%02x" % round(f[i] * t + b[i] * (1 - t)) for i in range(3))


# --- geometry ---------------------------------------------------------------

def hex_path(cx, cy, r):
    pts = [(cx + r * math.cos(math.radians(60 * i)),
            cy + r * math.sin(math.radians(60 * i))) for i in range(6)]
    return "M " + " L ".join("%.1f %.1f" % p for p in pts) + " Z"


def polar(bearing, r):
    """Offset r from the centre along a bearing clockwise from Torso Facing."""
    a = math.radians(bearing)
    return (r * math.sin(a), -r * math.cos(a))


def neighbour(bearing, r, rings=1):
    """Centre of the hex `rings` steps out along a hexside bearing."""
    return polar(bearing, math.sqrt(3) * r * rings)


# --- primitives -------------------------------------------------------------

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def label(x, y, s, size=13, fill=MUTED, anchor="middle", weight="normal",
          track=0.10):
    """Set text the way label-text() does in the rulebook: mono, caps, tracked."""
    ls = ' letter-spacing="%.2f"' % (size * track) if track else ""
    w = ' font-weight="bold"' if weight == "bold" else ""
    # Tracking is applied after the last glyph too; pull centred and right-set
    # text back by that much so the string lands where it was asked to.
    if track and anchor in ("middle", "end"):
        x -= size * track / (2 if anchor == "middle" else 1)
    return ('<text x="%.1f" y="%.1f" font-family="%s" font-size="%d"%s%s'
            ' fill="%s" text-anchor="%s">%s</text>'
            % (x, y + size * 0.35, MONO, size, ls, w, fill, anchor,
               esc(s.upper())))


def arrowhead(name, color):
    return ('<marker id="ah%s" viewBox="0 0 10 10" refX="9" refY="5"'
            ' markerWidth="5" markerHeight="5" orient="auto-start-reverse">'
            '<path d="M 0 0 L 10 5 L 0 10 z" fill="%s"/></marker>' % (name, color))


def defs(colors):
    return "<defs>\n  %s\n</defs>" % "\n  ".join(
        [arrowhead("ink", INK)] + [arrowhead(c[1:], c) for c in colors])


def panel(w, h):
    return ('<rect x="1" y="1" width="%d" height="%d" rx="10" fill="%s"'
            ' stroke="%s" stroke-width="1.5"/>' % (w - 2, h - 2, PAPER, BORDER))


def hexagon(cx, cy, r, fill, stroke=BORDER, dash=None):
    d = ' stroke-dasharray="%s"' % dash if dash else ""
    return ('<path d="%s" fill="%s" stroke="%s" stroke-width="1.5"%s/>'
            % (hex_path(cx, cy, r), fill, stroke, d))


def mech(cx, cy, s=1.0):
    """Top-down frame glyph, prow pointing at the Torso Facing."""
    def p(x, y):
        return "%.1f %.1f" % (cx + x * s, cy + y * s)
    g = ['<g>']
    for sx in (-1, 1):                                          # arm pods
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="2"'
                 ' fill="%s"/>' % (cx + sx * 20 * s - 6 * s, cy - 12 * s,
                                   12 * s, 24 * s, MUTED))
    g.append('<path d="M %s L %s L %s L %s L %s Z" fill="%s"/>'  # torso
             % (p(0, -20), p(13, -6), p(11, 15), p(-11, 15), p(-13, -6), INK))
    g.append('<path d="M %s L %s L %s Z" fill="%s"/>'            # cockpit
             % (p(0, -15), p(6, -4), p(-6, -4), PAPER))
    g.append('</g>')
    return "\n".join(g)


def facing_arrow(cx, cy, r):
    return ('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s"'
            ' stroke-width="2.5" marker-end="url(#ahink)"/>'
            % (cx, cy - r * 0.55, cx, cy - r * 1.15, INK))


def ray(cx, cy, bearing, r0, r1):
    """A sector boundary, dashed because nothing sits on it."""
    x0, y0 = polar(bearing, r0)
    x1, y1 = polar(bearing, r1)
    return ('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s"'
            ' stroke-width="1.6" stroke-dasharray="5 5"/>'
            % (cx + x0, cy + y0, cx + x1, cy + y1, BORDER))


def footnotes(w, h, cx, lines):
    o = ['<line x1="40" y1="%d" x2="%d" y2="%d" stroke="%s" stroke-width="1"/>'
         % (h - 52, w - 40, h - 52, BORDER)]
    for i, line in enumerate(lines):
        o.append(label(cx, h - 40 + i * 18, line, size=11, fill=DIM))
    return o


def head(w, h, aria, title):
    return ['<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d"'
            ' viewBox="0 0 %d %d" role="img" aria-label="%s">'
            % (w, h, w, h, esc(aria)),
            '<title>%s</title>' % esc(title),
            defs([FRONT, LEFT, RIGHT, REAR, ACCENT]),
            panel(w, h)]


# --- 1.3.1 Firing Arcs ------------------------------------------------------

def arcs_svg():
    W, H = 620, 592
    CX, CY = 310, 266
    R = 58
    out = head(W, H, "Firing arcs measured from a frame's torso facing",
               "Firing Arcs")

    # The six hexsides, each named and tinted by the arc that covers it. All
    # three front hexsides belong to one 180-degree arc; the rest are 60 each.
    ring = [(0, "FRONT", FRONT), (60, "FRONT-RIGHT", FRONT),
            (120, "RIGHT-REAR", RIGHT), (180, "REAR", REAR),
            (240, "LEFT-REAR", LEFT), (300, "FRONT-LEFT", FRONT)]

    for bearing, _, color in ring:
        dx, dy = neighbour(bearing, R)
        out.append(hexagon(CX + dx, CY + dy, R, mix(color, PAPER, 0.20)))
    out.append(hexagon(CX, CY, R, SURFACE))

    for bearing, name, color in ring:
        dx, dy = neighbour(bearing, R)
        out.append(label(CX + dx, CY + dy - 5, name, size=11, fill=color,
                         weight="bold", track=0.06))

    out.append(mech(CX, CY, 0.95))
    out.append(facing_arrow(CX, CY, R))
    out.append(label(CX, CY + 30, "torso facing", size=8, track=0.06))

    # Boundaries run along hex vertices, never through a hex, so no hexside is
    # ever split between two arcs. The diagonals stop short of the rear label.
    for bearing, far in ((90, 246), (150, 200), (210, 200), (270, 246)):
        out.append(ray(CX, CY, bearing, R * 0.9, far))

    def span(bearing, r, s, color):
        dx, dy = polar(bearing, r)
        return label(CX + dx, CY + dy, s, size=12, fill=color, weight="bold",
                     track=0.04)
    out.append(span(0, 176, "180°", FRONT))
    out.append(span(120, 186, "60°", RIGHT))
    out.append(span(180, 176, "60°", REAR))
    out.append(span(240, 186, "60°", LEFT))

    def name(x, y, anchor, title, subs, color, size=15):
        o = [label(x, y, title, size=size, fill=color, weight="bold",
                   anchor=anchor)]
        o += [label(x, y + 19 + i * 15, s, size=11, anchor=anchor)
              for i, s in enumerate(subs)]
        return o

    out += name(CX, CY - 234, "middle", "Forward arc", ["all weapons"], FRONT)
    out += name(CX + 172, CY + 44, "start", "Right side arc",
                ["right-arm", "weapons only"], RIGHT, size=13)
    out += name(CX - 172, CY + 44, "end", "Left side arc",
                ["left-arm", "weapons only"], LEFT, size=13)
    out += name(CX, CY + 212, "middle", "Rear arc", ["no weapons bear"], REAR)

    out += footnotes(W, H, CX, [
        "arcs are measured from torso facing, not leg facing",
        "each hex shown is one hexside — an arc runs out to any range"])
    out.append('</svg>')
    return "\n".join(out)


# --- 1.3.2 Attack Directions & Hit Zones ------------------------------------

def zones_svg():
    W, H = 620, 656
    CX, CY = 310, 292
    R = 47
    out = head(W, H, "Hit zones measured from the target frame's torso facing",
               "Attack Directions & Hit Zones")

    # Ring 1 is one hex per hexside. Ring 2 adds the twelve hexes two steps
    # out: six along a hexside, six on the 30-degree bearings between them.
    # Four of those bearings — 90, 150, 210, 270 — are exactly the zone
    # boundaries, which is where the target's-choice rule comes from.
    cells = [(neighbour(a, R), a) for a in range(0, 360, 60)]
    for a in range(0, 360, 30):
        cells.append((neighbour(a, R, 2) if a % 60 == 0 else polar(a, 3 * R), a))

    def zone_of(bearing):
        a = bearing % 360
        if a in (90, 150, 210, 270):
            return None                     # on a boundary — target's choice
        if a < 90 or a > 270:
            return FRONT
        if a < 150:
            return RIGHT
        if a < 210:
            return REAR
        return LEFT

    for (dx, dy), bearing in cells:
        z = zone_of(bearing)
        out.append(hexagon(CX + dx, CY + dy, R,
                           mix(z, PAPER, 0.22) if z else PAPER,
                           stroke=BORDER if z else DIM,
                           dash=None if z else "6 4"))
    out.append(hexagon(CX, CY, R, SURFACE))

    for bearing in (90, 150, 210, 270):
        dx, dy = polar(bearing, 3 * R)
        out.append(label(CX + dx, CY + dy - 12, "target's", size=10))
        out.append(label(CX + dx, CY + dy + 2, "choice", size=10))

    out.append(mech(CX, CY, 0.82))
    out.append(facing_arrow(CX, CY, R * 0.98))
    out.append(label(CX, CY + 24, "torso facing", size=8, track=0.06))

    for bearing, far in ((90, 280), (150, 236), (210, 236), (270, 280)):
        out.append(ray(CX, CY, bearing, R * 0.85, far))

    # Worked example: a hex two rings out on a 60-degree bearing is still a
    # Front attack, because the zone is the line's bearing and not the range.
    ax, ay = neighbour(60, R, 2)
    ux, uy = -ax / math.hypot(ax, ay), -ay / math.hypot(ax, ay)
    out.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s"'
               ' stroke-width="2.2" stroke-dasharray="7 5"'
               ' marker-end="url(#ah%s)"/>'
               % (CX + ax + ux * 22, CY + ay + uy * 22,
                  CX + ax + ux * 118, CY + ay + uy * 118, ACCENT, ACCENT[1:]))
    out.append(label(CX + ax, CY + ay - 26, "attacker", size=10, fill=ACCENT,
                     weight="bold"))

    def name(x, y, anchor, title, sub, color, size=15):
        return [label(x, y, title, size=size, fill=color, weight="bold",
                      anchor=anchor),
                label(x, y + 19, sub, size=11, anchor=anchor)]

    out += name(CX, CY - 254, "middle", "Front hit zone", "3 hexsides", FRONT)
    out += name(CX + 158, CY + 146, "start", "Right side zone", "1 hexside",
                RIGHT, size=13)
    out += name(CX - 158, CY + 146, "end", "Left side zone", "1 hexside",
                LEFT, size=13)
    out += name(CX, CY + 248, "middle", "Rear hit zone", "1 hexside", REAR)

    out += footnotes(W, H, CX, [
        "draw the line from the attacker's hex centre to the target's",
        "a line along a zone boundary — white hexes — is the target's choice"])
    out.append('</svg>')
    return "\n".join(out)


def main():
    if not DST.is_dir():
        raise SystemExit("run me from the repo root: images/ is not here")
    for stem, svg in (("arcs", arcs_svg()), ("zones", zones_svg())):
        path = DST / (stem + ".svg")
        path.write_text(svg + "\n")
        print("wrote %s" % path)


if __name__ == "__main__":
    main()
