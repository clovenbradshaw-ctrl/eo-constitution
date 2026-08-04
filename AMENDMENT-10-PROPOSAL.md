# Proposed 10th amendment — the validation discipline test (II.15)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document converts items A5, A6, and A8 of
`../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` (Part A) into a
testable article. Nothing in `CONSTITUTION.md`, `assay/classify.js`, or
`claims/` has been changed by this document.

---

## The defect

Three failures, all about how a claim of validation is earned rather than
asserted:

**A cheap proxy shipped as if validated, on too little evidence.** Lexical
overlap between a text and a candidate external prior looked like a clean,
monotonic predictor of that prior's usefulness — at N=3 candidates. Tested
properly at N=13 (every candidate individually), the Spearman correlation
between overlap and actual measured outcome was **-0.022**, statistically
indistinguishable from no relationship. The best performer (9.6% overlap) and
the worst (9.1% overlap) are nearly identical on the cheap proxy. The 3-point
version and the 13-point version are not two levels of detail on the same
finding — they are different findings, and the smaller sample would have
shipped as ground truth if not re-tested.

**The verifier is exactly as fallible as what it verifies.** At least six
self-caught defects in a single investigation lived in the *checking*
machinery, not the organs being checked: a book-splitting regex that assumed
one TEI attribute order and silently broke on a second real source; a result
field accessed under the wrong name; a naive whitespace-sensitive comparison
that reported 424 false mismatches; a threshold that didn't match the actual
production call site; a scorer with no cold-start guard that produced a
29,000x outlier; the same scorer using one variance floor across dimensions of
incompatible scale. Every one was caught only by checking the probe against
real ground truth or real call sites — never by inspecting the probe's code
alone.

## Why no existing article catches this

- **II.7 (convergence)** asks whether a mechanism fixes only one thing. A
  cheap relatedness heuristic can genuinely be architecture-general (it is
  meant to apply across every candidate prior) and still fail this test for a
  completely different reason: it was never validated against enough real,
  varied outcomes to license the claim. II.7 does not ask about sample size.
- **II.9 (revision)** already refuses "no scalar by default" and requires a
  declared, task-relative collapse — but that is about the *shape* of a
  significance score, not about whether the *predictor of validity* itself was
  checked against enough ground truth.
- **Nothing existing** treats the checking mechanism (a probe, a golden, a
  conformance script) as itself subject to the constitution's own discipline.
  A probe is code; nothing routes it, tests it, or holds it to II.5's type
  error before null.

## Proposed article

> **II.15 The validation discipline test.** *Was this claim of validity
> checked against enough real, varied ground truth — and was the checker
> itself checked?* A claim that a heuristic, proxy, or shortcut predicts a
> real outcome is refused unless it was tested against real, varied cases at
> a scale that could actually have falsified it — three data points, even
> monotonic ones, are not a validated relationship, and a smaller sample that
> looked clean is not confirmation of a larger one, it is a different,
> unfinished finding. And any verification mechanism — a probe, a check
> script, a golden comparison — is held to the same discipline as the thing it
> verifies: its own parameters, comparisons, and edge cases must be checked
> against real ground truth or real call sites before its output is trusted,
> because a bug in the verifier is indistinguishable from a real finding until
> checked, and can silently invert a conclusion. Two named consequences:
>
> - **A shortcut is not validated by looking plausible.** "Related-sounding" is
>   not a substitute for measuring the actual task's outcome against the
>   actual candidates. What remains legitimate is running the real task
>   against every real candidate and ranking by real measured outcome — the
>   expensive version, not the cheap proxy for it.
> - **The probe is not exempt from the constitution it enforces.** A checking
>   script that has never been run against ground truth it did not construct
>   itself carries no more warrant than the mechanism it is checking.

## Proposed enforcement

This article is harder to reduce to a single evidence boolean than II.1–II.14,
because it is a claim about *how a validation claim was produced*, not about
the mechanism's own shape. Two possible enforcement shapes, left for the human
disposing this proposal to choose between:

1. **A required evidence field**, analogous to `level_test`, that records the
   sample size and ground-truth diversity behind any claim that asserts a
   heuristic predicts a real outcome (`validation_n`, `validation_diverse:
   boolean`), refused below a declared threshold.
2. **A conformance-only enforcement**, outside `classify.js` entirely: every
   probe/check script in `conformance/` and `goldens/` must itself carry a
   fixture proving it can catch a known-planted defect, on the same
   discipline `check-instruction-laws.mjs` (eochat) already applies to
   corpus-loading throws.

No exemplar claim or code diff is proposed here, unlike Amendments 5–9 — the
enforcement shape is genuinely open, and IV.1 requires the changed failing
test to land in the same change as the article, which means this cannot be
disposed until that choice is made.

## Proposed amendment-log entry (IV.6)

> - **10th — The validation discipline test (II.15).** A claim that a
>   heuristic or proxy predicts a real outcome is refused without real,
>   varied ground truth at a scale that could have falsified it — three data
>   points are not a validated relationship. Any verification mechanism is
>   held to the same discipline as what it verifies: an unchecked probe is no
>   more trustworthy than an unchecked organ. [Enforcement mechanism TBD by
>   human disposal — see the two proposed shapes above.]

## Source

Drafted from `../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` items
A5, A6, and A8, whose evidence is
`../eochat/ORGAN-STACK-REAL-DEPLOYMENT.md`, "Building a reusable 'which
priors to activate' tool," and the probe-defect list under A8. Not yet
reviewed by the human who must dispose it (IV.2). This is the least
shovel-ready of the four drafts in this batch — it names a real, recurring
defect but does not yet reduce to a changed failing test the way Amendments
5–9 do, and needs a human's judgment on which enforcement shape is right
before it can be landed at all.
