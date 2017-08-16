var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Info = require('../models/Info');

const responseData = {};
router.get('/', function (req, res) {
  res.render('admin/admin_index');
});

router.get('/user', function (req, res) {
  var page = Number(req.query.page || 1);
  var limit = 5;
  var pages = 0;

  User.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.max(page, 1);
    page = Math.min(page, pages);
    var skip = (page - 1) * limit;

    User.find().sort({_id: -1}).limit(limit).skip(skip).then(function (users) {
      res.render('admin/user_index', {
        userInfo: req.userInfo,
        users: users,
        page: page,
        limit: limit,
        count: count,
        pages: pages
      });
    })
  })
})

router.get('/infos', function (req, res) {
  res.render('admin/send_info_index');
});

router.post('/contents', function (req, res) {
  //body: { contentTitle: '标题', preContent: '概要', '$content': '正文' }
  var contentTitle = req.body.contentTitle;
  var preContent = req.body.preContent
     ,content = req.body.content
     ,whoReceived = req.body.whoReceived;
  new Info({
    title: contentTitle,
    preContent: preContent,
    mainContent: content,
    receiveMember: whoReceived
  }).save().then(function () { // result返回新插入的数据
    responseData.message = '保存成功';
    res.json(responseData);
  });

});

router.post('/contents/view', function (req, res) {

    // tip.receiver.push(req.body.view);
    // Info.findById(req.body.view).then(function (result) {
      // console.log(result)
      // console.log(typeof tip)
      Info.update({_id: req.body.view}, { $addToSet : { receiver : req.userInfo._id}}, function (err, raw) {
        if (err) {
          console.log(err);
        } else {
          // console.log(raw)
          responseData.message = '已阅读';
          responseData.code = 0;
          res.json(responseData);

        }
      });

    // })
});

router.get('/content/ask', function (req, res) {
  var queryData = {};
  if (req.userInfo.authority === 'admin' ) {
    queryData = {};
  } else {
    queryData["receiveMember"] = req.userInfo.authority;
  }
  Info.find(queryData).then(function (contents) {
    var k_arr = [];
    // console.log(contents)
    for (var k in contents) {
      if (contents[k].receiver.indexOf(req.userInfo._id) !== -1) {
        k_arr.push(k)
      }
    }
    responseData.k_arr = k_arr;
    responseData.message = '查询成功';
    res.json(responseData);
  })

});
module.exports = router;