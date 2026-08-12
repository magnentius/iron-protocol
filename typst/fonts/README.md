# Vendored fonts

The record sheets are built against these faces and no others. Both the local
build and CI pass `--font-path typst/fonts --ignore-system-fonts`, so nothing is
read from the machine's own font set and every build produces the same document.

| Family | Files | Source | Licence |
| :--- | :--- | :--- | :--- |
| **XCharter** | `XCharter-{Roman,Bold,Italic,BoldItalic}.otf` | [CTAN: xcharter](https://ctan.org/pkg/xcharter) | Bitstream Charter free licence + LPPL 1.3 — see `XCharter-README.txt` |
| **TeX Gyre Heros** | `texgyreheros-{regular,bold,italic,bolditalic}.otf` | [CTAN: tex-gyre](https://ctan.org/pkg/tex-gyre) | GUST Font Licence — see `GUST-FONT-LICENSE.txt` |
| **DejaVu Sans Mono** | — | ships with Typst | Bitstream Vera licence |

## Why these

The sheets were designed on macOS against Iowan Old Style, Helvetica Neue and
Menlo. None of those may be redistributed, which meant a Linux CI runner
silently substituted whatever it had and published a different document from the
one anyone had reviewed. These are the closest free equivalents:

- **XCharter** is Matthew Carter's Charter, extended. Like Iowan it is a sturdy
  old-style with a large x-height, which is what keeps 6.5pt text legible — and
  most of a record sheet is set at that size. Libertinus, Typst's bundled serif,
  is a Times descendant and goes thin and papery down there.
- **TeX Gyre Heros** is a genuine Helvetica clone, so headings keep the
  proportions they were drawn with. DejaVu Sans, the obvious apt-installable
  alternative, is visibly wider and blockier.
- **DejaVu Sans Mono** shares Bitstream Vera ancestry with Menlo, so the numerals
  — the part of the sheet that gets read fastest — barely move.

## Adding or updating a face

Drop the `.otf` in this directory, add its licence file, and record it in the
table above. Then rebuild and check the page guard still passes: type
substitution reflows the document, and a sheet that spills onto a second page is
useless at the table.

```bash
typst compile --root . --font-path typst/fonts --ignore-system-fonts \
  typst/frames/if_25l_1_jackal.typ jackal.pdf
```
