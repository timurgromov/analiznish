# GitHub Pages deploy handoff

Production: `https://timurgromov.github.io/analiznish/dashboard/`.

Deploy запускается push в `main` для dashboard/data/scripts/tests/workflow.
Workflow `.github/workflows/deploy-pages.yml` выполняет:

```bash
./scripts/check-local.sh
node --test
node --check dashboard/app.js
node --check dashboard/project.js
node scripts/build-public-dashboard.mjs --output _site
```

Артефакт проверяется по allowlist из `data/FACTORY_SCHEMA.json`. Публикуются
только dashboard assets, очищенный реестр, factory state, hit parade и scoring
model. `ACTIVE_RUN`, `discovery`, `niches`, `interviews`, `experiments` и поля
`source` реестра не должны быть доступны.

После deploy проверить:

1. desktop и `390x844`: загрузка, фильтр этапа, раскрытие идеи, карточка,
   legacy-пояснение, console и overflow;
2. `data/ACTIVE_RUN.md` возвращает 404;
3. `data/interviews/_template.md` возвращает 404;
4. публичный `data/IDEA_REGISTRY.json` не содержит ключей `source`.

Env vars и secrets для Pages не нужны.

## Deploy standard 1.0.0

This project adapts `Tamplates/DEPLOY_TEMPLATE.md@1.0.0` to its existing GitHub Pages workflow. Every artifact includes `deploy-version.json` with the exact source SHA. The deploy job checks that passport and the homepage before reporting success. GitHub Actions serializes publication and records upload, build, checks and total durations. Rollback reruns the previously verified source commit through the same workflow. Compare timings only for the same source/artifact scope and check coverage.

The public application entrypoint is `/dashboard/`. Verification reads the source passport from the Pages root and checks that existing dashboard route.
