# Proposed 5th amendment — the commensurability test (II.10)

**Status: APPLIED 2026-08-04.** IV.2 — the assay proposes and checks, it never
amends; amendment is a human act. This proposal was approved by the human
disposing and landed as a single change: `CONSTITUTION.md` gained Article II.10
and the 5th amendment-log entry; `assay/classify.js` gained the
`unconditional_null` boolean and its engine veto; every claim in `claims/`
gained the boolean; the exemplar `chosen-cluster-random-null` was recorded as
a refuted placement; and `conformance/assay.test.js` gained the changed
failing test (II.10) the amendment required (IV.1).

---

## The defect

A mechanism builds a null, and the null is not the same act as the observation.
It differs in operation, or extent, or multiplicity, or placement — in some axis
other than the one being tested. The measurement then reports that other
difference, faithfully, with a real ground and a real rank, and nothing in the
record shows it.

This is not the absence of a null. II.8 already refuses that. This is a null
that **exists, is sound, is cited — and is answering a different question than
the one asked.**

## The condition for amending: is it recurring?

SEED.md #3 already says so in its own words — "this is the lineage's most
expensive dead end and **it reappears constantly**." Ten measured recurrences,
across two repo generations:

| # | Where | The mismatch | Measured cost |
|---|---|---|---|
| 1 | `nul` PERTURBATIONS | parametric family / global mean+sd | "a units change; preserves everything it was meant to test" |
| 2 | `nul` burstiness | mean is shuffle-invariant | zero-width ground: "an unconditional null wearing a different hat" |
| 3 | `nul` PERTURBATIONS.phase | shuffle used where the spectrum was received | censored on **every** order statistic before anything is asked |
| 4 | `nul` pattern (extent) | null held at `before`'s n while `after` grew | recovered 23/24 chapter boundaries — and 21–23 from the **shuffled** series |
| 5 | `nul` pattern (`opened`) | bare inequality, no null for the sign | inside the null **77.8%**; flips on a mere reseed **41.1%** |
| 6 | `nul` level | `2/draws` resolution floor asked to be a null | false laddering **rises** with draws (3.08→4.42 of 5) |
| 7 | `nul` extremeGround | one-arrival null for a best-of-n arrival | median rank 0.010 on pure noise; **25%** called surfeit at n=200 |
| 8 | `kinds` Born gates | cluster **chosen** by agglomeration, null drawn **at random** | 3 kinds, all `above`, both gates passing, on material with nothing to find — **confabulation**, a named death |
| 9 | `entity` (eoreader5) | unconditional null in memory-golden | calibrated at **r = 1.000** with the thing it was meant to control for |
| 10 | `holon_level` regimeNull | null zeroes a fixed window (extent n); observation removes the regime (extent n−L) | false `exists` **10/40** on regime-free noise vs **3/40** matched |

#8 is the load-bearing one for this amendment: both Born gates passed, the null
was real, and the result was confabulation — one of the two deaths the seed
names. An article that only asks "is there a null" cannot see it.

## Why no existing article catches this

- **II.8 (difference)** asks *does it build a nothing, or weight what is
  present?* Every case above **builds a nothing.** Passes.
- **II.9 (revision)** asks *does it measure the arrival, or the revision?*
  Cases 4, 8, 10 measure a genuine revision. Passes.
- **IV.3 (growth rule)** consumes the level test — which is itself case 6.

The gap is real and it is one level down from II.8: not *whether* a ground was
rebuilt, but *whether the rebuilt ground is commensurable with the observation
placed in it.*

## Proposed article

> **II.10 The commensurability test.** *Does the null differ from the
> observation in exactly one axis — the one being tested?* A ground is a
> nothing constructed by perturbing what is present, and it is the null **for**
> a particular observation. It must share that observation's operation, extent,
> multiplicity, and spec, and differ only in the axis under test. A null that
> differs in any other axis measures that other difference and reports it as
> the finding. Every Born null in this lineage is a **conditional** null: it
> varies along the axis the artefact exploits. An unconditional null is only a
> change of units, and it fails invisibly and globally — the record shows a real
> ground, a real rank, a real spec, and no trace of the substitution. Three
> named consequences:
>
> - **The null undergoes what the observation underwent.** If the observation
>   removes material, the null removes material; if it grows, the null grows the
>   same way; if it filters, the null is preserved under that filter. The
>   matched counterfactual is the one to build, not the convenient one.
> - **Selection is an axis.** A best-of-n observation gets a best-of-n null. A
>   cluster chosen for being extreme is not placed against subsets drawn at
>   random. "The best I could find" beats "one drawn at random" whether or not
>   there is anything to find.
> - **Commensurability is checked by type, not by hope.** Extent, spec, `n`, and
>   direction are carried on the ground and refused when they disagree (II.5,
>   type error before null) — never left to a reviewer to notice.

## Proposed enforcement

New required evidence boolean, following the existing convention that the
predicate names the *defect* and `true` refutes an engine placement:

```js
// assay/classify.js — EVIDENCE_BOOLEANS
"unconditional_null",
```

```js
// assay/classify.js — inside `if (placement === "engine")`,
// after the scores_arrival_alone branch
if (evidence.unconditional_null) {
  return {
    verdict: VERDICTS.REFUTE,
    placement,
    reasons: [
      "II.10 — the commensurability test: this mechanism's null differs from the observation in an axis other than the one under test. It is a units change, not a ground. The null undergoes what the observation underwent; selection is an axis; commensurability is checked by type, not by hope",
    ],
  };
}
```

Per IV.1 this must land as a **changed failing test** in the same change. The
exemplar claim to add — the shape of case #8, which is the one that reached
confabulation:

```json
{
  "claim_id": "chosen-cluster-random-null",
  "what": "a kind gate that scores a cluster chosen by agglomeration for cohesion against subsets drawn at random from the population",
  "proposed_placement": "engine",
  "expect": "refute",
  "evidence": {
    "needs_name_or_surface": false,
    "is_material_knowledge": false,
    "giver": "",
    "is_host_knowledge": false,
    "medium_agnostic": true,
    "is_one_off_fix": false,
    "weights_present": false,
    "scores_arrival_alone": false,
    "unconditional_null": true,
    "consumes_source": "direct",
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

Because the boolean is required, all 25 existing claims in `claims/` need
`"unconditional_null": false` added, or `classify` returns GAP on each (II.5).

## Proposed amendment-log entry (IV.6)

> - **5th — The commensurability test (II.10).** A null is the null *for* an
>   observation and must differ from it in exactly one axis: the one under test.
>   Every Born null is conditional — it varies along the axis the artefact
>   exploits; an unconditional null is a change of units that fails invisibly
>   and globally, citing a real ground and a real rank throughout. Its three
>   consequences: the null undergoes what the observation underwent, selection
>   is an axis (a best-of-n observation gets a best-of-n null), and
>   commensurability is checked by type, not by hope. II.8 asks whether a ground
>   was rebuilt; II.9 asks whether anything moved; this asks whether the ground
>   is the one the question needed. Enforced as `unconditional_null`, required on
>   every claim; `true` on an engine placement is refuted.

## What it would have caught

Cases 4, 7, 8, and 10 above are all `unconditional_null: true` at the time they
shipped. Case 8 shipped and produced confabulation on golden material; it was
caught by a later hand-built search null, not by the articles.

## Open question, recorded rather than settled

Whether II.10 is genuinely a separate article or a **fourth consequence of
II.8** is not obvious. The argument for separate: II.8's predicate
(`weights_present`) is answered `false` by every one of the ten cases, so
folding II.10 in would require changing what `weights_present` means, and
IV.1 warns that an amendment which cannot be expressed as a changed failing
test is an exception rather than an amendment. The argument for folding: both
are the same claim about grounds, and the lineage has been wrong before about
how many mechanisms it has. Recorded unresolved, on the same terms as the
`DEF.admit` tension in `CUBE.md` and the fourth-declared-number question in
SEED.md.
