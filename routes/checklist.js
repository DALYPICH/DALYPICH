const express = require('express');
const router = express.Router();
const ChecklistItem = require('../models/ChecklistItem');

function numericSort(a, b) {
  const pa = a.questionNumber.split('.').map(Number);
  const pb = b.questionNumber.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

router.get('/', async (req, res) => {
  const items = await ChecklistItem.find();
  items.sort(numericSort);
  res.json(items);
});

router.get('/section/:sectionNumber', async (req, res) => {
  const items = await ChecklistItem.find({ sectionNumber: req.params.sectionNumber });
  items.sort(numericSort);
  res.json(items);
});

router.put('/:id', async (req, res) => {
  const item = await ChecklistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

router.post('/:id/evidence', async (req, res) => {
  const { type, title, link, description, fileName, fileUrl } = req.body;
  const item = await ChecklistItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const evidence = {
    type,
    title,
    description,
    uploadedAt: new Date(),
    uploadedBy: 'User'
  };

  if (type === 'link') {
    evidence.link = link;
  } else if (type === 'file') {
    evidence.fileName = fileName;
    evidence.fileUrl = fileUrl;
  }

  item.evidence.push(evidence);
  await item.save();
  res.json(item);
});

router.delete('/:id/evidence/:evidenceId', async (req, res) => {
  const item = await ChecklistItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.evidence = item.evidence.filter(e => e._id.toString() !== req.params.evidenceId);
  await item.save();
  res.json(item);
});

module.exports = router;
