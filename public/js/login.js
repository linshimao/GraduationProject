$(function () {
  var $login = $('#login');
  var $register = $('#register');

  $login.find('a.register').on('click', function () {
    $login.slideUp(500);
    $register.slideDown(500);
    $register.find('button:button').html('注 册');
    $('.wel').html('欢迎注册班级事务发布系统');
  });
  $register.find('a.registered').on('click', function () {
    $register.slideUp(500);
    $login.slideDown(500);
    $('.wel').html('欢迎登录班级事务发布系统');
  });

  /**
   * 用户注册
   */
  $register.find('button:button').on('click', function () {
    var _this = $(this);
    $.ajax({
      type: 'post',
      url: '/api/users',
      dataType: 'json',
      data: {
        username: $register.find('[name="username"]').val(),
        password: $register.find('[name="password"]').val(),
        repassword: $register.find('[name="repassword"]').val()
      },
      success: function (result) {
        // console.log(result)
        if (!result.code) {
          _this.html('<i class="fa fa-check" aria-hidden="true"></i>');
          setTimeout(function () {
            $register.slideUp(500);
            $login.slideDown(500);
          }, 1000)
        }
      }
    });
  })

  /**
   * 用户登录
   */
  $login.find('#btnSend').on('click', function () {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/api/users/login',
      data: {
        username: $login.find('[name="username"]').val(),
        password: $login.find('[name="password"]').val()
      },
      success: function (result) {
        // console.log(result);
        if (result.code == 0) {
          window.location.href = 'api/content';
        } else {
          alert(result.message);
        }
      }
    })
  })
});


