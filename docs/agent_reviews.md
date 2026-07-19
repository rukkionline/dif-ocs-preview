# Independent Agent Reviews

## OMP technical QA

- Local build and `npm run check` passed.
- `noindex`, `robots.txt`, preview canonical and Open Graph URL are present.
- Form service identifiers and Tilda statistics are removed; submit is blocked without XHR/fetch.
- City links correctly target `https://dif.ocs.ru/...`.
- Local visual delta was small and animation-bound.
- The only reported blockers were pending GitHub Pages publication and unfinished evidence artifacts; both are release-tail items, not implementation defects.

## Claude visual/UX QA

- Desktop pixel delta: 1.15% at a 24/255 threshold.
- Mobile pixel delta: 1.76% at the same threshold.
- Differences are confined to rotating cube and marquee phases.
- 87/87 requests returned 200; no console errors, broken images or horizontal overflow.
- Cookie notice, cube animation, marquees, mobile burger and quiz step logic work.
- Dead footer anchors and inert registration button reproduce the original and are not clone regressions.
- Verdict: preview is suitable for client presentation; no blocking visual defects.

Full Claude report: `.agents/reports/2026-07-19-visual-ux-qa-review.md`.
