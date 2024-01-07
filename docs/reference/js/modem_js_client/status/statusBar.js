define([
  "knockout",
  "jquery",
  "underscore",
  "service",
  "config/config",
  "config/menu",
  "tooltip",
], function (e, t, n, o, s, i, a) {
  function r() {
    function n() {
      Z().isLoggedIn
        ? o.getSMSReady({}, function (e) {
            "1" == e.sms_cmd_status_result
              ? window.setTimeout(function () {
                  n();
                }, 1e3)
              : (z = !0);
          })
        : window.setTimeout(function () {
            n();
          }, 1e3);
    }
    function r(e) {
      if (
        (t("#statusItemSimStatus").attr(
          "tipTitle",
          "sim_status_" + e.simStatus
        ),
        0 != e.wifiSwitchStatus)
      ) {
        0 == e.deviceSize
          ? (t("#wifi_status").removeAttr("tipTitle2"),
            t("#wifi_status").attr("tipTitle", "wifi_status_on"))
          : (t("#wifi_status").attr("tipTitle", "wifi_num"),
            t("#wifi_status").attr("tipTitle2", e.deviceSize));
        var n = t("#h_ssid");
        "1" == e.wifiSwitchStatus && e.isLoggedIn
          ? (n.html(setStatusBarAllSSID(e.ssid, e.mainSSID5g, !0)),
            n.attr("tipTitle", setStatusBarAllSSID(e.ssid, e.mainSSID5g, !1)),
            n.hide())
          : n.hide();
      } else
        t("#wifi_status").removeAttr("tipTitle2"),
          t("#wifi_status").attr("tipTitle", "wifi_status_off");
    }
    function l(e, n, o, s) {
      e.connectStatus(n),
        "ppp_connecting" == n
          ? (e.connectStatusTrans("connecting"),
            e.connectStatusText(t.i18n.prop("connecting")))
          : checkConnectedStatus(n)
          ? (e.connectStatusTrans("connected"),
            e.connectStatusText(t.i18n.prop("connected")))
          : "ppp_disconnecting" == n
          ? (e.connectStatusTrans("disconnecting"),
            e.connectStatusText(t.i18n.prop("disconnecting")))
          : o
          ? "connect" == s
            ? (e.connectStatus("wifi_connect"),
              e.connectStatusTrans("connected"),
              e.connectStatusText(t.i18n.prop("connected")))
            : "connecting" == s
            ? (e.connectStatus("wifi_connecting"),
              e.connectStatusTrans("connecting"),
              e.connectStatusText(t.i18n.prop("connecting")))
            : (e.connectStatus("ppp_disconnected"),
              e.connectStatusTrans("disconnected"),
              e.connectStatusText(t.i18n.prop("disconnected")))
          : (e.connectStatusTrans("disconnected"),
            e.connectStatusText(t.i18n.prop("disconnected")));
    }
    function m() {
      var e = 5,
        t = 1;
      (s.dbMsgs && 0 != s.dbMsgs.length) || ((e = 500), (t = 10)),
        o.getSMSMessages(
          {
            page: 0,
            smsCount: e,
            nMessageStoreType: 1,
            tags: t,
            orderBy: "order by id desc",
          },
          function (e) {
            e && e.messages && u(e.messages), (K = !1);
          }
        );
    }
    window.setTimeout(function () {
      function i(e) {
        o.getSmsCapability({}, function (n) {
          var o = !1;
          0 != n.nvTotal && n.nvUsed >= n.nvTotal
            ? (t("#sms_unread_count").attr("tipTitle", "sms_capacity_is_full"),
              (o = !0))
            : 0 != n.nvTotal && n.nvUsed + 5 >= n.nvTotal
            ? (t("#sms_unread_count").attr(
                "tipTitle",
                "sms_capacity_will_full"
              ),
              (o = !0))
            : t("#sms_unread_count").attr("tipTitle", "sms_unread_count"),
            a.showSmsDeleteConfirm(o),
            void 0 !== e && a.smsUnreadCount(e),
            (F = !0);
        });
      }
      var a = new c();
      e.applyBindings(a, t("#statusBar")[0]),
        window.setInterval(function () {
          var e = Z(),
            n = t("#h_ssid");
          "1" == e.wifiSwitchStatus && e.isLoggedIn
            ? (n.html(setStatusBarAllSSID(e.ssid, e.mainSSID5g, !0)), n.hide())
            : n.hide(),
            (a.cpeMode = e.opms_wan_mode),
            a.isDebugging("1" == e.app_debug_mode),
            a.oduModeStatus(P(e.odu_mode, e.cbns_server_enable)),
            a.OTAStatus(e.new_version_state),
            a.sleep_protection_mode_status("1" == e.is_night_mode),
            a.isShowConnectionIcon(
              "CPE" != s.PRODUCT_TYPE ||
                f(e.opms_wan_mode, e.opms_wan_auto_mode)
            ),
            a.networkType(getNetworkType(e.networkType, e.isCaStatus)),
            a.signalCssClass(w(e.signalImg, e.networkType, e.simStatus));
          var o = !!e.roamingStatus;
          a.networkOperator(
            d(
              e.spn_b1_flag,
              e.spn_name_data,
              e.spn_b2_flag,
              e.networkOperator,
              o
            )
          ),
            a.roamingStatus(e.roamingStatus ? "R" : ""),
            a.wifiStatusImg(v(e.wifiStatus, e.attachedDevices)),
            a.wifiStatusCssClass(S(e.wifiStatus, e.attachedDevices)),
            a.simStatus(T(e.simStatus)),
            a.batteryPers(I(e.battery_value, e.batteryStatus)),
            a.batteryLevel(e.battery_value + "%"),
            a.pinStatus(e.pinStatus),
            a.batteryStatus(e.batteryStatus),
            a.attachedDevices(e.attachedDevices),
            a.showAttachedDevices(e.wifiStatus),
            a.isLoggedIn(e.isLoggedIn),
            s.HAS_SMS &&
              z &&
              !b(e.simStatus) &&
              (!F && e.isLoggedIn
                ? i(e.smsUnreadCount)
                : a.smsUnreadCount(e.smsUnreadCount)),
            h(
              a,
              e.opms_wan_mode,
              e.opms_wan_auto_mode,
              e.dhcp_wan_status,
              e.connectStatus,
              e.data_counter,
              e.connectWifiSSID,
              e.connectWifiStatus
            ),
            l(a, e.connectStatus, e.connectWifiSSID, e.connectWifiStatus),
            checkTrafficLimitAlert(a, e),
            r({
              simStatus: e.simStatus,
              wifiSwitchStatus: e.wifiSwitchStatus,
              deviceSize: e.attachedDevices,
              networkType: e.networkType,
              isLoggedIn: e.isLoggedIn,
              ssid: e.ssid,
              mainSSID5g: e.mainSSID5g,
            });
          var c = t("#langLogoBar");
          e.isLoggedIn
            ? (c.hasClass("langborderBg") || c.addClass("langborderBg"),
              t("#statusBar:hidden").show())
            : (c.hasClass("langborderBg") && c.removeClass("langborderBg"),
              t("#statusBar:visible").hide()),
            "AUTO" == e.opms_wan_mode &&
              void 0 !== X &&
              "" != X &&
              X != e.opms_wan_auto_mode &&
              ((X = e.opms_wan_auto_mode), window.location.reload());
        }, 500),
        s.HAS_SMS &&
          (window.setInterval(function () {
            a.isLoggedIn() && i();
          }, 1e4),
          n()),
        window.setInterval(function () {
          if (1 == a.isLoggedIn() && !t("#progress").is(":visible")) {
            var e = Z();
            ("connecting_server" != e.current_upgrade_state &&
              "upgrading" != e.current_upgrade_state &&
              "accept" != e.current_upgrade_state &&
              "connect_server_success" != e.current_upgrade_state) ||
              (null == q
                ? (e.is_mandatory || t.modal.close(), k())
                : 0 == q && (q = null));
          }
        }, 1e3);
      var u = function () {
        if ("FOTA" == s.UPGRADE_TYPE || "OTA" == s.UPGRADE_TYPE) {
          var e = o.getStatusInfo();
          !e.isLoggedIn || (0 != s.HAS_GDPR && "1" != e.privacy_read_flag)
            ? window.setTimeout(u, 1e3)
            : o.getUpgradeResult(
                {},
                function (e) {
                  "success" == e.upgrade_result
                    ? O(!0)
                    : "fail" == e.upgrade_result
                    ? O(!1)
                    : window.setTimeout(u, 1e3);
                },
                function () {
                  window.setTimeout(u, 1e3);
                }
              );
        }
      };
      u(),
        "TWO_PORTION" == s.UPGRADE_TYPE &&
          window.setInterval(function () {
            var e = Z();
            checkConnectedStatus(e.connectStatus) &&
              e.isLoggedIn &&
              (s.ALREADY_NOTICE ||
                o.getUpdateInfoWarning({}, function (e) {
                  2 == e.upgrade_notice_flag &&
                    ((s.ALREADY_NOTICE = !0), showAlert("update_notice"));
                }));
          }, 6e4);
      var m = window.setInterval(function () {
        if (
          !s.ALREADY_OTA_NOTICE &&
          s.HAS_OTA_NEW_VERSION &&
          (J > 3 && window.clearInterval(m),
          J++,
          checkConnectedStatus(a.connectStatus()))
        ) {
          window.clearInterval(m), (s.ALREADY_OTA_NOTICE = !0);
          var e = Z();
          e.is_mandatory || E(e);
        }
      }, 1e3);
    }, 1200),
      a.init(),
      (checkTrafficLimitAlert = function (e, n) {
        if ("#login" == window.location.hash) return !1;
        var i = s.AP_STATION_SUPPORT
          ? o.getStatusInfo().ap_station_enable
          : "undefined";
        if (s.AP_STATION_SUPPORT && (void 0 === i || "" === i))
          return o.refreshAPStationStatus({}, t.noop()), !1;
        i = 1 == i;
        var a = t("#confirm-container:visible").length > 0,
          r =
            "CPE" == s.PRODUCT_TYPE &&
            "PPP" != n.opms_wan_mode &&
            "LTE_BRIDGE" != n.opms_wan_mode &&
            ("AUTO" != n.opms_wan_mode ||
              "AUTO_LTE_GATEWAY" != n.opms_wan_auto_mode);
        if (
          !n.isLoggedIn ||
          a ||
          (Y && G) ||
          !n.limitVolumeEnable ||
          (!i && !checkConnectedStatus(n.connectStatus)) ||
          r
        )
          return !1;
        if (V)
          return (
            window.setTimeout(function () {
              V = !1;
            }, 2e3),
            !1
          );
        var c = B(n);
        if (c.showConfirm && (0 == s.HAS_GDPR || "1" == n.privacy_read_flag)) {
          var d = null;
          c.usedPercent > 100 && !G
            ? ((Y = G = !0), (d = { msg: "traffic_beyond_disconnect_msg" }))
            : Y ||
              ((Y = !0),
              (G = !1),
              (d = {
                msg: "traffic_limit_disconnect_msg",
                params: [c.limitPercent],
              })),
            null != d &&
              showConfirm(d, function () {
                showLoading("disconnecting"),
                  o.disconnect({}, function (e) {
                    e.result ? successOverlay() : errorOverlay();
                  });
              });
        }
      }),
      (setStatusBarAllSSID = function (e, n, o) {
        var s = "";
        return (
          o
            ? ((s =
                e.length > 10
                  ? t.i18n.prop("ssid_title") + ":" + e.slice(0, 10) + "...;"
                  : t.i18n.prop("ssid_title") + ":" + e + ";"),
              n.length > 10
                ? (s +=
                    t.i18n.prop("ssid_title_5g") +
                    ":" +
                    n.slice(0, 10) +
                    "...;")
                : (s += t.i18n.prop("ssid_title_5g") + ":" + n))
            : (s =
                e.length >= 20 || n.length >= 20
                  ? t.i18n.prop("ssid_title") +
                    ":" +
                    e +
                    ";<br>" +
                    t.i18n.prop("ssid_title_5g") +
                    ":" +
                    n
                  : t.i18n.prop("ssid_title") +
                    ":" +
                    e +
                    ";" +
                    t.i18n.prop("ssid_title_5g") +
                    ":" +
                    n),
          s
        );
      }),
      s.HAS_SMS &&
        i.checkIsMenuExist("sms/smslist") &&
        (window.setInterval(function () {
          var e = Z();
          if ("#login" != window.location.hash && !b(e.simStatus)) {
            for (key in W) {
              var n = W[key];
              if (t.now() - n > 5e3) {
                delete W["m" + n];
                t(".bubbleItem#m" + n, "#buttom-bubble").fadeOut(
                  1e3,
                  function () {
                    t(this).remove();
                  }
                );
              }
            }
            e.isLoggedIn &&
              (e.newSmsReceived &&
                !K &&
                ((K = !0), o.resetNewSmsReceivedVar(), m()),
              e.smsReportReceived && (o.resetSmsReportReceivedVar(), _()));
          }
        }, 1e3),
        s.SMS_DATABASE_SORT_SUPPORT &&
          window.setInterval(function () {
            if (i.checkIsMenuExist("sms/smslist")) {
              var e = Z();
              e.isLoggedIn && z && !K && !b(e.simStatus) && ((K = !0), m());
            }
          }, 20001)),
      s.HAS_SMS &&
        (t(".bubbleItem", "#buttom-bubble")
          .live("mouseover", function () {
            var e = t(this);
            delete W[e.attr("id")];
          })
          .live("mouseout", function () {
            var e = t(this),
              n = t.now();
            (W["m" + n] = n),
              e.attr("id", "m" + n),
              t(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").data(
                "targetid",
                "m" + n
              );
          }),
        t(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble")
          .die()
          .live("click", function () {
            var e = t(this).data("targetid");
            delete W[e],
              t(".bubbleItem#" + e, "#buttom-bubble").fadeOut(1e3, function () {
                t(this).remove();
              });
          }));
  }
  function c() {
    var n = this,
      i = Z(),
      a = t("#h_ssid");
    "1" == i.wifiSwitchStatus && i.isLoggedIn
      ? (a.html(setStatusBarAllSSID(i.ssid, i.mainSSID5g, !0)), a.hide())
      : a.hide(),
      (X = i.opms_wan_auto_mode),
      (n.cpeMode = i.opms_wan_mode),
      (n.OTAStatus = e.observable(i.new_version_state)),
      (n.isDebugging = e.observable("1" == i.app_debug_mode)),
      (n.oduModeStatus = e.observable(P(i.odu_mode, i.cbns_server_enable))),
      (n.sleep_protection_mode_status = e.observable("1" == i.is_night_mode)),
      (n.isShowConnectionIcon = e.observable(!1)),
      (n.hasWifi = e.observable(s.HAS_WIFI)),
      (n.hasBattery = e.observable(s.HAS_BATTERY)),
      (n.networkType = e.observable(
        getNetworkType(i.networkType, i.isCaStatus)
      )),
      (n.signalCssClass = e.observable(
        w(i.signalImg, i.networkType, i.simStatus)
      ));
    var r = !!i.roamingStatus;
    (n.networkOperator = e.observable(
      d(i.spn_b1_flag, i.spn_name_data, i.spn_b2_flag, i.networkOperator, r)
    )),
      (n.roamingStatus = e.observable(i.roamingStatus ? "R" : "")),
      (n.wifiStatusImg = e.observable(v(i.wifiStatus, i.attachedDevices))),
      (n.wifiStatusCssClass = e.observable(S(i.wifiStatus, i.attachedDevices))),
      (n.simStatus = e.observable(T(i.simStatus))),
      (n.pinStatus = e.observable(i.pinStatus)),
      (n.pinStatusText = e.observable()),
      (n.batteryStatus = e.observable(i.batteryStatus)),
      (n.batteryPers = e.observable(I(i.battery_value, i.batteryStatus))),
      (n.batteryLevel = e.observable(i.battery_value + "%")),
      (n.connectStatus = e.observable(i.connectStatus)),
      (n.connectStatusText = e.observable()),
      (n.connectStatusTrans = e.observable()),
      (n.attachedDevices = e.observable(i.attachedDevices)),
      (n.showAttachedDevices = e.observable(i.wifiStatus)),
      (n.isLoggedIn = e.observable(i.isLoggedIn)),
      (n.showSmsDeleteConfirm = e.observable(!1)),
      (n.smsUnreadCount = e.observable(0)),
      (n.connectionCssClass = e.observable("")),
      h(
        n,
        i.opms_wan_mode,
        i.opms_wan_auto_mode,
        i.dhcp_wan_status,
        i.connectStatus,
        i.data_counter,
        i.connectWifiSSID,
        i.connectWifiStatus
      ),
      (n.wifi_5g_enable = e.observable(i.wifi_5g_enable)),
      U(n.wifi_5g_enable());
    var c = t("#langLogoBar");
    i.isLoggedIn
      ? (c.hasClass("langborderBg") || c.addClass("langborderBg"),
        t("#statusBar:hidden").show())
      : (c.hasClass("langborderBg") && c.removeClass("langborderBg"),
        t("#statusBar:visible").hide()),
      (n.connect = function () {
        showLoading("connecting"),
          o.connect(
            {},
            function (e) {
              e.result && refreshConnectStatus(n, e.status), successOverlay();
            },
            function (e) {
              errorOverlay();
            }
          );
      }),
      (n.disconnect = function () {
        showLoading("disconnecting"),
          o.disconnect(
            {},
            function (e) {
              e.result && refreshConnectStatus(n, e.status), successOverlay();
            },
            function (e) {
              errorOverlay();
            }
          );
      });
  }
  function d(e, t, n, o, s) {
    return "" == t
      ? o
      : ((t = decodeMessage(t)),
        "1" == e && "1" == n
          ? s
            ? o
            : t == o
            ? o
            : t + "  " + o
          : "1" == e
          ? t == o
            ? o
            : t + "  " + o
          : "1" == n
          ? s
            ? o
            : t
          : "0" == e && "0" == n
          ? s
            ? t == o
              ? o
              : t + "  " + o
            : t
          : "");
  }
  function u(e) {
    s.dbMsgs || (s.dbMsgs = []),
      0 == $.length &&
        t.each(s.dbMsgs, function (e, t) {
          $.push(t.id);
        }),
      t.each(e, function (e, n) {
        if (-1 == t.inArray(n.id, $))
          $.push(n.id), s.dbMsgs.push(n), "1" == n.tag && m(n, !1);
        else
          for (var o = 0; o < s.dbMsgs.length; o++)
            if (
              s.dbMsgs[o].id == n.id &&
              s.dbMsgs[o].content != n.content &&
              "1" == n.tag
            ) {
              (s.dbMsgs[o].content = n.content), m(n, !0);
              break;
            }
      }),
      (s.listMsgs = l(s.dbMsgs));
  }
  function l(e) {
    var o = {},
      i = [];
    return (
      (s.listMsgs = []),
      (groupDrafts = []),
      t.each(e, function (e, t) {
        if ("4" == t.tag && "" != t.groupId) return void groupDrafts.push(t);
        (t.target = t.number),
          parseInt(t.id, 10) > s.smsMaxId && (s.smsMaxId = t.id);
        var n = getLast8Number(t.number);
        n in o ? o[n].push(t) : ((o[n] = [t]), i.push(t));
      }),
      (i = n.sortBy(i, function (e) {
        return 0 - parseInt(e.id + "", 10);
      })),
      t.each(i, function (e, t) {
        for (
          var n = getLast8Number(t.number), i = 0, a = !1, r = 0;
          r < o[n].length;
          r++
        )
          o[n][r].isNew && i++,
            "4" == o[n][r].tag && "" == o[n][r].groupId && (a = !0);
        s.listMsgs.push({
          id: o[n][0].id,
          name: "",
          number: o[n][0].number,
          latestId: o[n][0].id,
          totalCount: o[n].length,
          newCount: i,
          latestSms: o[n][0].content,
          latestTime: o[n][0].time,
          checked: !1,
          itemId: getLast8Number(n),
          groupId: o[n][0].groupId,
          hasDraft: a,
        });
      }),
      s.listMsgs
    );
  }
  function m(e, n) {
    s.smsMaxId = e.id;
    var i = t.now();
    W["m" + i] = i;
    var a = e.number;
    ee &&
      s.phonebook &&
      0 == s.phonebook.length &&
      ((ee = !1), s.HAS_PHONEBOOK ? p() : (s.phonebook = []));
    for (m in s.phonebook)
      if (
        getLast8Number(s.phonebook[m].pbm_number) == getLast8Number(e.number)
      ) {
        a = s.phonebook[m].pbm_name;
        break;
      }
    var r = {
      mark: "m" + i,
      name: a,
      title: t.i18n.prop("sms"),
      titleTrans: "sms",
      tag: e.tag,
      content: e.content,
      datetime: e.time,
    };
    if (
      (null == te &&
        (te = t.template("newMessagePopTmpl", t("#newMessagePopTmpl"))),
      t(".bubbleItem:not(.report)", "#buttom-bubble").remove(),
      t.tmpl("newMessagePopTmpl", r).appendTo("#buttom-bubble"),
      "#sms" == window.location.hash || "#smslist" == window.location.hash)
    ) {
      var c =
          s.currentChatObject &&
          s.currentChatObject == getLast8Number(e.number),
        d = getLast8Number(e.number),
        u = t("#smslist-item-" + d),
        l = "";
      if (u && u.length > 0) {
        for (var m = 0; s.listMsgs && m < s.listMsgs.length; m++)
          if (
            getLast8Number(s.listMsgs[m].number) == getLast8Number(e.number)
          ) {
            (s.listMsgs[m].id = e.id),
              (s.listMsgs[m].latestId = e.id),
              (s.listMsgs[m].latestSms = e.content),
              (s.listMsgs[m].latestTime = e.time),
              n || (s.listMsgs[m].newCount++, s.listMsgs[m].totalCount++),
              (l = HTMLEncode(e.content));
            break;
          }
        if (
          (u.find(".smslist-item-checkbox p.checkbox").attr("id", e.id),
          u
            .find(".smslist-item-checkbox input:checkbox")
            .val(e.id)
            .attr("id", "checkbox" + e.id),
          !n)
        ) {
          var _ = u.find(".smslist-item-total-count").text();
          if (
            ((_ = Number(_.substring(1, _.length - 1))),
            u.find(".smslist-item-total-count").text("(" + (_ + 1) + ")"),
            !s.currentChatObject ||
              s.currentChatObject != getLast8Number(e.number))
          ) {
            var f = u.find(".smslist-item-new-count").removeClass("hide");
            f && f.text().length > 0
              ? f.text(Number(f.text()) + 1)
              : (f.text(1),
                u.hasClass("font-weight-bold") ||
                  u.addClass("font-weight-bold"),
                u.find(".cursorhand").attr("title", l),
                u.find(".sms-table-content").html(l));
          }
        }
        var g = u.find(".smslist-item-msg span").text(e.content);
        g.closest("td").prop("title", e.content),
          s.currentChatObject && s.currentChatObject == getLast8Number(e.number)
            ? g.closest("tr").removeClass("font-weight-bold")
            : g.closest("tr").addClass("font-weight-bold"),
          u
            .find(".smslist-item-repeat span")
            .die()
            .click(function () {
              forwardClickHandler(e.id);
            }),
          u.find("span.clock-time").text(e.time);
        var w = u;
        u.hide().remove(), t("#smslist-table").prepend(w.show());
      } else {
        var b = "";
        if (s.phonebook && s.phonebook.length > 0)
          for (m in s.phonebook)
            if (
              getLast8Number(s.phonebook[m].pbm_number) ==
              getLast8Number(e.number)
            ) {
              b = s.phonebook[m].pbm_name;
              break;
            }
        var h = {
          id: e.id,
          name: b,
          number: e.number,
          latestId: e.id,
          totalCount: 1,
          newCount: c ? 0 : 1,
          latestSms: e.content,
          latestTime: e.time,
          checked: !1,
          hasDraft: !1,
          itemId: getLast8Number(e.number),
        };
        null == Q && (Q = t.template("smsTableTmpl", t("#smsTableTmpl"))),
          t.tmpl("smsTableTmpl", { data: [h] }).prependTo("#smslist-table");
      }
      if (
        (s.HAS_PHONEBOOK
          ? t(".sms-add-contact-icon").removeClass("hide")
          : t(".sms-add-contact-icon").addClass("hide"),
        c)
      ) {
        var v = t("#talk-item-" + e.id, "#chatlist");
        v && v.length > 0
          ? (t(".J_content pre", v).html(dealContent(e.content)),
            t(".time .smslist-item-time", v).text(e.time),
            t(".smslist-item-repeat", v)
              .die()
              .click(function () {
                forwardClickHandler(e.id);
              }),
            t(".smslist-item-delete", v)
              .die()
              .click(function () {
                deleteSingleItemClickHandler(e.id);
              }))
          : (t("#smsOtherTmpl").tmpl(e).appendTo("#chatlist"),
            t(".clear-container", "#chatpanel").animate({
              scrollTop: t("#chatlist").height(),
            })),
          s.SMS_SET_READ_WHEN_COMPLETE
            ? s.SMS_SET_READ_WHEN_COMPLETE &&
              e.receivedAll &&
              o.setSmsRead({ ids: [e.id] }, t.noop)
            : o.setSmsRead({ ids: [e.id] }, t.noop);
      }
      enableCheckbox(t("#smslist-checkAll"));
    }
  }
  function _() {
    ee &&
      s.phonebook &&
      0 == s.phonebook.length &&
      ((ee = !1), s.HAS_PHONEBOOK ? p() : (s.phonebook = [])),
      o.getSMSDeliveryReport(
        { page: 0, smsCount: 10 },
        function (e) {
          var n = e.messages,
            o = [];
          t.each(n, function (e, n) {
            -1 == t.inArray(n.number, o) &&
              (o.push(n.number),
              window.setTimeout(function () {
                var o = t.now();
                (W["m" + o] = o), (n.name = n.number);
                for (e in s.phonebook)
                  if (
                    getLast8Number(s.phonebook[e].pbm_number) ==
                    getLast8Number(n.number)
                  ) {
                    n.name = s.phonebook[e].pbm_name;
                    break;
                  }
                var i = t.i18n.prop("sms_delivery_report_" + n.content),
                  a = {
                    mark: "m" + o,
                    name: n.name,
                    title: t.i18n.prop("sms_report"),
                    titleTrans: "sms_report",
                    content: i,
                    datetime: n.time,
                    report: "report",
                  };
                null == te &&
                  (te = t.template(
                    "newMessagePopTmpl",
                    t("#newMessagePopTmpl")
                  )),
                  t(".report", "#buttom-bubble").remove(),
                  t.tmpl("newMessagePopTmpl", a).appendTo("#buttom-bubble");
              }, 100));
          });
        },
        function () {}
      );
  }
  function p() {
    g(
      o.getPhoneBooks({ page: 0, data_per_page: 2e3, orderBy: "id", isAsc: !1 })
    );
  }
  function f(e, t) {
    return "AUTO" != e
      ? "STATIC" != e && "DHCP" != e && "PPPOE" != e
      : "AUTO_DHCP" != t && "AUTO_STATIC" != t && "AUTO_PPPOE" != t;
  }
  function g(e) {
    t.isArray(e.pbm_data) &&
      e.pbm_data.length > 0 &&
      (s.phonebook = e.pbm_data);
  }
  function w(e, t, n) {
    return (
      (t = t.toLowerCase()),
      (n = n ? n.toLowerCase() : ""),
      ("" != t &&
        "limited_service" != t &&
        "no_service" != t &&
        "limited service" != t &&
        "no service" != t &&
        "modem_init_complete" == n) ||
        (e = "_none"),
      "signal signal" + e
    );
  }
  function b(e) {
    return (
      "modem_sim_undetected" == e ||
      "modem_undetected" == e ||
      "modem_sim_destroy" == e ||
      "modem_waitpin" == e ||
      "modem_waitpuk" == e ||
      "modem_imsi_waitnck" == e
    );
  }
  function h(e, t, n, s, i, a, r, c) {
    var d = "icon_connection ";
    if ("AUTO" == t && "AUTO_DHCP" == n)
      d += "1" == s ? "connectionNone" : "disconnect";
    else if ("ppp_disconnected" == i) {
      if (r && "connect" == c)
        return void o.getHotspotList({}, function (t) {
          for (
            var n = "icon_connection ",
              o = "connecting ",
              s = 0,
              i = t.hotspotList.length;
            s < i;
            s++
          )
            if ("1" == t.hotspotList[s].connectStatus) {
              o = "wifi_connected";
              break;
            }
          (n += o), e.connectionCssClass(n);
        });
      d += r && "connecting" == c ? "connecting" : "disconnect";
    } else
      "ppp_connecting" == i || "wifi_connecting" == i
        ? (d += "connecting")
        : checkConnectedStatus(i)
        ? "0" != a.uploadRate && "0" != a.downloadRate
          ? (d += "connectionBoth")
          : "0" != a.uploadRate && "0" == a.downloadRate
          ? (d += "connectionUp")
          : "0" == a.uploadRate && "0" != a.downloadRate
          ? (d += "connectionDown")
          : (d += "connectionNone")
        : (d += "disconnect");
    e.connectionCssClass(d);
  }
  function v(e, t) {
    return e
      ? 0 == t
        ? "./img/wifi0.png"
        : "./img/wifi" + t + ".png"
      : "./img/wifi_off.png";
  }
  function S(e, t) {
    return e
      ? 0 == t
        ? "wifi_status0"
        : "wifi_status" + t
      : "wifi_status_off";
  }
  function T(e) {
    var t;
    switch (e) {
      case "modem_init_complete":
        t = "./img/ic_indicator_sd.png";
        break;
      case "modem_waitpin":
      case "modem_waitpuk":
      case "modem_sim_undetected":
      case "modem_undetected":
      case "modem_imsi_waitnck":
      case "modem_sim_destroy":
      case "modem_destroy":
        t = "./img/ic_indicator_sim_undetected.png";
        break;
      default:
        t = "./img/ic_indicator_sd.png";
    }
    return t;
  }
  function I(e, t) {
    var n = parseInt(e);
    return "0" == t
      ? n >= 0 && n <= 5
        ? "img/battery_out.png"
        : n > 5 && n <= 25
        ? "img/battery_one.png"
        : n > 25 && n <= 50
        ? "img/battery_two.png"
        : n > 50 && n < 100
        ? "img/battery_three.png"
        : "img/battery_full.png"
      : "2" == t
      ? "img/battery_full.png"
      : "img/battery_charging.gif";
  }
  function P(e, t) {
    return "1" == e
      ? "img/odu_only_status.png"
      : "1" == t
      ? "img/odu_partner_status_connected.png"
      : "img/odu_partner_status_disconnected.png";
  }
  function O(e) {
    if (t("#loading").is(":visible") || t("#confirm").is(":visible"))
      window.setTimeout(function () {
        O(e);
      }, 1e3);
    else {
      var n = e ? "ota_update_success" : "ota_update_failed";
      e
        ? showInfo(n, function () {
            "OTA" == s.UPGRADE_TYPE && o.clearUpdateResult({}, t.noop());
          })
        : showAlert(n, function () {
            "OTA" == s.UPGRADE_TYPE && o.clearUpdateResult({}, t.noop());
          });
    }
  }
  function A() {
    "low_battery" == o.getCurrentUpgradeState().current_upgrade_state &&
      (showInfo("ota_low_battery"), clearInterval(ne));
  }
  function k() {
    function e() {
      var n = [
          "upgrade_pack_redownload",
          "upgrade_prepare_install",
          "low_battery",
          "connecting_server",
          "connect_server_success",
          "upgrading",
          "accept",
        ],
        s = o.getCurrentUpgradeState();
      "fota_idle" == s.current_upgrade_state.toLowerCase()
        ? addTimeout(e, 1e3)
        : -1 != t.inArray(s.current_upgrade_state, n) && (hideLoading(), D());
    }
    (q = !0), t("#progress").is(":visible") || e();
    var n = 0,
      s = function () {
        var e = null;
        n <= 3 ? ((n += 1), (e = o.getCurrentUpgradeState())) : (e = Z());
        var t = e.current_upgrade_state;
        if (q) {
          if ("connecting_server" == t);
          else {
            if ("connect_server_failed" == t)
              return (
                (q = !1),
                window.clearTimeout(oe),
                hideProgressBar(),
                void showAlert("ota_connect_server_failed")
              );
            if ("connect_server_success" == t);
            else if ("upgrading" == t) y();
            else if ("download_success" == t);
            else if ("upgrade_pack_check_ok" == t);
            else {
              if ("download_failed" == t)
                return (
                  hideProgressBar(),
                  (q = !1),
                  showAlert("ota_download_failed"),
                  void window.clearTimeout(oe)
                );
              if ("server_unavailable" == t)
                return (
                  hideProgressBar(),
                  (q = !1),
                  showAlert("ota_connect_server_failed"),
                  void window.clearTimeout(oe)
                );
              if ("network_unavailable" == t)
                return (
                  hideProgressBar(),
                  (q = !1),
                  showAlert("ota_no_network"),
                  void window.clearTimeout(oe)
                );
              if ("pkg_exceed" == t)
                return (
                  hideProgressBar(),
                  (q = !1),
                  showAlert("ota_pkg_exceed"),
                  void window.clearTimeout(oe)
                );
              if ("accept" == t);
              else {
                if ("low_battery" == t)
                  return (
                    hideProgressBar(),
                    (q = !1),
                    showInfo("ota_low_battery"),
                    void window.clearTimeout(oe)
                  );
                if ("upgrade_pack_error" == t)
                  return (
                    hideProgressBar(),
                    (q = !1),
                    showInfo("ota_md5_error"),
                    void window.clearTimeout(oe)
                  );
                if ("upgrade_prepare_install" == t)
                  return (
                    hideProgressBar(),
                    (q = !1),
                    o.removeTimerThings(
                      "current_upgrade_state",
                      function () {}
                    ),
                    showInfo("ota_download_success"),
                    window.clearTimeout(oe),
                    void (ne = setInterval(function () {
                      A();
                    }, 1e3))
                  );
                if ("checking" == t || "fota_idle" == t);
                else if ("upgrade_pack_redownload" != t)
                  return (
                    (q = !1), hideProgressBar(), void window.clearTimeout(oe)
                  );
              }
            }
          }
          oe = window.setTimeout(s, 1e3);
        }
      };
    q ? (oe = window.setTimeout(s, 100)) : window.clearTimeout(oe);
  }
  function C(e) {
    var t = o.getUserChoice();
    if (e) {
      var n = Z();
      if (
        !checkConnectedStatus(n.connectStatus) &&
        "connect" != n.connectWifiStatus
      )
        return void showAlert("ota_network_disconnected");
      "none" == t.if_has_select
        ? L()
        : "accept" == t.if_has_select
        ? k()
        : "cancel" == t.if_has_select
        ? showAlert("ota_have_cancel")
        : "downloading_cancel" == t.if_has_select &&
          showAlert("ota_have_cancel");
    } else
      "none" == t.if_has_select
        ? M()
        : "accept" == t.if_has_select
        ? k()
        : "cancel" == t.if_has_select || t.if_has_select;
  }
  function y() {
    o.getPackSizeInfo({}, function (e) {
      var n;
      (n =
        0 == parseInt(e.pack_total_size)
          ? 0
          : parseInt(
              (100 * parseInt(e.download_size)) / parseInt(e.pack_total_size)
            )),
        n > 100 && (n = 100),
        n > 0 &&
          (n > 95 &&
            showProgressBar(
              "ota_update",
              "<br/>" + t.i18n.prop("ota_update_warning")
            ),
          setProgressBar(n));
    });
  }
  function L() {
    o.setUpgradeSelectOp({ selectOp: "1" }, function (e) {
      "success" == e.result && k();
    });
  }
  function M() {
    o.setUpgradeSelectOp({ selectOp: "0" }, function (e) {});
  }
  function D() {
    if (o.getMandatory().is_mandatory)
      showProgressBar(
        "ota_update",
        "<br/>" + t.i18n.prop("ota_update_warning")
      );
    else {
      var e = "";
      "OTA" == s.UPGRADE_TYPE &&
        (e =
          "<br/><br/><button id='btnStopUpgrade' onclick='stopOTAUpgrade();' class='btn-1 btn-primary'>" +
          t.i18n.prop("cancel") +
          "</button>"),
        showProgressBar(
          "ota_update",
          "<br/>" + t.i18n.prop("ota_update_warning") + e
        );
    }
    setProgressBar(0);
  }
  function E(e) {
    var n = e.current_upgrade_state;
    if ("upgrade_pack_redownload" == n)
      showConfirm("ota_interrupted", {
        ok: function () {
          C(1);
        },
        no: function () {
          C(0);
        },
      });
    else {
      var s = [
        "upgrade_prepare_install",
        "low_battery",
        "connecting_server",
        "connect_server_success",
        "upgrading",
        "accept",
      ];
      if (-1 != t.inArray(n, s)) k();
      else {
        var i = o.getNewVersionInfo(),
          a = "";
        i.dm_new_version &&
          (a = "<br/>" + t.i18n.prop("ota_version") + i.dm_new_version);
        var r = "",
          c = o.getParams({
            nv: ["newsoftware_remind_times"],
          }).newsoftware_remind_times;
        c > 0 && (r = "<br/>" + t.i18n.prop("postpone_time", c)),
          showConfirm(
            t.i18n.prop("ota_new_version") + a + r,
            {
              ok: function () {
                C(1);
              },
              no: function () {
                C(0);
              },
            },
            140,
            "yes",
            "postpone"
          );
      }
    }
  }
  function N(e) {
    (Y = !!e), (G = !!e), e || (V = !0);
  }
  function R(e) {
    (G = !!e), e || (V = !0);
  }
  function B(e) {
    var t = { showConfirm: !1, limitPercent: e.limitVolumePercent };
    if ("1" == e.limitVolumeType) {
      var n =
        parseInt(e.data_counter.monthlySent, 10) +
        parseInt(e.data_counter.monthlyReceived, 10);
      (t.usedPercent = (n / e.limitVolumeSize) * 100),
        t.usedPercent > t.limitPercent &&
          ((t.showConfirm = !0), (t.type = "data"));
    } else
      (t.usedPercent =
        (e.data_counter.monthlyConnectedTime / e.limitVolumeSize) * 100),
        t.usedPercent > t.limitPercent &&
          ((t.showConfirm = !0), (t.type = "time"));
    return t;
  }
  function U(e) {
    function t() {
      var e = o.getStatusInfo();
      "0" == e.radio_off || "1" == e.radio_off
        ? successOverlay()
        : n <= 20
        ? ((n += 1),
          addTimeout(function () {
            t();
          }, 2e3))
        : successOverlay();
    }
    if ("0" == e) {
      var n = 0;
      o.getWifiAdvance({}, function (e) {
        if ("a" == e.wifiBand) {
          var n = {};
          (n.name = "wifi_5g_enable"),
            (n.value = "1"),
            o.setNV(n, function () {
              showConfirm("wifi_5g_enalbe_alert", function () {
                showLoading(),
                  o.setWifiBand(
                    { wifiEnabled: "1", wifi_band: "b" },
                    function (e) {
                      "success" == e.result
                        ? setTimeout(function () {
                            t();
                          }, 2e3)
                        : errorOverlay();
                    }
                  );
              });
            });
        }
      });
    }
  }
  function x() {
    var e = window.location.href;
    if (-1 != e.indexOf("?no_connect")) {
      var t = o.getStatusInfo();
      "PPPOE" == t.opms_wan_mode ||
      ("AUTO" == t.opms_wan_mode && "AUTO_PPPOE" == t.opms_wan_auto_mode)
        ? (window.location.href =
            e.slice(0, e.indexOf("?no_connect")) + "#net_setting")
        : (window.location.href =
            e.slice(0, e.indexOf("?no_connect")) + "#home");
    } else
      -1 != e.indexOf("?flow_beyond")
        ? (window.location.href =
            e.slice(0, e.indexOf("?flow_beyond")) + "#traffic_alert")
        : -1 != e.indexOf("?fota_upgrade")
        ? (window.location.href =
            e.slice(0, e.indexOf("?fota_upgrade")) + "#ota_update")
        : (window.location.hash = "#home");
  }
  function H() {
    if ("#login" != window.location.hash) {
      var e = window.location.href;
      window.location.href = e.slice(0, e.indexOf("?no_connect")) + "#home";
    }
  }
  function j(e) {
    var t = o.getStatusInfo(),
      n = window.location.href;
    -1 != window.location.href.indexOf("?no_connect")
      ? "PPPOE" == t.opms_wan_mode ||
        ("AUTO" == t.opms_wan_mode && "AUTO_PPPOE" == t.opms_wan_auto_mode)
        ? e
          ? showPromptNoImg("pppoe_error_jump_login", function () {
              window.location.href =
                n.slice(0, n.indexOf("?no_connect")) + "#net_setting";
            })
          : showPromptNoImg("pppoe_error_jump")
        : "modem_init_complete" == t.simStatus
        ? "0" == t.ppp_dial_conn_fail_counter ||
          "" == t.ppp_dial_conn_fail_counter
          ? e
            ? showPromptNoImg("no_connect_jump_login", function () {
                H();
              })
            : showPromptNoImg("no_connect_jump")
          : e
          ? showPromptNoImg("connect_failed_jump_login", function () {
              H();
            })
          : showPromptNoImg("connect_failed_jump")
        : "modem_sim_undetected" == t.simStatus
        ? showPromptNoImg("no_simcard_jump", function () {
            H();
          })
        : "modem_sim_destroy" == t.simStatus || "modem_destroy" == t.simStatus
        ? showPromptNoImg("invalid_simcard_jump", function () {
            H();
          })
        : "modem_imsi_waitnck" == t.simStatus ||
          "modem_waitpin" == t.simStatus ||
          "modem_waitpuk" == t.simStatus
        ? e
          ? showPromptNoImg("locked_simcard_jump_login", function () {
              H();
            })
          : showPromptNoImg("locked_simcard_jump")
        : e
        ? showPromptNoImg("connect_failed_jump_login", function () {
            H();
          })
        : showPromptNoImg("connect_failed_jump")
      : -1 != window.location.href.indexOf("?flow_beyond")
      ? e
        ? showPromptNoImg("flow_beyond_jump_login", function () {
            o.setRedirectOff(),
              (window.location.href =
                n.slice(0, n.indexOf("?flow_beyond")) + "#traffic_alert");
          })
        : showPromptNoImg("flow_beyond_jump", function () {
            o.setRedirectOff();
          })
      : -1 != window.location.href.indexOf("?fota_upgrade") &&
        (e
          ? showPromptNoImg("fota_upgrade_jump_login", function () {
              o.setRedirectOff(),
                (window.location.href =
                  n.slice(0, n.indexOf("?fota_upgrade")) + "#ota_update");
            })
          : showPromptNoImg("fota_upgrade_jump", function () {
              o.setRedirectOff();
            }));
  }
  var W = {},
    Y = !1,
    G = !1,
    V = !1,
    z = !1,
    F = !1,
    K = !1,
    q = null,
    J = 0,
    Q = null,
    X = "",
    Z = function () {
      return o.getStatusInfo();
    },
    $ = [],
    ee = !0,
    te = null;
  gotoSmsList = function () {
    var e = "#sms";
    "#sms" == window.location.hash && (e = "#smslist"),
      checkFormContentModify(e) && (window.location.hash = e);
  };
  var ne = 0,
    oe = 0;
  return (
    (showOTAAlert = function () {
      if (o.getMandatory().is_mandatory) k();
      else {
        var e = {};
        (e = o.getCurrentUpgradeState()), E(e);
      }
    }),
    (stopOTAUpgrade = function () {
      o.setUpgradeSelectOp({ selectOp: "2" }, function (e) {}),
        (q = !1),
        window.clearTimeout(oe),
        hideLoading(),
        showAlert("ota_cancel");
    }),
    {
      init: r,
      setTrafficAlertPopuped: N,
      setTrafficAlert100Popuped: R,
      getTrafficResult: B,
      showOTAAlert: showOTAAlert,
      gotoRelevantHashByFlag: x,
      setRedirectTips: j,
    }
  );
});
//# sourceMappingURL=../../sourcemaps/status/statusBar.js.map
