# Project Memory Index

Authority: canonical public-safe project memory для `rukkionline/dif-ocs-preview`. Agent-native memory — advisory only.
Status: initialized-no-promoted-records
Startup budget: maximum 200 lines and 25 KB.

## Record contract

Каждая promoted запись требует: `id`, `project_id`, `type`, `statement`, `source`,
`observed_at`, `confidence`, `sensitivity`, `supersedes`, `writer`, `content_sha256`.
Секретные значения запрещены; хранить только ссылки на secret manager.
Коррекции выполняются новой записью с `supersedes`; старые записи не переписываются.

## Current records

(none)

## Наблюдаемые факты реестра (2026-09-21)

Источник: CEO `projects.yaml` (декларация-снимок), метод: GitHub API + локальный
read-only git. Это декларация реестра, а не независимая приёмка.

- Репозиторий: `rukkionline/dif-ocs-preview`; ветка по умолчанию: `main`.
- `observed_main_sha`: `5a03d682af9d790958d8e6e48630ecd29fb09743` (снимок реестра CEO `projects.yaml`, 2026-09-21T08:38:42Z).
- `accepted_main_sha`: `null` — приёмки в реестре нет; это не «пустая ветка».
- `canonical_status`: `ACTIVE`; `source_recovery_status`: `COMPLETE`.
- `repo_kind`: `service`.

Локальные пути на хосте `linux-dsh` (путь этого хоста ничего не доказывает про другой хост):

| путь | kind | coverage | role |
|---|---|---|---|
| `/home/orca/projects/dif-ocs-preview` | git_checkout | COMPLETE | canonical |

## Что не утверждается

Записи не promoted; topics не созданы, потому что в этом контуре для проекта пока нет
проверенных устойчивых утверждений. Позиции, трафик, KPI, домены, доступы и версии
здесь не заявлены.
