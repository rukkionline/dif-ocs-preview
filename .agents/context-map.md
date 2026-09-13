# Context Map

## Перед любой задачей
- .agents/project.md
- .agents/rules.md
- .agents/current-task.md и active task/state
- .agents/memory/index.md; topics по необходимости
- .agents/context-map.md — выбор runbook по типу задачи

## Для agent knowledge / docs-only проверки
- docs/runbooks/local-verify.md
- .agents/contract.json
- .agents/memory/index.md (canonical reviewed index; promoted records отсутствуют)

## Перед release/rollback
- docs/runbooks/release.md (status: NOT_READY_PENDING_TARGET_EVIDENCE; нужен точный owner grant)
- docs/runbooks/rollback.md (требует актуальную release-запись и отдельный grant)
- Свежий exact target/grant/source/backup; legacy docs и .agents/memory.md — не текущий approval

## Для дизайн-задач
- .agents/references/design-system.md
- .agents/references/content-tone.md
- .agents/checklists/design-quality-checklist.md
- релевантные .agents/decisions/

## Для SEO/GEO/AEO задач
- .agents/references/seo-geo-aeo-principles.md
- .agents/checklists/seo-page-checklist.md
- релевантные .agents/decisions/

## Для кодовых задач
- package.json
- README.md
- релевантные файлы в source/ и public/
- .agents/checklists/before-coding.md
- .agents/checklists/after-coding.md

## Для финального ревью
- .agents/current-task.md
- .agents/rules.md
- .agents/quality-gates.md
- .agents/checklists/after-coding.md
- git diff

## Для самообучения / ретроспективы
- .agents/reports/
- .agents/memory/index.md: canonical reviewed record index
- .agents/memory.md: append-only legacy history, не живое production state
- .agents/decisions/
- .agents/learning/error-patterns.md
- .agents/backlog/tech-debt.md