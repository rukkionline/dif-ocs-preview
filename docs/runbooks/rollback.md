# DIF OCS Preview — гейтированный rollback (статический preview)

Status: процедура документирована; НЕ выполнялась и НЕ протестирована этой миграцией
(2026-09-12). Rollback readiness: требуется актуальный target/grant, known-good
состояние и точный backup locator. В checkout нет автоматической rollback-команды
(deployment/rollback-скриптов нет вообще).

## Требуемая release-запись (до release)

Перед release зафиксировать: предыдущее live-состояние, candidate commit(s), target
host/path/service/domain/channel, dependency lock, backup locator и verified hashes.
Историческая Memory-запись или docs-claims (GitHub Pages `5a03d682...`,
`rukkionline.github.io/dif-ocs-preview`) НЕ достаточны для нового rollback: это не
свежее подтверждение target/канала/бэкапа. Не трогать runtime/private/customer
данные, бэкапы, секреты и server configuration git-операциями.

## Триггеры и stop-условия

Провал post-deploy валидации, target/commit mismatch, persistent HTTP errors, чужой
overlap → stop и reconcile фактического состояния. Неизвестные side effects не
доказывают отсутствие релиза; no blind repeated deploy.
Если затронуты runtime-данные — приостановить code-only rollback и использовать
отдельно одобренное восстановление данных (не этой процедурой).

## Предпочтительный путь восстановления (docs/static subset)

Только одобренный публичный subset (`public/`); чистый отдельный checkout; владелец
одобряет точные bad-коммит(ы), previous known-good ref, recovery target и scope;
независимый reviewer проверяет предложенный inverse diff и исключает
runtime/data/config recovery; без recursive chmod и whole-root восстановления.

Для ОДНОГО обычного non-merge release-коммита на текущем release HEAD при наличии
полной одобренной release-записи допустим локальный подготовительный рецепт
(точные refs — строго из одобренной release-записи, не из этого документа):

```bash
set -euo pipefail
: "${APPROVED_RELEASE_COMMIT:?exact bad release commit required}"
: "${APPROVED_KNOWN_GOOD_COMMIT:?exact verified previous commit required}"
test -z "$(git status --porcelain)"
test "$(git rev-parse HEAD)" = "$APPROVED_RELEASE_COMMIT"
test "$(git rev-parse HEAD^)" = "$APPROVED_KNOWN_GOOD_COMMIT"
git revert --no-commit "$APPROVED_RELEASE_COMMIT"
git diff --cached --check
git diff --cached --stat
```

Команды готовят inverse diff, НЕ завершённый rollback и НЕ одобренный новый коммит.
Merge, multi-commit release, изменившийся HEAD, missing Git object, конфликт или
провал gate — ВНЕ этого рецепта: не выбирать mainline и не делать reset вслепую.
Push/deploy/restart этот документ сам по себе не авторизует; после review/owner gate
новый recovery-коммит публикуется по `docs/runbooks/release.md` как expectedCommit.

## Verification и recovery evidence

После одобренного восстановления: подтвердить remote recovery commit, target readback
и полный post-deploy receipt; зафиксировать old -> bad -> recovery refs, exit-коды и
ограничения. Для service/domain/data recovery требуется отдельный план с фактическими
проверенными backup locator'ами. Ни один backup locator этой миграцией не выдумывается.