import { Question } from '@/types/quiz';

export const metricQuestions: Question[] = [
  {
    id: 'metric-1a',
    type: 'free-response',
    question: 'Write 0.0009043 in scientific notation',
    correctAnswer: '9.043×10⁻⁴',
    explanation: 'Move decimal 4 places to the right → 9.043 × 10⁻⁴'
  },
  {
    id: 'metric-1b',
    type: 'free-response',
    question: 'Write 32090 in scientific notation',
    correctAnswer: '3.209×10⁴',
    explanation: 'Move decimal 4 places to the left → 3.209 × 10⁴'
  },
  {
    id: 'metric-1c',
    type: 'free-response',
    question: 'Write 0.050 in scientific notation',
    correctAnswer: '5.0×10⁻²',
    explanation: 'Move decimal 2 places to the right → 5.0 × 10⁻² (2 significant figures)'
  },
  {
    id: 'metric-1d',
    type: 'free-response',
    question: 'Write 2.030 in scientific notation',
    correctAnswer: '2.03×10⁰',
    explanation: 'Number already between 1 and 10 → 2.03 × 10⁰ (3 significant figures)'
  },
  {
    id: 'metric-1e',
    type: 'free-response',
    question: 'Write 0.4800 in scientific notation',
    correctAnswer: '4.800×10⁻¹',
    explanation: 'Move decimal 1 place to the right → 4.800 × 10⁻¹ (4 significant figures)'
  },
  {
    id: 'metric-1f',
    type: 'free-response',
    question: 'Write 600 in scientific notation',
    correctAnswer: '6.00×10²',
    explanation: 'Move decimal 2 places to the left → 6.00 × 10² (3 significant figures)'
  },
  {
    id: 'metric-1g',
    type: 'free-response',
    question: 'Write 2900.0 in scientific notation',
    correctAnswer: '2.900×10³',
    explanation: 'Move decimal 3 places to the left → 2.900 × 10³ (4 significant figures)'
  },
  {
    id: 'metric-2a',
    type: 'free-response',
    question: 'Convert 12.8 °C to °F',
    correctAnswer: '55.04 °F',
    explanation: 'Use F = (C × 9/5) + 32 → (12.8 × 1.8) + 32 = 55.04 °F'
  },
  {
    id: 'metric-2b',
    type: 'free-response',
    question: 'Convert 148 °C to K',
    correctAnswer: '421.15 K',
    explanation: 'Use K = C + 273.15 → 148 + 273.15 = 421.15 K'
  },
  {
    id: 'metric-2c',
    type: 'free-response',
    question: 'Convert 785 K to °C',
    correctAnswer: '511.85 °C',
    explanation: 'Use C = K − 273.15 → 785 − 273.15 = 511.85 °C'
  },
  {
    id: 'metric-2d',
    type: 'free-response',
    question: 'Convert 86.8 °F to °C',
    correctAnswer: '30.44 °C',
    explanation: 'Use C = (F − 32) ÷ 1.8 → (86.8 − 32) ÷ 1.8 = 30.44 °C'
  },
  {
    id: 'metric-2e',
    type: 'free-response',
    question: 'Convert 67.5 °F to K',
    correctAnswer: '292.87 K',
    explanation: 'First find °C: (67.5 − 32) ÷ 1.8 = 19.72 °C → then K = 19.72 + 273.15 = 292.87 K'
  },
  {
    id: 'metric-3',
    type: 'free-response',
    question: 'Fill in the metric prefix chart (common prefixes)',
    correctAnswer: 'kilo (k) = 10³, mega (M) = 10⁶, milli (m) = 10⁻³, micro (µ) = 10⁻⁶, nano (n) = 10⁻⁹, pico (p) = 10⁻¹², giga (G) = 10⁹',
    explanation: 'Common prefixes listed; add tera (T=10^12), centi (c=10^-2), deci (d=10^-1) as needed for the worksheet.'
  },
  {
    id: 'metric-4a',
    type: 'free-response',
    question: 'Count significant figures in 145000 m',
    correctAnswer: 'Ambiguous (commonly 3 unless a decimal point or bar indicates more)',
    explanation: 'Trailing zeros in a whole number without a decimal are not clearly significant unless specified'
  },
  {
    id: 'metric-4b',
    type: 'free-response',
    question: 'Count significant figures in 0.004006 mg',
    correctAnswer: '4',
    explanation: 'Leading zeros are not significant; zeros between nonzero digits are significant'
  },
  {
    id: 'metric-4c',
    type: 'free-response',
    question: 'Count significant figures in 120.04 kg',
    correctAnswer: '5',
    explanation: 'All nonzero digits and zeros between/after nonzeros when a decimal point is present are significant'
  },
  {
    id: 'metric-4d',
    type: 'free-response',
    question: 'Count significant figures in 52 elephants',
    correctAnswer: 'Exact count (counting number → unlimited/defined)',
    explanation: 'Counting numbers are defined quantities with infinite significant figures'
  },
  {
    id: 'metric-4e',
    type: 'free-response',
    question: 'Count significant figures in 13.0 mL',
    correctAnswer: '3',
    explanation: 'Trailing zero after decimal is significant'
  },
  {
    id: 'metric-4f',
    type: 'free-response',
    question: 'Count significant figures in 0.000780 L',
    correctAnswer: '3',
    explanation: 'Leading zeros are not significant; trailing zero after nonzero digits in decimal is significant'
  },
  {
    id: 'metric-4g',
    type: 'free-response',
    question: 'Count significant figures in 32.60 s',
    correctAnswer: '4',
    explanation: 'All digits including trailing zero after decimal are significant'
  },
  {
    id: 'metric-4h',
    type: 'free-response',
    question: 'Count significant figures in 12900000 ms',
    correctAnswer: 'Ambiguous (commonly 3 unless a decimal point or bar indicates more)',
    explanation: 'Trailing zeros in a whole number without a decimal are ambiguous unless notation specifies otherwise'
  },
  {
    id: 'metric-5a',
    type: 'free-response',
    question: 'Using significant figures  Multiply: 2.34 × 1.2',
    correctAnswer: '2.8',
    explanation: '2.34 (3 sig figs) × 1.2 (2 sig figs) → answer must have 2 sig figs → 2.8'
  },
  {
    id: 'metric-5b',
    type: 'free-response',
    question: 'Using significant figures  Multiply: 0.00456 × 3.2',
    correctAnswer: '0.015',
    explanation: '0.00456 (3 sig figs) × 3.2 (2 sig figs) → answer must have 2 sig figs → 0.015'
  },
  {
    id: 'metric-5c',
    type: 'free-response',
    question: 'Using significant figures  Divide: 5.678 ÷ 2.1',
    correctAnswer: '2.7',
    explanation: '5.678 (4 sig figs) ÷ 2.1 (2 sig figs) → answer must have 2 sig figs → 2.7'
  },
  {
    id: 'metric-5d',
    type: 'free-response',
    question: 'Using significant figures  Divide: 0.009876 ÷ 0.4321',
    correctAnswer: '0.0229',
    explanation: '0.009876 (4 sig figs) ÷ 0.4321 (4 sig figs) → answer must have 4 sig figs → 0.0229'
  },
  {
    id: 'metric-5e',
    type: 'free-response',
    question: 'Using significant figures  Multiply: 6.022 × 1.00',
    correctAnswer: '6.02',
    explanation: '6.022 (4 sig figs) × 1.00 (3 sig figs) → answer must have 3 sig figs → 6.02'
  },
  
  // --- Addition / Subtraction Practice ---
  {
    id: 'metric-5f',
    type: 'free-response',
    question: 'Add: 12.11 + 0.034',
    correctAnswer: '12.14',
    explanation: 'Least precise addend (12.11 → 2 decimal places) → answer rounded to 2 decimal places → 12.14'
  },
  {
    id: 'metric-5g',
    type: 'free-response',
    question: 'Using significant figures Add: 3.45 + 11.0',
    correctAnswer: '14.5',
    explanation: 'Least precise addend (11.0 → 1 decimal place) → answer rounded to 1 decimal place → 14.5'
  },
  {
    id: 'metric-5h',
    type: 'free-response',
    question: 'Using significant figures  Subtract: 123.45 − 0.9876',
    correctAnswer: '122.46',
    explanation: 'Least precise term (123.45 → 2 decimal places) → answer rounded to 2 decimal places → 122.46'
  },
  {
    id: 'metric-5i',
    type: 'free-response',
    question: 'Using significant figures  Add: 0.0567 + 0.1',
    correctAnswer: '0.2',
    explanation: 'Least precise addend (0.1 → 1 decimal place) → answer rounded to 1 decimal place → 0.2'
  },
  {
    id: 'metric-5j',
    type: 'free-response',
    question: 'Using significant figures  Subtract: 45.600 − 2.11',
    correctAnswer: '43.49',
    explanation: 'Least precise term (2.11 → 2 decimal places) → answer rounded to 2 decimal places → 43.49'
  },
  {
    id: 'metric-7',
    type: 'free-response',
    question: 'Water at 240 K is in what state?',
    correctAnswer: 'Solid (ice)',
    explanation: '240 K = 240 − 273.15 = −33.15 °C, which is below 0 °C, so water is solid at standard pressure.'
  },
  {
    id: 'metric-8',
    type: 'free-response',
    question: 'Match type of matter to description (examples: rubbing alcohol, laughing gas, sterling silver, helium in balloon, toothpaste fluoride, Coca-Cola, Nesquik in milk, cotton/polyester fabric)',
    correctAnswer: 'Rubbing alcohol: compound (or homogeneous mixture if impure); laughing gas (N₂O): compound; sterling silver: alloy (homogeneous mixture); helium in balloon: element (He) in a physical mixture; toothpaste fluoride: compound present in a mixture; Coca-Cola: heterogeneous suspension/solution mixture (solution with dissolved CO₂); Nesquik in milk: heterogeneous mixture (suspended particles then dissolving); cotton/polyester fabric: mixture (blend) or heterogeneous material.',
    explanation: 'Classify as element, compound, homogeneous mixture (solution), heterogeneous mixture, or alloy based on composition and uniformity. Use your worksheet wording for exact labels.'
  },
  {
    id: 'metric-9a',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: mixing baking soda & vinegar',
    correctAnswer: 'CC (chemical change)',
    explanation: 'Gas forms and new substances produced → chemical change'
  },
  {
    id: 'metric-9b',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: freezing water',
    correctAnswer: 'PC (physical change)',
    explanation: 'Change of state, no new substance formed → physical change'
  },
  {
    id: 'metric-9c',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: milk clumping',
    correctAnswer: 'CC (chemical change)',
    explanation: 'Protein denaturation → new chemical composition'
  },
  {
    id: 'metric-9d',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: copper stretchability',
    correctAnswer: 'PP (physical property)',
    explanation: 'Malleability/ductility is a measurable physical property'
  },
  {
    id: 'metric-9e',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: solid carbon brittle',
    correctAnswer: 'PP (physical property)',
    explanation: 'Brittleness describes a physical property of the material'
  },
  {
    id: 'metric-9f',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: water reacts with sodium',
    correctAnswer: 'CC (chemical change)',
    explanation: 'Reaction produces hydrogen gas and new compounds → chemical change'
  },
  {
    id: 'metric-9g',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: evaporating alcohol',
    correctAnswer: 'PC (physical change)',
    explanation: 'Phase change, no new substances formed → physical change'
  },
  {
    id: 'metric-9h',
    type: 'free-response',
    question: 'Label PC/CC/PP/CP for: wood rotting',
    correctAnswer: 'CC (chemical change)',
    explanation: 'Decomposition produces new substances → chemical change'
  },
  {
    id: 'metric-10a',
    type: 'free-response',
    question: 'State of matter for S (sulfur)',
    correctAnswer: 'Solid',
    explanation: 'Sulfur is a solid at room temperature'
  },
  {
    id: 'metric-10b',
    type: 'free-response',
    question: 'Lightest alkaline earth metal',
    correctAnswer: 'Be (beryllium)',
    explanation: 'Beryllium is the first and lightest element in Group 2 (alkaline earth metals)'
  },
  {
    id: 'metric-10c',
    type: 'free-response',
    question: 'Alkali metal in period 4',
    correctAnswer: 'K (potassium)',
    explanation: 'Potassium is in Group 1 (alkali metals) and Period 4 of the periodic table'
  },
  {
    id: 'metric-10d',
    type: 'free-response',
    question: 'Name of group 17',
    correctAnswer: 'Halogens',
    explanation: 'Group 17 elements are collectively called halogens'
  },
  {
    id: 'metric-10e',
    type: 'free-response',
    question: 'Which elements are metalloids?',
    correctAnswer: 'B, Si, Ge, As, Sb, Te',
    explanation: 'These six elements are commonly recognized as metalloids along the “stair-step” between metals and nonmetals'
  },
  {
    id: 'metric-11',
    type: 'free-response',
    question: 'Necklace density/money problem: mass 435.5 g; initial vol 62.6 mL; final vol 104.6 mL — identify metal from chart and compute price',
    correctAnswer: 'Volume displaced = 42.0 mL; density = 435.5 g / 42.0 mL = 10.369 g/mL. Identify metal using your packet\'s density table; compute price using price-per-gram from the worksheet.',
    explanation: 'I computed the density ≈ 10.369 g·mL⁻¹. Which metal that matches depends on the metal-density table in your packet (e.g., if the table lists a metal at ~10.37 g/mL pick that one), then multiply mass by price per gram from that table to get cost.'
  },
  {
    id: 'metric-12',
    type: 'free-response',
    question: 'Sunglasses overboard: mass 135.4 g, volume 186.6 mL — will they float?',
    correctAnswer: 'Yes — they will float',
    explanation: 'Density = mass/volume = 135.4 g / 186.6 mL = 0.7257 g·mL⁻¹, which is less than water (1.00 g·mL⁻¹), so the sunglasses float.'
  },
  {
    id: 'metric-13',
    type: 'free-response',
    question: 'Mixture separation (sand, water, salt, ethanol, iron filings): design a four-step procedure ending with pure water',
    correctAnswer: '1) Use a magnet to remove iron filings. 2) Filter the mixture to remove sand. 3) Distill the filtrate to collect ethanol (boils at ~78 °C) and leave behind water + salt. 4) Evaporate the remaining water (or perform reverse osmosis/distillation) to isolate pure water (salt remains as residue).',
    explanation: 'Steps: (1) magnetic separation, (2) filtration (solid sand removed), (3) simple distillation to separate ethanol from water+salt, (4) further distillation/evaporation/desalting to remove salt and recover pure water. Alternative for step 4: recrystallize salt and collect water or use desalination.'
  },
  {
    id: 'metric-14',
    type: 'multiple-choice',
    question: 'In the paragraph above, there is 9 underlined properties. How many of the properties are chemical properties?',
    image: "/images/chemistry/metric1.png",
    options: [
      { "label": "A", "value": "A", "text": "2", },
      { "label": "B", "value": "B", "text": "3", },
      { "label": "C", "value": "C", "text": "4", },
      { "label": "D", "value": "D", "text": "5", }
    ],
    correctAnswer: 'B',
    explanation: 'Well-defined intermetallic compounds, pryophoric, react explosively with water'
  },
  {
    id: 'metric-15a',
    type: 'multiple-choice',
    question: 'How many of the particle diagrams show a pure substance?',
    image: "/images/chemistry/metric2.png",
    options: [
      { "label": "A", "value": "A", "text": "1", },
      { "label": "B", "value": "B", "text": "2", },
      { "label": "C", "value": "C", "text": "3", },
      { "label": "D", "value": "D", "text": "4", }
    ],
    correctAnswer: 'D',
    explanation: '1, 2, 3, 4 are all having 1 compound/element'
  },
  {
    id: 'metric-15b',
    type: 'multiple-choice',
    question: 'How many of the particle diagrams show a mixture of compounds?',
    image: "/images/chemistry/metric2.png",
    options: [
      { "label": "A", "value": "A", "text": "1", },
      { "label": "B", "value": "B", "text": "2", },
      { "label": "C", "value": "C", "text": "3", },
      { "label": "D", "value": "D", "text": "4", }
    ],
    correctAnswer: 'A',
    explanation: 'Only the last one has compounds and not all of them are the same'
  },
  {
    id: 'metric-16',
    type: 'multiple-choice',
    question: 'Match the state of matter to the missing information on the table.',
    image: "/images/chemistry/metric3.png",
    options: [
      { "label": "A", "value": "A", "text": "I. solid II. liquid III. gas", },
      { "label": "B", "value": "B", "text": "I. liquid II. gas III. solid", },
      { "label": "C", "value": "C", "text": "I. gas II. liquid III. solid", },
      { "label": "D", "value": "D", "text": "I. gas II. solid III. liquid", }
    ],
    correctAnswer: 'B',
    explanation: 'N/A'
  },
  {
    id: 'metric-17a',
    type: 'free-response',
    question: 'An unknown ink is determined to have to pigments with Rf of approximately 0.23 and 0.74. Three inks, A, B, C, are candiddates for a match. A chromatogram of inks A, B, and C is shown above. Which of the inks has pigments with the lowest affinity for the mobile phase?',
    image: "/images/chemistry/metric4.png",
    correctAnswer: '!Answers may vary! Ink A has pigments with the lowest affinity for the mobile phase because it has both Rf values as the lowest compared to the other inks.',
    explanation: 'N/A'
  },
  {
    id: 'metric-17b',
    type: 'free-response',
    question: 'An unknown ink is determined to have to pigments with Rf of approximately 0.23 and 0.74. Three inks, A, B, C, are candiddates for a match. A chromatogram of inks A, B, and C is shown above. Determine the identity of the unknown ink. Answer using the CER method.',
    image: "/images/chemistry/metric4.png",
    correctAnswer: '!Answers may vary! The identity of the unknown ink is C. According to the passage, the Rf values for the unknown are 0.23 and 0.74 and the limit of the water is around 5.3. That means something divided by 5.3 is 0.23 for one of the inks traveled and the other is 0.74. This means that the one most likely that has the closest match is Ink C.',
    explanation: 'N/A'
  },
  {
    id: 'metric-18a',
    type: 'free-response',
    question: 'A small figurine found in a tomb in Iraq is made of some unknown metal. An archeologist measures the mass of the figurine to be 105.40g. Using Archimedes method, the archeologist measures the volume of the figurine. Look at the 2 diagrams above and measure the volume of the water in the graduated cylinder before and after adding the figurine.',
    image: "/images/chemistry/metric5.png",
    correctAnswer: '12.40 mL increase',
    explanation: 'Significant figures matter and 47.30-34.90 = 12.40 mL'
  },
  {
    id: 'metric-18b',
    type: 'free-response',
    question: 'A small figurine found in a tomb in Iraq is made of some unknown metal. An archeologist measures the mass of the figurine to be 105.40g. Using Archimedes method, the archeologist measures the volume of the figurine. The increase in the mL was 12.40 mL. During the historical period when the tomb is believed to have been made, the people were known to make figurines from gold (19.30 g/mL), silver (10.49 g/mL), brass (8.50 g/mL), and tin (5.765 g/mL). Identify the material the figurine is made of using the CER method.',
    image: "/images/chemistry/metric5.png",
    correctAnswer: '!Answers may vary! The material the figurine is made of is brass. The diagram shows a ~12.40 mL increase in volume after the figurine which was 105.4g. 105.4 divided by 12.40 is 8.5 g/mL. 8.5 g/mL matches up with brass g/mL which means  the figurine is made out of brass.',
    explanation: 'N/A'
  },
];
