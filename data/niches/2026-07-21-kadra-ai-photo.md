# 2026-07-21 — КАДРА

Status: research
Mode: portfolio_review / deep_score with execution assumptions
Last reviewed: 2026-07-21
Questionnaire completion: L2; цена, provider и финальный acquisition channel требуют проверки

## One-liner

«КАДРА» — самостоятельный массовый русскоязычный сервис AI-фотосессий: пользователь загружает фото, выбирает готовый образ или собственное описание, получает бесплатный первый результат и затем покупает разовые пакеты или кредиты без скрытой подписки.

## Classification

- Тип объекта: `concrete_bet` / конкретная ставка.
- Это не переименование PastLife и не оценка бизнеса «Фотушки».
- «Фотушка» используется только как архивный конкурентный референс внутри исследования; в hit parade активным объектом AI-фотосессий является только «КАДРА».

## Input

- Кто платит: массовый русскоязычный B2C-пользователь, которому нужны новые реалистичные фотографии себя для соцсетей, анкет, подарков или личного контента.
- Стартовый job для расчёта: новые фото для соцсетей без фотографа, студии и навыка написания prompt. Финальный launch-сегмент в проекте ещё не утверждён.
- География: РФ и русскоязычный рынок.
- Оффер: одна честная бесплатная проба или preview → готовые фотосессии и собственное описание → разовый пакет/кредиты → новые коллекции и referral как repeat.
- Рабочий ценовой ориентир для скоринга: стартовый пакет в диапазоне локальных референсов `389–990 ₽`; это `estimated`, а не принятое решение «КАДРЫ».
- Маржа: `unverified`; provider, retries, QA, support, payment fee и CAC ещё не посчитаны.
- LTV: repeat через новые коллекции, кредиты, referral и повторную покупку; собственных cohort-данных нет.
- Первый канал для оценки: тёплая аудитория и личные рекомендации для первых 10 покупателей, затем измеримый Telegram/VK creative-test. Повторяемый канал не доказан.
- Активы: подробный competitor research, controlled test protocol, продуктовая спецификация; PastLife рассматривается только как потенциальный technical donor после read-only audit.
- Текущий runtime: приложения, backend, provider, payment и deploy ещё нет; Git в папке «КАДРА» не инициализирован.

## New Evidence Reviewed

- Фотушка: живой Telegram onboarding, пользовательский free result, post-trial offer, полный нативный Mini App-каталог, 19 тематических разделов, 412 category placements с дублями, 34 video presets и несколько pricing surfaces; реальной оплаты не было.
- НейроКадр: авторизованный кабинет и одна controlled 1K generation. Два бесплатных кадра, результат примерно через 33 секунды, пакеты `119–5 000 ₽`, custom prompt, T-Pay checkout и recurring referral; реальной оплаты не было.
- Facee: public и authenticated app pass, wallet `99–990 ₽`, trends, ready sets, custom modes, referral, profile/history и data controls; controlled generation и оплата не выполнялись.
- PastLife donor-audit не выполнен, поэтому его код, админка и платежи не засчитываются как готовый актив «КАДРЫ».

## Hard Filters

| Filter | Pass/Fail | Evidence | Notes |
| --- | --- | --- | --- |
| Сформированный рынок | Pass | verified/supported | Есть несколько работающих локальных сервисов, цены, каталоги, бесплатные пробы и checkout-поверхности. |
| Референс/конкуренты | Pass | verified | Фотушка, НейроКадр и Facee пройдены hands-on; полный Tier A ещё не завершён. |
| Широкий сегмент | Pass | supported | Потребность в личном визуальном контенте широкая; первый платный launch-сегмент пока слишком общий. |
| Горячий спрос | Pass/Partial | supported | Публичная аудитория и активные продукты подтверждают использование; собственный payment intent не проверен. |
| Модель денег | Pass/Partial | supported/estimated | Разовые кредиты/пакеты и повторные коллекции понятны, но собственная цена и cost model не выбраны. |
| Unit economics | Partial | unverified | Cash upfront реалистичен, но provider cost, retries, QA, refund, CAC и margin отсутствуют. |
| Защита | Partial | estimated | Потенциальны бренд, качество, каталог и данные; сейчас нет собственного distribution или runtime. |
| Legal/ethical | Partial | supported | Обработка лиц, consent, retention, deletion и платежи требуют отдельного implementation review. |

## Детальные критерии

| Критерий | Балл | Статус | Вывод |
| --- | ---: | --- | --- |
| Сформированный рынок | 10/10 | verified | Несколько локальных продуктов реально проводят пользователя от загрузки до результата/paywall. |
| Размер рынка | 8/10 | supported | Личный визуальный контент нужен широкому B2C-сегменту; TAM/SAM и Wordstat пока не рассчитаны. |
| Рост рынка / тренд | 6/10 | supported | Активные каталоги, новые инструменты и несколько живых игроков поддерживают категорию; 12–24-месячная search-динамика не проверена. |
| Горячий спрос | 8/10 | supported | Видимая Telegram-аудитория Фотушки и коммерческие продукты подтверждают использование; willingness-to-pay «КАДРЕ» не проверена. |
| Конкуренция | 9/10 | verified/supported | Фотушка, НейроКадр, Facee и длинный Tier A доказывают рынок; конкуренция снижает moat, а не market score. |
| Референс / готовая модель | 10/10 | verified | Наблюдались trial, wallet/packages, custom/ready flows, referral, catalog и checkout-поверхности. |
| Одна проблема / один сегмент | 7/10 | estimated | Job «новые фото для соцсетей» понятен, но финальный launch-сегмент и один срочный повод ещё не утверждены. |
| Повторные продажи / LTV | 8/15 | supported/estimated | Новые коллекции, кредиты и referral поддерживают repeat у категории; у «КАДРЫ» нет cohort и оплат. |
| Наценка X4 / маржинальность | 5/15 | unverified | По правилам неизвестная маржа не получает больше 5; provider, retries, QA, support и CAC не посчитаны. |
| Cash cycle | 9/10 | supported | Разовый пакет/кредиты оплачиваются до генераций; фактический callback и refund flow ещё не реализованы. |
| Защита от копирования | 4/10 | estimated | Бренд, каталог и quality process могут стать активом, но сейчас нет собственного distribution, данных или продукта. |
| Реинвестиционный потенциал | 3/5 | estimated | Предоплата может финансировать контент и acquisition, если подтвердится contribution margin. |
| Операционная масштабируемость | 6/10 | estimated | Software delivery масштабируемо в категории, но stack/provider/queue/admin ещё не выбраны, donor-audit не выполнен. |
| Канал роста | 3/10 | unverified | Тёплый старт, Telegram/VK и referral описаны как гипотезы; повторяемого канала и CAC нет. |
| **Рынок / Экономика / Защита** | **58/70 · 25/45 · 13/30** |  | Исследование усилило рынок и confidence; отсутствие собственного runtime, unit economics и канала ограничивает execution. |

### Вывод по нише

- Сильнее всего: сформированный рынок, реальные локальные референсы, понятная prepaid-модель и возможность быстро проверить один пакет.
- Ломает модель: сделать качественный универсальный клон без собственного канала, выбранного job и измеренной себестоимости годного результата.
- Что нужно добрать: один launch-сегмент, точный пакет/цена, donor/provider cost test, рабочий vertical slice, 10 оплат и 30/60-day repeat.

## Evidence

| Claim | Level | Source | Notes |
| --- | --- | --- | --- |
| Проект существует как docs-first product/research system | verified | `Кадра / README.md`, `PROJECT_SPEC.md`, `MARKETING.md`, `docs/history/CURRENT_STATE.md` | Зафиксированы P0, flow, метрики, backlog и безопасные границы исследований. |
| Три прямых конкурента пройдены hands-on | verified | `Кадра / docs/research/competitors/*.md` | Фотушка, НейроКадр и Facee; глубина прохода различается и платежи не выполнялись. |
| Controlled result получен у НейроКадра | verified | `Кадра / docs/history/worklog/2026-07-21-neiro-kadr-controlled-generation.md` | Один результат примерно за 33 секунды; это не доказывает качество/стоимость «КАДРЫ». |
| Фотушка имеет работающий free result и большой нативный каталог | verified | `Кадра / docs/research/FOTUSHKA_PRESET_CATALOG.md` | Один ad-hoc result, paywall/catalog/profile; exact prompt adherence в trial был слабым. |
| Собственный продукт, цена, cost model и продажи существуют | unverified | none | Приложения и deploy нет; это главный разрыв между market research и execution. |
| PastLife ускорит запуск | estimated | user context + pending donor-audit | До read-only audit reuse не засчитывается как verified. |

## Working Economics

- Цена: `estimated` диапазон `389–990 ₽` для первого тестового пакета на основе локальных checkout-поверхностей; финальная цена не утверждена.
- COGS: unknown; считать `provider + failed/retry generations + QA + storage + payment fee + refunds + support`.
- CAC: unknown; первый канал — тёплые рекомендации, затем маленький attribution-safe Telegram/VK test.
- Cash cycle: предполагается предоплата за пакет/кредиты.
- Repeat: новые коллекции и повторная покупка; измерять через 30/60 дней.
- Gate: не масштабировать, пока нет 10 реальных покупателей и contribution margin после retry/QA.

## Score

### Подоценки личного фильтра

| Подоценка | Балл | Пояснение |
| --- | ---: | --- |
| Быстрые деньги | 50 | Категория и P0 хорошо изучены, потенциальный donor может ускорить сборку; собственного vertical slice и оплаты пока нет. |
| Свобода | 90 | Digital B2C-продукт не привязан к городу, календарным слотам или личному delivery. |
| Финансовая устойчивость | 55 | Возможна географическая экспансия, но старт зависит от РФ-платежей, AI-провайдеров и внешних платформ. |
| Фокус | 65 | Проект уже активно исследуется и может переиспользовать активы, но полный универсальный каталог создаст сильное распыление. |

| Метрика | Балл | Пояснение |
| --- | ---: | --- |
| Рынок | 83 | `round(100*58/70)`: hands-on конкуренты и реальные продуктовые поверхности подтверждают категорию; search/TAM ещё не проверены. |
| Экономика | 56 | `round(100*25/45)`: prepaid и repeat-механики понятны, но собственная маржа и CAC отсутствуют. |
| Защита и масштаб | 43 | `round(100*13/30)`: модель масштабируема технически, но собственного продукта, distribution и moat пока нет. |
| Личный фильтр | 62 | `round(0.40*50 + 0.20*90 + 0.20*55 + 0.20*65)`: высокая свобода и активный проект не компенсируют отсутствие продаж. |
| Доверие к оценке | 0.65 | Категория проверена глубоко, но execution-score опирается на рабочие допущения по цене, donor reuse и первому каналу. |
| Рыночная возможность v0.7 | 72 | `round(0.60*83 + 0.40*56) = 72`. Конкурентные данные подтверждают рынок, но чужую экономику и канал нельзя переносить в наш проект. |
| Приоритет ставки v0.7 | 34 | `round((0.40*56 + 0.35*43 + 0.25*62) * 0.65) = 34`. Это место для одного коммерческого vertical slice, не для полной разработки клона. |

## Вердикт

Вердикт: **парковка полной разработки / один ограниченный коммерческий тест**.

Главный риск: принять объём конкурентного исследования за доказательство нашей экономики и построить широкий продукт раньше одного понятного оффера, канала и десяти оплат.

Следующий шаг:

1. Выбрать один launch-сегмент и один срочный job.
2. Утвердить один платный пакет, рабочую цену и первый канал.
3. Провести read-only donor-audit PastLife и выбрать только ускоряющие P0 компоненты.
4. Собрать один vertical slice `upload → free result → paywall → payment → repeat`.
5. Получить 10 реальных уникальных покупателей и посчитать contribution margin до расширения каталога.

Kill / pause conditions:

- менее 5 оплат из 30 целевых тёплых предложений;
- cost годного результата после retries/QA не оставляет минимум 60% gross margin до CAC;
- нет ни одной repeat-покупки среди первых 10 покупателей за 45–60 дней;
- acquisition работает только через дорогих инфлюенсеров без окупаемости;
- donor-audit показывает, что reuse медленнее безопасного небольшого vertical slice.

## Portfolio v0.7

* Тип объекта: `concrete_bet` / конкретная ставка.
* Рыночная возможность: `72`.
* Приоритет ставки: `34`.
* Сильное доказательство: hands-on конкурентный research и controlled generation подтверждают продуктовую категорию.
* Главный пробел: собственного продукта, cost model, канала и оплат ещё нет.

## Sources

Local project:

- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /README.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /PROJECT_SPEC.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /MARKETING.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/history/CURRENT_STATE.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/research/COMPETITOR_MATRIX.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/research/FOTUSHKA_PRESET_CATALOG.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/research/competitors/fotushka.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/research/competitors/neiro-kadr.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/Кадра /docs/research/competitors/facee.md`
