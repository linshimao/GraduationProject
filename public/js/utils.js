var utils = function () {};
var showSwal;

/**
 * @param {string} msg 提示内容
 * @param {string} code 0出错 1正确
 * @param {boolean} buttonControl 控制是否显示取消按钮
 * @param {function} cb 回调参数
 */
showSwal = function (msg, code, buttonControl, cb) {
  swal({
    text: msg,
    icon: code,
    buttons: {
      confirm: '确定',
      cancel: {
        visible: buttonControl,
        text: '取消'
      }
    }
  }).then((result) => {
    if (result && cb && typeof cb === 'function') {
      cb()
    }
  })
}
/* 屏幕滚动到顶部 */
utils.scrollToTop = function () {
  var timer;
  var scrollFlag = false;
  $('.scroll-top').on('click', function () {
    timer = setInterval(function () {
      scrollFlag = false;
      var scrollTop = $(document).scrollTop();
      var speed = Math.floor(-scrollTop / 8);
      $(document).scrollTop(scrollTop + speed);
      if (scrollTop == 0) {
        clearInterval(timer);
      }
    }, 20);
  });
  $(window).on('scroll', function () {
    if (scrollFlag) {
      if (typeof timer == 'number') {
        clearInterval(timer);
      }
    }
    scrollFlag = true;
  });
};

/* 控制回到顶部按钮的显示和隐藏 */

utils.scrollControl = function () {
  $(window).on('scroll', function () {
    var $scrollBtn = $('.scroll-top');
    var scrollY = $(document).scrollTop(); // 文档滚动高度
    var clientHY = $(window).height(); // 可视区域高度
    if (scrollY > clientHY) {
      if (!$scrollBtn.hasClass('scroll-top-show')) {
        $scrollBtn.addClass('scroll-top-show');
      }
    } else {
      if ($scrollBtn.hasClass('scroll-top-show')) {
        $scrollBtn.removeClass('scroll-top-show');
      }
    }
  });
};

/* 获取事务 */
utils.infosManage = function () {
  $('.infos-table').on('click', '.info-delete-btn', function () {
    let $this = $(this)
    // $('#remove-modal').modal()
    showSwal('确认删除该事务？', 'warning', true, function () {
      var _id = $this.attr('data-info-id');
      $.ajax({
        url: '/admin/infos/delete',
        dataType: 'json',
        method: 'POST',
        data: {
          id: _id
        },
        success: function (data) {
          if (data.code == 0) {
            $this.parents('tr').remove()
            alertify.notify('事务删除成功！', 'success', 3, function () {});
          }
        }
      })
    })
  })
};

/* 事务修改 */
utils.infosEdit = function () {
  $('.infos-table').on('click', '.info-edit-btn', function () {
    var _id = $(this).attr('data-info-id');
    location.href = '/admin/infos/edit?id=' + _id;
  })
};

/* 重新发布事务 */
utils.reSendInfo = function () {
  $('#reSendInfoBtn').on('click', function () {
    var _id = $(this).attr('data-resend-id');
    var contentTitle = $('#contentTitle').val();
    var preContent = $('#preContent').val();
    var content = $('#content').val();
    var whoReceive = $('#whoReceive').find('option:selected').val(); // superUser/normalUser
    // console.log(whoReceive)
    $.ajax({
      url: '/admin/infos/edit',
      method: 'POST',
      dataType: 'json',
      data: {
        id: _id,
        contentTitle: contentTitle,
        preContent: preContent,
        content: content,
        whoReceive: whoReceive
      },
      success: function (data) {
        if (data.code == 0) {
          showSwal(data.message, 'success', false, function () {
            location.href = '/admin/infos/manage';
          })
        }
      }
    })
  })
};