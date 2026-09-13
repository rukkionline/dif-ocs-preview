# DIF OCS Preview — локальная проверка agent contract (docs-only)

Scope: локальная документация/task/runbooks; без live target, build, serve и публикации.
Preconditions: exact checkout/HEAD, чистый статус, известный ownership diff,
Node (дополнительно для `npm run check`), Python>=3.9 для shared checker.

Перед проверкой зафиксируй:
```bash
pwd
git rev-parse HEAD
git status --short
git branch --show-current
git worktree list
```

Основная проверка (ожидание: exit 0, `ok=true`):

```bash
python3 /home/orca/projects/CEO/ops/agent_contract_check.py --root .
git diff --check
```

Дополнительно новые JSON парсятся:
```bash
python3 -c "import json,sys; json.load(open('.agents/contract.json')); json.load(open('.agents/tasks/2026-09-12-agent-knowledge.state.json')); print('json ok')"
```

Shared checker проверяет заявленные пути/типы/alias/parity и budget startup-файлов —
он не проверяет семантику runbook'ов и не является авторизационным gate.
Расположение checker'а в CEO — зависимость текущего хоста; при его отсутствии на другом
хосте фиксировать NEEDS_TOOL, не молча пропускать проверку.

## Грань с приложением (side effects)

- `npm run check` (`node scripts/check-preview.mjs`) — read-only regex-проверка
  `public/index.html`: не запускает сервер и не пишет файлы; допустима как
  дополнительная локальная проверка документации.
- `npm run build` (`node scripts/build-preview.mjs`) — ПИШЕТ tracked
  `public/index.html`, `public/robots.txt`, `public/.nojekyll` из `source/original.html`:
  НЕ запускать в docs-only задаче.
- `npm run serve` (`python3 -m http.server 4317 --directory public`) — локальный HTTP-сервер
  только для owner-invoked локального preview по 127.0.0.1:4317; это НЕ production release
  и НЕ доказательство публикации.
- В checkout нет deployment-скриптов и команд publish/deploy; не выдумывать их.

## Evidence и откат (docs-only)

Сохранить фактические команды и exit-коды, HEAD, scoped changed paths, непроведённые
проверки и `external_actions=[]`. Читающие проверки отката не требуют.
Откат документации — только по путе-скоупленному инспектируемому diff с разрешения
владельца, если появились другие редакторы; без reset/stash всего checkout.