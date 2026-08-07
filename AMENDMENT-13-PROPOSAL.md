# Proposed 13th amendment — the surf-before-fold test (II.18)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document is an agent's drafting of a defect caught twice, live, in a single
working session on `eochat`'s agentic-coding eval (`eval/agent/`,
2026-08-07) — not a conversion of a prior item from another document, same
footing as Amendment 12.

---

## The defect

Two instances, in one session, on the same piece of work, in opposite
directions:

**First — a step-by-step agent loop's own conversation history grew
without bound.** `eval/agent/react-loop.mjs` sends the full accumulated
`messages` array back to the model on every step of a read-execute-observe
loop. Nothing folded it. The very design this eval is built around states
its own thesis in `eval/README.md`: *"a CPU-bound 7B model has small,
slow, precious context, and 'surf broadly, then fold to what fits the
budget, and REPORT what got withheld' is a real, already-proven discipline
in this codebase... reused here rather than re-invented as raw file
dumping."* The loop that discipline is named for did not apply it to
itself. Caught only because the real Ollama server this eval runs against
happens to be started with a 4096-token context window and
`--context-shift` enabled — silently dropping the oldest tokens once the
conversation overflows it — which meant an unbounded loop was not a
theoretical risk but a live path to the model silently losing its own
system prompt and task description mid-attempt.

**First fix attempted, and itself a second instance of the same shape.**
The first repair kept only the most recent *N* messages —
`messages.slice(-maxKept)`. This reports what it withholds and is bounded,
so it looks like a fold. It is not: nothing about it searches for what is
*relevant*, only for what is *recent*. `eval/agent/holon-coder.mjs`'s
`foldHandoff` — written earlier in the same session, part of the same
"never prompt the model with more than it needs" design this amendment is
named for — has the identical shape in the opposite direction:
`s.slice(0, MAX_HANDOFF_CHARS)`, a hard prefix cutoff with no scoring step
at all. One truncates from the end and keeps what is newest; the other
truncates from the start and keeps what is oldest. Neither asks whether
the discarded material bears on what the reader actually needs next.

Both instances share one shape: a mechanism was bounded, and reported that
it was bounded, and still was not a fold — because folding without first
surfing (searching, scoring) is truncation wearing a fold's vocabulary.
The pattern recurring within a single session, across two different files,
in mirror-imaged directions, is the same stronger-signal shape Amendment
12 already named: not a single slip, but a standing failure mode of how
"bounded" gets implemented under time pressure — reach for `.slice()`,
report the count, call it done.

## Why no existing article catches this

- **II.14 (fold fidelity)** is the closest article and answers an adjacent
  but different question. Its `drilldown_uses_keyword_trigger` veto refuses
  a drill-down *trigger* — the decision to expand into more detail — that
  uses a keyword match instead of the fold's own significance signal. This
  defect is upstream of that: it is about what enters the bounded set *in
  the first place*, not about when to drill into it further. A mechanism
  can have no drill-down trigger at all (react-loop.mjs's fold has none)
  and still commit this defect in its initial selection.
- **II.9 (revision)**'s "a cheap sense organ is legal and useful; a cheap
  sense organ promoted to the verdict is refused" is close in spirit —
  recency is exactly a cheap sense organ — but II.9 governs *significance
  scoring for the engine's own measurement*, not a working-context budget
  handed to a call to a model. Different consumer, same underlying error
  of letting a cheap, single-axis proxy stand in for a computed signal.
- **II.8 (difference)**'s "no injected order... position is earned or
  received, never given" names position as suspect for a different reason
  (an inductive bias smuggled into a measurement), not for context
  selection into a bounded budget.
- **II.17 (draft, signal-preservation)** is the nearest sibling: both are
  about a simplification reached for under convenience quietly discarding
  an axis the phenomenon depends on. II.17 is about *reuse* — a
  mechanism's declared narrowness at its own site failing to transfer to a
  new consuming site. This defect has no reuse step: `messages.slice()`
  was written fresh, for this exact purpose, and was still wrong, because
  bounding was implemented as a position operation instead of a relevance
  operation from the start. II.17 would not have caught it — there was no
  borrowed mechanism to re-open the accounting on.
- **Nothing existing** asks the question this article asks directly: when
  a mechanism selects a bounded subset of accumulated material for a
  consumer with a hard budget (a model's context window, a working set, a
  queue), does the selection step compute relevance to what the consumer
  needs right now, or does it default to a free, order-derived axis —
  recency, position, insertion order — because that axis was already
  sitting there for free.

## Proposed article

> **II.18 The surf-before-fold test.** *Does this mechanism select what a
> bounded consumer sees by searching for what is relevant to it right now,
> or by where an item happens to sit in a sequence?*
>
> A fold is a bounded selection preceded by a relevance computation over
> the full set — search, then bound, per this codebase's own "surf and
> fold" discipline (`ingest.mjs`'s `surf()`: search → score → fold to
> budget, reporting what got withheld). A mechanism that bounds an
> accumulating set by keeping the newest *N*, the first *N*, or any other
> pure function of position or arrival order — and reports the withheld
> count — satisfies the *reporting* half of that discipline and fails the
> *searching* half silently, because the failure looks identical to a real
> fold from the outside: a budget, respected, with an honest count of what
> did not fit. It is not honest about *which* material did not fit. Two
> named consequences:
>
> - **Recency is a free axis, not a computed one, and free axes are the
>   ones this lineage does not trust by default.** An item's position in
>   an accumulating sequence costs nothing to read off and says nothing
>   about whether the reader needs it — the same objection II.8 raises
>   against injected order as a measurement and II.9 raises against
>   arrival-based significance, applied here to a working-context budget
>   instead of an engine measurement. A recency-only bound is legal only
>   where recency IS the relevance signal by the phenomenon's own nature
>   (the single most recent observation a step-loop must react to, for
>   instance) — never as the default budget policy for everything older.
> - **A fold that never scores anything is not a smaller fold, it is a
>   different operation wearing a fold's report format.** The withheld-
>   count report this codebase already disciplines itself to produce
>   (`foldToWorkingSet`, `engineGroundQuery`'s `dropped`, `MAX_HANDOFF_CHARS`)
>   is necessary but not sufficient — a mechanism can honestly report
>   "12 items withheld" while having chosen the 12 *worst* ones to keep,
>   and the report gives no way to tell the difference from the outside.

## Proposed enforcement

Closer to II.14's shape than II.15's or II.17's — this is mechanically
checkable, not a claim about how a decision was made:

`fold_selects_by_position_not_signal: boolean` — required on every claim
whose mechanism bounds an accumulating set before handing it to a
consumer (a model prompt, a working set, a queue). `true` means the
selection function is a pure function of index, insertion order, or
recency, with no term that varies with the CONTENT of what is being
kept-or-dropped. `true` on such a claim is refused, in every tier — this
is not an engine-only concern; an application-layer prompt-assembly
mechanism with this defect is exactly as dishonest about what it fed the
model as an engine-layer one would be about what it fed a downstream
organ. The narrow exemption: a claim may declare and name the specific
axis where recency genuinely IS the needed signal (the freshest
observation in a step loop, the most recent turn in a conversation the
task itself is about recency of) — declared, not defaulted, same
discipline `II.15`'s own open question about disclosure-vs-measurement
already asks.

## Proposed amendment-log entry (IV.6)

> - **13th — The surf-before-fold test (II.18).** A mechanism that bounds
>   an accumulating set for a consumer with a hard budget must select what
>   to keep by computing relevance to what the consumer needs right now,
>   not by recency, insertion order, or any other axis that costs nothing
>   to read off. Reporting a withheld count is necessary but not
>   sufficient — a fold that never scores anything can honestly report a
>   count while having kept the worst items, indistinguishable from a real
>   fold by its report format alone. Enforced as
>   `fold_selects_by_position_not_signal`, required on every claim whose
>   mechanism bounds an accumulating set; `true` is refused in every tier.

## What it would have caught

`eval/agent/react-loop.mjs`'s first fix (`messages.slice(-maxKept)`) and
`eval/agent/holon-coder.mjs`'s `foldHandoff` (`s.slice(0, MAX_HANDOFF_CHARS)`)
would both have needed to name, before shipping, that their selection
function was a pure position operation with no relevance term — which
is exactly the fact that was true, visible in the code, and not stated
anywhere near either function. Naming it would not by itself have produced
the fix; but a claim carrying `fold_selects_by_position_not_signal: true`
being refused in every tier would have forced the search-then-bound
redesign at write time rather than leaving both to ship as fully bounded,
fully reported, and still not a fold — until read closely enough to notice
neither one asked what was actually relevant before deciding what to keep.

## Open question, recorded rather than settled

II.18 as proposed treats "the selection function has a content-dependent
term" as sufficient — it does not ask whether that term is any *good*, only
whether one exists. A cheap, low-quality relevance signal (a shallow
lexical-overlap count, say) would pass this test while still surfacing the
wrong material in some cases. Is existence-of-a-signal the right bar for a
constitutional veto, with signal *quality* left to conformance fixtures and
ordinary engineering judgment (the shape II.9's "a cheap sense organ is
legal and useful" already accepts for significance nomination) — or does a
mechanism this close to what the reader actually experiences deserve a
measured-quality bar, the same open question Amendment 12 already recorded
for its own article and did not close?
