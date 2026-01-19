# CSW Studying - Technical Handoff Documentation

## Overview

This folder contains comprehensive documentation for maintaining and extending the CSW Studying application.

---

## Documents

| File | Purpose |
|------|---------|
| [01-DATA-SCHEMA.md](./01-DATA-SCHEMA.md) | Complete data structures for courses, questions, and related entities |
| [02-CONTENT-AUTHORING-GUIDE.md](./02-CONTENT-AUTHORING-GUIDE.md) | Step-by-step instructions for adding new courses and questions |
| [03-STATE-AND-STORAGE.md](./03-STATE-AND-STORAGE.md) | How application state is managed and persisted |
| [04-EDGE-CASES-AND-FAILURE-MODES.md](./04-EDGE-CASES-AND-FAILURE-MODES.md) | Known edge cases and how to handle them |
| [05-PERFORMANCE-ASSUMPTIONS.md](./05-PERFORMANCE-ASSUMPTIONS.md) | Expected data sizes, caching, and limits |
| [06-DEPENDENCIES.md](./06-DEPENDENCIES.md) | All external dependencies and their purposes |
| [07-LOVABLE-REMOVAL-IMPACT.md](./07-LOVABLE-REMOVAL-IMPACT.md) | What changes when you leave Lovable |
| [08-GITHUB-HOSTING-GUIDE.md](./08-GITHUB-HOSTING-GUIDE.md) | How to host on GitHub Pages |
| [09-TROUBLESHOOTING-ERRORS.md](./09-TROUBLESHOOTING-ERRORS.md) | Common errors and how to fix them |
| [10-FAKE-DATA-SYSTEM.md](./10-FAKE-DATA-SYSTEM.md) | Date-based test protection system |
| [11-CLOUDFLARE-ANALYTICS-GITHUB-ACTIONS.md](./11-CLOUDFLARE-ANALYTICS-GITHUB-ACTIONS.md) | Cloudflare analytics with GitHub Actions automation |
| [12-COUNTER-DEV-ANALYTICS.md](./12-COUNTER-DEV-ANALYTICS.md) | Counter.dev real-time analytics and adblocker detection |

---

## Quick Start for New Maintainers

### 1. Understand the Architecture

```
src/
├── components/     # Reusable UI components
├── data/          # Question banks and configuration
│   ├── fake/      # Fake questions for test protection
│   └── test-schedule-config.ts  # Test date settings
├── hooks/         # React hooks for state management
├── pages/         # Page components (routes)
│   └── categories/  # Category pages (Math, Science, etc.)
├── types/         # TypeScript type definitions
└── utils/
    └── questionLoader.ts  # Centralized question loading
```

### 2. Key Files

| Task | Primary File(s) |
|------|----------------|
| Add questions | `src/data/{subject}/{topic}-questions.ts` + `questionLoader.ts` |
| Configure routing | `src/App.tsx` |
| Quiz logic | `src/pages/Quiz.tsx` |
| State persistence | `src/hooks/use*.ts` |
| Types | `src/types/quiz.ts` |
| Question loading | `src/utils/questionLoader.ts` |
| Test protection | `src/data/test-schedule-config.ts` |

### 3. Most Common Tasks

**Add a new question to existing topic:**
→ See [02-CONTENT-AUTHORING-GUIDE.md](./02-CONTENT-AUTHORING-GUIDE.md)

**Create a new topic/unit:**
→ See [02-CONTENT-AUTHORING-GUIDE.md](./02-CONTENT-AUTHORING-GUIDE.md)

**Protect a test with fake data:**
→ See [10-FAKE-DATA-SYSTEM.md](./10-FAKE-DATA-SYSTEM.md)

**Debug data issues:**
→ See [03-STATE-AND-STORAGE.md](./03-STATE-AND-STORAGE.md)

**Fix common errors:**
→ See [09-TROUBLESHOOTING-ERRORS.md](./09-TROUBLESHOOTING-ERRORS.md)

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| Routing | React Router v6 |
| Math Rendering | KaTeX |
| State | React hooks + localStorage |

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## No Backend Required

This application is entirely client-side:
- No database server
- No API endpoints
- No authentication server
- All data stored in browser localStorage

---

## Important: Centralized Question Loading

All built-in questions are loaded through `src/utils/questionLoader.ts`. This file:
- Imports all real and fake question data
- Applies date-based switching for test protection
- Provides consistent behavior across all pages

**Never import questions directly from data files!** Always use:
```typescript
import { getQuestions, getQuestionMap } from '@/utils/questionLoader';
```

---

## Last Updated

January 2026
