# DIF OCS Preview — локальная миграция agent knowledge (docs-only)

Дата (actual, `date -u`): 2026-09-12T13:26:34Z.
Parent: CEO agent-knowledge-rollout-20260912. Локальная docs-реализация завершена;
независимый review pending. Никаких commit/push/deploy/publish/network/SSH действий.

## Итог

Docs-only миграция выполнена в существующем checkout `/home/orca/projects/dif-ocs-preview`
на неизменённом HEAD `4ed2cbb97a82abf551792e0c8a55069421d81995` (ветка `mac-main`,
один worktree, исходное дерево чистое, терминалы отсутствуют).

## Изменённые файлы — точно 12 файлов (директории не схлопнуты)

Изменены (4):
1. `AGENTS.md`
2. `.agents/context-map.md`
3. `.agents/current-task.md`
4. `.agents/memory.md` (append-only, старые байты сохранены)

Созданы (8):
5. `.agents/contract.json`
6. `.agents/memory/index.md`
7. `.agents/tasks/2026-09-12-agent-knowledge.md`
8. `.agents/tasks/2026-09-12-agent-knowledge.state.json`
9. `docs/runbooks/local-verify.md`
10. `docs/runbooks/release.md`
11. `docs/runbooks/rollback.md`
12. `.agents/reports/2026-09-12-agent-knowledge.md`

Ни один файл приложения/контента не менялся: `public/index.html`, `public/robots.txt`,
`public/.nojekyll`, `source/original.html`, `scripts/build-preview.mjs`,
`scripts/check-preview.mjs`, `package.json`, `README.md`, legacy `docs/*`, старые
tasks/reports/approvals и `.gitignore` остались без изменений. `CLAUDE.md` — прежний
alias (symlink) на `AGENTS.md`, byte-identical.

## Что сделано

- AGENTS.md: explicit startup вместо @imports, удалён Mac-only нерезолвящийся источник
  (`/Users/sergeynazaruk/...ORCA_AGENT_WORKFLOW_STRUCTURE_FINAL_V3.md`) и обязательный
  ORCA launcher-блок; сохранены distinct alias CLAUDE.md и memory-блоки правил.
- `.agents/contract.json`: schema_version 1, `project_id=dif-ocs-preview`, 6 startup-файлов,
  `instruction_alias=CLAUDE.md`, budget 32768, active task brief/state, 3 required runbooks.
- Задача `2026-09-12-agent-knowledge` + state: `mode=implement`,
  `execution_status=completed` (после прохождения shared checker),
  `review_verdict=pending`, `release_status=not_applicable`, `external_actions=[]`,
  `owner_grant_ref=null`, `waiting_for/wake_condition=null`.
- `.agents/memory/index.md`: минимальный public-safe пустой index, 11 полей записи
  (`id project_id type statement source observed_at confidence sensitivity supersedes
  writer content_sha256`), promoted records отсутствуют.
- context-map: маршрутизация agent-knowledge/docs-only проверки и release/rollback.
- current-task: указатель на новую задачу и state; предыдущая задача
  `2026-07-19-dif-ocs-pixel-copy.md` остаётся completed и не переоткрывается.
- Память: `docs/runbooks/release.md` документирует release как
  NOT_READY_PENDING_TARGET_EVIDENCE (в checkout нет deployment-скрипта; это НЕ доказывает
  отсутствие прошлого релиза — legacy docs/memory фиксируют прошлую GitHub Pages
  публикацию `5a03d682...` / `rukkionline.github.io/dif-ocs-preview`, что является
  записанным утверждением, а не свежим live-доказательством).
  `rollback.md` требует актуальную release-запись и отдельный grant; команды не выдуманы.
  `local-verify.md` различает read-only проверки и side effects `npm run build`/`serve`
  (build пишет tracked public-файлы; serve — только локальный 127.0.0.1:4317, не release).

## Фактическая проверка

- `python3 /home/orca/projects/CEO/ops/agent_contract_check.py --root .` → `ok=true`, exit 0;
  startup 12688/32768 bytes, `alias_byte_identical=true`, task_id/enum-поля приняты.
- `git diff --check` → exit 0.
- JSON parse `.agents/contract.json` и `.agents/tasks/2026-09-12-agent-knowledge.state.json`
  → `json ok`.
- `npm run check` (`node scripts/check-preview.mjs`, read-only regex-проверка
  `public/index.html`) → «Preview safety and routing checks passed.», exit 0.
- HEAD до и после правок: `4ed2cbb97a82abf551792e0c8a55069421d81995` (не менялся).
- Scope-аудит: `git status` содержит только 4 изменённых и 7 новых путей (12 файлов
  суммарно вместе с этим отчётом); посторонних app/content/config/deploy-изменений нет.

## Не заявлено / ограничения

- Нет независимой приёмки (review pending) и нет live/local acceptance за пределами
  перечисленных команд; worker completion — не приёмка.
- Не запускались: `npm run build`, `npm run serve`, preview/export, deployment, индексация,
  IndexNow, реальные отправки/лиды/сообщения, любые network/SSH/git remote действия.
- Не проверялись свежесть Tilda CDN и доступность GitHub Pages; прошлые метрики/SSIM,
  hosting и публикация не перепроверялись и не подтверждаются этим отчётом.
- Shared checker — read-only dependency текущего хоста; при отсутствии на другом хосте
  это NEEDS_TOOL, а не автоматический PASS. Он не проверяет семантику runbook'ов,
  source truth и live deployment.
- Rollback/release процедуры задокументированы, но не выполнялись и не тестировались.

## Следующий шаг

Независимый review scoped docs-diff; release не применим (будущий release требует
свежих exact target/grant/backup данных). Внешние действия не авторизованы.
