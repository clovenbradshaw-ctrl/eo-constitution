# Proposed 14th amendment — the ledger completeness test (II.19)

**Status: DRAFT PROPOSAL. Not applied, not yet human-reviewed.** IV.2 — the
assay proposes and checks, it never amends; amendment is a human act. This
document is an agent's drafting of a defect caught live, in a single working
session, wiring `eoreader6`'s event_log/lens/reading substrate into
`eoWebLLM`'s reading pipeline (`app/client/reading-pipeline.js`,
`app/client/eo-binary/modifier-order-revision.js`,
`app/client/eo-binary/event_log.js`) — not a conversion of a prior item from
another document, same footing as Amendments 12 and 13.

---

## The defect

A reading pipeline was built around a real, append-only `event_log`
(`createLog`/`tick`/`asOf`) and a projection layer (`lens.js`/`reading.js`)
that reads it at a named cursor — II.17's own shape, correctly applied. The
ledger itself, though, was not complete. Two omissions, found in the same
session, both silent, both defended at write time by a plausible-sounding
reason:

**First — a refused act left no trace in the ledger.** When a tagger found a
modifier stack in an inverted order (e.g. real text reading "the black fat
cat" — color before quality, backwards for English), `toEvents` correctly
refused to mint a narrowing event for it. But the refusal itself was only
ever collected into a transient, in-memory `refused` array returned
alongside the reading — never ticked into `log`. Once the ledger, not the
function's return value, became the thing persisted across a session
(loaded back for a later re-read), a refusal that had genuinely happened —
the system encountered this text, attempted to place it, and declined —
became unrecoverable. Nothing in the log said it had ever occurred.

**Second — an act that changed nothing was treated as no act at all.** When
a source was re-read and a fresh tag agreed with what the ledger already
held for the same node, the first implementation ticked nothing: the
reasoning was that agreement is "perceived, and therefore not testimony" —
an existing distinction this lineage already uses for a different purpose
(`nul.js`'s `made_no_difference` gap, correctly refusing to count a
non-finding as a *finding*). Applied to the ledger's own write path, the
same reasoning produced a ledger that could not answer "was this node ever
re-checked, and when" — every confirming check vanished the instant it
happened, leaving only the single original tick, indistinguishable from a
node nobody had ever looked at again.

Both omissions share one shape: a write path decided, at write time, that a
given act was not worth recording — because it failed, or because it did
not change anything — and every such decision is invisible from outside the
mechanism. A caller holding only the ledger cannot tell "this never
happened" from "this happened and was judged uninteresting." The fix in
both cases was the same: tick a real event for the act (`SEG.refuse` for a
refusal, `SEG.confirm` for an agreeing re-check, `SEG.revise` for a
disagreeing one — the last following `eoreader6`'s own
`emergence/voice.js::reviseVoice` precedent: *"not an edit — a later event
that supersedes an earlier one, so the original claim and the correction
both stay in the log and the change is auditable"*) and move the *filtering*
of what matters to the projection layer, which already has a name for that
job and already disciplines it (II.17).

## Why no existing article catches this

- **II.17 (the lens fidelity test)** is the nearest sibling and the
  necessary complement, not a substitute. II.17 governs the READ side: a
  projection over the log must disclose what it selects and discards, and
  must name its cursor. This defect is upstream of that — it is about what
  enters the log in the first place, before any lens runs. A lens can
  honestly report every type it discarded (`readLens`'s own
  `discardedTypes`, which is precisely how `SEG.refuse`/`SEG.confirm` now
  surface to a caller reading through a narrower lens) and still be reading
  a log that never received the event in the first place — II.17's
  discipline is powerless against an omission that happened before the log
  existed to be read.
- **II.9 (the revision test)** is close by name — "revision" is in both
  titles — but governs a different question: whether a mechanism scoring
  *significance* conflates mere arrival with witnessed change, for the
  purpose of deciding what counts as a finding. This article is not about
  scoring significance; it is about whether an act gets committed to the
  record AT ALL, before any significance judgment is made about it. II.9's
  own "a cheap sense organ nominates, it never decides" is the adjacent
  right instinct applied to a different consumer — a nomination-vs-verdict
  split for measurement, not a record-vs-omit split for a ledger's write
  path.
- **II.8 (the difference test)**'s "no averaging of grounds... a
  re-projection belongs to the reader" is the nearest structural cousin —
  both refuse a mechanism collapsing information *before* handing it
  onward, reserving that collapse for the reader/projection instead. II.8
  names this for the engine's own measurement (never attend, never
  average); this article names the same principle for what a ledger keeps
  versus what it silently drops before the projection layer II.17 already
  governs ever gets a chance to select from it.
- **Nothing existing** asks the question this article asks directly: when
  a mechanism's own record of what it did is itself a selection — an act
  ticked only if it succeeded, or only if it changed something — is that
  selection disclosed and separated from the ledger (as a later projection,
  II.17-shaped), or is it silently baked into the ledger's own write path,
  where no downstream reader, however careful, can recover what never
  arrived.

## Proposed article

> **II.19 The ledger completeness test.** *Does every act a mechanism takes
> get committed to its own record, or only the acts judged interesting —
> successful, or change-making — at write time?*
>
> A ledger is not refused for being read through a lens that selects; II.17
> already settles that a projection selects and must disclose it. This
> article governs the seam before any lens runs: the ledger itself, at the
> moment an act is written. Three consequences:
>
> - **Refusal is not silence.** A mechanism that examines material and
>   declines to place it has taken a real act — the declining — and that
>   act belongs in the record with the same standing as a successful
>   placement, not folded into a side channel a caller must remember to
>   also consult and that a persisted ledger will not carry forward.
> - **Confirmation is not silence.** A re-check that agrees with the
>   ledger's own prior record is still a witnessed act — proof the record
>   was re-examined and held — and a ledger that only ever grows on
>   disagreement cannot distinguish "never re-checked" from "re-checked and
>   confirmed." Filtering a confirmation OUT of what a reader sees is
>   II.17's job, done at the projection, never the ledger's own job, done by
>   omission at the write.
> - **Never an edit, always an append.** A later act that disagrees with
>   what the ledger already holds for the same subject does not overwrite
>   the prior entry — it appends a new entry that names what it supersedes,
>   so both the original claim and the correction stay in the record and
>   the disagreement itself is auditable, per the precedent this lineage
>   already sets in `emergence/voice.js::reviseVoice`.
>
> The projection layer (II.17) is where "what does this ledger currently
> say" gets computed — by folding the append-only trail to its latest state
> per subject. That fold is a reading's job, done at the seam II.17 already
> disciplines, never the ledger's own job, done silently at the point of
> writing.

## Proposed enforcement

Closer to II.17's shape than II.14's: a required boolean on any claim whose
mechanism maintains an append-only record (an event log, a session trail, an
audit history) as part of its own state.

`ledger_omits_uneventful_acts: boolean` — `true` means the mechanism's
write path decides, per-act, whether to commit an act to the record based on
whether it succeeded or changed something, rather than committing every act
and leaving significance filtering to a later, disclosed projection. `true`
on such a claim is refused in every tier.

`ledger_edits_in_place: boolean` — `true` means a later act that disagrees
with an existing entry mutates or removes that entry instead of appending a
new one that names what it supersedes. `true` on such a claim is refused in
every tier.

## Proposed amendment-log entry (IV.6)

> - **14th — The ledger completeness test (II.19).** A ledger is not
>   refused for being read through a selecting lens — II.17 already settles
>   that — but is refused for silently deciding, at the point of writing,
>   that a refused or unchanged act is not worth recording. Refusal and
>   confirmation are both witnessed acts and belong in the record with the
>   same standing as a successful, change-making one; filtering what
>   matters is the projection layer's job (II.17), never the ledger's own,
>   done by omission at write time. A later disagreeing act never edits a
>   prior entry — it appends a new one naming what it supersedes
>   (`emergence/voice.js::reviseVoice`'s precedent). Enforced as
>   `ledger_omits_uneventful_acts` and `ledger_edits_in_place`, both
>   required on every claim whose mechanism maintains an append-only
>   record; `true` on either is refused in every tier.

## What it would have caught

`app/client/reading-pipeline.js`'s original `buildReading` would have
needed to name, before shipping, that its write path ticked a `SEG.narrow`
event only on a successful, order-stable stack — with a refused stack's
existence surviving nowhere but a same-call-only return value — which is
exactly the fact that was true, visible in the code, and undisclosed.
`modifier-order-revision.js`'s first draft (`resolveAgainstLedger`'s
`"noop"` branch, ticking nothing on agreement) would equally have needed to
name that its write path silently dropped every confirming re-check. Naming
either would not by itself have produced the fix, but a claim carrying
`ledger_omits_uneventful_acts: true` being refused in every tier would have
forced `SEG.refuse` and `SEG.confirm` into existence at write time, rather
than leaving both to ship as a fully cursor-disciplined, fully II.17-honest
projection layer sitting on top of a ledger that had already, silently,
decided what was worth remembering.

## Open question, recorded rather than settled

II.19 as proposed applies to "a mechanism that maintains an append-only
record" — but most organs in this lineage do not currently model their own
history as an event log at all; they compute a result and return it,
stateless, per II.4's own invariance shape. Does this article apply only to
mechanisms that have already chosen to be ledger-shaped (as `event_log.js`
is, by design, for exactly the reason a re-readable, revisable ledger was
wanted here) — leaving stateless organs untouched — or does it imply that
*any* organ whose output can meaningfully change between two calls over
related input (a re-read, a re-measurement) OUGHT to be ledger-shaped in
the first place, with statelessness itself becoming the thing that needs a
disclosed exemption? The narrower reading is the one this proposal argues
for directly; the broader reading is a live question this session's own
work does not settle, the same way Amendment 12 recorded its own open
question rather than closing it.
