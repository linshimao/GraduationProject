var express = require('express');
var swig = require('swig');
var app = new express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Cookies = require('cookies');

var User = require('./models/User');
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

swig.setDefaults({
  cache: false
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = {};
  if (req.cookies.get('userInfo')) {
    try {
      // new Buffer(req.userInfo.username, 'base64').toString();
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      req.userInfo.username = new Buffer(req.userInfo.username, 'base64').toString();
      User.findById(req.userInfo._id).then(function (userMess) {
        req.userInfo.isAdmin = Boolean(userMess.authority === "admin");
        next();
      })
    } catch (e) {
        // console.log(111111)
    }
  } else {
    // conso  le.log(2222222)
    next();
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routers/main'));
app.use('/api', require('./routers/api'));
app.use('/admin', require('./routers/admin'));

mongoose.connect('mongodb://localhost:27017/gp', function (err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功, 端口号' + 8888);
    app.listen(8888);
  }
});
