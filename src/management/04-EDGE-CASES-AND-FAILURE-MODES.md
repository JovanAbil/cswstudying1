# Edge Cases & Failure Modes

## Overview

This document describes known edge cases in user interaction, failure scenarios, and how the application currently handles them (or should handle them going forward).

---

## Quiz Flow Edge Cases

### 1. Empty Question Set

**Scenario:** User navigates to a quiz for a unit with no questions.

**Current Behavior:**
- Quiz shows loading state indefinitely
- No error message displayed

**Recommended Fix:**
- Check if `questions.length === 0` after loading
- Display "No questions available for this unit" message
- Provide navigation back to unit selection

---

### 2. User Skips All Questions

**Scenario:** User uses Skip button for every question.

**Current Behavior:**
- Skipped questions are marked incorrect
- Quiz cycles back to allow answering skipped questions
- If all remain skipped, quiz ends with 0% score

**Handling:** Working as designed. Users can skip and return.

---

### 3. Browser Refresh During Quiz

**Scenario:** User refreshes page mid-quiz.

**Current Behavior:**
- All quiz progress is lost
- Timer resets
- Questions re-shuffle

**Note:** No quiz state persistence exists. This is by design (prevents cheating by refreshing for new shuffle).

---

### 4. Network Failure Loading Images

**Scenario:** Question images fail to load.

**Current Behavior:**
- Broken image icon displayed
- Question still answerable (if text is sufficient)

**Recommended Handling:**
- Add `onError` handler to show placeholder
- Consider preloading images before quiz starts

---

### 5. Very Long Free Response Answers

**Scenario:** User types extremely long answer in free response.

**Current Behavior:**
- No character limit
- Long text may overflow in results display

**Recommended Limit:** Consider 2000 character max.

---

### 6. Special Characters in Answers

**Scenario:** User includes special characters, emojis, or Unicode.

**Current Behavior:**
- Stored and displayed as-is
- No sanitization

**Security Note:** Since answers are only stored in localStorage and displayed back to the user, XSS is not a concern.

---

## Preset Edge Cases

### 1. Preset References Deleted Questions

**Scenario:** Preset contains questionIds that no longer exist in the question bank.

**Current Behavior (when loading preset):**
- Missing questions are silently skipped
- If ALL questions are missing, quiz starts with empty set

**Recommended Enhancement:**
- Show warning: "X of Y questions no longer exist"
- Offer to update the preset

---

### 2. Preset Import Validation

**Scenario:** User imports a preset JSON file.

**Current Behavior:**
- Validates all questionIds exist in current dataset
- Shows specific error if none exist
- Shows specific error if some are missing

**Handling:** Working as designed with clear error messages.

---

### 3. Duplicate Preset Names

**Scenario:** User creates two presets with the same name.

**Current Behavior:**
- Allowed (IDs are unique, names are not)
- Could confuse users

**Recommended:** Add warning but allow duplicates (user might want "Version 1", "Version 2").

---

## Custom Units Edge Cases

### 1. Importing Malformed .ts File

**Scenario:** User uploads a .ts file that doesn't match expected format.

**Current Behavior:**
- `parseTopicFile()` returns null
- Toast error: "Failed to parse topic file"

**Handling:** Working as designed.

---

### 2. Very Large Custom Topic

**Scenario:** User creates topic with hundreds of questions.

**Current Behavior:**
- Works but may hit localStorage limits (~5-10MB total)
- No warning when approaching limits

**Recommended:**
- Track storage usage
- Warn when > 80% capacity
- Suggest exporting and clearing old data

---

### 3. Images in Custom Topics

**Scenario:** User adds questions with embedded base64 images.

**Current Behavior:**
- Images stored as base64 data URLs in localStorage
- Dramatically increases storage usage
- Can quickly hit storage limits

**Recommended:**
- Warn about storage impact
- Consider image compression
- Offer cloud storage alternative

---

### 4. Deleting Unit with Active Quiz

**Scenario:** User deletes a custom unit while a quiz from that unit is in progress.

**Current Behavior:**
- Quiz continues (questions already loaded in memory)
- Results can be saved
- Wrong answers reference non-existent unit

**Note:** Edge case unlikely in practice.

---

## Results Page Edge Cases

### 1. Direct Navigation to Results

**Scenario:** User directly navigates to `/results` without completing a quiz.

**Current Behavior:**
- Redirects to home (`navigate('/')`)
- No error shown

**Handling:** Working as designed.

---

### 2. Results with Zero Questions

**Scenario:** Quiz completed with no questions (empty quiz).

**Current Behavior:**
- Division by zero in percentage calculation
- Shows "NaN%" or crashes

**Recommended Fix:**
```typescript
const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
```

---

## Navigation Edge Cases

### 1. Invalid Route Parameters

**Scenario:** User navigates to `/unit/fakesub/fakeunit`

**Current Behavior:**
- Page loads but with no questions
- Shows empty state

**Recommended:**
- Check if subject/unit exists
- Show 404 or redirect to category

---

### 2. Back Button After Quiz Complete

**Scenario:** User presses browser back after seeing results.

**Current Behavior:**
- Returns to previous page
- If that was the quiz, may show empty/broken state

**Handling:** Consider using `replace` instead of `navigate` for results redirect.

---

## Performance Edge Cases

### 1. Very Large Question Bank

**Scenario:** A single topic has 500+ questions.

**Current Behavior:**
- All questions loaded into memory
- Shuffling is O(n) but fast
- "View All Questions" renders all at once

**Recommended:**
- Add pagination to "View All Questions"
- Consider lazy loading for very large sets

---

### 2. Many Imported Question Sets

**Scenario:** User imports 20+ question sets into Course Challenge.

**Current Behavior:**
- All loaded on page mount
- May cause slow initial load

**Recommended:** Lazy load imported sets.

---

## Data Corruption Scenarios

### 1. LocalStorage Manually Edited

**Scenario:** User or browser extension modifies localStorage.

**Current Behavior:**
- JSON.parse may throw
- Caught in try/catch, defaults to empty state
- Console error logged

**Handling:** Graceful degradation works.

---

### 2. Storage Quota Exceeded

**Scenario:** localStorage is full.

**Current Behavior:**
- `setItem` throws QuotaExceededError
- Not caught in current code
- Subsequent saves fail silently

**Recommended Fix:**
```typescript
try {
  localStorage.setItem(key, value);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    toast.error('Storage full. Please export and clear some data.');
  }
}
```

---

### 3. Concurrent Tab Updates

**Scenario:** User has app open in two tabs, makes changes in both.

**Current Behavior:**
- Each tab has its own React state
- Both write to same localStorage keys
- Last write wins
- No conflict resolution

**Mitigation:** Accept this limitation. Users rarely use multiple tabs.

---

## How to Handle Issues Going Forward

### General Principles

1. **Fail gracefully:** Always catch errors and provide fallback behavior
2. **Inform the user:** Show clear error messages, not silent failures
3. **Preserve data:** Never delete user data without explicit confirmation
4. **Log for debugging:** Console.log errors with context

### Adding New Features

When adding features, consider:
- What if the data doesn't exist yet?
- What if the data is malformed?
- What if the user cancels mid-action?
- What if localStorage is full?
- What if the network is down?

### Testing Checklist

- [ ] Test with empty data
- [ ] Test with maximum data (fill localStorage)
- [ ] Test with invalid data (manually corrupt localStorage)
- [ ] Test browser refresh at each step
- [ ] Test in private/incognito mode
- [ ] Test on mobile devices
