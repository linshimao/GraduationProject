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
  contact_q: {
    type: String,
    default: ''
  },
  contact_n: {
    type: String,
    default: ''
  },
  regAddr: {
    type: String,
    default: ''
  },
});