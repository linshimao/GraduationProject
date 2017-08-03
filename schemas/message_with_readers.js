var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  read_at: {
    type: Date,
    default: ''
  },
  info_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Info'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hasRead: {
    type: Boolean,
    default: false
  }
});