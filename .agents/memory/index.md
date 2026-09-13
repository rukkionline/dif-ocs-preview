# Project Memory Index

Authority: canonical public-safe project memory. Agent-native auto-memory is advisory only.
Status: initialized-no-promoted-records (2026-09-12)
Startup budget: maximum 200 lines and 25 KB.

## Record contract

Каждая promoted-запись сохраняет как минимум эти 11 исходных полей:
`id`, `project_id`, `type`, `statement`, `source`,
`observed_at`, `confidence`, `sensitivity`, `supersedes`, `writer`, `content_sha256`.

- `type`: fact | lesson | decision_reference | procedure_reference.
- `confidence`: observed | corroborated.
- `sensitivity`: public (секретные значения запрещены — только ссылки на secret-manager).
- `source`: непустой массив локальных файлов-источников с sha256.
- `supersedes`: массив id старых записей (может быть пустым).
- При использовании CEO pilot v1 дополнительно обязательны `risk` и `review`:
  `/home/orca/projects/CEO/.agents/memory/record-contract.md`. Hash не доказывает
  semantic truth, личность reviewer или owner permission. Этот пустой индекс
  не означает, что record validator уже подключён или какой-либо факт принят.

## Current records

(none — записей нет; высокорисковые исторические production/owner-утверждения
в promoted-records автоматически не переносятся)

## Review queue

(none)

## History and operating context

- `.agents/memory.md`: legacy append-only история; старые записи сохранять.
- `.agents/memory/events/`: immutable evidence (пока не инициализировано).
- `docs/runbooks/`: процедуры, не доказательство текущего production-успеха.
- `.agents/current-task.md`: mutable task projection; никогда не реконструировать
  текущее permission из памяти.