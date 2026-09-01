# Findings

Real, dated defect reports — distinct from `claims/`, which holds placement-
routing TEST FIXTURES the assay (`assay/classify.js`) actually scores against
`expect: pass`/`refute`. A finding here answers a different question ("is
something wrong, and where") than a claim in `claims/` answers ("does this
material belong in this domain") — the two were briefly conflated on
2026-09-01 (three finding-shaped files were filed as `*.claim.json`, which
`conformance/assay.test.js` globs and runs through `classify.js`, and failed
its own suite immediately: none of the three describe a placement question,
so none of their hand-set `evidence` booleans could ever trip a real
classify.js rule). Moved here the same day, once found.

**One stale citation, disclosed rather than silently fixed:** the 18th
amendment's own SEALED text (`CONSTITUTION.md`, `AMENDMENT-SEALS.json`)
names `claims/blank-furniture-sentence-drift.claim.json` as its companion
finding. That file now lives here, as
`findings/blank-furniture-sentence-drift.finding.json`. The amendment's own
prose is frozen by the seal mechanism (III.4/IV.6's own despot,
`assay/seal.mjs`) and is not edited to fix this — the same discipline that
makes tampering detectable also means a stale pointer inside already-sealed
text stays exactly as written, corrected only by a note like this one,
never by rewriting the law.

Findings are not sealed. Update one in place when its status changes
(closed, superseded, still open) — a `status` field appended, the original
`what` left as the record of what was actually found.
