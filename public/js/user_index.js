$(function () {
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
      success: function () {
        console.log('修改成功。');
      }
    })
  })
})
