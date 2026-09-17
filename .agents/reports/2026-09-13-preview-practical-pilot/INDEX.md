# Handoff index — Practical Preview pilot

**Для нового независимого reviewer; начать здесь.**

- Checkout: `/home/orca/projects/dif-ocs-preview`, HEAD `0b9ead5ee3657f91edb81a7780b9642955e9ccee`, branch `mac-main`.
- Direct human LOCAL QA request явно перекрывает completed historical routing только для этого pilot. Current-task/contract не менялись; старые release grants не действуют.
- **execution_status = worker_done_with_limitations; review_verdict = pending; release_status = not_applicable.**
- Реальный Chrome запущен 1440×900/390×844, но **НЕ visual PASS**: внешние CSS/JS/images/fonts заблокированы до navigation. 139 harness-induced resource failures. Текущий checkout не является полноценным offline bundle.

## Чтение за несколько минут

1. [REPORT.md](REPORT.md) — scope, coverage, defect IDs QA-001–004/PILOT-001–005, команды, ошибки и ограничения.
2. [evidence.json](evidence.json) — durable curated excerpt фактических результатов, версии и SHA256 PNG; не полный raw trace.
3. [Task](../../tasks/2026-09-13-preview-practical-pilot.md), [State](../../tasks/2026-09-13-preview-practical-pilot.state.json) — разрешение, ownership, ожидание review.
4. [1440-inspection.png](1440-inspection.png), [390-inspection.png](390-inspection.png) — реально просмотренные уменьшенные copies. Первичные binary screenshots: [1440.png](1440.png) (1440×16000, bottom cropped), [390.png](390.png) (390×10541, overflow справа вне clip). Это деградированный restricted render, не исторические reference screenshots.

## Быстрая независимая read-only проверка

```bash
git rev-parse HEAD
git status --short --untracked-files=all
git diff --exit-code
git diff --cached --exit-code
git diff --check
cmp AGENTS.md CLAUDE.md
npm run check
python3 .agents/reports/2026-09-13-preview-practical-pilot/static-qa.py
node .agents/reports/2026-09-13-preview-practical-pilot/baseline-parity.mjs
sha256sum .agents/reports/2026-09-13-preview-practical-pilot/*.png
```

Tracked diff должен быть пуст. Допустимые новые пути: этот каталог + 2 pilot task/state файла. Единственный исходный чужой untracked файл `.agents/reports/2026-09-13-migration-local-commit.json` не принадлежит pilot; не удалять/редактировать.

## Скрипты и воспроизведение browser run

- [browser-qa.mjs](browser-qa.mjs): dependency-free Chrome CDP pipe, **только наблюдения**, exit 0 не QA PASS. Блокирует всё, кроме GET/HEAD `127.0.0.1:4317`, до navigation; не нажимает/не отправляет форму. Text result — stdout; PNG — этот каталог. Новые запуски перезаписывают первичные PNG: сначала сверить/сохранить текущую evidence по разрешённому scope.
- [static-qa.py](static-qa.py): read-only HTMLParser inventory source/public, anchors/forms/resources, JSON stdout.
- [baseline-parity.mjs](baseline-parity.mjs): read-only in-memory section существующего build script; exact output hash без build/write. При изменении build script сначала прочитать заново.
- Browser требует managed `npm run serve` (script прочитан: `python3 -m http.server 4317 --bind 127.0.0.1 --directory public`), затем `node .../browser-qa.mjs`. Отслеживать оба job IDs, собирать stdout и обязательно остановить свой сервер. Не использовать DSH 8787. Ничего не устанавливать/скачивать. Google Chrome 152.0.7977.64 уже доступен; Playwright/Puppeteer/axe отсутствуют.

## Что уже установлено / что ещё неизвестно

- PASS существующего safety regex checker; exact local source→preview transform; 200 для `/` и `/robots.txt`; начальный Tab/Shift+Tab; read-only native validity/DOM/AX.
- Подтверждены inherited missing section anchors и зависимость от CDN. Form имеет `action=""`, `POST`, в отличие от исторического текстового утверждения `action="#"`; никаких отправок для выяснения не делалось.
- Нет локального `output/` и reference PNG. Не пересчитывались SSIM/pixel parity/contrast. Не проверены полный tab-cycle, menu activation, quiz conditional validation, реальные touch устройства, production.
- Для продолжения fidelity QA нужны **локальные** assets и baseline screenshots, предоставленные/отдельно разрешённые человеком. Не разблокировать сеть, не делать UI/source fixes без нового scope.

## Cleanup

Worker jobs: `bash-2` (Chrome QA) collected exit 0, Chrome exit 0, temporary profile removed; `bash-1` (serve) killed SIGTERM и collected. После остановки `connect_ex(127.0.0.1:4317)=111` (refused). Свои активные jobs отсутствуют. Никаких commits/push/deploy/business requests/external actions.

Next step: независимый parent/new reviewer оценивает этот handoff; worker не выдаёт самоотчёт за acceptance.
