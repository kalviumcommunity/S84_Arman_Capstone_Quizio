const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  qCoins: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
