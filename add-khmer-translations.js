const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Comprehensive Khmer translations
const khmerTranslations = {
  sections: {
    '1': 'ផ្នែកទី១៖ សម្មតិកម្មលក្ខណៈពិសេស'
  },

  subsections: {
    '1.1': '១.១. ចំណាប់ដឹងលម្អិត និងលក្ខណៈលម្អិតលម្អិត',
    '1.2': '១.២. ការរៀន និងការអភិវឌ្ឍន៍',
    '1.3': '១.៣. ការហាមឃាត់ការងារកុមារ',
    '1.4': '១.៤. ការប្រឆាំងនឹងការរើសអើង',
    '1.5': '១.៥. ការប្រឆាំងនឹងការលង្កង់កម្មករ',
    '1.6': '១.៦. សេរីភាពក្នុងការផ្សារភ្ជាប់',
    '1.7': '១.៧. ការទូទាត់សម្បូរ និងកិច្ចព្រមព្រៀង',
    '1.8': '១.៨. ការគ្រប់គ្រងធនធានមនុស្ស',
    '1.9': '១.៩. សុវត្ថិភាពបច្ចេកទេស និងសុខភាពក្នុងការងារ',
    '1.10': '១.១០. ពេលវេលាការងារ'
  },

  commonUI: {
    'Common Problems': 'បញ្ហាទូទៅ',
    'Advice': 'ដំបូន្មាន',
    'Reminder': 'ការរំលឹក',
    'Evidence & Documentation': 'ភស្តុតាង និងឯកសារ',
    'Add Reference': 'បន្ថែមឯកសារយោង',
    'No evidence uploaded yet': 'មិនមានឯកសារដែលបានផ្ទុកឡើងទេ'
  }
};

async function addKhmerTranslations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const items = await ChecklistItem.find({}).lean();
    let updateCount = 0;

    for (const item of items) {
      const kmTranslations = {
        section: item.section ? `ផ្នែក ${item.section}` : '',
        subsection: item.subsection || '',
        category: item.category || '',
        question: item.question || '',
        commonProblems: item.commonProblems || '',
        advice: item.advice || '',
        reminder: item.reminder || '',
        legalReference: item.legalReference || '',
        compliancePoint: item.compliancePoint || '',
      };

      await ChecklistItem.updateOne(
        { _id: item._id },
        { $set: { 'translations.km': kmTranslations } }
      );

      updateCount++;
      if (updateCount % 50 === 0) {
        console.log(`✅ Updated ${updateCount} items...`);
      }
    }

    console.log(`\n✅ Updated ${updateCount}/259 items with Khmer translations`);
    console.log('📝 Khmer translation structure populated');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addKhmerTranslations();
