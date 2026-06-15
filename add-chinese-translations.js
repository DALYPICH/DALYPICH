const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Chinese translations - COMPLETE CHINESE TEXT
const chineseTranslations = {
  '1.1': {
    subsection: '主要优势和流程完整性',
    categories: {
      '1.1.1': {
        category: '事实收集问题',
        questions: {
          '1.1.1.1': {
            question: '工厂是否有任何良好的实践/进展或主要优势？',
            commonProblems: '管理部门可能无法认识到改进。评估员的访问可能受到限制。流程完整性未得到维护。',
            advice: '记录所有改进和成就。为评估员提供充分的无限制访问权限。坦诚报告所有发现。',
            reminder: '评估完整性很重要。透明度和诚实报告使真正的改进成为可能。'
          },
          '1.1.1.2': {
            question: '评估员对企业的访问是否受到不合理的限制？',
            commonProblems: '管理部门可能未授予访问权限。评估员可能无法访问所有区域。',
            advice: '允许评估员自由移动。提供无限制的访问权限。努力在报告中保持透明。',
            reminder: '评估员的访问权限很重要。'
          },
          '1.1.1.3': {
            question: '文件是否及时提供？',
            commonProblems: '文件可能不完整。提供时间不足。',
            advice: '提前提供文件。有条理地准备。',
            reminder: '及时提供文件很重要。'
          }
        }
      }
    }
  }
};

async function addChineseTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    let updated = 0;

    // Process all subsections
    for (const [subNum, subData] of Object.entries(chineseTranslations)) {
      const subItems = await ChecklistItem.find({ subsectionNumber: subNum });
      console.log(`Found ${subItems.length} items in subsection ${subNum}`);

      for (const item of subItems) {
        if (!item.translations) {
          item.translations = { km: {}, zh: {} };
        }
        if (!item.translations.zh) {
          item.translations.zh = {};
        }

        item.translations.zh.subsection = subData.subsection;

        if (subData.categories[item.categoryNumber]) {
          const catData = subData.categories[item.categoryNumber];
          item.translations.zh.category = catData.category;

          if (catData.questions[item.questionNumber]) {
            const qData = catData.questions[item.questionNumber];
            item.translations.zh.question = qData.question;
            item.translations.zh.commonProblems = qData.commonProblems;
            item.translations.zh.advice = qData.advice;
            item.translations.zh.reminder = qData.reminder;
          }
        }

        await item.save();
        updated++;
      }
    }

    console.log(`✅ Updated ${updated} items with Chinese translations`);
    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

addChineseTranslations();
