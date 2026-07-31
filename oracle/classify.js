export const VERDICTS = Object.freeze({
  PASS: "pass",
  REFUTE: "refute",
  GAP: "gap",
  WAIT: "wait",
});

export const FORBIDDEN_HOST_DEPENDENCIES = Object.freeze([
  "clock",
  "io",
  "randomness",
  "network",
  "filesystem",
]);

const EVIDENCE_BOOLEANS = Object.freeze([
  "needs_name_or_surface",
  "is_material_knowledge",
  "is_host_knowledge",
  "medium_agnostic",
]);

export function classify(evidence) {
  const reasons = [];

  if (!evidence || typeof evidence !== "object") {
    return {
      verdict: VERDICTS.GAP,
      placement: null,
      reasons: [...reasons, "II.5 — evidence is not an object; type error before null"],
    };
  }

  for (const key of EVIDENCE_BOOLEANS) {
    if (typeof evidence[key] !== "boolean") {
      return {
        verdict: VERDICTS.GAP,
        placement: null,
        reasons: [`II.5 — evidence.${key} must be a boolean; type error before null`],
      };
    }
  }

  if (!Array.isArray(evidence.host_dependencies || [])) {
    return {
      verdict: VERDICTS.GAP,
      placement: null,
      reasons: ["II.5 — evidence.host_dependencies must be an array; type error before null"],
    };
  }

  let placement;

  if (evidence.is_host_knowledge) {
    placement = "app";
    reasons.push("II.3 — knowledge of reader/host/moment/interface belongs in the application");
  } else if (evidence.is_material_knowledge) {
    if (evidence.giver) {
      placement = "priors";
      reasons.push("II.2 — witness knowledge about the material belongs in priors and names its giver");
    } else {
      return {
        verdict: VERDICTS.GAP,
        placement: null,
        reasons: ["II.2 — material knowledge without a giver is a wall; report a typed gap, never derive (r ≈ 0.974)"],
      };
    }
  } else if (evidence.needs_name_or_surface) {
    return {
      verdict: VERDICTS.GAP,
      placement: null,
      reasons: ["II.1/II.5 — needs a name string or surface yet is neither witness nor host knowledge; no tier exists"],
    };
  } else {
    placement = "engine";
    reasons.push("II.4 — invariant across every text and every host; the measurement itself");
  }

  if (placement === "engine") {
    const forbidden = (evidence.host_dependencies || []).filter((dep) =>
      FORBIDDEN_HOST_DEPENDENCIES.includes(dep),
    );
    if (forbidden.length > 0) {
      return {
        verdict: VERDICTS.REFUTE,
        placement,
        reasons: [
          `III.2 — the engine has no ${forbidden.join(", ")}; the host supplies it, the engine never owns it`,
        ],
      };
    }
    if (evidence.level_test && evidence.level_test !== "above") {
      return {
        verdict: VERDICTS.WAIT,
        placement,
        reasons: [`IV.3 — growth rule: the level test returned ${evidence.level_test}; peer or unstable means it waits`],
      };
    }
  }

  return { verdict: VERDICTS.PASS, placement, reasons };
}

export function check(claim) {
  if (!claim || typeof claim !== "object" || !claim.evidence) {
    return {
      verdict: VERDICTS.GAP,
      placement: null,
      reasons: ["II.5 — a claim must carry evidence"],
    };
  }
  const classified = classify(claim.evidence);

  if (classified.verdict !== VERDICTS.PASS) {
    const tail =
      classified.verdict === VERDICTS.GAP
        ? "I.5 — no domain exists for this; it is a gap, not a category"
        : "IV.3 — awaiting the level test; a non-above organ does not enter the engine";
    return {
      ...classified,
      verdict: VERDICTS.REFUTE,
      reasons: [...classified.reasons, tail],
    };
  }

  if (classified.placement !== claim.proposed_placement) {
    return {
      verdict: VERDICTS.REFUTE,
      placement: claim.proposed_placement,
      classified_placement: classified.placement,
      reasons: [
        ...classified.reasons,
        `placement mismatch — proposed ${claim.proposed_placement}, the constitution routes ${classified.placement}`,
      ],
    };
  }

  return { ...classified, verdict: VERDICTS.PASS };
}
