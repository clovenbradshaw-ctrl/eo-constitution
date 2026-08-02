# Proposed 7th amendment — the local test (II.12)

**Status: APPLIED 2026-08-01.** IV.2 — the assay proposes and checks, it never
amends; amendment is a human act. This proposal was approved by the human
disposing and landed as a single change: `CONSTITUTION.md` gained Article II.12
and the 7th amendment-log entry; `assay/classify.js` gained the
`needs_datacenter_compute` boolean and its engine veto; every claim in `claims/`
gained the boolean; the exemplar `datacenter-scored-significance` was recorded
as a refuted placement; and `conformance/assay.test.js` gained the changed
failing test (II.12) the amendment required (IV.1).

---

## The defect

The lineage develops as if a compute resource existed that does not. The AI
datacenter with infinite GPU compute is the shape of almost every plausible
"just throw a model at it" shortcut in this field — an embedding over the whole
corpus, a scored significance from a model that must live in a building, a
null that only a fleet can draw. None of these can be run, checked, or re-run
by the machine that actually does the reading. They are inventions for a
fiction.

The constitution already *presumes* the boundary without saying so. II.8
refuses attention as the measurement — and one of the honest reasons is that
attention's cost class is the datacenter's, not ours. II.7 converges on
E. coli as the exemplar of being right — and E. coli is right *because* it is
compute-constrained, no receptor per molecule, a gradient it can actually
climb with the chemistry it has. The boundary was load-bearing in every
article; it was never stated, and so nothing in the assay could refuse a
mechanism that quietly depends on the fiction.

## The condition for amending: is it recurring?

Yes. The datacenter-shaped assumption is the field's default posture, and it
reappears every time the local measurement gets hard:

| # | Where | The assumption | Measured cost |
|---|---|---|---|
| 1 | attention / learned compatibility | an attention stack over corpus-wide contexts | refused as the measurement by II.8 — but the *cost* is never the cited reason |
| 2 | embedding bridges | a model-tier witness over the full corpus (monster ≈ creature) | routed to priors by II.2, and the boundary is silent about how it was produced |
| 3 | a scored significance | ask a large model to score the arrival's novelty | passes II.8 (weights nothing) and II.9 (revises nothing) — the defect is *only* the compute |
| 4 | a corpus-wide null | a null drawn by a fleet that fits the data in RAM the machine does not have | uncheckable ground; the null is a units change in the other direction |
| 5 | "the model is the reader" | an LLM read in place of the engine | refused by II.6/II.8 by other roads — but the boundary names the shared shape |

Row 3 is the load-bearing one for this amendment: a significance organ that
asks a datacenter to score the arrival passes every existing article. It
rebuilds no ground by weighting — it does nothing so expensive that II.8
sees it. It scores nothing the arrival alone would not have. The defect is not
that it weights the present, and not that it scores the arrival; the defect is
that the mechanism **cannot run where the reading runs.** No article could see
that, because no article stated the boundary.

## Why no existing article catches this

- **II.8 (difference)** asks *does it build a nothing, or weight what is
  present?* A datacenter-scored novelty builds a real nothing. Passes.
- **II.9 (revision)** asks *does it measure the arrival, or the revision?*
  It can be written to measure a genuine revision. Passes.
- **II.11 (omnimodal earning)** asks *is medium-agnosticism measured?* The
  score is genuinely medium-agnostic. Passes.
- **II.7 (convergence)** asks *does it fix only this one thing?* A generic
  scorer fixes nothing in particular. Passes.
- **III.2 (pure vs host)** asks *does the engine own a clock, I/O, or
  randomness?* The compute is not a declared host dependency; it is invisible
  to the seam. Passes.

The gap is one level below the routing: not *what the mechanism does* but
*where it can run.* The boundary is a condition of the invention, and nothing
in the assay checked it.

## Proposed article

> **II.12 The local test.** *Does this mechanism run on the compute that
> exists?* The AI datacenter with infinite GPU compute does not exist. It is
> not a deployment deferred, a scale planned for, or a resource assumed — it
> is a fiction, and nothing in this lineage is invented for a fiction. We
> develop from the perspective that it is not there: the boundary conditions
> of the invention are local compute and mainstream hardware. A measurement
> whose correctness depends on compute it does not own — a fleet of GPUs, an
> unbounded budget, a model that lives in a building — is refused wherever it
> is the measurement. The host may call a model it does not own (II.3); the
> measurement never presumes one. Two named consequences:
>
> - **The boundary is a design force, not a tax.** The engine figures by
>   difference against a ground it rebuilds (II.8) not only because that is
>   where intelligence converges (II.7), but because perturbation and the null
>   are precisely the compute a single machine owns — E. coli climbs its
>   gradient with the chemistry it has, no receptor per molecule. An organ
>   that exists only at datacenter scale is not a small organ waiting to grow;
>   it is the wrong shape.
> - **A null that does not run locally does not exist.** Every Born null must
>   be executable on the same machine that executes the observation. A ground
>   whose check presumes the datacenter is a ground the measurement can never
>   run — and an uncheckable ground is no ground: a type error, not a hard
>   problem (II.5, III.2).

## Proposed enforcement

Following the existing convention that the predicate names the *defect* and
`true` refutes an engine placement:

```js
// assay/classify.js — EVIDENCE_BOOLEANS
"needs_datacenter_compute",
```

```js
// assay/classify.js — inside `if (placement === "engine")`,
// after the asserted_agnosticism branch
if (evidence.needs_datacenter_compute) {
  return {
    verdict: VERDICTS.REFUTE,
    placement,
    reasons: [
      "II.12 — the local test: this mechanism's correctness depends on compute this lineage does not own. The AI datacenter with infinite GPU compute does not exist; the boundary conditions of the invention are local compute and mainstream hardware. A measurement that presumes the datacenter is refused wherever it is the measurement; a null that does not run locally does not exist",
    ],
  };
}
```

Per IV.1 this must land as a **changed failing test** in the same change. The
exemplar claim to add — the shape of the live defect, which currently passes:

```json
{
  "claim_id": "datacenter-scored-significance",
  "what": "a significance organ that asks a fleet of GPUs to score the arrival's revision against a model that does not fit on local hardware",
  "proposed_placement": "engine",
  "expect": "refute",
  "evidence": {
    "needs_name_or_surface": false,
    "is_material_knowledge": false,
    "giver": "",
    "is_host_knowledge": false,
    "medium_agnostic": true,
    "asserted_agnosticism": false,
    "is_one_off_fix": false,
    "weights_present": false,
    "scores_arrival_alone": false,
    "needs_datacenter_compute": true,
    "consumes_source": "direct",
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

Because the boolean is required, all 26 existing claims in `claims/` need
`"needs_datacenter_compute": false` added, or `classify` returns GAP on each
(II.5).

## Proposed disposition of the live claims

No live claim changes placement. The engine claims that genuinely run locally —
`operator-vector-revision`, `span-provenance`, the Born-gate organs — keep
`false` and carry their executable measurement as the warrant. The host claims
that call a model — `holonic-task` (app, network) — also keep `false`; the
boundary binds the measurement, not the host that may call a model it does not
own (I.4, II.3). The boundary is stated as a boundary, not as a ban on the app
tier.

## Proposed amendment-log entry (IV.6)

> - **7th — The local test (II.12).** The AI datacenter with infinite GPU
>   compute does not exist — it is a fiction, and nothing in this lineage is
>   invented for a fiction. The boundary conditions of the invention are local
>   compute and mainstream hardware: a measurement whose correctness depends
>   on compute it does not own is refused wherever it is the measurement, and a
>   null that does not run locally does not exist. The boundary is a design
>   force — the engine figures by difference (II.8) in part because
>   perturbation and the null are the compute a single machine owns, and E.
>   coli is the convergence exemplar (II.7) precisely because it is
>   compute-constrained. The host may call a model it does not own; the
>   measurement never presumes one. Enforced as `needs_datacenter_compute`,
>   required on every claim; `true` on an engine placement is refuted.

## What it would have caught

Rows 1, 2, and 3 of the defect table are datacenter-shaped today, and row 3
passes every article this amendment leaves standing. The scoring shortcut is
the field's default answer to "significance is hard" — and it was invisible to
the assay because nothing stated the boundary. Row 5 is the canonical shape:
"the model is the reader" is refused by other roads, and the boundary names
the shared defect they all have in common — a mechanism that cannot run where
the reading runs.

## Open question, recorded rather than settled

Whether the boundary binds the app tier as well — a host that depends on an
API model is itself presuming a datacenter, and I.4 assigns model routing to
the app — is not settled here. The argument for binding the host too: "we must
do things locally on mainstream hardware" is a boundary on the whole invention,
and an app that lives or dies by a fleet is a thin host for a fiction. The
argument against: a host may call a model it does not own, the interface is
where the particular is honest (I.4), and II.3 already owns the host's
dependencies. The enforcement here vetoes the *measurement* and leaves the
*host* free, on the same terms as "the host may attend; the measurement never
does." Recorded unresolved.
