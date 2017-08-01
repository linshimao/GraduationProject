var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  authority: {
    type: String,
    default: 'normalUser'
  },
  regTime: {
    type: Date,
    default: Date.now
  },
  regAddr: {
    type: String,
    default: ''
  }
});