$(function () {
  $newPwd = $('#newPwd');
  $contact = $('#contact');
  $phone = $('#phone');
  $saveInfoBtn = $('#saveInfoBtn');

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
          alert(result.message)
        } else if (result.code === 2) {
          alert(result.message);
        } else if (result.code === 3) {
          alert(result.message);
        } else if (result.code === 0) {
          alert('资料修改成功,请重新登录')
          window.location.href = '/';
        }
      }
    })
  })

});