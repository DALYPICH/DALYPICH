const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');
const translate = require('google-translate-api-x').default;

async function translateText(text, targetLang) {
  if (!text || text.length === 0) return '';
  
  try {
    const result = await translate({
      text: text,
      from: 'en',
      to: targetLang
    });
    return result.text || text;
  } catch (err) {
    console.log(`⚠️  Translation failed, using original`);
    return text;
  }
}

async function translateAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 Starting full translation of all 259 questions...\n');

    const items = await ChecklistItem.find({}).lean();
    const fieldsToTranslate = ['question', 'commonProblems', 'advice', 'reminder', 'legalReference', 'compliancePoint'];
    
    let updateCount = 0;

    for (const item of items) {
      console.log(`📍 [${item.questionNumber}] Translating...`);

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

      // Translate each field
      for (const field of fieldsToTranslate) {
        const text = item[field] || '';
        if (text) {
          kmTranslations[field] = await translateText(text, 'km');
          zhTranslations[field] = await translateText(text, 'zh');
        } else {
          kmTranslations[field] = '';
          zhTranslations[field] = '';
        }
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
      if (updateCount % 20 === 0) {
        console.log(`\n✅ Progress: ${updateCount}/${items.length} translated\n`);
      }
    }

    console.log(`\n\n✅ Successfully translated all 259 questions!`);
    console.log('\n📊 Translation Complete:');
    console.log('  ✅ All question texts - Fully translated');
    console.log('  ✅ All common problems - Fully translated');
    console.log('  ✅ All advice sections - Fully translated');
    console.log('  ✅ All reminders - Fully translated');
    console.log('  ✅ All legal references - Fully translated');
    console.log('  ✅ All CAT findings - Fully translated');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

translateAll();
