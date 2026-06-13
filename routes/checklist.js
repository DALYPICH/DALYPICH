const express = require('express');
const router = express.Router();
const ChecklistItem = require('../models/ChecklistItem');

router.get('/', async (req, res) => {
  const items = await ChecklistItem.find().sort('questionNumber');
  res.json(items);
});

router.get('/section/:sectionNumber', async (req, res) => {
  const items = await ChecklistItem.find({ sectionNumber: req.params.sectionNumber }).sort('questionNumber');
  res.json(items);
});

router.put('/:id', async (req, res) => {
  const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

module.exports = router;
