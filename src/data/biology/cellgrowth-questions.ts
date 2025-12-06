import { Question } from '@/types/quiz';

export const cellgrowthQuestions: Question[] = [
  {
    id: 'cellgrowth-1',
    type: 'multiple-choice',
    question: 'DNA replication occurs',
    options: [
      { label: 'A', value: 'A', text: 'during the S phase of the cell cycle' },
      { label: 'B', value: 'B', text: 'as the nuclear envelope breaks down in early mitosis' },
      { label: 'C', value: 'C', text: 'during mitosis but not during meiosis' },
      { label: 'D', value: 'D', text: 'in animal cells but not in plant cells' },
      { label: 'E', value: 'E', text: 'only in cells destined to become gametes' },
    ],
    correctAnswer: 'A',
    explanation: 'DNA replication happens during the S (synthesis) phase, before mitosis begins.'
  },
  {
    id: 'cellgrowth-2',
    type: 'multiple-choice',
    question: 'In a dividing somatic cell, chromosomes line up individually along the center of the cell before being pulled apart. Which statement best explains this stage of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'Homologous chromosomes pair' },
      { label: 'B', value: 'B', text: 'Tetrads are forming at the metaphase plate' },
      { label: 'C', value: 'C', text: 'Sister chromatids are aligned at the equator for seperation' },
      { label: 'D', value: 'D', text: 'Chromosomes are unreplicated and move randomly' }
    ],
    correctAnswer: 'C',
    explanation: 'During metaphase of mitosis, sister chromatids line up along the metaphase plate before being separated in anaphase.'
  },
  {
    id: 'cellgrowth-3',
    type: 'multiple-choice',
    question: 'After a round of mitosis in a liver cell, a student observes that both daughter cells have the same chromosome number as the original parent. What does this observation suggest about the process of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'Mitosis always produces genetically unique cells' },
      { label: 'B', value: 'B', text: 'Mitosis ensures chromosome number is maintained' },
      { label: 'C', value: 'C', text: 'Mitosis halves the chromosome number' },
      { label: 'D', value: 'D', text: 'Mitosis is responsible for the crossing over of genetic material' }
    ],
    correctAnswer: 'B',
    explanation: 'Mitosis produces two genetically identical daughter cells, each with the same chromosome number as the parent cell.'
  },
  {
    id: 'cellgrowth-4',
    type: 'multiple-choice',
    question: 'A biopsy reveals cells dividing at an unusually fast rate, ignoring normal signals to stop. Which characteristic most likely describes these cancerous cells?',
    options: [
      { label: 'A', value: 'A', text: 'They have longer interphase periods' },
      { label: 'B', value: 'B', text: 'They divide with tightly controlled checkpoints' },
      { label: 'C', value: 'C', text: 'They replicate more slowly than normal cells' },
      { label: 'D', value: 'D', text: 'They progress through the cell cycle more rapidly' }
    ],
    correctAnswer: 'D',
    explanation: 'Cancer cells often bypass cell cycle checkpoints, causing them to divide more rapidly than normal cells.'
  },
  {
    id: 'cellgrowth-5',
    type: 'multiple-choice',
    question: 'At what point in the cell cycle do chromosomes first consist of two identical sister chromatids joined together at a centromere, forming the classic X-shape?',
    options: [
      { label: 'A', value: 'A', text: 'During the G1 phase' },
      { label: 'B', value: 'B', text: 'At the end of the G2 phase' },
      { label: 'C', value: 'C', text: 'Immediately after the S phase' },
      { label: 'D', value: 'D', text: 'During cytokinesis' }
    ],
    correctAnswer: 'C',
    explanation: 'After the S phase, each chromosome consists of two sister chromatids connected at the centromere.'
  },
  {
    id: 'cellgrowth-6',
    type: 'multiple-choice',
    question: 'How many total chromosomes are in a normal human somatic (body) cell?',
    options: [
      { label: 'A', value: 'A', text: '23' },
      { label: 'B', value: 'B', text: '32' },
      { label: 'C', value: 'C', text: '46' },
      { label: 'D', value: 'D', text: '64' }
    ],
    correctAnswer: 'C',
    explanation: 'Human somatic cells are diploid (2n) and contain 46 chromosomes—23 pairs.'
  },
  {
    id: 'cellgrowth-7',
    type: 'multiple-choice',
    question: 'A student was told to use a light microscope to count the number of chromosomes of a newly discovered species. What phase of the cell cycle should the student investigate to be able to see the chromosomes to count them?',
    options: [
      { label: 'A', value: 'A', text: 'G1' },
      { label: 'B', value: 'B', text: 'G2' },
      { label: 'C', value: 'C', text: 'S' },
      { label: 'D', value: 'D', text: 'M' }
    ],
    correctAnswer: 'D',
    explanation: 'Chromosomes are most condensed and visible during mitosis (M phase), especially during metaphase.'
  },
  {
    id: 'cellgrowth-8',
    type: 'multiple-choice',
    question: 'If a cell has 12 chromosomes, how many chromosomes will each of its daughter cells have after mitosis?',
    options: [
      { label: 'A', value: 'A', text: '4' },
      { label: 'B', value: 'B', text: '6' },
      { label: 'C', value: 'C', text: '12' },
      { label: 'D', value: 'D', text: '24' }
    ],
    correctAnswer: 'C',
    explanation: 'Mitosis produces two genetically identical daughter cells, each with the same number of chromosomes as the parent.'
  },
  {
    id: 'cellgrowth-9',
    type: 'multiple-choice',
    question: 'If the S phase were eliminated from the cell cycle, the daughter cells would',
    options: [
      { label: 'A', value: 'A', text: 'have half the genetic material found in the parent cell' },
      { label: 'B', value: 'B', text: 'be genetically identical to each other' },
      { label: 'C', value: 'C', text: 'be genetically indentical to the parent cell' },
      { label: 'D', value: 'D', text: 'continue to function without the normal amount of DNA' }
    ],
    correctAnswer: 'A',
    explanation: 'Without S phase, DNA does not replicate, so mitosis would split the existing DNA in half between the two daughter cells.'
  },
  {
    id: 'cellgrowth-10',
    type: 'multiple-choice',
    question: 'What phase of mitosis takes the longest period of time?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase' },
      { label: 'B', value: 'B', text: 'Cytokinesis' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Interphase' }
    ],
    correctAnswer: 'A',
    explanation: 'Prophase is typically the longest stage of mitosis because chromatin condenses and the spindle forms.'
  },
  {
    id: 'cellgrowth-11',
    type: 'free-response',
    question: 'A patient suffers a spinal cord injury and is told that full recovery is unlikely. Using your understanding of the cell cycle, explain why certain cells in the nervous system do not regenerate effectively after injury.',
    correctAnswer: 'Nervous system cells often enter the G0 phase, a non-dividing state. Because they remain in G0 indefinitely, they do not undergo mitosis and therefore cannot regenerate effectively.',
    explanation: 'Most neurons permanently exit the cell cycle into G0, losing the ability to proliferate and replace damaged cells.'
  },
  {
    id: 'cellgrowth-12a',
    type: 'free-response',
    question: 'While examining cells in prophase under a microscope, a student notices that chromosomes appear X-shaped. What does this shape reveal about the stage of the cell cycle the cell has already completed? Explain what causes this X-like structure to form.',
    correctAnswer: 'The X-shape indicates that the cell has completed the S phase, during which DNA replication occurs. Each chromosome now consists of two identical sister chromatids joined at the centromere, forming the X-shaped structure.',
    explanation: 'The X-shape forms because DNA was replicated during S phase, producing two chromatids held together at the centromere.'
  },

  //CHATGPT GENERATED

  {
    id: 'cellgrowth-12b',
    type: 'multiple-choice',
    question: 'A cell that has grown too large becomes inefficient mainly because:',
    options: [
      { label: 'A', value: 'A', text: 'Its DNA expands faster than its surface area' },
      { label: 'B', value: 'B', text: 'Its surface area can no longer keep up with the needs generated by its volume' },
      { label: 'C', value: 'C', text: 'Its nucleus divides too quickly' },
      { label: 'D', value: 'D', text: 'It gains the ability to produce more waste than nutrients' }
    ],
    correctAnswer: 'B',
    explanation: 'As volume increases faster than surface area, the membrane can no longer move materials efficiently, making the cell less efficient.'
  },
  {
    id: 'cellgrowth-13',
    type: 'multiple-choice',
    question: 'If a cell suddenly doubled its volume but kept the same surface area, which consequence would MOST likely force the cell into division?',
    options: [
      { label: 'A', value: 'A', text: 'Information overload becomes reduced' },
      { label: 'B', value: 'B', text: 'Traffic of materials becomes less restricted' },
      { label: 'C', value: 'C', text: 'Waste removal would fall behind metabolic demands' },
      { label: 'D', value: 'D', text: 'DNA replication would occur faster than normal' }
    ],
    correctAnswer: 'C',
    explanation: 'A larger volume with the same surface area reduces efficiency, causing waste to build up faster than it can be removed.'
  },
  {
    id: 'cellgrowth-14',
    type: 'multiple-choice',
    question: 'A hydra reproducing by budding demonstrates an evolutionary tradeoff where the organism:',
    options: [
      { label: 'A', value: 'A', text: 'Sacrifices speed for genetic variety' },
      { label: 'B', value: 'B', text: 'Gains genetic diversity while losing efficiency' },
      { label: 'C', value: 'C', text: 'Maintains stability while losing adaptability' },
      { label: 'D', value: 'D', text: 'Produces genetically unique individuals in stable environments' }
    ],
    correctAnswer: 'C',
    explanation: 'Asexual reproduction is fast and stable but produces clones with low adaptability to change.'
  },
  {
    id: 'cellgrowth-15',
    type: 'multiple-choice',
    question: 'Which situation BEST explains why sexual reproduction is favored in changing environments?',
    options: [
      { label: 'A', value: 'A', text: 'It produces offspring identical to the parent' },
      { label: 'B', value: 'B', text: 'It replaces damaged body cells' },
      { label: 'C', value: 'C', text: 'It increases the likelihood some offspring will survive new conditions' },
      { label: 'D', value: 'D', text: 'It is faster and does not require another organism' }
    ],
    correctAnswer: 'C',
    explanation: 'Sexual reproduction increases genetic diversity, improving survival when environments change.'
  },
  {
    id: 'cellgrowth-16',
    type: 'multiple-choice',
    question: 'When a cell divides, replication of DNA BEFORE division solves which major problem?',
    options: [
      { label: 'A', value: 'A', text: 'Inefficient nutrient absorption' },
      { label: 'B', value: 'B', text: 'Loss of genetic material when the cell splits' },
      { label: 'C', value: 'C', text: 'Increased amount of spindle fibers' },
      { label: 'D', value: 'D', text: 'Uncoordinated arrangement of sister chromatids' }
    ],
    correctAnswer: 'B',
    explanation: 'DNA must be doubled before division so each daughter cell receives a complete copy.'
  },
  {
    id: 'cellgrowth-17',
    type: 'multiple-choice',
    question: 'Which statement correctly connects chromosome structure to the NEED for chromosomes during division?',
    options: [
      { label: 'A', value: 'A', text: 'Chromosomes prevent histones from condensing' },
      { label: 'B', value: 'B', text: 'Chromosomes scatter DNA so each daughter cell gets random pieces' },
      { label: 'C', value: 'C', text: 'Chromosomes protect DNA from being lost or damaged during mitosis' },
      { label: 'D', value: 'D', text: 'Chromosomes make DNA harder to organize' }
    ],
    correctAnswer: 'C',
    explanation: 'Condensed chromosomes keep DNA organized and prevent loss during movement in mitosis.'
  },
  {
    id: 'cellgrowth-18',
    type: 'multiple-choice',
    question: 'A cell in which spindle fibers are not attaching properly would be stopped by:',
    options: [
      { label: 'A', value: 'A', text: 'External growth factors' },
      { label: 'B', value: 'B', text: 'The G1 checkpoint' },
      { label: 'C', value: 'C', text: 'Internal regulators' },
      { label: 'D', value: 'D', text: 'Apoptosis' }
    ],
    correctAnswer: 'C',
    explanation: 'Internal regulators check spindle attachment before the cell proceeds to anaphase.'
  },
  {
    id: 'cellgrowth-19',
    type: 'multiple-choice',
    question: 'Binary fission differs from mitosis primarily because:',
    options: [
      { label: 'A', value: 'A', text: 'It separates sister chromatids' },
      { label: 'B', value: 'B', text: 'It does not require DNA replication' },
      { label: 'C', value: 'C', text: 'It involves organelle duplication and spindle formation' },
      { label: 'D', value: 'D', text: 'It is simpler and occurs without a nucleus' }
    ],
    correctAnswer: 'D',
    explanation: 'Prokaryotes lack a nucleus and perform simple binary fission without spindle fibers.'
  },
  {
    id: 'cellgrowth-20',
    type: 'multiple-choice',
    question: 'A skin cell dividing to replace worn-out cells represents:',
    options: [
      { label: 'A', value: 'A', text: 'Asexual reproduction' },
      { label: 'B', value: 'B', text: 'Sexual reproduction' },
      { label: 'C', value: 'C', text: 'Genetic recombination' },
      { label: 'D', value: 'D', text: 'Chromosome crossing-over' }
    ],
    correctAnswer: 'A',
    explanation: 'Mitosis in body cells produces identical cells, which is a form of asexual reproduction.'
  },
  {
    id: 'cellgrowth-21',
    type: 'multiple-choice',
    question: 'Why does metaphase position chromosomes in the center of the cell?',
    options: [
      { label: 'A', value: 'A', text: 'To maximize energy use' },
      { label: 'B', value: 'B', text: 'To ensure chromatids will separate evenly' },
      { label: 'C', value: 'C', text: 'To condense nucleosomes' },
      { label: 'D', value: 'D', text: 'To begin DNA replication' }
    ],
    correctAnswer: 'B',
    explanation: 'Center alignment ensures equal pulling forces so chromatids separate evenly.'
  },
  {
    id: 'cellgrowth-22',
    type: 'multiple-choice',
    question: 'Which pair correctly matches the mitosis event to its purpose?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase — separates chromatids' },
      { label: 'B', value: 'B', text: 'Telophase — DNA condenses into chromosomes' },
      { label: 'C', value: 'C', text: 'Anaphase — sister chromatids move to opposite poles' },
      { label: 'D', value: 'D', text: 'Metaphase — nuclear envelope reforms' }
    ],
    correctAnswer: 'C',
    explanation: 'Anaphase is defined by chromatids being pulled to opposite poles.'
  },
  {
    id: 'cellgrowth-23',
    type: 'multiple-choice',
    question: 'A cell plate is essential for cytokinesis in plant cells because:',
    options: [
      { label: 'A', value: 'A', text: 'Plant cells have no spindle' },
      { label: 'B', value: 'B', text: 'Plant cells cannot replicate DNA' },
      { label: 'C', value: 'C', text: 'A rigid wall prevents pinching inward' },
      { label: 'D', value: 'D', text: 'Plants divide by binary fission' }
    ],
    correctAnswer: 'C',
    explanation: 'The rigid cell wall prevents cleavage furrow formation, so a cell plate forms instead.'
  },
  {
    id: 'cellgrowth-24',
    type: 'multiple-choice',
    question: 'Which statement demonstrates the relationship between cyclins and the cell cycle?',
    options: [
      { label: 'A', value: 'A', text: 'Cyclins stop growth factors from binding' },
      { label: 'B', value: 'B', text: 'Cyclin levels rise and fall to regulate timing of phase progression' },
      { label: 'C', value: 'C', text: 'Cyclins attach to spindle fibers during mitosis' },
      { label: 'D', value: 'D', text: 'Cyclins are chromosomes formed during prophase' }
    ],
    correctAnswer: 'B',
    explanation: 'Cyclins control checkpoints by rising and falling at specific times.'
  },
  {
    id: 'cellgrowth-25',
    type: 'multiple-choice',
    question: 'A cell receiving signals from nearby cells to slow down division is experiencing:',
    options: [
      { label: 'A', value: 'A', text: 'Internal regulation' },
      { label: 'B', value: 'B', text: 'External regulation' },
      { label: 'C', value: 'C', text: 'Cyclin degradation' },
      { label: 'D', value: 'D', text: 'Apoptosis signaling' }
    ],
    correctAnswer: 'B',
    explanation: 'External regulatory signals come from other cells and influence growth rate.'
  },
  {
    id: 'cellgrowth-26',
    type: 'multiple-choice',
    question: 'Apoptosis benefits an organism because it:',
    options: [
      { label: 'A', value: 'A', text: 'Makes cells divide faster' },
      { label: 'B', value: 'B', text: 'Prevents chromosomes from condensing' },
      { label: 'C', value: 'C', text: 'Eliminates cells that may harm development' },
      { label: 'D', value: 'D', text: 'Removes growth factors from the environment' }
    ],
    correctAnswer: 'C',
    explanation: 'Apoptosis removes damaged, infected, or unnecessary cells to maintain health.'
  },
  {
    id: 'cellgrowth-27',
    type: 'multiple-choice',
    question: 'Which best compares benign and malignant tumors?',
    options: [
      { label: 'A', value: 'A', text: 'Benign tumors spread quickly; malignant remain localized' },
      { label: 'B', value: 'B', text: 'Benign remain in one place; malignant invade tissues' },
      { label: 'C', value: 'C', text: 'Malignant tumors have no genetic mutations' },
      { label: 'D', value: 'D', text: 'Benign tumors always lead to apoptosis' }
    ],
    correctAnswer: 'B',
    explanation: 'Benign tumors stay localized; malignant tumors invade tissues and spread.'
  },
  {
    id: 'cellgrowth-28',
    type: 'multiple-choice',
    question: 'A mutation in the p53 gene would MOST directly affect a cell’s ability to:',
    options: [
      { label: 'A', value: 'A', text: 'Repair spindle fibers' },
      { label: 'B', value: 'B', text: 'Slow the cell cycle when DNA is damaged' },
      { label: 'C', value: 'C', text: 'Condense chromosomes' },
      { label: 'D', value: 'D', text: 'Form a cell plate' }
    ],
    correctAnswer: 'B',
    explanation: 'p53 stops the cycle when DNA is damaged; mutation leads to uncontrolled division.'
  },
  {
    id: 'cellgrowth-29',
    type: 'multiple-choice',
    question: 'Growth factors are MOST active during:',
    options: [
      { label: 'A', value: 'A', text: 'Embryonic development and wound healing' },
      { label: 'B', value: 'B', text: 'Prophase and metaphase' },
      { label: 'C', value: 'C', text: 'DNA replication only' },
      { label: 'D', value: 'D', text: 'Cytokinesis of plant cells' }
    ],
    correctAnswer: 'A',
    explanation: 'Growth factors promote rapid cell division during development or injury.'
  },
  {
    id: 'cellgrowth-30',
    type: 'multiple-choice',
    question: 'Which scenario BEST illustrates information overload?',
    options: [
      { label: 'A', value: 'A', text: 'A small cell taking in too many nutrients' },
      { label: 'B', value: 'B', text: 'DNA failing to keep pace with cellular demands in a very large cell' },
      { label: 'C', value: 'C', text: 'A cell with too much surface area' },
      { label: 'D', value: 'D', text: 'A cell dividing too quickly' }
    ],
    correctAnswer: 'B',
    explanation: 'Large cells demand more from DNA, causing “information overload.”'
  },
  {
    id: 'cellgrowth-31',
    type: 'multiple-choice',
    question: 'In which phase does the nuclear envelope reappear?',
    options: [
      { label: 'A', value: 'A', text: 'Prophase' },
      { label: 'B', value: 'B', text: 'Metaphase' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Telophase' }
    ],
    correctAnswer: 'D',
    explanation: 'In telophase, chromosomes decondense and new nuclear envelopes form.'
  },
  {
    id: 'cellgrowth-32',
    type: 'multiple-choice',
    question: 'Why is interphase not considered part of mitosis?',
    options: [
      { label: 'A', value: 'A', text: 'DNA is destroyed during interphase' },
      { label: 'B', value: 'B', text: 'No preparation for division occurs' },
      { label: 'C', value: 'C', text: 'The nucleus is not dividing during interphase' },
      { label: 'D', value: 'D', text: 'Chromosomes are always visible during interphase' }
    ],
    correctAnswer: 'C',
    explanation: 'Interphase prepares for division, but the nucleus itself is not dividing yet.'
  },
  {
    id: 'cellgrowth-33',
    type: 'multiple-choice',
    question: 'Which BEST explains why asexual reproduction is advantageous in stable environments?',
    options: [
      { label: 'A', value: 'A', text: 'Genetic diversity increases survival' },
      { label: 'B', value: 'B', text: 'Identical offspring remain well-adapted' },
      { label: 'C', value: 'C', text: 'It allows for slower reproduction' },
      { label: 'D', value: 'D', text: 'It requires two parents' }
    ],
    correctAnswer: 'B',
    explanation: 'Clones thrive in predictable environments where the parent traits are already successful.'
  },
  {
    id: 'cellgrowth-34',
    type: 'multiple-choice',
    question: 'DNA replication during the S phase is necessary because:',
    options: [
      { label: 'A', value: 'A', text: 'The cell must have twice the amount of membrane' },
      { label: 'B', value: 'B', text: 'Organelles require more cytoplasm' },
      { label: 'C', value: 'C', text: 'Each daughter cell must receive an identical set of DNA' },
      { label: 'D', value: 'D', text: 'Cyclin levels remain constant' }
    ],
    correctAnswer: 'C',
    explanation: 'DNA replication ensures each daughter cell has a complete genome.'
  },
  {
    id: 'cellgrowth-35',
    type: 'multiple-choice',
    question: 'A cell that fails to transition from G2 to mitosis is likely missing:',
    options: [
      { label: 'A', value: 'A', text: 'External growth factors' },
      { label: 'B', value: 'B', text: 'Enough organelles or division molecules' },
      { label: 'C', value: 'C', text: 'A functioning nucleolus' },
      { label: 'D', value: 'D', text: 'A centromere on each chromosome' }
    ],
    correctAnswer: 'B',
    explanation: 'The G2 checkpoint halts division if DNA or organelles are incomplete.'
  },
  {
    id: 'cellgrowth-36',
    type: 'multiple-choice',
    question: 'Sister chromatids are created during:',
    options: [
      { label: 'A', value: 'A', text: 'G1' },
      { label: 'B', value: 'B', text: 'S phase' },
      { label: 'C', value: 'C', text: 'Anaphase' },
      { label: 'D', value: 'D', text: 'Telophase' }
    ],
    correctAnswer: 'B',
    explanation: 'Sister chromatids form when DNA replicates during S phase.'
  },
  {
    id: 'cellgrowth-37',
    type: 'multiple-choice',
    question: 'Which event directly ensures that genetic material is evenly distributed?',
    options: [
      { label: 'A', value: 'A', text: 'Chromosome condensation' },
      { label: 'B', value: 'B', text: 'DNA replication' },
      { label: 'C', value: 'C', text: 'Chromosomes lining up in metaphase' },
      { label: 'D', value: 'D', text: 'Cytokinesis' }
    ],
    correctAnswer: 'C',
    explanation: 'Metaphase alignment allows for even chromatid separation in anaphase.'
  },
  {
    id: 'cellgrowth-38',
    type: 'multiple-choice',
    question: 'Which description explains why mitosis does NOT create genetic diversity?',
    options: [
      { label: 'A', value: 'A', text: 'Chromosomes are lost during division' },
      { label: 'B', value: 'B', text: 'DNA strands cross over' },
      { label: 'C', value: 'C', text: 'Daughter cells receive identical DNA copies' },
      { label: 'D', value: 'D', text: 'Spindle fibers randomly pull chromosomes' }
    ],
    correctAnswer: 'C',
    explanation: 'Mitosis creates identical cells with no mixing of genetic material.'
  },
  {
    id: 'cellgrowth-39',
    type: 'multiple-choice',
    question: 'If apoptosis is reduced in a group of cells, the most likely result is:',
    options: [
      { label: 'A', value: 'A', text: 'Faster repair of DNA' },
      { label: 'B', value: 'B', text: 'Rapid accumulation of damaged or abnormal cells' },
      { label: 'C', value: 'C', text: 'Difficulty forming a spindle' },
      { label: 'D', value: 'D', text: 'Inability to replicate DNA' }
    ],
    correctAnswer: 'B',
    explanation: 'Without apoptosis, damaged cells survive and accumulate, increasing cancer risk.'
  },
  {
    id: 'cellgrowth-40',
    type: 'multiple-choice',
    question: 'Which statement BEST connects mitosis to cancer development?',
    options: [
      { label: 'A', value: 'A', text: 'Mitosis stops completely in cancer cells' },
      { label: 'B', value: 'B', text: 'Cancer cells divide without responding to normal cell-cycle signals' },
      { label: 'C', value: 'C', text: 'Cancer cells cannot pass through G1' },
      { label: 'D', value: 'D', text: 'Cytokinesis becomes unnecessary in tumors' }
    ],
    correctAnswer: 'B',
    explanation: 'Cancer arises when cells ignore regulatory signals and divide uncontrollably.'
  },
  {
    id: 'cellgrowth-41',
    type: 'multiple-choice',
    question: 'Radiation therapy is effective because it:',
    options: [
      { label: 'A', value: 'A', text: 'Stimulates DNA replication' },
      { label: 'B', value: 'B', text: 'Shrinks benign tumors only' },
      { label: 'C', value: 'C', text: 'Damages DNA in rapidly dividing cells' },
      { label: 'D', value: 'D', text: 'Prevents plant cell plates from forming' }
    ],
    correctAnswer: 'C',
    explanation: 'Radiation targets fast-dividing cancer cells by damaging DNA beyond repair.'
  },
  {
    id: 'cellgrowth-42',
    type: 'multiple-choice',
    question: 'Why does binary fission produce genetically identical cells?',
    options: [
      { label: 'A', value: 'A', text: 'DNA condenses into chromatin' },
      { label: 'B', value: 'B', text: 'DNA replicates and each copy is segregated simply' },
      { label: 'C', value: 'C', text: 'Spindle fibers ensure chromosome alignment' },
      { label: 'D', value: 'D', text: 'Cytokinesis fails to separate cells' }
    ],
    correctAnswer: 'B',
    explanation: 'Prokaryotes copy their single chromosome exactly and split it evenly.'
  },
  {
    id: 'cellgrowth-43',
    type: 'multiple-choice',
    question: 'A cell in anaphase is distinguished by:',
    options: [
      { label: 'A', value: 'A', text: 'Chromosomes lining up at the center' },
      { label: 'B', value: 'B', text: 'Spindle fibers disintegrating' },
      { label: 'C', value: 'C', text: 'Sister chromatids moving toward opposite poles' },
      { label: 'D', value: 'D', text: 'Nuclear envelope forming' }
    ],
    correctAnswer: 'C',
    explanation: 'Chromatids move apart during anaphase, pulled by spindle fibers.'
  },
  {
    id: 'cellgrowth-44',
    type: 'multiple-choice',
    question: 'A growth factor binding to a cell surface receptor most directly influences:',
    options: [
      { label: 'A', value: 'A', text: 'Internal checkpoint proteins' },
      { label: 'B', value: 'B', text: 'External regulation of cell division' },
      { label: 'C', value: 'C', text: 'The structure of DNA' },
      { label: 'D', value: 'D', text: 'Cyclin breakdown' }
    ],
    correctAnswer: 'B',
    explanation: 'Growth factors are external signals that activate cell division pathways.'
  },
  {
    id: 'cellgrowth-45',
    type: 'multiple-choice',
    question: 'Why does chromatin condense before division?',
    options: [
      { label: 'A', value: 'A', text: 'To increase gene expression' },
      { label: 'B', value: 'B', text: 'To prevent tangling or loss of DNA during movement' },
      { label: 'C', value: 'C', text: 'To slow down spindle fiber attachment' },
      { label: 'D', value: 'D', text: 'To make chromosomes less visible' }
    ],
    correctAnswer: 'B',
    explanation: 'Condensation protects DNA and ensures proper movement during mitosis.'
  },
  {
    id: 'cellgrowth-46',
    type: 'multiple-choice',
    question: 'Which explanation correctly connects cell size and division?',
    options: [
      { label: 'A', value: 'A', text: 'Larger cells divide because they have extra DNA' },
      { label: 'B', value: 'B', text: 'Cells divide when they become too efficient at moving materials' },
      { label: 'C', value: 'C', text: 'Increasing size reduces SA:V ratio, making exchange inefficient' },
      { label: 'D', value: 'D', text: 'Smaller cells cannot maintain homeostasis' }
    ],
    correctAnswer: 'C',
    explanation: 'Large cells have low SA:V ratios, reducing nutrient/waste exchange efficiency and triggering division.'
  },

  /* ---------- FREE RESPONSE ---------- */

  {
    id: 'cellgrowth-47',
    type: 'free-response',
    question: 'Explain how information overload AND surface-area-to-volume ratio work together to push a cell toward division.',
    correctAnswer: 'As a cell becomes larger, the DNA cannot keep up with increasing demand from the expanded cytoplasm, causing information overload. At the same time, the surface-area-to-volume ratio decreases, making nutrient exchange and waste removal inefficient. Together, these pressures push the cell to divide to restore balance.',
    explanation: 'The answer must address BOTH DNA demand overload and loss of membrane efficiency.'
  },
  {
    id: 'cellgrowth-48',
    type: 'free-response',
    question: 'Describe what would happen to an animal cell if spindle fibers attached to chromosomes on only one side during metaphase.',
    correctAnswer: 'If spindle fibers attach to only one side, the chromatids will not be pulled apart evenly in anaphase. One daughter cell may receive both copies while the other receives none, causing genetic imbalance. This creates abnormal cells and may activate cell-cycle checkpoints.',
    explanation: 'Students must reference metaphase alignment and anaphase separation failure.'
  },
  {
    id: 'cellgrowth-49',
    type: 'free-response',
    question: 'Explain why relying solely on asexual reproduction becomes disadvantageous when environments change.',
    correctAnswer: 'Asexual reproduction creates identical offspring, which works well in stable environments. When conditions change quickly, clones share the same weaknesses and may all die. Sexual reproduction provides genetic diversity, increasing the chances that some individuals survive.',
    explanation: 'Must mention identical offspring + need for diversity during environmental change.'
  },
  {
    id: 'cellgrowth-50',
    type: 'free-response',
    question: 'Predict how a chemical that prevents cyclin levels from decreasing would affect the cell cycle.',
    correctAnswer: 'If cyclin levels cannot decrease, cells constantly receive signals to continue the cell cycle. This shortens checkpoints and leads to rapid, uncontrolled division. Over time, this increases the likelihood of tumor formation and cancer.',
    explanation: 'Must mention constant cyclin activity → loss of timing control → cancer risk.'
  },
  {
    id: 'cellgrowth-51',
    type: 'free-response',
    question: 'Explain how multiple failures in checkpoints, p53, apoptosis, and external regulators together lead to cancer.',
    correctAnswer: 'Cancer forms only after several layers of cell regulation fail. A mutation in p53 prevents damaged DNA from being repaired. Failed checkpoints allow mutated cells to keep dividing. Apoptosis no longer removes dangerous cells, and the cell begins ignoring external signals to stop dividing. Combined, these failures result in uncontrolled cell growth.',
    explanation: 'Answer must discuss multiple regulatory failures, not just one.'
  },
];
