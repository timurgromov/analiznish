# Tasks — Niche Factory

Статус системы: `configured`, но ещё не `validated` полным проходом. История
завершённых изменений хранится в Git и `docs/history/`; этот файл показывает
текущую очередь, а не заменяет changelog.

## Current Objective

Доказать Niche Factory v1.1 одним реальным циклом поиска массовой подписной
задачи для частных психологов: от подтверждённого контекста и Jobs до одной
ставки и первого рыночного действия без преждевременной разработки.

## NF-0 — Context, Jobs And References

- [x] Ввести обязательный `context_inventory`, Jobs map и `reference_mining` до
  создания активной ставки.
  - Выполнено 2026-09-09: добавлены protocol, data location и owner checkpoint;
    автоматическое добавление сырого quick scan в active portfolio отменено.
- [x] Начать психологический проход с Gate 0.
  - Выполнено 2026-09-09: прочитаны актуальные материалы Rule 24 по сессионному
    ассистенту и создана прозрачная карта источников/неизвестного.
- [ ] Закрыть owner checkpoint для психологов.
  - Acceptance: владелец подтверждает разделение Rule24, сессионного ассистента
    и РПП-канала; добавлены или явно исключены VM/форумные материалы и прошлые
    девять идей.
- [x] Провести первый `reference_mining` по первым трём Jobs.
  - Acceptance: для «после сессии», «ведение практики» и «получение клиентов»
    собраны 3–10 референсов, альтернативы, публичный голос клиента и фильтр
    массовой подписки; каждая гипотеза имеет один owner checkpoint.
  - Выполнено 2026-09-09: готовые сервисы и публичные цены подтверждают три
    категории; ни одна не переведена в active bet до интервью и выбора владельца.

## NF-1 — Find And Select One Bet

- [x] Запустить новый чат фразой «Хочу искать нишу» и заполнить hunting constraints.
  - Выполнено 2026-09-09: B2B РФ, доступ к психологам РПП, жена-практик и потенциальный экспертный дистрибьютор; целевая экономика — массовая подписка порядка 1 000 ₽ и первые 100 платящих, а не продукт только для РПП.
- [ ] После NF-0 сформировать candidate universe из 5–10 направлений.
  - Acceptance: кандидаты выведены из Jobs, референсов и контекста, а не из
    случайных feature-идей; владелец выбирает 3–5 для `quick_scan`.
- [ ] Провести 3–5 `quick_scan` только для owner-approved кандидатов.
  - Acceptance: в карточке есть конкретный регулярный результат, путь к первым
    100 плательщикам, churn-risk, hard filters и следующий тест.
- [ ] Провести `deep_score` для 1–2 финалистов.
  - Acceptance: проверены конкуренты/альтернативы, локальный сегмент, цены, канал, экономика диапазоном, TAM/SAM/SOM и противоречащие данные.
- [ ] Выбрать одну `concrete_bet` для problem discovery.
  - Acceptance: owner decision, один сегмент, плательщик, JTBD, самый рискованный тезис, лимит следующего цикла и kill conditions записаны в карточке.

## NF-2 — Obtain Real Customer Evidence

- [ ] Спроектировать problem research до рекрутинга.
  - Acceptance: research question, screener, роли user/payer/budget owner, 3–5 гипотез и критерий остановки записаны.
- [ ] Найти 8–12 подходящих участников одного сегмента и провести минимум 5 интервью.
  - Acceptance: участники отобраны по недавнему поведению; обезличенные записи находятся в `data/interviews/`; первая половина разговоров не содержит pitch.
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

- [ ] Заморозить необязательный feature build на время discovery-sprint.
- [ ] Выбрать один B2B-сегмент, которому существующий engine может дать измеримый результат.
- [ ] Провести отдельные problem interviews и проверить 2–3 оффера.
- [ ] Исполнить первый paid pilot concierge-способом поверх существующих capabilities.
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
- [ ] При следующем `rescore` переводить legacy v0.7 карточки на `validation_stage` и E0–E5; старое confidence не считать build evidence.
- [ ] После 10 оценённых ниш проверить веса scoring на реальных решениях.
- [ ] Автоматизировать только повторившиеся ручные операции с доказанной стоимостью времени.
- [ ] Решить, достаточно ли Markdown/read-only dashboard или нужен structured store/UI.

## Done — Platform Capabilities

- [x] Создан docs-first репозиторий, project memory и локальные проверки.
- [x] Реализованы scoring v0.7, две независимые портфельные линзы и validator.
- [x] Созданы idea inbox, карточки ниш/референсов и read-only dashboard.
- [x] Dashboard опубликован через GitHub Pages и доступен локально через Docker Compose.
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
