const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Mapping of advice by subsection
const adviceBySubsection = {
  '2.1': {
    commonProblems: 'Management may not recognize improvements; assessor access may be restricted; process integrity not maintained',
    advice: 'Document all improvements and achievements. Provide assessors full, unrestricted access. Report honestly on all findings.',
    reminder: '📊 Assessment integrity is crucial. Transparency and honest reporting are essential.'
  },
  '2.2': {
    commonProblems: 'Worker and union representatives not consulted on assessment or remediation plans',
    advice: 'Hold formal consultations with worker representatives before and after assessments. Involve unions in planning.',
    reminder: '🤝 ILO Convention 144 requires tripartite consultation. Worker voice is critical.'
  },
  '2.3': {
    commonProblems: 'Minors hired with false ID documents; age verification is superficial or absent',
    advice: 'Verify age with official government-issued ID at hiring. Document verification. Check references thoroughly.',
    reminder: '🚨 CRITICAL: Child labour is prohibited. Age verification must be strict and documented at hiring.'
  },
  '2.4': {
    commonProblems: 'Workers coerced into work; personal documents confiscated; freedom restricted; debt bondage exists',
    advice: 'Ensure all employment is voluntary. Never confiscate personal documents. Allow freedom of movement at all times.',
    reminder: '🚨 CRITICAL: Document confiscation is human trafficking. This is a crime. Zero tolerance.'
  },
  '2.5': {
    commonProblems: 'Job advertisements are deceptive; recruitment fees charged to workers; actual job differs from promises',
    advice: 'Use only licensed recruitment agencies. Job ads must be truthful and detailed. No recruitment fees from workers.',
    reminder: '⚠️ Deceptive recruitment is human trafficking. All job promises must be in writing and verified.'
  },
  '2.6': {
    commonProblems: 'Organizing is suppressed or punished; workers face retaliation for unionization; management controls unions',
    advice: 'Protect workers\' right to organize. Prohibit retaliation strictly. Allow independent unions. Bargain in good faith.',
    reminder: '⚠️ CRITICAL: Anti-union retaliation is a serious violation. ILO Convention 87 protects organizing rights.'
  },
  '2.7': {
    commonProblems: 'Wages below minimum; payment delayed or incomplete; excessive deductions; benefits withheld or unclear',
    advice: 'Pay 100% of legal minimum wage on time every payday. Transparent wage calculation. Document all deductions.',
    reminder: '💰 Wage theft is the most common violation. Timely, full, transparent payment is absolutely essential.'
  },
  '2.8': {
    commonProblems: 'Work hours exceed legal limits; overtime is mandatory; no rest days; scheduling is unpredictable',
    advice: 'Cap regular hours at legal maximum (48/week). Make overtime voluntary. Guarantee rest days. Schedule in advance.',
    reminder: '⏰ Excessive hours reduce productivity and harm worker health. Enforce legal limits strictly.'
  },
  '2.9': {
    commonProblems: 'Safety hazards present; protective equipment not provided; emergency exits blocked; no safety training',
    advice: 'Identify and eliminate hazards. Provide and enforce PPE use. Maintain equipment guards. Train all workers on safety.',
    reminder: '🚨 CRITICAL: Worker safety is non-negotiable. Prevention is the only strategy. Regular audits essential.'
  },
  '2.10': {
    commonProblems: 'Work hours exceed legal limits; breaks are skipped; annual leave is denied; work schedule unpredictable',
    advice: 'Regular hours ≤ 48/week maximum. Voluntary overtime with limits. Mandatory breaks. Allow all earned leave.',
    reminder: '⏰ Working time limits protect worker health and well-being. Rest is essential for safety and productivity.'
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
