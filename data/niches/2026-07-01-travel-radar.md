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
| Повторные продажи / LTV | 10/15 | supported/estimated | Going подтверждает платную recurring-модель deal alerts, но retention и продление именно российской Telegram-версии не проверены. |
| Наценка X4 / маржинальность | 6/15 | estimated | Digital delivery потенциально маржинален, но API, поддержка, ручная модерация, посевы и реальный CAC не посчитаны; X4 не доказана. |
| Cash cycle | 8/10 | supported | Годовые founder-пакеты и подписка оплачиваются до периода доступа; бесплатный канал и посевы создают затраты до конверсии. |
| Защита от копирования | 6/10 | supported | Защита в данных, истории цен, UX, персонализации и канале; но крупные игроки могут копировать. |
| Реинвестиционный потенциал | 3/5 | estimated | Предоплата может финансировать канал, но до продаж неизвестно, остаются ли деньги после acquisition и поддержки. |
| Операционная масштабируемость | 8/10 | verified/supported | Runtime автоматизирован и уже работает; ручная модерация, API-ограничения и качество cached prices остаются узкими местами. |
| Канал роста | 5/10 | supported/unverified | Канал, посевы и founder-воронка спроектированы, но повторяемого привлечения и paid conversion ещё нет. |
| **Рынок / Экономика / Защита** | **60/70 · 27/45 · 19/30** |  | Блоки v0.7 рассчитаны из детальных критериев; гипотетическая software-маржа больше не считается доказанной. |

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

### Подоценки личного фильтра

| Подоценка | Балл | Пояснение |
| --- | ---: | --- |
| Быстрые деньги | 55 | Продукт готов к beta, но ни одна платная конверсия ещё не подтверждена. |
| Свобода | 85 | Telegram/software-модель не привязана к месту и личному delivery. |
| Финансовая устойчивость | 65 | Возможна географическая экспансия, но старт зависит от РФ/Telegram, travel API и занятого бренда. |
| Фокус | 60 | Есть работающий актив, однако запуск потребует отдельного канала и отвлечёт от денежного ядра. |

| Метрика | Балл | Пояснение |
| --- | ---: | --- |
| Рынок | 86 | `round(100*60/70)`: категория и платные международные референсы сильны; российский paid demand остаётся непроверенным. |
| Экономика | 60 | `round(100*27/45)`: recurring и предоплата доказаны как модель категории, но наша маржа, CAC и churn отсутствуют. |
| Защита и масштаб | 63 | `round(100*19/30)`: runtime и данные дают актив, но канал не доказан, а механику могут повторить крупные игроки. |
| Личный фильтр | 64 | `round(0.40*55 + 0.20*85 + 0.20*65 + 0.20*60)`: удалённый готовый актив, но не быстрые деньги до первой платной beta. |
| Доверие к оценке | 0.70 | Runtime и категория подтверждены; payment intent, CAC, churn и повторяемый канал в РФ отсутствуют. |
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

## Portfolio v0.7

* Тип объекта: `concrete_bet` / конкретная ставка.
* Рыночная возможность: `76` = `round(0.60*86 + 0.40*60)`.
* Приоритет ставки: `43` = `round((0.40*60 + 0.35*63 + 0.25*64) * 0.70)`.
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
- 2026-07-20: portfolio audit v0.7 retained the strong market (`86`) but removed optimistic subscription-margin, LTV and channel assumptions. Economics became `60`, moat/scale `63`, personal filter `64`, confidence `0.70`; market opportunity became `76`, execution priority `43`.

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

- https://www.going.com/how-it-works
- https://www.going.com/guides/membership-guide
- https://t.me/s/samokatus/44679
- https://samokatus.ru/best-deals
- https://t.me/s/travelradar
- https://telemetr.me/content/vandroukiru
- https://telemetr.me/content/AAAAAD5WsU-PrNzEfdZYeA
- https://t.me/s/Aviasales
- https://en.wikipedia.org/wiki/Going_%28company%29
- https://en.wikipedia.org/wiki/Secret_Flying
