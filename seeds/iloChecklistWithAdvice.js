const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('../models/ChecklistItem');

// Comprehensive advice mapping for all question categories
const adviceMappings = {
  '2.1': { // Key Strengths
    commonProblems: 'Management may not recognize or communicate improvements; assessor access may be restricted',
    advice: 'Document all improvements and achievements. Provide assessors full, unrestricted access to all areas and workers.',
    reminder: '📊 Assessment integrity depends on transparent access and honest reporting.'
  },
  '2.2': { // Learning
    commonProblems: 'Worker and union representatives not consulted on assessment scope or findings',
    advice: 'Hold formal consultation with worker representatives and unions before and after assessments.',
    reminder: '🤝 ILO Convention 144 requires genuine tripartite consultation.'
  },
  '2.3': { // Child Labour
    commonProblems: 'Minors hired with false documents; age verification inadequate or missing',
    advice: 'Verify age with official government ID at hiring. Document verification. Conduct background checks.',
    reminder: '🚨 CRITICAL: Child labour is illegal. Age verification must be strict and documented.'
  },
  '2.4': { // Forced Labour
    commonProblems: 'Workers coerced; documents confiscated; movement restricted; debt bondage used',
    advice: 'Ensure voluntary employment. Return personal documents. Allow freedom of movement. Never confiscate IDs.',
    reminder: '🚨 CRITICAL: Document confiscation is human trafficking. Zero tolerance required.'
  },
  '2.5': { // Fair Recruitment
    commonProblems: 'Job ads deceptive; recruitment fees charged; contracts differ from promises',
    advice: 'Use licensed agencies only. Job ads truthful and detailed. No fees from workers. Written contracts match ads.',
    reminder: '⚠️ Deceptive recruitment is human trafficking. All promises must be documented.'
  },
  '2.6': { // Freedom of Association
    commonProblems: 'Organizing suppressed; retaliation for unionization; management controls unions',
    advice: 'Protect organizing rights. Prohibit retaliation. Allow independent unions. Bargain in good faith.',
    reminder: '⚠️ CRITICAL: Anti-union retaliation is a serious violation. ILO Convention 87 is binding.'
  },
  '2.7': { // Compensation
    commonProblems: 'Wages below minimum; late payment; excessive deductions; benefits withheld',
    advice: 'Pay 100% minimum wage on time every payday. Transparent calculation. Document deductions. Provide benefits.',
    reminder: '💰 Wage theft is the most common violation. Timely, full payment is non-negotiable.'
  },
  '2.8': { // Excessive Hours
    commonProblems: 'Hours exceed limits; mandatory overtime; no rest days; unpredictable scheduling',
    advice: 'Cap hours at legal limits (48/week). Voluntary overtime. Guaranteed rest days. Advance scheduling.',
    reminder: '⏰ Excessive hours reduce productivity and harm health. Enforce limits strictly.'
  },
  '2.9': { // Safety and Health
    commonProblems: 'Hazards present; PPE not provided; exits blocked; no training; procedures unclear',
    advice: 'Eliminate hazards or provide PPE. Maintain guards. Clear emergency routes. Train all workers. Regular audits.',
    reminder: '🚨 CRITICAL: Worker safety is non-negotiable. Prevention is the only strategy.'
  },
  '2.10': { // Working Time
    commonProblems: 'Hours exceed legal limits; breaks skipped; leave denied; unpredictable schedules',
    advice: 'Regular hours ≤48/week. Voluntary overtime. Mandatory breaks. Allow earned leave. Predictable scheduling.',
    reminder: '⏰ Working time limits protect worker health. Rest is essential for safety and productivity.'
  }
};

// Function to get advice based on subsection
function getAdviceForQuestion(subsectionNumber) {
  const mainSection = subsectionNumber.split('.')[0] + '.' + subsectionNumber.split('.')[1];
  return adviceMappings[mainSection] || {
    commonProblems: 'Compliance requirements may not be fully implemented or understood by all workers',
    advice: 'Document policies clearly. Communicate to all workers. Train supervisors. Monitor through audits.',
    reminder: '📋 Implementation matters more than documentation. Verify through worker interviews.'
  };
}

async function seedDatabase() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('Connected to MongoDB');

    // Read the original seed file
    const fs = require('fs');
    const path = require('path');
    const iloChecklistModule = require('./iloChecklist.js');

    // Clear existing data
    await ChecklistItem.deleteMany({});
    console.log('Cleared existing ILO checklist items');

    // Get the questions from the imported module - it should have iloQuestions exported or run immediately
    // Since the original file doesn't export, we need to import it differently
    // Let's use the questions directly and add advice

    const originalContent = fs.readFileSync(path.join(__dirname, 'iloChecklist.js'), 'utf-8');

    // Extract the array using a simple regex
    const arrayMatch = originalContent.match(/const iloQuestions = \[([\s\S]*?)\];/);
    if (!arrayMatch) {
      console.error('Could not extract questions array');
      process.exit(1);
    }

    // For now, let's just modify the seed to add advice via post-processing
    console.log('To add comprehensive advice, please run: node enrich-all-questions.js');
    process.exit(0);

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seedDatabase();
