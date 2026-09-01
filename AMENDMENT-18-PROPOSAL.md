# Proposed 18th amendment — the composition test (III.4)

**Status: APPLIED — entered as the 18th amendment (III.4).** Filed and
applied in one pass, 2026-09-01, at direct user instruction after a real
cross-repo failure was found and traced to its root, matching the 17th
amendment's own precedent (proposal and application land together when the
defect and its fix are both already measured).

The article is entered in `CONSTITUTION.md` (III.4, amendment-log 18th);
the enforcement is `conformance/composition.test.mjs`; the exemplar defect
is `live_priors/scripts/eot-digest.mjs`, now patched and passing; the
found-and-disclosed engine bug is `claims/blank-furniture-sentence-drift.claim.json`.

---

## The failure this closes

A survey of live_priors' corpus-reading pipeline (2,208 stored readings,
33,679 extracted arrangements) found `scripts/eot-digest.mjs::loadOrgans`
calling the-fold's `hypergraph.js::makeRelationReader` with **eleven of the
twenty-five organs that function accepts**, silently. Every occurrence-level
organ was omitted: `resolvePronouns` (eoreader7's kernel activation —
one-hop recall through the co-presence veto), `verbForms`,
`createLemmatizer`, `blankFurniture`, and six others. Nothing anywhere
recorded that they had been left out. Every one of the 2,208 readings
therefore ran purely type-level — surfaces by capitalisation, referents by
recurrence, relations by slot position — with no reader ever placing a
candidate against a decaying present.

**No existing article was violated.** eoreader7 offered the organ.
the-fold's consumer accepted it. live_priors, the composition, simply never
passed it. Each member was independently compliant under Article I and
Article II as they stood, and the composition degraded silently across the
whole corpus regardless. This is the shape Article III already exists to
name (III.1: model-tier knowledge is injected, not imported; III.3: a
missing prior is a typed gap, never a silently wrong number) — but III.3,
checked here for the first time, has **never had an enforcement test**.
Under this document's own rule (IV.3: "unwired is failing — a module
nothing depends on is not early, it is refuted"), III.3 has been a refused
article since it was written, not a dormant one.

## What III.4 adds, and what it deliberately does not

**It does not mandate injecting any organ.** The Union — the seam between
independently-governed repositories — has no standing to tell a member what
its recipe should contain; that stays each member's own act, matching
IV.2's own rule that amendment (and by extension, configuration) is a human
act, never something the assay imposes.

**It mandates that the silence end.** A composition must, for every organ
its consumer accepts, either pass it or name it in a declared omissions
list carrying a real reason — never a bare name, never nothing. An omission
with a reason is fully compliant. An omission with no record is the
infringement.

**It is enforced by derivation, not by a maintained list**, for the same
reason the-fold's own `page-graph.mjs` derives its module scan rather than
hand-listing it (a hardcoded list there had gone stale by thirteen
modules): `acceptedOrgans` reads a consumer's own destructuring;
`passedOrgans` reads a composition's own call site; `declaredOmissions`
reads the composition's own `UNION_OMITTED` object. Adding an organ to a
reader widens the audit with no edit to the test itself.

## What was found while closing it, kept honest rather than smoothed over

Wiring `resolvePronouns` for real surfaced a second, independent, real bug
in `blankFurniture` (`the-fold/source.js::blankLabelRows`) — filed
separately as its own claim, not folded into this one, because it is a
finding about an engine organ's own correctness, not about the composition
seam this amendment governs. `verbForms` was measured (319→737 edges
across a ten-file sample) and deliberately left declared-omitted rather
than silently bundled in with the activation wiring: it widens what the
reader hears, a different kind of decision from closing an undeclared gap,
and it gets its own pass. `resolvePronouns` itself, once wired, moved edge
counts by roughly zero at the same window — its measured value is the
`regime` block it produces (how often co-presence vetoes a candidate
binding), not raw yield, and nothing before this pass captured that block
anywhere.

## Enforcement

```js
// conformance/composition.test.mjs
// derives accepted/passed/declared for every registered SEAM and fails on
// any organ that is neither passed nor named with a reason.
```

Currently one seam registered (`live_priors` → `hypergraph.js`); `SEAMS` in
that file is the place to add the next one as more compositions are
audited (the-fold's own live app import of `makeRelationReader` is the
obvious next row — not audited by this pass, named as follow-up).
