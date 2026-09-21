# Project Context

## Название

`dif-ocs-preview` (id записи реестра CEO `projects.yaml`: `dif-ocs-preview`).

## Цель

UNKNOWN как проверенный факт. Наблюдаемое: репозиторий содержит одну статическую
страницу `index.html` (522 325 байт в локальном checkout) с `<meta name="robots"
content="noindex,nofollow,noarchive,nosnippet">` и `robots.txt` `Disallow: /` для всех
user-agent. В собственной разметке страницы указан канонический URL
`https://rukkionline.github.io/dif-ocs-preview/`; это наблюдаемая разметка, а не
подтверждённый production-домен.

## Аудитория

UNKNOWN — не наблюдалась в проверенных источниках.

## Бизнес-модель / сценарий

UNKNOWN — не наблюдалась в проверенных источниках.

## Стек (наблюдаемое)

- один статический `index.html` + `robots.txt` + `.nojekyll` (GitHub Pages)

## Источник и границы

- Канонический источник кода: GitHub `rukkionline/dif-ocs-preview`, ветка `main`.
- Локальный checkout на хосте `linux-dsh`: `/home/orca/projects/dif-ocs-preview`
  (реестр CEO: `coverage: COMPLETE`, `role: canonical`).
- Локальный `HEAD` совпадает с `observed_main_sha` реестра на снимке 2026-09-21.
- Публикация: `.nojekyll` в корне (GitHub Pages). Страница сама себя закрывает от индексации.

## Что нельзя менять без согласования

- состав активного портфеля и бизнес-приоритеты владельца;
- production, DNS, Git push/merge и индексирование;
- бюджеты, рекламные кампании и платные сервисы;
- юридические, коммерческие и контактные данные;
- project-local архитектуру, бренд и продуктовые ограничения.
