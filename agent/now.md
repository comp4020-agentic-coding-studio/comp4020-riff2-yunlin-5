# Hand-off

## State

comp4020-crit2-yunlin, crit 2 ("Unsolicited redesign"). 45h to cutoff at the
start of this run, which built the whole prototype from the fresh starter
repo (one commit, boilerplate only) in a single pass.

Picked a real target early and deliberately: the TeX Users Group (tug.org),
a real nonprofit whose mission (high-quality typesetting) makes the
redesign's thesis checkable and a little ironic --- their own site is 1990s
inline-styled HTML with no hierarchy. Verified every fact used (founding
year, Knuth's `Art of Computer Programming` history, postal address,
membership aims, journal/distribution/conference details) by `curl`-ing
tug.org's real pages directly, not from a search summary (`WebFetch` 403'd
on tug.org; `curl` worked fine).

Built five hand-written HTML pages (index, tex, join, publications,
colophon) --- stayed on the starter's plain HTML/CSS/TS rather than
switching to the new course-default Astro, since no vetted stack-conversion
skill was available in this session and five static pages don't need
componentisation; this is an explicitly legitimate spec choice. Removed the
starter's placeholder `main.ts`/script tag entirely --- the site needs zero
client-side JS. Carried the crit-1 aesthetic voice forward but not its
content: system serif, paper tone, classic blue links, one accent colour
(a "seal-red", used for exactly two things: kicker text and the current-nav
underline), argued in `colophon.html` as an ink-wash seal-stamp logic rather
than reused Ni Zan material.

Wrote `spec/crit2.test.ts` (retired the starter's `starter.test.ts`,
which described a page that no longer exists) asserting the mechanically
checkable spec lines: a link out to the real org, no `<form>`/`<script>`
anywhere in `dist/` (static, no backend), and the home nav reaching every
page.

Verified before shipping:
- `pnpm check` green: typecheck, build, oxlint, stylelint, 52 vitest tests.
- `pnpm dlx linkinator ./dist --silent` --- 0 broken links.
- `agent-browser` at both 1920×1080 and 390×844, all five pages, zero
  console errors at either size (needed `--args "--no-sandbox"` on first
  open, then `set viewport`, then reopen --- same sequence as crit 1).
- `pnpm check:evidence` green (PROCESS.md's two cited commits resolve,
  `reflections/crit-2.md` matches the current deliverable).

Wrote `PROCESS.md` (replacing the template) citing the two build commits,
`reflections/crit-2.md` (293 words, in range), and added a CLAUDE.md note on
stylelint's `no-descending-specificity` ordering gotcha (see MEMORY.md for
the durable version). Repo is clean and pushed to `origin/main` at
`c1e68eb`. Still private (crit window doesn't close for ~45h from the run
start) --- `/ship` and the CI jobs are the harness's to trigger later, not
mine to force.

## Next action

Nothing left to build for a first pass; this is early in the week (build
phase, not deepen or finish yet), so a run landing well before cutoff should
actually look for real gaps rather than reassurance-pass or declare done:

1. Re-read all five pages fresh against tug.org's real pages one more time
   for a factual slip --- this run did the sourcing carefully but a second,
   independent pass (per the content-practices habit) hasn't happened yet.
   Check especially: TUGboat issue cadence, the exact membership aims
   wording, and the contact address, against `curl`'d tug.org pages, not
   memory of this run.
2. Consider whether five pages is the right ceiling, the same "check what
   the site is arguing" test crit 1 used before adding scope --- this site's
   argument is "one clear question per page," so a sixth page needs its own
   clear question, not just more content for its own sake.
3. A close reading of `colophon.html`'s self-referential design claims
   specifically (the "seal-red used for exactly two things" claim, the list
   of source pages) against the actual CSS/markup, the same self-description
   scrutiny crit 1's memory flags as its own checkable-claim category.
4. Once those are exhausted with nothing found, don't manufacture further
   passes --- say so plainly in this file and, if there's still time left,
   move to the deepen-phase absence-check (does the site actually deliver
   everything it claims about itself, e.g. no dead links, no missing
   favicon) rather than repeating a pass that already came back clean.
