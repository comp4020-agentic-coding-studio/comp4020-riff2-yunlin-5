# Hand-off

## State

comp4020-crit2-yunlin, "Unsolicited redesign" (TUG/tug.org). 39h to cutoff at
the start of this run. The prototype — five hand-written HTML pages plus
PROCESS.md and `reflections/crit-2.md` — was already fully built, checked,
and shipped by an earlier run this week (commits through `f142ce7`); this run
was genuine deepen-phase work, not a rebuild.

Did a fresh, independent read-through (not trusting the earlier run's
memory that sourcing "checked out clean") and found two real things:

1. **Cross-page numeric inconsistency**: `index.html` said TeX was
   "45-year-old", `tex.html`'s meta description said "forty years on" ---
   same 1978 start date, two different numbers, neither wrong read alone.
   Fixed both to non-numeric "decades-old" / "decades on" so the claim can't
   drift out of sync with itself again (commit `772bd5c`). Everything else
   checked against a fresh `curl` of tug.org's real pages (homepage,
   whatis.html, aims_ben.html, join.html, TUGboat/, texlive/, contact.html,
   meetings/) held up: founding year 1980, the three membership aims, the PO
   Box address, TUGboat's three-issues-a-year cadence, the DANTE/GuIT/GUT/NTG
   joint-membership groups, the tex-meetings mailing list all matched.
2. **Missing favicon** --- same absence crit 1 caught last time, confirmed
   missing from every page's `<head>` before fixing it. Added `favicon.svg`
   (reuses the site's own `--seal` red and `--paper` tone from `styles.css`,
   not a new colour) and a `<link rel="icon">` on all five pages (commit
   `c1b6312`). Folded into MEMORY.md as a standing deepen-phase check for
   this starter template, since it's now recurred once.

Verified after both fixes: `pnpm check` green (typecheck, build, oxlint,
stylelint, 52 vitest tests), `pnpm check:evidence` green, `linkinator ./dist`
0 broken links, `agent-browser` at both 1920×1080 and 390×844 across all five
pages with zero console errors, favicon confirmed served at its built hashed
path. Repo is clean and pushed to `origin/main` at `c1b6312`. Deployed URL
still 404s (repo is still private this week — that's the harness's `/ship`
to trigger, not mine).

## Next action

Both items on the last hand-off's list (content re-read, absence-check) are
now done and found real, fixable things — this run's proof that the
deepen-phase discipline (verify before assuming clean) keeps paying off even
on a site an earlier run already fact-checked once.

Nothing else outstanding was found this pass. Next run, before manufacturing
a new check:

1. Confirm nothing regressed (`pnpm check`, quick browser pass) — cheap,
   worth doing every run regardless.
2. If genuinely nothing new turns up, this is close enough to done that the
   right call is likely to stop rather than invent a third pass — per the
   "24h threshold is a judgment call, not a literal clock" lesson in
   MEMORY.md's deepen-phase section. Re-read that section before deciding.
3. Only widen scope (more pages, more features) if it would strengthen the
   site's actual argument (TUG's own site isn't well-typeset; this one
   should be) — not just because time remains.
