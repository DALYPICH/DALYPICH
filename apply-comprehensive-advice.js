const fs = require('fs');
const path = require('path');

// Read seed file
const seedPath = path.join(__dirname, 'seeds', 'iloChecklist.js');
let content = fs.readFileSync(seedPath, 'utf-8');

// Function to generate advice based on question content
function generateAdviceForQuestion(qNum, question, legalRef) {
  const questionLower = question.toLowerCase();

  // Determine category based on question content
  let commonProblems = '';
  let advice = '';
  let reminder = '';

  // Child Labour
  if (questionLower.includes('under age') || questionLower.includes('child') || questionLower.includes('young')) {
    commonProblems = 'Factories may hire minors with false documents; age verification may be inadequate or missing';
    advice = 'Verify age through official government ID. Document all age verification. Conduct background checks on labor brokers.';
    reminder = '🚨 CRITICAL: Child labour is illegal. Age verification must be strict and documented at hiring.';
  }
  // Forced Labour
  else if (questionLower.includes('forced') || questionLower.includes('bonded') || questionLower.includes('confined') || questionLower.includes('document')) {
    commonProblems = 'Workers may be coerced; personal documents confiscated; freedom of movement restricted';
    advice = 'Ensure workers enter employment voluntarily. Return personal documents immediately. Allow freedom of movement.';
    reminder = '🚨 CRITICAL: Forced labour is human trafficking. Confiscating documents is a crime.';
  }
  // Wage/Compensation
  else if (questionLower.includes('pay') || questionLower.includes('wage') || questionLower.includes('salary') || questionLower.includes('bonus') || questionLower.includes('deduct')) {
    commonProblems = 'Wages below minimum; late payments; excessive deductions; unclear wage structure';
    advice = 'Pay minimum wage on time every payday. Document deductions. Ensure take-home exceeds minimum. Regular wage audits.';
    reminder = '💰 Wage theft is the most common violation. Timely, full payment is non-negotiable.';
  }
  // Working Hours/Rest
  else if (questionLower.includes('hour') || questionLower.includes('rest') || questionLower.includes('leave') || questionLower.includes('break') || questionLower.includes('overtime')) {
    commonProblems = 'Work hours exceed limits; mandatory overtime; no rest days; breaks skipped; annual leave denied';
    advice = 'Cap hours at legal limits (48/week regular, limited overtime). Provide mandatory rest days and breaks. Allow earned leave.';
    reminder = '⏰ Excessive hours cause fatigue, safety risks, and low productivity. Enforce limits strictly.';
  }
  // Safety & Health
  else if (questionLower.includes('safe') || questionLower.includes('hazard') || questionLower.includes('guard') || questionLower.includes('emergency') || questionLower.includes('exit') || questionLower.includes('fire') || questionLower.includes('first aid') || questionLower.includes('noise') || questionLower.includes('chemical') || questionLower.includes('protect') || questionLower.includes('equipment') || questionLower.includes('accident')) {
    commonProblems = 'Safety hazards present; guards missing; PPE not provided; emergency procedures unclear; lack of training';
    advice = 'Eliminate hazards or provide PPE. Enforce equipment guards. Train on safety procedures. Conduct regular safety audits.';
    reminder = '🚨 CRITICAL: Worker safety is non-negotiable. Prevention is the only strategy.';
  }
  // Union/Freedom of Association
  else if (questionLower.includes('union') || questionLower.includes('associat') || questionLower.includes('bargain') || questionLower.includes('represent') || questionLower.includes('collect') || questionLower.includes('retaliat') || questionLower.includes('interfere')) {
    commonProblems = 'Union members face retaliation; management controls unions; organizing prohibited; collective bargaining prevented';
    advice = 'Protect union rights. Prohibit retaliation strictly. Allow independent organizing. Engage in good-faith bargaining.';
    reminder = '⚠️ CRITICAL: Union rights violations are serious. Retaliation for organizing is illegal.';
  }
  // Training/Knowledge
  else if (questionLower.includes('train') || questionLower.includes('skill') || questionLower.includes('knowledge') || questionLower.includes('consult')) {
    commonProblems = 'Training absent or inadequate; language barriers; workers not consulted; knowledge not transferred';
    advice = 'Provide documented training in workers\' languages. Verify comprehension. Consult workers on decisions affecting them.';
    reminder = '📚 Training effectiveness depends on language and relevance. One-time training is insufficient.';
  }
  // Records/Documentation
  else if (questionLower.includes('record') || questionLower.includes('document') || questionLower.includes('written') || questionLower.includes('identif')) {
    commonProblems = 'Records falsified or missing; worker identification incomplete; documentation unverified';
    advice = 'Maintain accurate, complete records. Verify information independently. Store securely. Provide copies to workers.';
    reminder = '📋 Records are proof of compliance. Poor documentation suggests hidden violations.';
  }
  // Discrimination/Equal Treatment
  else if (questionLower.includes('discriminat') || questionLower.includes('equal') || questionLower.includes('gender') || questionLower.includes('pregnant') || questionLower.includes('female')) {
    commonProblems = 'Women paid less for same work; pregnant women fired or demoted; discrimination in hiring or promotion';
    advice = 'Equal pay for equal work regardless of gender. Protect pregnant workers. Apply uniform hiring/promotion criteria.';
    reminder = '⚖️ Discrimination is illegal. Equal treatment applies to all worker categories.';
  }
  // Grievance/Complaint
  else if (questionLower.includes('grievance') || questionLower.includes('complaint') || questionLower.includes('concern')) {
    commonProblems = 'No grievance mechanism; workers fear retaliation for complaints; complaints ignored';
    advice = 'Create formal grievance procedure. Ensure confidentiality. Prohibit retaliation. Respond to all complaints. Maintain records.';
    reminder: '💬 A strong grievance system reveals problems early. Use complaints as early warning system.';
  }
  // General/Process
  else {
    commonProblems = 'Management may not understand requirements; workers not informed; implementation inadequate';
    advice = 'Document policies clearly. Communicate to all workers. Train supervisors. Monitor compliance. Conduct regular audits.';
    reminder = '📋 Documentation alone is insufficient. Verify implementation through observation and worker interviews.';
  }

  return { commonProblems, advice, reminder };
}

// Process each question in the seed file
let count = 0;
let addedCount = 0;

// Find all question objects
const questionRegex = /(\{\s*section:\s*'ILO',[\s\S]*?questionNumber:\s*'([^']+)',\s*question:\s*'([^']*)',[\s\S]*?total:\s*\d+,?)([\s\S]*?)(\})/g;

content = content.replace(questionRegex, (match, beforeTotal, qNum, question, afterTotal, closing) => {
  count++;

  // Check if this already has audit findings
  if (afterTotal.includes('auditFindings')) {
    return match; // Keep as-is, already has custom advice
  }

  // Generate advice
  const { commonProblems, advice, reminder } = generateAdviceForQuestion(qNum, question, '');

  addedCount++;

  // Escape single quotes
  const escapedProblems = commonProblems.replace(/'/g, "\\'");
  const escapedAdvice = advice.replace(/'/g, "\\'");
  const escapedReminder = reminder.replace(/'/g, "\\'");

  // Add advice fields
  const newFields = `,
    commonProblems: '${escapedProblems}',
    advice: '${escapedAdvice}',
    reminder: '${escapedReminder}'`;

  return beforeTotal + newFields + afterTotal + closing;
});

fs.writeFileSync(seedPath, content, 'utf-8');
console.log(`✅ Processed ${count} questions`);
console.log(`✅ Added advice to ${addedCount} questions`);
