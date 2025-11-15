# Memory Practice Questions

This folder contains memory-based practice questions.

## How to Add Your Own Questions

### 1. Create a New Question File

Create a new file like `vocabulary-questions.ts` in this folder with this structure:

```typescript
import { Question } from '@/types/quiz';

export const vocabularyQuestions: Question[] = [
  {
    "id": "vocab-1",
    "type": "multiple-choice",
    "question": "What does 'ephemeral' mean?",
    "options": [
      { "label": "A", "value": "A", "text": "Lasting for a very short time" },
      { "label": "B", "value": "B", "text": "Extremely large" },
      { "label": "C", "value": "C", "text": "Very complex" },
      { "label": "D", "value": "D", "text": "Permanent" }
    ],
    "correctAnswer": "A",
    "explanation": "Ephemeral means lasting for a very short time or transient."
  },
  // Add more questions here...
];
```

### 2. Question Types

You can use two types of questions:

**Multiple Choice:**
```typescript
{
  "id": "unique-id",
  "type": "multiple-choice",
  "question": "Your question text",
  "options": [
    { "label": "A", "value": "A", "text": "Option A text" },
    { "label": "B", "value": "B", "text": "Option B text" },
    { "label": "C", "value": "C", "text": "Option C text" },
    { "label": "D", "value": "D", "text": "Option D text" }
  ],
  "correctAnswer": "A",
  "explanation": "Explanation of the correct answer"
}
```

**Free Response:**
```typescript
{
  "id": "unique-id",
  "type": "free-response",
  "question": "Your question text",
  "correctAnswer": "The correct answer text",
  "explanation": "Explanation of the answer"
}
```

### 3. Add Your New Unit to Index Page

After creating your question file, you need to add it to the Memory section:

1. Open `src/pages/Index.tsx`
2. Find the `memoryUnits` array (around line 90)
3. Add your new unit:
```typescript
const memoryUnits = [
  { id: 'general', name: 'General Memory' },
  { id: 'vocabulary', name: 'Vocabulary' }, // Your new unit
];
```

### 4. Change the Section Name

To change "Memory" to a different name:

1. Open `src/pages/Index.tsx`
2. Find the Memory section (search for "Memory")
3. Change the title in the `<h2>` tag
4. Change the icon if desired (currently uses `Brain` from lucide-react)

### 5. Add More Cards/Types of Tests

The test types are automatically available for each unit:
- **Daily Practice**: 10 random questions
- **Full Test**: 30 random questions  
- **Course Challenge**: Select specific units to test on

No additional configuration needed - these work automatically once you add your question files!
