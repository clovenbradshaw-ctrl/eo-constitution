# Proposed 8th amendment — the script earning test (II.13)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document is an agent's drafting of raw findings into the constitution's own
amendment format — it is not itself the disposition. It converts items A1,
A2, and A7 of `../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` (Part
A, "Proposed amendments to eo-constitution") into a testable article, on the
same terms IV.1 requires: a changed failing test in the same change, once a
human disposes it. Nothing in `CONSTITUTION.md`, `assay/classify.js`, or
`claims/` has been changed by this document.

---

## The defect

II.11 (the 6th amendment) already refuses medium-agnosticism asserted rather
than earned — a mechanism that needs one medium's surfaces (text's lines, a
score's staves) is not engine by assertion. The eochat investigation surfaced
a sibling defect one level *inside* the text medium: a mechanism can clear
II.11 (it never leaves text) while still being scoped to one *script* or
*language* within that medium, and route to engine anyway because nothing
tests for it.

`perceiver/text/surfaces.js` and `emergence/store/index.js` both carried
documentation implying general applicability. Real Greek deployment material
(not a synthetic fixture) found the first broken by an ASCII-only `\b` word
boundary and the second built on a Latin-alphabet-only character class with no
Unicode support at all. Both shipped as if language-neutral; neither was ever
run against a genuinely different script before that claim was made.

The disclosure half of the same defect: `cube/index.js` is equally scoped to
one lexicon (English) but says so plainly in its own header, and correctly
returns no signal on Greek rather than a wrong one. `emergence/store/index.js`
is scoped the same way and discloses nothing — an extensive header grounding
it in general associative-memory neuroscience with no mention that its
tokenizer cannot see a non-Latin letter. The silent version is the more severe
defect: II.2's giver test already requires a missing giver to be a wall, not a
gap-in-waiting, but nothing currently forces a script-scoped mechanism to
*say* it is script-scoped instead of asserting universality.

## Why no existing article catches this

- **II.1 (omnimodal veto)** is enforced via `needs_name_or_surface`; an ASCII
  `\b` anchor or a Latin character class names no *name string* — it is a
  vocabulary boundary within one medium, not a surface. Passes.
- **II.4 (invariance)** states the rule — what could have been otherwise in a
  different text is priors — but a different script is exactly "a different
  text," and nothing operationalizes that for `classify()`. Never consulted.
- **II.11 (omnimodal earning)** asks whether medium-agnosticism is earned by a
  cross-modal fixture. A script-scoped mechanism never leaves the text medium,
  so it clears II.11 by never triggering it. The gap is one level down: not
  *medium*, but *script/language within a medium*.
- **II.2 (giver)** routes material knowledge to priors only when the claim
  sets `is_material_knowledge: true`. A lexicon- or script-bound mechanism
  does not know it is scoped, so nothing forces the claim to say so.

## Proposed article

> **II.13 The script earning test.** *Is a mechanism's language or script
> scope disclosed, or is universality assumed?* A mechanism scoped to one
> language, script, or lexicon is not a defect by itself — English-only tools
> exist, and I.4/II.3 already permit a host to be bespoke. What is refused is
> the silent version: a claim that behaves as though it is script-agnostic
> without a cross-script invariance fixture (the same discipline II.11 already
> requires across media, applied within the text medium), and without naming
> its scope where the giver test (II.2) already requires material knowledge to
> name its giver. Two named consequences:
>
> - **Silence is the more severe defect than scope.** A module that discloses
>   "English lexicon only" in its own header and returns no signal outside it
>   is honest and passes. A module equally scoped that asserts general
>   applicability fails whether or not its output is ever wrong on the
>   material it cannot read — the failure is the undisclosed boundary, not any
>   one bad answer.
> - **Generalizing a mechanism means the same architecture in each script's own
>   vocabulary, not a byte-for-byte port.** A structural mechanism validated in
>   one script (a discrete distribution over one alphabet's tokens) earns a
>   cross-script claim by being re-expressed in another script's own native
>   terms and independently validated there — not by asserting the original
>   implementation already covers it.

## Proposed enforcement

Following the existing convention that the predicate names the *defect* and
`true` refutes an engine placement:

```js
// assay/classify.js — EVIDENCE_BOOLEANS
"undisclosed_script_scope",
```

```js
// assay/classify.js — inside `if (placement === "engine")`,
// after the asserted_agnosticism branch
if (evidence.undisclosed_script_scope) {
  return {
    verdict: VERDICTS.REFUTE,
    placement,
    reasons: [
      "II.13 — the script earning test: this mechanism is scoped to one language, script, or lexicon and asserts general applicability without a cross-script invariance fixture or a disclosed giver naming its scope. Silence about the boundary is the defect, not the boundary itself",
    ],
  };
}
```

The exemplar claim to add — the shape of the live defect (`emergence/store`,
undisclosed):

```json
{
  "claim_id": "undisclosed-latin-only-store",
  "what": "an associative-memory organ built on a Latin-alphabet-only character class, documented as general-purpose with no mention of its script scope and no cross-script fixture",
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
    "undisclosed_script_scope": true,
    "consumes_source": "direct",
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

The disclosed counterpart (`cube/index.js`, honest) should pass as `priors`
with `giver: "the English lexicon this module is built on"` — mirroring how
`learned-typography` already routes disclosed scope to priors.

## Proposed amendment-log entry (IV.6)

> - **8th — The script earning test (II.13).** A mechanism scoped to one
>   language or script is not a defect; asserting it is script-agnostic
>   without a cross-script fixture, or without naming that scope as a received
>   giver (II.2), is. The silence is the more severe failure than the scope —
>   a disclosed English-only module that returns no signal on Greek is honest;
>   an equally-scoped module claiming generality is not. Enforced as
>   `undisclosed_script_scope`, required on every claim; `true` on an engine
>   placement is refuted.

## Source

Drafted from `../eochat/CONSTITUTION-AND-LAWS-AMENDMENTS-PROPOSED.md` items
A1, A2, A7, whose evidence is `../eochat/ORGAN-STACK-REAL-DEPLOYMENT.md`,
"Findings, ranked by severity," #1–#3, and "Music's own forward-surprise."
This draft has not been reviewed by the human who must dispose it (IV.2); its
exact wording, the boolean's name, and whether it should instead fold into
II.11 as a fourth consequence are all open questions for that review.
