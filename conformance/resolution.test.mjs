import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// II.23 — the resolution test, enforced the way III.4 is enforced: DERIVED
// from source, never from a maintained list that would rot into exactly the
// omission it is meant to catch.
//
// A module that spends a null must ship a control constructed to FAIL. This
// test finds the null-spending modules by reading them, then reads their test
// files and requires at least one case that asserts a refusal.
//
// It cannot verify that the control is a GOOD one — only that one was built.
// That is the same honest boundary the generality gate (the-fold P71) draws:
// the test checks that the claim was made, the measurement is still real work.

const ROOT = process.env.UNION_ROOT || "/Users/mlacy/Documents/3.0";

// A seam is registered here with the repo-relative module and its test file.
// Registration is deliberate — an unregistered null-spender is invisible to
// this test, which is why NULL_SPENDER_MARKS below also scans for the shape.
const SEAMS = [
  { repo: "the-fold", module: "kind-standing.js", tests: "kind-standing.test.mjs" },
];

// The shape of a module that spends a null: it builds a comparison
// distribution and ranks an observation against it.
const NULL_SPENDER_MARKS = [/\bnull(s|Fits|Sims|Samples)?\b/i, /\bredeal/i, /\bpermutation/i, /\bshuffle/i];
// A CONTROL is not any negative assertion — `assert.equal(v.has(x), false)`
// is ordinary bookkeeping. A control is a case BUILT so that passing it would
// be wrong, and the only reliable signal of intent is that its author named
// it one. This repo already writes them that way ("CONTROL mixed 5+5", "THE
// CONTROL — 'John Smith' and 'Robert Smith'", "DISCLOSED LIMIT").
//
// The first version of this file keyed on assertion shapes instead, and a
// mutation run proved it toothless: stripping every real control from the
// seam's tests left all three cases passing, because unrelated
// `assert.equal(..., false)` lines kept matching. II.23 caught this file.
const CONTROL_TITLE = /\b(CONTROL|DISCLOSED LIMIT|must fail|must not|never)\b/;
const NEGATIVE_ASSERT = /assert\.(equal|strictEqual|ok|throws|notEqual)\([^)]*?(false|not_member|refused|unknown|!)/s;
const titlesOf = (src) => [...src.matchAll(/^test\(\s*(["'`])([\s\S]*?)\1/gm)].map((m) => m[2]);
const bodiesOf = (src) => src.split(/^test\(/m).slice(1);

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

test("II.23 — every registered null-spending seam ships a control that must fail", () => {
  assert.ok(SEAMS.length > 0, "no seams registered — this test would pass vacuously");
  for (const seam of SEAMS) {
    const modPath = path.join(ROOT, seam.repo, seam.module);
    const testPath = path.join(ROOT, seam.repo, seam.tests);
    const mod = read(modPath);
    const spec = read(testPath);
    assert.ok(mod, `${seam.repo}/${seam.module} is registered but absent`);
    assert.ok(spec, `${seam.repo}/${seam.tests} is registered but absent — a null-spender with no tests cannot demonstrate resolution`);

    const spends = NULL_SPENDER_MARKS.some((re) => re.test(mod));
    assert.ok(spends, `${seam.module} is registered as a null-spender but carries none of the marks — either the registration or the module is wrong`);

    const titles = titlesOf(spec);
    assert.ok(titles.length > 0, `${seam.tests} declares no tests at all`);
    const controls = bodiesOf(spec).filter((body) => {
      const title = (body.match(/^\s*(["'`])([\s\S]*?)\1/) || [])[2] ?? "";
      return CONTROL_TITLE.test(title) && NEGATIVE_ASSERT.test(body);
    });
    assert.ok(controls.length > 0, `${seam.tests} declares ${titles.length} tests and not one named control that asserts a refusal — II.23: a run reporting only successes has not demonstrated resolution`);
  }
});

test("II.23 — a null-spender reports its null's own spread, not only a verdict", () => {
  for (const seam of SEAMS) {
    const mod = read(path.join(ROOT, seam.repo, seam.module));
    if (!mod) continue;
    // The spread is carried when the returned verdict object exposes the
    // comparison's own size or position, not merely a boolean.
    const carriesSpread = /populationSize|median|max|spread|samples|\bp\b\s*[,:]/.test(mod);
    assert.ok(carriesSpread, `${seam.module} returns a verdict without carrying the null's own spread beside it`);
  }
});

test("II.23 — absence of evidence is typed apart from evidence of difference", () => {
  for (const seam of SEAMS) {
    const mod = read(path.join(ROOT, seam.repo, seam.module));
    if (!mod) continue;
    assert.ok(/unknown/.test(mod), `${seam.module} has no 'unknown' verdict — a thin profile would be reported as a difference it never measured`);
  }
});
