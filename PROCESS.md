# Process overview

## What I built

A five-page redesign of [tug.org](https://tug.org/), the real website of the
TeX Users Group (TUG) — a nonprofit that funds the free software, journal, and
conference behind the TeX/LaTeX typesetting world. Content is TUG's real
information, rewritten and restructured, not copied; the design argument is
that a group whose whole purpose is good typesetting should have a site that
is itself legible, which its own 1990s-style homepage currently isn't.

## The moments that mattered

1. **Picking the organisation, and checking it rather than trusting a
   summary.** The brief needed a real org I like with a site I don't. Rather
   than something safely templatable, I picked TUG because the redesign's
   argument becomes checkable and a little ironic: a typesetting nonprofit
   whose own homepage mixes news, a PayPal button, and its founding history in
   one undifferentiated column set with `<font color>` tags. My first attempt
   to look at tug.org came back a 403 from the web-fetch tool, and a web
   search's summary of "historically minimalist" design would have been easy
   to accept at face value; instead I `curl`'d the real pages directly
   (homepage, `whatis.html`, `board.html`, `join.html`, `contact.html`, and
   more) and built every factual claim in the site — the founding year, the
   Knuth/`Art of Computer Programming` history, the postal address, the three
   membership aims — from that raw HTML, not from the search summary or
   memory. That sourcing is listed page-by-page in
   [`colophon.html`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-yunlin/blob/main/colophon.html).
2. **Staying hand-written rather than switching to Astro.** This week's brief
   makes Astro the course default, but explicitly keeps hand-written HTML
   legitimate provided the `dist/` contract holds. With no vetted stack
   conversion available in this session and only five known, static pages —
   no templating win big enough to justify the base-path and CI-link-check
   traps the template's own `CLAUDE.md` warns a manual Astro swap into — I
   kept the starter's plain HTML/CSS/TS and its existing multi-page Vite
   config. I knew it held up because `pnpm check` passed clean and
   `linkinator ./dist` found zero broken links
   ([`d50a964`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-yunlin/commit/d50a964)).
3. **Turning "static, no backend" into an enforced test, not just a claim.**
   The starter ships a placeholder `main.ts` and script tag by default, but
   this site's content is entirely static prose — it needed no client-side
   code at all. Rather than leave an unused script in place because the
   template shipped it, I deleted `main.ts` and wrote
   [`spec/crit2.test.ts`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-yunlin/blob/main/spec/crit2.test.ts),
   which asserts every built page has zero `<form>` and zero `<script>`
   elements, plus that at least one page links back to the real tug.org. That
   makes "no backend" and "links to the real org" contracts the suite checks
   automatically instead of things I'd have to remember to eyeball
   ([`7e027e4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-yunlin/commit/7e027e4)).

## Verification

`pnpm check` is green (typecheck, build, oxlint, stylelint, 52 vitest tests).
`pnpm dlx linkinator ./dist --silent` found no broken links. Checked the built
site with `agent-browser` at both 1920×1080 and 390×844 on every page, with no
console errors at either size.
