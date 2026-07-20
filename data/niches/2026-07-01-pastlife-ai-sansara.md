# 2026-07-01 — PastLife AI / Sansara

Status: active
Mode: deep_score
Last reviewed: 2026-07-20
Questionnaire completion: L2 deep score with gaps

## One-liner

Web-first entertainment AI-сервис: пользователь загружает фото и получает AI-образ "кем мог быть в прошлой жизни"; первый branded result бесплатный, дальше продаются пакеты solo AI-образов без watermark. Важная поправка: это не только одна "игрушка", а reusable AI-photo engine с админкой, prompt-card catalog, payments, promo/referral, analytics и потенциальной упаковкой проекта на продажу.

## Input

- Ниша: AI entertainment photo transformation / "прошлая жизнь по фото".
- Бизнес-модель: freemium web-flow с one-time credit packs; дополнительный сценарий монетизации — упаковка проекта как готового AI entertainment asset для продажи.
- География: РФ / русскоязычная аудитория; стартовые каналы VK, OK, Telegram.
- Сегмент: женщины 25-55, семейные пользователи, аудитория VK/OK/TG, которой заходят тесты, эзотерика, AI-фото и shareable entertainment.
- Проблема: хочется быстро получить эмоциональный, красивый, персональный и shareable результат по своему фото.
- Продукт: 1 бесплатный watermarked result, затем 4/8/16 AI-образов без watermark.
- Чек: 299 RUB / 4 образа, 499 RUB / 8 образов, 899 RUB / 16 образов.
- Маржа: unverified; digital product, но AI-cost, retry/fail rate, платежные комиссии и налоги ещё не сведены в unit economics.
- LTV / repeat: supported; 4/8/16 credits, повторные генерации для себя/семьи/друзей, P1 pair/family scenes.
- Канал продаж: VK, OK, Telegram, промо-ссылки, посевы, клипы, малый paid/social test.
- Референсы:
  - MyHeritage AI Time Machine / historical AI avatars.
  - Lensa / Magic Avatars and AI portrait editing.
  - Remini / AI Photos and AI photo enhancement.
  - Artisse AI / personalized AI photo app.
- Текущие активы:
  - production domain `sansara-art.ru`;
  - React/FastAPI/PostgreSQL/VPS runtime;
  - prompt-card catalog and admin panel;
  - promo links and attribution;
  - product catalog / payment code;
  - 265-card prompt system, curated examples, watermark/share/result flow.
  - sale-ready checklist and transfer-package narrative in `docs/BUSINESS_SALE_PACKAGE.md`.

## Questionnaire Gaps

- Missing mandatory A questions: none blocking for initial score.
- Missing evidence questions:
  - real Wordstat / Google Trends / SERP demand by Russian queries;
  - verified competitor prices for Russian audience alternatives;
  - actual payment happy path on active provider;
  - real first payments / conversion;
  - CAC by channel;
  - AI-cost per successful paid result including retry/fail rate;
  - gross margin after AI provider, payment commission, tax, promo freebies.
  - подтвержденный buyer interest / market for buying this exact asset;
  - sale deck, transfer checklist, screenshots/video demo and revenue proof.
- Assumptions:
  - external AI photo/avatar tools validate that the market exists;
  - VK/OK/TG audience may be warmer than generic app-store audience;
  - the project can run a small test within days if payments are verified.
  - reusable admin/prompt/payment/promo infrastructure can support other AI-photo toys with lower incremental development cost;
  - project may be sold as a готовый AI entertainment asset after payment happy path, first metrics and buyer package.

## Hard Filters

| Filter | Pass/Fail | Evidence | Notes |
| --- | --- | --- | --- |
| Сформированный рынок | Pass | supported | AI avatar/photo products exist: MyHeritage AI Time Machine, Lensa, Remini, Artisse. |
| Референс/конкуренты | Pass | supported | Direct and adjacent competitors found. |
| Широкий сегмент | Pass | supported | Women 25-55, family users, VK/OK/TG entertainment audience. |
| Горячий спрос | Partial | unverified | Emotional/share demand plausible, but Wordstat/Trends not checked. |
| Unit economics | Partial | unverified | Prices exist, but cost/margin not calculated. |
| Защита | Partial | supported | The single concept is copyable, but the built admin/prompt/payment/promo engine is harder to reproduce quickly. |
| Legal/ethical | Partial | supported | Entertainment disclaimers/legal pages exist; face/photo privacy and minors remain ongoing risk. |

## Детальные критерии

| Критерий | Балл | Статус | Вывод |
| --- | ---: | --- | --- |
| Сформированный рынок | 7/10 | supported | Широкий AI-photo рынок существует, но точный формат «прошлая жизнь по фото» уже категории нейрофотосессий и не доказан продажами. |
| Размер рынка | 7/10 | estimated | Entertainment/social аудитория широкая, но достижимый русскоязычный сегмент и его платёжеспособность не посчитаны. |
| Рост рынка / тренд | 4/10 | supported/unverified | Общий AI-photo рынок активен, но MyHeritage официально закрыл AI Time Machine в январе 2026 года; Wordstat/Trends точного оффера не проверены. |
| Горячий спрос | 4/10 | unverified | Эмоциональный интерес правдоподобен, но прямой коммерческий спрос и первые оплаты PastLife отсутствуют. |
| Конкуренция | 8/10 | supported | Есть крупные смежные конкуренты: AI avatars, AI photos, AI enhancement. Это плюс, но они не один-в-один. |
| Референс / готовая модель | 6/10 | supported | Credit packs понятны, но прежний прямой референс MyHeritage sunset; действующие Lensa/Remini/«Фотушка» подтверждают только более широкий AI-photo job. |
| Одна проблема / один сегмент | 6/10 | estimated | Оффер эмоционально ясен, но аудитория смешивает entertainment, эзотерику, AI-фото и family sharing. |
| Повторные продажи / LTV | 5/15 | estimated | Пакеты и генерации для близких допускают повтор, но это не подписка, а фактических повторов нет. |
| Наценка X4 / маржинальность | 3/15 | unverified | AI-cost, retries, payment fee, бесплатная первая генерация и CAC не сведены; X4 не доказана. |
| Cash cycle | 5/10 | estimated | Платные кредиты покупаются до генерации, но первый бесплатный результат создаёт COGS до выручки, а happy path оплаты не проверен. |
| Защита от копирования | 7/10 | supported | Одна идея копируется легко, но готовая админка, каталог, QA/retry, payment/promo контур и накопленная prompt-инфраструктура дают операционный барьер. |
| Реинвестиционный потенциал | 3/5 | estimated | Digital-актив может реинвестировать выручку, но пока выручка и остаток после generation cost/CAC равны неизвестному. |
| Операционная масштабируемость | 8/10 | verified | Production runtime, очередь, админка и каталог уже масштабируют delivery; качество, retries и support остаются операционными рисками. |
| Канал роста | 2/10 | unverified | VK/OK/TG и promo links перечислены, но нет канала с фактическим трафиком, CAC или оплатами. |
| **Рынок / Экономика / Защита** | **42/70 · 16/45 · 17/30** |  | v0.7 отделяет сильный кодовый актив от пока слабого доказательства рынка и экономики. |

### Вывод по нише

- Сильнее всего: сформированный смежный AI-photo рынок, широкий entertainment-сегмент, готовая модель credit packs и reusable админка/движок для других фото-игрушек.
- Ломает модель: не доказан прямой горячий спрос, не посчитана X4-маржа, не подтверждены платежи/покупатель актива.
- Что нужно добрать: Wordstat/Trends по русским запросам, AI-cost/margin по успешной генерации, конверсия 100-300 пользователей в оплату, минимальный sale package.

## Evidence

| Claim | Level | Source | Notes |
| --- | --- | --- | --- |
| Product exists as web-first MVP with upload -> result -> upsell | verified | PastLife `README.md`, `UX.md`, `PROJECT SPEC` | Runtime and UX are already documented. |
| Prices are 299/499/899 RUB packs | verified | PastLife `backend/app/database.py`, `docs/PROMO_PAYMENTS_P0.md` | Product catalog seeds active P0 credit packs. |
| Payment code exists but live payment path is not verified | verified | PastLife `docs/history/CURRENT_STATE.md`, `TASKS.md` | Active provider happy path remains open. |
| Project can be packaged as a sale-ready AI business asset | supported | PastLife `docs/BUSINESS_SALE_PACKAGE.md` | Sale narrative, buyer materials, transfer package and target packaging range are documented. |
| Admin/prompt/payment/promo infrastructure is reusable for other AI-photo toys | supported | PastLife `README.md`, `docs/BUSINESS_SALE_PACKAGE.md`, `UX.md` | Admin panels, PromptCard catalog, product catalog, promo/referral and analytics contours exist in docs/code. |
| Market has direct/adjacent competitors | supported | MyHeritage, Prisma/Lensa, Remini, Artisse sources | Validates category existence. |
| MyHeritage AI Time Machine закрыт с января 2026 года | verified | MyHeritage official blog update | Прямой historical-avatar референс был реальным, но не доказывает устойчивый текущий спрос. |
| Demand among VK/OK/TG is plausible | unverified | PastLife product docs | Needs traffic test and query research. |
| Unit economics can work | unverified | PastLife docs | Needs AI-cost/retry/CAC/margin model. |

## Market Capacity

| Scenario | TAM | SAM | SOM | Assumptions |
| --- | ---: | ---: | ---: | --- |
| Conservative | TBD | TBD | TBD | 1-2 small social channels, weak conversion, mostly free usage. |
| Base | TBD | TBD | TBD | VK/OK/TG promo traffic, 2-3% conversion from result users to 299 RUB, some 499 upgrade. |
| Aggressive | TBD | TBD | TBD | Viral/share loop works, 5%+ conversion, 15%+ share rate, repeated family/friend usage, plus multiple AI-photo toys launched on the same admin/runtime base. |

No reliable TAM/SAM/SOM is available from current project files. For this niche, capacity should be validated through real traffic and search/social demand rather than abstract market sizing.

## Asset / Exit Angle

PastLife AI нужно учитывать в двух плоскостях:

1. B2C-продукт: `прошлая жизнь по фото`, credit packs, share loop, VK/OK/TG traffic.
2. Reusable asset: админка, PromptCard catalog, AI-runtime, payment/products, promo/referral, analytics and transfer package.

Это повышает ценность проекта относительно "одной игрушки": можно запускать другие AI-photo офферы на той же механике и потенциально продать проект как готовый entertainment AI asset. Но sale-сценарий не засчитывается как доказанная монетизация, пока нет payment happy path, демо, метрик, скриншотов оплат, transfer checklist и хотя бы слабого buyer interest.

## Unit Economics

- Price:
  - 299 RUB / 4 credits.
  - 499 RUB / 8 credits.
  - 899 RUB / 16 credits.
- COGS: TBD; AI image generation + text QA + retries + storage + payment fees.
- Gross margin: TBD.
- CAC assumption: TBD; planned channels are VK/OK/TG/promo links.
- Payback: unknown until traffic test.
- Cash cycle: payment before paid generation credits; free first result creates AI-cost before revenue.
- Repeat purchase: possible through credit packs and family/friends usage, not yet verified.

## Score

### Подоценки личного фильтра

| Подоценка | Балл | Пояснение |
| --- | ---: | --- |
| Быстрые деньги | 35 | Есть готовый актив, но payment happy path, продажи и покупатель проекта отсутствуют. |
| Свобода | 90 | Digital delivery не привязан к месту и календарю. |
| Финансовая устойчивость | 60 | Код переносим, но стартовый рынок, платежи и провайдеры остаются локально/платформенно зависимыми. |
| Фокус | 50 | Актив уже создан, но дальнейшая полировка без продаж конкурирует с денежным ядром. |

| Метрика | Балл | Пояснение |
| --- | ---: | --- |
| Тип объекта | Существующий актив | Production-движок и пакетируемый проект; это не чужой рыночный референс. |
| Рынок | 60 | `round(100*42/70)`: широкий AI-photo рынок есть, но exact-offer спрос слаб, а прямой референс AI Time Machine закрыт. |
| Экономика | 36 | `round(100*16/45)`: credit packs и предоплата возможны, но маржа, CAC, payment happy path и повторы не доказаны. |
| Защита и масштаб | 57 | `round(100*17/30)`: production engine — реальный актив, но нет защищённого канала. |
| Личный фильтр | 54 | `round(0.40*35 + 0.20*90 + 0.20*60 + 0.20*50)`: свобода высокая, быстрые деньги и текущий фокус низкие. |
| Доверие к оценке | 0.65 | Код и production-актив проверены; коммерческий спрос, продажи, CAC, маржа и buyer interest отсутствуют. |
| Рыночная возможность v0.7 | 50 | `round(0.60*60 + 0.40*36) = 50`. Готовый код не добавляется в рыночный балл. |
| Приоритет ставки v0.7 | 31 | `round((0.40*36 + 0.35*57 + 0.25*54) * 0.65) = 31`. Это парковка до коммерческого сигнала, а не отрицание ценности кода. |
| Итог v0.5 (история) | 51 | `round((0.35*71 + 0.25*55 + 0.20*72 + 0.20*82) * 0.73)`. С версии v0.6 не использовать для сравнения с рыночными референсами. |

## Вердикт

Вердикт: Докрутить модель / sale-ready asset. Высокий личный fit и готовая инфраструктура делают это разумной ставкой на короткий тест, но не доказывают, что PastLife сильнее AI-фотосессий как категория или крупный бизнес.

Главный риск: проект уже технически сильный и потенциально продаваемый как актив, но ещё не доказал оплату, CAC, маржу и buyer interest. Самый опасный сценарий — продолжать полировать админку/каталог вместо доведения payment happy path, метрик и sale package.

Следующий шаг:

1. Проверить live/test payment happy path на production provider.
2. Посчитать COGS per successful paid generation с retry/fail rate.
3. Запустить 3-5 промо-ссылок или малый paid/social test.
4. Собрать минимальный sale package: demo video, admin screenshots, transfer checklist, cost model, roadmap, buyer one-pager.
5. Принять решение по метрикам: 299 RUB conversion, share rate, paid CAC, ARPU или реалистичность продажи проекта.

Kill conditions:

- `299 RUB conversion < 1%` после 100-300 result users и нормального result quality.
- Paid CAC выше expected gross profit per buyer без органического share.
- AI-cost/retry делает 299/499 RUB пакеты убыточными.
- Пользователи активно смотрят бесплатно, но не сохраняют/не шарят/не покупают.
- Sale package не вызывает интереса без реальных метрик или требует доработок, сопоставимых с полноценным запуском.

## Hit Parade Rows v0.7

### Карта рынков и референсов

| Место на карте | Ниша / референс | Тип объекта | Рыночная возможность | Рынок | Экономика | Доверие | Сильнейшее доказательство | Вывод | Пересмотр |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| 6 | PastLife AI / Sansara | Существующий актив | 50 | 60 | 36 | 0.65 | Production-движок существует, но exact-offer спрос, платежи и маржа не подтверждены; прямой референс AI Time Machine закрыт. | Парковать активную разработку до payment/traffic сигнала; готовый код не равен доказанному рынку. | 2026-07-20 |

### Очередь конкретных ставок

| Приоритет | Ниша | Тип объекта | Приоритет ставки | Экономика | Защита и масштаб | Личный фильтр | Доверие | Решение | Главный риск | Следующий шаг | Пересмотр |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 3 | PastLife AI / Sansara | Существующий актив | 31 | 36 | 57 | 54 | 0.65 | Парковка до коммерческого сигнала | Не доказаны спрос, CAC, маржа, платежи и покупатель актива. | Payment happy path, затем 100–300 пользователей; не полировать продукт до этих данных. | 2026-07-20 |

## Rescore History

- 2026-07-01: initial score from project docs plus external competitor scan.
- 2026-07-01: rescore after user clarified reusable admin/engine and possible project sale scenario; scale/focus/protection increased, but payment/demand/buyer risks remain.
- 2026-07-02: formula v0.4 added freedom and financial resilience; overall changed from 55 to 56 because the product is portable and can potentially earn outside one local market.
- 2026-07-02: formula v0.5 switched from one `Нишевой балл` to hybrid blocks; overall changed from 56 to 51 because weak proof of direct market demand and economics is now separated from strong freedom/asset value.
- 2026-07-20: migration to v0.6 separated market opportunity (`65`) from execution priority (`49`). The latter reflects the existing asset and focus, not a claim that PastLife has a higher business ceiling than AI-photo category leaders.
- 2026-07-20: portfolio audit v0.7 added the official January 2026 sunset of MyHeritage AI Time Machine and deterministic blocks. Market/economics/moat/personal became `60/36/57/54`, confidence `0.65`, market opportunity `50`, execution priority `31`.

## Sources

Local:

- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/README.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/PROJECT SPEC — PastLife AI.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/UX.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/TASKS.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/docs/PROMO_PAYMENTS_P0.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/docs/BUSINESS_SALE_PACKAGE.md`
- `/Users/ruslanmamedov/Yandex.Disk.localized/1. Проекты WibeCoding/PastLife AI/docs/history/CURRENT_STATE.md`

External:

- https://blog.myheritage.com/2022/12/new-ai-time-machine-adds-ai-avatars/ (official update: product sunset in January 2026)
- https://prisma-ai.com/lensa
- https://remini.ai/
- https://en.wikipedia.org/wiki/Artisse_AI
- https://www.wired.com/story/lensa-artificial-intelligence-csem
