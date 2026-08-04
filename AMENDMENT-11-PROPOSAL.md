# Proposed 11th amendment — the surprise-disambiguation test (II.16)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document converts item A9 of
`../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` (Part A) into a
testable article. Nothing in `CONSTITUTION.md`, `assay/classify.js`, or
`claims/` has been changed by this document.

---

## The defect

A high divergence score against an external prior can mean either of two
different things, and a naive consumer of the score cannot tell them apart:
"this moment is narratively or structurally unique," or "this passage is
recognizably distinctive OF THE GENRE the prior doesn't share" — a weaker,
more mundane claim.

`read-odyssey-ensemble-surprise.mjs`, a genuine 14-signal consensus reading of
the real Odyssey (1 within-text baseline + 13 individually-validated external
priors), surfaced a real top-25 where most entries were independently
recognizable narrative moments — and three were the same Homeric formula (a
stock hospitality-scene line) recurring verbatim across four books, scoring
high only because it reads as distinctively epic against non-epic external
priors, not because it is narratively unique. An automatic recurrence check
(does this exact text appear elsewhere in the source?) distinguished the two
cleanly once added, tagging 3/25 as `FORMULA` and 22/25 as `unique`, and
caught a fourth occurrence manual inspection of the ranked list had missed.

The consensus method itself is not the defect — it is materially better than
trusting any single prior (A5's "what remains valid," applied at scale). The
defect is narrower: "surprising" is at least two distinct properties, and a
consumer-facing surface built on this class of signal must separate them
automatically or disclose them as unseparated, never silently blend them.

## Why no existing article catches this

- **II.9 (the revision test)** already refuses scoring the arrival alone and
  requires a witnessed revision of prior structure — but a genre-distinctive
  formula *does* revise the ground against an external prior; the mechanism
  correctly measures a real revision. The defect is not that the score is
  wrong; it is that "revision against this prior" and "narratively unique"
  are two different claims wearing one number, and II.9 does not require
  disclosing which one a surfaced score is making.
- **II.8 (the difference test)** forbids averaging grounds and requires
  plural disagreement to stay visible — the ensemble method already satisfies
  this (agreement is counted, not blended into one score). The gap is
  downstream of II.8: even with disagreement preserved per-prior, the
  *aggregate* consumer-facing claim ("this is surprising") still conflates two
  properties unless something separates them.

## Proposed article

> **II.16 The surprise-disambiguation test.** *When a mechanism reports that
> something is surprising against a prior, does it say which of at least two
> different claims it is making?* A high divergence score against an external
> prior conflates, at minimum, narrative or structural novelty and mere
> genre-distinctiveness (a passage that reads as distinctively *this kind of
> text* relative to a prior that is a different kind, independent of whether
> the passage itself is unusual within its own kind). A mechanism that emits a
> single "surprising" signal without separating these, and without disclosing
> that the separation was not attempted, is refused as the measurement of
> significance — the same category of defect II.9 already names for the
> arrival-alone score, one layer further downstream, at the point where a
> revision score becomes a consumer-facing claim.
>
> - **The recurrence check is the cheapest available separator.** Whether the
>   scored span (or a near-match) recurs elsewhere in the source is a real,
>   automatic, medium-general signal for genre-distinctiveness vs. novelty,
>   and its absence from a surprise-reporting mechanism is itself refusable —
>   not because it is the only separator, but because a known-cheap one being
>   skipped is a choice, not a limitation.
> - **Disclosure is a legal alternative to separation.** A mechanism that
>   cannot yet separate the two claims may ship if it labels its output as
>   unseparated — "surprising relative to this prior, novelty vs.
>   genre-distinctiveness not disambiguated" — rather than presenting a single
>   number as settled narrative significance.

## Proposed enforcement

```js
// assay/classify.js — EVIDENCE_BOOLEANS
"surprise_claim_undisambiguated",
```

```js
// assay/classify.js — inside `if (placement === "engine")`,
// after the scores_arrival_alone branch (II.9 — the neighboring revision defect)
if (evidence.surprise_claim_undisambiguated) {
  return {
    verdict: VERDICTS.REFUTE,
    placement,
    reasons: [
      "II.16 — the surprise-disambiguation test: this mechanism reports a surprise/divergence signal without separating narrative novelty from mere genre-distinctiveness, and without disclosing the conflation. 'Surprising relative to a prior' is at least two claims; a consumer cannot tell them apart from one number",
    ],
  };
}
```

The exemplar claim to add — the shape of the live defect before the
recurrence check was added:

```json
{
  "claim_id": "unseparated-genre-surprise",
  "what": "an ensemble surprise signal that surfaces a top-N ranked by divergence against external priors with no recurrence check and no disclosure that genre-distinctiveness and narrative novelty are conflated",
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
    "unconditional_null": false,
    "needs_datacenter_compute": false,
    "surprise_claim_undisambiguated": true,
    "consumes_source": "direct",
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

## Proposed amendment-log entry (IV.6)

> - **11th — The surprise-disambiguation test (II.16).** A surprise or
>   divergence score against an external prior conflates narrative novelty
>   with mere genre-distinctiveness unless something separates them. A
>   mechanism that emits one number without a recurrence check (the cheapest
>   available separator) or a disclosure that the two claims are unseparated
>   is refused, one layer downstream of II.9's arrival-vs-revision distinction.
>   Enforced as `surprise_claim_undisambiguated`, required on every claim;
>   `true` on an engine placement is refuted.

## Source

Drafted from `../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` item A9,
whose evidence is `read-odyssey-ensemble-surprise.mjs` as described in that
document. Not yet reviewed by the human who must dispose it (IV.2); whether
this is a separate article or a consequence of II.9 is an open question for
that review, on the same terms as the open questions already recorded in
Amendments 5 and 6.
