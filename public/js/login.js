$(function () {
  var $login = $('#login');
  var $register = $('#register');
  var $user = $('#user') // css用户名ID
    ,$pwd = $('#pwd') // css密码ID
    ,$userReg = $('#userReg') // css注册用户名ID
    ,$pwdReg = $('#pwdReg') // css注册密码ID
    ,$pwdRegSec = $('#pwdRegSec'); // css重复密码ID

  $login.find('a.register').on('click', function () {
    $login.slideUp(500);
    $register.slideDown(500);
    $register.find('button:button').html('注 册');
    $('.wel').html('欢迎注册班级事务发布系统');
  });
  $register.find('a.register').on('click', function () {
    $register.slideUp(500);
    $login.slideDown(500);
    $('.wel').html('欢迎登录班级事务发布系统');
  });

  /**
   * 用户注册
   */
  function register(thisObj) {
    $.ajax({
      type: 'post',
      url: '/api/users',
      dataType: 'json',
      data: {
        username: $register.find('[name="username"]').val(),
        password: $register.find('[name="password"]').val(),
        repassword: $register.find('[name="repassword"]').val()
      },
      beforeSend: function () {
        $('.j-note-login-err').remove();
        if ($userReg.val().trim() === '') {
          $userReg.after('<p class="j-note-login-err">账号不能为空</p>');
          add_class($userReg);
        }
        if ($pwdReg.val().trim() === '') {
          $pwdReg.after('<p class="j-note-login-err">密码不能为空</p>');
          add_class($pwdReg);
        }
        if ($pwdRegSec.val().trim() !== $pwdReg.val().trim()) {
          $pwdRegSec.after('<p class="j-note-login-err">两次输入密码不一致</p>');
          add_class($pwdRegSec);
          return false;
        }
      },
      success: function (result) {
        // console.log(result)
        if (result.code === 4) {
          $pwdRegSec.after('<p class="j-note-login-err">该用户名已经存在咯！</p>');
        }
        if (!result.code) {
          thisObj.html('<i class="fa fa-check" aria-hidden="true"></i>');
          setTimeout(function () {
            $register.slideUp(500);
            $login.slideDown(500);
          }, 1000)
        }
      }
    });
  }
  $register.find('button:button').on('click', function () {
    var _this = $(this);
    register(_this);
  });

  /**
   * 用户登录
   */
    function login() {
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/api/users/login',
      data: {
        username: $login.find('[name="username"]').val(),
        password: $login.find('[name="password"]').val()
      },
      beforeSend: function () {
        $('.j-note-login-err').remove();
        if ($user.val().trim() === '') {
            $user.after('<p class="j-note-login-err">账号不能为空</p>');
            add_class($user);
        }
        if ($pwd.val().trim() === '') {
            $pwd.after('<p class="j-note-login-err">密码不能为空</p>');
            add_class($pwd);
            return false;
        }
      },
      success: function (result) {
        // console.log(result);
        if (result.code == 0) {
          window.location.href = 'api/content';
        } else {
          $('.j-note-login-err').remove();
          $user.after('<p class="j-note-login-err">您输入的账号或密码有误</p>');
          $user.val('');
          $pwd.val('');
          $user.focus();
        }
      }
    })
  }
    $login.find('#btnSend').on('click', function () {
      login();
    });

    // 回车提交ajax登录请求
    $("#login input").keydown(function(event){
      // console.log(event.which);
      if (event.which === 13)
      login();
    });

    // 回车提交ajax注册请求
    $("#register input").keydown(function(event){
      // console.log(event.which);
      if (event.which === 13)
        register();
    });

    // 输入框写入数据时。移除错误提示
  (function () {
      // 用户登录账号输入框事件
      $user.on('keydown', function () {
        input_keydown($(this));
      });
      // 用户登录密码输入框事件
      $pwd.on('keydown', function () {
        input_keydown($(this));
      });

      // 用户注册账号输入框事件
      $userReg.on('keydown', function () {
        input_keydown($(this));
      });

      // 用户注册密码输入框事件
      $pwdReg.on('keydown', function () {
        input_keydown($(this));
      })

      // 用户注册框密码确认事件
      $pwdRegSec.on('keydown', function () {
        input_keydown($(this));
      })
    })();


  (function () {
      $user.blur(function () {
        $(this).siblings('p').remove();
        if ($user.val() === '') {
          $user.after('<p class="j-note-login-err">账号不能为空</p>');
          add_class($user);
        }
      })
    })();
  (function () {
      $pwd.blur(function () {
        $(this).siblings('p').remove();
        if ($pwd.val() === '') {
          $pwd.after('<p class="j-note-login-err">密码不能为空</p>');
          add_class($pwd);
        }
      })
    })();

  (function () {
    $userReg.blur(function () {
      $(this).siblings('p').remove();
      if ($userReg.val() === '') {
        $userReg.after('<p class="j-note-login-err">账号不能为空</p>');
        add_class($userReg);
      }
    })
  })();

  (function () {
    $pwdReg.blur(function () {
      $(this).siblings('p').remove();
      if ($pwdReg.val() === '') {
        $pwdReg.after('<p class="j-note-login-err">密码不能为空</p>');
        add_class($pwdReg);
      }
    })
  })();

  (function () {
    $pwdRegSec.blur(function () {
      $(this).siblings('p').remove();
      if ($pwdRegSec.val() !== $pwdReg.val()) {
        $pwdRegSec.after('<p class="j-note-login-err">两次输入密码不一致</p>');
        add_class($pwdRegSec);
      }
    })
  })();
  /**
   * 工具函数
   */
  function add_class($who) { // 添加class
    $who.addClass('border-red');
  }
  function remove_class($who) { // 移除class
    $who.removeClass('border-red');
  }
  function input_keydown($who) {
    if ($who.siblings('p')) {
      $who.siblings('p').remove();
    }
    if ($who.hasClass('border-red')) {
      // $(this).removeClass('border-red');
      remove_class($who);
    }
  }
});


