// Unit Notes Storage
// This file stores all notes and study guides for each unit
//
// HOW TO ADD NOTES:
// 1. Find the unit key (format: "subject-unitId", e.g., "precalc-polynomial")
// 2. Add note objects to the array for that unit
//
// NOTE FORMAT:
// {
//   title: "Section Title",
//   content: "Your notes content here. Use \\n for new lines."
// }
//
// You can use math notation in the content:
// - Use x^2 for exponents (renders as x²)
// - Use sqrt(x) for square roots
// - Use (a+b)/(c+d) for fractions
// - Use lim_x-->a for limits
// - Use infinity or ∞ for infinity symbol

export interface UnitNote {
  title: string;
  content: string;
}

export interface UnitNotesMap {
  [unitKey: string]: UnitNote[];
}

export const unitNotes: UnitNotesMap = {
  // AP Precalculus
  "precalc-polynomial": [
    // Example:
    // {
    //   title: "Polynomial Basics",
    //   content: "A polynomial is an expression of the form:\n\nf(x) = a_n*x^n + a_{n-1}*x^{n-1} + ... + a_1*x + a_0\n\nKey Terms:\n- Degree: The highest power of x\n- Leading coefficient: The coefficient of the highest degree term\n- Constant term: The term without x (a_0)"
    // },
  ],
  "precalc-rational": [],
  "precalc-exponential": [],
  "precalc-logarithmic": [],
  "precalc-trigonometric": [],
  "precalc-polar": [],
  "precalc-parametric": [],
  "precalc-vectorsMatrices": [],

  // Biology (Valenti)
  "biology-biochemistry": [],
  "biology-cellstructure": [],
  "biology-cellenergetics": [],
  "biology-cellgrowth": [],
  "biology-genetics": [],
  "biology-molecular": [],
  "biology-evolution": [],
  "biology-ecology": [],

  // Chemistry (Massarotti)
  "chemistry-metric": [],
  "chemistry-atomic": [],
  "chemistry-compounds": [],
  "chemistry-gases": [],
  "chemistry-solutions": [],
  "chemistry-reactions": [],
  "chemistry-stoichiometry": [],
  "chemistry-acidbases": [],

  // Chemistry (Darone)
  "chemistryDarone-metric": [],
  "chemistryDarone-atomic": [],
  "chemistryDarone-compounds": [],
  "chemistryDarone-gases": [],
  "chemistryDarone-solutions": [],
  "chemistryDarone-reactions": [],
  "chemistryDarone-stoichiometry": [],
  "chemistryDarone-acidbases": [],

  // World History
  "world-history-religions": [],
  "world-history-islam": [],
  "world-history-renaissance": [],
  "world-history-protestant": [],
  "world-history-unit5": [],
  "world-history-unit6": [],
  "world-history-unit7": [],
  "world-history-unit8": [],
  "world-history-unit9": [],
  "world-history-unit10": [],
  "world-history-unit11": [],

  // Memory
  "memory-general": [],
  "memory-general2": [],
  "memory-general3": [],

  // Practice
  "practice-unit1": [],
  "practice-gases": [],
  "practice-log": [],
};

export default unitNotes;