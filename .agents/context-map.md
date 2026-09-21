# Context Map — dif-ocs-preview

## Выбор контекста

- Первый вход: `.agents/project.md` и `.agents/rules.md` — scope и разрешения.
- Продолжение/пересечения: `.agents/current-task.md` → active task/state.
- История: `.agents/memory/index.md` → нужные topics.
Остальное — по типу задачи.

## Для проверки контракта

- `docs/runbooks/local-verify.md` — безопасная read-only проверка.
- `AGENTS.md` — входной контракт; `CLAUDE.md` — указатель на него.

## Для задачи в этом репозитории

- Прочитай ближайшие инструкции той области, которую меняешь.
- Наблюдаемые точки входа и команды репозитория фиксируй по факту файлов
  (`package.json`/`Makefile`/README), а не по памяти.

## Для финального ревью

- `.agents/current-task.md`, `.agents/rules.md`, `git diff`.
- Различай `execution_status`, `review_verdict` и `release_status`.

## Чего в проекте пока нет

- `.agents/tasks/`, `.agents/decisions/`, `.agents/reports/`, `.agents/memory/topics/`
  в этом репозитории не созданы, пока нет реальных задач, решений и проверенных записей.
  Не создавать их «для полноты»: пустой файл не является знанием.
