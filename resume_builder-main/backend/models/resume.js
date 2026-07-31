const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeData: { type: Object, required: true },
  layout: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);