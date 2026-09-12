# Tasks — Niche Factory

Статус системы: `configured`, но ещё не `validated` полным проходом. История
завершённых изменений хранится в Git и `docs/history/`; этот файл показывает
текущую очередь, а не заменяет changelog.

## Current Objective

Доказать настроенный Niche Factory v2 первым end-to-end проходом: выбрать
ровно один run, затем находить
кандидатов по pain-first, product-first и transaction-first источникам,
заземлять идеи, ранжировать их до интервью по 18 критериям и довести одного финалиста до
устойчивой прибыли. Повторяемый cashflow предпочтителен; B2B-подписка
`1 000–5 000 ₽/мес` и `100–1 000` плательщиков — benchmark micro-SaaS, но не
hard filter. Любая модель проверяется без преждевременной разработки.

## NF-UI — Visual Operations

- [x] Перестроить dashboard v3 в единый кабинет всех идей.
  - Gate 1: `data/IDEA_REGISTRY.json` содержит каждую известную идею только один
    раз, связывает её с категорией, этапом, исходом, доказательствами и runs.
  - Gate 2: первая вкладка всегда `Все идеи`; категория — фильтр, а не отдельный
    доменный кабинет; психология не управляет общим экраном.
  - Gate 3: предварительная оценка, доверие и осторожный рейтинг показаны
    раздельно; этап и результат проверки не спрятаны внутри score.
  - Выполнено 2026-09-10: 20 идей, 9 категорий, вкладки `Все идеи`, `Этапы`,
    `Журнал исследований`, `Сравнение оценённых`, `Остановленные`; добавлен
    validator связности, понятный empty-state для пустого этапа и компактные
    контекстные подсказки `?` вместо постоянных справочных абзацев.
  - Уточнено 2026-09-11: карта `Этапы` не дублирует большую сводку исходов.
    Результат проверки остаётся в строке идеи и в фильтре выбранного этапа.

- [x] Собрать dashboard v2 одним ограниченным sprint без backend и новой БД.
  - Gate 1: `data/FACTORY_STATE.json` связывает current checkpoint, кандидатов,
    testability, runs и source paths; validator проверяет схему и существование
    источников.
  - Gate 2: первый экран показывает `Сейчас` и evidence-воронку; последний batch,
    история, портфель и методология разделены по задачам.
  - Gate 3: перенесены восемь кандидатов marketplace batch; фильтры, обе
    портфельные линзы и responsive layout проверены локально.
  - Выполнено 2026-09-10: commit `6ae5f16`, GitHub Pages run `34518496008`
    (`success`), публично проверены desktop/mobile, finalist filter и market tab.

## NF-0 — Context, Jobs And References

- [x] Устранить P0-противоречия состояния и публичной границы.
  - Выполнено 2026-09-11: добавлен `FACTORY_SCHEMA.json`, schema v2 реестра и
    ACTIVE_RUN, импортируемые валидаторы и negative fixtures; восемь стадий и
    evidence-caps стали машинными; Pages строится по allowlist без внутренних
    source-путей и каталогов.

- [x] Закрепить active-run rail между чатами и интегрировать `I · INSIGHT`.
  - Выполнено 2026-09-09: `data/ACTIVE_RUN.md` хранит единственный текущий
    этап; validator проверяет его связь с source board; `docs/RAIL_PROTOCOL.md`
    возвращает любое методологическое отвлечение к текущему gate;
    `docs/INSIGHT_EXECUTION_MODEL.md` разделяет public/synthetic E1 и
    real/action/pay evidence E2–E4.

- [x] Превратить методологию SIGMA в исполняемый run, а не набор разрозненных
  документов.
  - Выполнено 2026-09-09: добавлены точные этапы `S · SCAN` `0–9`, формат status board
    и фактический run психологов. До synthesis нельзя перейти, пока пусты голос
    клиента, канал и экономика.

- [x] Ввести обязательный `context_inventory`, Jobs map и `reference_mining` до
  создания активной ставки.
  - Выполнено 2026-09-09: добавлены protocol, data location и owner checkpoint;
    автоматическое добавление сырого quick scan в active portfolio отменено.
- [x] Встроить transaction-first поиск через marketplaces готовых бизнесов.
  - Выполнено 2026-09-10: добавлен отдельный protocol для Acquire.com, Flippa,
    Microns и брокеров; seller claims, asking price, verification и sold status
    разведены. Публичный пилот дополнен авторизованным поиском Acquire: 21 lead
    с трёх площадок сведён в восемь моделей и ранний 18-критериальный gate без
    изменения hit parade.
- [x] Начать психологический проход с Gate 0.
  - Выполнено 2026-09-09: прочитаны актуальные материалы Rule 24 по сессионному
    ассистенту и создана прозрачная карта источников/неизвестного.
- [ ] Закрыть `S4_OWNER` для психологов.
  - Acceptance: после явного возобновления владелец выбирает ровно один
    финалист P1 или P2; выбор записан в `Selected focus IDs`. Оба финалиста до
    этого остаются parked, интервью не начинаются.
- [x] Провести первый `reference_mining` по первым трём Jobs.
  - Acceptance: для «после сессии», «ведение практики» и «получение клиентов»
    собраны 3–10 референсов, альтернативы, публичный голос клиента и механизм
    денег; каждая гипотеза имеет один owner checkpoint.
  - Выполнено 2026-09-09: готовые сервисы и публичные цены подтверждают три
    категории; ни одна не переведена в active bet до раннего Portfolio Gate.

## NF-1 — Find And Select One Bet

- [x] Завершить публичные этапы `S · SCAN 0–3` для трёх Jobs психологов.
  - Выполнено 2026-09-09: контекст, референсы, Trends, российские обсуждения,
    Wordstat и локальные ограничения сохранены в source board.
- [x] Встроить чистилище идей и ранний Portfolio Gate до интервью.
  - Выполнено 2026-09-10: inbox получил классы `A/B/C/X`; цель устойчивой
    прибыли, предпочтение повторяемого cashflow и ранний 18-критериальный отсев
    закреплены в workflow.

- [x] Запустить новый чат фразой «Хочу искать нишу» и заполнить hunting constraints.
  - Выполнено 2026-09-09: B2B РФ, доступ к психологам РПП, жена-практик и потенциальный экспертный дистрибьютор; целевая экономика — массовая подписка порядка 1 000 ₽ и первые 100 платящих, а не продукт только для РПП.
- [x] Пройти ранний Portfolio Gate для психологов до интервью.
  - Выполнено 2026-09-10: A «после сессии», B «ведение практики» и C «входящие
    обращения» сравнены по 18 критериям, hard filters и чувствительности
    ёмкости. C — единственный финалист (`71`), B — парковка (`64`), A — резерв
    (`62`); confidence не выше `0.55`.
- [x] Углубить денежную модель финалиста C до реальных интервью.
  - Выполнено 2026-09-10: плательщик — частный психолог с входящими обращениями
    и свободными слотами; исход — оплаченная первая консультация. Сопоставлены
    четыре платные/бесплатные альтернативы и пять моделей денег; для теста выбран
    success fee с concierge delivery. Боль и цена ещё не подтверждены людьми.
- [x] Провести `S0–S3` для legacy-портфельного batch.
  - 2026-09-12: terminal gate завершён без финалиста. Sansara отсеян на S2;
    Радарыч, AI YouTube Automation, ассистент по женскому циклу и ProfiWatcher
    отсеяны на S3; КАДРА дошла до ранней 18-критериальной матрицы, но не прошла
    hard filter commodity без защищённого канала.
  - Outcome: все отсевы привязаны к конкретному external fact; готовность
    legacy-кода не открыла CustDev, traffic, action, деньги или build.
- [x] Пропустить первый новый B2B operations batch через S0–S1.
  - Выполнено 2026-09-12: семь сырых workflow-гипотез прошли context и
    reference screen без финалиста. Широкие field-service, оптовые, договорные
    и бухгалтерские Jobs уже закрыты native products/services; для дебиторки и
    security questionnaire не найден локальный buyer. Все семь получили failed
    и не открыли CustDev.
- [ ] Собрать новый S0 batch только из узких локальных Jobs.
  - Acceptance: каждый кандидат имеет заранее наблюдаемый локальный сегмент и
    пересечение минимум двух независимых входов до записи в реестр.
- [ ] Провести `deep_score` для 1–2 финалистов.
  - Acceptance: проверены конкуренты/альтернативы, локальный сегмент, цены, канал, экономика диапазоном, TAM/SAM/SOM и противоречащие данные.
- [ ] Выбрать одну `concrete_bet` для `I_E1`.
  - Acceptance: owner decision, один сегмент, плательщик, JTBD, самый рискованный тезис, лимит следующего цикла и kill conditions записаны в карточке.

## NF-2 — Obtain Real Customer Evidence

Статус линии психологов: `parked` по решению владельца 2026-09-10. Следующие
задачи сохраняют resume point, но не являются текущим фокусом общего контура.

- [ ] После `S4_OWNER` подготовить E1-корпус выбранного финалиста.
  - Acceptance: `interview_ready` выполнен; только после этого открыт `I_E2`.
- [ ] Спроектировать problem research до рекрутинга.
  - Acceptance: research question, screener, роли user/payer/budget owner, 3–5 гипотез и критерий остановки записаны.
- [ ] Найти 8–12 подходящих участников одного сегмента и провести минимум 5 интервью.
  - Acceptance: участники отобраны по недавнему поведению; participant-level
    записи находятся только в `.local/interviews/`, а в `data/interviews/`
    сохранена обезличенная cohort synthesis; первая половина разговоров не
    содержит pitch.
- [ ] Пройти problem gate либо принять `pivot_segment`, `park` или `kill`.
  - Acceptance: проблема независимо повторилась минимум у трёх подходящих участников, есть последствия, workaround/расход и противоречащие случаи.

## NF-3 — Test Action And Money

- [ ] Сформировать один оффер и один измеримый результат для выбранного JTBD.
  - Acceptance: определены цена/диапазон, scope, CTA, бюджетодержатель, процесс покупки и главное возражение.
- [ ] Провести offer/action experiment.
  - Acceptance: success/kill criteria заданы до запуска; учитываются интро, demo, доступ к данным, LOI или другой наблюдаемый шаг, а не комплименты.
- [ ] Получить paid pilot либо принять `pivot_offer`, `park` или `kill`.
  - Acceptance: есть оплата/подтверждённый бюджет и дата, либо задокументировано, почему money gate не пройден.
- [ ] Открыть только bounded MVP после build gate.
  - Acceptance: автоматизируется доказанное ядро; зафиксированы лимит бюджета/срока, ручной fallback, метрика результата и условия остановки.
- [ ] Закрыть первый factory-loop.
  - Acceptance: обновлены карточка, эксперимент, hit parade, `validation_stage`, E-level, решение и worklog; получен `paid_pilot`, `pivot`, `park` или `kill`.

## Recovery Lane — PastLife AI / Sansara

- [ ] Начать с `S0_CONTEXT`: инвентаризировать реальный актив, оплату,
  себестоимость, аналитику и legacy-гипотезы.
- [ ] Пройти `S1–S5` для одного B2B-сегмента, которому существующий engine
  может дать измеримый результат.
- [ ] После owner choice и `I_E1` провести отдельные problem interviews и
  проверить 2–3 оффера.
- [ ] Исполнить первый paid pilot concierge-способом поверх существующих
  capabilities только после action gate.
  - Acceptance всей линии: один сегмент, 8–12 подходящих интервью, доказанный/опровергнутый problem gate, 2–3 проверенных оффера и paid pilot либо documented pivot/park/kill.

Эта линия не должна конкурировать с NF-1 за фокус одновременно. Owner выбирает:
искать новую ставку или временно прогнать через тот же factory существующий актив.

## Existing Portfolio Evidence Queue

Эти задачи не являются автоматическим текущим фокусом. Они активируются только
при выборе соответствующей ставки или `portfolio_review`.

| Объект | Следующее недостающее evidence |
| --- | --- |
| OnSud | Funnel `визит → анкета → оплата`, CAC, ручной QA/возвраты, contribution margin и cross-sell/LTV |
| Авто SEO/CPA | Search Console/Метрика, affiliate EPC/выплаты, оплаченные полисы, продления и legal/positioning review |
| ProfiWatcher | Правила Profi.ru, 3–5 платных пилотов, uptime и support cost за 30 дней |
| Ассистент по женскому циклу | Privacy-first offer, реальный payment action и доверие к данным |
| КАДРА | Один job/сегмент, ручные продажи, gross margin после retries/QA/support и repeat test |
| Радарыч | Реальные оплаты, acquisition path, CAC-сигнал и повтор/retention |

## System Hardening After First Run

- [ ] Провести ретроспективу первого factory-loop и откалибровать этапы, gates и объём артефактов.
- [x] Ограничить legacy-confidence evidence-caps без потери исходного числа.
  - Выполнено 2026-09-11: исходные значения сохранены в
    `legacyEvidenceConfidence`, активные confidence ограничены E-level и
    проверяются тестами. Полный содержательный rescore остаётся отдельной
    работой при выборе конкретной идеи.
- [x] Отделить готовность legacy-актива от Factory evidence и запретить ей
  обходить SIGMA/CustDev gates.
  - Выполнено 2026-09-11: `legacy_pre_factory` run ограничивает concrete bet и
    existing asset уровнем E1 и стадиями до `market_research`; «Радарыч» и
    Sansara возвращены к `S0_CONTEXT`. Отдельный тест не допускает legacy-код
    на `action_test`.
- [ ] После 10 оценённых ниш проверить веса scoring на реальных решениях.
- [ ] Автоматизировать только повторившиеся ручные операции с доказанной стоимостью времени.
- [x] Решить, достаточно ли Markdown/read-only dashboard или нужен structured store/UI.
  - Решение 2026-09-10: до первого полного factory-run достаточно Markdown +
    проверяемых `IDEA_REGISTRY.json` и `FACTORY_STATE.json`. Это
    PostgreSQL-ready схема, но backend, write-UI и полноценная БД остаются за
    evidence gate.

## Done — Platform Capabilities

- [x] Создан docs-first репозиторий, project memory и локальные проверки.
- [x] Реализованы scoring v0.7, две независимые портфельные линзы и validator.
- [x] Созданы idea inbox, карточки ниш/референсов и read-only dashboard.
- [x] Dashboard опубликован через GitHub Pages и доступен локально через Docker Compose.
- [x] Dashboard v2 показывает current checkpoint, evidence-воронку, кандидатов
  последнего batch, run history и две портфельные линзы.
- [x] Dashboard v3 начинает со всех 20 идей, показывает осторожный рейтинг с
  доверием, общую воронку, исследования, портфель и архив.
- [x] Созданы Niche Discovery Loop v1.1, CustDev protocol, evidence ladder E0–E5,
  context inventory, Jobs map и reference mining.
- [x] Добавлены prompts, agent routing, шаблоны интервью/экспериментов и build gates.
- [x] Полезные элементы SIGMA/AI-CustDev отделены от неподтверждённых claims и синтетического «CustDev».

## Acceptance For Repository Changes

- [ ] `README.md`, `PROJECT_SPEC.md`, `TASKS.md`, `UX.md`, workflow и current state не противоречат друг другу.
- [ ] `docs/SCORING_MODEL.md` и `data/HIT_PARADE.md` проходят validator.
- [ ] Новая ставка имеет `object_type`, `validation_stage`, E-level, риск, experiment и kill conditions.
- [ ] Evidence отделено от assumptions; недоступные данные помечены `unknown`/`unverified`, а не нулём.
- [ ] В Git нет `.env`, credentials, персональных интервью, dumps, local DB, screenshots или debug artifacts.
