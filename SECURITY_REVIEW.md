# Security Review — hela-ai-blog

**Reviewer:** Seth (Security Agent)
**Date:** 2026-03-24
**Scope:** All public-facing content, components, app code, dependencies
**Overall Risk Level:** CAUTION

---

## Findings

### FINDING-01: OpenClaw reference leaks internal project name
- **Severity:** HIGH
- **File:** `/content/posts/2026-03-24-helasyn-open-source.mdx` (line 23)
- **Text:** `"It works with OpenClaw for self-hosted deployments and Claude Code for development."`
- **Issue:** OpenClaw is KC's private AI assistant platform. Mentioning it publicly links HeLa's public brand to internal infrastructure and reveals a tool name that could be used for reconnaissance against the team.
- **Recommendation:** Remove the OpenClaw reference. Replace with generic phrasing like "self-hosted deployments" or remove the clause entirely.

### FINDING-02: GitHub username `furykc` exposed in Giscus config
- **Severity:** MEDIUM
- **File:** `/components/GiscusComments.jsx` (line 11)
- **Text:** `script.setAttribute('data-repo', 'furykc/hela-ai-blog');`
- **Issue:** The `furykc` GitHub username is KC's personal account. While the repo is intentionally public, embedding this in the HTML source ties KC's personal GitHub identity to HeLa's public blog permanently. Anyone inspecting page source sees it. The repo ID `R_kgDORvK0RA` and category ID `DIC_kwDORvK0RM4C5JiZ` are also embedded but these are standard Giscus requirements and low risk.
- **Recommendation:** Acceptable if KC is comfortable with the `furykc` association being public. If not, move the repo to the `hela-chain` GitHub org and update the Giscus config. Flag for KC's decision.

### FINDING-03: `DEPLOYER_KEY` env var name in code examples
- **Severity:** LOW
- **File:** `/content/posts/2026-03-24-dev-update-citizen-id.mdx` (lines 64, 89)
- **Text:** `process.env.DEPLOYER_KEY`
- **Issue:** The code examples correctly load the key from an environment variable (good practice), and include the comment "never hardcode your wallet key" (good). However, using `DEPLOYER_KEY` as the env var name hints at internal naming conventions. Minor risk.
- **Recommendation:** No action required. The examples demonstrate safe key handling. Could optionally rename to `PRIVATE_KEY` for generality but this is cosmetic.

### FINDING-04: No Content Security Policy headers
- **Severity:** LOW
- **File:** `/next.config.js`
- **Issue:** No security headers configured (CSP, X-Frame-Options, etc.). The site loads external scripts from `giscus.app` and fonts from `fonts.googleapis.com`. Without CSP, XSS via injected scripts has no mitigation beyond Cloudflare defaults.
- **Recommendation:** Add security headers in `next.config.js` or Cloudflare Pages `_headers` file. At minimum: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.

### FINDING-05: External script injection via Giscus
- **Severity:** LOW
- **File:** `/components/GiscusComments.jsx` (line 10)
- **Issue:** The component dynamically creates a `<script>` element and appends it to the DOM, loading from `https://giscus.app/client.js`. This is standard Giscus usage and the source is trusted, but it's an external dependency outside the project's control.
- **Recommendation:** Pin the Giscus script to a specific version via subresource integrity (SRI) hash if possible, or document the trust assumption.

### FINDING-06: `privateKeyToAccount` import in public code example
- **Severity:** LOW
- **File:** `/content/posts/2026-03-24-dev-update-citizen-id.mdx` (line 85)
- **Issue:** The viem example shows `import { privateKeyToAccount } from "viem/accounts"` which could encourage developers to use raw private keys in browser/frontend code. The example does use `process.env` which implies server-side, but this isn't explicitly stated.
- **Recommendation:** Add a note that this code is for server-side/CLI usage only, not browser code.

---

## Bridge Exploit Check

**CONFIRMED: NO references found.**

Searched all content files, components, and app code for: exploit, hack, stolen, attacker, breach, incident, bridge, $36,308, and related terms. Zero matches. The blog content contains no mention of any security incident, bridge vulnerability, stolen funds, or attacker wallets.

---

## Dependency Review

All dependencies are standard and widely used:
- `next@^14.2.35` — current stable
- `react@^18.3.1`, `react-dom@^18.3.1` — current stable
- `next-mdx-remote@^6.0.0` — standard MDX rendering
- `gray-matter@^4.0.3` — frontmatter parsing
- `date-fns@^4.1.0` — date formatting
- `tailwindcss@^3.4.19`, `@tailwindcss/typography@^0.5.19`, `autoprefixer@^10.4.27`, `postcss@^8.5.8` — standard CSS toolchain

No dev dependencies listed. No suspicious or unnecessary packages. No known CVEs in these versions as of review date.

---

## Summary

| # | Finding | Severity | Action Required |
|---|---------|----------|-----------------|
| 01 | OpenClaw name leaked | HIGH | **Yes — remove before publish** |
| 02 | `furykc` GitHub username in source | MEDIUM | KC decision needed |
| 03 | `DEPLOYER_KEY` env var name | LOW | Optional |
| 04 | No CSP headers | LOW | Recommended |
| 05 | External Giscus script | LOW | Acceptable |
| 06 | `privateKeyToAccount` in example | LOW | Recommended note |

---

## Recommendation

**REQUIRES FIX before going live.**

FINDING-01 (OpenClaw reference) must be removed. It exposes an internal project name that directly links to KC's private infrastructure. Everything else is low risk and can be addressed post-launch, but the OpenClaw leak is a hard block.

After fixing FINDING-01 and getting KC's decision on FINDING-02, the blog is safe for public deployment.
