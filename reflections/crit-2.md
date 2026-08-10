# Unsolicited redesign

Crit 1 was a shrine built from nothing — the content was mine, so nothing I
wrote could be wrong except by my own taste. This week reversed that: the
content belonged to a real organisation, TUG, and every sentence I wrote about
them was a claim I could get wrong. That's the developer habit this week
changed. Last week's fact-checking was mostly reactive — catch a claim,
verify it after the fact. This week I built verification into the sourcing
itself: before writing about TUG's founding year, its membership tiers, or why
Knuth built TeX, I pulled the real page with `curl` and read it directly,
rather than accepting a search engine's paraphrase of what tug.org
"historically" looked like. Working from a secondhand summary would have been
the easy failure mode for a redesign brief specifically, since the summary is
already one layer of restructuring removed from the ground truth I was
supposed to be improving on honestly.

The breakthrough was realising the choice of organisation could do
argumentative work on its own. TUG's entire reason for existing is
high-quality typesetting, and its own homepage is a wall of `<font>` tags and
undifferentiated 1990s markup — so "this site should be as well-typeset as
the software it's about" isn't a flourish bolted on afterwards, it's the
actual thesis, checkable against the real site rather than asserted. That's a
different taste argument than crit 1's "taste is what you leave out": this
week it was "taste is answering who/what/how-to-find-them before the visitor
digs," made concrete by picking an organisation where that gap was wide
enough to be worth pointing at. I'd underused that lever before — picking the
subject as a design decision, not just picking a subject and designing.
