/**
 * TEST SCHEDULE CONFIGURATION
 * 
 * This file controls when real test data is visible vs fake data.
 * 
 * HOW IT WORKS:
 * - Each entry maps a question key (used in Quiz.tsx) to a test date
 * - From the testDate until August 31 of the NEXT year: REAL data is shown
 * - After August 31: FAKE data is shown until (testDate + 7 days) next year
 * - This ensures tests are only available AFTER they've been taken + 7 day buffer
 * 
 * HOW TO ADD A NEW TEST:
 * 1. Add an entry below with the format:
 *    'subject-topic': { testDate: 'YYYY-MM-DD', hasFakeData: true }
 * 
 * 2. Create the fake data file at:
 *    src/data/fake/[subject]/[topic]-questions.ts
 * 
 * 3. The file should export the same variable name as the real file
 *    but with different (fake) questions
 * 
 * EXAMPLE:
 * 'chemistry-atomic': { testDate: '2025-01-15', hasFakeData: true }
 * - Real data shows from Jan 15, 2025 to Aug 31, 2026
 * - Fake data shows from Sep 1, 2026 to Jan 21, 2027 (testDate + 7 days)
 * - Then real data shows again from Jan 22, 2027 to Aug 31, 2028
 * - And so on...
 */

export interface TestSchedule {
  testDate: string; // Format: 'YYYY-MM-DD'
  hasFakeData: boolean; // Whether fake data file exists
}

export const testScheduleConfig: Record<string, TestSchedule> = {
  // ============================================
  // CHEMISTRY TESTS
  // ============================================
  // 'chemistry-atomic': { testDate: '2025-01-20', hasFakeData: true },
  // 'chemistry-compounds': { testDate: '2025-02-10', hasFakeData: true },
  // 'chemistry-metric': { testDate: '2025-01-10', hasFakeData: true },
  
  // ============================================
  // BIOLOGY TESTS
  // ============================================
  // 'biology-biochemistry': { testDate: '2025-01-25', hasFakeData: true },
  // 'biology-cellstructure': { testDate: '2025-02-05', hasFakeData: true },
  
  // ============================================
  // AP PRECALC TESTS
  // ============================================
  // 'apprecalc-polynomial': { testDate: '2025-01-18', hasFakeData: true },
  // 'apprecalc-exponential': { testDate: '2025-02-01', hasFakeData: true },
  
  // ============================================
  // WORLD HISTORY TESTS
  // ============================================
  // 'worldhistory-renaissance': { testDate: '2025-01-22', hasFakeData: true },
  
  // ============================================
  // ADD YOUR TESTS BELOW
  // Uncomment and modify the examples above, or add new entries
  // ============================================
};

/**
 * Check if real data should be shown based on the test schedule
 * 
 * @param questionKey - The key used in questionMap (e.g., 'chemistry-atomic')
 * @returns true if real data should be shown, false if fake data should be used
 */
export const shouldShowRealData = (questionKey: string): boolean => {
  const schedule = testScheduleConfig[questionKey];
  
  // If no schedule exists, always show real data
  if (!schedule || !schedule.hasFakeData) {
    return true;
  }
  
  const today = new Date();
  const testDate = new Date(schedule.testDate);
  
  // Get the year of the test
  const testYear = testDate.getFullYear();
  const testMonth = testDate.getMonth(); // 0-indexed
  const testDay = testDate.getDate();
  
  // Calculate the "cycle year" - which academic cycle are we in?
  // A cycle runs from (testDate) to (August 31 of next year)
  // Then locks until (testDate + 7 days) of the following year
  
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // Determine which cycle we're in relative to the original test date
  // Cycle 0: testDate to Aug 31 of testYear+1
  // Cycle 1: testDate+7 of testYear+1 to Aug 31 of testYear+2
  // etc.
  
  let cycleYear = testYear;
  
  // Find the current cycle
  while (true) {
    // Start of this cycle: testDate (or testDate + 7 days for subsequent cycles)
    const cycleStart = new Date(cycleYear, testMonth, testDay + (cycleYear > testYear ? 7 : 0));
    
    // End of this cycle: August 31 of the next year
    const cycleEnd = new Date(cycleYear + 1, 7, 31, 23, 59, 59); // August is month 7 (0-indexed)
    
    // Start of next cycle
    const nextCycleStart = new Date(cycleYear + 1, testMonth, testDay + 7);
    
    // Check if today is within this cycle (show real data)
    if (today >= cycleStart && today <= cycleEnd) {
      return true;
    }
    
    // Check if today is in the "locked" period (after Aug 31 but before next cycle)
    if (today > cycleEnd && today < nextCycleStart) {
      return false;
    }
    
    // Move to next cycle
    cycleYear++;
    
    // Safety check to prevent infinite loop
    if (cycleYear > currentYear + 10) {
      console.warn('Test schedule calculation exceeded 10 years, defaulting to real data');
      return true;
    }
  }
};

/**
 * Get the next date when real data will be available
 * Useful for showing users when the test will unlock
 */
export const getNextUnlockDate = (questionKey: string): Date | null => {
  const schedule = testScheduleConfig[questionKey];
  
  if (!schedule || !schedule.hasFakeData) {
    return null;
  }
  
  const today = new Date();
  const testDate = new Date(schedule.testDate);
  const testYear = testDate.getFullYear();
  const testMonth = testDate.getMonth();
  const testDay = testDate.getDate();
  
  let cycleYear = testYear;
  
  while (cycleYear <= today.getFullYear() + 2) {
    const cycleStart = new Date(cycleYear, testMonth, testDay + (cycleYear > testYear ? 7 : 0));
    
    if (cycleStart > today) {
      return cycleStart;
    }
    
    cycleYear++;
  }
  
  return null;
};

/**
 * Get the date when real data will lock (switch to fake)
 */
export const getNextLockDate = (questionKey: string): Date | null => {
  const schedule = testScheduleConfig[questionKey];
  
  if (!schedule || !schedule.hasFakeData) {
    return null;
  }
  
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Check this year's August 31
  let lockDate = new Date(currentYear, 7, 31);
  
  if (lockDate > today) {
    return lockDate;
  }
  
  // Otherwise, next year's August 31
  return new Date(currentYear + 1, 7, 31);
};
