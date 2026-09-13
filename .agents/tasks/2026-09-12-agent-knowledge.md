# DIF OCS Preview — agent knowledge documentation migration

Task ID: dif-ocs-preview-agent-knowledge-20260912. Mode: implement (docs-only).
Parent: CEO agent-knowledge-rollout-20260912.
State: `.agents/tasks/2026-09-12-agent-knowledge.state.json`.

## Scope

- Root instructions: AGENTS.md — explicit startup вместо @imports/Mac-only unresolved
  источников и обязательного ORCA launcher; alias CLAUDE.md остаётся byte-identical.
- `.agents/`: project/rules/current-task/context-map; новый локальный contract.json;
  новая задача и state; новый отчёт; одна append-only запись в legacy `.agents/memory.md`;
  пустой `.agents/memory/index.md` (11 полей, promoted records отсутствуют).
- `docs/runbooks/`: local-verify.md, release.md, rollback.md (3 focused runbook).

НЕ трогаются: public/ HTML/assets, source/original.html, scripts/, package.json, README,
legacy docs/, старые tasks/reports/approvals, credentials/runtime/customer data, git history.
Никаких build/serve/publish/network/SSH/git remote действий. Статическое восстановление —
только одобренный публичный subset; runtime/secrets/DNS — отдельные точные owner grants.

Baseline HEAD 4ed2cbb97a82abf551792e0c8a55069421d81995; исходное дерево чистое, один
worktree, терминалы отсутствуют.

## Acceptance

- Shared startup/task validator проходит для этого checkout
  (`python3 /home/orca/projects/CEO/ops/agent_contract_check.py --root .`).
- Тот же HEAD сохранён; diff только scoped docs/contracts/task/memory.
- legacy `.agents/memory.md` сохранён без изменений + одна новая датированная запись.
- `git diff --check` чист; новые JSON парсятся.
- Release/rollback preconditions документированы честно из локальных источников:
  отсутствие deployment-скрипта НЕ доказывает отсутствие прошлого релиза;
  неизвестный target/channel/backup => NOT_READY_PENDING_TARGET_EVIDENCE, без выдуманных команд.
- Локальный preview не выдаётся за production release.
- `external_actions=[]`, `owner_grant_ref=null`, `release_status=not_applicable`,
  `review_verdict=pending`. Завершение исполнителя не является независимой приёмкой.

## Previous work

2026-07-19-dif-ocs-pixel-copy.md — completed; отдельная работа, этой миграцией
не переоткрывается, её owner/release scope не возобновляется.

## Evidence

`.agents/reports/2026-09-12-agent-knowledge.md` после локальной проверки.
Release readiness остаётся pending: fresh target/grant/exact rollback validation.