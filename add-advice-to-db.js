const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Mapping of advice by subsection
const adviceBySubsection = {
  '2.1': {
    commonProblems: 'Management may not recognize improvements; assessor access may be restricted; process integrity not maintained',
    advice: 'Document all improvements and achievements. Provide assessors full, unrestricted access. Report honestly on all findings.',
    reminder: '📊 Assessment integrity is important. Transparency and honest reporting enable real improvement.'
  },
  '2.2': {
    commonProblems: 'Worker and union representatives not consulted on assessment or remediation plans',
    advice: 'Hold formal consultations with worker representatives before and after assessments. Involve unions in planning.',
    reminder: '🤝 ILO Convention 144 requires tripartite consultation. Worker voice strengthens decisions.'
  },
  '2.3': {
    commonProblems: 'Minors hired with false ID documents; age verification is superficial or absent',
    advice: 'Verify age with official government-issued ID at hiring. Document verification. Check references thoroughly.',
    reminder: '⚠️ Child labour prevention starts at hiring. Age verification must be thorough and documented.'
  },
  '2.4': {
    commonProblems: 'Workers coerced into work; personal documents confiscated; freedom restricted; debt bondage exists',
    advice: 'Ensure all employment is voluntary. Never confiscate personal documents. Allow freedom of movement at all times.',
    reminder: '⚠️ Worker freedom is fundamental. Never hold documents or restrict movement.'
  },
  '2.5': {
    commonProblems: 'Job advertisements are deceptive; recruitment fees charged to workers; actual job differs from promises',
    advice: 'Use only licensed recruitment agencies. Job ads must be truthful and detailed. No recruitment fees from workers.',
    reminder: '⚠️ Honest recruitment starts with truthful job descriptions. All promises must match reality.'
  },
  '2.6': {
    commonProblems: 'Organizing is suppressed or punished; workers face retaliation for unionization; management controls unions',
    advice: 'Protect workers\' right to organize. Prohibit retaliation strictly. Allow independent unions. Bargain in good faith.',
    reminder: '⚠️ Union rights are fundamental. Workers must be free to organize without fear.'
  },
  '2.7': {
    commonProblems: 'Wages below minimum; payment delayed or incomplete; excessive deductions; benefits withheld or unclear',
    advice: 'Pay 100% of legal minimum wage on time every payday. Transparent wage calculation. Document all deductions.',
    reminder: '💰 Wage issues are common. On-time, transparent, full payment builds worker trust.'
  },
  '2.8': {
    commonProblems: 'Work hours exceed legal limits; overtime is mandatory; no rest days; scheduling is unpredictable',
    advice: 'Cap regular hours at legal maximum (48/week). Make overtime voluntary. Guarantee rest days. Schedule in advance.',
    reminder: '⏰ Excessive hours harm productivity. Legal work hour limits protect both workers and business efficiency.'
  },
  '2.9': {
    commonProblems: 'Safety hazards present; protective equipment not provided; emergency exits blocked; no safety training',
    advice: 'Identify and eliminate hazards. Provide and enforce PPE use. Maintain equipment guards. Train all workers on safety.',
    reminder: '🛡️ Safety is foundational. Regular hazard assessments and training prevent injuries.'
  },
  '2.10': {
    commonProblems: 'Work hours exceed legal limits; breaks are skipped; annual leave is denied; work schedule unpredictable',
    advice: 'Regular hours ≤ 48/week maximum. Voluntary overtime with limits. Mandatory breaks. Allow all earned leave.',
    reminder: '⏰ Working time limits support worker health and productivity. Rest is essential.'
  }
};

async function addAdviceToAll() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    // Get all items
    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} checklist items`);

    let updateCount = 0;

    // Update each item with appropriate advice
    for (const item of items) {
      const subsection = item.subsectionNumber;
      const mainSub = subsection.split('.').slice(0, 2).join('.');

      // Only add if not already customized (no auditFindings)
      if (!item.auditFindings) {
        const advice = adviceBySubsection[mainSub];
        if (advice) {
          item.commonProblems = advice.commonProblems;
          item.advice = advice.advice;
          item.reminder = advice.reminder;
          await item.save();
          updateCount++;
        }
      }
    }

    console.log(`✅ Updated ${updateCount} items with advice`);
    console.log(`✅ Total items: ${items.length}`);

    await mongoose.connection.close();
    console.log('✅ Complete!');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

addAdviceToAll();
