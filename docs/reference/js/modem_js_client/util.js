function log(e, t) {
  _printLog("log", e, t);
}
function debug(e, t) {
  _printLog("debug", e, t);
}
function _printLog(e, t, n) {
  if (!$.browser.msie && window.console) {
    if (n && "object" == typeof t && "object" == typeof n) {
      var r = t;
      $.extend(r, n);
    }
    "debug" == e
      ? window.console.debug
        ? window.console.debug(t)
        : window.console.warn && window.console.warn(t)
      : window.console.info(t);
  }
}
function isErrorObject(e) {
  return "string" == typeof e.errorType;
}
function clearValidateMsg(e) {
  (e = e || "*"), $(e + " label.error").remove();
}
function transOption(e, t) {
  return t
    ? function (t) {
        if (0 != t.value) {
          var n = t.value.split("_");
          return n[1] + "MHz " + $.i18n.prop(e + "_" + n[0]);
        }
        return $.i18n.prop(e + "_0");
      }
    : function (t) {
        return $.i18n.prop(e + "_" + t.value);
      };
}
function successOverlay(e, t) {
  showOverLay(e || "success_info", "overlay-success", !t);
}
function errorOverlay(e, t) {
  showOverLay(e || "error_info", "overlay-error", !t);
}
function showOverLay(e, t, n) {
  $.modal.close(),
    e &&
      ($("#result-image", "#result-overlay").removeClass().addClass(t),
      $("#result_wording").html("<h2>" + $.i18n.prop(e) + "</h2>")),
    $("#result-overlay").modal({
      zIndex: 3e3,
      position: ["30%"],
      overlayId: "confirm-overlay",
      containerId: "confirm-container",
      minHeight: 140,
      persist: !0,
      focus: !1,
      escClose: !1,
    });
  var r = 3,
    o = setInterval(function () {
      0 == --r &&
        (clearInterval(o),
        $("#result-overlay:visible").length > 0 &&
          ($("#confirm-overlay").css("cursor", "default"), $.modal.close()));
    }, 1e3);
}
function showProgressBar(e, t) {
  e && $("#barMsg").html($.i18n.prop(e)),
    $("#progress").modal({
      zIndex: 3e3,
      position: ["30%"],
      overlayId: "confirm-overlay",
      containerId: "confirm-container",
      minHeight: 140,
      persist: !0,
      focus: !1,
      escClose: !1,
    }),
    t
      ? $("#progress #progress_container").html(t)
      : $("#progress #progress_container").html("");
}
function setProgressBar(e) {
  jQuery("#bar").width((400 * e) / 100), jQuery("#barValue").text(e + "%");
}
function hideProgressBar() {
  $.modal.close(), setProgressBar(0), $("#barMsg").html("");
}
function showLoading(e, t, n) {
  e ? $("#loadMsg").html($.i18n.prop(e)) : $("#loadMsg").html(""),
    $("#loading").modal({
      zIndex: 3e3,
      position: ["30%"],
      overlayId: "confirm-overlay",
      containerId: "confirm-container",
      minHeight: 140,
      persist: !0,
      focus: !1,
      escClose: !1,
    });
  var r = $("#loading #loading_container"),
    o = "<a href='javascript:void(0)'>&nbsp;</a>";
  t ? r.html(t + o) : r.html(o),
    n
      ? $("#loading #loading_wording").html($.i18n.prop(n))
      : $("#loading #loading_wording").html(""),
    $("a:last", r).focus().hide();
}
function loadingMsgChange(e) {
  $("#loadMsg").html($.i18n.prop(e));
}
function hideLoading() {
  $("#confirm-overlay").css("cursor", "default"),
    $.modal.close(),
    $("#loadMsg").html("");
}
function getRandomInt(e) {
  return Math.round(Math.random() * e);
}
function getCurrentDatetime() {
  var e = new Date();
  return (
    e.getFullYear() +
    "/" +
    (e.getMonth() + 1) +
    "/" +
    e.getDate() +
    " " +
    e.getHours() +
    ":" +
    e.getMinutes() +
    ":" +
    e.getSeconds()
  );
}
function getRandomDatetime() {
  var e = new Date();
  return (
    e.getFullYear() +
    "/" +
    (e.getMonth() + 1) +
    "/" +
    e.getDate() +
    " " +
    getRandomInt(24) +
    ":" +
    getRandomInt(60) +
    ":" +
    getRandomInt(60)
  );
}
function getRandomDatetimeSep() {
  var e = new Date();
  return (
    e.getFullYear() +
    "," +
    (e.getMonth() + 1) +
    "," +
    e.getDate() +
    "," +
    getRandomInt(24) +
    "," +
    getRandomInt(60) +
    "," +
    getRandomInt(60)
  );
}
function getCurrentTimeString(e) {
  var t = "",
    n = e || new Date();
  return (
    (t += (n.getFullYear() + "").substring(2) + ";"),
    (t +=
      getTwoDigit(n.getMonth() + 1) +
      ";" +
      getTwoDigit(n.getDate()) +
      ";" +
      getTwoDigit(n.getHours()) +
      ";" +
      getTwoDigit(n.getMinutes()) +
      ";" +
      getTwoDigit(n.getSeconds()) +
      ";"),
    n.getTimezoneOffset() < 0
      ? (t += "+" + (0 - n.getTimezoneOffset() / 60))
      : (t += 0 - n.getTimezoneOffset() / 60),
    t
  );
}
function getTwoDigit(e) {
  for (e += ""; e.length < 2; ) e = "0" + e;
  return e;
}
function showConfirm(e, t, n, r, o) {
  r
    ? $("#yesbtn").attr("data-trans", r)
    : $("#yesbtn").attr("data-trans", "yes"),
    o
      ? $("#nobtn").attr("data-trans", o)
      : $("#nobtn").attr("data-trans", "no"),
    $("#yesbtn, #nobtn").translate(),
    popup({ title: "confirm", img: "img/confirm.png", msg: e, minHeight: n }),
    $("#yesbtn, #nobtn").show(),
    $("#okbtn").hide();
  var i = $.isFunction(t),
    a = $.isPlainObject(t);
  $("#yesbtn")
    .unbind("click")
    .click(function () {
      $.modal.close(), i ? t() : a && $.isFunction(t.ok) && t.ok();
    }),
    $("#nobtn")
      .unbind("click")
      .click(function () {
        $.modal.close(), a && $.isFunction(t.no) && t.no();
      });
}
function showPrompt(e, t, n, r) {
  popup({
    title: "prompt",
    img: "img/confirm.png",
    msg: e,
    minHeight: n,
    showInput: !0,
    defaultValue: r,
  }),
    $("#yesbtn, #nobtn").unbind("click").show(),
    $("#okbtn").hide(),
    $("#yesbtn").click(function () {
      $.isFunction(t) && t() && $.modal.close();
    }),
    $("#nobtn").click(function () {
      $.modal.close();
    }),
    $("#promptInput", "#confirm")
      .unbind("keypress")
      .bind("keypress", function (e) {
        13 == e.keyCode && $("#yesbtn").trigger("click");
      });
}
function showPromptNoImg(e, t, n, r) {
  popup({ title: "prompts", img: "img/alert.png", msg: e, minHeight: n }),
    $("#yesbtn, #nobtn").hide(),
    $("#okbtn")
      .unbind("click")
      .click(function () {
        $.modal.close(), $.isFunction(t) && t();
      })
      .show();
}
function showAlert(e, t, n) {
  popup({ title: "alert", img: "img/alert.png", msg: e, minHeight: n }),
    $("#yesbtn, #nobtn").hide(),
    $("#okbtn")
      .unbind("click")
      .click(function () {
        $.modal.close(), $.isFunction(t) && t();
      })
      .show();
}
function showSettingWindow(e, t, n, r, o, i) {
  var a = { title: e, htmlPath: t, jsPath: n, minHeight: o, minWidth: r };
  $.isFunction(i), $.isPlainObject(i);
  popupSettingWindow(a);
}
function popupSettingWindow(e) {
  $.modal.close();
  var t = e.minHeight || 140,
    n = e.minWidth || 400,
    r = $("#htmlContainer"),
    o = "text!tmpl/" + e.htmlPath + ".html";
  require([o, e.jsPath], function (e, t) {
    r.stop(!0, !0),
      r.hide(),
      r.html(e),
      t.init(),
      $("#htmlContainer").translate(),
      r.show(),
      $("#htmlContainer").css("opacity", 50);
  }),
    $("#popupSettingWindow").modal({
      zIndex: 3e3,
      position: ["2%"],
      escClose: !1,
      minWidth: n,
      minHeight: t,
      maxWidth: 400,
      opacity: 50,
    });
}
function hidePopupSettingWindow() {
  $("#popupSettingWindow").remove(), $.modal.close();
}
function showInfo(e, t, n) {
  popup({ title: "info", img: "img/info.png", msg: e, minHeight: n }),
    $("#yesbtn, #nobtn").hide(),
    $("#okbtn")
      .unbind("click")
      .click(function () {
        $.modal.close(), $.isFunction(t) && t();
      })
      .show();
}
function popup(e) {
  if ($("#popupModifyFotaSetWindow").is(":visible")) return !1;
  $.modal.close();
  var t = e.minHeight || 140;
  $("#confirm").modal({
    zIndex: 3e3,
    position: ["30%"],
    overlayId: "confirm-overlay",
    containerId: "confirm-container",
    escClose: !1,
    minHeight: t,
  });
  var n = $("div#confirm");
  if (
    ($("#confirmImg", n).attr("src", e.img),
    $("#popTitle", n).html($.i18n.prop(e.title)),
    "string" == typeof e.msg)
  )
    $(".message", n).html($.i18n.prop(e.msg));
  else {
    var r = [e.msg.msg];
    r.push(e.msg.params),
      $(".message", n).html($.i18n.prop.apply(null, _.flatten(r)));
  }
  var o = $("div.promptDiv", n);
  !0 === e.showInput
    ? (o.show(),
      $("input#promptInput", o).val(e.defaultValue ? e.defaultValue : ""),
      $(".promptErrorLabel", o).empty())
    : o.hide(),
    window.setTimeout(function () {
      $(":input:enabled:visible:first", "#confirm-container").focus();
    }, 0);
}
function addTimeout(e, t) {
  var n = window.setTimeout(e, t);
  return _timeoutStack.push(n), n;
}
function addInterval(e, t) {
  var n = window.setInterval(e, t);
  return _intervalStack.push(n), n;
}
function clearTimer() {
  clearTimeoutTimer(), clearIntervalTimer();
}
function clearTimeoutTimer() {
  for (var e = 0; e < _timeoutStack.length; e++)
    window.clearTimeout(_timeoutStack[e]);
  _timeoutStack = [];
}
function clearIntervalTimer() {
  for (var e = 0; e < _intervalStack.length; e++)
    window.clearInterval(_intervalStack[e]);
  _intervalStack = [];
}
function renderCheckbox() {
  var e = $(".checkboxToggle");
  e.each(function () {
    checkBoxesSize($(this));
  });
  var t = $(".checkbox")
    .not("[class*='checkboxToggle']")
    .find("input:checkbox");
  0 == t.length ? disableCheckbox(e) : enableCheckbox(e),
    t.each(function () {
      checkCheckbox($(this));
    });
}
function checkBoxesSize(e) {
  var t = e.attr("target"),
    n = $("#" + t + " .checkbox input:checkbox").length,
    r = $("#" + t + " .checkbox input:checkbox:checked").length,
    o = e.find("input:checkbox");
  0 != n && n == r ? o.attr("checked", "checked") : o.removeAttr("checked"),
    checkP(o);
}
function checkSelectAll(e, t) {
  var n = $("#" + t + " .checkbox input:checkbox");
  e.attr("checked") ? n.attr("checked", "checked") : n.removeAttr("checked"),
    n.each(function () {
      checkCheckbox($(this));
    });
}
function checkCheckbox(e) {
  e.closest("p.checkbox").hasClass("checkboxToggle") &&
    checkSelectAll(e, e.closest("p.checkbox").attr("target")),
    checkP(e),
    checkBoxesSize($("#" + e.attr("target")));
}
function checkP(e) {
  e.attr("checked")
    ? e.closest("p.checkbox").addClass("checkbox_selected")
    : e.closest("p.checkbox").removeClass("checkbox_selected");
}
function removeChecked(e) {
  $("#" + e)
    .removeClass("checkbox_selected")
    .find("input:checkbox")
    .removeAttr("checked");
}
function disableCheckbox(e) {
  e.find("input:checkbox").attr("checked")
    ? e.addClass("checked_disable")
    : e.addClass("disable");
}
function enableCheckbox(e) {
  e.removeClass("disable").removeClass("checked_disable");
}
function tryToDisableCheckAll(e, t) {
  0 == t ? disableCheckbox(e) : enableCheckbox(e);
}
function getEncodeType(e) {
  var t = "GSM7_default",
    n = 0;
  if (!e) return { encodeType: t, extendLen: n };
  for (var r = 0; r < e.length; r++) {
    for (var o = e.charCodeAt(r).toString(16).toUpperCase(); 4 != o.length; )
      o = "0" + o;
    if (
      (-1 != $.inArray(o, GSM7_Table_Extend) && n++,
      -1 == $.inArray(o, GSM7_Table))
    ) {
      (t = "UNICODE"), (n = 0);
      break;
    }
  }
  return { encodeType: t, extendLen: n };
}
function encodeMessage(e) {
  var t = 0,
    n = "";
  if (!e) return n;
  for (var r = 0; r < e.length; r++) {
    var o = e.charCodeAt(r);
    if (0 != t) {
      if (56320 <= o && o <= 57343) {
        (n += dec2hex(65536 + ((t - 55296) << 10) + (o - 56320))), (t = 0);
        continue;
      }
      t = 0;
    }
    if (55296 <= o && o <= 56319) t = o;
    else {
      for (cp = dec2hex(o); cp.length < 4; ) cp = "0" + cp;
      n += cp;
    }
  }
  return n;
}
function decodeMessage(e, t) {
  if (!e) return "";
  var n = specialCharsIgnoreWrap;
  return e.replace(/([A-Fa-f0-9]{1,4})/g, function (e, t) {
    return -1 == $.inArray(t, n) ? hex2char(t) : "";
  });
}
function dec2hex(e) {
  return (e + 0).toString(16).toUpperCase();
}
function hex2char(e) {
  var t = "",
    n = parseInt(e, 16);
  return (
    n <= 65535
      ? (t += String.fromCharCode(n))
      : n <= 1114111 &&
        ((n -= 65536),
        (t +=
          String.fromCharCode(55296 | (n >> 10)) +
          String.fromCharCode(56320 | (1023 & n)))),
    t
  );
}
function escapeMessage(e) {
  return e;
}
function parseTime(e) {
  e.indexOf("+") > -1 && (e = e.substring(0, e.lastIndexOf("+")));
  var t;
  return (
    (t = e.indexOf(",") > -1 ? e.split(",") : e.split(";")),
    0 == t.length
      ? ""
      : t[0] +
        "/" +
        t[1] +
        "/" +
        t[2] +
        " " +
        leftInsert(t[3], 2, "0") +
        ":" +
        leftInsert(t[4], 2, "0") +
        ":" +
        leftInsert(t[5], 2, "0")
  );
}
function transTime(e, t, n) {
  var r = e.split(",");
  if (0 == r.length || -1 != ("," + e + ",").indexOf(",,")) return "";
  var o;
  o =
    "1" == t
      ? r[2] + "/" + r[1] + "/" + r[0] + " "
      : "2" == t
      ? r[1] + "/" + r[2] + "/" + r[0] + " "
      : r[0] + "/" + r[1] + "/" + r[2] + " ";
  var i;
  if ("12" == n) {
    var a = trans12hourTime(leftInsert(r[3], 2, "0"));
    i =
      a[0] +
      ":" +
      leftInsert(r[4], 2, "0") +
      ":" +
      leftInsert(r[5], 2, "0") +
      " " +
      a[1];
  } else
    i =
      leftInsert(r[3], 2, "0") +
      ":" +
      leftInsert(r[4], 2, "0") +
      ":" +
      leftInsert(r[5], 2, "0");
  return o + i;
}
function trans12hourTime(e) {
  var t, n;
  return (
    e > 12
      ? ((t = "PM"), (n = e - 12))
      : 12 == e
      ? ((t = "PM"), (n = 12))
      : 0 == e
      ? ((t = "AM"), (n = 12))
      : ((t = "AM"), (n = e)),
    [n, t]
  );
}
function getSmsCount(e) {
  var t = getEncodeType(e),
    n = e.length,
    r = "UNICODE" != t.encodeType,
    o = !1,
    i = 0;
  return (
    r ? ((o = n + t.extendLen > 160), (i = 153)) : ((o = n > 70), (i = 67)),
    o ? Math.ceil((n + t.extendLen) / i) : 1
  );
}
function getInsertPos(e) {
  var t = 0;
  if (e.selectionStart || "0" == e.selectionStart) t = e.selectionStart;
  else if (document.selection) {
    e.focus();
    var n = document.selection.createRange(),
      r = n.duplicate();
    for (r.moveToElementText(e); n.compareEndPoints("StartToStart", r) > 0; )
      n.moveStart("character", -1), t++;
  }
  return t;
}
function setInsertPos(e, t) {
  if ((e.focus(), e.selectionStart || "0" == e.selectionStart))
    (e.selectionStart = t), (e.selectionEnd = t);
  else if (document.selection) {
    var n = e.createTextRange();
    n.moveStart("character", t), n.collapse(!0), n.select();
  }
}
function isIntNum(e, t) {
  for (var n = 1; n < 6; n++) if (e == n * t) return !0;
  return !1;
}
function updateLength(e) {
  for (
    var t, n = 0, r = 0, o = 0;
    o < e.length &&
    ((t = e.charAt(o)),
    (n += 1),
    ("[" != t &&
      "]" != t &&
      "{" != t &&
      "}" != t &&
      "|" != t &&
      "\\" != t &&
      "^" != t &&
      "~" != t &&
      "€" != t) ||
      (n += 1),
    (r = o),
    765 != n);
    o++
  )
    if (n > 765) {
      (r = o - 1), (n -= 2);
      break;
    }
  return { index: r, length: n };
}
function transProtocol(e) {
  var t = "ALL";
  return (
    "1" == e
      ? (t = "TCP")
      : "2" == e
      ? (t = "UDP")
      : "3" == e
      ? (t = "TCP+UDP")
      : "4" == e
      ? (t = "ICMP")
      : "5" == e && (t = "ALL"),
    t
  );
}
function transProtocolValue(e) {
  switch (e) {
    case "TCP":
    case "UDP":
    case "ICMP":
      return e;
    case "TCP&UDP":
      return "TCP+UDP";
    case "None":
    default:
      return "ALL";
  }
}
function checkRange(e, t, n) {
  var r = parseInt(e, 10);
  return !(r > n || r < t);
}
function getFileType(e) {
  var t = e.split(".").pop().toLowerCase();
  for (type in extMap) if (-1 != $.inArray(t, extMap[type])) return type;
  return "file";
}
function transUnixTime(e) {
  var t = new Date(parseInt(e, 10));
  return (
    t.getFullYear() +
    "/" +
    leftPad(t.getMonth() + 1, 2, "0") +
    "/" +
    leftPad(t.getDate(), 2, "0") +
    " " +
    leftPad(t.getHours(), 2, "0") +
    ":" +
    leftPad(t.getMinutes(), 2, "0") +
    ":" +
    leftPad(t.getSeconds(), 2, "0")
  );
}
function leftPad(e, t, n) {
  for (var r = e.toString().length; r < t; r++) e = n + e;
  return e;
}
function convertNumberToId(e) {
  return e.replace(/[\+\*#]/g, "_");
}
function getLast8Number(e) {
  return convertNumberToId(
    e.length > 8 ? e.substring(e.length - 8, e.length) : e
  );
}
function fixTableHeight() {
  if ($.browser.msie)
    var e = setInterval(function () {
      var t = $(".fixTableScroll")[0];
      if (t) {
        var n = t.scrollHeight;
        0 != n && ((t.style.height = n + 20), window.clearInterval(e));
      } else window.clearInterval(e);
    }, 300);
}
function refreshTableHeight() {
  $.browser.msie &&
    ($(".fixTableScroll")[0].style.height =
      $(".fixTableScroll .ko-grid-container")[0].scrollHeight + 35);
}
function transUnit(e, t) {
  var n = getDisplayVolume(e, t);
  return "" == n && (n = t ? "0b" : "0MB"), t && (n += "/s"), n;
}
function transSecond2Time(e) {
  var t = !1;
  e < 0 && ((t = !0), (e = 0 - e));
  var n = Math.floor(e / 3600);
  e %= 3600;
  var r = Math.floor(e / 60);
  return (
    (e = Math.round(e % 60)),
    (t ? "-" : "") +
      leftInsert(n, 2, "0") +
      ":" +
      leftInsert(r, 2, "0") +
      ":" +
      leftInsert(e, 2, "0")
  );
}
function leftInsert(e, t, n) {
  for (var r = e.toString().length; r < t; r++) e = n + e;
  return e;
}
function getDisplayVolume(e, t) {
  if ("" == (e = parseInt(e, 10)) || "0" == e) return "";
  var n = !1;
  e < 0 && ((n = !0), (e = 0 - e));
  var r = t ? "b" : "B",
    o = t ? "Kb" : "KB",
    i = t ? "Mb" : "MB",
    a = t ? "Gb" : "GB",
    s = t ? "Tb" : "TB";
  t && (e *= 8);
  var c = e / 1099511627776,
    u = roundToTwoDecimalNumber(c) + s;
  return (
    c < 0.5 &&
      ((c = e / 1073741824),
      (u = roundToTwoDecimalNumber(c) + a),
      c < 0.5 &&
        ((c = e / 1048576),
        (u = roundToTwoDecimalNumber(c) + i),
        t &&
          c < 0.5 &&
          ((c = e / 1024),
          (u = roundToTwoDecimalNumber(c) + o),
          c < 0.5 && ((c = e), (u = roundToTwoDecimalNumber(c) + r))))),
    n && (u = "-" + u),
    u
  );
}
function roundToTwoDecimalNumber(e) {
  return Math.round(100 * e) / 100;
}
function HTMLEncode(e) {
  return Escape.html(e);
}
function HTMLDecode(e) {
  var t = document.createElement("div");
  t.innerHTML = e;
  var n = t.innerText || t.textContent;
  return (n = n.replace(new RegExp("&nbsp;", "gm"), " ")), (t = null), n;
}
function getPercent(e, t, n) {
  return n ? (n *= 10) : (n = 100), roundToTwoDecimalNumber((e / t) * n) + "%";
}
function checkConnectedStatus(e) {
  return (
    "ppp_connected" == e || "ipv6_connected" == e || "ipv4_ipv6_connected" == e
  );
}
function checkConnectingOrDisconnectingStatus(e) {
  return "ppp_connecting" == e || "ppp_disconnecting" == e;
}
function disableBtn(e) {
  e.attr("disabled", "disabled").removeClass("focusIn").addClass("disabled");
}
function enableBtn(e) {
  e.removeAttr("disabled").removeClass("disabled");
}
function replaceSpaceWithNbsp(e) {
  return e.replace(/ /g, "&nbsp;");
}
function syncSelectAndChosen(e, t) {
  return getSelectValFromChosen(t);
}
function getSelectValFromChosen(e) {
  var t = [];
  return (
    $.each(e, function (e, n) {
      var r = $(n).text().split("/");
      t.push(r[r.length - 1]);
    }),
    t
  );
}
function trim(e) {
  return e.replace(/^\s+|\s+$/g, "");
}
function isWifiConnected(e, t) {
  return !!_.find(t, function (t) {
    return t.ip_addr == e;
  });
}
function verifyDeviceInfo(e) {
  return e && "" != e && "0.0.0.0" != e ? e : "— —";
}
function signalFormat(e) {
  return e && "" != e ? (e > 0 ? "-" + e + " dBm" : e + " dBm") : "— —";
}
function signalFormat_sinr(e) {
  return e && "" != e ? e + " dB" : "— —";
}
function convertSignal(e) {
  return -1 != $.inArray(e.network_type, type_2g)
    ? e.rssi
    : -1 != $.inArray(e.network_type, type_3g)
    ? e.rscp
    : -1 != $.inArray(e.network_type, type_4g)
    ? e.lte_rsrp
    : -1 != $.inArray(e.network_type, type_5g)
    ? e.lte_rsrp < e.Z5g_rsrp
      ? e.Z5g_rsrp
      : e.lte_rsrp
    : -1 != $.inArray(e.network_type, type_5g_sa)
    ? e.Z5g_rsrp
    : void 0;
}
function convertSignal4g(e) {
  return -1 != $.inArray(e.network_type, type_2g)
    ? e.rssi
    : -1 != $.inArray(e.network_type, type_3g)
    ? e.rscp
    : -1 != $.inArray(e.network_type, type_4g)
    ? e.lte_rsrp
    : -1 != $.inArray(e.network_type, type_5g)
    ? e.lte_rsrp
    : -1 != $.inArray(e.network_type, type_5g_sa)
    ? ""
    : void 0;
}
function convertSignal5g(e) {
  if (
    -1 != $.inArray(e.network_type, type_5g) ||
    -1 != $.inArray(e.network_type, type_5g_sa)
  )
    return e.Z5g_rsrp;
}
function RndNum(e) {
  for (var t = "", n = 0; n < e; n++) t += Math.floor(10 * Math.random());
  return t;
}
function checkPassword(e, t) {
  var n = !0;
  if ("" == $.trim(e)) n = "login_password_required";
  else if (
    "WPAPSK" == t.authMode ||
    "WPA2PSK" == t.authMode ||
    "WPAPSKWPA2PSK" == t.authMode
  ) {
    var r =
      /^([0-9A-Fa-f]{8,64}|[0-9a-zA-Z!#\(\)\-\.\/=@\^_\{|\}~ ]{8,63})$/.test(e);
    0 == r && (n = "wifi_password_check");
  } else if ("SHARED" == t.authMode || "WEP" == t.encryptType) {
    var r =
      /^([0-9A-Fa-f]{10}|[0-9A-Fa-f]{26}|[0-9a-zA-Z!#\(\)\+\-\.\/%=\?@\^_\{|\}~ ]{5}|[0-9a-zA-Z!#\(\)\+\-\.\/%=\?@\^_\{|\}~ ]{13})$/.test(
        e
      );
    0 == r && (n = "wifi_wep_password_check");
  }
  return n;
}
function showConfirm_sbm(e, t, n, r, o) {
  r ? $("#yesbtn_sbm").attr("trans", r) : $("#yesbtn_sbm").attr("trans", "yes"),
    o ? $("#nobtn_sbm").attr("trans", o) : $("#nobtn_sbm").attr("trans", "no"),
    $("#yesbtn_sbm, #nobtn_sbm").translate(),
    popup_sbm({ title: e.title, img: e.img, msg: e.msg, minHeight: n }),
    $("#yesbtn_sbm, #nobtn_sbm").show(),
    $("#okbtn_sbm").hide();
  var i = $.isFunction(t),
    a = $.isPlainObject(t);
  $("#yesbtn_sbm")
    .unbind("click")
    .click(function () {
      (inputContext = $("#current_pin_sbm").val()),
        (currentKeyID = $("#current_key_id").val()),
        $.modal.close(),
        i ? t() : a && $.isFunction(t.ok) && t.ok();
    }),
    $("#nobtn_sbm")
      .unbind("click")
      .click(function () {
        $.modal.close(), a && $.isFunction(t.no) && t.no();
      }),
    $("#current_pin_sbm")
      .unbind("keypress")
      .bind("keypress", function () {
        (inputContext = $("#current_pin_sbm").val()),
          (currentKeyID = $("#current_key_id").val());
      })
      .bind("keyup", function () {
        (inputContext = $("#current_pin_sbm").val()),
          (currentKeyID = $("#current_key_id").val());
      }),
    $("#confirm_sbm").translate();
}
function popup_sbm(e) {
  $.modal.close();
  var t = e.minHeight || 140;
  $("#confirm_sbm").modal({
    position: ["30%"],
    overlayId: "confirm-overlay",
    containerId: "confirm-container",
    escClose: !1,
    minHeight: t,
  });
  var n = $("div#confirm_sbm");
  if (
    ("" == e.img
      ? $("#confirmImg_sbm", n).hide()
      : $("#confirmImg_sbm", n).attr("src", e.img),
    $("#popTitle_sbm", n).html($.i18n.prop(e.title)),
    "string" == typeof e.msg)
  )
    $(".message", n).html($.i18n.prop(e.msg));
  else {
    var r = [e.msg.msg];
    r.push(e.msg.params),
      $(".message", n).html($.i18n.prop.apply(null, _.flatten(r)));
  }
  var o = $("div.promptDiv", n);
  !0 === e.showInput
    ? (o.show(),
      $("input#promptInput_sbm", o).val(e.defaultValue ? e.defaultValue : ""),
      $(".promptErrorLabel", o).empty())
    : o.hide(),
    window.setTimeout(function () {
      $(":input:enabled:visible:first", "#confirm-container").focus();
    }, 0);
}
function getDataInfo(e) {
  return { data: /\d+(.\d+)?/.exec(e)[0], unit: /[A-Z]{1,2}/.exec(e)[0] };
}
function shortenLongName(e, t) {
  return e.length > t ? e.substring(0, t) + "..." : e;
}
function wifiFilterAPInfo(e, t, n, r, o, i) {
  var a = {},
    s = e,
    c = t;
  return (
    (a.wifiSwitch = s.WiFiModuleSwitch),
    _.filter(c, function (e, t) {
      e.ChipIndex == n &&
        e.AccessPointIndex == r &&
        ((a.ChipIndex = e.ChipIndex),
        (a.AccessPointIndex = e.AccessPointIndex),
        (a.AccessPointSwitchStatus = e.AccessPointSwitchStatus),
        (a.SSID = e.SSID),
        (a.ApMaxStationNumber = e.ApMaxStationNumber),
        (a.ApIsolate = e.ApIsolate),
        (a.AuthMode = e.AuthMode),
        (a.EncrypType = e.EncrypType),
        (a.Password = Base64.decode(e.Password)),
        (a.QrImageUrl = e.QrImageUrl),
        (a.QrImageShow = e.QrImageShow),
        (a.ApBroadcastDisabled = e.ApBroadcastDisabled),
        (a.CountryCode = e.CountryCode),
        (a.Band = e.Band),
        (a.WirelessMode = e.WirelessMode),
        (a.Channel = e.Channel),
        (a.BandWidth = e.BandWidth)),
        e.ChipIndex == o.FIRST && e.AccessPointIndex == i.FIRST
          ? ((a.AccessPointSwitchStatus_1_1 = e.AccessPointSwitchStatus),
            (a.ApMaxStationNumber_1_1 = e.ApMaxStationNumber),
            (a.Channel_1_1 = e.Channel))
          : e.ChipIndex == o.FIRST && e.AccessPointIndex == i.SECOND
          ? ((a.AccessPointSwitchStatus_1_2 = e.AccessPointSwitchStatus),
            (a.ApMaxStationNumber_1_2 = e.ApMaxStationNumber),
            (a.GuestSSIDActiveTime = e.GuestSSIDActiveTime))
          : e.ChipIndex == o.SECOND && e.AccessPointIndex == i.FIRST
          ? ((a.AccessPointSwitchStatus_2_1 = e.AccessPointSwitchStatus),
            (a.ApMaxStationNumber_2_1 = e.ApMaxStationNumber),
            (a.Channel_2_1 = e.Channel))
          : e.ChipIndex == o.SECOND &&
            e.AccessPointIndex == i.SECOND &&
            ((a.AccessPointSwitchStatus_2_2 = e.AccessPointSwitchStatus),
            (a.ApMaxStationNumber_2_2 = e.ApMaxStationNumber));
    }),
    a
  );
}
function wifiWPSActiveInfo(e) {
  var t = {};
  return (
    _.filter(e, function (e, n) {
      e.ChipIndex == wifiChipIndex.FIRST
        ? (t.WpsStatus_1 = e.WpsStatus)
        : e.ChipIndex == wifiChipIndex.SECOND && (t.WpsStatus_2 = e.WpsStatus);
    }),
    t
  );
}
function wifiFilterWPSInfo(e, t) {
  var n = {};
  return (
    _.filter(e, function (e, t) {
      e.ChipIndex == wifiChipIndex.FIRST
        ? ((n.ChipIndex_1 = e.ChipIndex),
          (n.ActiveWpsAccessPointIndex_1 = e.ActiveWpsAccessPointIndex),
          (n.WpsStatus_1 = e.WpsStatus),
          (n.WpsMode_1 = e.WpsMode))
        : e.ChipIndex == wifiChipIndex.SECOND &&
          ((n.ChipIndex_2 = e.ChipIndex),
          (n.ActiveWpsAccessPointIndex_2 = e.ActiveWpsAccessPointIndex),
          (n.WpsStatus_2 = e.WpsStatus),
          (n.WpsMode_2 = e.WpsMode));
    }),
    _.filter(t, function (e, t) {
      e.ChipIndex == wifiChipIndex.FIRST &&
      e.AccessPointIndex == accessPointIndex.FIRST
        ? ((n.AccessPointSwitchStatus_1_1 = e.AccessPointSwitchStatus),
          (n.AuthMode_1_1 = e.AuthMode),
          (n.EncrypType_1_1 = e.EncrypType),
          (n.ssid_1_1 = e.SSID),
          (n.ApBroadcastDisabled_1_1 = e.ApBroadcastDisabled))
        : e.ChipIndex == wifiChipIndex.FIRST &&
          e.AccessPointIndex == accessPointIndex.SECOND
        ? ((n.AccessPointSwitchStatus_1_2 = e.AccessPointSwitchStatus),
          (n.AuthMode_1_2 = e.AuthMode),
          (n.EncrypType_1_2 = e.EncrypType),
          (n.ssid_1_2 = e.SSID),
          (n.ApBroadcastDisabled_1_2 = e.ApBroadcastDisabled))
        : e.ChipIndex == wifiChipIndex.SECOND &&
          e.AccessPointIndex == accessPointIndex.FIRST
        ? ((n.AccessPointSwitchStatus_2_1 = e.AccessPointSwitchStatus),
          (n.AuthMode_2_1 = e.AuthMode),
          (n.EncrypType_2_1 = e.EncrypType),
          (n.multiSSID_2_1 = e.SSID),
          (n.ApBroadcastDisabled_2_1 = e.ApBroadcastDisabled),
          (n.ssid2Enable_2_1 = e.AccessPointSwitchStatus))
        : e.ChipIndex == wifiChipIndex.SECOND &&
          e.AccessPointIndex == accessPointIndex.SECOND &&
          ((n.AccessPointSwitchStatus_2_2 = e.AccessPointSwitchStatus),
          (n.AuthMode_2_2 = e.AuthMode),
          (n.EncrypType_2_2 = e.EncrypType),
          (n.multiSSID_2_2 = e.SSID),
          (n.ApBroadcastDisabled_2_2 = e.ApBroadcastDisabled),
          (n.ssid2Enable_2_2 = e.AccessPointSwitchStatus));
    }),
    n
  );
}
function getNetworkType(e, t) {
  var n = e.toLowerCase();
  return (
    ("" != n && "limited service" != n && "limited_service_sa" != n) ||
      (n = "limited_service"),
    "no service" == n && (n = "no_service"),
    "limited_service" == n || "no_service" == n
      ? ($("#networkType", "#statusBar").attr(
          "data-trans",
          "network_type_" + n
        ),
        $.i18n.prop("network_type_" + n))
      : ($("#networkType", "#statusBar").removeAttr("data-trans"),
        -1 != $.inArray(e, type_5g) ||
        -1 != $.inArray(e, type_5g_sa) ||
        "LTE-NSA" == e
          ? "5G"
          : -1 != $.inArray(e, type_4g) && t && "LTE-NSA" != e
          ? "4G+"
          : -1 != $.inArray(e, type_2g)
          ? "2G"
          : -1 != $.inArray(e, type_3g)
          ? -1 != n.indexOf("dc")
            ? "3G+"
            : "3G"
          : -1 != $.inArray(e, type_4g) && "LTE-NSA" != e
          ? "4G"
          : e)
  );
}
function showModifyFotaWindow(e, t, n, r, o, i) {
  var a = { title: e, htmlPath: t, jsPath: n, minHeight: o, minWidth: r };
  $.isFunction(i), $.isPlainObject(i);
  popupModifyFotaWindow(a);
}
function popupModifyFotaWindow(e) {
  $.modal.close();
  var t = e.minHeight || 140,
    n = e.minWidth || 400,
    r = $("#fotaSetContainer"),
    o = "text!tmpl/" + e.htmlPath + ".html";
  require([o, e.jsPath], function (e, t) {
    r.stop(!0, !0),
      r.hide(),
      r.html(e),
      t.init(),
      $("#fotaSetContainer").translate(),
      r.show(),
      $("#fotaSetContainer").css("opacity", 50),
      $("#txtCurrentPassword").focus();
  }),
    $("#popupModifyFotaSetWindow").modal({
      zIndex: 3e3,
      position: ["30%"],
      escClose: !1,
      minWidth: n,
      minHeight: t,
      maxWidth: 700,
      opacity: 50,
    });
}
function hidePopupModifyFotaSetWindow() {
  $("#popupModifyFotaSetWindow").remove(), $.modal.close();
}
function ip_to_binary(e) {
  if (ip_reg.test(e)) {
    for (var t = "", n = e.split("."), r = 0; r < 4; r++) {
      (curr_num = n[r]),
        (number_bin = parseInt(curr_num)),
        (number_bin = number_bin.toString(2)),
        (count = 8 - number_bin.length);
      for (var o = 0; o < count; o++) number_bin = "0" + number_bin;
      t += number_bin;
    }
    return t;
  }
  return "";
}
function binary_to_ip(e) {
  return 32 == e.length
    ? ((a = parseInt(e.substr(0, 8), 2)),
      (b = parseInt(e.substr(8, 8), 2)),
      (c = parseInt(e.substr(16, 8), 2)),
      (d = parseInt(e.slice(-8), 2)),
      a + "." + b + "." + c + "." + d)
    : "";
}
function get_network_broadcast_addr(e, t) {
  (network_broadcast = []),
    (network_addr = ""),
    (mask_arr = e.split(".")),
    (ip_arr = t.split("."));
  for (var n = 0; n < 4; n++)
    (number1 = parseInt(mask_arr[n])),
      (number2 = parseInt(ip_arr[n])),
      (network_addr += number1 & number2),
      n < 3 && (network_addr += ".");
  return (
    network_broadcast.push(network_addr),
    (mask_binary = ip_to_binary(e)),
    (gateway_binary = ip_to_binary(t)),
    (mask_zero = mask_binary.split(0).length - 1),
    (one_number = new Array(mask_zero + 1).join("1")),
    (gateway_hou_wei_bu_yi = gateway_binary.slice(0, -mask_zero) + one_number),
    network_broadcast.push(binary_to_ip(gateway_hou_wei_bu_yi)),
    network_broadcast
  );
}
function paswordAlgorithmsCookie(e) {
  return SHA256(e);
}
function SHA256(e) {
  function t(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
  }
  function n(e, t) {
    return (e >>> t) | (e << (32 - t));
  }
  function r(e, t) {
    return e >>> t;
  }
  function o(e, t, n) {
    return (e & t) ^ (~e & n);
  }
  function i(e, t, n) {
    return (e & t) ^ (e & n) ^ (t & n);
  }
  function a(e) {
    return n(e, 2) ^ n(e, 13) ^ n(e, 22);
  }
  function s(e) {
    return n(e, 6) ^ n(e, 11) ^ n(e, 25);
  }
  function c(e) {
    return n(e, 7) ^ n(e, 18) ^ r(e, 3);
  }
  function u(e) {
    return n(e, 17) ^ n(e, 19) ^ r(e, 10);
  }
  var l = 8,
    d = 1;
  return (
    (e = (function (e) {
      e = e.replace(/\r\n/g, "\n");
      for (var t = "", n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        r < 128
          ? (t += String.fromCharCode(r))
          : r > 127 && r < 2048
          ? ((t += String.fromCharCode((r >> 6) | 192)),
            (t += String.fromCharCode((63 & r) | 128)))
          : ((t += String.fromCharCode((r >> 12) | 224)),
            (t += String.fromCharCode(((r >> 6) & 63) | 128)),
            (t += String.fromCharCode((63 & r) | 128)));
      }
      return t;
    })(e)),
    (function (e) {
      for (
        var t = d ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0;
        r < 4 * e.length;
        r++
      )
        n +=
          t.charAt((e[r >> 2] >> (8 * (3 - (r % 4)) + 4)) & 15) +
          t.charAt((e[r >> 2] >> (8 * (3 - (r % 4)))) & 15);
      return n;
    })(
      (function (e, n) {
        var r,
          l,
          d,
          p,
          h,
          f,
          m,
          g,
          _,
          b,
          v,
          $,
          S = new Array(
            1116352408,
            1899447441,
            3049323471,
            3921009573,
            961987163,
            1508970993,
            2453635748,
            2870763221,
            3624381080,
            310598401,
            607225278,
            1426881987,
            1925078388,
            2162078206,
            2614888103,
            3248222580,
            3835390401,
            4022224774,
            264347078,
            604807628,
            770255983,
            1249150122,
            1555081692,
            1996064986,
            2554220882,
            2821834349,
            2952996808,
            3210313671,
            3336571891,
            3584528711,
            113926993,
            338241895,
            666307205,
            773529912,
            1294757372,
            1396182291,
            1695183700,
            1986661051,
            2177026350,
            2456956037,
            2730485921,
            2820302411,
            3259730800,
            3345764771,
            3516065817,
            3600352804,
            4094571909,
            275423344,
            430227734,
            506948616,
            659060556,
            883997877,
            958139571,
            1322822218,
            1537002063,
            1747873779,
            1955562222,
            2024104815,
            2227730452,
            2361852424,
            2428436474,
            2756734187,
            3204031479,
            3329325298
          ),
          y = new Array(
            1779033703,
            3144134277,
            1013904242,
            2773480762,
            1359893119,
            2600822924,
            528734635,
            1541459225
          ),
          w = new Array(64);
        (e[n >> 5] |= 128 << (24 - (n % 32))),
          (e[15 + (((n + 64) >> 9) << 4)] = n);
        for (var _ = 0; _ < e.length; _ += 16) {
          (r = y[0]),
            (l = y[1]),
            (d = y[2]),
            (p = y[3]),
            (h = y[4]),
            (f = y[5]),
            (m = y[6]),
            (g = y[7]);
          for (var b = 0; b < 64; b++)
            (w[b] =
              b < 16
                ? e[b + _]
                : t(t(t(u(w[b - 2]), w[b - 7]), c(w[b - 15])), w[b - 16])),
              (v = t(t(t(t(g, s(h)), o(h, f, m)), S[b]), w[b])),
              ($ = t(a(r), i(r, l, d))),
              (g = m),
              (m = f),
              (f = h),
              (h = t(p, v)),
              (p = d),
              (d = l),
              (l = r),
              (r = t(v, $));
          (y[0] = t(r, y[0])),
            (y[1] = t(l, y[1])),
            (y[2] = t(d, y[2])),
            (y[3] = t(p, y[3])),
            (y[4] = t(h, y[4])),
            (y[5] = t(f, y[5])),
            (y[6] = t(m, y[6])),
            (y[7] = t(g, y[7]));
        }
        return y;
      })(
        (function (e) {
          for (
            var t = Array(), n = (1 << l) - 1, r = 0;
            r < e.length * l;
            r += l
          )
            t[r >> 5] |= (e.charCodeAt(r / l) & n) << (24 - (r % 32));
          return t;
        })(e),
        e.length * l
      )
    )
  );
}
function convertCAStatus(e) {
  var t;
  switch (e) {
    case "ca_activated":
      t = $.i18n.prop("ca_active");
      break;
    case "ca_deactivated":
      t = $.i18n.prop("ca_inactive");
      break;
    default:
      t = $.i18n.prop("no_ca");
  }
  return t;
}
function checkVpnConnectedStatus(e) {
  return "connected" == e;
}
function getFrequency5g(e) {
  return -1 != $.inArray(e.network_type, type_5g) ||
    -1 != $.inArray(e.network_type, type_5g_sa)
    ? e.nr5g_action_band.toUpperCase()
    : "— —";
}
function PasswordStrength(e, t, n) {
  var r = this,
    o = $("#" + e).val();
  "" != o && r.checkStrength(o, t, n),
    (document.getElementById(e).onkeyup = function () {
      r.checkStrength(this.value, t, n);
    });
}
function updateCustomRadio() {
  $(":radio").each(function (e, t) {
    var n = $(t);
    n.is(":checked")
      ? n.siblings("span.AttRadio").addClass("AttRadioSelected")
      : n.siblings("span.AttRadio").removeClass("AttRadioSelected"),
      n.hasClass("hide_sbm")
        ? n.siblings("span.AttRadio").addClass("hide")
        : n.siblings("span.AttRadio").removeClass("hide");
  });
}
function setProgressBar_datausage(e) {
  jQuery("#bar_datausage").width((800 * e) / 100);
}
function setProgressBar_datausage_alertLine(e) {
  jQuery("#bar_datausage_alertLine").width((800 * e) / 100);
}
var wifiChipIndex = { FIRST: 0, SECOND: 1 },
  accessPointIndex = { FIRST: 0, SECOND: 1, THIRD: 2, FOURTH: 3 },
  lastLoginStatus = "UNREAL",
  manualLogout = !1,
  type_2g = ["GSM", "GPRS", "EDGE"],
  type_3g = [
    "UMTS",
    "HSDPA",
    "HSUPA",
    "HSPA",
    "HSPA+",
    "DC",
    "DC-HSPA",
    "DC-HSPA+",
    "DC-HSDPA",
  ],
  type_4g = ["LTE", "LTE_CA", "LTE_A", "LTE-NSA"],
  type_5g = ["ENDC"],
  type_5g_sa = ["SA"],
  _timeoutStack = [],
  _intervalStack = [];
$(document).ready(function () {
  $("[manualControl!=true].checkbox").live("click", function (e) {
    var t = $(this);
    if (t.hasClass("disable")) return !1;
    var n = t.find("input:checkbox");
    return (
      n.attr("checked")
        ? n.removeAttr("checked")
        : n.attr("checked", "checked"),
      checkCheckbox(n),
      e.stopPropagation(),
      !0
    );
  }),
    $(
      'input[type="text"][noAction!="true"],input[type="password"][noAction!="true"],select'
    )
      .live("focusin", function (e) {
        $(this).addClass("focusIn");
      })
      .live("focusout", function (e) {
        $(this).removeClass("focusIn");
      }),
    $(".form-note .notes-title").live("click", function () {
      var e = $(this);
      e.siblings("ul.notes-content:first").slideToggle(),
        e.toggleClass("notes-dot");
    });
});
var GSM7_Table = [
    "000A",
    "000C",
    "000D",
    "0020",
    "0021",
    "0022",
    "0023",
    "0024",
    "0025",
    "0026",
    "0027",
    "0028",
    "0029",
    "002A",
    "002B",
    "002C",
    "002D",
    "002E",
    "002F",
    "0030",
    "0031",
    "0032",
    "0033",
    "0034",
    "0035",
    "0036",
    "0037",
    "0038",
    "0039",
    "003A",
    "003A",
    "003B",
    "003C",
    "003D",
    "003E",
    "003F",
    "0040",
    "0041",
    "0042",
    "0043",
    "0044",
    "0045",
    "0046",
    "0047",
    "0048",
    "0049",
    "004A",
    "004B",
    "004C",
    "004D",
    "004E",
    "004F",
    "0050",
    "0051",
    "0052",
    "0053",
    "0054",
    "0055",
    "0056",
    "0057",
    "0058",
    "0059",
    "005A",
    "005B",
    "005C",
    "005D",
    "005E",
    "005F",
    "0061",
    "0062",
    "0063",
    "0064",
    "0065",
    "0066",
    "0067",
    "0068",
    "0069",
    "006A",
    "006B",
    "006C",
    "006D",
    "006E",
    "006F",
    "0070",
    "0071",
    "0072",
    "0073",
    "0074",
    "0075",
    "0076",
    "0077",
    "0078",
    "0079",
    "007A",
    "007B",
    "007C",
    "007D",
    "007E",
    "00A0",
    "00A1",
    "00A3",
    "00A4",
    "00A5",
    "00A7",
    "00BF",
    "00C4",
    "00C5",
    "00C6",
    "00C7",
    "00C9",
    "00D1",
    "00D6",
    "00D8",
    "00DC",
    "00DF",
    "00E0",
    "00E4",
    "00E5",
    "00E6",
    "00E8",
    "00E9",
    "00EC",
    "00F1",
    "00F2",
    "00F6",
    "00F8",
    "00F9",
    "00FC",
    "0393",
    "0394",
    "0398",
    "039B",
    "039E",
    "03A0",
    "03A3",
    "03A6",
    "03A8",
    "03A9",
    "20AC",
  ],
  GSM7_Table_Extend = [
    "007B",
    "007D",
    "005B",
    "005D",
    "007E",
    "005C",
    "005E",
    "20AC",
    "007C",
  ],
  specialChars = ["000D", "000A", "0009", "0000"],
  specialCharsIgnoreWrap = ["0009", "0000"],
  extMap = {
    mp3: ["mp3", "wma", "wav"],
    film: ["mp4", "avi", "rm", "rmvb", "3gp", "mpeg"],
    picture: ["jpeg", "jpg", "gif", "bmp", "png"],
    pdf: ["pdf"],
    rar: ["rar", "7z", "zip", "gzip", "gz", "tar"],
    doc: ["doc", "docx"],
    ppt: ["ppt", "pptx"],
    xls: ["xls", "xlsx"],
    xml: ["xml"],
  },
  Escape = {
    html: function (e) {
      return (e + "").replace(/[&<>"'\/`]/g, Escape._htmlReplacer);
    },
    regex: function (e) {
      return (e + "").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");
    },
    _htmlReplacer: function (e) {
      return Escape.HTML_CHARS[e];
    },
    HTML_CHARS: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
      "`": "&#x60;",
    },
  },
  popover = {
    popoverEle: null,
    _init: function () {
      null == this.popoverEle &&
        ($("body").append('<div class="popover"></div>'),
        (this.popoverEle = $(".popover")));
    },
    open: function (e) {
      this._init();
      var t = e.target.offset(),
        n = t.top + e.target.outerHeight();
      this.popoverEle
        .html(e.html)
        .css({ width: e.width, left: t.left, top: n })
        .data({ source: e.target[0].id })
        .translate(),
        setTimeout(function () {
          popover.popoverEle.show();
        }, 100),
        this.popoverEle.translate(),
        e.validation && e.validation.apply();
    },
    close: function () {
      this.popoverEle && this.popoverEle.fadeOut();
    },
    show: function () {
      this.popoverEle && this.popoverEle.show();
    },
    hide: function () {
      this.popoverEle && this.popoverEle.hide();
    },
  };
$(document).ready(function () {
  $("body").click(function (e) {
    var t = $(".popover"),
      n = $(e.target);
    ((e.target.id != t.data("source") && 0 == n.parents(".popover").length) ||
      n.hasClass("popover-close")) &&
      popover.close();
  });
});
var ip_reg =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  mask_reg =
    /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
(checkStrength = function (e, t, n) {
  var r = void 0 === n ? 8 : n,
    o = 0;
  e.match(/[a-z]/g) && o++,
    e.match(/[0-9]/g) && o++,
    e.match(/[^a-z0-9]/g) && o++,
    e.length < parseInt(r) && (o = 0),
    o > 3 && (o = 3),
    (document.getElementById(t).className = "passStrength" + o),
    o >= 0
      ? $("#" + t)
          .removeAttr("data-trans")
          .attr("data-trans", "password_strength_" + o)
          .translate()
      : $("#" + t)
          .removeAttr("data-trans")
          .html("password_strength_0");
}),
  $(document).ready(function () {
    $("input:radio")
      .die()
      .live("change", function () {
        var e = $(this);
        $("p.radiobox", e.closest("div").parent()).removeClass(
          "radiobox_selected"
        ),
          e.parent("p.radiobox").addClass("radiobox_selected"),
          e.focus();
      })
      .live("focus", function (e) {
        $(this).parent("p").addClass("radiobox_selected");
      })
      .live("blur", function (e) {
        $(this).parent("p").removeClass("radiobox_selected");
      }),
      $("p.radiobox")
        .die()
        .live("click", function () {
          var e = $(this);
          if (e.hasClass("disable") || e.hasClass("checked_disable")) return !1;
          for (
            var t = e.attr("for"),
              n =
                ($("p.radiobox[for=" + t + "]"),
                $("input:radio[name=" + t + "]")),
              r = e.find("input"),
              o = 0;
            o < n.length;
            o++
          )
            if (r.attr("id") == n[o].id) {
              var i = n[o].id;
              $("#" + i).attr("checked", !0),
                $("#" + i)[0].click(),
                $("#" + i)
                  .parent("p.radiobox")
                  .addClass("radiobox_selected"),
                e.focus();
            } else {
              var i = n[o].id;
              $("#" + i).attr("checked", !1),
                $("#" + i)
                  .parent("p.radiobox")
                  .removeClass("radiobox_selected");
            }
        });
  });
//# sourceMappingURL=../sourcemaps/util.js.map
