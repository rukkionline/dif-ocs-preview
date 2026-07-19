# Handoff

- Output: `public/index.html`.
- Public URL: https://rukkionline.github.io/dif-ocs-preview/.
- Deployment repository: https://github.com/rukkionline/dif-ocs-preview.
- Published commit: `67a9a9d2e45c9e60f4591a0151efe2f37a608205`.
- Build: `npm run build`.
- Validation: `npm run check`.
- Local run: `npm run serve` (http://127.0.0.1:4317/).
- Dependencies: Node.js для сборки; Python 3 только для локального preview; runtime страницы загружается из публичного Tilda CDN.
- Assets: исходные изображения, SVG, CSS, JS и шрифты, перечисленные в `source/original.html`.
- External routes: городские страницы и Yandex Disk/OCS/Telegram ссылки ведут на оригинальные публичные адреса.
- Limitation: отправка анкеты намеренно отключена; CDN-ресурсы не vendored ради пиксельной идентичности и минимального риска расхождения.
