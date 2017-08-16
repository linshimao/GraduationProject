var express = require('express');
var swig = require('swig');
var app = new express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Cookies = require('cookies');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userList = [];
io.on('connection', function (socket) {
  socket.on('login', function (user) {
    // console.log(socket.id); // 每个客户端在建立连接的时候，服务器都会为他创建一个id
    user.id = socket.id;
    userList.push(user);
    io.emit('userList', userList);
    socket.emit('userInfo', user);
    socket.broadcast.emit('loginInfo', user.name + '上线了!', 1);
    socket.on('disconnect', function () {
      socket.broadcast.emit('loginInfo', user.name + '下线了!', 0);
    });
  });
  socket.on('toAll', function (msgObj) {
    socket.emit('toEvery', msgObj);
    socket.broadcast.emit('toAny', msgObj);
  });
});

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
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      req.userInfo.username = new Buffer(req.userInfo.username, 'base64').toString();
      User.findById(req.userInfo._id).then(function (userMess) {
        req.userInfo.isAdmin = Boolean(userMess.authority === "admin");
        next();
      })
    } catch (e) {
      throw new Error("cookie读取出错！");
    }
  } else {
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
    http.listen(8888);
  }
});

