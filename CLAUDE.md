# Agent instructions

Указатель. Канонический контракт агента — `AGENTS.md` в корне репозитория;
отдельно этот файл не редактировать.

Перед задачей явно прочитай:

- `AGENTS.md` — входной контракт и границы;
- `.agents/project.md`, `.agents/rules.md` — scope и разрешения;
- `.agents/current-task.md` — active task/state;
- `.agents/context-map.md` — что читать под конкретный тип задачи;
- `.agents/memory/index.md` — канонический индекс памяти.

Безопасная локальная проверка (read-only, Python >=3.9):

```bash
python3 /home/orca/projects/CEO/ops/agent_contract_check.py --root .
```

Процедура и ограничения: `docs/runbooks/local-verify.md`.

`rukkionline/dif-ocs-preview` — ветка `main`. Этот файл описывает только
наблюдаемые факты структуры репозитория и не является приёмкой или production-подтверждением.
