# Психологи: авторизованный marketplace batch и ранний Portfolio Gate

Status: `desk scan / E1 / owner checkpoint required`
Date: 2026-09-10
Mode: `marketplace_mining → portfolio_review`
Scope: продукты для психологов и psychology-adjacent B2C/B2B-модели в России.
Этот тест не возобновляет припаркованный run интервью и не меняет hit parade.

## Короткий ответ

Авторизованный Acquire не выдал одну готовую идею, которую нужно копировать.
Он дал более полезное разделение:

1. generic `AI-психолог` часто продаётся как кодовый актив либо показывает
   слабую экономику даже при большой аудитории;
2. сильнее выглядят узкие продукты с измеримым результатом: отказ от курения,
   контроль screen time, речь ребёнка, ежедневное улучшение отношений;
3. сильная B2B-экономика существует в программах, где платит организация за
   конкретный outcome, но такой рынок требует длинных продаж, клинической
   доказательности и другого доступа;
4. marketplace и generic CRM для психологов не получили сильного
   transaction-first подтверждения;
5. в нашем контексте верх batch занимают не самые крупные внешние рынки, а две
   проверяемые ставки: доведение обращения до оплаты и контролируемая
   психологом работа клиента между сессиями.

## Что реально проверено

* В авторизованном Chrome открыт базовый аккаунт Acquire.com и раздел
  [All listings](https://app.acquire.com/all-listing). Поиск выполнен по
  `mental health`, `therapist`, `therapy`, `practice management`, `psychologist`
  и `counseling`.
* Открыты полные доступные базовому аккаунту карточки четырёх релевантных
  объектов: AI companion для Gen Z, B2B AI+VR mental health, AI life coach и
  marketplace парной терапии; отдельно открыт speech-therapy app.
* Сопоставлены прошлые публичные выборки Flippa и Microns из
  `data/discovery/2026-09-10-marketplace-psychology-pilot.md`.
* Для нового РПП-кандидата проверен российский App Store: `I feel food` имеет
  135 оценок, рейтинг 4,5, бесплатное ядро и платную аналитику паттернов;
  отзыв прямо просил связывать эмоции, еду и повторяемые эпизоды.
* Повторно использованы уже проверенные российские референсы, Wordstat и
  Jobs-карта из предыдущего прохода. Они не были заменены новым AI-списком.

Ограничение: цифры Acquire и Microns ниже показаны самой площадкой, но в
открытом аккаунте не были подтверждены P&L, Stripe, договорами или аналитикой.
Это seller-reported evidence, если отдельно не указан verification badge.

## Корпус: 21 marketplace lead

`Выручка / прибыль / цена` приведены в валюте карточки и обычно относятся к
TTM, если так показал Acquire. Это не означает, что цена сделки подтверждена.

| № | Площадка и объект | Наблюдаемые данные | Что это показывает |
| ---: | --- | --- | --- |
| 1 | Acquire — AI recovery ecosystem, B2C+B2B | $0 / $0 / ask $18 тыс. | Готовый mental-health код без денег — актив, не бизнес. |
| 2 | Acquire — 12-летняя wellbeing-платформа | $474 тыс. / $51 тыс. / ask $475 тыс. | Широкий wellness может иметь выручку, но маржа скромнее headline. |
| 3 | Acquire — quit-smoking app | $48 тыс. / $28 тыс. / ask $83 тыс. | Узкий поведенческий outcome монетизируется лучше generic mental health. |
| 4 | Acquire — screen-time app | $48 тыс. / $40 тыс. / ask $169 тыс. | Измеримый ежедневный outcome и повторное использование. |
| 5 | [Acquire — AI mental-health companion для Gen Z](https://app.acquire.com/startup/fiFx5JeyVedPR7fW5WlGIXkvMrG3/4rvjCja7herqjPKH2aNC?source=marketplace) | TTM revenue $23,5 тыс.; profit −$338; ask $79,4 тыс.; growth −48%; seller сообщает 100 тыс.+ регистраций, 51–100 customers и churn 10%+ | Большая бесплатная аудитория не доказывает хороший subscription business. |
| 6 | [Acquire — B2B AI+VR mental health](https://app.acquire.com/startup/eMZyk2uIkJflAlILHCMcVBAPmAj1/EQn0cpUQKL7bv5Zcpo1l?source=marketplace) | $429,2 тыс. / $311,8 тыс. / ask $1,2 млн; менее 10 клиентов; annual contracts; $150–350 за пользователя в год | Сильный B2B-паттерн: организация платит за конкретную программу и outcome. |
| 7 | [Acquire — AI life coach](https://app.acquire.com/startup/WY7sQo4VAMhZIfdD1p8eVhkFIQU2/ijhRaZaBRr0SLxrr5hwL?source=marketplace) | $679,2 тыс. / −$635,5 тыс. / ask $2,3 млн; 2,67 млн installs; churn 10%+ | Масштаб установок может сосуществовать с разрушительной экономикой. |
| 8 | Acquire — wellbeing gamification | $600 тыс. / $450 тыс. / ask $2,5 млн | Возможна сильная экономика, но карточка не даёт нашей локальной ставки. |
| 9 | Acquire — meditative narrative audio | $2 тыс. / $0 / ask $300 тыс. | Контент и приложение без traction не становятся бизнесом из-за большой категории. |
| 10 | Acquire — audio mindfulness/display sync | $33 тыс. / $17 тыс. / ask $105 тыс. | Узкое потребительское использование может быть прибыльным, масштаб неизвестен. |
| 11 | Acquire — telemedicine suite | $15 тыс. / $0 / ask $45 тыс. | Технический healthcare asset без доказанной экономики. |
| 12 | [Acquire — online couples therapy](https://app.acquire.com/startup/SDAJ3ZuojQPTCq6W8nQ1Oz8l8jE3/97UyeyS0dXyioKjtKIPn?source=marketplace) | $22 тыс. / $4 тыс. / ask $32 тыс.; 70 тыс. downloads; 10–50 paying users | Двусторонний marketplace имеет слабую конверсию и зависит от acquisition. |
| 13 | [Acquire — speech therapy app для детей](https://app.acquire.com/startup/03iKA1mQg9O7NmedPtbMvFJDbP53/0jUC0dmd2knnNodurt8B?source=marketplace) | header: $351 тыс. revenue и $80,6 тыс. profit; seller text приводит другие числа; ask $100 тыс.; 5 тыс.+ payers | Сильный narrow-outcome паттерн, но противоречащие финансовые поля требуют diligence. |
| 14 | Acquire — pay-per-minute experts | $29 тыс. / $18 тыс. / ask $109 тыс.; psychics/astrologers/therapists | Платёж за коммуникацию работает, но это marketplace экспертов, а не доказательство ниши психологов. |
| 15 | [Flippa — Zicofy](https://flippa.com/12864929-saas-agencia-para-salud-mental-crm-propio-operacion-comercial-service-montado-en-hubspot-red-de-contractors-ingresos-recurrentes-y-escalabilidad) | CRM + agency; starting bid €13 тыс.; monthly profit −€1 458; `Vetted` для revenue/expenses/traffic | `Service-first → software` дошёл до клиентов, но видимая экономика отрицательна. |
| 16 | [Flippa — Flow, Talk It Out](https://flippa.com/13361316-flow-talk-it-out-feel-better) | 50+ installs, 0 Play reviews, profit не показан, ask около $5,8–10 тыс. | Код и бренд без traction. |
| 17 | [Flippa — therappai](https://flippa.com/13425535-ai-powered-mental-health-platform-offering-24-7-therapy-via-chat-voice-and-video-subscription-saas-with-global-scalability-and-strong-recurring-revenue-potent) | 1 subscriber, ask $9 тыс., listing ended | Generic AI therapy — starter asset; ended не означает sold. |
| 18 | [Microns — AI Nutrition Companion](https://www.microns.io/startup-listings/ai-nutrition-companion) | $103 ARR, 8 customers, ask $2 999, sold badge; подписка $12,99/мес. | РПП-смежная идея продаваема как маленький актив, но cashflow не доказан. |
| 19 | [Microns — AI Voice Therapist](https://www.microns.io/startup-listings/ai-powered-voice-therapist) | headline $12 тыс. ARR и 50 customers, ask $2 тыс., sold | В описании $12 тыс. пришли из creator fees токена, а не из SaaS; headline вводит в заблуждение. |
| 20 | [Microns — relationship app](https://www.microns.io/startup-listings/relationship-app-for-ios) | seller сообщает 713 active subscribers, 34 тыс. users, $19,5 тыс. revenue за 3 месяца, около $2,6 тыс. MRR и ask $220 тыс.; sold badge | Узкий ежедневный Job + viral content + подписка может быть сильным B2C; header смешивает revenue и ARR. |
| 21 | [Microns — AI music for focus/wellness](https://www.microns.io/startup-listings/ai-powered-music-platform) | $200 ARR, 300 lifetime payers, $20 тыс. lifetime revenue, ask $2,5 тыс. | Lifetime purchases и текущий ARR нельзя смешивать; актив потерял recurring momentum. |

## Повторяющиеся денежные паттерны

| Паттерн | Что подтверждено | Что не подтверждено | Решение |
| --- | --- | --- | --- |
| Generic AI companion | Несколько listings и подписная упаковка | Устойчивая прибыль, retention и российский канал | Не копировать. |
| Узкий B2C outcome | Quit smoking, screen time, speech и relationship показывают платящих пользователей и recurring | Переносимость конкретного канала и retention в РФ | Использовать как продуктовый принцип. |
| B2B outcome для работодателя/страховщика | Один крупный profitable reference с annual contracts | Наш доступ к HR/страховщикам, цикл продажи и clinical claims | Сильный рынок, слабая текущая ставка. |
| Практика психолога: software + service | Zicofy и российские CRM/booking подтверждают расходы | Прибыль отдельной модели и причина переключения с бесплатных инструментов | Проверять только через узкий денежный исход. |
| Marketplace сессий | Комиссия и оплата сессий существуют | Дешёвое привлечение двух сторон и удержание | Не строить первым. |
| Build-to-sell starter asset | Несколько sold/ended карточек с малой выручкой | Цена сделки, ликвидность и возврат на разработку | Не путать с прибыльным SaaS. |

## Batch из восьми конкретных моделей

Цены ниже — гипотезы для сравнения, не подтверждённая готовность платить.

| ID | Плательщик → результат → деньги | Первый канал | Поддержка двумя входами | Главный риск |
| --- | --- | --- | --- | --- |
| P1 | Частный психолог с входящими обращениями → больше оплаченных первых сессий → success fee 500 ₽, затем 990–1 990 ₽/мес. | Жена, коллеги, Ирина Ушкова; затем профессиональные сообщества | pain-first: локальный intent и ручной handoff; product-first: МыОкей/Profi/Мила; transaction-first: Zicofy | Реальной утечки после обращения может не быть. |
| P2 | РПП-психолог → безопасная работа клиента между сессиями по утверждённым заданиям и динамике → 1 490–2 990 ₽/мес. за практику | Тот же экспертный канал | product-first: `I feel food`, PsyAi и кабинеты; transaction-first: speech app и AI Nutrition Companion; pain-first: ручной дневник и запрос на аналитику в отзыве | Психолог может не хотеть платить; sensitive data и клиническая безопасность. |
| P3 | Взрослый с эмоциональным перееданием → структурированная не-клиническая программа самонаблюдения → 990–1 990 ₽/мес. | Экспертный контент и партнёрства психологов | product-first: `I feel food`; transaction-first: AI Nutrition Companion и narrow-outcome apps | B2C CAC, тяжёлые случаи и медицинские/этические границы. |
| P4 | Один партнёр в паре → ежедневные практики близости → 590–990 ₽/мес. | Relationship creators и short video | transaction-first: Microns relationship app; product-first: couples apps | Нет специального доступа/экспертизы; канал надо строить с нуля. |
| P5 | Работодатель → измеримая программа снижения стресса/конкретной привычки → годовая лицензия per employee | Founder-led продажи HR и брокерам | transaction-first: Acquire AI+VR; product-first: corporate wellbeing | Длинные продажи, clinical proof, procurement и отсутствие доступа. |
| P6 | Частный психолог → расписание, заметки, платежи и документы → 990–2 990 ₽/мес. | Прямые продажи и сообщества | product-first: Мила/Cue/Therapy Room; transaction-first: Zicofy | Generic CRM, слабый switching trigger, бесплатные альтернативы. |
| P7 | Клиент и психолог → подбор и онлайн-сессия → комиссия | SEO, контент, реферальный спрос | product-first: Profi/МыОкей; transaction-first: couples therapy marketplace | Двусторонний CAC и доверие; дорогой запуск. |
| P8 | Конечный пользователь → разговор с AI «24/7» → около 990 ₽/мес. | ASO, short video, paid social | product-first: плотная категория; transaction-first: несколько AI listings | Commodity, безопасность, churn и слабая экономика референсов. |

## S · SCAN 4: все 18 критериев

Это ранние оценки по публичному E1-evidence. Они нужны для порядка проверки, а
не для обещания выручки. Маржа без COGS не выше `5/15`, неизвестный тренд не
выше `7/10`, недоказанный канал ограничен.

| Критерий | Макс. | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Сформированный рынок | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Размер рынка | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 9 | 9 |
| Рост / тренд | 10 | 6 | 6 | 6 | 7 | 7 | 5 | 6 | 7 |
| Горячий спрос | 10 | 9 | 5 | 7 | 7 | 8 | 4 | 7 | 6 |
| Конкуренция | 10 | 10 | 8 | 9 | 10 | 10 | 9 | 10 | 10 |
| Референс | 10 | 9 | 7 | 7 | 9 | 10 | 8 | 8 | 7 |
| Одна проблема / сегмент | 10 | 8 | 8 | 9 | 9 | 8 | 5 | 8 | 4 |
| Повтор / LTV | 15 | 8 | 8 | 8 | 12 | 13 | 8 | 9 | 8 |
| X4 / маржинальность | 15 | 5 | 5 | 5 | 10 | 10 | 5 | 5 | 5 |
| Cash cycle | 10 | 8 | 7 | 8 | 8 | 8 | 8 | 6 | 7 |
| Защита | 10 | 4 | 6 | 5 | 4 | 8 | 2 | 5 | 2 |
| Реинвестирование | 5 | 3 | 3 | 3 | 4 | 5 | 4 | 3 | 3 |
| Операционный масштаб | 10 | 6 | 7 | 8 | 9 | 8 | 8 | 4 | 9 |
| Канал роста | 10 | 6 | 6 | 6 | 6 | 2 | 3 | 2 | 2 |
| Быстрые деньги | 100 | 70 | 55 | 50 | 40 | 20 | 45 | 30 | 35 |
| Свобода | 100 | 70 | 80 | 90 | 90 | 70 | 85 | 50 | 90 |
| Финансовая устойчивость | 100 | 40 | 35 | 45 | 65 | 45 | 45 | 35 | 50 |
| Фокус / доступ | 100 | 80 | 90 | 85 | 35 | 45 | 70 | 40 | 50 |

## Расчёт блоков и порядок

| Место текущей проверки | Модель | Рынок | Экономика | Защита и масштаб | Личный фильтр | Рыночная возможность | Доверие | Приоритет ставки | Решение |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | P1. Обращение → оплата | 87 | 53 | 53 | 66 | 73 | 0.55 | **31** | Финалист: самый быстрый falsifiable test. |
| 2 | P2. РПП между сессиями | 74 | 51 | 63 | 63 | 65 | 0.50 | **29** | Финалист: сильный доступ, но сначала проверить платёж психолога и безопасность. |
| 3 | P3. Emotional-eating B2C | 81 | 53 | 63 | 64 | 70 | 0.50 | **30** | Резерв: рынок заметен, но B2C acquisition и risk выше. |
| 4 | P5. Employer outcome | 89 | 80 | 60 | 40 | **85** | 0.55 | **35** | Сильнейший внешний рынок, парковка из-за недоступного канала и длинной продажи. |
| 5 | P4. Couples micro-practices | 87 | 76 | 63 | 54 | **83** | 0.50 | **33** | Сильный референс, но новый фокус и нет локального преимущества. |
| 6 | P6. Practice CRM | 70 | 56 | 43 | 58 | 64 | 0.55 | **29** | Парковка: не найдена причина переключения. |
| 7 | P8. Generic AI therapist | 76 | 51 | 43 | 52 | 66 | 0.55 | **27** | Не вкладывать сейчас. |
| 8 | P7. Marketplace sessions | 83 | 51 | 37 | 37 | 70 | 0.50 | **21** | Не строить: двухсторонний запуск и слабая экономика референса. |

Порядок текущей проверки не равен сортировке по одному числу. P5 и P4 имеют
сильные внешние рынки, но требуют новой дистрибуции и больше капитала. P1 и P2
выше для нас, потому что их критические гипотезы можно проверить доступом к
психологам без разработки. Низкий `Приоритет ставки` у всех — следствие E1:
реальных интервью, действий и оплат ещё нет.

## Hard filters и красные флаги

* P8 не имеет дифференциации и несёт safety-риск; рынок сформирован, но наша
  commodity-ставка не проходит.
* P7 требует одновременно строить supply и demand; первый тест не укладывается
  в дешёвый single-sided MVP.
* P6 не проходит switching gate: функция уже существует у нескольких
  российских продуктов и частично бесплатна.
* P5 не проходит personal/channel gate для ближайших 14 дней, хотя его рынок
  сильный.
* P2/P3 нельзя позиционировать как диагностику, лечение или автономного
  терапевта. До хранения чувствительных данных нужен отдельный legal/privacy и
  clinical-safety разбор.

## Что marketplace изменил в прежнем выводе

Он не отменил старый Portfolio Gate, а проверил его с другой стороны:

* старый финалист P1 сохранился: деньги психолога находятся ближе к
  `обращение → оплата`, чем к ещё одной CRM;
* generic CRM не усилилась: поиск Acquire по `practice management` не дал
  psychology-specific business, а Zicofy показывает отрицательную прибыль;
* generic AI therapist ослаб: несколько карточек имеют слабую traction,
  убыточность или выручку из другого источника;
* появился сильный продуктовый принцип для P2: между сессиями нужен не
  «конспект ради конспекта», а узкий цикл `наблюдение → паттерн → обсуждение с
  психологом → следующий шаг`;
* появились два честных внешних резерва: narrow B2C outcome и employer-funded
  behavioral programs. Они не становятся нашими ставками только из-за чужой
  выручки.

## Следующий gate

Owner checkpoint: выбрать для углубления P1 либо P2, или явно разрешить
параллельный 7-дневный no-build тест двух гипотез.

До выбора не обновлять `data/HIT_PARADE.md` и не возобновлять реальные интервью.
После выбора следующая проверка одна:

* P1 — восстановить последние три входящих обращения у пяти психологов;
* P2 — у пяти РПП-психологов проверить последние реальные случаи выдачи и
  разбора домашних заданий/дневников, текущий инструмент, время, риск и факт
  оплаты за существующие кабинеты.

Success: один и тот же дорогой эпизод повторился минимум у трёх из пяти.
Kill: проблема решается бесплатным шаблоном без регулярных потерь или никто не
готов сделать следующий наблюдаемый шаг.

## Итоговый контракт

```text
Вердикт: ограниченная валидация двух финалистов; build запрещён.
Тип объектов: concrete_bet candidates, не active portfolio.
Сильнейший уровень: E1.
Главный риск: seller metrics и публичные отзывы не доказывают российскую оплату.
Следующий шаг: owner checkpoint P1/P2.
Hit parade update: no.
```
