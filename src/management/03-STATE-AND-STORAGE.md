# State & Storage Documentation

## Overview

The Practice Hub application uses browser localStorage for all persistent data. No backend database is used. This document describes how state is managed and when data is read/written.

---

## LocalStorage Keys

| Key | Purpose | Hook/File |
|-----|---------|-----------|
| `quiz-wrong-answers` | Stores questions answered incorrectly | `useWrongAnswers.ts` |
| `quiz-presets` | Stores saved question presets | `usePresets.ts` |
| `custom-units-data` | Stores user-created units and topics | `useCustomUnits.ts` |
| `imported-course-questions-{subject}` | Stores imported question sets per subject | `customUnitsExport.ts` |
| `terms-accepted` | Whether user accepted terms of service | `TermsOfServiceModal.tsx` |
| `cookie-consent` | Cookie consent status | `CookieConsentBanner.tsx` |
| `theme` | Light/dark theme preference | `useTheme.ts` |
| `debug-mode` | Debug mode toggle | `useDebugMode.ts` |

---

## State Initialization

### 1. Wrong Answers (`useWrongAnswers.ts`)

**Storage Key:** `quiz-wrong-answers`

**Structure:**
```typescript
{
  "precalc": {
    "polynomial": [
      {
        questionId: "polynomial-1",
        question: { /* full Question object */ },
        timestamp: 1699000000000
      }
    ],
    "course-challenge": [...]
  },
  "chemistry": {...}
}
```

**Initialization:**
- Loaded from localStorage on component mount via `useEffect`
- If no data exists or parsing fails, defaults to empty object `{}`

**When Data is Written:**
- **On quiz completion** (`Results.tsx`, line ~32-41): Wrong answers are saved when quiz results are displayed
- Replaces previous wrong answers for that unit (doesn't append)

**Read Triggers:**
- Category pages read wrong count for "Targeted Practice" button
- Targeted practice quiz reads wrong questions to create quiz

---

### 2. Presets (`usePresets.ts`)

**Storage Key:** `quiz-presets`

**Structure:**
```typescript
{
  "preset-1699000000000-abc123": {
    id: "preset-1699000000000-abc123",
    name: "My Preset",
    subject: "precalc",
    unitId: "polynomial",
    questionIds: ["polynomial-1", "polynomial-5", "polynomial-10"],
    createdAt: 1699000000000,
    updatedAt: 1699000000000
  }
}
```

**Initialization:**
- Loaded from localStorage on mount
- Defaults to empty object `{}`

**When Data is Written:**
- **Create:** When user saves a new preset in PresetBuilder
- **Update:** When user modifies and saves an existing preset
- **Delete:** When user deletes a preset

---

### 3. Custom Units (`useCustomUnits.ts`)

**Storage Key:** `custom-units-data`

**Structure:**
```typescript
{
  units: [
    {
      id: "custom-1699000000000-abc123",
      name: "My Custom Unit",
      topics: [
        {
          id: "custom-1699000001000-def456",
          name: "Topic 1",
          mathEnabled: true,
          questions: [/* Question objects */]
        }
      ]
    }
  ]
}
```

**Initialization:**
- Loaded from localStorage on mount
- Defaults to `{ units: [] }`

**When Data is Written:**
- **addUnit:** Creates new unit
- **updateUnit:** Renames unit
- **deleteUnit:** Removes unit and all its topics
- **addTopic:** Adds topic to unit
- **updateTopic:** Updates topic properties or questions
- **deleteTopic:** Removes topic from unit

---

### 4. Imported Course Questions (`customUnitsExport.ts`)

**Storage Key:** `imported-course-questions-{subject}`

**Structure:**
```typescript
[
  {
    id: "imported-1699000000000-abc123",
    name: "exponential",
    questions: [/* Question objects */],
    importedAt: 1699000000000
  }
]
```

**Initialization:**
- Loaded lazily when CourseChallenge page loads

**When Data is Written:**
- **saveImportedQuestions:** When user uploads a .ts question file
- **removeImportedQuestions:** When user removes an imported set

---

## Save Triggers Summary

| Action | What is Saved | When |
|--------|---------------|------|
| Complete a quiz | Wrong answers | On Results page load |
| Save preset | Preset data | Button click |
| Update preset | Preset data | Button click |
| Delete preset | Remove from storage | Button click |
| Create custom unit | Unit data | Button click |
| Add/edit custom topic | Topic data | Button click |
| Import question file | Imported questions | File upload complete |
| Accept terms | Terms accepted flag | Button click |
| Set cookie consent | Consent status | Button click |
| Toggle theme | Theme preference | Toggle change |

---

## Reset/Export Behavior

### Clear Wrong Answers

**Function:** `clearSubjectWrongAnswers(subject: string)`

Removes all wrong answers for a specific subject. Currently not exposed in UI but available in hook.

### Export Custom Unit

**Function:** `downloadUnit(unit: CustomUnit)` in `customUnitsExport.ts`

Creates a .zip file containing:
- `src/data/{unit-name}/index.ts` - Unit metadata
- `src/data/{unit-name}/{topic}-questions.ts` - Topic question files
- `public/images/{unit-name}/` - Extracted images
- `README.md` - Import instructions

### Export Single Topic

**Function:** `downloadTopic(topic: CustomTopic, unitName: string)`

Downloads a single `.ts` file with all questions.

### Export Built-in Topic

**Function:** `downloadBuiltInTopic(questions: Question[], topicName: string, mathEnabled: boolean)`

Allows exporting any built-in question set as a `.ts` file.

---

## Edge Cases That Cause Corrupted or Lost State

### 1. LocalStorage Full
**Symptom:** Save operations silently fail
**Detection:** Check `localStorage.getItem()` returns the expected value after `setItem()`
**Recovery:** User must clear browser data or delete some entries

### 2. JSON Parse Errors
**Symptom:** Data resets to default on page load
**Cause:** Manual localStorage editing, browser corruption
**Detection:** Console shows "Failed to parse X from storage"
**Recovery:** Data is lost, starts fresh

### 3. Browser Private/Incognito Mode
**Symptom:** Data not persisted between sessions (expected behavior)
**Note:** LocalStorage works during session but clears on close

### 4. Storage Cleared by Browser
**Symptom:** All data lost
**Causes:** User clears site data, browser auto-cleanup, iOS storage pressure
**Prevention:** Encourage users to export important custom content

### 5. Multiple Tabs Conflict
**Symptom:** Changes in one tab not reflected in another
**Cause:** Each tab loads state on mount, doesn't sync
**Mitigation:** Data is saved on each action, conflicts are rare but possible

### 6. Duplicate Question IDs
**Symptom:** Wrong answers overwrite each other
**Cause:** Two questions share the same ID
**Prevention:** Ensure all IDs are globally unique

### 7. Invalid Question Structure
**Symptom:** Questions don't render or crash the quiz
**Cause:** Missing required fields, wrong types
**Prevention:** Follow schema exactly, use TypeScript for validation

---

## Data Migration

If you need to migrate data between localStorage versions:

1. **Read old data:**
```typescript
const oldData = localStorage.getItem('old-key');
```

2. **Transform to new format:**
```typescript
const newData = transformData(JSON.parse(oldData));
```

3. **Save new data:**
```typescript
localStorage.setItem('new-key', JSON.stringify(newData));
localStorage.removeItem('old-key');
```

---

## Debugging Storage Issues

### View Current Storage
```javascript
// In browser console:
Object.keys(localStorage).forEach(key => {
  console.log(key, JSON.parse(localStorage.getItem(key)));
});
```

### Clear Specific Key
```javascript
localStorage.removeItem('quiz-wrong-answers');
```

### Clear All Site Data
```javascript
localStorage.clear();
```

### Export All Data (for backup)
```javascript
const backup = {};
Object.keys(localStorage).forEach(key => {
  backup[key] = localStorage.getItem(key);
});
console.log(JSON.stringify(backup, null, 2));
```

### Import Backup
```javascript
const backup = { /* paste backup object */ };
Object.keys(backup).forEach(key => {
  localStorage.setItem(key, backup[key]);
});
```
