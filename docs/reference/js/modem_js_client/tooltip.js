define(["jquery"], function (t) {
  function i() {
    t(".statusItem, #h_ssid")
      .each(function (i, o) {
        var e = t(this);
        e.attr("tipTitle", e.attr("title")).removeAttr("title");
      })
      .hover(
        function () {
          var i = t(this),
            e = i.attr("tipTitle"),
            r = void 0 != i.attr("tipTitle2") ? i.attr("tipTitle2") : "",
            n = t("<div>")
              .addClass("tooltip in")
              .appendTo(document.body)
              .hide()
              .append(i.attr("i18n") ? t.i18n.prop(e) + r : e);
          i.attr("i18n") &&
            n.attr("data-trans", e).attr("id", "tooltip_" + i.attr("id"));
          var a = o(i, n, { position: ["bottom", "center"], offset: [0, 0] });
          n.css({ position: "absolute", top: a.top, left: a.left }).show();
        },
        function () {
          t(".tooltip").hide().remove();
        }
      );
  }
  function o(i, o, e) {
    var r = i.offset().top,
      n = i.offset().left,
      a = e.position[0];
    (r -= o.outerHeight() - e.offset[0]),
      (n += i.outerWidth() + e.offset[1]),
      /iPad/i.test(navigator.userAgent) && (r -= t(window).scrollTop());
    var s = o.outerHeight() + i.outerHeight();
    "center" == a && (r += s / 2),
      "bottom" == a && (r += s),
      (a = e.position[1]);
    var f = o.outerWidth() + i.outerWidth();
    return (
      "center" == a && (n -= f / 2),
      "left" == a && (n -= f),
      { top: r, left: n }
    );
  }
  return { init: i };
});
//# sourceMappingURL=../sourcemaps/tooltip.js.map
