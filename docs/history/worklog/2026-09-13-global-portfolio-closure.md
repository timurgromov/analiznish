# Global Portfolio Closure — 2026-09-13

## Запрос

Довести все известные проекты до честного desk-исхода, убрать необъективные
отсевы, показать полный дайджест и определить, что остаётся делать до реальных
интервью.

## Что изменено

* Все 28 объектов классифицированы ровно один раз: 3 предварительных
  финалиста, 20 вне текущего соревнования, 2 hard failed exact-модели и 3
  reference/benchmark.
* Codex Project Starter сохранён одной ставкой; сегменты, templates и delivery
  не размножены в отдельные продукты.
* B2B, legacy и психологические runs доведены до bounded desk-gates и сведены в
  один Global Portfolio Gate.
* Добавлен отдельный competition state; `parked`, `failed`, стадия и место в
  соревновании больше не смешиваются.
* Schema и validators ограничивают active batch десятью идеями, Global Gate —
  тремя финалистами, owner selection — одной ставкой.
* Dashboard показывает итог 3/20/2/3 и состояние соревнования в карточке идеи.
* `CURRENT_STATE.md`, `TASKS.md`, workflow, discovery loop и продуктовые правила
  синхронизированы с новым контрактом.

## Проверенные источники и выводы

Для дебиторки два независимых российских сигнала указывают на задержки оплат и
кассовые разрывы, а локальные продукты подтверждают recurring price category.
Для compliance найдены practitioner cases и официальные обязательные сроки, но
standalone WTP слабее. Для order-to-cash есть свежий Excel/1С pain, однако
bounded оффер без портала/ERP-интеграции пока не найден. Подробные ссылки и
границы evidence сохранены в `data/discovery/`.

## Результат

Desk research текущего соревнования завершён. Владелец должен выбрать одну из
трёх ставок: контроль ранней дебиторки, Codex Project Starter или путь
«обращение → оплаченная первая сессия». После выбора открывается `I_E1` и
минимум пять реальных интервью; до этого build запрещён.

## Проверка

* `./scripts/check-local.sh`
* `node --check dashboard/app.js`
* `node --check dashboard/project.js`
* public allowlist build в отдельный каталог
* responsive/browser QA фиксируется отдельным UI evidence artifact
