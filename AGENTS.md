# Agent instructions

<!-- ORCA_AGENT_WORKFLOW_V3 -->

Контекст ниже должен учитываться перед любой задачей.
Не переписывай эти файлы без явной причины.

Стандарт ORCA workflow: /Users/sergeynazaruk/Downloads/ORCA_AGENT_WORKFLOW_STRUCTURE_FINAL_V3.md

@.agents/project.md
@.agents/rules.md
@.agents/current-task.md

При необходимости читай:
- .agents/context-map.md
- .agents/memory.md
- .agents/workflow.md
- .agents/quality-gates.md
- .agents/agent-roles.md
- .agents/references/
- .agents/decisions/
- .agents/checklists/

<!-- orca-codex-launch-mechanism-v1 -->
## Запуск CODEX / CLAUDE / OMP агентов из сессии (обязательный механизм)

Ты МОЖЕШЬ запускать Codex/Claude/OMP агентов на этой машине. Нативного способа нет
(agent tool их не содержит) — единственный рабочий механизм: **orca CLI** (`/usr/local/bin/orca`).
Ответ «я не могу запустить Codex/CLAUDE» — неверен. Полная справка текущей версии:
`orca skills get orca-cli` (или skill `orca-cli`).

Быстрый запуск Codex-агента в текущем проекте:

```bash
H=$(orca terminal create --worktree active --title "codex-worker" \
  --command 'codex --model gpt-5.6-luna -c model_reasoning_effort="max" -a never' --json \
  | grep -oE 'term_[a-f0-9-]+' | head -1)
orca terminal wait --terminal "$H" --for tui-idle --timeout-ms 90000 --json
orca terminal send --terminal "$H" --text "<задача>" --enter --json
```

Отдельный worktree с агентом (для больших/параллельных задач):

```bash
orca worktree create --name <task-name> --no-parent --agent codex --prompt "$(cat brief.txt)" --json
```

(бриф пиши в файл и передавай через `$(cat ...)` — многострочный текст ломается в shell-обёртке;
агент стартует в первом терминале нового worktree, handle — в `startupTerminal.handle`)

Контроль и чтение результата: `orca worktree ps --json`,
`orca terminal read --terminal <handle> --limit 200 --json`,
`orca terminal wait --terminal <handle> --for tui-idle --timeout-ms 600000 --json`.

Перед запуском тяжёлых сборок проверь диск: `df -h /` (свободно < 2 ГБ — сначала освободи место).
Результаты агента остаются в его worktree/ветке — забирай отчёты/коммиты до закрытия.
<!-- /orca-codex-launch-mechanism-v1 -->
