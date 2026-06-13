const fs = require('fs');
const path = require('path');

// Read all question numbers from seed file
const seedContent = fs.readFileSync(
  path.join(__dirname, 'seeds', 'iloChecklist.js'),
  'utf-8'
);

// Extract all questions
const questionMatches = seedContent.match(/questionNumber: '([^']+)'/g) || [];
const questionNumbers = [...new Set(questionMatches.map(m => m.replace(/questionNumber: '|'/g, '')))];

console.log(`Found ${questionNumbers.length} unique questions`);

// Load existing partial advice
const existingAdvice = require('./comprehensive-advice-mapping.js');

// Generate advice for missing questions with smart defaults
const generatedAdvice = {};

questionNumbers.forEach(qNum => {
  if (existingAdvice[qNum]) {
    // Already has advice, skip
    return;
  }

  // Parse section number to determine category
  const parts = qNum.split('.');
  const section = parts[0];
  const subsection = `${parts[0]}.${parts[1]}`;

  // Generate contextual advice based on question type
  let commonProblems = '';
  let advice = '';
  let reminder = '';

  // Default patterns based on question characteristics
  if (qNum.includes('training') || qNum.includes('Training')) {
    commonProblems = 'Workers may lack proper training; training may be insufficient or in languages workers do not understand';
    advice = 'Provide comprehensive, documented training for all workers. Use interpreters for non-Thai speakers. Verify comprehension, not just attendance.';
    reminder = '📚 Training effectiveness depends on language and comprehension. Regular refresher training is essential.';
  } else if (qNum.includes('documented') || qNum.includes('record')) {
    commonProblems = 'Records may be falsified, incomplete, or unavailable; workers may not be documented';
    advice = 'Maintain accurate, complete records for all workers. Store securely. Provide copies to workers. Regular audits to verify accuracy.';
    reminder = '📋 Records prove compliance. Poor record-keeping indicates possible hidden violations.';
  } else if (qNum.includes('paid') || qNum.includes('wage') || qNum.includes('salary')) {
    commonProblems = 'Workers may not be paid on time; wages below minimum; deductions not explained';
    advice = 'Ensure timely, full payment of all legally required wages and benefits. Transparent wage calculation and deductions.';
    reminder = '💰 Wage payment is the most fundamental worker right. Any wage violation is serious.';
  } else if (qNum.includes('hour') || qNum.includes('time') || qNum.includes('work') || qNum.includes('Rest')) {
    commonProblems = 'Work hours may exceed legal limits; workers may not receive rest days or breaks';
    advice = 'Ensure work hours comply with legal limits. Provide mandatory rest days and breaks. Monitor and enforce strictly.';
    reminder = '⏰ Excessive work hours reduce productivity and harm worker health. Enforce legal limits.';
  } else if (qNum.includes('safe') || qNum.includes('accident') || qNum.includes('emergency') || qNum.includes('exit')) {
    commonProblems = 'Safety hazards may be present; workers may lack protective equipment; emergency procedures may be unclear';
    advice = 'Identify and eliminate safety hazards. Provide and enforce use of protective equipment. Train on emergency procedures.';
    reminder = '🚨 Worker safety is non-negotiable. Prevention is always better than treating injuries.';
  } else if (qNum.includes('union') || qNum.includes('representative') || qNum.includes('bargaining')) {
    commonProblems = 'Worker representatives may face retaliation; unions may lack independence; workers may not know their rights';
    advice = 'Protect worker organizing rights. Prohibit retaliation. Allow independent union representation. Respect collective bargaining.';
    reminder = '🗳️ CRITICAL: Union rights are fundamental. Retaliation for organizing is illegal.';
  } else if (qNum.includes('child') || qNum.includes('young')) {
    commonProblems: 'Age verification may be inadequate; young workers may perform hazardous work or work excessive hours',
    advice: 'Verify all workers are adults (18+). Prohibit hazardous work for anyone under 18. Limit hours for young workers.';
    reminder: '🚨 CRITICAL: Child labour is a crime. Age verification must be strict and documented.';
  } else {
    // Generic default
    commonProblems = 'Management may not fully understand or implement requirements; workers may not be informed of policies';
    advice = 'Document all policies clearly. Communicate to all workers. Train management and workers. Regular monitoring and audits.';
    reminder = '📋 Implementation matters more than documentation. Verify through observation and worker interviews.';
  }

  generatedAdvice[qNum] = {
    commonProblems,
    advice,
    reminder
  };
});

// Merge with existing advice
const allAdvice = { ...existingAdvice, ...generatedAdvice };

console.log(`Total questions with advice: ${Object.keys(allAdvice).length}`);
console.log(`Missing advice for: ${questionNumbers.length - Object.keys(allAdvice).length} questions`);

// Show a sample
console.log('\nSample generated advice:');
Object.entries(generatedAdvice).slice(0, 3).forEach(([qNum, data]) => {
  console.log(`\n${qNum}:`);
  console.log(`  Problems: ${data.commonProblems.substring(0, 60)}...`);
});
