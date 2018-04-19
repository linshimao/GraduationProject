$(function () {
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
  $('.infos-table').on('change', 'select.small', function () {
    let authority = $(this).val()
    let id = $(this).data('user-id')
    $.ajax({
      url: '/admin/user/authority',
      method: 'POST',
      dataType: 'json',
      data: {
        _id: id,
        authority: authority
      },
      success: function (msg) {
        console.log(msg);
        showSwal('用户角色修改成功', 1, function () {
          location.reload()
        })
      }
    })
  })
})

