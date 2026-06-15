const mongoose = require('mongoose');
require('dotenv').config();
const ChecklistItem = require('./models/ChecklistItem');

async function resetAllProgress() {
  try {
    const mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dalypich';
    await mongoose.connect(mongooseUri);
    console.log('✅ Connected to MongoDB');

    const items = await ChecklistItem.find({});
    console.log(`Found ${items.length} items to reset`);

    let updated = 0;

    for (const item of items) {
      item.progress = 0;
      item.completed = 0;
      item.total = 1;
      await item.save();
      updated++;
    }

    console.log(`✅ Reset progress for ${updated} questions`);
    console.log(`✅ All questions now start at 0% - progress will auto-calculate based on evidence`);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

resetAllProgress();
