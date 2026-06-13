const fs = require('fs');
const path = require('path');

// Function to generate advice based on question content
function generateAdviceForQuestion(qNum, question) {
  const questionLower = question.toLowerCase();

  let commonProblems = '';
  let advice = '';
  let reminder = '';

  // Child Labour
  if (questionLower.includes('under age') || questionLower.includes('child') || questionLower.includes('young') || qNum.startsWith('2.3')) {
    commonProblems = 'Factories may hire minors with false documents; age verification may be inadequate';
    advice = 'Verify age through official government ID. Document verification. Conduct background checks on recruitment agents.';
    reminder = '🚨 CRITICAL: Child labour is illegal. Age verification must be strict at hiring.';
  }
  // Forced Labour / Bonded Labour
  else if (questionLower.includes('forced') || questionLower.includes('bonded') || questionLower.includes('confined') || questionLower.includes('document') || qNum.startsWith('2.4')) {
    commonProblems = 'Workers may be coerced; personal documents confiscated; freedom of movement restricted';
    advice = 'Ensure voluntary employment. Return documents immediately. Allow freedom of movement at all times.';
    reminder = '🚨 CRITICAL: Document confiscation is human trafficking. Zero tolerance.';
  }
  // Fair Recruitment
  else if (qNum.startsWith('2.5')) {
    commonProblems = 'Job ads may be deceptive; recruitment fees charged to workers; contracts differ from promises';
    advice = 'Use only licensed recruitment agencies. Job ads must be truthful. No fees charged to workers. Written contracts match promises.';
    reminder = '⚠️ Deceptive recruitment is trafficking. All promises must be documented and verified.';
  }
  // Freedom of Association / Collective Bargaining
  else if (qNum.startsWith('2.6')) {
    commonProblems = 'Union organizing prohibited; union members retaliated against; management controls unions; collective bargaining refused';
    advice = 'Protect worker organizing rights. Prohibit retaliation strictly. Allow independent unions. Engage in good-faith bargaining.';
    reminder = '⚠️ CRITICAL: Union retaliation is a serious violation. ILO Convention 87 protects organizing rights.';
  }
  // Compensation
  else if (qNum.startsWith('2.7')) {
    commonProblems = 'Wages below minimum; late payments; excessive deductions; unclear wage structure; no benefits provided';
    advice = 'Pay 100% legal minimum on time every payday. Transparent wage calculation. Document deductions. Provide required benefits.';
    reminder = '💰 Wage theft is the most common violation. Timely, full, transparent payment is essential.';
  }
  // Excessive Hours
  else if (qNum.startsWith('2.8')) {
    commonProblems = 'Work hours exceed legal limits; mandatory overtime; no rest days; breaks skipped; unpredictable schedules';
    advice = 'Cap regular hours at 48/week. Limit overtime. Provide mandatory rest days and breaks. Predictable scheduling.';
    reminder = '⏰ Excessive hours cause fatigue, safety issues, and low productivity. Enforce legal limits strictly.';
  }
  // Safety and Health
  else if (qNum.startsWith('2.9')) {
    commonProblems = 'Safety hazards present; PPE not provided or used; emergency exits blocked; lack of safety training; no emergency procedures';
    advice = 'Eliminate hazards or provide PPE. Enforce equipment guards. Train on safety. Clear emergency routes. Conduct regular audits.';
    reminder = '🚨 CRITICAL: Worker safety is non-negotiable. One accident can be prevented through proper safety systems.';
  }
  // Working Time / Hours
  else if (qNum.startsWith('2.10')) {
    commonProblems = 'Regular hours exceed limits; mandatory overtime; insufficient rest days; leave denied; breaks skipped';
    advice = 'Regular hours ≤48/week. Overtime voluntary and limited. Provide rest days and breaks. Allow all earned leave.';
    reminder = '⏰ Working time limits exist for worker health. Rest is essential for productivity and safety.';
  }
  // Default
  else {
    commonProblems = 'Requirements may not be fully implemented; workers may not understand policies; compliance not monitored';
    advice = 'Document all policies clearly. Communicate to all workers. Train supervisors. Monitor compliance through audits and observation.';
    reminder = '📋 Documentation alone is insufficient. Verify implementation through worker interviews and observation.';
  }

  return { commonProblems, advice, reminder };
}

// Read the seed file
const seedPath = path.join(__dirname, 'seeds', 'iloChecklist.js');
let seedContent = fs.readFileSync(seedPath, 'utf-8');

// Find the start of the iloQuestions array
const startIdx = seedContent.indexOf('const iloQuestions = [');
if (startIdx === -1) {
  console.error('Could not find iloQuestions array');
  process.exit(1);
}

// Find the end of the array
const restOfFile = seedContent.substring(startIdx);
const arrayEndIdx = restOfFile.lastIndexOf('];');
if (arrayEndIdx === -1) {
  console.error('Could not find end of array');
  process.exit(1);
}

// Extract the array content
const arrayStart = seedContent.substring(0, startIdx + 'const iloQuestions = ['.length);
const arrayContent = seedContent.substring(startIdx + 'const iloQuestions = ['.length, startIdx + arrayEndIdx);
const arrayEnd = seedContent.substring(startIdx + arrayEndIdx);

// Parse individual question objects carefully
const questions = [];
let depth = 0;
let currentObj = '';
let inString = false;
let escapeNext = false;

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  const nextChar = arrayContent[i + 1];

  if (escapeNext) {
    currentObj += char;
    escapeNext = false;
    continue;
  }

  if (char === '\\') {
    currentObj += char;
    escapeNext = true;
    continue;
  }

  if (char === "'" && !inString) {
    inString = true;
    currentObj += char;
  } else if (char === "'" && inString) {
    inString = false;
    currentObj += char;
  } else if (char === '{' && !inString) {
    depth++;
    currentObj += char;
  } else if (char === '}' && !inString) {
    depth--;
    currentObj += char;
    if (depth === 0 && currentObj.trim().startsWith('{')) {
      // Try to extract question number and text
      const qNumMatch = currentObj.match(/questionNumber:\s*'([^']+)'/);
      const qTextMatch = currentObj.match(/question:\s*'([^']+)'/);

      if (qNumMatch && qTextMatch) {
        const qNum = qNumMatch[1];
        const qText = qTextMatch[1];

        // Check if already has custom audit findings
        const hasAuditFindings = currentObj.includes('auditFindings:');

        if (!hasAuditFindings) {
          // Generate and add advice
          const advice = generateAdviceForQuestion(qNum, qText);

          // Add fields to the object
          currentObj = currentObj.replace(/(\})\s*$/, `,
    commonProblems: '${advice.commonProblems.replace(/'/g, "\\'")}',
    advice: '${advice.advice.replace(/'/g, "\\'")}',
    reminder: '${advice.reminder.replace(/'/g, "\\'")}'
  }`);
        }
      }

      questions.push(currentObj);
      currentObj = '';
    }
  } else {
    currentObj += char;
  }
}

// Reconstruct the file
const newArrayContent = questions.join(',\n  ');
const newContent = arrayStart + '\n  ' + newArrayContent + '\n' + arrayEnd;

// Write back
fs.writeFileSync(seedPath, newContent, 'utf-8');
console.log(`✅ Added advice to ${questions.length} questions`);
