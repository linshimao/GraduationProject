/**
 * Created by small on 2017/8/7.
 */


$(function () {

  var socket = io();
  // 显示模态框
  $('#nickname').modal();
  $('#sendNickname').on('click', function () {
    var name = $('#typeNickname').val();
    if (!name) {
      showSwal('匿名昵称不能为空', 'error')
      return
    }
    var imgList = ['/img/1.png', '/img/2.png', '/img/3.jpeg', '/img/4.jpeg', '/img/5.jpeg'];
    var randomNum = Math.floor(Math.random() * 5);
    var img = imgList[randomNum];
    var dataObj = {
      name: name,
      img: img
    };
    socket.emit('login', dataObj);
    $('#nickname').modal('hide');
    $('#typeNickname').val('');
    $('.input-group-btn :submit').focus();
  });

  $('.ct-send :button').on('click', function () {
    var msg = $('#chatMsg').val();
    // console.log(msg)
    if (msg == '') {
      alert('发送的消息不能为空!!!');
      return false;
    }
    var from = userSelf;
    var msgObj = {
      from: from,
      msg: msg
    };
    socket.emit('toAll', msgObj);
    $('#chatMsg').val('');
  })

  socket.on('loginInfo', function (msg, type) {
    addMsgFromSys(msg, type);
  });

  socket.on('userList', function (userList) {
    addUser(userList);
  });

  socket.on('userInfo', function (user) {
    userSelf = user;
    $('.span-nickname').text(user.name);
  });

  socket.on('toEvery', function (msgObj) {
    addMsgFromUser(msgObj, true);
  });

  socket.on('toAny', function (msgObj) {
    addMsgFromUser(msgObj, false);
  })

  /******************************************************************************************** */
  /*----------------------------------------METHOD----------------------------------------------*/
  function showSwal (msg, code, cb) {
    swal({
      text: msg,
      icon: code || 'success',
      button: {
        text: '确定'
      }
    }).then((result) => {
      if (result && cb && typeof cb === 'function') {
        cb()
      }
    })
  }

  $('#nickname').on('click', 'button[data-dismiss="modal"]' ,function (e) {
    location.href = '/api/content'
  })
  
  /*---------------------------------------METHOD--END-----------------------------------------*/
  /******************************************************************************************** */
});
