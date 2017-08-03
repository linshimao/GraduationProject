var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  newPassword: {
    type: String,
    default: ''
  }
});