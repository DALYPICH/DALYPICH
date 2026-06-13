const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('../models/ChecklistItem');

const iloQuestions = [
  // 2.1 Key Strengths and Process Integrity
  // 2.1.1 Fact-Gathering Questions
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.1',
    question: 'Is there any good practice/progress made or key strength in the factory?',
    progress: 100,
    completed: 1,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.2',
    question: 'Was the assessor\'s access to the enterprise unreasonably restricted?',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.3',
    question: 'Were documents provided in a timely manner?',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.4',
    question: 'Number of assessment visits prior to STAR Cycle 1:',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.5',
    question: 'How many person days were spent on the assessment visit?',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.6',
    question: 'Provide the titles of the management staff interviewed.',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.7',
    question: 'Briefly describe the interviews with workers/ union leaders/ shop stewards:',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.8',
    question: 'Describe any significant concerns about process integrity.',
    progress: 0,
    completed: 0,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Key Strengths and Process Integrity',
    subsectionNumber: '2.1',
    category: 'Fact-Gathering Questions',
    categoryNumber: '2.1.1',
    questionNumber: '2.1.1.9',
    question: 'Are there any issues of concern not addressed elsewhere in the report?',
    progress: 0,
    completed: 0,
    total: 1,
  },

  // 2.2 Learning
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Learning',
    subsectionNumber: '2.2',
    category: 'Learning',
    categoryNumber: '2.2.1',
    questionNumber: '2.2.1',
    question: 'Has management consulted with elected worker representatives, including trade unions (if present) in determining the need for and scope of the assessment?',
    progress: 100,
    completed: 1,
    total: 1,
  },

  // 2.3 Child Labour
  // 2.3.1 Child Labourers
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Child Labourers',
    categoryNumber: '2.3.1',
    questionNumber: '2.3.1.1',
    question: 'Have you found any workers under the age of 15?',
    progress: 100,
    completed: 1,
    total: 1,
  },

  // 2.3.2 Hazardous Work and other Worst Forms
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Hazardous Work and other Worst Forms',
    categoryNumber: '2.3.2',
    questionNumber: '2.3.2.1',
    question: 'Do workers who are under age 18 perform work that is hazardous by nature?',
    progress: 100,
    completed: 1,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Hazardous Work and other Worst Forms',
    categoryNumber: '2.3.2',
    questionNumber: '2.3.2.2',
    question: 'Are any workers who are under age 18 working at night, or working more than 8 hours per day (including overtime)?',
    progress: 100,
    completed: 1,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Hazardous Work and other Worst Forms',
    categoryNumber: '2.3.2',
    questionNumber: '2.3.2.3',
    question: 'Does the employer subject any workers under age 18 to the unconditional worst forms of child labour?',
    progress: 100,
    completed: 1,
    total: 1,
  },

  // 2.3.3 Documentation and Protection of Young Workers
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Documentation and Protection of Young Workers',
    categoryNumber: '2.3.3',
    questionNumber: '2.3.3.1',
    question: 'Does the employer reliably verify the age of workers prior to hiring?',
    progress: 100,
    completed: 1,
    total: 1,
  },
  {
    section: 'ILO',
    sectionNumber: '2',
    subsection: 'Child Labour',
    subsectionNumber: '2.3',
    category: 'Documentation and Protection of Young Workers',
    categoryNumber: '2.3.3',
    questionNumber: '2.3.3.2',
    question: 'Does the employer keep a register and get consent from the guardians of workers under 18 years of age?',
    progress: 100,
    completed: 1,
    total: 1,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await ChecklistItem.deleteMany({ section: 'ILO' });
    console.log('Cleared existing ILO checklist items');

    const result = await ChecklistItem.insertMany(iloQuestions);
    console.log(`Inserted ${result.length} checklist items`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
