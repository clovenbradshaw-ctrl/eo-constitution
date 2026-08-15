# Proposed 14th amendment — the convergent-inference test (II.19)

**Status: APPLIED — entered as the 14th amendment (II.19).** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document files the *etak-claim* spec, drafted against `eo-constitution` @
`f830400`, with the numbering it originally used corrected to the live text:
the spec's "provisionally II.17" is now the lossless fold test (12th
amendment, entered at `e1649e3`), and II.18 is already claimed by the
surf-before-fold test (13th amendment proposal). This is filed as the **14th
amendment — II.19, the convergent-inference test** — plus a proposed
`claims/*.claim.json` subtype for posited, unobserved reference nodes.

The article is entered in `CONSTITUTION.md` (II.19 and amendment-log entry
14th); the enforcement is entered in `assay/classify.js`; the exemplar is
`claims/etak-claim.claim.json`; the conformance suite exercises the new
routing in `conformance/assay.test.js`.

---

## The gap this closes

The ledger currently has two kinds of thing:

- **Stars** — directly sighted, giver-named claims. `coref-descriptor`,
  `embedding-bridge`. You can point at the giver and ask "how do you know."
- **Birds** — giver-free structural signals. `terrain-stance-engine`,
  `surfer-snip-host`. Real, useful, directional, but `is_material_knowledge:
  false` — they never claim to denote anything.

Neither of these is the right shape for a specific, recurring case: a claim
about something **nobody ever sighted**, whose existence and approximate
position is inferred *because* two or more independently-derived signal
channels only make joint sense if it's there. Not "a source told us." Not
"a structural pattern." A posited node.

The canonical case is Neptune. Uranus's orbit didn't match prediction — that's
a star, a direct observation with a residual. Le Verrier and Adams, working
independently, calculated where an unseen mass had to sit to produce exactly
that residual. Neither one *saw* Neptune. The planet's existence was
established entirely by convergent effects across channels that didn't share
a cause, months before Galle's telescope confirmed it. That's the shape of
claim this spec is for: STR status from scraped signals that never directly
observe a rental, "this entity = this entity" from behavioral traces that
never directly observe an identity, "who this name denotes" from usage
patterns that never directly observe a denotation.

Etak, in the wayfinding sense that survives scrutiny (see below): the island
isn't sighted this leg of the voyage, but its position is real, and multiple
independent bearings — a star angle, a swell direction, a bird flight path —
only cohere as readings *of the same thing* if it's where it's posited to be.

## Why no existing article catches this

- **II.2 (the giver test)** is the nearest article and names the wall, not
  this case. A missing giver is "a wall, not a gap-in-waiting: report a typed
  gap, never derive." That is the right verdict for a claim with no
  provenance at all — and the wrong verdict for an etak claim, whose
  provenance is real but convergent rather than sighted. II.2 has no
  vocabulary to distinguish "no one knows" from "two disjoint processes
  jointly imply." An etak claim currently lands in the II.2 wall and stops
  there; this amendment gives that wall a second oracle to ask.
- **II.8 (the difference test)** refuses cheap compatibility — "who a
  surface denotes is a received prior (II.2), never a dot product, overlap,
  or learned similarity over surfaces." That refuses the *entity-match*
  etak built on a learned similarity. But it cannot tell a learned dot
  product from a genuinely convergent, disjoint-channel inference, because
  it has no independence vocabulary — the exact axis II.19 adds. The etak is
  the case where "received, never derived" needs a third option: **converged
  upon**.
- **II.10 (the commensurability test)** disciplines a null against its own
  observation — same spirit as this spec's `fit_improvement` requirement
  (better *because of the posit*, not alongside it). But II.10 governs a
  ground *within* a measurement; the etak's question is whether the posit,
  as an entity, improves joint fit *across* channels that never observed it.
  No single observation exists for II.10 to check the null against.
- **II.6 (book)** and **II.17 (lossless fold)** guard against surrogates and
  altitude content with no ground. An etak claim fabricated from a single
  channel's echo — citogenesis — is exactly "content that exists at altitude
  and nowhere below it." But it is a *priors* claim, not an engine fold, so
  II.17 does not apply to its placement; the wire-copy check has to be a
  precondition of the etak itself, not a downstream article.
- **Nothing existing** asks the question this article asks directly: for a
  material-knowledge claim with no sighting giver, are there two or more
  channels with derivations that do not share a cause, and does the posit
  actually improve joint fit against a without-posit baseline?

## What an etak claim asserts

An etak claim does **not** assert "the referent is X." It asserts:

> Positing entity E at position/value P produces a strictly better joint fit
> across channels {C1, C2, ...Cn} than any model that doesn't posit E — and
> C1...Cn were derived by processes with no shared cause.

This is weaker than a star (no giver directly sighted it) and stronger than
a bird (it's not merely directional — it's a specific, falsifiable positing
that either does or doesn't improve joint fit).

## The independence test — load-bearing, do this first

Before any fit-improvement math is meaningful, each channel must clear:

- **Disjoint derivation.** No two channels may trace to the same training
  corpus, the same upstream scrape, the same institutional source, or the
  same prior claim in the ledger. If channel B is derived from channel A
  (even indirectly — B was trained on a corpus that includes A's outputs),
  B does not count as a second channel. This is the wire-copy/citogenesis
  check from the fact-checking discussion, applied here as a precondition
  rather than an afterthought.
- **Disjoint failure mode.** Ideally the channels should be wrong in
  different ways when wrong — a scrape artifact and a behavioral pattern
  don't share a bug surface the way two scrapes of the same listing do.
  Not required, but strengthens the claim; should be recorded when known.
- **No shared correction.** If a human or upstream process has ever
  "corrected" one channel using the other, they're no longer independent.

A claim that skips this check and goes straight to "these three signals
agree" is not an etak claim — it's the citogenesis failure with better
vocabulary attached. Independence must be argued and recorded, not assumed
from disagreement-free convergence.

## Proposed article

> **II.19 The convergent-inference test.** *Is this knowledge sighted, or is
> it converged upon — and if converged upon, are the channels actually
> disjoint, and does the posit actually improve the fit?*
>
> A claim about the material — who a name denotes, that two words name one
> thing, that a property holds — must name its giver (II.2), unless it names
> no giver because none sighted it and instead supplies a different
> provenance: two or more channels, derived by processes with no shared
> cause, whose joint reading only makes sense if the posited entity is where
> it is posited. A claim routed this way does not assert "the referent is
> X"; it asserts that positing E improves joint fit across disjoint channels
> better than any model that doesn't posit E. Two named consequences:
>
> - **Independence is the provenance, and it is argued, not assumed.** No
>   two channels may trace to the same corpus, upstream scrape,
>   institutional source, prior claim, or correction history; a channel
>   derived from another channel does not count as a second channel. A
>   claim that offers agreement without disjointness is citogenesis with a
>   rank, not convergence.
> - **The fit is measured against a without-posit baseline, or it is not
>   measured at all.** A claim must show the joint fit is better *because of
>   the posit* — a with-posit value and a without-posit value for the same
>   metric — not merely that the posit is present alongside good numbers
>   (II.10's discipline, applied across channels instead of within a
>   measurement).

A claim fails II.19 if:

- fewer than 2 channels are offered, or
- the independence_basis is missing or doesn't survive inspection (shared
  corpus, shared upstream, shared correction history), or
- fit_improvement isn't actually measured against a without-posit baseline
  (this is the same discipline as II.10's null-differs-in-exactly-one-axis —
  you have to show the fit is better *because of the posit*, not just that
  the posit is present alongside good numbers).

## Proposed enforcement

II.19 is a routing precondition on the priors tier, in the same family as
II.2's wall: material knowledge must arrive either with a sighting giver
(II.2) or with a passing convergent-inference case (II.19). Where today a
missing giver is an unconditional `GAP`, the amendment makes the missing
giver **checkable**: the claim names its channels instead, and the assay
applies II.19 before deciding the wall holds.

Three defect-named booleans, in the house style (`true` is the veto):

- `etak_channels_insufficient` — fewer than 2 channels offered. `true` is
  refused in every tier.
- `etak_derivation_shared` — the independence_basis is missing or does not
  survive inspection: any two channels trace to the same corpus, upstream
  source, prior claim, or correction history. `true` is refused in every
  tier.
- `etak_fit_unbaselined` — fit_improvement lacks a measured without-posit
  baseline (only `with_posit`, or a claimed-but-unmeasured improvement).
  `true` is refused in every tier.

Required on every claim that asserts material knowledge without a sighting
giver — i.e., on every `etak_claim`. Routing change to `assay/classify.js`:
for `is_material_knowledge: true, giver: ""`, instead of returning the II.2
gap immediately, first run II.19 on the claim's etak structure; a passing
case routes to priors, a failing case is refused citing II.19, and a claim
with neither giver nor etak structure keeps today's II.2 wall. A claim that
offers both a giver and channels routes as a star (II.2); a confirmed etak
keeps its type with a `confirmation_event` and is never silently reclassified
as a star.

## Proposed ledger schema

An etak claim is a `claims/*.claim.json` like any other — `claim_id`,
`what`, `proposed_placement`, `expect`, `evidence` — carrying a `etak`
block that implements the subtype:

```json
{
  "claim_id": "slug",
  "what": "human description",
  "proposed_placement": "priors",
  "expect": "pass | refute",
  "etak": {
    "posited_entity": "<what is being posited to exist — an identity, a status, a denotation>",
    "channels": [
      {
        "giver": "<named source/process>",
        "signal": "<what this channel actually observed>",
        "derivation": "<how this channel was produced>",
        "independence_basis": "<why this channel's derivation is disjoint from the others'>"
      }
    ],
    "predicted_effect": "<what the posited entity should produce in each channel if real>",
    "fit_improvement": {
      "metric": "<residual reduction / likelihood gain / whatever is measured>",
      "with_posit": "<value>",
      "without_posit": "<value — best model that doesn't posit the entity>"
    },
    "status": "provisional | confirmed | refuted",
    "confirmation_event": "<if status is confirmed, what direct sighting (a star) resolved it — optional, many etak claims never get one>",
    "as_of": "<evidence snapshot the posit is a bearing from, not a frozen verdict — see the wayfinding frame below>"
  },
  "evidence": { "...": "the standard routing evidence" }
}
```

The `posited_entity` is a *relation* to the current evidence state — an
entity-match claim, a status-at-this-moment claim — carried with an explicit
`as_of` snapshot, never a single frozen verdict. Dead reckoning (see below)
is the natural name for the running state between channel updates.

## Proposed amendment-log entry (IV.6)

> - **14th — The convergent-inference test (II.19).** Material knowledge
>   without a sighting giver is not automatically a wall: if the claim names
>   two or more channels whose derivations have no shared cause, and shows
>   the posited entity improves joint fit against a without-posit baseline,
>   it is a real prior established by inference — an etak claim — and routes
>   to priors with a different oracle than II.2's. Independence is argued,
>   never assumed from agreement (a channel derived from another channel is
>   not a second channel; shared corpus, upstream, or correction history is
>   citogenesis, not convergence), and the fit must be measured because of
>   the posit, not alongside it. Enforced as `etak_channels_insufficient`,
>   `etak_derivation_shared`, and `etak_fit_unbaselined`; `true` on any is
>   refused in every tier.

## What it would have caught

The canonical shape is Neptune: convergent calculation before any telescope.
The live shapes this amendment names are the ones the ledger keeps
mis-filing — STR status from scraped signals that never directly observe a
rental; "this entity = this entity" from behavioral traces that never
directly observe an identity; "who this name denotes" from usage patterns
that never directly observe a denotation. Today each one either dies in the
II.2 wall (giver absent, so "a gap, never derive" — the wrong verdict for a
posit a second oracle could check) or sneaks through dressed as a star with a
giver it does not actually have. The exemplar filed with this proposal
(`claims/etak-claim.claim.json`) is the citogenesis shape: two channels
offered, both tracing to the same upstream feed — a claim that fails II.19
for the reason that matters, where II.2 could only say "no giver."

## Why this isn't "standing" or "anchor" (recap, for the record)

Two earlier candidate terms were considered and rejected for this specific
field, for reasons worth keeping attached to the spec so they don't get
re-proposed:

- **Anchor** — too generic. Any fixed correction point for any INS,
  regardless of how it was fixed. Doesn't distinguish a genuinely inferred
  node from a landmark you happened to sight once and are now trusting.
- **Standing** (giver-has-standing) — a *source-reliability* property, not
  a claim shape. It answers "is this giver worth listening to," which is a
  different question from "is this entity's existence actually implied by
  convergent, independent effects." A giver can have impeccable standing
  and still be a star (directly sighted), not an etak (inferred).
- **The anthropological "etak" itself, for the giver-standing job** — this
  was the sharpest miss. Real Carolinian etaks are culturally transmitted,
  taught within one navigation school, trusted by consensus inside that
  lineage rather than independently re-verified each voyage. That's
  structurally the opposite of what this spec needs from the word. What's
  being kept from "etak" is the *unobserved-but-real, established-by-
  convergent-effects* shape — Neptune, not the cultural-transmission
  mechanics of the actual Pacific navigation tradition. Worth being honest
  that the borrowed word is doing selective work, not a full transplant.

## What the broader wayfinding frame gives for free

Once the etak is specifically the *inferred, unsighted, effects-only* node
(not a giver-standing question), several other pieces of the navigation
picture map onto the ledger without extra invention:

- **Dead reckoning = the running prior.** Between fixes, a navigator keeps a
  working estimate of position from speed/heading/time — not zero
  information, not a confirmed fix either. This is exactly `status:
  provisional` with a `fit_improvement` that's been getting better across
  updates but hasn't crossed a confirmation threshold. The ledger already
  has "versioned priors, no-averaging" machinery from the vendor-signal
  work; dead reckoning is the natural name for a provisional etak claim's
  running state between channel updates.

- **The etak moves relative to the canoe, not in absolute space.** The
  navigator doesn't track "island at coordinates X" — they track "bearing to
  island from here, now," which changes every hour even though the island
  hasn't moved. This maps onto why `posited_entity` should usually be
  represented as a *relation* to the current evidence state (an entity-match
  claim, a status-at-this-moment claim) rather than an absolute fact — the
  STR status of a property isn't a fixed truth, it's a bearing that gets
  re-taken as scrape data updates. This argues for storing etak claims with
  an explicit "as-of" evidence snapshot, not a single frozen verdict.

- **Multiple star paths, cross-checked in flight, is the independence
  requirement, not a nice-to-have.** Real navigators don't trust one bearing
  — they hold several star sightings across the night and notice when one
  drifts from the pattern the others describe. This is direct precedent for
  requiring ≥2 disjoint channels before any etak claim is even eligible,
  and for treating a *lone* channel drifting from the rest as a signal to
  re-check that channel, not to distrust the posit.

- **Birds arriving before landfall answers the completion-recognition
  problem for etak claims specifically.** A claim doesn't need to reach
  `confirmed` to be useful — the *trend* in fit_improvement across successive
  channel updates (residual shrinking, independent channels converging
  faster than chance) is itself informative and arrives before any direct
  sighting would. This is the same mechanism from the earlier task-generation
  discussion (side-signals substituting for goal-verification), now given a
  concrete metric: watch `fit_improvement` trend, not just its current value.

- **A confirmed etak doesn't retroactively become a star.** Neptune, once
  seen through Galle's telescope, became a star claim in its own right — but
  the original inference that found it stays correctly typed as an etak
  claim with a `confirmation_event`, not silently reclassified as if it had
  been sighted all along. This matters for the ledger's audit trail: it
  should always be possible to see that a now-confirmed fact was originally
  established by inference, because that's the information a future,
  similar-shaped claim needs to calibrate how much to trust convergent
  inference in this domain going forward.

## Open question, recorded rather than settled

How much fit-improvement is enough to move a claim from `provisional` to
`confirmed` without a direct sighting ever occurring? Real navigators do
commit to landfall from dead reckoning plus converging bearings alone, no
telescope required — Neptune's mathematical prediction was trusted (correctly)
before Galle looked. But this threshold is exactly the kind of thing Draft
Amendment 10 (validation discipline, II.15) warns is dangerous to set once
and reuse — "the verifier is exactly as fallible as what it verifies." This
spec deliberately leaves the confirmation threshold unset; it should be
argued per-domain the way II.15 asks, not hard-coded here.
