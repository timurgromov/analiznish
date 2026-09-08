# Tasks

## Done

- [x] Создать docs-first skeleton проекта.
- [x] Добавить проектные правила агента в `AGENTS.md`.
- [x] Описать P0 scope и data model в `PROJECT_SPEC.md`.
- [x] Добавить модель скоринга ниш.
- [x] Добавить шаблоны входа, обязательного опросника, отчета и hit parade.
- [x] Настроить project memory в `docs/history/`.
- [x] Добавить локальную проверку структуры проекта.
- [x] Добавить read-only dashboard для хит-парада и критериев.
- [x] Перевести локальный dashboard на стабильный Docker Compose runtime.
- [x] Зафиксировать первичную цель проекта: фильтр потока идей, снижение незавершенных обязательств и выбор фокуса.
- [x] Добавить `data/IDEA_INBOX.md` для сырых идей до оценки.
- [x] Изучить перенесенные `rule24-landing` и `Rule27_Progect`, добавить Rule24 в hit parade.
- [x] Изучить `EventBudjet/profi_watcher`, добавить предварительную оценку ProfiWatcher для Profi.ru в hit parade.
- [x] Добавить правило: новая ниша по умолчанию попадает в hit parade и карточку, если пользователь явно не просит не записывать.
- [x] Добавить предварительную оценку ассистента по женскому циклу в hit parade.
- [x] Инициализировать Git и подключить `origin` к `timurgromov/analiznish`.
- [x] Добавить workflow GitHub Pages для read-only dashboard.
- [x] Включить GitHub Pages c источником `GitHub Actions` и проверить публичный dashboard.
- [x] Разделить единый рейтинг на карту рынков/референсов и очередь конкретных ставок, чтобы готовый актив не выглядел сильнее подтверждённого рынка только из-за личного fit.
- [x] Провести полный audit семи активных карточек, детерминировать базовые блоки v0.7 и добавить автоматическую проверку формул/сортировки.
- [x] Убрать «Фотушку» как дублирующий активный объект, оставить её только архивным конкурентным референсом «КАДРЫ».
- [x] Провести quick scan OnSud и автомобильного SEO/CPA-лидогенератора.
- [x] Построить Niche Discovery Loop v1.0: десятиэтапный scan, реальный CustDev, evidence ladder и gates перед B2B build.
- [x] Добавить режим нового чата `niche_factory`, шаблоны интервью/экспериментов и готовые prompts.
- [x] Интегрировать полезные части двух роликов SIGMA и проверить ограничения по независимым Customer Development/JTBD/evidence-based источникам.

## Next

- [ ] Запустить первый полный `niche_factory` для поиска B2B AI-продукта.
  - Acceptance: 5–10 кандидатов → 3–5 quick scans → 1–2 deep research → одна ставка с CustDev-планом, experiment и kill criteria.
- [ ] Провести recovery discovery sprint для PastLife AI / Sansara без новой большой разработки.
  - Acceptance: выбран один B2B-сегмент, проведено 8–12 подходящих problem interviews, проверены 2–3 оффера и получен платный пилот либо documented pivot/park/kill.
- [ ] Загрузить оставшиеся сырые идеи в `data/IDEA_INBOX.md` без обязательного score.
  - Acceptance: у каждой идеи есть статус и next handling.
- [ ] Выбрать 1-2 идеи для `deep_score`.
  - Acceptance: есть карточки в `data/niches/`, источники и обновленный `data/HIT_PARADE.md`.
- [ ] Проверить OnSud перед rescore: трафик, funnel conversion, CAC, долю ручного QA/возвратов и cross-sell.
  - Acceptance: есть фактические `визит → анкета → оплата`, contribution margin, доля переделок и LTV по связанным документам.
- [ ] Проверить автомобильный SEO/CPA-референс перед rescore: органический трафик, affiliate EPC, оплаченные полисы, годовые продления и позиционный/legal risk.
  - Acceptance: есть Search Console/Метрика, affiliate dashboard, доход по страницам, 12-месячный repeat и отдельный вывод по допустимому позиционированию.
- [ ] Проверить ProfiWatcher перед rescore: правила Profi.ru, 3-5 платных пилотов, uptime/support cost за 30 дней.
  - Acceptance: есть legal/platform вывод, пилотные оплаты или отказы, фактическая частота login_required/captcha и пересчитанный score.
- [ ] Проверить ассистента по женскому циклу перед rescore: оффер для пары, privacy-first позиционирование, payment intent и доверие к данным.
  - Acceptance: есть лендинг/ручной Telegram-прототип, 20+ заявок, 5+ payment intents или зафиксированные причины отказа.
- [ ] Проверить узкую вертикаль AI-фотосессий перед rescore: выбрать один job, продать 10 пакетов вручную и измерить реальную экономику.
  - Acceptance: выбрана одна вертикаль, есть 30 целевых офферов, 10 оплат или документированные отказы, gross margin после retries/QA/support и 30-дневный repeat test.
- [ ] Проверить, достаточно ли read-only dashboard поверх Markdown или нужно зеркало в CSV/Google Sheets/Notion.
  - Acceptance: выбран один источник правды, остальные форматы только производные.
- [ ] После 10 оцененных ниш откалибровать веса скоринга.
  - Acceptance: documented decision в `docs/history/DECISIONS.md`.

## Backlog

- [ ] По мере следующего `rescore` переводить legacy v0.7 карточки на `validation_stage` и E0–E5; не использовать старое confidence как доказательство build gate.
- [ ] Добавить `data/niches/_example.md` после первой реальной оценки.
- [ ] Добавить скрипт пересчета score, если ручная таблица начнет мешать.
- [ ] Добавить Notion/Sheets sync только после подтверждения, что Markdown недостаточно.
- [ ] После 10-20 карточек решить, нужен ли полноценный React/Next интерфейс с редактированием.

## Acceptance For Changes

- [ ] `README.md` не обещает несуществующие команды или runtime.
- [ ] `docs/SCORING_MODEL.md` и `data/HIT_PARADE.md` не противоречат друг другу.
- [ ] Новые ниши имеют уровень доказательности, а не только баллы.
- [ ] В проекте нет `.env`, секретов, cookies, dumps, local DB, screenshots или debug artifacts.
