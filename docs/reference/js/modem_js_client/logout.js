define([
  "knockout",
  "service",
  "jquery",
  "config/config",
  "underscore",
], function (n, o, t, e, i) {
  function u() {
    var i = this,
      u = s();
    (i.loggedIn = n.observable(u)),
      (i.isUfi = n.observable(-1 != e.DEVICE.toLowerCase().indexOf("ufi"))),
      (i.showLogout = function () {
        return 0 != e.HAS_LOGIN && i.loggedIn();
      }),
      (i.IsAdminUser = n.observable()),
      "user1" == o.getUserInfo().web_current_account
        ? i.IsAdminUser(!1)
        : i.IsAdminUser(!0),
      (i.shutdown = function () {
        showConfirm("shutdown_confirm", function () {
          showLoading("processing"),
            o.shutdown(
              {},
              function (n) {
                n && "success" == n.result
                  ? (successOverlay(),
                    o.logout({}, function () {
                      window.location = "index.html";
                    }))
                  : errorOverlay();
              },
              t.noop
            );
        });
      }),
      (i.logout = function () {
        showConfirm("confirm_logout", function () {
          (manualLogout = !0),
            o.logout({}, function () {
              window.location = "index.html";
            });
        });
      });
  }
  function s() {
    return "loggedIn" == o.getLoginStatus().status;
  }
  function r() {
    n.applyBindings(new u(), t("#logout")[0]);
  }
  return { init: r };
});
//# sourceMappingURL=../sourcemaps/logout.js.map
