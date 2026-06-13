const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('../models/ChecklistItem');

const iloQuestions = [
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
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await ChecklistItem.deleteMany({ section: 'ILO', categoryNumber: '2.1.1' });
    console.log('Cleared existing ILO 2.1.1 checklist items');

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
