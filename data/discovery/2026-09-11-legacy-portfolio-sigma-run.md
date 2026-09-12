# Legacy-портфель: первый SIGMA batch

Дата старта: 2026-09-11
Обновлено: 2026-09-12
Run ID: `legacy-portfolio-russia-2026-09-11`
Текущий checkpoint: `S1_MARKET`
Статус: `in_progress`
Сильнейшее evidence: `E1` — только публичные и проектные материалы

## Цель

Проверить уже существующие непсихологические ставки единым ранним Factory
ситом. Результат этого run — не запуск продукта и не выбор «самого готового»
актива, а сравнимая исходная карта для `S1–S3` и последующего Portfolio Gate.

## Границы batch

В batch входят: `radarych`, `kadra`, `ai-youtube-automation`,
`cycle-assistant`, `pastlife-sansara`, `profiwatcher`.

Не входят:

* `Timur Gromov Business System` — действующий бизнес и денежный benchmark,
  а не новая ставка Factory;
* рыночные референсы — это источники, не кандидаты;
* все психологические ставки и Rule24 — они остаются в отдельном parked run
  `psychologists-russia-2026-09-09` на `S4_OWNER`.

## Реально прочитанные источники

* `data/IDEA_REGISTRY.json`, `data/FACTORY_SCHEMA.json`,
  `data/FACTORY_STATE.json`, `data/HIT_PARADE.md`;
* legacy-карточки шести кандидатов в `data/niches/`;
* `travel-radar/README.md` и `travel-radar/PROJECT_SPEC.md`;
* `Кадра /README.md` и `Кадра /PROJECT_SPEC.md`;
* `PastLife AI/README.md` и `PastLife AI/docs/history/CURRENT_STATE.md`;
* `TimurBusinessSystem/EventBudjet/docs/profi_ru/README.md` и
  `watcher-mvp-plan.md` для ProfiWatcher.

## Первичный public corpus S1 (не завершён)

| Кандидат | Публичный источник | Наблюдаемый факт | Что это ещё не доказывает |
| --- | --- | --- | --- |
| Радарыч | [Going: how it works](https://www.going.com/how-it-works), 2026-09-12 | Существуют бесплатный слой и paid персональные alerts: Premium $49/год, Elite $199/год; Going не продаёт билеты, а присылает deal/booking alerts. | Готовность платить в РФ за Telegram-версию, цену и economics Радарыча. |
| КАДРА | [AI Фотограф](https://aifotograf.ru/), 2026-09-12; [Фотушка](https://www.fotushka.com/), 2026-09-12 | Российский Telegram-first конкурент публично продаёт пакеты 199/590/1 490 ₽, включая trained profile и разовую оплату; Фотушка показывает широкий каталог AI-фото задач. | Что именно этот оффер и ценник купят у КАДРЫ и с какой себестоимостью. |
| AI YouTube | [YouTube channel monetization policies](https://support.google.com/youtubecreatorstudio/answer/1311392?hl=en), 2026-09-12 | С 15 июля 2025 YouTube прямо относит mass-produced/generic/repetitive AI-шаблоны к inauthentic content, непригодному для монетизации; нужны оригинальность и права. | Что существует конкретный прибыльный оригинальный канал и что мы можем его произвести. |
| Ассистент цикла | [Flo Premium vs Free](https://flo.health/flo-premium), [Flo: цена подписки](https://help.flo.health/hc/ru/articles/4411278780564-%D0%A1%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D1%81%D1%82%D0%BE%D0%B8%D1%82-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0-%D0%BD%D0%B0-Flo), 2026-09-12 | Категория монетизирует monthly/yearly Premium поверх бесплатного календаря: patterns, expert content, assistant и partner-mode находятся в paid layer. | Российский спрос, цену, privacy-ожидания и причину перейти в Telegram-first продукт. |
| Sansara | [MyHeritage: AI Time Machine sunset](https://blog.myheritage.com/2022/12/new-ai-time-machine-gallery-for-your-images/), 2026-09-12 | Исторический референс AI Time Machine закрыт в январе 2026; прошлый product-reference нельзя считать действующим спросом или каналом. | Что exact-offer Sansara имеет текущий рынок, платежи или repeat. |
| ProfiWatcher | [LeadsNotify pricing](https://leadsnotify.com/pricing), [Callbacker](https://www.callbacker.io/), 2026-09-12 | В смежной категории скорости обработки входящих лидов есть публичные recurring тарифы ($14.99–99 и $29–149/мес), где ценностью названа быстрая реакция на лид. | Допустимость аналогичного мониторинга конкретно на Profi.ru, внешний платёж и unit economics поддержки. |

S1 пока **не пройден**: это только первые опорные референсы. Для batch всё ещё
нужны несколько альтернатив на кандидата, локальные evidence и разделение
между моделью категории, продавцовскими заявлениями и нашей ставкой.

## Дополнение S1: расширенный public corpus — 2026-09-12

Это не новая оценка и не выбор финалиста. Ниже — публичные страницы, которые
показывают существование категории, оффера или ограничения. Цены и claims
принадлежат источникам; они не являются нашими фактическими метриками.

| Кандидат | Дополнительные публичные референсы | Подтверждённая рамка категории | Незакрытый Factory-вопрос |
| --- | --- | --- | --- |
| Радарыч | [Jack's Flight Club](https://jacksflightclub.com/upgrade-roundtrip-promo-uk) — £39/год; [Thrifty Traveler Premium](https://thriftytraveler.com/premium/) — персональные alerts из домашнего аэропорта; [Dollar Flight Club](https://dollarflightclub.com/articles/why-premium-flight-alerts-are-worth-it/) — paid alerts и диапазон $49–199/год; [Google Flights как бесплатная альтернатива](https://thriftytraveler.com/beginners-guide-thrifty-traveler/) | Повторяемая модель существует: free/premium, выбранные аэропорты, быстрая доставка alert и самостоятельное бронирование у перевозчика. | Есть ли у российского сегмента достаточная боль и готовность платить, когда бесплатные price alerts уже доступны? Нужны локальные альтернативы, цена и unit economics. |
| КАДРА | [Нейрофотосессия на Profi.ru](https://profi.ru/profile/MorozovDA84/) — 990–1 990 ₽; [Photofaerie](https://photofaerie.ru/services) — от 5 000 ₽ за образ; [нейрофотосессия на Profi.ru: рыночный диапазон](https://profi.ru/krasota/neirofotosessiya/elektrostal/) — от 790 до 4 920 ₽; [Нейрофотосессия Наумовой](https://naymova-art.ru/prays-pechat-na-holste-1) — 1 500–3 500 ₽ | Рынок смешивает автоматические пакеты, trained-profile и вручную собранную услугу; наблюдаемые цены заметно различаются. | Какой один Job выберет КАДРА и почему пользователь оплатит именно её, а не дешёвый bot или дорогую услугу с ручной режиссурой? Нужны COGS и канал. |
| AI YouTube Automation | [Как зарабатывать на YouTube](https://support.google.com/youtube/answer/72857?hl=en); [правила монетизации канала](https://support.google.com/youtubecreatorstudio/answer/1311392?hl=en); [права для монетизации](https://support.google.com/youtube/answer/2490020?hl=en); [рекламная пригодность](https://support.google.com/youtube/answer/6162278?hl=en); [раскрытие synthetic content](https://support.google.com/youtube/answer/15447836?hl=en) | Вход в category не равен доходу: нужны YPP eligibility, права на элементы ролика, original/authentic value и advertiser-safe контент. С 15.07.2025 mass-produced/generic/repetitive AI templates прямо названы inauthentic и не подходят для монетизации. | Найти конкретные оригинальные форматы и работающие референсы с прозрачным механизмом денег; пока нет ни аудитории, ни допустимого формата, ни факта дохода. |
| Ассистент цикла | [Clue Plus](https://support.helloclue.com/hc/en-us/articles/115005215266-How-much-does-Clue-Plus-cost) — free + региональные месячный/годовой планы; [Natural Cycles FAQ](https://www.naturalcycles.com/faqs) — monthly/yearly subscription; [Natural Cycles support](https://help.naturalcycles.com/hc/en-us/articles/9128446250013-How-does-the-Natural-Cycles-subscription-work); [Stardust FAQ](https://stardust.app/faq); [Ovia](https://www.oviahealth.com/apps/) — employer/benefit layer | В категории есть разные механизмы денег: freemium-подписка, медицински регулируемый продукт, employer benefit. Это не один рынок и не одна граница риска. | Какая немедицинская регулярная работа остаётся платной в РФ после free-trackers, и как безопасно работать с sensitive data? |
| Sansara | [Epoch AI Time Travel](https://epoch-app.github.io/support/terms-of-service.html) — credits за transformation; [Time Travel by Photomyne](https://apps.apple.com/us/app/time-travel-by-photomyne/id6766200794?platform=watch) — in-app credits, Basic $3.99; [Kamo Photo](https://play.google.com/store/apps/details?id=com.solart.kamo.pro) — trial + weekly/yearly card; [TimeLens](https://timelens.space/) — $3.99/week или $49.99/year; [Premium Portraits](https://fantasy.premiumportraits.ai/) — разовые пакеты $12.90–29.90 | Current category существует, но модели расходятся: credits, разовый пакет, подписка. Закрытие MyHeritage не означает исчезновение категории, но убирает старый референс как доказательство. | Выбрать exact Job и модель денег для российского предложения: развлечение, подарок, контент или профессиональный образ. Engine сам по себе это не решает. |
| ProfiWatcher | [Orunt](https://orunt.pro/) — агрегатор новых заказов, Pro от 660 ₽/мес; [Zafyr](https://www.dmwrks.ru/) — биржи от 390 ₽/мес; [собственные настройки Profi.ru](https://help.profi.ru/ru/collections/18566418-%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D1%8B-%D0%B2%D0%B8%D0%B4%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C-%D1%84%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D1%8B-%D1%83%D0%B2%D0%B5%D0%B4%D0%BE%D0%BC%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F); [условия Profi.ru](https://profi.ru/geo-kzn/documents/raznoe/oferta/); [партнёрская программа Profi.ru](https://profi.ru/geo-prm/partner/) | Есть близкая recurring категория уведомлений/агрегации. Но договор для специалистов требует использовать сведения о клиентах исключительно для выполнения работы, а собственные правила/встроенные уведомления создают substitute. | До любой продуктовой ставки нужны проверка допустимого источника данных, отсутствие передачи персональных данных, устойчивость доступа и конкретный сегмент, которому скорость приносит деньги. |

### Промежуточное решение S1

У пяти из шести ставок уже собран набор публичных референсов, достаточный для
первого сравнения моделей. У `AI YouTube Automation` пока подтверждены в первую
очередь ограничения входа в монетизацию, а не жизнеспособная конкретная модель;
он не может перейти дальше без отдельных product/transaction references.

Ни один кандидат не получает от этой таблицы более сильный evidence, чем `E1`,
не становится финалистом и не открывает CustDev. Следующая работа S1 —
дособрать независимые product/transaction references для AI YouTube и локальные
проверки для остальных, затем зафиксировать сопоставимую карту плательщика,
цены, механизма денег и обязательного ограничения для всех шести.

## Карта S0

| Кандидат | Факт о текущем активе | Гипотеза о плательщике и деньгах | Что не доказано | Вопрос для S1_MARKET |
| --- | --- | --- | --- | --- |
| Радарыч | Private MVP в production: backend, worker, PostgreSQL и Telegram-бот существуют. | Гибкий путешественник платит за персональные уведомления; подписка или позднее реклама. | Один конкретный платящий сегмент, willingness-to-pay против бесплатных каналов, цена, CAC, себестоимость и repeat. | Кто уже платит за персональный airfare-monitoring и какая работа остаётся неудобной у бесплатных альтернатив? |
| КАДРА | Product format и исследовательская база есть; приложения и runtime ещё не scaffold-ены. | Пользователь платит за AI-фотосессию или повторные коллекции. | Один Job/сегмент, провайдер, COGS, цена, канал и причина купить именно trained-profile формат. | В каком сегменте регулярные фото экономят деньги или время настолько, чтобы оплатить профиль до генерации? |
| AI YouTube Automation | В доступном контексте есть legacy-quick-scan, отдельный рабочий актив не найден. | Доход от рекламы, позднее партнёрки и спонсорство. | Конкретная аудитория, формат с оригинальной ценностью, право на монетизацию, unit economics и канал первых просмотров. | В какой аудитории возможно выпускать оригинальный контент с повторяемой монетизацией, а не шаблонный AI-ролик? |
| Ассистент по женскому циклу | Есть legacy-карточка; отдельный runtime/аудитория не подтверждены. | B2C-подписка за приватные инсайты и режим пары. | Готовность платить за Telegram-first формат, доверие к sensitive data, канал и безопасная граница немедицинского продукта. | Какая не-медицинская регулярная задача остаётся платной после бесплатных функций Flo и аналогов? |
| PastLife AI / Sansara | Production AI-photo контур, админка и delivery существуют; current state фиксирует один owner payment, не рыночную оплату за exact-offer. | Разовые пакеты AI-образов или продажа готового актива. | Спрос на «прошлую жизнь», реальный buyer, CAC, COGS/retries, маржа и повтор. | Какой узкий AI-photo Job с подтверждённой покупкой может использовать существующий engine без подмены спроса готовым кодом? |
| ProfiWatcher | Внутренний read-only watcher и plan существуют внутри EventBudjet; он останавливается при login/captcha/security state. | Специалист с дорогими заявками платит за timely alerts как managed service. | Право использовать доступ к Profi.ru, внешний плательщик, цена, support-cost, uptime и повторяемость. | Есть ли сегмент специалистов, для которого скорость получения заявки стоит подписки при допустимом platform/legal риске? |

## Решение S0

`S0_CONTEXT` пройден для всей пачки. В исходниках подтверждены два разных
класса: реальные delivery-активы (Радарыч, Sansara и внутренний ProfiWatcher),
исследовательская ставка без runtime (КАДРА) и три гипотезы без подтверждённого
внешнего актива (AI YouTube, ассистент цикла; ProfiWatcher не является отдельным
коммерческим продуктом). Нигде не найдены подтверждённые внешние продажи,
CAC, cohort-retention или сведённая unit economics именно этих ставок.

Это не понижение ценности активов: так отделены техническая готовность и старые
исследования от доказанного спроса. Все шесть переходят в
`market_research / in_progress / E1`; никто не является финалистом и никто не
допускается к интервью, трафику, действию или деньгам.

## Зафиксированные ограничения S0

| Кандидат | Наблюдаемый факт | Затраты/аналитика, которые реально есть | Непройденный коммерческий факт |
| --- | --- | --- | --- |
| Радарыч | Private production MVP с ботом, worker, PostgreSQL и ручным access/payment ledger. | События воронки и ledger спроектированы; provider/API, hosting, support, CAC, conversion и churn не сведены в фактическую экономику. | Нет подтверждённой внешней оплаты за персональные alerts. |
| КАДРА | Пройдены три локальных AI-photo конкурента; своего runtime и donor-audit нет. | У конкурентов наблюдались публичные цены; собственные provider/COGS, канал и оплаты отсутствуют. | Не выбран один платящий Job и пакет, за который заплатят. |
| AI YouTube | Есть legacy quick scan; отдельного канала, каталога или production-пайплайна в контексте не найдено. | Нет наблюдаемых просмотров, YPP, production-cost, retention или дохода. | Не выбраны аудитория, оригинальный формат и путь к монетизации. |
| Ассистент цикла | Есть карточка гипотезы, но отдельные runtime и аудитория не подтверждены. | Нет записей о подписках, COGS, privacy-операциях или канале. | Не определена не-медицинская регулярная работа поверх бесплатных приложений. |
| Sansara | Production delivery, payment surface и AI usage ledger существуют. | Есть технический finance baseline и один owner payment; нет cohort из внешних покупок, CAC, repeat и contribution margin exact-offer. | Нет market proof конкретного оффера «прошлая жизнь». |
| ProfiWatcher | Внутренний read-only watcher в EventBudjet читает feed; production auth зависит от сессии Profi.ru. | Внутренние health/card-count и CRM cost fields существуют; внешний support-cost и допустимость модели не доказаны. | Нет права/согласия на перепродажу и внешнего плательщика. |

## Status board

| Шаг | Статус | Что сделано | Самое сильное evidence | Решение | Следующий gate |
| --- | --- | --- | --- | --- |
| 0. Контекст и стартовая позиция | пройден | Прочитаны registry, шесть legacy-карточек, актуальные project docs и ограничения delivery. | E1: реальные docs и current state; внешние оплаты не найдены. | Шесть кандидатов синхронно переведены на S1; код и старые score не дают shortcut. | `S1_MARKET` для всей пачки. |
| 1. Рынок, референсы и денежные модели | в работе | Начат одинаковый public corpus: альтернативы, цены, плательщики и денежные модели. | E1 — только публичные и проектные материалы. | Не пройден. | `S2_TREND` только после source-backed S1-карты всех шести. |
| 2. Тренд и живые проблемы | не начат | — | — | Не пройден. | После S1. |
| 3. Локализация спроса и ограничений | не начат | — | — | Не пройден. | После S2. |
| 5. Конкуренты и конкурентная рамка финалистов | не начат | Только для 1–2 финалистов. | — | Закрыт до раннего Portfolio Gate. | После S0–S3 и S4. |
| 4. Owner checkpoint — выбор одного финалиста P1/P2 | не начат | — | — | Закрыт. | После S5. |

## Следующее действие

Провести `S1_MARKET` одинаковым набором вопросов о плательщике, существующих
референсах, ценах и механизме денег. Отсутствие внешней оплаты, аналитики или
правового разрешения остаётся явным gap, а не поводом поднять evidence выше E1.
