# Proposed 6th amendment — the omnimodal earning test (II.11)

**Status: APPLIED 2026-07-31.** IV.2 — the assay proposes and checks, it never
amends; amendment is a human act. This proposal was approved by the human
disposing and landed as a single change: `CONSTITUTION.md` gained Article II.11
and the 6th amendment-log entry; `assay/classify.js` gained the
`asserted_agnosticism` boolean and its engine veto; every claim in `claims/`
gained the boolean; `segments-structural-boundaries` was re-routed from engine
to priors; the exemplar `typography-grammar-asserted-agnostic` was recorded as
a refuted placement; and `conformance/assay.test.js` gained the changed failing
test (II.11) the amendment required (IV.1).

---

## The defect

`medium_agnostic` is asserted, never measured. In `assay/classify.js` it is
type-checked (line 39-47, `EVIDENCE_BOOLEANS`) and then **never read again** —
the routing is decided entirely by `is_host_knowledge`, `is_material_knowledge`,
`needs_name_or_surface`, and the engine vetoes. A mechanism that requires the
surfaces of exactly one medium therefore routes to engine on the default branch,
so long as it sets `needs_name_or_surface: false` — which it does, because its
operators name no *name*, they require typography.

II.4 states the rule the assay does not enforce: *what survives every text and
every host is engine; what could have been otherwise in a different text is
priors.* The fixed form grammar of `perceiver/text/segments.js` could have been
otherwise — another book marks its divisions differently, as `learned-typography`
already records (LUKU headings, a line-initial capital run). The engine's own
emergent organ (`loops/turn.js::runTurn`) is *measuredly* omnimodal —
`goldens/multimodal/score.mjs` clears engineered boundaries in real audio, image,
and video. The form grammar is *assertedly* omnimodal, and its own warrant —
"works on numbered movements in a score" — is a claim about a score's *printed
movement titles*, which is text typography again.

This is not the absence of an invariant. It is an invariant that **exists, is
cited, and is a self-reported boolean instead of a test** — the routing equivalent
of the null that looks sound and answers a different question.

## The condition for amending: is it recurring?

Yes — it is the whole shape of the perceiver gap, measured in six places this
session:

| # | Where | The mismatch | Measured cost |
|---|---|---|---|
| 1 | `claims/segments-structural-boundaries` | asserts `medium_agnostic: true`; operators require text's lines, blank lines, WORD+digit/all-caps/roman numerals, a substance test | routes to engine on the default branch; no article ever consults the assertion |
| 2 | `claims/learned-typography` | routes the identical phenomenon — the recurring line-forms by which THIS document marks its divisions — to priors, giver "the communicator" | both claims PASS; the assay cannot see one mechanism described from opposite sides |
| 3 | `perceiver/audio` reduction | first-order RMS per frame, no spectrum | 440 Hz ≡ 880 Hz (reduction differs by 4.7e-7); a transposed leitmotif is invisible |
| 4 | `perceiver/image` reduction | first-order mean luminance per scanline | row-internal scramble ≡ exact; all horizontal arrangement is gone |
| 5 | `perceiver/video` reduction | first-order mean abs frame-difference | cut ≡ fade (both `[20]`); light-on ≡ light-off; spatial permutation ≡ exact |
| 6 | `host/corpus.js:222` + `eoreader-chat/engine-ground.js:1125` | the app documents `sessionOutline` as "the novelty curve (KL against a sliding prior — where the word distribution actually turns, not a heading regex)"; the engine delivers the heading regex, `zThreshold` destructured and unused | the seam silently disagrees with itself about what structure is |

The load-bearing contrast is between rows 3-5 and the engine's own emergent
organ. `goldens/multimodal/score.mjs` (fresh run, this session): audio
found frames 103-104 vs true 100, image rows 34-35 vs 32, video transitions
23-24 vs 19 — the same `runTurn` that measures text chapters. The emergent
organ is *earned* omnimodal by test; the form grammar is *declared* omnimodal
by a boolean. An article that asks only "do you assert agnosticism" cannot tell
them apart.

## Why no existing article catches this

- **II.1 (omnimodal veto)** asks *would a leitmotif in a symphony have this
  problem?* — but it is enforced via `needs_name_or_surface`, and the segments
  mechanism names no name. Typography is not a name string. Passes.
- **II.4 (invariance)** states the rule — *what survives every text and every
  host is engine* — and is never consulted by `classify()`. Passes.
- **II.2 (giver)** routes material knowledge to priors only when the claim
  sets `is_material_knowledge: true`. The segments claim sets it false, because
  its mechanism does not *know* a speaker or a referent — it knows a page layout.
  The typography that carries the division is received knowledge, but nothing
  forces the claim to say so.

The gap is one level down from the routing: not *whether a mechanism mentions a
medium*, but *whether the mechanism's medium-specificity is tested or trusted*.

## Proposed article

> **II.11 The omnimodal earning test.** *Is medium-agnosticism measured, or
> declared?* The engine is what survives every text and every host (II.4), and
> that survival is earned by a test, never by an evidence boolean. A mechanism
> whose operators, gates, or vocabulary require the surfaces of one medium —
> text's lines and blank lines, a score's staves, a frame's scanlines — is not
> engine by assertion. If its medium-specificity is a property of the material
> (this document marks its divisions this way), it is received typography and
> sits in priors with its giver (II.2); if it is a fixed grammar with no giver,
> it is a surface and no tier exists (II.1/II.5). Two named consequences:
>
> - **Assertion is not measurement.** An engine claim that declares
>   `medium_agnostic: true` without an invariance fixture that runs the
>   mechanism across modalities is a type error: it asserts what only a test
>   can establish. The fixture is the `goldens/multimodal` discipline — a
>   synthesized material with a known boundary and an independently-verified
>   reference, in at least one modality other than the mechanism's home.
> - **The contrast is the finding.** Where the emergent organ clears a
>   cross-modal boundary and the form grammar cannot, the failure is the
>   placement ruling — the same logic that routed `learned-typography` to
>   priors: *the division is received from the communicator; the typography
>   that marks it is derived, and neither is assumed.*

## Proposed enforcement

Following the existing convention that the predicate names the *defect* and
`true` refutes an engine placement:

```js
// assay/classify.js — EVIDENCE_BOOLEANS
"asserted_agnosticism",
```

```js
// assay/classify.js — inside `if (placement === "engine")`,
// after the scores_arrival_alone branch
if (evidence.asserted_agnosticism) {
  return {
    verdict: VERDICTS.REFUTE,
    placement,
    reasons: [
      "II.11 — the omnimodal earning test: this mechanism declares medium-agnosticism without an invariance fixture that runs it across modalities. Assertion is not measurement. If the mechanism's specificity is a property of the material, it is received typography and sits in priors with its giver (II.2); if it is a fixed grammar with no giver, no tier exists (II.1/II.5)",
    ],
  };
}
```

Per IV.1 this must land as a **changed failing test** in the same change. The
exemplar claim to add — the shape of the live defect, which currently passes:

```json
{
  "claim_id": "typography-grammar-asserted-agnostic",
  "what": "a fixed heading grammar that requires text's lines, blank lines, and numeral forms, declaring medium_agnostic: true with no cross-modal invariance fixture",
  "proposed_placement": "engine",
  "expect": "refute",
  "evidence": {
    "needs_name_or_surface": false,
    "is_material_knowledge": false,
    "giver": "",
    "is_host_knowledge": false,
    "medium_agnostic": true,
    "asserted_agnosticism": true,
    "is_one_off_fix": false,
    "weights_present": false,
    "scores_arrival_alone": false,
    "consumes_source": "direct",
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

Because the boolean is required, all 25 existing claims in `claims/` need
`"asserted_agnosticism": false` added (the engine claims that genuinely earn
agnosticism — `operator-vector-revision`, `span-provenance`, the Born-gate
organs — keep `false` and carry their conformance test as the fixture), or
`classify` returns GAP on each (II.5).

## Proposed disposition of the live claims

`segments-structural-boundaries` is the one claim that must not merely add the
boolean. Its mechanism is exactly the "recurring line-forms by which THIS
document marks its own divisions" that `learned-typography` already routes to
priors with a named giver. Two honest dispositions:

1. **Re-route to priors** — `is_material_knowledge: true`, `giver: "the
   communicator"`, mirroring `learned-typography`. The division itself is the
   emergent organ's measured business (engine, `runTurn`); the typography that
   marks it is received (priors). This matches the constitution's own split and
   deletes the contradiction. Recommended.
2. **Earn it in the engine** — build the cross-modal invariance fixture and
   make the grammar actually run on a non-text medium. For a mechanism whose
   operators are lines, blank lines, and numerals, this means re-deriving the
   organ as something that does not need typography — which is what `runTurn`
   already is.

Either way the `zThreshold` seam at `host/corpus.js:222` and the divergent
comment at `eoreader-chat/engine-ground.js:1125` must be reconciled in the same
change: the app and the engine may not disagree about what structure is.

## Proposed amendment-log entry (IV.6)

> - **6th — The omnimodal earning test (II.11).** The engine is what survives
>   every text and every host, and that survival is earned by an invariance
>   fixture, never by an evidence boolean. A mechanism that needs one medium's
>   surfaces is either received typography (priors, with its giver) or a
>   surface with no tier; it is never engine by assertion. The contrast is the
>   finding — where the emergent organ clears a cross-modal boundary and the
>   form grammar cannot, the failure is the placement ruling. II.4 says what
>   survives; this says survival is tested, not declared. Enforced as
>   `asserted_agnosticism`, required on every claim; `true` on an engine
>   placement is refuted.

## What it would have caught

Rows 1 and 6 of the defect table above are `asserted_agnosticism: true` today,
and row 1 shipped as a sustained engine placement — while `learned-typography`
routes the same phenomenon to priors. The contradiction was invisible because
the boolean was decorative. Row 6 shipped a comment and an implementation that
disagree about the same outline, and nothing in either repo's gate could see it.

## Open question, recorded rather than settled

Whether II.11 is a separate article or a **second enforcement of II.4** (which
II.1 already enforces as `needs_name_or_surface`) is not obvious. The argument
for separate: II.1's predicate is about *name strings*, II.4 has no predicate
at all, and a mechanism can satisfy both while still being typography-bound —
the two articles read together still do not name this defect. The argument for
folding: "what survives every text and every host" already says it, and the
lineage has been wrong before about how many mechanisms it has. Recorded
unresolved, on the same terms as the commensurability open question in
`AMENDMENT-5-PROPOSAL.md`.
