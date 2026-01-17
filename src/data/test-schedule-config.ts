/**
 * TEST SCHEDULE CONFIGURATION
 * 
 * This file controls when real test data is visible vs fake data.
 * 
 * HOW IT WORKS:
 * - Each entry maps a question key (e.g., 'chemistry-atomic') to a test date
 * - BEFORE testDate: FAKE data is shown (test hasn't happened yet)
 * - FROM testDate to August 31 of NEXT year: REAL data is shown
 * - AFTER August 31: FAKE data is shown until (testDate + 7 days) of next year
 * - This ensures tests are only available AFTER they've been taken
 * - The +7 day buffer after each year's test date ensures academic honesty
 * 
 * EXAMPLE (testDate: '2026-01-25'):
 * - Before Jan 25, 2026: FAKE data (test hasn't happened)
 * - Jan 25, 2026 to Aug 31, 2027: REAL data (test taken, studying period)
 * - Sept 1, 2027 to Feb 1, 2027: FAKE data (locked for next year's test)
 * - Feb 1, 2027 onwards: REAL data (next cycle)
 * 
 * HOW TO ADD A NEW TEST:
 * 1. Add an entry below with the format:
 *    'subject-topic': { testDate: 'YYYY-MM-DD', hasFakeData: true }
 * 
 * 2. Create the fake data file at:
 *    src/data/fake/[subject]/[topic]-questions.ts
 * 
 * 3. Import the fake data in src/utils/questionLoader.ts and add to fakeDataMap
 */

export interface TestSchedule {
  testDate: string; // Format: 'YYYY-MM-DD'
  hasFakeData: boolean; // Whether fake data file exists
}

export const testScheduleConfig: Record<string, TestSchedule> = {
  // ============================================
  // CHEMISTRY TESTS
  // ============================================
  // FOR TESTING: testDate is Jan 25, 2026. Current date is Jan 17, 2026.
  // Since we are BEFORE the testDate, FAKE data should show now!
  'chemistry-atomic': { testDate: '2026-01-10', hasFakeData: true },
  // 'chemistry-compounds': { testDate: '2026-02-10', hasFakeData: true },
  // 'chemistry-metric': { testDate: '2026-01-10', hasFakeData: true },
  
  // ============================================
  // BIOLOGY TESTS
  // ============================================
  // 'biology-biochemistry': { testDate: '2026-01-25', hasFakeData: true },
  // 'biology-cellstructure': { testDate: '2026-02-05', hasFakeData: true },
  
  // ============================================
  // AP PRECALC TESTS
  // ============================================
  // 'precalc-polynomial': { testDate: '2026-01-18', hasFakeData: true },
  // 'precalc-exponential': { testDate: '2026-02-01', hasFakeData: true },
  
  // ============================================
  // WORLD HISTORY TESTS
  // ============================================
  // 'world-history-renaissance': { testDate: '2026-01-22', hasFakeData: true },
  
  // ============================================
  // ADD YOUR TESTS BELOW
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
  
  // BEFORE testDate: show FAKE data
  if (today < testDate) {
    return false;
  }
  
  // Get the year of the test
  const testYear = testDate.getFullYear();
  const testMonth = testDate.getMonth(); // 0-indexed
  const testDay = testDate.getDate();
  
  const currentYear = today.getFullYear();
  
  // Find which cycle we're in
  let cycleYear = testYear;
  
  while (true) {
    // Start of this cycle: testDate (or testDate + 7 days for subsequent cycles)
    const isFirstCycle = cycleYear === testYear;
    const cycleStart = new Date(cycleYear, testMonth, testDay + (isFirstCycle ? 0 : 7));
    
    // End of this cycle: August 31 of the next year
    const cycleEnd = new Date(cycleYear + 1, 7, 31, 23, 59, 59); // August is month 7 (0-indexed)
    
    // Start of next cycle: testDate + 7 days of next year
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
  
  // If we're before the test date, the test date is the unlock date
  if (today < testDate) {
    return testDate;
  }
  
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
  const testDate = new Date(schedule.testDate);
  
  // If we're before the test date, there's no lock date yet
  if (today < testDate) {
    return null;
  }
  
  const currentYear = today.getFullYear();
  
  // Check this year's August 31
  let lockDate = new Date(currentYear, 7, 31);
  
  if (lockDate > today) {
    return lockDate;
  }
  
  // Otherwise, next year's August 31
  return new Date(currentYear + 1, 7, 31);
};
