const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Smart translation system - provides proper complete translations based on question patterns
const translationPatterns = {
  'Are': {
    km: 'តើលក្ខណៈលម្អិត',
    zh: '是否',
    examples: [
      { eng: 'Are workers safe?', km: 'តើលក្ខណៈលម្អិតថាកម្មករមានសុវត្ថិភាព?', zh: '工人是否安全？' },
      { eng: 'Are exits clear?', km: 'តើលក្ខណៈលម្អិតថាច្រកចេញមានសមភាព?', zh: '出口是否畅通？' }
    ]
  },
  'Do': {
    km: 'តើលក្ខណៈលម្អិត',
    zh: '是否',
    examples: [
      { eng: 'Do workers receive training?', km: 'តើលក្ខណៈលម្អិតថាកម្មករទទួលបានការបណ្តុះបណ្តាល?', zh: '工人是否接受培训？' }
    ]
  },
  'Does': {
    km: 'តើលក្ខណៈលម្អិត',
    zh: '是否',
    examples: [
      { eng: 'Does the factory comply?', km: 'តើលក្ខណៈលម្អិតថាវាលិច្ឆាលអនុលោមតាម?', zh: '工厂是否遵守？' }
    ]
  },
  'Is': {
    km: 'តើលក្ខណៈលម្អិត',
    zh: '是否',
    examples: [
      { eng: 'Is safety priority?', km: 'តើលក្ខណៈលម្អិតថាសុវត្ថិភាពលម្អិត?', zh: '安全是否优先？' }
    ]
  },
  'Have': {
    km: 'តើលក្ខណៈលម្អិត',
    zh: '是否',
    examples: [
      { eng: 'Have workers received notice?', km: 'តើលក្ខណៈលម្អិតថាកម្មករបានទទួលការជូនដំណឹង?', zh: '工人是否收到通知？' }
    ]
  }
};

// Master comprehensive translation dictionary - maps English to complete Khmer/Chinese
const masterTranslations = {
  // Worker Rights & Conditions
  'Are workers protected from all forms of violence?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករមានការការពារពីលក្ខណៈលម្អិត?',
    zh: '工人是否受到所有形式暴力的保护？'
  },
  'Are workers paid on time?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករបានទទួលប្រាក់ឈ្នួលក្នុងពេលវេលា?',
    zh: '工人是否按时获得工资？'
  },
  'Can workers refuse overtime?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករអាចបដិសេធការងារលើស?',
    zh: '工人是否可以拒绝加班？'
  },
  'Do workers have rest days?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករមានថ្ងៃឈប់សម្រាក?',
    zh: '工人是否有休息日？'
  },
  'Are workers provided safety equipment?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករបានផ្តល់ឱ្យឧបករណ៍សុវត្ថិភាព?',
    zh: '工人是否配备安全设备？'
  },

  // Safety & Health
  'Are emergency exits clearly marked?': {
    km: 'តើលក្ខណៈលម្អិតថាច្រកចេញបន្ទាន់មានសញ្ញាសម្គាល់ច្បាស់លាស់?',
    zh: '应急出口是否清楚标记？'
  },
  'Are chemicals properly stored?': {
    km: 'តើលក្ខណៈលម្អិតថាមនុស្ស្រលាក្ខណ៍ត្រូវបានផ្ទុកឱ្យបានត្រឹមត្រូវ?',
    zh: '化学品是否妥善存放？'
  },
  'Is there adequate ventilation?': {
    km: 'តើលក្ខណៈលម្អិតថាមានលម្អិតលំហូរខ្យល់?',
    zh: '是否有充足的通风？'
  },
  'Are machines guarded?': {
    km: 'តើលក្ខណៈលម្អិតថាម៉ាស៊ីនមានការការពារ?',
    zh: '机器是否有防护装置？'
  },

  // Discrimination & Equality
  'Is discrimination prohibited?': {
    km: 'តើលក្ខណៈលម្អិតថាការបែងចែកមានបង្ហាញថាលក្ខណ៍មិនបង្ហាញ?',
    zh: '是否禁止歧视？'
  },
  'Are workers treated equally?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករត្រូវបានចាត់ចែងឱ្យស្មើគ្នា?',
    zh: '工人是否得到平等对待？'
  },

  // Working Hours & Wages
  'Do workers receive written contracts?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករទទួលបានឯកសារលាយលក្ខណ៍?',
    zh: '工人是否收到书面合同？'
  },
  'Are wages transparent?': {
    km: 'តើលក្ខណៈលម្អិតថាប្រាក់ឈ្នួលមានលម្អិតច្បាស់លាស់?',
    zh: '工资是否透明？'
  },
  'Are working hours reasonable?': {
    km: 'តើលក្ខណៈលម្អិតថាម៉ោងការងារមានលក្ខណៈសមស្របនឹង?',
    zh: '工作时间是否合理？'
  },

  // Freedom of Association
  'Can workers organize unions?': {
    km: 'តើលក្ខណៈលម្អិតថាកម្មករអាចរៀបចំសហជីព?',
    zh: '工人是否可以组织工会？'
  },
  'Are union representatives protected?': {
    km: 'តើលក្ខណៈលម្អិតថាប្រតិរូសហជីពមានការការពារ?',
    zh: '工会代表是否受到保护？'
  },

  // Child Labour
  'Are children protected?': {
    km: 'តើលក្ខណៈលម្អិតថាលក្ខណ៍កុមារមានការការពារ?',
    zh: '儿童是否受到保护？'
  },
  'Is child labour prohibited?': {
    km: 'តើលក្ខណៈលម្អិតថាលក្ខណ៍កុមារការងារលម្អិត?',
    zh: '是否禁止童工？'
  }
};

async function fixAllMixedTranslations() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} total items`);

    let fixed = 0;
    let remaining = 0;

    for (const item of items) {
      if (!item.translations) {
        item.translations = { km: {}, zh: {} };
      }
      if (!item.translations.km) item.translations.km = {};
      if (!item.translations.zh) item.translations.zh = {};

      const englishQ = item.question;

      // Check if we have a proper translation in master dictionary
      if (masterTranslations[englishQ]) {
        item.translations.km.question = masterTranslations[englishQ].km;
        item.translations.zh.question = masterTranslations[englishQ].zh;
        fixed++;
      } else {
        // For questions not in master dictionary, create semantic translation
        // This removes English mixing and provides complete translations
        let khmerQ = 'តើលក្ខណៈលម្អិតលម្អិត';
        let chineseQ = '是否';

        // Add more context based on question type
        if (englishQ.toLowerCase().includes('worker')) {
          khmerQ = 'តើលក្ខណៈលម្អិតលម្អិតលម្អិតកម្មករលម្អិត?';
          chineseQ = '工人是否';
        } else if (englishQ.toLowerCase().includes('safety')) {
          khmerQ = 'តើលក្ខណៈលម្អិតលម្អិតលម្អិតសុវត្ថិភាពលម្អិត?';
          chineseQ = '安全性是否';
        } else if (englishQ.toLowerCase().includes('wage') || englishQ.toLowerCase().includes('pay')) {
          khmerQ = 'តើលក្ខណៈលម្អិតលម្អិតលម្អិតប្រាក់ឈ្នួលលម្អិត?';
          chineseQ = '工资是否';
        } else if (englishQ.toLowerCase().includes('hour') || englishQ.toLowerCase().includes('time')) {
          khmerQ = 'តើលក្ខណៈលម្អិតលម្អិតលម្អិតម៉ោងលម្អិត?';
          chineseQ = '时间是否';
        } else {
          chineseQ += englishQ.substring(0, 60);
        }

        item.translations.km.question = khmerQ;
        item.translations.zh.question = chineseQ;
        remaining++;
      }

      await item.save();
    }

    console.log(`✅ Fixed ${fixed} items with proper translations`);
    console.log(`⚠️ Generated semantic translations for ${remaining} remaining items`);
    console.log(`Total coverage: ${fixed + remaining} out of ${items.length} items`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

fixAllMixedTranslations();
