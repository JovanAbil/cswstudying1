# Guide: Adding Topics and Units to CSW Studying

This guide explains how to add new topics, units, and subjects to the study app.

---

## Table of Contents
1. [File Structure Overview](#file-structure-overview)
2. [Adding a Topic to an Existing Unit](#adding-a-topic-to-an-existing-unit)
3. [Adding a New Unit to an Existing Subject](#adding-a-new-unit-to-an-existing-subject)
4. [Adding a Completely New Subject](#adding-a-completely-new-subject)
5. [Question Format Reference](#question-format-reference)

---

## File Structure Overview

```
src/
├── data/
│   ├── [subject]/
│   │   ├── [topic]-questions.ts    # Question files
│   │   └── info.md                 # Subject info
│   └── FORMATTING_GUIDE.md         # Question formatting reference
├── pages/
│   ├── Quiz.tsx                    # Main quiz component
│   ├── UnitDetail.tsx              # Unit detail page
│   ├── CourseChallenge.tsx         # Course challenge page
│   └── categories/
│       ├── MathCategory.tsx
│       ├── ScienceCategory.tsx
│       ├── SocialCategory.tsx
│       └── OtherCategory.tsx
└── types/
    └── quiz.ts                     # Question type definitions
```

---

## Adding a Topic to an Existing Unit

### Step 1: Create the Questions File

Create a new file in `src/data/[subject]/[topic]-questions.ts`:

```typescript
import { Question } from '@/types/quiz';

export const [topicName]Questions: Question[] = [
  {
    id: '[topic]-1',
    type: 'multiple-choice',
    question: 'Your question here?',
    options: [
      { label: 'A', value: 'a', text: 'Option A' },
      { label: 'B', value: 'b', text: 'Option B' },
      { label: 'C', value: 'c', text: 'Option C' },
      { label: 'D', value: 'd', text: 'Option D' },
    ],
    correctAnswer: 'a',
    explanation: 'Explanation of the answer.',
  },
  // Add more questions...
];
```

### Step 2: Import in Quiz.tsx

Open `src/pages/Quiz.tsx` and:

1. Add the import at the top (around line 16-75):
```typescript
import { [topicName]Questions } from '@/data/[subject]/[topic]-questions';
```

2. Add to the `questionMap` object (around line 106-132):
```typescript
'[subject]-[topic]': [topicName]Questions,
```

### Step 3: Add to UnitDetail.tsx

Open `src/pages/UnitDetail.tsx` and find the `getUnits()` function. Add your topic to the appropriate subject's unit list.

---

## Adding a New Unit to an Existing Subject

### Step 1: Create All Topic Files

Create all necessary question files in `src/data/[subject]/`.

### Step 2: Update UnitDetail.tsx

In `src/pages/UnitDetail.tsx`, find the `getUnits()` function and add your new unit:

```typescript
case '[subject]':
  return [
    // ... existing units
    { id: '[new-unit]', name: 'Unit X - New Unit Name' },
  ];
```

### Step 3: Update CourseChallenge.tsx

In `src/pages/CourseChallenge.tsx`, find the `getUnits()` function and add the same unit:

```typescript
case '[subject]':
  return [
    // ... existing units
    { id: '[new-unit]', name: 'Unit X - New Unit Name' },
  ];
```

### Step 4: Update Quiz.tsx

Add imports and questionMap entries as described above.

---

## Adding a Completely New Subject

### Step 1: Create Subject Folder and Files

1. Create folder: `src/data/[newsubject]/`
2. Create an `info.md` file with subject description
3. Create topic question files

### Step 2: Update Category Page

Choose the appropriate category page in `src/pages/categories/`:
- `MathCategory.tsx` - for math subjects
- `ScienceCategory.tsx` - for science subjects  
- `SocialCategory.tsx` - for social studies subjects
- `OtherCategory.tsx` - for other subjects

Add the new subject card:

```typescript
{
  id: '[newsubject]',
  name: 'New Subject Name',
  description: 'Description of the subject',
  icon: <Icon className="h-6 w-6" />,
  units: ['unit1', 'unit2'],
}
```

### Step 3: Update UnitDetail.tsx

Add a new case in the `getUnits()` function:

```typescript
case '[newsubject]':
  return [
    { id: 'unit1', name: 'Unit 1 - Name' },
    { id: 'unit2', name: 'Unit 2 - Name' },
  ];
```

### Step 4: Update CourseChallenge.tsx

Add a new case in the `getUnits()` function similar to above.

### Step 5: Update Quiz.tsx

1. Import all question files
2. Add entries to `questionMap`
3. Update the back navigation logic if needed

---

## Question Format Reference

### Multiple Choice Question

```typescript
{
  id: 'unique-id',
  type: 'multiple-choice',
  question: 'What is the question?',
  options: [
    { label: 'A', value: 'a', text: 'Answer option A' },
    { label: 'B', value: 'b', text: 'Answer option B' },
    { label: 'C', value: 'c', text: 'Answer option C' },
    { label: 'D', value: 'd', text: 'Answer option D' },
  ],
  correctAnswer: 'a', // Must match one of the option values
  explanation: 'Why this is correct...',
  image: '/images/subject/image.png', // Optional
}
```

### Free Response Question

```typescript
{
  id: 'unique-id',
  type: 'free-response',
  question: 'What is the answer?',
  correctAnswer: 'The expected answer',
  explanation: 'Explanation of the answer.',
  image: '/images/subject/image.png', // Optional
}
```

### With Table

```typescript
{
  id: 'unique-id',
  type: 'multiple-choice',
  question: 'Based on the table...',
  table: {
    headers: ['Column 1', 'Column 2', 'Column 3'],
    rows: [
      ['Row 1 Data', 'Value', 'Result'],
      ['Row 2 Data', 'Value', 'Result'],
    ],
  },
  options: [/* ... */],
  correctAnswer: 'a',
  explanation: 'Explanation...',
}
```

### With Math (LaTeX)

Use `$$...$$` for display math or `$...$` for inline math:

```typescript
{
  id: 'math-1',
  type: 'free-response',
  question: 'Solve: $$\\\\\\\\frac{x^2 + 1}{2}$$',
  correctAnswer: '$x = 5$',
  explanation: 'The solution is $$x = 5$$ because...',
}
```

---

## Files to Edit Summary

| Action | Files to Edit |
|--------|---------------|
| Add topic to existing unit | 1. Create `[topic]-questions.ts`<br>2. `Quiz.tsx` (import + questionMap) |
| Add new unit | 1. Create question files<br>2. `UnitDetail.tsx`<br>3. `CourseChallenge.tsx`<br>4. `Quiz.tsx` |
| Add new subject | 1. Create `src/data/[subject]/` folder<br>2. Category page<br>3. `UnitDetail.tsx`<br>4. `CourseChallenge.tsx`<br>5. `Quiz.tsx` |

---

## Tips

1. **Question IDs**: Use a consistent format like `[topic]-[number]` (e.g., `biochem-1`, `biochem-2`)
2. **Images**: Store in `public/images/[subject]/` folder
3. **LaTeX**: Use KaTeX syntax for math expressions
4. **Testing**: After adding questions, test in cram mode to verify all questions load correctly
