const fs = require('fs');
const path = require('path');

// Define audit updates for specific question numbers
const auditUpdates = {
  '2.6.2.1': {
    auditFindings: 'Yorkmars (2025-06-17): Deputy and secretary of union assigned as factory manager assistants/observers while employed as mechanic and sewing worker in contracts.',
    commonProblems: 'Unions acting as management agents; dual employment roles; union leaders losing independence; employer control disguised as observation',
    advice: 'Verify union officials maintain separate employment from management roles. Ensure union independence from employer interference. Check employment contracts match actual job duties.',
    reminder: '⚠️ ALERT: Previous audit (2021-2025) found recurring employer interference. This is a critical issue that has NOT been resolved.'
  },
  '2.6.4.3': {
    auditFindings: 'Yorkmars (2025-06-17): Union deputies assigned as factory observers; employer provided 10 hours/month overtime automatically to 23 union members - direct interference in union operations.',
    commonProblems: 'Employer paying union members for union activities; management controlling union decisions; corruption of union independence',
    advice: 'Prohibit employer from providing payment for union activities. Ensure union financial independence. Monitor union meetings for management presence.',
    reminder: '🚨 CRITICAL: This violates Cambodia Labour Law Art. 280 and ILO CAT #85. Factory has NOT corrected this across 4 assessments (2021-2025).'
  },
  '2.6.4.6': {
    auditFindings: 'Yorkmars (2025-06-17): Employer manipulated union by assigning union leaders to manager positions; used automatic overtime payments to maintain union control.',
    commonProblems: 'Co-opting union leaders; using financial incentives to control unions; blurring union-management boundaries',
    advice: 'Keep union operations completely separate from management. Never offer special benefits to union members. Ensure democratic union elections.',
    reminder: '⚠️ PATTERN: Union control issue has persisted through 4 assessment cycles. Stronger enforcement/monitoring needed.'
  },
  '2.9.9.7': {
    auditFindings: 'Yorkmars (2025-06-11): Emergency exit door (B 02) at building C found LOCKED during working hours while other exits open.',
    commonProblems: 'Emergency exits locked to control worker movement; management prioritizing security over worker safety; inadequate maintenance of safety systems',
    advice: 'Install keyless/push-to-exit emergency doors. Conduct monthly emergency exit audits. Train all staff that exits must NEVER be locked during work hours.',
    reminder: '🚨 CRITICAL SAFETY: This is an immediate hazard. Violates Cambodia Labour Law Art. 228 and ILO CAT #249-251. Risk of worker entrapment in fire.'
  },
  '2.9.9.8': {
    auditFindings: 'Yorkmars (2025-06-11): While exit B 02 was locked, routes were obstructed. Assessment 11 (2024) and 12 (2025) both found non-compliance.',
    commonProblems: 'Blocked escape routes; equipment/materials stored near exits; inadequate space clearance',
    advice: 'Clear 1.5-meter minimum clearance from all emergency exits. Mark routes with reflective tape. Daily visual inspection of clear passage.',
    reminder: '⚠️ RECURRING: Emergency exit issues found in Assessment 11 (2024) and still not fully resolved in Assessment 12 (2025).'
  },
  '2.7.2.1': {
    auditFindings: 'Yorkmars (2025-06-11, Ref 103): Workers denied opportunity to work overtime by restricting sewing machine access until 12:00 PM, reducing actual work hours.',
    commonProblems: 'Employers restricting work hours while expecting overtime; wage manipulation through operational controls; insufficient overtime compensation',
    advice: 'Ensure overtime payment reflects actual hours worked. Do not artificially restrict work hours. Maintain accurate time records with worker signatures.',
    reminder: '⚠️ RECURRING ISSUE: Overtime wage non-compliance found in Assessment 12 (2025) and Assessment 11 (2024). Assessment 10 (2023) showed compliance.'
  },
  '2.10.1.4': {
    auditFindings: 'Yorkmars (2025-02-08, Ref 104): Factory implemented timing controls (machines off 11:00-11:45) to limit overtime, affecting worker pay. Improvement claimed but NOT verified.',
    commonProblems: 'Operational controls used to limit overtime hours; wage reduction through system manipulation; unverified corrective actions',
    advice: 'Provide fair opportunity for workers to earn overtime. Document all overtime in time records. Ensure overtime limits are actual time limits, not operational restrictions.',
    reminder: '⚠️ ALERT: Partial improvement claimed in October 2024 but still failed Assessment 12 (2025). Further verification needed on implementation.'
  },
  '2.10.1.5': {
    auditFindings: 'Yorkmars (2025-06-11): Overtime presented as mandatory through machine access control (not allowed before 12:00 PM) - implies worker must work overtime when available.',
    commonProblems: 'Forced overtime disguised as operational procedures; lack of genuine worker voluntary choice',
    advice: 'Clearly communicate that overtime is voluntary. Allow workers to refuse without penalty. Do not use operational controls to force participation.',
    reminder: '⚠️ CRITICAL: If overtime is not truly voluntary, this violates Cambodia Labour Law Art. 137.'
  }
};

// Read the seed file
const seedPath = path.join(__dirname, 'seeds', 'iloChecklist.js');
let content = fs.readFileSync(seedPath, 'utf-8');

// For each update, find the question object and inject the fields
Object.entries(auditUpdates).forEach(([questionNumber, updates]) => {
  // Find the question object pattern
  const pattern = new RegExp(
    `(\\{\\s*section:\\s*'ILO',\\s*sectionNumber:\\s*'[^']+',\\s*subsection:\\s*'[^']+',\\s*subsectionNumber:\\s*'[^']+',\\s*category:\\s*'[^']+',\\s*categoryNumber:\\s*'[^']+',\\s*questionNumber:\\s*'${questionNumber.replace(/\./g, '\\.')}',\\s*question:\\s*'[^']+',\\s*progress:\\s*\\d+,\\s*completed:\\s*\\d+,\\s*total:\\s*\\d+,?)`,
    's'
  );

  content = content.replace(pattern, (match) => {
    // Add audit findings fields before the closing brace
    const auditFieldsStr = `,
    auditFindings: '${updates.auditFindings.replace(/'/g, "\\'")}',
    commonProblems: '${updates.commonProblems.replace(/'/g, "\\'")}',
    advice: '${updates.advice.replace(/'/g, "\\'")}',
    reminder: '${updates.reminder.replace(/'/g, "\\'")}'`;

    return match + auditFieldsStr;
  });
});

// Write the updated content back
fs.writeFileSync(seedPath, content, 'utf-8');
console.log('✅ Audit findings added to iloChecklist.js');
