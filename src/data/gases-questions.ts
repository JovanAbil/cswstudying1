import { Question } from '@/types/quiz';

export const gasesQuestions: Question[] = [
  {
    id: 'gases-1',
    type: 'short-answer',
    question: 'If you double the volume of a gas at constant temperature and moles, what happens to the pressure?',
    correctAnswer: 'Pressure halves',
    explanation: 'Boyle’s law (P ∝ 1/V). Doubling volume → pressure is halved if T and n constant.'
  },
  {
    id: 'gases-2',
    type: 'short-answer',
    question: 'If you halve the pressure of a gas at constant volume and moles, what happens to the temperature?',
    correctAnswer: 'Temperature halves',
    explanation: 'Gay-Lussac’s law (P ∝ T). Halving P → T is halved if V and n constant.'
  },
  {
    id: 'gases-3',
    type: 'short-answer',
    question: 'If you triple the moles of gas at constant pressure and temperature, what happens to the volume?',
    correctAnswer: 'Volume triples',
    explanation: 'Avogadro’s law (V ∝ n). Triple moles → triple volume at constant T and P.'
  },
  {
    id: 'gases-4',
    type: 'short-answer',
    question: 'If you cut the temperature of a gas by one-third at constant pressure and moles, what happens to the volume?',
    correctAnswer: 'Volume becomes one-third',
    explanation: 'Charles’ law (V ∝ T). Reducing T to 1/3 of original → volume reduces to 1/3.'
  },
  {
    id: 'gases-5',
    type: 'calculation',
    question: 'A balloon with helium at 22 °C has a volume of 430 mL. If cooled to 4 °C, what is the new volume?',
    correctAnswer: '≈403.8 mL',
    explanation: 'Convert to K: T₁ = 295.15 K, T₂ = 277.15 K. Charles’ law: V₂ = 430 × (277.15 / 295.15) ≈ 403.8 mL.'
  },
  {
    id: 'gases-6',
    type: 'calculation',
    question: 'A sealed flask contains nitrogen at 189.9 kPa and -45 °C. What is the temperature if pressure increases to 854.5 kPa?',
    correctAnswer: '≈753.5 °C (≈1.03×10³ K)',
    explanation: 'Convert to K: T₁ = 228.15 K. Gay-Lussac’s law: T₂ = 228.15 × (854.5 / 189.9) ≈ 1.03×10³ K → ≈753.5 °C.'
  },
  {
    id: 'gases-7',
    type: 'calculation',
    question: 'A hot-air balloon is 140 L at 1.05 atm. What is its new volume if pressure drops to 0.765 atm?',
    correctAnswer: '≈192.2 L',
    explanation: 'Boyle’s law: V₂ = 140 × (1.05 / 0.765) ≈ 192.2 L.'
  },
  {
    id: 'gases-8',
    type: 'calculation',
    question: 'A flexible gas tank contains 0.355 mol of Ne at 235 mL. If 0.325 mol more Ne is added, what is the new volume?',
    correctAnswer: '≈450.1 mL',
    explanation: 'Avogadro’s law: V₂ = 235 × ((0.355 + 0.325) / 0.355) ≈ 450.1 mL.'
  },
  {
    id: 'gases-9',
    type: 'short-answer',
    question: 'List the four conditions for a gas to behave most ideally.',
    correctAnswer: 'High temperature; low pressure; small molecules with negligible volume; no intermolecular forces',
    explanation: 'These conditions minimize deviations from ideal gas behavior.'
  },
  {
    id: 'gases-10',
    type: 'short-answer',
    question: 'List the five assumptions made about ideal gases.',
    correctAnswer: 'Particles have negligible volume; no intermolecular forces; elastic collisions; constant random motion; average kinetic energy ∝ absolute temperature',
    explanation: 'These assumptions define the kinetic molecular theory of ideal gases.'
  },
  {
    id: 'gases-11',
    type: 'calculation',
    question: 'A gas tank contains 1.25 mol CO₂ and 2.45 mol N₂ at 28.7 atm and 180 °C. Find the tank’s volume.',
    correctAnswer: '≈4.79 L',
    explanation: 'n = 3.70 mol; T = 453.15 K. PV = nRT → V = (3.70 × 0.08206 × 453.15) / 28.7 ≈ 4.79 L.'
  },
  {
    id: 'gases-12',
    type: 'calculation',
    question: 'A canister has 2.30 mol propane and 10.21 mol methane with total pressure 3.30 atm. Find the partial pressure of methane.',
    correctAnswer: '≈2.69 atm',
    explanation: 'P_CH₄ = (10.21 / (2.30 + 10.21)) × 3.30 ≈ 2.69 atm.'
  },
  {
    id: 'gases-13',
    type: 'calculation',
    question: 'A balloon with 0.508 mol CO₂ and 0.233 mol O₂ has a volume of 12.8 L and pressure 789 torr. Find the temperature.',
    correctAnswer: '≈218.5 K (≈–54.7 °C)',
    explanation: 'n = 0.741 mol; P = 789 torr = 1.038 atm. T = PV / (nR) = (1.038 × 12.8) / (0.741 × 0.08206) ≈ 218.5 K → ≈–54.7 °C.'
  },
  {
    id: 'gases-14',
    type: 'calculation',
    question: 'A balloon with 0.662 mol air at 176 L and pressure 680 mmHg. Find the temperature.',
    correctAnswer: '≈2899 K (≈2626 °C)',
    explanation: 'P = 680 / 760 = 0.8947 atm. T = PV / (nR) = (0.8947 × 176) / (0.662 × 0.08206) ≈ 2899 K → ≈2626 °C (very high — verify worksheet data).'
  },
  {
    id: 'gases-15',
    type: 'calculation',
    question: 'A gas (171.1 g) at 27 °C and 0.322 atm occupies 82.4 L and is a diatomic halogen. Identify the gas.',
    correctAnswer: 'Br₂ (bromine gas)',
    explanation: 'n = PV / (RT); M ≈ 158.8 g/mol → matches bromine gas (Br₂, 159.8 g/mol).'
  },
  {
    id: 'gases-16',
    type: 'calculation',
    question: 'A 220 mL sample of gas is collected over water at 25 °C and 685.2 torr. Water vapor pressure = 23.77 torr. Mass = 0.951 g. The gas is composed of bromine and nitrogen. Determine its formula.',
    correctAnswer: 'Mixture of ≈71% Br₂ (by mole) and ≈29% N₂',
    explanation: 'P_gas = 685.2 – 23.77 = 661.43 torr = 0.8706 atm. n = PV / RT ≈ 0.00783 mol. M = 0.951 / 0.00783 ≈ 121.5 g/mol → intermediate between Br₂ and N₂, indicating a mixture (~71% Br₂ by mole).'
  },
  {
    id: 'gases-17',
    type: 'calculation',
    question: 'A weapon releases 3.4 Mg of chlorine gas at 23 °C and 20.6 psi. Find the volume of gas.',
    correctAnswer: '≈8.31 × 10⁵ L',
    explanation: 'm = 3.4 × 10⁶ g; M(Cl₂) = 70.906 g/mol → n ≈ 4.80 × 10⁴ mol. P = 20.6 psi = 1.402 atm. T = 296.15 K. V = nRT / P ≈ 8.31 × 10⁵ L.'
  }
];
