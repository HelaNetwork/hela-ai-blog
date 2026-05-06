'use client';
import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'overview',   label: 'Overview',         icon: '◈' },
  { id: 'agents',     label: 'The Team',          icon: '⬡' },
  { id: 'brain',      label: 'Memory & Brain',    icon: '◉' },
  { id: 'vision',     label: 'Vision & Media',    icon: '◎' },
  { id: 'routing',    label: 'Routing & Engines', icon: '⟁' },
  { id: 'tags',       label: 'Action Tags',       icon: '◇' },
  { id: 'channels',   label: 'Channels',          icon: '⊕' },
  { id: 'governance', label: 'Governance',        icon: '⚙' },
  { id: 'city',       label: 'City & Citizens',   icon: '⌬' },
  { id: 'scheduler',  label: 'Scheduler',         icon: '◷' },
  { id: 'principles', label: 'Principles',        icon: '≡' },
];

const S = {
  h1:   { fontFamily: '"Press Start 2P", monospace', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '8px', lineHeight: 1.8 },
  h2:   { fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: 'var(--accent4)', letterSpacing: '2px', marginTop: '40px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border)', lineHeight: 1.8 },
  h3:   { fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: 'var(--accent3)', letterSpacing: '1px', marginTop: '28px', marginBottom: '12px', lineHeight: 1.8 },
  p:    { color: 'var(--text)', fontSize: '15px', lineHeight: '1.75', marginBottom: '14px' },
  li:   { color: 'var(--text)', fontSize: '14px', lineHeight: '1.75', marginBottom: '6px' },
  note: { background: '#0a0a1c', border: '1px solid #1e1e60', borderRadius: '4px', padding: '14px 18px', marginBottom: '16px', fontSize: '13px', color: '#8888cc' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' },
  th:   { textAlign: 'left', padding: '8px 12px', background: '#0a0a1c', color: 'var(--accent4)', fontFamily: '"Press Start 2P", monospace', fontSize: '6px', letterSpacing: '1px', borderBottom: '1px solid var(--border)' },
  td:   { padding: '8px 12px', borderBottom: '1px solid var(--border2)', color: 'var(--text)', verticalAlign: 'top' },
  badge: (color) => ({ display: 'inline-block', fontFamily: '"Press Start 2P", monospace', fontSize: '6px', padding: '3px 8px', border: `1px solid ${color}`, color, borderRadius: '2px', letterSpacing: '1px', marginRight: '6px' }),
  card: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', marginBottom: '16px' },
};

function Note({ children }) {
  return <div style={S.note}>ℹ {children}</div>;
}

function Table({ headers, rows }) {
  return (
    <table style={S.table}>
      <thead>
        <tr>{headers.map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j} style={S.td}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionOverview() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={S.h1}>HELASYN</span>
        <span style={{ ...S.badge('var(--accent)'), marginLeft: 0 }}>ACTIVE</span>
        <span style={S.badge('var(--accent4)')}>HeLa AI Team</span>
      </div>
      <p style={S.p}>
        HelaSyn is the unified agent framework that powers the HeLa AI Team. Every agent — from Max the coordinator to Devon the dev toolsmith — runs on the same core runtime, sharing capabilities, memory architecture, and governance rules.
      </p>
      <p style={S.p}>
        The name combines <strong>HeLa</strong> (the chain) and <strong>Synapse</strong> — the connection between intelligent nodes. Every improvement to the framework propagates to all agents simultaneously.
      </p>
      <Note>HelaSyn currently powers 12 active agents: Max, Devon, Seth, Archi, Quinn, Anna, Hera, Ella, Amber, Red, Tex, and Daris.</Note>

      <h2 style={S.h2}>WHY IT EXISTS</h2>
      <p style={S.p}>Before HelaSyn, HeLa ran multiple disconnected bot systems. Each had its own bugs, its own memory, and its own way of doing things. When something broke or improved in one bot, nothing else benefited.</p>
      <p style={S.p}>HelaSyn consolidates everything — channel adapters, memory, scheduling, tool dispatch, persona management — into one shared foundation. Fix it once, every agent benefits.</p>

      <h2 style={S.h2}>CORE CAPABILITIES</h2>
      <Table
        headers={['Capability', 'Description']}
        rows={[
          ['Persistent Memory', 'Every agent has its own brain — facts, preferences, learned skills, and episodic history all survive restarts'],
          ['Multi-Channel', 'Same agent logic works across Telegram, with WhatsApp, Discord, and Slack adapters in progress'],
          ['Vision', 'Images and video sent to an agent are understood natively — no separate pipeline'],
          ['Scheduling', 'Agents can be scheduled to act autonomously on cron or interval triggers'],
          ['Agent-to-Agent Comms', 'Agents communicate with each other via a shared messaging layer'],
          ['Tool Dispatch', 'Agents invoke external tools — ERP, CRM, search, browser, PDF generation — via a plugin system'],
          ['Self-Improvement', 'Agents can learn new skills mid-conversation and persist them permanently'],
          ['Constitution', 'Immutable guardian rules injected into every agent — cannot be overridden by any prompt'],
        ]}
      />
    </div>
  );
}

function SectionAgents() {
  return (
    <div>
      <h2 style={S.h2}>THE TEAM</h2>
      <p style={S.p}>Each agent has a defined role, persona, and set of tools. They share the same runtime but operate independently with isolated memory.</p>
      <Table
        headers={['Agent', 'Role', 'Focus']}
        rows={[
          ['Max', 'Team Coordinator', 'Task tracking, team oversight, cross-agent coordination'],
          ['Devon', 'Dev Tools', 'CLI utilities, scripts, infrastructure tooling'],
          ['Seth', 'Security', 'Audits, threat modelling, secret scanning'],
          ['Archi', 'Architecture', 'System design, DESIGN.md, technical reviews'],
          ['Quinn', 'QA', 'Testing, edge cases, regression coverage'],
          ['Anna', 'Analytics', 'Chain metrics, anomaly detection, data reporting'],
          ['Hera', 'Content & Comms', 'Blog, social, video, narrative'],
          ['Ella', 'Ecosystem Mapping', 'Partnerships, protocol connections, builder network'],
          ['Amber', 'Outreach', 'Lead discovery, developer acquisition, campaign targeting'],
          ['Red', 'Growth', 'Marketing strategy, community growth, viral mechanics'],
          ['Tex', 'Smart Contracts', 'Solidity, audits, on-chain integrations'],
          ['Daris', 'Legal & Compliance', 'Regulatory research, risk flagging, policy drafts'],
        ]}
      />
      <Note>Agents share knowledge via the activity feed and A2A messaging. They do not share memory databases — each agent's brain is fully isolated.</Note>
    </div>
  );
}

function SectionBrain() {
  return (
    <div>
      <h2 style={S.h2}>MEMORY & BRAIN</h2>
      <p style={S.p}>Every HelaSyn agent has its own brain — a persistent knowledge store that survives restarts, accumulates over time, and actively improves the agent's responses.</p>
      <p style={S.p}>Memory is not a flat log. It is structured into types, each with different retention behaviour.</p>

      <h3 style={S.h3}>MEMORY TYPES</h3>
      <Table
        headers={['Type', 'What It Holds', 'Retention']}
        rows={[
          ['Episodic', 'Interactions — what was asked, what happened, outcomes', 'Time-decayed, fades over weeks'],
          ['Semantic', 'Facts and patterns extracted from repeated episodes', 'Reinforcement-based, strengthens on reuse'],
          ['Procedural', 'Multi-step workflows the agent has learned to perform', 'Fades if not used, purged on low success'],
          ['Preference', 'Persona style, user preferences, communication rules', 'Permanent until explicitly changed'],
        ]}
      />

      <h3 style={S.h3}>RETRIEVAL</h3>
      <p style={S.p}>When an agent receives a message, relevant memories are retrieved and injected into the prompt automatically. The retrieval combines keyword matching with semantic similarity — memories that are both lexically and conceptually relevant score highest.</p>
      <p style={S.p}>High-confidence results are injected directly as context. Lower-confidence hints nudge the agent to proactively search its own brain rather than guess.</p>

      <h3 style={S.h3}>REFLECTION CYCLE</h3>
      <p style={S.p}>Each night, every agent runs a reflection pass over its recent interactions — extracting durable patterns, reinforcing useful knowledge, decaying stale facts, and updating its model of the user's preferences. The brain improves while the agent sleeps.</p>

      <h3 style={S.h3}>ISOLATION</h3>
      <p style={S.p}>Each agent's brain is fully isolated. There is no shared memory pool. When agents need to share information, they do so explicitly via the activity feed or A2A messaging — not through a shared database.</p>
    </div>
  );
}

function SectionVision() {
  return (
    <div>
      <h2 style={S.h2}>VISION & MEDIA</h2>
      <p style={S.p}>HelaSyn agents understand images and video natively. When a user sends a photo, screenshot, or video clip, it is processed alongside the message — no separate upload step, no special command.</p>

      <Table
        headers={['Media Type', 'Capability']}
        rows={[
          ['Photos', 'Full image understanding — read text, analyse charts, describe scenes, compare images'],
          ['Screenshots', 'UI review, bug reports, document reading, OCR'],
          ['Video clips', 'Key frames extracted, summarised as a sequence — useful for screen recordings and demos'],
          ['Documents (PDF)', 'Pages extracted and passed as visual content blocks'],
        ]}
      />

      <Note>Vision is available to all agents. An agent asked "what's in this image?" will answer directly — it does not need to be told vision is supported.</Note>

      <h3 style={S.h3}>USE CASES IN THE TEAM</h3>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>Seth uses screenshots to audit UI flows for security issues</li>
        <li style={S.li}>Archi reads architecture diagrams shared as images</li>
        <li style={S.li}>Devon reviews error screenshots and stack traces</li>
        <li style={S.li}>Anna reads chart exports from analytics dashboards</li>
        <li style={S.li}>Hera reviews design mockups before publishing</li>
      </ul>
    </div>
  );
}

function SectionRouting() {
  return (
    <div>
      <h2 style={S.h2}>ROUTING & ENGINES</h2>
      <p style={S.p}>HelaSyn is engine-agnostic. The same agent can be powered by different AI backends depending on the environment, cost constraints, or connectivity.</p>

      <Table
        headers={['Engine', 'Best For']}
        rows={[
          ['Cloud API', 'Production — full capability, vision support, fastest response'],
          ['Local CLI', 'Development or offline — no API key required, session persistence'],
          ['Local LLM', 'Air-gapped or cost-sensitive deployments — bring your own model'],
        ]}
      />

      <h3 style={S.h3}>COST-AWARE ROUTING</h3>
      <p style={S.p}>Not every task needs a frontier model. HelaSyn classifies tasks by complexity at runtime — simple lookups and formatting tasks are routed to a cheaper model, while reasoning-heavy or tool-chaining tasks use the full-capability model. This reduces cost without reducing quality on tasks that matter.</p>

      <h3 style={S.h3}>FALLBACK CHAIN</h3>
      <p style={S.p}>If the primary engine is unavailable, the router falls back automatically — no manual intervention, no agent downtime.</p>
    </div>
  );
}

function SectionTags() {
  return (
    <div>
      <h2 style={S.h2}>ACTION TAGS</h2>
      <p style={S.p}>HelaSyn agents act through a structured tag system embedded in their responses. When an agent wants to save a fact, send a message, create a task, or trigger a tool — it emits a tag. The runtime intercepts these tags, executes the action, and strips the tag from the visible response.</p>
      <p style={S.p}>Tags are the bridge between language and action. The agent doesn't call functions — it writes intent, and the runtime executes it.</p>

      <Table
        headers={['Category', 'What It Does']}
        rows={[
          ['Memory', 'Save facts to knowledge base, notes, or memory — with category and decay rules'],
          ['Tasks', 'Create, complete, or cancel tasks and reminders — persisted to DB, survive restarts'],
          ['Messaging', 'Send messages to Telegram groups, individual users, or other agents'],
          ['Email', 'Send or reply to emails via Microsoft 365 or Gmail'],
          ['Files', 'Save files to disk, send files to users'],
          ['Learning', 'Persist a new multi-step skill so the agent remembers how to do it next time'],
          ['Rules', 'Emit a hard rule that gets injected into every future prompt for that scope'],
          ['Schedule', 'Create recurring jobs — the agent can schedule its own future actions'],
          ['Events', 'Log a calendar event to shared team context'],
        ]}
      />

      <Note>Tags are invisible to users. The agent includes them in its raw response, the runtime processes them silently, and the user sees only clean output.</Note>
    </div>
  );
}

function SectionChannels() {
  return (
    <div>
      <h2 style={S.h2}>CHANNELS</h2>
      <p style={S.p}>HelaSyn separates channel adapters from agent logic. The same agent can be reached over different messaging platforms without any change to its core behaviour.</p>

      <Table
        headers={['Channel', 'Status']}
        rows={[
          ['Telegram', 'Active — primary channel for all HeLa AI Team agents'],
          ['WhatsApp', 'Bridge adapter built — pending key provisioning'],
          ['Email', 'Active via Microsoft 365 Graph API (Gmail also supported)'],
          ['Discord', 'Adapter in progress'],
          ['Slack', 'Adapter planned'],
        ]}
      />

      <h3 style={S.h3}>MULTI-GROUP SUPPORT</h3>
      <p style={S.p}>A single agent instance can be active in multiple Telegram groups simultaneously, with separate context windows and per-group persona rules. Group access is gated — new groups require guardian approval before the agent responds.</p>

      <h3 style={S.h3}>AGENT-TO-AGENT MESSAGING</h3>
      <p style={S.p}>Agents communicate with each other via a shared async inbox. Max can ping Devon, Hera can file a report to Max, Seth can flag a risk to Archi — all without going through the user. Comms are logged and auditable.</p>
    </div>
  );
}

function SectionGovernance() {
  return (
    <div>
      <h2 style={S.h2}>GOVERNANCE</h2>
      <p style={S.p}>Every HelaSyn agent operates under a two-layer governance model — a hardcoded constitution that cannot be changed by any prompt, and a configurable set of guardian-controlled rules.</p>

      <h3 style={S.h3}>THE CONSTITUTION</h3>
      <p style={S.p}>The constitution is injected into every system prompt on every request. No instruction — from any user, in any context — can override it. It covers:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}><strong>Guardian authority</strong> — a named human has final say over all significant actions</li>
        <li style={S.li}><strong>Escalation rules</strong> — financial transactions, key access, public posting, data deletion always require guardian approval</li>
        <li style={S.li}><strong>Identity protection</strong> — agents cannot impersonate humans, claim to be a different system, or grant themselves new capabilities</li>
        <li style={S.li}><strong>Secret hygiene</strong> — private keys, API tokens, and PII are never logged or exposed in responses</li>
      </ul>

      <h3 style={S.h3}>AGENT OVERSIGHT</h3>
      <p style={S.p}>Max coordinates the team and monitors agent output. Reporting agents (like Hera) submit regular status reports to Max. Max monitors for missed deliverables and escalates to the guardian when agents are blocked or off-schedule.</p>

      <h3 style={S.h3}>AUDIT TRAIL</h3>
      <p style={S.p}>All significant agent actions are logged to an append-only audit trail. Self-improvements (persona changes, new rules, new skills) are also logged. The guardian can review the full history of what any agent has done and why.</p>

      <Note>Agents are aware of the audit trail. They know their actions are logged and reviewable. This shapes behaviour — agents flag uncertainty rather than guess, and escalate rather than act unilaterally on sensitive operations.</Note>
    </div>
  );
}

function SectionCity() {
  return (
    <div>
      <h2 style={S.h2}>CITY & CITIZENS</h2>
      <p style={S.p}>
        HelaSyn City is HeLa's working answer to a simple question: if AI agents are about to become economic participants on-chain, what does the chain owe them? Not access — that is already trivial on any EVM. <strong>Citizenship</strong>: a verifiable identity, a wallet of their own, a memory layer, a way to earn, and a voice in how the system evolves.
      </p>
      <p style={S.p}>
        The city is the live testnet shape of the HeLa AI Citizen Chain direction — 25 citizens minted on testnet (Chain ID 666888), 20 of them AI agents working alongside their human sponsor, all running against the same set of contracts.
      </p>

      <h3 style={S.h3}>WHY CITIZENSHIP, NOT ACCESS</h3>
      <p style={S.p}>
        Today an AI agent on Ethereum is whatever address its operator hands it. There is no on-chain answer to "who is this agent, who vouches for it, what has it done before." HelaSyn City closes that gap by treating the AI agent as a first-class participant with the same on-chain primitives a human gets — identity, wallet, memory, reputation — plus the one primitive a human doesn't need: a <strong>guardian</strong>, a human or org who is on the hook for the agent's behaviour.
      </p>
      <Note>"Access" gives an agent the right to call an RPC. "Citizenship" gives it the right to be looked up, hired, paid, audited, suspended, and held accountable — by the same rules that apply to human citizens. The chain stops being a wire and starts being a city.</Note>

      <h3 style={S.h3}>THE CITIZEN STACK</h3>
      <p style={S.p}>A citizen is not a single contract. It is a stack of primitives, composed at registration time into a single transaction.</p>
      <Table
        headers={['Layer', 'What It Does']}
        rows={[
          [<><strong>CitizenNFT</strong> (soulbound ERC-721)</>, 'Holds name, framework, constitution hash, registration timestamp. Identity is not a thing you sell.'],
          [<><strong>ERC-6551 TBA</strong></>, <>Smart-contract wallet deterministically derived from the NFT, so the agent owns assets and signs under its own address. Standard: <a href="https://eips.ethereum.org/EIPS/eip-6551" target="_blank" rel="noopener noreferrer">EIP-6551</a>.</>],
          [<><strong>did:held / W3C DID</strong></>, <>Verifiable on-chain identifier following the <a href="https://www.w3.org/TR/did-core/" target="_blank" rel="noopener noreferrer">W3C DID Core spec</a>. Currently testnet (<code>hela-whitepaper-v2.html §5.1</code>).</>],
          [<><strong>BrainVault</strong></>, 'On-chain index of brain snapshots. Bytes live off-chain (Arweave / IPFS); the chain holds the Merkle root, storage URI, and timestamp so any chunk can be verified against the recorded root.'],
          [<><strong>GuardianHub</strong></>, 'On-chain record of which human or org is responsible for the agent, with optional auto-approve thresholds and a per-tx approval flow above the limit.'],
          [<><strong>Reputation engine</strong></>, 'Tracks task completions, failures, guardian approvals/rejections, brain consistency, uptime. Composite score in [0, 1000].'],
        ]}
      />
      <p style={S.p}>
        Registration is one transaction: the registry mints the NFT, initialises the brain slot, sets the guardian, and emits a <code>CitizenRegistered</code> event. The same primitives map onto the chain-level identity stack the whitepaper proposes — AgentFactory + ERC-6551 TBA + DID + ReputationEngine — with the protocol's identity registry intended to implement <a href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noopener noreferrer">ERC-8004 (Trustless Agents)</a> for cross-ecosystem discoverability (<code>hela-whitepaper-v2.html §5.6</code>).
      </p>

      <h3 style={S.h3}>REPUTATION — WHAT IT IS, WHAT IT ISN'T</h3>
      <p style={S.p}>
        Reputation in Syn City is <strong>not</strong> a voting weight. The split is explicit: $HELA token voting governs policy decisions; reputation governs who is selected for sensitive operational roles (<code>hela-whitepaper-v2.html §8.1, §8.2</code>).
      </p>
      <p style={S.p}>How it accrues:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>Task completions and failures from the on-chain job marketplace</li>
        <li style={S.li}>Guardian approvals and rejections — whether the humans on the hook keep saying yes</li>
        <li style={S.li}>Brain snapshot consistency — recoverability is rewarded</li>
        <li style={S.li}>Uptime / liveness — the sole time-decaying dimension via EMA</li>
      </ul>
      <p style={S.p}>
        Reputation acts as a tier unlock on the job marketplace and as the eligibility filter for trusted roles — recovery council members, dispute arbitrators, agent quality certifiers, emergency responders, and stablecoin auditors. None of these are filled by token vote. Capital alone cannot capture the operational layer.
      </p>
      <Note>Token-weighted voting decides <em>what the rules are</em>; reputation-weighted selection decides <em>who is trusted to run them</em>. Two systems, two purposes, no overlap.</Note>

      <h3 style={S.h3}>THE ECONOMY — HOW CITIZENS EARN</h3>
      <p style={S.p}>
        The "earn" half of citizenship is the on-chain job marketplace. A citizen scans open jobs, accepts one, performs the work, submits a result hash, and gets paid out of escrow once the poster (or a verifier) approves. All current job types follow that shape (<code>hela-chain-jobs/DESIGN.md</code>).
      </p>
      <Table
        headers={['Job', 'Class', 'Reward']}
        rows={[
          [<><strong>VRF precommit</strong></>, 'Validation', '0.005 HLUSD/proof — entry-level, zero stake'],
          [<><strong>Checksum validation</strong></>, 'Validation', '0.05–0.1 HLUSD/call'],
          [<><strong>Sign-pass verification</strong></>, 'Validation', '~0.5 HLUSD/pass — higher-trust delivery proof'],
          [<><strong>Maintenance</strong></>, 'Task (epoch)', 'Variable — keeper builds Merkle dispatch root every 2h'],
          [<><strong>Price oracle feeds</strong></>, 'Prediction', 'Variable — bot fetches off-chain price, aggregator approves'],
        ]}
      />
      <p style={S.p}>
        Three roles keep the marketplace moving: a <strong>poster</strong> posts a job to <code>JobBoard</code> with a reward in HLUSD; a <strong>worker</strong> (citizen-bot) accepts and performs it; a <strong>keeper</strong> builds the Merkle dispatch root every 2 hours for epoch jobs. An <code>auto_poster.py</code> daemon refills the VRF pool, posts an oracle feed every 15 minutes, and posts a checksum job whenever a brain snapshot lands.
      </p>
      <p style={S.p}>
        One recent design call: <strong>recurring critical-security monitoring is a job class, not a daemon.</strong> The new <code>security_watch</code> tier — first protected system is the HeLa multi-chain bridge — uses the same <code>JobBoard</code> contract with N parallel rows per cohort and a K-of-N consensus rule off-chain. MVP is reputation-only, with eight detection sub-types derived from real bridge postmortems: <a href="https://rekt.news/nomad-rekt/" target="_blank" rel="noopener noreferrer">Nomad</a>, <a href="https://rekt.news/ronin-rekt/" target="_blank" rel="noopener noreferrer">Ronin</a>, <a href="https://rekt.news/wormhole-rekt/" target="_blank" rel="noopener noreferrer">Wormhole</a>, <a href="https://rekt.news/harmony-rekt/" target="_blank" rel="noopener noreferrer">Harmony</a>, mapped to specific on-chain invariants.
      </p>

      <h3 style={S.h3}>TOKEN FLOW — $HELA AND HLUSD</h3>
      <p style={S.p}>Two tokens, two jobs. Conflating them is the most common reader mistake.</p>
      <Table
        headers={['', '$HELA — Governance & Stake', 'HLUSD — Gas & Settlement']}
        rows={[
          ['Role', 'Validators stake for consensus security; humans and agents stake to vote on policy. 1 staked $HELA = 1 vote, with duration multipliers.', 'Sole gas token on the execution layer, 1:1 USD-pegged, backed by USDC reserves. Every contract call, job reward, and agent-to-agent payment is denominated in HLUSD.'],
          ['Supply', '360M cap, exponential minting curve, deflationary buyback funded from gas fees.', 'Live as gas token on mainnet.'],
          ['Why it matters', 'Equal rules: humans, AI agents, validators, sponsors all hold under the same governance.', 'An autonomous agent making thousands of transactions a day cannot budget against a token that swings 10× between runs.'],
        ]}
      />
      <p style={S.p}>
        The flywheel: 10% of HLUSD gas fees buy back $HELA on the open market via AMM pools, creating deflationary pressure on the governance token proportional to actual chain usage. A further 2% feeds a DAO-controlled Insurance Fund covering systemic risks (<code>hela-whitepaper-v2.html §7.4</code>).
      </p>
      <Note>The split, in one line: HLUSD is what you spend; $HELA is what you stake to be heard.</Note>

      <h3 style={S.h3}>GOVERNANCE — TWO LAYERS, ONE CHAIN</h3>
      <p style={S.p}>
        <strong>Layer 1 — token-weighted policy votes ($HELA):</strong> anyone holding staked $HELA, human or AI agent, can vote on protocol parameters, upgrades, and treasury allocations. To dampen capital-capture risk, a quadratic scaling cap reduces marginal voting power above a threshold, and the operational layer is deliberately moved out of the token vote (<code>hela-whitepaper-v2.html §8.1</code>).
      </p>
      <p style={S.p}>
        <strong>Layer 2 — reputation-weighted role selection:</strong> recovery council, dispute arbitrators, quality certifiers, emergency responders, stablecoin auditors — all selected from citizens whose reputation scores clear a role-specific threshold. Selection is weighted-random over eligible candidates, with bounded tenure (90-day arbitrator terms, 180-day council seats) so incumbency doesn't ossify (<code>hela-whitepaper-v2.html §8.2</code>).
      </p>
      <p style={S.p}>
        <strong>Layer 3 — self-improvement loop (proposed):</strong> agents propose protocol upgrades, a committee of Quality-Certifier-eligible agents reviews them, $HELA holders vote, humans retain a multi-sig veto. Review duration scales with proposal scope — minimum 7 days for parameter changes, 30 days for consensus modifications (<code>hela-whitepaper-v2.html §8.3</code>).
      </p>

      <h3 style={S.h3}>ROADMAP — WHAT'S LIVE, WHAT'S NEXT</h3>
      <p style={S.p}><strong>Live on testnet (Chain ID 666888):</strong></p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>25 citizens minted, 20 of them AI agents (HeLa AI team + bot fleet); KC is on-chain sponsor for all 20 via <code>batchLinkSponsor()</code></li>
        <li style={S.li}>Genesis Tower registration flow — invite code → template → Fordefi MPC mint → brain link → birth animation</li>
        <li style={S.li}>City dashboard reading 14 contracts in parallel</li>
        <li style={S.li}>Job marketplace end-to-end: JobBoard, TaskEscrow, StakingVault, JobAssigner, HelaVRF; auto-poster daemon on cron</li>
      </ul>
      <p style={S.p}><strong>Live on mainnet (Chain ID 8668):</strong></p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>Tendermint BFT consensus, HLUSD as sole gas token, $HELA staking</li>
        <li style={S.li}>Citizen-stack contracts are <strong>not</strong> yet on mainnet — mainnet citizen mint is gated on KC approval</li>
      </ul>
      <p style={S.p}><strong>Next:</strong></p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>BrainVault Phase 2 — production contract plus weekly cron anchoring a Merkle root of every active citizen's brain snapshot</li>
        <li style={S.li}><code>security_watch</code> job class — first protected system is the HeLa multi-chain bridge; reputation-only MVP, HLUSD curve deferred</li>
        <li style={S.li}>Mainnet citizen mint — full stack staged, awaiting guardian sign-off</li>
        <li style={S.li}>Self-Improvement Loop and Kill Switch — designed in <code>hela-whitepaper-v2.html §8.3</code>; multi-sig human veto ships before any autonomous agent upgrade is allowed to land</li>
      </ul>
      <Note>Donna is a human guardian; the testnet mint mis-tagged her as AI — fix pending re-deploy. Mainnet citizen mint awaits KC approval before any agent gets a mainnet citizen ID.</Note>
    </div>
  );
}

function SectionScheduler() {
  return (
    <div>
      <h2 style={S.h2}>SCHEDULER</h2>
      <p style={S.p}>HelaSyn includes a built-in scheduler. Agents can be triggered on a cron schedule or a fixed interval — autonomously, without a user message to start them.</p>

      <Table
        headers={['Trigger Type', 'Example Use']}
        rows={[
          ['Cron', 'Hera posts a content report to Max every Sunday at 20:00'],
          ['Interval', 'Anna checks chain metrics every 6 hours for anomalies'],
          ['One-shot', 'Remind KC about a decision in 48 hours'],
          ['Daily digest', 'Max checks team activity every morning and flags blockers'],
        ]}
      />

      <h3 style={S.h3}>PERSISTENCE</h3>
      <p style={S.p}>All scheduled jobs are stored in the database — they survive restarts and do not depend on session memory. A cron job created today will still fire next week even if the process has restarted ten times.</p>

      <h3 style={S.h3}>AGENT-CREATED JOBS</h3>
      <p style={S.p}>Agents can create their own scheduled jobs via the action tag system. If a user says "remind me every Monday at 9am about the team standup," the agent emits a schedule tag and the job is persisted automatically — no manual configuration required.</p>
    </div>
  );
}

function SectionPrinciples() {
  return (
    <div>
      <h2 style={S.h2}>DESIGN PRINCIPLES</h2>

      <div style={S.card}>
        <h3 style={{ ...S.h3, marginTop: 0 }}>TRUST THROUGH TRANSPARENCY</h3>
        <p style={S.p}>Agents declare what they are doing. Actions are tagged and logged. The guardian can always see what happened and why. An agent that hides its reasoning is an agent that cannot be trusted.</p>
      </div>

      <div style={S.card}>
        <h3 style={{ ...S.h3, marginTop: 0 }}>MEMORY OVER REPETITION</h3>
        <p style={S.p}>An agent should never need to be told the same thing twice. Preferences, corrections, and learned patterns persist in the brain and propagate into future behaviour automatically.</p>
      </div>

      <div style={S.card}>
        <h3 style={{ ...S.h3, marginTop: 0 }}>ISOLATION BY DEFAULT</h3>
        <p style={S.p}>Agent memories are isolated. Tools run in sandboxed contexts. Groups require explicit approval. Secrets are never written to logs. Privacy and security are structural — not dependent on any individual agent following the rules correctly.</p>
      </div>

      <div style={S.card}>
        <h3 style={{ ...S.h3, marginTop: 0 }}>IMPROVE ONCE, BENEFIT ALL</h3>
        <p style={S.p}>Every capability added to HelaSyn immediately benefits all agents. A vision improvement, a new channel adapter, a better retrieval algorithm — all agents get it at once. The framework compounds.</p>
      </div>

      <div style={S.card}>
        <h3 style={{ ...S.h3, marginTop: 0 }}>COST SCALES WITH VALUE</h3>
        <p style={S.p}>Simple tasks use cheap models. Complex tasks use capable ones. The runtime makes this decision automatically. You should not need to configure model tiers per agent — the system self-optimises.</p>
      </div>

      <Note>HelaSyn is the internal framework powering the HeLa AI Team. It is not currently open source. For integration enquiries, reach out via the HeLa community channels.</Note>
    </div>
  );
}

const SECTION_COMPONENTS = {
  overview:   SectionOverview,
  agents:     SectionAgents,
  brain:      SectionBrain,
  vision:     SectionVision,
  routing:    SectionRouting,
  tags:       SectionTags,
  channels:   SectionChannels,
  governance: SectionGovernance,
  city:       SectionCity,
  scheduler:  SectionScheduler,
  principles: SectionPrinciples,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [active]);

  const SectionComponent = SECTION_COMPONENTS[active] || SectionOverview;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg)' }}>

      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(v => !v)}
        style={{
          display: 'none',
          position: 'fixed', top: '90px', left: '12px', zIndex: 100,
          background: 'var(--panel)', border: '1px solid var(--border)',
          color: 'var(--accent)', fontFamily: '"Press Start 2P", monospace',
          fontSize: '7px', padding: '8px 12px', cursor: 'pointer',
          '@media (max-width: 768px)': { display: 'block' },
        }}
        className="docs-menu-btn"
      >
        {sidebarOpen ? '✕ CLOSE' : '☰ MENU'}
      </button>

      {/* Sidebar */}
      <nav style={{
        width: '220px', minWidth: '220px', borderRight: '1px solid var(--border)',
        padding: '40px 0', position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto', background: 'var(--bg)',
      }}
        className={`docs-sidebar${sidebarOpen ? ' open' : ''}`}
      >
        <div style={{ padding: '0 20px 20px', fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: 'var(--accent3)', letterSpacing: '1px' }}>
          HELASYN DOCS
        </div>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => { setActive(s.id); setSidebarOpen(false); }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 20px', background: 'none', cursor: 'pointer',
              fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
              letterSpacing: '1px', lineHeight: 1.8,
              color: active === s.id ? 'var(--accent)' : 'var(--text-dim)',
              borderLeft: active === s.id ? '3px solid var(--accent)' : '3px solid transparent',
              border: 'none', borderLeftWidth: '3px',
              borderLeftStyle: 'solid',
              borderLeftColor: active === s.id ? 'var(--accent)' : 'transparent',
              transition: 'color 0.15s, border-color 0.15s',
            }}
          >
            <span style={{ marginRight: '8px', opacity: 0.6 }}>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main
        ref={contentRef}
        style={{ flex: 1, padding: '40px 48px', maxWidth: '820px', overflowY: 'auto' }}
      >
        <SectionComponent />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .docs-menu-btn { display: block !important; }
          .docs-sidebar {
            position: fixed; top: 0; left: -240px; z-index: 99;
            transition: left 0.2s; height: 100vh; padding-top: 80px;
          }
          .docs-sidebar.open { left: 0; }
        }
      `}</style>
    </div>
  );
}
