# Proposed 21st amendment — the lineage-currency test (II.24)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document is an agent's drafting of a defect found while building a
cross-repo compliance guide for the whole EOReader lineage, not a
conversion of a prior item from another document.

## The defect

Article I names the domain-fixing facts this whole constitution routes
against — I.1 "The engine is `eoreader6`," I.2 legacy is `eoreader5` and
`eoreader4.2`, I.3 priors are `eoPriors`, I.4 the named thin-host
applications. Every one of these has moved since the article was written,
and nothing in Article I says so:

- **I.1.** `eoreader6` was succeeded by a published snapshot,
  `eoreader6.1`, which was itself succeeded by `eoreader7`'s native kernel.
  Both successor repos cite this constitution's articles routinely
  (`native/READING-SPEC.md`, `native/docs/`, `native/organs/hypergraph.js`),
  and `eoreader7/README.md` states its own ratchet in almost exactly this
  constitution's own voice ("a compatibility subsystem may be retired only
  once its native replacement passes conformance") — but Article I never
  names `eoreader7`, so a routing claim through Article II today has no
  live engine to name as its I.1 referent.
- **I.2.** The frozen-legacy set (`eoreader5`, `eoreader4.2`) has not grown
  to include the repos actually superseded since: `eoreader6` itself is
  legacy relative to `eoreader6.1`/`eoreader7` by every downstream repo's
  own practice, but Article I's letter does not say so.
- **I.3.** No `eoPriors` checkout exists in the workspace this amendment
  was drafted from; `live_priors` is the corpus every downstream repo
  (the-fold, eoreader7, eo-evidence) actually reads and cites by name.
  Whether `live_priors` **is** `eoPriors` under a later name, or a distinct
  corpus that has taken over `eoPriors`'s role, is a real question this
  proposal does not resolve — see "What this amendment does not decide,"
  below.
- **I.4.** The named applications (`eoreader-chat`, `eoreader-proxy`,
  `eoreaderapp`, `eoreader-mcp`) do not include `the-fold`, which is by a
  wide margin the most actively developed application consumer of this
  constitution's engine today, and cites Article I's own legacy rule (I.2)
  directly in its own `CLAUDE.md`.

None of this is a routing failure in the sense Article II tests for — no
mechanism was misplaced because of it. It is a **currency** failure: the
facts Article I asserts about which repos occupy which domain are stale,
and nothing catches that a domain-name in Article I has stopped pointing
at anything live.

## Why this needs its own test, not a hand-edit

`AMENDMENT-15-PROPOSAL.md` (the holonic level test) and others already
establish the house discipline: a proposal ships with a falsifiable check,
and IV.1 says an amendment that cannot be expressed as a changed failing
test is not an amendment — it is an exception. Article I's domain facts
have no check today, which is exactly why they went stale silently: three
successor repos went by without anything failing.

## Proposed article text

**II.24 The lineage-currency test.** *Does Article I still name a repo
that exists, and does the current holder of each domain say so itself?*
A domain fact in Article I is checked, not asserted: the named engine
repo must exist and must not itself claim, in its own top-level
documentation, to have been superseded without naming its successor here.
Two named consequences:

- **A successor names itself, and Article I is told.** When a repo
  succeeds the one Article I names for a domain, and states so in its own
  README or CLAUDE.md (as `eoreader6.1` and `eoreader7` already do), that
  is a standing invitation to amend I.1–I.4, not an amendment by itself —
  the constitution is not silently rewritten by a downstream repo's own
  claim about itself (IV.2, agents propose, humans dispose).
- **A stale domain fact is a lead, not a routing failure.** Per the
  address test's own vocabulary (II.12), a mechanism is not misrouted
  merely because Article I's prose is old; nothing here changes what II.1–
  II.23 decide. It is a housekeeping gap named so it does not compound —
  the same spirit as the empty-cell-is-a-lead rule this lineage's own
  downstream repos already apply to their own capability maps.

## Candidate enforcement test, sketched for a human reviewer to finish

`conformance/lineage-currency.test.mjs` (not written; sketched here per
IV.1's own requirement that an amendment ship with a changed failing
test):

1. Parse Article I's own text in `CONSTITUTION.md` for the domain values
   it currently names (I.1's engine, I.2's legacy set, I.3's priors name,
   I.4's application list) — a small, declared regex or heading walk, the
   same posture `dark-gate.test.mjs` already takes reading across the
   workspace via `UNION_ROOT`.
2. For each named engine/application repo, check it resolves to a real
   directory relative to a declared `UNION_ROOT` (mirroring
   `dark-gate.test.mjs`'s own convention exactly, rather than inventing a
   second one).
3. For the engine specifically, check whether that repo's own top-level
   README/CLAUDE.md contains a self-declared successor statement (a
   received, giver-named signal — I.3's own "a prior is a gift and must
   name its giver" pattern, applied to a repo's claim about itself) that
   names something OTHER than what I.1 currently names. If so, the test
   fails with a message naming the successor, which is what would have
   caught `eoreader6` → `eoreader6.1` → `eoreader7` at each step.

This is deliberately a **currency check**, not a content check: it never
asserts which repo *should* be canonical, only that Article I's prose and
the lineage's own self-descriptions have not drifted apart silently. That
is a human decision (VI.2/IV.2) this test surfaces and never makes.

## What this amendment does not decide

Whether `live_priors` is the successor to `eoPriors`'s name, a distinct
corpus that has taken over its role, or something a maintainer has not yet
reconciled, is left open — deliberately, since this proposal's own
discipline (the currency test above) is aimed at *engine* successor
claims a repo makes about itself, and no `live_priors` document currently
makes a claim of that shape about `eoPriors`. Updating I.3 is a separate,
substantive decision for whoever holds that context, not a mechanical
consequence of this test passing or failing.

This proposal also does not attempt to update Article I's text itself —
per IV.2, that is a human act following review, not something this
document performs on its own authority.
