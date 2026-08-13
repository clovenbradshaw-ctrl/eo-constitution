# Proposed 15th amendment — the holonic level test (II.20)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document is an agent's drafting of a defect caught live, in a single working
session, measuring `eoWebLLM`'s claim-detection gate
(`app/client/eo-citation-check.ts`'s `extractClaimAtoms`) and its instruction
budget (`app/client/eo-gate.ts`'s `countTokens`) against a controlled parallel
corpus in `live_priors` (`06-government-legal/un-udhr/`, 516 translations of
one document) — not a conversion of a prior item from another document, same
footing as Amendments 12, 13 and 14.

The fourth defect below is the general case, and the first three are instances
of it. A reader short on time should read that one.

---

## The defect

Every measurement below is over the *same document* in many languages. The
UDHR is published in 516 translations that state identical facts, so density
differences measure the mechanism, not the text. That is what makes this a
controlled comparison rather than a survey.

**First — a level assumed universal that is not.** `extractClaimAtoms` decides
what counts as a checkable claim, and therefore what the host ever grounds; a
claim it does not flag is checked by nothing. It detects at two structural
levels: *characters* classified by case (`\p{Lu}`), and *words* delimited by
whitespace. Measured over nine translations:

```
German     334.6 atoms/1k   547 "names"   — German capitalizes every noun
English     71.8            baseline
Arabic      22.5            uncased, ASCII digits  -> 30 numbers, 0 names
Korean      25.3            same
Hindi        0.0            uncased + native numerals -> nothing
Urdu         0.0            uncased + native numerals -> nothing
Farsi        0.0            uncased, numbers spelled out -> nothing
```

Across the full 516, nineteen languages measure zero. Both levels were treated
as universally meaning-bearing. Neither is: case is absent from Arabic,
Devanagari, Hangul and Han, and whitespace-delimited words are absent from
Chinese, Japanese and Thai. Those three had to be removed from the fixture
outright, because atoms-per-word is not a quantity that exists for them —
Japanese measured 233/1k against a denominator of 90 "words" for a
4,070-character document, a number about the delimiter, not the language.

**Second — descending below meaning in order to escape the assumption.** The
proposed repair was to go beneath words to raw UTF-8 bytes: no tokenizer, no
case, no script, no numeral system. It reads as neutrality. Measured over the
same fixture:

```
English / German / Spanish   1.00 – 1.02 bytes/char
Russian / Arabic / Urdu      ~2.0
Korean                        2.89
Hindi                         2.97          — 3x ratio
```

A fixed-width byte n-gram window sees three times as much linguistic content
in English as in Hindi. The descent did not remove the language prior. It
exchanged an *explicit* one — a capitalization rule, visible in the source and
arguable on sight — for an *implicit* one: UTF-8's variable width, which no
reader would name as a rule about language because it never announces itself
as one.

**Third — and this is the distinction the first two share.** Bytes are the
correct level for one operation in this same system and the wrong level for
another. A Field span is byte-addressed, and that is right: an offset asserts
no meaning, so no meaning can be lost beneath it. Statistics computed over
those same bytes do assert meaning, and there the encoding's own shape becomes
the signal. Neither "bytes are wrong" nor "bytes are right" is the finding.
The level belongs to the *operation*, not to the system, and a mechanism that
picks one level and applies it everywhere will be wrong at one end or the
other — too high where the level does not exist, too low where it carries
nothing.

**Fourth — the general case: there is no neutral unit, and picking one is a
policy act.** The three defects above are instances of a wider fact that the
same fixture measures directly. Because every translation states identical
content, a unit's count *is* its meaning-density — 2,000 words of meaning
expressed once per language. Measured:

```
                      chars    bytes    char-share   byte-share
Korean                 3531    10220         1.00x        1.15x
Arabic                 6227    12334         1.76x        1.39x
Urdu                   7425    14850         2.10x        1.67x
Hindi                  8827    26223         2.50x        2.96x
English                8858     8870         2.51x        1.00x
Russian               10124    19982         2.87x        2.25x
German                10263    10439         2.91x        1.18x

budget in CHARACTERS -> 2.91x spread, favours Korean
budget in BYTES      -> 2.96x spread, favours English
```

Same document, same meaning, zero information difference. The two obvious
candidates for a "neutral" unit are biased by nearly the same magnitude in
*opposite directions*. A budget denominated in characters gives Korean almost
three times the capacity it gives German; the same budget denominated in bytes
reverses it. Neither is neutral, and there is no third unit that is — a unit
carries meaning at a rate that varies with the material, so any fixed quantity
denominated in one redistributes capability along that rate.

This is not hypothetical in the host. `eo-gate.ts`'s `countTokens` estimates
tokens as `length / 3.5` — characters — and is consumed by the instruction
budget (`eo-gate.ts:420-445`) and the project-instruction folder
(`eo-project-instructions.ts:182-496`). The quantity it estimates, tokens under
a byte-level BPE tokenizer, tracks *bytes*. So the estimator is denominated in
the unit that favours Korean while approximating a quantity that follows the
unit that favours English, and its error is largest exactly where the two
diverge most — Hindi, at 2.50x chars against 2.96x bytes.

The consequence is traceable and it is the reason this belongs in the
constitution rather than a bug tracker. Under-counting over-fills the context;
the clamp drops messages; `eo-warrant.ts:523-528` reads the drop and sets
`byDefault = true` with the reason *"context clamp dropped N message(s) — what
they held is unknown"*; `routeTurn` reports *"provenance could not be
established for part of this turn."* **The bias does not surface as a bias. It
surfaces as an epistemic finding about the reader's own evidence.** A Hindi
speaker is told their material has unrecoverable provenance more often than an
English speaker, for reasons entirely internal to the instrument, and every
layer downstream reports that honestly because every layer downstream was told
the truth about what it was handed.

## Why no existing article catches this

**II.1 (the omnimodal test)** refuses a mechanism that "can only be stated in
terms of a name string, a surface, or a language-specific rule." It catches the
capitalization gate cleanly and correctly. It does not touch the byte
proposal: bytes are not language-specific, they are maximally universal. II.1
would wave it through.

**II.4 (invariance)** — "What survives every text and every host is engine."
Byte statistics survive every text. II.4 would also wave it through.

That is the gap, and it is precise: **the existing tests refuse mechanisms
that are too specific, and have nothing to say about mechanisms that are too
low.** Universality is necessary and not sufficient. A substrate can be
perfectly universal and still carry a prior, and a descent *toward*
universality is exactly where such a prior enters unchallenged — because the
descent is performed in the name of neutrality and reads as a concession
rather than a claim.

**II.5 (two-tier refusal — type error before null)** is the right shape for
what should happen when a required level is absent from the material, but it
says nothing about which level is required, or about how to tell.

**II.12 (the local test)** constrains compute, not structure, and a
byte-n-gram pass is cheap. It has no objection.

## Proposed article

> **II.20 The holonic level test.** *Is this mechanism operating at the
> highest level of structure that still carries the meaning it needs — is that
> level's existence measured in the material rather than assumed — and where
> it counts, is its unit's meaning-density measured rather than presumed
> uniform?*
>
> Structure is a ladder: byte, codepoint, morpheme, word, clause, passage,
> document. A mechanism stands somewhere on it, and standing in the wrong
> place is a defect of the same order as a wrong null. Five consequences:
>
> - **A meaning-bearing operation may not descend below the level where
>   meaning appears.** Descending does not remove an assumption — it trades a
>   visible assumption for the substrate's own, and the substrate's is worse
>   precisely because nothing in it looks like a rule anyone chose. Refused
>   most sharply where the descent is justified *as* neutrality, since that is
>   the justification under which an unmeasured prior travels furthest.
> - **The level belongs to the operation, not to the system.** Addressing
>   asserts no meaning and may go as low as the storage does; a byte-addressed
>   span is not this article's concern, and Field is right to be one. This
>   article governs operations that assert something about what the material
>   means.
> - **Whether a level exists is measured in the material, never assumed.**
>   "Word" is not a universal, and neither is "cased character." A mechanism
>   that requires a level must test the material for it rather than inherit it
>   from the language its author wrote in.
> - **An absent level is a typed gap, never a silent fall to the next rung
>   down.** II.5 already governs the refusal's shape; this names when it
>   fires. A mechanism that quietly substitutes a lower level when its own is
>   missing reports a number about the substitution and calls it a number
>   about the material.
> - **No unit is neutral, so a unit is declared, never assumed.** A quantity
>   denominated in a unit — a budget, a window, a threshold, a cost — hands
>   out capacity at whatever rate that unit carries meaning in the material,
>   and that rate is not constant. Characters and bytes are biased by
>   comparable magnitudes in opposite directions over identical content, so
>   "we counted in bytes because bytes are universal" is not a neutrality
>   claim and is refused as one. A mechanism that counts must either normalize
>   against meaning-density measured in the material at hand, or declare the
>   unit and carry its bias openly. What it may not do is present a unit as
>   having no bias because it has no opinion.
>
> The failure this last consequence guards against is the one worth naming
> twice: a unit's bias is not experienced as a bias. It is spent downstream as
> capacity — a budget filled sooner, a window that holds less, a fold that
> crowds out — and every mechanism downstream reports the shortfall
> faithfully, because each was told the truth about what it received. The
> distortion is therefore invisible at every layer that could report it, and
> arrives at the reader as a finding about their own material.

## Proposed enforcement

Two required booleans on any claim whose mechanism reads structure out of
material — a tokenizer, a segmenter, a claim detector, a frequency model, any
statistic over units it did not receive as units.

`grain_assumed_not_measured: boolean` — `true` means the mechanism requires a
structural level (word, sentence, cased character, token) and takes its
existence for granted rather than testing the material for it. `true` is
refused in every tier.

`descends_below_meaning: boolean` — `true` means a meaning-bearing operation
runs at a level lower than the lowest level that carries meaning in the
material at hand, and the descent is defended as neutrality or universality.
`true` is refused in every tier. Not required on claims whose operation is
addressing or storage only — an offset makes no meaning claim and this article
does not reach it.

A third boolean, required on any claim whose mechanism holds a budget, window,
threshold or cost denominated in a unit — which is a wider set than the two
above, and catches allocation rather than perception:

`unit_density_assumed_uniform: boolean` — `true` means the mechanism counts in
a unit (characters, bytes, tokens, words) and treats that unit as carrying
meaning at a constant rate across material, without either normalizing against
a measured density or declaring the unit's bias. `true` is refused in every
tier. Declaring the bias is a sufficient discharge: a mechanism that says "this
budget is in characters and therefore favours dense scripts" is honest and
passes, on the same footing II.6 already gives a disclosed reading over a
surrogate presented as the source.

## Proposed amendment-log entry (IV.6)

> - **15th — The holonic level test (II.20).** A mechanism is refused for
>   standing at the wrong rung of the structural ladder, in either direction.
>   Too high: assuming a level exists — "word", "cased character" — that the
>   material does not have, which II.1 already catches when the assumption is
>   named as a language rule and misses when it is not. Too low: descending
>   beneath the level where meaning lives in order to escape the assumption,
>   which II.1 and II.4 both approve because bytes are universal and invariant,
>   and which measured 3x biased anyway — UTF-8's variable width is a
>   Latin-favoring prior wearing universality's clothes. Universality is
>   necessary and not sufficient. The level belongs to the operation, not the
>   system: addressing may go as low as storage does, and Field is right to be
>   byte-addressed. The general case is that no unit is neutral — over one
>   document in nine languages, a budget in characters spreads 2.91x favouring
>   Korean and the same budget in bytes spreads 2.96x favouring English — so a
>   unit is declared or normalized, never presented as unbiased because it has
>   no opinion. A unit's bias is spent downstream as capacity and reported
>   faithfully by every layer beneath it, which is why it reaches the reader as
>   a finding about their own material rather than as a defect. Enforced as
>   `grain_assumed_not_measured` and `descends_below_meaning` on every claim
>   whose mechanism reads structure out of material, and
>   `unit_density_assumed_uniform` on every claim whose mechanism holds a
>   budget, window, threshold or cost; `true` on any of the three is refused in
>   every tier.

## What it would have caught

- The capitalization gate, at the point it was written — `grain_assumed_not_measured`,
  since `\p{Lu}` and whitespace-splitting are both levels assumed rather than
  measured. II.1 catches this too; II.20 catches it one step earlier, before
  the rule has to be recognized as being *about language* at all.
- The byte-descent repair, before it was built — `descends_below_meaning`,
  which no current article reaches.
- The nine-language fixture's own first version, which included Chinese,
  Japanese and Thai and reported Japanese at 233 atoms/1k. That figure was a
  denominator artifact and would have been published as a finding. The article
  names why it was wrong: atoms-per-word is not a quantity that exists for an
  unspaced script, so the measurement stood on a rung that language does not
  have.
- `eo-gate.ts`'s `countTokens` — `unit_density_assumed_uniform`, at the line it
  was written. It is denominated in characters, approximates a quantity that
  tracks bytes, and its comment calls it "a rough ceiling, good enough to
  budget against," which is true for the language it was calibrated in and
  untrue by roughly 3x for Hindi. Nothing in the current articles asks whether
  a ceiling is equally rough for everyone.

## Open question, recorded rather than settled

**Where is the floor for an unspaced script?** Codepoints are neutral where
bytes are not — a codepoint is one character regardless of how many bytes
encode it — but they are not uniformly meaningful either: a Han character is
close to a morpheme, a Thai character is not close to anything. So "descend to
codepoints" is better than "descend to bytes" and is still not the answer.

The known unsupervised technique is branching entropy — a boundary is where
the next-unit entropy spikes, which derives segmentation from the material
instead of assuming it, and is the same "statistics from the material itself"
discipline the engine's stage-1 perception already uses. It is not implemented
in either repo and is named here so the next pass does not mistake this
article for a claim that the measurement problem is solved. II.20 says the
level must be measured. It does not say how, and it should not be read as
though it did.
