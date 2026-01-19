import { Question } from '@/types/quiz';

/**
 * FAKE/PRACTICE DATA for Cell Energetics
 * 
 * These questions are shown when the real test is locked.
 * They should be similar in topic but NOT the actual test questions.
 */

export const cellenergeticsQuestions: Question[] = [
  {
    id: 'fake-cellenergetics-1',
    type: 'multiple-choice',
    question: 'Practice: Which molecule is the primary energy currency of cells?',
    options: [
      { label: 'A', value: 'A', text: 'Glucose' },
      { label: 'B', value: 'B', text: 'ATP' },
      { label: 'C', value: 'C', text: 'NADH' },
      { label: 'D', value: 'D', text: 'Oxygen' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: ATP stores and releases energy for cellular processes.'
  },
  {
    id: 'fake-cellenergetics-2',
    type: 'multiple-choice',
    question: 'Practice: If plants are grown with 0.04% CO2 vs 0.1% CO2, the plants with more CO2 will...',
    options: [
      { label: 'A', value: 'A', text: 'Grow slower due to CO2 toxicity' },
      { label: 'B', value: 'B', text: 'Grow faster because more carbon is available for the Calvin cycle' },
      { label: 'C', value: 'C', text: 'Show no difference in growth' },
      { label: 'D', value: 'D', text: 'Produce less oxygen' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: More CO2 increases the rate of carbon fixation in the Calvin cycle.'
  },
  {
    id: 'fake-cellenergetics-3',
    type: 'multiple-choice',
    question: 'Practice: Photosynthesis requires light, chlorophyll, and...',
    options: [
      { label: 'A', value: 'A', text: 'Oxygen and glucose' },
      { label: 'B', value: 'B', text: 'Water and carbon dioxide' },
      { label: 'C', value: 'C', text: 'ATP and NADPH' },
      { label: 'D', value: 'D', text: 'Nitrogen and phosphorus' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Photosynthesis uses water and CO2 as raw materials to make glucose.'
  },
  {
    id: 'fake-cellenergetics-4',
    type: 'multiple-choice',
    question: 'Practice: Which product from light reactions provides energy for the Calvin cycle?',
    options: [
      { label: 'A', value: 'A', text: 'Oxygen' },
      { label: 'B', value: 'B', text: 'Water' },
      { label: 'C', value: 'C', text: 'ATP and NADPH' },
      { label: 'D', value: 'D', text: 'Glucose' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: ATP and NADPH from light reactions power the Calvin cycle.'
  },
  {
    id: 'fake-cellenergetics-5',
    type: 'multiple-choice',
    question: 'Practice: The overall equation for photosynthesis is...',
    options: [
      { label: 'A', value: 'A', text: 'Glucose + oxygen → water + CO2' },
      { label: 'B', value: 'B', text: 'Water + CO2 → glucose + oxygen' },
      { label: 'C', value: 'C', text: 'ATP + water → glucose + oxygen' },
      { label: 'D', value: 'D', text: 'Glucose → CO2 + water + ATP' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Photosynthesis converts water and CO2 into glucose and O2.'
  },
  {
    id: 'fake-cellenergetics-6',
    type: 'multiple-choice',
    question: 'Practice: Light is essential for photosynthesis because it...',
    options: [
      { label: 'A', value: 'A', text: 'Directly produces glucose' },
      { label: 'B', value: 'B', text: 'Splits water molecules' },
      { label: 'C', value: 'C', text: 'Excites electrons in chlorophyll' },
      { label: 'D', value: 'D', text: 'Transports CO2' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Light energy excites electrons to start the electron transport chain.'
  },
  {
    id: 'fake-cellenergetics-7',
    type: 'multiple-choice',
    question: 'Practice: Light-dependent reactions occur in the...',
    options: [
      { label: 'A', value: 'A', text: 'Stroma' },
      { label: 'B', value: 'B', text: 'Thylakoid membranes' },
      { label: 'C', value: 'C', text: 'Cytoplasm' },
      { label: 'D', value: 'D', text: 'Mitochondrial matrix' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Thylakoid membranes contain the photosystems for light reactions.'
  },
  {
    id: 'fake-cellenergetics-8',
    type: 'multiple-choice',
    question: 'Practice: The Calvin cycle takes place in the...',
    options: [
      { label: 'A', value: 'A', text: 'Thylakoid membrane' },
      { label: 'B', value: 'B', text: 'Stroma' },
      { label: 'C', value: 'C', text: 'Cytoplasm' },
      { label: 'D', value: 'D', text: 'Nucleus' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The Calvin cycle (light-independent reactions) occurs in the stroma.'
  },
  {
    id: 'fake-cellenergetics-9',
    type: 'multiple-choice',
    question: 'Practice: The first step of glucose breakdown is...',
    options: [
      { label: 'A', value: 'A', text: 'Krebs cycle' },
      { label: 'B', value: 'B', text: 'Glycolysis' },
      { label: 'C', value: 'C', text: 'Electron transport' },
      { label: 'D', value: 'D', text: 'Fermentation' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Glycolysis splits glucose into two pyruvate molecules.'
  },
  {
    id: 'fake-cellenergetics-10',
    type: 'multiple-choice',
    question: 'Practice: When water is scarce, light-dependent reactions slow because...',
    options: [
      { label: 'A', value: 'A', text: 'ATP production stops completely' },
      { label: 'B', value: 'B', text: 'Water provides electrons for photosystem II' },
      { label: 'C', value: 'C', text: 'CO2 cannot enter leaves' },
      { label: 'D', value: 'D', text: 'Chlorophyll is destroyed' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Water splitting provides electrons to replace those lost by chlorophyll.'
  },
  {
    id: 'fake-cellenergetics-11',
    type: 'multiple-choice',
    question: 'Practice: Cellular respiration uses oxygen to...',
    options: [
      { label: 'A', value: 'A', text: 'Build glucose molecules' },
      { label: 'B', value: 'B', text: 'Break down food and produce ATP' },
      { label: 'C', value: 'C', text: 'Create CO2 from nothing' },
      { label: 'D', value: 'D', text: 'Produce chlorophyll' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Aerobic respiration uses O2 to efficiently produce ATP from glucose.'
  },
  {
    id: 'fake-cellenergetics-12',
    type: 'multiple-choice',
    question: 'Practice: Which organisms perform cellular respiration?',
    options: [
      { label: 'A', value: 'A', text: 'Only animals' },
      { label: 'B', value: 'B', text: 'Only plants' },
      { label: 'C', value: 'C', text: 'Both plants and animals' },
      { label: 'D', value: 'D', text: 'Neither plants nor animals' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: All eukaryotes, including both plants and animals, perform cellular respiration.'
  },
  {
    id: 'fake-cellenergetics-13',
    type: 'multiple-choice',
    question: 'Practice: During intense exercise without enough oxygen, muscles use fermentation to...',
    options: [
      { label: 'A', value: 'A', text: 'Make more ATP than aerobic respiration' },
      { label: 'B', value: 'B', text: 'Regenerate NAD+ so glycolysis can continue' },
      { label: 'C', value: 'C', text: 'Produce oxygen for the Krebs cycle' },
      { label: 'D', value: 'D', text: 'Store glucose for later' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Fermentation regenerates NAD+ to keep glycolysis running without oxygen.'
  },
  {
    id: 'fake-cellenergetics-14',
    type: 'multiple-choice',
    question: 'Practice: In photosynthesis, not all carbon from CO2 ends up in glucose because...',
    options: [
      { label: 'A', value: 'A', text: 'All CO2 is converted to oxygen' },
      { label: 'B', value: 'B', text: 'Some carbon is released as waste' },
      { label: 'C', value: 'C', text: 'Some carbon is used in other molecules' },
      { label: 'D', value: 'D', text: 'The Calvin cycle is 100% efficient' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Carbon from CO2 is incorporated into glucose, but not all stays in the final product.'
  },
  {
    id: 'fake-cellenergetics-15',
    type: 'multiple-choice',
    question: 'Practice: The main role of CO2 in photosynthesis is to...',
    options: [
      { label: 'A', value: 'A', text: 'Be released as waste' },
      { label: 'B', value: 'B', text: 'Provide carbon atoms for glucose synthesis' },
      { label: 'C', value: 'C', text: 'Accept electrons from chlorophyll' },
      { label: 'D', value: 'D', text: 'Transfer energy from light reactions' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: CO2 provides the carbon that becomes the backbone of glucose.'
  },
  {
    id: 'fake-cellenergetics-16',
    type: 'multiple-choice',
    question: 'Practice: Light was not included in a mass experiment table because...',
    options: [
      { label: 'A', value: 'A', text: 'Light is energy, not matter' },
      { label: 'B', value: 'B', text: 'Light has no role in photosynthesis' },
      { label: 'C', value: 'C', text: 'Light is a product of photosynthesis' },
      { label: 'D', value: 'D', text: 'Light cannot be measured' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: Light provides energy but has no mass to track in a mass balance.'
  },
  {
    id: 'fake-cellenergetics-17',
    type: 'multiple-choice',
    question: 'Practice: Fermentation is described as anaerobic because it...',
    options: [
      { label: 'A', value: 'A', text: 'Requires oxygen' },
      { label: 'B', value: 'B', text: 'Occurs without oxygen' },
      { label: 'C', value: 'C', text: 'Produces oxygen' },
      { label: 'D', value: 'D', text: 'Uses oxygen as an enzyme' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Anaerobic means "without oxygen" - fermentation doesn\'t require O2.'
  },
  {
    id: 'fake-cellenergetics-18',
    type: 'multiple-choice',
    question: 'Practice: The Krebs cycle occurs in the...',
    options: [
      { label: 'A', value: 'A', text: 'Chloroplast' },
      { label: 'B', value: 'B', text: 'Mitochondrial matrix' },
      { label: 'C', value: 'C', text: 'Nucleus' },
      { label: 'D', value: 'D', text: 'Cytoplasm' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The Krebs cycle (citric acid cycle) takes place in the mitochondrial matrix.'
  },
  {
    id: 'fake-cellenergetics-19',
    type: 'multiple-choice',
    question: 'Practice: The electron transport chain uses high-energy electrons to...',
    options: [
      { label: 'A', value: 'A', text: 'Build glucose' },
      { label: 'B', value: 'B', text: 'Produce large amounts of ATP' },
      { label: 'C', value: 'C', text: 'Create acetyl-CoA' },
      { label: 'D', value: 'D', text: 'Split water molecules' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The ETC uses electrons from NADH/FADH2 to generate most of the cell\'s ATP.'
  },
  {
    id: 'fake-cellenergetics-20',
    type: 'multiple-choice',
    question: 'Practice: Lactic acid buildup during exercise creates...',
    options: [
      { label: 'A', value: 'A', text: 'Alcoholic fermentation' },
      { label: 'B', value: 'B', text: 'Oxygen debt' },
      { label: 'C', value: 'C', text: 'More ATP than normal' },
      { label: 'D', value: 'D', text: 'Increased oxygen supply' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Oxygen debt occurs when lactic acid must be cleared after anaerobic exercise.'
  },
  {
    id: 'fake-cellenergetics-21',
    type: 'multiple-choice',
    question: 'Practice: After glycolysis, the next stage of aerobic respiration is...',
    options: [
      { label: 'A', value: 'A', text: 'Fermentation' },
      { label: 'B', value: 'B', text: 'The Krebs cycle' },
      { label: 'C', value: 'C', text: 'Electron transport only' },
      { label: 'D', value: 'D', text: 'Photosynthesis' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Pyruvate from glycolysis enters the Krebs cycle in aerobic conditions.'
  },
  {
    id: 'fake-cellenergetics-22',
    type: 'multiple-choice',
    question: 'Practice: Comparing ATP yield, aerobic respiration vs fermentation shows that...',
    options: [
      { label: 'A', value: 'A', text: 'Fermentation produces more ATP' },
      { label: 'B', value: 'B', text: 'Aerobic respiration produces much more ATP' },
      { label: 'C', value: 'C', text: 'Both produce equal ATP' },
      { label: 'D', value: 'D', text: 'Neither produces ATP' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Aerobic respiration yields ~36-38 ATP vs only 2 ATP from fermentation.'
  },
  {
    id: 'fake-cellenergetics-23',
    type: 'multiple-choice',
    question: 'Practice: Carbon compounds that can be broken down for cellular respiration include...',
    options: [
      { label: 'A', value: 'A', text: 'Only glucose' },
      { label: 'B', value: 'B', text: 'Only proteins' },
      { label: 'C', value: 'C', text: 'Carbohydrates, proteins, and fats' },
      { label: 'D', value: 'D', text: 'Only lipids' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: All major macromolecules can be broken down to feed cellular respiration.'
  },
  {
    id: 'fake-cellenergetics-24',
    type: 'multiple-choice',
    question: 'Practice: The electron transport chain is located in the...',
    options: [
      { label: 'A', value: 'A', text: 'Mitochondrial matrix' },
      { label: 'B', value: 'B', text: 'Inner mitochondrial membrane' },
      { label: 'C', value: 'C', text: 'Cytoplasm' },
      { label: 'D', value: 'D', text: 'Nucleus' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The ETC is embedded in the inner mitochondrial membrane.'
  },
  {
    id: 'fake-cellenergetics-25',
    type: 'multiple-choice',
    question: 'Practice: Glycolysis requires which molecule to begin?',
    options: [
      { label: 'A', value: 'A', text: 'Oxygen' },
      { label: 'B', value: 'B', text: 'ATP' },
      { label: 'C', value: 'C', text: 'FADH2' },
      { label: 'D', value: 'D', text: 'CO2' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: ATP investment is needed to phosphorylate glucose at the start of glycolysis.'
  },
  {
    id: 'fake-cellenergetics-26',
    type: 'multiple-choice',
    question: 'Practice: Most cellular respiration in eukaryotes occurs in the...',
    options: [
      { label: 'A', value: 'A', text: 'Nucleus' },
      { label: 'B', value: 'B', text: 'Chloroplasts' },
      { label: 'C', value: 'C', text: 'Mitochondria' },
      { label: 'D', value: 'D', text: 'Cell wall' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Mitochondria are the site of most ATP production from aerobic respiration.'
  },
  {
    id: 'fake-cellenergetics-27',
    type: 'multiple-choice',
    question: 'Practice: In a sealed container with plants and a mouse, photosynthesis and respiration interact by...',
    options: [
      { label: 'A', value: 'A', text: 'Plants producing O2 used by the mouse, mouse producing CO2 used by plants' },
      { label: 'B', value: 'B', text: 'Both processes being completely independent' },
      { label: 'C', value: 'C', text: 'The mouse providing oxygen for the plants' },
      { label: 'D', value: 'D', text: 'Plants and mouse competing for oxygen' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: Plants and animals cycle O2 and CO2 between photosynthesis and respiration.'
  },
  {
    id: 'fake-cellenergetics-28',
    type: 'multiple-choice',
    question: 'Practice: If the electron transport chain is blocked, ATP production would...',
    options: [
      { label: 'A', value: 'A', text: 'Increase dramatically' },
      { label: 'B', value: 'B', text: 'Decrease significantly' },
      { label: 'C', value: 'C', text: 'Stay exactly the same' },
      { label: 'D', value: 'D', text: 'Only affect plants' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The ETC produces the vast majority of ATP; blocking it severely reduces ATP.'
  },
  {
    id: 'fake-cellenergetics-29',
    type: 'free-response',
    question: 'Practice: Compare the ATP yield of aerobic respiration versus alcoholic fermentation.',
    correctAnswer: 'Aerobic respiration produces about 36-38 ATP per glucose, while fermentation produces only 2 ATP per glucose because fermentation lacks the Krebs cycle and electron transport chain.',
    explanation: 'Practice: The ETC and Krebs cycle are responsible for most ATP production.'
  },
  {
    id: 'fake-cellenergetics-30',
    type: 'free-response',
    question: 'Practice: Why do plants need both chloroplasts and mitochondria?',
    correctAnswer: 'Chloroplasts capture light energy to make glucose through photosynthesis. Mitochondria break down glucose to make ATP through cellular respiration. Plants need both processes.',
    explanation: 'Practice: Photosynthesis makes food; respiration releases that stored energy as ATP.'
  }
];
