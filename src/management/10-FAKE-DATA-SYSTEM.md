# Fake Data System for Academic Integrity

This document explains how the date-based fake data switching system works to prevent academic dishonesty.

---

## Overview

The system allows you to:
- Show **fake/practice questions** before and after specific date ranges
- Show **real test questions** only during approved study periods
- Automatically cycle yearly so tests stay protected each semester
- **Download functionality is disabled** for built-in topics to protect content

---

## How the Date Logic Works

For a test with date `2026-01-25`:

| Date Range | Data Shown | Why |
|------------|-----------|-----|
| Before Jan 25, 2026 | FAKE | Test hasn't happened yet |
| Jan 25, 2026 → June 16, 2027 | **REAL** | Open study period |
| June 17, 2027 → Feb 1, 2028 | FAKE | Locked for new semester |
| Feb 1, 2028 → June 16, 2028 | **REAL** | New cycle (test date + 7 days) |
| June 17, 2028 → Feb 1, 2029 | FAKE | Locked again |
| ... | ... | Pattern repeats yearly |

**Key Points:**
- Real data is available from test date until June 16 of the **next year**
- After June 16, it locks until the test date + 7 days the following year
- The 7-day buffer ensures students have taken the test before answers are available

---

## Architecture Overview

The system uses a **centralized question loader** (`src/utils/questionLoader.ts`) to ensure consistent behavior everywhere.

### Files That Use the Centralized Loader

| File | Feature | What It Does |
|------|---------|--------------|
| `src/pages/Quiz.tsx` | Taking quizzes | Uses `getQuestionMap()` for all quiz questions |
| `src/pages/ViewAllQuestions.tsx` | View All Questions | Uses `getQuestionMap()` + shows "Practice Mode" banner when locked |
| `src/pages/UnitDetail.tsx` | Topic page | Uses `getQuestionMap()` + shows "(Practice)" label when locked |
| `src/pages/PresetBuilder.tsx` | Build Custom Practice | Uses `getQuestionMap()` + shows "Practice Mode" banner when locked |
| `src/pages/CourseChallengePresetBuilder.tsx` | Course Challenge Builder | Uses `getQuestionMap()` + shows lock indicators |

### Key Utility Functions

Located in `src/utils/questionLoader.ts`:

```typescript
// Get questions for a specific topic (applies fake/real switching)
getQuestions(questionKey: string): Question[]

// Get all questions as a map (applies fake/real switching)
getQuestionMap(): Record<string, Question[]>

// Check if a topic is currently locked (showing fake data)
isTopicLocked(questionKey: string): boolean

// Get lock status and unlock date information
getTopicLockInfo(questionKey: string): { 
  isLocked: boolean; 
  unlockDate: Date | null;
  hasFakeData: boolean;
}
```

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

### Step 2: Import in questionLoader.ts

Open `src/utils/questionLoader.ts` and:

1. **Add the fake data import** (around line 73-76):
```typescript
import { atomicQuestions as fakeAtomicQuestions } from '@/data/fake/chemistry/atomic-questions';
```

2. **Add to the fakeDataMap** (around line 128-132):
```typescript
const fakeDataMap: Record<string, Question[]> = {
  'chemistry-atomic': fakeAtomicQuestions,
  // Add more mappings as you create fake data files...
};
```

### Step 3: Configure the Test Schedule

Open `src/data/test-schedule-config.ts` and add the test date:

```typescript
export const testScheduleConfig: Record<string, TestSchedule> = {
  // Chemistry Tests
  'chemistry-atomic': { testDate: '2026-01-25', hasFakeData: true },
  'chemistry-compounds': { testDate: '2026-02-10', hasFakeData: true },
  
  // Biology Tests  
  'biology-biochemistry': { testDate: '2026-01-25', hasFakeData: true },
  
  // Add more...
};
```

---

## File Structure

```
src/
├── data/
│   ├── test-schedule-config.ts    # Date configuration
│   └── fake/
│       ├── README.md              # Instructions
│       ├── chemistry/
│       │   ├── atomic-questions.ts
│       │   └── compounds-questions.ts
│       ├── biology/
│       │   └── biochemistry-questions.ts
│       ├── apprecalc/
│       │   └── polynomial-questions.ts
│       └── worldhistory/
│           └── renaissance-questions.ts
├── utils/
│   └── questionLoader.ts          # Centralized question loading
└── pages/
    ├── Quiz.tsx                   # Uses getQuestionMap()
    ├── ViewAllQuestions.tsx       # Uses getQuestionMap() + lock indicators
    ├── UnitDetail.tsx             # Uses getQuestionMap() + lock indicators
    ├── PresetBuilder.tsx          # Uses getQuestionMap() + lock indicators
    └── CourseChallengePresetBuilder.tsx  # Uses getQuestionMap()
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

## Visual Indicators

When a topic is locked (showing fake data), the app displays:

### On UnitDetail.tsx (Topic Page)
- Topic name shows "(Practice)" suffix
- Cram mode button says "Cram Study (Practice)"
- Custom Practice button says "Build Custom Practice (Practice)"

### On ViewAllQuestions.tsx
- Orange banner: "📚 Practice Mode Active - These are practice questions..."
- Shows unlock date if available

### On PresetBuilder.tsx
- Orange banner: "📚 Practice Mode Active"
- Shows unlock date in the banner

---

## Testing the System

### Check if Date Logic Works

1. Open browser console (F12)
2. Look for log messages like:
   - `[Test Schedule] Using practice data for chemistry-atomic`

### Manually Test Different Dates

In `src/data/test-schedule-config.ts`, temporarily change a test date:

```typescript
// Set to past date to test real data
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
4. Verify the import in `questionLoader.ts` uses `as fake[Name]` syntax
5. Check the `fakeDataMap` has the correct entry
6. Ensure the component is using `getQuestionMap()` or `getQuestions()` from questionLoader

### Real data still showing when it should be locked

1. Check the test date format is `'YYYY-MM-DD'`
2. Verify current date is outside the allowed range
3. Check console for warnings about missing fake data

### Some pages show real data, others show fake

1. Make sure ALL pages use `src/utils/questionLoader.ts`
2. Check that no page is importing questions directly from the data files
3. All imports should come from `getQuestions()` or `getQuestionMap()`

---

## Summary Checklist

For each test you want to protect:

- [ ] Create fake data file at `src/data/fake/[subject]/[topic]-questions.ts`
- [ ] Use same variable name as real file
- [ ] Add import in `questionLoader.ts` with `as fake[Name]` alias
- [ ] Add entry to `fakeDataMap` in `questionLoader.ts`
- [ ] Add entry to `testScheduleConfig` with test date
- [ ] Set `hasFakeData: true`
- [ ] Test by checking console logs
- [ ] Verify all pages show practice mode indicators when locked
