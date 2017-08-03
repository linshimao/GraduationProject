/**
 * Created by small on 2017/7/28.
 */

$(function () {

  // 页面一打开就查询一次数据库
  $.ajax({
    type: 'get',
    url: '/admin/content/ask',
    dataType: 'json',
    success: function (result) {
      // console.log(result.k_arr);
      var $light_circle = $('.light-circle');
      $.each(result.k_arr, function (i, v) {
        // console.log(i + '---' + v)
        $light_circle.eq(v).css({
          backgroundColor: "#13ea39"
        })
        })
    }
  });


  var flag = true;
  $('.article-wraper').on('click', '.j-i', function () {
    var sClass = 'fa-angle-double-';
    $(this).parent('p').siblings('.info-wrap').find('.collapse').collapse('toggle');
    $(this).removeClass(sClass + (flag ? 'down' : 'up')).addClass(sClass + (flag ? 'up' : 'down'));
    flag = !flag;
    $(this).parent('p').siblings('button.btn-sure').toggle();
  });
  $('.article-wraper').on('click', '.btn-sure', function () {
    var $circle = $(this).parent('.pre-cont').siblings('.light-circle');
    var _id = $(this).siblings(':hidden').val();
    $.ajax({
      url: '/admin/contents/view',
      type: 'post',
      data: {
        view: _id
      },
      success: function (data) {
        if (data.code == 0) {
          $circle.css({
            backgroundColor: '#13ea39'
          })
        }
      }
    })
  })
});