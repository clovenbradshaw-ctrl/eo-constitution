// composition.test.mjs — Article III.4, enforced: a composition names every
// organ its consumer accepts.
//
// THE FOUNDING FAILURE THIS EXISTS TO MAKE IMPOSSIBLE (2026-09-01). A survey
// found live_priors' corpus recipe (scripts/eot-digest.mjs) passing eleven of
// the twenty-five organs the-fold's `hypergraph.js::makeRelationReader`
// accepts, omitting the rest with no record anywhere that they were omitted.
// No article in CONSTITUTION.md as it stood was violated: eoreader offered
// the organ, the-fold accepted it, live_priors simply never passed it. Each
// member was individually compliant and the composition was silently
// degraded across 2,208 stored readings. Article III.3 already states the
// value-level version of this rule ("a missing prior is a typed gap, never a
// silently wrong number") — this is that rule at the ORGAN level, where no
// article previously reached.
//
// A rule that lives only in prose is a rule that failed here already, so
// this test DERIVES both sides rather than trusting either to be listed
// honestly:
//
//   accepted  — parsed from the consumer's own destructuring, so adding an
//               organ to a reader extends this audit with no edit here
//               (the-fold's own page-graph.mjs precedent: "the scan set is
//               derived, not listed", after a hand-typed one went stale by
//               thirteen modules).
//   passed    — parsed from the composition's own call site.
//   declared  — read from the composition's own UNION_OMITTED list, which
//               MUST name a reason for each entry (a bare name is not a
//               declaration — see verifyDeclarations below).
//
// An organ neither passed nor declared-omitted is an UNDECLARED OMISSION —
// the Union does not decide what a member injects (that stays each member's
// own act, per IV.2: the assay proposes and checks, it never amends); it
// decides only that silence about it is never permitted.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// eo-constitution is reached here via a symlink whose target sits outside
// the member checkouts (`Documents/New Project/eo-constitution` ->
// `Documents/3.0/eo-constitution`), so walking up from import.meta.dirname
// resolves to the WRONG sibling directory. UNION_ROOT is declared —
// overridable by env for a differently-laid-out checkout — never derived
// from this file's own symlinked position.
const ROOT = process.env.UNION_ROOT || "/Users/mlacy/Documents/3.0";

/**
 * Each row: { name, consumerPath, consumerFn, compositionPath, calleeName }.
 * The Union's member seams, named once here rather than re-derived per test —
 * add a row when a new composition crosses a new consumer, never a new file.
 */
export const SEAMS = [
  {
    name: "live_priors corpus digest → the-fold relation reader",
    consumerPath: path.join(ROOT, "the-fold", "hypergraph.js"),
    consumerFn: "makeRelationReader",
    compositionPath: path.join(ROOT, "live_priors", "scripts", "eot-digest.mjs"),
    calleeName: "makeRelationReader",
  },
];

/** The organs a consumer accepts, read off its own destructuring. */
export function acceptedOrgans(src, fnName) {
  const at = src.indexOf(`export function ${fnName}(`);
  if (at === -1) throw new Error(`${fnName} not found — the Union cannot audit a seam it cannot locate`);
  const open = src.indexOf("{", src.indexOf("const {", at));
  const close = src.indexOf("} = organs;", open);
  if (open === -1 || close === -1) throw new Error(`${fnName} does not destructure an organs object at its own top — the parser's assumption, not the consumer, needs revisiting`);
  const body = src.slice(open + 1, close);
  const names = new Set();
  for (const line of body.split("\n")) {
    const bare = line.replace(/\/\/.*$/, "").trim();
    if (!bare) continue;
    const m = /^([A-Za-z_$][\w$]*)\s*(?::|=|,|$)/.exec(bare);
    if (m) names.add(m[1]);
  }
  for (const m of src.slice(at).matchAll(/organs\.([A-Za-z_$][\w$]*)/g)) names.add(m[1]);
  return names;
}

/** The organs a composition passes, read off its own call site. */
export function passedOrgans(src, callee) {
  const at = src.indexOf(`${callee}({`);
  if (at === -1) throw new Error(`${callee} is never called in this composition — nothing to audit`);
  let depth = 0, end = at;
  for (let i = src.indexOf("{", at); i < src.length; i += 1) {
    if (src[i] === "{") depth += 1;
    else if (src[i] === "}") { depth -= 1; if (depth === 0) { end = i; break; } }
  }
  const body = src.slice(src.indexOf("{", at) + 1, end);
  const names = new Set();
  for (const line of body.split("\n")) {
    const bare = line.replace(/\/\/.*$/, "").trim();
    if (!bare) continue;
    const m = /^([A-Za-z_$][\w$]*)\s*(?::|,|$)/.exec(bare);
    if (m) names.add(m[1]);
  }
  return names;
}

/**
 * A composition's declared omissions, in the Union's own form:
 *
 *   const UNION_OMITTED = {
 *     blankFurniture: "real bug found 2026-09-01 — sentence-count pairing " +
 *       "fails on real material; see eo-constitution/claims/....json",
 *     morphologyIndex: "no organ on this shape exists on any engine path today",
 *   };
 *
 * A bare array (["blankFurniture"], no reason) is REFUSED — Article III.3's
 * own rule is that the gap travels WITH its reason, not as a name alone.
 */
export function declaredOmissions(src) {
  const m = /UNION_OMITTED\s*=\s*(\{[\s\S]*?\n\s*\});/.exec(src);
  if (!m) return { map: new Map(), malformed: false };
  try {
    // eslint-disable-next-line no-new-func -- reading a literal object out of trusted source text, never executed
    const obj = new Function(`return (${m[1]});`)();
    const map = new Map();
    let malformed = false;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v !== "string" || !v.trim()) malformed = true;
      map.set(k, v);
    }
    return { map, malformed };
  } catch {
    return { map: new Map(), malformed: true };
  }
}

for (const seam of SEAMS) {
  test(`III.4 — ${seam.name}: every accepted organ is passed or declared-omitted with a reason`, () => {
    const consumer = fs.readFileSync(seam.consumerPath, "utf8");
    const composition = fs.readFileSync(seam.compositionPath, "utf8");
    const accepted = acceptedOrgans(consumer, seam.consumerFn);
    const passed = passedOrgans(composition, seam.calleeName);
    const { map: declared, malformed } = declaredOmissions(composition);

    assert.ok(accepted.size > 0, "accepted set derived empty — the parser is at fault, not the member");
    assert.ok(!malformed, `UNION_OMITTED entries must each carry a non-empty string reason — a bare name is not a declaration (${path.relative(ROOT, seam.compositionPath)})`);

    const undeclared = [...accepted].filter((o) => !passed.has(o) && !declared.has(o)).sort();
    assert.deepEqual(
      undeclared,
      [],
      `UNDECLARED OMISSIONS at "${seam.name}" (Article III.4):\n` +
        `  ${path.relative(ROOT, seam.consumerPath)}::${seam.consumerFn} accepts ${accepted.size}\n` +
        `  ${path.relative(ROOT, seam.compositionPath)} passes ${passed.size}, declares ${declared.size} omitted with reasons\n` +
        `  undeclared: ${undeclared.join(", ")}\n` +
        `  REMEDY: add each to UNION_OMITTED = { name: "reason" }, or pass it.\n` +
        `  The Union does not require any organ be injected. It requires the silence to end.`,
    );
  });
}

test("III.4 — the audit itself examined something, so a pass is never an absence", () => {
  for (const seam of SEAMS) {
    const composition = fs.readFileSync(seam.compositionPath, "utf8");
    const passed = passedOrgans(composition, seam.calleeName);
    assert.ok(passed.size > 0, `"${seam.name}": zero organs parsed at the call site — a green result here would be a check that never ran`);
  }
});
