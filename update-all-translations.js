const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Complete Khmer translations for all subsections 1.1-1.10
const khmerTranslations = {
  '1.1': {
    subsection: 'ចំនុចខ្លាំង និងលក្ខណៈសម្បត្តិដំណើរការ',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'នាយកដ្ឋាននាយកដ្ឋានប្រហែលជាមិនទទួលស្គាល់ការកែលម្អ។ ការចូលប្រើប្រាស់របស់អ្នកវាយតម្លៃអាចត្រូវបានដាក់កម្រិត។ សមាភាពដំណើរការមិនត្រូវបានរក្សាទុក។',
      advice: 'ឯកសារលម្អិតលម្អិតនៃការកែលម្អ និងលទ្ធផល។ ផ្តល់ឱ្យអ្នកវាយតម្លៃលទ្ធភាពចូលប្រើប្រាស់ពេញលេញ។ រាយការណ៍ដោយស្មោះត្រង់នូវលទ្ធផលទាំងអស់។',
      reminder: '📊 ភាពលម្អិតលម្អិតនៃការវាយតម្លៃគឺសំខាន់។ ភាពច្បាស់លាស់ និងការរាយការណ៍ដោយស្មោះត្រង់ដោះស្រាយការកែលម្អពិតប្រាកដ។'
    }
  },
  '1.2': {
    subsection: 'ការស្ម័គ្រココនស្គាល់ដងក្រម',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'មិនបានប្រឹក្សាយោបល់ក្រុមតំណាងនិយោជកនិងសហជីព។ ផែនការកែលម្អមិនបានចូលរួម។',
      advice: 'ធ្វើការប្រឹក្សាយោបល់ផ្លូវការ។ ចូលរួមក្នុងការរៀបចំផែនការ។ សូមស្វាគមន៍ការយោបល់។',
      reminder: '🤝 អនុសញ្ញា ILO 144 ទាមទារការប្រឹក្សាយោបល់បីភាគី។ សម្លេងកម្មករពង្រឹងការសម្រេច។'
    }
  },
  '1.3': {
    subsection: 'ការលើកលែងលក្ខណៈពិសេស',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'មនុស្សវ័យក្មេងត្រូវបានផ្តល់ឱ្យឯកសារបង្កើតបង្កាច់។ ការផ្ទៀងផ្ទាត់អាយុដ៏ក្ដៅ ឬគ្មាន។',
      advice: 'បង្ហាញអាយុដោយឯកសាររដ្ឋាភិបាល។ ឯកសារលម្អិតលម្អិតនៃការផ្ទៀងផ្ទាត់។ ពិនិត្យឯកសារយោង។',
      reminder: '⚠️ ការការពារលក្ខណៈពិសេសចាប់ផ្តើមក្នុងពេលផ្តល់ផ្ទាល់ខ្លួន។ ការផ្ទៀងផ្ទាត់អាយុត្រូវលម្អិត។'
    }
  },
  '1.4': {
    subsection: 'ការបង្កើតកម្មង្គេល',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'កម្មករត្រូវបានបង្ខំឱ្យធ្វើការ។ ឯកសារក្នុងស្វាគមន៍។ សេរីភាពត្រូវបានដាក់កម្រិត។ ប្រាក់ឈ្នួល វិលត្រឡប់។',
      advice: 'ធានាឱ្យការផ្តល់ផ្ទាល់ខ្លួនដោយស្ម័គ្រច។ មិនដាក់កម្រិតឯកសារផ្ទាល់ខ្លួនដែលបានរក្សាទុក។ អនុញ្ញាតឱ្យសេរីភាពចលនា។',
      reminder: '⚠️ សេរីភាពកម្មករគឺជាមូលដ្ឋាន។ មិនដាក់កម្រិតឯកសារឬចលនា។'
    }
  },
  '1.5': {
    subsection: 'ការផ្ដល់ការងារលម្អិត',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'ការផ្សាយពាណិជ្ជកម្ម ទូលាយលម្អិត។ ថ្លៃឈ្នួលផ្ដល់ពលរដ្ឋ។ ការងារខុសគ្នាពីឆ្នាំ។',
      advice: 'ប្រើតែទូលាយលម្អិត។ ឯកសារលម្អិតលម្អិតត្រូវតែត្រូវបាន។ មិនមានលក្ខណៈឆ្នាំផ្ដល់។',
      reminder: '⚠️ ការផ្ដល់ការងារសម្រេចចិត្តចាប់ផ្តើម។ ឆ្នាំត្រូវតែផ្ទៀងផ្ទាត់ដល់សេចក្តីពិតប្រាកដ។'
    }
  },
  '1.6': {
    subsection: 'សិទ្ធិនៃសហជីពនិងការរៀបចំ',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'ការរៀបចំត្រូវបានកាត់ផ្តាច់ឬទទួលបាន។ កម្មករត្រូវទទួលបាននូវការង៉ាយ។ ឯកសារលម្អិតលម្អិត។',
      advice: 'ការពារសិទ្ធិរៀបចំ។ ឧក្រិដ្ឋកម្មរឹងរូសថាប។ សហជីពឯករាជ្យ។ ម៉ាក់ប៉ាក់។',
      reminder: '⚠️ សិទ្ធិសហជីពគឺជាមូលដ្ឋាន។ កម្មករត្រូវតែសេរីរៀបចំដោយគ្មានការខ្ពើម។'
    }
  },
  '1.7': {
    subsection: 'ប្រាក់ឈ្នួល និងហាងឆេង',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'ប្រាក់ឈ្នួលក្រោមលក្ខណៈក្រោម។ ការទូទាត់ក្រោយ ឬមិនពេញលេញ។ ការកាត់ម៉ាឡា។ ផលប័ទ្ធិមិនច្បាស់។',
      advice: 'បង់ប្រាក់ឈ្នួលអប្បបរមាទាំងមូល។ ការគណនាប្រាក់ឈ្នួលថ្លងលាង។ ឯកសារលម្អិត។',
      reminder: '💰 បញ្ហាប្រាក់ឈ្នួលមានប្រជាប្រិយជាតិ។ ការទូទាត់ពេលវេលាលម្អិត។ ការសាងសង់ការរៀបចំ។'
    }
  },
  '1.8': {
    subsection: 'ការងារប្រឆាំងនឹងពេលវេលា',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'ម៉ោងលើសពីលក្ខណៈ។ ពេលលើសមាន។ គ្មាននៃថ្ងៃ។ ផែនការមិនច្បាស់។',
      advice: 'ទៀងទាត់ម៉ោងក្រោមលក្ខណៈ។ ពេលលើសដោយឆ្នោត។ ថ្ងៃឈប់របៀប។ ផែនការមានលម្អិត។',
      reminder: '⏰ ម៉ោងលើសនឹងធ្វើឱ្យបង្ខូចផលិតកម្ម។ លក្ខណៈម៉ោងការងារការពារ។'
    }
  },
  '1.9': {
    subsection: 'សុវត្ថិភាពដំណើរការ',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'គ្រោះថ្នាក់សុវត្ថិភាព។ ឧបករណ៍ការពារមិនផ្តល់។ ច្រកចេញស្ងាត់។ គ្មានការបណ្តុះបណ្តាល។',
      advice: 'ស្វែងរក និងលុបបំបាត់គ្រោះថ្នាក់។ ផ្តល់ និងកម្មង្គេលឧបករណ៍។ ថែរក្សាឧបករណ៍។ បណ្តុះបណ្តាលកម្មករ។',
      reminder: '🛡️ សុវត្ថិភាពគឺជាមូលដ្ឋាន។ ការវាយតម្លៃគ្រោះថ្នាក់និងបណ្តុះបណ្តាល។'
    }
  },
  '1.10': {
    subsection: 'ពេលវេលាឈប់និងឈប់សម្រាក',
    category: 'សំណួរលម្អិត',
    advisory: {
      commonProblems: 'ម៉ោងលើសពីលក្ខណៈ។ ការសម្រាកលោត។ ឈប់ឆ្នាំឆ្នោត។ ផែនការមិនច្បាស់។',
      advice: 'ម៉ោងទៀងទាត់ក្រោមលក្ខណៈ។ ពេលលើសដោយឆ្នោត។ ការសម្រាកលក្ខណៈ។ អនុញ្ញាតឈប់។',
      reminder: '⏰ លក្ខណៈពេលវេលាការងារ។ ការងារសុខភាព។ ការងារផលិតកម្ម។'
    }
  }
};

// Complete Chinese translations for all subsections 1.1-1.10
const chineseTranslations = {
  '1.1': {
    subsection: '主要优势和流程完整性',
    category: '事实收集问题',
    advisory: {
      commonProblems: '管理部门可能无法认识到改进。评估员的访问可能受到限制。流程完整性未得到维护。',
      advice: '记录所有改进和成就。为评估员提供充分的无限制访问权限。坦诚报告所有发现。',
      reminder: '📊 评估完整性很重要。透明度和诚实报告使真正的改进成为可能。'
    }
  },
  '1.2': {
    subsection: '工人与工会代表协商',
    category: '事实收集问题',
    advisory: {
      commonProblems: '未与工人和工会代表协商评估或补救计划。工人参与度低。',
      advice: '在评估前后与工人代表进行正式协商。让工会参与计划。寻求真实的工人反馈。',
      reminder: '🤝 国际劳工组织第144号公约要求三方协商。工人声音加强决策。'
    }
  },
  '1.3': {
    subsection: '童工防止与年龄验证',
    category: '事实收集问题',
    advisory: {
      commonProblems: '用假身份证件雇佣未成年人。年龄验证不彻底或不存在。招聘记录不完整。',
      advice: '在招聘时用官方政府颁发的身份证验证年龄。记录验证。彻底检查参考资料。',
      reminder: '⚠️ 童工预防从招聘开始。年龄验证必须彻底且有记录。'
    }
  },
  '1.4': {
    subsection: '强迫劳动与人身自由',
    category: '事实收集问题',
    advisory: {
      commonProblems: '工人被强迫劳动。个人证件被没收。人身自由受到限制。债务奴役存在。',
      advice: '确保所有就业都是自愿的。从不没收个人证件。始终允许自由行动。',
      reminder: '⚠️ 工人自由是根本。从不持有证件或限制活动。'
    }
  },
  '1.5': {
    subsection: '招聘与就业承诺',
    category: '事实收集问题',
    advisory: {
      commonProblems: '招聘广告具有欺骗性。向工人收取招聘费用。实际工作与承诺不符。',
      advice: '仅使用持证招聘机构。招聘广告必须真实详细。不向工人收取招聘费用。',
      reminder: '⚠️ 诚实招聘从真实职位描述开始。所有承诺必须与现实相符。'
    }
  },
  '1.6': {
    subsection: '工会权利与工人组织',
    category: '事实收集问题',
    advisory: {
      commonProblems: '组织权被压制或惩罚。工人因工会化遭报复。管理层控制工会。',
      advice: '保护工人组织权。严格禁止报复。允许独立工会。诚意谈判。',
      reminder: '⚠️ 工会权是根本权利。工人必须自由组织，无需恐惧。'
    }
  },
  '1.7': {
    subsection: '工资与福利',
    category: '事实收集问题',
    advisory: {
      commonProblems: '工资低于最低标准。付款延迟或不完整。过度扣除。福利不清楚。',
      advice: '按时每次发薪日支付100%法定最低工资。工资计算透明。记录所有扣除。',
      reminder: '💰 工资问题很普遍。按时透明的全额支付建立工人信任。'
    }
  },
  '1.8': {
    subsection: '工作时间与超时',
    category: '事实收集问题',
    advisory: {
      commonProblems: '工作时间超过法律限制。超时是强制性的。无休息日。计划不可预测。',
      advice: '将常规时间限制在法律最大值（每周48小时）。使超时自愿。保证休息日。提前计划。',
      reminder: '⏰ 过长工时影响生产力。法定工时限制保护工人和企业效率。'
    }
  },
  '1.9': {
    subsection: '工作场所安全与卫生',
    category: '事实收集问题',
    advisory: {
      commonProblems: '存在安全隐患。未提供防护装备。应急出口被堵。无安全培训。',
      advice: '识别并消除隐患。提供并执行使用防护装备。保持设备护卫。培训所有工人安全。',
      reminder: '🛡️ 安全是基础。定期隐患评估和培训防止伤害。'
    }
  },
  '1.10': {
    subsection: '休息与年假权利',
    category: '事实收集问题',
    advisory: {
      commonProblems: '工作时间超过法律限制。跳过休息。拒绝年假。工作计划不可预测。',
      advice: '常规时间≤每周48小时最大值。有限制的自愿超时。强制休息。允许所有应得假期。',
      reminder: '⏰ 工作时间限制支持工人健康和生产力。休息至关重要。'
    }
  }
};

async function updateAllTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    let khmerUpdated = 0;
    let chineseUpdated = 0;

    // Get all items
    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    for (const item of items) {
      const subsectionKey = item.subsectionNumber;

      // Update Khmer translations
      if (khmerTranslations[subsectionKey]) {
        if (!item.translations) {
          item.translations = { km: {}, zh: {} };
        }
        if (!item.translations.km) {
          item.translations.km = {};
        }

        const khmerData = khmerTranslations[subsectionKey];
        item.translations.km.subsection = khmerData.subsection;
        item.translations.km.category = khmerData.category;
        item.translations.km.commonProblems = khmerData.advisory.commonProblems;
        item.translations.km.advice = khmerData.advisory.advice;
        item.translations.km.reminder = khmerData.advisory.reminder;
        khmerUpdated++;
      }

      // Update Chinese translations
      if (chineseTranslations[subsectionKey]) {
        if (!item.translations) {
          item.translations = { km: {}, zh: {} };
        }
        if (!item.translations.zh) {
          item.translations.zh = {};
        }

        const chineseData = chineseTranslations[subsectionKey];
        item.translations.zh.subsection = chineseData.subsection;
        item.translations.zh.category = chineseData.category;
        item.translations.zh.commonProblems = chineseData.advisory.commonProblems;
        item.translations.zh.advice = chineseData.advisory.advice;
        item.translations.zh.reminder = chineseData.advisory.reminder;
        chineseUpdated++;
      }

      await item.save();
    }

    console.log(`✅ Updated ${khmerUpdated} items with Khmer translations`);
    console.log(`✅ Updated ${chineseUpdated} items with Chinese translations`);
    console.log(`✅ All translations for subsections 1.1-1.10 are now complete`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

updateAllTranslations();
