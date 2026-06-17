const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('.'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.log('Connection error:', err));

const checklistRoutes = require('./routes/checklist');
app.use('/api/checklist', checklistRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', database: 'MongoDB Connected' });
});

// Fetch reference document
app.get('/api/reference-document/:itemId/:docIndex', async (req, res) => {
  try {
    const ChecklistItem = require('./models/ChecklistItem');
    const item = await ChecklistItem.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const docIndex = parseInt(req.params.docIndex);
    if (!item.referenceDocuments || !item.referenceDocuments[docIndex]) {
      return res.status(404).json({ error: 'Reference document not found' });
    }

    const doc = item.referenceDocuments[docIndex];
    res.json({
      title: doc.title,
      type: doc.type,
      content: doc.content,
      createdAt: doc.createdAt
    });
  } catch (error) {
    console.error('Error fetching reference document:', error);
    res.status(500).json({ error: 'Failed to fetch reference document' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
