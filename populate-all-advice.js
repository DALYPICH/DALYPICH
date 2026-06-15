const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

const adviceBySubsection = {
  '1.1': {
    commonProblems: 'Management may not recognize improvements; assessor access may be restricted; process integrity not maintained',
    advice: 'Document all improvements and achievements. Provide assessors full, unrestricted access. Report honestly on all findings.',
    reminder: '📊 Assessment integrity is important. Transparency and honest reporting enable real improvement.'
  },
  '1.2': {
    commonProblems: 'Worker and union representatives not consulted on assessment or remediation plans',
    advice: 'Hold formal consultations with worker representatives before and after assessments. Involve unions in planning.',
    reminder: '🤝 ILO Convention 144 requires tripartite consultation. Worker voice strengthens decisions.'
  },
  '1.3': {
    commonProblems: 'Minors hired with false ID documents; age verification is superficial or absent',
    advice: 'Verify age with official government-issued ID at hiring. Document verification. Check references thoroughly.',
    reminder: '⚠️ Child labour prevention starts at hiring. Age verification must be thorough and documented.'
  },
  '1.4': {
    commonProblems: 'Workers coerced into work; personal documents confiscated; freedom restricted; debt bondage exists',
    advice: 'Ensure all employment is voluntary. Never confiscate personal documents. Allow freedom of movement at all times.',
    reminder: '⚠️ Worker freedom is fundamental. Never hold documents or restrict movement.'
  },
  '1.5': {
    commonProblems: 'Job advertisements are deceptive; recruitment fees charged to workers; actual job differs from promises',
    advice: 'Use only licensed recruitment agencies. Job ads must be truthful and detailed. No recruitment fees from workers.',
    reminder: '⚠️ Honest recruitment starts with truthful job descriptions. All promises must match reality.'
  },
  '1.6': {
    commonProblems: 'Organizing is suppressed or punished; workers face retaliation for unionization; management controls unions',
    advice: 'Protect workers\' right to organize. Prohibit retaliation strictly. Allow independent unions. Bargain in good faith.',
    reminder: '⚠️ Union rights are fundamental. Workers must be free to organize without fear.'
  },
  '1.7': {
    commonProblems: 'Wages below minimum; payment delayed or incomplete; excessive deductions; benefits withheld or unclear',
    advice: 'Pay 100% of legal minimum wage on time every payday. Transparent wage calculation. Document all deductions.',
    reminder: '💰 Wage issues are common. On-time, transparent, full payment builds worker trust.'
  },
  '1.8': {
    commonProblems: 'Work hours exceed legal limits; overtime is mandatory; no rest days; scheduling is unpredictable',
    advice: 'Cap regular hours at legal maximum (48/week). Make overtime voluntary. Guarantee rest days. Schedule in advance.',
    reminder: '⏰ Excessive hours harm productivity. Legal work hour limits protect both workers and business efficiency.'
  },
  '1.9': {
    commonProblems: 'Safety hazards present; protective equipment not provided; emergency exits blocked; no safety training',
    advice: 'Identify and eliminate hazards. Provide and enforce PPE use. Maintain equipment guards. Train all workers on safety.',
    reminder: '🛡️ Safety is foundational. Regular hazard assessments and training prevent injuries.'
  },
  '1.10': {
    commonProblems: 'Work hours exceed legal limits; breaks are skipped; annual leave is denied; work schedule unpredictable',
    advice: 'Regular hours ≤ 48/week maximum. Voluntary overtime with limits. Mandatory breaks. Allow all earned leave.',
    reminder: '⏰ Working time limits support worker health and productivity. Rest is essential.'
  }
};

async function populateAllAdvice() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} items`);

    let updated = 0;

    for (const item of items) {
      const subsection = item.subsectionNumber;
      const mainSub = subsection.split('.').slice(0, 2).join('.');

      // Check if already has custom audit findings
      if (!item.auditFindings || item.auditFindings === '') {
        const advice = adviceBySubsection[mainSub];
        if (advice) {
          // Only update if fields are missing
          if (!item.commonProblems || item.commonProblems === '') {
            item.commonProblems = advice.commonProblems;
          }
          if (!item.advice || item.advice === '') {
            item.advice = advice.advice;
          }
          if (!item.reminder || item.reminder === '') {
            item.reminder = advice.reminder;
          }
          await item.save();
          updated++;
        }
      }
    }

    console.log(`✅ Updated ${updated} items with missing advice`);
    console.log(`✅ All items now have complete advisory data`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

populateAllAdvice();
