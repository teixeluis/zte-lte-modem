define([
  "jquery",
  "knockout",
  "config/config",
  "service",
  "underscore",
  "config/menu",
  "logout",
  "status/statusBar",
], function (e, t, o, n, r, s, i, a) {
  function u() {
    return setInterval(function () {
      if (!n.getStatusInfo().isLoggedIn) return void _();
      lastLoginStatus = n.getStatusInfo().isLoggedIn ? "1" : "0";
    }, 1e3);
  }
  function c() {
    function r() {
      var e = n.getLoginData(),
        t = n.getLoginStatus(),
        o = c(t, e);
      o == d.LOADING
        ? addTimeout(r, 500)
        : (I.pageState(o), I.pinNumber(e.pinnumber), I.pukNumber(e.puknumber)),
        s();
    }
    function s() {
      setTimeout(function () {
        var t = e("#txtUserName:visible"),
          o = e("#txtRestorePwd:visible"),
          n = e("#txtPIN:visible"),
          r = e("#txtPUK:visible");
        t.length > 0
          ? t.focus()
          : o.length > 0
          ? o.focus()
          : n.length > 0
          ? n.focus()
          : r.length > 0 && r.focus();
      }, 100);
    }
    function c(e, t) {
      return o.LOGIN_THEN_CHECK_PIN ? l(e, t) : _(e, t);
    }
    function l(t, n) {
      if ("loggedIn" == t.status)
        return "modem_waitpin" == r
          ? d.WAIT_PIN
          : ("modem_waitpuk" != r && 0 != n.pinnumber) || 0 == n.puknumber
          ? (0 != n.puknumber && "modem_sim_destroy" != r) ||
            "modem_sim_undetected" == r ||
            "modem_undetected" == r
            ? d.LOGGEDIN
            : d.PUK_LOCKED
          : d.WAIT_PUK;
      var r = n.modem_main_state;
      return -1 != e.inArray(r, o.TEMPORARY_MODEM_MAIN_STATE)
        ? d.LOADING
        : d.LOGIN;
    }
    function _(t, n) {
      if ("loggedIn" == t.status) return d.LOGGEDIN;
      var r = n.modem_main_state;
      return -1 != e.inArray(r, o.TEMPORARY_MODEM_MAIN_STATE)
        ? d.LOADING
        : "modem_waitpin" == r
        ? d.WAIT_PIN
        : ("modem_waitpuk" != r && 0 !== parseInt(n.pinnumber)) ||
          0 == parseInt(n.puknumber)
        ? (0 !== parseInt(n.puknumber) && "modem_sim_destroy" != r) ||
          "modem_sim_undetected" == r ||
          "modem_undetected" == r
          ? d.LOGIN
          : d.PUK_LOCKED
        : d.WAIT_PUK;
    }
    var I = this;
    I.visibility = o.INCLUDE_MOBILE ? "visible" : "hidden";
    var w = n.getLoginData();
    I.userName = t.observable();
    var L = n.getLoginStatus();
    (I.password = t.observable()),
      (I.PIN = t.observable()),
      (I.PUK = t.observable()),
      (I.newPIN = t.observable()),
      (I.confirmPIN = t.observable()),
      (I.pinNumber = t.observable(w.pinnumber)),
      (I.pukNumber = t.observable(w.puknumber)),
      (I.loginCount = t.observable(0)),
      (I.loginSecuritySupport = t.observable(o.LOGIN_SECURITY_SUPPORT)),
      (I.leftSeconds = t.observable(0)),
      (I.accountLocked = t.computed(function () {
        return I.loginCount() == o.MAX_LOGIN_COUNT && "-1" != I.leftSeconds();
      })),
      (I.uiLoginTimer = t.observable(300)),
      (I.leftUnlockTime = t.computed(function () {
        I.leftSeconds();
        var e = transSecond2Time(I.uiLoginTimer());
        return e.substring(e.indexOf(":") + 1, e.length);
      })),
      (I.restorePassword = t.observable()),
      (I.restoreCount = t.observable(0)),
      (I.leftRestoreSeconds = t.observable(0)),
      (I.accountRestoreLocked = t.computed(function () {
        return (
          I.restoreCount() == o.MAX_RESTORE_COUNT &&
          "-1" != I.leftRestoreSeconds()
        );
      })),
      (I.uiRestoreTimer = t.observable(600)),
      (I.leftRestoreUnlockTime = t.computed(function () {
        I.leftRestoreSeconds();
        var e = transSecond2Time(I.uiRestoreTimer());
        return e.substring(e.indexOf(":") + 1, e.length);
      })),
      (I.showEntrance = t.observable(!1)),
      (I.sharePathInvalid = t.observable(!1)),
      (I.redirectCause = t.observable("")),
      a.setRedirectTips(!1),
      o.SD_CARD_SUPPORT &&
        n.getSDConfiguration({}, function (e) {
          I.showEntrance(
            "1" == e.sd_status && "1" == e.share_status && "0" == e.sd_mode
          ),
            I.showEntrance() &&
              n.checkFileExists({ path: e.share_file }, function (e) {
                "exist" == e.status
                  ? I.sharePathInvalid(!1)
                  : I.sharePathInvalid(!0);
              });
        });
    var p = c(L, w);
    (I.pageState = t.observable(p)),
      p == d.LOADING && addTimeout(r, 500),
      s(),
      (I.showPassword = t.observable(!1)),
      (I.showPasswordHandler = function () {
        e("#txtPwdShow").parent().find(".error").hide();
        var t = e("#showPasswordLogin:checked");
        t && 0 == t.length ? I.showPassword(!0) : I.showPassword(!1);
      }),
      (I.showRestorePassword = t.observable(!1)),
      (I.showRestorePasswordHandler = function () {
        e("#txtRestorePwdShow").parent().find(".error").hide();
        var t = e("#showPasswordRestore:checked");
        t && 0 == t.length
          ? I.showRestorePassword(!0)
          : I.showRestorePassword(!1);
      }),
      (I.login = function () {
        if ("" == rd0 || "" == rd1) {
          var t = n.getLanguage();
          (rd0 = t.rd_params0), (rd1 = t.rd_params1);
        }
        if (o.LOGIN_SECURITY_SUPPORT && I.accountLocked())
          return (
            showAlert("password_error_account_lock_time", function () {
              s();
            }),
            !1
          );
        I.pageState(d.LOADING),
          window.clearInterval(g),
          n.login(
            { userName: I.userName(), password: I.password() },
            function (t) {
              setTimeout(function () {
                g = u();
              }, 1300),
                "5" == t.result
                  ? (showAlert("lcd_loginfo", function () {
                      s();
                    }),
                    I.pageState(d.LOGIN))
                  : t.result
                  ? (I.pageState(d.LOGGEDIN),
                    o.LOGIN_SECURITY_SUPPORT &&
                      (I.loginCount(0), I.uiLoginTimer(300), clearInterval(m)),
                    e("#container").empty(),
                    a.gotoRelevantHashByFlag(),
                    i.init())
                  : (I.password(""),
                    o.LOGIN_SECURITY_SUPPORT
                      ? I.checkLoginData(function () {
                          I.loginCount() == o.MAX_LOGIN_COUNT
                            ? (showAlert(
                                "password_error_five_times",
                                function () {
                                  s();
                                }
                              ),
                              I.startLoginLockInterval())
                            : showAlert(
                                {
                                  msg: "password_error_left",
                                  params: [o.MAX_LOGIN_COUNT - I.loginCount()],
                                },
                                function () {
                                  s();
                                }
                              );
                        })
                      : showAlert("password_error", function () {
                          s();
                        }),
                    I.pageState(d.LOGIN));
            }
          );
      }),
      (I.startLoginLockInterval = function () {
        m = setInterval(function () {
          n.getLoginData({}, function (e) {
            (e.login_lock_time <= 0 || 5 == e.psw_fail_num_str) &&
              (I.loginCount(0), clearInterval(m)),
              I.leftSeconds() != e.login_lock_time
                ? (I.leftSeconds(e.login_lock_time),
                  I.uiLoginTimer(e.login_lock_time))
                : I.uiLoginTimer(
                    I.uiLoginTimer() > 0 ? I.uiLoginTimer() - 1 : 0
                  );
          });
        }, 1e3);
      }),
      (I.checkLoginData = function (t) {
        n.getLoginData({}, function (n) {
          var r = parseInt(n.psw_fail_num_str, 10);
          I.loginCount(o.MAX_LOGIN_COUNT - r),
            I.leftSeconds(n.login_lock_time),
            I.uiLoginTimer(n.login_lock_time),
            e.isFunction(t)
              ? t()
              : I.loginCount() == o.MAX_LOGIN_COUNT &&
                I.startLoginLockInterval();
        });
      }),
      I.checkLoginData(),
      (I.enterPIN = function () {
        I.pageState(d.LOADING);
        var e = I.PIN();
        n.enterPIN({ PinNumber: e }, function (e) {
          e.result
            ? r()
            : (showAlert("pin_error", function () {
                r();
              }),
              I.PIN(""));
        });
      }),
      (I.enterPUK = function () {
        I.pageState(d.LOADING);
        var e = I.newPIN(),
          t = (I.confirmPIN(), {});
        (t.PinNumber = e),
          (t.PUKNumber = I.PUK()),
          n.enterPUK(t, function (e) {
            e.result
              ? r()
              : (showAlert("puk_error", function () {
                  r();
                }),
                I.PUK(""),
                I.newPIN(""),
                I.confirmPIN(""));
          });
      }),
      (I.restoreLogin = function () {
        if (I.accountRestoreLocked())
          return (
            showAlert("password_error_account_lock_time", function () {
              s();
            }),
            !1
          );
        I.pageState(d.LOADING),
          n.restoreFactorySettingsLogin(
            { password: I.restorePassword() },
            function (e) {
              e.result
                ? (I.pageState(d.RESTORE),
                  I.restoreCount(0),
                  I.uiRestoreTimer(600),
                  clearInterval(f),
                  showLoading("restoring"))
                : (I.restorePassword(""),
                  I.checkRestoreData(function () {
                    I.restoreCount() == o.MAX_RESTORE_COUNT
                      ? (showAlert("password_error_five_times", function () {
                          s();
                        }),
                        I.startRestoreLockInterval())
                      : showAlert(
                          {
                            msg: "password_error_left",
                            params: [o.MAX_RESTORE_COUNT - I.restoreCount()],
                          },
                          function () {
                            s();
                          }
                        );
                  }),
                  I.pageState(d.RESTORE));
            }
          );
      }),
      (I.startRestoreLockInterval = function () {
        f = setInterval(function () {
          n.getRestoreFactorySettingsLoginInfo({}, function (e) {
            (e.reset_operate_lock_time <= 0 || 5 == e.reset_pwd_fail_num_str) &&
              (I.restoreCount(0), clearInterval(f)),
              I.leftRestoreSeconds() != e.reset_operate_lock_time
                ? (I.leftRestoreSeconds(e.reset_operate_lock_time),
                  I.uiRestoreTimer(e.reset_operate_lock_time))
                : I.uiRestoreTimer(
                    I.uiRestoreTimer() > 0 ? I.uiRestoreTimer() - 1 : 0
                  );
          });
        }, 1e3);
      }),
      (I.checkRestoreData = function (t) {
        n.getRestoreFactorySettingsLoginInfo({}, function (n) {
          var r = parseInt(n.reset_pwd_fail_num_str, 10);
          I.restoreCount(o.MAX_RESTORE_COUNT - r),
            I.leftRestoreSeconds(n.reset_operate_lock_time),
            I.uiRestoreTimer(n.reset_operate_lock_time),
            e.isFunction(t)
              ? t()
              : I.restoreCount() == o.MAX_RESTORE_COUNT &&
                I.startRestoreLockInterval();
        });
      }),
      I.checkRestoreData(),
      (I.goToRestoreHandler = function () {
        I.pageState(d.RESTORE),
          I.checkRestoreData(),
          e("#txtRestorePwd").val(""),
          e("#txtRestoreShow").val(""),
          s();
      }),
      (I.goToLoginHandler = function () {
        I.pageState(d.LOGIN), s();
      });
  }
  function l() {
    if (n.getStatusInfo().isLoggedIn)
      return void (window.location.hash = "#home");
    var o = e("#container")[0];
    t.cleanNode(o);
    var r = new c();
    t.applyBindings(r, o),
      e("#frmLogin").validate({
        submitHandler: function () {
          r.login();
        },
        rules: {
          txtPwd: "login_password_length_check",
          txtPwdShow: "login_password_length_check",
        },
      }),
      e("#frmRestore").validate({
        submitHandler: function () {
          r.restoreLogin();
        },
        rules: {
          txtRestorePwd: "login_password_length_check",
          txtRestorePwdShow: "login_password_length_check",
        },
      }),
      e("#frmPIN").validate({
        submitHandler: function () {
          r.enterPIN();
        },
        rules: { txtPIN: "pin_check" },
      }),
      e("#frmPUK").validate({
        submitHandler: function () {
          r.enterPUK();
        },
        rules: {
          txtNewPIN: "pin_check",
          txtConfirmPIN: { equalToPin: "#txtNewPIN" },
          txtPUK: "puk_check",
        },
      });
  }
  function _() {
    if (
      window.location.hash != o.defaultRoute &&
      -1 == r.indexOf(o.GUEST_HASH, window.location.hash)
    )
      if (manualLogout || "1" != lastLoginStatus) {
        if ("UNREAL" == lastLoginStatus) return;
        window.location = "index.html";
      } else
        (manualLogout = !1),
          (lastLoginStatus = "UNREAL"),
          showAlert("need_login_again", function () {
            window.location = "index.html";
          });
  }
  var d = {
      LOGIN: 0,
      WAIT_PIN: 1,
      WAIT_PUK: 2,
      PUK_LOCKED: 3,
      LOGGEDIN: 4,
      LOADING: 5,
      RESTORE: 6,
    },
    g = u(),
    m = 0,
    f = 0;
  return { init: l, gotoLogin: _ };
});
//# sourceMappingURL=../sourcemaps/login.js.map
