const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Comprehensive translation mappings for UI and common terms
const khmerMap = {
  // Headers and Navigation
  'Welcome to Digital Audit': 'ស្វាគមន៍មកលេងឌីជីថល អូឌីត',
  'Home': 'ទំព័រដើម',
  'About': 'អំពី',
  'Contact': 'ទាក់ទង',
  
  // Buttons and Labels
  'Add Reference': 'បន្ថែមឯកសារយោង',
  'Save and Upload': 'រក្សាទុក និងផ្ទុក',
  'Evidence & Documentation': 'ភស្តុតាង និងឯកសារ',
  'Common Problems': 'បញ្ហាទូទៅ',
  'Advice': 'ដំបូន្មាន',
  'Reminder': 'ការរំលឹក',
  'No evidence uploaded yet': 'មិនមានឯកសារដែលបានផ្ទុកឡើងនៅឡើយទេ',
  'PENDING': 'រង់ចាំ',
  
  // Section names - more complete
  'Key Strengths and Process Integrity': 'ចំណាប់ដឹងលម្អិត និងលក្ខណៈលម្អិត',
  'Learning': 'ការរៀន និងការអភិវឌ្ឍន៍',
  'Child Labour': 'ការហាមឃាត់ការងារកុមារ',
  'Discrimination': 'ការប្រឆាំងនឹងការរើសអើង',
  'Forced Labour': 'ការប្រឆាំងនឹងការលង្កង់កម្មករ',
  'Freedom of Association and Collective Bargaining': 'សេរីភាពក្នុងការផ្សារភ្ជាប់',
  'Compensation': 'ការទូទាត់សម្បូរ',
  'Contracts and Human Resources': 'កិច្ចព្រមព្រៀង និងធនធានមនុស្ស',
  'Occupational Safety and Health': 'សុវត្ថិភាព បច្ចេកទេស និងសុខភាព',
  'Working Time': 'ពេលវេលាការងារ',
};

const chineseMap = {
  // Headers and Navigation
  'Welcome to Digital Audit': '欢迎来到数字审计',
  'Home': '主页',
  'About': '关于',
  'Contact': '联系',
  
  // Buttons and Labels
  'Add Reference': '添加参考',
  'Save and Upload': '保存并上传',
  'Evidence & Documentation': '证据和文件',
  'Common Problems': '常见问题',
  'Advice': '建议',
  'Reminder': '提醒',
  'No evidence uploaded yet': '尚未上传任何证据',
  'PENDING': '待处理',
  
  // Section names
  'Key Strengths and Process Integrity': '关键优势和过程完整性',
  'Learning': '学习和发展',
  'Child Labour': '禁止童工',
  'Discrimination': '反对歧视',
  'Forced Labour': '禁止强迫劳动',
  'Freedom of Association and Collective Bargaining': '结社自由和集体谈判',
  'Compensation': '薪酬和福利',
  'Contracts and Human Resources': '合同和人力资源',
  'Occupational Safety and Health': '职业安全和健康',
  'Working Time': '工作时间',
};

async function populateTranslations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const items = await ChecklistItem.find({}).lean();
    console.log(`Processing ${items.length} items...\n`);

    let updateCount = 0;

    for (const item of items) {
      // Build Khmer translations
      const kmTranslations = {
        section: khmerMap[item.section] || item.section || '',
        subsection: khmerMap[item.subsection] || item.subsection || '',
        category: khmerMap[item.category] || item.category || '',
        question: item.question || '',
        commonProblems: item.commonProblems || '',
        advice: item.advice || '',
        reminder: item.reminder || '',
        legalReference: item.legalReference || '',
        compliancePoint: item.compliancePoint || '',
      };

      // Build Chinese translations
      const zhTranslations = {
        section: chineseMap[item.section] || item.section || '',
        subsection: chineseMap[item.subsection] || item.subsection || '',
        category: chineseMap[item.category] || item.category || '',
        question: item.question || '',
        commonProblems: item.commonProblems || '',
        advice: item.advice || '',
        reminder: item.reminder || '',
        legalReference: item.legalReference || '',
        compliancePoint: item.compliancePoint || '',
      };

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
        console.log(`✅ Updated ${updateCount} items...`);
      }
    }

    console.log(`\n✅ Successfully populated translations for ${updateCount}/259 questions`);
    console.log('\n📊 Translation Status:');
    console.log('  ✅ Khmer (KM) - Structure populated (section/subsection/category headers)');
    console.log('  ✅ Chinese (ZH) - Structure populated (section/subsection/category headers)');
    console.log('\n📝 Note: For complete professional translations of all content (questions, advice, reminders),');
    console.log('   consider using Google Translate API or hiring professional translators.');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

populateTranslations();
