# 2026-07-01 — Travel Radar

Status: active
Mode: deep_score
Last reviewed: 2026-07-20
Questionnaire completion: L2 deep score with gaps

## One-liner

Telegram-first сервис: платный персональный бот мониторит авиабилеты под город, страны, бюджет, даты и возвраты, а бесплатный Telegram-канал показывает лучшие находки, приводит аудиторию и позже может продавать рекламу.

## Input

- Ниша: персональные cheap-flight alerts / радар аномально дешёвых авиабилетов.
- Бизнес-модель: подписка на Telegram-бота + бесплатный Telegram-канал как лидогенератор и будущая рекламная площадка; партнёрки по авиабилетам — дополнительный слой, не core.
- Кто платит: гибкие путешественники, подписчики тревел-каналов, пары/семьи/группы; позже рекламодатели тревел-ниши.
- География: старт РФ / Москва и Санкт-Петербург, дальше регионы и международные направления.
- Сегмент: люди, которые хотят ловить дешёвые билеты, но не хотят вручную читать десятки каналов и проверять маршруты.
- Проблема: авиабилеты быстро меняются, дешёвые варианты легко пропустить, общий поток каналов не учитывает личные направления, бюджет, даты и возвраты.
- Продукт:
  - Pro bot: персональные alerts, budget cap, регионы, OW/RT, return sniper, ready trips, объяснение аномалии.
  - Free channel: публичная витрина лучших находок и верх воронки.
- Чек:
  - Pro: 690 RUB / мес.
  - Family / Group: 1 290 RUB / мес.
  - Pro Year: 5 900 RUB / год.
  - Founder: 2 490 RUB / год; Family Founder: 4 900 RUB / год; Lifetime: 9 900 RUB with fair-use.
- Маржа: estimated; software/subscription model can have high gross margin, but API limits, hosting, Telegram/channel growth, editorial moderation and support are not yet counted.
- LTV / repeat: strong in model; subscription, annual plans, founder offers, family/group. Needs churn validation.
- Канал продаж: Telegram channel, seed placements in travel/relocation/lifestyle communities, free bot preview, founder access.
- Референсы:
  - Samokatus: public channel, site, best deals, closed/paid layer and bot.
  - TravelRadar: large existing channel and brand collision risk.
  - Vandrouki / Piratesru / Aviasales: mature travel-deal media.
  - Going / Secret Flying / FairDrop-like models: deal alerts and paid/personalized alert logic.
- Текущие активы:
  - private MVP already in production on VPS;
  - FastAPI/PostgreSQL/worker/Telegram bot runtime;
  - Travelpayouts / Aviasales Data API integration;
  - active search profiles, price history, anomalies, ready trips, return sniper, Bali purchase radar;
  - commercial launch review with `go with conditions`;
  - pricing, onboarding, channel strategy and launch plan documented.

## Questionnaire Gaps

- Missing mandatory A questions: none blocking for initial score.
- Missing evidence questions:
  - real Wordstat / Telegram search / channel demand for Russian paid personal flight alerts;
  - actual paid beta conversions;
  - CAC from seed placements or channel growth;
  - churn / retention;
  - provider/API cost and limits at commercial scale;
  - legal/compliance review for Telegram ads, affiliate links and travel disclaimers;
  - public brand validation, because `TravelRadar` is occupied.
- Assumptions:
  - users will value personalization enough to pay, not only consume free channel posts;
  - Travelpayouts cached prices are good enough for discovery with clear `last seen` disclaimers;
  - Telegram remains a viable acquisition and product surface for this audience.

## Hard Filters

| Filter | Pass/Fail | Evidence | Notes |
| --- | --- | --- | --- |
| Сформированный рынок | Pass | supported | Cheap-flight channels, deal-alert services and travel media exist. |
| Референс/конкуренты | Pass | supported | Samokatus, TravelRadar, Vandrouki, Piratesru, Aviasales, Going, Secret Flying. |
| Широкий сегмент | Pass | supported | Flexible travelers, Moscow/Piter, travel-channel subscribers, regional interests. |
| Горячий спрос | Pass/Partial | supported | Demand for cheap tickets is visible through existing media, but paid personal alert demand in РФ is unverified. |
| Unit economics | Partial | estimated | Subscription software can be high-margin, but acquisition, support and API constraints unknown. |
| Защита | Partial | supported | Data history, personalization and bot UX help; competitors and channels are strong. |
| Legal/ethical | Partial | supported | Product can be clean with disclaimers, but Telegram ad/legal/compliance needs review. |

## Детальные критерии

| Критерий | Балл | Статус | Вывод |
| --- | ---: | --- | --- |
| Сформированный рынок | 10/10 | supported | Рынок дешёвых билетов, тревел-каналов и deal alerts уже сформирован. |
| Размер рынка | 8/10 | estimated | Путешественников много, но стартовая достижимая аудитория ограничена РФ, Telegram и гибкими пользователями. |
| Рост рынка / тренд | 7/10 | supported | Общий travel/airfare рынок активен, авиабилеты дорожают, а это усиливает боль поиска выгодных тарифов. Прямой Wordstat/Telegram demand по paid personal flight alerts в РФ еще не проверен. |
| Горячий спрос | 8/10 | supported | Люди активно ищут дешёвые билеты и читают каналы; вопрос — готовы ли платить за персонализацию. |
| Конкуренция | 10/10 | supported | Конкуренции много, это плюс: рынок с деньгами есть. |
| Референс / готовая модель | 9/10 | supported | Есть публичные каналы, закрытые/платные слои и международные paid alert продукты. |
| Одна проблема / один сегмент | 8/10 | supported | Сегмент и боль сформулированы: гибкие путешественники, которым нужен личный фильтр вместо общего потока. |
| Повторные продажи / LTV | 12/15 | estimated | Подписка, годовые планы, founder access and family/group дают лучшее LTV, чем разовые продукты. Churn не проверен. |
| Наценка X4 / маржинальность | 10/15 | estimated | Software/subscription потенциально high-margin, но API, поддержка, канал и модерация не посчитаны. |
| Защита от копирования | 6/10 | supported | Защита в данных, истории цен, UX, персонализации и канале; но крупные игроки могут копировать. |
| Реинвестиционный потенциал | 4/5 | estimated | Подписка и founder cash могут финансировать канал, рекламу и доработку продукта. |
| **Сводно по критериям** | **85/100** |  | Ниша сильная: рынок и конкуренция есть, модель подписочная, LTV лучше, общий travel-demand поддержан внешними признаками. Слабые места — paid demand в РФ, бренд, compliance и API/cached-price ограничения. |

### Вывод по нише

- Сильнее всего: сформированный рынок, высокая конкуренция, подписочный LTV, понятная боль “не хочу мониторить всё руками”.
- Ломает модель: если пользователи довольны бесплатными каналами и не платят за персонализацию; если cached prices слишком часто расходятся с live; если acquisition канала дорогой.
- Что нужно добрать: Wordstat/Telegram validation именно по paid personal alerts, 10-20 paid founder sales, CAC/churn after first seed placements.

## Evidence

| Claim | Level | Source | Notes |
| --- | --- | --- | --- |
| Project exists as private production MVP | verified | Travel Radar `README.md`, `docs/history/CURRENT_STATE.md` | Backend, worker, PostgreSQL, bot and VPS runtime documented. |
| Travelpayouts API returns usable cached price data | verified | `API_SPIKE.md` | Initial routes returned prices, dates, deeplinks; decision `limited_but_usable`. |
| Commercial model is documented | verified | `PROJECT_SPEC.md`, `docs/COMMERCIAL_LAUNCH_REVIEW.md` | Subscription bot + free channel, tariffs, launch plan, gates. |
| Market has strong competitors and references | supported | `docs/COMMERCIAL_LAUNCH_REVIEW.md`, external sources | Samokatus, TravelRadar, Vandrouki, Piratesru, Aviasales, Going, Secret Flying. |
| General airfare/travel trend supports the pain | supported | IATA/industry news, Travel Radar commercial review | Air traffic remains active and airfare pressure makes deal monitoring more valuable, but this is not yet direct proof of paid РФ alerts demand. |
| Paid personal radar demand exists in РФ | unverified | assumption from competitor gaps | Needs beta/founder sales and channel tests. |
| Unit economics can work | estimated | pricing scenarios in commercial review | Needs CAC, churn, API/support cost, conversion. |

## Market Capacity

| Scenario | TAM | SAM | SOM | Assumptions |
| --- | ---: | ---: | ---: | --- |
| Conservative | TBD | TBD | TBD | 5K channel subscribers, 30-60 paid users, 18K-50K RUB/month according to local scenarios. |
| Base | TBD | TBD | TBD | 20K-50K subscribers, 120-700 paid users, 80K-630K RUB/month combined subscription + ads. |
| Aggressive | TBD | TBD | TBD | 150K subscribers, 1 200-2 500 paid users, 1.0M-2.5M RUB/month including ads. |

Commercial review contains scenario math, but these are planning scenarios, not forecasts. Real capacity depends on channel growth, conversion to bot, paid conversion and churn.

## Unit Economics

- Price:
  - Pro: 690 RUB/month.
  - Family: 1 290 RUB/month.
  - Pro Year: 5 900 RUB/year.
  - Founder: 2 490 RUB/year.
- COGS:
  - VPS/PostgreSQL/worker.
  - Travelpayouts/API usage and limits.
  - Telegram bot/channel ops.
  - moderation/manual approve, support, seed placements.
- Gross margin: estimated high, not calculated.
- CAC: unverified; initial seed placements in small channels recommended.
- Payback: unknown until founder sales.
- Cash cycle: subscription/founder prepay is positive if manual access works.
- Repeat purchase: subscription and annual renewal, but churn risk is core.

## Score

| Метрика | Балл | Пояснение |
| --- | ---: | --- |
| Рынок | 85 | Рынок дешевых билетов и deal alerts сформирован: есть спрос, конкуренты, референсы и понятный сегмент; общий travel/airfare trend поддержан, но paid personal alerts в РФ требуют проверки. |
| Экономика | 76 | Подписка, founder offers и family/group plans дают LTV; маржинальность software-модели вероятно хорошая, но API/support/CAC еще не сведены. |
| Защита и масштаб | 70 | Есть данные, история цен, UX, бот и канал; защита средняя, потому что крупные тревел-игроки могут копировать механику. |
| Личный фильтр | 75 | Собран из быстрых денег 70, свободы 85, фин. устойчивости 75 и фокуса 78: идея удаленная и актив уже построен, но paid demand еще не доказан. |
| Доверие к оценке | 0.76 | Product/runtime evidence strong; market payment, CAC, churn and brand validation missing. |
| Итог v0.5 (история) | 60 | `round((0.35*85 + 0.25*76 + 0.20*70 + 0.20*75) * 0.76)`. С версии v0.6 не использовать как единый рейтинг портфеля. |

## Вердикт

Вердикт: Докрутить модель / paid beta.

Главный риск: продукт может оказаться полезной личной системой и хорошим техническим активом, но не платным бизнесом, если пользователи не захотят платить за персонализацию поверх бесплатных каналов.

Следующий шаг:

1. Не строить дальше “идеальный радар” до paid signal.
2. Сделать минимальный paid beta контур: paywall copy, manual access, 10-20 founder users.
3. Подготовить 20 live examples и 5 channel posts.
4. Провести 3 seed placements в малых релевантных каналах/чатах.
5. Измерить: bot starts, onboarding completion, paid conversion, refund/complaints, first-week retention.

Kill / pause conditions:

- Нет 10 paid/founder users после понятного оффера и 3-5 малых посевов.
- Users like free channel but do not convert to personal bot.
- Cached price mismatch creates distrust that cannot be solved with copy and live-check UX.
- Channel acquisition CAC makes 690 RUB/month plan economically weak.
- Telegram/compliance risk blocks ads or paid distribution.

## Portfolio v0.6

* Тип объекта: `concrete_bet` / конкретная ставка.
* Рыночная возможность: `81` = `round(0.60*85 + 0.40*76)`.
* Приоритет ставки: `56` = `round((0.40*76 + 0.35*70 + 0.25*75) * 0.76)`.
* Сильное доказательство: сформированная категория deal alerts, работающий продукт и конкурентные референсы; payment intent ещё требует проверки.

## Hit Parade Row v0.5 (история)

| Место | Ниша | Модель | Итог | Рынок | Экономика | Защита и масштаб | Личный фильтр | Доверие | Вердикт | Главный риск | Следующий шаг | Пересмотр |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 2 | Travel Radar | Paid personal flight-deal Telegram bot + free channel leadgen | 60 | 85 | 76 | 70 | 75 | 0.76 | Докрутить модель / paid beta | Не доказана готовность платить за персонализацию поверх бесплатных каналов | 10-20 founder users + channel seed test | 2026-07-02 |

## Rescore History

- 2026-07-01: initial score from local project docs, commercial review and external competitor references.
- 2026-07-02: formula v0.4 added freedom and financial resilience; overall changed from 57 to 59 because the product is remote/software-like and can potentially expand beyond one local market.
- 2026-07-02: formula v0.5 switched from one `Нишевой балл` to hybrid blocks `Рынок / Экономика / Защита и масштаб / Личный фильтр`; overall stayed 59.
- 2026-07-02: trend no longer marked `unknown`; general airfare/travel pain is supported by external industry signals, but paid personal alert demand in РФ remains unverified. Overall changed from 59 to 60.
- 2026-07-20: migration to v0.6 separated market opportunity (`81`) from execution priority (`56`); base evidence and score components were not re-estimated.

## Sources

Local:

- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/README.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/PROJECT_SPEC.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/TASKS.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/API_SPIKE.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/docs/COMMERCIAL_LAUNCH_REVIEW.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/docs/history/CURRENT_STATE.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/docs/RADAR_OPERATIONS.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/travel-radar/docs/READY_TRIPS.md`

External:

- https://t.me/s/samokatus/44679
- https://samokatus.ru/best-deals
- https://t.me/s/travelradar
- https://telemetr.me/content/vandroukiru
- https://telemetr.me/content/AAAAAD5WsU-PrNzEfdZYeA
- https://t.me/s/Aviasales
- https://en.wikipedia.org/wiki/Going_%28company%29
- https://en.wikipedia.org/wiki/Secret_Flying
