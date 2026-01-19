import { Question } from '@/types/quiz';

/**
 * FAKE/PRACTICE DATA for Cell Structure
 * 
 * These questions are shown when the real test is locked.
 * They should be similar in topic but NOT the actual test questions.
 */

export const cellstructureQuestions: Question[] = [
  {
    id: 'fake-cellstructure-1',
    type: 'multiple-choice',
    question: 'Practice: Which organelle is responsible for modifying and packaging proteins for export?',
    options: [
      { label: 'A', value: 'A', text: 'Ribosome' },
      { label: 'B', value: 'B', text: 'Mitochondria' },
      { label: 'C', value: 'C', text: 'Golgi apparatus' },
      { label: 'D', value: 'D', text: 'Lysosome' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: The Golgi apparatus modifies, sorts, and packages proteins for secretion.'
  },
  {
    id: 'fake-cellstructure-2',
    type: 'multiple-choice',
    question: 'Practice: Which organelle produces the most ATP in eukaryotic cells?',
    options: [
      { label: 'A', value: 'A', text: 'Chloroplast' },
      { label: 'B', value: 'B', text: 'Nucleus' },
      { label: 'C', value: 'C', text: 'Ribosome' },
      { label: 'D', value: 'D', text: 'Mitochondrion' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Mitochondria are the "powerhouses" that produce most cellular ATP.'
  },
  {
    id: 'fake-cellstructure-3',
    type: 'multiple-choice',
    question: 'Practice: Both simple diffusion and facilitated diffusion share which characteristic?',
    options: [
      { label: 'A', value: 'A', text: 'Both require ATP' },
      { label: 'B', value: 'B', text: 'Both move substances down their concentration gradient' },
      { label: 'C', value: 'C', text: 'Both require transport proteins' },
      { label: 'D', value: 'D', text: 'Both move substances against their gradient' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Both types of diffusion are passive and move molecules from high to low concentration.'
  },
  {
    id: 'fake-cellstructure-4',
    type: 'multiple-choice',
    question: 'Practice: Which membrane component is responsible for active transport?',
    options: [
      { label: 'A', value: 'A', text: 'Cholesterol' },
      { label: 'B', value: 'B', text: 'Transport proteins' },
      { label: 'C', value: 'C', text: 'Phospholipid tails' },
      { label: 'D', value: 'D', text: 'Carbohydrate chains' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Transport proteins use ATP to pump substances against concentration gradients.'
  },
  {
    id: 'fake-cellstructure-5',
    type: 'multiple-choice',
    question: 'Practice: Plant tissue mass changes when placed in different sucrose solutions. This is primarily due to...',
    options: [
      { label: 'A', value: 'A', text: 'Active transport of sucrose' },
      { label: 'B', value: 'B', text: 'Endocytosis' },
      { label: 'C', value: 'C', text: 'Osmosis' },
      { label: 'D', value: 'D', text: 'Exocytosis' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Osmosis is the movement of water across a membrane due to solute concentration differences.'
  },
  {
    id: 'fake-cellstructure-6',
    type: 'multiple-choice',
    question: 'Practice: The interior of the phospholipid bilayer is...',
    options: [
      { label: 'A', value: 'A', text: 'Hydrophilic' },
      { label: 'B', value: 'B', text: 'Hydrophobic' },
      { label: 'C', value: 'C', text: 'Charged' },
      { label: 'D', value: 'D', text: 'Polar' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The fatty acid tails form a hydrophobic interior that repels water.'
  },
  {
    id: 'fake-cellstructure-7',
    type: 'multiple-choice',
    question: 'Practice: Drinking seawater causes dehydration because...',
    options: [
      { label: 'A', value: 'A', text: 'Cells absorb too much salt' },
      { label: 'B', value: 'B', text: 'Water leaves cells by osmosis into the hypertonic solution' },
      { label: 'C', value: 'C', text: 'Cells burst from excess water' },
      { label: 'D', value: 'D', text: 'Salt destroys cell membranes' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Hypertonic seawater draws water out of cells, causing dehydration.'
  },
  {
    id: 'fake-cellstructure-8',
    type: 'multiple-choice',
    question: 'Practice: Most cellular enzymes are made of which macromolecule?',
    options: [
      { label: 'A', value: 'A', text: 'Lipids' },
      { label: 'B', value: 'B', text: 'Proteins' },
      { label: 'C', value: 'C', text: 'Carbohydrates' },
      { label: 'D', value: 'D', text: 'Nucleic acids' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Enzymes are proteins that catalyze biochemical reactions.'
  },
  {
    id: 'fake-cellstructure-9',
    type: 'multiple-choice',
    question: 'Practice: According to cell theory, all cells...',
    options: [
      { label: 'A', value: 'A', text: 'Have a nucleus' },
      { label: 'B', value: 'B', text: 'Are visible to the naked eye' },
      { label: 'C', value: 'C', text: 'Come from pre-existing cells' },
      { label: 'D', value: 'D', text: 'Are the same size' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Cell theory states that all cells arise from pre-existing cells.'
  },
  {
    id: 'fake-cellstructure-10',
    type: 'multiple-choice',
    question: 'Practice: Cell membranes are primarily composed of...',
    options: [
      { label: 'A', value: 'A', text: 'Cellulose fibers' },
      { label: 'B', value: 'B', text: 'Protein chains' },
      { label: 'C', value: 'C', text: 'Phospholipids' },
      { label: 'D', value: 'D', text: 'Carbohydrates' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: The phospholipid bilayer forms the main structure of cell membranes.'
  },
  {
    id: 'fake-cellstructure-11',
    type: 'multiple-choice',
    question: 'Practice: Particles moving from high to low concentration without energy is called...',
    options: [
      { label: 'A', value: 'A', text: 'Active transport' },
      { label: 'B', value: 'B', text: 'Endocytosis' },
      { label: 'C', value: 'C', text: 'Diffusion' },
      { label: 'D', value: 'D', text: 'Osmosis of solutes' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Diffusion is passive movement from high to low concentration.'
  },
  {
    id: 'fake-cellstructure-12',
    type: 'multiple-choice',
    question: 'Practice: In an isotonic solution, a cell maintains homeostasis because...',
    options: [
      { label: 'A', value: 'A', text: 'No water moves at all' },
      { label: 'B', value: 'B', text: 'Water moves in faster than out' },
      { label: 'C', value: 'C', text: 'Water moves equally in both directions' },
      { label: 'D', value: 'D', text: 'The cell pumps water out actively' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: In isotonic solutions, water moves in and out equally, maintaining balance.'
  },
  {
    id: 'fake-cellstructure-13',
    type: 'multiple-choice',
    question: 'Practice: The pathway of a secretory protein is...',
    options: [
      { label: 'A', value: 'A', text: 'Rough ER → Golgi → vesicles → plasma membrane' },
      { label: 'B', value: 'B', text: 'Golgi → Rough ER → lysosomes → membrane' },
      { label: 'C', value: 'C', text: 'Smooth ER → nucleus → vesicles → membrane' },
      { label: 'D', value: 'D', text: 'Ribosomes → lysosomes → Golgi → membrane' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: Secretory proteins travel from rough ER to Golgi to vesicles to the membrane.'
  },
  {
    id: 'fake-cellstructure-14',
    type: 'multiple-choice',
    question: 'Practice: Plant cells don\'t burst in hypotonic solutions because of their...',
    options: [
      { label: 'A', value: 'A', text: 'Large vacuoles' },
      { label: 'B', value: 'B', text: 'Cell walls' },
      { label: 'C', value: 'C', text: 'Chloroplasts' },
      { label: 'D', value: 'D', text: 'Extra mitochondria' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The rigid cell wall prevents plant cells from bursting when water enters.'
  },
  {
    id: 'fake-cellstructure-15',
    type: 'multiple-choice',
    question: 'Practice: Dye spreading evenly through water is an example of...',
    options: [
      { label: 'A', value: 'A', text: 'Active transport' },
      { label: 'B', value: 'B', text: 'Random molecular motion causing diffusion' },
      { label: 'C', value: 'C', text: 'Osmosis' },
      { label: 'D', value: 'D', text: 'Chemical bonding' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Diffusion occurs due to random kinetic motion of molecules.'
  },
  {
    id: 'fake-cellstructure-16',
    type: 'multiple-choice',
    question: 'Practice: Smooth ER is most abundant in cells that...',
    options: [
      { label: 'A', value: 'A', text: 'Produce many proteins' },
      { label: 'B', value: 'B', text: 'Synthesize lipids or detoxify drugs' },
      { label: 'C', value: 'C', text: 'Carry out photosynthesis' },
      { label: 'D', value: 'D', text: 'Store DNA' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Smooth ER synthesizes lipids and detoxifies harmful substances.'
  },
  {
    id: 'fake-cellstructure-17',
    type: 'multiple-choice',
    question: 'Practice: If lysosomes rupture inside a cell, the cell would likely...',
    options: [
      { label: 'A', value: 'A', text: 'Produce more proteins' },
      { label: 'B', value: 'B', text: 'Be digested by its own enzymes' },
      { label: 'C', value: 'C', text: 'Divide faster' },
      { label: 'D', value: 'D', text: 'Become larger' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Lysosomal enzymes can digest cellular components if released.'
  },
  {
    id: 'fake-cellstructure-18',
    type: 'multiple-choice',
    question: 'Practice: Evidence for endosymbiotic theory includes that mitochondria...',
    options: [
      { label: 'A', value: 'A', text: 'Have their own circular DNA and ribosomes' },
      { label: 'B', value: 'B', text: 'Have a single membrane' },
      { label: 'C', value: 'C', text: 'Lack any genetic material' },
      { label: 'D', value: 'D', text: 'Are found only in plants' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: Mitochondria have their own DNA and ribosomes, like prokaryotes.'
  },
  {
    id: 'fake-cellstructure-19',
    type: 'multiple-choice',
    question: 'Practice: A red blood cell in 15% NaCl solution would...',
    options: [
      { label: 'A', value: 'A', text: 'Swell and burst' },
      { label: 'B', value: 'B', text: 'Shrink (crenate)' },
      { label: 'C', value: 'C', text: 'Stay the same size' },
      { label: 'D', value: 'D', text: 'Divide' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The hypertonic solution draws water out, causing the cell to shrink.'
  },
  {
    id: 'fake-cellstructure-20',
    type: 'multiple-choice',
    question: 'Practice: Active transport differs from diffusion because it...',
    options: [
      { label: 'A', value: 'A', text: 'Moves substances down their gradient' },
      { label: 'B', value: 'B', text: 'Requires energy (ATP)' },
      { label: 'C', value: 'C', text: 'Does not require proteins' },
      { label: 'D', value: 'D', text: 'Only moves water' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Active transport uses ATP to move substances against concentration gradients.'
  },
  {
    id: 'fake-cellstructure-21',
    type: 'multiple-choice',
    question: 'Practice: Vesicles fusing with the plasma membrane to release contents is called...',
    options: [
      { label: 'A', value: 'A', text: 'Endocytosis' },
      { label: 'B', value: 'B', text: 'Phagocytosis' },
      { label: 'C', value: 'C', text: 'Exocytosis' },
      { label: 'D', value: 'D', text: 'Pinocytosis' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Exocytosis releases materials by vesicle fusion with the membrane.'
  },
  {
    id: 'fake-cellstructure-22',
    type: 'multiple-choice',
    question: 'Practice: Which structure is found in both plant and animal cells?',
    options: [
      { label: 'A', value: 'A', text: 'Cell wall' },
      { label: 'B', value: 'B', text: 'Chloroplast' },
      { label: 'C', value: 'C', text: 'Central vacuole' },
      { label: 'D', value: 'D', text: 'Mitochondria' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Both plant and animal cells have mitochondria for cellular respiration.'
  },
  {
    id: 'fake-cellstructure-23',
    type: 'multiple-choice',
    question: 'Practice: Plant cells maintain rigidity because the vacuole...',
    options: [
      { label: 'A', value: 'A', text: 'Produces proteins' },
      { label: 'B', value: 'B', text: 'Is filled with fluid that provides turgor pressure' },
      { label: 'C', value: 'C', text: 'Contains chlorophyll' },
      { label: 'D', value: 'D', text: 'Stores DNA' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The central vacuole filled with water creates turgor pressure for support.'
  },
  {
    id: 'fake-cellstructure-24',
    type: 'multiple-choice',
    question: 'Practice: All cells have DNA and a...',
    options: [
      { label: 'A', value: 'A', text: 'Nucleus' },
      { label: 'B', value: 'B', text: 'Cell membrane' },
      { label: 'C', value: 'C', text: 'Cell wall' },
      { label: 'D', value: 'D', text: 'Mitochondrion' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: All cells, including prokaryotes, have a cell membrane.'
  },
  {
    id: 'fake-cellstructure-25',
    type: 'multiple-choice',
    question: 'Practice: The scientists who concluded that cells are the basic unit of life were...',
    options: [
      { label: 'A', value: 'A', text: 'Watson and Crick' },
      { label: 'B', value: 'B', text: 'Darwin and Wallace' },
      { label: 'C', value: 'C', text: 'Schleiden and Schwann' },
      { label: 'D', value: 'D', text: 'Mendel and Morgan' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Schleiden and Schwann developed cell theory in the 1830s.'
  },
  {
    id: 'fake-cellstructure-26',
    type: 'free-response',
    question: 'Practice: Name four organelles found in eukaryotic cells and briefly describe each function.',
    correctAnswer: 'Nucleus: stores DNA. Mitochondria: produces ATP. Ribosomes: synthesize proteins. ER: protein/lipid processing.',
    explanation: 'Practice: Eukaryotic cells contain membrane-bound organelles with specialized functions.'
  },
  {
    id: 'fake-cellstructure-27',
    type: 'free-response',
    question: 'Practice: A dialysis bag with 20% sugar is placed in 10% sugar solution. What happens to the bag?',
    correctAnswer: 'The bag swells as water moves in by osmosis because the bag is hypertonic to the solution.',
    explanation: 'Practice: Water moves from hypotonic (10%) to hypertonic (20%) solution.'
  },
  {
    id: 'fake-cellstructure-28',
    type: 'multiple-choice',
    question: 'Practice: The nuclear envelope contains pores that allow...',
    options: [
      { label: 'A', value: 'A', text: 'Only DNA to exit' },
      { label: 'B', value: 'B', text: 'mRNA and proteins to pass through' },
      { label: 'C', value: 'C', text: 'Ribosomes to enter' },
      { label: 'D', value: 'D', text: 'Nothing to pass' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Nuclear pores regulate passage of RNA and proteins between nucleus and cytoplasm.'
  }
];
