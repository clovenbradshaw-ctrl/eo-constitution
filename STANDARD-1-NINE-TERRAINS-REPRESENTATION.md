# Standard 1 — the nine terrains as the nine representations of data

**Status: RATIFIED, 2026-08-14, by direction of the project owner.**

This is **not** an Article II amendment and is deliberately not numbered
into the `AMENDMENT-N-PROPOSAL.md` sequence or `CONSTITUTION.md`'s IV.6
amendment log. Article IV.1 requires an amendment to update the enforcement
tests in the same change ("an amendment that cannot be expressed as a
changed failing test is not an amendment, it is an exception"). This
standard proposes no routing test, touches no defect-named boolean in
`assay/classify.js`, and changes no `claims/*.claim.json` shape. It is a
representation standard — how data is shown, not how an organ is routed to
engine/priors/app — filed here because `eo-constitution` is the lineage-wide
governing record and this is a lineage-wide standard, not because it fits
the amendment machinery. If a future change wants to fold it into Article II
(for instance, a routing test that refuses a surface claiming a terrain it
isn't built to hold), that is a separate proposal against this one.

## What's ratified

The full standard lives in `eoreader6/12-nine-terrains-as-representation-standard.md`
(companion note in `eoreader6/CUBE.md`, under "Representation standard").
Summary: every representation of data has one native terrain — the Site-face
cell (`domain × grain`) its structure is built to hold — and the catalog of
native terrains is closed at nine, the same nine `packages/engine/operators.js`
already freezes as `TERRAIN_BY_DOMAIN`. A spreadsheet row is Entity; an EKG
strip is Atmosphere; a legend is Paradigm. Composites (dashboards) are
unions of atoms, not a tenth thing.

## The one open question this ratification does not close

The proposal as drafted named the third domain "Significance" and treated
"Interpretation" as an informal label being retired. Checked against running
code at ratification: `operators.js` freezes `DOMAINS = ["Existence",
"Structure", "Interpretation"]` — literal, load-bearing, keyed into
`TERRAIN_BY_DOMAIN`, read by every `cellOf()` call — and `SEED.md` has a
numbered section titled around the word. That is engine canon (Article I.1),
not informal usage. "Significance" is what the `writing-code-in-eo` skill
uses throughout, and that document is self-marked "Version 0.2 (proposal)."
`eoreader6/CUBE.md` already flagged the two names as the same axis without
resolving it. This standard keeps both, explicitly as aliases, one per tier:
**Interpretation** in the engine, **Significance** in the application layer.
Unifying them lineage-wide — a rename touching a frozen constant and roughly
sixteen call sites in `operators.js`/`SEED.md` — is not decided here and
would need its own proposal.

## Where this is wired

- `eoreader6/12-nine-terrains-as-representation-standard.md` — the full
  standard: the grid, the nine canonical surfaces, the Type A/B connections,
  the corollary laws, external validation, honest gaps.
- `eoreader6/CUBE.md` — companion pointer + the Significance/Interpretation
  alias note, tied to the sentence in CUBE.md that already anticipated this.
- `writing-code-in-eo` SKILL.md, Layer 2 — the per-terrain glosses enriched
  with canonical surface / family / blind-to, alongside the existing Site
  face table (unchanged axis name: Significance).

No `claims/*.claim.json` is filed alongside this standard — it is not a
placement claim about a code organ, and the existing `terrain-stance-engine`,
`terrain-stance-app`, and `unfoldable-terrain` claims are unaffected by it.
