define([
  "knockout",
  "service",
  "jquery",
  "config/config",
  "underscore",
], function (a, e, n, r, t) {
  function i(a) {
    (window.CURRENT_LANGUAGE = a),
      n("body").attr("lang", a),
      "zh-cn" == a
        ? n("#privacy_a").attr(
            "href",
            "https://www.ztedevices.com/cn/Privacy-Policy/ZTESmartRouterPrivacyPolicy"
          )
        : n("#privacy_a").attr(
            "href",
            "https://www.ztedevices.com/en/Privacy-Policy/ZTESmartRouterPrivacyPolicy"
          ),
      n.i18n.properties({
        name: "Messages",
        path: "i18n/",
        mode: "map",
        cache: !0,
        language: a,
        callback: function () {
          (jQuery.validator.messages = n.i18n.map), n("body").translate();
        },
      });
  }
  function c() {
    var c = this,
      u = o();
    (rd0 = u.rd_params0), (rd1 = u.rd_params1);
    var g = t.map(r.LANGUAGES, function (a) {
      return new Option(a.name, a.value);
    });
    (c.showLanguage = a.observable(r.LANGUAGES.length > 1)),
      (document.title = r.WEBUI_TITLE),
      n("#webui_title")[0] && n("#webui_title").html(r.WEBUI_TITLE),
      (c.languages = a.observableArray(g)),
      (c.currentLan = a.observable(u.Language)),
      (c.langChangeHandler = function (a, n) {
        clearValidateMsg(),
          e.setLanguage({ Language: c.currentLan() }, function () {
            i(c.currentLan());
          });
      }),
      i(c.currentLan());
  }
  function o() {
    return e.getLanguage();
  }
  function u() {
    a.applyBindings(new c(), n("#language")[0]);
  }
  return { init: u };
});
//# sourceMappingURL=../sourcemaps/language.js.map
