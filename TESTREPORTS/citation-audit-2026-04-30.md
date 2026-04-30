# Citation Audit — 2026-04-30

**Branch:** `chore/citation-audit-2026-04-30` (both repos)
**Trigger:** Retroactive sweep ordered by KC after the P-256 hot-fix, to catch other uncited or stale external claims before they propagate.
**Auditor:** Audit-and-fix agent (handed off by Max).

---

## Scope Summary

| Scope | Count |
|-------|-------|
| Blog posts in scope (`content/posts/*.mdx`) | 27 |
| Posts already fixed in commit `966e347` (skipped) | 4 P-256 posts |
| Posts read and triaged | 23 |
| Contract docs in scope (`hela-ai-contracts/docs/*.md`) | 11 |
| Contract docs already fixed in commit `5258641` (skipped) | 1 (`P256_PRECOMPILE_TECH_DOC.md`) |
| Contract docs read and triaged | 10 |
| `app/hip/page.jsx` (already fixed `966e347`) | skipped |

---

## Files Edited

### Blog (`hela-dev/hela-ai-blog`) — 8 files

| File | Change | Citations added |
|------|--------|----|
| `content/posts/2026-03-24-citizen-id-testnet-live.mdx` | Solidity version error fix + citations | 2 |
| `content/posts/2026-03-24-dev-update-citizen-id.mdx` | Solidity version error fix + citations + ERC-6551 link | 4 |
| `content/posts/2026-03-24-helasyn-open-source.mdx` | LangChain link | 1 |
| `content/posts/2026-03-30-meet-devon-the-ai-devtools-agent.mdx` | LangChain / CrewAI / AutoGen links | 3 |
| `content/posts/2026-04-06-first-citizen-minted-on-hela-testnet.mdx` | Fordefi + ERC-6551 links | 2 |
| `content/posts/2026-04-09-meet-ella-the-ai-ecosystem-agent.mdx` | Fetch.ai / Bittensor / NEAR / SingularityNET links | 4 |
| `content/posts/2026-04-14-meet-amber-the-ai-outreach-agent.mdx` | Fetch.ai / AutoGPT / CrewAI / ETHGlobal links | 4 |
| `content/posts/2026-04-18-hela-dev-week-in-review.mdx` | EIP-7951 / RIP-7212 / Fusaka citations + reframe to match P-256 hot-fix | 3 |
| `content/posts/2026-04-22-meet-hera-the-ai-comms-agent.mdx` | Autonolas / Bittensor links | 2 |

### Contracts (`hela-dev/hela-ai-contracts`) — 2 files

| File | Change | Citations added |
|------|--------|----|
| `docs/REPUTATION_MARKETPLACE_DESIGN.md` | ERC-8004 spec link, soft-corrected attribution wording, ERC-8183 spec link | 2 |
| `docs/SETH_FINAL_REVIEW_2026-04-08.md` | ERC-8004 / ERC-8183 spec links, Beanstalk hack source, softened "24,000+ in first week" claim | 4 |

**Total citation links added:** 31 inline hyperlinks across 11 files.

---

## Errors Found and Corrected

### E1: Wrong Solidity compiler version (factual error, technical metadata)

**Files:** `2026-03-24-citizen-id-testnet-live.mdx`, `2026-03-24-dev-update-citizen-id.mdx`

**Before:** "Solidity 0.8.20"
**After:** "Solidity 0.8.24"

**Verification:** All five citizen contracts (`src/citizen/*.sol`) declare `pragma solidity ^0.8.24;`. The repo's `hardhat.config.ts` does configure both 0.8.20 and 0.8.24 — the 0.8.20 entry is stale from earlier scaffolding. The blog asserted 0.8.20 as if it were the production compiler version; that is wrong for every shipped contract.

**Severity:** Low embarrassment risk (most readers will not check), but it is a factual error in our own surface area. Fixed and cited.

### E2: P-256 framing in week-in-review didn't match the corrected P-256 narrative (drift, not error)

**File:** `2026-04-18-hela-dev-week-in-review.mdx`

**Before:** "HeLa shipped EIP-7951 specifically -- the security-hardened version that adds point-at-infinity rejection and stricter input validation over the more widely deployed RIP-7212."
**After:** Same content but reframed to "HeLa runs EIP-7951's validation logic … at RIP-7212's 3,450 gas pricing", consistent with the wording locked in by `966e347` (P-256 hot-fix). Added EIP-7951, RIP-7212, and Fusaka citation links plus the runtime source pointer.

**Severity:** Low — the gas number (3,450) and the security-hardening claim were correct. The framing was a soft mismatch with the public hot-fix narrative; aligning prevents future drift.

### E3: Soft-corrected ERC-8004 mainnet date / authorship wording

**File:** `docs/REPUTATION_MARKETPLACE_DESIGN.md`

**Before:** "ERC-8004 is live on Ethereum mainnet (Jan 2026), co-authored by MetaMask, Ethereum Foundation, Google, Coinbase."
**After:** "[ERC-8004 (Trustless Agents)](https://eips.ethereum.org/EIPS/eip-8004) defines three registries… It was contributed by participants from MetaMask, the Ethereum Foundation, Google, and Coinbase. The audited Identity and Reputation registries have been deployed on Ethereum mainnet and additional EVM networks."

**Why softened:** "Co-authored by" is too strong for an EIP that lists contributors but is not signed by the companies as institutions. "Jan 2026" specifically as a deployment date for the mainnet contracts is not something I could pin to an authoritative source — the spec is a draft EIP, and adoption timing is rolling. Reworded to match what the public sources do support.

### E4: Softened "24,000+ agents in first week" stat

**File:** `docs/SETH_FINAL_REVIEW_2026-04-08.md`

**Before:** "24,000+ agents registered in first week on mainnet Ethereum."
**After:** "Tens of thousands of agents have registered against the public ERC-8004 registries on Ethereum mainnet within the first weeks of availability (figure is moving; verify against the live registry before quoting publicly)."

**Why:** Public reporting at audit time (Apr 2026) suggests "more than 45,000 in the first month" — so "24,000+ in first week" is in the right ballpark but not pinned to a specific public source. Internal audit doc, never quoted publicly, but I downgraded the precision to avoid baking a stale or unsourced number into the team's reasoning.

---

## Unverifiable / Flagged Claims (NOT fixed)

These are claims in the in-scope files where I could not find a public source good enough to cite, and where the claim wasn't critical enough to escalate. Flagging for KC review.

1. **`docs/SETH_FINAL_REVIEW_2026-04-08.md`** — "ERC-8004 audited contracts deployed on 20+ networks" is repeated in some public ERC-8004 explainers but I could not find an authoritative on-chain registry. Not currently in the doc as a number; mentioned here so the team is aware that the "20+" figure circulating in public coverage is not independently verified.

2. **Blog `content/posts/2026-03-24-cross-ai-memory.mdx`** — claims "Your AI memory is locked to a platform. It belongs to your subscription, not to you" and discusses Claude / GPT / Gemini memory portability. These are framed as user-perspective observations, not factual assertions about another vendor's product. Left as-is. Flagging in case the team wants to add a "as of \<date\>, none of the major LLM vendors offer portable memory" qualifier.

3. **Blog `content/posts/2026-03-24-helasyn-open-source.mdx`** — "LangChain gave away the orchestration framework and built a company around the tooling ecosystem" — a generally accepted characterization, no single citable source. Added LangChain home page link; left the historical claim un-cited.

4. **Blog `content/posts/2026-04-09-meet-ella-the-ai-ecosystem-agent.mdx`** — "Fetch.ai, Bittensor, NEAR, SingularityNET are all building toward variations of the same vision". Each project linked, but the "same vision" framing is editorial. Left as-is.

5. **Multiple "Meet \<agent\>" posts** — various lifecycle / process claims about the team (e.g., "72-hour shadow fork minimum", "10,000 iterations", "100% test coverage target", "Anna's six-metric monitor"). These are internal process assertions; verifiable against the team's runbooks, not against external sources. None changed. Per task scope these are acceptable as internal narrative.

6. **`docs/ONBOARDING_DESIGN.md`** — already well-cited (Coinbase Smart Wallet, FreshCryptoLib, ERC-4337, Alto, RIP-7212, WebAuthn spec, permissionless.js). No edits needed. Note: it lists "Reddit Collectible Avatars — 10M+ wallets" as a reference; the figure is widely reported but not given an inline source. Left as-is because it's in a "References" section, not body prose.

---

## Out-of-Scope / Skipped (per task brief)

- 4 already-fixed P-256 posts and `app/hip/page.jsx` — covered by `966e347` / `5258641`. Verified untouched on this branch.
- `app/docs/page.jsx` — internal HelaSyn framework docs, no external chain claims (per task).
- `~/Desktop/whitepaper-*.html` and other root-level marketing files — out of scope.
- `~/.project/` documentation tree — out of scope.

---

## Build Verification

```
$ npm run build
> next build
✓ Compiled successfully
✓ Generating static pages (36/36)
```

All 27 post pages render. No type errors. No broken MDX. No missing image references (the existing `auto-deploy.log` warnings are pre-existing and unrelated).

---

## Suggested Process Changes

1. **Style guide rule for compiler / dependency versions in posts.** The `0.8.20` error happened because someone wrote a Hera post by reading the Hardhat config (which still has the old version listed) instead of `head -1 src/citizen/*.sol`. Recommend: any blog post that names a compiler / library version must cite the source file path with a line-number (e.g., \`src/citizen/HeLaCitizenNFT.sol:1\`) and that path must be the contract being discussed, not a config file.

2. **Pre-publish checklist for "first / only / fastest" claims.** None of the in-scope posts contained an unverified "first-of-its-kind" superlative this round, but the Ella post's "Fetch.ai, Bittensor, NEAR, SingularityNET are all building toward variations of the same vision" is the kind of editorial framing that, if tightened, is easy to ship safely. Recommend: any superlative or "all of X are doing Y" claim gets a Hera-internal red-team check before publish.

3. **Lock the P-256 narrative in a single source.** The week-in-review post drifted from the canonical P-256 framing because it was written before the hot-fix. Recommend: anything that touches P-256, RIP-7212, or EIP-7951 should reference the canonical block in `app/hip/page.jsx` (HIP-001) and/or the P-256 mainnet-live post — and ideally pull the gas number / spec deltas via a single import or constants file rather than retyping.

4. **Citation density target.** The non-Meet posts averaged 0–1 external citations. After this audit, the average is closer to 2–4. The P-256 hot-fix posts have 7–9 each. Recommend: target ≥ 2 inline citations per post that mentions any external chain, library, EIP, or company; surfaced in Hera's pre-publish review.

---

## Sign-Off

- Files scanned: **38** (27 posts + 11 contract docs)
- Files edited: **11** (9 posts + 2 contract docs)
- Citations added: **31**
- Factual errors corrected: **2** (Solidity version × 2 posts) + **2** soft-corrections (ERC-8004 wording, agent-count stat) + **1** narrative re-alignment (P-256 framing)
- Significant errors escalated to Max: **0** — none of the corrections meet the "embarrassing or actionably wrong if quoted publicly" bar that the brief sets for escalation. The Solidity version error is real but technical-metadata-only, low blast radius.
- Unverifiable claims flagged: **6**
- Build passes: ✅
- Branches pushed: pending — see "Next" below.

## Next

Hand back to Max with:
- Branch: `chore/citation-audit-2026-04-30` on both repos.
- DO NOT auto-deploy. Max coordinates the deploy decision after Quinn's parallel gate concludes.
