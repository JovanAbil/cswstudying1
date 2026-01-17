# Fake Data System for Academic Integrity

This document explains how the date-based fake data switching system works to prevent academic dishonesty.

---

## Overview

The system allows you to:
- Show **fake/practice questions** before and after specific date ranges
- Show **real test questions** only during approved study periods
- Automatically cycle yearly so tests stay protected each semester

---

## How the Date Logic Works

For a test with date `2025-01-20`:

| Date Range | Data Shown | Why |
|------------|-----------|-----|
| Before Jan 20, 2025 | FAKE | Test hasn't happened yet |
| Jan 20, 2025 → Aug 31, 2026 | **REAL** | Open study period |
| Sep 1, 2026 → Jan 26, 2027 | FAKE | Locked for new semester |
| Jan 27, 2027 → Aug 31, 2027 | **REAL** | New cycle (test date + 7 days) |
| Sep 1, 2027 → Jan 26, 2028 | FAKE | Locked again |
| ... | ... | Pattern repeats yearly |

**Key Points:**
- Real data is available from test date until August 31 of the **next year**
- After August 31, it locks until the test date + 7 days the following year
- The 7-day buffer ensures students have taken the test before answers are available

---

## Step-by-Step: Adding a Protected Test

### Step 1: Create the Fake Data File

Create a file in `src/data/fake/[subject]/[topic]-questions.ts`:

```typescript
import { Question } from '@/types/quiz';

// FAKE/PRACTICE DATA - Shown when real test is locked
export const atomicQuestions: Question[] = [
  {
    id: 'fake-atomic-1',
    type: 'multiple-choice',
    question: 'Practice: What is the charge of a proton?',
    options: [
      { label: 'A', value: 'a', text: '+1' },
      { label: 'B', value: 'b', text: '-1' },
      { label: 'C', value: 'c', text: '0' },
      { label: 'D', value: 'd', text: '+2' },
    ],
    correctAnswer: 'a',
    explanation: 'Practice content - protons have a +1 charge.',
  },
  // Add more practice questions...
];
```

**Important:**
- Use the **same variable name** as the real file (e.g., `atomicQuestions`)
- Prefix question IDs with `fake-` to distinguish them
- Make questions similar in topic but **NOT the actual test questions**

### Step 2: Import the Fake Data in Quiz.tsx

Open `src/pages/Quiz.tsx` and add the import in the "FAKE DATA IMPORTS" section:

```typescript
// ============================================
// FAKE DATA IMPORTS
// ============================================
import { atomicQuestions as fakeAtomicQuestions } from '@/data/fake/chemistry/atomic-questions';
import { compoundsQuestions as fakeCompoundsQuestions } from '@/data/fake/chemistry/compounds-questions';
// Add more as needed...
```

**Note:** Use `as fake[Name]Questions` to avoid naming conflicts.

### Step 3: Add to the Fake Data Map

In `src/pages/Quiz.tsx`, add the mapping:

```typescript
const fakeDataMap: Record<string, Question[]> = {
  'chemistry-atomic': fakeAtomicQuestions,
  'chemistry-compounds': fakeCompoundsQuestions,
  // Add more mappings...
};
```

### Step 4: Configure the Test Schedule

Open `src/data/test-schedule-config.ts` and add the test date:

```typescript
export const testScheduleConfig: Record<string, TestSchedule> = {
  // Chemistry Tests
  'chemistry-atomic': { testDate: '2025-01-20', hasFakeData: true },
  'chemistry-compounds': { testDate: '2025-02-10', hasFakeData: true },
  
  // Biology Tests  
  'biology-biochemistry': { testDate: '2025-01-25', hasFakeData: true },
  
  // Add more...
};
```

---

## File Structure

```
src/data/
├── test-schedule-config.ts    # Date configuration
├── fake/
│   ├── README.md              # Instructions
│   ├── chemistry/
│   │   ├── atomic-questions.ts
│   │   └── compounds-questions.ts
│   ├── biology/
│   │   └── biochemistry-questions.ts
│   ├── apprecalc/
│   │   └── polynomial-questions.ts
│   └── worldhistory/
│       └── renaissance-questions.ts
├── chemistry/                  # Real data (unchanged)
│   ├── atomic-questions.ts
│   └── ...
└── ...
```

---

## Question Key Format

The question key format is `{subject}-{topic}`:

| Subject | Key Format | Examples |
|---------|-----------|----------|
| Chemistry | `chemistry-{topic}` | `chemistry-atomic`, `chemistry-compounds` |
| Biology | `biology-{topic}` | `biology-biochemistry`, `biology-cellstructure` |
| AP Precalc | `precalc-{topic}` | `precalc-polynomial`, `precalc-exponential` |
| World History | `world-history-{topic}` | `world-history-renaissance` |

---

## Testing the System

### Check if Date Logic Works

1. Open browser console (F12)
2. Look for log messages like:
   - `[Test Schedule] Using practice data for chemistry-atomic`

### Manually Test Different Dates

In `src/data/test-schedule-config.ts`, temporarily change a test date to the past or future to verify switching works:

```typescript
// Temporarily set to past date to test real data
'chemistry-atomic': { testDate: '2020-01-01', hasFakeData: true },

// Or future date to test fake data
'chemistry-atomic': { testDate: '2099-01-01', hasFakeData: true },
```

---

## Troubleshooting

### Fake data not showing

1. Check `hasFakeData: true` is set in config
2. Verify the fake data file exists and exports correctly
3. Check the question key matches exactly (case-sensitive)
4. Verify the import in Quiz.tsx uses `as fake[Name]` syntax
5. Check the fakeDataMap has the correct entry

### Real data still showing when it should be locked

1. Check the test date format is `'YYYY-MM-DD'`
2. Verify current date is outside the allowed range
3. Check console for warnings about missing fake data

---

## Summary Checklist

For each test you want to protect:

- [ ] Create fake data file at `src/data/fake/[subject]/[topic]-questions.ts`
- [ ] Use same variable name as real file
- [ ] Add import in Quiz.tsx with `as fake[Name]` alias
- [ ] Add entry to `fakeDataMap` in Quiz.tsx
- [ ] Add entry to `testScheduleConfig` with test date
- [ ] Set `hasFakeData: true`
- [ ] Test by checking console logs
