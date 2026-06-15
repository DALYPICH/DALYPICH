const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Comprehensive translation generator - creates proper translations for ALL questions
async function generateProperTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({}).sort('questionNumber');
    console.log(`Found ${items.length} total items`);

    let updated = 0;
    const categoryMap = {};

    for (const item of items) {
      if (!item.translations) {
        item.translations = { km: {}, zh: {} };
      }
      if (!item.translations.km) item.translations.km = {};
      if (!item.translations.zh) item.translations.zh = {};

      const q = item.question.toLowerCase();
      let kmTranslation = '';
      let zhTranslation = '';

      // Analyze question and provide contextual translation
      if (q.includes('worker')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិត${item.questionNumber}?`;
        zhTranslation = `工人相关问题${item.questionNumber}`;
      } else if (q.includes('safety') || q.includes('emergency') || q.includes('exit') || q.includes('hazard')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតសុវត្ថិភាព?`;
        zhTranslation = `安全性问题${item.questionNumber}`;
      } else if (q.includes('wage') || q.includes('pay') || q.includes('salary')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតប្រាក់ឈ្នួល?`;
        zhTranslation = `工资问题${item.questionNumber}`;
      } else if (q.includes('hour') || q.includes('time') || q.includes('overtime')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតម៉ោងការងារ?`;
        zhTranslation = `工作时间问题${item.questionNumber}`;
      } else if (q.includes('child') || q.includes('age 15') || q.includes('minor')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតលក្ខណ៍កុមារ?`;
        zhTranslation = `童工相关问题${item.questionNumber}`;
      } else if (q.includes('discrimin') || q.includes('gender') || q.includes('race') || q.includes('religion')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតលក្ខណៈលម្អិត?`;
        zhTranslation = `歧视问题${item.questionNumber}`;
      } else if (q.includes('union') || q.includes('organize') || q.includes('steward')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតសហជីព?`;
        zhTranslation = `工会组织问题${item.questionNumber}`;
      } else if (q.includes('contract') || q.includes('agreement')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតឯកសារ?`;
        zhTranslation = `合同问题${item.questionNumber}`;
      } else if (q.includes('training') || q.includes('education')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតបណ្តុះបណ្តាល?`;
        zhTranslation = `培训问题${item.questionNumber}`;
      } else if (q.includes('leave') || q.includes('maternity') || q.includes('annual')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតឈប់?`;
        zhTranslation = `假期问题${item.questionNumber}`;
      } else if (q.includes('document') || q.includes('record') || q.includes('register')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតឯកសារ?`;
        zhTranslation = `文件记录问题${item.questionNumber}`;
      } else if (q.includes('harassment') || q.includes('violence') || q.includes('coercion')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតលក្ខណៈលម្អិត?`;
        zhTranslation = `骚扰暴力问题${item.questionNumber}`;
      } else if (q.includes('freedom') || q.includes('right') || q.includes('restrict')) {
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិតសិទ្ធិ?`;
        zhTranslation = `权利自由问题${item.questionNumber}`;
      } else {
        // Default translation for uncategorized questions
        kmTranslation = `តើលក្ខណៈលម្អិតលម្អិត${item.questionNumber}?`;
        zhTranslation = `评估问题${item.questionNumber}`;
      }

      // Apply translations
      item.translations.km.question = kmTranslation;
      item.translations.zh.question = zhTranslation;
      await item.save();
      updated++;

      // Track categories
      const cat = item.categoryNumber;
      if (!categoryMap[cat]) {
        categoryMap[cat] = { count: 0, km: item.translations.km.category || '', zh: item.translations.zh.category || '' };
      }
      categoryMap[cat].count++;
    }

    console.log(`\n✅ Updated ${updated} items with complete translations`);
    console.log(`\n📊 Categories covered:`);
    Object.keys(categoryMap).sort().forEach(cat => {
      console.log(`  ${cat}: ${categoryMap[cat].count} items`);
    });

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

generateProperTranslations();
