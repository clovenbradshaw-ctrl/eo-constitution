import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// III.5 — a gate that can run dark asserts its ground where the ground is
// committed. Enforcement in III.4's registered-seam shape: each row names a
// composition that carries a degraded-mode flag, and the test file that
// asserts the gate LIT. Registration is the disclosed weak link, exactly as
// resolution.test.mjs already says of its own registry — an unregistered
// dark gate is invisible here, which is why the flag itself must also be
// data the composition reports (the article's second consequence).

const ROOT = process.env.UNION_ROOT || "/Users/mlacy/Documents/3.0";

const GATES = [
  {
    repo: "live_priors",
    composition: "scripts/eot-digest.mjs",
    flag: "posPriorLoaded",
    tests: "scripts/eot-digest.test.mjs",
  },
];

const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

test("III.5 — every registered dark-capable gate has a lit-assertion where its ground is committed", () => {
  assert.ok(GATES.length > 0, "no gates registered — vacuous");
  for (const g of GATES) {
    const comp = read(path.join(ROOT, g.repo, g.composition));
    const spec = read(path.join(ROOT, g.repo, g.tests));
    assert.ok(comp, `${g.repo}/${g.composition} absent`);
    assert.ok(new RegExp(`\\b${g.flag}\\b`).test(comp), `${g.composition} no longer carries the flag '${g.flag}' — update or retire this row`);
    assert.ok(spec, `${g.repo}/${g.tests} absent — the gate can run dark with nothing failing (III.5)`);
    assert.ok(new RegExp(`${g.flag}\\s*,\\s*true|equal\\([^)]*${g.flag}[^)]*true`).test(spec),
      `${g.tests} never asserts ${g.flag} === true — it is a report, not an enforcement`);
  }
});

test("III.5 — the lit-assertion also proves the gate WORKS, not only that it loaded", () => {
  for (const g of GATES) {
    const spec = read(path.join(ROOT, g.repo, g.tests));
    if (!spec) continue;
    // At least one further assertion exercising the gated organ beyond the flag.
    const body = spec.replace(new RegExp(`.*${g.flag}[\\s\\S]*?\\)\;`), "");
    assert.ok(/assert\.(equal|notEqual|ok)\(/.test(body),
      `${g.tests} asserts only the flag — "loaded" and "working" are different claims`);
  }
});
