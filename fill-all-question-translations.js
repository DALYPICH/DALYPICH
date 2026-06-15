const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Map actual English questions to Khmer and Chinese
const questionTranslations = {
  // Format: English question -> { km: Khmer, zh: Chinese }
  'Is there any good practice/progress made or key strength in the factory?': {
    km: 'នៅលើឯកសារលម្អិតលម្អិតលម្អិត',
    zh: '工厂是否有任何良好的实践/进展或主要优势？'
  },
  "Was the assessor's access to the enterprise unreasonably restricted?": {
    km: 'សូមបង្ហាញឯកសារលម្អិតលម្អិត',
    zh: '评估员对企业的访问是否受到不合理的限制？'
  },
  'Were documents provided in a timely manner?': {
    km: 'តើឯកសារលម្អិតលម្អិត',
    zh: '文件是否及时提供？'
  },
  'Number of assessment visits prior to STAR Cycle 1:': {
    km: 'ចំនួនលើកលេង',
    zh: 'STAR周期1之前的评估访问次数：'
  },
  'How many person days were spent on the assessment visit?': {
    km: 'ចំនួនថ្ងៃផ្នែក',
    zh: '评估访问花费了多少人天？'
  },
  'Provide the titles of the management staff interviewed.': {
    km: 'ផ្តល់ឱ្យឧបផ្ទាល់ខ្លួន',
    zh: '提供接受采访的管理人员的职位。'
  },
  'Briefly describe the interviews with workers/ union leaders/ shop stewards:': {
    km: 'សូមលម្អិតលម្អិត',
    zh: '简要描述与工人/工会领导人/店铺主管的访谈：'
  },
  'Did any problems or difficulties emerge during the assessment?': {
    km: 'សូមលម្អិត',
    zh: '评估期间是否出现了任何问题或困难？'
  },
  'Any other observations or suggestions with regards to the assessment process?': {
    km: 'សូមលម្អិត',
    zh: '评估过程中是否有任何其他观察或建议？'
  },
  'Has management consulted with elected worker representatives, including trade unions (if present) in determining the need for and scope of the assessment?': {
    km: 'តើលក្ខណៈនាយកដ្ឋានបានប្រឹក្សាយោបល់ដូច្នេះ?',
    zh: '管理部门是否与当选的工人代表（包括工会）协商评估的必要性和范围？'
  },
  'Have you found any workers under the age of 15?': {
    km: 'តើអ្នកបានរកឃើញកម្មករក្រោម?',
    zh: '您发现任何年龄在15岁以下的工人吗？'
  },
  'Have you found any workers under 18 who are engaged in hazardous work?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌរក្សាទុក?',
    zh: '您是否发现任何年龄在18岁以下从事危险工作的工人？'
  },
  'Does the factory have a written child labour policy?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否有书面的童工政策？'
  },
  'How does the factory verify the age of workers?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂如何验证工人的年龄？'
  },
  'Are additional protections provided for young workers (under 18)?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否为年轻工人（18岁以下）提供额外的保护？'
  },
  'If child labour was found, what actions has the factory taken?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '如果发现童工，工厂采取了什么行动？'
  },
  'Is there evidence of forced labor?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '是否有任何证据表明工人被强迫劳动？'
  },
  'Does the factory confiscate workers\' personal documents?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否扣押工人的个人证件？'
  },
  'Are workers free to leave the workplace?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否自由离开工作场所？'
  },
  'Can workers freely choose to leave employment?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否可以自由选择何时离职？'
  },
  'Does the factory impose any fees or bonded labor on workers?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否对工人征收任何形式的费用或债务？'
  },
  'Are workers aware of their rights and obligations?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否了解他们的权利和义务？'
  },
  'Can workers exercise their rights without fear of retaliation?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否可以自由行使权利而不受惩罚？'
  },
  'Are recruitment advertisements accurate and truthful?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '招聘广告是否准确描述工作条件？'
  },
  'Are workers charged recruitment fees?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂或招聘机构是否向工人收取招聘费用？'
  },
  'Do workers receive written contracts?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否收到书面的工作合同？'
  },
  'Do workers understand their contracts?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否理解合同条款？'
  },
  'Do actual working conditions match the recruitment promises?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '实际工作条件是否与招聘时的承诺相符？'
  },
  'Are workers free to organize and join unions?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否自由组织和加入工会？'
  },
  'Does management engage in collective bargaining with union representatives?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '管理部门是否与工会代表进行集体谈判？'
  },
  'Are workers penalized or retaliated against for organizing?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否因组织而受到惩罚或报复？'
  },
  'Does the factory have a written union policy?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否有针对工会活动的书面政策？'
  },
  'Are unions free to conduct their activities?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工会是否能够自由进行工会活动？'
  },
  'Are workers aware of their union rights?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否了解他们的工会权利？'
  },
  'Does the factory facilitate union activities?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否为工会提供进行活动的便利？'
  },
  'Are all workers paid at least the legal minimum wage?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '所有工人的工资是否至少达到法定最低工资？'
  },
  'Is wages paid on time?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工资是否按时支付？'
  },
  'Are payslips accurate?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人的工资单是否准确反映其收入和扣除？'
  },
  'Do workers receive benefits?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否获得带薪假期和其他福利？'
  },
  'Are wage records retained?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否保留了所有工资记录至少两年？'
  },
  'Do workers understand how wages are calculated?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否了解其工资计算方式？'
  },
  'Can workers challenge wage errors?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否可以质疑工资单中的任何错误？'
  },
  'Are improper wage deductions made?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '是否对工资进行任何不当扣除？'
  },
  'Does the factory have a clear wage policy?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否有清晰的工资政策？'
  },
  'Do regular working hours exceed 48 hours per week?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '常规工作周时间是否超过48小时？'
  },
  'Is overtime mandatory?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否强制加班？'
  },
  'Do workers get at least one rest day per week?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人每周是否至少有一天休息日？'
  },
  'Is the work schedule posted in advance?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否提前公布工作时间表？'
  },
  'Are workers aware of their working time rights?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否了解其工作时间权利？'
  },
  'Is overtime adequately compensated?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '加班是否得到适当补偿？'
  },
  'Has the factory conducted hazard identification and risk assessment?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否进行过危害识别和风险评估？'
  },
  'Are workers provided with necessary protective equipment?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否获得必要的防护装备？'
  },
  'Is safety and health training provided?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否提供了安全和卫生方面的培训？'
  },
  'Is there a formal safety and health committee?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '是否有正式的安全和卫生委员会？'
  },
  'Are work injuries and occupational diseases recorded?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否记录了工伤和职业病？'
  },
  'Can workers refuse unsafe work?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否有权拒绝不安全工作？'
  },
  'Is there an emergency and evacuation plan?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否有应急和疏散计划？'
  },
  'Do workers have adequate rest periods?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否每天获得适当的休息时间？'
  },
  'Can workers enjoy legal annual leave?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否能够享受法定的年假？'
  },
  'Is a minimum number of annual leave days specified?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工厂是否规定了最少年假天数？'
  },
  'Are workers paid during leave?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人能否在休假期间获得工资？'
  },
  'Can workers refuse to work on rest days and holidays?': {
    km: 'តើលក្ខណៈលក្ខណ្ឌលម្អិត?',
    zh: '工人是否有权拒绝在休息日和假期工作？'
  }
};

async function fillAllTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    let kmUpdated = 0;
    let zhUpdated = 0;
    let unmatched = [];

    for (const item of items) {
      if (!item.translations) {
        item.translations = { km: {}, zh: {} };
      }

      const englishQuestion = item.question;
      const translation = questionTranslations[englishQuestion];

      if (translation) {
        if (!item.translations.km) item.translations.km = {};
        if (!item.translations.zh) item.translations.zh = {};

        if (!item.translations.km.question) {
          item.translations.km.question = translation.km;
          kmUpdated++;
        }
        if (!item.translations.zh.question) {
          item.translations.zh.question = translation.zh;
          zhUpdated++;
        }
        await item.save();
      } else {
        unmatched.push(englishQuestion);
      }
    }

    console.log(`✅ Updated ${kmUpdated} Khmer question translations`);
    console.log(`✅ Updated ${zhUpdated} Chinese question translations`);

    if (unmatched.length > 0) {
      console.log(`⚠️ ${unmatched.length} questions have no translations yet:`);
      unmatched.slice(0, 5).forEach(q => console.log(`  - ${q}`));
      if (unmatched.length > 5) console.log(`  ... and ${unmatched.length - 5} more`);
    }

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fillAllTranslations();
