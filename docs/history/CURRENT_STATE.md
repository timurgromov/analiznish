# Current State — 2026-09-10

## Project

`Анализ Ниш` — личная docs-first Niche Factory: агентская система поиска,
проверки и выбора бизнес-ниш от неопределённого направления до evidence-backed
ставки, paid pilot и ограниченного решения о разработке.

Текущий этап: factory v1.2 `active`, но не `validated` полным рыночным проходом.
Scoring v0.7, hit parade и dashboard работают как внутренние модули; следующим
операционным milestone остаётся первый end-to-end цикл.

## Current Runtime / Stack

* Frontend: локальный static dashboard в `dashboard/`.
* Backend: отсутствует.
* Database: Markdown files.
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
* Есть `docs/SIGMA_EXECUTION_MODEL.md`: точный шаг `S · SCAN` из 10 этапов `0–9` и
  обязательный status board. Активный run не переходит к продукту, пока не видны evidence,
  решение и следующий gate каждого пройденного шага.
* Есть `data/ACTIVE_RUN.md` и `docs/RAIL_PROTOCOL.md`: новый чат продолжает
  сохранённые macro phase/step и source board, а локальный validator проверяет
  их связность. Доменный run психологов припаркован на `S · SCAN 6`; он хранит
  resume point, но не управляет текущими ответами и не возобновляется без
  явного решения владельца.
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
* Есть B2B CustDev и build gates в `docs/CUSTDEV_PROTOCOL.md`.
* Есть шаблоны обезличенных интервью в `data/interviews/` и экспериментов в `data/experiments/`.
* Фраза «Хочу искать нишу» и prompt `prompts/start-niche-factory.md` запускают guided/hybrid поиск без готовой идеи.
* Есть обязательный опросник в `docs/NICHE_QUESTIONNAIRE.md`.
* Есть шаблоны входа и отчета.
* Есть `data/IDEA_INBOX.md` для сырых идей до оценки.
* Есть живой портфель в `data/HIT_PARADE.md`: отдельная карта рынков/референсов и очередь конкретных ставок.
* Есть project memory в `docs/history/`.
* Есть локальная проверка `scripts/check-local.sh`.
* Есть read-only dashboard для просмотра hit parade и критериев.
* Dashboard стабильно поднимается через `docker compose up -d dashboard`.

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
  уже полученного лида, но не подтверждает их боль. Для этапа 6 готовы screener,
  приглашение, guide и kill criteria; реальных интервью ещё нет. Ранний
  Portfolio Gate пройден: C «от нового обращения до первой консультации» —
  единственный финалист с рыночной возможностью `71`; B (`64`) припаркован, A
  (`62`) оставлен в резерве, confidence не выше `0.55`. На этапе 5 плательщиком
  выбран частный психолог с обращениями и свободными слотами, исходом —
  оплаченная первая консультация, тестовым механизмом — success fee с concierge
  delivery. 2026-09-10 владелец явно вернул фокус на устройство общего
  контура, поэтому run припаркован на этапе 6. Интервью не являются текущей
  работой и будут продолжены только по отдельной команде.
* PastLife AI / Sansara требует recovery discovery sprint: существующий engine уменьшает стоимость эксперимента, но не заменяет один B2B-сегмент, 8–12 problem interviews и платный pilot gate.
* Confidence активного портфеля рассчитан до введения evidence ladder E0–E5. Эти значения остаются legacy v0.7 до следующего честного `rescore` каждой карточки и не доказывают прохождение build gate.

* Три РПП-карточки от 2026-09-09 созданы до context gate. Они сохраняются как
  исторические черновики, но исключены из активного портфеля: РПП — возможный
  канал первых интервью, а не доказанный массовый рынок. Новые ставки появятся
  только после owner-approved Jobs/reference-mining прохода.
* ProfiWatcher добавлен только как `quick_scan` с низким доверием `0.55`: кодовый актив проверен, но продажа внешним пользователям заблокирована до проверки правил Profi.ru, платных пилотов и фактической надежности сессий.
* Ассистент по женскому циклу после v0.7 имеет рыночную возможность `68`, приоритет ставки `24`, доверие `0.55`. Категория сильная, но basic Flo for Partners бесплатен, поэтому платный pair-mode, LTV и канал не считаются доказанными.
* КАДРА — `concrete_bet`: рыночная возможность `72`, приоритет ставки `34`, доверие `0.65`. Hands-on research Фотушки, НейроКадра и Facee подтверждает рынок; собственного runtime, точной цены, cost model, повторяемого канала и оплат ещё нет.
* «Фотушка» не является отдельным активным объектом. После уточнения пользователя это только архивный конкурентный референс «КАДРЫ» в `data/references/`.
* Авто SEO/CPA / «Российский Союз Автомобилистов» — `market_reference`: рыночная возможность `72`, рынок `84`, экономика `53`, доверие `0.55`. Проверены affiliate URL Sravni.ru, раскрытие CPAmotor и размер рынка ОСАГО; трафик, конверсии, выплаты и допустимость позиционирования требуют отдельной проверки.
* LegalTech-документы для развода / OnSud — `market_reference`: рыночная возможность `69`, рынок `81`, экономика `51`, доверие `0.55`. Проверены цена и начало 12-шаговой анкеты; оплаты, delivery, CAC, ручной QA, возвраты и LTV не подтверждены.
* PastLife AI / Sansara — `existing_asset`: рыночная возможность `50`, приоритет ставки `31`. Production-движок доказан, но direct-offer спрос и экономика нет; MyHeritage официально закрыл AI Time Machine в январе 2026 года.
* Радарыч — `concrete_bet`: рыночная возможность `76`, рынок `87`, экономика `60`, приоритет ставки `52`, доверие `0.82`. Учтены production commercial flow, hands-on аудит пяти Telegram-ботов, российские media competitors и международные pricing benchmarks; реальных оплат, CAC, churn и доказанного канала нет.
* Карта v0.7: Радарыч `76`, Timur Gromov Business System `73`, КАДРА `72`, авто SEO/CPA `72`, OnSud `69`, ассистент по циклу `68`, Rule24 `57`, PastLife `50`, ProfiWatcher `48`.
* Очередь v0.7: Timur `58`, Радарыч `52`, КАДРА `34`, PastLife `31`, Rule24 `25`, ассистент по циклу `24`, ProfiWatcher `21`.
* Git инициализирован на ветке `main`; `origin` подключен к `https://github.com/timurgromov/analiznish.git`. До initial commit удалённый репозиторий был пустым; видимость repo — public по настройке пользователя.
* GitHub Pages включён с источником `GitHub Actions`. Workflow публикует dashboard по адресу `https://timurgromov.github.io/analiznish/dashboard/` при изменениях в `dashboard/`, `data/` или `docs/SCORING_MODEL.md` на `main`.
* Score не записывается автоматически, но `scripts/validate-portfolio.mjs` пересчитывает блоки из критериев и падает при расхождении карточек, hit parade, формул или сортировки.
* `data/niches/INDEX.md` — единый реестр карточек для dashboard и валидатора. Его отсутствие или несовпадение с hit parade теперь проявится при локальной проверке, а не оставит новую нишу невидимой.
* Dashboard read-only и не редактирует Markdown.
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
* Продуктовая иерархия «Niche Factory → evidence gates → scoring/portfolio» зафиксирована commit `af6b82f`; `PROJECT_SPEC.md` и `TASKS.md` переписаны вокруг первого полного цикла.
* 2026-09-10 рамка цели расширена до устойчивой прибыли, а повторяемый cashflow
  закреплён как предпочтение, не hard filter. Ранний Portfolio Gate и шаг 5
  психологов пройдены; доменный run припаркован на `S · SCAN 6`.
* 2026-09-10 transaction-first mining встроен в ранний поиск. Следующий общий
  запуск должен собрать 20–40 актуальных и sold/ended listings минимум с двух
  площадок, пересечь кластеры с pain/product evidence и передать 5–10
  кандидатов в Portfolio Gate.
