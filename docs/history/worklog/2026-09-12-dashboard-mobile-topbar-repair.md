# 2026-09-12 — Dashboard: mobile topbar repair

## Симптом

На production-снимке `390×844` status-chip в topbar выходил за правую границу.
Причина была в том, что mobile-правило уменьшало отступы, но не меняло
горизонтальный flex-контейнер header на колонку.

## Изменение

Для ширин до `560px` topbar складывает brand и metadata вертикально; metadata
занимает доступную ширину и переносится при необходимости. Добавлен `min-width:
0` для brand-block. Версия CSS обновлена до `v39`, чтобы Pages-клиент не взял
устаревший stylesheet из cache.

## Граница

Намеренная горизонтальная прокрутка tabs и summary-strip остаётся внутренней;
она не должна увеличивать `documentElement.scrollWidth`.

## Проверка

Перед изменением production dashboard загрузил все 27 идей, показал текущий
Portfolio Closure и не дал console errors. После publish требуется повторить
browser-check на `390×844` и desktop; точный measurement через Playwright CLI
в этой среде не стартовал в отведённое время.
