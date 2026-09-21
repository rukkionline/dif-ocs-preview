# dif-ocs-preview — локальная проверка agent-контракта

Runbook ID: `dif-ocs-preview-local-contract-verify-v1`.
Status: implemented as procedure; результат конкретного запуска живёт в task/отчёте, не здесь.
Scope: инструкции и контракт этого репозитория. Не включает app/source/content/HTML/config,
build, deploy, публикацию, индексацию и работу с секретами.
Side effects: команды ниже только читают; записи в checkout не выполняется.
Требуется Python >=3.9 standard library; пакеты, сеть, секреты и авторизация не нужны.

Отдельного проектного runbook в репозитории не наблюдалось.

## Предусловия

1. `pwd` — checkout `/home/orca/projects/dif-ocs-preview` на хосте `linux-dsh` (или фактический путь этого хоста).
2. `git status --short` — сохранить существующие изменения; не stash/reset чужую работу.
3. `git rev-parse HEAD` — зафиксировать точный ref наблюдения.

## Команды

```bash
pwd
git rev-parse HEAD
git status --short
python3 /home/orca/projects/CEO/ops/agent_contract_check.py --root .
git diff --check
```

Ожидается exit0 для каждой команды; verifier JSON `ok:true`. Checker живёт в CEO checkout
этого хоста; если путь недоступен — записать `NEEDS_TOOL`, а не пропускать проверку молча.
Никакого `git fetch`, `|| true`, автоматического `git add/commit/push` и `git reset --hard`.

## Что эта проверка НЕ запускает

Валидация контракта — не build и не release QA. Объявленные в репозитории команды
наблюдались, но в этот scope не входят и выполняются только отдельной задачей с
применимым owner gate:

- В репозитории не наблюдалось объявленных команд сборки/тестов (по файлам GitHub `main`).

`docs`/contract PASS не означает build, test, render или release PASS.

## Stop и ограничения

- Exit1/exception — прочитать конкретную причину; не менять source других проектов ради PASS.
- Checker не проверяет семантику markdown, истинность утверждений, Git history, live
  deployment и не заменяет независимое review; наличие `owner_grant_ref` не подтверждает
  валидность разрешения.
- Чистое рабочее дерево на этом хосте не доказывает паритет с другими хостами: паритет
  доказывается общим SHA.
- Отсутствие пути на другом хосте — `SOURCE_IMPORT_REQUIRED`/`UNKNOWN`, а не «проект потерян».

## Evidence и восстановление

Записать command/cwd/ref/exit/checks/ограничения в отчёт текущей задачи, без raw history и секретов.
Read-only проверки rollback не требуют. Откат docs/contracts — только path-scoped diff после
чтения текущего `git status`; не применять `git reset --hard`/`checkout` ко всему дереву и не
переписывать legacy `.agents/memory.md`.
