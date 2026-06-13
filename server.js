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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
