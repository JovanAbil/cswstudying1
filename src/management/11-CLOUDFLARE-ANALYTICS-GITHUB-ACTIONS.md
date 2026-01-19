# GitHub Actions Data Fetching Guide (Archived)

> ⚠️ **ARCHIVED**: Cloudflare Analytics has been removed from this project. Counter.dev is now the primary analytics provider. This guide is kept for reference in case GitHub Actions data fetching is needed for other purposes.

---

## Overview

This guide explains how to use GitHub Actions to automatically fetch data from external APIs and save it to your repository. While originally written for Cloudflare Analytics, the same pattern can be used for any API that requires scheduled data fetching.

---

## Use Cases for This Pattern

- Fetching data from APIs that don't support CORS
- Keeping API keys secure (never exposed to frontend)
- Scheduled data updates (cron jobs)
- Building static JSON files from dynamic APIs

---

## Basic GitHub Actions Workflow Template

```yaml
name: Fetch External Data

on:
  schedule:
    # Runs every 30 minutes
    - cron: '*/30 * * * *'
  workflow_dispatch: # Allows manual trigger

jobs:
  fetch-data:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Fetch Data from API
        run: |
          # Your API call here
          curl -s "https://api.example.com/data" \
            -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" \
            > public/data.json
      
      - name: Commit and push if changed
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add public/data.json
          git diff --staged --quiet || git commit -m "Update data [skip ci]"
          git push
```

---

## Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add your API keys/tokens

---

## Workflow File Location

Create workflow files at:
```
.github/workflows/your-workflow-name.yml
```

---

## Cron Schedule Examples

| Schedule | Cron Expression |
|----------|-----------------|
| Every 30 minutes | `*/30 * * * *` |
| Every hour | `0 * * * *` |
| Daily at midnight | `0 0 * * *` |
| Weekly on Sunday | `0 0 * * 0` |

---

## Last Updated

January 2026
