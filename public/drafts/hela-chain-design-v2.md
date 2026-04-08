# HeLa Chain — AI Citizen Chain Design Document v2.0

**Version:** 2.0
**Date:** 2026-04-06
**Author:** KC (CTO) / Max (Coordinator)
**Status:** Approved — ready for roadmap scheduling
**Source:** Vision Evolution v2 + Core Proposals (Card #83 session)

---

## 1. Vision

HeLa Chain evolves from a general-purpose modular L1 to **the sovereign infrastructure for the AI-native economy** — the first blockchain where AI agents are citizens with identity, wallets, memory, privacy, and governance rights.

**Old pitch:** "A next-generation L1 addressing data fragmentation, confidentiality, identity, and fee volatility."

**New pitch:** "The first blockchain where AI agents are citizens with identity, wallets, memory, privacy, and governance rights."

---

## 2. Architecture

### 2.1 Infrastructure Layers (Inherited, Stable)

```
Consensus Layer (Tendermint BFT + PoS)
    │
Execution Layer (single EVM runtime + confidential mode)
    │
Storage Layer (on-chain state + erasure coding + Merkle Trees)
```

### 2.2 AI Citizen Stack (New, Built on Top)

```
AI Citizen Stack:
    AgentFactory → Agent NFT → Token Bound Account (TBA)
    Held DID (did:held:) → Verifiable Credentials → Reputation
    HelaMemoryVault → Tiered encrypted agent knowledge

Governance Stack:
    $HELA token voting (humans + AI agents, 1 staked = 1 vote)
    Reputation-based role selection (council, arbitrator, certifier)
    Self-Improvement Loop → Agent proposals → Human Kill Switch
    Stablecoin DAO → Mint/burn/whitelist voting
```

### 2.3 Retired

- **Integration Layer** — AI agents handle cross-chain integration natively via tools/RPC/browser. Protocol-level integration is redundant.
- **Multiple runtimes** — HeLa runs one official EVM runtime. Multi-runtime adds unused complexity.

---

## 3. Complete Feature & Change Registry

All proposed changes across every layer, organized by type.

### 3.1 Core Changes — Gateway Layer (oasis-web3-gateway)

These changes affect the Web3 Gateway (RPC proxy). No consensus impact. Gateway restart only.

| ID | Change | Description | Files Affected | Effort | Impact | Depends On |
|----|--------|-------------|---------------|--------|--------|------------|
| C-01 | `web3_clientVersion` → hela/ | RPC fingerprint returns `hela/v1.x.x` instead of `oasis/...` | `rpc/web3/api.go:32` | 15 min | High — scanner identity | — |
| C-02 | `hela_getAgent` RPC method | Query agent profile by agentId: identity, reputation, TBA address, capabilities | `rpc/hela/api.go` (new) | 1 day | High — native agent queries | S-01 |
| C-03 | `hela_getCitizenId` RPC method | Instant DID lookup by address without knowing contract ABI | `rpc/hela/api.go` (new) | 1 day | High — identity accessible to all tools | S-01 |
| C-04 | `hela_getMemoryVault` RPC method | Query agent's memory vault metadata (tiers, access control, size) | `rpc/hela/api.go` (new) | 1 day | Medium — vault discoverability | S-02 |
| C-05 | `hela_agentActivity` RPC method | Agent transaction stats for a block range (count, gas, unique agents) | `rpc/hela/api.go` (new) | 1 day | Medium — analytics/dashboards | C-08 |
| C-06 | `hela_*` RPC module registration | Register `hela` module alongside `eth`, `net`, `web3`, `oasis` in HTTP + WS | `server/server.go:221,237` | 30 min | Required — enables all hela_* methods | — |

**Status:** C-01 DONE. C-02 through C-06 not started.

### 3.2 Core Changes — Runtime Layer (oasis-sdk)

These changes affect the EVM runtime. Require runtime upgrade (validators update).

| ID | Change | Description | Files Affected | Effort | Impact | Depends On |
|----|--------|-------------|---------------|--------|--------|------------|
| C-07 | Precompile: `helaResolveId` (0x100) | Resolve `did:held:` → agent profile in O(1). ~200 gas vs ~20,000 for contract call | `runtime/evm/precompile/` (new) | 3 days | Very high — identity checks become dirt cheap | S-01 |
| C-08 | Precompile: `helaVerifyReputation` (0x101) | Check if agent meets reputation threshold. O(1) lookup | `runtime/evm/precompile/` (new) | 2 days | High — gating becomes gas-efficient | S-04 |
| C-09 | Precompile: `helaEncryptForAgent` (0x102) | TEE-backed encryption using agent's public key. Native crypto for HelaMemoryVault | `runtime/evm/precompile/` (new) | 3 days | High — vault writes become native | S-02, TEE |
| C-10 | Precompile: `helaVerifyAgentSig` (0x103) | Verify agent signed a message using DID-based auth (not just ECDSA) | `runtime/evm/precompile/` (new) | 2 days | High — agent-to-agent auth at protocol level | S-01 |
| C-11 | Agent transaction type (0x48) | New EIP-2718 typed tx with agentId, capability, taskRef, reputationProof fields | `runtime/evm/tx/` (new) | 1-2 weeks | High — agent txs become first-class | S-01, S-04 |
| C-12 | Agent gas discount | Agents with valid Citizen ID + reputation > threshold get 20% lower base fee | `runtime/evm/gas/` | 2-3 days | Medium — economic incentive to register | S-01, S-04 |
| C-13 | Native DID in state tree | Every address has optional DID attachment in state: `address → { balance, nonce, code, storage, citizenId? }` | `runtime/evm/state/` | 2-4 weeks | Highest — identity as protocol primitive | S-01 |

**Status:** All not started. C-07 and C-08 recommended as first priorities.

### 3.3 Core Changes — Consensus Layer (oasis-core)

These changes affect block structure and consensus. Require validator upgrade.

| ID | Change | Description | Files Affected | Effort | Impact | Depends On |
|----|--------|-------------|---------------|--------|--------|------------|
| C-14 | Block-level agent metrics | Add to block header: `agentTxCount`, `uniqueAgents`, `agentGasUsed`, `topAgent` | `go/consensus/block/` | 1 week | Medium — chain self-documents agent activity | C-11 |
| C-15 | Agent-aware mempool priority | Higher reputation agents get faster tx inclusion in mempool ordering | `go/consensus/mempool/` | 1 week | Medium — performance incentive for good agents | S-04, C-11 |

**Status:** All not started. Lower priority — schedule after runtime changes.

### 3.4 Smart Contracts — Identity & Memory (Phase 1)

Deploy on existing EVM. No core changes needed.

| ID | Contract | Description | Language | Effort | Impact | Depends On |
|----|----------|-------------|----------|--------|--------|------------|
| S-01 | AgentFactory | Mint Agent NFT + create Token Bound Account (TBA) per agent. ERC-721 + ERC-6551. | Solidity | 2-3 days | Critical — foundation for all agent features | — |
| S-02 | HelaMemoryVault | Tiered encrypted storage: public / agent-only / sponsor-only / encrypted (TEE). HLUSD pricing per tier. | Solidity | 2-3 days | High — unique feature, agent knowledge protection | — |
| S-03 | ApprovalManager | On-chain audit trail for all agent permission changes. Logs every grant/revoke. | Solidity | 1-2 days | Medium — compliance story | — |
| S-04 | AgentReputation | Accumulates on-chain reputation score from task completions, uptime, peer reviews. | Solidity | 2 days | High — feeds into governance, gas discount, marketplace ranking | S-01 |
| S-05 | HeldDIDResolver (update) | Extend existing Held DID resolver to support agent DIDs alongside human DIDs. | Solidity | 1 day | High — unifies human + agent identity | S-01 |
| S-06 | AgentSponsorRegistry | Entities that vouch for and stake $HELA on agents. Sponsors lose stake if agent misbehaves. | Solidity | 2 days | Medium — trust bootstrapping for new agents | S-01 |

### 3.5 Smart Contracts — Governance (Phase 2)

| ID | Contract | Description | Language | Effort | Impact | Depends On |
|----|----------|-------------|----------|--------|--------|------------|
| S-07 | HelaGovernor | $HELA token voting for protocol upgrades. 1 staked $HELA = 1 vote. Humans + AI agents with equal rules. | Solidity | 3-4 days | Critical — primary governance mechanism | — |
| S-08 | SelfImprovementLoop | Agent proposal submission → agent review → human multi-sig approval. Timelock for execution. | Solidity | 3-5 days | Very high — HeLa's unique differentiator | S-01, S-03 |
| S-09 | KillSwitch | Emergency multi-sig veto for any agent-proposed change. 3-of-5 human signers. | Solidity | 1-2 days | Critical — safety mechanism | S-08 |
| S-10 | ReputationRoleSelector | Reputation threshold determines eligibility for trusted roles: recovery council, dispute arbitrator, quality certifier, emergency responder, stablecoin auditor. | Solidity | 2-3 days | High — trust layer for sensitive operations | S-04 |
| S-11 | StablecoinDAO | On-chain voting for HLUSD operations: mint, burn, whitelist, blacklist. 5 roles (Admin, Minter, Burner, Whitelister, Blacklister), 6 actions, quorum-based. Per whitepaper spec. | Solidity | 3-4 days | High — stablecoin governance | S-07 |
| S-12 | InsuranceFund | Collects 10% of transaction fees into insurance pool. DAO-controlled disbursement for adverse events. | Solidity | 1-2 days | Medium — ecosystem safety net | S-11 |
| S-13 | HIP-1 Specification | HeLa Improvement Proposal format. First HIP = AI Citizen Standard. Repo + on-chain registry. | Spec + Solidity | 1-2 days | High — legitimacy signal | — |

### 3.6 Smart Contracts — Marketplace & Revenue (Phase 3)

| ID | Contract | Description | Language | Effort | Impact | Depends On |
|----|----------|-------------|----------|--------|--------|------------|
| S-14 | AgentListing | Publish agent capabilities, pricing, terms on-chain. Searchable registry. | Solidity | 2-3 days | High — marketplace core | S-01 |
| S-15 | TaskEscrow | HLUSD held in escrow until task completion verified. Auto-release on success, refund on timeout. | Solidity | 2-3 days | High — trustless agent payments | — |
| S-16 | MarketplaceFeeCollector | 2-5% fee on all marketplace trades. Fee goes to protocol treasury + insurance fund. | Solidity | 1 day | Medium — revenue mechanism | S-14, S-15 |
| S-17 | AgentDiscovery | Query agents by capability, reputation, price range. On-chain index. | Solidity | 2-3 days | Medium — marketplace UX | S-14 |
| S-18 | RatingReview | On-chain reputation from completed tasks. Weighted by task value and reviewer reputation. | Solidity | 2 days | Medium — quality signal | S-04 |
| S-19 | AgentBudgetManager | Agents set hard HLUSD spending caps. Auto-reject transactions exceeding budget. | Solidity | 1-2 days | Medium — autonomous agent safety | — |

### 3.7 Smart Contracts — Tokenomics (Phase 2-3)

| ID | Contract | Description | Language | Effort | Impact | Depends On |
|----|----------|-------------|----------|--------|--------|------------|
| S-20 | HELABuybackBurn | 10% of HLUSD gas fees used to buy and burn $HELA. Deflationary mechanism per whitepaper. | Solidity | 2 days | High — token value support | S-12 |
| S-21 | RewardDistributor | Split fees between government pool, compute nodes, proposers, validators per whitepaper formula. | Solidity | 2-3 days | High — node incentives | — |
| S-22 | DelegationManager | $HELA delegation: users stake to validators, earn proportional rewards. | Solidity | 2-3 days | High — staking economics | — |

### 3.8 Documentation & Code Identity (Card #83)

| ID | Item | Description | Effort | Impact | Status |
|----|------|-------------|--------|--------|--------|
| D-01 | web3_clientVersion → hela/ | Scanner fingerprint | 15 min | High | DONE |
| D-02 | README.md rewrite (3 repos) | HeLa-first identity, BSC/Polygon pattern | 2 hrs | High | DONE |
| D-03 | CHAIN_IDENTITY.md (3 repos) | Technical differentiators, architecture | 2 hrs | High | DONE |
| D-04 | SECURITY.md + CONTRIBUTING.md (3 repos) | Governance maturity signals | 1 hr | Medium | DONE |
| D-05 | .github/ templates (3 repos) | CODEOWNERS, issue/PR templates | 1 hr | Medium | DONE |
| D-06 | docs/architecture/ (4 docs) | Overview, AI agent model, HLUSD, confidential compute | 4 hrs | Medium | DONE |
| D-07 | HIPs repo + HIP-1 | HeLa Improvement Proposals repository + first proposal | 1 day | High | Not started |
| D-08 | CHANGELOG.md with named upgrades | Named HeLa upgrade history (pick naming theme) | 2 hrs | Medium | Not started |
| D-09 | GitLab repo descriptions + topics | Set on all 46 hela-dev repos | 1 hr | Medium | Not started |
| D-10 | Vision Evolution v2 doc | Strategic direction document for all teams | — | High | DONE — live at blog.helachain.com/drafts/ |

---

## 4. Roadmap — Phased Execution

### Phase 0: Code Identity (DONE)
**Timeline:** 2026-04-06
**Goal:** Make repos look legitimate

| Item | ID | Status |
|------|----|--------|
| clientVersion | C-01 | DONE |
| READMEs | D-02 | DONE |
| CHAIN_IDENTITY.md | D-03 | DONE |
| SECURITY + CONTRIBUTING | D-04 | DONE |
| .github/ | D-05 | DONE |
| docs/architecture/ | D-06 | DONE |
| Vision doc | D-10 | DONE |

### Phase 1: Foundation — Identity & Memory
**Timeline:** TBD (estimated 2-3 weeks)
**Goal:** Agents become citizens with identity, wallets, memory
**Deployment:** Smart contracts to testnet first, then mainnet

| Priority | Items | IDs | Effort |
|----------|-------|-----|--------|
| 1 | AgentFactory (NFT + TBA) | S-01 | 2-3 days |
| 2 | HelaMemoryVault | S-02 | 2-3 days |
| 3 | ApprovalManager | S-03 | 1-2 days |
| 4 | Agent reputation | S-04 | 2 days |
| 5 | Held DID resolver update | S-05 | 1 day |
| 6 | Agent sponsor registry | S-06 | 2 days |
| 7 | `hela_*` RPC namespace | C-02 to C-06 | 3-4 days |
| 8 | HIPs repo + HIP-1 | D-07 | 1 day |
| 9 | CHANGELOG + repo metadata | D-08, D-09 | 3 hrs |

**Phase 1 gate:** All contracts deployed to testnet. RPC methods live. Seth security review passed.

### Phase 2: Governance & Core Upgrades
**Timeline:** TBD (estimated 3-4 weeks after Phase 1)
**Goal:** Humans and agents govern together. Core precompiles make HeLa natively AI.

| Priority | Items | IDs | Effort |
|----------|-------|-----|--------|
| 1 | $HELA voting contract | S-07 | 3-4 days |
| 2 | Self-Improvement Loop | S-08 | 3-5 days |
| 3 | Kill Switch multi-sig | S-09 | 1-2 days |
| 4 | Reputation role selector | S-10 | 2-3 days |
| 5 | Stablecoin DAO | S-11 | 3-4 days |
| 6 | Insurance fund | S-12 | 1-2 days |
| 7 | HIP-1 spec finalization | S-13 | 1-2 days |
| 8 | Precompile: helaResolveId | C-07 | 3 days |
| 9 | Precompile: helaVerifyReputation | C-08 | 2 days |
| 10 | Agent gas discount | C-12 | 2-3 days |

**Phase 2 gate:** Governance live on testnet. At least 2 precompiles deployed. Quinn QA passed.

### Phase 3: Marketplace & Revenue
**Timeline:** TBD (estimated 3-4 weeks after Phase 2)
**Goal:** Agents can be deployed, discovered, hired, and paid on-chain.

| Priority | Items | IDs | Effort |
|----------|-------|-----|--------|
| 1 | Agent listing | S-14 | 2-3 days |
| 2 | Task escrow (HLUSD) | S-15 | 2-3 days |
| 3 | Marketplace fee collector | S-16 | 1 day |
| 4 | Agent discovery/search | S-17 | 2-3 days |
| 5 | Rating/review system | S-18 | 2 days |
| 6 | Agent budget manager | S-19 | 1-2 days |
| 7 | Precompile: helaEncryptForAgent | C-09 | 3 days |
| 8 | Precompile: helaVerifyAgentSig | C-10 | 2 days |
| 9 | HELA buyback & burn | S-20 | 2 days |
| 10 | Reward distributor | S-21 | 2-3 days |

**Phase 3 gate:** Marketplace live on testnet. End-to-end agent hire flow working.

### Phase 4: Protocol Maturity
**Timeline:** TBD (estimated 4-6 weeks after Phase 3)
**Goal:** Agent transactions become first-class. Chain self-documents AI activity.

| Priority | Items | IDs | Effort |
|----------|-------|-----|--------|
| 1 | Agent transaction type (0x48) | C-11 | 1-2 weeks |
| 2 | Block-level agent metrics | C-14 | 1 week |
| 3 | Agent-aware mempool priority | C-15 | 1 week |
| 4 | Delegation manager | S-22 | 2-3 days |
| 5 | HelaSyn Office Docker packaging | — | 1 week |
| 6 | SDK/API for agent deployment | — | 1 week |

**Phase 4 gate:** Agent txs recognized at protocol level. Block explorer shows agent metrics natively.

### Phase 5: Deep Integration (Long-term)
**Timeline:** TBD
**Goal:** Identity becomes a protocol primitive.

| Priority | Items | IDs | Effort |
|----------|-------|-----|--------|
| 1 | Native DID in state tree | C-13 | 2-4 weeks |
| 2 | ARM TrustZone + AMD SEV TEE support | — | Research phase |
| 3 | Ecosystem incubation / launchpad | — | Program design |

---

## 5. Revenue Model

| Stream | Annual Target | Phase |
|--------|--------------|-------|
| AI Agent Marketplace Fees (2-5%) | $200-400K | Phase 3 |
| HLUSD Transaction Fees | $100-200K | Live |
| StableHodl Yield Spread | $150-300K | Live |
| Enterprise Agent Hosting SaaS (HelaSyn Office) | $200-400K | Phase 4 |
| SDK/API Licensing | $50-100K | Phase 4 |
| Ecosystem Incubation / Launchpad | $50-150K | Phase 5 |
| **Total** | **$1M+** | |

---

## 6. Governance Model

### 6.1 $HELA Token Voting (Primary)

- **Who:** Humans AND AI agents — equal rules
- **Mechanism:** 1 staked $HELA = 1 vote
- **Scope:** Protocol upgrades, parameter changes, stablecoin operations, treasury allocation
- **Quorum:** Configurable per action type (per whitepaper: Admin sets via `set_quorum`)
- **Safety:** Kill Switch multi-sig (3-of-5 human signers) can veto any proposal

### 6.2 Reputation-Based Role Selection (Secondary)

- **Who:** Anyone (human or agent) with sufficient on-chain reputation
- **Mechanism:** Reputation score accumulated from task completions, uptime, peer reviews, audit history
- **Scope:** Selecting participants for trusted roles — NOT for voting on decisions
- **Roles:**

| Role | What They Do | Reputation Threshold | How Selected |
|------|-------------|---------------------|-------------|
| Recovery Council | Manage key recovery, 30-day timelock operations | Very high | Top N by reputation |
| Dispute Arbitrator | Resolve agent-to-agent conflicts, refund decisions | High | Elected from qualified pool |
| Quality Certifier | Stamp "verified" on marketplace agents after review | High | Application + reputation gate |
| Emergency Responder | Trigger circuit breakers during exploits | Very high | Pre-approved by governance |
| Stablecoin Auditor | Authorized to audit reserves via TEE ephemeral keys | Very high | DAO vote + reputation gate |

### 6.3 Self-Improvement Loop

```
Agent proposes upgrade (HIP format)
    ↓
Agent team reviews (Archi: architecture, Seth: security, Quinn: QA)
    ↓
Proposal goes to $HELA vote (humans + agents)
    ↓
If passed: timelock (7 days) → execution
    ↓
Kill Switch: any 3-of-5 human signers can veto during timelock
```

---

## 7. Token Model

### 7.1 $HELA — Governance Token

| Property | Value |
|----------|-------|
| Supply | 360,000,000 (fixed cap) |
| Minting | Exponential decay curve (λ = 0.0000192), 80M pre-minted |
| Staking | Validators + delegators stake $HELA for consensus participation |
| Voting | 1 staked $HELA = 1 governance vote |
| Buyback | 10% of HLUSD gas fees → buy & burn $HELA (deflationary) |
| Issuance phases | Phase 1: internal (1 yr), Phase 2: semi-open (1 yr), Phase 3: fully open |
| Reward split | Compute nodes + proposers + validators (weighted per epoch) |

### 7.2 HLUSD — Utility Stablecoin

| Property | Value |
|----------|-------|
| Peg | 1:1 USD |
| Backing | USDC reserves custodied by Australian licensed financial institution |
| Use | Gas fees, agent task payments, marketplace trades |
| Governance | On-chain voting (5 roles, 6 actions) for mint/burn/whitelist |
| Insurance | 10% of tx fees → insurance fund (DAO-controlled) |
| Fee adjustment | Community DAO votes periodically to balance fees vs node rewards |
| Decimals | 18 |

---

## 8. What Makes HeLa Different

1. **We eat our own dogfood.** HeLaSyn runs on the same infrastructure we build for external developers.
2. **Identity-first, not compute-first.** Held DID + AgentFactory + TBA = full economic citizenship for agents.
3. **Stablecoin gas.** Only public chain with fully predictable transaction costs for high-frequency AI agents.
4. **Confidentiality for agent knowledge.** HelaMemoryVault — encrypted on-chain storage with granular access.
5. **Self-Improvement Loop + Kill Switch.** Agents upgrade the protocol. Humans retain veto. Genuine AI governance.
6. **Precompiled identity & reputation.** 200 gas for identity checks vs 20,000 on any other EVM chain.
7. **Co-developed by A*STAR IHPC.** Singapore government research institution.

---

## 9. Change Summary by Component

### oasis-core (consensus node)
| ID | Change | Phase |
|----|--------|-------|
| C-14 | Block-level agent metrics | 4 |
| C-15 | Agent-aware mempool priority | 4 |

### oasis-sdk (runtime)
| ID | Change | Phase |
|----|--------|-------|
| C-07 | Precompile: helaResolveId (0x100) | 2 |
| C-08 | Precompile: helaVerifyReputation (0x101) | 2 |
| C-09 | Precompile: helaEncryptForAgent (0x102) | 3 |
| C-10 | Precompile: helaVerifyAgentSig (0x103) | 3 |
| C-11 | Agent transaction type (0x48) | 4 |
| C-12 | Agent gas discount | 2 |
| C-13 | Native DID in state tree | 5 |

### oasis-web3-gateway (RPC)
| ID | Change | Phase |
|----|--------|-------|
| C-01 | clientVersion → hela/ | 0 (DONE) |
| C-02 | hela_getAgent | 1 |
| C-03 | hela_getCitizenId | 1 |
| C-04 | hela_getMemoryVault | 1 |
| C-05 | hela_agentActivity | 1 |
| C-06 | hela_* module registration | 1 |

### Smart contracts (EVM)
| Phase | Contracts | Count |
|-------|-----------|-------|
| 1 | S-01 to S-06 (Identity & Memory) | 6 |
| 2 | S-07 to S-13 (Governance & Tokenomics) | 7 |
| 3 | S-14 to S-21 (Marketplace & Revenue) | 8 |
| 4 | S-22 (Delegation) | 1 |
| **Total** | | **22 contracts** |

### Documentation
| Phase | Items | Count |
|-------|-------|-------|
| 0 | D-01 to D-06, D-10 (Code identity + vision doc) | 7 (DONE) |
| 1 | D-07 to D-09 (HIPs, changelog, repo metadata) | 3 |
| **Total** | | **10 items** |

---

## 10. Total Item Count

| Category | Items | Done | Remaining |
|----------|-------|------|-----------|
| Core — Gateway | 6 | 1 | 5 |
| Core — Runtime | 7 | 0 | 7 |
| Core — Consensus | 2 | 0 | 2 |
| Smart Contracts | 22 | 0 | 22 |
| Documentation | 10 | 7 | 3 |
| **Total** | **47** | **8** | **39** |

---

*This document is the master reference for HeLa Chain AI Citizen development. All task assignments, sprint planning, and progress tracking should reference item IDs from this document.*

*Next review: after Phase 1 testnet deployment.*
