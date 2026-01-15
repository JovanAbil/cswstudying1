# Content Authoring Guide

## Overview

This guide provides step-by-step instructions for adding new courses, units, and questions to the Practice Hub application.

---

## File Structure

```
src/
├── data/
│   ├── apprecalc/           # AP Precalculus questions
│   │   ├── polynomial-questions.ts
│   │   ├── rational-questions.ts
│   │   └── ...
│   ├── biology/             # Biology questions
│   ├── chemistry/           # Chemistry (Massarotti) questions
│   ├── chemistryDarone/     # Chemistry (Darone) questions
│   ├── worldhistory/        # World History questions
│   ├── memory/              # Memory training questions
│   ├── practice/            # Practice/English questions
│   ├── stock/               # Personal/Stock questions
│   ├── assignments/         # Homework assignments
│   │   ├── unit-assignments.ts
│   │   └── assignment-questions.ts
│   └── study-resources.ts   # External study links
├── pages/
│   ├── Quiz.tsx             # Main quiz component (add imports here)
│   ├── UnitDetail.tsx       # Unit detail page (add imports here)
│   ├── ViewAllQuestions.tsx # View all questions (add imports here)
│   └── categories/          # Category pages (Math, Science, etc.)
└── public/
    └── images/              # Question images
        ├── apprecalc/
        ├── biology/
        ├── chemistry/
        └── memory/
```

---

## Step-by-Step: Adding a New Question Set (Topic)

### Step 1: Create the Question File

Create a new file in the appropriate subject folder:

**File:** `src/data/{subject}/{topic}-questions.ts`

```typescript
import { Question } from '@/types/quiz';

export const myTopicQuestions: Question[] = [
  {
    id: "mytopic-1",
    type: "multiple-choice",
    question: "Your question text here",
    options: [
      { label: "A", value: "A", text: "Option A" },
      { label: "B", value: "B", text: "Option B" },
      { label: "C", value: "C", text: "Option C" },
      { label: "D", value: "D", text: "Option D" }
    ],
    correctAnswer: "B",
    explanation: "Optional explanation"
  },
  // Add more questions...
];
```

### Step 2: Add to Quiz.tsx

**File:** `src/pages/Quiz.tsx`

1. **Add import at the top (around line 17-72):**
```typescript
import { myTopicQuestions } from '@/data/{subject}/{topic}-questions';
```

2. **Add to questionMap (around line 108-133):**
```typescript
const questionMap: Record<string, Question[]> = useMemo(() => ({
  // ... existing entries ...
  '{subject}-{topicId}': myTopicQuestions,
}), []);
```

### Step 3: Add to UnitDetail.tsx

**File:** `src/pages/UnitDetail.tsx`

1. **Add import (around line 17-65):**
```typescript
import { myTopicQuestions } from '@/data/{subject}/{topic}-questions';
```

2. **Add to questionMap (around line 75-100):**
```typescript
const questionMap: Record<string, Question[]> = useMemo(() => ({
  // ... existing entries ...
  '{subject}-{topicId}': myTopicQuestions,
}), []);
```

### Step 4: Add to ViewAllQuestions.tsx

**File:** `src/pages/ViewAllQuestions.tsx`

1. **Add import (around line 14-61):**
```typescript
import { myTopicQuestions } from '@/data/{subject}/{topic}-questions';
```

2. **Add to questionMap (around line 82-107):**
```typescript
const questionMap: Record<string, Question[]> = useMemo(() => ({
  // ... existing entries ...
  '{subject}-{topicId}': myTopicQuestions,
}), []);
```

### Step 5: Add Unit to Category Page

**File:** `src/pages/categories/{Category}Category.tsx`

Find the subject array and add your unit:

```typescript
const subjects = [
  {
    id: 'subject-id',
    name: 'Subject Name',
    units: [
      { id: 'existing-unit', name: 'Existing Unit' },
      { id: 'mytopic', name: 'My Topic' },  // ADD THIS
    ],
  },
];
```

### Step 6: Add to Course Challenge (CourseChallenge.tsx)

**File:** `src/pages/CourseChallenge.tsx`

Find the `getUnits()` function and add your unit:

```typescript
case 'subject-id':
  return [
    { id: 'existing-unit', name: 'Unit 1 - Existing' },
    { id: 'mytopic', name: 'Unit 2 - My Topic' },  // ADD THIS
  ];
```

---

## Step-by-Step: Adding a New Subject/Course

### Step 1: Create the Subject Folder

```bash
mkdir src/data/newsubject
```

### Step 2: Create Question Files

Create `.ts` files for each unit in the new subject folder.

### Step 3: Create/Edit Category Page

Either create a new category page or add to an existing one in `src/pages/categories/`.

### Step 4: Add Route (App.tsx)

**File:** `src/App.tsx`

If creating a new category:
```typescript
<Route path="/category/newcategory" element={<NewCategory />} />
```

### Step 5: Add to Index Page (if new category)

**File:** `src/pages/Index.tsx`

Add to the categories array:
```typescript
const categories = [
  // ... existing categories ...
  {
    id: 'newcategory',
    name: 'New Category Name',
    description: 'Description here',
    icon: SomeIcon,  // Import from lucide-react
    color: 'primary',
    path: '/category/newcategory'
  }
];
```

---

## Adding Images

### Step 1: Add Image to Public Folder

Place images in: `public/images/{subject}/`

### Step 2: Reference in Question

```typescript
{
  id: "mytopic-1",
  type: "multiple-choice",
  question: "Based on the diagram shown...",
  image: "/images/mysubject/mytopic1.png",  // Path relative to public folder
  options: [...],
  correctAnswer: "A"
}
```

### Image Naming Convention
- Use lowercase
- Use hyphens, not spaces
- Include topic prefix: `polynomial1.png`, `polynomial2.png`

---

## Adding Study Resources

**File:** `src/data/study-resources.ts`

### For a Specific Unit:
```typescript
export const unitStudyResources: Record<string, StudyResource[]> = {
  // ... existing entries ...
  'subject-unitId': [
    { title: 'Khan Academy', url: 'https://khanacademy.org/...' },
    { title: 'YouTube Tutorial', url: 'https://youtube.com/...' },
  ],
};
```

### For Course Challenge:
```typescript
export const courseChallengeResources: Record<string, StudyResource[]> = {
  // ... existing entries ...
  'subject': [
    { title: 'Resource Name', url: 'https://example.com' },
  ],
};
```

---

## Naming Conventions

### File Names
- Use lowercase with hyphens: `polynomial-questions.ts`
- Always suffix with `-questions.ts`

### Variable Names
- Use camelCase: `polynomialQuestions`
- Always suffix with `Questions`

### Question IDs
- Format: `{topic}-{number}`
- Use lowercase with hyphens: `polynomial-1`
- Numbers should be sequential

### Subject IDs
- Use lowercase: `precalc`, `biology`, `chemistry`
- Compound names use hyphens: `world-history`

### Unit IDs
- Use lowercase: `polynomial`, `atomic`, `biochemistry`
- No hyphens unless necessary

---

## Common Mistakes and How to Avoid Them

### ❌ Mistake: Forgetting to add import in Quiz.tsx
**Result:** Questions don't load, empty quiz
**Fix:** Always add imports to Quiz.tsx, UnitDetail.tsx, and ViewAllQuestions.tsx

### ❌ Mistake: Mismatched keys in questionMap
**Result:** "No questions found" error
**Fix:** Ensure key format is `{subject}-{unitId}` exactly as used in routes

### ❌ Mistake: Duplicate question IDs
**Result:** Wrong answers saved incorrectly, presets break
**Fix:** Always use unique IDs across the entire application

### ❌ Mistake: Wrong correctAnswer value
**Result:** No answer is ever marked correct
**Fix:** Ensure correctAnswer matches the `value` field of an option, not the `label`

### ❌ Mistake: Image path starts with `src/`
**Result:** Image doesn't load
**Fix:** Image paths should start with `/images/...` (relative to public folder)

### ❌ Mistake: Forgetting to export the questions array
**Result:** Import fails, build error
**Fix:** Always use `export const myQuestions: Question[] = [...]`

### ❌ Mistake: Using `type: 'mc'` instead of `type: 'multiple-choice'`
**Result:** TypeScript error or question doesn't render
**Fix:** Use exact string `'multiple-choice'` or `'free-response'`

---

## Checklist for Adding New Content

- [ ] Create question file with proper format
- [ ] Add import to `Quiz.tsx`
- [ ] Add to questionMap in `Quiz.tsx`
- [ ] Add import to `UnitDetail.tsx`
- [ ] Add to questionMap in `UnitDetail.tsx`
- [ ] Add import to `ViewAllQuestions.tsx`
- [ ] Add to questionMap in `ViewAllQuestions.tsx`
- [ ] Add unit to category page (`{Category}Category.tsx`)
- [ ] Add unit to CourseChallenge.tsx (if applicable)
- [ ] Add images to `public/images/{subject}/` (if any)
- [ ] Add study resources (optional)
- [ ] Test the quiz works
- [ ] Test "View All Questions" works
- [ ] Test Course Challenge includes new questions
