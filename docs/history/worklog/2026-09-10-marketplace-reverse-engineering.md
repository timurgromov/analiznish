# 2026-09-10 — Transaction-first поиск и парковка доменного run

## Intent

Исправить два архитектурных дефекта: общий разговор о системе не должен
автоматически возвращаться к психологам, а маркетплейсы готовых цифровых
бизнесов должны стать ранним источником идей, а не случайной ссылкой в чате.

## Owner correction

Владелец указал, что текущая задача — улучшение всего Niche Factory. Психология
может быть одним тестовым доменом, но не единственным направлением и не текущей
обязательной работой. Доменный run сохранён и припаркован на `S · SCAN 6` без
потери подготовленных материалов.

## Changes

* Создан `docs/MARKETPLACE_REVERSE_ENGINEERING_PROTOCOL.md`.
* Для команды «найди актуальную идею» закреплены три входа: pain-first,
  product-first и transaction-first.
* Marketplace listing получил лестницу `M0–M4`; seller claims, platform
  verification, asking price, sold status и закрытая цена сделки разведены.
* Добавлен batch-проход: 20–40 listings минимум с двух площадок → кластеры →
  проверка другим входом и в России → 5–10 кандидатов → Portfolio Gate.
* Правило синхронизировано в `AGENTS.md`, Cursor rule, project spec, workflow,
  discovery loop, SIGMA, reference mining, idea purgatory, UX, README, prompt и
  локальный scoring skill.
* `data/ACTIVE_RUN.md` и source board переведены в `parked`; rail запрещает
  автоматически возвращать владельца к психологам во время системной работы.
* Валидатор теперь сообщает реальный `active/parked/...` status, а не печатает
  вводящее в заблуждение `active run ok` для любого состояния. Для parked run
  он также проверяет сохранённый source board, step и разделы возобновления.

## Pilot evidence

В `data/discovery/2026-09-10-marketplace-psychology-pilot.md` сохранён E1-пилот:

* Zicofy показывает паттерн B2B `software + acquisition service`, но публично
  отображаемая monthly profit отрицательна;
* несколько AI mental-health apps выглядят как продаваемые кодовые активы со
  слабой видимой traction;
* Microns listing по эмоциональному питанию помечен sold при маленькой ARR, что
  поддерживает build-to-sell гипотезу, но не доказывает большую нишу;
* один listing смешивает headline ARR с creator fees от token volume, показывая,
  зачем нужна реконструкция источника каждого числа.

Hit parade и idea inbox не изменены: пилот проверяет метод, а не выбирает ставку.

## Evidence limits

* Acquire email со скриншота — только `M0`: listing и финансовые материалы не
  показаны.
* Публичный sold/ended status не раскрывает цену сделки и retention.
* Иностранные listings не подтверждают российский спрос.
* Marketplace research остаётся E1 и не заменяет реальные интервью, действие и
  оплату.

## Verification

* `./scripts/check-local.sh` — прошёл: 9 рынков, 7 исполнимых ставок, run
  `psychologists-russia-2026-09-09` честно показан как `parked` на шаге 6.
* `git diff --check` — прошёл.
* Несвязанный untracked-файл `.cursor/rules/browser-qa-lifecycle.mdc` не трогать.

## Result

Контур теперь может искать идеи от рынка проблем, рынка продуктов и рынка
сделок. Психология остаётся сохранённым тестовым проходом, но больше не
перехватывает системную работу без явной команды владельца.
