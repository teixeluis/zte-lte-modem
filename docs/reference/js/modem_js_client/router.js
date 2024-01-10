define([
  "config/menu",
  "jquery",
  "config/config",
  "service",
  "underscore",
], function (o, n, a, e, t) {
  function i() {
    s(),
      (window.location.hash = window.location.hash || "#home"),
      "onhashchange" in window &&
      (void 0 === document.documentMode || 8 == document.documentMode)
        ? ((window.onhashchange = r), r())
        : setInterval(r, 200),
      n("a[href^='#']")
        .die("click")
        .live("click", function () {
          var o = n(this);
          return (
            a.CONTENT_MODIFIED.checkChangMethod(),
            checkFormContentModify(o.attr("href"))
          );
        });
  }
  function s() {
    setInterval(function () {
      var a = e.getStatusInfo(),
        t = o.findMenu();
      if (0 == t.length) return !1;
      var i = ["phonebook/phonebook", "sms/smslist"],
        s = -1 != n.inArray(t[0].path, i);
      if (!0 === t[0].checkSIMStatus) {
        var d =
            "modem_sim_undetected" == a.simStatus ||
            "modem_sim_destroy" == a.simStatus ||
            "modem_waitpin" == a.simStatus ||
            "modem_waitpuk" == a.simStatus,
          r = "modem_imsi_waitnck" == a.simStatus;
        a.isLoggedIn &&
          ((void 0 == n("#div-nosimcard")[0] && d) ||
            (void 0 == n("#div-network-lock")[0] && r) ||
            ((void 0 != n("#div-nosimcard")[0] ||
              void 0 != n("#div-network-lock")[0]) &&
              "modem_init_complete" == a.simStatus)) &&
          c(t[0], a.simStatus, s);
      }
    }, 1e3);
  }
  function d() {
    var o = window.location.hash;
    if (
      ("#login" == o || -1 != t.indexOf(a.GUEST_HASH, o)
        ? n("#themeContainer").attr("style", "margin-top:-36px;")
        : n("#themeContainer").attr("style", "margin-top:0px;"),
      "#login" == window.location.hash)
    )
      n("#mainContainer").addClass("loginBackgroundBlue");
    else {
      var e = n("#mainContainer");
      e.hasClass("loginBackgroundBlue") &&
        (n("#container").css({ margin: 0 }),
        e.removeClass("loginBackgroundBlue").height("auto"));
    }
  }
  function r() {
    function i() {
      var o = e.getStatusInfo();
      void 0 == o.simStatus ||
      -1 != n.inArray(o.simStatus, a.TEMPORARY_MODEM_MAIN_STATE)
        ? addTimeout(i, 500)
        : (c(u[0], o.simStatus, _), hideLoading());
    }
    if (window.location.hash != m) {
      var s = e.getStatusInfo();
      if (
        (window.location.hash == a.defaultRoute ||
          -1 != t.indexOf(a.GUEST_HASH, window.location.hash)) &&
        s.isLoggedIn
      )
        return void (window.location.hash = "" == m ? "#home" : m);
      var r = e.getParams({ nv: ["privacy_read_flag"] }),
        l = (e.getParams({ nv: ["password_remind"] }), e.getUserInfo());
      "0" == r.privacy_read_flag && s.isLoggedIn && a.HAS_GDPR
        ? "user2" == l.web_current_account && "1" == l.admin_password_changed
          ? (window.location.hash = "#change_password")
          : (window.location.hash = "#home")
        : s.isLoggedIn &&
          ("user2" == l.web_current_account && "1" == l.admin_password_changed
            ? (window.location.hash = "#change_password")
            : "#change_password" == window.location.hash &&
              (window.location.hash = "#home"));
      var u = o.findMenu();
      if (0 == u.length) window.location.hash = a.defaultRoute;
      else {
        var w = o.findMenu(m);
        if (
          ((m = u[0].hash),
          "#login" == m
            ? (n("#indexContainer").addClass("login-page-bg"), o.rebuild())
            : n("#indexContainer").removeClass("login-page-bg"),
          0 != w.length &&
            u[0].path == w[0].path &&
            u[0].level != w[0].level &&
            "1" != u[0].level &&
            "1" != w[0].level)
        )
          return;
        d();
        var g = ["phonebook/phonebook", "sms/smslist"],
          _ = -1 != n.inArray(u[0].path, g);
        !0 === u[0].checkSIMStatus || _HAS_LOGIN
          ? void 0 == s.simStatus
            ? (showLoading("waiting"), i())
            : c(u[0], s.simStatus, _)
          : h(u[0]);
      }
    }
  }
  function c(o, a, e) {
    var t = {};
    n.extend(t, o),
      "modem_sim_undetected" == a || "modem_sim_destroy" == a
        ? e || (t.path = "nosimcard")
        : "modem_waitpin" == a || "modem_waitpuk" == a
        ? (t.path = "nosimcard")
        : "modem_imsi_waitnck" == a && (t.path = "network_lock"),
      h(t);
  }
  function h(a) {
    var e = a.path.replace(/\//g, "_"),
      t = n("body").removeClass();
    "nosimcard" == e || "network_lock" == e
      ? t.addClass("beautiful_bg page_" + e)
      : t.addClass("page_" + e),
      clearTimer(),
      hideLoading();
    var i = "text!tmpl/" + a.path + ".html";
    require([i, a.path], function (a, e) {
      l.stop(!0, !0),
        l.hide(),
        l.html(a),
        e.init(),
        o.refreshMenu(),
        n("#container").translate(),
        o.activeSubMenu(),
        n("form").attr("autocomplete", "off"),
        l.fadeIn();
    });
  }
  var m = "",
    l = n("#container");
  return (
    (checkFormContentModify = function (o) {
      return (
        !a.CONTENT_MODIFIED.modified ||
        window.location.hash == o ||
        ("sms_to_save_draft" == a.CONTENT_MODIFIED.message
          ? (a.CONTENT_MODIFIED.callback.ok(a.CONTENT_MODIFIED.data),
            a.resetContentModifyValue(),
            (window.location.hash = o))
          : showConfirm(a.CONTENT_MODIFIED.message, {
              ok: function () {
                a.CONTENT_MODIFIED.callback.ok(a.CONTENT_MODIFIED.data),
                  a.resetContentModifyValue(),
                  (window.location.hash = o);
              },
              no: function () {
                a.CONTENT_MODIFIED.callback.no(a.CONTENT_MODIFIED.data) ||
                  ((window.location.hash = o), a.resetContentModifyValue());
              },
            }),
        !1)
      );
    }),
    { init: i }
  );
});
//# sourceMappingURL=../sourcemaps/router.js.map
