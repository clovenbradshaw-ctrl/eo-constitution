import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { classify, check, VERDICTS } from "../assay/classify.js";

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
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: false,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "none",
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
    asserted_agnosticism: false,
    is_one_off_fix: false,
    weights_present: false,
    scores_arrival_alone: false,
    needs_datacenter_compute: false,
    consumes_source: "direct",
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
    asserted_agnosticism: false,
    is_one_off_fix: false,
    weights_present: false,
    scores_arrival_alone: false,
    needs_datacenter_compute: false,
    consumes_source: "direct",
    host_dependencies: [],
    level_test: "unstable",
  });
  assert.equal(verdict.verdict, VERDICTS.WAIT);
  assert.match(verdict.reasons.join("\n"), /IV\.3/);
});

test("a one-off fix is refused by the convergence test, with no stray tail (II.7)", () => {
  const verdict = check({
    proposed_placement: "engine",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: false,
      giver: "",
      is_host_knowledge: false,
      medium_agnostic: true,
      asserted_agnosticism: false,
      is_one_off_fix: true,
      weights_present: false,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "direct",
      host_dependencies: [],
    },
  });
  assert.equal(verdict.verdict, VERDICTS.REFUTE);
  assert.match(verdict.reasons.join("\n"), /II\.7/);
  assert.doesNotMatch(verdict.reasons.join("\n"), /IV\.3/);
  assert.doesNotMatch(verdict.reasons.join("\n"), /awaiting the level test/);
});

test("an engine claim that fixes nothing in particular passes the convergence test (II.7)", () => {
  const verdict = check({
    proposed_placement: "engine",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: false,
      giver: "",
      is_host_knowledge: false,
      medium_agnostic: true,
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: false,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "direct",
      host_dependencies: [],
      level_test: "above",
    },
  });
  assert.equal(verdict.verdict, VERDICTS.PASS);
  assert.match(verdict.reasons.join("\n"), /II\.4/);
});

test("a surrogate for the source is refused by the book test in every tier (II.6)", () => {
  for (const proposed_placement of ["engine", "priors", "app"]) {
    const verdict = check({
      proposed_placement,
      evidence: {
        needs_name_or_surface: false,
        is_material_knowledge: true,
        giver: "the communicator",
        is_host_knowledge: false,
        medium_agnostic: false,
        asserted_agnosticism: false,
        is_one_off_fix: false,
        weights_present: false,
        scores_arrival_alone: false,
    needs_datacenter_compute: false,
        needs_datacenter_compute: false,
      needs_datacenter_compute: false,
        consumes_source: "surrogate",
        host_dependencies: [],
      },
    });
    assert.equal(verdict.verdict, VERDICTS.REFUTE, `expected REFUTE for ${proposed_placement}`);
    assert.match(verdict.reasons.join("\n"), /II\.6/);
    assert.doesNotMatch(verdict.reasons.join("\n"), /IV\.3/);
  }
});

test("the who-for of a document is a received prior that names the communicator (II.6/II.2)", () => {
  const verdict = check({
    proposed_placement: "priors",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: true,
      giver: "the communicator",
      is_host_knowledge: false,
      medium_agnostic: false,
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: false,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "none",
      host_dependencies: [],
    },
  });
  assert.equal(verdict.verdict, VERDICTS.PASS);
  assert.match(verdict.reasons.join("\n"), /II\.2/);
});

test("malformed evidence is a type error before any null (II.5)", () => {
  assert.equal(classify(null).verdict, VERDICTS.GAP);
  assert.equal(classify({ needs_name_or_surface: "yes" }).verdict, VERDICTS.GAP);
  assert.equal(classify({ ...sampleEvidence(), host_dependencies: "clock" }).verdict, VERDICTS.GAP);
  assert.equal(classify({ ...sampleEvidence(), consumes_source: "summary" }).verdict, VERDICTS.GAP);
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
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: false,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "direct",
      host_dependencies: [],
    },
  });
  assert.equal(verdict.verdict, VERDICTS.REFUTE);
  assert.match(verdict.reasons.join("\n"), /II\.4/);
  assert.equal(verdict.classified_placement, "engine");
});

test("a mechanism that weights the present is refused by the difference test, in the engine only (II.8)", () => {
  const vetoed = check({
    proposed_placement: "engine",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: false,
      giver: "",
      is_host_knowledge: false,
      medium_agnostic: true,
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: true,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "direct",
      host_dependencies: [],
      level_test: "above",
    },
  });
  assert.equal(vetoed.verdict, VERDICTS.REFUTE);
  assert.match(vetoed.reasons.join("\n"), /II\.8/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /IV\.3/);

  const hostMayAttend = check({
    proposed_placement: "app",
    evidence: {
      needs_name_or_surface: false,
      is_material_knowledge: false,
      giver: "",
      is_host_knowledge: true,
      medium_agnostic: false,
      asserted_agnosticism: false,
      is_one_off_fix: false,
      weights_present: true,
      scores_arrival_alone: false,
    needs_datacenter_compute: false,
      needs_datacenter_compute: false,
      consumes_source: "direct",
      host_dependencies: ["clock"],
    },
  });
  assert.equal(hostMayAttend.verdict, VERDICTS.PASS, "the host may attend; the measurement never does");
});

test("a claim that omits the difference-test posture is a type error, not a pass (II.8/II.5)", () => {
  const omitted = { ...sampleEvidence() };
  delete omitted.weights_present;
  const verdict = classify(omitted);
  assert.equal(verdict.verdict, VERDICTS.GAP);
  assert.match(verdict.reasons.join("\n"), /weights_present/);
});

test("a mechanism that scores the arrival is refused by the revision test, even with a sound null (II.9)", () => {
  const vetoed = check({ proposed_placement: "engine", evidence: arrivalScorer() });
  assert.equal(vetoed.verdict, VERDICTS.REFUTE);
  assert.match(vetoed.reasons.join("\n"), /II\.9/);
  // II.8 is a different veto. This claim rebuilds its ground and still fails:
  // a sound null does not rescue a measurement of the arrival rather than the
  // revision. "The ground was rebuilt" and "something moved" are two questions.
  assert.doesNotMatch(vetoed.reasons.join("\n"), /II\.8/);

  const measuresRevision = check({
    proposed_placement: "engine",
    evidence: { ...arrivalScorer(), scores_arrival_alone: false },
  });
  assert.equal(measuresRevision.verdict, VERDICTS.PASS, "measuring what the arrival revised is the engine's own act");
});

test("a cheap sense organ is legal in the host — only the verdict is refused (II.9/II.3)", () => {
  const nominator = check({
    proposed_placement: "app",
    evidence: {
      ...arrivalScorer(),
      is_host_knowledge: true,
      medium_agnostic: false,
      host_dependencies: ["clock"],
    },
  });
  assert.equal(nominator.verdict, VERDICTS.PASS, "difference may nominate; it never decides in the engine");
});

test("an engine claim that declares medium-agnosticism without earning it is refused by the omnimodal earning test (II.11)", () => {
  const vetoed = check({
    proposed_placement: "engine",
    evidence: {
      ...sampleEvidence(),
      asserted_agnosticism: true,
      level_test: "above",
    },
  });
  assert.equal(vetoed.verdict, VERDICTS.REFUTE);
  assert.match(vetoed.reasons.join("\n"), /II\.11/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /IV\.3/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /II\.8/);

  const receivedTypography = check({
    proposed_placement: "priors",
    evidence: {
      ...sampleEvidence(),
      is_material_knowledge: true,
      giver: "the communicator",
    },
  });
  assert.equal(receivedTypography.verdict, VERDICTS.PASS, "received typography with its giver is priors, not engine");
});

test("a claim that omits the revision-test posture is a type error, not a pass (II.9/II.5)", () => {
  const omitted = { ...sampleEvidence() };
  delete omitted.scores_arrival_alone;
  const verdict = classify(omitted);
  assert.equal(verdict.verdict, VERDICTS.GAP);
  assert.match(verdict.reasons.join("\n"), /scores_arrival_alone/);
});

test("a measurement that presumes the AI datacenter is refused by the local test, with no stray tail (II.12)", () => {
  const vetoed = check({
    proposed_placement: "engine",
    evidence: {
      ...sampleEvidence(),
      needs_datacenter_compute: true,
      consumes_source: "direct",
      level_test: "above",
    },
  });
  assert.equal(vetoed.verdict, VERDICTS.REFUTE);
  assert.match(vetoed.reasons.join("\n"), /II\.12/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /II\.8/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /II\.9/);
  assert.doesNotMatch(vetoed.reasons.join("\n"), /IV\.3/);

  const runsLocal = check({
    proposed_placement: "engine",
    evidence: {
      ...sampleEvidence(),
      needs_datacenter_compute: false,
      consumes_source: "direct",
      level_test: "above",
    },
  });
  assert.equal(runsLocal.verdict, VERDICTS.PASS, "a measurement that runs on the compute it owns passes the local test");
});

test("a claim that omits the local-test posture is a type error, not a pass (II.12/II.5)", () => {
  const omitted = { ...sampleEvidence() };
  delete omitted.needs_datacenter_compute;
  const verdict = classify(omitted);
  assert.equal(verdict.verdict, VERDICTS.GAP);
  assert.match(verdict.reasons.join("\n"), /needs_datacenter_compute/);
});

test("the host may call a model it does not own; the measurement never presumes one (II.12/II.3)", () => {
  const hostCalls = check({
    proposed_placement: "app",
    evidence: {
      ...sampleEvidence(),
      is_host_knowledge: true,
      needs_datacenter_compute: true,
      consumes_source: "direct",
      host_dependencies: ["network"],
    },
  });
  assert.equal(hostCalls.verdict, VERDICTS.PASS, "model routing is app-owned (I.4, II.3); the boundary binds the measurement");

  const enginePresumes = check({
    proposed_placement: "engine",
    evidence: {
      ...sampleEvidence(),
      needs_datacenter_compute: true,
      consumes_source: "direct",
      level_test: "above",
    },
  });
  assert.equal(enginePresumes.verdict, VERDICTS.REFUTE);
  assert.match(enginePresumes.reasons.join("\n"), /II\.12/);
});

function arrivalScorer() {
  return {
    needs_name_or_surface: false,
    is_material_knowledge: false,
    giver: "",
    is_host_knowledge: false,
    medium_agnostic: true,
    asserted_agnosticism: false,
    is_one_off_fix: false,
    weights_present: false,
    scores_arrival_alone: true,
    needs_datacenter_compute: false,
    consumes_source: "direct",
    host_dependencies: [],
    level_test: "above",
  };
}

function sampleEvidence() {
  return {
    needs_name_or_surface: false,
    is_material_knowledge: false,
    giver: "",
    is_host_knowledge: false,
    medium_agnostic: true,
    asserted_agnosticism: false,
    is_one_off_fix: false,
    weights_present: false,
    scores_arrival_alone: false,
    needs_datacenter_compute: false,
    consumes_source: "none",
    host_dependencies: [],
  };
}
