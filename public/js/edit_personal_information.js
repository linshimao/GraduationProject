$(function () {
  $newPwd = $('#newPwd');
  $contact = $('#contact');
  $phone = $('#phone');
  $saveInfoBtn = $('#saveInfoBtn');

  var showSwal;

  /**
   * @param {string} msg 提示内容
   * @param {string} code 0出错 1正确
   * @param {function} cb 回调参数
   */
  showSwal = function (msg, code, cb) {
    swal({
      text: msg,
      icon: code === 0 ? 'error' : 'success',
      button: {
        text: '确定'
      }
    }).then((result) => {
      if (result && cb && typeof cb === 'function') {
        cb()
      }
    })
  }
  $saveInfoBtn.on('click', function () {
    $.ajax({
      type: 'post',
      url: '/api/users/edit',
      data: {
        newPassword: $newPwd.val(),
        contact_q: $contact.val(),
        contact_n: $phone.val()
      },
      dataType: 'json',
      success: function (result) {
        if (result.code === 1) {
          showSwal(result.message, 0)
          return
        } else if (result.code === 2) {
          showSwal(result.message, 0)
          return
        } else if (result.code === 3) {
          showSwal(result.message, 0)
          return
        } else if (result.code === 0) {
          showSwal(result.message, 1, function () {
            window.location.href = '/';
          })
        }
      }
    })
  })

});