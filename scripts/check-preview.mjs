import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const failures = [];

const requireMatch = (pattern, message) => {
  if (!pattern.test(html)) failures.push(message);
};

const forbidMatch = (pattern, message) => {
  if (pattern.test(html)) failures.push(message);
};

requireMatch(/<meta name="robots" content="noindex,nofollow,noarchive,nosnippet" \/>/, 'missing noindex');
requireMatch(/id="preview-safety"/, 'missing form submission guard');
requireMatch(/<main id="allrecords"/, 'missing main landmark');
requireMatch(/aria-label="Открыть меню"/, 'missing mobile menu label');
requireMatch(/prefers-reduced-motion: reduce/, 'missing reduced-motion override');
requireMatch(/https:\/\/dif\.ocs\.ru\/nn/, 'relative city links were not rewritten');
forbidMatch(/href=(['"])\/(?:dif_dv|kras|kzn|nn|nsk|prm|smr|ufa)\1/, 'relative city link remains');
forbidMatch(/tilda-stat-1\.0\.min\.js/, 'Tilda statistics remains enabled');
forbidMatch(/data-tilda-formskey=/, 'Tilda forms key remains in preview');
forbidMatch(/name="formservices\[\]"/, 'Tilda form service token remains in preview');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Preview safety and routing checks passed.');
