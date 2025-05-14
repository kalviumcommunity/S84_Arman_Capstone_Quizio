const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  question: { type: String, required: true },
  askedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;

