
// 滚动条在最底部
function scrollToBottom () {
  $('.chat-wraper').scrollTop($('.chat-wraper')[0].scrollHeight);
}

// 添加用户到在线列表
function addUser(userList) {
  var $user_list = $('#jUserList');
  var $uLiClone = $user_list.children('li:first').clone();
  for (var i in userList) {
    // console.log(userList[i]) // Object {name: "egrey ", img: "/img/2.png", id: "t6MVGw9ozIfNbARBAAAL"}
    $uLiClone.children('span').text(userList[i].name);
    $uLiClone.children('a').children('img').attr('src', userList[i].img)
    $user_list.append($uLiClone);
  }
}

// 添加系统提示消息
function addMsgFromSys(msg, type) {
  type === 1 ? $.scojs_message(msg, $.scojs_message.TYPE_OK): $.scojs_message(msg, $.scojs_message.TYPE_ERROR);
}

// 发送用户消息
function addMsgFromUser(msgObj, isSelf) {
  // var randomNum = Math.
  console.log(msgObj)
  // console.log(msgObj)
  var msgType = isSelf ? 'chat-me' : 'chat-send-by-others';
  console.log(isSelf, '====')
  var msgHtml = isSelf ? $('<div class="chat-message-contain text-right">' +
    '<p class="user-info"></p>' +
    '<span class="mes-content"></span>' +
    '<img class="profile-picture" src="" alt="">' +
    '</div>') :
    $('<div class="chat-message-contain">' +
      '<p class="user-info"></p>' +
      '<img class="profile-picture" src="" alt="">' +
      '<span class="mes-content"></span>' +
      '</div>');
  msgHtml.addClass(msgType);
  msgHtml.find('.user-info').text(msgObj.from.name);
  msgHtml.find('.profile-picture').attr('src', msgObj.from.img);
  msgHtml.find('.profile-picture').attr('title', msgObj.from.name);
  msgHtml.find('.mes-content').text(msgObj.msg);
  $('.chat-wraper .panel-body').append(msgHtml);
  scrollToBottom();
}