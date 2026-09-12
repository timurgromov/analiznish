# Новый B2B operations batch — S0_CONTEXT

Дата старта: 2026-09-12
Run ID: b2b-ops-scan-russia-2026-09-12
Текущий checkpoint: S1_MARKET
Статус: in_progress
Сильнейшее evidence: E0

## Цель и границы

После terminal gate legacy-портфеля начать новый batch из семи сырых
B2B-гипотез. Цель этого файла — зафиксировать стартовую позицию, а не назначить
победителя, score, интервью или разработку.

Рабочие ограничения на этот проход:

* предпочтение: повторяемый B2B cashflow в РФ; это не hard filter;
* допустимы только идеи, которые можно опровергнуть до большой разработки;
* готовые legacy-активы не участвуют: предыдущий batch завершён без финалиста;
* психологический run остаётся parked на S4_OWNER;
* до S0–S3, раннего Portfolio Gate, S5 и owner choice запрещены интервью,
  трафик, продажи, action, деньги и build.

## Реально прочитанный корпус

### Pain-first

* [У малой B2B-консалтинговой практики сорвались follow-up из Google Sheets](https://www.reddit.com/r/smallbusiness/comments/1s2m5eg/been_managing_my_leads_in_google_sheets_for/), 2026-09-12.
* [У сервисного бизнеса заявки теряются, пока команда находится на выезде](https://www.reddit.com/r/smallbusiness/comments/1reuvvi/inquiries_and_then_follow_up_how_to_manage_them/), 2026-09-12.
* [Владелец сервисного бизнеса вручную отслеживает просроченные счета](https://www.reddit.com/r/smallbusiness/comments/1v64ihg/how_do_you_track_and_follow_up_on_unpaid_invoices/), 2026-09-12.
* [Небольшие команды ведут сроки документов и сертификатов в Excel](https://www.reddit.com/r/smallbusiness/comments/1txrs1k/how_are_you_guys_tracking_employee_certsexpiring/), 2026-09-12.
* [Небольшой поставщик получил security questionnaire на 200 вопросов](https://www.reddit.com/r/smallbusiness/comments/1pav94w/how_are_we_supposed_to_run_a_business_and_answer/), 2026-09-12.

Это пользовательские обсуждения, часть из которых может быть self-promotion.
Они подтверждают только то, что такие ситуации публично описываются; ни одна
не подтверждает частоту, готовность платить или российский спрос.

### Product-first

* [Mainteny](https://www.producthunt.com/products/mainteny), запущен в 2026:
  позиционируется как AI-слой для back office и field service maintenance.
* [Service Shark](https://www.producthunt.com/p/service-shark/service-shark):
  объединяет заказ, визит и счёт для сервисных работ.
* [Категория compliance software](https://www.producthunt.com/categories/compliance-software),
  2026: видна самостоятельная продуктовая категория continuous monitoring,
  evidence и workflow automation.

Это факты существования/позиционирования продуктов. Они не подтверждают
выручку, качество продукта, российскую локализацию или свободную продуктовую
дыру.

### Transaction-first

* [Automation platform for manufacturers and wholesalers](https://app.acquire.com/public/06rc9p8ifq-end-to-end-automation-platform-for-manufacturers-and-wholesalers):
  публичная карточка Acquire описывает путь phone orders/spreadsheets →
  заказ → счёт; её цифры, рост и экономия — seller claims.
* [AI-native CLM & VMS for SMBs](https://app.acquire.com/public/fcgq0gsy33-ai-native-clm-vms-for-smbs-enterprise-grade-10x-lower-cost-live-in-minutes):
  публичный listing говорит о renewals, obligations и approvals, но прямо
  указывает на pre-revenue asset range.
* [B2B call tracking & analytics](https://flippa.com/11705693-saas-for-call-tracking-analytics-262k-ttm-revenue-304k-arr-low-costs-89-profit-high-retention-growth-potential):
  Flippa помечает listing sold и описывает B2B call tracking; применимость
  его метрик к РФ не доказана.
* [Official business certificates SaaS](https://flippa.com/12224154-automated-saas-for-official-business-certificates-with-15-20-conversion-65-gross-margins-and-low-maintenance-operations-generating-481-monthly-profit):
  карточка показывает узкую локальную B2B-модель вокруг реестровых документов;
  все финансовые показатели остаются claim продавца.

Asking price, seller claims, platform badge и completed deal не смешиваются.
Эти карточки — только leads для поиска Jobs и механизмов денег.

## Карта Jobs и сырые кандидаты

| ID | Гипотеза плательщика и Job | Механизм денег (гипотеза) | Входы | Что известно | Ключевой falsifier на S0 |
| --- | --- | --- | --- | --- | --- |
| field-service-next-action | Владелец сервисной бригады 3–20 человек не должен терять входящий запрос, смету и следующий контакт, пока команда на объекте. | Подписка за диспетчерский слой. | pain, product | Описаны ручной spreadsheet-workaround и готовые field-service продукты. | Найти ли в РФ один узкий сегмент с доступным каналом, где текущий CRM не закрывает Job? |
| agency-ar-control | Небольшое агентство/студия должно видеть и корректно доводить просроченную дебиторку до оплаты. | Подписка или managed workflow. | pain, product | Public voice описывает ручной chase; accounting/CRM уже являются substitute. | Есть ли сегмент, который платит за результат сверх функций бухгалтерии и без доступа к платёжным данным? |
| wholesale-order-to-cash | Малый оптовик переводит повторяющиеся dealer-заказы из звонков и таблиц в подтверждённый заказ, лимит и счёт. | Подписка за компанию + внедрение. | product, transaction | Есть зарубежный listing с этим Jobs; локальные интеграции и unit economics неизвестны. | Есть ли в РФ конкретный вертикальный опт с повторными заказами и доступным первым каналом? |
| field-service-ops | Сервисная компания должна связать выезд, статус работ, счёт и оплату без тяжёлого ERP. | Подписка за бригаду/офис. | pain, product | Категория продуктов существует; ширина конкуренции высокая. | Можно ли назвать вертикаль и измеримый ручной провал, не решённый обычным CRM/Jobber? |
| smb-contract-obligations | Операционный/финансовый менеджер B2B-команды не должен пропускать продление, обязательство или approval в договоре. | Подписка за компанию. | product, transaction | Есть категория CLM, но найденный listing — pre-revenue asset. | Есть ли в РФ узкий buyer с повторным обязательством и без enterprise procurement barrier? |
| outsourced-compliance-calendar | Аутсорсинговая бухгалтерия должна вести сроки, документы и статусы для нескольких клиентов в одном проверяемом контуре. | Подписка за портфель клиентов. | pain, product | Публично видна проблема календарей/Excel; юрисдикционные требования не изучены. | Какие российские сроки реально создают платный Job и какие данные можно законно хранить? |
| vendor-security-evidence | Малый B2B-поставщик должен быстро собирать доказательства для security questionnaire клиента. | Подписка/пакет за assessment. | pain, product, transaction | Категория существует, но доверие, безопасность и интеграции могут быть hard blocker. | Есть ли в РФ buyer с повторным procurement-event и безопасным низкоинтеграционным первым оффером? |

Все семь записаны как E0 / inbox / in_progress: это не shortlist, не
оценённые ставки и не строки hit parade.

## Status board

| Шаг | Статус | Что сделано | Самое сильное evidence | Решение | Следующий gate |
| --- | --- | --- | --- | --- | --- |
| 0. Контекст и стартовая позиция | пройден | Зафиксированы ограничения, семь сырых B2B Jobs и provenance трёх входов; у каждого есть payer-гипотеза, деньги, ограничение и falsifier. | E0: публичные leads; часть user-generated и seller-reported. | Перейти к сравнению референсов, не выбирая и не оценивая финалиста. | S1: денежный референс и ручная альтернатива для каждого выжившего. |
| 1. Рынок, референсы и денежные модели | пройден | Сопоставлены российские продуктовые поверхности, ручные substitutes и transaction leads для всех семи Jobs. | E1: публичные product/listing surfaces, без локального спроса. | Ни один широкий оффер не оставил локальную дыру, доступный buyer и экономику одновременно. | Terminal gate: все 7 failed; следующий batch ищется с более узким локальным сегментом. |
| 2. Тренд и живые проблемы | не начат | — | — | — | Проверить повторяемость в независимых источниках. |
| 3. Локализация спроса и ограничений | не начат | — | — | — | Проверить РФ-сегмент, substitutes, legal и первый канал. |
| 4. Фильтрация и ранний Portfolio Gate | не начат | — | — | — | Дать 18-критериальную матрицу только пережившим S0–S3. |
| 5. Конкуренты и конкурентная рамка финалистов | не начат | — | — | — | Разбирать только 1–2 финалиста. |

## S1 outcome: почему ни один кандидат не идёт в S2

| Кандидат | Референсы и ручная альтернатива | Решение | Точный missing fact для возврата |
| --- | --- | --- | --- |
| field-service-next-action | [WhiteSC](https://whitesc.ru/crm-dlya-servisnogo-centra/) и [HubEx](https://hubex.ru/features/uchet-vyezdov-i-rabot) уже публично покрывают заявки, мастеров, статусы и оплату; ручная альтернатива — CRM/таблица с датой следующего контакта. | failed: широкий next-action не имеет отдельного Job сверх native field-service CRM. | Один локальный сервисный сегмент с измеримым провалом после внедрённого CRM и доступным каналом. |
| agency-ar-control | Пользовательские источники описывают spreadsheet/manual chase; [ЮРРОБОТ](https://www.urrobot.ru/) покрывает уже позднюю взыскательную часть. Ранний отдельный платный сегмент не найден. | failed: между бухгалтерией/CRM и legal collection не найден отдельный buyer. | Локальный сегмент с повторным AR-loss, который платит за workflow без bank-data integration. |
| wholesale-order-to-cash | [АЛЬФА:B2B](https://marketplace.1c-bitrix.ru/solutions/redsign.b2bportal/?update_sys=Y), [ABcraft](https://abcraftgroup.ru/services/nashi-razrabotki/b2b-portal/) и [OrderLink](https://orderlink.ru/) уже продают portal + 1С-интеграцию; ABcraft заявляет тариф от 50 000 ₽/мес. Ручная альтернатива — телефон/почта/1С. | failed: широкий оффер требует тяжёлой интеграции и уже занят; доступная вертикальная дыра не найдена. | Одна вертикаль опта, где 1С-B2B не закрывает повторяемый Job и есть channel advantage. |
| field-service-ops | [HubEx](https://hubex.ru/features/uchet-vyezdov-i-rabot), [JobStarter](https://job-starter.ru/) и [РемCRM](https://crmrem.ru/landings/crm-dlya-elektrika/) покрывают заявки, выезды, акты, счёт и оплату. Ручная альтернатива — диспетчер + таблица. | failed: «операционный слой» повторяет готовую категорию без вертикали. | Узкая вертикаль с обязательным процессом, который current field-service CRM не покрывает. |
| smb-contract-obligations | [Учёт срока действия договоров в 1С](https://rarus-crimea.ru/upload/iblock/c16/5n9smtfmxl7fy520ym687p32tqndta8h/1c-doc-dogovora.pdf) уже включает сроки, продление и уведомления; ручная альтернатива — договорная таблица/календарь. | failed: базовый Job уже native в локальном учётном контуре. | Buyer с конкретным договорным риском, который не покрывает 1С и не требует enterprise CLM. |
| outsourced-compliance-calendar | [Бухгалтер42](https://buhgalter-42.ru/) и [FINABI](https://finabi.ru/services/outsourcing-buhgalterii/) включают контроль сроков как часть регулярной услуги; manual alternative — 1С/календарь бухгалтера. | failed: не найден самостоятельный платный Job сверх основной бухгалтерской услуги. | Класс сроков и портфельный buyer, готовый покупать отдельный tool без передачи чувствительных данных. |
| vendor-security-evidence | В РФ найден enterprise-уровень [Security Vision](https://www.securityvision.ru/); публичного малого buyer и безопасного простого оффера не найдено. Ручная альтернатива — заполнение анкеты в таблице и помощь консультанта. | failed: высокий trust/security risk без подтверждённого малого сегмента. | Повторяемый локальный procurement-event и низкоинтеграционный первый оффер без customer secrets. |

## Один текущий gate

S0_CONTEXT пройден только когда у каждого кандидата явно есть:

1. конкретный предполагаемый плательщик;
2. механизм денег и частота;
3. доступ/ограничение первого локального исследования;
4. один факт, который быстро снимет кандидата с batch.

До этого ни один кандидат не получает score, интервью, traffic, offer, action,
оплату или build.
