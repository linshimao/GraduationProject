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
      // console.log(result.k_arr);  ["59ad67db3ced640c780d0236", "59b027471a89bc2cc8cb4303", "59b0fe8ad64a1031604291a4"]
      var $pre_cont = $('.pre-cont');
      var $pre_cont_id = [];
      $pre_cont.each(function (i, v) {
        // console.log($(v).find('input:hidden').val())
        $(result.k_arr).each(function (index, value) {
          if ($(v).find('input:hidden').val() == value) {
            $(v).next().css({
              'background': 'rgb(19, 234, 57)'
            })
          }
        });
      });
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