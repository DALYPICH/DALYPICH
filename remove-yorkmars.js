const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

async function removeYorkmars() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    // Find all items with Yorkmars audit findings
    const items = await ChecklistItem.find({ auditFindings: { $regex: 'Yorkmars' } });
    console.log(`Found ${items.length} items with Yorkmars audit findings`);

    let updated = 0;

    for (const item of items) {
      // Remove Yorkmars audit findings (set to empty string)
      item.auditFindings = '';

      // Also remove from translations if they exist
      if (item.translations) {
        if (item.translations.km && item.translations.km.auditFindings) {
          item.translations.km.auditFindings = '';
        }
        if (item.translations.zh && item.translations.zh.auditFindings) {
          item.translations.zh.auditFindings = '';
        }
      }

      await item.save();
      updated++;
    }

    console.log(`✅ Removed Yorkmars from ${updated} items`);
    console.log(`All Yorkmars audit findings have been cleared`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

removeYorkmars();
