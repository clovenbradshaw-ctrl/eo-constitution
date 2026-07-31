import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { classify, check, VERDICTS } from "../oracle/classify.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const claimsDir = join(__dirname, "..", "claims");
const claims = readdirSync(claimsDir)
  .filter((f) => f.endsWith(".claim.json"))
  .map((f) => ({
    file: f,
    claim: JSON.parse(readFileSync(join(claimsDir, f), "utf8")),
  }));

test("every claim fixture declares its expected outcome", () => {
  for (const { claim } of claims) {
    assert.ok(["pass", "refute"].includes(claim.expect), `${claim.claim_id} must declare expect`);
  }
});

test("the constitution sustains every recorded ruling", () => {
  const sustained = claims.filter((c) => c.claim.expect === "pass");
  assert.ok(sustained.length > 0, "must exercise the passing rulings");
  for (const { file, claim } of sustained) {
    const verdict = check(claim);
    assert.equal(verdict.verdict, VERDICTS.PASS, `expected PASS for ${file}:\n${verdict.reasons.join("\n")}`);
  }
});

test("the constitution refutes every recorded violation", () => {
  const refuted = claims.filter((c) => c.claim.expect === "refute");
  assert.ok(refuted.length > 0, "must exercise the refuted placements");
  for (const { file, claim } of refuted) {
    const verdict = check(claim);
    assert.equal(verdict.verdict, VERDICTS.REFUTE, `expected REFUTE for ${file}:\n${verdict.reasons.join("\n")}`);
  }
});

test("a claim that never names its giver is a wall, not a placement (II.2)", () => {
  const verdict = check({
    proposed_placement: "priors",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: true,
      giver: "",
      is_host_knowledge: false,
      medium_agnostic: false,
      host_dependencies: [],
    },
  });
  assert.equal(verdict.verdict, VERDICTS.REFUTE);
  assert.match(verdict.reasons.join("\n"), /giver/);
});

test("an engine claim that owns a host dependency is refused on the seam (III.2)", () => {
  const verdict = classify({
    needs_name_or_surface: false,
    is_material_knowledge: false,
    giver: "",
    is_host_knowledge: false,
    medium_agnostic: true,
    host_dependencies: ["randomness"],
  });
  assert.equal(verdict.verdict, VERDICTS.REFUTE);
  assert.match(verdict.reasons.join("\n"), /III\.2/);
});

test("a growth-rule wait is not a placement (IV.3)", () => {
  const verdict = classify({
    needs_name_or_surface: false,
    is_material_knowledge: false,
    giver: "",
    is_host_knowledge: false,
    medium_agnostic: true,
    host_dependencies: [],
    level_test: "unstable",
  });
  assert.equal(verdict.verdict, VERDICTS.WAIT);
  assert.match(verdict.reasons.join("\n"), /IV\.3/);
});

test("malformed evidence is a type error before any null (II.5)", () => {
  assert.equal(classify(null).verdict, VERDICTS.GAP);
  assert.equal(classify({ needs_name_or_surface: "yes" }).verdict, VERDICTS.GAP);
  assert.equal(classify({ ...sampleEvidence(), host_dependencies: "clock" }).verdict, VERDICTS.GAP);
});

test("a proposed_placement mismatch is refused with the deciding article cited (IV.4)", () => {
  const verdict = check({
    proposed_placement: "app",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: false,
      giver: "",
      is_host_knowledge: false,
      medium_agnostic: true,
      host_dependencies: [],
    },
  });
  assert.equal(verdict.verdict, VERDICTS.REFUTE);
  assert.match(verdict.reasons.join("\n"), /II\.4/);
  assert.equal(verdict.classified_placement, "engine");
});

function sampleEvidence() {
  return {
    needs_name_or_surface: false,
    is_material_knowledge: false,
    giver: "",
    is_host_knowledge: false,
    medium_agnostic: true,
    host_dependencies: [],
  };
}
