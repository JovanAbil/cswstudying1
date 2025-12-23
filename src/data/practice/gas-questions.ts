import { Question } from '@/types/quiz';

export const gasQuestions: Question[] = [
  {
    id: "gas-1",
    type: "free-response",
    question: "List the four conditions for the most ‘ideal’ gas.",
    correctAnswer: "High temperature, low pressure, small particle size, weak intermolecular forces",
    explanation: "Ideal gas behavior is favored when particles are far apart and moving quickly."
  },
  {
    id: "gas-2",
    type: "free-response",
    question: "List the five assumptions made about ideal gases.",
    correctAnswer: "Particles have no volume, no intermolecular forces, move randomly, undergo elastic collisions, and average kinetic energy depends only on temperature",
    explanation: "These assumptions define the ideal gas model."
  },
  {
    id: "gas-3",
    type: "free-response",
    question: "If you double the volume of a gas at constant temperature, what happens to the pressure?",
    correctAnswer: "1/2",
    explanation: "Pressure and volume are inversely proportional (Boyle’s Law)."
  },
  {
    id: "gas-4",
    type: "free-response",
    question: "Do ideal gases have mass?",
    correctAnswer: "Yes",
    explanation: "Gas particles still have mass even in the ideal model."
  },
  {
    id: "gas-5",
    type: "multiple-choice",
    question: "Predict which gas will behave most ideally.",
    options: [
      { label: "A", value: "A", text: "Ne at -250 °C" },
      { label: "B", value: "B", text: "Ne at 964 °C" },
      { label: "C", value: "C", text: "Ar at -250 °C" },
      { label: "D", value: "D", text: "Ar at 964 °C" }
    ],
    correctAnswer: "B",
    explanation: "Smaller gases at higher temperatures behave most ideally."
  },
  {
    id: "gas-6",
    type: "free-response",
    question: "1.285 moles of Fe2O3 — how many grams?",
    correctAnswer: "205.199337",
    explanation: "Multiply moles by molar mass."
  },
  {
    id: "gas-7",
    type: "free-response",
    question: "3.5 mg of C14H18N2O5 — how many molecules?",
    correctAnswer: "7.16166185 × 10^18",
    explanation: "Convert grams to moles, then multiply by Avogadro’s number."
  },
  {
    id: "gas-8",
    type: "free-response",
    question: "A gas is 1.85 atm at 25 °C. If it is now −28 °C, what is the new pressure?",
    correctAnswer: "1.520973154",
    explanation: "Pressure and temperature are directly proportional (Gay-Lussac’s Law)."
  },
  {
    id: "gas-9",
    type: "free-response",
    question: "A gas has a volume of 9.5 L and 0.715 moles. If 0.22 moles are removed, what is the new volume?",
    correctAnswer: "6.646153846",
    explanation: "Volume is proportional to moles at constant temperature and pressure."
  },
  {
    id: "gas-10",
    type: "free-response",
    question: "A gas has a volume of 25 mL at 101.3 kPa. If the pressure changes to 110.3 kPa, what is the new volume?",
    correctAnswer: "0.023 L",
    explanation: "Apply Boyle’s Law and convert units if necessary."
  },
  {
    id: "gas-11",
    type: "free-response",
    question: "1.05 moles of gas A and 1.65 moles of gas B are at 35 °C and 20.5 atm. What is the volume?",
    correctAnswer: "3.328833951",
    explanation: "Use the Ideal Gas Law with total moles."
  },
  {
    id: "gas-12",
    type: "free-response",
    question: "5.05 moles of gas A and 11.25 moles of gas B are mixed. If total pressure is 3.95 atm, what is the pressure of gas A?",
    correctAnswer: "1.223773006",
    explanation: "Partial pressure depends on mole fraction."
  },
  {
    id: "gas-13",
    type: "free-response",
    question: "A gas has a pressure of 460 mmHg, volume of 8.05 L, and 0.095 moles. What is the temperature in °C?",
    correctAnswer: "352.0071733",
    explanation: "Use the Ideal Gas Law and convert units."
  },
  {
    id: "gas-14",
    type: "free-response",
    question: "A gas mixture is 79% nitrogen and has a total pressure of 226 atm. What is the partial pressure of the other gases?",
    correctAnswer: "47.46 atm",
    explanation: "Subtract nitrogen’s partial pressure from total pressure."
  },
  {
    id: "gas-15",
    type: "free-response",
    question: "What is the percent by mass of oxygen in H3PO4?",
    correctAnswer: "65.30688484",
    explanation: "Divide oxygen’s mass by total molar mass."
  },
  {
    id: "gas-16",
    type: "free-response",
    question: "A compound contains 26.56% potassium, 35.41% chromium, and oxygen. What is the empirical formula?",
    correctAnswer: "K2Cr2O7",
    explanation: "Convert percentages to moles and find simplest ratio."
  },
  {
    id: "gas-17",
    type: "free-response",
    question: "A noble gas has a volume of 95.5 L, pressure of 0.45 atm, temperature of 32 °C, and mass of 225.4 g. Identify the gas.",
    correctAnswer: "131.2711768; Xenon",
    explanation: "Use the Ideal Gas Law to find molar mass."
  },
  {
    id: "gas-18",
    type: "free-response",
    question: "An unknown gas is collected over water at 25 °C with a volume of 168 mL and pressure of 755.9 torr. Vapor pressure of water is 23.77 torr. The gas contains only bromine and oxygen. Determine its formula.",
    correctAnswer: "BrO4",
    explanation: "Correct pressure for water vapor, then use Ideal Gas Law and molar mass."
  },
  {
    id: "gas-19",
    type: "free-response",
    question: "9.5 × 10⁻⁷ Gg of CO2 is produced at 24 °C and 34.05 psi. What is the volume?",
    correctAnswer: "226.9707079",
    explanation: "Convert mass to moles, then apply the Ideal Gas Law."
  },
];
