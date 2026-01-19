import { Question } from '@/types/quiz';

export const compoundsQuestions: Question[] = [
  {
    id: 'fake-compounds-1',
    type: 'multiple-choice',
    question: 'What type of bond is expected between atoms of barium and bromine?',
    options: [
      { label: 'A', value: 'A', text: 'Metallic' },
      { label: 'B', value: 'B', text: 'Polar Covalent' },
      { label: 'C', value: 'C', text: 'Nonpolar Covalent' },
      { label: 'D', value: 'D', text: 'Ionic' }
    ],
    correctAnswer: 'D',
    explanation: 'Barium is a metal and bromine is a nonmetal, so they form ionic bonds.'
  },
  {
    id: 'fake-compounds-2',
    type: 'multiple-choice',
    question: 'What type of bond is expected between atoms of Silver and Gold?',
    options: [
      { label: 'A', value: 'A', text: 'Metallic' },
      { label: 'B', value: 'B', text: 'Polar Covalent' },
      { label: 'C', value: 'C', text: 'Nonpolar Covalent' },
      { label: 'D', value: 'D', text: 'Ionic' }
    ],
    correctAnswer: 'A',
    explanation: 'Both Ag and Au are metals, so they form metallic bonds.'
  },
  {
    id: 'fake-compounds-3',
    type: 'multiple-choice',
    question: 'What type of bond is expected between atoms of arsenic and tellurium?',
    options: [
      { label: 'A', value: 'A', text: 'Metallic' },
      { label: 'B', value: 'B', text: 'Polar Covalent' },
      { label: 'C', value: 'C', text: 'Nonpolar Covalent' },
      { label: 'D', value: 'D', text: 'Ionic' }
    ],
    correctAnswer: 'C',
    explanation: 'Both elements are metalloids with a small electronegativity difference, giving a nonpolar covalent bond.'
  },
  {
    id: 'fake-compounds-4',
    type: 'multiple-choice',
    question: 'What type of bond is expected between atoms of bromine and oxygen?',
    options: [
      { label: 'A', value: 'A', text: 'Metallic' },
      { label: 'B', value: 'B', text: 'Polar Covalent' },
      { label: 'C', value: 'C', text: 'Nonpolar Covalent' },
      { label: 'D', value: 'D', text: 'Ionic' }
    ],
    correctAnswer: 'B',
    explanation: 'Although both are nonmetals, oxygen is much more electronegative, forming a polar covalent bond.'
  },
  {
    id: 'fake-compounds-5',
    type: 'multiple-choice',
    question: 'A white powder that does not conduct electricity as a solid. It can be easily dissolved in water, and conducts electricity well in solution. Which bond type does this data suggest for the white powder?',
    options: [
      { label: 'A', value: 'A', text: 'Metallic' },
      { label: 'B', value: 'B', text: 'Polar Covalent' },
      { label: 'C', value: 'C', text: 'Nonpolar Covalent' },
      { label: 'D', value: 'D', text: 'Ionic' }
    ],
    correctAnswer: 'D',
    explanation: 'Substances that dissolve in water and conduct electricity in solution are ionic compounds.'
  },
  {
    id: 'fake-compounds-6',
    type: 'multiple-choice',
    question: 'Which of these best describes what happens when Ca and S combine to form CaS?',
    options: [
      { label: 'A', value: 'A', text: 'Calcium gains two protons and sulfur loses two protons' },
      { label: 'B', value: 'B', text: 'Sulfur transfers two protons to calcium' },
      { label: 'C', value: 'C', text: 'Calcium transfers two electrons to sulfur' },
      { label: 'D', value: 'D', text: 'Calcium gains two electrons, and sulfur loses two electrons' }
    ],
    correctAnswer: 'C',
    explanation: 'Ionic bonds transfer electrons from cations to anions to fill valence shells.'
  },
  {
    id: 'fake-compounds-7',
    type: 'multiple-choice',
    question: 'For a Lewis Structure of PBr4+, which of the following is true?',
    options: [
      { label: 'A', value: 'A', text: 'It has 32 total valence electrons' },
      { label: 'B', value: 'B', text: 'It has 34 total valence electrons' },
      { label: 'C', value: 'C', text: 'It has 33 total valence electrons' },
      { label: 'D', value: 'D', text: 'It has 31 total valence electrons' }
    ],
    correctAnswer: 'A',
    explanation: 'P has 5, each Br has 7, subtract 1 for positive charge: 5 + 28 - 1 = 32 electrons.'
  },
  {
    id: 'fake-compounds-8',
    type: 'multiple-choice',
    question: 'Which of these is mostly likely a property of PCl3?',
    options: [
      { label: 'A', value: 'A', text: 'It is a gas at room temperature' },
      { label: 'B', value: 'B', text: 'It conducts electricity when dissolved in water' },
      { label: 'C', value: 'C', text: 'It forms a crystalline lattice structure instead of individual molecules' }
    ],
    correctAnswer: 'A',
    explanation: 'PCl3 is covalently bonded and exists as discrete molecules, typically as a liquid/gas.'
  },
  {
    id: 'fake-compounds-9',
    type: 'multiple-choice',
    question: 'Which intermolecular forces (IMFs) are experienced by PCl3?',
    options: [
      { label: 'A', value: 'A', text: 'London Dispersion only' },
      { label: 'B', value: 'B', text: 'London dispersion and dipole-dipole' },
      { label: 'C', value: 'C', text: 'Dipole-dipole and hydrogen bonding' },
      { label: 'D', value: 'D', text: 'Dipole-dipole only' }
    ],
    correctAnswer: 'B',
    explanation: 'PCl3 is polar due to its trigonal pyramidal geometry.'
  },
  {
    id: 'fake-compounds-10',
    type: 'multiple-choice',
    question: 'What is the molecular geometry of PCl3?',
    options: [
      { label: 'A', value: 'A', text: 'Tetrahedral' },
      { label: 'B', value: 'B', text: 'Linear' },
      { label: 'C', value: 'C', text: 'Trigonal pyramidal' },
      { label: 'D', value: 'D', text: 'Seesaw' }
    ],
    correctAnswer: 'C',
    explanation: 'PCl3 has 3 bonds and 1 lone pair → trigonal pyramidal.'
  },
  {
    id: 'fake-compounds-11',
    type: 'multiple-choice',
    question: 'Why is the H-O-H angle in H2O smaller than the H-C-H angle in CH4?',
    options: [
      { label: 'A', value: 'A', text: 'The lone pair electrons on O in H2O exert more repulsive force than bonded electrons' },
      { label: 'B', value: 'B', text: 'The hydrogen nuclei in H2O are attracted to each other, bringing them closer' },
      { label: 'C', value: 'C', text: 'H2O is polar, while CH4 is nonpolar' },
      { label: 'D', value: 'D', text: 'C has a higher electronegativity than O' }
    ],
    correctAnswer: 'A',
    explanation: 'Lone pairs exert more repulsive force than bonding pairs.'
  },
  {
    id: 'fake-compounds-12',
    type: 'multiple-choice',
    question: 'What type of bond exists between hydrogen and oxygen in water?',
    options: [
      { label: 'A', value: 'A', text: 'Ionic because electrons are transferred from H to O atoms' },
      { label: 'B', value: 'B', text: 'Covalent because electrons are transferred from H to O atoms' },
      { label: 'C', value: 'C', text: 'Ionic because electrons are shared between H and O atoms' },
      { label: 'D', value: 'D', text: 'Covalent because electrons are shared between H and O atoms' }
    ],
    correctAnswer: 'D',
    explanation: 'H and O are covalently bonded and covalent means shared.'
  },
  {
    id: 'fake-compounds-13',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of SiH4 and does it have resonance? Draw the structure.',
    correctAnswer: 'Tetrahedral, Nonpolar, No Resonance',
    explanation: 'SiH4 has 4 electron domains around Si → tetrahedral. Symmetry makes it nonpolar. No resonance is possible.'
  },
  {
    id: 'fake-compounds-14',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of NO3- and does it have resonance? Draw the structure.',
    correctAnswer: 'Trigonal Planar, Nonpolar, Has Resonance',
    explanation: 'NO3- has 3 electron groups around N → trigonal planar. Symmetry makes it nonpolar. It has 3 equivalent resonance structures.'
  },
  {
    id: 'fake-compounds-15',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of AsCl3 and does it have resonance? Draw the structure.',
    correctAnswer: 'Trigonal Pyramidal, Polar, No Resonance',
    explanation: 'AsCl3 has 3 bonds and 1 lone pair → trigonal pyramidal. Lone pair causes polarity. No resonance exists.'
  },
  {
    id: 'fake-compounds-16',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of TeCl6 and does it have resonance? Draw the structure.',
    correctAnswer: 'Octahedral, Nonpolar, No Resonance',
    explanation: 'TeCl6 has 6 bonding pairs and no lone pairs → octahedral and symmetrical, making it nonpolar.'
  },
  {
    id: 'fake-compounds-17',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of CO2 and does it have resonance? Draw the structure.',
    correctAnswer: 'Linear, Nonpolar, Has Resonance',
    explanation: 'CO2 is linear due to two double bonds. Symmetry makes it nonpolar. Resonance exists between possible O=C=O forms.'
  },
  {
    id: 'fake-compounds-18',
    type: 'free-response',
    question: 'What is the Geometry and Polarity of ClF5 and does it have resonance? Draw the structure.',
    correctAnswer: 'Square Pyramidal, Polar, No Resonance',
    explanation: '5 bonds and 1 lone pair → square pyramidal. Asymmetry makes it polar. No resonance structures exist.'
  },
  {
    id: 'fake-compounds-19',
    type: 'free-response',
    question: 'Identify all of the IMFs: C8H18',
    correctAnswer: 'It is nonpolar so it only has London Dispersion',
    explanation: 'Octane is a nonpolar hydrocarbon, so its only IMF is London dispersion.'
  },
  {
    id: 'fake-compounds-20',
    type: 'free-response',
    question: 'Identify all of the IMFs: SiH2Cl2',
    correctAnswer: 'It is polar so it has both London Dispersion and Dipole Dipole',
    explanation: 'The Cl atoms create molecular polarity → dipole-dipole + dispersion.'
  },
  {
    id: 'fake-compounds-21',
    type: 'free-response',
    question: 'Identify all of the IMFs: PH3',
    correctAnswer: 'It is polar so it has London Dispersion and Dipole Dipole only',
    explanation: 'PH3 is polar but P-H bonds are not polar enough for hydrogen bonding.'
  },
  {
    id: 'fake-compounds-22',
    type: 'free-response',
    question: 'Identify all of the IMFs: C2H5OH',
    correctAnswer: 'It is polar and H bonds with O so it has London Dispersion, Dipole Dipole, and Hydrogen Bonding',
    explanation: 'OH group allows H-bonding; molecule is polar → all 3 IMFs.'
  },
  {
    id: 'fake-compounds-23',
    type: 'free-response',
    question: 'Name Fe2(SO4)3',
    correctAnswer: 'Iron (III) Sulfate',
    explanation: 'SO4 is -2 → total -6. 2 Fe atoms must total +6 → each is +3 → Iron(III).'
  },
  {
    id: 'fake-compounds-24',
    type: 'free-response',
    question: 'Name P2O5',
    correctAnswer: 'Diphosphorus pentoxide',
    explanation: 'Use Greek prefixes: 2 phosphorus = di-phosphorus, 5 oxygen = pentoxide.'
  },
  {
    id: 'fake-compounds-25',
    type: 'free-response',
    question: 'Name MgS',
    correctAnswer: 'Magnesium Sulfide',
    explanation: 'Mg has a fixed +2 charge; sulfide is S²⁻ → magnesium sulfide is correct.'
  },
  {
    id: 'fake-compounds-26',
    type: 'free-response',
    question: 'Name Al(NO3)3',
    correctAnswer: 'Aluminum Nitrate',
    explanation: 'Nitrate is -1 each, total -3 → Al is +3 (its normal charge).'
  },
  {
    id: 'fake-compounds-27',
    type: 'free-response',
    question: 'Name Na3P',
    correctAnswer: 'Sodium Phosphide',
    explanation: 'Na is +1; P is -3; name as metal + nonmetal with -ide ending.'
  },
  {
    id: 'fake-compounds-28',
    type: 'free-response',
    question: 'Name GeSe2',
    correctAnswer: 'Germanium Diselenide',
    explanation: 'Molecular naming with Greek prefixes for covalent compounds.'
  },
  {
    id: 'fake-compounds-29',
    type: 'free-response',
    question: 'Name CuCl',
    correctAnswer: 'Copper (I) Chloride',
    explanation: 'Copper forms +1 here; chloride is -1 → copper (I) chloride.'
  },
  {
    id: 'fake-compounds-30',
    type: 'free-response',
    question: 'Name Cr(ClO3)3',
    correctAnswer: 'Chromium (III) chlorate',
    explanation: 'Each ClO3⁻ is -1 → total -3 → Cr must be +3.'
  },
  {
    id: 'fake-compounds-31',
    type: 'free-response',
    question: 'What is the formula of Tetrasulfur decafluoride?',
    correctAnswer: 'S4F10',
    explanation: 'Tetra = 4 S; deca = 10 F → S4F10.'
  },
  {
    id: 'fake-compounds-32',
    type: 'free-response',
    question: 'What is the formula of Lithium Oxide?',
    correctAnswer: 'Li2O',
    explanation: 'Oxide needs 2 electrons to fill its shell, 2 lithium atoms provide this.'
  },
  {
    id: 'fake-compounds-33',
    type: 'free-response',
    question: 'What is the formula of Iron (III) bromide?',
    correctAnswer: 'FeBr3',
    explanation: 'Iron is +3, each bromide is -1, so 3 bromides needed.'
  },
  {
    id: 'fake-compounds-34',
    type: 'free-response',
    question: 'What is the formula of Zinc Nitride?',
    correctAnswer: 'Zn3N2',
    explanation: 'Zn²⁺ and N³⁻ combine in a 3:2 ratio.'
  },
  {
    id: 'fake-compounds-35',
    type: 'free-response',
    question: 'What is the formula of Dinitrogen trioxide?',
    correctAnswer: 'N2O3',
    explanation: 'Di = 2 N; tri = 3 O → N2O3.'
  },
  {
    id: 'fake-compounds-36',
    type: 'free-response',
    question: 'What is the formula of Xenon tetrafluoride?',
    correctAnswer: 'XeF4',
    explanation: 'Following naming rules for binary covalent compounds, the formula is XeF4.'
  },
  {
    id: 'fake-compounds-37',
    type: 'free-response',
    question: 'What is the formula of Tin (IV) oxide?',
    correctAnswer: 'SnO2',
    explanation: 'Tin is +4, oxygen is -2, so 2 oxygens needed.'
  },
  {
    id: 'fake-compounds-38',
    type: 'free-response',
    question: 'What is the formula of Calcium phosphate?',
    correctAnswer: 'Ca3(PO4)2',
    explanation: 'PO4 is -3, Ca is +2, so need 3 Ca and 2 PO4.'
  },
  {
    id: 'fake-compounds-39',
    type: 'free-response',
    question: 'Butane and butyl chloride have similar structures but different boiling points. Propose an explanation for the difference in boiling point using intermolecular forces.',
    correctAnswer: 'Chlorine is heavier and more electronegative, so butyl chloride has stronger London dispersion forces and dipole-dipole interactions, resulting in a higher boiling point.',
    explanation: 'The presence of chlorine increases both mass and polarity.'
  },
  {
    id: 'fake-compounds-40',
    type: 'free-response',
    question: 'Stellium (St) forms a polyatomic ion called stellate. If sodium stellate has the formula Na3(StO4), what is the formula of Iron (III) Stellate?',
    correctAnswer: 'Fe(StO4)',
    explanation: 'StO4 has -3 charge to balance 3 Na+. Iron(III) is +3, so one StO4 balances one Fe.'
  },
];
