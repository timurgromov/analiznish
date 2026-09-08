# Decisions

Этот файл — не changelog. Это журнал решений, которые важно помнить и не откатывать случайно.

## Статусы

* `active` — текущий эталон.
* `superseded` — старое решение, больше не использовать.
* `experiment` — гипотеза для теста, не стандарт.
* `blocked` — идея отклонена из-за риска/цены/качества.

## DEC-2026-07-01-SCORING-ARCHITECTURE — Отдельные scores для денег, масштаба и фокуса

Status: superseded
Area: product | data | prompt  
Decision date: 2026-07-01  
Evidence: user goal, Vlasov transcript, need to avoid mixing fast cash with scalable company logic  
Commits: none  
Supersedes: none

Decision:
Оценка ниши должна сначала возвращать обязательную таблицу `Оценка по Власову`, затем `vlasov_score`, `fast_money_score`, `scale_score`, `focus_score`, `evidence_confidence` и только потом `overall_score`.

Why:
Одна идея может быть хороша для быстрых денег, но плоха для долгосрочного масштаба. Другая может быть масштабной, но слишком медленной для текущей цели. Один общий балл без разложения скрывает этот конфликт.

Do:
Всегда показывать score breakdown и главный риск.

Do not:
Не давать один "перспективно/неперспективно" без разделения быстрых денег, масштаба и фокуса.

Verification:
Любая карточка в `data/niches/` содержит score table.

Superseded by:
`DEC-2026-07-01-SCORING-V03-NICHE-MATRIX`.

## DEC-2026-07-01-SCORING-V03-NICHE-MATRIX — Единая матрица критериев ниши

Status: superseded
Area: product | data | prompt  
Decision date: 2026-07-01  
Evidence: user feedback that the Vlasov-derived criteria should be the main scoring system, not a separate score next to duplicated scale logic  
Commits: none  
Supersedes: `DEC-2026-07-01-SCORING-ARCHITECTURE`

Decision:
Использовать единую матрицу `niche_score` как главный балл самой ниши. В матрицу входят исходные критерии из транскрибации: сформированный рынок, размер, тренд, горячий спрос, конкуренция, референс, один сегмент/проблема, LTV, X4-маржа, защита и реинвестирование. Дополнения проекта: операционная масштабируемость и канал роста.

`scale_score` больше не используется как отдельная колонка и отдельный компонент итоговой формулы, потому что масштаб уже учтен внутри критериев ниши. Отдельно остаются только:

* `fast_money_score` — скорость получения живых денег;
* `focus_score` — насколько идея подходит текущему контексту пользователя;
* `evidence_confidence` — качество доказательств.

Why:
Старая схема создавала путаницу: методология Власова становилась отдельным score рядом с масштабом, хотя масштаб уже частично сидит внутри исходных критериев. Новая схема проще: сначала оцениваем нишу по единой матрице, потом добавляем практические поправки скорости денег, личного фокуса и доказательности.

Do:
В каждом новом отчете выводить таблицу `Нишевой балл`, затем `Быстрые деньги`, `Фокус`, `Доверие`, `Итог`.

Do not:
Не выводить `Власов` как отдельную колонку hit parade. Не использовать отдельный `scale_score` в итоговой формуле.

Verification:
`data/HIT_PARADE.md` использует колонку `Нишевой балл`; `docs/SCORING_MODEL.md` v0.3 содержит формулу `overall_score = round((0.65 * niche_score + 0.25 * fast_money_score + 0.10 * focus_score) * evidence_confidence)`.

Superseded by:
`DEC-2026-07-02-SCORING-V04-FREEDOM-RESILIENCE`.

## DEC-2026-07-02-SCORING-V04-FREEDOM-RESILIENCE — Свобода и финансовая устойчивость

Status: superseded  
Area: product | data | prompt  
Decision date: 2026-07-02  
Evidence: user feedback that location/date freedom and non-Russia/currency resilience materially affect which niches are attractive  
Commits: none  
Supersedes: `DEC-2026-07-01-SCORING-V03-NICHE-MATRIX`

Decision:
Добавить два отдельных score:

* `freedom_score` / `Свобода` — насколько бизнес отвязан от локации, дат, личного присутствия и жесткого календаря.
* `financial_resilience_score` / `Фин. устойчивость` — насколько доход защищен от одной страны, одной валюты, одного платежного контура, локального рынка и одной платформы.

Критерий растущего рынка не выносится в отдельную колонку, потому что он уже входит в `Нишевой балл` как `Рост рынка / тренд`.

Новая формула:

```text
overall_score = round((0.55 * niche_score + 0.20 * fast_money_score + 0.10 * freedom_score + 0.10 * financial_resilience_score + 0.05 * focus_score) * evidence_confidence)
```

Why:
Для пользователя важна не только денежность ниши, но и качество жизненной модели: можно ли работать из любой точки мира, не быть привязанным к датам/событиям, получать валютный или глобальный доход и не зависеть только от России.

Do:
Показывать `Свобода` и `Фин. устойчивость` в hit parade, карточках и dashboard.

Do not:
Не прятать эти факторы внутрь `Фокуса`: это не просто личный интерес, а отдельное качество бизнес-модели.

Verification:
`data/HIT_PARADE.md` использует v0.4 и содержит колонки `Свобода` и `Фин. устойчивость`.

Superseded by:
`DEC-2026-07-03-SCORING-V05-HYBRID-BLOCKS`.

## DEC-2026-07-03-SCORING-V05-HYBRID-BLOCKS — Гибридная матрица из 4 блоков

Status: superseded
Area: product | data | prompt  
Decision date: 2026-07-03  
Evidence: trial after user discussion; need to keep market/economics/moat/personal tradeoffs visible without overloading hit parade columns  
Commits: none  
Supersedes: `DEC-2026-07-02-SCORING-V04-FREEDOM-RESILIENCE`

Decision:
Использовать текущую модель v0.5:

```text
overall_score = round((0.35 * market_score + 0.25 * economics_score + 0.20 * moat_scale_score + 0.20 * personal_filter_score) * evidence_confidence)
```

Где:

* `market_score` / `Рынок` — сформированность рынка, размер, рост, спрос, конкуренция, референс и сегмент.
* `economics_score` / `Экономика` — LTV, повторные продажи, маржа, cash cycle и реинвестиционный потенциал.
* `moat_scale_score` / `Защита и масштаб` — защита, делегируемость, переносимость актива и канал роста.
* `personal_filter_score` / `Личный фильтр` — быстрые деньги, свобода, финансовая устойчивость и текущий фокус.
* `evidence_confidence` / `Доверие` — множитель качества доказательств.

Why:
Одна большая колонка `Нишевой балл` была слишком плотной, а отдельные колонки `Быстрые деньги`, `Свобода`, `Фин. устойчивость`, `Фокус` перегружали рейтинг. Гибридная схема показывает главные бизнес-компромиссы и оставляет личные факторы внутри отдельного блока.

Do:
Сначала выводить таблицу детальных критериев, затем сворачивать их в 4 блока и только потом считать итог.

Do not:
Не возвращать v0.4 как активную схему без нового явного решения. Не терять подоценки `Быстрые деньги`, `Свобода`, `Фин. устойчивость`, `Фокус`: они остаются внутри `Личного фильтра`.

Verification:
`docs/SCORING_MODEL.md` v0.5, `data/HIT_PARADE.md`, карточки ниш, dashboard, `docs/NICHE_REPORT_TEMPLATE.md` и `skills/niche-scoring/SKILL.md` синхронизированы под 4 блока.

Superseded by:
`DEC-2026-07-20-SCORING-V06-DUAL-LENS-PORTFOLIO`.

## DEC-2026-07-20-SCORING-V06-DUAL-LENS-PORTFOLIO — Карта рынков отдельно от очереди ставок

Status: active
Area: scoring | data | UX | prompt
Decision date: 2026-07-20
Evidence: portfolio review after a strong market reference («Фотушка») was ranked below an existing code asset (PastLife) by one v0.5 score
Commits: смотреть историю Git после публикации
Supersedes: `DEC-2026-07-03-SCORING-V05-HYBRID-BLOCKS` as the portfolio ranking method

Decision:
Сохранять четыре базовых блока v0.5, но не сворачивать разные типы объектов в один общий рейтинг. Вести две независимые таблицы:

```text
market_opportunity_score = round(0.60 * market_score + 0.40 * economics_score)

execution_priority_score = round(
  (0.40 * economics_score + 0.35 * moat_scale_score + 0.25 * personal_filter_score)
  * evidence_confidence
)
```

`market_opportunity_score` показывает силу категории и модели заработка. Его можно применять к конкуренту или рыночному референсу, но он не является оценкой стоимости компании и не прогнозирует её выручку.

`execution_priority_score` показывает полезность ближайшей работы по нашей конкретной модели или существующему активу. Его нельзя считать для чужого референса, пока не определены наш клиент, сегмент, оффер и первый канал.

Why:
У v0.5 высокий личный fit и готовый код могли поднять PastLife выше «Фотушки» в общем списке. Это неверно читается как вывод, будто PastLife сильнее по рынку или потолку бизнеса. На самом деле это два разных вопроса: рынок AI-фотосессий подтверждён сильнее, а существующий PastLife-актив может быть удобнее для дешёвого короткого теста.

Do:

* Перед score указывать тип объекта: `market_reference`, `concrete_bet`, `existing_asset` или `active_business`.
* Сортировать карту рынков только по `market_opportunity_score`; `evidence_confidence` всегда показывать рядом.
* Сортировать очередь только по `execution_priority_score`.
* Хранить публичные заявления конкурента, включая выручку, с уровнем доказательности; не переносить их в нашу модель.

Do not:

* Не сравнивать чужой референс и существующий актив одной колонкой «Итог».
* Не выдавать рыночному референсу искусственно низкий приоритет нашей ставки.
* Не считать self-reported выручку подтверждённым фактом.

Verification:
`docs/SCORING_MODEL.md` v0.6, `data/HIT_PARADE.md`, семь карточек ниш, шаблоны, prompts и dashboard используют две таблицы. «Фотушка» имеет рыночную возможность `78`, PastLife — `65`; у «Фотушки» нет приоритета нашей ставки до определения конкретного входа.

## DEC-2026-07-20-SCORING-V07-DETERMINISTIC-CALIBRATION — Базовые блоки считаются из критериев

Status: active
Area: scoring | data | quality | automation
Decision date: 2026-07-20
Evidence: полный audit семи активных карточек после обнаружения, что неподтверждённая подписка и software-маржа получали почти такие же component scores, как фактическая экономика
Commits: смотреть историю Git после публикации
Extends: `DEC-2026-07-20-SCORING-V06-DUAL-LENS-PORTFOLIO`

Decision:
Сохранить две линзы v0.6, но запретить ручное назначение первых трёх базовых блоков. Использовать фиксированную нормализацию:

```text
market_score = round(100 * сумма 7 рыночных критериев / 70)
economics_score = round(100 * (LTV + margin + cash_cycle + reinvestment) / 45)
moat_scale_score = round(100 * (moat + operational_scale + growth_channel) / 30)
```

`personal_filter_score` по-прежнему считается из быстрых денег, свободы, финансовой устойчивости и фокуса. Все четыре подоценки должны быть видны в карточке. Неизвестная маржа не выше `5/15`, неподтверждённая recurring-модель не выше `8/15` по LTV, неизвестный тренд не выше `5/10`, перечисленный без результата канал не выше `3/10`.

Для `market_reference` доверие оценивает качество данных о самом референсе. Отсутствие нашей собственной модели запрещает считать приоритет ставки, но не снижает доверие к проверенным ценам, продукту и публичной тракции конкурента.

Why:
Готовый код доказывает актив, но не рынок. Слово «подписка» доказывает способ выставления счёта, но не retention. Низкий inference cost не доказывает X4 после CAC, retries и support. Без детерминированного сворачивания модель поощряла красивые гипотезы и делала portfolio review зависимым от ручной интуиции.

Do:

* Показывать все 14 детальных критериев, включая `Cash cycle`.
* Показывать четыре подоценки личного фильтра для каждой нашей ставки.
* Запускать `node scripts/validate-portfolio.mjs` после изменения карточек или hit parade.
* Помечать новые данные как `verified`, `supported`, `estimated`, `unverified` или `self-reported`.

Do not:

* Не повышать экономику только потому, что продукт digital/SaaS.
* Не повышать личный фильтр только потому, что код уже написан.
* Не считать чужую self-reported выручку нашей юнит-экономикой.
* Не назначать базовые блоки вручную поверх детальных критериев.

Verification:
Семь активных карточек пересчитаны; validator проверяет базовые и производные показатели, наличие reference только на карте и сортировку двух таблиц. После калибровки «Фотушка» имеет рыночную возможность `75`, PastLife — `50`; действующий бизнес Тимура остаётся первым приоритетом ставки (`58`) без ручной подгонки.

## DEC-2026-07-03-IDEA-INBOX-PURPOSE — Система как фильтр потока идей

Status: active  
Area: product | UX | prompt  
Decision date: 2026-07-03  
Evidence: user clarified original motivation: many AI-assisted ideas and prototypes create unfinished loops and mental noise  
Commits: none  
Supersedes: none

Decision:
Проект существует не только для поиска "лучшей ниши", но и как личный фильтр потока идей. Сырые идеи можно складывать в `data/IDEA_INBOX.md` без score, без hit parade и без обязательства доводить их до продукта.

Why:
Если каждая идея сразу становится задачей на оценку, проект сам начнет создавать то напряжение, которое должен снижать. Нужен низкофрикционный буфер: идея зафиксирована, контекст сохранен, но решение может быть `discarded`, `parked`, `quick_scan_candidate` или `deep_score_candidate`.

Do:
Для пачки новых идей сначала использовать `idea_inbox`, потом выбирать 3-5 кандидатов на `quick_scan`, и только лучшие переводить в `deep_score`.

Do not:
Не превращать inbox в обязательный backlog разработки. Не считать отсутствие score проблемой для сырой идеи.

Verification:
`README.md`, `PROJECT_SPEC.md`, `UX.md`, `docs/WORKFLOW.md`, `docs/NICHE_INPUT_TEMPLATE.md`, `AGENTS.md`, `TASKS.md` и `data/IDEA_INBOX.md` описывают режим `idea_inbox`.

## DEC-2026-07-05-COMPETITION-IS-MARKET-PROOF — Конкуренция повышает рыночную оценку

Status: active  
Area: scoring | prompt | quality  
Decision date: 2026-07-05  
Evidence: methodology correction during AI cycle assistant rescore  
Commits: none  
Supersedes: none

Decision:
Конкуренция является плюсом к `market_score`, потому что подтверждает спрос, деньги, референсы, каналы и существование покупательского поведения. Наличие сильных конкурентов нельзя использовать как аргумент "рынок занят" для снижения рыночного балла без отдельного доказательства, что выбранный сегмент/география/канал реально закрыты.

Why:
Иначе модель начинает штрафовать хорошие сформированные рынки и поощрять фантазии без конкурентов. Это противоречит базовому принципу проекта: конкуренты — плюс, отсутствие конкурентов — риск.

Do:
Сильных конкурентов учитывать как доказательство рынка. Если идея слабее конкурентов, снижать `Защита и масштаб`, `Канал роста`, `Дифференциацию`, `Личный фильтр` или `Доверие`, а не сам факт рынка.

Do not:
Не писать "рынок занят" как главный риск, если не проверена закрытость конкретного сегмента, географии или канала. Не снижать `market_score` только из-за наличия Flo/Clue/YCLIENTS/других сильных игроков.

Verification:
`docs/SCORING_MODEL.md`, `AGENTS.md` и карточка `data/niches/2026-07-05-ai-cycle-assistant.md` обновлены: конкуренция в AI cycle assistant учтена как плюс к рынку, итог пересчитан до `45`.

## DEC-2026-07-01-EVIDENCE-FIRST — Низкая доказательность снижает итоговый score

Status: active  
Area: data | prompt | quality  
Decision date: 2026-07-01  
Evidence: user goal to avoid фундаментальные занятия без проверки, Google Trends/Wordstat limitations  
Commits: none  
Supersedes: none

Decision:
Ввести `evidence_confidence` как множитель итогового score. Quick scans без проверки источников не должны иметь confidence выше `0.55`.

Why:
Иначе модные, красиво сформулированные идеи будут обгонять скучные, но проверенные денежные ниши.

Do:
Помечать факты как `verified`, `supported`, `estimated`, `unverified`.

Do not:
Не писать точные рыночные выводы без источника или явного допущения.

Verification:
Каждый полноценный отчет содержит evidence table и confidence.

## DEC-2026-07-01-DOCS-FIRST — Сначала операционная система, потом приложение

Status: active  
Area: product | ops  
Decision date: 2026-07-01  
Evidence: project is new, no scored niches yet  
Commits: none  
Supersedes: none

Decision:
P0 реализуется через Markdown docs, шаблоны и hit parade. UI, БД и интеграции откладываются до появления 10-20 реальных карточек ниш.

Why:
Сначала нужно откалибровать методологию на живых идеях. Ранний UI закрепит ошибочную структуру и создаст лишнюю работу.

Do:
Вести `data/HIT_PARADE.md` и карточки в `data/niches/`.

Do not:
Не строить SaaS, dashboard или автоматизации до проверки повторяемого workflow.

Verification:
После 10-20 ниш пересмотреть `TASKS.md` и принять новое решение.

## DEC-2026-07-01-QUESTIONNAIRE-GATE — Deep score требует обязательный блок анкеты

Status: active  
Area: product | prompt | quality  
Decision date: 2026-07-01  
Evidence: user request for objective niche evaluation input checklist  
Commits: none  
Supersedes: none

Decision:
Для полноценного `deep_score` обязателен блок A из `docs/NICHE_QUESTIONNAIRE.md`. Если он неполный, агент не делает полноценную оценку и возвращает список недостающих вопросов.

Why:
Свободное описание идеи почти всегда скрывает слабые места: кто платит, где спрос, кто конкурент, какая маржа, где канал и защита. Без единого опросника разные ниши нельзя честно сравнивать в hit parade.

Do:
Использовать completion levels `L0-L3`, явно показывать gaps и снижать confidence при неполных данных.

Do not:
Не ставить высокий score по неполному рассказу.

Verification:
Каждый `deep_score` содержит questionnaire completion level и gaps.

## DEC-2026-07-22-INTERNAL-CONTENT-ENGINE — Контент-конвейер является внутренней функцией, а не новой ставкой

Status: active
Area: portfolio | marketing | focus
Decision date: 2026-07-22
Evidence: действующий бизнес Timur и три активных цифровых проекта уже имеют продуктовые активы, но повторяемый acquisition не доказан; пользователь рассматривает типовые AI Reels/content-factory сервисы как общий внутренний инструмент, а не продукт для продажи
Commits: none
Supersedes: none

Decision:
Не переключаться на создание отдельного «ИИ рилс-продюсера» или «контент-завода» как самостоятельного продукта. Для цифровых проектов разрешено создавать общее техническое ядро процесса `референс → разбор → хук → сценарий → план производства → результат`, но маркетинговая стратегия и контент-плейбук остаются project-specific. Собственный код должен начинаться с минимального рабочего контура, выбранного после разбора референсов конкретного проекта.

Why:
Проблема портфеля реальна: у новых активов нет доказанного канала, оплат и CAC. При этом уже известные роли Reels-продюсера — поиск сильных референсов, разбор структуры, сценарий и производство — дают разумную основу для автоматизации без повторного открытия каждого очевидного ручного шага. Риск начинается не в автоматизации этих общих операций, а в попытке заранее построить универсальную маркетинговую стратегию для разных продуктов.

Do:
Сохранить для Timur Gromov Business System выбранный контур контекстной рекламы как текущий сезонный приоритет. Для PastLife, КАДРЫ и Радарыча отдельно определить роль контента в воронке, площадку, сегмент, оффер и CTA. При наличии конкретных сервисов-референсов провести hands-on разбор и выбрать общий минимальный технический модуль, не смешивая контент-плейбуки брендов.

Do not:
Не заменять выбранный Direct-трек Timur на Reels в конце сезона. Не строить единую универсальную стратегию, автопостинг, генератор аватаров или сложную аналитику сразу для всех брендов. Не использовать количество роликов и просмотров как замену целевым действиям проекта. Не добавлять внутреннюю функцию в hit parade без внешнего плательщика и самостоятельной модели денег.

Verification:
Решение основано на текущих канонических документах и уточнении пользователя: у Timur уже выбран контур контекстной рекламы; Радарыч требует founder-сессий и первых оплат, PastLife — payment happy path и 100–300 реальных генераций, КАДРА — один оффер, канал и первые 10 покупателей. Техническую конфигурацию контент-процесса выбирать после получения референсов применительно к конкретному проекту.

## DEC-2026-07-23-KADRA-CANONICAL-AI-PHOTO-BET — «КАДРА» является единственным активным AI-photo объектом

Status: active
Area: portfolio | classification | data
Decision date: 2026-07-23
Evidence: пользователь уточнил, что «КАДРА» — его разрабатываемый проект, а «Фотушка» использовалась только как референс
Commits: none
Supersedes: активное представление «Фотушки» отдельной строкой карты в DEC-2026-07-20-TWO-LENS-PORTFOLIO и последующих пересчётах; историческая исследовательская логика сохраняется

Decision:
В активном портфеле AI-фотосессий учитывать только «КАДРУ». «Фотушку» не показывать отдельной нишей или рыночным объектом в hit parade и dashboard; хранить её исследование в `data/references/` как конкурентное доказательство для «КАДРЫ».

Why:
Отдельные строки создавали пользовательское ощущение двух ставок на одну нишу, хотя фактически одна строка была чужим референсом, а вторая — собственным проектом. Для текущего управленческого портфеля ценнее одна каноническая ставка с доказательствами внутри карточки, чем формально корректное, но дублирующее представление.

Do:
Сохранять факты, ссылки и старые worklog-записи по «Фотушке» как историю исследования. Использовать их для evidence «КАДРЫ», не переносить чужую выручку, аудиторию, маржу и канал в score нашего проекта.

Do not:
Не возвращать «Фотушку» в активную карту отдельной строкой без прямого нового решения пользователя. Не удалять исторические доказательства и не выдавать их за фактическую экономику «КАДРЫ».

Verification:
Карточка исследования перемещена из `data/niches/` в `data/references/`; активные hit parade, dashboard mapping и validator registry содержат «КАДРУ», но не отдельную «Фотушку».

## DEC-2026-09-08-NICHE-FACTORY — Поиск ниш является evidence-gated контуром

Status: active
Area: methodology | research | product | agent
Decision date: 2026-09-08
Evidence: пользовательский опыт четырёх месяцев разработки Sansara до исследования; два ролика Дмитрия Попова о SIGMA/AI-CustDev; независимые источники Customer Development, The Mom Test, Testing Business Ideas, JTBD и user research
Commits: `efecdda`, `af6b82f`
Supersedes: none

Decision:
`Niche Discovery Loop v1.0` является корневым продуктовым контуром проекта, а
scoring v0.7, hit parade и dashboard — его внутренними модулями. Фраза «Хочу
искать нишу» запускает `niche_factory`: hunting constraints → shortlist → quick
scans → deep research → одна конкретная ставка → реальный CustDev → offer/action
test → paid pilot → ограниченный MVP → retention/rescore.

AI выполняет публичный research, review mining, синтез, подготовку интервью и экспериментов. Пользователь подключается там, где нужен живой контакт, авторизация, закрытый источник или owner decision. По умолчанию применяется `hybrid`-режим и один checkpoint за раз.

Why:
Текущий scoring хорошо сравнивает рынки и ставки, но сам по себе не задавал последовательность добычи доказательств и stop-gates до разработки. SIGMA даёт полезную карту desk research, но её synthetic CustDev нельзя считать заменой реальным клиентам. Нужен замкнутый цикл, в котором каждая инвестиция открывается более сильным evidence.

Do:
Разделять `object_type`, `validation_stage` и `strongest_evidence`. Считать AI-аватары и synthetic interviews только E0/E1. Проверять прошлое поведение в реальных интервью, затем просить действие, деньги и повтор. Хранить обезличенные интервью и заранее спроектированные эксперименты. Для готового актива использовать recovery discovery, а не автоматически продолжать build.

Do not:
Не считать число отзывов/интервью силой evidence само по себе. Не повышать confidence конкретной ставки выше evidence cap. Не разрешать полный B2B MVP из desk research, красивого отчёта или готового engine. Не копировать бренд, код и защищённые материалы внешней методологии.

Verification:
Правило отражено в `AGENTS.md`, `.cursor/rules/niche-factory.mdc`, project-local skill, workflow, questionnaire, report template, prompts и data templates. `./scripts/check-local.sh`, `git diff --check` и GitHub Pages run `34275935196` прошли.
