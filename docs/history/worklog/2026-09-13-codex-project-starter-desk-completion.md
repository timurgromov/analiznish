# 2026-09-13 — Codex Project Starter: завершённый desk-run одной ставки

> **Статус: superseded 2026-09-13.** Этот run ошибочно сузил продукт до
> self-serve templates и назначил `passed_not_selected` без owner decision.
> Актуальный тезис и resume point: `data/discovery/2026-09-13-codex-project-starter-thesis-reset.md`.

## Намерение

По прямой команде владельца довести незавершённый Codex Project Starter до
честного решения, не создавая вариантов продукта для PM, агентств, founders или
delivery.

## Что реально проверено

* Собран свежий русскоязычный public corpus из независимых Habr-кейсов о
  переходе от идеи/ChatGPT к проекту в Codex, структуре, проверке и выпуске.
* Зафиксированы локальная paid category и бесплатные/платные alternatives.
* Применены S0–S5 и 18 критериев к одной карточке: рынок `74`, экономика `47`,
  защита/масштаб `33`, personal filter `50`, execution priority `24` при E1.

## Решение

Run закрыт как `passed_not_selected`, не `failed`: категория и Job наблюдаемы,
но широкий self-serve набор templates не имеет доказанных канала, защиты,
reason-to-choose или repeat-экономики. Поэтому I_E1, интервью, продажи и build
не открыты. Вернуть можно только ту же карточку при новом факте о узком сегменте
с дорогим обходным путём и доступном первом канале.

## Методологическое изменение

Добавлен Single-thesis Gate: владельческая ставка проходит S0–S5 и те же 18
критериев без искусственного batch; поиск с нуля по-прежнему требует Portfolio
Gate по независимым идеям. Валидатор и тест закрепляют наличие обоих режимов.

## Артефакты

* `data/discovery/2026-09-13-codex-project-starter-desk-completion.md`
* `data/ACTIVE_RUN.md`
* `data/IDEA_REGISTRY.json`
* `data/FACTORY_SCHEMA.json`
* `docs/NICHE_DISCOVERY_LOOP.md`, `docs/SIGMA_EXECUTION_MODEL.md`, `docs/WORKFLOW.md`
* `docs/history/DECISIONS.md`, `data/HIT_PARADE.md`, `data/PORTFOLIO_CLOSURE.md`

## Проверка

Запланированы `./scripts/check-local.sh`, `node --test` и `git diff --check`.
