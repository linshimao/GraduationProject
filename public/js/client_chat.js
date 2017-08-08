/**
 * Created by small on 2017/8/7.
 */


$(function () {

  var socket = io();
  // 滚动条在最底部
  function scrollToBottom () {
    $('.chat-wraper').scrollTop($('.chat-wraper')[0].scrollHeight);
  }
  // 显示模态框
  $('#nickname').modal();

  $('#sendNickname').on('click', function () {
    var name = $('#typeNickname').val();
//    if (checkNickname(name)) {
//      alert('该昵称已经被人使用了!!!');
//    } else {
    var imgList = ['/img/1.png', '/img/2.png'];
    var randomNum = Math.floor(Math.random() * 2);
    var img = imgList[randomNum];
    var dataObj = {
      name: name,
      img: img
    };
//    }
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
    // console.log(user); //   Object {name: "s", img: "/img/2.png", id: "SRP5N10l1Egj43bxAAAH"}
    userSelf = user;
    $('.span-nickname').text(user.name);
  });

  socket.on('toEvery', function (msgObj) {
    addMsgFromUser(msgObj, true);
  });

  socket.on('toAny', function (msgObj) {
    addMsgFromUser(msgObj, false);
  })
});
