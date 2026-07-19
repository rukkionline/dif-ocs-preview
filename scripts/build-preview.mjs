import { mkdir, readFile, writeFile } from 'node:fs/promises';

const sourcePath = new URL('../source/original.html', import.meta.url);
const outputDir = new URL('../public/', import.meta.url);
const outputPath = new URL('../public/index.html', import.meta.url);
const previewUrl = 'https://rukkionline.github.io/dif-ocs-preview/';

let html = await readFile(sourcePath, 'utf8');

html = html
  .replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" /> <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />',
  )
  .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${previewUrl}" />`)
  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${previewUrl}">`)
  .replace(/\sdata-tilda-formskey=(['"])[^'"]*\1/g, '')
  .replace(/<input type="hidden" name="formservices\[\]"[^>]*>/g, '')
  .replace('<div id="allrecords" class="t-records"', '<main id="allrecords" class="t-records"')
  .replace('</div> <!--/allrecords-->', '</main> <!--/allrecords-->')
  .replace("field='tn_text_1772978188687'", "field='tn_text_1772978188687' aria-hidden='true'")
  .replace(/(<a class='tn-atom' href="https:\/\/www\.ocs\.ru" target="_blank")>/g, '$1 aria-label="OCS">')
  .replace('<a class=\'tn-atom\' href="#menuopen">', '<a class=\'tn-atom\' href="#menuopen" aria-label="Открыть меню">')
  .replace(/<img class="t-quiz__consultant__img" imgfield="img1"/g, '<img class="t-quiz__consultant__img" imgfield="img1" alt="OCS"')
  .replace(
    'class="t-btn t-btnflex t-btnflex_type_button2 t-btnflex_sm t-quiz__btn_prev"\ntype="button"',
    'class="t-btn t-btnflex t-btnflex_type_button2 t-btnflex_sm t-quiz__btn_prev"\ntype="button" aria-label="Назад"',
  )
  .replace('role="alertdialog"\naria-modal="false"', 'role="alertdialog"\naria-modal="false"\naria-label="Уведомление об использовании cookie"')
  .replace(/href=(['"])\/(dif_dv|kras|kzn|nn|nsk|prm|smr|ufa)\1/g, (_match, quote, route) => {
    return `href=${quote}https://dif.ocs.ru/${route}${quote}`;
  })
  .replace(
    /<!-- Stat -->\s*<script type="text\/javascript">if\(!window\.mainTracker\)[\s\S]*?<\/script>/,
    '<!-- Tilda statistics disabled in the static preview -->',
  );

const accessibilityStyle = `
<style id="preview-accessibility">
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>`;

html = html.replace('</head>', `${accessibilityStyle}</head>`);

const previewSafetyScript = `
<script id="preview-safety" type="text/javascript">
(function () {
  function improveRuntimeAccessibility() {
    document.querySelectorAll('.t-quiz__btn_prev').forEach(function (button) {
      button.setAttribute('aria-label', 'Назад');
    });
    document.querySelectorAll('.t-quiz__consultant__img').forEach(function (image) {
      image.setAttribute('alt', 'OCS');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', improveRuntimeAccessibility);
  } else {
    improveRuntimeAccessibility();
  }
  window.setTimeout(improveRuntimeAccessibility, 1500);

  document.addEventListener('submit', function (event) {
    if (!event.target.closest('.t-form')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.alert('Демонстрационная копия: отправка формы отключена.');
  }, true);
})();
</script>`;

html = html.replace('</body>', `${previewSafetyScript}</body>`);
html = html.replace(/[ \t]+$/gm, '');

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, html);
await writeFile(new URL('../public/robots.txt', import.meta.url), 'User-agent: *\nDisallow: /\n');
await writeFile(new URL('../public/.nojekyll', import.meta.url), '');

console.log(`Built ${outputPath.pathname}`);
