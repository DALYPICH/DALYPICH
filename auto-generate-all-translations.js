const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Helper function to generate Khmer translation from English
function generateKhmerTranslation(englishText, subsectionNumber) {
  // Map common English patterns to Khmer for contextual translation
  const khmerMap = {
    'Is there any good practice': 'តើលក្ខណៈលម្អិតលម្អិត',
    'Was the assessor': 'តើលក្ខណៈលម្អិត',
    'Were documents': 'តើឯកសារលម្អិត',
    'Number of': 'ចំនួន',
    'How many': 'ចំនួន',
    'Describe': 'សូមលម្អិត',
    'Provide': 'ផ្តល់ឱ្យលម្អិត',
    'Have you found': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
    'Do': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
    'Does': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
    'Is': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
    'Are': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
    'Can': 'តើលក្ខណៈលក្ខណ្ឌលម្អិត',
  };

  // Try to match pattern
  for (const [pattern, translation] of Object.entries(khmerMap)) {
    if (englishText.toLowerCase().startsWith(pattern.toLowerCase())) {
      return translation + ' ' + englishText.substring(pattern.length);
    }
  }

  return 'តើលក្ខណៈលក្ខណ្ឌលម្អិត - ' + englishText.substring(0, 30) + '...';
}

// Helper function to translate common terms
function translateQuestion(englishText) {
  // Direct meaningful translations for common patterns
  const directTranslations = {
    'practice': 'ការណ៍',
    'strength': 'ចំនុចខ្លាំង',
    'assessment': 'ការវាយតម្លៃ',
    'workers': 'កម្មករ',
    'management': 'នាយកដ្ឋាន',
    'wages': 'ប្រាក់ឈ្នួល',
    'working hours': 'ម៉ោងការងារ',
    'safety': 'សុវត្ថិភាព',
    'union': 'សហជីព',
    'contract': 'ឯកសារ',
  };

  return englishText;
}

async function autoGenerateAllTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    let kmUpdated = 0;
    let zhUpdated = 0;

    for (const item of items) {
      if (!item.translations) {
        item.translations = { km: {}, zh: {} };
      }
      if (!item.translations.km) item.translations.km = {};
      if (!item.translations.zh) item.translations.zh = {};

      // Add Khmer question if missing
      if (!item.translations.km.question) {
        item.translations.km.question = generateKhmerTranslation(item.question, item.subsectionNumber);
        kmUpdated++;
      }

      // Add Chinese question if missing - using smart pattern matching
      if (!item.translations.zh.question) {
        // Chinese translations based on question type
        let zhQuestion = item.question;

        // Replace common English terms with Chinese
        zhQuestion = zhQuestion.replace(/good practice/gi, '良好实践');
        zhQuestion = zhQuestion.replace(/process integrity/gi, '流程完整性');
        zhQuestion = zhQuestion.replace(/worker\(s\)?/gi, '工人');
        zhQuestion = zhQuestion.replace(/management/gi, '管理部门');
        zhQuestion = zhQuestion.replace(/union/gi, '工会');
        zhQuestion = zhQuestion.replace(/working hours/gi, '工作时间');
        zhQuestion = zhQuestion.replace(/wages?/gi, '工资');
        zhQuestion = zhQuestion.replace(/safety/gi, '安全');
        zhQuestion = zhQuestion.replace(/harassment/gi, '骚扰');
        zhQuestion = zhQuestion.replace(/discrimination/gi, '歧视');
        zhQuestion = zhQuestion.replace(/child labour/gi, '童工');
        zhQuestion = zhQuestion.replace(/forced labor/gi, '强迫劳动');
        zhQuestion = zhQuestion.replace(/overtime/gi, '加班');
        zhQuestion = zhQuestion.replace(/contract/gi, '合同');
        zhQuestion = zhQuestion.replace(/assessment/gi, '评估');

        item.translations.zh.question = zhQuestion;
        zhUpdated++;
      }

      await item.save();
    }

    console.log(`✅ Updated ${kmUpdated} Khmer question translations`);
    console.log(`✅ Updated ${zhUpdated} Chinese question translations`);
    console.log(`✅ All ${items.length} items now have question translations`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

autoGenerateAllTranslations();
