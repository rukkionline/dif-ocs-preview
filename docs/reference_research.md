# Reference Research

## Research Scope

- Project: DIF OCS Preview.
- Page type: event/conference landing page.
- Audience: OCS partners, integrators, resellers and invited stakeholders.
- Domain expectations: experimental event identity, clear date/location details, program context, galleries and partner survey.

## Positive References

| Reference | Why Relevant | Transferable Patterns | Risks |
|---|---|---|---|
| https://dif.ocs.ru/ | Единственный и обязательный эталон | Вся сетка, типографика, цвета, изображения, секционная композиция, анимации, меню, бегущие строки, квиз и footer переносятся без творческих изменений | Внешние Tilda CDN-зависимости; формы и относительные маршруты не рассчитаны на preview-домен |

## Anti-References

| Reference or Pattern | Why To Avoid | Replacement Direction |
|---|---|---|
| Любой самостоятельный редизайн | Нарушает требование «один в один» | Использовать исходный DOM и CSS-контракт страницы |
| Универсальный SaaS/card UI | Уничтожает характерную постерную композицию | Сохранить асимметрию, крупную типографику и наклонные панели |
| Замена графики похожими картинками | Сразу заметна при визуальном сравнении | Сохранить исходные публичные CDN-ассеты |

## Competitive / Category Notes

Страница сознательно построена как цифровой постер: почти черный фон, фирменный красный, крупная геометрическая айдентика ДИФ, декоративные кубы, асимметричные карточки и разреженная композиция. Длинный экран состоит из 21 Tilda-блока и имеет высоту около 6487 px на 1440 px и 6718 px на 390 px.

## Transferable Patterns

- Layout: Tilda Zero Block, широкая desktop-сетка и отдельные координаты для mobile.
- Typography: Ubuntu для текста; крупные фирменные надписи и графика через исходные элементы/ассеты.
- Color: основной фон около `#0c0c0c`; акцент `#d5261b`/`#c8271c`; текст `#fffdfc` и серые оттенки.
- Media: 36 изображений, включая куб ДИФ, атмосферные круглые фотографии, галерею и логотипы.
- Navigation: фиксированный минималистичный header; mobile burger; якоря и ссылки на городские страницы.
- Section rhythm: крупный hero, смысловые колонки, наклонные карточки, круглые фотомодули, красные marquee, download CTA, quiz, gallery, footer.
- Interaction: Tilda fade/scroll animations, marquees, fixed header, cookie dialog, quiz steps, galleries, popup/anchor behavior.

## Asset Strategy

- Required assets: все URL изображений, SVG, CSS, JS и шрифтов из исходного HTML.
- Acceptable generated assets: нет.
- Product/service visuals: только исходные публичные материалы Tilda CDN.
- Photo/illustration direction: без замены и обработки.
- Icon policy: исходные Tilda/OCS SVG.
- Alt text expectations: сохраняются исходные значения, чтобы не менять DOM-контракт.

## Visual Hypothesis

Максимальная точность достигается не ручной реконструкцией, а сохранением исходного DOM и Tilda runtime с точечными безопасными изменениями: `noindex`, абсолютные ссылки на городские страницы, удаление статистики и блокировка отправки формы.

## Risks And Constraints

- CDN-ресурсы являются внешней зависимостью; их недоступность повлияет на preview так же, как на оригинал.
- Tilda form backend и статистика не должны получать данные с копии.
- Относительные ссылки `/nn`, `/ufa`, `/prm` и другие нужно переписать на `https://dif.ocs.ru/...`.
- Визуальная приемка выполняется по реальным скриншотам desktop/mobile, а не по DOM-отчету.
