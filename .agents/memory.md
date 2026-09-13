# Project Memory

## 2026-07-19 — DIF OCS preview delivery

- Для максимально точного Tilda-клона выбран перенос исходного DOM/runtime с минимальными санитизирующими изменениями вместо ручной реконструкции.
- Preview опубликован на https://rukkionline.github.io/dif-ocs-preview/ из отдельного публичного репозитория, содержащего только `public/`.
- Статистика и реальные отправки формы отключены; городские ссылки ведут на оригинальный домен; индексация запрещена.
- OMP и Claude независимо подтвердили техническую и визуальную готовность; live SSIM: 0.987610 desktop и 0.984864 mobile.

## Постоянные принципы
- Дополнять этот файл append-only.
- Старые записи не переписывать; уточнения добавлять новой датированной записью.

## Журнал

## 2026-09-12 — agent knowledge documentation migration (docs-only)

- Локальная миграция документации: AGENTS.md с явным explicit startup (убраны @imports,
  Mac-only нерезолвящийся источник и обязательный ORCA launcher; CLAUDE.md alias
  остаётся byte-identical); новый `.agents/contract.json`; задача
  `2026-09-12-agent-knowledge` + state; runbooks `docs/runbooks/local-verify.md`,
  `release.md`, `rollback.md`; отчёт `2026-09-12-agent-knowledge.md`.
- `.agents/memory/index.md` инициализирован пустым (11 полей записи), promoted records нет.
- HEAD 4ed2cbb97a82abf551792e0c8a55069421d81995 сохранён; публикация/release не выполнялись;
  `release_status=not_applicable`, `external_actions=[]`, `owner_grant_ref=null`.
- Прошлый GitHub Pages релиз (`5a03d682...`, `rukkionline.github.io/dif-ocs-preview`) —
  записанное legacy-утверждение, не свежее live-доказательство; будущий release -
  NOT_READY_PENDING_TARGET_EVIDENCE до свежего target/grant/backup.
- Старые записи не изменены.
