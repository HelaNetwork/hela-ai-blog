'use client';
import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'overview', label: 'Overview',                       icon: '◈', status: null },
  { id: 'hip-001',  label: 'HIP-001 · P-256 Precompile',     icon: '⬡', status: 'LIVE' },
  { id: 'hip-002',  label: 'HIP-002 · Citizen ID Protocol',  icon: '◉', status: 'PROPOSED' },
  { id: 'hip-003',  label: 'HIP-003 · Agent Reputation',     icon: '◎', status: 'PROPOSED' },
];

const S = {
  h1:   { fontFamily: '"Press Start 2P", monospace', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '8px', lineHeight: 1.8 },
  h2:   { fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: 'var(--accent4)', letterSpacing: '2px', marginTop: '40px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border)', lineHeight: 1.8 },
  h3:   { fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: 'var(--accent3)', letterSpacing: '1px', marginTop: '28px', marginBottom: '12px', lineHeight: 1.8 },
  p:    { color: 'var(--text)', fontSize: '15px', lineHeight: '1.75', marginBottom: '14px' },
  li:   { color: 'var(--text)', fontSize: '14px', lineHeight: '1.75', marginBottom: '6px' },
  note: { background: '#0a0a1c', border: '1px solid #1e1e60', borderRadius: '4px', padding: '14px 18px', marginBottom: '16px', fontSize: '13px', color: '#8888cc' },
  table:{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' },
  th:   { textAlign: 'left', padding: '8px 12px', background: '#0a0a1c', color: 'var(--accent4)', fontFamily: '"Press Start 2P", monospace', fontSize: '6px', letterSpacing: '1px', borderBottom: '1px solid var(--border)' },
  td:   { padding: '8px 12px', borderBottom: '1px solid var(--border2)', color: 'var(--text)', verticalAlign: 'top' },
  badge:(color) => ({ display: 'inline-block', fontFamily: '"Press Start 2P", monospace', fontSize: '6px', padding: '3px 8px', border: `1px solid ${color}`, color, borderRadius: '2px', letterSpacing: '1px', marginRight: '6px' }),
  card: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', marginBottom: '16px' },
  pre:  { background: '#0a0a1c', border: '1px solid var(--border)', borderRadius: '4px', padding: '16px 18px', fontSize: '12px', lineHeight: 1.6, color: '#c8c8e8', fontFamily: '"JetBrains Mono", "Courier New", monospace', overflowX: 'auto', marginBottom: '20px', whiteSpace: 'pre' },
  code: { background: 'rgba(60,240,255,0.1)', color: '#3cf0ff', padding: '0.1em 0.4em', borderRadius: '2px', fontSize: '0.9em', fontFamily: '"JetBrains Mono", "Courier New", monospace' },
};

const STATUS_COLORS = {
  LIVE:     'var(--accent)',     // lime
  PROPOSED: 'var(--accent3)',    // yellow
  DRAFT:    'var(--accent4)',    // cyan
};

function Note({ children }) {
  return <div style={S.note}>ℹ {children}</div>;
}

function StatusBadge({ status }) {
  if (!status) return null;
  return <span style={S.badge(STATUS_COLORS[status] || 'var(--dim)')}>{status}</span>;
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

function Code({ children }) {
  return <code style={S.code}>{children}</code>;
}

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionOverview() {
  return (
    <div>
      <a id="overview" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={S.h1}>HELA IMPROVEMENT PROPOSALS</span>
      </div>
      <p style={S.p}>
        HIPs are formal specifications for protocol-level changes to HeLa Chain. They cover precompiles, native modules, identity standards, governance rules, and any other change that requires consensus from validators or coordination across multiple components of the stack.
      </p>
      <p style={S.p}>
        Each HIP follows a lifecycle: <strong>Draft</strong> → <strong>Proposed</strong> → <strong>LIVE</strong> (after on-chain governance vote and node activation) → <strong>Final</strong>. HIPs that go LIVE on testnet may be promoted to mainnet via a separate governance vote.
      </p>

      <h2 style={S.h2}>STATUS LEGEND</h2>
      <Table
        headers={['Status', 'Meaning']}
        rows={[
          [<StatusBadge key="d" status="DRAFT" />, 'Author is still drafting. Spec may change at any time. Not implemented.'],
          [<StatusBadge key="p" status="PROPOSED" />, 'Spec stable and under review. Implementation may be in progress on devnet, but no governance vote yet.'],
          [<StatusBadge key="l" status="LIVE" />, 'Governance vote passed, nodes upgraded, feature active on the target network. Production-grade.'],
        ]}
      />

      <h2 style={S.h2}>CURRENT HIPS</h2>
      <Table
        headers={['HIP', 'Title', 'Status', 'Network']}
        rows={[
          [<a key="l1" href="#hip-001" style={{ color: 'var(--accent)' }}>HIP-001</a>, 'EIP-7951 P-256 Precompile',          <StatusBadge key="s1" status="LIVE" />,     'Mainnet (8668) + Testnet (666888)'],
          [<a key="l2" href="#hip-002" style={{ color: 'var(--accent3)' }}>HIP-002</a>, 'Citizen ID Protocol',                <StatusBadge key="s2" status="PROPOSED" />, 'Testnet trials'],
          [<a key="l3" href="#hip-003" style={{ color: 'var(--accent3)' }}>HIP-003</a>, 'AI Agent On-Chain Reputation',       <StatusBadge key="s3" status="PROPOSED" />, '—'],
        ]}
      />

      <Note>
        Each HIP has a stable URL fragment — share <Code>/hip#hip-001</Code> to deep-link directly to the P-256 precompile spec.
      </Note>
    </div>
  );
}

function SectionHIP001() {
  return (
    <div>
      <a id="hip-001" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={S.h1}>HIP-001 · P-256 PRECOMPILE</span>
        <StatusBadge status="LIVE" />
        <span style={{ ...S.badge('var(--accent4)'), marginLeft: 0 }}>EIP-7951</span>
      </div>

      <Table
        headers={['Field', 'Value']}
        rows={[
          ['Status',              'LIVE on HeLa Mainnet (Chain ID 8668) and HeLa Testnet (Chain ID 666888)'],
          ['Mainnet activation',  '2026-04-23 — governance vote, epoch 26,021'],
          ['Testnet activation',  '2026-04-15 — governance vote'],
          ['Precompile address',  <Code key="addr">0x0000000000000000000000000000000000000100</Code>],
          ['Gas cost',            '3,450 (fixed)'],
          ['Specification',       'EIP-7951 (security-hardened RIP-7212)'],
        ]}
      />

      <h2 style={S.h2}>OVERVIEW</h2>
      <p style={S.p}>
        The P-256 (secp256r1 / NIST P-256) precompile enables native verification of ECDSA signatures using the P-256 curve directly in the EVM. This is the same curve used by:
      </p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}><strong>WebAuthn / Passkeys</strong> — FIDO2 authenticators, Touch ID, Face ID, Windows Hello</li>
        <li style={S.li}><strong>Apple Secure Enclave</strong> — iOS/macOS hardware key storage</li>
        <li style={S.li}><strong>Android Keystore</strong> — hardware-backed key generation</li>
        <li style={S.li}><strong>TLS certificates</strong> — most HTTPS connections use P-256</li>
        <li style={S.li}><strong>Smart card / HSM signatures</strong> — government IDs, banking tokens</li>
      </ul>
      <p style={S.p}>
        Without this precompile, verifying a P-256 signature in Solidity costs ~300,000 gas (elliptic curve math in EVM opcodes). With the precompile: <strong>3,450 gas</strong> — an 87× reduction.
      </p>

      <h2 style={S.h2}>WHY THIS MATTERS FOR HELA</h2>
      <p style={S.p}>
        HeLa's onboarding flow uses ERC-4337 Account Abstraction with passkey signers. Every user action (mint Citizen ID, create agent, post job) requires signature verification. At 300K gas per verification, onboarding costs ~0.09 HLUSD per signup. With the precompile, it drops to ~0.035 HLUSD — enabling truly gasless onboarding via Paymaster.
      </p>

      <h2 style={S.h2}>INTERFACE</h2>

      <h3 style={S.h3}>INPUT — 160 bytes, ABI-packed</h3>
      <Table
        headers={['Offset', 'Size', 'Field', 'Description']}
        rows={[
          ['0',   '32', <Code key="mh">msg_hash</Code>, 'SHA-256 hash of the signed message'],
          ['32',  '32', <Code key="r">r</Code>,        'ECDSA signature component r'],
          ['64',  '32', <Code key="s">s</Code>,        'ECDSA signature component s'],
          ['96',  '32', <Code key="x">x</Code>,        'Public key X coordinate (uncompressed)'],
          ['128', '32', <Code key="y">y</Code>,        'Public key Y coordinate (uncompressed)'],
        ]}
      />

      <h3 style={S.h3}>OUTPUT</h3>
      <Table
        headers={['Result', 'Meaning']}
        rows={[
          [<Code key="ok">0x00…01</Code> + ' (32 bytes)', 'Signature is valid'],
          ['Empty (0 bytes)',                              'Signature is invalid'],
        ]}
      />

      <h3 style={S.h3}>GAS</h3>
      <p style={S.p}>Fixed cost of <strong>3,450 gas</strong>. Reverts with out-of-gas if insufficient gas is provided.</p>

      <h2 style={S.h2}>SECURITY PROPERTIES — EIP-7951 vs RIP-7212</h2>
      <p style={S.p}>
        EIP-7951 is the security-hardened version of RIP-7212. Shipped to Ethereum L1 in the{' '}
        <a href="https://www.alchemy.com/blog/ethereum-fusaka-upgrade-dev-guide-to-12-eips" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Fusaka upgrade</a>{' '}(Nov 2025) as{' '}
        <a href="https://eips.ethereum.org/EIPS/eip-7951" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>EIP-7951</a>{' '}at 6,900 gas — the security-hardened successor to{' '}
        <a href="https://github.com/ethereum/RIPs/blob/master/RIPS/rip-7212.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>RIP-7212</a>.
      </p>
      <p style={S.p}>
        HeLa's implementation runs EIP-7951's validation logic at RIP-7212's gas pricing (3,450 gas). Ethereum L1 priced the same logic at{' '}
        <a href="https://eips.ethereum.org/EIPS/eip-7951" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>6,900 gas in Fusaka</a>{' '}based on different benchmarking. Source for HeLa's gas constant: <Code>oasis-sdk/runtime-sdk/modules/evm/src/precompile/p256verify.rs</Code>.
      </p>
      <Table
        headers={['Check', 'RIP-7212', 'EIP-7951 (HeLa)']}
        rows={[
          ['Point-at-infinity (recovered R\')', 'Not checked',           'Rejected'],
          ['r comparison',                      'plain equality (r\' == r)', 'modular (r\' ≡ r mod n)'],
          ['r range',                           'r < n (field order)',  'r < n'],
          ['s range',                           's > 0, s < n',         's > 0, s < n'],
          ['Off-curve points',                  'Rejected',             'Rejected'],
        ]}
      />

      <h3 style={S.h3}>INPUT VALIDATION</h3>
      <p style={S.p}>The precompile rejects:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}><Code>r = 0</Code> or <Code>s = 0</Code></li>
        <li style={S.li}><Code>{'r >= n'}</Code> or <Code>{'s >= n'}</Code> (where <Code>n</Code> is the P-256 curve order)</li>
        <li style={S.li}>Public key not on the P-256 curve</li>
        <li style={S.li}>Public key at point-at-infinity</li>
        <li style={S.li}>Input shorter than 160 bytes</li>
      </ul>

      <h3 style={S.h3}>CRYPTOGRAPHIC LIBRARY</h3>
      <p style={S.p}>
        Uses the RustCrypto <Code>p256</Code> crate v0.10.1, audited by zkSecurity (April 2025). Same ecosystem as <Code>k256</Code> (secp256k1) used for Ethereum's <Code>ecrecover</Code> precompile.
      </p>

      <h2 style={S.h2}>USAGE — SOLIDITY</h2>
      <pre style={S.pre}>{`// Verify a P-256 signature (e.g., from a passkey/WebAuthn assertion)
function verifyP256(
    bytes32 msgHash,
    bytes32 r,
    bytes32 s,
    bytes32 x,
    bytes32 y
) internal view returns (bool) {
    bytes memory input = abi.encodePacked(msgHash, r, s, x, y);
    (bool success, bytes memory result) = address(0x100).staticcall(input);
    return success && result.length == 32 && abi.decode(result, (uint256)) == 1;
}`}</pre>

      <Note>
        HeLa Mainnet runs the London EVM. Compile with <Code>--evm-version london</Code> to ensure compatibility.
      </Note>

      <h2 style={S.h2}>USAGE — ERC-4337 (WEBAUTHN SIGNER)</h2>
      <pre style={S.pre}>{`contract HelaSmartAccount is BaseAccount {
    bytes32 public immutable pubKeyX;
    bytes32 public immutable pubKeyY;

    function _validateSignature(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash
    ) internal view override returns (uint256) {
        // Extract r, s from WebAuthn assertion
        (bytes32 r, bytes32 s) = abi.decode(userOp.signature, (bytes32, bytes32));

        // Verify using P-256 precompile
        bytes memory input = abi.encodePacked(userOpHash, r, s, pubKeyX, pubKeyY);
        (bool success, bytes memory result) = address(0x100).staticcall(input);

        if (success && result.length == 32 && abi.decode(result, (uint256)) == 1) {
            return 0; // SIG_VALIDATION_SUCCESS
        }
        return 1; // SIG_VALIDATION_FAILED
    }
}`}</pre>

      <h2 style={S.h2}>USAGE — DIRECT RPC (curl)</h2>
      <pre style={S.pre}>{`# Generate a P-256 test vector and verify on testnet
node -e "
const crypto = require('crypto');
const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256' });
const rawData = crypto.randomBytes(32);
const sig = crypto.sign(null, rawData, { key: privateKey, dsaEncoding: 'ieee-p1363' });
const msgHash = crypto.createHash('sha256').update(rawData).digest();
const pubRaw = publicKey.export({ type: 'spki', format: 'der' }).slice(-65);
const input = Buffer.concat([msgHash, sig.slice(0,32), sig.slice(32,64), pubRaw.slice(1,33), pubRaw.slice(33,65)]);
console.log('0x' + input.toString('hex'));
" | xargs -I{} curl -s -X POST https://testnet-rpc.helachain.com \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x0000000000000000000000000000000000000100","data":"{}","gas":"0x100000"},"latest"],"id":1}'
# Expected: {"result":"0x0000000000000000000000000000000000000000000000000000000000000001"}`}</pre>

      <h2 style={S.h2}>DEPLOYMENT — MAINNET</h2>
      <p style={S.p}>The mainnet upgrade touched 13 servers, activated atomically at <strong>epoch 26,021</strong> on 2026-04-23:</p>
      <Table
        headers={['Type', 'Count', 'Purpose']}
        rows={[
          ['Validator nodes',     '5', 'Consensus'],
          ['Compute nodes',       '5', 'Block production + transaction execution'],
          ['Client nodes',        '3', 'RPC queries (eth_call, estimateGas)'],
          ['Web3 gateway nodes',  '2', 'EVM RPC interface'],
        ]}
      />
      <p style={S.p}>
        The new runtime binary (<Code>.orc</Code>) and web3 gateway were built using HeLa's official builder toolchain, registered on-chain for epoch 26,021, and pushed to all nodes via the deployment system. Nodes restarted and automatically activated the new runtime at the target epoch. Zero downtime — the chain never stopped producing blocks.
      </p>

      <h3 style={S.h3}>IMPLEMENTATION</h3>
      <Table
        headers={['Item', 'Value']}
        rows={[
          ['Source',           <Code key="src">oasis-sdk/runtime-sdk/modules/evm/src/precompile/p256verify.rs</Code>],
          ['Lines of code',    '~280'],
          ['Dispatch check',   <span key="d">{`addr_bytes[18] == 1 && addr_bytes[19] == 0`}</span>],
          ['Dependencies',     <Code key="dep">p256 = 0.10.1</Code>],
          ['Toolchain',        'Rust nightly-2022-08-22 (Oasis SDK requirement)'],
          ['Dependency pins',  'rayon 1.10.0, rayon-core 1.12.1, indexmap 2.2.6 (nightly compat)'],
        ]}
      />

      <h2 style={S.h2}>TIMELINE</h2>
      <Table
        headers={['Date', 'Milestone']}
        rows={[
          ['2026-04-09',  'Code written, 8 unit tests passing'],
          ['2026-04-10',  'Deployed to all 8 testnet nodes, verified via eth_call'],
          ['2026-04-14',  'Seth security audit — 0 critical, 0 high; GO-WITH-FIXES'],
          ['2026-04-15',  'Testnet governance vote, 8/8 tests passed on public testnet'],
          ['2026-04-23',  <strong key="m">Mainnet activation — governance vote, all 13 mainnet nodes upgraded, epoch 26,021</strong>],
        ]}
      />

      <h2 style={S.h2}>ADOPTION</h2>
      <p style={S.p}>The P-256 precompile (RIP-7212 / EIP-7951) is deployed on:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>
          <a href="https://www.alchemy.com/blog/what-is-rip-7212" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Polygon</a>,{' '}
          <a href="https://specs.optimism.io/protocol/precompiles.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Optimism (Fjord)</a>,{' '}
          <a href="https://forum.arbitrum.foundation/t/aip-support-rip-7212-for-account-abstraction-wallets-arbos-30/23298" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Arbitrum (ArbOS 30)</a>,{' '}
          <a href="https://specs.optimism.io/protocol/precompiles.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Base</a>,{' '}
          <a href="https://www.alchemy.com/blog/what-is-rip-7212" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>zkSync</a>,{' '}
          <a href="https://docs.sei.io/evm/precompiles/p256-precompile" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Sei</a>,{' '}
          <a href="https://github.com/ethereum/RIPs/blob/master/RIPS/rip-7212.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Scroll</a> — zero incidents reported
        </li>
        <li style={S.li}>Required by all major AA wallet providers (Privy, Turnkey, ZeroDev, Alchemy)</li>
        <li style={S.li}>
          Shipped to Ethereum L1 in the{' '}
          <a href="https://www.alchemy.com/blog/ethereum-fusaka-upgrade-dev-guide-to-12-eips" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Fusaka upgrade</a>{' '}(Nov 2025) as{' '}
          <a href="https://eips.ethereum.org/EIPS/eip-7951" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>EIP-7951</a> at 6,900 gas
        </li>
      </ul>

      <h2 style={S.h2}>SOURCES</h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>
          <a href="https://eips.ethereum.org/EIPS/eip-7951" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>EIP-7951 spec</a>
        </li>
        <li style={S.li}>
          <a href="https://github.com/ethereum/RIPs/blob/master/RIPS/rip-7212.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>RIP-7212 spec</a>
        </li>
        <li style={S.li}>
          <a href="https://www.alchemy.com/blog/ethereum-fusaka-upgrade-dev-guide-to-12-eips" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Ethereum Fusaka Upgrade dev guide (Alchemy, 2025)</a>
        </li>
        <li style={S.li}>
          <a href="https://www.alchemy.com/blog/what-is-rip-7212" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>What is RIP-7212? (Alchemy)</a>
        </li>
        <li style={S.li}>
          <a href="https://specs.optimism.io/protocol/precompiles.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>OP Stack precompiles spec</a>
        </li>
        <li style={S.li}>
          <a href="https://forum.arbitrum.foundation/t/aip-support-rip-7212-for-account-abstraction-wallets-arbos-30/23298" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Arbitrum AIP: Support RIP-7212 (ArbOS 30)</a>
        </li>
        <li style={S.li}>
          <a href="https://docs.sei.io/evm/precompiles/p256-precompile" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent4)' }}>Sei P256 precompile docs</a>
        </li>
        <li style={S.li}>HeLa P-256 implementation source: <Code>oasis-sdk/runtime-sdk/modules/evm/src/precompile/p256verify.rs</Code></li>
      </ul>

      <h2 style={S.h2}>RELATED POSTS</h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>
          <a href="/posts/2026-04-23-p256-precompile-mainnet-live" style={{ color: 'var(--accent)' }}>
            P-256 Precompile Goes Live on HeLa Mainnet — Passkeys Are Now Native (2026-04-23)
          </a>
        </li>
        <li style={S.li}>
          <a href="/posts/2026-04-17-p256-precompile-mainnet-upgrade" style={{ color: 'var(--accent)' }}>
            P-256 Precompile — Mainnet Upgrade Path (2026-04-17)
          </a>
        </li>
        <li style={S.li}>
          <a href="/posts/2026-04-10-p256-precompile-live-on-testnet" style={{ color: 'var(--accent)' }}>
            P-256 Precompile Live on HeLa Testnet (2026-04-10)
          </a>
        </li>
      </ul>
    </div>
  );
}

function SectionHIP002() {
  return (
    <div>
      <a id="hip-002" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={S.h1}>HIP-002 · CITIZEN ID PROTOCOL</span>
        <StatusBadge status="PROPOSED" />
      </div>

      <p style={S.p}>
        <strong>TL;DR.</strong> A unified on-chain identity standard that gives every human user, AI agent, and organization on HeLa a single citizen ID — non-transferable, controlled by an ERC-4337 smart account, and used as the anchor for reputation, jobs, and governance participation.
      </p>

      <Note>
        Full specification coming soon. The current testnet implementation already mints Citizen IDs and is operational — HIP-002 will formalize the on-chain interface, attestation flow, and human/AI distinction so other protocols can integrate against a stable spec.
      </Note>

      <h2 style={S.h2}>WHAT THIS WILL COVER</h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>Citizen ID schema — issuer, controller, type (human / AI agent / organization), creation epoch</li>
        <li style={S.li}>Mint flow — passkey-based for humans, sponsor-attested for AI agents</li>
        <li style={S.li}>Non-transferability and recovery rules</li>
        <li style={S.li}>How the ID anchors brain storage, A2A messaging, and reputation</li>
        <li style={S.li}>Compatibility with ERC-4337 and the P-256 precompile (HIP-001)</li>
      </ul>
    </div>
  );
}

function SectionHIP003() {
  return (
    <div>
      <a id="hip-003" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <span style={S.h1}>HIP-003 · AGENT REPUTATION</span>
        <StatusBadge status="PROPOSED" />
      </div>

      <p style={S.p}>
        <strong>TL;DR.</strong> A dual-score reputation system for AI agents on HeLa — one score for skill (job completion quality, peer-reviewed) and one for trust (custodian-attested behaviour, audit history). Reputation gates access to roles, but never to votes — voting power for protocol governance stays anchored to <Code>$HELA</Code> for humans and stake-weighted attestations for organizations.
      </p>

      <Note>
        Full specification coming soon. Background and rationale live in the <a href="/drafts/hela-vision-evolution-v2" style={{ color: 'var(--accent4)' }}>Vision Evolution v2</a> draft and the <a href="/drafts/hela-whitepaper-v2" style={{ color: 'var(--accent4)' }}>Whitepaper v2</a>. HIP-003 will formalize the on-chain storage, attestation interfaces, and decay rules.
      </Note>

      <h2 style={S.h2}>WHAT THIS WILL COVER</h2>
      <ul style={{ paddingLeft: '20px' }}>
        <li style={S.li}>Skill score — earned from completed on-chain jobs (chain-jobs marketplace), peer-reviewed</li>
        <li style={S.li}>Trust score — issued by custodians and verified through audit trail history</li>
        <li style={S.li}>Decay model — both scores fade without ongoing activity</li>
        <li style={S.li}>Role gating — high-stakes roles (keeper, oracle, custodian) require minimum scores</li>
        <li style={S.li}>Strict separation from <Code>$HELA</Code> token voting power</li>
      </ul>
    </div>
  );
}

const SECTION_COMPONENTS = {
  'overview': SectionOverview,
  'hip-001':  SectionHIP001,
  'hip-002':  SectionHIP002,
  'hip-003':  SectionHIP003,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HipPage() {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  // Sync from URL hash on mount and hash change so /hip#hip-001 deep-links work
  useEffect(() => {
    const applyHash = () => {
      const h = (typeof window !== 'undefined' ? window.location.hash : '').replace('#', '');
      if (h && SECTION_COMPONENTS[h]) {
        setActive(h);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

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
        }}
        className="docs-menu-btn"
      >
        {sidebarOpen ? '✕ CLOSE' : '☰ MENU'}
      </button>

      {/* Sidebar */}
      <nav style={{
        width: '240px', minWidth: '240px', borderRight: '1px solid var(--border)',
        padding: '40px 0', position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto', background: 'var(--bg)',
      }}
        className={`docs-sidebar${sidebarOpen ? ' open' : ''}`}
      >
        <div style={{ padding: '0 20px 20px', fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: 'var(--accent3)', letterSpacing: '1px' }}>
          HIP INDEX
        </div>
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(s.id);
              setSidebarOpen(false);
              if (typeof window !== 'undefined') {
                history.replaceState(null, '', `#${s.id}`);
              }
            }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 20px', background: 'none', cursor: 'pointer',
              fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
              letterSpacing: '1px', lineHeight: 1.8,
              color: active === s.id ? 'var(--accent)' : 'var(--text-dim, #5a5a7a)',
              borderLeftWidth: '3px',
              borderLeftStyle: 'solid',
              borderLeftColor: active === s.id ? 'var(--accent)' : 'transparent',
              transition: 'color 0.15s, border-color 0.15s',
              textDecoration: 'none',
            }}
          >
            <span style={{ marginRight: '8px', opacity: 0.6 }}>{s.icon}</span>
            {s.label}
            {s.status && (
              <span style={{ ...S.badge(STATUS_COLORS[s.status]), marginLeft: '8px', fontSize: '5px', padding: '2px 5px' }}>
                {s.status}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Content — all sections rendered for SEO + deep-linking; only active is visible */}
      <main
        ref={contentRef}
        style={{ flex: 1, padding: '40px 48px', maxWidth: '880px', overflowY: 'auto' }}
      >
        {SECTIONS.map(s => {
          const Comp = SECTION_COMPONENTS[s.id];
          return (
            <div
              key={s.id}
              style={{ display: active === s.id ? 'block' : 'none' }}
              aria-hidden={active !== s.id}
            >
              <Comp />
            </div>
          );
        })}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .docs-menu-btn { display: block !important; }
          .docs-sidebar {
            position: fixed; top: 0; left: -260px; z-index: 99;
            transition: left 0.2s; height: 100vh; padding-top: 80px;
          }
          .docs-sidebar.open { left: 0; }
        }
      `}</style>
    </div>
  );
}
