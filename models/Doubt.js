const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  question: String,
  mediaUrl: String,
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Doubt', doubtSchema);
