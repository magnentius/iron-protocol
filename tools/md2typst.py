#!/usr/bin/env python3
"""One-shot converter: rules.md -> typst/rules.typ.

Kept in the repo as the record of how the conversion was done, not as a pipeline.
rules.typ is the source of truth from here on; this script is not re-run.

What it does not attempt: judgement. Design notes, epigraphs and worked examples
are detected by shape and may need review, and the section anchors it emits are
checked by the Typst compiler rather than by this script.
"""
import re
import sys
from pathlib import Path

SRC = Path("rules.md")
DST = Path("typst/rules.typ")

ESC_STAR = "\x03"


def emphasis(s: str) -> str:
    """Markdown emphasis -> Typst, via a state machine.

    A regex cannot do this: the book has 95 instances of bold wrapping italic,
    where the closing run is `***` and any non-greedy pattern splits it wrongly.
    """
    out, i, bold, ital = [], 0, False, False
    while i < len(s):
        if s[i] == "*":
            j = i
            while j < len(s) and s[j] == "*":
                j += 1
            run = j - i
            if run >= 3:
                if not bold and not ital:
                    out.append("*_"); bold = ital = True
                else:
                    out.append("_*"); bold = ital = False
            elif run == 2:
                out.append("*"); bold = not bold
            else:
                out.append("_"); ital = not ital
            i = j
        else:
            out.append(s[i]); i += 1
    return "".join(out)


def inline(s: str) -> str:
    """Markdown inline markup -> Typst."""
    saved = []

    def stash(code: str) -> str:
        saved.append(code)
        return f"\x00{len(saved) - 1}\x00"

    s = s.replace(r"\*", ESC_STAR)

    # Generated Typst code is stashed so the escaping pass below cannot mangle
    # the hashes and underscores it contains.
    s = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)",
               lambda m: stash(f'#figure(image("/{m.group(2)}", width: 82%), caption: [{m.group(1)}])'), s)
    s = re.sub(r"(?<!!)\[([^\]]+)\]\(([^)]+)\)",
               lambda m: stash(f'#link("{m.group(2)}")[{emphasis(m.group(1))}]'), s)

    # Escape what Typst reads as syntax but the rules mean literally.
    for ch in ("\\", "#", "@", "$", "<", ">", "_"):
        s = s.replace(ch, "\\" + ch)

    s = emphasis(s)
    s = s.replace(ESC_STAR, "\\*")
    return re.sub(r"\x00(\d+)\x00", lambda m: saved[int(m.group(1))], s)


def line_md(line: str) -> str:
    """One line of markdown body text -> Typst, list marker included.

    Needed inside blockquotes: a leading `* ` there is a bullet, and feeding it
    to the emphasis pass turns it into an unclosed italic.
    """
    m = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", line)
    if m:
        depth = len(m.group(1)) // 2
        bullet = "+" if m.group(2).endswith(".") else "-"
        return "  " * depth + bullet + " " + inline(m.group(3))
    return inline(line)


def split_row(line: str):
    """Split a table row on unescaped pipes only.

    The Chassis Limits Table writes `Init 8 \\| Move 5` inside a single cell; a
    naive split on "|" overflows the row and silently drops its last column,
    which is where the point costs live.
    """
    body = line.strip()
    body = re.sub(r"^\|", "", body)
    body = re.sub(r"(?<!\\)\|\s*$", "", body)
    cells = re.split(r"(?<!\\)\|", body)
    return [c.strip().replace("\\|", "|") for c in cells]


def convert_table(rows, aligns):
    cols = len(aligns)
    align_map = {"left": "left", "center": "center", "right": "right"}
    out = [f"#table(", f"  columns: {cols},",
           "  align: (" + ", ".join(align_map[a] for a in aligns) + ",)," ]
    for r in rows:
        cells = split_row(r)
        cells += [""] * (cols - len(cells))
        out.append("  " + ", ".join("[" + inline(c) + "]" for c in cells[:cols]) + ",")
    out.append(")")
    return out


def parse_aligns(sep_line: str):
    out = []
    for c in split_row(sep_line):
        left, right = c.startswith(":"), c.endswith(":")
        out.append("center" if left and right else "right" if right else "left")
    return out


COVER = """#cover(
  "Iron Protocol",
  "A Tactical Game of Iron Frame Combat",
  "/images/iron_protocol.jpg",
  tagline: [Fusing tactical resource management and locational damage with fluid
    turn-order dynamics and initiative-based action.],
)

#outline(title: [Contents], depth: 3, indent: auto)

"""


def main():
    lines = SRC.read_text().split("\n")
    out, i = [], 0
    n = len(lines)

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # --- tables -----------------------------------------------------------
        if stripped.startswith("|") and i + 1 < n and re.match(r"^\|[\s:|-]+\|$", lines[i + 1].strip()):
            header, aligns = lines[i], parse_aligns(lines[i + 1])
            body, j = [], i + 2
            while j < n and lines[j].strip().startswith("|"):
                body.append(lines[j]); j += 1
            out += convert_table([header] + body, aligns) + [""]
            i = j
            continue

        # --- headings ---------------------------------------------------------
        m = re.match(r"^(#{1,5}) (.+)$", line)
        if m:
            level, title = len(m.group(1)), m.group(2).strip()
            num = re.match(r"^([0-9]+(?:\.[0-9]+)*)\.? ", title)
            eq = "=" * max(1, level - 1)
            out.append(f"{eq} {inline(title)}")
            if num and ("." in num.group(1) or level == 2):
                out.append(f"#anchor(\"{num.group(1)}\")")
            out.append("")
            i += 1
            continue

        # --- blockquotes ------------------------------------------------------
        if stripped.startswith(">"):
            block, j = [], i
            while j < n and (lines[j].strip().startswith(">") or lines[j].strip() == ""):
                if lines[j].strip() == "":
                    if j + 1 < n and lines[j + 1].strip().startswith(">"):
                        block.append(""); j += 1; continue
                    break
                block.append(re.sub(r"^\s*>\s?", "", lines[j])); j += 1
            text = "\n".join(block).strip()
            if re.match(r"^\*?\*?Design Note", text):
                text = re.sub(r"^\*\*Design Note[^*]*\*\*\s*[—-]?\s*", "", text)
                out += ["#design-note[", "\n".join(line_md(l) for l in text.split("\n")), "]", ""]
            elif re.match(r"^_?\*?\"", text) or "—" in text.split("\n")[0] and len(text) < 400:
                q = text.rsplit("—", 1)
                if len(q) == 2:
                    out += ["#epigraph[" + inline(q[0].strip().strip('*_')) + "][" +
                            inline(q[1].strip().strip('*_')) + "]", ""]
                else:
                    out += ["#design-note[", "\n".join(line_md(l) for l in text.split("\n")), "]", ""]
            else:
                out += ["#design-note[", "\n".join(line_md(l) for l in text.split("\n")), "]", ""]
            i = j
            continue

        # --- horizontal rules -------------------------------------------------
        if stripped == "---":
            i += 1
            continue

        # --- lists ------------------------------------------------------------
        m = re.match(r"^(\s*)([-*]|\d+\.) (.*)$", line)
        if m:
            indent, marker, rest = m.group(1), m.group(2), m.group(3)
            depth = len(indent) // 2
            bullet = "+" if marker.endswith(".") else "-"
            out.append("  " * depth + bullet + " " + inline(rest))
            i += 1
            continue

        # --- plain text -------------------------------------------------------
        out.append(inline(line) if stripped else "")
        i += 1

    body = "\n".join(out)

    # Everything above the contents list is the markdown title block: an h1, a
    # subtitle, the cover art and a tagline. All of it becomes the cover page,
    # so cut from the top rather than leaving a stray first page and an outline
    # entry for the book's own title.
    e = body.index("= The Game in Brief")
    body = COVER + body[e:]

    # "Section 6.3" -> a link the compiler resolves. A stale one now fails the
    # build instead of quietly misdirecting a player, which is the whole reason
    # this document stopped being markdown.
    body = re.sub(r"Section (\d+(?:\.\d+)*)(?![\d.])", lambda m: f'#sec("{m.group(1)}")', body)

    body = re.sub(r"\n{3,}", "\n\n", body)

    header = '''// Iron Protocol — the rulebook.
//
// Converted from rules.md by tools/md2typst.py and edited by hand afterwards.
// This file is the source of truth; the markdown is gone.
//
// Build:
//   typst compile --root . --font-path typst/fonts --ignore-system-fonts \\
//     typst/rules.typ rules.pdf

#import "lib/rulebook.typ": *

#show: rulebook.with(theme: sys.inputs.at("theme", default: "print"))

'''
    DST.parent.mkdir(parents=True, exist_ok=True)
    DST.write_text(header + body + "\n")
    print(f"wrote {DST} — {len(body.splitlines())} lines")


if __name__ == "__main__":
    sys.exit(main())
