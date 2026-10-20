# AXL Requests for Startups

Static site for AXL Venture Studio's Requests for Startups page. Built with Next.js (App Router) and exported as plain HTML (`output: "export"`), so there's no server or database.

## Adding a request

Each request is one Markdown file:

```
content/<YYYY-MM>/<slug>.md
```

```markdown
---
title: "The Data Nobody’s Selling"
slug: the-data-nobodys-selling   # optional; defaults to the file name
month: 2026-10                   # informational; the folder decides the month
order: 1                         # position on the page (lowest first)
briefUrl: "https://docs.google.com/…"   # "Read our full brief" button; leave "" to hide it
videoUrl: ""                     # YouTube (watch, youtu.be, Shorts) or Loom share URL; "" shows "Video coming soon"
---

First paragraph. This becomes the lede (navy, medium weight).

Further paragraphs. Ordinary Markdown works: **bold**, [links](https://axl.vc), lists.
```

Commit and push. Vercel rebuilds the site.

- The request's anchor is its slug, e.g. `/2026-10#the-data-nobodys-selling`.
- Each request gets an Open Graph image at `/og/<YYYY-MM>/<slug>.png`. The month page shares the first request's image, title and lede.
- YouTube Shorts embed at 9:16. Other YouTube and Loom videos embed at 16:9. Any other URL falls back to the "coming soon" card, with a warning in the build log.
- Files starting with `_` are ignored, which is useful for drafts.

## Adding a month

Create a new folder `content/<YYYY-MM>/` and add at least one request file to it. That's all:

- `/<YYYY-MM>` is generated automatically.
- A month pill appears (newest first). Empty folders are skipped.
- `/` always shows the newest month.

## Development

```bash
npm install
npm run dev      # http://localhost:3000, with hot reload
npm run build    # static site in out/
npm start        # serve out/ locally
```

Requires Node 20+.

## Layout

| Path | What it is |
| --- | --- |
| `content/` | Requests, one Markdown file each |
| `app/globals.css` | All styles; design tokens are CSS variables at the top |
| `app/layout.tsx` | Header, footer, fonts, site-wide metadata |
| `components/MonthPage.tsx` | Hero, month pills, requests |
| `components/Toc.tsx` | Left tick-mark contents (≥1300px wide only) |
| `components/VideoCard.tsx`, `lib/video.ts` | Placeholder card / YouTube and Loom embeds |
| `app/og/[month]/[image]/route.tsx` | Per-request Open Graph images |
| `lib/content.ts` | Reads and parses `content/` |
| `public/logos/` | AXL marks; `*-90h` / `*-132h` are resized copies (90h for the header and footer, 132h for OG images) |
| `assets/fonts/` | TTFs used only for rendering OG images |
| `reference/prototype.html` | The approved design |

## Deploying

On Vercel, import the repo. The framework preset is Next.js and no settings are needed. Open Graph URLs use `VERCEL_PROJECT_PRODUCTION_URL` automatically. Once a custom domain is attached, set `NEXT_PUBLIC_SITE_URL=https://<domain>` in the Vercel project settings.
