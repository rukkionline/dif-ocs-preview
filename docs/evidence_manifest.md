# Evidence Manifest

## Build and validation

- `npm run build`: pass.
- `npm run check`: pass.
- Local HTTP: 200 at `http://127.0.0.1:4317/`.
- Public HTTP: 200 at `https://rukkionline.github.io/dif-ocs-preview/`.
- GitHub Pages build: `built` for commit `67a9a9d2e45c9e60f4591a0151efe2f37a608205`.
- Remote branch readback: `refs/heads/main` equals the Pages build commit.

## Render evidence

- Original desktop: `output/playwright/original/1440.png` (1440 × 6487).
- Preview desktop: `output/screenshots/1440.png` (1440 × 6487).
- Live desktop: `output/screenshots/live/1440.png` (1440 × 6487).
- Original mobile: `output/playwright/original/390.png` (390 × 6718).
- Preview mobile: `output/screenshots/mobile-full.png` (390 × 6718).
- Live mobile: `output/screenshots/live/390-full.png` (390 × 6718).
- Mobile menu: `output/screenshots/mobile-menu.png`.
- Live/original SSIM: 0.987610 desktop, 0.984864 mobile.
- Claude thresholded pixel delta: 1.15% desktop, 1.76% mobile, limited to animation phases.

## Runtime evidence

- 21 Tilda records.
- 40 links.
- 1 visual quiz form.
- 36/36 images loaded; zero blank images.
- Console: 0 errors, 0 warnings.
- 390 px overflow: false (`scrollWidth === innerWidth === 390`).
- One H1 and footer present.
- Mobile menu opens/closes; quiz advances to conditional next step.
- Form `submit` event: `defaultPrevented=true`; preview alert shown.
- Tilda statistics script absent; Tilda forms key absent.
- Relative city links remaining: 0.

## Indexing controls

- Meta robots: `noindex,nofollow,noarchive,nosnippet`.
- `robots.txt`: `User-agent: *` / `Disallow: /`.
- Canonical and `og:url` point to the preview URL.

## QA reports

- `output/qa/render_qa_report.md`.
- `output/qa/accessibility_report.md`.
- `output/qa/visual_qa_report.md`.
- `output/qa/performance_report.md`.
- `.agents/reports/2026-07-19-visual-ux-qa-review.md`.
- `docs/agent_reviews.md`.
- `docs/qa_issue_log.md`.

## Issue state

- Critical open: 0.
- High open: 0.
- Medium accepted source deviations: 2 (contrast only).
- Final evidence verdict: Approve.
