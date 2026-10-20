# AXL Requests for Startups — build brief

Build a static site for AXL Venture Studio's "Requests for Startups" page, modelled on YC's RFS page (ycombinator.com/rfs) and deployed on Vercel.

`reference/prototype.html` is the approved design. Match it closely: layout, spacing, type, colours, copy. It has the logos inlined as base64; in the real site use the files in `public/logos/`.

## Stack
- Next.js (App Router, TypeScript), fully static (no server, no database).
- Plain CSS or CSS modules; no UI framework needed. Keep the design tokens below as CSS variables.
- Fonts: Archivo (300/400/500) and IBM Plex Mono (400/500) via `next/font/google`.
- Content from Markdown files in `content/<YYYY-MM>/<slug>.md` (frontmatter + body), parsed at build time (e.g. gray-matter + remark). Adding a request = adding a file. No code changes.

## Pages and routes
- `/` → shows the most recent month.
- `/<YYYY-MM>` (e.g. `/2026-10`) → that month's requests. Statically generated from the content folders.
- Each request has an anchor: `/2026-10#the-data-nobodys-selling`.
- 404 page in the same style.

## Layout (top to bottom)
1. **Header** (sticky, white, 1px hairline bottom border): AXL mark centred (`axl-mark-on-light.png`, ~30px tall), linking to https://axl.vc. Right side: "Contact" navy pill button → `mailto:daniel@axl.vc?cc=founders@axl.vc&subject=Requests%20for%20Startups`.
2. **Hero** (centred): mono eyebrow "AXL FOUNDRY"; H1 "Requests for Startups" in Archivo Light with a trailing period in mint-deep; intro paragraph (copy in prototype).
3. **Month pills**: one pill per month folder, newest first, labelled "October 2026". Active = navy fill, white text; inactive = white with hairline border. Only show months that have content.
4. **Requests**: two columns — text left (max ~680px), video card right (340px, sticky). Title with a link icon that copies/links the anchor. Body paragraphs from Markdown; first paragraph styled as the lede (navy, medium weight). Then an outlined pill button "Read our full brief →" linking to `briefUrl` in a new tab (hide if empty). Separate multiple requests with a hairline rule.
5. **Video card**: 9:16, navy, faint dot field fading in from the right, mint play circle, "VIDEO COMING SOON" in mono. If `videoUrl` is set, render a responsive embed instead (support YouTube incl. Shorts and Loom URLs).
6. **Left tick-mark table of contents** (desktop ≥1300px only): one short line per request on the page; the one in view is longer and navy (IntersectionObserver).
7. **Footer** (navy #030031): `axl-mark-on-dark.png` (~44px tall) + "Human Potential, AI Superpowered"; link column "AXL" with axl.vc and Contact; hairline rule; "© <current year> AXL Venture Studio".

Below 860px the request stacks: text, then video card centred.

## Design tokens
| Token | Value | Use |
|---|---|---|
| navy | #030031 | Titles, primary ink, buttons, footer, video card |
| mint | #02FFCE | Play button, footer column labels. Never text on white |
| mint-deep | #02D9B0 | Trailing periods only |
| purple | #6D698D | Mono eyebrow on white |
| white | #FFFFFF | Page background (always white; no dark mode) |
| hairline | #E2E1EA | Rules, borders |
| text-body | #2e2c48 | Body paragraphs |
| text-muted | #5d5a78 | Intro paragraph |
| text-faint | #8e8ba6 | Link icon, inactive states |
| footer-text | #D6D4E6 | Footer copy |
| footer-rule | #2B2860 | Footer divider |

Rules: square cards (no radius) except pill buttons; no shadows; no gradients except the video card's dot fade; sentence case; mono only for small uppercase labels.

## Must-haves
- Page always renders white, regardless of the visitor's dark-mode setting.
- Metadata per page: title, description, and an Open Graph image (generate one per request with `next/og`: navy ground, AXL mark, request title in white Archivo Light, "Requests for Startups" in mint mono). Needed for LinkedIn shares.
- Favicon from the AXL mark.
- Accessible: alt text, focus styles, semantic headings, good contrast.
- Lighthouse 95+ on performance and accessibility.
- `README.md` explaining how to add a new month or request.

## Workflow
1. Scaffold, build the page to match the prototype, run locally and compare side by side with `reference/prototype.html`.
2. Initialise git, push to a new GitHub repo, then deploy to Vercel.
