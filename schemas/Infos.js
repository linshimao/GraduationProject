/**
 * Created by small on 2017/7/28.
 */
var mongoose =  require('mongoose');

module.exports = new mongoose.Schema({
  title: String,
  sendTime: {
    type: Date,
    default: Date.now
  },
  preContent: String,
  mainContent: String,
  receiveMember: {
    type: String,
    default: 'normalUser'
  },
  receiver: []
});