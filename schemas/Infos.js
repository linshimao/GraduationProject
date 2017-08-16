/**
 * Created by small on 2017/7/28.
 */
var mongoose =  require('mongoose');

module.exports = new mongoose.Schema({
  title: String, // 事务标题
  sendTime: { // 发布时间
    type: Date,
    default: Date.now
  },
  preContent: String, // 事务头
  mainContent: String, // 事务体
  receiveMember: { // 接收组
    type: String,
    default: 'normalUser'
  },
  receiver: Array // 已接收对象ID
});