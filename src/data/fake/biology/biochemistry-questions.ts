import { Question } from '@/types/quiz';

/**
 * FAKE/PRACTICE DATA for Biochemistry
 * 
 * These questions are shown when the real test is locked.
 * They should be similar in topic but NOT the actual test questions.
 */

export const biochemistryQuestions: Question[] = [
  {
    id: 'fake-biochemistry-1',
    type: 'multiple-choice',
    question: 'Practice: Which subatomic particles determine the identity of an element?',
    options: [
      { label: 'A', value: 'A', text: 'Electrons' },
      { label: 'B', value: 'B', text: 'Protons' },
      { label: 'C', value: 'C', text: 'Neutrons' },
      { label: 'D', value: 'D', text: 'Quarks' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Protons determine the atomic number and thus the identity of an element.'
  },
  {
    id: 'fake-biochemistry-2',
    type: 'multiple-choice',
    question: 'Practice: Water molecules stick together due to which type of bond?',
    options: [
      { label: 'A', value: 'A', text: 'Ionic bonds between hydrogen atoms' },
      { label: 'B', value: 'B', text: 'Covalent bonds between oxygen atoms' },
      { label: 'C', value: 'C', text: 'Hydrogen bonds between water molecules' },
      { label: 'D', value: 'D', text: 'Metallic bonds between all atoms' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Hydrogen bonds form between the partially positive hydrogen of one water molecule and the partially negative oxygen of another.'
  },
  {
    id: 'fake-biochemistry-3',
    type: 'multiple-choice',
    question: 'Practice: Chlorine has seven valence electrons and is highly electronegative. When it bonds with sodium, chlorine will most likely...',
    options: [
      { label: 'A', value: 'A', text: 'Share electrons equally' },
      { label: 'B', value: 'B', text: 'Lose an electron and become a cation' },
      { label: 'C', value: 'C', text: 'Gain an electron and become an anion' },
      { label: 'D', value: 'D', text: 'Form a triple bond' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Chlorine gains one electron to complete its valence shell, becoming a negatively charged chloride ion (Cl⁻).'
  },
  {
    id: 'fake-biochemistry-4',
    type: 'multiple-choice',
    question: 'Practice: A scientist wants to test if nitrogen affects plant growth. What is the best experimental design?',
    options: [
      { label: 'A', value: 'A', text: 'Grow plants with varying nitrogen levels while keeping other conditions constant' },
      { label: 'B', value: 'B', text: 'Observe plants in their natural habitat' },
      { label: 'C', value: 'C', text: 'Measure plant height without any experimental treatment' },
      { label: 'D', value: 'D', text: 'Remove plants from soil and examine their roots' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: A controlled experiment with the independent variable (nitrogen) manipulated allows for determining cause and effect.'
  },
  {
    id: 'fake-biochemistry-5',
    type: 'multiple-choice',
    question: 'Practice: When monomers join to form polymers through dehydration synthesis, what is always released?',
    options: [
      { label: 'A', value: 'A', text: 'Carbon dioxide' },
      { label: 'B', value: 'B', text: 'Oxygen gas' },
      { label: 'C', value: 'C', text: 'Water' },
      { label: 'D', value: 'D', text: 'Nitrogen' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Dehydration synthesis removes water as monomers join together.'
  },
  {
    id: 'fake-biochemistry-6',
    type: 'multiple-choice',
    question: 'Practice: What part of an amino acid differs between the 20 standard amino acids?',
    options: [
      { label: 'A', value: 'A', text: 'The central carbon atom' },
      { label: 'B', value: 'B', text: 'The amino group' },
      { label: 'C', value: 'C', text: 'The carboxyl group' },
      { label: 'D', value: 'D', text: 'The R group (side chain)' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Each amino acid has a unique R group that determines its properties.'
  },
  {
    id: 'fake-biochemistry-7',
    type: 'multiple-choice',
    question: 'Practice: What happens during every chemical reaction?',
    options: [
      { label: 'A', value: 'A', text: 'Mass is created or destroyed' },
      { label: 'B', value: 'B', text: 'Chemical bonds are broken and/or formed' },
      { label: 'C', value: 'C', text: 'Energy is always released' },
      { label: 'D', value: 'D', text: 'Temperature always increases' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: All chemical reactions involve breaking and/or forming bonds through electron rearrangement.'
  },
  {
    id: 'fake-biochemistry-8',
    type: 'multiple-choice',
    question: 'Practice: How do enzymes speed up chemical reactions?',
    options: [
      { label: 'A', value: 'A', text: 'By increasing the temperature' },
      { label: 'B', value: 'B', text: 'By lowering the activation energy' },
      { label: 'C', value: 'C', text: 'By changing the equilibrium' },
      { label: 'D', value: 'D', text: 'By adding more reactants' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Enzymes lower the activation energy barrier, allowing reactions to proceed faster.'
  },
  {
    id: 'fake-biochemistry-9',
    type: 'multiple-choice',
    question: 'Practice: Which structure is unique to lipids and not found in other macromolecules?',
    options: [
      { label: 'A', value: 'A', text: 'Phosphate groups' },
      { label: 'B', value: 'B', text: 'Long hydrocarbon chains' },
      { label: 'C', value: 'C', text: 'Amino groups' },
      { label: 'D', value: 'D', text: 'Nucleotide bases' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Fatty acid tails made only of carbon and hydrogen are characteristic of lipids.'
  },
  {
    id: 'fake-biochemistry-10',
    type: 'multiple-choice',
    question: 'Practice: Which macromolecule stores genetic information?',
    options: [
      { label: 'A', value: 'A', text: 'Proteins' },
      { label: 'B', value: 'B', text: 'Carbohydrates' },
      { label: 'C', value: 'C', text: 'Lipids' },
      { label: 'D', value: 'D', text: 'Nucleic acids' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: DNA and RNA (nucleic acids) store and transmit genetic information.'
  },
  {
    id: 'fake-biochemistry-11',
    type: 'multiple-choice',
    question: 'Practice: What part of a phospholipid is water-fearing?',
    options: [
      { label: 'A', value: 'A', text: 'The phosphate head' },
      { label: 'B', value: 'B', text: 'The fatty acid tails' },
      { label: 'C', value: 'C', text: 'The glycerol backbone' },
      { label: 'D', value: 'D', text: 'All parts equally' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: The nonpolar fatty acid tails are hydrophobic (water-fearing).'
  },
  {
    id: 'fake-biochemistry-12',
    type: 'multiple-choice',
    question: 'Practice: What causes an atom to become an ion?',
    options: [
      { label: 'A', value: 'A', text: 'Gaining or losing protons' },
      { label: 'B', value: 'B', text: 'Gaining or losing electrons' },
      { label: 'C', value: 'C', text: 'Gaining or losing neutrons' },
      { label: 'D', value: 'D', text: 'Sharing electrons equally' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Ions form when atoms gain or lose electrons, creating a net charge.'
  },
  {
    id: 'fake-biochemistry-13',
    type: 'multiple-choice',
    question: 'Practice: Which of the following is a simple molecule, not a macromolecule?',
    options: [
      { label: 'A', value: 'A', text: 'Starch' },
      { label: 'B', value: 'B', text: 'Hemoglobin' },
      { label: 'C', value: 'C', text: 'DNA' },
      { label: 'D', value: 'D', text: 'Water' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Water (H₂O) is a simple molecule, not a large polymer.'
  },
  {
    id: 'fake-biochemistry-14',
    type: 'multiple-choice',
    question: 'Practice: When two amino acids bond, which groups join together?',
    options: [
      { label: 'A', value: 'A', text: 'Two R groups' },
      { label: 'B', value: 'B', text: 'An amino group and a carboxyl group' },
      { label: 'C', value: 'C', text: 'Two amino groups' },
      { label: 'D', value: 'D', text: 'Two carboxyl groups' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: A peptide bond forms between the amino group of one amino acid and the carboxyl group of another.'
  },
  {
    id: 'fake-biochemistry-15',
    type: 'multiple-choice',
    question: 'Practice: What type of bond links amino acids in a protein chain?',
    options: [
      { label: 'A', value: 'A', text: 'Ionic bond' },
      { label: 'B', value: 'B', text: 'Hydrogen bond' },
      { label: 'C', value: 'C', text: 'Peptide bond' },
      { label: 'D', value: 'D', text: 'Glycosidic bond' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Peptide bonds are covalent bonds that link amino acids together.'
  },
  {
    id: 'fake-biochemistry-16',
    type: 'multiple-choice',
    question: 'Practice: Proteins are polymers made of which monomers?',
    options: [
      { label: 'A', value: 'A', text: 'Nucleotides' },
      { label: 'B', value: 'B', text: 'Monosaccharides' },
      { label: 'C', value: 'C', text: 'Amino acids' },
      { label: 'D', value: 'D', text: 'Fatty acids' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Proteins are chains of amino acids joined by peptide bonds.'
  },
  {
    id: 'fake-biochemistry-17',
    type: 'multiple-choice',
    question: 'Practice: Detergent can clean oily dishes because detergent molecules have...',
    options: [
      { label: 'A', value: 'A', text: 'Only polar regions that attract water' },
      { label: 'B', value: 'B', text: 'Only nonpolar regions that attract oil' },
      { label: 'C', value: 'C', text: 'Both polar and nonpolar regions' },
      { label: 'D', value: 'D', text: 'No chemical properties' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Detergent molecules are amphipathic with polar heads and nonpolar tails.'
  },
  {
    id: 'fake-biochemistry-18',
    type: 'multiple-choice',
    question: 'Practice: Wax on leaves helps plants because lipids are...',
    options: [
      { label: 'A', value: 'A', text: 'Good at conducting electricity' },
      { label: 'B', value: 'B', text: 'Water-repellent' },
      { label: 'C', value: 'C', text: 'Good energy conductors' },
      { label: 'D', value: 'D', text: 'Attracted to water' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Lipid waxes form waterproof barriers that protect plant surfaces.'
  },
  {
    id: 'fake-biochemistry-19',
    type: 'multiple-choice',
    question: 'Practice: Waxes repel water because lipids are...',
    options: [
      { label: 'A', value: 'A', text: 'Polar molecules that attract polar water' },
      { label: 'B', value: 'B', text: 'Ionic compounds that dissolve in water' },
      { label: 'C', value: 'C', text: 'Nonpolar molecules that do not mix with polar water' },
      { label: 'D', value: 'D', text: 'Metallic substances' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Nonpolar lipids repel polar water molecules.'
  },
  {
    id: 'fake-biochemistry-20',
    type: 'multiple-choice',
    question: 'Practice: A phospholipid contains...',
    options: [
      { label: 'A', value: 'A', text: 'Three fatty acid chains attached to glycerol' },
      { label: 'B', value: 'B', text: 'One fatty acid and three phosphate groups' },
      { label: 'C', value: 'C', text: 'Two fatty acid chains, glycerol, and a phosphate group' },
      { label: 'D', value: 'D', text: 'No glycerol backbone' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Phospholipids have two fatty acids, glycerol, and a phosphate group.'
  },
  {
    id: 'fake-biochemistry-21',
    type: 'multiple-choice',
    question: 'Practice: Scientific theories about the origin of life generally agree that early life needed...',
    options: [
      { label: 'A', value: 'A', text: 'Energy sources and concentrated organic molecules' },
      { label: 'B', value: 'B', text: 'Fully formed cells from the beginning' },
      { label: 'C', value: 'C', text: 'Oxygen-rich atmospheres' },
      { label: 'D', value: 'D', text: 'Multicellular organisms first' }
    ],
    correctAnswer: 'A',
    explanation: 'Practice: Origin of life theories require energy and concentration of molecules for chemical evolution.'
  },
  {
    id: 'fake-biochemistry-22',
    type: 'free-response',
    question: 'Practice: Amylase breaks down starch into simpler sugars. What type of macromolecule is amylase?',
    correctAnswer: 'Protein',
    explanation: 'Practice: All enzymes are proteins that catalyze specific reactions.'
  },
  {
    id: 'fake-biochemistry-23',
    type: 'free-response',
    question: 'Practice: A test tube contains nitrogen and phosphorus but no sulfur. If it could contain protein, DNA, or glucose, which is most likely present?',
    correctAnswer: 'DNA',
    explanation: 'Practice: DNA contains nitrogen (in bases) and phosphorus (in backbone) but no sulfur.'
  },
  {
    id: 'fake-biochemistry-24',
    type: 'free-response',
    question: 'Practice: A molecule has nitrogen, carbon, hydrogen, oxygen, and sulfur. What type of macromolecule is it?',
    correctAnswer: 'Protein',
    explanation: 'Practice: Proteins contain C, H, O, N, and often S (in certain amino acids).'
  },
  {
    id: 'fake-biochemistry-25',
    type: 'free-response',
    question: 'Practice: A molecule contains only carbon, hydrogen, and oxygen in a 1:2:1 ratio. What type is it?',
    correctAnswer: 'Carbohydrate',
    explanation: 'Practice: Carbohydrates have the general formula (CH₂O)n.'
  },
  {
    id: 'fake-biochemistry-26',
    type: 'multiple-choice',
    question: 'Practice: In a water molecule, what holds the atoms together?',
    options: [
      { label: 'A', value: 'A', text: 'Ionic bonds' },
      { label: 'B', value: 'B', text: 'Hydrogen bonds' },
      { label: 'C', value: 'C', text: 'Covalent bonds' },
      { label: 'D', value: 'D', text: 'Van der Waals forces' }
    ],
    correctAnswer: 'C',
    explanation: 'Practice: Covalent bonds hold the H and O atoms together within a water molecule.'
  },
  {
    id: 'fake-biochemistry-27',
    type: 'multiple-choice',
    question: 'Practice: Carbon can form how many covalent bonds?',
    options: [
      { label: 'A', value: 'A', text: '1' },
      { label: 'B', value: 'B', text: '2' },
      { label: 'C', value: 'C', text: '3' },
      { label: 'D', value: 'D', text: '4' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Carbon has 4 valence electrons and can form 4 covalent bonds.'
  },
  {
    id: 'fake-biochemistry-28',
    type: 'multiple-choice',
    question: 'Practice: A solution with pH 3 compared to pH 6 has how many more hydrogen ions?',
    options: [
      { label: 'A', value: 'A', text: '3 times more' },
      { label: 'B', value: 'B', text: '30 times more' },
      { label: 'C', value: 'C', text: '100 times more' },
      { label: 'D', value: 'D', text: '1000 times more' }
    ],
    correctAnswer: 'D',
    explanation: 'Practice: Each pH unit represents a 10-fold difference, so 3 units = 10³ = 1000 times.'
  },
  {
    id: 'fake-biochemistry-29',
    type: 'multiple-choice',
    question: 'Practice: Which property of water allows it to moderate temperature?',
    options: [
      { label: 'A', value: 'A', text: 'Low specific heat' },
      { label: 'B', value: 'B', text: 'High specific heat' },
      { label: 'C', value: 'C', text: 'Low density' },
      { label: 'D', value: 'D', text: 'Nonpolarity' }
    ],
    correctAnswer: 'B',
    explanation: 'Practice: Water\'s high specific heat allows it to absorb/release heat without large temperature changes.'
  },
  {
    id: 'fake-biochemistry-30',
    type: 'free-response',
    question: 'Practice: What is the term for the breakdown of polymers using water?',
    correctAnswer: 'Hydrolysis',
    explanation: 'Practice: Hydrolysis uses water to break bonds between monomers.'
  }
];
