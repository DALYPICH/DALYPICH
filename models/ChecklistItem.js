const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  section: { type: String, required: true },
  sectionNumber: { type: String, required: true },
  subsection: { type: String, required: true },
  subsectionNumber: { type: String, required: true },
  category: { type: String, required: true },
  categoryNumber: { type: String, required: true },
  questionNumber: { type: String, required: true },
  question: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
  legalReference: { type: String, default: '' },
  isNewContent: { type: Boolean, default: false },
  compliancePoint: { type: String, default: '' },
  auditFindings: { type: String, default: '' },
  commonProblems: { type: String, default: '' },
  advice: { type: String, default: '' },
  reminder: { type: String, default: '' },
  relatedCAT: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('ChecklistItem', checklistItemSchema);
