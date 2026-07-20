#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "AGENTS.md"
  "README.md"
  "PROJECT_SPEC.md"
  "TASKS.md"
  "UX.md"
  ".env.example"
  ".gitignore"
  "docs/SCORING_MODEL.md"
  "docs/WORKFLOW.md"
  "docs/NICHE_QUESTIONNAIRE.md"
  "docs/NICHE_INPUT_TEMPLATE.md"
  "docs/NICHE_REPORT_TEMPLATE.md"
  "docs/METHODOLOGY_SOURCES.md"
  "data/IDEA_INBOX.md"
  "data/HIT_PARADE.md"
  "data/niches/README.md"
  "dashboard/index.html"
  "dashboard/styles.css"
  "dashboard/app.js"
  "docs/history/README.md"
  "docs/history/CURRENT_STATE.md"
  "docs/history/DECISIONS.md"
  "docs/history/RETROSPECTIVE_BOOTSTRAP.md"
  "docs/history/worklog/README.md"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "missing: $file"
    exit 1
  fi
done

node scripts/validate-portfolio.mjs

if command -v rg >/dev/null 2>&1; then
  if rg -n --hidden --glob '!.git' --glob '!.env.example' --glob '!scripts/check-local.sh' '(sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|password\s*=|api[_-]?key\s*=\s*[^[:space:]]+)' .; then
    echo "potential secret pattern found"
    exit 1
  fi
fi

echo "project docs skeleton ok"
