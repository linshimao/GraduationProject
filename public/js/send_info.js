/**
 * Created by small on 2017/7/28.
 */
$(function () {
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
          alert('标题不能为空');
          return false;
        }
        if ($preContent.val() == '') {
          alert('概要不能为空');
          return false;
        }
        if ($content.val() == '') {
          alert('正文不能为空');
          return false;
        }
      },
      success: function (data) {
        // console.log(JSON.stringify(data)+ '------');
        window.location.href = '/api/content';
      }
    })
  })
});