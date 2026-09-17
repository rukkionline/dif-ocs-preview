# Practical Preview pilot — локальный QA

- task_id: preview-practical-pilot-20260913
- mode: implement (только новые QA artifacts)
- Авторизация: прямое сообщение человека в текущей сессии разрешает LOCAL QA после архивирования миграции. Это явный override исторического completed routing в `.agents/current-task.md`, не переоткрытие pixel-copy/migration и не release grant.
- HEAD: `0b9ead5ee3657f91edb81a7780b9642955e9ccee`, branch `mac-main`.
- Ownership: один worker этой сессии; исходный tracked diff пуст; единственный чужой untracked `.agents/reports/2026-09-13-migration-local-commit.json` не изменять. Process namespace изолирован, глобальное отсутствие других агентов не доказано; перед записью и передачей повторно проверить HEAD/status. В разрешённом новом namespace файлов до начала нет.
- Записи разрешены только в новых `.agents/tasks/2026-09-13-preview-practical-pilot*` и `.agents/reports/2026-09-13-preview-practical-pilot/`.
- Запрещены source/public/docs/config/package/lockfile/current-task/contract изменения, build, install/download, submit clicks/events, бизнес-запросы, внешние обращения, deploy/push/commit/goals/subagents.
- QA: реальный браузер 1440×900 и 390×844 при наличии; до navigation блокировать внешние и все не-GET/HEAD запросы. Только 127.0.0.1:4317. Без переходов tel/mail/external. Проверить console/page errors, локальные ссылки/якоря, базовую accessibility, Tab/keyboard, validity без отправки. Наведённые harness ошибки отделять от дефектов.
- Baseline: локальный `source/original.html`; исторический `output/` отсутствует. Не обещать pixel parity/SSIM.
- Skill `make-interfaces-feel-better` загружен, только advisory, никаких визуальных исправлений.
- Startup прочитан: project/rules/current-task/указанные task+state/memory index/context-map; local-verify; workflow; pixel-copy task/delivery/visual review; README/package/check script; evidence manifest/issue log.
- Acceptance: сохранить команды, версии, реальные результаты и ограничения, новые task/state/report/handoff; остановить свои managed jobs; независимый review pending, release not_applicable.
- State: `.agents/tasks/2026-09-13-preview-practical-pilot.state.json`.
- Handoff: `.agents/reports/2026-09-13-preview-practical-pilot/INDEX.md`.
