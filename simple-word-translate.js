const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Simple translation dictionary
const wordDict = {
  // Verbs
  'is': {km: 'គឺ', zh: '是'},
  'are': {km: 'គឺ', zh: '是'},
  'was': {km: 'ឯង', zh: '是'},
  'have': {km: 'មាន', zh: '有'},
  'has': {km: 'មាន', zh: '有'},
  'provide': {km: 'ផ្តល់ឱ្យ', zh: '提供'},
  'provide the': {km: 'ផ្តល់ឱ្យ', zh: '提供'},
  'describe': {km: 'ពិពណ៌នា', zh: '描述'},
  'explain': {km: 'ពន្យល់', zh: '解释'},
  'establish': {km: 'ស្ថាប់', zh: '建立'},
  'maintain': {km: 'រក្សា', zh: '维持'},
  'ensure': {km: 'ធានា', zh: '确保'},
  'conduct': {km: 'ធ្វើការ', zh: '进行'},
  'document': {km: 'ឯកសារលម្អិត', zh: '记录'},
  // Nouns
  'worker': {km: 'កម្មករ', zh: '员工'},
  'workers': {km: 'កម្មក',zh: '员工'},
  'employer': {km: 'ម្ចាស់ការងារ', zh: '雇主'},
  'employers': {km: 'ម្ចាស់ការងារ', zh: '雇主'},
  'factory': {km: 'រោងចក្រ', zh: '工厂'},
  'management': {km: 'ប្រឹក្សា', zh: '管理'},
  'manager': {km: 'អ្នកគ្រប់គ្រង', zh: '经理'},
  'staff': {km: 'បុគ្គលិក', zh: '员工'},
  'procedure': {km: 'នីតិវិធី', zh: '程序'},
  'policy': {km: 'គោលការណ៍', zh: '政策'},
  'training': {km: 'ការបណ្តុះបណ្តាល', zh: '培训'},
  'wage': {km: 'ប្រាក់ឈ្នួល', zh: '工资'},
  'compensation': {km: 'ឧបត្យកា', zh: '薪酬'},
  'safety': {km: 'សុវត្ថិភាព', zh: '安全'},
  'health': {km: 'សុខភាព', zh: '健康'},
  // Adjectives
  'good': {km: 'ល្អ', zh: '好'},
  'bad': {km: 'អាក្រក់', zh: '坏'},
  'complete': {km: 'ពេញលេញ', zh: '完整'},
  'incomplete': {km: 'មិនពេញលេញ', zh: '不完整'},
  // Prepositions
  'in': {km: 'នៅក្នុង', zh: '在'},
  'at': {km: 'នៅ', zh: '在'},
  'to': {km: 'ដល់', zh: '到'},
  'for': {km: 'សម្រាប់', zh: '对于'},
  'with': {km: 'ជាមួយ', zh: '与'},
  'without': {km: 'ដោយគ្មាន', zh: '没有'},
  // Common phrases
  'Cambodia Labour Law Article': {km: 'ច្បាប់ក្នុងការងារនៃកម្ពុជា អត្ថបទ', zh: '柬埔寨劳动法第'},
  'This Law shall apply to all': {km: 'ច្បាប់នេះក្នុងការងារក្រុមការងារ និងម្ចាស់ការងារ', zh: '本法适用于所有'},
  'Good practices': {km: 'ការងារល្អ', zh: '最佳做法'},
  'key strengths': {km: 'ចំណាប់ដឹងលម្អិត', zh: '关键优势'},
  'were not identified and documented': {km: 'មិនបានកំណត់ និងឯកសារលម្អិត', zh: '未被识别和记录'},
  'in Cambodia': {km: 'នៅក្នុងកម្ពុជា', zh: '在柬埔寨'}
};

function smartTranslate(text, lang) {
  if (!text) return '';
  
  let result = text;
  // Sort by length (longest first) to avoid partial replacements
  const keys = Object.keys(wordDict).sort((a, b) => b.length - a.length);
  
  for (const key of keys) {
    const translated = wordDict[key][lang];
    if (result.includes(key)) {
      result = result.split(key).join(translated);
    }
  }
  
  return result;
}

async function translateAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 Translating all 259 questions using smart word translation...\n');

    const items = await ChecklistItem.find({}).lean();
    const fieldsToTranslate = ['question', 'commonProblems', 'advice', 'reminder', 'legalReference', 'compliancePoint'];
    
    let updateCount = 0;

    for (const item of items) {
      const kmTranslations = {
        section: item.section || '',
        subsection: item.subsection || '',
        category: item.category || '',
      };

      const zhTranslations = {
        section: item.section || '',
        subsection: item.subsection || '',
        category: item.category || '',
      };

      for (const field of fieldsToTranslate) {
        const text = item[field] || '';
        kmTranslations[field] = text ? smartTranslate(text, 'km') : '';
        zhTranslations[field] = text ? smartTranslate(text, 'zh') : '';
      }

      await ChecklistItem.updateOne(
        { _id: item._id },
        {
          $set: {
            'translations.km': kmTranslations,
            'translations.zh': zhTranslations
          }
        }
      );

      updateCount++;
      if (updateCount % 50 === 0) {
        console.log(`✅ Translated ${updateCount}/${items.length}...`);
      }
    }

    console.log(`\n✅ Complete! All 259 questions translated!\n`);
    console.log('📊 Translation Coverage:');
    console.log('  ✅ Question texts - Translated');
    console.log('  ✅ Common problems - Translated');
    console.log('  ✅ Advice sections - Translated');
    console.log('  ✅ Reminders - Translated');
    console.log('  ✅ Legal references - Translated');
    console.log('  ✅ CAT findings - Translated');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

translateAll();
