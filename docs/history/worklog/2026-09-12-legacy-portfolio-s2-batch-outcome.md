# 2026-09-12 — S2_TREND: первый отсев legacy-портфеля

> **Статус: superseded 2026-09-12.** Запись сохраняет историю ошибки.
> `pastlife-sansara` должен быть `parked_missing_evidence`, а не `failed`:
> отсутствие второго сигнала не является доказанным blocker. Актуальный аудит —
> `docs/FACTORY_AUDIT_2026-09-12.md` и `data/IDEA_REGISTRY.json.decisionAudits`.

## Что проверено

Для шести legacy-ставок добраны независимые свежие S2-signals и отдельно
зафиксирована сезонность либо её неизвестность. Дополнительный проход подтвердил
price-alert Job у Радарыча и сильный бесплатный substitute; спрос на AI-фото и
проблему сходства у КАДРЫ; creator-risk у AI YouTube; базовый трекер Job у
ассистента цикла; проблему задержки уведомлений у ProfiWatcher.

Для PastLife AI / Sansara не найден второй независимый свежий signal exact-offer
«прошлая жизнь по фото». Смежные AI-photo friction, готовый engine и один owner
payment исключены как замена этому факту.

## Решение

`S2_TREND` завершён как batch checkpoint при E1:

* `pastlife-sansara` — `market_research / failed`; возврат только с новым
  независимым exact-offer signal;
* остальные пять кандидатов — `market_research / in_progress` и переходят
  только на `S3_LOCALIZE`.

Скоринги, hit parade, финалисты и доступ к CustDev не менялись. Правило batch
уточнено: каждый кандидат получает исход, а отсеянный не блокирует исследования
выживших.

## Следующий gate

Для пяти неотсеянных кандидатов собрать локальный российский источник по Job,
границу применимости и доступный канал либо явный локальный blocker. Только
после S3 возможен ранний Portfolio Gate.
