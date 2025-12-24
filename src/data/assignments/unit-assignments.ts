import { UnitContent } from '@/types/quiz';

// Unit assignments configuration
// To add a new assignment:
// 1. Add an entry here with the key format: "subject-unitId"
// 2. Each assignment needs an id, name, and optional notes
// 3. Add the corresponding questions in assignment-questions.ts

export const unitAssignments: Record<string, UnitContent> = {
  // Example format - add your assignments here:
  // 'precalc-polynomial': {
  //   assignments: [
  //     { id: 'hw1', name: 'Homework 1: Polynomial Basics', notes: 'Focus on degree and end behavior' },
  //     { id: 'hw2', name: 'Homework 2: Graphing Polynomials', notes: 'Practice identifying zeros and multiplicity' },
  //   ],
  // },
};