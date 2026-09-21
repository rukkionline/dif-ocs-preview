# Agent contract — dif-ocs-preview

## До начала работы

1. Проверь фактический cwd и `git status`; не трогай чужие изменения.
2. Явно прочитай `.agents/project.md`, `.agents/rules.md`, `.agents/current-task.md`
   и `.agents/memory/index.md`. Не полагайся на @imports: этот harness их не разворачивает.
3. Если `current-task` указывает task-файл — прочитай его целиком.
4. По `.agents/context-map.md` выбери нужные memory topics и runbook.
5. Если меняется вложенная область — прочитай её ближайшие инструкции.

## Источники истины

- Код: GitHub `rukkionline/dif-ocs-preview`, ветка `main`. Локальный checkout — рабочая копия, не источник истины.
- Правила поведения: этот контракт и project-local `.agents/rules.md`.
- Текущая задача: `.agents/current-task.md` → task-файл.
- Подтверждённое знание: `.agents/memory/index.md` → topics.
- Исторические диалоги, `Memory.MD`/`MEMORY.md`/`.agents/memory.md` и agent auto-memory —
  подсказки для поиска, не authority. Промоция знания — только с provenance и review.
- При конфликте источников зафиксируй расхождение и проверь актуальное evidence.

## Границы

- Соблюдай mode, scope и non-goals активной задачи; `audit_only`/`review` не меняют source.
- Один редактор на checkout или пересекающийся scope; при чужом diff или изменившемся HEAD
  остановись и уточни scope, не делай stash/reset/rebase/force-push автоматически.
- Push/merge, deploy, DNS, индексация, расходы, внешние сообщения, работа с секретами и
  публикация юридически значимых утверждений требуют отдельного применимого owner gate.
  Исторические разрешения не возобновляются.
- Секреты не читать и не выводить в контекст; секретные значения не попадают в Git.
- Не выдумывать домены, KPI, позиции, трафик, доступы, версии и даты. Неизвестное
  фиксируется как `null`/`UNKNOWN`.

## Проверка и результат

- Безопасная проверка: `docs/runbooks/local-verify.md` (validation-only, read-only).
- Записывай точные command, cwd, ref, exit и тип проверки: local/staging/live.
- `worker_done`/PASS в переписке не означает приёмку; для high-risk нужен другой reviewer.
- Проверка компонента не переносится автоматически на merged candidate.
- На ошибке классифицируй причину (runtime/environment/schema/test/review), проверь возможные
  side effects и не повторяй внешнее действие вслепую.

## Перед передачей работы

- Обнови task: факты, выполненные проверки, ограничения, next step.
- Различай `execution_status`, `review_verdict` и `release_status`.
- Если blocked — укажи `waiting_for` и `wake_condition`; не плоди одинаковые BLOCKED-отчёты.
- Операции с checkout/терминалами и внешние действия — только в разрешённом scope.

## Наблюдаемые факты (2026-09-21)

- Репозиторий: `rukkionline/dif-ocs-preview`; ветка по умолчанию: `main`.
- `observed_main_sha`: `5a03d682af9d790958d8e6e48630ecd29fb09743` (снимок реестра CEO `projects.yaml`, 2026-09-21T08:38:42Z).
- `accepted_main_sha`: `null` — приёмки в реестре нет; это не «пустая ветка».
- `canonical_status`: `ACTIVE`; `source_recovery_status`: `COMPLETE`.
- `repo_kind`: `service`.

## Что НЕ утверждается

Этот контракт описывает только наблюдаемые факты: структуру репозитория на GitHub,
декларацию реестра CEO и наличие локального checkout. Он не подтверждает production,
позиции, трафик, домены, доступы, KPI и не является независимой приёмкой.


## GitHub-first write-gate

For delivery receipts and source-of-truth status, also read [`.agents/github-source-of-truth.md`](.agents/github-source-of-truth.md) and [`.source-of-truth.json`](.source-of-truth.json).
