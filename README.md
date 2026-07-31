# eo-constitution

The amendable constitution and routing oracle for the EOReader lineage.

`CONSTITUTION.md` is the one governing document. It decides which of the four
domains anything ships into — engine (`eoreader6`), priors (`eoPriors`),
applications (thin hosts), or legacy (`eoreader5`, `eoreader4.2`). The oracle
in `oracle/` is its enforcement: a placement claim that does not pass the
articles does not ship.

## The metric, in one line

**Prior? → App? → what remains is engine.** Ask in that order, by the three
tests:

- **II.1 Omnimodal** — would a leitmotif in a symphony have this problem? A
  mechanism that needs a name string or a surface is not engine.
- **II.2 Giver** — knowledge about the material is priors and must name its
  giver. Missing giver is a wall: typed gap, never derive.
- **II.3 Host** — knowledge about the reader, host, moment, or interface is
  app: clock, I/O, routing, persistence, UX.

## Using the oracle

```bash
npm test                                          # the constitution's own conformance
npm run route -- check claims/<claim>.json        # verify a placement claim (hard gate)
npm run route -- ask  <evidence>.json             # classify evidence, get the routed tier
```

`check` is the gate: exit 0 = PLACEMENT SUSTAINED, exit 1 = PLACEMENT REFUTED
(gap, wait, or wrong tier), each with the articles cited. Wire it into a
pre-commit hook or CI to make a misplacement fail the build.

### Claim shape

```json
{
  "claim_id": "slug",
  "what": "human description",
  "proposed_placement": "engine | priors | app",
  "evidence": {
    "needs_name_or_surface": false,
    "is_material_knowledge": true,
    "giver": "who gives it",
    "is_host_knowledge": false,
    "medium_agnostic": true,
    "host_dependencies": [],
    "level_test": "above"
  }
}
```

`level_test` is only for engine organs (IV.3 growth rule). `ask` accepts a
bare evidence object or a full claim.

## The workflow, as we iterate

1. Something new appears — an organ, an injection, a host feature.
2. Write a claim (`claims/*.claim.json`) proposing its placement.
3. `npm run route -- check claims/<claim>.json` — sustained or refuted, with
   citations.
4. The claim file travels with the code change. Conformance reruns on every
   test run; a refuted placement is a failing build.

The `claims/` directory is the accumulated case law: every ruling recorded
here is a precedent the next iteration can cite.

## Amendment

The constitution is amendable (Article IV). An amendment edits
`CONSTITUTION.md` **and** updates the enforcement in the same change — the
conformance tests or the classification engine. Amendments change the test,
visibly. The oracle proposes and checks; it never amends.

## Domain map

| domain | repo | holds |
|---|---|---|
| engine | `eoreader6` | the measurement: the one operation, re-earned organs |
| priors | `eoPriors` | the ground: witness knowledge, gifts that name their giver |
| apps | `eoreader-chat`, `eoreader-proxy`, `eoreaderapp`, `eoreader-mcp` | thin hosts: clock, I/O, routing, UX, session |
| legacy | `eoreader5`, `eoreader4.2` | frozen reference and measured dead ends — trusted, never ported from |
