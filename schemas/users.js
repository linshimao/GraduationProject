var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String, // 用户名
  password: String, // 密码
  authority: { // 角色
    type: String,
    default: 'normalUser'
  },
  regTime: { // 注册时间
    type: Date,
    default: Date.now
  },
  contact_q: { // QQ
    type: String,
    default: ''
  },
  contact_n: { // 电话号码
    type: String,
    default: ''
  },
  regAddr: { // 注册ip
    type: String,
    default: ''
  },
});