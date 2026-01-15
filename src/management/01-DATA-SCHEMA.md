# Data Schema Documentation

## Overview

This document describes the complete data structures used for courses, questions, and related entities in the Practice Hub application.

---

## Question Types

The application supports two question types, defined in `src/types/quiz.ts`.

### 1. Multiple Choice Question

```typescript
interface MultipleChoiceQuestion {
  id: string;                    // REQUIRED - Unique identifier (e.g., "polynomial-1")
  type: 'multiple-choice';       // REQUIRED - Must be exactly 'multiple-choice'
  question: string;              // REQUIRED - The question text (supports LaTeX with $...$)
  options: {                     // REQUIRED - Array of answer options
    label: string;               // Display label (e.g., "A", "B", "C", "D")
    value: string;               // Value used for comparison (e.g., "A", "B", "C", "D")
    text: string;                // Option text (can be empty if using image)
    image?: string;              // Optional: Image path for visual options
  }[];
  correctAnswer: string;         // REQUIRED - Must match one option's 'value' field
  explanation?: string;          // Optional - Explanation shown after answering
  table?: TableData;             // Optional - Table data to display
  image?: string;                // Optional - Image path (e.g., "/images/apprecalc/polynomial1.png")
  calculator?: boolean;          // Optional - Marks as calculator question (for sectioned quizzes)
}
```

### 2. Free Response Question

```typescript
interface FreeResponseQuestion {
  id: string;                    // REQUIRED - Unique identifier
  type: 'free-response';         // REQUIRED - Must be exactly 'free-response'
  question: string;              // REQUIRED - The question text (supports LaTeX)
  correctAnswer: string;         // REQUIRED - Expected answer (shown to user for self-grading)
  explanation?: string;          // Optional - Additional explanation
  table?: TableData;             // Optional - Table data to display
  image?: string;                // Optional - Image path
  displayAs?: 'paragraph';       // Optional - Renders answer as paragraph (preserves whitespace)
  calculator?: boolean;          // Optional - Marks as calculator question
}
```

### Table Data Structure

```typescript
interface TableData {
  headers: string[];             // Column headers
  rows: (string | number)[][];   // 2D array of cell values
}
```

---

## Question ID Conventions

### Format
`{topic}-{number}`

### Examples
- `polynomial-1`, `polynomial-2`, ... `polynomial-29`
- `atomic-1`, `atomic-2`, ... `atomic-15`
- `biochemistry-1`, `biochemistry-2`, ...

### Rules
1. IDs must be unique within the entire application (not just within a topic)
2. Use lowercase with hyphens
3. Sequential numbering recommended for easy management
4. Never reuse deleted IDs (may cause localStorage conflicts)

---

## Valid vs Invalid Examples

### ✅ Valid Multiple Choice Question
```typescript
{
  id: "polynomial-1",
  type: "multiple-choice",
  question: "What is the degree of $x^3 + 2x - 5$?",
  options: [
    { label: "A", value: "A", text: "1" },
    { label: "B", value: "B", text: "2" },
    { label: "C", value: "C", text: "3" },
    { label: "D", value: "D", text: "5" }
  ],
  correctAnswer: "C",
  explanation: "The degree is the highest exponent, which is 3."
}
```

### ✅ Valid Free Response Question
```typescript
{
  id: "polynomial-16",
  type: "free-response",
  question: "Find all zeros of $f(x) = x^2 - 4$.",
  correctAnswer: "x = 2 and x = -2",
  explanation: "Factor as (x-2)(x+2) = 0"
}
```

### ✅ Valid Question with Image
```typescript
{
  id: "polynomial-5",
  type: "multiple-choice",
  question: "Based on the graph shown, what is f(2)?",
  image: "/images/apprecalc/polynomial14.png",
  options: [
    { label: "A", value: "A", text: "1" },
    { label: "B", value: "B", text: "2" },
    { label: "C", value: "C", text: "3" },
    { label: "D", value: "D", text: "4" }
  ],
  correctAnswer: "B"
}
```

### ✅ Valid Question with Image Options
```typescript
{
  id: "polynomial-2",
  type: "multiple-choice",
  question: "Which graph shows a decreasing function?",
  options: [
    { label: "A", value: "A", text: "", image: "/images/apprecalc/polynomial6.png" },
    { label: "B", value: "B", text: "", image: "/images/apprecalc/polynomial7.png" },
    { label: "C", value: "C", text: "", image: "/images/apprecalc/polynomial8.png" },
    { label: "D", value: "D", text: "", image: "/images/apprecalc/polynomial9.png" }
  ],
  correctAnswer: "D"
}
```

### ❌ Invalid: Missing required field
```typescript
{
  id: "bad-1",
  type: "multiple-choice",
  // MISSING: question field
  options: [...],
  correctAnswer: "A"
}
```

### ❌ Invalid: Wrong type value
```typescript
{
  id: "bad-2",
  type: "mc",  // WRONG: Must be "multiple-choice"
  question: "...",
  options: [...],
  correctAnswer: "A"
}
```

### ❌ Invalid: correctAnswer doesn't match any option value
```typescript
{
  id: "bad-3",
  type: "multiple-choice",
  question: "...",
  options: [
    { label: "A", value: "A", text: "Option 1" },
    { label: "B", value: "B", text: "Option 2" }
  ],
  correctAnswer: "C"  // WRONG: No option has value "C"
}
```

### ❌ Invalid: Duplicate ID
```typescript
// In file 1:
{ id: "polynomial-1", type: "multiple-choice", ... }

// In file 2:
{ id: "polynomial-1", type: "free-response", ... }  // WRONG: Duplicate ID
```

---

## What Breaks if Fields are Missing or Malformed

| Missing/Malformed Field | What Breaks | Error Type |
|------------------------|-------------|------------|
| `id` | Question tracking fails, wrong answers not saved correctly | Silent failure |
| `type` | Question doesn't render, TypeScript error | Runtime error |
| `question` | Empty question text, UI breaks | Silent failure |
| `options` (MC) | No options shown, cannot answer | Runtime error |
| `correctAnswer` | All answers marked wrong | Silent failure |
| `correctAnswer` mismatch | Correct answer never recognized | Silent failure |
| Duplicate `id` | Wrong answers overwrite each other, presets break | Data corruption |
| Invalid `image` path | Broken image icon displayed | Visual error |
| Malformed `table` | Table doesn't render or crashes | Runtime error |

---

## Related Data Structures

### Study Resources (`src/data/study-resources.ts`)

```typescript
interface StudyResource {
  title: string;   // Display name
  url: string;     // External link
}

// Indexed by 'subject-unitId' (e.g., 'precalc-polynomial')
const unitStudyResources: Record<string, StudyResource[]> = {...};

// Indexed by subject (e.g., 'precalc')
const courseChallengeResources: Record<string, StudyResource[]> = {...};
```

### Unit Assignments (`src/data/assignments/unit-assignments.ts`)

```typescript
interface HomeworkAssignment {
  id: string;      // Unique within unit
  name: string;    // Display name
  notes?: string;  // Optional notes/description
}

interface UnitContent {
  assignments: HomeworkAssignment[];
  testId?: string;  // Reference to test question set
}

// Indexed by 'subject-unitId'
const unitAssignments: Record<string, UnitContent> = {...};
```

### Custom Units (localStorage)

```typescript
interface CustomTopic {
  id: string;           // Auto-generated
  name: string;         // User-defined name
  mathEnabled: boolean; // Whether to render LaTeX
  questions: Question[];
}

interface CustomUnit {
  id: string;           // Auto-generated
  name: string;         // User-defined name
  topics: CustomTopic[];
}

interface CustomUnitsData {
  units: CustomUnit[];
}
```

---

## LaTeX/Math Rendering

The application uses KaTeX for math rendering. Wrap math expressions in `$...$` for inline or `$$...$$` for display mode.

### Supported in:
- `question` field
- `correctAnswer` field
- `explanation` field
- `options[].text` field

### Examples
```typescript
question: "Find $\\lim_{x \\to \\infty} \\frac{1}{x}$"
correctAnswer: "$\\frac{1}{2}$"
explanation: "Using L'Hôpital's rule: $\\frac{d}{dx}$..."
```

---

## Chemistry Mode

When `subject === 'chemistry'`, the MathText component enables chemical formula formatting:
- Subscripts for numbers after elements (e.g., H2O renders with subscript 2)
- Superscripts for charges (e.g., Na+ renders with superscript +)
