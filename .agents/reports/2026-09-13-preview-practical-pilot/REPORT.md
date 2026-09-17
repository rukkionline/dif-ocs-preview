# Practical Preview pilot — локальный QA, 2026-09-13

## Статусы и scope

- **execution_status: worker_done_with_limitations** — реальные локальные проверки выполнены, полный fidelity QA не достигнут.
- **review_verdict: pending** — требуется отдельный reviewer, этот отчёт не независимая приёмка.
- **release_status: not_applicable** — grants старых задач не возобновлены; внешних действий нет.
- Прямой human pilot request — явный override исторического completed routing. `.agents/current-task.md`, contract и исторические task/state не изменены.
- Проверяемый HEAD `0b9ead5ee3657f91edb81a7780b9642955e9ccee`, `mac-main`. Исходный tracked diff пуст; чужой migration receipt оставлен нетронутым. Один editor этой сессии, глобальная process visibility ограничена sandbox namespace.

## Главное

**Chrome действительно запущен, но визуальный PASS заявлять нельзя.** Page-level Fetch interception включён до navigation: разрешены только GET/HEAD к `http://127.0.0.1:4317`; все внешние ресурсы заблокированы. Дополнительно отключены background networking/service-worker bypass cache, DNS внешних хостов и установлен dead-loopback proxy для внешних соединений. Новый временный browser profile удалён при завершении. Никаких установок или скачивания зависимостей.

Страница критически зависит от CDN. В этой политике 139 запросов завершились `net::ERR_BLOCKED_BY_CLIENT.Inspector` (`blockedReason=inspector`); 0/36 img загружены на каждой ширине. Это ожидаемое действие harness, а не доказательство сломанного CDN/production. Снятые PNG показывают пропавшие изображения, пересечения текста, огромные inline SVG-стрелки и нарушенную структуру квиза. Эти наблюдения не являются установленной регрессией accepted snapshot.

## Покрытие

| Проверка | Фактический результат | Граница доказательства |
|---|---|---|
| `npm run check` | PASS, exit 0 | Только существующие regex safety/routing assertions |
| Локальный HTML baseline | Byte-exact совпадение public с read-only transform source по существующему build script | Не browser pixel parity; build не запускался, tracked файлы не перезаписывались |
| Desktop | Chrome 1440×900, DPR 1; scrollWidth 1425, scrollHeight 17085 | Screenshot 1440×16000: последние 1085px не сняты |
| Narrow/mobile width | Chrome 390×844, DPR 1; scrollWidth 975, scrollHeight 10541 | Width-only responsive viewport, `mobile:false`, не эмуляция телефона/touch; overflow при заблокированных CSS |
| Локальные ссылки | 40 href; `/` и `/robots.txt` HTTP 200; relative city href = 0 | Внешние, tel/mail не открывались; section anchors проверены по DOM, не переходами |
| Console/page errors | 0 `Runtime.consoleAPICalled`, 0 `Runtime.exceptionThrown` | Отдельно 139 resource errors; Log domain не собран; Tilda scripts заблокированы, это не healthy-runtime PASS |
| Keyboard | По 12 Tab и 1 Shift+Tab, ожидаемое продвижение/возврат, computed outline `auto 1px` | Не полный tab-cycle, не проверка trap; кнопки/ссылки не активировались |
| Basic accessibility | lang ru, 1 H1, 1 main, отсутствуют duplicate IDs; AX tree собран; menu/close/OCS имеют имена | Есть unnamed textbox; axe/contrast/screen reader не запускались, все 36 alt присутствуют, но это не проверка качества alt |
| Form validity | Чтение `validity`/`willValidate`/`required`, без ввода; false validity не обнаружено | 0 native required, 43 data-tilda-req=1. Custom Tilda validation недоступна; нет оснований объявлять форму корректной |
| Form submission | Ни кликов submit, ни dispatch submit, ни Enter/Space, ни введённых данных | Guard только прочитан; harness дополнительно подавляет submit/requestSubmit, поэтому его эффективность не доказывается этим запуском |
| Visual advisory skill | Проверены скриншоты и некоторые semantics/hit areas в деградированном состоянии | Без изменений; typography, contrast, animations и 40px hit-area acceptance не могут быть честно приняты без CSS/runtime |

На обоих viewport initial Tab order: OCS → Самара → Пермь → Казань → Нижний Новгород → Уфа → Новосибирск → Красноярск → «Открыть меню» → «Close menu» → Уфа → Нижний Новгород. Shift+Tab возвращает к Уфе. Ни одна внешняя ссылка не активирована. Окно settling — 2.5s перед DOM capture плюс время Tab/readbacks/screenshots, не длительный soak test.

## Проверенные defect IDs и исторические утверждения

| ID | Результат этого pilot | Классификация / next step |
|---|---|---|
| QA-001 | Историческое 3.79:1 для красного micro-label не перепроверено | NOT_VERIFIED: нет полного CSS/font render; старый accepted risk не новая приёмка |
| QA-002 | Историческое 2.43:1 cookie body не перепроверено | NOT_VERIFIED по той же причине |
| QA-003 | CDN dependence подтверждена статически и фактическими 139 блокировками | CONFIRMED_LOCAL; блокирует fidelity при текущей network policy |
| QA-004 | Исторические layout shifts не перепроверены; reduced-motion override есть и проходит regex | NOT_VERIFIED_RUNTIME; inline/CSS деградация не измерение исходных animations |
| PILOT-001 | `#program/#partners/#speakers/#contacts` отсутствуют и в source, и в preview; `#about` существует | CONFIRMED_INHERITED, low navigation issue, не новый regression. `#menuopen` — JS hook, не автоматически dead anchor |
| PILOT-002 | 390px viewport имеет scrollWidth 975; 1440px — 1425; 0/36 loaded img на обеих ширинах | HARNESS_INDUCED_RENDER_DEGRADATION, blocker для оценки визуального паритета, не source-fix request |
| PILOT-003 | Form `action=""`, `method="POST"` в обоих локальных HTML, а старый visual report пишет `action="#"` | LOCAL_EVIDENCE_DISCREPANCY. Пустой action сам по себе не делает форму безопасной; preview-safety submit listener есть в public:729–734. Не отправлять для проверки |
| PILOT-004 | 43 custom required markers, 0 native required, untouched controls не показывают invalid validity | CUSTOM_VALIDATION_NOT_VERIFIED; зависимость от заблокированного Tilda runtime, baseline содержит то же |
| PILOT-005 | AX tree содержит textbox с пустым name, в частности own-answer controls; пример HTML public:327–331 вкладывает второй input в label с checkbox | OBSERVED_RESTRICTED_A11Y_CANDIDATE, предварительно medium, не full-runtime WCAG verdict. Перепроверить на разрешённом локальном asset fixture до исправлений |
| HIST-CTA | Историческая инертность registration CTA и desktop burger offscreen | NOT_RETESTED_INTERACTION: no-click pilot и отсутствие runtime; не подтверждать исторический вывод по деградированному render |

Новых подтверждённых Critical/High source-регрессий этим узким запуском не установлено; **это не означает, что они исключены**.

## Только доступный LOCAL baseline

`output/` отсутствует (glob вернул ENOENT, read-only Path.exists=false). В checkout не найдены исторические screenshot artifacts, на которые ссылается `docs/evidence_manifest.md`. Старые SSIM 0.987610/0.984864 и pixel delta 1.15%/1.76% не пересчитывались и не присваиваются этому pilot.

Доступен `source/original.html` SHA256 `6ce59d13631356c21bf18020908bd03f785cd08534055b6efeacf1f2a3b6635d`. `baseline-parity.mjs` исполняет только прочитанную transformation section build-script **до первого mkdir/write**, в памяти, и сравнивает результат с public: SHA256 `fcd697a8035736c9d31b1467d74545e2bd92b6b7a3ef2bcbd00af15006cd75f0`, exact match.

Намеренные различия source→preview сохранены: noindex/canonical/og:url preview, main landmark и ARIA labels, reduced-motion style, удалённые service token/forms key/stat script, внешние city routes вместо 22 относительных ссылок, submit guard. Оба HTML имеют 40 href/36 img/1 H1/1 form; input count 58→57 (удалён service input). Это подтверждает локальную воспроизводимость snapshot, не состояние живого оригинала.

## Команды и результаты

Рабочий каталог: `/home/orca/projects/dif-ocs-preview`.

```bash
pwd
git rev-parse HEAD
git branch --show-current
git status --short
git worktree list
git diff --check
git diff --exit-code
git diff --cached --exit-code
cmp AGENTS.md CLAUDE.md
node --version
npm --version
python3 --version
google-chrome --version
npm run check
# Только managed background job; serve-script прочитан: loopback bind, public-only.
npm run serve
# Отдельный managed job, JSON stdout, только PNG binary file output:
node .agents/reports/2026-09-13-preview-practical-pilot/browser-qa.mjs
python3 .agents/reports/2026-09-13-preview-practical-pilot/static-qa.py
node .agents/reports/2026-09-13-preview-practical-pilot/baseline-parity.mjs
node --check .agents/reports/2026-09-13-preview-practical-pilot/browser-qa.mjs
magick --version
magick .agents/reports/2026-09-13-preview-practical-pilot/1440.png -resize x8000 .agents/reports/2026-09-13-preview-practical-pilot/1440-inspection.png
magick .agents/reports/2026-09-13-preview-practical-pilot/390.png -resize x8000 .agents/reports/2026-09-13-preview-practical-pilot/390-inspection.png
magick identify .agents/reports/2026-09-13-preview-practical-pilot/*.png
sha256sum .agents/reports/2026-09-13-preview-practical-pilot/*.png
```

Успешные команды выше завершены exit 0 (serve специально остановлен SIGTERM). Browser script — observational collector: его exit 0 означает выполнение сбора, **не все QA assertions PASS**. Повторный запуск перезапишет pilot PNG; reviewer сначала должен сохранить/сверить текущие evidence и проверить script. Текстовые artifacts созданы write/edit tools, не shell redirection. 375px из общего checklist не проверялся: direct request задал 390px.

Версии: Node v22.22.3, npm 10.9.8, Python 3.14.4, Google Chrome 152.0.7977.64, CDP 1.3, V8 15.2.124.18, ImageMagick 7.1.2-18 Q16. `playwright`, `@playwright/test`, `puppeteer`, `axe-core`: `ERR_MODULE_NOT_FOUND`; Python playwright/websocket/websockets/selenium отсутствуют. Установка не выполнялась.

### Ошибки tooling/environment (не скрыты)

1. `chromium --version` печатает `cannot create transient scope: DBus error org.freedesktop.DBus.Error.UnixProcessIdUnknown ... No such process`. Probe был составным command без `set -e`, поэтому общий exit 0 не означает успех Chromium. Использован отдельно доступный Google Chrome, не ремонт environment.
2. Chrome stderr: `open /root/.config/google-chrome/Crash Reports/settings.dat: Read-only file system (30)`, dconf read-only cache, DBus/UPower ошибки. Browser QA и Chrome exit 0. Заблокированные ancillary записи не повторялись/не эскалировались; существующий профиль не использовался как user-data-dir. Это не page errors.
3. Попытка агрегировать raw stdout через Python в новом bash завершилась **exit 1**: `FileNotFoundError` для `/tmp/dsh-subprocess-byEi6r/dsh-subprocess-1131438-1-8a9477201399-stdout.log`. Harness log доступен read/grep tools, но не из изолированного нового bash. Результат расследован через read/grep; повторный browser run не выполнялся. Static script в том составном вызове уже успешно отработал и затем отдельно повторно подтверждён.
4. read_image исходного tall PNG не принял сторону >8192px. По указанию image tool созданы бинарные уменьшенные inspection copies существующим ImageMagick; обе действительно просмотрены. Desktop PNG исходно capped 16000px, mobile full measured height; это явно не исторические 6487/6718px.

### Evidence durability

`evidence.json` — компактная **ручная выписка из фактического stdout**, не полный raw trace. Полный browser stdout доступен в этой сессии read tool по `/tmp/dsh-subprocess-byEi6r/dsh-subprocess-1131438-1-8a9477201399-stdout.log` (11395 строк), но временный путь не считается durable handoff. Новый reviewer может воспроизвести stdout разрешённым script без rediscovery зависимостей; устойчивые handoff artifacts — локальные report/JSON/scripts/PNG. Raw trace не копировался shell-командой, чтобы соблюдать text-write policy.

## Cleanup и отсутствие source изменений

- `bash-2`: collected, exit 0; Chrome exit 0, временный profile удалён.
- `bash-1`: output collected; `job_kill` → SIGTERM/killed; после остановки socket connect_ex(127.0.0.1:4317)=111 (connection refused).
- Никакие чужие jobs/services не остановлены; DSH 8787 не использован.
- Build/install/download/commit/push/deploy/goals/subagents не выполнялись; существующие docs/public/source/config/package/current-task/contract не изменены.
- Release и проверка production не входят в scope. Shared CEO migration validator не запускался: исторический contract не изменён, pilot не переоткрывает миграцию.

## Next step

Отдельному reviewer: начать с INDEX и сверить HEAD, scoped status, screenshot hashes, evidence limitations и read-only parity. Для **полного** browser fidelity нужен предоставленный/отдельно разрешённый LOCAL пакет CDN assets и исходные baseline screenshots; нельзя самовольно разрешать внешние requests или скачивать их. Далее отдельным scoped разрешением — offline asset mapping только в QA harness, полноценные contrast/menu/quiz/keyboard проверки без submit. В рамках текущей задачи визуальные и source fixes запрещены.
