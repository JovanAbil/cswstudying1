import { Question } from '@/types/quiz';

export const solutionsQuestions: Question[] = [
  {
    id: 'solutions-1',
    type: 'short-answer',
    question: 'A solution is made by adding 106 g of CaSO₄ to a volumetric flask and filling to 2.50 L. What is the molarity of this solution?',
    correctAnswer: '0.311 M',
    explanation: 'Moles CaSO₄ = 106 g ÷ 136.14 g·mol⁻¹ ≈ 0.779 mol; volume = 2.50 L → M = 0.779 ÷ 2.50 ≈ 0.311 M.'
  },
  {
    id: 'solutions-2',
    type: 'short-answer',
    question: 'A student masses out 780.0 g of distilled water and 67.0 g LiNO₃. What is the concentration of LiNO₃ in % by mass?',
    correctAnswer: '7.91 % by mass',
    explanation: '% by mass = (67.0 ÷ (780.0 + 67.0)) × 100% ≈ 7.91 %.'
  },
  {
    id: 'solutions-3',
    type: 'short-answer',
    question: 'A bottle contains a solution that is 220.0 g of distilled water and 95.0 g of NaCl. What is the mole fraction of NaCl in the solution?',
    correctAnswer: '≈ 0.1175',
    explanation: 'Moles NaCl = 95.0 ÷ 58.44 ≈ 1.626 mol; moles H₂O = 220.0 ÷ 18.02 ≈ 12.21 mol → mole fraction NaCl = 1.626 ÷ (1.626 + 12.21) ≈ 0.1175.'
  },
  {
    id: 'solutions-4',
    type: 'short-answer',
    question: 'A student has 42.8 g of K₂CO₃ and wants to make a 0.245 M solution. What will be the final volume?',
    correctAnswer: '≈ 1.26 L',
    explanation: 'Moles K₂CO₃ = 42.8 ÷ 138.21 ≈ 0.3097 mol; volume = n / M = 0.3097 ÷ 0.245 ≈ 1.26 L.'
  },
  {
    id: 'solutions-5',
    type: 'short-answer',
    question: 'A bottle of alcohol and water is labeled as 18% alcohol by mass. If the entire bottle is 701 g, how many grams of alcohol are in the bottle?',
    correctAnswer: '≈ 126.2 g alcohol',
    explanation: '18% of 701 g = 0.18 × 701 = 126.18 g ≈ 126.2 g alcohol.'
  },
  {
    id: 'solutions-6',
    type: 'short-answer',
    question: 'If there are 133.7 g of (NH₄)₂O in a 1.75 L solution, what is the concentration of the ammonium ion?',
    correctAnswer: '≈ 2.93 M (NH₄⁺)',
    explanation: 'Moles (NH₄)₂O = 133.7 ÷ 52.078 ≈ 2.567 mol; each formula unit gives 2 NH₄⁺ → total = 5.134 mol; divide by 1.75 L → ≈ 2.93 M NH₄⁺.'
  },
  {
    id: 'solutions-7',
    type: 'short-answer',
    question: 'A beaker had 250.0 mL of aqueous Mg(OH)₂ at 0.050 M. Overnight it evaporated to 55.0 mL. What is the new concentration?',
    correctAnswer: '≈ 0.227 M',
    explanation: 'Moles solute stayed constant: n = 0.050 × 0.250 = 0.0125 mol; new volume = 0.055 L → M = 0.0125 ÷ 0.055 ≈ 0.227 M.'
  },
  {
    id: 'solutions-8',
    type: 'short-answer',
    question: 'You want 1.15 L of 0.200 M acid from 16.8 M stock. How much of the concentrated acid is needed?',
    correctAnswer: '≈ 13.7 mL',
    explanation: 'M₁V₁ = M₂V₂ → V₁ = (0.200 × 1.15) ÷ 16.8 ≈ 0.01369 L = 13.7 mL.'
  },
  {
    id: 'solutions-9',
    type: 'short-answer',
    question: 'The ocean has a salt concentration of 2.5% by mass. How much salt is needed for an 80.0 kg fish tank?',
    correctAnswer: '2.00 kg of salt',
    explanation: '2.5% of 80.0 kg = 0.025 × 80.0 kg = 2.00 kg = 2000 g salt.'
  },
  {
    id: 'solutions-10',
    type: 'short-answer',
    question: 'How many grams of HCl can dissolve in 50.0 g of 75 °C water?',
    correctAnswer: 'Look up from solubility chart',
    explanation: 'Use the solubility vs. temperature graph in the packet to find g HCl per 100 g water at 75 °C, then scale to 50 g water.'
  },
  {
    id: 'solutions-11',
    type: 'short-answer',
    question: 'A saturated solution of SO₂ in 200 g of 15 °C water contains how many grams of SO₂?',
    correctAnswer: 'Look up from solubility chart',
    explanation: 'Read solubility of SO₂ at 15 °C (g per 100 g water) from packet and multiply by 2 for 200 g water.'
  },
  {
    id: 'solutions-12',
    type: 'short-answer',
    question: 'A solution with 90 g NH₄Cl in 200 g of 60 °C water is cooled to 10 °C. How many grams precipitate?',
    correctAnswer: 'Requires solubility data',
    explanation: 'Precipitated mass = (amount soluble at 60 °C – amount soluble at 10 °C) scaled to 200 g water, from solubility curve in packet.'
  },
  {
    id: 'solutions-13',
    type: 'short-answer',
    question: 'What is the minimum amount of 20 °C water needed to dissolve 132 g NaNO₃?',
    correctAnswer: 'Requires solubility data',
    explanation: 'Use solubility (g NaNO₃ per 100 g water) at 20 °C from the packet to calculate required mass of water.'
  },
  {
    id: 'solutions-14',
    type: 'short-answer',
    question: 'Is a solution containing 50 g of 15 °C water and 60 g KNO₃ saturated, unsaturated, or supersaturated?',
    correctAnswer: 'Depends on solubility curve',
    explanation: 'Compare the maximum solubility of KNO₃ at 15 °C for 50 g water to 60 g added; classify accordingly.'
  },
  {
    id: 'solutions-15',
    type: 'short-answer',
    question: 'What is the freezing point of a solution containing 64.8 g BaF₂ in 505 g water?',
    correctAnswer: '≈ –2.53 °C',
    explanation: 'Moles BaF₂ = 64.8 ÷ 175.32 ≈ 0.2288 mol; molality = 0.2288 ÷ 0.505 = 0.4533 m; i = 3 → ΔTf = 3 × 1.86 × 0.4533 ≈ 2.53 °C → Tf = 0 – 2.53 = –2.53 °C.'
  },
  {
    id: 'solutions-16',
    type: 'short-answer',
    question: 'What is the boiling point of a non-ionizing antifreeze solution containing 431 g C₂H₆O₂ in 675 g water?',
    correctAnswer: '≈ 105.27 °C',
    explanation: 'Moles solute = 431 ÷ 62.07 ≈ 6.95 mol; molality = 6.95 ÷ 0.675 ≈ 10.29 m; i = 1 → ΔTb = 0.512 × 10.29 ≈ 5.27 °C → Tb ≈ 100 + 5.27 = 105.27 °C.'
  },
  {
    id: 'solutions-17',
    type: 'short-answer',
    question: 'How many grams of K₂SO₄ were dissolved in 90.3 g water if its boiling point is 104.7 °C?',
    correctAnswer: '≈ 48.2 g K₂SO₄',
    explanation: 'ΔTb = 4.7 °C; i = 3; Kb = 0.512 → m = 4.7 ÷ (3 × 0.512) ≈ 3.064 m; moles solute = 3.064 × 0.0903 kg = 0.2766 mol → mass = 0.2766 × 174.26 ≈ 48.2 g.'
  },
  {
    id: 'solutions-18',
    type: 'short-answer',
    question: 'Acetic acid boils at 118.5 °C. If 123 g glucose (C₆H₁₂O₆) is dissolved in 1600 g vinegar (Kb = 3.08), what is the new boiling point?',
    correctAnswer: '≈ 119.8 °C',
    explanation: 'Moles glucose = 123 ÷ 180.16 ≈ 0.6829 mol; molality = 0.6829 ÷ 1.6 ≈ 0.4268 m; i = 1 → ΔTb = 3.08 × 0.4268 ≈ 1.31 °C → Tb ≈ 118.5 + 1.31 = 119.8 °C.'
  },
  {
    id: 'solutions-19',
    type: 'short-answer',
    question: 'Choose a solvent (water or hexane) for each solute: a) C₃H₈ b) Li₂SO₃ c) Br₂ d) HF e) SO₃ f) BeCl₃ g) NO₂',
    correctAnswer: 'a) hexane b) water c) hexane d) water e) water f) water g) water',
    explanation: '“Like dissolves like”: nonpolar solutes (C₃H₈, Br₂) dissolve in nonpolar hexane; ionic/polar or H-bonding solutes (Li₂SO₃, HF, SO₃, BeCl₃, NO₂) dissolve in polar water.'
  }
];
