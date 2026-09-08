# Methodology Sources

Accessed: 2026-07-01

Этот файл фиксирует источники, которые повлияли на методологию. Не использовать их как замену проверке конкретной ниши.

## User-provided source

Транскрибация видео Антона Власова, предоставленная пользователем 2026-07-01.

Как используется:

* сформированный рынок и конкуренция как плюс;
* отказ от "инноваций без рынка";
* широкий рынок;
* Wordstat/trend check;
* референс и стратегия "крепкий номер два";
* одна проблема для одного широкого сегмента;
* LTV/повторные продажи;
* наценка X4;
* защита от копирования;
* реинвестирование прибыли.

## External references

* Яндекс Вордстат: https://wordstat.yandex.ru/  
  Используется как источник проверки поискового спроса, динамики популярности и региональности для русскоязычных ниш.

* Google Trends Help: https://support.google.com/trends/answer/4365533?hl=en  
  Используется как напоминание, что Google Trends нормализует данные по времени и географии и показывает относительный интерес, а не абсолютный объем рынка.

* Google News Initiative — Understanding Trends data: https://newsinitiative.withgoogle.com/resources/trainings/google-trends-understanding-the-data/  
  Используется для правил интерпретации графиков: шкала 0-100, относительная популярность, ограничения абсолютного спроса.

* Intercom RICE framework: https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/  
  Используется как источник идеи отделять reach/impact/confidence/effort. В проекте это адаптировано в confidence multiplier и focus/effort checks.

* TAM/SAM/SOM overview: https://en.wikipedia.org/wiki/Total_addressable_market  
  Используется как базовая терминология для расчета емкости рынка. Для реальных ниш нужны первичные или отраслевые источники.

## Methodology Biases

Система намеренно консервативна:

* лучше ошибочно отложить красивую идею, чем месяцами делать проект без спроса;
* быстрые деньги и масштаб оцениваются отдельно;
* недостаток данных снижает итоговый score;
* конкуренция не считается минусом сама по себе;
* отсутствие конкурентов считается риском, пока не доказано обратное.

## Niche Discovery Loop v1.0 — 2026-09-08

Эти источники повлияли на `docs/NICHE_DISCOVERY_LOOP.md` и
`docs/CUSTDEV_PROTOCOL.md`. Они задают исследовательские принципы, но не
заменяют проверку конкретной ниши.

### Пользовательские видео-источники

* Дмитрий Попов, [«Как создать SaaS в 2026: метод SIGMA, AI-сканирование рынка и MVP без команды»](https://www.youtube.com/watch?v=5soPMpMFQRE). Использованы этапность market scan, локализация, конкурентное исследование, review mining, аудитория, канал, финансы и синтез.
* Дмитрий Попов, [«Как создать SaaS в 2026: AI CastDev, аудитория и оффер по методу SIGMA»](https://www.youtube.com/watch?v=eodZdKMu7io). Использованы корпус реального языка, JTBD, узкий сегмент, anti-segment и AI-синтез. Числовые рекламные заявления автора не приняты как verified evidence.
* Подробный source-grounded разбор: `docs/research/2026-09-08-sigma-custdev-synthesis.md`.

### Независимые методологические источники

* Steve Blank, [Customer Development / Lean Startup syllabus](https://steveblank.com/wp-content/uploads/2009/02/spring-2009-mba-295f-syllabus1.pdf): discovery отделяется от validation и масштабирования; ранняя работа требует контакта с клиентами.
* Rob Fitzpatrick, [The Mom Test](https://robfitz.com/): вопросы о прошлом поведении и реальных событиях ценнее комплиментов и прогнозов.
* Strategyzer, [Testing Business Ideas](https://www.strategyzer.com/library/testing-business-ideas-book): критические допущения проверяются быстрыми экспериментами; действие клиента сильнее verbal evidence.
* Strategyzer, [Ways to Test Your Value Proposition and Business Model](https://www.strategyzer.com/library/ways-to-test-your-value-proposition-and-business-model): наблюдаемое действие даёт более сильные данные, чем слова.
* Christensen Institute, [Jobs to Be Done Theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/): сегментация строится вокруг прогресса и контекста задачи, включая функциональную, социальную и эмоциональную стороны.
* Nielsen Norman Group, [User Interviews 101](https://www.nngroup.com/articles/user-interviews/): интервью требуют конкретной research goal и полуструктурированного guide.
* Nielsen Norman Group, [Avoid Leading Questions](https://www.nngroup.com/articles/leading-questions/): наводящие формулировки искажают ответы; начинать нужно с нейтральных открытых вопросов.
* Nielsen Norman Group, [Why User Interviews Fail](https://www.nngroup.com/articles/why-user-interviews-fail/): интервью не предсказывают надёжно будущую покупку и должны сочетаться с поведенческими методами.

Главная адаптация проекта: AI используется как copilot для desk research и
синтеза, но переходы `say → do → pay → repeat` подтверждаются реальными людьми,
действиями, оплатами и использованием.
