import { Question } from '@/types/quiz';

export const protestantQuestions: Question[] = [
  {
    id: 'fake-protestant-1',
    type: 'free-response',
    question: 'Term meaning to set aside or declare legally invalid.',
    correctAnswer: 'Annul',
    explanation: 'Annul means to declare something null and void.'
  },
  {
    id: 'fake-protestant-2',
    type: 'free-response',
    question: 'Pope known for fathering several children.',
    correctAnswer: 'Pope Alexander VI',
    explanation: 'Pope Alexander VI openly acknowledged his children.'
  },
  {
    id: 'fake-protestant-3',
    type: 'free-response',
    question: 'Documents that released sinners from performing the penalty for sins.',
    correctAnswer: 'indulgences',
    explanation: 'Indulgences were sold by the Church to reduce punishment for sins.'
  },
  {
    id: 'fake-protestant-4',
    type: 'free-response',
    question: 'Pope who investigated the sale of indulgences and other abuses.',
    correctAnswer: 'Pope Paul III',
    explanation: 'Pope Paul III initiated reforms and the Council of Trent.'
  },
  {
    id: 'fake-protestant-5',
    type: 'free-response',
    question: 'Pope who compiled an Index of Forbidden Books.',
    correctAnswer: 'Pope Paul IV',
    explanation: 'Pope Paul IV created the Index to ban heretical writings.'
  },
  {
    id: 'fake-protestant-6',
    type: 'free-response',
    question: 'Medici pope who promoted the sale of indulgences.',
    correctAnswer: 'Pope Leo X',
    explanation: 'Pope Leo X used indulgence sales to fund St. Peter\'s Basilica.'
  },
  {
    id: 'fake-protestant-7',
    type: 'free-response',
    question: 'Holy Roman Emperor who was Catherine of Aragon\'s nephew.',
    correctAnswer: 'Charles V',
    explanation: 'Charles V\'s family connection complicated Henry VIII\'s annulment.'
  },
  {
    id: 'fake-protestant-8',
    type: 'free-response',
    question: 'Mother of Elizabeth I.',
    correctAnswer: 'Anne Boleyn',
    explanation: 'Anne Boleyn was Henry VIII\'s second wife.'
  },
  {
    id: 'fake-protestant-9',
    type: 'free-response',
    question: 'Mother of Edward VI.',
    correctAnswer: 'Jane Seymour',
    explanation: 'Jane Seymour was Henry VIII\'s third wife.'
  },
  {
    id: 'fake-protestant-10',
    type: 'free-response',
    question: 'Reformer who wrote "Institutes of the Christian Religion" and believed in predestination.',
    correctAnswer: 'John Calvin',
    explanation: 'Calvin\'s theology emphasized predestination.'
  },
  {
    id: 'fake-protestant-11',
    type: 'free-response',
    question: 'Reformer who brought Calvinism to Scotland.',
    correctAnswer: 'John Knox',
    explanation: 'Knox established the Presbyterian Church in Scotland.'
  },
  {
    id: 'fake-protestant-12',
    type: 'free-response',
    question: 'Author of "Spiritual Exercises" who founded the Jesuit Order.',
    correctAnswer: 'Ignatius of Loyola',
    explanation: 'Ignatius founded the Society of Jesus (Jesuits).'
  },
  {
    id: 'fake-protestant-13',
    type: 'free-response',
    question: 'Martin Luther\'s wife who advocated for women\'s roles.',
    correctAnswer: 'Katharina von Bora',
    explanation: 'Katharina was a former nun who married Luther.'
  },
  {
    id: 'fake-protestant-14',
    type: 'free-response',
    question: 'French noblewoman who protected Calvin.',
    correctAnswer: 'Marguerite of Navarre',
    explanation: 'She protected Protestant reformers in France.'
  },
  {
    id: 'fake-protestant-15',
    type: 'free-response',
    question: 'Woman who scolded a minister for speaking harshly about a reformer.',
    correctAnswer: 'Katharina Zell',
    explanation: 'Katharina Zell was a Protestant reformer and activist.'
  },
  {
    id: 'fake-protestant-16',
    type: 'multiple-choice',
    question: 'By 1500, Renaissance emphasis on new ideas challenged Church authority.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Renaissance individualism questioned traditional authority.'
  },
  {
    id: 'fake-protestant-17',
    type: 'multiple-choice',
    question: 'Germany was divided into competing states with different princes supporting different religions.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'German political fragmentation aided the Reformation.'
  },
  {
    id: 'fake-protestant-18',
    type: 'multiple-choice',
    question: 'The Church had problems including illiterate priests, clerical marriage, and corruption.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'These abuses fueled demand for reform.'
  },
  {
    id: 'fake-protestant-19',
    type: 'multiple-choice',
    question: 'Martin Luther taught scripture at the University of Wittenberg.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Luther was a professor of theology at Wittenberg.'
  },
  {
    id: 'fake-protestant-20',
    type: 'multiple-choice',
    question: 'Luther nailed his 95 Theses to the church door in Rome.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'B',
    explanation: 'Luther posted them in Wittenberg, not Rome.'
  },
  {
    id: 'fake-protestant-21',
    type: 'multiple-choice',
    question: 'Pope Leo X excommunicated Luther for his 95 Theses.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Pope Leo X excommunicated Luther in 1521.'
  },
  {
    id: 'fake-protestant-22',
    type: 'multiple-choice',
    question: 'Frederick the Wise of Saxony sheltered Luther after his condemnation.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Frederick protected Luther at Wartburg Castle.'
  },
  {
    id: 'fake-protestant-23',
    type: 'multiple-choice',
    question: 'Peasants revolted hoping religious reform would end their economic suffering.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'The Peasants\' War was inspired partly by reform ideas.'
  },
  {
    id: 'fake-protestant-24',
    type: 'multiple-choice',
    question: 'Henry VIII used Parliament to break from the Catholic Church.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'The Act of Supremacy established the Church of England.'
  },
  {
    id: 'fake-protestant-25',
    type: 'multiple-choice',
    question: 'Mary I returned England to Protestantism.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'B',
    explanation: 'Mary I returned England to Catholicism.'
  },
  {
    id: 'fake-protestant-26',
    type: 'multiple-choice',
    question: 'Thomas More refused to accept the Act of Supremacy.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'More was executed for refusing to accept Henry as head of the Church.'
  },
  {
    id: 'fake-protestant-27',
    type: 'multiple-choice',
    question: 'Elizabeth I established the Anglican Church through Parliament.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Elizabeth formalized the Church of England.'
  },
  {
    id: 'fake-protestant-28',
    type: 'multiple-choice',
    question: 'Anabaptists believed in adult baptism and separation of church and state.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Anabaptists held radical views on baptism and government.'
  },
  {
    id: 'fake-protestant-29',
    type: 'multiple-choice',
    question: 'Pope Paul III created the Council of Trent.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Pope Paul III convened the Council of Trent in 1545.'
  },
  {
    id: 'fake-protestant-30',
    type: 'multiple-choice',
    question: 'French Calvinists were called Huguenots.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Huguenots were French Protestants following Calvin.'
  },
  {
    id: 'fake-protestant-31',
    type: 'multiple-choice',
    question: 'Predestination is the belief that God predetermined who would be saved.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Calvin emphasized predestination in his theology.'
  },
  {
    id: 'fake-protestant-32',
    type: 'multiple-choice',
    question: 'Elizabeth I sought to unite moderate Catholics and Protestants.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Elizabeth\'s religious settlement was a compromise.'
  },
  {
    id: 'fake-protestant-33',
    type: 'multiple-choice',
    question: 'Some German princes supported Luther for political and economic reasons.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Princes saw advantages in breaking from Rome.'
  },
  {
    id: 'fake-protestant-34',
    type: 'multiple-choice',
    question: 'The pope refused Henry VIII\'s annulment partly because Catherine was related to Charles V.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Charles V\'s influence prevented the annulment.'
  },
  {
    id: 'fake-protestant-35',
    type: 'multiple-choice',
    question: 'The printing press helped spread Reformation ideas quickly.',
    options: [
      { label: 'A', value: 'A', text: 'True' },
      { label: 'B', value: 'B', text: 'False' }
    ],
    correctAnswer: 'A',
    explanation: 'Printing made Luther\'s ideas widely available.'
  },
  {
    id: 'fake-protestant-36',
    type: 'free-response',
    question: 'Is "resentment of paying taxes to the Church" a social, political, or economic cause of reform?',
    correctAnswer: 'Economic',
    explanation: 'This involves financial matters.'
  },
  {
    id: 'fake-protestant-37',
    type: 'free-response',
    question: 'Is "monarchs seeing popes as foreign interference" a social, political, or economic cause?',
    correctAnswer: 'Political',
    explanation: 'This involves power relationships between rulers.'
  },
  {
    id: 'fake-protestant-38',
    type: 'free-response',
    question: 'Is "humanism leading people to question the Church" a social, political, or economic cause?',
    correctAnswer: 'Social',
    explanation: 'This involves changing attitudes in society.'
  },
  {
    id: 'fake-protestant-39',
    type: 'multiple-choice',
    question: 'Which was an example of Church corruption needing reform?',
    options: [
      { label: 'A', value: 'A', text: 'Illiterate priests' },
      { label: 'B', value: 'B', text: 'Selling indulgences' },
      { label: 'C', value: 'C', text: 'Popes fathering children' },
      { label: 'D', value: 'D', text: 'Officials focused on wealth' },
      { label: 'E', value: 'E', text: 'All of the above' }
    ],
    correctAnswer: 'E',
    explanation: 'All these were criticized by reformers.'
  },
  {
    id: 'fake-protestant-40',
    type: 'multiple-choice',
    question: 'What led Luther to devote his life to God and enter the monastery?',
    options: [
      { label: 'A', value: 'A', text: 'His parents\' influence' },
      { label: 'B', value: 'B', text: 'Law school training' },
      { label: 'C', value: 'C', text: 'A violent thunderstorm' },
      { label: 'D', value: 'D', text: 'His visit to Rome' }
    ],
    correctAnswer: 'C',
    explanation: 'Luther vowed to become a monk during a storm.'
  },
];
