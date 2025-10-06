/**
 * STUDY RESOURCES CONFIGURATION
 * 
 * HOW TO ADD LINKS TO A SPECIFIC UNIT:
 * 1. Find the subject and unit combination (e.g., 'precalc-polynomial')
 * 2. Add an array of resource objects with 'title' and 'url'
 * 3. You can add as many links as you want
 * 
 * HOW TO ADD LINKS TO COURSE CHALLENGES:
 * 1. Find the subject (e.g., 'precalc')
 * 2. Add to the 'courseChallenge' object with the same structure
 * 3. You can add as many links as you want
 * 
 * EXAMPLE FORMAT:
 * 'subject-unitId': [
 *   { title: 'Link Name', url: 'https://example.com' },
 *   { title: 'Another Link', url: 'https://another-example.com' },
 * ]
 */

export interface StudyResource {
  title: string;
  url: string;
}

// UNIT-SPECIFIC STUDY RESOURCES
// Format: 'subject-unitId'
export const unitStudyResources: Record<string, StudyResource[]> = {
  // AP Precalculus Units - Example with filler links
  'precalc-polynomial': [
    { title: 'Khan Academy - Polynomials', url: 'https://www.khanacademy.org/math/algebra2/polynomial-functions' },
    { title: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu/classes/alg/polynomials.aspx' },
  ],
  'precalc-rational': [
    { title: 'Khan Academy - Rational Functions', url: 'https://www.khanacademy.org/math/precalculus/rational-functions' },
  ],
  'precalc-exponential': [
    { title: 'Khan Academy - Exponential Functions', url: 'https://www.khanacademy.org/math/algebra2/exponential-and-logarithmic-functions' },
  ],
  'precalc-logarithmic': [
    { title: 'Khan Academy - Logarithms', url: 'https://www.khanacademy.org/math/algebra2/exponential-and-logarithmic-functions' },
  ],
  'precalc-trigonometric': [
    { title: 'Khan Academy - Trigonometry', url: 'https://www.khanacademy.org/math/trigonometry' },
  ],
  'precalc-polar': [],
  'precalc-parametric': [],
  'precalc-vectorsMatrices': [],

  // Biology Units - Add your own links here
  'biology-biochemistry': [],
  'biology-cellstructure': [],
  'biology-cellenergetics': [],
  'biology-cellgrowth': [],
  'biology-genetics': [],
  'biology-molecular': [],
  'biology-evolution': [],
  'biology-ecology': [],

  // AP Biology Units - Add your own links here
  'apbio-biochemistry': [],
  'apbio-cellstructure': [],
  'apbio-cellenergetics': [],
  'apbio-cellgrowth': [],
  'apbio-genetics': [],
  'apbio-molecular': [],
  'apbio-evolution': [],
  'apbio-ecology': [],

  // Chemistry Units - Add your own links here
  'chemistry-metric': [],
  'chemistry-atomic': [],
  'chemistry-compounds': [],
  'chemistry-gases': [],
  'chemistry-solutions': [],
  'chemistry-reactions': [],
  'chemistry-stoichiometry': [],
  'chemistry-acidbases': [],

  // AP Chemistry Units - Add your own links here
  'apchem-metric': [],
  'apchem-atomic': [],
  'apchem-compounds': [],
  'apchem-gases': [],
  'apchem-solutions': [],
  'apchem-reactions': [],
  'apchem-stoichiometry': [],
  'apchem-acidbases': [],

  // World History Units - Add your own links here
  'world-history-religions': [],
  'world-history-unit2': [],
  'world-history-unit3': [],
  'world-history-unit4': [],
  'world-history-unit5': [],
  'world-history-unit6': [],
  'world-history-unit7': [],
  'world-history-unit8': [],
  'world-history-unit9': [],
  'world-history-unit10': [],
  'world-history-unit11': [],

  // World History Kohl Units - Add your own links here
  'world-history-kohl-prehistory': [],
  'world-history-kohl-unit2': [],
  'world-history-kohl-unit3': [],
  'world-history-kohl-unit4': [],
  'world-history-kohl-unit5': [],
  'world-history-kohl-unit6': [],
  'world-history-kohl-unit7': [],
  'world-history-kohl-unit8': [],
  'world-history-kohl-unit9': [],
  'world-history-kohl-unit10': [],
  'world-history-kohl-unit11': [],
  'world-history-kohl-unit12': [],
  'world-history-kohl-unit13': [],
  'world-history-kohl-unit14': [],

  // APUSH Units - Add your own links here
  'apush-period1': [],
  'apush-period2': [],
  'apush-period3': [],
  'apush-period4': [],
  'apush-period5': [],
  'apush-period6': [],
  'apush-period7': [],
  'apush-period8': [],
  'apush-period9': [],

  // Add more units as needed...
};

// COURSE CHALLENGE STUDY RESOURCES
// Format: 'subject'
export const courseChallengeResources: Record<string, StudyResource[]> = {
  // Example with filler links
  'precalc': [
    { title: 'AP Precalculus Course Overview', url: 'https://apstudents.collegeboard.org/courses/ap-precalculus' },
    { title: 'College Board Practice Questions', url: 'https://apcentral.collegeboard.org/courses/ap-precalculus' },
  ],
  'biology': [
    { title: 'Biology Study Guide', url: 'https://www.khanacademy.org/science/biology' },
  ],
  'apbio': [],
  'chemistry': [],
  'apchem': [],
  'world-history': [],
  'world-history-kohl': [],
  'apush': [],
  
  // Add more subjects as needed...
};
