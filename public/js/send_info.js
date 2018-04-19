/**
 * Created by small on 2017/7/28.
 */
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

  $('#sendInfoBtn').on('click', function () {
    var _this = $(this);
    var $contentTitle = $('#contentTitle');
    var $preContent = $('#preContent');
    var $content = $('#content');
    var $options = $('#whoReceive').find('option:selected');
    // console.log($contentTitle.val(), $preContent.val(), $content.val());
    $.ajax({
      type: 'post',
      url: '/admin/contents',
      dataType: 'json',
      data: {
        "contentTitle": $contentTitle.val(),
        "preContent": $preContent.val(),
        "content": $content.val(),
        'whoReceived': $options.val()
      },
      beforeSend: function () {
        if ($contentTitle.val() == '') {
          showSwal('标题不能为空', 0)
          return false;
        }
        if ($preContent.val() == '') {
          showSwal('概要不能为空', 0)
          return false;
        }
        if ($content.val() == '') {
          showSwal('正文不能为空', 0)
          return false;
        }
      },
      success: function (data) {
        // console.log(JSON.stringify(data)+ '------');
        showSwal('事务发布成功', 1, function () {
          window.location.href = '/api/content';
        })
      }
    })
  })
});