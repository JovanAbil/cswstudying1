# Fake Data Folder

This folder contains fake/practice questions that are shown when real test data is locked.

## How it works

1. Each subject has a subfolder (e.g., `chemistry/`, `biology/`)
2. Inside each subfolder, create files matching the real data files (e.g., `atomic-questions.ts`)
3. Export the same variable names as the real files
4. Configure the test schedule in `src/data/test-schedule-config.ts`

## File Structure

```
src/data/fake/
├── README.md (this file)
├── chemistry/
│   ├── atomic-questions.ts
│   ├── compounds-questions.ts
│   └── ...
├── biology/
│   ├── biochemistry-questions.ts
│   └── ...
├── apprecalc/
│   ├── polynomial-questions.ts
│   └── ...
└── worldhistory/
    ├── renaissance-questions.ts
    └── ...
```

## Creating Fake Data Files

1. Copy the structure from the real file
2. Change the questions to be similar but different (practice questions)
3. Keep the same variable name and export

### Example: `src/data/fake/chemistry/atomic-questions.ts`

```typescript
import { Question } from '@/types/quiz';

// FAKE/PRACTICE DATA - Shown when real test is locked
export const atomicQuestions: Question[] = [
  {
    id: 'fake-atomic-1',
    type: 'multiple-choice',
    question: 'Practice question about atomic structure...',
    options: [
      { label: 'A', value: 'a', text: 'Practice option A' },
      { label: 'B', value: 'b', text: 'Practice option B' },
      { label: 'C', value: 'c', text: 'Practice option C' },
      { label: 'D', value: 'd', text: 'Practice option D' },
    ],
    correctAnswer: 'a',
    explanation: 'This is practice content.',
  },
  // Add more practice questions...
];
```

## Configuring Test Dates

Edit `src/data/test-schedule-config.ts`:

```typescript
export const testScheduleConfig: Record<string, TestSchedule> = {
  'chemistry-atomic': { testDate: '2025-01-20', hasFakeData: true },
  // Add more entries...
};
```

## Timeline Example

For a test with date `2025-01-20`:

| Period | Data Shown | Reason |
|--------|-----------|--------|
| Before Jan 20, 2025 | FAKE | Test hasn't happened yet |
| Jan 20, 2025 - Aug 31, 2026 | REAL | Test completed, study period |
| Sep 1, 2026 - Jan 26, 2027 | FAKE | Locked for new semester |
| Jan 27, 2027 - Aug 31, 2027 | REAL | Next cycle begins (test date + 7 days) |
| ... | ... | Pattern repeats yearly |
