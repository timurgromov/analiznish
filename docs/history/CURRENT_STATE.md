# Current State — 2026-09-12

## Активный новый B2B operations batch

ACTIVE_RUN — b2b-ops-scan-russia-2026-09-12, status complete на S1_MARKET.
После terminal gate legacy-портфеля начат новый batch из семи сырых B2B
operations-гипотез: next-action для выездных сервисных бригад, контроль
дебиторки агентств, order-to-cash малого опта, сервисные операции, договорные
обязательства SMB, календарь compliance аутсорсинговых бухгалтерий и security
evidence для небольших поставщиков. Они собраны через pain-first, product-first
и transaction-first входы, но все остаются inbox / E0 / in_progress: публичные
обсуждения, страницы продуктов и listings — leads, не доказательство РФ-спроса,
готовности платить или экономики.

S0 и S1 закрыты без финалиста: российские field-service, B2B order-to-cash,
contract dates и accounting deadlines уже покрывают широкие продукты/услуги,
а дебиторка и security questionnaire не дали узкого локального buyer.
Все семь остались на ранней стадии с failed и возвращаются только по указанному
external fact. Следующий run ищет только Jobs, у которых заранее есть локальный
сегмент и пересечение минимум двух входов. До S0–S3 и Portfolio Gate запрещены
интервью, трафик, продажи, действие, деньги и build. Психологический run
остаётся parked на S4_OWNER; legacy-ставки возвращаются только с новым
external fact.

## Завершённый legacy portfolio-rescan

`ACTIVE_RUN` — `legacy-portfolio-russia-2026-09-11`, status `complete` на
`S3_LOCALIZE`. `S0_CONTEXT`–`S3_LOCALIZE` завершены для единого раннего Factory-прохода шести
непсихологических legacy-ставок: Радарыч, КАДРА, AI YouTube Automation,
ассистент по женскому циклу, PastLife AI / Sansara и ProfiWatcher. Все находятся
на `market_research / failed / E1`; готовность кода и старые score не являются
evidence спроса. Sansara не прошёл S2 exact-offer signal, четыре ставки не
прошли S3 local facts, КАДРА дошла до раннего Portfolio Gate, но не прошла
hard filter commodity без защищённого канала. S0 зафиксировал отсутствие
внешних оплат, CAC, cohort-retention и готовой unit economics у каждой ставки.
Психологический run сохраняет parked resume point `S4_OWNER` и в новый batch
не входит.

Следующий корректный шаг: новый batch начинается с `S0_CONTEXT` через три
входа поиска. До этого не возвращать legacy-кандидаты к интервью, трафику,
продажам, действию, деньгам или build.

## Project

`Анализ Ниш` — личная docs-first Niche Factory: агентская система поиска,
проверки и выбора бизнес-ниш от неопределённого направления до evidence-backed
ставки, paid pilot и ограниченного решения о разработке.

Текущий этап: factory v2 `configured`, но не `validated` полным end-to-end
проходом.
Scoring v0.7, hit parade и dashboard v3.8 работают как внутренние модули; следующим
операционным milestone остаётся первый end-to-end цикл.

## Legacy asset guard

`data/FACTORY_SCHEMA.json` теперь различает `legacy_pre_factory` и
`factory_v2` runs. Для `concrete_bet` и `existing_asset`, связанных только с
legacy-run, validator допускает максимум E1 и стадии до `market_research`:
готовый код, production и paywall не открывают CustDev, action, traffic или
money gates. Все шесть legacy-кандидатов находятся на
`market_research / failed`; психологические кандидаты и Rule24 остаются
отдельно parked. Возврат возможен только по указанным в registry новым
внешним фактам.

## Current Runtime / Stack

* Frontend: локальный static dashboard в `dashboard/`.
* Backend: отсутствует.
* Database: PostgreSQL отсутствует; подробные данные хранятся в Markdown,
  канонический индекс всех идей — `data/IDEA_REGISTRY.json`.
* Storage: local project files.
* Deploy: локальный Docker Compose service на `127.0.0.1:8765` и публичный read-only dashboard на GitHub Pages: `https://timurgromov.github.io/analiznish/dashboard/`.
* External services: не подключены.

## What Works Now

* Есть правила агента в `AGENTS.md`.
* Есть P0 specification в `PROJECT_SPEC.md`.
* Есть скоринговая модель в `docs/SCORING_MODEL.md`.
* Есть workflow анализа в `docs/WORKFLOW.md`.
* Есть `docs/IDEA_PURGATORY_PROTOCOL.md` и упорядоченный
  `data/IDEA_INBOX.md`: новая идея получает класс `A/B/C/X`, причину позиции и
  одну дешёвую проверку относительно цели устойчивой прибыли. Повторяемый
  cashflow предпочтителен, но B2B и подписка не являются hard filters.
* Есть управляемый `niche_factory` в `docs/NICHE_DISCOVERY_LOOP.md`: три входа
  поиска → shortlist → scan → реальный CustDev → action → pay → repeat.
* Поиск кандидатов теперь использует три независимых входа: pain-first
  (проблемы и обходные пути), product-first (существующие продукты) и
  transaction-first (выставленные и проданные цифровые бизнесы).
* Есть `docs/MARKETPLACE_REVERSE_ENGINEERING_PROTOCOL.md`: Acquire.com, Flippa,
  Microns и другие брокеры используются для поиска денежных моделей,
  продаваемых активов и comparable businesses; listing, seller claim, asking
  price, verification badge и закрытая сделка не смешиваются.
  Первый проход выполняется по публичным страницам либо через уже
  авторизованный браузер владельца. Публичный API каталога Acquire.com на
  2026-09-10 не подтверждён; API одноимённого `acquire.io` относится к другому
  продукту.
* Есть `docs/SIGMA_EXECUTION_MODEL.md`: десять шагов источника сохранены, но
  исполняемый desk-research контур заканчивается S0–S5, owner choice и
  конкурентной рамкой.
* Есть `data/ACTIVE_RUN.md` и `docs/RAIL_PROTOCOL.md`: новый чат продолжает
  schema v2 checkpoint, phase, имя, переход, кандидатов, выбранный фокус и
  source board. Доменный run психологов припаркован на `S4_OWNER`; он хранит
  resume point, но не управляет текущими ответами и не возобновляется без
  явного решения владельца.
* `data/FACTORY_SCHEMA.json` — машинный контракт восьми стадий, object types,
  evidence-caps, checkpoints, переходов и `interview_ready` / `offer_ready` /
  `build_ready` / `scale_ready`.
* До реальных интервью обязателен ранний Portfolio Gate: batch 5–10 кандидатов,
  публичный `S · SCAN 0–3`, 18 критериев и максимум 1–2 финалиста.
* Есть `docs/INSIGHT_EXECUTION_MODEL.md`: материал COMANDOS AI про public
  corpus, ядро аудитории, anti-segment и synthetic interviews интегрирован как
  E1-подготовка; живые интервью, действие и оплата остаются E2–E4 gates.
* Перед shortlist теперь обязательны `context_inventory`, Jobs map и
  `reference_mining`; они хранятся в `data/discovery/` и не становятся
  активными ставками без owner checkpoint.
* Есть `docs/REFERENCE_MINING_PROTOCOL.md`: разбор готовых сервисов, ручных
  альтернатив, независимых отзывов и механизма денег.
* Пилот transaction-first поиска по mental wellness сохранён в
  `data/discovery/2026-09-10-marketplace-psychology-pilot.md`. Он показал
  полезность marketplace-данных и одновременно ограничения: часть объектов
  продаётся как кодовый актив без traction, sold badge не раскрывает цену
  сделки, а заявленная ARR может относиться не к SaaS-подписке.
* Авторизованный тест Acquire расширил пилот до 21 marketplace lead с трёх
  площадок и восьми конкретных моделей. Все модели прошли ранний Portfolio Gate
  по 18 критериям; P1 `обращение → оплата` и P2 `РПП между сессиями` оставлены
  двумя финалистами до owner checkpoint. Hit parade и припаркованный run не
  изменены; strongest evidence остаётся E1.
* Есть B2B CustDev и build gates в `docs/CUSTDEV_PROTOCOL.md`.
* В `data/interviews/` разрешена только обезличенная cohort synthesis;
  participant-level записи, контакты, даты и raw quotes хранятся только в
  ignored `.local/interviews/`.
* Фраза «Хочу искать нишу» и prompt `prompts/start-niche-factory.md` запускают guided/hybrid поиск без готовой идеи.
* Есть обязательный опросник в `docs/NICHE_QUESTIONNAIRE.md`.
* Есть шаблоны входа и отчета.
* Есть `data/IDEA_INBOX.md` для сырых идей до оценки.
* Есть живой портфель в `data/HIT_PARADE.md`: отдельная карта рынков/референсов и очередь конкретных ставок.
* Есть project memory в `docs/history/`.
* Есть локальная проверка `scripts/check-local.sh`.
* Есть read-only dashboard для просмотра hit parade и критериев.
* Dashboard стабильно поднимается через `docker compose up -d dashboard`.
* Dashboard v3 начинает с единого реестра 20 идей из 9 категорий. Категория —
  только фильтр; психология не является главной страницей или активным фокусом.
* Dashboard v3.4 сохраняет компактную карту этапов: определения разделов и
  этапов открываются через маленькие `?`, а не занимают постоянное место в
  карточках. Нажатие этапа раскрывает его идеи на той же странице с фильтром
  результата и сортировкой; большая сводка результатов удалена как дубль,
  поскольку исход остаётся в каждой строке и в этом фильтре.
* Dashboard v3.5 начинает «Все идеи» с Evidence cockpit: один decision brief
  явно разводит текущее состояние, подтверждённое, неизвестное и следующий
  gate до компактного среза реестра. В раскрытой карточке идеи следующий test
  выделен от причины места и расчёта рейтинга; данные и read-only граница не
  менялись.
* Dashboard v3.6 добавляет отдельную читаемую карточку для каждого объекта по
  `dashboard/project.html?id=<id>`. Реестр теперь хранит короткое описание
  проекта, клиента, результат и модель денег; главная ссылка из строки не
  ведёт в JSON/Markdown. Исходные заметки сохранены только как вторичная
  техническая ссылка с явной подписью.
* Dashboard v3.8 пишет `Данные загружены`, показывает честный configured-статус
  и legacy-cap; public registry не создаёт ссылок на внутренний Markdown.
* `Все идеи` содержит осторожный рейтинг всех 20 записей. Раздел
  `Сравнение оценённых` содержит только объекты с формальной оценкой и разводит
  две несмешиваемые линзы: рынки и наши конкретные ставки. `Журнал
  исследований` содержит research-runs, а не идеи.
* Для каждой идеи раздельно видны предварительная оценка, доверие, осторожный
  рейтинг, текущий этап, исход проверки, причина места, риск и следующий gate.
  Общая воронка, история исследований, две портфельные линзы и архив вынесены в
  отдельные вкладки.
* `data/IDEA_REGISTRY.json` schema v2 — канонический индекс всех идей;
  legacy-confidence сохранён отдельно, а активное значение ограничено
  evidence-cap. `data/FACTORY_STATE.json` хранит только состояние UI и не
  дублирует ACTIVE_RUN; backend и write-UI отсутствуют.
* Pages собирается `scripts/build-public-dashboard.mjs` по allowlist. Public
  registry не содержит `source`; `ACTIVE_RUN`, `discovery`, `niches`,
  `interviews` и `experiments` не входят в артефакт.

## Known Blockers

* Первый factory-run был перезапущен 2026-09-09 в направлении частных психологов:
  Gate 0 прочитал актуальный трек Rule 24, создал context inventory/Jobs map и
  провёл первый E1 `reference_mining` по трём широким Jobs. В Rule24 нет списка
  девяти идей: прежнее VM/форумное исследование было упомянуто владельцем, но его
  отдельный путь пока не дан. SIGMA board фиксирует проход на шагах 2–5/8–9 как
  частичный и останавливает synthesis. Этап 2 завершён: точные продуктовые
  формулировки в Google Trends РФ дают низкий/недостаточный сигнал, а живой
  корпус подтвердил Jobs, но лишь поиск клиентов имеет два российских публичных
  обсуждения. Этапы 3–5 завершены: Wordstat, локальные альтернативы и data-risk
  сохранены, Jobs отфильтрованы, а по A/C разобрано по шесть функциональных
  референсов. Публичный рынок показывает ручной перенос после сессии и обработку
  уже полученного лида, но не подтверждает их боль. Legacy-guide для P1 готов,
  но transaction-first batch оставил два финалиста P1/P2. Владелец не выбрал
  один фокус, поэтому run остаётся parked на `S4_OWNER`. Реальных интервью нет;
  после явного возобновления сначала нужны owner choice и E1-подготовка.
* PastLife AI / Sansara требует recovery discovery sprint: существующий engine уменьшает стоимость эксперимента, но не заменяет один B2B-сегмент, 8–12 problem interviews и платный pilot gate.
* Legacy confidence v0.7 сохранён в `legacyEvidenceConfidence`; активный
  `evidenceConfidence` уже ограничен E-level cap и не доказывает build gate.

* Три РПП-карточки от 2026-09-09 созданы до context gate. Они сохраняются как
  исторические черновики, но исключены из активного портфеля: РПП — возможный
  канал первых интервью, а не доказанный массовый рынок. Новые ставки появятся
  только после owner-approved Jobs/reference-mining прохода.
* ProfiWatcher остаётся на `market_research` с доверием `0.55`: кодовый актив
  проверен, но E2/E3-сигналов и права перейти к action test нет.
* Ассистент по женскому циклу после v0.7 имеет рыночную возможность `68`, приоритет ставки `24`, доверие `0.55`. Категория сильная, но basic Flo for Partners бесплатен, поэтому платный pair-mode, LTV и канал не считаются доказанными.
* КАДРА — `concrete_bet`: рыночная возможность `72`, приоритет ставки `34`,
  активное доверие `0.55` при legacy `0.65`. Hands-on research подтверждает
  рынок, но strongest evidence остаётся E1.
* «Фотушка» не является отдельным активным объектом. После уточнения пользователя это только архивный конкурентный референс «КАДРЫ» в `data/references/`.
* Авто SEO/CPA / «Российский Союз Автомобилистов» — `market_reference`: рыночная возможность `72`, рынок `84`, экономика `53`, доверие `0.55`. Проверены affiliate URL Sravni.ru, раскрытие CPAmotor и размер рынка ОСАГО; трафик, конверсии, выплаты и допустимость позиционирования требуют отдельной проверки.
* LegalTech-документы для развода / OnSud — `market_reference`: рыночная возможность `69`, рынок `81`, экономика `51`, доверие `0.55`. Проверены цена и начало 12-шаговой анкеты; оплаты, delivery, CAC, ручной QA, возвраты и LTV не подтверждены.
* PastLife AI / Sansara — `existing_asset`: рыночная возможность `50`, приоритет ставки `31`. Production-движок доказан, но direct-offer спрос и экономика нет; MyHeritage официально закрыл AI Time Machine в январе 2026 года.
* Радарыч — `concrete_bet`: рыночная возможность `76`, рынок `87`, экономика
  `60`, активное доверие `0.80` при legacy `0.82`; E3-cap не позволяет
  показывать более высокое активное значение.
* Карта v0.7: Радарыч `76`, Timur Gromov Business System `73`, КАДРА `72`, авто SEO/CPA `72`, OnSud `69`, ассистент по циклу `68`, Rule24 `57`, PastLife `50`, ProfiWatcher `48`.
* Очередь v0.7: Timur `58`, Радарыч `52`, КАДРА `34`, PastLife `31`, Rule24 `25`, ассистент по циклу `24`, ProfiWatcher `21`.
* Git инициализирован на ветке `main`; `origin` подключен к `https://github.com/timurgromov/analiznish.git`. До initial commit удалённый репозиторий был пустым; видимость repo — public по настройке пользователя.
* GitHub Pages включён с источником `GitHub Actions`. Workflow публикует dashboard по адресу `https://timurgromov.github.io/analiznish/dashboard/` при изменениях в `dashboard/`, `data/` или `docs/SCORING_MODEL.md` на `main`.
* Score не записывается автоматически, но `scripts/validate-portfolio.mjs` пересчитывает блоки из критериев и падает при расхождении карточек, hit parade, формул или сортировки.
* `data/niches/INDEX.md` — индекс оценённых портфельных карточек для legacy
  portfolio validator; полный источник dashboard — `IDEA_REGISTRY.json`.
* Dashboard read-only и не редактирует Markdown. Текущий общий checkpoint —
  owner decision между новым широким `niche_factory` и явным возобновлением
  одного из психологических финалистов; parked run сам не активируется.
* Нет интеграции с Wordstat/Trends/Sheets/Notion.

## Important Defaults

* По умолчанию поиск новой ниши идёт в режиме `hybrid`: агент сам делает доступный публичный research, пользователь подключается к живым интервью, закрытым источникам и авторизованным действиям.
* Команда «найди актуальную идею» запускает batch-сбор по pain-first,
  product-first и transaction-first источникам. Кандидат должен получить
  поддержку минимум двух входов до раннего Portfolio Gate; иностранный listing
  не заменяет проверку спроса и альтернатив в России.
* `niche_factory` — корневой workflow; готовые идеи и существующие активы входят в него с подходящего этапа, а scoring не заменяет evidence gate.
* AI-аватары, synthetic interviews и review mining не считаются реальным CustDev и не поднимают evidence выше E1. Полный build требует отдельного problem/offer evidence и денежного gate.
* Главная цель фильтра — устойчивая прибыль. Повторяемый cashflow предпочтителен,
  но B2B и подписка не являются hard filters; допустимы сильный B2C, комиссия,
  прибыльная разовая модель и создаваемый на продажу актив.
* Каждый factory-checkpoint показывает `confirmed`, `unknown`, действия агента, действия пользователя, acceptance и следующий gate.
* Внутренний контент-конвейер не считается новой бизнес-нишей и не попадает в hit parade, пока у него нет внешнего плательщика и самостоятельной модели денег. Для Timur Gromov Business System текущим приоритетом остаётся выбранный контур контекстной рекламы; Reels не подменяет его в конце сезона. Для цифровых проектов можно переиспользовать техническое ядро работы с референсами и сценариями, но сегмент, оффер, площадку, CTA и контент-плейбук определять отдельно внутри каждого проекта.
* Сначала hard filters, потом баллы.
* До интервью: чистилище → batch 5–10 → публичный `S · SCAN 0–3` → ранний
  18-критериальный Portfolio Gate → максимум 1–2 финалиста.
* Актуальная модель — v0.7: две таблицы v0.6 сохраняются, а `Рынок`, `Экономика` и `Защита и масштаб` детерминированы детальными критериями. `Рыночная возможность` строится из рынка и экономики; `Приоритет ставки` — только для конкретной нашей модели, из экономики, защиты/масштаба, личного фильтра и доверия.
* До owner checkpoint новая идея остаётся в `idea_inbox`, context inventory,
  Jobs map или `reference_mining`. Активная карточка и hit parade появляются
  только после явного выбора конкретной модели для `quick_scan` либо команды
  владельца «добавь в рейтинг».
* Новую бизнес-идею по просьбе «заземлить/сохранить» фиксировать в чистилище с
  классом `A/B/C/X`; это не hit parade и не backlog обязательств.
* `Быстрые деньги`, `Свобода`, `Фин. устойчивость` и `Фокус` считаются подуровнем `Личного фильтра`.
* Низкая доказательность показывается рядом с рыночной возможностью и снижает приоритет конкретной ставки; она не должна прятать сильный рынок внизу карты.
* По умолчанию GitHub repo должен быть private, если проект публикуется. Для этого проекта пользователь уже создал public repo, поэтому его видимость не менять без отдельного запроса.

## Do Not Accidentally Revert

* Не возвращать старую схему `vlasov_score` + `scale_score`.
* Не возвращать старую схему v0.4 с отдельными колонками `Нишевой балл`, `Быстрые деньги`, `Свобода`, `Фин. устойчивость`, `Фокус`.
* Не возвращать один общий рейтинг v0.5 для смешанных типов объектов: рыночного референса, действующего бизнеса и существующего актива.
* Не считать отсутствие конкурентов плюсом.
* Не обновлять hit parade без типа объекта и доверия; у конкретной ставки должны быть риск и следующий шаг.
* Не добавлять идею в active portfolio до context inventory и owner checkpoint.
* Не начинать реальные интервью до раннего Portfolio Gate и выбора максимум
  двух финалистов.
* Не возвращать «Фотушку» отдельным активным объектом: «КАДРА» — каноническая ставка, «Фотушка» — только конкурентное evidence.

## Where To Look First

* Project rules: `AGENTS.md`
* Current tasks: `TASKS.md`
* Scoring: `docs/SCORING_MODEL.md`
* Workflow: `docs/WORKFLOW.md`
* Reference mining: `docs/REFERENCE_MINING_PROTOCOL.md`
* Marketplace mining: `docs/MARKETPLACE_REVERSE_ENGINEERING_PROTOCOL.md`
* Questionnaire: `docs/NICHE_QUESTIONNAIRE.md`
* Hit parade: `data/HIT_PARADE.md`
* Dashboard: `dashboard/index.html`
* Decisions: `docs/history/DECISIONS.md`
* Worklog: `docs/history/worklog/`

## Last Known Good State

* Июльский пакет market references зафиксирован commit `d307b13` (`docs: add market references and deduplicate Kadra`).
* Deploy: local Docker Compose и GitHub Pages.
* Переоценка 2026-07-21 проверена локально командами `node scripts/validate-portfolio.mjs`, `./scripts/check-local.sh`, `node --check dashboard/app.js`, `git diff --check`; валидатор подтверждает 8 рынков и 7 исполнимых ставок. GitHub Pages run `29856243208` завершился `success`; публичный dashboard загрузил данные и интерактивные карточки «Радарыча» `76/52/0.82` и «КАДРЫ» `72/34/0.65`.
* Изменение 2026-07-23 зафиксировано отдельным commit `d307b13`; валидатор подтверждает 9 рынков и 7 исполнимых ставок.
* Первый pre-gate quick-scan checkpoint 2026-09-09 был зафиксирован commit `b54034d`; он сохраняется в Git как исторический, но его РПП-карточки более не отражают текущий фокус.
* Niche Discovery Loop v1.0 зафиксирован commit `efecdda`, отправлен в `origin/main`; GitHub Pages run `34275935196` завершился `success`, публичный dashboard открылся со статусом «Данные загружены».
* Операторский dashboard v2 зафиксирован commit `6ae5f16`; GitHub Pages run
  `34518496008` завершился `success`. Публично проверены общий checkpoint,
  фильтр двух финалистов, переключение карты рынков, мобильный `390×844` и
  ноутбучный `1180×820`; console errors и page overflow отсутствуют.
* Единый кабинет идей v3 зафиксирован commit `241644e`; GitHub Pages run
  `34527058751` завершился `success`. Production-версия
  `?v=241644e#all-ideas` показывает 20 идей из 9 категорий; переход к
  финалистам и поиск `travel` работают. На `390×844` и `1180×820` page
  overflow отсутствует, console errors — `0`.
* Пояснения этапов и разделов v3.1 зафиксированы commit `651695d`; GitHub Pages
  run `34528736777` завершился `success`. Production-сценарий
  `Этапы → Чистилище → Все идеи` объясняет ноль и затем возвращает полный
  реестр из 20 строк без сохранённого stage-фильтра; console errors — `0`.
* Компактные подсказки и inline-просмотр идей этапа v3.2 зафиксированы commit
  `d782be1`; GitHub Pages run `34530509929` завершился `success`. В production
  на фактическом viewport Chrome `1232×582` подсказка `Финалистов` открылась,
  этап раскрыл две идеи без смены вкладки, фильтр `Прошла дальше` оставил одну,
  а `Сравнение оценённых` объяснило отличие от полного реестра. Горизонтальный
  overflow отсутствует (`scrollWidth = innerWidth = 1232`).
* Карта этапов v3.3 дополнительно сжата до `60px`: строка `N идей сейчас`
  убрана как дублирующая количество. Финальная публичная доставка — commit
  `c845baa`, GitHub Pages run `34533662210` (`success`): новый cache-key
  `cabinet-v33` подтверждён в браузере, `Первичная проверка` раскрывает 4 идеи
  на вкладке `Этапы`, а `scrollWidth = innerWidth = 1232`. Commit `c76a543`
  содержал UI-правку, но в первой production-проверке браузер загрузил старые
  кэшированные ресурсы `v32`; это исправлено отдельным cache-key commit.
* В v3.4 удалена отдельная большая сводка «Результаты проверок»: commit
  `fef002b`, GitHub Pages run `34536102060` (`success`). Production URL
  `?v=fef002b#funnel` проверен в существующей Chrome-вкладке: `Финалисты →
  Прошла дальше` оставляет одну идею с решением в строке; после списка сразу
  footer, повторной панели статусов нет.
* Продуктовая иерархия «Niche Factory → evidence gates → scoring/portfolio» зафиксирована commit `af6b82f`; `PROJECT_SPEC.md` и `TASKS.md` переписаны вокруг первого полного цикла.
* 2026-09-10 рамка цели расширена до устойчивой прибыли, а повторяемый cashflow
  закреплён как предпочтение, не hard filter. Ранний Portfolio Gate и
  конкурентная рамка психологов пройдены; доменный run припаркован на
  `S4_OWNER` без выбранного фокуса.
* 2026-09-10 transaction-first mining встроен в ранний поиск. Следующий общий
  запуск должен собрать 20–40 актуальных и sold/ended listings минимум с двух
  площадок, пересечь кластеры с pain/product evidence и передать 5–10
  кандидатов в Portfolio Gate.
