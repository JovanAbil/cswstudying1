import { Question } from '@/types/quiz';

export const gasesQuestions: Question[] = [
  {
    id: 'fake-gases-1',
    type: 'free-response',
    question: 'List the four conditions for the most "ideal" gas.',
    correctAnswer: 'High temperature, low pressure, small particle size, weak intermolecular forces',
    explanation: 'Ideal gas behavior is favored when particles are far apart and moving quickly.'
  },
  {
    id: 'fake-gases-2',
    type: 'free-response',
    question: 'List the five assumptions made about ideal gases.',
    correctAnswer: 'Particles have no volume, no intermolecular forces, move randomly, undergo elastic collisions, and average kinetic energy depends only on temperature',
    explanation: 'These assumptions define the ideal gas model.'
  },
  {
    id: 'fake-gases-3',
    type: 'free-response',
    question: 'Do ideal gases have mass?',
    correctAnswer: 'Yes',
    explanation: 'Gas particles still have mass even in the ideal model.'
  },
  {
    id: 'fake-gases-4',
    type: 'multiple-choice',
    question: 'Predict which gas will behave most ideally.',
    options: [
      { label: 'A', value: 'A', text: 'He at -200°C' },
      { label: 'B', value: 'B', text: 'He at 850°C' },
      { label: 'C', value: 'C', text: 'Kr at -200°C' },
      { label: 'D', value: 'D', text: 'Kr at 850°C' }
    ],
    correctAnswer: 'B',
    explanation: 'Smaller gases at higher temperatures behave most ideally.'
  },
  {
    id: 'fake-gases-5',
    type: 'free-response',
    question: 'A compound contains 28.03% sodium, 29.29% sulfur, and oxygen. What is the empirical formula?',
    correctAnswer: 'Na2S2O3',
    explanation: 'Convert percentages to moles and find simplest ratio.'
  },
  {
    id: 'fake-gases-6',
    type: 'free-response',
    question: 'A noble gas has a volume of 82.3 L, pressure of 0.55 atm, temperature of 28°C, and mass of 185.6 g. Identify the gas.',
    correctAnswer: '83.9 g/mol; Krypton',
    explanation: 'Use the Ideal Gas Law to find molar mass.'
  },
  {
    id: 'fake-gases-7',
    type: 'free-response',
    question: 'An unknown gas is collected over water at 22°C with a volume of 145 mL and pressure of 748.2 torr. Vapor pressure of water is 19.83 torr. If the gas weighs 0.825 g and contains only chlorine and oxygen. Determine its formula.',
    correctAnswer: 'ClO3',
    explanation: 'Correct pressure for water vapor, then use Ideal Gas Law and molar mass.'
  },
  {
    id: 'fake-gases-8',
    type: 'multiple-choice',
    question: 'Calculate the molar mass of iron (III) nitrate - Fe(NO3)3',
    options: [
      { label: 'A', value: 'A', text: '241.86 g/mol' },
      { label: 'B', value: 'B', text: '179.85 g/mol' },
      { label: 'C', value: 'C', text: '125.93 g/mol' },
      { label: 'D', value: 'D', text: '303.78 g/mol' }
    ],
    correctAnswer: 'A',
    explanation: 'Fe = 55.85, N = 14.01 × 3, O = 16.00 × 9.'
  },
  {
    id: 'fake-gases-9',
    type: 'multiple-choice',
    question: 'Calculate the mass of oxygen in 175.0 g of CuSO4.',
    options: [
      { label: 'A', value: 'A', text: '1.10 g' },
      { label: 'B', value: 'B', text: '17.52 g' },
      { label: 'C', value: 'C', text: '70.09 g' },
      { label: 'D', value: 'D', text: '4.38 g' }
    ],
    correctAnswer: 'C',
    explanation: 'Find mass fraction of oxygen in CuSO4 and multiply by 175.0 g.'
  },
  {
    id: 'fake-gases-10',
    type: 'multiple-choice',
    question: 'How many grams of Al2O3 are present in a 1.450 mol sample?',
    options: [
      { label: 'A', value: 'A', text: '147.85 g' },
      { label: 'B', value: 'B', text: '119.42 g' },
      { label: 'C', value: 'C', text: '180.33 g' },
      { label: 'D', value: 'D', text: '111.15 g' }
    ],
    correctAnswer: 'A',
    explanation: 'Al2O3 molar mass = 101.96 g/mol × 1.450 mol = 147.85 g.'
  },
  {
    id: 'fake-gases-11',
    type: 'multiple-choice',
    question: 'How many molecules are in 4.25 mg of caffeine - C8H10N4O2?',
    options: [
      { label: 'A', value: 'A', text: '8.24E24' },
      { label: 'B', value: 'B', text: '1.32E22' },
      { label: 'C', value: 'C', text: '1.32E19' },
      { label: 'D', value: 'D', text: '8.24E18' }
    ],
    correctAnswer: 'C',
    explanation: 'Convert mg to g, divide by molar mass, multiply by Avogadro\'s number.'
  },
  {
    id: 'fake-gases-12',
    type: 'multiple-choice',
    question: 'A metal piston contains 2.5 moles of gas at a constant temperature. If you triple the volume, what would happen to the pressure?',
    options: [
      { label: 'A', value: 'A', text: 'no change' },
      { label: 'B', value: 'B', text: 'cut to one-third' },
      { label: 'C', value: 'C', text: 'triples' },
      { label: 'D', value: 'D', text: 'cut by 1/9' }
    ],
    correctAnswer: 'B',
    explanation: 'By Boyle\'s Law, P₁V₁ = P₂V₂; if V triples, P becomes 1/3.'
  },
  {
    id: 'fake-gases-13',
    type: 'multiple-choice',
    question: 'A sealed flask contains a fixed amount of Neon at a constant volume. Initially, the temperature is 30°C and the pressure is 2.10 atm. What will the pressure be if the flask is cooled to -35°C?',
    options: [
      { label: 'A', value: 'A', text: '0.72 atm' },
      { label: 'B', value: 'B', text: '2.35 atm' },
      { label: 'C', value: 'C', text: '2.55 atm' },
      { label: 'D', value: 'D', text: '1.65 atm' }
    ],
    correctAnswer: 'D',
    explanation: 'Use Gay-Lussac\'s Law with temperatures in Kelvin.'
  },
  {
    id: 'fake-gases-14',
    type: 'multiple-choice',
    question: 'A balloon contains 0.825 moles of Helium at constant temperature and pressure. If the initial volume is 10.8 L, what will be the final volume if 0.275 moles of gas are released?',
    options: [
      { label: 'A', value: 'A', text: '14.52 L' },
      { label: 'B', value: 'B', text: '7.20 L' },
      { label: 'C', value: 'C', text: '3.60 L' },
      { label: 'D', value: 'D', text: '0.05 L' }
    ],
    correctAnswer: 'B',
    explanation: 'n₁/V₁ = n₂/V₂; 0.550 mol × 10.8 L / 0.825 mol = 7.20 L.'
  },
  {
    id: 'fake-gases-15',
    type: 'multiple-choice',
    question: 'A syringe contains a fixed amount of air at constant temperature. The initial volume is 30.0 mL and the pressure is 98.5 kPa. What will the volume become if the pressure is increased to 115.2 kPa?',
    options: [
      { label: 'A', value: 'A', text: '0.0256 L' },
      { label: 'B', value: 'B', text: '0.0351 L' },
      { label: 'C', value: 'C', text: '0.256 L' },
      { label: 'D', value: 'D', text: '0.351 L' }
    ],
    correctAnswer: 'A',
    explanation: 'Use Boyle\'s Law: V₂ = P₁V₁/P₂.'
  },
  {
    id: 'fake-gases-16',
    type: 'multiple-choice',
    question: 'A gas tank contains 1.25 moles of Ne gas and 1.85 moles of Ar gas at 22.5 atm and 40°C. Calculate the volume of the tank.',
    options: [
      { label: 'A', value: 'A', text: '3.55 L' },
      { label: 'B', value: 'B', text: '0.425 L' },
      { label: 'C', value: 'C', text: '2.28 L' },
      { label: 'D', value: 'D', text: '1.45 L' }
    ],
    correctAnswer: 'A',
    explanation: 'Use PV = nRT with total moles.'
  },
  {
    id: 'fake-gases-17',
    type: 'multiple-choice',
    question: 'A can contains 4.85 moles of Ar and 10.15 moles of N2 and has a total pressure of 4.25 atm. What is the partial pressure of the Ar gas?',
    options: [
      { label: 'A', value: 'A', text: '1.85 atm' },
      { label: 'B', value: 'B', text: '1.37 atm' },
      { label: 'C', value: 'C', text: '2.88 atm' },
      { label: 'D', value: 'D', text: '0.62 atm' }
    ],
    correctAnswer: 'B',
    explanation: 'Partial pressure = (mole fraction) × total pressure.'
  },
  {
    id: 'fake-gases-18',
    type: 'multiple-choice',
    question: 'A balloon contains 0.085 moles of air at a volume of 7500 mL and a pressure of 520 mmHg. What is the temperature of the air?',
    options: [
      { label: 'A', value: 'A', text: '385 K' },
      { label: 'B', value: 'B', text: '925 K' },
      { label: 'C', value: 'C', text: '385°C' },
      { label: 'D', value: 'D', text: '652°C' }
    ],
    correctAnswer: 'C',
    explanation: 'Use PV = nRT and solve for T.'
  },
  {
    id: 'fake-gases-19',
    type: 'multiple-choice',
    question: 'Which of the following is NOT an assumption made about ideal gases?',
    options: [
      { label: 'A', value: 'A', text: 'They have no mass' },
      { label: 'B', value: 'B', text: 'They collide only with the walls of the container' },
      { label: 'C', value: 'C', text: 'They have no volume' },
      { label: 'D', value: 'D', text: 'They experience neither attractive nor repulsive forces with other molecules' }
    ],
    correctAnswer: 'A',
    explanation: 'Ideal gases do have mass; they just have no volume and no intermolecular forces.'
  },
  {
    id: 'fake-gases-20',
    type: 'multiple-choice',
    question: 'A scuba tank holds 245 atm of a mixture of helium and oxygen gases. If the mixture is 82% helium (by moles), what is the partial pressure of oxygen?',
    options: [
      { label: 'A', value: 'A', text: '200.90 atm' },
      { label: 'B', value: 'B', text: '44.10 atm' },
      { label: 'C', value: 'C', text: '82.0 atm' },
      { label: 'D', value: 'D', text: '18.0 atm' }
    ],
    correctAnswer: 'B',
    explanation: 'Oxygen is 18% of the mixture, so partial pressure = 0.18 × 245 atm.'
  },
  {
    id: 'fake-gases-21',
    type: 'multiple-choice',
    question: 'What is the percent by mass of oxygen in H2SO4?',
    options: [
      { label: 'A', value: 'A', text: '65.3%' },
      { label: 'B', value: 'B', text: '32.6%' },
      { label: 'C', value: 'C', text: '2.1%' },
      { label: 'D', value: 'D', text: '34.7%' }
    ],
    correctAnswer: 'A',
    explanation: 'Mass of O = 64 g; molar mass of H2SO4 = 98 g/mol; 64/98 × 100 = 65.3%.'
  },
  {
    id: 'fake-gases-22',
    type: 'free-response',
    question: 'In a reaction, 8.2E-7 Gg CO2(g) is produced and dried to remove any water vapor. If it has a pressure of 32.15 PSI and a temperature of 22°C, what is the volume of the CO2(g)?',
    correctAnswer: '210.5 Liters of CO2(gas).',
    explanation: 'Convert units and use PV = nRT.'
  },
];
