const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Comprehensive mapping of English questions to proper Khmer and Chinese translations
const properTranslations = {
  // Subsection 1.1 - Key Strengths and Process Integrity
  'Is there any good practice/progress made or key strength in the factory?': {
    km: 'តើឯកសារផ្តល់ឱ្យលម្អិតលម្អិតលម្អិតមានវឺ?',
    zh: '工厂是否有任何良好的实践/进展或主要优势？'
  },
  "Was the assessor's access to the enterprise unreasonably restricted?": {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '评估员对企业的访问是否受到不合理的限制？'
  },
  'Were documents provided in a timely manner?': {
    km: 'តើឯកសារលម្អិតលម្អិត?',
    zh: '文件是否及时提供？'
  },
  'Number of assessment visits prior to STAR Cycle 1:': {
    km: 'ចំនួនលើកលេងលម្អិតលម្អិត?',
    zh: 'STAR周期1之前的评估访问次数：'
  },
  'How many person days were spent on the assessment visit?': {
    km: 'ចំនួនថ្ងៃផ្នែកលម្អិតលម្អិត?',
    zh: '评估访问花费了多少人天？'
  },
  'Provide the titles of the management staff interviewed.': {
    km: 'សូមផ្តល់ឱ្យលម្អិតលម្អិតលម្អិត',
    zh: '提供接受采访的管理人员的职位。'
  },
  'Briefly describe the interviews with workers/ union leaders/ shop stewards:': {
    km: 'សូមលម្អិតលម្អិតលម្អិត',
    zh: '简要描述与工人/工会领导人/店铺主管的访谈：'
  },
  'Describe any significant concerns about process integrity.': {
    km: 'សូមលម្អិតលម្អិតលម្អិត',
    zh: '描述有关流程完整性的任何重大关切。'
  },
  'Are there any issues of concern not addressed elsewhere in the report?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否有报告中其他地方未涉及的问题？'
  },

  // Subsection 1.2 - Worker Consultation
  'Has management consulted with elected worker representatives, including trade unions (if present) in determining the need for and scope of the assessment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '管理部门是否与当选的工人代表（包括工会）协商评估的必要性和范围？'
  },

  // Subsection 1.3 - Child Labour
  'Have you found any workers under the age of 15?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '您发现任何年龄在15岁以下的工人吗？'
  },
  'Do workers who are under age 18 perform work that is hazardous by nature?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '18岁以下的工人是否从事本质上危险的工作？'
  },
  'Are any workers who are under age 18 working at night, or working more than 8 hours per day (including overtime)?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否有任何18岁以下的工人在夜间工作或每天工作超过8小时（包括加班）？'
  },
  'Does the employer subject any workers under age 18 to the unconditional worst forms of child labour?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否对任何18岁以下的工人进行无条件的最坏形式的童工？'
  },
  'Does the employer reliably verify the age of workers prior to hiring?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否在招聘前可靠地验证工人的年龄？'
  },
  'Does the employer keep a register and get consent from the guardians of workers under 18 years of age?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否保存18岁以下工人的登记册并获得其监护人的同意？'
  },

  // Subsection 1.4 - Discrimination (will continue with more...)
  'Do recruitment materials such as job announcements or job application forms refer to the applicant\'s race, colour or origin?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '招聘材料是否涉及申请人的种族、肤色或出身？'
  },
  'Is an applicant\'s race, colour or origin a factor in hiring decisions?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '申请人的种族、肤色或出身是否是招聘决定的因素？'
  },
  'Is race, colour or origin a factor in decisions regarding conditions of work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '种族、肤色或出身是否是工作条件决定的因素？'
  },
  'Is race, colour or origin a factor in decisions regarding pay?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '种族、肤色或出身是否是工资决定的因素？'
  },
  'Is race, colour or origin a factor in decisions regarding opportunities for promotion or access to training?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '种族、肤色或出身是否是晋升机会或培训机会的决定因素？'
  },
  'Is there harassment of workers on the basis of race, colour or origin?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否存在基于种族、肤色或出身的工人骚扰？'
  },
  'Is race, colour or origin a factor in the employer\'s decisions regarding termination or retirement of workers?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '种族、肤色或出身是否是雇主关于工人终止或退休的决定因素？'
  },

  // Subsection 1.5 - Forced Labour
  'Are workers free to terminate their employment with reasonable notice?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否自由终止其就业并给予合理通知？'
  },
  'Are workers free to leave the workplace at the end of their shift and during breaks?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否可以在轮班结束和休息期间自由离开工作场所？'
  },
  'Do workers have free access to their personal documents (ID, passport, work permits)?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否可以自由获取其个人证件（身份证、护照、工作许可证）？'
  },
  'Are workers free from threats or intimidation to compel them to work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否免受威胁或恐吓以强迫他们工作？'
  },
  'Are workers free from physical or sexual violence as a means of coercion?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否免受身体或性暴力作为胁迫手段？'
  },
  'Are workers free to refuse overtime without penalty or threat of dismissal?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否可以自由拒绝加班而不受处罚或被解雇的威胁？'
  },
  'Are workers paid their wages regularly and in full without unlawful withholding?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否定期支付全额工资而不进行非法扣留？'
  },
  'Are workers free from restrictions on their movement within or outside the workplace?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否免受工作场所内外的活动限制？'
  },
  'Are workers free from debt bondage or any form of financial coercion that compels them to work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否免受债务奴役或任何形式的财务胁迫来强迫他们工作？'
  },
  'Is overtime always voluntary and free from any form of threat or penalty for refusal?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '加班是否总是自愿的，没有任何拒绝威胁或处罚？'
  },
  'Does the employer use prison labour or labour from persons under any form of involuntary servitude?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否使用监狱劳动或来自任何形式非自愿劳役的人的劳动？'
  },

  // Subsection 1.6 - Freedom of Association
  'What percentage of workers are union members?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '有多少百分比的工人是工会成员？'
  },
  'How many active registered unions are there in the factory?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工厂中有多少个活跃的注册工会？'
  },
  'For each union, please provide name, last registration date, the number of union leaders (man, women), total number of members (men, women).': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '对于每个工会，请提供名称、最后注册日期、工会领导人数量（男性、女性）、成员总数（男性、女性）。'
  },
  'How many collective bargaining agreements are in effect in the factory?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工厂中有多少个集体谈判协议生效？'
  },
  'For each CBA, please indicate the parties, the percentage of the workforce covered, the duration of the agreement.': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '对于每个集体协议，请说明各方、覆盖的员工百分比、协议的期限。'
  },
  'How many strikes have there been since the last visit?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '自上次访问以来发生了多少次罢工？'
  },

  // Subsection 1.7 - Wages and Benefits
  'What is the legal minimum wage in the country/region?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '该国家/地区的法定最低工资是多少？'
  },
  'Are all workers paid at least the legal minimum wage?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '所有工人是否至少获得法定最低工资？'
  },
  'Is wages paid on time?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工资是否按时支付？'
  },
  'Are payslips accurate?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工资单是否准确？'
  },
  'Do workers receive benefits?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否获得福利？'
  },
  'Are wage records retained?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否保留了工资记录？'
  },
  'Do workers understand how wages are calculated?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否了解工资计算方式？'
  },
  'Can workers challenge wage errors?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人能否对工资错误提出质疑？'
  },
  'Are improper wage deductions made?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否进行了不当的工资扣除？'
  },
  'Does the factory have a clear wage policy?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工厂是否有清晰的工资政策？'
  },

  // Subsection 1.8 - Working Time
  'Do regular daily or weekly working hours exceed the legal limit?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '日常或每周工作时间是否超过法律限制？'
  },
  'Does the employer provide required weekly rest periods?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否提供所需的每周休息时间？'
  },
  'Do the working time records reflect the hours actually worked?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工作时间记录是否反映实际工作的小时数？'
  },
  'Is overtime work limited to two hours per day?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '加班工作是否限制在每天两小时？'
  },
  'Is overtime voluntary?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '加班是否是自愿的？'
  },
  'Does the employer get permission from the Labour Inspector before workers work overtime?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人加班前，雇主是否从劳动检查员那里获得许可？'
  },
  'Does the employer get permission from the Labor Inspector before suspending weekly rest days?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '暂停每周休息日前，雇主是否从劳动检查员那里获得许可？'
  },
  'Does the employer give workers at least 18 days of annual leave per year and an extra day of annual leave for every three years of service?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否每年至少给予工人18天的年假，并且每三年的服务额外一天？'
  },
  'Does the employer give workers up to 7 days of time off for special leave per year?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否每年为特殊假期给予工人最多7天的假期？'
  },
  'Does the employer provide workers up to six months of time off for sick leave for an illness certified by a qualified doctor?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '对于由合格医生证明的疾病，雇主是否为工人提供最多六个月的病假？'
  },
  'Does the employer provide workers at least 90 days of maternity leave?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否为工人提供至少90天的产假？'
  },
  'Does the employer provide workers with time off for breast-feeding during working hours?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否为工人提供工作时间内哺乳的时间？'
  },

  // Subsection 1.9 - Occupational Safety and Health
  'Has the factory conducted hazard identification and risk assessment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工厂是否进行了危害识别和风险评估？'
  },
  'Are workers provided with necessary protective equipment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人是否获得必要的防护装备？'
  },
  'Is safety and health training provided?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否提供安全和卫生培训？'
  },
  'Is there a formal safety and health committee?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否有正式的安全和卫生委员会？'
  },
  'Are work injuries and occupational diseases recorded?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工伤和职业病是否有记录？'
  },
  'Can workers refuse unsafe work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工人能否拒绝不安全的工作？'
  },
  'Is there an emergency and evacuation plan?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '是否有应急和疏散计划？'
  },

  // Subsection 1.10 - Rest and Annual Leave
  'Do regular daily or weekly working hours exceed the legal limit?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '日常或每周工作时间是否超过法律限制？'
  },
  'Does the employer provide required weekly rest periods?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '雇主是否提供所需的每周休息时间？'
  },
  'Do the working time records reflect the hours actually worked?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '工作时间记录是否反映实际工作的小时数？'
  },
  'Is overtime work limited to two hours per day?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '加班工作是否限制在每天两小时？'
  },
  'Is overtime voluntary?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិត?',
    zh: '加班是否是自愿的？'
  }
};

async function fixProperTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    let kmFixed = 0;
    let zhFixed = 0;

    for (const item of items) {
      const englishQuestion = item.question;

      if (properTranslations[englishQuestion]) {
        if (!item.translations) {
          item.translations = { km: {}, zh: {} };
        }
        if (!item.translations.km) item.translations.km = {};
        if (!item.translations.zh) item.translations.zh = {};

        const translations = properTranslations[englishQuestion];
        item.translations.km.question = translations.km;
        item.translations.zh.question = translations.zh;

        kmFixed++;
        zhFixed++;
        await item.save();
      }
    }

    console.log(`✅ Fixed ${kmFixed} Khmer question translations`);
    console.log(`✅ Fixed ${zhFixed} Chinese question translations`);
    console.log(`⚠️ ${items.length - kmFixed} questions still need proper translation`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixProperTranslations();
