# 2026-07-01 — PastLife AI / Sansara

Status: active
Mode: deep_score
Last reviewed: 2026-07-01
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
| Сформированный рынок | 8/10 | supported | AI avatar/photo products существуют, но конкретно "прошлая жизнь по фото" уже уже, чем весь AI-photo рынок. |
| Размер рынка | 8/10 | estimated | Потенциально широкий entertainment/social рынок, но достижимая русскоязычная аудитория не посчитана. |
| Рост рынка / тренд | unknown | unverified | Wordstat/Trends по русским запросам не проверены. |
| Горячий спрос | 6/10 | estimated | Есть эмоциональный спрос на AI-фото и шаринг, но прямой коммерческий спрос на этот оффер не доказан. |
| Конкуренция | 8/10 | supported | Есть крупные смежные конкуренты: AI avatars, AI photos, AI enhancement. Это плюс, но они не один-в-один. |
| Референс / готовая модель | 8/10 | supported | Референсы есть; модель credit packs понятна, а админка позволяет запускать не одну, а серию AI-photo офферов. |
| Одна проблема / один сегмент | 7/10 | estimated | Сегмент и боль понятны, но пока широковато: entertainment, эзотерика, AI-фото, family sharing. |
| Повторные продажи / LTV | 6/15 | estimated | Есть credit packs и потенциальные повторы для семьи/друзей, но это не расходник и не подписка. |
| Наценка X4 / маржинальность | unknown | unverified | Цена пакетов есть, но AI-cost, retries, payment fees и налоги не сведены. X4 не доказана. |
| Защита от копирования | 7/10 | supported | Одна идея копируется легко, но готовая админка, каталог, QA/retry, payment/promo контур и накопленная prompt-инфраструктура дают операционный барьер. |
| Реинвестиционный потенциал | 4/5 | estimated | Digital-продукт и reusable engine могут давать хороший leverage, если AI-cost/CAC сходятся или если актив продается как готовый проект. |
| **Сводно по критериям** | **72/100** |  | Ниша интересная: смежный рынок подтвержден, а reusable engine повышает защиту и масштаб. Слабые места остаются: прямой спрос, маржа, LTV и платежные метрики. |

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

| Метрика | Балл | Пояснение |
| --- | ---: | --- |
| Рынок | 71 | Смежный AI-photo рынок сформирован, но прямой спрос на PastLife-оффер и тренд по русским запросам не проверены. |
| Экономика | 55 | Credit packs и sale-ready asset дают потенциал, но LTV не подписочный, X4/margin/CAC и payment happy path не доказаны. |
| Защита и масштаб | 72 | Одна игрушка копируется легко, но reusable admin/runtime, каталог промптов, payment/promo контур и sale package повышают защиту и масштаб. |
| Личный фильтр | 82 | Собран из быстрых денег 79, свободы 90, фин. устойчивости 80 и фокуса 82: digital asset хорошо подходит по свободе и переносимости. |
| Доверие к оценке | 0.73 | Доказательства по продукту и asset-layer сильные; спрос, CAC, продажи, buyer interest и юнит-экономика не проверены. |
| Итог | 51 | `round((0.35*71 + 0.25*55 + 0.20*72 + 0.20*82) * 0.73)`. |

## Вердикт

Вердикт: Докрутить модель / sale-ready asset.

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

## Hit Parade Row

| Место | Ниша | Модель | Итог | Рынок | Экономика | Защита и масштаб | Личный фильтр | Доверие | Вердикт | Главный риск | Следующий шаг | Пересмотр |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 3 | PastLife AI / Sansara | Reusable AI-photo entertainment engine + first B2C product + possible sale asset | 51 | 71 | 55 | 72 | 82 | 0.73 | Докрутить модель / sale-ready asset | Не доказаны спрос, CAC, маржа, платежи и покупатель актива | Payment happy path + 100-300 user test + sale package | 2026-07-02 |

## Rescore History

- 2026-07-01: initial score from project docs plus external competitor scan.
- 2026-07-01: rescore after user clarified reusable admin/engine and possible project sale scenario; scale/focus/protection increased, but payment/demand/buyer risks remain.
- 2026-07-02: formula v0.4 added freedom and financial resilience; overall changed from 55 to 56 because the product is portable and can potentially earn outside one local market.
- 2026-07-02: formula v0.5 switched from one `Нишевой балл` to hybrid blocks; overall changed from 56 to 51 because weak proof of direct market demand and economics is now separated from strong freedom/asset value.

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

- https://www.myheritage.com/ai-time-machine
- https://prisma-ai.com/lensa
- https://remini.ai/
- https://en.wikipedia.org/wiki/Artisse_AI
- https://www.wired.com/story/lensa-artificial-intelligence-csem
