// seal.mjs — the amendment log, written in stone.
//
// USER DIRECTION, 2026-09-01, verbatim: "we need these laws to be written
// in stone (though more laws can always be written) and we need to improve
// our governance of the laws (we need a ferocious despot in that respect)."
// IV.6 already SAYS amendments are numbered in the order they change the
// test, and this repo's own discipline says append, never rewrite — but
// until this file, that was a norm anyone could still violate by editing a
// past bullet with a text editor, and nothing would notice. This is the
// despot: a content hash pinned per amendment, checked on every run.
//
// TWO OPERATIONS, DELIBERATELY ASYMMETRIC.
//   verify() — read-only. Recomputes every SEALED amendment's hash from the
//     CURRENT file and reports which, if any, no longer match. This is what
//     `conformance/immutability.test.mjs` calls; it never writes anything.
//   seal({write}) — the only way a NEW amendment's hash enters the ledger.
//     It computes hashes for every amendment bullet CURRENTLY IN THE FILE,
//     but WILL NOT OVERWRITE an existing sealed hash — an attempt to reseal
//     an already-sealed ordinal with DIFFERENT text is refused loudly,
//     naming the mismatch, rather than quietly re-stamping over evidence of
//     tampering. Only a genuinely NEW ordinal (one the ledger has never
//     seen) is added. Adding a new amendment is therefore always possible;
//     silently re-certifying a changed old one is not — by construction,
//     not by convention.
//
// PARSED, NOT MAINTAINED. The amendment text for `- **Nth — Title.**  body`
// runs from that bullet to the line before the NEXT `- **Nth` bullet, or to
// the end of the amendment-log section if it is the last one — read off
// CONSTITUTION.md's own bytes every time, never copy-pasted into a second
// place that could drift from the source it is sealing.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
export const CONSTITUTION_PATH = path.join(ROOT, "CONSTITUTION.md");
export const SEALS_PATH = path.join(ROOT, "AMENDMENT-SEALS.json");

const BULLET_RE = /^- \*\*(\d+)(?:st|nd|rd|th) — /;

/** Every amendment bullet currently in CONSTITUTION.md, ordinal -> full text block. */
export function parseAmendments(source) {
  const lines = source.split("\n");
  const starts = [];
  for (let i = 0; i < lines.length; i += 1) {
    const m = BULLET_RE.exec(lines[i]);
    if (m) starts.push({ i, ordinal: Number(m[1]) });
  }
  const out = new Map();
  for (let k = 0; k < starts.length; k += 1) {
    const { i, ordinal } = starts[k];
    const end = k + 1 < starts.length ? starts[k + 1].i : lines.length;
    // Stop at the first blank line followed by a non-continuation line
    // (the closing italic note that isn't part of any bullet) — a bullet's
    // own body is contiguous non-blank markdown until the next bullet or a
    // blank-line-delimited aside.
    let stop = end;
    for (let j = i + 1; j < end; j += 1) {
      if (lines[j].trim() === "" && (j + 1 >= end || !lines[j + 1].startsWith("  "))) { stop = j; break; }
    }
    out.set(ordinal, lines.slice(i, stop).join("\n").trim());
  }
  return out;
}

function hashOf(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function loadSeals() {
  if (!fs.existsSync(SEALS_PATH)) return { schema: "AmendmentSeals@1", sealed: {} };
  return JSON.parse(fs.readFileSync(SEALS_PATH, "utf8"));
}

/**
 * verify() — read-only. Returns { ok, tampered, unsealed }.
 *   tampered — a sealed ordinal whose CURRENT text hash no longer matches
 *     what was sealed. This is the wall: any non-empty list here means the
 *     law was rewritten, not merely appended to, and `ok` is false.
 *   unsealed — an amendment present in the file with no seal on record yet
 *     (freshly added, awaiting `seal({write:true})`) — not itself a
 *     failure, but reported so a real new law is never certified by
 *     accident of a test simply not looking.
 */
export function verify() {
  const source = fs.readFileSync(CONSTITUTION_PATH, "utf8");
  const current = parseAmendments(source);
  const seals = loadSeals();
  const tampered = [];
  const unsealed = [];
  for (const [ordinal, text] of current) {
    const sealed = seals.sealed[String(ordinal)];
    if (!sealed) { unsealed.push(ordinal); continue; }
    const hash = hashOf(text);
    if (hash !== sealed.hash) tampered.push({ ordinal, sealedHash: sealed.hash, currentHash: hash });
  }
  // A sealed ordinal that has DISAPPEARED from the file entirely (deleted,
  // not merely edited) is the same offense under a different shape.
  const missing = Object.keys(seals.sealed).map(Number).filter((o) => !current.has(o));
  return { ok: tampered.length === 0 && missing.length === 0, tampered, missing, unsealed, current, seals };
}

/**
 * seal({write}) — the only door that ever adds a hash. Refuses (throws) if
 * asked to seal an ordinal that is ALREADY sealed with a DIFFERENT hash —
 * that is exactly the tampering case, and re-sealing over it would erase
 * the evidence rather than report it. An unchanged re-run is a no-op.
 */
export function seal({ write = false } = {}) {
  const v = verify();
  if (v.tampered.length) {
    throw new Error(
      `seal() refuses to run while tampered amendments exist: ${v.tampered.map((t) => `#${t.ordinal}`).join(", ")}. ` +
        `A hash mismatch on an already-sealed amendment is not something this script fixes by re-stamping — the text must be restored to what it said, or the change must be entered as a genuinely NEW amendment number, never a silent edit of an old one.`,
    );
  }
  if (!v.unsealed.length) return { added: [], seals: v.seals };
  const seals = { ...v.seals, sealed: { ...v.seals.sealed } };
  for (const ordinal of v.unsealed) {
    const text = v.current.get(ordinal);
    seals.sealed[String(ordinal)] = { hash: hashOf(text), sealedAt: null, chars: text.length };
  }
  if (write) fs.writeFileSync(SEALS_PATH, JSON.stringify(seals, null, 2) + "\n");
  return { added: v.unsealed, seals };
}

// Symlink-safe entrypoint check (this repo is reached through a symlink
// whose resolved path differs from argv[1] in some checkouts — matching the
// same hazard composition.test.mjs's own UNION_ROOT comment documents).
const isMain = process.argv[1] && fs.existsSync(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const write = process.argv.includes("--write");
  if (process.argv.includes("--verify")) {
    const v = verify();
    console.log(JSON.stringify({ ok: v.ok, tampered: v.tampered, missing: v.missing, unsealed: v.unsealed }, null, 2));
    process.exit(v.ok ? 0 : 1);
  }
  const r = seal({ write });
  console.log(write ? `sealed ${r.added.length} new amendment(s): ${r.added.join(", ")}` : `would seal ${r.added.length} new amendment(s): ${r.added.join(", ")} (pass --write to commit)`);
}
