var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Info = require('../models/Info');

var responseData = {};
router.get('/', function (req, res) {
  res.render('admin/admin_index', {
    userInfo: req.userInfo
  });
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
});

router.post('/user/authority', function (req, res) {
  let id = req.body._id,
      authority = req.body.authority;
  User.update({_id: id}, {authority: authority}, function (err, raw) {
    if (err) {
      responseData.code = 1;
      responseData.message = '用户权限分配失败';
      res.json(responseData)
    } else {
      responseData.code = 0;
      responseData.message = '用户权限修改成功'
      res.json(responseData)
    }

  })
  // res.json('')
})

router.get('/infos', function (req, res) {
  res.render('admin/send_info_index', {
    userInfo: req.userInfo
  });
});

router.post('/infos/delete', function (req, res) {
  var deleteInfoId = req.body.id;
  Info.remove({_id: deleteInfoId}, function (err, result) {
    if (err) {
      console.log(err + '删除失败');
      responseData.code = 1;
      responseData.message = '删除失败';
      res.json(responseData);
      return false;
    } else {
      console.log(result+':删除成功');
      responseData.code = 0;
      responseData.message = '删除成功';
      res.json(responseData);
    }
  });
});

router.get('/infos/edit', function (req, res) {
  // console.log(req.body)
  var editId = req.query.id;
  // console.log(req.query.id)
  Info.findById(editId).then(function (topic) {
    console.log(topic)
    res.render('admin/info_edit', {
      topic: topic,
      id: editId
    });
  })

});

router.post('/infos/edit', function (req, res) {
  var editId = req.body.id;
  var contentTitle = req.body.contentTitle;
  var preContent = req.body.preContent;
  var content = req.body.content;
  var whoReceive = req.body.whoReceive;
  // console.log(whoReceive)
  // console.log(editId);
  Info.update({_id: editId}, { $set: { title: contentTitle, preContent: preContent, mainContent: content, receiveMember: whoReceive}}, function (err, docs) {
    if (err) {
      console.log(err + '重新发布事务失败');
      responseData.code = 1;
      responseData.message = '重新发布事务失败';
      res.json(responseData);
      return false;
    } else {
      console.log(docs + '更新事务成功');
      responseData.code = 0;
      responseData.message = '更新事务成功';
      res.json(responseData);
    }
  })
});

router.get('/infos/visit', function (req, res) {
  var visitId = req.query.id;
  var usersArray = [];
  Info.findById(visitId).then(function (topic) {
      for (var i = 0; i < topic.receiver.length; i++) {
        User.findOne({_id: topic.receiver[i]}).then(function (user) {
          usersArray.push(user);
          // console.log(usersArray)
        });
      }



    // { _id: 597ed8b5c3353b4458b4b974,
    //   username: 'aa',
    //   password: 'aa',
    //   __v: 0,
    //   regAddr: '::ffff:127.0.0.1',
    //   contact_n: '111',
    //   contact_q: '111',
    //   regTime: 2017-07-31T07:13:57.990Z,
    //   authority: 'normalUser' } ]
      return User.find({authority: topic.receiveMember}).then(function (receiveMembers) {
        res.render('admin/user_visit_manage', {
          topic: topic,
          userArray: usersArray,
          receiver: receiveMembers,
          userInfo: req.userInfo
        });
      })
  })
});

router.post('/contents', function (req, res) {
  //body: { contentTitle: '标题', preContent: '概要', '$content': '正文' }
  var contentTitle = req.body.contentTitle;
  var preContent = req.body.preContent
    ,content = req.body.content
    ,whoReceived = req.body.whoReceived
    ,receiverNumbers;
  User.find({'authority': whoReceived}).then(function (results) {
    receiverNumbers = results.length;
    new Info({
      title: contentTitle,
      preContent: preContent,
      mainContent: content,
      receiveMember: whoReceived,
      receiverNumbers: receiverNumbers
    }).save().then(function () { // result返回新插入的数据
      responseData.message = '保存成功';
      res.json(responseData);
    });
  })
});

router.get('/infos/manage', function (req, res) {
  // console.log(req);
  // console.log(req.userInfo);
  Info.find().then(function (results) {
    console.log(results);
    res.render('admin/info_manage', {
      // infos: infos
      userInfo: req.userInfo,
      infos: results
    });
  });

});


/*
* _id: 598007c48eb72f4924141ae1,
 title: 'dfghjkl;',
 preContent: '官方还接口类',
 mainContent: 'etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有etymology有',
 hasRead: true,
 __v: 0,
 receiver: [ '597ef4477afd6f43685d1a90' ],
 receiveMember: 'normalUser',
 sendTime: 2017-08-01T04:47:00.184Z },
*
* */

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
  console.log(req.userInfo._id)
  var queryData = {};
  if (req.userInfo.authority === 'admin' ) {
    queryData = {};
    return false;
  } else {
    queryData["receiveMember"] = req.userInfo.authority;
  }
  Info.find(queryData).then(function (contents) {
    var k_arr = [];
    console.log(contents)
    for (var k in contents) {
      if (contents[k].receiver.indexOf(req.userInfo._id) !== -1) {
        // console.log(k + )
        k_arr.push(contents[k]._id)
      }
    }
    responseData.k_arr = k_arr;
    responseData.message = '查询成功';
    res.json(responseData);
  })
});
module.exports = router;