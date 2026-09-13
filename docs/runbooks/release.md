# DIF OCS Preview — гейтированный release (статический preview)

Status: NOT_READY_PENDING_TARGET_EVIDENCE (2026-09-12, docs migration).
Никакой deployment-скрипт в этом checkout не существует: `scripts/` содержит только
`build-preview.mjs` и `check-preview.mjs`; `package.json` — только `build/serve/check`.
Отсутствие deployment-скрипта НЕ доказывает отсутствие прошлого релиза: legacy docs
(`docs/handoff.md`, `docs/evidence_manifest.md`) и `.agents/memory.md` фиксируют прошлую
публикацию GitHub Pages (repo `rukkionline/dif-ocs-preview`, published commit
`5a03d682af9d790958d8e6e48630ecd29fb09743`, URL `https://rukkionline.github.io/dif-ocs-preview/`).
Это записанные исторические утверждения, НЕ свежее live-доказательство; доступность
Tilda CDN/GitHub Pages не предполагать.

## Preconditions — все обязательны

- Точный owner grant: действие, source commit, target (host/path/service/domain/channel),
  окно валидности, backup/rollback план.
- Свежий readback target: исторические значения — подсказки, не approval и не credentials.
- Чистый отдельный release checkout, exact HEAD; связь веток `mac-main`/`main` проверена.
- Локальный preview НЕ выдавать за production release: `npm run serve` работает только
  на 127.0.0.1:4317 и не публикует ничего.
- Статическое восстановление: только одобренный публичный subset (`public/`), без
  whole-root восстановления поверх runtime/private/PHP, без recursive chmod;
  runtime/secrets/DNS — отдельные точные owner grants.
- Независимый high-risk review принял exact candidate; решение исполнителя «готово»
  независимую приёмку не заменяет.

## Команда после gate

Конкретной команды публикации здесь НЕТ, и без grant'а команды не выдумываются.
Любой фактический publish (например, push одобренного коммита в deployment repo или
иной согласованный канал) — решение владельца по свежему evidence; задокументировать
отдельно. No fetch/dry-run как «проверка».

## Stop / readback

Неизвестный target/channel/backup, dirty tree, HEAD drift, чужой overlap, отсутствие
grant'а → stop. Ожидание: fresh target/grant/rollback evidence →
NOT_READY_PENDING_TARGET_EVIDENCE, не изобретённые команды.
Релиз и индексация/ранжирование/leads/messages — разные outcomes, release их не подразумевает.
После release обязательно: фактические remote-состояние, target readback и receipt.