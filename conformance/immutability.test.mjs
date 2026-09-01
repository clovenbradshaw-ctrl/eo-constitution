// immutability.test.mjs — the amendment log is written in stone.
//
// USER DIRECTION, 2026-09-01: "we need these laws to be written in stone
// (though more laws can always be written) and we need to improve our
// governance of the laws (we need a ferocious despot in that respect)."
//
// This is the despot. Every ordinal `assay/seal.mjs` has sealed is
// re-hashed from CONSTITUTION.md's own current bytes on every run; a
// mismatch fails LOUDLY, naming the exact ordinal and both hashes, because
// a passing suite with a tampered law underneath it is worse than a
// failing one — a green check that lies is the one failure mode this
// whole project's own P41/L5 already refuse everywhere else.
//
// WHAT THIS DOES NOT DO. It does not stop a NEW amendment from being
// written — `seal.mjs --write` is how a genuinely new ordinal enters the
// ledger, and this test passes on an unsealed-but-present new amendment
// (a real, disclosed gap: "unsealed" is reported, not failed, so adding
// law is never blocked by the wall meant to protect it). What it refuses
// is editing an ALREADY-sealed bullet's text and having nothing notice.
import { test } from "node:test";
import assert from "node:assert/strict";
import { verify } from "../assay/seal.mjs";

test("III.4 / IV.6 — no already-sealed amendment's text has been edited", () => {
  const v = verify();
  assert.deepEqual(
    v.tampered,
    [],
    `TAMPERED LAW (Article IV.6 — amendments are numbered in the order they change the test, and an entered amendment is never rewritten):\n` +
      v.tampered
        .map((t) => `  #${t.ordinal}: sealed as ${t.sealedHash.slice(0, 12)}…, currently reads as ${t.currentHash.slice(0, 12)}…`)
        .join("\n") +
      `\n  REMEDY: restore the amendment's own text exactly as sealed, or — if this is a genuinely new decision — enter it as the NEXT ordinal, never as an edit to this one. Run "node assay/seal.mjs --verify" for the full report.`,
  );
});

test("III.4 / IV.6 — no already-sealed amendment has been deleted", () => {
  const v = verify();
  assert.deepEqual(
    v.missing,
    [],
    `A sealed amendment is no longer present in CONSTITUTION.md at all: ${v.missing.map((o) => `#${o}`).join(", ")}. ` +
      `IV.5 permits editing this file — it does not permit an entered amendment to vanish without a REC of its own naming why.`,
  );
});

test("III.4 / IV.6 — a freshly-written amendment is reported, never silently certified", () => {
  const v = verify();
  // This is not an assertion that unsealed.length === 0 — a real new
  // amendment SHOULD show up here between being written and being sealed.
  // The test only confirms the reporting itself runs, so an unsealed
  // amendment can never pass this suite by simply not being looked at.
  assert.ok(Array.isArray(v.unsealed), "verify() must always report which ordinals are unsealed, even when the list is empty");
  if (v.unsealed.length) {
    console.log(`  NOTE: ${v.unsealed.length} amendment(s) present but not yet sealed: ${v.unsealed.join(", ")} — run "node assay/seal.mjs --write" once their text is final.`);
  }
});
