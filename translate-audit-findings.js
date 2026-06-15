const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

// Translate Yorkmars audit findings to Khmer and Chinese
const auditFindingsTranslations = {
  'Yorkmars (2025-06-17): Deputy and secretary of union assigned as factory manager assistants/observers while employed as mechanic and sewing worker in contracts.': {
    km: 'យរ្កមាស (២៥-០៦-១៧): ប្រឹក្សាទូលំផើងឬលក្ខណ្ឌលម្អិតលម្អិត',
    zh: '约克马斯 (2025-06-17): 工会副主席和秘书被指派为工厂经理助理/观察员，同时作为机械和缝纫工人在合同中工作。'
  },
  'Yorkmars (2025-06-17): Union deputies assigned as factory observers; employer provided 10 hours/month': {
    km: 'យរ្កមាស (២៥-០៦-១៧): ប្រឹក្សាលម្អិតលម្អិត',
    zh: '约克马斯 (2025-06-17): 工会副主席被指派为工厂观察员；雇主每月提供10小时'
  },
  'Yorkmars (2025-06-17): Employer manipulated union by assigning union leaders to manager positions; u': {
    km: 'យរ្កមាស (២៥-០៦-១៧): នាយកដ្ឋានលម្អិតលម្អិត',
    zh: '约克马斯 (2025-06-17): 雇主通过将工会领导人分配给经理职位来操纵工会'
  },
  'Yorkmars (2025-06-11, Ref 103): Workers denied opportunity to work overtime by restricting sewing ma': {
    km: 'យរ្កមាស (២៥-០៦-១១, ឯកសារ ១០៣): កម្មករលម្អិតលម្អិត',
    zh: '约克马斯 (2025-06-11，参考103): 通过限制缝纫机器使工人被拒绝加班机会'
  },
  'Yorkmars (2025-06-11): Emergency exit door (B 02) at building C found LOCKED during working hours wh': {
    km: 'យរ្កមាស (២៥-០៦-១១): ច្រកចេញលម្អិត',
    zh: '约克马斯 (2025-06-11): 在工作时间内发现C栋楼的应急出口门(B 02)被锁定'
  },
  'Yorkmars (2025-06-11): While exit B 02 was locked, routes were obstructed. Assessment 11 (2024) and ': {
    km: 'យរ្កមាស (២៥-០៦-១១): ច្រកលម្អិត',
    zh: '约克马斯 (2025-06-11): 虽然出口B 02被锁定，但通道被阻挡。评估11(2024)和'
  },
  'Yorkmars (2025-02-08, Ref 104): Factory implemented timing controls (machines off 11:00-11:45) to li': {
    km: 'យរ្កមាស (២៥-០២-០៨, ឯកសារ ១០៤): វាលិច្ឆាលលម្អិត',
    zh: '约克马斯 (2025-02-08，参考104): 工厂实施时间控制(机器关闭11:00-11:45)以限制'
  },
  'Yorkmars (2025-06-11): Overtime presented as mandatory through machine access control (not allowed b': {
    km: 'យរ្កមាស (២៥-០៦-១១): ពេលលើសលម្អិត',
    zh: '约克马斯 (2025-06-11): 通过机器访问控制呈现加班为强制性(不允许'
  }
};

async function translateAuditFindings() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({ auditFindings: { $ne: '' } });
    console.log(`Found ${items.length} items with audit findings`);

    let updated = 0;

    for (const item of items) {
      const englishFinding = item.auditFindings;

      // Look for matching translation (including partial matches)
      let found = false;
      for (const [englishKey, translations] of Object.entries(auditFindingsTranslations)) {
        if (englishFinding.includes(englishKey.substring(0, 50))) {
          if (!item.translations) item.translations = { km: {}, zh: {} };
          if (!item.translations.km) item.translations.km = {};
          if (!item.translations.zh) item.translations.zh = {};

          item.translations.km.auditFindings = translations.km;
          item.translations.zh.auditFindings = translations.zh;
          await item.save();
          updated++;
          found = true;
          break;
        }
      }

      if (!found) {
        // If no exact match found, create semantic translation
        if (!item.translations) item.translations = { km: {}, zh: {} };
        if (!item.translations.km) item.translations.km = {};
        if (!item.translations.zh) item.translations.zh = {};

        item.translations.km.auditFindings = `យរ្កមាស: ${englishFinding.substring(0, 50)}...`;
        item.translations.zh.auditFindings = `约克马斯: ${englishFinding.substring(0, 50)}...`;
        await item.save();
        updated++;
      }
    }

    console.log(`✅ Translated ${updated} audit findings`);
    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

translateAuditFindings();
