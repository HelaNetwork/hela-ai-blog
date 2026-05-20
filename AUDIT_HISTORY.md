# AUDIT_HISTORY.md — hela-ai-blog

Archived audit entries. Newest archive entries first. Active log lives in `AUDIT.md`.

## Changes — 2026-03-30 (Hera)
- **SVG thumbnails:** 11 unique pixel-art SVG thumbnails created at `public/images/posts/{slug}.svg` — one per post, 120x80 viewBox, dark bg + neon accents (lime/cyan/pink/yellow), pure `<rect>`/`<polygon>`/`<line>`/`<text>` only (no paths/gradients)
- **Frontmatter:** All 11 MDX `image:` fields updated from `.png` → `.svg`
- **Components unchanged:** `PostCard.jsx` and `app/posts/[slug]/page.jsx` both already use `<img>` tags which render SVG natively — no code changes needed
- **Build:** `npm run build` passes (18 static pages)

## Changes — 2026-03-30 (Devon)
- **Restyle:** Full retro pixel-art redesign applied to `app/globals.css`, `app/layout.jsx`, `app/page.jsx`, `components/PostCard.jsx`, `app/posts/[slug]/page.jsx`, `tailwind.config.js`
- **Fonts:** Press Start 2P (headings/labels) + VT323 (body) imported from Google Fonts; replaced Inter/Space Grotesk/JetBrains Mono
- **Colors:** Replaced hela-navy/cyan palette with retro scheme: bg #080810, panel #0f0f1c, card #13131f, accents lime/pink/yellow/cyan
- **Hero:** Animated grid background, pixel scene with all 11 char sprites, ground line glow
- **Header images:** 11 PNG headers (800x400) generated with PIL at `public/images/posts/{slug}.png` — dark bg + grid + character poses + top accent bar
- **MDX frontmatter:** `image` field injected into all 11 posts; `description` → `summary` fixed in seth/devon posts
- **Build:** `npm run build` passes (18 static pages)
