/**
 * Created by small on 2017/7/28.
 */
var flag = true;
$(function () {
  $('.article-wraper').on('click', '.j-i', function () {
    $(this).parent('p').siblings('.info-wrap').find('.collapse').collapse('toggle');
    // $(this).toggleClass("fa fa-angle-double-up j-i");
    if (flag) {
      $(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
      flag = false;
    } else {
      $(this).removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
      flag = true;
    }
  });
});