/**
 * Created by small on 2017/7/19.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Info = require('../models/Info');
// var Personal_information = require('../models/Personal_information');

var responseData
   ,data;

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: ''
  };
  data = {
    userInfo: req.userInfo
  };
  // console.log(data.userInfo)
  next();
});

router.post('/users', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;

  if (username == '') {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);
    return false;
  }

  if (password == '') {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);
    return;
  }

  if (repassword != password) {
    responseData.code = 3;
    responseData.message = '两次输入的密码不一致';
    res.json(responseData);
    return;
  }
  User.findOne({
    username: username
  }).then(function (userInfo) {
    if (userInfo) {
      responseData.code = 4;
      responseData.message = '用户名已经存在';
      res.json(responseData);
      return;
    } else {
      var ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
      } else {
        ip = req.ip;
      }
      var user = new User({
        username: username,
        password: password,
        regAddr: ip
      });
      return user.save();
    }
  }).then(function (newUserInfo) {
    responseData.message = '注册成功';
    res.json(responseData);
    next();
  })
});

router.post('/users/login', function (req, res) {
  var username = req.body.username;
  // console.log(username);
  var password = req.body.password;
  if (username == '' || password == '') {
    responseData.code = 1;
    responseData.message = '用户名或密码不能为空';
    res.json(responseData);
    return false;
  }

  User.findOne({
    username: username,
    password: password
  }).then(function (userInfo) {
    // console.log(userInfo)
    if (!userInfo) {
      responseData.code = 2;
      responseData.message = '用户名或密码错误';
      res.json(responseData);
      return false;
    } else {
      responseData.message = '登录成功';
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username,
        authority: userInfo.authority
      };
      req.cookies.set('userInfo', JSON.stringify({
        _id: userInfo._id,
        username: new Buffer(userInfo.username).toString('base64'),
        authority: userInfo.authority,
        contact_q: userInfo.contact_q,
        contact_n: userInfo.contact_n
      }));
      // console.log(userInfo)
      res.json(responseData);

    }
  })
});


// limit(limit).sort({_id: -1}).skip(5).
router.get('/content', function (req, res) {
  var page = Number(req.query.page || 1);
  var pages = 0;
  var limit = 5;
  var skip = 0;
  var queryData = {};

  if (req.userInfo.authority === 'admin' ) {
      queryData = {};
  } else {
    queryData["receiveMember"] = req.userInfo.authority;
  }

  Info.count(queryData).then(function (counts) {
    // console.log(counts)
    pages = Math.ceil(counts / limit);
    skip = (page - 1) * limit;
    // console.log(skip);
    Info.find(queryData).skip(skip).limit(limit).sort({_id: -1}).then(function (contents) {
      page = Math.min(page, pages);
      page = Math.max(page, 1);
      // responseData.k_arr = k_arr;
      // console.log(k_arr)
      res.render('main/content_index', {
        contents: contents,
        userInfo: req.userInfo,
        pages: pages,
        page: page,
        limit: limit,
        counts: counts
      })
    });
  })
});

router.get('/about', function (req, res) {
  res.render('main/about', {
    userInfo: req.userInfo
  });
});

router.get('/member_center', function (req, res) {
  res.render('main/member_center', {
    userInfo: req.userInfo
  });
});

router.post('/users/edit', function (req, res) {
  // console.log(req.body); // { newPassword: '', contact_q: '', contact_n: '' }
  var newPassword = req.body.newPassword
    , contact_q = req.body.contact_q
    , contact_n = req.body.contact_n;

    if (newPassword == '') {
      responseData.message = '密码不能为空';
      responseData.code = 1;
      res.json(responseData);
      return false;
    }

    if (contact_q == '') {
      responseData.message = 'QQ号码不能为空';
      responseData.code = 2;
      res.json(responseData);
      return false;
    }


    if (contact_n == '') {
      responseData.message = '手机号码不能为空';
      responseData.code = 3;
      res.json(responseData);
      return false;
    }

    User.update({_id: req.userInfo._id}, { $set: { password: newPassword, contact_q: contact_q, contact_n: contact_n } }).then(function () {
      // console.log(result);
      req.cookies.set('userInfo', null);
      responseData.message = '用户资料更新成功';
      responseData.code = 0;
      res.json(responseData);
    })
});

router.get('/logout', function (req, res) {
  req.cookies.set('userInfo', null);
  res.redirect('/');
});

router.get('/content/chat', function (req, res) {
  // console.log(req.userInfo)
  res.render('main/content_chat', {
    userInfo: req.userInfo
  })
});
module.exports = router;