define([
  "knockout",
  "service",
  "jquery",
  "config/config",
  "underscore",
  "status/statusBar",
  "echarts",
  "echarts/chart/pie",
], function (e, t, n, a, i, s, o) {
  function r() {
    var e = t.getWifiModuleSwitchStatus(),
      n = t.getWifiAccessPointInfo();
    return wifiFilterAPInfo(
      e,
      n,
      a.WIFICHIPINDEX.FIRST,
      a.ACCESSPOINTINDEX.FIRST,
      a.WIFICHIPINDEX,
      a.ACCESSPOINTINDEX
    );
  }
  function d() {
    var e = t.getWifiModuleSwitchStatus(),
      n = t.getWifiAccessPointInfo();
    return wifiFilterAPInfo(
      e,
      n,
      a.WIFICHIPINDEX.SECOND,
      a.ACCESSPOINTINDEX.FIRST,
      a.WIFICHIPINDEX,
      a.ACCESSPOINTINDEX
    );
  }
  function c(e) {
    if (void 0 === e || "" == e) return "";
    for (var t = e.split(";"), n = "", a = 0; a < t.length; a++)
      if ("" != t[a]) {
        var i = t[a].split(",");
        n = n + " + " + i[5] + "MHz@" + l(i[3]);
      }
    return n;
  }
  function l(e) {
    for (var t = 0; t < a.LTE_FREQUENCY_CODE.length; t++)
      if (a.LTE_FREQUENCY_CODE[t].name == e)
        return (
          a.LTE_FREQUENCY_CODE[t].value +
          "(B" +
          a.LTE_FREQUENCY_CODE[t].name +
          ")"
        );
    return "";
  }
  function u(e) {
    var t = "";
    if ("ca_deactivated" == e.wan_lte_ca || "ca_activated" == e.wan_lte_ca) {
      var n = l(e.lte_ca_pcell_band);
      t = e.lte_ca_pcell_bandwidth + "MHz@" + n + c(e.lte_multi_ca_scell_info);
    } else {
      var i = "";
      if ("" != e.wan_active_band)
        for (
          var s = a.LTE_FREQUENCY_CODE.length,
            o = e.wan_active_band.replace(/[^0-9]/gi, ""),
            r = 0;
          r < s;
          r++
        )
          if (a.LTE_FREQUENCY_CODE[r].name == o) {
            i =
              a.LTE_FREQUENCY_CODE[r].value +
              "MHz(B" +
              a.LTE_FREQUENCY_CODE[r].name +
              ")";
            break;
          }
      t = i;
    }
    return "" == t && (t = "— —"), t;
  }
  function p() {
    function o(e) {
      var t = new Date().getTime();
      return e.QrImageUrl ? e.QrImageUrl + "?_=" + t : "";
    }
    function c() {
      var e = t.getDeviceInfo();
      return (
        p.simSerialNumber(verifyDeviceInfo(e.simSerialNumber)),
        p.imei(verifyDeviceInfo(e.imei)),
        p.imsi(verifyDeviceInfo(e.imsi)),
        p.wifiLongMode("wifi_des_" + e.wifiRange),
        e
      );
    }
    function l() {
      var e = c();
      w.initShownStatus(e);
      var s = w.getWanIpAddr(e),
        o = i.template(n("#detailInfoTmpl").html()),
        r = t.getStatusInfo(),
        d = !1;
      a.AP_STATION_SUPPORT && "connect" == r.connectWifiStatus && (d = !0);
      var l = o({
        simSerialNumber: verifyDeviceInfo(e.simSerialNumber),
        imei: verifyDeviceInfo(e.imei),
        imsi: verifyDeviceInfo(e.imsi),
        signal: signalFormat(e.signal),
        ca_status: convertCAStatus(e.wan_lte_ca),
        lte_frequency_bands: -1 != n.inArray(e.network_type, f) ? "— —" : u(e),
        Z5g_snr:
          -1 != n.inArray(e.network_type, v) ||
          -1 != n.inArray(e.network_type, f)
            ? signalFormat_sinr(e.Z5g_SINR)
            : "— —",
        Z5g_rsrp:
          -1 != n.inArray(e.network_type, v) ||
          -1 != n.inArray(e.network_type, f)
            ? signalFormat(e.Z5g_rsrp)
            : "— —",
        hasWifi: a.HAS_WIFI && "1" == p.wifi_enable(),
        isCPE: -1 != a.DEVICE.toLowerCase().indexOf("cpe"),
        show24GMultiSsid: a.HAS_MULTI_SSID && "1" == e.chip1_ssid2_enable,
        show5GMultiSsid: a.HAS_MULTI_SSID && "1" == e.chip2_ssid2_enable,
        ssid: verifyDeviceInfo(e.ssid),
        max_access_num: verifyDeviceInfo(e.max_access_num),
        m_ssid: verifyDeviceInfo(e.ssidGuest),
        m_max_access_num: verifyDeviceInfo(e.max_access_num_guest),
        usedBand: verifyDeviceInfo(e.wan_active_band),
        ssid_5g: verifyDeviceInfo(e.m_ssid),
        m_ssid_5g: verifyDeviceInfo(e.m_ssid_guest),
        max_access_num_5g: verifyDeviceInfo(e.m_max_access_num),
        m_max_access_num_5g: verifyDeviceInfo(e.m_max_access_num_guest),
        show24GMainSsid: "1" == e.chip1_ssid1_enable,
        show5GMainSsid: "1" == e.chip2_ssid1_enable,
        odu_gps_lat: e.gps_lat,
        odu_gps_lon: e.gps_lon,
        wifi_long_mode: "wifi_des_" + e.wifiRange,
        lanDomain: verifyDeviceInfo(e.lanDomain),
        ipAddress: verifyDeviceInfo(e.ipAddress),
        showMacAddress: a.SHOW_MAC_ADDRESS,
        macAddress: verifyDeviceInfo(e.macAddress),
        showIpv4WanIpAddr: w.initStatus.showIpv4WanIpAddr,
        wanIpAddress: d ? e.station_ip_addr : s.wanIpAddress,
        showIpv6WanIpAddr: w.initStatus.showIpv6WanIpAddr,
        ipv6WanIpAddress: s.ipv6WanIpAddress,
        sw_version: verifyDeviceInfo(e.sw_version),
        fw_version: verifyDeviceInfo(e.fw_version),
        hw_version: verifyDeviceInfo(e.hw_version),
      });
      return n(l).translate();
    }
    var p = this,
      _ = r(),
      I = d();
    p.cpeMode = null;
    var S = t.getParams({ nv: ["OOM_TEMP_PRO"] }).OOM_TEMP_PRO;
    if (
      ((p.oom_temp_pro = S),
      (p.isSupportSD = a.SD_CARD_SUPPORT),
      (p.visibility = a.INCLUDE_MOBILE ? "visible" : "hidden"),
      (p.isCPE = "CPE" == a.PRODUCT_TYPE),
      (p.supportModeChange = !(
        void 0 !== a.OPMODE_CHANGE_SUPPORT && !a.OPMODE_CHANGE_SUPPORT
      )),
      (p.showQrCode = e.observable(
        !("0" == _.QrImageShow) && "1" == _.wifiSwitch
      )),
      (p.qrcodeSrc = e.observable(o(_))),
      (p.showQrCode_5g = e.observable(
        !("0" == I.QrImageShow) && "1" == _.wifiSwitch
      )),
      (p.qrcodeSrc_5g = e.observable(o(I))),
      (p.wifi_enable = e.observable(_.wifiSwitch)),
      p.isCPE)
    ) {
      var h = t.getOpMode();
      (p.cpeMode = h.opms_wan_mode),
        (p.isShowHomeConnect = e.observable(
          w.showHomeConnect(h.opms_wan_mode)
        )),
        (p.isWirelessMode = e.observable(w.showHomeConnect(h.opms_wan_mode)));
    } else
      (p.isShowHomeConnect = e.observable(!0)),
        (p.isWirelessMode = e.observable(!0));
    var g = t.getConnectionInfo();
    (p.networkType = e.observable(getNetworkType(g.networkType, g.isCaStatus))),
      (p.connectStatus = e.observable(g.connectStatus)),
      (p.canConnect = e.observable(!1)),
      (p.cStatus = e.computed(function () {
        return -1 != p.connectStatus().indexOf("_connected")
          ? m.CONNECTED
          : -1 != p.connectStatus().indexOf("_disconnecting")
          ? m.DISCONNECTING
          : -1 != p.connectStatus().indexOf("_connecting")
          ? m.CONNECTING
          : m.DISCONNECTED;
      })),
      (p.current_Flux = e.observable(transUnit(0, !1))),
      (p.connected_Time = e.observable(transSecond2Time(0))),
      (p.up_Speed = e.observable(transUnit(0, !0))),
      (p.down_Speed = e.observable(transUnit(0, !0))),
      (p.isLoggedIn = e.observable(!1)),
      (p.enableFlag = e.observable(!1)),
      (p.simSerialNumber = e.observable("")),
      (p.imei = e.observable("")),
      (p.imsi = e.observable("")),
      (p.wifiLongMode = e.observable("")),
      (p.trafficAlertEnable = e.observable(!1)),
      (p.trafficUsed = e.observable("")),
      (p.trafficLimited = e.observable("")),
      (p.wireDeviceNum = e.observable(0)),
      (p.wirelessDeviceNum = e.observable(0)),
      (p.iduIp = e.observable("--")),
      (p.iduMacAddress = e.observable("--")),
      (p.showSceneModeWindow = function () {
        showSettingWindow(
          "change_mode",
          "opmode/scene_mode_popup",
          "opmode/scene_mode_popup",
          400,
          300,
          function () {}
        );
      }),
      (p.currentOpMode = e.observable("0"));
    var A = !1;
    n("#showDetailInfo")
      .popover({
        html: !0,
        placement: "top",
        trigger: "focus",
        title: function () {
          return n.i18n.prop("device_info");
        },
        content: function () {
          return l();
        },
      })
      .on("shown.bs.popover", function () {
        A = !0;
        var e = n("#topContainer").outerHeight();
        n(window).scrollTop() > e && n(window).scrollTop(e);
      })
      .on("hidden.bs.popover", function () {
        A = !1;
      }),
      c(),
      setTimeout(function () {
        var e = t.getParams({ nv: ["privacy_read_flag", "loginfo"] });
        "0" == e.privacy_read_flag && "ok" == e.loginfo && a.HAS_GDPR
          ? showModifyFotaWindow(
              "change_mode",
              "privacy_policy",
              "privacy_policy",
              700,
              400,
              function () {}
            )
          : s.setRedirectTips(!0);
      }, 1e3),
      p.isCPE &&
        (t.getOpMode({}, function (e) {
          p.isLoggedIn("ok" == e.loginfo),
            "DHCP" == e.opms_wan_mode || "AUTO_DHCP" == e.opms_wan_mode
              ? p.enableFlag(!0)
              : "ppp_disconnected" != e.ppp_status
              ? p.enableFlag(!1)
              : p.enableFlag(!0);
        }),
        t.getSceneMode({}, function (e) {
          var t = "";
          switch (e.odu_mode) {
            case "0":
              t = "scene_mode_odu_idu";
              break;
            case "1":
              t = "scene_mode_odu";
          }
          n("#scenemode").attr("data-trans", t).text(n.i18n.prop(t));
        })),
      (p.connectHandler = function () {
        if (checkConnectedStatus(p.connectStatus()))
          if (a.AP_STATION_SUPPORT) {
            var e = t.getStatusInfo();
            1 == e.ap_station_enable
              ? "auto_dial" == e.dialMode &&
                showConfirm("ap_autodial_disconnect_alert", function () {
                  showLoading("disconnecting"),
                    t.disconnect({}, function (e) {
                      e.result ? successOverlay() : errorOverlay();
                    });
                })
              : (showLoading("disconnecting"),
                t.disconnect({}, function (e) {
                  e.result ? successOverlay() : errorOverlay();
                }));
          } else
            showLoading("disconnecting"),
              t.disconnect({}, function (e) {
                e.result ? successOverlay() : errorOverlay();
              });
        else
          t.getStatusInfo().roamingStatus
            ? showConfirm("dial_roaming_connect", function () {
                p.connect();
              })
            : p.connect();
      }),
      (p.connect = function () {
        var e = t.getStatusInfo(),
          n = s.getTrafficResult(e);
        if (e.limitVolumeEnable && n.showConfirm) {
          var a = null;
          n.usedPercent > 100
            ? ((a = { msg: "traffic_beyond_connect_msg" }),
              s.setTrafficAlertPopuped(!0))
            : ((a = {
                msg: "traffic_limit_connect_msg",
                params: [n.limitPercent],
              }),
              s.setTrafficAlert100Popuped(!1)),
            showConfirm(a, function () {
              w.doConnect();
            });
        } else w.doConnect();
      }),
      p.isCPE &&
        addInterval(function () {
          var e = t.getConnectionInfo();
          "DHCP" == e.opms_wan_mode ||
          ("AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode)
            ? p.enableFlag(!0)
            : "ppp_disconnected" != e.connectStatus
            ? p.enableFlag(!1)
            : p.enableFlag(!0);
        }, 1e3),
      addInterval(function () {
        t.getSignalStrength({}, function (e) {
          var t = signalFormat(convertSignal(e)),
            a = convertCAStatus(e.wan_lte_ca),
            i = -1 != n.inArray(e.network_type, f) ? "— —" : u(e),
            s =
              -1 != n.inArray(e.network_type, v) ||
              -1 != n.inArray(e.network_type, f)
                ? signalFormat_sinr(e.Z5g_SINR)
                : "— —",
            o =
              -1 != n.inArray(e.network_type, v) ||
              -1 != n.inArray(e.network_type, f)
                ? signalFormat(e.Z5g_rsrp)
                : "— —";
          n("#fresh_signal_strength").text(t),
            A &&
              (n("#popoverSignalTxt").text(t),
              n("#popoverFrequency").text(i),
              n("#popoverCaStatus").text(a),
              n("#popover5gSnrTxt").text(s),
              n("#popover5gRsrpTxt").text(o));
        }),
          w.refreshHomeData(p);
      }, 1e3);
  }
  function _() {
    (S = 0),
      (w.oldUsedData = null),
      (w.oldAlarmData = null),
      (I = o.init(n("#traffic_graphic")[0]));
    var t = n("#container")[0];
    e.cleanNode(t);
    var a = new p();
    e.applyBindings(a, t);
  }
  var v = ["ENDC"],
    f = ["SA"],
    m = { CONNECTED: 1, DISCONNECTED: 2, CONNECTING: 3, DISCONNECTING: 4 },
    I = null,
    S = 0,
    h = {
      title: {
        text: "",
        x: "center",
        y: "center",
        itemGap: 0,
        textStyle: {
          color: "#D8D8D8",
          fontFamily: "微软雅黑",
          fontSize: 20,
          fontWeight: "bolder",
        },
        subtextStyle: {
          color: "#D8D8D8",
          fontFamily: "微软雅黑",
          fontSize: 16,
          fontWeight: "bolder",
        },
      },
      animation: !1,
      series: [
        {
          name: "流量控制",
          type: "pie",
          radius: ["65", "93"],
          itemStyle: {
            normal: { label: { show: !1 }, labelLine: { show: !1 } },
          },
          data: [],
          selectedOffset: 3,
        },
      ],
      color: ["red", "red", "red", "red", "red"],
    },
    w = {
      initStatus: null,
      initShownStatus: function (e) {
        (this.initStatus = {}),
          "CPE" == a.PRODUCT_TYPE
            ? "DHCP" == e.opms_wan_mode ||
              "PPPOE" == e.opms_wan_mode ||
              ("AUTO" == e.opms_wan_mode &&
                ("AUTO_PPPOE" == e.opms_wan_auto_mode ||
                  "AUTO_DHCP" == e.opms_wan_auto_mode))
              ? ((this.initStatus.showIpv6WanIpAddr = !1),
                (this.initStatus.showIpv4WanIpAddr = !0))
              : "STATIC" == e.opms_wan_mode
              ? ((this.initStatus.showIpv6WanIpAddr = !1),
                (this.initStatus.showIpv4WanIpAddr = !0))
              : a.IPV6_SUPPORT
              ? "IP" == e.pdpType
                ? ((this.initStatus.showIpv6WanIpAddr = !1),
                  (this.initStatus.showIpv4WanIpAddr = !0))
                : "IPv6" == e.pdpType
                ? ((this.initStatus.showIpv6WanIpAddr = !0),
                  (this.initStatus.showIpv4WanIpAddr = !1))
                : "IPv4v6" == e.pdpType &&
                  ((this.initStatus.showIpv6WanIpAddr = !0),
                  (this.initStatus.showIpv4WanIpAddr = !0))
              : ((this.initStatus.showIpv6WanIpAddr = !1),
                (this.initStatus.showIpv4WanIpAddr = !0))
            : a.IPV6_SUPPORT
            ? "IP" == e.pdpType
              ? ((this.initStatus.showIpv6WanIpAddr = !1),
                (this.initStatus.showIpv4WanIpAddr = !0))
              : "IPv6" == e.pdpType
              ? ((this.initStatus.showIpv6WanIpAddr = !0),
                (this.initStatus.showIpv4WanIpAddr = !1))
              : "IPv4v6" == e.pdpType &&
                ((this.initStatus.showIpv6WanIpAddr = !0),
                (this.initStatus.showIpv4WanIpAddr = !0))
            : ((this.initStatus.showIpv6WanIpAddr = !1),
              (this.initStatus.showIpv4WanIpAddr = !0));
      },
      getWanIpAddr: function (e) {
        var t = { wanIpAddress: "", ipv6WanIpAddress: "" };
        if (
          "DHCP" == e.opms_wan_mode ||
          "PPPOE" == e.opms_wan_mode ||
          ("AUTO" == e.opms_wan_mode &&
            "AUTO_LTE_GATEWAY" != e.opms_wan_auto_mode)
        )
          t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress);
        else if ("STATIC" == e.opms_wan_mode)
          t.wanIpAddress = verifyDeviceInfo(e.staticWanIpAddress);
        else {
          var n = this.getConnectStatus(e.connectStatus);
          1 == n
            ? ((t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress)),
              (t.ipv6WanIpAddress = "— —"))
            : 2 == n
            ? ((t.wanIpAddress = "— —"),
              (t.ipv6WanIpAddress = verifyDeviceInfo(e.ipv6WanIpAddress)))
            : 3 == n
            ? ((t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress)),
              (t.ipv6WanIpAddress = verifyDeviceInfo(e.ipv6WanIpAddress)))
            : ((t.wanIpAddress = "— —"), (t.ipv6WanIpAddress = "— —"));
        }
        return t;
      },
      getConnectStatus: function (e) {
        return "ppp_disconnected" == e ||
          "ppp_connecting" == e ||
          "ppp_disconnecting" == e
          ? 0
          : "ppp_connected" == e
          ? 1
          : "ipv6_connected" == e
          ? 2
          : "ipv4_ipv6_connected" == e
          ? 3
          : void 0;
      },
      showHomeConnect: function (e) {
        return "PPP" == e || "AUTO_LTE_GATEWAY" == e || "LTE_BRIDGE" == e;
      },
      cachedAPStationBasic: null,
      cachedConnectionMode: null,
      getCanConnectNetWork: function () {
        var e = t.getStatusInfo();
        if ("modem_init_complete" != e.simStatus) return !1;
        var n = e.networkType.toLowerCase();
        return (
          ("" != n && "limited service" != n) || (n = "limited_service"),
          "no service" == n && (n = "no_service"),
          "limited_service" != n && "no_service" != n
        );
      },
      doConnect: function () {
        showLoading("connecting"),
          t.connect({}, function (e) {
            e.result ? successOverlay() : errorOverlay();
          });
      },
      refreshHomeData: function (e) {
        var n = t.getConnectionInfo();
        e.connectStatus(n.connectStatus),
          e.canConnect(this.getCanConnectNetWork()),
          e.networkType(getNetworkType(n.networkType, n.isCaStatus)),
          checkConnectedStatus(n.connectStatus)
            ? (e.current_Flux(
                transUnit(
                  parseInt(n.data_counter.currentReceived, 10) +
                    parseInt(n.data_counter.currentSent, 10),
                  !1
                )
              ),
              e.connected_Time(
                transSecond2Time(n.data_counter.currentConnectedTime)
              ),
              e.up_Speed(transUnit(n.data_counter.uploadRate, !0)),
              e.down_Speed(transUnit(n.data_counter.downloadRate, !0)))
            : (e.current_Flux(transUnit(0, !1)),
              e.connected_Time(transSecond2Time(0)),
              e.up_Speed(transUnit(0, !0)),
              e.down_Speed(transUnit(0, !0))),
          e.trafficAlertEnable(n.limitVolumeEnable),
          n.limitVolumeEnable &&
            ("1" == n.limitVolumeType
              ? (e.trafficUsed(
                  transUnit(
                    parseInt(n.data_counter.monthlySent, 10) +
                      parseInt(n.data_counter.monthlyReceived, 10),
                    !1
                  )
                ),
                e.trafficLimited(transUnit(n.limitDataMonth, !1)))
              : (e.trafficUsed(
                  transSecond2Time(n.data_counter.monthlyConnectedTime)
                ),
                e.trafficLimited(transSecond2Time(n.limitTimeMonth)))),
          !e.isCPE ||
          (e.isCPE &&
            ("PPP" == e.cpeMode ||
              "LTE_BRIDGE" == e.cpeMode ||
              "AUTO_LTE_GATEWAY" == e.cpeMode))
            ? w.updateEcharts(n)
            : w.allFreeEcharts(),
          w.refreshStationInfo(e);
      },
      allFreeEcharts: function () {
        S++;
        var e = w.data.free;
        (e.value = 1),
          (e.selected = !1),
          (h.series[0].data = [e]),
          (h.title.text = ""),
          w.setEcharts(h);
      },
      data: {
        start: {
          value: 50,
          name: "提醒值内未使用",
          itemStyle: { normal: { color: "#D8D8D8" } },
        },
        alarm: {
          value: 19.7,
          name: "警戒区",
          itemStyle: { normal: { color: "#8CC916" } },
        },
        alert: {
          value: 1,
          name: "提醒值",
          itemStyle: { normal: { color: "#FF5500" } },
        },
        free: {
          value: 50,
          name: "未使用",
          itemStyle: { normal: { color: "#D8D8D8" } },
        },
        left1: {
          value: 50,
          name: "提醒值内未使用",
          itemStyle: { normal: { color: "#D8D8D8" } },
        },
        used: {
          value: 30,
          name: "已使用",
          itemStyle: { normal: { color: "#8CC916" } },
        },
        full: {
          value: 30,
          name: "流量超出",
          itemStyle: { normal: { color: "#DF4313" } },
        },
      },
      oldUsedData: null,
      oldAlarmData: null,
      updateEcharts: function (e) {
        if (++S % 10 != 2) return !1;
        var t = 0,
          a = 0,
          s = 0,
          o = 0,
          r = 0,
          d = 0;
        if (e.limitVolumeEnable)
          if (((h.series[0].data = []), "1" == e.limitVolumeType)) {
            var c = transUnit(e.limitDataMonth, !1);
            if (
              ((h.title.text = c),
              (h.series[0].data = []),
              0 == e.limitDataMonth)
            ) {
              var l = w.data.used;
              (l.value = 1), (l.selected = !1), h.series[0].data.push(l);
            } else {
              var u = w.getDataInfo(c);
              if (
                ((t = u.data * w.getUnitValue(u.unit) * 1048576),
                (a =
                  parseInt(e.data_counter.monthlySent, 10) +
                  parseInt(e.data_counter.monthlyReceived, 10)),
                (s = (t * e.limitVolumePercent) / 100),
                a >= t)
              ) {
                var p = w.data.full;
                (p.value = 100), h.series[0].data.push(p);
              } else {
                s - a > 0
                  ? ((d = s - a), (o = t - s))
                  : ((r = a - s), (o = t - a));
                var _ = w.data.free;
                if (((_.value = o), h.series[0].data.push(_), r > 0)) {
                  var v = w.data.alarm;
                  (v.value = r), h.series[0].data.push(v);
                }
                var f = w.data.alert;
                if (((f.value = t / 200), h.series[0].data.push(f), d > 0)) {
                  var m = w.data.left1;
                  (m.value = d), h.series[0].data.push(m);
                }
                var l = w.data.used;
                (l.value = s - a > 0 ? a : s), h.series[0].data.push(l);
              }
            }
          } else if (
            ((h.title.text = e.limitTimeMonthSource + n.i18n.prop("hours")),
            (h.series[0].data = []),
            0 == e.limitTimeMonth)
          ) {
            var l = w.data.used;
            (l.value = 1), (l.selected = !1), h.series[0].data.push(l);
          } else if (
            ((t = e.limitTimeMonth),
            (a = e.data_counter.monthlyConnectedTime),
            (s = (t * e.limitVolumePercent) / 100),
            a >= t)
          ) {
            var I = w.data.full;
            (I.value = 100), h.series[0].data.push(I);
          } else {
            s - a > 0 ? ((d = s - a), (o = t - s)) : ((r = a - s), (o = t - a));
            var g = w.data.free;
            if (((g.value = o), h.series[0].data.push(g), r > 0)) {
              var A = w.data.alarm;
              (A.value = r), h.series[0].data.push(A);
            }
            var C = w.data.alert;
            if (((C.value = t / 200), h.series[0].data.push(C), d > 0)) {
              var D = w.data.left1;
              (D.value = d), h.series[0].data.push(D);
            }
            var T = w.data.used;
            (T.value = s - a > 0 ? a : s), h.series[0].data.push(T);
          }
        else {
          var l = w.data.used;
          (l.value = 0),
            (l.selected = !1),
            (h.series[0].data = [l]),
            (h.title.text = "");
        }
        var E = i.find(h.series[0].data, function (e) {
            return "已使用" == e.name;
          }),
          b = i.find(h.series[0].data, function (e) {
            return "警戒区" == e.name;
          });
        b || (b = { value: 0 }),
          void 0 === E
            ? w.setEcharts(h)
            : (w.oldUsedData == E.value && w.oldAlarmData == b.value) ||
              ((w.oldUsedData = E.value),
              (w.oldAlarmData = b.value),
              w.setEcharts(h));
      },
      setEcharts: function (e) {
        var t = w.data.start;
        (t.value = 0.001), (t.selected = !1);
        var n = [t].concat(e.series[0].data);
        (e.series[0].data = n),
          I.setOption(e, !0),
          addTimeout(function () {
            I.resize();
          }, 1e3);
      },
      getUnit: function (e) {
        return "1024" == e ? "GB" : "1048576" == e ? "TB" : "MB";
      },
      getUnitValue: function (e) {
        return (
          (e = e.toUpperCase()),
          "GB" == e ? "1024" : "TB" == e ? "1048576" : "1"
        );
      },
      getDataInfo: function (e) {
        return { data: /\d+(.\d+)?/.exec(e)[0], unit: /[A-Z]{1,2}/.exec(e)[0] };
      },
      refreshStationInfo: function (e) {
        S % 10 == 2 &&
          t.getAttachedCableDevices({}, function (t) {
            e.iduIp(t.attachedDevices[0].ipAddress),
              e.iduMacAddress(t.attachedDevices[0].macAddress);
          });
      },
    };
  return { init: _ };
});
//# sourceMappingURL=../sourcemaps/home.js.map
