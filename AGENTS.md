# Agent instructions

<!-- ORCA_AGENT_WORKFLOW_V3 -->

Контекст ниже должен учитываться перед любой задачей.
Не переписывай эти файлы без явной причины.

Локальный operating workflow: `.agents/workflow.md`; это не копия исходного глобального ORCA standard.

## Контекст по задаче

Читай нужные файлы явно, не полагайся на @imports:
- Первый вход: `.agents/project.md`, `.agents/rules.md`.
- Продолжение/пересечения: `.agents/current-task.md` → active task/state.
- История: `.agents/memory/index.md` → нужные topics; legacy — только по задаче.
- Процедура: `.agents/context-map.md` → применимый runbook/workflow.
Не перечитывай неизменившееся и не загружай весь `.agents/` ради локальной правки.

При необходимости читай:
- .agents/memory.md (legacy append-only)
- .agents/workflow.md
- .agents/quality-gates.md
- .agents/agent-roles.md
- .agents/references/
- .agents/checklists/

Проверь фактический cwd и git status; чужие изменения не изменять и не убирать.
Локальные проверки и ограничения: `docs/runbooks/local-verify.md`.

## Режимы работы и разрешения

- mode: plan_only / audit_only / review — только анализ и план, файлы не менять.
- mode: fix_only — исправлять только заявленную проблему.
- docs-only задача — только документация/контракты/task, без правок приложения.
- commit/push/merge/deploy выполняются только при явном разрешении владельца (owner grant),
  если project-local контракт не требует ещё более строгого gate.
- Перед release/rollback обязателен точный owner grant: action, source commit, target,
  backup; процедуры — `docs/runbooks/release.md` и `docs/runbooks/rollback.md`.
- DNS, индексация, расходы, реальные leads/messages, секреты и юридические утверждения
  требуют отдельных применимых gates. Исторические разрешения не возобновляются.

## Один редактор и проверка

Перед изменением проверь cwd, HEAD/branch, git status, ownership и точные занятые пути.
Активность другого агента/чужой diff/изменившийся HEAD — остановить пересекающиеся правки
и уточнить scope; не делать stash/reset/rebase/force-push автоматически.
Минимальные обратимые изменения, стиль существующего проекта, без лишних абстракций.
Не превращать локальный фикс в переписывание проекта.

## Память

- `.agents/memory/index.md` — канонический reviewed index; auto-memory агентов
  (Codex/Claude/Qwen/Hermes) — NON_AUTHORITATIVE_LOCAL, promotion требует provenance и review.
- `.agents/memory.md` — legacy append-only: старые записи не переписывать, уточнения —
  новой датированной записью.
- Полные задачи хранить в `.agents/tasks/`; отчёты — новыми файлами в `.agents/reports/`.
- Решения — отдельными файлами в `.agents/decisions/`.
- Приватные данные — только в приватных gitignored файлах.

## Проверка и передача результата

- `execution_status`, `review_verdict`, `release_status` — разные состояния.
- worker_done/PASS в переписке не означает независимую приёмку или production proof.
- Для high-risk reviewer не совпадает с исполнителем; merged candidate проверяется отдельно.
- На ошибке различай runtime/capacity, environment, schema, test failure и review rejection.
- Перед retry проверь возможные side effects; не повторяй внешнее действие вслепую.
- Перед остановкой обнови task/state: checks, evidence, ограничения и next step.
- Для ожидания запиши waiting_for/wake_condition; не плодить одинаковые BLOCKED-отчёты.
- Новое знание проходит provenance/review; старые corrections сохраняются, не стираются.

## Handoff

- Различай execution_status, review_verdict и release_status; независимый review для
  high-risk не заменяется сообщением исполнителя «готово».
- Сохрани task/ref/checks/evidence/unknowns/next step; жди явного owner gate для внешних действий.
- Локальный preview (`npm run serve`, 127.0.0.1:4317) — не production release.
- Исторические записи о публикации (GitHub Pages в legacy docs/memory) — записанные
  утверждения, не свежее live-доказательство; отсутствие deployment-скрипта в checkout
  не доказывает отсутствие прошлого релиза.