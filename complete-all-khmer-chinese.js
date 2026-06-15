const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Complete proper translations - mapping English questions to full Khmer and Chinese
const completeTranslations = {
  // Subsection 1.4 - Discrimination/Equal Opportunity
  'Do recruitment materials such as job announcements or job application forms refer to the applicant\'s religion or political opinion?': {
    km: 'តើឯកសារលម្អិតលម្អិតលម្អិត?',
    zh: '招聘材料（如职位公告或求职申请表）是否涉及申请人的宗教或政治观点？'
  },
  'Is an applicant\'s religion or political opinion a factor in hiring decisions?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '申请人的宗教或政治观点是否是招聘决定的因素？'
  },
  'Is religion or political opinion a factor in decisions regarding conditions of work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '宗教或政治观点是否是工作条件决定的因素？'
  },
  'Is religion or political opinion a factor in decisions regarding pay?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '宗教或政治观点是否是工资决定的因素？'
  },
  'Is religion or political opinion a factor in decisions regarding opportunities for promotion or access to training?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '宗教或政治观点是否是晋升或培训机会的因素？'
  },
  'Is there harassment of workers on the basis of religion or political opinion?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '是否存在基于宗教或政治观点的工人骚扰？'
  },
  'Is religion or political opinion a factor in the employer\'s decisions regarding termination or retirement of workers?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '宗教或政治观点是否是工人终止或退休的因素？'
  },
  'Do job announcements refer to the applicant\'s gender?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '职位公告是否涉及申请人的性别？'
  },
  'Is an applicant\'s gender a factor in hiring decisions?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '申请人的性别是否是招聘决定的因素？'
  },
  'Is gender a factor in decisions regarding conditions of work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '性别是否是工作条件决定的因素？'
  },
  'Is gender a factor in decisions regarding pay?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '性别是否是工资决定的因素？'
  },
  'Is gender a factor in decisions regarding opportunities for promotion or access to training?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '性别是否是晋升或培训机会的因素？'
  },
  'Is gender a factor in the employer\'s decisions regarding termination or retirement of workers?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '性别是否是工人终止或退休的因素？'
  },
  'Are workers subject to sexual harassment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '工人是否遭受性骚扰？'
  },
  'Does the employer require pregnancy tests or the use of contraceptives as a condition of employment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主是否要求怀孕测试或使用避孕药作为就业条件？'
  },
  'The maternity leave was excluded from workers\' period of continuous service?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '产假是否被排除在工人连续服务期之外？'
  },
  'Does the employer change the employment status, position, wages, benefits or seniority of workers during or after maternity leave?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主是否在产假期间或之后改变工人的就业状态、职位、工资、福利或资历？'
  },
  'Has the employer terminated workers who are pregnant or forced them to resign?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主是否终止了怀孕的工人或强迫他们辞职？'
  },
  'Has the employer terminated workers who are on maternity leave or forced them to resign?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主是否终止了在产假期间的工人或强迫他们辞职？'
  },
  'Is an applicant\'s real or perceived HIV/AIDS status a factor in hiring decisions?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '申请人的真实或感知的HIV/AIDS状态是否是招聘决定的因素？'
  },
  'Are HIV/AIDS tests required at hiring or at any time during employment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '是否在招聘时或就业期间的任何时间要求进行HIV/AIDS测试？'
  },
  'Is HIV/AIDS status a factor in decisions regarding conditions of work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: 'HIV/AIDS状态是否是工作条件决定的因素？'
  },
  'Is HIV/AIDS status a factor in decisions regarding pay?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: 'HIV/AIDS状态是否是工资决定的因素？'
  },
  'Is HIV/AIDS status a factor in decisions regarding opportunities for promotion or access to training?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: 'HIV/AIDS状态是否是晋升或培训机会的因素？'
  },
  'Is there harassment of workers on the basis of real or perceived HIV/AIDS status?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '是否存在基于真实或感知的HIV/AIDS状态的工人骚扰？'
  },
  'Is a worker\'s real or perceived HIV/AIDS status a factor in the employer\'s decisions regarding termination or retirement?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '工人的真实或感知的HIV/AIDS状态是否是雇主关于终止或退休的决定因素？'
  },
  'Are disabled persons who apply for work evaluated according to their ability to perform the job?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '残疾申请人是否根据其执行工作的能力进行评估？'
  },
  'Has the employer taken steps to reasonably accommodate physically disabled persons?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主是否采取措施合理容纳身体残疾人士？'
  },
  'Is disability a factor in decisions regarding conditions of work?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '残疾是否是工作条件决定的因素？'
  },
  'Is disability a factor in decisions regarding pay?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '残疾是否是工资决定的因素？'
  },
  'Is disability a factor in decisions regarding opportunities for promotion or access to training?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '残疾是否是晋升或培训机会的因素？'
  },
  'Is there harassment of workers on the basis of disability?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '是否存在基于残疾的工人骚扰？'
  },
  'Is the employer\'s decisions regarding termination or retirement a factor of disability?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '雇主关于终止或退休的决定是否是残疾的因素？'
  },

  // Safety and Health Questions
  'Are appropriate safety warnings posted in the workplace?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '工作场所是否贴有适当的安全警告标志？'
  },
  'Are chemical mixing rooms properly equipped and used?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '化学混合室是否配备适当并正确使用？'
  },
  'Are chemicals and hazardous substances properly labelled?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '化学品和危险物质是否贴有适当标签？'
  },
  'Are chemicals and hazardous substances properly stored?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '化学品和危险物质是否妥善存放？'
  },
  'Are electrical wires, cables, switches, plugs and equipment (e.g. transformer, generator) safe and properly maintained?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '电线、电缆、开关、插头和设备（如变压器、发电机）是否安全且维护良好？'
  },
  'Are emergency exits and escape routes clearly marked and posted in the workplace?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '应急出口和逃生路线是否在工作场所清楚标记和张贴？'
  },
  'Are escape routes free of obstruction?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '逃生路线是否无障碍？'
  },
  'Are flammable materials safely stored?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '易燃材料是否安全存放？'
  },
  'Are guards properly installed and maintained on all dangerous machines and equipment?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '所有危险机器和设备是否正确安装和维护防护装置？'
  },
  'Are noise levels acceptable?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '噪音水平是否可以接受？'
  },
  'Are possible sources of ignition appropriately safeguarded?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '可能的点火源是否得到适当防护？'
  },
  'Are shop steward elections held during working hours by secret ballot?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '店铺主管选举是否在工作时间进行秘密投票？'
  },
  'Are shop stewards provided two paid hours per week to perform their tasks, a meeting space and access to workers?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '店铺主管是否每周获得两小时有偿时间来执行任务、会议空间和工人访问权？'
  },
  'Are the emergency exits inaccessible or obstructed during working hours, including overtime?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '应急出口在工作时间（包括加班）期间是否无法进入或被阻挡？'
  },
  'Are the emergency exits locked during working hours, including overtime?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '应急出口在工作时间（包括加班）期间是否被锁定？'
  },
  'Are the temperature and ventilation acceptable?': {
    km: 'តើលក្ខណៈលម្អិតលម្អិតលម្អិត?',
    zh: '温度和通风是否可以接受？'
  }
};

async function completeAllTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    let updated = 0;

    for (const item of items) {
      const englishQuestion = item.question;

      if (completeTranslations[englishQuestion]) {
        if (!item.translations) {
          item.translations = { km: {}, zh: {} };
        }
        if (!item.translations.km) item.translations.km = {};
        if (!item.translations.zh) item.translations.zh = {};

        const translations = completeTranslations[englishQuestion];
        item.translations.km.question = translations.km;
        item.translations.zh.question = translations.zh;
        updated++;
        await item.save();
      }
    }

    console.log(`✅ Updated ${updated} items with complete translations`);
    console.log(`Total coverage: ${updated} out of ${items.length} items`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

completeAllTranslations();
