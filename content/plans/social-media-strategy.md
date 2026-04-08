# HeLa AI Team — Social Media & Community Strategy

**Author:** Hera (PR/Comms Agent)
**Date:** 2026-03-24
**Status:** Draft for KC review

---

## Executive Summary

HeLa's social presence needs to match its technical ambition. The team is 10 AI agents + one human, so every channel we adopt must either be automatable or worth the manual effort. This plan prioritizes high-impact, low-effort channels first, builds toward a fully automated content pipeline, and avoids spreading thin across platforms nobody checks.

**Top 3 priorities:**
1. Twitter/X — crypto lives here, non-negotiable
2. Dedicated TG announcement channel — zero-friction for existing community
3. Blog distribution pipeline — turn every post into 3-5 social touchpoints automatically

---

## 1. Social Media Channel Audit

### Tier 1 — Must Have (launch immediately)

| Platform | Relevance | Effort | Priority | Owner | Content | Frequency | Auto-post? |
|----------|-----------|--------|----------|-------|---------|-----------|------------|
| **Twitter/X** | Primary crypto/AI discovery channel. Every project is judged by Twitter presence. Threads get organic reach. | Medium (content creation + engagement) | **P0** | Hera (drafts) + KC (approval initially) | Launch announcements, dev updates as threads, memes, ecosystem commentary | 1-2x daily | Yes — Hera drafts, auto-post via API after approval flow matures |
| **TG Announcement Channel** (new, one-way) | Existing HeLa TG group is discussion; a separate channel pushes updates without noise. Users subscribe, never miss a post. | Low | **P0** | Hera (auto-post) | Blog summaries, milestones, release notes | 2-3x/week | Yes — Hera posts directly via Bot API |
| **Existing HeLa TG Group** | Already active with real community. Must integrate, not compete. | Low (joining existing) | **P0** | Human mods (existing) + Hera (support role) | Answer technical questions, share announcements, community engagement | Reactive | Partially — Hera can auto-respond to FAQs |
| **GitHub Discussions** | Devs already on GitHub. Free, searchable, tied to repos. Perfect for technical Q&A and RFCs. | Low | **P1** | Hera + dev agents (Athena, Apollo) | Technical discussions, feature requests, bug reports, governance proposals | Reactive + weekly prompts | No — manual, but low volume expected |

### Tier 2 — High Value, Launch Within 30 Days

| Platform | Relevance | Effort | Priority | Owner | Content | Frequency | Auto-post? |
|----------|-----------|--------|----------|-------|---------|-----------|------------|
| **Discord** | Expected by crypto communities. Good for structured support + dev community. Risk: ghost town if not staffed. | High (setup + moderation) | **P1** | Hera (announcements) + bot agents | Structured channels, dev support, community chat | Daily presence needed | Partially — announcements auto, chat manual |
| **Mirror.xyz** | On-chain publishing, crypto-native. Good for long-form thought leadership and governance proposals. Complements blog. | Low | **P1** | Hera (cross-post from blog) | Governance posts, deep dives, whitepapers | 1-2x/month | Yes — cross-post pipeline |
| **Farcaster/Warpcast** | Growing crypto-native social. Early presence = credibility with crypto purists. Decentralized, aligns with HeLa values. | Low-Medium | **P2** | Hera | Short updates, engagement with crypto builders | 3-5x/week | Yes — Farcaster API supports bots |

### Tier 3 — Situational / Defer

| Platform | Relevance | Effort | Priority | Owner | Content | Frequency | Auto-post? |
|----------|-----------|--------|----------|-------|---------|-----------|------------|
| **LinkedIn** | Corporate partnerships, hiring, enterprise credibility. Less relevant for community building, more for BD. | Medium | **P2** | Hera (via YingLink infrastructure) | Company updates, team milestones, partnership announcements | 1-2x/week | Yes — YingLink already exists |
| **YouTube** | High impact but HIGH effort (video production). Defer unless KC has video content plans. | Very High | **P3** | Defer | Demo videos, explainers, AMAs | Monthly if at all | No |
| **Reddit** (r/cryptocurrency, r/defi, r/ethereum) | Large audience but hostile to self-promotion. Requires genuine participation over months. | High (time + authenticity required) | **P3** | Manual only | Participate in discussions, share insights (never shill) | 2-3 comments/week | No — Reddit detects and bans bot activity |
| **Dev.to** | Developer discovery. Cross-post technical blog posts for SEO + dev reach. | Low | **P2** | Hera (cross-post) | Technical tutorials, architecture deep dives | Match blog cadence | Yes — Dev.to API |
| **Medium** | Declining relevance, paywall friction. Dev.to is better for devs, Mirror for crypto. Skip unless audience demands it. | Low | **P3** | Skip | — | — | — |
| **Hacker News** | Cannot be gamed. Submit genuinely interesting technical content and hope for the best. | Low (submit and pray) | **P3** | Manual | Only genuinely novel technical posts | Rare | No |
| **Product Hunt** | One-time launch event. Save for a major public release (e.g., Citizen ID mainnet, HelaSyn open source). | Medium (prep required) | **P3** | Hera (prep) + KC (launch day) | Launch event | Once | No |
| **Lens Protocol** | Crypto-native social (Polygon-based). Smaller than Farcaster currently. Monitor, don't invest yet. | Low | **P4** | Defer | — | — | — |

### Recommendation

**Launch order:**
1. **Week 1:** Twitter/X account + TG announcement channel + join existing TG group
2. **Week 2-3:** GitHub Discussions enabled on key repos + Mirror.xyz setup
3. **Week 4:** Discord (if community size warrants it) + Farcaster
4. **Month 2+:** LinkedIn, Dev.to cross-posting, evaluate YouTube

---

## 2. Existing HeLa TG Group Integration

### How Hera Joins

1. **Create a dedicated bot account** — `@HelaHeraBot` (not KC's personal bots)
2. **Request admin add** — KC or existing admin adds the bot to the group
3. **Introduce Hera** — Post a pinned introduction: "Hi, I'm Hera, HeLa's PR & Communications agent. I'll share updates and help answer questions about HeLa AI Team."

### Hera's Role in the Existing Group

| Function | Do It? | Reasoning |
|----------|--------|-----------|
| Post announcements | Yes | Blog posts, releases, milestones — formatted with links |
| Answer technical questions | Yes, with guardrails | Only answer questions about HeLa publicly documented features. Defer unknowns to human mods. Never speculate on timelines or token/financial matters. |
| Moderate (delete spam, ban) | No (initially) | Let human mods keep control. Hera is a guest in their space. |
| Run polls/engagement | Occasionally | "What feature should we build next?" type polls — with mod approval |
| Auto-respond to FAQs | Yes | Detect common questions (e.g., "what is Citizen ID?") and provide canned responses |

### Coordination with Human Moderators

- **Weekly sync message:** Hera posts a brief "upcoming this week" summary every Monday
- **Escalation path:** Questions Hera can't answer get tagged with "Forwarding to the team" and logged
- **No stepping on toes:** Hera never contradicts a human mod. If there's a conflict, Hera defers and flags KC privately.
- **Shared announcement calendar:** Mods get a heads-up before major announcements so they're not surprised

### Additional Bots?

- **Daris for moderation:** Not recommended for the existing group. Adding KC's personal bots to HeLa's community group blurs boundaries. If moderation tooling is needed, use a purpose-built HeLa moderation bot.
- **Captcha/anti-spam bot:** Yes — use an existing TG anti-spam bot (e.g., Combot, Rose) if not already present.

### Dedicated HeLa AI Announcement Channel

**Strongly recommended.** Create `@HelaAIUpdates` (or similar):
- One-way channel (only Hera posts)
- Cross-link from the discussion group
- All blog posts, dev updates, milestones auto-posted
- Clean, no noise, subscribers get signal only
- Discussion link at bottom of each post → drives traffic to TG group

---

## 3. Discord Strategy

### Should HeLa Have a Discord?

**Yes, but not yet.** Discord is expected in crypto, but a dead Discord is worse than no Discord.

**Launch trigger:** When any TWO of these are true:
- TG group exceeds 500 active members
- More than 10 external developers are building on HeLa
- Community members are actively asking for Discord

### If/When Launched — Channel Structure

```
HELA DISCORD
├── WELCOME
│   ├── #rules
│   ├── #introductions
│   └── #roles (self-assign: developer, community, validator)
│
├── ANNOUNCEMENTS
│   ├── #announcements (Hera auto-posts, read-only)
│   ├── #blog-posts (auto-feed from blog, read-only)
│   └── #governance (proposals, votes)
│
├── COMMUNITY
│   ├── #general
│   ├── #memes-and-vibes
│   └── #showcase (community projects)
│
├── DEVELOPERS
│   ├── #dev-general
│   ├── #citizen-id
│   ├── #smart-contracts
│   ├── #bug-reports
│   └── #feature-requests
│
├── SUPPORT
│   ├── #help
│   └── #faq
│
└── AI TEAM (unique differentiator)
    ├── #meet-the-agents (pinned bios of all 10 agents)
    ├── #agent-updates (auto-feed of agent activity)
    └── #ask-an-agent (users can tag specific agents for domain questions)
```

### Bot Integration

| Agent | Discord Role | Auto? |
|-------|-------------|-------|
| **Hera** | Announcements, blog distribution, community welcome messages | Yes |
| **Athena** (Security) | Answer security questions in #dev channels | Triggered by mention |
| **Apollo** (Dev) | Technical support in #dev channels | Triggered by mention |
| **Other agents** | Visible profiles in #meet-the-agents, but not actively chatting (avoid noise) | No |

### Moderation Approach

- **Day 1:** KC + Hera bot handle moderation
- **Week 2+:** Recruit 2-3 active community members as volunteer mods
- **Auto-mod:** Use Discord's built-in AutoMod for spam, slurs, scam links
- **Verification:** Require phone verification or captcha to prevent bot raids
- **No token-gating** initially — keep entry barrier low

---

## 4. Content Calendar

### Weekly Schedule (Post-Launch Steady State)

| Day | Platform | Content Type | Creator | Auto-post? |
|-----|----------|-------------|---------|------------|
| **Mon** | Twitter | "This Week in HeLa" thread — upcoming milestones | Hera | Yes (scheduled) |
| **Mon** | TG Channel | Weekly preview | Hera | Yes |
| **Tue** | Twitter | Technical deep-dive thread or dev update | Hera from blog content | Yes |
| **Tue** | Blog | Dev update post (if applicable) | Dev agents → Hera edits | Manual publish, auto-distribute |
| **Wed** | Twitter | Ecosystem engagement — quote tweets, replies to relevant conversations | Hera (curated) | Semi-auto |
| **Wed** | Farcaster | Cross-post Tuesday's thread | Hera | Yes |
| **Thu** | Twitter | Agent spotlight — introduce one of the 10 AI agents | Hera | Yes (scheduled) |
| **Thu** | TG Group | Community question / poll | Hera | Yes |
| **Fri** | Twitter | Meme / lighter content / milestone celebration | Hera | Yes |
| **Fri** | Blog | Long-form post (weekly or bi-weekly) | Agent team → Hera edits | Manual publish, auto-distribute |
| **Sat** | GitHub Discussions | Weekly dev roundup post | Hera | Yes |
| **Sun** | — | Rest / buffer day | — | — |

### Content Themes (Rotating Monthly)

- **Week 1:** Product updates (Citizen ID, HelaSyn, chain metrics)
- **Week 2:** AI Team spotlight (agent deep dives, behind the scenes)
- **Week 3:** Ecosystem & partnerships (integrations, collaborations)
- **Week 4:** Community & governance (polls, proposals, community highlights)

---

## 5. Blog-to-Social Distribution Pipeline

### Flow

```
Blog post published (MDX → Cloudflare Pages)
        │
        ▼
   Hera detects new post (git hook or RSS poll)
        │
        ├──► Twitter: Auto-generate thread (title + key points + link)
        │         Format: 1/ [Hook] 2/ [Key point] 3/ [Key point] N/ [CTA + link]
        │
        ├──► TG Channel: Formatted announcement
        │         Format: 📢 Title\n\nSummary (2-3 sentences)\n\n🔗 Read more: [link]
        │
        ├──► TG Group: Brief notification with link to channel post
        │
        ├──► Discord #announcements: Embed with title, summary, thumbnail
        │
        ├──► Farcaster: Short cast with link
        │
        ├──► Mirror.xyz: Full cross-post (for on-chain archival)
        │
        └──► Dev.to: Cross-post technical posts only (canonical URL → blog)
```

### Implementation Options

**Option A — Git-based (Recommended)**
- Blog deploys via Cloudflare Pages from git
- Post-deploy webhook triggers Hera's distribution script
- Hera parses the new MDX file, generates platform-specific content, posts via APIs
- Fully automatable, no manual steps after blog publish

**Option B — RSS-based (Simpler fallback)**
- Hera polls the blog's RSS feed every 15 minutes
- On new entry, triggers distribution
- Slightly delayed but simpler to implement

**Option C — Manual trigger**
- KC runs a command: `hera distribute <post-slug>`
- Hera handles all platforms
- Most control, least automation

**Recommendation:** Start with Option C (manual trigger) while building toward Option A. Option C ships in a day; Option A needs webhook infrastructure.

### Who Triggers Distribution?

- **Phase 1 (now):** KC publishes blog post → manually tells Hera → Hera distributes
- **Phase 2 (week 2):** KC publishes → Hera auto-detects via RSS → drafts social posts → KC approves → auto-post
- **Phase 3 (month 2):** Full auto — publish triggers distribution with no human in the loop (except flagged posts)

---

## 6. Community Engagement Metrics

### Key Metrics to Track

| Metric | Platform | Target (30 days) | Target (90 days) | How to Track |
|--------|----------|-------------------|-------------------|-------------|
| Twitter followers | X | 500 | 2,000 | Twitter Analytics |
| Tweet impressions/week | X | 10K | 50K | Twitter Analytics |
| TG Channel subscribers | Telegram | 200 | 1,000 | TG Bot API |
| TG Group active members | Telegram | Baseline + 20% | Baseline + 50% | TG Bot API / Combot |
| Blog unique visitors/month | Blog | 500 | 2,000 | Analytics (see Section 7) |
| Blog avg. time on page | Blog | > 2 min | > 2.5 min | Analytics |
| GitHub stars (key repos) | GitHub | 50 | 200 | GitHub API |
| GitHub forks | GitHub | 10 | 50 | GitHub API |
| Discord members | Discord | — | 300 (if launched) | Discord analytics |
| Bug bounty submissions | GitHub/Blog | 5 | 20 | Manual tracking |
| External dev PRs | GitHub | 2 | 10 | GitHub API |

### Reporting

- **Weekly:** Hera generates a metrics snapshot → posts to internal TG group / Hub Dashboard
- **Monthly:** Hera produces a trend report with growth rates and recommendations
- **Alerts:** Hera notifies KC if any metric drops >20% week-over-week

---

## 7. Blog Analytics — Options Comparison

| Solution | Cost | Privacy | Setup Effort | Features | Self-hosted? |
|----------|------|---------|-------------|----------|-------------|
| **Cloudflare Web Analytics** | Free | Good (no cookies, no PII) | Zero (already on CF) | Basic: page views, referrers, country. No user journeys. | N/A (Cloudflare-hosted) |
| **Umami** | Free | Excellent (no cookies, GDPR compliant) | Medium (self-host on existing infra) | Good: page views, referrers, events, UTM tracking, real-time | Yes |
| **Plausible** | $9/mo | Excellent (no cookies, EU-hosted) | Low (add script tag) | Good: similar to Umami, nicer dashboard | Optional |
| **Google Analytics 4** | Free | Poor (cookies, Google data collection) | Low (add script tag) | Full: funnels, cohorts, events, integrations | No |

### Recommendation

**Use Cloudflare Web Analytics immediately (zero effort, already deployed on CF) + add Umami within 30 days for richer insights.**

Reasoning:
- CF Analytics is free and requires zero setup — just enable it in the Cloudflare dashboard. This gives basic traffic data today.
- Umami can self-host on existing infrastructure (the dev machine or a small container on AWS). No cost, privacy-first, gives event tracking and UTM parameters for campaign measurement.
- Skip GA4 — the privacy trade-off isn't worth it for a crypto project. Users in this space are privacy-conscious and may block GA.
- Skip Plausible — Umami does the same thing for free.

### Implementation Steps

1. **Today:** Enable Cloudflare Web Analytics in the CF dashboard (2 minutes)
2. **Week 2:** Deploy Umami via Docker on existing infra, add tracking script to blog
3. **Week 3:** Set up UTM parameters for all social posts (e.g., `?utm_source=twitter&utm_campaign=citizen-id-launch`)

---

## 8. Blog Comment System

### Current: Giscus (GitHub Discussions-based)

| Aspect | Assessment |
|--------|-----------|
| **Pros** | Free, spam-resistant (GitHub auth), threaded, dev-friendly, data lives in your GitHub repo |
| **Cons** | Requires GitHub account — excludes non-dev community members |
| **Audience fit** | Good for dev-focused posts, bad for community/governance posts |

### Alternatives Evaluated

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Keep Giscus** | Already works, dev audience has GitHub | Excludes non-devs | Good for now |
| **Replace with TG group CTA** | Drives discussion to TG where community already is, zero maintenance | No on-page discussion, breaks feedback loop | Best for non-technical posts |
| **Cusdis** | Open source, email-based, lightweight | Self-hosted, another service to maintain, email auth has lower engagement | Not worth the effort |
| **Remove comments entirely** | Simplest, no moderation needed | Loses feedback channel | Too aggressive |
| **Hybrid: Giscus on dev posts, TG CTA on community posts** | Best of both worlds | Slightly inconsistent UX | Ideal solution |

### Recommendation

**Hybrid approach:**
- **Technical posts** (dev updates, architecture, tutorials): Keep Giscus. Devs have GitHub, they'll use it.
- **Community posts** (announcements, governance, spotlights): Replace comment section with a CTA block:

```
💬 Discuss this post in the HeLa community:
→ Telegram: t.me/HelaAIUpdates
→ Discord: discord.gg/hela (when launched)
```

This drives engagement to platforms where the community actually lives, while keeping technical discussion close to the code.

---

## 9. Retro Pixel Design Direction

### Does It Fit?

| Factor | Assessment |
|--------|-----------|
| **AI Team brand** | Strong fit. The AI agents are characters with personalities — pixel art avatars make them memorable and approachable. It gives the team a distinctive visual identity in a sea of generic "gradient + sans-serif" crypto sites. |
| **HeLa corporate brand** | Tension. HeLa Chain's corporate/enterprise identity may clash with pixel art. Solution: the blog is the AI Team's space, not the corporate site. Treat it like a sub-brand. |
| **Target audience** | Developers and crypto-native users skew young, appreciate nostalgia and personality. The pixel aesthetic signals "we're builders, not suits." |
| **Competitor differentiation** | Almost no blockchain project uses retro pixel styling. It's immediately recognizable. |
| **Practical concern** | Must still be readable and accessible. Pixel fonts are hard to read at length — use them for headers only, keep body text in a clean font. |

### Examples of Successful Retro-Styled Tech/Crypto Sites

- **Loot (for Adventurers)** — pixel/8-bit aesthetic drove massive NFT hype
- **Nouns DAO** — pixel art characters became an iconic brand identity
- **Hack Club** — retro terminal aesthetic for a dev community, very effective
- **PICO-8 community** — proves pixel art + technical content works together

### Recommendation

**Go for it, with guardrails.**

The retro pixel style is a strong differentiator that makes the AI Team memorable. It works because:
1. The 10 agents become characters with pixel avatars — instant brand recognition
2. It signals "we're different" in a space full of identical-looking projects
3. It's fun, which lowers the barrier to engagement
4. Blog readers are devs and crypto users, not enterprise buyers

### Implementation Guidelines

| Element | Recommendation |
|---------|---------------|
| **Agent avatars** | 32x32 or 64x64 pixel art portraits for each of the 10 agents. Use as author images on blog posts, social media profiles, Discord roles. Commission or generate with pixel art tools. |
| **Headers/banners** | Pixel art scene headers for blog categories (e.g., a pixel cityscape for "Dev Updates", a pixel shield for "Security", a pixel newspaper for "Announcements") |
| **Fonts** | Pixel font for H1/H2 headers ONLY (e.g., "Press Start 2P", "VT323"). Body text stays in a readable sans-serif (Inter, system font). |
| **Color palette** | Limited palette (8-16 colors) inspired by classic consoles. HeLa brand colors translated to pixel-friendly versions. Dark mode default. |
| **Animations** | Subtle sprite animations on hover (agent avatars blink, icons bounce). Keep lightweight — CSS sprites, not GIFs. |
| **Sound** | No. Absolutely not. Auto-playing chiptune is a UX crime. |
| **Loading screen** | Optional: brief pixel art loading animation (< 1 second). Fun but don't delay content. |
| **Mobile** | Pixel elements scale well on mobile. Test at all breakpoints. |
| **Accessibility** | Ensure all pixel art has alt text. Maintain WCAG contrast ratios. Pixel fonts must be legible at the rendered size. |

### What NOT to Do

- Don't pixel-ify body text — readability trumps aesthetics
- Don't add game mechanics (XP, levels) to the blog — it's a gimmick that adds complexity
- Don't make navigation confusing for the sake of the theme
- Don't use the pixel style on the main helachain.com corporate site — keep it blog/AI Team only

---

## 10. Priority Action Plan

### This Week (Days 1-7)

| # | Action | Effort | Owner |
|---|--------|--------|-------|
| 1 | Create Twitter/X account for HeLa AI Team | 30 min | KC |
| 2 | Create TG announcement channel `@HelaAIUpdates` | 15 min | KC |
| 3 | Enable Cloudflare Web Analytics | 5 min | KC |
| 4 | Draft first 5 tweets (launch thread) | 1 hr | Hera |
| 5 | Post Citizen ID testnet announcement across TG channel + Twitter | 30 min | Hera |

### Week 2-3

| # | Action | Effort | Owner |
|---|--------|--------|-------|
| 6 | Set up Hera bot for TG channel auto-posting | 2 hrs | Dev team |
| 7 | Enable GitHub Discussions on key repos | 15 min | KC |
| 8 | Create Mirror.xyz publication | 30 min | KC |
| 9 | Build blog-to-Twitter distribution script (Option C — manual trigger) | 4 hrs | Dev team |
| 10 | Commission pixel art agent avatars (10 agents) | Outsource / AI generate | KC decision |

### Month 2

| # | Action | Effort | Owner |
|---|--------|--------|-------|
| 11 | Deploy Umami analytics | 2 hrs | Dev team |
| 12 | Evaluate Discord launch based on community size | 1 hr | Hera |
| 13 | Set up Farcaster account | 30 min | KC |
| 14 | Build automated blog-to-social pipeline (Option A) | 8 hrs | Dev team |
| 15 | Implement retro pixel blog redesign (if approved) | 20-40 hrs | Dev team |

---

## Appendix: API & Automation Reference

| Platform | API Available? | Bot Support? | Rate Limits | Notes |
|----------|---------------|-------------|-------------|-------|
| Twitter/X | Yes (v2, paid tiers) | Yes | Free tier: 1,500 tweets/mo | Basic tier ($100/mo) needed for reasonable posting. Free tier may suffice initially with 1-2 posts/day. |
| Telegram | Yes (Bot API, free) | Yes | 30 msg/sec | Excellent bot support, Hera can fully automate |
| Discord | Yes (Bot API, free) | Yes | Varies by endpoint | Full bot integration, webhooks for announcements |
| Farcaster | Yes (Neynar API) | Yes | Free tier available | Good bot ecosystem, Hera can auto-cast |
| Mirror.xyz | Limited | No native bot | — | Manual or use their SDK for programmatic publishing |
| GitHub | Yes (REST + GraphQL) | Yes (Actions) | 5,000 req/hr | GitHub Actions can automate Discussions posts |
| Dev.to | Yes (Forem API) | Yes | 30 req/30sec | Cross-posting via API is straightforward |
| LinkedIn | Yes (limited) | Via YingLink | Restricted | Already have YingLink infrastructure |

---

*This strategy is designed for a team of AI agents + one human. Every recommendation assumes automation-first, with human oversight only where legally or strategically necessary. Review and adjust quarterly based on metrics.*
