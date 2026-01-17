/**
 * CENTRALIZED QUESTION LOADER
 * 
 * This utility provides questions with date-based fake/real data switching.
 * ALL places that load questions should use this instead of importing directly.
 * 
 * This ensures consistent behavior across:
 * - Quiz.tsx (taking quizzes)
 * - ViewAllQuestions.tsx (viewing all questions)
 * - CourseChallengePresetBuilder.tsx (building custom practice)
 * - CourseChallenge.tsx (cram mode)
 * - Download/Export functionality
 */

import { Question } from '@/types/quiz';
import { shouldShowRealData, testScheduleConfig, getNextUnlockDate } from '@/data/test-schedule-config';

// ============================================
// REAL DATA IMPORTS
// ============================================
// AP Precalc
import { polynomialQuestions } from '@/data/apprecalc/polynomial-questions';
import { rationalQuestions } from '@/data/apprecalc/rational-questions';
import { exponentialQuestions } from '@/data/apprecalc/exponential-questions';
import { logarithmicQuestions } from '@/data/apprecalc/logarithmic-questions';
import { trigonometricQuestions } from '@/data/apprecalc/trigonometric-questions';
import { polarQuestions } from '@/data/apprecalc/polar-questions';
import { parametricQuestions } from '@/data/apprecalc/parametric-questions';
import { vectorsMatricesQuestions } from '@/data/apprecalc/vectorsMatrices-questions';
// Biology
import { biochemistryQuestions } from '@/data/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/biology/genetics-questions';
import { molecularQuestions } from '@/data/biology/molecular-questions';
import { evolutionQuestions } from '@/data/biology/evolution-questions';
import { ecologyQuestions } from '@/data/biology/ecology-questions';
// Chemistry
import { metricQuestions } from '@/data/chemistry/metric-questions';
import { atomicQuestions } from '@/data/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/chemistry/acidbases-questions';
// Chemistry Darone
import { metricDQuestions } from '@/data/chemistryDarone/metricD-questions';
import { atomicDQuestions } from '@/data/chemistryDarone/atomicD-questions';
import { compoundsDQuestions } from '@/data/chemistryDarone/compoundsD-questions';
import { gasesDQuestions } from '@/data/chemistryDarone/gasesD-questions';
import { solutionsDQuestions } from '@/data/chemistryDarone/solutionsD-questions';
import { reactionsDQuestions } from '@/data/chemistryDarone/reactionsD-questions';
import { stoichiometryDQuestions } from '@/data/chemistryDarone/stoichiometryD-questions';
import { acidbasesDQuestions } from '@/data/chemistryDarone/acidbasesD-questions';
// World History
import { religionsQuestions } from '@/data/worldhistory/religions-questions';
import { islamQuestions } from '@/data/worldhistory/islam-questions';
import { renaissanceQuestions } from '@/data/worldhistory/renaissance-questions';
import { protestantQuestions } from '@/data/worldhistory/protestant-questions';
import { worldHistoryUnit5Questions } from '@/data/worldhistory/world-history-unit5';
import { worldHistoryUnit6Questions } from '@/data/worldhistory/world-history-unit6';
import { worldHistoryUnit7Questions } from '@/data/worldhistory/world-history-unit7';
import { worldHistoryUnit8Questions } from '@/data/worldhistory/world-history-unit8';
import { worldHistoryUnit9Questions } from '@/data/worldhistory/world-history-unit9';
import { worldHistoryUnit10Questions } from '@/data/worldhistory/world-history-unit10';
import { worldHistoryUnit11Questions } from '@/data/worldhistory/world-history-unit11';
// Memory
import { generalQuestions } from '@/data/memory/general-questions';
import { general2Questions } from '@/data/memory/general2-questions';
import { general3Questions } from '@/data/memory/general3-questions';
// Practice
import { unit1Questions } from '@/data/practice/unit1-questions';
// Stock
import { basicsQuestions } from '@/data/stock/basics-questions';

// ============================================
// FAKE DATA IMPORTS
// Add imports for fake data files here as you create them
// ============================================
import { atomicQuestions as fakeAtomicQuestions } from '@/data/fake/chemistry/atomic-questions';
// import { compoundsQuestions as fakeCompoundsQuestions } from '@/data/fake/chemistry/compounds-questions';
// Add more fake data imports as needed...

/**
 * Map of question keys to their REAL data
 */
const realDataMap: Record<string, Question[]> = {
  'precalc-polynomial': polynomialQuestions,
  'precalc-rational': rationalQuestions,
  'precalc-exponential': exponentialQuestions,
  'precalc-logarithmic': logarithmicQuestions,
  'precalc-trigonometric': trigonometricQuestions,
  'precalc-polar': polarQuestions,
  'precalc-parametric': parametricQuestions,
  'precalc-vectorsMatrices': vectorsMatricesQuestions,
  'biology-biochemistry': biochemistryQuestions,
  'biology-cellstructure': cellstructureQuestions,
  'biology-cellenergetics': cellenergeticsQuestions,
  'biology-cellgrowth': cellgrowthQuestions,
  'biology-genetics': geneticsQuestions,
  'biology-molecular': molecularQuestions,
  'biology-evolution': evolutionQuestions,
  'biology-ecology': ecologyQuestions,
  'chemistry-metric': metricQuestions,
  'chemistry-atomic': atomicQuestions,
  'chemistry-compounds': compoundsQuestions,
  'chemistry-gases': gasesQuestions,
  'chemistry-solutions': solutionsQuestions,
  'chemistry-reactions': reactionsQuestions,
  'chemistry-stoichiometry': stoichiometryQuestions,
  'chemistry-acidbases': acidbasesQuestions,
  'chemistryDarone-metric': metricDQuestions,
  'chemistryDarone-atomic': atomicDQuestions,
  'chemistryDarone-compounds': compoundsDQuestions,
  'chemistryDarone-gases': gasesDQuestions,
  'chemistryDarone-solutions': solutionsDQuestions,
  'chemistryDarone-reactions': reactionsDQuestions,
  'chemistryDarone-stoichiometry': stoichiometryDQuestions,
  'chemistryDarone-acidbases': acidbasesDQuestions,
  'world-history-religions': religionsQuestions,
  'world-history-islam': islamQuestions,
  'world-history-renaissance': renaissanceQuestions,
  'world-history-protestant': protestantQuestions,
  'world-history-unit5': worldHistoryUnit5Questions,
  'world-history-unit6': worldHistoryUnit6Questions,
  'world-history-unit7': worldHistoryUnit7Questions,
  'world-history-unit8': worldHistoryUnit8Questions,
  'world-history-unit9': worldHistoryUnit9Questions,
  'world-history-unit10': worldHistoryUnit10Questions,
  'world-history-unit11': worldHistoryUnit11Questions,
  'memory-general': generalQuestions,
  'memory-general2': general2Questions,
  'memory-general3': general3Questions,
  'practice-unit1': unit1Questions,
  'stock-basics': basicsQuestions,
};

/**
 * Map of question keys to their FAKE data (add entries as you create fake data files)
 */
const fakeDataMap: Record<string, Question[]> = {
  'chemistry-atomic': fakeAtomicQuestions,
  // 'chemistry-compounds': fakeCompoundsQuestions,
  // Add more mappings as you create fake data files...
};

/**
 * Get questions for a specific topic with date-based fake/real switching
 * 
 * @param questionKey - The key like 'chemistry-atomic', 'precalc-polynomial', etc.
 * @returns The appropriate questions (real or fake based on date)
 */
export const getQuestions = (questionKey: string): Question[] => {
  const realQuestions = realDataMap[questionKey];
  
  if (!realQuestions) {
    return [];
  }
  
  // Check if this topic has a schedule and fake data
  const schedule = testScheduleConfig[questionKey];
  
  if (!schedule || !schedule.hasFakeData) {
    // No schedule or no fake data - always use real data
    return realQuestions;
  }
  
  // Check if we should show real data based on the date
  if (shouldShowRealData(questionKey)) {
    return realQuestions;
  }
  
  // Show fake data if available
  const fakeQuestions = fakeDataMap[questionKey];
  if (fakeQuestions && fakeQuestions.length > 0) {
    console.log(`[Test Schedule] Using practice data for ${questionKey}`);
    return fakeQuestions;
  }
  
  // Fallback to real data if fake data not found
  console.warn(`[Test Schedule] Fake data configured but not found for ${questionKey}`);
  return realQuestions;
};

/**
 * Get a complete question map with all topics, applying date-based switching
 * Use this for components that need all questions at once
 */
export const getQuestionMap = (): Record<string, Question[]> => {
  const result: Record<string, Question[]> = {};
  
  for (const key of Object.keys(realDataMap)) {
    result[key] = getQuestions(key);
  }
  
  return result;
};

/**
 * Check if a topic is currently showing fake data (locked)
 */
export const isTopicLocked = (questionKey: string): boolean => {
  const schedule = testScheduleConfig[questionKey];
  
  if (!schedule || !schedule.hasFakeData) {
    return false;
  }
  
  return !shouldShowRealData(questionKey);
};

/**
 * Get information about the topic's lock status
 */
export const getTopicLockInfo = (questionKey: string): { 
  isLocked: boolean; 
  unlockDate: Date | null;
  hasFakeData: boolean;
} => {
  const schedule = testScheduleConfig[questionKey];
  
  if (!schedule || !schedule.hasFakeData) {
    return { isLocked: false, unlockDate: null, hasFakeData: false };
  }
  
  const isLocked = !shouldShowRealData(questionKey);
  const unlockDate = isLocked ? getNextUnlockDate(questionKey) : null;
  
  return { isLocked, unlockDate, hasFakeData: true };
};

// Export the maps for direct access if needed
export { realDataMap, fakeDataMap };
