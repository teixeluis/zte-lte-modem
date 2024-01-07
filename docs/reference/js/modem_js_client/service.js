define(["underscore", "jquery", "config/config"], function (e, t, n) {
  function r(e, t) {
    return _(e, null, null, !1, t);
  }
  function i(e, t, n, r) {
    _(e, t, n, !0, r);
  }
  function _(e, r, i, _, s) {
    var o = null;
    if (
      n.ACCESSIBLE_ID_SUPPORT &&
      s &&
      "LOGIN" != e.goformId &&
      "SET_WEB_LANGUAGE" != e.goformId
    ) {
      var a = hex_md5(rd0 + rd1),
        u = hr({ nv: "RD" }).RD,
        c = hex_md5(a + u);
      e.AD = c;
    }
    return e.isTest
      ? ((o = simulate.simulateRequest(e, r, i, _, s)),
        _
          ? void setTimeout(function () {
              r(o);
            }, getRandomInt(120) + 50)
          : o)
      : (t.ajax({
          type: s ? "POST" : "GET",
          url: s
            ? "/goform/goform_set_cmd_process"
            : e.cmd
            ? "/goform/goform_get_cmd_process"
            : "/goform/goform_set_cmd_process",
          data: e,
          dataType: "json",
          async: !!_,
          cache: !1,
          error: function (e) {
            _
              ? i(e)
              : 200 == e.status &&
                (o = jQuery.parseJSON("(" + e.responseText + ")"));
          },
          success: function (e) {
            _ ? r(e) : (o = e);
          },
        }),
        _ ? void 0 : o);
  }
  function s(e, n, _, s, o, a) {
    function u(e, t, n) {
      if (((n = n || t), isErrorObject(e)))
        switch (e.errorType) {
          case "cellularNetworkError":
          case "deviceError":
          case "wifiConnectionError":
            Zi.receivedNonSpecificError(e);
            break;
          default:
            n(e);
        }
      else t(e);
    }
    var c,
      d = e[0],
      l = e[1],
      p = e[2];
    if (n && "string" == typeof n.errorType) {
      if (((c = t.extend(Qi, n)), !l)) return c;
      u(c, l, p);
    } else {
      c = t.extend({}, n);
      var m;
      if (((m = _ ? _(d, a) : d), !l)) {
        if (m && (m.cmd || m.goformId)) {
          var f = r(m, a);
          c = s ? t.extend({}, s(f)) : f;
        }
        return c;
      }
      m && (m.cmd || m.goformId)
        ? i(
            m,
            function (e) {
              (c = s ? t.extend({}, s(e)) : t.extend({}, e)),
                m.notCallback || u(c, l, p);
            },
            function () {
              (c = o
                ? t.extend(Qi, o)
                : t.extend(Qi, { errorType: "Unknown" })),
                u(c, l, p);
            },
            a
          )
        : u(c, l, p);
    }
  }
  function o() {
    function e(e, t) {
      var r = {};
      r.isTest = Ji;
      var i = n.PASSWORD_ENCODE
        ? "WPAPSK1_encode,m_WPAPSK1_encode,"
        : "WPAPSK1,m_WPAPSK1,";
      return (
        (r.cmd =
          "m_ssid_enable,RadioOff,NoForwarding,m_NoForwarding," +
          i +
          "wifi_attr_max_station_number,SSID1,AuthMode,HideSSID,MAX_Access_num,EncrypType,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,wifi_ap_mode_set,m_band_enable,wifi_sta_switch_onoff,wifi_band,wifi_syncparas_flag"),
        (r.multi_data = 1),
        r
      );
    }
    function r(e) {
      if (e) {
        return {
          wifi_ap_mode_set: e.wifi_ap_mode_set,
          wifi_enable: e.RadioOff,
          multi_ssid_enable: e.m_ssid_enable,
          MAX_Station_num: t.isNumeric(e.wifi_attr_max_station_number)
            ? e.wifi_attr_max_station_number
            : n.MAX_STATION_NUMBER,
          AuthMode: e.AuthMode,
          SSID: e.SSID1,
          broadcast: e.HideSSID,
          apIsolation: e.NoForwarding,
          passPhrase: n.PASSWORD_ENCODE
            ? Base64.decode(e.WPAPSK1_encode)
            : e.WPAPSK1,
          MAX_Access_num: e.MAX_Access_num,
          cipher: "TKIP" == e.EncrypType ? "0" : "AES" == e.EncrypType ? 1 : 2,
          m_SSID: e.m_SSID,
          m_broadcast: e.m_HideSSID,
          m_apIsolation: e.m_NoForwarding,
          m_MAX_Access_num: e.m_MAX_Access_num,
          m_AuthMode: e.m_AuthMode,
          m_passPhrase: n.PASSWORD_ENCODE
            ? Base64.decode(e.m_WPAPSK1_encode)
            : e.m_WPAPSK1,
          m_cipher:
            "TKIP" == e.m_EncrypType ? "0" : "AES" == e.m_EncrypType ? 1 : 2,
          m_band_enable: e.m_band_enable,
          wifi_sta_switch_onoff: e.wifi_sta_switch_onoff,
          wifiband: e.wifi_band,
          wifi_syncparas_flag: e.wifi_syncparas_flag,
        };
      }
      return Qi;
    }
    return s(arguments, {}, e, r, null, !1);
  }
  function a() {
    function e(e) {
      var t = {
        goformId: "SET_WIFI_SSID1_SSID2_SETTINGS",
        isTest: Ji,
        ssid: e.SSID,
        broadcastSsidEnabled: e.broadcast,
        MAX_Access_num: e.station,
        security_mode: e.AuthMode,
        cipher: e.cipher,
        NoForwarding: e.NoForwarding,
        m_SSID: e.m_SSID,
        m_HideSSID: e.m_broadcast,
        m_MAX_Access_num: e.m_station,
        m_AuthMode: e.m_AuthMode,
        cipher: e.m_cipher,
        m_NoForwarding: e.m_NoForwarding,
        wifi_syncparas_flag: e.wifi_syncparas_flag,
      };
      return (
        "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode
          ? ((t.security_shared_mode = e.cipher),
            (t.passphrase = n.PASSWORD_ENCODE
              ? Base64.encode(e.passPhrase)
              : e.passPhrase))
          : (t.security_shared_mode = "NONE"),
        "WPAPSKWPA2PSK" == e.m_AuthMode || "WPA2PSK" == e.m_AuthMode
          ? ((t.m_EncrypType = e.m_cipher),
            (t.m_WPAPSK1 = n.PASSWORD_ENCODE
              ? Base64.encode(e.m_passPhrase)
              : e.m_passPhrase))
          : (t.m_EncrypType = "NONE"),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function u() {
    function e(e) {
      var t = {
        goformId: "SET_WIFI_SSID1_SETTINGS",
        isTest: Ji,
        ssid: e.SSID,
        broadcastSsidEnabled: e.broadcast,
        MAX_Access_num: e.station,
        security_mode: e.AuthMode,
        cipher: e.cipher,
        NoForwarding: e.NoForwarding,
      };
      return (
        "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode
          ? ((t.security_shared_mode = e.cipher),
            (t.passphrase = n.PASSWORD_ENCODE
              ? Base64.encode(e.passPhrase)
              : e.passPhrase))
          : (t.security_shared_mode = "NONE"),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function c() {
    function e(e) {
      var t = {
        goformId: "SET_WIFI_SSID2_SETTINGS",
        isTest: Ji,
        m_SSID: e.m_SSID,
        m_HideSSID: e.m_broadcast,
        m_MAX_Access_num: e.m_station,
        m_AuthMode: e.m_AuthMode,
        cipher: e.m_cipher,
        m_NoForwarding: e.m_NoForwarding,
      };
      return (
        "WPAPSKWPA2PSK" == e.m_AuthMode || "WPA2PSK" == e.m_AuthMode
          ? ((t.m_EncrypType = e.m_cipher),
            (t.m_WPAPSK1 = n.PASSWORD_ENCODE
              ? Base64.encode(e.m_passPhrase)
              : e.m_passPhrase))
          : (t.m_EncrypType = "NONE"),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function d() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "CHANGE_DEFAULT_WIFI_OR_PASSWORD_REMIND"),
        (n.password_remind = "0"),
        (n.web_wifi_password_remind = "0"),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function l() {
    function e(e) {
      var t = {
        goformId: "SET_M_WIFI_INFO",
        isTest: Ji,
        m_WirelessMode: e.m_WirelessMode,
        m_CountryCode: e.m_CountryCode,
      };
      return (
        n.WIFI_BAND_SUPPORT && (t.m_wifi_band = e.m_wifi_band),
        (t.m_Channel = e.m_Channel),
        n.WIFI_BANDWIDTH_SUPPORT && (t.m_wifi_11n_cap = e.m_wifi_11n_cap),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function p() {
    function e(e) {
      return {
        goformId: "SET_WIFI_AP_MODE",
        isTest: Ji,
        wifi_ap_mode_set: e.wifi_ap_mode_set,
      };
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function m() {
    function e(e) {
      var n = e;
      return (
        "0" == e.wifiEnabled && (n = { wifiEnabled: e.wifiEnabled }),
        t.extend({ goformId: "SET_WIFI_INFO", isTest: Ji }, n)
      );
    }
    function n(e) {
      return e || Qi;
    }
    Je(arguments, e, n);
  }
  function f() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji), (n.cmd = "AuthMode,passPhrase"), (n.multi_data = 1), n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.AuthMode = e.AuthMode),
          (t.passPhrase = n.PASSWORD_ENCODE
            ? Base64.decode(e.passPhrase)
            : e.passPhrase),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function g() {
    function e(e, t) {
      var r = {};
      return (
        (r.isTest = Ji),
        (r.goformId = "SET_WIFI_SECURITY_INFO"),
        (r.AuthMode = e.AuthMode),
        "WPAPSKWPA2PSK" == r.AuthMode &&
          (r.passPhrase = n.PASSWORD_ENCODE
            ? Base64.encode(e.passPhrase)
            : e.passPhrase),
        r
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function v() {
    function e(e, t) {
      return { isTest: Ji, cmd: "station_list" };
    }
    function n(e) {
      for (var n = [], r = e.station_list, i = 0; r && i < r.length; i++) {
        var _ = {};
        _.macAddress = r[i].mac_addr;
        var s = r[i].hostname;
        (_.hostName = "" == s ? t.i18n.prop("unknown") : s),
          (_.ipAddress = r[i].ip_addr),
          (_.ssid_index = r[i].ssid_index),
          n.push(_);
      }
      return { attachedDevices: n };
    }
    return s(arguments, {}, e, n, null, !1);
  }
  function w() {
    function e(e, t) {
      return { isTest: Ji, cmd: "lan_station_list" };
    }
    function n(e) {
      for (
        var n = [], r = e.lan_station_list || e.station_list, i = 0;
        r && i < r.length;
        i++
      ) {
        var _ = {};
        _.macAddress = r[i].mac_addr;
        var s = r[i].hostname;
        (_.hostName = "" == s ? t.i18n.prop("unknown") : s),
          (_.ipAddress = r[i].ip_addr),
          n.push(_);
      }
      return { attachedDevices: n };
    }
    return s(arguments, {}, e, n, null, !1);
  }
  function S() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "Language,cr_version,wa_inner_version"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.Language = e && e.Language ? e.Language : "en"),
          (t.rd_params0 = e.wa_inner_version),
          (t.rd_params1 = e.cr_version),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function h() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_WEB_LANGUAGE"),
        (n.Language = e.Language),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function T() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.current_network_mode = e.current_network_mode),
          (t.net_select_mode = e.net_select_mode),
          (t.m_netselect_save = e.m_netselect_save),
          (t.m_netselect_contents = e.m_netselect_contents),
          (t.net_select = e.net_select),
          (t.ppp_status = e.ppp_status),
          (t.modem_main_state = e.modem_main_state),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function P() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_BEARER_PREFERENCE"),
        (n.BearerPreference = e.strBearerPreference),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function I(e) {
    function r() {
      t.getJSON(
        "/goform/goform_get_cmd_process",
        { cmd: "m_netselect_status", _: new Date().getTime() },
        function (n) {
          "manual_selecting" == n.m_netselect_status
            ? setTimeout(r, 1e3)
            : t
                .getJSON(
                  "/goform/goform_get_cmd_process",
                  { cmd: "m_netselect_contents", _: new Date().getTime() },
                  function (t) {
                    "" != trim(t.m_netselect_contents)
                      ? i(t.m_netselect_contents)
                      : e(!1, []);
                  }
                )
                .error(function () {
                  e(!1, []);
                });
        }
      ).error(function () {
        e(!1, []);
      });
    }
    function i(t) {
      for (
        var n,
          r = /([^,;]*),([^,]*),([^,]*),([^,;]*)/g,
          i = [],
          s = b(),
          o = !!s.roamingStatus,
          a = s.rmcc + s.rmnc,
          u = _(
            s.spn_b1_flag,
            s.spn_name_data,
            s.spn_b2_flag,
            s.networkOperator,
            o
          );
        (n = r.exec(t));

      )
        a == n[3] && (n[2] = u),
          null != n &&
            i.push({
              strShortName: n[2].replace(/\"/g, ""),
              strNumeric: n[3].replace(/\D/g, ""),
              nRat: parseInt(n[4], 10),
              nState: parseInt(n[1], 10),
            });
      e(!0, i);
    }
    function _(e, t, n, r, i) {
      return "" == t
        ? r
        : ((t = decodeMessage(t)),
          "1" == e && "1" == n
            ? i
              ? r
              : t == r
              ? r
              : t + "  " + r
            : "1" == e
            ? t == r
              ? r
              : t + "  " + r
            : "1" == n
            ? i
              ? r
              : t
            : "0" == e && "0" == n
            ? i
              ? t == r
                ? r
                : t + "  " + r
              : t
            : "");
    }
    if (Ji)
      return void setTimeout(function () {
        i(simulate.m_netselect_contents);
      }, 500);
    var s = {};
    if (((s.goformId = "SCAN_NETWORK"), n.ACCESSIBLE_ID_SUPPORT)) {
      var o = hex_md5(rd0 + rd1),
        a = hr({ nv: "RD" }).RD,
        u = hex_md5(o + a);
      s.AD = u;
    }
    t.post(
      "/goform/goform_set_cmd_process",
      s,
      function (t) {
        "success" == t.result ? r() : e(!1, []);
      },
      "json"
    ).error(function () {
      e(!1, []);
    });
  }
  function b() {
    if (void 0 === t_.isLoggedIn) {
      var e = le();
      return {
        cbns_server_enable: t_.cbns_server_enable,
        app_debug_mode: t_.app_debug_mode,
        odu_mode: t_.odu_mode,
        networkType: t_.networkType,
        signalImg: t_.signalImg,
        networkOperator: t_.networkOperator,
        spn_b1_flag: t_.spn_b1_flag,
        spn_name_data: t_.spn_name_data,
        spn_b2_flag: t_.spn_b2_flag,
        connectStatus: t_.connectStatus,
        attachedDevices: t_.curr_connected_devices,
        roamingStatus: t_.roamingStatus,
        wifiStatus: t_.wifiStatus,
        wifiSwitchStatus: t_.wifiSwitchStatus,
        simStatus: t_.simStatus,
        pinStatus: t_.pinStatus,
        batteryStatus: t_.batteryStatus,
        batteryLevel: t_.batteryLevel,
        batteryPers: t_.batteryPers,
        batteryTime: t_.batteryTime,
        ssid: t_.ssid,
        mainSSID5g: t_.mainSSID5g,
        authMode: t_.authMode,
        data_counter: t_.data_counter,
        isLoggedIn: "loggedIn" == e.status,
        newSmsReceived: t_.newSmsReceived,
        smsReportReceived: t_.smsReportReceived,
        smsUnreadCount: t_.smsUnreadCount,
        limitVolumeEnable: t_.limitVolumeEnable,
        limitVolumeType: t_.limitVolumeType,
        limitVolumePercent: t_.limitVolumePercent,
        limitVolumeSize: t_.limitVolumeSize,
        limitVolumeSizeSource: t_.limitVolumeSizeSource,
        connectWifiProfile: t_.connectWifiProfile,
        connectWifiSSID: t_.connectWifiSSID,
        connectWifiStatus: t_.connectWifiStatus,
        multi_ssid_enable: t_.multi_ssid_enable,
        roamMode: t_.roamMode,
        opms_wan_mode: t_.opms_wan_mode,
        opms_wan_auto_mode: t_.opms_wan_auto_mode,
        dhcp_wan_status: t_.dhcp_wan_status,
        current_upgrade_state: t_.current_upgrade_state,
        is_mandatory: t_.is_mandatory,
        new_version_state: t_.new_version_state,
        allowRoamingUpdate: t_.allowRoamingUpdate,
        wifi_dfs_status: t_.wifi_dfs_status,
        radio_off: t_.radio_off,
        wifi_5g_enable: t_.wifi_5g_enable,
        battery_value: t_.battery_value,
        ap_station_enable: t_.ap_station_enable,
        ap_station_mode: t_.ap_station_mode,
        dialMode: t_.dialMode,
        isCaStatus: t_.isCaStatus,
        privacy_read_flag: t_.privacy_read_flag,
        ppp_dial_conn_fail_counter: t_.ppp_dial_conn_fail_counter,
        is_night_mode: t_.is_night_mode,
        pppoe_status: t_.pppoe_status,
        dhcp_wan_status: t_.dhcp_wan_status,
        static_wan_status: t_.static_wan_status,
        vpn_conn_status: t_.vpn_conn_status,
        rmcc: t_.rmcc,
        rmnc: t_.rmnc,
      };
    }
    return {
      cbns_server_enable: t_.cbns_server_enable,
      app_debug_mode: t_.app_debug_mode,
      odu_mode: t_.odu_mode,
      networkType: t_.networkType,
      signalImg: t_.signalImg,
      networkOperator: t_.networkOperator,
      spn_b1_flag: t_.spn_b1_flag,
      spn_name_data: t_.spn_name_data,
      spn_b2_flag: t_.spn_b2_flag,
      connectStatus: t_.connectStatus,
      attachedDevices: t_.curr_connected_devices,
      roamingStatus: t_.roamingStatus,
      wifiStatus: t_.wifiStatus,
      wifiSwitchStatus: t_.wifiSwitchStatus,
      simStatus: t_.simStatus,
      pinStatus: t_.pinStatus,
      batteryStatus: t_.batteryStatus,
      batteryLevel: t_.batteryLevel,
      batteryPers: t_.batteryPers,
      batteryTime: t_.batteryTime,
      ssid: t_.ssid,
      mainSSID5g: t_.mainSSID5g,
      authMode: t_.authMode,
      data_counter: t_.data_counter,
      isLoggedIn: t_.isLoggedIn,
      newSmsReceived: t_.newSmsReceived,
      smsReportReceived: t_.smsReportReceived,
      smsUnreadCount: t_.smsUnreadCount,
      limitVolumeEnable: t_.limitVolumeEnable,
      limitVolumeType: t_.limitVolumeType,
      limitVolumePercent: t_.limitVolumePercent,
      limitVolumeSize: t_.limitVolumeSize,
      limitVolumeSizeSource: t_.limitVolumeSizeSource,
      connectWifiProfile: t_.connectWifiProfile,
      connectWifiSSID: t_.connectWifiSSID,
      connectWifiStatus: t_.connectWifiStatus,
      multi_ssid_enable: t_.multi_ssid_enable,
      opms_wan_mode: t_.opms_wan_mode,
      opms_wan_auto_mode: t_.opms_wan_auto_mode,
      dhcp_wan_status: t_.dhcp_wan_status,
      roamMode: t_.roamMode,
      current_upgrade_state: t_.current_upgrade_state,
      is_mandatory: t_.is_mandatory,
      new_version_state: t_.new_version_state,
      allowRoamingUpdate: t_.allowRoamingUpdate,
      wifi_dfs_status: t_.wifi_dfs_status,
      radio_off: t_.radio_off,
      wifi_5g_enable: t_.wifi_5g_enable,
      battery_value: t_.battery_value,
      ap_station_enable: t_.ap_station_enable,
      ap_station_mode: t_.ap_station_mode,
      dialMode: t_.dialMode,
      isCaStatus: t_.isCaStatus,
      privacy_read_flag: t_.privacy_read_flag,
      ppp_dial_conn_fail_counter: t_.ppp_dial_conn_fail_counter,
      is_night_mode: t_.is_night_mode,
      pppoe_status: t_.pppoe_status,
      dhcp_wan_status: t_.dhcp_wan_status,
      static_wan_status: t_.static_wan_status,
      vpn_conn_status: t_.vpn_conn_status,
      rmcc: t_.rmcc,
      rmnc: t_.rmnc,
    };
  }
  function A() {
    var e = "1" == t_.limitVolumeType,
      t = {
        data_counter: t_.data_counter,
        connectStatus: t_.connectStatus,
        limitVolumeEnable: t_.limitVolumeEnable,
        limitVolumeType: t_.limitVolumeType,
        limitVolumePercent: t_.limitVolumePercent,
        networkType: t_.networkType,
        isCaStatus: t_.isCaStatus,
      };
    return (
      e
        ? ((t.limitDataMonth = t_.limitVolumeSize),
          (t.limitDataMonthSource = t_.limitVolumeSizeSource),
          (t.limitTimeMonth = 0))
        : ((t.limitTimeMonth = t_.limitVolumeSize),
          (t.limitTimeMonthSource = t_.limitVolumeSizeSource),
          (t.limitDataMonth = 0)),
      (t.opms_wan_mode = t_.opms_wan_mode),
      (t.opms_wan_auto_mode = t_.opms_wan_auto_mode),
      (t.odu_mode = t_.odu_mode),
      t
    );
  }
  function y() {
    t_.newSmsReceived = !1;
  }
  function E() {
    t_.smsReportReceived = !1;
  }
  function R() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "sms_capacity_info"), n;
    }
    function t(e) {
      return {
        nvTotal: parseInt(e.sms_nv_total, 10),
        nvUsed:
          parseInt(e.sms_nv_rev_total, 10) +
          parseInt(e.sms_nv_send_total, 10) +
          parseInt(e.sms_nv_draftbox_total, 10),
        simTotal: parseInt(e.sms_sim_total, 10),
        simUsed:
          parseInt(e.sms_sim_rev_total, 10) +
          parseInt(e.sms_sim_send_total, 10) +
          parseInt(e.sms_sim_draftbox_total, 10),
        nvReceive: parseInt(e.sms_nv_rev_total, 10),
        nvSend: parseInt(e.sms_nv_send_total, 10),
        nvDraft: parseInt(e.sms_nv_draftbox_total, 10),
        simReceive: parseInt(e.sms_sim_rev_total, 10),
        simSend: parseInt(e.sms_sim_send_total, 10),
        simDraft: parseInt(e.sms_sim_draftbox_total, 10),
      };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function N() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "CONNECT_NETWORK"),
        n
      );
    }
    function t(e) {
      "success" == e.result
        ? ((i = new Date().getTime()), U(n))
        : r({ result: !1 });
    }
    function n(e) {
      "ppp_connecting" == e.ppp_status
        ? (t_.connectStatus = "ppp_connecting")
        : checkConnectedStatus(e.ppp_status)
        ? (B(n),
          (t_.connectStatus = "ppp_connected"),
          r({ result: !0, status: t_.connectStatus }))
        : new Date().getTime() - i < 1e4
        ? (t_.connectStatus = "ppp_connecting")
        : (B(n), r({ result: !1 }));
    }
    var r = arguments[1],
      i = 0;
    return s(arguments, {}, e, t, null, !0);
  }
  function D() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "DISCONNECT_NETWORK"),
        n
      );
    }
    function t(e) {
      "success" == e.result
        ? ((i = new Date().getTime()), U(n))
        : r({ result: !1 });
    }
    function n(e) {
      "ppp_disconnecting" == e.ppp_status
        ? (t_.connectStatus = "ppp_disconnecting")
        : "ppp_disconnected" == e.ppp_status
        ? (B(n),
          (t_.connectStatus = "ppp_disconnected"),
          r({ result: !0, status: t_.connectStatus }))
        : new Date().getTime() - i < 1e4
        ? (t_.connectStatus = "ppp_disconnecting")
        : (B(n), r({ result: !1 }));
    }
    var r = arguments[1],
      i = 0;
    return s(arguments, {}, e, t, null, !0);
  }
  function M() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "apn_interface_version,APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19,m_profile_name,profile_name,wan_dial,apn_select,pdp_type,pdp_select,pdp_addr,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passwd,dns_mode,prefer_dns_manual,standby_dns_manual,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passwd,ipv6_dns_mode,ipv6_prefer_dns_manual,ipv6_standby_dns_manual,apn_num_preset,wan_apn_ui,profile_name_ui,pdp_type_ui,ppp_auth_mode_ui,ppp_username_ui,ppp_passwd_ui,dns_mode_ui,prefer_dns_manual_ui,standby_dns_manual_ui,ipv6_wan_apn_ui,ipv6_ppp_auth_mode_ui,ipv6_ppp_username_ui,ipv6_ppp_passwd_ui,ipv6_dns_mode_ui,ipv6_prefer_dns_manual_ui,ipv6_standby_dns_manual_ui"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e
        ? {
            APNs:
              e.APN_config0 +
              "||" +
              e.APN_config1 +
              "||" +
              e.APN_config2 +
              "||" +
              e.APN_config3 +
              "||" +
              e.APN_config4 +
              "||" +
              e.APN_config5 +
              "||" +
              e.APN_config6 +
              "||" +
              e.APN_config7 +
              "||" +
              e.APN_config8 +
              "||" +
              e.APN_config9 +
              "||" +
              e.APN_config10 +
              "||" +
              e.APN_config11 +
              "||" +
              e.APN_config12 +
              "||" +
              e.APN_config13 +
              "||" +
              e.APN_config14 +
              "||" +
              e.APN_config15 +
              "||" +
              e.APN_config16 +
              "||" +
              e.APN_config17 +
              "||" +
              e.APN_config18 +
              "||" +
              e.APN_config19,
            ipv6APNs:
              e.ipv6_APN_config0 +
              "||" +
              e.ipv6_APN_config1 +
              "||" +
              e.ipv6_APN_config2 +
              "||" +
              e.ipv6_APN_config3 +
              "||" +
              e.ipv6_APN_config4 +
              "||" +
              e.ipv6_APN_config5 +
              "||" +
              e.ipv6_APN_config6 +
              "||" +
              e.ipv6_APN_config7 +
              "||" +
              e.ipv6_APN_config8 +
              "||" +
              e.ipv6_APN_config9 +
              "||" +
              e.ipv6_APN_config10 +
              "||" +
              e.ipv6_APN_config11 +
              "||" +
              e.ipv6_APN_config12 +
              "||" +
              e.ipv6_APN_config13 +
              "||" +
              e.ipv6_APN_config14 +
              "||" +
              e.ipv6_APN_config15 +
              "||" +
              e.ipv6_APN_config16 +
              "||" +
              e.ipv6_APN_config17 +
              "||" +
              e.ipv6_APN_config18 +
              "||" +
              e.ipv6_APN_config19,
            apnMode: e.apn_mode,
            profileName:
              e.apn_interface_version >= 2
                ? e.profile_name_ui
                : e.m_profile_name || e.profile_name,
            wanDial: e.wan_dial,
            apnSelect: e.apn_select,
            pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
            pdpSelect: e.pdp_select,
            pdpAddr: e.pdp_addr,
            index: e.index,
            currIndex: e.Current_index,
            autoApns: e.apn_auto_config,
            autoApnsV6: e.ipv6_apn_auto_config,
            wanApn: e.apn_interface_version >= 2 ? e.wan_apn_ui : e.wan_apn,
            authMode:
              e.apn_interface_version >= 2
                ? e.ppp_auth_mode_ui.toLowerCase()
                : e.ppp_auth_mode.toLowerCase(),
            username:
              e.apn_interface_version >= 2 ? e.ppp_username_ui : e.ppp_username,
            password:
              e.apn_interface_version >= 2 ? e.ppp_passwd_ui : e.ppp_passwd,
            dnsMode: e.apn_interface_version >= 2 ? e.dns_mode_ui : e.dns_mode,
            dns1:
              e.apn_interface_version >= 2
                ? e.prefer_dns_manual_ui
                : e.prefer_dns_manual,
            dns2:
              e.apn_interface_version >= 2
                ? e.standby_dns_manual_ui
                : e.standby_dns_manual,
            wanApnV6:
              e.apn_interface_version >= 2 ? e.ipv6_wan_apn_ui : e.ipv6_wan_apn,
            authModeV6:
              e.apn_interface_version >= 2
                ? e.ipv6_ppp_auth_mode_ui.toLowerCase()
                : e.ipv6_ppp_auth_mode.toLowerCase(),
            usernameV6:
              e.apn_interface_version >= 2
                ? e.ipv6_ppp_username_ui
                : e.ipv6_ppp_username,
            passwordV6:
              e.apn_interface_version >= 2
                ? e.ipv6_ppp_passwd_ui
                : e.ipv6_ppp_passwd,
            dnsModeV6:
              e.apn_interface_version >= 2
                ? e.ipv6_dns_mode_ui
                : e.ipv6_dns_mode,
            dns1V6:
              e.apn_interface_version >= 2
                ? e.ipv6_prefer_dns_manual_ui
                : e.ipv6_prefer_dns_manual,
            dns2V6:
              e.apn_interface_version >= 2
                ? e.ipv6_standby_dns_manual_ui
                : e.ipv6_standby_dns_manual,
            apnNumPreset: e.apn_num_preset,
          }
        : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function C() {
    function e(e, t) {
      var r = {
        isTest: Ji,
        apn_action: "delete",
        apn_mode: "manual",
        index: e.index,
      };
      return (
        n.USE_IPV6_INTERFACE
          ? (r.goformId = "APN_PROC_EX")
          : (r.goformId = "APN_PROC"),
        r
      );
    }
    function t(e) {
      return "success" == e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function F() {
    function e(e, t) {
      if (n.USE_IPV6_INTERFACE) {
        var r = { isTest: Ji, goformId: "APN_PROC_EX", apn_mode: e.apnMode };
        return (
          "manual" == e.apnMode &&
            ((r.apn_action = "set_default"),
            (r.set_default_flag = "1"),
            (r.pdp_type = e.pdpType),
            (r.index = e.index)),
          r
        );
      }
      return {
        isTest: Ji,
        goformId: "APN_PROC",
        apn_action: "set_default",
        index: e.index,
        apn_mode: e.apnMode,
        profile_name: e.profileName,
        wan_apn: e.wanApn,
        dns_mode: e.dnsMode,
        prefer_dns_manual: e.dns1,
        w_standby_dns_manual: e.dns2,
        ppp_username: e.username,
        ppp_passwd: e.password,
        ppp_auth_mode: e.authMode,
        apn_select: "manual",
        wan_dial: "*99#",
        pdp_type: "PPP",
        pdp_select: "auto",
        pdp_addr: "",
        set_default_flag: "1",
      };
    }
    function t(e) {
      return "success" == e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function W() {
    function e(e, r) {
      if (n.USE_IPV6_INTERFACE) {
        var i = {
          isTest: Ji,
          goformId: "APN_PROC_EX",
          apn_action: "save",
          apn_mode: "manual",
          profile_name: e.profileName,
          wan_dial: "*99#",
          apn_select: "manual",
          pdp_type: e.pdpType,
          pdp_select: "auto",
          pdp_addr: "",
          index: e.index,
        };
        return (
          "IP" == e.pdpType
            ? t.extend(i, {
                wan_apn: e.wanApn,
                ppp_auth_mode: e.authMode,
                ppp_username: e.username,
                ppp_passwd: e.password,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                standby_dns_manual: e.dns2,
              })
            : "IPv6" == e.pdpType
            ? t.extend(i, {
                ipv6_wan_apn: e.wanApnV6,
                ipv6_ppp_auth_mode: e.authModeV6,
                ipv6_ppp_username: e.usernameV6,
                ipv6_ppp_passwd: e.passwordV6,
                ipv6_dns_mode: e.dnsModeV6,
                ipv6_prefer_dns_manual: e.dns1V6,
                ipv6_standby_dns_manual: e.dns2V6,
              })
            : t.extend(i, {
                wan_apn: e.wanApn,
                ppp_auth_mode: e.authMode,
                ppp_username: e.username,
                ppp_passwd: e.password,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                standby_dns_manual: e.dns2,
                ipv6_wan_apn: e.wanApnV6,
                ipv6_ppp_auth_mode: e.authModeV6,
                ipv6_ppp_username: e.usernameV6,
                ipv6_ppp_passwd: e.passwordV6,
                ipv6_dns_mode: e.dnsModeV6,
                ipv6_prefer_dns_manual: e.dns1V6,
                ipv6_standby_dns_manual: e.dns2V6,
              }),
          i
        );
      }
      var i = {
        isTest: Ji,
        goformId: "APN_PROC",
        apn_action: "save",
        apn_mode: "manual",
        index: e.index,
        profile_name: e.profileName,
        wan_apn: e.wanApn,
        dns_mode: e.dnsMode,
        prefer_dns_manual: e.dns1,
        w_standby_dns_manual: e.dns2,
        ppp_auth_mode: e.authMode,
        ppp_username: e.username,
        ppp_passwd: e.password,
        wan_dial: "*99#",
        apn_select: "manual",
        pdp_type: "PPP",
        pdp_select: "auto",
        pdp_addr: "",
      };
      return i;
    }
    function r(e) {
      return "success" == e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, r, null, !0);
  }
  function L() {
    if (!$i)
      return void setTimeout(function () {
        L();
      }, 1e3);
    i(
      x(),
      function (e) {
        for (var n = 0; n < __.length; n++)
          "function" == typeof __[n] && __[n](e);
        t.merge(__, i_),
          (i_ = []),
          setTimeout(function () {
            L();
          }, 1e3);
      },
      function () {
        K(),
          setTimeout(function () {
            L();
          }, 1e3);
      },
      !1
    );
  }
  function x() {
    var r = { multi_data: 1, isTest: Ji };
    return (
      window.location.hash && "#login" != window.location.hash && t_.isLoggedIn
        ? (n.HAS_SMS &&
            ((r.sms_received_flag_flag = 0), (r.sts_received_flag_flag = 0)),
          r_.length > 0 &&
            -1 == e.indexOf(n_, r_[0]) &&
            t.each(r_, function (e, t) {
              n_.push(t);
            }))
        : r_.length > 0 &&
          -1 != e.indexOf(n_, r_[0]) &&
          (n_ = e.without(n_, r_)),
      (r.cmd = n_.join(",")),
      r
    );
  }
  function O(t, n) {
    if (e.isArray(t)) for (var r = 0; r < t.length; r++) V(t[r]);
    else V(t);
    U(n);
  }
  function k(t, n) {
    if (e.isArray(t)) for (var r = 0; r < t.length; r++) H(t[r]);
    else H(t);
    B(n);
  }
  function U(t) {
    -1 == e.indexOf(i_, t) && i_.push(t);
  }
  function B(t) {
    return (__ = e.without(__, t)), 0 == __.length && __.push(G), i_;
  }
  function V(t) {
    -1 == e.indexOf(n_, t) && n_.push(t);
  }
  function H(t) {
    return (n_ = e.without(n_, t));
  }
  function G(e) {
    (t_.signalImg = void 0 === e.signalbar ? "0" : e.signalbar),
      (t_.networkType = e.network_type ? e.network_type : ""),
      -1 != t_.networkType.toLowerCase().indexOf("limited_service") ||
      -1 != t_.networkType.toLowerCase().indexOf("limited service")
        ? (t_.networkType = "limited_service")
        : (-1 == t_.networkType.toLowerCase().indexOf("no_service") &&
            -1 == t_.networkType.toLowerCase().indexOf("no service")) ||
          (t_.networkType = "no_service"),
      (t_.networkOperator = e.network_provider ? e.network_provider : ""),
      (t_.spn_b1_flag = e.spn_b1_flag),
      (t_.spn_b2_flag = e.spn_b2_flag),
      (t_.spn_name_data = e.spn_name_data),
      "PPPOE" == e.opms_wan_mode ||
      ("AUTO" == e.opms_wan_mode && "AUTO_PPPOE" == e.opms_wan_auto_mode)
        ? (t_.connectStatus =
            void 0 === e.pppoe_status ? "ppp_disconnected" : e.pppoe_status)
        : "DHCP" == e.opms_wan_mode ||
          ("AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode)
        ? "1" == e.dhcp_wan_status
          ? (t_.connectStatus = "ppp_connected")
          : (t_.connectStatus = "ppp_disconnected")
        : "STATIC" == e.opms_wan_mode ||
          ("AUTO" == e.opms_wan_mode && "AUTO_STATIC" == e.opms_wan_auto_mode)
        ? "1" == e.static_wan_status
          ? (t_.connectStatus = "ppp_connected")
          : (t_.connectStatus = "ppp_disconnected")
        : (t_.connectStatus =
            void 0 === e.ppp_status ? "ppp_disconnected" : e.ppp_status);
    var t =
      e.wifi_access_sta_num && "" != e.wifi_access_sta_num
        ? e.wifi_access_sta_num
        : 0;
    (t_.cbns_server_enable = e.cbns_server_enable),
      (t_.app_debug_mode = e.app_debug_mode),
      (t_.odu_mode = e.odu_mode),
      (t_.curr_connected_devices = t),
      (t_.roamingStatus = z(
        t_.networkType,
        e.modem_main_state,
        e.simcard_roam
      )),
      (t_.wifiStatus = "1" == e.wifi_onoff_state),
      (t_.wifiSwitchStatus = e.wifi_onoff_state),
      (t_.simStatus = e.modem_main_state),
      (t_.pinStatus = e.pin_status);
    var r =
      e.battery_vol_percent && e.battery_vol_percent.length > 0
        ? e.battery_vol_percent
        : 100;
    t_.batteryPers = e.battery_pers;
    var i = Math.round(10800 * (1 - r / 100));
    if (
      ((t_.batteryStatus =
        void 0 === e.battery_charging ? "0" : e.battery_charging),
      (t_.battery_value = void 0 === e.battery_value ? "0" : e.battery_value),
      (t_.batteryLevel = r),
      (t_.batteryTime = i.toString()),
      (t_.data_counter = {
        uploadRate: "" == e.realtime_tx_thrpt ? 0 : e.realtime_tx_thrpt,
        downloadRate: "" == e.realtime_rx_thrpt ? 0 : e.realtime_rx_thrpt,
        currentSent: "" == e.realtime_tx_bytes ? 0 : e.realtime_tx_bytes,
        currentReceived: "" == e.realtime_rx_bytes ? 0 : e.realtime_rx_bytes,
        currentConnectedTime: "" == e.realtime_time ? 0 : e.realtime_time,
        monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
        monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
        monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
        month: "" == e.date_month ? 1 : e.date_month,
      }),
      (t_.ssid = e.wifi_chip1_ssid1_ssid),
      (t_.mainSSID5g = e.wifi_chip2_ssid1_ssid),
      (t_.authMode = e.AuthMode),
      t_.isLoggedIn && 1 == t_.isLoggedIn && "ok" != e.loginfo
        ? e_ > 2
          ? ((t_.isLoggedIn = !n.HAS_LOGIN || "ok" == e.loginfo), (e_ = 0))
          : e_++
        : (t_.isLoggedIn = !n.HAS_LOGIN || "ok" == e.loginfo),
      n.HAS_SMS &&
        (t_.newSmsReceived || (t_.newSmsReceived = e.sms_received_flag > 0),
        t_.smsReportReceived ||
          (t_.smsReportReceived = e.sts_received_flag > 0),
        void 0 !== e.sms_dev_unread_num
          ? (t_.smsUnreadCount = n.SMS_UNREAD_NUM_INCLUDE_SIM
              ? parseInt(0 | e.sms_dev_unread_num, 10) +
                parseInt(0 | e.sms_sim_unread_num, 10)
              : parseInt(0 | e.sms_dev_unread_num, 10))
          : (t_.smsUnreadCount = parseInt(0 | e.sms_unread_num, 10))),
      "1" == e.data_volume_limit_switch)
    )
      if (
        ((t_.limitVolumeEnable = !0),
        (t_.limitVolumeType = "data" == e.data_volume_limit_unit ? "1" : "0"),
        (t_.limitVolumePercent = e.data_volume_alert_percent),
        "data" == e.data_volume_limit_unit)
      ) {
        var _ = e.data_volume_limit_size.split("_");
        (t_.limitVolumeSize = _[0] * _[1] * 1024 * 1024),
          (t_.limitVolumeSizeSource = _[0] * _[1]);
      } else
        (t_.limitVolumeSize = 60 * e.data_volume_limit_size * 60),
          (t_.limitVolumeSizeSource = e.data_volume_limit_size);
    else
      (t_.limitVolumeEnable = !1),
        (t_.limitVolumeType = "1"),
        (t_.limitVolumePercent = "100"),
        (t_.limitVolumeSize = "0");
    (t_.connectWifiProfile = e.EX_wifi_profile),
      (t_.connectWifiSSID = e.EX_SSID1),
      (t_.connectWifiStatus = e.sta_ip_status),
      (t_.multi_ssid_enable = e.m_ssid_enable),
      (t_.roamMode = e.roam_setting_option),
      (t_.opms_wan_mode = e.opms_wan_mode),
      (t_.opms_wan_auto_mode = e.opms_wan_auto_mode),
      (t_.dhcp_wan_status = e.dhcp_wan_status),
      (t_.new_version_state =
        "1" == e.new_version_state ||
        "version_has_new_critical_software" == e.new_version_state ||
        "version_has_new_optional_software" == e.new_version_state ||
        "upgrade_pack_redownload" == e.current_upgrade_state),
      (t_.current_upgrade_state = e.current_upgrade_state),
      "downloading" == t_.current_upgrade_state
        ? (t_.current_upgrade_state = "upgrading")
        : "verify_failed" == t_.current_upgrade_state &&
          (t_.current_upgrade_state = "upgrade_pack_error"),
      (t_.is_mandatory =
        "1" == e.is_mandatory ||
        "version_has_new_critical_software" == e.new_version_state),
      (t_.allowRoamingUpdate = e.upg_roam_switch),
      (t_.wifi_dfs_status = e.wifi_dfs_status),
      (t_.wifi_5g_enable = e.wifi_5g_enable),
      (t_.dialMode = e.dial_mode),
      (t_.ppp_dial_conn_fail_counter = e.ppp_dial_conn_fail_counter),
      (t_.isCaStatus =
        "ca_activated" == e.wan_lte_ca || "ca_deactivated" == e.wan_lte_ca),
      (t_.privacy_read_flag = e.privacy_read_flag),
      (t_.is_night_mode = e.is_night_mode),
      (t_.pppoe_status = e.pppoe_status),
      (t_.dhcp_wan_status = e.dhcp_wan_status),
      (t_.static_wan_status = e.static_wan_status),
      (t_.vpn_conn_status =
        void 0 === e.vpn_conn_status ? "disconnected" : e.vpn_conn_status),
      (t_.rmcc = e.rmcc),
      (t_.rmnc = e.rmnc);
  }
  function K() {
    t_.batteryStatus = "0";
  }
  function z(e, n, r) {
    return (
      "" != t.trim(e) &&
      "no_service" != e.toLowerCase() &&
      "limited_service" != e.toLowerCase() &&
      "modem_sim_undetected" != n &&
      "modem_waitpin" != n &&
      "modem_waitpuk" != n &&
      ("Internal" == r || "International" == r)
    );
  }
  function X(e, t, n) {
    if (
      ("string" != typeof e || "" === e || "number" != typeof t || isNaN(t)) &&
      "function" == typeof n
    )
      return void n(!1);
    if (
      -1 === (0 === t ? 0 : 2 === t ? 2 : 7 == t ? 7 : 12 == t ? 12 : -1) &&
      "function" == typeof n
    )
      return void n(!1);
    i(
      { isTest: Ji, goformId: "SET_NETWORK", NetworkNumber: e, Rat: t },
      function (e) {
        if (e && "success" == e.result)
          var t,
            i = 0,
            _ = setInterval(function () {
              var e = r({ cmd: "m_netselect_result", isTest: Ji }, !1);
              e || n(!1),
                "manual_success" == e.m_netselect_result
                  ? ((t = "1"), window.clearInterval(_), n(!0))
                  : "manual_fail" == e.m_netselect_result
                  ? ((t = "0"), window.clearInterval(_), n(!1))
                  : i < 120
                  ? i++
                  : (window.clearInterval(_), n(!1));
            }, 1e3);
        else n(!1);
      },
      function (e) {
        n(!1);
      },
      !0
    );
  }
  function j() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "current_network"), n;
    }
    function t(e) {
      return e
        ? {
            strFullName: e.strFullName,
            strShortName: e.strShortName,
            strNumeric: e.strNumeric,
            nRat: "" == e.nRat ? "" : Number(e.nRat),
            strBearer: e.strBearer,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function q() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "PBM_CONTACT_ADD"),
        (n.location = e.location),
        (n.name = encodeMessage(e.name)),
        (n.mobilephone_num = e.mobile_phone_number),
        1 == n.location
          ? ((n.add_index_pc = e.index),
            (n.homephone_num = e.home_phone_number),
            (n.officephone_num = e.office_phone_number),
            (n.email = encodeMessage(e.mail)),
            (n.groupchoose = e.group),
            n.groupchoose || (n.groupchoose = "common"))
          : (n.edit_index = e.index),
        n
      );
    }
    function t(e) {
      e && "success" == e.result ? O("pbm_write_flag", n) : r(e);
    }
    function n(e) {
      Y(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Y(e, t, n) {
    "0" == e.pbm_write_flag
      ? (k("pbm_write_flag", n), t({ result: "success" }))
      : ("6" != e.pbm_write_flag &&
          "7" != e.pbm_write_flag &&
          "8" != e.pbm_write_flag &&
          "9" != e.pbm_write_flag &&
          "10" != e.pbm_write_flag &&
          "11" != e.pbm_write_flag &&
          "14" != e.pbm_write_flag) ||
        (k("pbm_write_flag", n), t({ result: "fail" }));
  }
  function Z() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "PBM_CONTACT_DEL"),
        (n.del_option = "delete_num"),
        (n.delete_id = e.indexs.join(",")),
        n
      );
    }
    function t(e) {
      e && "success" == e.result ? O("pbm_write_flag", n) : r(e);
    }
    function n(e) {
      Y(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Q() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "PBM_CONTACT_DEL"),
        (n.del_option = "delete_all"),
        (n.del_all_location = e.location),
        n
      );
    }
    function t(e) {
      e && "success" == e.result ? O("pbm_write_flag", n) : r(e);
    }
    function n(e) {
      Y(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function J() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "PBM_CONTACT_DEL"),
        (n.del_option = "delete_all_by_group"),
        (n.del_all_location = 3),
        (n.del_group = e.group),
        n
      );
    }
    function t(e) {
      e && "success" == e.result ? O("pbm_write_flag", n) : r(e);
    }
    function n(e) {
      Y(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function $() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "SET_CONNECTION_MODE"),
        (n.isTest = Ji),
        (n.ConnectionMode = e.connectionMode),
        (n.roam_setting_option = e.isAllowedRoaming),
        n
      );
    }
    function t(e) {
      if (e) return e;
      callback(e);
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function ee() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "ConnectionMode"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.connectionMode = e.connectionMode),
          (t.isAllowedRoaming = e.autoConnectWhenRoaming),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function te(e, n) {
    function r(e, t) {
      var r = {};
      return (
        (r.isTest = Ji),
        (r.mem_store = n),
        (r.cmd = 2 == n ? "pbm_data_total" : "pbm_data_info"),
        (r.page = e.page),
        (r.data_per_page = e.data_per_page),
        (r.orderBy = e.orderBy),
        (r.isAsc = e.isAsc),
        r
      );
    }
    function i(e) {
      if (e && e.pbm_data) {
        var n = [];
        return (
          t.each(e.pbm_data, function (t) {
            n.push({
              pbm_id: e.pbm_data[t].pbm_id,
              pbm_location: e.pbm_data[t].pbm_location,
              pbm_number: e.pbm_data[t].pbm_number,
              pbm_anr: e.pbm_data[t].pbm_anr,
              pbm_anr1: e.pbm_data[t].pbm_anr1,
              pbm_group: e.pbm_data[t].pbm_group,
              pbm_name: decodeMessage(e.pbm_data[t].pbm_name),
              pbm_email: decodeMessage(e.pbm_data[t].pbm_email),
            });
          }),
          { pbm_data: n }
        );
      }
      return Qi;
    }
    return 0 == e[0].data_per_page
      ? { pbm_data: [] }
      : s(e, {}, r, i, null, !1);
  }
  function ne() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "pbm_data_total"),
        (n.mem_store = 3),
        (n.pbm_group = e.group),
        (n.page = e.page),
        (n.data_per_page = e.data_per_page),
        (n.orderBy = e.orderBy),
        (n.isAsc = e.isAsc),
        n
      );
    }
    function n(e) {
      if (e && e.pbm_data) {
        var n = [];
        return (
          t.each(e.pbm_data, function (t) {
            n.push({
              pbm_id: e.pbm_data[t].pbm_id,
              pbm_location: e.pbm_data[t].pbm_location,
              pbm_number: e.pbm_data[t].pbm_number,
              pbm_anr: e.pbm_data[t].pbm_anr,
              pbm_anr1: e.pbm_data[t].pbm_anr1,
              pbm_group: e.pbm_data[t].pbm_group,
              pbm_name: decodeMessage(e.pbm_data[t].pbm_name),
              pbm_email: decodeMessage(e.pbm_data[t].pbm_email),
            });
          }),
          { pbm_data: n }
        );
      }
      return Qi;
    }
    return 0 == arguments[0].data_per_page
      ? { pbm_data: [] }
      : s(arguments, {}, e, n, null, !1);
  }
  function re() {
    return te(arguments, 1);
  }
  function ie() {
    return te(arguments, 0);
  }
  function _e() {
    return te(arguments, 2);
  }
  function se() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "pbm_init_flag"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function oe(e, t) {
    function n(e, n) {
      var r = {};
      return (
        (r.isTest = Ji),
        (r.cmd = "pbm_capacity_info"),
        (r.pbm_location = t ? "pbm_sim" : "pbm_native"),
        r
      );
    }
    function r(e) {
      return e || Qi;
    }
    return s(e, {}, n, r, null, !1);
  }
  function ae() {
    var e = oe(arguments, !0);
    return {
      simPbmTotalCapacity: parseInt(e.pbm_sim_max_record_num),
      simPbmUsedCapacity: parseInt(e.pbm_sim_used_record_num),
      simType: e.pbm_sim_type,
      maxNameLen: parseInt(e.pbm_sim_max_name_len),
      maxNumberLen: parseInt(e.pbm_sim_max_number_len),
    };
  }
  function ue() {
    var e = oe(arguments, !1);
    return {
      pcPbmTotalCapacity: parseInt(e.pbm_dev_max_record_num),
      pcPbmUsedCapacity: parseInt(e.pbm_dev_used_record_num),
    };
  }
  function ce() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "modem_main_state,puknumber,pinnumber,opms_wan_mode,psw_fail_num_str,login_lock_time,SleepStatusForSingleChipCpe"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e
        ? ((e.psw_fail_num_str =
            "" == e.psw_fail_num_str ? n.MAX_LOGIN_COUNT : e.psw_fail_num_str),
          (e.login_lock_time =
            "" == e.login_lock_time ? "300" : e.login_lock_time),
          (e.curSleepStatus = "1" == e.SleepStatusForSingleChipCpe ? "1" : "2"),
          e)
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function de() {
    function e(e, t) {
      var r = hr({ nv: "LD" }).LD;
      return {
        isTest: Ji,
        goformId: "LOGIN_MULTI_USER",
        user: e.userName,
        password:
          "2" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(paswordAlgorithmsCookie(e.password) + r)
            : "1" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(Base64.encode(e.password))
            : Base64.encode(e.password),
      };
    }
    function r(e) {
      if (!e || ("0" != e.result && "4" != e.result)) {
        if (e && "5" == e.result) return (t_.isLoggedIn = !1), { result: "5" };
        var n = {};
        switch (e.result) {
          case "1":
            n = { errorType: "Login Fail" };
            break;
          case "2":
            n = { errorType: "duplicateUser" };
            break;
          case "3":
            n = { errorType: "badPassword" };
            break;
          default:
            n = { errorType: "Login Fail" };
        }
        return (t_.isLoggedIn = !1), t.extend(Qi, n);
      }
      return (t_.isLoggedIn = !0), { result: !0 };
    }
    return s(arguments, {}, e, r, { errorType: "badPassword" }, !0);
  }
  function le() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "loginfo"), (n.multi_data = 1), n;
    }
    function r(e) {
      if ((e && e.loginfo) || "" == e.loginfo) {
        var n = {};
        switch (e.loginfo) {
          case "ok":
            (t_.isLoggedIn = !0), (n.status = "loggedIn");
            break;
          default:
            (t_.isLoggedIn = !1), (n.status = "loggedOut");
        }
        return n;
      }
      return (
        (t_.isLoggedIn = void 0),
        t.extend(Qi, { errorType: "LoginStatusError" })
      );
    }
    if (void 0 != t_.isLoggedIn)
      return s(arguments, { status: t_.isLoggedIn ? "loggedIn" : "loggedOut" });
    var i = {};
    return (
      n.HAS_LOGIN ||
        ((i.status = "loggedIn"),
        (i.errorType = "no_login"),
        (t_.isLoggedIn = !0)),
      s(arguments, i, e, r, null, !1)
    );
  }
  function pe() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "ENTER_PIN"),
        (n.PinNumber = e.PinNumber),
        n
      );
    }
    function t(e) {
      return e && "success" === e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, {}, !0);
  }
  function me() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "ENTER_PUK"),
        (n.PUKNumber = e.PUKNumber),
        (n.PinNumber = e.PinNumber),
        n
      );
    }
    function t(e) {
      return e && "success" === e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, {}, !0);
  }
  function fe() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "sms_data_total",
        page: e.page,
        data_per_page: n.SMS_DATABASE_SORT_SUPPORT ? e.smsCount : 500,
        mem_store: e.nMessageStoreType,
        tags: e.tags,
        order_by: e.orderBy,
      };
    }
    function t(e) {
      return e && e.messages && e.messages.length > 0
        ? { messages: ge(e.messages) }
        : { messages: [] };
    }
    return s(arguments, {}, e, t, {}, !1);
  }
  function ge(r, i) {
    for (var _ = [], s = 0; s < r.length; s++)
      if (
        n.SHOW_UN_COMPLETE_CONCAT_SMS ||
        void 0 === r[s].received_all_concat_sms ||
        "0" != r[s].received_all_concat_sms
      ) {
        var o = {};
        (o.id = r[s].id),
          (o.number = r[s].number),
          (o.content = i ? r[s].content : ve(r[s].content)),
          (o.timeOri = transTime("20" + r[s].date)),
          (o.time = transTime("20" + r[s].date, n.DATE_FORMAT, n.TIME_FORMAT)),
          (o.isNew = "1" == r[s].tag),
          (o.groupId = r[s].draft_group_id),
          (o.tag = r[s].tag),
          (o.receivedAll = "1" == r[s].received_all_concat_sms),
          _.push(o);
      }
    if (n.SMS_DATABASE_SORT_SUPPORT) return _;
    for (var a = [], u = [], s = _.length; s--; ) {
      var c = _[s],
        d = t.inArray(c.id, a);
      -1 == d
        ? (a.push(c.id), u.push(c))
        : c.content.length > u[d].content.length && (u[d] = c);
    }
    return e.sortBy(u, function (e) {
      return 0 - e.id;
    });
  }
  function ve(e) {
    return decodeMessage(escapeMessage(e));
  }
  function we() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "SEND_SMS",
        notCallback: !0,
        Number: e.number,
        sms_time: getCurrentTimeString(),
        MessageBody: escapeMessage(encodeMessage(e.message)),
        ID: e.id,
        encode_type: getEncodeType(e.message).encodeType,
      };
    }
    function n(e) {
      if (!e)
        return void i(
          t.extend(Qi, {
            errorType: "sendFail",
            errorText: "send_fail_try_again",
          })
        );
      "success" == e.result
        ? setTimeout(function () {
            Pe(
              {
                smsCmd: 4,
                errorType: "sendFail",
                errorText: "send_fail_try_again",
              },
              r,
              i
            );
          }, 1e3)
        : i(
            t.extend(Qi, {
              errorType: "sendFail",
              errorText: "send_fail_try_again",
            })
          );
    }
    var r = arguments[1],
      i = arguments[2] ? arguments[2] : r;
    return s(arguments, {}, e, n, null, !0);
  }
  function Se() {
    function e(e, t) {
      return {
        isTest: Ji,
        notCallback: !0,
        goformId: "SAVE_SMS",
        SMSMessage: escapeMessage(encodeMessage(e.message)),
        SMSNumber: e.numbers.join(";") + ";",
        Index: e.index,
        encode_type: getEncodeType(e.message).encodeType,
        sms_time: e.currentTimeString,
        draft_group_id: e.groupId,
      };
    }
    function n(e) {
      if (!e)
        return void i(
          t.extend(Qi, { errorType: "saveFail", errorText: "save_fail" })
        );
      "success" == e.result
        ? Pe({ smsCmd: 5, errorType: "saveFail", errorText: "save_fail" }, r, i)
        : i(t.extend(Qi, { errorType: "saveFail", errorText: "save_fail" }));
    }
    var r = arguments[1],
      i = arguments[2] ? arguments[2] : r;
    return s(arguments, {}, e, n, null, !0);
  }
  function he() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "ALL_DELETE_SMS",
        notCallback: !0,
        which_cgi: e.location,
      };
    }
    function n(e) {
      if (!e)
        return void _(
          t.extend(Qi, {
            errorType: "deleteFail",
            errorText: "delete_fail_try_again",
          })
        );
      "success" == e.result
        ? O("sms_cmd_status_info", r)
        : _(
            t.extend(Qi, {
              errorType: "deleteFail",
              errorText: "delete_fail_try_again",
            })
          );
    }
    function r(e) {
      var n = e.sms_cmd_status_info;
      "2" == n
        ? (k("sms_cmd_status_info", r),
          _(
            t.extend(Qi, {
              errorType: "deleteFail",
              errorText: "delete_fail_try_again",
            })
          ))
        : "3" == n && (k("sms_cmd_status_info", r), i({ result: !0 }));
    }
    var i = arguments[1],
      _ = arguments[2] ? arguments[2] : i;
    return s(arguments, {}, e, n, null, !0);
  }
  function Te() {
    function e(e, t) {
      var n = e.ids.join(";") + ";";
      return { isTest: Ji, goformId: "DELETE_SMS", msg_id: n, notCallback: !0 };
    }
    function n(e) {
      if (!e)
        return void i(
          t.extend(Qi, {
            errorType: "deleteFail",
            errorText: "delete_fail_try_again",
          })
        );
      "success" == e.result
        ? Pe(
            {
              smsCmd: 6,
              errorType: "deleteFail",
              errorText: "delete_fail_try_again",
            },
            r,
            i
          )
        : i(
            t.extend(Qi, {
              errorType: "deleteFail",
              errorText: "delete_fail_try_again",
            })
          );
    }
    var r = arguments[1],
      i = arguments[2] ? arguments[2] : r;
    return s(arguments, {}, e, n, null, !0);
  }
  function Pe(e, n, r) {
    i(
      { cmd: "sms_cmd_status_info", sms_cmd: e.smsCmd, isTest: Ji },
      function (i) {
        if (i) {
          var _ = i.sms_cmd_status_result;
          "2" == _
            ? r(
                t.extend(Qi, { errorType: e.errorType, errorText: e.errorText })
              )
            : "3" == _
            ? n({ result: "success" })
            : window.setTimeout(function () {
                Pe(e, n, r);
              }, 1e3);
        } else
          r(t.extend(Qi, { errorType: e.errorType, errorText: e.errorText }));
      },
      function (n) {
        r(t.extend(Qi, { errorType: e.errorType, errorText: e.errorText }));
      },
      !1
    );
  }
  function Ie() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji), (n.cmd = "sms_cmd_status_info"), (n.sms_cmd = 1), n
      );
    }
    function t(e) {
      return e
        ? ("3" == e.sms_cmd_status_result && (n.smsIsReady = !0), e)
        : Qi;
    }
    if (n.smsIsReady) {
      var r = arguments[1];
      return r
        ? r({ sms_cmd: "1", sms_cmd_status_result: "3" })
        : { sms_cmd: "1", sms_cmd_status_result: "3" };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function be() {
    function e(e, t) {
      var n = e.ids.join(";");
      return (
        e.ids.length > 0 && (n += ";"),
        { isTest: Ji, goformId: "SET_MSG_READ", msg_id: n, tag: 0 }
      );
    }
    function t(e) {
      return "success" == e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ae() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "sms_status_rpt_data",
        page: e.page,
        data_per_page: e.smsCount,
      };
    }
    function t(e) {
      return e ? { messages: ge(e.messages, !0) } : Qi;
    }
    return s(arguments, {}, e, t, {}, !1);
  }
  function ye() {
    function e(e, n) {
      var r = t.extend({}, e);
      return (r.isTest = Ji), (r.goformId = "LOGOUT"), r;
    }
    function n(e) {
      return e && "success" == e.result
        ? ((t_.isLoggedIn = !1), { result: !0 })
        : t.extend(Qi, { errorType: "loggedOutError" });
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function Ee() {
    function e(e, t) {
      var r = {};
      return (
        (r.newPassword =
          "2" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(e.newPassword)
            : (n.WEB_ATTR_IF_SUPPORT_SHA256, Base64.encode(e.newPassword))),
        (r.oldPassword =
          "2" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(e.oldPassword)
            : "1" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(Base64.encode(e.oldPassword))
            : Base64.encode(e.oldPassword)),
        (r.user_level = e.user_level),
        "1" == r.user_level && (r.new_user = e.new_user),
        (r.user = e.user),
        (r.goformId = "CHANGE_PASSWORD_MULTI_USER"),
        (r.isTest = Ji),
        r
      );
    }
    function r(e) {
      return e && "success" === e.result
        ? { result: !0 }
        : t.extend(Qi, { errorType: "badPassword" });
    }
    return s(arguments, {}, e, r, null, !0);
  }
  function Re() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "pinnumber,pin_status,puknumber"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ne() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "ENABLE_PIN"),
        (n.OldPinNumber = e.oldPin),
        (n.isTest = Ji),
        n
      );
    }
    function t(e) {
      return e && "success" === e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function De() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "DISABLE_PIN"),
        (n.OldPinNumber = e.oldPin),
        (n.isTest = Ji),
        n
      );
    }
    function t(e) {
      return e && "success" === e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Me() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "ENABLE_PIN"),
        (n.OldPinNumber = e.oldPin),
        (n.NewPinNumber = e.newPin),
        (n.isTest = Ji),
        n
      );
    }
    function t(e) {
      return e && "success" === e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ce() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour,mtu,tcp_mss"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.ipAddress = e.lan_ipaddr),
          (t.subnetMask = e.lan_netmask),
          (t.macAddress = e.mac_address),
          (t.dhcpServer = e.dhcpEnabled),
          (t.dhcpStart = e.dhcpStart),
          (t.dhcpEnd = e.dhcpEnd),
          (t.dhcpLease = parseInt(e.dhcpLease_hour, 10)),
          (t.mtuValue = e.mtu),
          (t.mssValue = e.tcp_mss),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Fe() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "DHCP_SETTING"),
        (n.lanIp = e.ipAddress),
        (n.lanNetmask = e.subnetMask),
        (n.lanDhcpType = "1" == e.dhcpServer ? "SERVER" : "DISABLE"),
        "SERVER" == n.lanDhcpType &&
          ((n.dhcpStart = e.dhcpStart),
          (n.dhcpEnd = e.dhcpEnd),
          (n.dhcpLease = e.dhcpLease)),
        (n.dhcp_reboot_flag = 1),
        (n.mac_ip_reset = e.mac_ip_reset),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function We() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_DEVICE_MTU"),
        (n.mtu = e.mtuValue),
        (n.tcp_mss = e.mssValue),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Le() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "sms_parameter_info"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        switch (
          ((t.centerNumber = e.sms_para_sca),
          (t.memStroe = e.sms_para_mem_store),
          (t.deliveryReport = e.sms_para_status_report),
          parseInt(e.sms_para_validity_period))
        ) {
          case 143:
            t.validity = "twelve_hours";
            break;
          case 167:
            t.validity = "one_day";
            break;
          case 173:
            t.validity = "one_week";
            break;
          case 244:
          case 255:
            t.validity = "largest";
            break;
          default:
            t.validity = "twelve_hours";
        }
        return t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function xe() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_MESSAGE_CENTER"),
        (n.save_time = e.validity),
        (n.MessageCenter = e.centerNumber),
        (n.status_save = e.deliveryReport),
        (n.save_location = "native"),
        (n.notCallback = !0),
        n
      );
    }
    function n(e) {
      if (!e)
        return void i(
          t.extend(Qi, { errorType: "smsSettingFail", errorText: "error_info" })
        );
      "success" == e.result
        ? Pe(
            { smsCmd: 3, errorType: "smsSettingFail", errorText: "error_info" },
            r,
            i
          )
        : i(
            t.extend(Qi, {
              errorType: "deleteFail",
              errorText: "delete_fail_try_again",
            })
          );
    }
    var r = arguments[1],
      i = arguments[2] ? arguments[2] : r;
    return s(arguments, {}, e, n, null, !0);
  }
  function Oe() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "RESTORE_FACTORY_SETTINGS"), n;
    }
    function t(e) {
      return e || Qi;
    }
    var r = {};
    return (
      n.HAS_PARENTAL_CONTROL &&
        0 != n.currentUserInChildGroup &&
        (r = { errorType: "no_auth" }),
      s(arguments, r, e, t, null, !0)
    );
  }
  function ke(e) {
    var t = {};
    (t.isTest = Ji),
      (t.cmd = "restore_flag"),
      (t.multi_data = 1),
      i(
        t,
        function (t) {
          t && "1" === t.restore_flag
            ? e()
            : setTimeout(function () {
                ke(e);
              }, 5e3);
        },
        function () {
          setTimeout(function () {
            ke(e);
          }, 5e3);
        },
        !1
      );
  }
  function Ue() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "wifi_wps_index,WscModeOption,AuthMode,wifi_onoff_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.wpsFlag = e.WscModeOption),
          (t.authMode = e.AuthMode),
          (t.wpsType = e.wps_mode),
          (t.radioFlag = e.wifi_onoff_state),
          (t.encrypType = e.EncrypType),
          (t.wpsSSID = e.WPS_SSID),
          (t.ssidEnable = e.m_ssid_enable),
          (t.ssid = e.SSID1),
          (t.multiSSID = e.m_SSID),
          (t.m_encrypType = e.m_EncrypType),
          (t.wifi_wps_index = e.wifi_wps_index),
          (t.AuthMode = e.AuthMode),
          (t.m_AuthMode = e.m_AuthMode),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Be() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "WIFI_WPS_SET"),
        (n.WPS_SSID = e.wpsSSID),
        (n.wps_mode = e.wpsType),
        (n.wifi_wps_index = e.wpsIndex),
        "PIN" == n.wps_mode && (n.wps_pin = e.wpsPin),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ve() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "sysIdleTimeToSleep"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.sleepMode = e.sysIdleTimeToSleep), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function He() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_WIFI_SLEEP_INFO"),
        (n.sysIdleTimeToSleep = e.sleepMode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ge() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "RemoteManagement,WANPingFilter"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.remoteFlag = "1" == e.RemoteManagement ? "1" : "0"),
          (t.pingFlag = "1" == e.WANPingFilter ? "1" : "0"),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ke() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "FW_SYS"),
        (n.remoteManagementEnabled = e.remoteFlag),
        (n.pingFrmWANFilterEnabled = e.pingFlag),
        (n.RemoteManagement = e.remoteFlag),
        (n.WANPingFilter = e.pingFlag),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function ze() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "PortForwardEnable,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        t.portForwardEnable = e.PortForwardEnable;
        var r = [];
        return (
          "" != e.PortForwardRules_0 && r.push([0, e.PortForwardRules_0]),
          "" != e.PortForwardRules_1 && r.push([1, e.PortForwardRules_1]),
          "" != e.PortForwardRules_2 && r.push([2, e.PortForwardRules_2]),
          "" != e.PortForwardRules_3 && r.push([3, e.PortForwardRules_3]),
          "" != e.PortForwardRules_4 && r.push([4, e.PortForwardRules_4]),
          "" != e.PortForwardRules_5 && r.push([5, e.PortForwardRules_5]),
          "" != e.PortForwardRules_6 && r.push([6, e.PortForwardRules_6]),
          "" != e.PortForwardRules_7 && r.push([7, e.PortForwardRules_7]),
          "" != e.PortForwardRules_8 && r.push([8, e.PortForwardRules_8]),
          "" != e.PortForwardRules_9 && r.push([9, e.PortForwardRules_9]),
          (t.portForwardRules = n(r)),
          t
        );
      }
      return Qi;
    }
    function n(e) {
      var t = [];
      if (e && e.length > 0)
        for (var n = 0; n < e.length; n++) {
          var r = {},
            i = e[n][1].split(",");
          (r.index = e[n][0]),
            (r.ipAddress = i[0]),
            (r.portRange = i[1] + " - " + i[2]),
            (r.protocol = transProtocol(i[3])),
            (r.comment = i[4]),
            t.push(r);
        }
      return t;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Xe() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "FW_FORWARD_ADD"),
        (n.ipAddress = e.ipAddress),
        (n.portStart = e.portStart),
        (n.portEnd = e.portEnd),
        (n.protocol = e.protocol),
        (n.comment = e.comment),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function je() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "FW_FORWARD_DEL"),
        (n.delete_id = e.indexs.join(";") + ";"),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function qe() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "VIRTUAL_SERVER"),
        (n.PortForwardEnable = e.portForwardEnable),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ye() {
    function e(e, t) {
      var r = {};
      r.isTest = Ji;
      var i = n.PASSWORD_ENCODE ? ",WPAPSK1_encode" : ",WPAPSK1";
      return (
        (r.cmd =
          "pdp_type,ipv6_pdp_type,RadioOff,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode" +
          i +
          ",APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19"),
        (r.multi_data = 1),
        r
      );
    }
    function t(e) {
      return e
        ? (n.PASSWORD_ENCODE && (e.WPAPSK1 = Base64.decode(e.WPAPSK1_encode)),
          e)
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ze() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "QUICK_SETUP",
        apn_mode: e.apnMode,
        Profile_Name: e.Profile_Name,
        APN_name: e.APN_name,
        ppp_auth_mode: e.ppp_auth_mode,
        ppp_username: e.ppp_username,
        ppp_passwd: e.ppp_passwd,
        SSID_name: e.SSID_name,
        SSID_Broadcast: e.SSID_Broadcast,
        Encryption_Mode_hid: e.Encryption_Mode_hid,
        security_shared_mode: e.security_shared_mode,
        WPA_PreShared_Key: n.PASSWORD_ENCODE
          ? Base64.encode(e.WPA_PreShared_Key)
          : e.WPA_PreShared_Key,
        wep_default_key: e.wep_default_key,
        WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid,
      };
    }
    function r(e) {
      return e || t.extend(Qi, { errorType: "SetSetUpError" });
    }
    Je(arguments, e, r);
  }
  function Qe() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "QUICK_SETUP_EX",
        index: e.apn_index,
        pdp_type: e.pdp_type,
        apn_mode: e.apnMode,
        profile_name: e.profile_name,
        wan_apn: e.wan_apn,
        ppp_auth_mode: e.ppp_auth_mode,
        ppp_username: e.ppp_username,
        ppp_passwd: e.ppp_passwd,
        ipv6_wan_apn: e.ipv6_wan_apn,
        ipv6_ppp_auth_mode: e.ipv6_ppp_auth_mode,
        ipv6_ppp_username: e.ipv6_ppp_username,
        ipv6_ppp_passwd: e.ipv6_ppp_passwd,
        SSID_name: e.SSID_name,
        SSID_Broadcast: e.SSID_Broadcast,
        Encryption_Mode_hid: e.Encryption_Mode_hid,
        security_shared_mode: e.security_shared_mode,
        WPA_PreShared_Key: n.PASSWORD_ENCODE
          ? Base64.encode(e.WPA_PreShared_Key)
          : e.WPA_PreShared_Key,
        wep_default_key: e.wep_default_key,
        WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid,
      };
    }
    function r(e) {
      return e || t.extend(Qi, { errorType: "SetSetUpError" });
    }
    Je(arguments, e, r);
  }
  function Je(e, t, n) {
    var r = !1,
      _ = !1,
      s = t(e[0]),
      o = e[1],
      a = function (e) {
        (r = !0), !_ && o && o(n(e)), (_ = !0);
      },
      u = e[2];
    i(
      s,
      a,
      function () {
        (r = !0), u && u();
      },
      !0
    ),
      addTimeout(function () {
        if (0 == r)
          var e = addInterval(function () {
            0 == r &&
              S({}, function (t) {
                window.clearInterval(e), a({ result: "success" });
              });
          }, 1e3);
      }, 5e3);
  }
  function $e() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_CARD_USER,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
        multi_data: 1,
      };
    }
    function t(e) {
      if (e) {
        var t;
        t =
          "mmc2" == e.HTTP_SHARE_FILE ||
          "/mmc2" == e.HTTP_SHARE_FILE ||
          "/mmc2/" == e.HTTP_SHARE_FILE
            ? "1"
            : "0";
        return {
          sd_mode: "1" == e.sdcard_mode_option ? "0" : "1",
          sd_status: e.sd_card_state,
          share_status: "Enabled" == e.HTTP_SHARE_STATUS ? "1" : "0",
          share_user: e.HTTP_SHARE_CARD_USER,
          share_auth: "readWrite" == e.HTTP_SHARE_WR_AUTH ? "1" : "0",
          file_to_share: t,
          share_file: e.HTTP_SHARE_FILE,
        };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function et() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_MODE_SET",
        mode_set: "0" == e.mode ? "http_share_mode" : "usb_mode",
      };
    }
    function t(e) {
      return e && "success" == e.result ? { result: !0 } : { result: !1 };
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function tt() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "GOFORM_HTTPSHARE_CHECK_FILE",
        path_SD_CARD: e.path,
      };
    }
    function t(e) {
      return e
        ? "no_sdcard" == e.result
          ? { status: "no_sdcard" }
          : "noexist" == e.result
          ? { status: "noexist" }
          : { status: "exist" }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function nt() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_ENTERFOLD",
        path_SD_CARD: e.path,
        indexPage: e.index,
      };
    }
    function n(e) {
      return e
        ? "failure" == e.result
          ? t.extend(Qi, { errorType: "get_file_list_failure" })
          : "no_sdcard" == e.result
          ? t.extend(Qi, { errorType: "no_sdcard" })
          : r(e.result)
        : Qi;
    }
    function r(e) {
      var t = {};
      t.totalRecord = e.totalRecord;
      for (var n = [], r = e.fileInfo, i = 0; r && i < r.length; i++)
        if ("" != r[i].fileName) {
          var _ = {};
          (_.fileName = r[i].fileName),
            (_.attribute = r[i].attribute),
            (_.size = r[i].size),
            (_.lastUpdateTime = r[i].lastUpdateTime),
            n.push(_);
        }
      return (t.details = n), t;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function rt() {
    function e(e, t) {
      var n = new Date(),
        r = n.getTime(),
        i = 60 * n.getTimezoneOffset();
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_FILE_RENAME",
        path_SD_CARD: e.path,
        OLD_NAME_SD_CARD: e.oldPath,
        NEW_NAME_SD_CARD: e.newPath,
        path_SD_CARD_time: transUnixTime(r),
        path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3),
      };
    }
    function n(e) {
      return e
        ? "success" == e.result
          ? { result: !0 }
          : "no_sdcard" == e.result
          ? t.extend(Qi, { errorType: "no_sdcard" })
          : { result: !1 }
        : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function it() {
    function e(e, t) {
      return { isTest: Ji, cmd: "HTTPSHARE_GETCARD_VALUE" };
    }
    function n(e) {
      return !e || (e.result && "no_sdcard" == e.result)
        ? t.extend(Qi, { errorType: "no_sdcard" })
        : {
            totalMemorySize:
              "" == e.sd_card_total_size ? 0 : 32 * e.sd_card_total_size * 1024,
            availableMemorySize:
              "" == e.sd_card_avi_space ? 0 : 32 * e.sd_card_avi_space * 1024,
          };
    }
    return s(arguments, {}, e, n, null, !1);
  }
  function _t() {
    function e(e, t) {
      var n = new Date().getTime();
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_DEL",
        path_SD_CARD: e.path,
        name_SD_CARD: e.names,
        path_SD_CARD_time: transUnixTime(n),
        path_SD_CARD_time_unix: Math.round(n / 1e3),
      };
    }
    function n(e) {
      return e.result && "failure" == e.result
        ? t.extend(Qi, { errorType: "delete_folder_failure" })
        : e.result && "no_sdcard" == e.result
        ? t.extend(Qi, { errorType: "no_sdcard" })
        : e.result && "success" == e.result
        ? { result: !0 }
        : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function st() {
    function e(e, t) {
      var n = new Date(),
        r = n.getTime(),
        i = 60 * n.getTimezoneOffset();
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_NEW",
        path_SD_CARD: e.path,
        path_SD_CARD_time: transUnixTime(r),
        path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3),
      };
    }
    function n(e) {
      return e.result && "failure" == e.result
        ? t.extend(Qi, { errorType: "create_folder_failure" })
        : e.result && "no_sdcard" == e.result
        ? t.extend(Qi, { errorType: "no_sdcard" })
        : e.result && "success" == e.result
        ? { result: !0 }
        : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function ot() {
    function e(e, t) {
      return { isTest: Ji, cmd: "CheckUploadFileStatus" };
    }
    function t(e) {
      return e
        ? "5" == e.result
          ? { result: !1 }
          : "6" == e.result
          ? { result: !0 }
          : { result: !1 }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function at() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "HTTPSHARE_AUTH_SET",
        HTTP_SHARE_STATUS: "1" == e.share_status ? "Enabled" : "Disabled",
        HTTP_SHARE_WR_AUTH: "1" == e.share_auth ? "readWrite" : "readOnly",
        HTTP_SHARE_FILE: e.share_file,
      };
    }
    function n(e) {
      return e
        ? "no_sdcard" == e.result
          ? t.extend(Qi, { errorType: "no_sdcard" })
          : { result: !0 }
        : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function ut() {
    function t(e, t) {
      var r = {};
      return (
        (r.isTest = Ji),
        (r.cmd =
          "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9"),
        n.USE_IPV6_INTERFACE &&
          (r.cmd +=
            ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9"),
        (r.multi_data = 1),
        r
      );
    }
    function r(t) {
      if (t) {
        var r = {};
        (r.portFilterEnable = t.IPPortFilterEnable),
          (r.defaultPolicy = t.DefaultFirewallPolicy);
        var _ = [];
        if (
          ("" != t.IPPortFilterRules_0 && _.push([0, t.IPPortFilterRules_0]),
          "" != t.IPPortFilterRules_1 && _.push([1, t.IPPortFilterRules_1]),
          "" != t.IPPortFilterRules_2 && _.push([2, t.IPPortFilterRules_2]),
          "" != t.IPPortFilterRules_3 && _.push([3, t.IPPortFilterRules_3]),
          "" != t.IPPortFilterRules_4 && _.push([4, t.IPPortFilterRules_4]),
          "" != t.IPPortFilterRules_5 && _.push([5, t.IPPortFilterRules_5]),
          "" != t.IPPortFilterRules_6 && _.push([6, t.IPPortFilterRules_6]),
          "" != t.IPPortFilterRules_7 && _.push([7, t.IPPortFilterRules_7]),
          "" != t.IPPortFilterRules_8 && _.push([8, t.IPPortFilterRules_8]),
          "" != t.IPPortFilterRules_9 && _.push([9, t.IPPortFilterRules_9]),
          (r.portFilterRules = i(_, "IPv4")),
          n.USE_IPV6_INTERFACE)
        ) {
          var s = [];
          "" != t.IPPortFilterRulesv6_0 &&
            s.push([10, t.IPPortFilterRulesv6_0]),
            "" != t.IPPortFilterRulesv6_1 &&
              s.push([11, t.IPPortFilterRulesv6_1]),
            "" != t.IPPortFilterRulesv6_2 &&
              s.push([12, t.IPPortFilterRulesv6_2]),
            "" != t.IPPortFilterRulesv6_3 &&
              s.push([13, t.IPPortFilterRulesv6_3]),
            "" != t.IPPortFilterRulesv6_4 &&
              s.push([14, t.IPPortFilterRulesv6_4]),
            "" != t.IPPortFilterRulesv6_5 &&
              s.push([15, t.IPPortFilterRulesv6_5]),
            "" != t.IPPortFilterRulesv6_6 &&
              s.push([16, t.IPPortFilterRulesv6_6]),
            "" != t.IPPortFilterRulesv6_7 &&
              s.push([17, t.IPPortFilterRulesv6_7]),
            "" != t.IPPortFilterRulesv6_8 &&
              s.push([18, t.IPPortFilterRulesv6_8]),
            "" != t.IPPortFilterRulesv6_9 &&
              s.push([19, t.IPPortFilterRulesv6_9]),
            (r.portFilterRules = e.union(r.portFilterRules, i(s, "IPv6")));
        }
        return r;
      }
      return Qi;
    }
    function i(e, t) {
      var n = [];
      if (e && e.length > 0)
        for (var r = 0; r < e.length; r++) {
          var i = {},
            _ = e[r][1].split(",");
          (i.index = e[r][0]),
            (i.macAddress = _[11]),
            (i.destIpAddress = "any/0" == _[4] ? "" : _[4]),
            (i.sourceIpAddress = "any/0" == _[0] ? "" : _[0]),
            (i.destPortRange = "0" == _[6] ? "" : _[6] + " - " + _[7]),
            (i.sourcePortRange = "0" == _[2] ? "" : _[2] + " - " + _[3]),
            (i.action = 1 == _[9] ? "filter_accept" : "filter_drop"),
            (i.protocol = transProtocol(_[8])),
            (i.comment = _[10]),
            (i.ipType = t),
            n.push(i);
        }
      return n;
    }
    return s(arguments, {}, t, r, null, !1);
  }
  function ct() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "BASIC_SETTING"),
        (n.portFilterEnabled = e.portFilterEnable),
        (n.defaultFirewallPolicy = e.defaultPolicy),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function dt() {
    function e(e, t) {
      var r = {};
      return (
        (r.isTest = Ji),
        n.USE_IPV6_INTERFACE
          ? ((r.goformId = "ADD_IP_PORT_FILETER_V4V6"),
            (r.ip_version = e.ipType))
          : (r.goformId = "ADD_IP_PORT_FILETER"),
        (r.mac_address = e.macAddress),
        (r.dip_address = e.destIpAddress),
        (r.sip_address = e.sourceIpAddress),
        (r.dFromPort = e.destPortStart),
        (r.dToPort = e.destPortEnd),
        (r.sFromPort = e.sourcePortStart),
        (r.sToPort = e.sourcePortEnd),
        (r.action = e.action),
        (r.protocol = e.protocol),
        (r.comment = e.comment),
        r
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function lt() {
    function t(t, r) {
      var i = {};
      i.isTest = Ji;
      var _ = e.filter(t.indexs, function (e) {
        return 1 == e.length;
      });
      if (n.USE_IPV6_INTERFACE) {
        i.goformId = "DEL_IP_PORT_FILETER_V4V6";
        var s = [];
        e.each(t.indexs, function (e) {
          2 == e.length && s.push(e.substring(1));
        }),
          (i.delete_id_v6 = s.length > 0 ? s.join(";") + ";" : "");
      } else i.goformId = "DEL_IP_PORT_FILETER";
      return (i.delete_id = _.length > 0 ? _.join(";") + ";" : ""), i;
    }
    function r(e) {
      return e || Qi;
    }
    return s(arguments, {}, t, r, null, !0);
  }
  function pt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "WirelessMode,CountryCode,Channel,HT_MCS,wifi_band,wifi_11n_cap,MAX_Access_num,m_MAX_Access_num,wifi_attr_max_station_number,m_ssid_enable,wan_active_band,m_band_enable,m_WirelessMode,m_CountryCode,m_Channel,m_wifi_band,m_wifi_11n_cap"),
        (n.multi_data = 1),
        n
      );
    }
    function r(e) {
      if (e) {
        return {
          multi_ssid_enable: e.m_ssid_enable,
          wan_active_band: e.wan_active_band,
          mul_band_enable: e.m_band_enable,
          mode: e.WirelessMode,
          countryCode: e.CountryCode,
          channel: e.Channel,
          rate: e.HT_MCS,
          wifiBand: "a" == e.wifi_band ? "a" : "b",
          bandwidth: e.wifi_11n_cap,
          MAX_Station_num: t.isNumeric(e.wifi_attr_max_station_number)
            ? e.wifi_attr_max_station_number
            : n.MAX_STATION_NUMBER,
          MAX_Access_num: e.MAX_Access_num,
          m_MAX_Access_num: e.m_MAX_Access_num,
          guestMode: e.m_WirelessMode,
          guestCountryCode: "" == e.m_CountryCode ? "CN" : e.m_CountryCode,
          guestChannel: e.m_Channel,
          guestWifiBand: "a" == e.m_wifi_band ? "a" : "b",
          guestBandwidth: e.m_wifi_11n_cap,
        };
      }
      return Qi;
    }
    return s(arguments, {}, e, r, null, !1);
  }
  function mt() {
    function e(e) {
      var t = {
        goformId: "WIFI_ADVANCE_SET",
        isTest: Ji,
        wifiMode: e.mode,
        countryCode: e.countryCode,
        m_WirelessMode: e.m_WirelessMode,
        m_CountryCode: e.m_CountryCode,
      };
      return (
        n.WIFI_BAND_SUPPORT &&
          ((t.wifi_band = e.wifiBand), (t.m_wifi_band = e.m_wifi_band)),
        (t.selectedChannel = e.channel),
        (t.m_Channel = e.m_Channel),
        (n.WIFI_BAND_SUPPORT && "a" == e.wifiBand) || (t.abg_rate = e.rate),
        n.WIFI_BANDWIDTH_SUPPORT &&
          ((t.wifi_11n_cap = e.bandwidth),
          (t.m_wifi_11n_cap = e.m_wifi_11n_cap)),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function ft() {
    function e(e) {
      var t = {
        goformId: "SET_WIFI_INFO",
        isTest: Ji,
        wifiMode: e.mode,
        countryCode: e.countryCode,
        MAX_Access_num: e.station,
        m_MAX_Access_num: e.m_station,
      };
      return (
        n.WIFI_BAND_SUPPORT && (t.wifi_band = e.wifiBand),
        (t.selectedChannel = e.channel),
        (n.WIFI_BAND_SUPPORT && "a" == e.wifiBand) || (t.abg_rate = e.rate),
        n.WIFI_BANDWIDTH_SUPPORT && (t.wifi_11n_cap = e.bandwidth),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function gt() {
    return getDeviceInfoTrue(), s_;
  }
  function gt() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,m_SSID2,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,apn_interface_version,m_ssid_enable,imei,network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,wa_version,hardware_version,web_version,wa_inner_version,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,m_HideSSID,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,lan_ipaddr,gps_lat,gps_lon,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,ipv6_pdp_type_ui,pdp_type,pdp_type_ui,opms_wan_mode,opms_wan_auto_mode,ppp_status,Z5g_snr,Z5g_rsrp,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,lte_multi_ca_scell_info,wan_active_band,wifi_onoff_state,guest_switch,wifi_chip1_ssid2_max_access_num,wifi_chip2_ssid2_max_access_num,wifi_chip1_ssid1_wifi_coverage,wifi_chip1_ssid1_max_access_num,wifi_chip1_ssid1_ssid,wifi_chip1_ssid1_auth_mode,wifi_chip1_ssid1_password_encode,wifi_chip2_ssid1_ssid,wifi_chip2_ssid1_auth_mode,wifi_chip2_ssid1_password_encode,wifi_chip2_ssid1_max_access_num,wifi_chip1_ssid2_ssid,wifi_chip2_ssid2_ssid,wifi_chip1_ssid1_switch_onoff,wifi_chip2_ssid1_switch_onoff,wifi_chip1_ssid2_switch_onoff,wifi_chip2_ssid2_switch_onoff,Z5g_SINR,station_ip_addr",
        multi_data: 1,
      };
    }
    function t(e) {
      return e
        ? {
            wifi_enable: e.wifi_onoff_state,
            multi_ssid_enable: e.guest_switch,
            ssid: e.wifi_chip1_ssid1_ssid,
            ssidGuest: e.wifi_chip1_ssid2_ssid,
            authMode: e.wifi_chip1_ssid1_auth_mode,
            passPhrase: Base64.decode(e.wifi_chip1_ssid1_password_encode),
            m_authMode: e.wifi_chip2_ssid1_auth_mode,
            m_passPhrase: Base64.decode(e.wifi_chip2_ssid1_password_encode),
            chip1_ssid1_enable: e.wifi_chip1_ssid1_switch_onoff,
            chip2_ssid1_enable: e.wifi_chip2_ssid1_switch_onoff,
            chip1_ssid2_enable: e.wifi_chip1_ssid2_switch_onoff,
            chip2_ssid2_enable: e.wifi_chip2_ssid2_switch_onoff,
            m_ssid: e.wifi_chip2_ssid1_ssid,
            m_ssid_guest: e.wifi_chip2_ssid2_ssid,
            m_max_access_num: e.wifi_chip2_ssid1_max_access_num,
            m_max_access_num_guest: e.wifi_chip2_ssid2_max_access_num,
            ipAddress: e.lan_ipaddr,
            wanIpAddress: e.wan_ipaddr,
            staticWanIpAddress: e.static_wan_ipaddr,
            ipv6WanIpAddress: e.ipv6_wan_ipaddr,
            ipv6PdpType: e.ipv6_pdp_type,
            macAddress: e.mac_address,
            simSerialNumber: e.msisdn,
            lanDomain: e.LocalDomain,
            imei: e.imei,
            signal: convertSignal(e),
            imsi: e.imsi || e.sim_imsi,
            sw_version: e.wa_inner_version || e.cr_version,
            fw_version: e.wa_version,
            hw_version: e.hardware_version,
            max_access_num: e.wifi_chip1_ssid1_max_access_num,
            max_access_num_guest: e.wifi_chip1_ssid2_max_access_num,
            wifiRange: e.wifi_chip1_ssid1_wifi_coverage,
            pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
            opms_wan_mode: e.opms_wan_mode,
            opms_wan_auto_mode: e.opms_wan_auto_mode,
            connectStatus: e.ppp_status,
            Z5g_SINR: e.Z5g_SINR,
            Z5g_rsrp: e.Z5g_rsrp,
            network_type: e.network_type,
            wan_lte_ca: e.wan_lte_ca,
            lte_ca_pcell_band: e.lte_ca_pcell_band,
            lte_ca_pcell_bandwidth: e.lte_ca_pcell_bandwidth,
            lte_ca_scell_band: e.lte_ca_scell_band,
            lte_ca_scell_bandwidth: e.lte_ca_scell_bandwidth,
            lte_ca_pcell_arfcn: e.lte_ca_pcell_arfcn,
            lte_ca_scell_arfcn: e.lte_ca_scell_arfcn,
            lte_multi_ca_scell_info: e.lte_multi_ca_scell_info,
            wan_active_band: e.wan_active_band,
            station_ip_addr: e.station_ip_addr,
            gps_lat: e.gps_lat,
            gps_lon: e.gps_lon,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function vt() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "wifi_coverage"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.wifiRangeMode = e.wifi_coverage), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function wt() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "SET_WIFI_COVERAGE"),
        (n.isTest = Ji),
        (n.wifi_coverage = e.wifiRangeMode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function St() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryWiFiCoverage"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.wifiRangeMode = e.WiFiCoverage), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ht() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "setWiFiCoverage"),
        (n.isTest = Ji),
        (n.WiFiCoverage = e.WiFiCoverage),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Tt() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "auto_power_save"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.autoPowerSaveMode = e.auto_power_save), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Pt() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "SET_AUTO_POWER_SAVE"),
        (n.isTest = Ji),
        (n.auto_power_save = e.autoPowerSaveMode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function It() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "ODU_LED_SWITCH_SET"),
        (n.isTest = Ji),
        (n.ODU_led_switch = e.oduLedSwitch),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function bt() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "upnpEnabled"), (n.multi_data = 1), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.upnpSetting = "1" == e.upnpEnabled ? "1" : "0"), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function At() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "UPNP_SETTING"),
        (n.isTest = Ji),
        (n.upnp_setting_option = e.upnpSetting),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function yt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "DMZEnable,DMZIPAddress,lan_ipaddr,lan_netmask"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.dmzSetting = "1" == e.DMZEnable ? "1" : "0"),
          (t.ipAddress = e.DMZIPAddress),
          (t.gatewayIpAddress = e.lan_ipaddr),
          (t.gatewaySubnetMask = e.lan_netmask),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Et() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "DMZ_SETTING"),
        (n.isTest = Ji),
        (n.DMZEnabled = e.dmzSetting),
        "1" == n.DMZEnabled && (n.DMZIPAddress = e.ipAddress),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Rt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "PortMapEnable,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        t.portMapEnable = e.PortMapEnable;
        var r = [];
        return (
          "" != e.PortMapRules_0 && r.push([0, e.PortMapRules_0]),
          "" != e.PortMapRules_1 && r.push([1, e.PortMapRules_1]),
          "" != e.PortMapRules_2 && r.push([2, e.PortMapRules_2]),
          "" != e.PortMapRules_3 && r.push([3, e.PortMapRules_3]),
          "" != e.PortMapRules_4 && r.push([4, e.PortMapRules_4]),
          "" != e.PortMapRules_5 && r.push([5, e.PortMapRules_5]),
          "" != e.PortMapRules_6 && r.push([6, e.PortMapRules_6]),
          "" != e.PortMapRules_7 && r.push([7, e.PortMapRules_7]),
          "" != e.PortMapRules_8 && r.push([8, e.PortMapRules_8]),
          "" != e.PortMapRules_9 && r.push([9, e.PortMapRules_9]),
          (t.portMapRules = n(r)),
          t
        );
      }
      return Qi;
    }
    function n(e) {
      var t = [];
      if (e && e.length > 0)
        for (var n = 0; n < e.length; n++) {
          var r = {},
            i = e[n][1].split(",");
          (r.index = e[n][0]),
            (r.sourcePort = i[1]),
            (r.destIpAddress = i[0]),
            (r.destPort = i[2]),
            (r.protocol = transProtocol(i[3])),
            (r.comment = i[4]),
            t.push(r);
        }
      return t;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Nt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "ADD_PORT_MAP"),
        (n.portMapEnabled = e.portMapEnable),
        (n.fromPort = e.sourcePort),
        (n.ip_address = e.destIpAddress),
        (n.toPort = e.destPort),
        (n.protocol = e.protocol),
        (n.comment = e.comment),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Dt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "ADD_PORT_MAP"),
        (n.portMapEnabled = e.portMapEnable),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Mt() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "DEL_PORT_MAP"),
        (n.delete_id = e.indexs.join(";") + ";"),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ct() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,wan_auto_clear_flow_data_switch,traffic_clear_date",
        multi_data: 1,
      };
    }
    function t(e) {
      if (e) {
        var t = "data" == e.data_volume_limit_unit;
        return {
          dataLimitChecked: e.data_volume_limit_switch,
          dataLimitTypeChecked: t ? "1" : "0",
          limitDataMonth: t ? e.data_volume_limit_size : "0",
          alertDataReach: t ? e.data_volume_alert_percent : "0",
          limitTimeMonth: t ? "0" : e.data_volume_limit_size,
          alertTimeReach: t ? "0" : e.data_volume_alert_percent,
          monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
          monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
          monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
          autoClearTraffic: e.wan_auto_clear_flow_data_switch,
          traffic_clear_date: e.traffic_clear_date,
        };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ft() {
    function e(e, t) {
      var r = "1" == e.dataLimitTypeChecked,
        i = { isTest: Ji, goformId: "DATA_LIMIT_SETTING" };
      return (
        "1" == e.dataLimitChecked &&
          ((i.data_volume_limit_unit = r ? "data" : "time"),
          (i.data_volume_limit_size = r ? e.limitDataMonth : e.limitTimeMonth),
          (i.data_volume_alert_percent = r
            ? e.alertDataReach
            : e.alertTimeReach)),
        (i.wan_auto_clear_flow_data_switch = e.wan_auto_clear_flow_data_switch),
        (i.traffic_clear_date = e.traffic_clear_date),
        -1 != n.DEVICE.toLowerCase().indexOf("cpe")
          ? (i.data_volume_limit_switch = e.dataLimitChecked)
          : ((i.data_volume_limit_switch = e.dataLimitChecked),
            (i.notify_deviceui_enable = "0")),
        i
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Wt() {
    function e(e, t) {
      return "send" == e.sendOrReply
        ? {
            isTest: Ji,
            goformId: "USSD_PROCESS",
            USSD_operator: e.operator,
            USSD_send_number: e.strUSSDCommand,
            notCallback: !0,
          }
        : "reply" == e.sendOrReply
        ? {
            isTest: Ji,
            goformId: "USSD_PROCESS",
            USSD_operator: e.operator,
            USSD_reply_number: e.strUSSDCommand,
            notCallback: !0,
          }
        : void 0;
    }
    function t(e) {
      if (!e) return void n(!1, "ussd_fail");
      "success" == e.result ? ((callbackTemp = n), Lt()) : n(!1, "ussd_fail");
    }
    var n = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Lt() {
    t.ajax({
      url: "/goform/goform_get_cmd_process",
      data: { cmd: "ussd_write_flag" },
      cache: !1,
      async: !0,
      dataType: "json",
      success: function (e) {
        "1" == e.ussd_write_flag
          ? callbackTemp(!1, "ussd_no_service")
          : "4" == e.ussd_write_flag ||
            "unknown" == e.ussd_write_flag ||
            "3" == e.ussd_write_flag
          ? callbackTemp(!1, "ussd_timeout")
          : "15" == e.ussd_write_flag
          ? setTimeout(Lt, 1e3)
          : "10" == e.ussd_write_flag
          ? callbackTemp(!1, "ussd_retry")
          : "99" == e.ussd_write_flag
          ? callbackTemp(!1, "ussd_unsupport")
          : "41" == e.ussd_write_flag
          ? callbackTemp(!1, "operation_not_supported")
          : "2" == e.ussd_write_flag
          ? callbackTemp(!1, "network_terminated")
          : "16" == e.ussd_write_flag
          ? t.ajax({
              url: "/goform/goform_get_cmd_process",
              data: { cmd: "ussd_data_info" },
              dataType: "json",
              async: !0,
              cache: !1,
              success: function (e) {
                var t = {};
                (t.data = e.ussd_data),
                  (t.ussd_action = e.ussd_action),
                  (t.ussd_dcs = e.ussd_dcs),
                  callbackTemp(!0, t);
              },
              error: function () {
                callbackTemp(!1, "ussd_info_error");
              },
            })
          : callbackTemp(!1, "ussd_fail");
      },
      error: function () {
        callbackTemp(!1, "ussd_fail");
      },
    });
  }
  function xt(e) {
    function r() {
      t.ajax({
        url: "/goform/goform_get_cmd_process",
        data: { cmd: "ussd_write_flag" },
        cache: !1,
        async: !0,
        dataType: "json",
        success: function (t) {
          "15" == t.ussd_write_flag
            ? setTimeout(r, 1e3)
            : e("13" == t.ussd_write_flag ? !0 : !1);
        },
        error: function () {
          e(!1);
        },
      });
    }
    var i = {};
    if (
      ((i.goformId = "USSD_PROCESS"),
      (i.USSD_operator = "ussd_cancel"),
      n.ACCESSIBLE_ID_SUPPORT)
    ) {
      var _ = hex_md5(rd0 + rd1),
        s = hr({ nv: "RD" }).RD,
        o = hex_md5(_ + s);
      i.AD = o;
    }
    t.ajax({
      url: "/goform/goform_set_cmd_process",
      data: i,
      cache: !1,
      dataType: "json",
      success: function (t) {
        "success" == t.result ? r() : e(!1);
      },
    });
  }
  function Ot() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "dlna_language,dlna_name,dlna_share_audio,dlna_share_video,dlna_share_image,dlna_scan_state,sd_card_state,sdcard_mode_option,dlna_rescan_end"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        return {
          language: e.dlna_language,
          deviceName: e.dlna_name,
          shareAudio: e.dlna_share_audio,
          shareVideo: e.dlna_share_video,
          shareImage: e.dlna_share_image,
          needRescan: "1" == e.dlna_scan_state,
          dlnaEnable: !0,
          dlna_scan: e.dlna_rescan_end,
        };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function kt() {
    function e(e, t) {
      return {
        isTest: Ji,
        notCallback: !0,
        goformId: "DLNA_SETTINGS",
        dlna_language: e.language,
        dlna_name: e.deviceName,
        dlna_share_audio: e.shareAudio,
        dlna_share_video: e.shareVideo,
        dlna_share_image: e.shareImage,
      };
    }
    function t(e) {
      e && "success" == e.result ? O("dlna_rescan_end", n) : r(e);
    }
    function n(e) {
      Bt(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Ut() {
    function e(e, t) {
      return { isTest: Ji, notCallback: !0, goformId: "DLNA_RESCAN" };
    }
    function t(e) {
      e && "success" == e.result ? O("dlna_rescan_end", n) : r(e);
    }
    function n(e) {
      Bt(e, r, n);
    }
    var r = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Bt(e, t, n) {
    "1" == e.dlna_rescan_end &&
      (k("dlna_rescan_end", n), t({ result: "success" }));
  }
  function Vt() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "UNLOCK_NETWORK",
        notCallback: !0,
        unlock_network_code: e.unlock_network_code,
      };
    }
    function t(e) {
      e && "success" == e.result ? U(n) : r({ result: "fail" });
    }
    function n() {
      i > 5
        ? (B(n), r({ result: "fail" }))
        : "modem_imsi_waitnck" != t_.simStatus &&
          (B(n), r({ result: "success" })),
        i++;
    }
    var r = arguments[1],
      i = 0;
    return s(arguments, {}, e, t, null, !0);
  }
  function Ht() {
    function e(e, t) {
      return { isTest: Ji, cmd: "unlock_nck_time" };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Gt() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "SET_UPGRADE_NOTICE",
        upgrade_notice_flag: e.upgrade_notice_flag,
        notCallback: !0,
      };
    }
    function t(e) {
      n("success" == e.result ? !0 : !1);
    }
    var n = arguments[1];
    return s(arguments, {}, e, t, null, !0);
  }
  function Kt() {
    function e(e, t) {
      return { isTest: Ji, cmd: "upgrade_notice_flag" };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function zt() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "wifi_sta_connection,ap_station_mode,m_ssid_enable",
      };
    }
    function t(e) {
      return e
        ? {
            multi_ssid_enable: e.m_ssid_enable,
            ap_station_enable: e.wifi_sta_connection,
            ap_station_mode: e.ap_station_mode,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Xt() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "WIFI_STA_CONTROL",
        wifi_sta_connection: e.ap_station_enable,
        ap_station_mode: e.ap_station_mode,
      };
    }
    function t(e) {
      return e && "success" == e.result
        ? ((t_.ap_station_enable = 1 == n.ap_station_enable),
          (t_.ap_station_mode = n.ap_station_mode),
          e)
        : Qi;
    }
    var n = arguments[0];
    return s(arguments, {}, e, t, null, !0);
  }
  function jt() {
    return zt({}, function (e) {
      (t_.ap_station_enable = 1 == e.ap_station_enable),
        (t_.ap_station_mode = e.ap_station_mode);
    });
  }
  function qt() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num",
      };
    }
    function t(e) {
      if (e) {
        for (var t = [], n = 0; n <= 5; n++) {
          var r = "";
          r = 0 == n ? e.wifi_profile : e["wifi_profile" + n];
          for (var i = r.split(";"), _ = 0; _ < i.length; _++) {
            var s = i[_].split(",");
            if (!s[0]) break;
            var o = {
              profileName: s[0],
              fromProvider: s[1],
              connectStatus: s[2],
              signal: s[3],
              ssid: s[4],
              authMode: s[5],
              encryptType: s[6],
              password: "0" == s[7] ? "" : s[7],
              keyID: s[8],
            };
            t.push(o);
          }
        }
        return { hotspotList: t };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Yt() {
    function e(e) {
      return { isTest: Ji, goformId: "WLAN_SET_STA_REFRESH" };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Zt() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "scan_finish,EX_APLIST,EX_APLIST1",
      };
    }
    function t(e) {
      if (e) {
        if ("0" == e.scan_finish) return { scan_finish: !1, hotspotList: [] };
        for (var t = [], n = 0; n <= 1; n++) {
          var r;
          r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
          for (var i = r.split(";"), _ = 0; _ < i.length; _++) {
            var s = i[_].split(",");
            if (!s[0]) break;
            var o = {
              fromProvider: s[0],
              connectStatus: s[1],
              ssid: s[2],
              signal: s[3],
              channel: s[4],
              authMode: s[5],
              encryptType: s[6],
            };
            t.push(o);
          }
        }
        return { scan_finish: !0, hotspotList: t };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Qt() {
    function e(e, t) {
      return { isTest: Ji, multi_data: 1, cmd: "EX_APLIST,EX_APLIST1" };
    }
    function t(e) {
      if (e) {
        for (var t = [], n = 0; n <= 1; n++) {
          var r;
          r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
          for (var i = r.split(";"), _ = 0; _ < i.length; _++) {
            var s = i[_].split(",");
            if (!s[0]) break;
            var o = {
              fromProvider: s[0],
              connectStatus: s[1],
              ssid: s[2],
              signal: s[3],
              channel: s[4],
              authMode: s[5],
              encryptType: s[6],
            };
            t.push(o);
          }
        }
        return { hotspotList: t };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Jt(e) {
    var t = [];
    return (
      t.push(e.profileName),
      t.push(e.fromProvider || "0"),
      t.push(e.connectStatus || "0"),
      t.push(e.signal),
      t.push(e.ssid),
      t.push(e.authMode),
      t.push(e.encryptType),
      t.push(e.password || "0"),
      t.push(e.keyID),
      t.join(",")
    );
  }
  function $t() {
    function e(e) {
      var t = e.apList,
        n = "modify";
      if ("2" == e.saveAddFlag) {
        (n = "add"), t.reverse();
        t.push({
          profileName: e.profileName,
          fromProvider: "0",
          connectStatus: "0",
          signal: e.signal,
          ssid: e.ssid,
          authMode: e.authMode,
          encryptType: e.encryptType,
          password: e.password || "0",
          keyID: e.keyID,
        }),
          t.reverse();
      }
      for (
        var r = {
            profile0: [],
            profile1: [],
            profile2: [],
            profile3: [],
            profile4: [],
            profile5: [],
          },
          i = "",
          _ = 0;
        _ < t.length;
        _++
      ) {
        var s = "";
        e.profileNameInit == t[_].profileName
          ? ((s = Jt(e)), (i = s))
          : (s = Jt(t[_]));
        r["profile" + parseInt(_ / 5)].push(s);
      }
      return {
        isTest: Ji,
        goformId: "WIFI_SPOT_PROFILE_UPDATE",
        wifi_profile: r.profile0.join(";"),
        wifi_profile1: r.profile1.join(";"),
        wifi_profile2: r.profile2.join(";"),
        wifi_profile3: r.profile3.join(";"),
        wifi_profile4: r.profile4.join(";"),
        wifi_profile5: r.profile5.join(";"),
        wifi_profile_num: t.length,
        wifi_update_profile: i,
        action: n,
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function en() {
    function e(e) {
      for (
        var t = e.apList,
          n = {
            profile0: [],
            profile1: [],
            profile2: [],
            profile3: [],
            profile4: [],
            profile5: [],
          },
          r = !1,
          i = "",
          _ = 0;
        _ < t.length;
        _++
      ) {
        var s = Jt(t[_]);
        if (t[_].profileName != e.profileName) {
          var o = _;
          r && (o = _ - 1);
          n["profile" + parseInt(o / 5)].push(s);
        } else (r = !0), (i = s);
      }
      var a = r ? t.length - 1 : t.length;
      return {
        isTest: Ji,
        goformId: "WIFI_SPOT_PROFILE_UPDATE",
        wifi_profile: n.profile0.join(";"),
        wifi_profile1: n.profile1.join(";"),
        wifi_profile2: n.profile2.join(";"),
        wifi_profile3: n.profile3.join(";"),
        wifi_profile4: n.profile4.join(";"),
        wifi_profile5: n.profile5.join(";"),
        wifi_profile_num: a,
        wifi_update_profile: i,
        action: "delete",
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function tn() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "WLAN_SET_STA_CON",
        EX_SSID1: e.EX_SSID1,
        EX_AuthMode: e.EX_AuthMode,
        EX_EncrypType: e.EX_EncrypType,
        EX_DefaultKeyID: e.EX_DefaultKeyID,
        EX_WEPKEY: e.EX_WEPKEY,
        EX_WPAPSK1: e.EX_WPAPSK1,
        EX_wifi_profile: e.EX_wifi_profile,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function nn() {
    function e(e) {
      return { isTest: Ji, goformId: "WLAN_SET_STA_DISCON" };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function rn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "opms_wan_mode,opms_wan_auto_mode,loginfo,ppp_status,ethernet_port_specified",
      };
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          "AUTO" == e.opms_wan_mode
            ? (t.opms_wan_mode = e.opms_wan_auto_mode
                ? e.opms_wan_auto_mode
                : "")
            : (t.opms_wan_mode = e.opms_wan_mode ? e.opms_wan_mode : ""),
          (t.loginfo = e.loginfo),
          (t.ppp_status = e.ppp_status),
          (t.ethernet_port_specified =
            "1" == e.ethernet_port_specified ? e.ethernet_port_specified : "0"),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function _n(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji, goformId: "OPERATION_MODE" }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function sn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function on() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "opms_wan_auto_mode,pppoe_username,pppoe_password,pppoe_dial_mode,pppoe_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,dhcp_wan_status,static_wan_status",
      };
    }
    function t(e) {
      return e
        ? {
            opms_wan_auto_mode: e.opms_wan_auto_mode,
            pppoe_username: e.pppoe_username,
            pppoe_password: e.pppoe_password,
            pppoe_dial_mode: e.pppoe_dial_mode,
            ppp_status: e.pppoe_status,
            static_wan_ipaddr: e.static_wan_ipaddr,
            static_wan_netmask: e.static_wan_netmask,
            static_wan_gateway: e.static_wan_gateway,
            static_wan_primary_dns: e.static_wan_primary_dns,
            static_wan_secondary_dns: e.static_wan_secondary_dns,
            dhcp_wan_status: e.dhcp_wan_status,
            static_wan_status: e.static_wan_status,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function an(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji, notCallback: !0 }, e);
    }
    function i(t) {
      "success" == t.result
        ? "WAN_GATEWAYMODE_PPPOE" == e.goformId && "connect" == e.action_link
          ? (showLoading("connecting"),
            (checkPoint = new Date().getTime()),
            U(_))
          : "WAN_GATEWAYMODE_PPPOE" == e.goformId &&
            "disconnect" == e.action_link
          ? ((checkPoint = new Date().getTime()), U(o))
          : n({ result: !0 })
        : n({ result: !1 });
    }
    function _(e) {
      "ppp_connecting" == e.pppoe_status
        ? (t_.connectStatus = "ppp_connecting")
        : checkConnectedStatus(e.pppoe_status)
        ? (B(_),
          (t_.connectStatus = "ppp_connected"),
          n({ result: !0, status: t_.connectStatus }))
        : new Date().getTime() - checkPoint < 1e4
        ? (t_.connectStatus = "ppp_connecting")
        : (B(_), n({ result: !1 }));
    }
    function o(e) {
      "ppp_disconnecting" == e.pppoe_status
        ? (t_.connectStatus = "ppp_disconnecting")
        : "ppp_disconnected" == e.pppoe_status
        ? (B(o),
          (t_.connectStatus = "ppp_disconnected"),
          n({ result: !0, status: t_.connectStatus }))
        : new Date().getTime() - checkPoint < 1e4
        ? (t_.connectStatus = "ppp_disconnecting")
        : (B(o), n({ result: !1 }));
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function un(e, t) {
    function n(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "sntp_year,sntp_month_temp,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_server_list1,sntp_server_list2,sntp_server_list3,sntp_server_list4,sntp_server_list5,sntp_server_list6,sntp_server_list7,sntp_server_list8,sntp_server_list9,sntp_server_list10,sntp_server0,sntp_server1,sntp_server2,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_dst_enable,ppp_status,opms_wan_mode,syn_done",
      };
    }
    function r(e) {
      if (e) {
        var t = i(e);
        return {
          sntp_year: e.sntp_year,
          sntp_month: e.sntp_month_temp,
          sntp_day: e.sntp_day,
          sntp_hour: e.sntp_hour,
          sntp_minute: e.sntp_minute,
          sntp_second: e.sntp_second,
          sntp_time_set_mode: e.sntp_time_set_mode,
          sntp_servers: t,
          sntp_server0: e.sntp_server0,
          sntp_server1: e.sntp_server1,
          sntp_server2: e.sntp_server2,
          sntp_other_server0: e.sntp_other_server0,
          sntp_other_server1: e.sntp_other_server1,
          sntp_other_server2: e.sntp_other_server2,
          sntp_timezone: e.sntp_timezone,
          sntp_dst_enable: e.sntp_dst_enable,
          ppp_status: e.ppp_status,
          opms_wan_mode: e.opms_wan_mode,
          syn_done: e.syn_done,
        };
      }
      return Qi;
    }
    function i(e) {
      for (var t = [], n = 0; n < 10; n++) {
        var r = "sntp_server_list" + (n + 1).toString();
        if ("" != e[r]) {
          var i = {};
          (i.name = e[r]), (i.value = e[r]), t.push(i);
        }
      }
      for (
        var _ = [
            { name: "Other", value: "Other" },
            { name: "NONE", value: "" },
          ],
          s = 0;
        s < 2;
        s++
      )
        t.push(_[s]);
      return t;
    }
    return s(arguments, {}, n, r, null, !1);
  }
  function cn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function dn(e, r) {
    function i() {
      t.ajax({
        url: "/goform/goform_get_cmd_process",
        dataType: "json",
        data: { cmd: "syn_done,nitz_sync_flag", multi_data: "1" },
        cache: !1,
        async: !1,
        success: function (e) {
          "1" == e.syn_done || "1" == e.nitz_sync_flag
            ? r(!0)
            : "0" == e.syn_done
            ? r(!1)
            : setTimeout(i, 2e3);
        },
        error: function () {
          r(!1);
        },
      });
    }
    var _ = t.extend({ isTest: Ji }, e);
    if (_.isTest)
      (result = simulate.simulateRequest(e, r, r, !0, !0)),
        setTimeout(function () {
          r(result);
        }, getRandomInt(120) + 50);
    else {
      if (n.ACCESSIBLE_ID_SUPPORT) {
        var s = hex_md5(rd0 + rd1),
          o = hr({ nv: "RD" }).RD,
          a = hex_md5(s + o);
        _.AD = a;
      }
      t.post(
        "/goform/goform_set_cmd_process",
        _,
        function (t) {
          t && "success" == t.result
            ? "auto" == e.manualsettime
              ? setTimeout(i, 2e3)
              : r(!0)
            : r(!1);
        },
        "json"
      );
    }
  }
  function ln(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function pn() {
    function e(e, t) {
      return { isTest: Ji, cmd: "websURLFilters" };
    }
    function t(e) {
      var t = [];
      if (e) {
        if (0 == e.websURLFilters.length) return { urlFilterRules: [] };
        for (var n = e.websURLFilters.split(";"), r = 0; r < n.length; r++) {
          var i = {};
          (i.index = r), (i.url = n[r]), t.push(i);
        }
        return { urlFilterRules: t };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function mn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function fn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,RadioOff",
      };
    }
    function t(e) {
      return e
        ? {
            currentMode: e.wifi_wds_mode,
            wdsSSID: e.wifi_wds_ssid,
            wdsAuthMode: e.wifi_wds_AuthMode,
            wdsEncrypType: e.wifi_wds_EncrypType,
            wdsWPAPSK1: e.wifi_wds_WPAPSK1,
            RadioOff: e.RadioOff,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function gn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function vn() {
    function e(e, t) {
      return { isTest: Ji, multi_data: "1", cmd: "syslog_mode,debug_level" };
    }
    function t(e) {
      return e ? { currentMode: e.syslog_mode, debugLevel: e.debug_level } : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function wn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Sn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "tr069_ServerURL,tr069_CPEPortNo,tr069_ServerUsername,tr069_ServerPassword,tr069_ConnectionRequestUname,tr069_ConnectionRequestPassword,wan_ipaddr,tr069_PeriodicInformEnable,tr069_PeriodicInformInterval,tr069_CertEnable,tr069_DataModule,tr069_Webui_DataModuleSupport",
      };
    }
    function t(e) {
      return e
        ? {
            serverUrl: e.tr069_ServerURL,
            tr069_CPEPortNo: e.tr069_CPEPortNo,
            serverUserName: e.tr069_ServerUsername,
            serverPassword: e.tr069_ServerPassword,
            requestUserName: e.tr069_ConnectionRequestUname,
            requestPassword: e.tr069_ConnectionRequestPassword,
            wanIpAddress: e.wan_ipaddr,
            tr069_PeriodicInformEnable: e.tr069_PeriodicInformEnable,
            tr069_PeriodicInformInterval: e.tr069_PeriodicInformInterval,
            tr069_CertEnable: e.tr069_CertEnable,
            tr069_DataModule: e.tr069_DataModule,
            tr069_Webui_DataModuleSupport: e.tr069_Webui_DataModuleSupport,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function hn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Tn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "voip_display_name,voip_user_name,voip_authorization_user_name,voip_authorization_password,voip_registration_server,voip_registration_server_port,voip_proxy_server,voip_proxy_server_port,voip_outbound_proxy_enable,voip_outbound_proxy,voip_outbound_proxy_port,voip_register_status",
      };
    }
    function t(e) {
      return e
        ? {
            display_name: e.voip_display_name,
            user_name: e.voip_authorization_user_name,
            authorization_user_name: e.voip_user_name,
            authorization_password: e.voip_authorization_password,
            registration_server: e.voip_registration_server,
            registration_server_port: e.voip_registration_server_port,
            proxy_server: e.voip_proxy_server,
            proxy_server_port: e.voip_proxy_server_port,
            outboundEnable: e.voip_outbound_proxy_enable,
            outboundServer: e.voip_outbound_proxy,
            outboundPort: e.voip_outbound_proxy_port,
            voip_register_status: e.voip_register_status,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Pn(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function In() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "voip_sip_register_server1,voip_sip_domain1,voip_sip_realm1,voip_sip_proxy_enable1,voip_sip_proxy_server1,voip_account_display_account1,voip_account_auth1,voip_account_password1,voip_user1_register_status",
      };
    }
    function t(e) {
      return e
        ? {
            sipRegisterServer: e.voip_sip_register_server1,
            sipDomain: e.voip_sip_domain1,
            sipRealm: e.voip_sip_realm1,
            sipProxyMode: e.voip_sip_proxy_enable1,
            voipSipProxyServer: e.voip_sip_proxy_server1,
            displayName: e.voip_account_display_account1,
            authorizedUserName: e.voip_account_auth1,
            authorizedPassword: e.voip_account_password1,
            voipRegisterStatus: e.voip_user1_register_status,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function bn() {
    function e(e, t) {
      return { isTest: Ji, cmd: "voip_user1_register_status" };
    }
    function t(e) {
      return e ? { voipRegisterStatus: e.voip_user1_register_status } : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function An() {
    function e(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function n(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function yn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "voip_sip_t38_enable1,voip_sip_dtmf_method,voip_sip_encoder1,voip_sip_vad_enable1,voip_sip_cng_enable1",
      };
    }
    function t(e) {
      return e
        ? {
            sipT38Mode: e.voip_sip_t38_enable1,
            currentDtmfMethod: e.voip_sip_dtmf_method,
            currentVoipSipEncoderMethod: e.voip_sip_encoder1,
            sipVadMode: e.voip_sip_vad_enable1,
            sipCngMode: e.voip_sip_cng_enable1,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function En() {
    function e(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function n(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function Rn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "voip_call_waiting_enable,voip_call_hold_enable,voip_three_way_talking_enable,voip_call_transfer_enable,voip_call_fwd_unconditional_enable,voip_call_fwd_unconditional_number,voip_call_fwd_busy_enable,voip_call_fwd_busy_number,voip_call_fwd_no_answer_enable,voip_call_fwd_no_answer_number",
      };
    }
    function t(e) {
      return e
        ? {
            voip_call_waiting_enable: e.voip_call_waiting_enable,
            voip_call_hold_enable: e.voip_call_hold_enable,
            voip_three_way_talking_enable: e.voip_three_way_talking_enable,
            voip_call_transfer_enable: e.voip_call_transfer_enable,
            voip_call_fwd_unconditional_enable:
              e.voip_call_fwd_unconditional_enable,
            voip_call_fwd_unconditional_number:
              e.voip_call_fwd_unconditional_number,
            voip_call_fwd_busy_enable: e.voip_call_fwd_busy_enable,
            voip_call_fwd_busy_number: e.voip_call_fwd_busy_number,
            voip_call_fwd_no_answer_enable: e.voip_call_fwd_no_answer_enable,
            voip_call_fwd_no_answer_number: e.voip_call_fwd_no_answer_number,
            selectedMode: "1" == e.voip_call_fwd_unconditional_enable ? 1 : 0,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Nn() {
    function e(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function n(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function Dn() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,RadioOff,user_ip_addr",
      };
    }
    function t(e) {
      return e
        ? {
            ACL_mode: e.ACL_mode,
            wifi_mac_black_list: e.wifi_mac_black_list,
            wifi_hostname_black_list: e.wifi_hostname_black_list,
            RadioOff: e.RadioOff,
            user_ip_addr: e.user_ip_addr,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Mn() {
    function e(e) {
      return {
        goformId: "WIFI_MAC_FILTER",
        isTest: Ji,
        ACL_mode: e.ACL_mode,
        macFilteringMode: e.ACL_mode,
        wifi_hostname_black_list: e.wifi_hostname_black_list,
        wifi_mac_black_list: e.wifi_mac_black_list,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Cn() {
    function e(e) {
      return {
        isTest: Ji,
        cmd: "mgmt_quicken_power_on,need_hard_reboot",
        multi_data: 1,
      };
    }
    function t(e) {
      return {
        fastbootEnabled: "1" == e.mgmt_quicken_power_on ? "1" : "0",
        need_hard_reboot: e.need_hard_reboot,
      };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Fn() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "MGMT_CONTROL_POWER_ON_SPEED",
        mgmt_quicken_power_on: e.fastbootEnabled,
        need_hard_reboot: e.need_hard_reboot,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Wn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "REBOOT_DEVICE"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ln() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "SHUTDOWN_DEVICE"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function xn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "new_version_state"), n;
    }
    function t(e) {
      if (e) {
        var t =
          "1" == e.new_version_state ||
          "version_has_new_critical_software" == e.new_version_state ||
          "version_has_new_optional_software" == e.new_version_state;
        return (e.hasNewVersion = t), e;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function On() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "dm_new_version"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function kn() {
    function e(e, t) {
      var r = {};
      return (
        (r.isTest = Ji),
        "OTA" == n.UPGRADE_TYPE
          ? (r.cmd = "is_mandatory")
          : (r.cmd = "new_version_state"),
        r
      );
    }
    function t(e) {
      return e
        ? "OTA" == n.UPGRADE_TYPE
          ? { is_mandatory: "1" == e.is_mandatory }
          : {
              is_mandatory:
                "version_has_new_critical_software" == e.new_version_state,
            }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Un() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "upgrade_result"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Bn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "current_upgrade_state"), n;
    }
    function t(e) {
      return e
        ? ("downloading" == e.current_upgrade_state &&
            (e.current_upgrade_state = "upgrading"),
          e)
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Vn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "dm_update_package_file_exist"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Hn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "pack_size_info"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Gn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "if_has_select"), n;
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Kn() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "IF_UPGRADE"),
        (n.isTest = Ji),
        (n.select_op = e.selectOp),
        "check" == n.select_op && (n.ota_manual_check_roam_state = 1),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function zn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "GetUpgAutoSetting"), n;
    }
    function t(e) {
      return e
        ? {
            updateMode: e.UpgMode,
            updateIntervalDay: e.UpgIntervalDay,
            allowRoamingUpdate: e.UpgRoamPermission,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Xn() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SetUpgAutoSetting"),
        (n.UpgMode = e.updateMode),
        (n.UpgIntervalDay = e.updateIntervalDay),
        (n.UpgRoamPermission = e.allowRoamingUpdate),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function jn() {
    return hr({ nv: ["dm_last_check_time"] }, arguments[1], arguments[2]);
  }
  function qn() {
    return hr(
      { nv: ["dm_update_successful_time"] },
      arguments[1],
      arguments[2]
    );
  }
  function Yn() {
    return hr(
      {
        nv: [
          "network_type",
          "rssi",
          "rscp",
          "lte_rsrp",
          "Z5g_snr",
          "Z5g_rsrp",
          "ZCELLINFO_band",
          "Z5g_dlEarfcn",
          "lte_ca_pcell_arfcn",
          "lte_ca_pcell_band",
          "lte_ca_scell_band",
          "lte_ca_pcell_bandwidth",
          "lte_ca_scell_info",
          "lte_ca_scell_bandwidth",
          "wan_lte_ca",
          "lte_pci",
          "Z5g_CELL_ID",
          "Z5g_SINR",
          "cell_id",
          "wan_lte_ca",
          "lte_ca_pcell_band",
          "lte_ca_pcell_bandwidth",
          "lte_ca_scell_band",
          "lte_ca_scell_bandwidth",
          "lte_ca_pcell_arfcn",
          "lte_ca_scell_arfcn",
          "lte_multi_ca_scell_info",
          "wan_active_band",
          "nr5g_pci",
          "nr5g_action_band",
          "nr5g_cell_id",
        ],
      },
      arguments[1],
      arguments[2]
    );
  }
  function Zn() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "RESULT_RESTORE"), n;
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Qn() {
    function e(e) {
      return { isTest: Ji, goformId: "RESET_DATA_COUNTER" };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Jn() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "CHANGE_MODE"),
        (n.change_mode = e.change_mode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function $n() {
    function e(e, t) {
      return { isTest: Ji, cmd: "childGroupList" };
    }
    function t(e) {
      return e && (e.childGroupList || e.devices)
        ? Ji
          ? e.childGroupList
          : e
        : { devices: [] };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function er() {
    function e(e, t) {
      return { isTest: Ji, goformId: "ADD_DEVICE", mac: e.macAddress };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function tr() {
    function e(e, t) {
      return { isTest: Ji, goformId: "DEL_DEVICE", mac: e.mac };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function nr(t) {
    if (void 0 === n.currentUserInChildGroup) {
      var r = [];
      r = void 0 !== t ? t : $n({}).devices;
      var i = or({}).get_user_mac_addr || or({}).user_mac_addr,
        _ = e.find(r, function (e) {
          return e.mac == i;
        });
      return (
        (n.currentUserInChildGroup = void 0 !== _), { result: void 0 !== _ }
      );
    }
    return { result: n.currentUserInChildGroup };
  }
  function rr() {
    function e(e, t) {
      return { isTest: Ji, cmd: "child_mac_rule_info", mac_addr: e.mac_addr };
    }
    function t(e) {
      return e && void 0 !== e.child_mac_rule_info
        ? e
        : { child_mac_rule_info: "" };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ir() {
    function e(e, t) {
      return { isTest: Ji, goformId: "CHILD_MAC_RULE_DELETE", mac_addr: e.mac };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function _r() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "CHILD_MAC_RULE_ADD",
        child_mac_rule_info: e.child_mac_rule_info,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function sr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "CHILD_MAC_RULE_UPDATE",
        mac_addr: e.mac_addr,
        child_mac_rule_info: e.child_mac_rule_info,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function or() {
    return hr({ nv: "get_user_mac_addr" }, arguments[1], arguments[2]);
  }
  function ar() {
    return or({}).get_user_mac_addr || or({}).user_mac_addr;
  }
  function ur() {
    function e(e, t) {
      return { isTest: Ji, cmd: "hostNameList" };
    }
    function t(e) {
      return e && (e.hostNameList || e.devices)
        ? Ji
          ? e.hostNameList
          : e
        : { devices: [] };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function cr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "EDIT_HOSTNAME",
        mac: e.mac,
        hostname: e.hostname,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function dr() {
    function e(e, t) {
      return { isTest: Ji, cmd: "site_white_list" };
    }
    function t(e) {
      return e && (e.site_white_list || e.siteList)
        ? Ji
          ? e.site_white_list
          : e
        : { siteList: [] };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function lr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "REMOVE_WHITE_SITE",
        ids: e.ids.join(","),
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function pr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "ADD_WHITE_SITE",
        name: e.name,
        site: e.site,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function mr() {
    function t(e, t) {
      return { isTest: Ji, cmd: "time_limited" };
    }
    function n(e) {
      return e ? r(e) : i;
    }
    function r(t) {
      if ("" == t.time_limited) return { time_limited: [] };
      var n = t.time_limited.split(";");
      return (
        e.each(n, function (e) {
          var t = e.split("+");
          2 == t.length && (i[t[0]] = t[1].split(","));
        }),
        i
      );
    }
    var i = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    return s(arguments, {}, t, n, null, !1);
  }
  function fr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "SAVE_TIME_LIMITED",
        time_limited: e.time,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(
      arguments,
      0 == n.currentUserInChildGroup ? {} : { errorType: "no_auth" },
      e,
      t,
      null,
      !0
    );
  }
  function gr() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "web_wake_switch,web_sleep_switch,web_wake_time,web_sleep_time",
        multi_data: "1",
      };
    }
    function t(e) {
      if (e) {
        if (-1 != e.web_wake_time.indexOf(":")) {
          var t = e.web_wake_time.split(":");
          (e.openH = leftInsert(t[0], 2, "0")),
            (e.openM = leftInsert(t[1], 2, "0"));
        } else (e.openH = "06"), (e.openM = "00");
        if (-1 != e.web_sleep_time.indexOf(":")) {
          var n = e.web_sleep_time.split(":");
          (e.closeH = leftInsert(n[0], 2, "0")),
            (e.closeM = leftInsert(n[1], 2, "0"));
        } else (e.closeH = "22"), (e.closeM = "00");
        return e;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function vr() {
    function e(e, t) {
      var n = {
        isTest: Ji,
        goformId: "SAVE_TSW",
        web_wake_switch: e.openEnable,
        web_sleep_switch: e.closeEnable,
      };
      return (
        "1" == e.openEnable &&
          ((n.web_wake_time = e.openTime), (n.web_sleep_time = e.closeTime)),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function wr() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "systime_mode,syn_done,nitz_sync_flag",
        multi_data: "1",
      };
    }
    function t(e) {
      return !e ||
        ("sntp" != e.systime_mode &&
          "nitz" != e.systime_mode &&
          "manual" != e.systime_mode &&
          "1" != e.syn_done &&
          "1" != e.nitz_sync_flag)
        ? { result: !1 }
        : { result: !0 };
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Sr() {
    function e(e, t) {
      return {
        isTest: Ji,
        goformId: "FLOW_CALIBRATION_MANUAL",
        calibration_way: e.way,
        time: "time" == e.way ? e.value : 0,
        data: "data" == e.way ? e.value : 0,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function hr() {
    function t(t, n) {
      var r = {};
      return (
        (r.isTest = Ji),
        e.isArray(t.nv)
          ? ((r.cmd = t.nv.join(",")), (r.multi_data = 1))
          : (r.cmd = t.nv),
        r
      );
    }
    function n(e) {
      return e || Qi;
    }
    return s(arguments, {}, t, n, null, !1);
  }
  function Tr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "vwim_mc_state,traffic_overrun,detect_new_version"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.vwim_mc_state = e.vwim_mc_state),
          (t.traffic_overrun = e.traffic_overrun),
          (t.detect_new_version = e.detect_new_version),
          (t.opms_wan_mode =
            "AUTO" == t_.opms_wan_mode
              ? t_.opms_wan_auto_mode
              : t_.opms_wan_mode),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Pr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "CLEAR_REDIRECT_FLAG"),
        (n.flag_id = e.redirectFlags),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ir() {
    function e(e, n) {
      return t.extend(
        { goformId: "DHCP_RESERVATION_TO_STATIC", isTest: Ji },
        e
      );
    }
    function n(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function br() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "host_name_web,mac_addr_web,ip_addr_web,lan_ipaddr,lan_netmask"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.ipAddress = e.lan_ipaddr),
          (t.subnetMask = e.lan_netmask),
          (t.host_name_web = e.host_name_web),
          (t.mac_addr_web = e.mac_addr_web),
          (t.ip_addr_web = e.ip_addr_web),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ar(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function yr() {
    function e(e, t) {
      return { isTest: Ji, cmd: "current_static_addr_list" };
    }
    function t(e) {
      var t = [];
      if (e) {
        if (
          null == e.current_static_addr_list ||
          "" == e.current_static_addr_list
        )
          return { StaticAddressFilterRules: [] };
        for (var n = e.current_static_addr_list, r = 0; r < n.length; r++) {
          var i = {};
          (i.index = r),
            (i.hostName = n[r].hostname),
            (i.macAddress = n[r].mac),
            (i.ipAddress = n[r].ip),
            (i.domainName = n[r].domain),
            t.push(i);
        }
        return { StaticAddressFilterRules: t };
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Er() {
    function e(e, t) {
      return { isTest: Ji, cmd: "current_static_addr_list" };
    }
    function t(e) {
      if (e) {
        var t = {};
        if (
          null == e.current_static_addr_list ||
          "" == e.current_static_addr_list
        )
          t.bindStaticIPInfo = [];
        else {
          for (
            var n = e.current_static_addr_list, r = [], i = 0;
            i < n.length;
            i++
          )
            r.push(n[i].ip);
          t.bindStaticIPInfo = r;
        }
        return t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Rr() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "mac_ip_status"), (n.multi_data = 1), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.mac_ip_status = "1" == e.mac_ip_status ? "1" : "0"), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Nr(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Dr() {
    function e(e) {
      return t.extend({ goformId: "WIFI_SPOT_PROFILE_UPDATE", isTest: Ji }, e);
    }
    function n(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function Mr() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num",
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Cr() {
    function e(e) {
      return t.extend({ goformId: "SET_NV", isTest: Ji }, e);
    }
    function n(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function Fr() {
    function e(e) {
      return {
        goformId: "SET_WIFI_BAND",
        isTest: Ji,
        wifiEnabled: e.wifiEnabled,
        wifi_band: e.wifi_band,
      };
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function Wr() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "stk_write_flag"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.stk_write_flag = e.stk_write_flag), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Lr() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "stk"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.stk = e.stk), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function xr() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "stk_menu"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.stk_menu = e.stk_menu), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Or() {
    function e(e, t) {
      var n = {};
      return (
        (n.goformId = "STK_PROCESS"),
        (n.isTest = Ji),
        (n.operator = e.operator),
        (n.item_no = e.item_no),
        (n.stk_content = e.stk_content),
        (n.stk_encode_type = e.stk_encode_type),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function kr(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e
        ? {
            sntp_dst_start: e.sntp_dst_start,
            sntp_dst_end: e.sntp_dst_end,
            sntp_dst_bias: e.sntp_dst_bias,
          }
        : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Ur(e, n) {
    function r(e, n) {
      return t.extend({ goformId: "SET_BIND_STATIC_ADDRESS", isTest: Ji }, e);
    }
    function i(e) {
      return e || Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Br() {
    function e(e) {
      return { goformId: "REDIRECT_REDIRECT_OFF" };
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function Vr() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "SleepStatusForSingleChipCpe"), n;
    }
    function t(e) {
      return e
        ? ((e.curSleepStatus =
            "1" == e.SleepStatusForSingleChipCpe ? "1" : "2"),
          e)
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Hr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_PRIVACY_NOTICE"),
        (n.privacy_read_flag = e.privacy_read_flag),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Gr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "modem_main_state,ppp_status,ipsec_status,RadioOff,puknumber,pinnumber,m_ssid_enable,HideSSID,m_HideSSID,wifi_start_fail,wifi_chip1_ssid1_wifi_coverage,NoForwarding,m_NoForwarding,wan_apn,monthly_tx_bytes,monthly_rx_bytes,station_mac,opms_wan_mode,opms_wan_auto_mode,ACL_mode,network_type,ppp_dial_fail_times,RemoteManagement,WANPingFilter,dhcpEnabled,pdp_type,prefer_dns_manual,standby_dns_manual,ipv6_prefer_dns_manual,ipv6_standby_dns_manual,web_wake_switch,upnpEnabled,prefer_dns_auto,standby_dns_auto,static_wan_primary_dns,static_wan_secondary_dns,apn_mode,ipv6_prefer_dns_auto,ipv6_standby_dns_auto,IPPortFilterEnable,DefaultFirewallPolicy,PortForwardEnable,wifi_anti_brute_force_attack_func,guest_ssid_router_enable,dns_mode,ipv6_dns_mode"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return "" == e || "0.0.0.0" == e || "::0" == e;
    }
    function n(e) {
      if (e) {
        var n = {};
        return (
          (n.simCardStatus = e.modem_main_state),
          (n.networkStatus = e.ppp_status),
          (n.wifiSwitch = e.RadioOff),
          (n.puknumber = e.puknumber),
          (n.pinnumber = e.pinnumber),
          (n.m_ssid_enable = e.m_ssid_enable),
          (n.HideSSID = e.HideSSID),
          (n.m_HideSSID = e.m_HideSSID),
          (n.wifiDriverNormal = e.wifi_start_fail),
          (n.wifi_coverage = e.wifi_chip1_ssid1_wifi_coverage),
          (n.NoForwarding = e.NoForwarding),
          (n.m_NoForwarding = e.m_NoForwarding),
          (n.wanAPN = e.wan_apn),
          (n.monthlySent = "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes),
          (n.monthlyReceived =
            "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes),
          (n.curr_connected_devices =
            e.station_mac && "" != e.station_mac
              ? e.station_mac.split(";")
              : []),
          (n.currMode = e.opms_wan_mode),
          (n.networkType = e.network_type),
          (n.ACL_mode = e.ACL_mode),
          -1 != n.networkType.toLowerCase().indexOf("limited_service") ||
          -1 != n.networkType.toLowerCase().indexOf("limited service")
            ? (n.networkType = "limited_service")
            : (-1 == n.networkType.toLowerCase().indexOf("no_service") &&
                -1 == n.networkType.toLowerCase().indexOf("no service")) ||
              (n.networkType = "no_service"),
          (n.connectFailCount = e.ppp_dial_fail_times),
          (n.remoteFlag = e.RemoteManagement),
          (n.pingFlag = e.WANPingFilter),
          (n.dhcpEnabled = e.dhcpEnabled),
          "PPP" == e.opms_wan_mode ||
          ("AUTO" == e.opms_wan_mode &&
            "AUTO_LTE_GATEWAY" == e.opms_wan_auto_mode)
            ? "ip" == e.pdp_type.toLowerCase()
              ? "auto" == e.dns_mode
                ? (n.dnsDataIsError =
                    t(e.prefer_dns_auto) && t(e.standby_dns_auto))
                : (n.dnsDataIsError = !1)
              : "ipv6" == e.pdp_type.toLowerCase()
              ? "auto" == e.ipv6_dns_mode
                ? (n.dnsDataIsError =
                    t(e.ipv6_prefer_dns_auto) && t(e.ipv6_standby_dns_auto))
                : (n.dnsDataIsError = !1)
              : "auto" == e.dns_mode
              ? (n.dnsDataIsError =
                  t(e.prefer_dns_auto) &&
                  t(e.standby_dns_auto) &&
                  t(e.ipv6_prefer_dns_auto) &&
                  t(e.ipv6_standby_dns_auto))
              : (n.dnsDataIsError = !1)
            : "DHCP" == e.opms_wan_mode ||
              ("AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode)
            ? (n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto))
            : "PPPOE" == e.opms_wan_mode ||
              ("AUTO" == e.opms_wan_mode &&
                "AUTO_PPPOE" == e.opms_wan_auto_mode)
            ? (n.dnsDataIsError = t(e.prefer_dns_auto) && t(e.standby_dns_auto))
            : (n.dnsDataIsError = !1),
          (n.wifiAwakeSwitch =
            "" == e.web_wake_switch ? "0" : e.web_wake_switch),
          (n.upnpSwitch = e.upnpEnabled),
          (n.portFilterEnable = e.IPPortFilterEnable),
          (n.defaultPolicy = e.DefaultFirewallPolicy),
          (n.PortForwardEnable = e.PortForwardEnable),
          (n.antiVioCraEnable = e.wifi_anti_brute_force_attack_func),
          (n.guestRouterEnable = e.guest_ssid_router_enable),
          n
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, n, null, !1);
  }
  function Kr() {
    function e(e, t) {
      return { isTest: Ji, cmd: "queryDeviceAccessControlList" };
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.aclMode = e.AclMode),
          (t.WhiteMacList = e.WhiteMacList),
          (t.BlackMacList = e.BlackMacList),
          (t.WhiteNameList = e.WhiteNameList),
          (t.BlackNameList = e.BlackNameList),
          (t.wifiMacWhiteList = e.WhiteMacList),
          (t.wifiMacBlackList = e.BlackMacList),
          (t.wifiHostnameWhiteList = e.WhiteNameList),
          (t.wifiHostnameBlackList = e.BlackNameList),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function zr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "thermal_control_enable,thermal_led_enable"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.thermal_control_enable =
            "1" == e.thermal_control_enable ? "1" : "0"),
          (t.thermal_led_enable = e.thermal_led_enable),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Xr() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SET_THERMAL_CONTROL"),
        (n.thermal_control_enable = e.thermal_control_enable),
        (n.thermal_led_enable = e.thermal_led_enable),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function jr() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "DIAG_URL,DIAG_CHECK,traceroute_flag",
      };
    }
    function t(e) {
      return e
        ? {
            IpUrl: e.DIAG_URL,
            CheckPingMode: e.DIAG_CHECK,
            traceroute_flag: e.traceroute_flag,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function qr(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function Yr() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "night_mode_switch,night_mode_start_time,night_mode_end_time,night_mode_close_all_led,ODU_led_switch,ODU_led_off_time",
        multi_data: "1",
      };
    }
    function t(e) {
      if (e) {
        if (-1 != e.night_mode_start_time.indexOf(":")) {
          var t = e.night_mode_start_time.split(":");
          (e.openH = leftInsert(t[0], 2, "0")),
            (e.openM = leftInsert(t[1], 2, "0"));
        } else (e.openH = "22"), (e.openM = "00");
        if (-1 != e.night_mode_end_time.indexOf(":")) {
          var n = e.night_mode_end_time.split(":");
          (e.closeH = leftInsert(n[0], 2, "0")),
            (e.closeM = leftInsert(n[1], 2, "0"));
        } else (e.closeH = "07"), (e.closeM = "00");
        return e;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Zr() {
    function e(e, t) {
      var n = {
        isTest: Ji,
        goformId: "SET_DEVICE_LED",
        night_mode_switch: e.sleepProtectionEnable,
      };
      return (
        "1" == e.sleepProtectionEnable &&
          ((n.night_mode_start_time = e.openTime),
          (n.night_mode_end_time = e.closeTime),
          (n.night_mode_close_all_led = e.night_mode_close_all_led)),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Qr() {
    function e(e, t) {
      return {
        isTest: Ji,
        multi_data: "1",
        cmd: "reboot_timeframe_hours1,reboot_timeframe_hours2,reboot_dow,reboot_dod,reboot_schedule_enable,reboot_schedule_mode,reboot_hour1,reboot_min1,reboot_hour2,reboot_min2",
      };
    }
    function t(e) {
      return e
        ? {
            reboot_dow: e.reboot_dow,
            reboot_dod: e.reboot_dod,
            reboot_schedule_enable: e.reboot_schedule_enable,
            reboot_schedule_mode: e.reboot_schedule_mode,
            reboot_hour1: e.reboot_hour1,
            reboot_min1: e.reboot_min1,
            reboot_hour2: e.reboot_hour2,
            reboot_min2: e.reboot_min2,
            reboot_threshold_hours1: e.reboot_timeframe_hours1,
            reboot_threshold_hours2: e.reboot_timeframe_hours2,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Jr(e, n) {
    function r(e) {
      return t.extend({ isTest: Ji }, e);
    }
    function i(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, r, i, null, !0);
  }
  function $r() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryWiFiModuleSwitch"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.WiFiModuleSwitch =
            "" == e.WiFiModuleSwitch ? "0" : e.WiFiModuleSwitch),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ei() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryAccessPointInfo"), n;
    }
    function t(e) {
      if (e) {
        return e.ResponseList;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ti() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryWiFiGuestLeftTime"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.WiFiGuestLeftTime = e.WiFiGuestLeftTime), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ni() {
    function t(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryWpsStatus"), n;
    }
    function n(t) {
      if (t) {
        var n = t.ResponseList;
        return (
          e.map(n, function (e, t) {
            (e.ChipIndex = e.ChipIndex),
              (e.ActiveWpsAccessPointIndex = e.ActiveWpsAccessPointIndex),
              (e.WpsStatus = e.WpsStatus),
              (e.WpsMode = e.WpsMode);
          }),
          n
        );
      }
      return Qi;
    }
    return s(arguments, {}, t, n, null, !1);
  }
  function ri() {
    function e(e) {
      var r = {
        goformId: void 0 !== e.goformId ? e.goformId : "setAccessPointInfo",
        isTest: Ji,
        ChipIndex: e.ChipIndex,
        AccessPointIndex: e.AccessPointIndex,
        QrImageShow: e.QrImageShow,
        lan_sec_ssid_control: e.lan_sec_ssid_control,
        wifi_syncparas_flag: e.wifi_syncparas_flag,
      };
      return (
        0 == e.ChipIndex &&
          1 == e.AccessPointIndex &&
          (r = t.extend(r, { GuestSSIDActiveTime: e.GuestSSIDActiveTime })),
        e.AccessPointSwitchStatus != e.originAccessPointSwitchStatus
          ? (r = t.extend(r, {
              AccessPointSwitchStatus: e.AccessPointSwitchStatus,
            }))
          : ((r = t.extend(r, {
              AccessPointSwitchStatus: e.AccessPointSwitchStatus,
              SSID: e.SSID,
              ApIsolate: e.ApIsolate,
              AuthMode: e.AuthMode,
              ApBroadcastDisabled: e.ApBroadcastDisabled,
            })),
            void 0 !== e.ApMaxStationNumber &&
              (r.ApMaxStationNumber = e.ApMaxStationNumber),
            "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode
              ? ((r.EncrypType = e.cipher),
                (r.Password = n.PASSWORD_ENCODE
                  ? Base64.encode(e.Password)
                  : e.Password))
              : (r.EncrypType = "NONE"),
            "setAccessPointInfo_24G_5G" == r.goformId &&
              ((r.SSID_CHIP1 = e.SSID + "_5G"),
              (r.wifi_syncparas_flag = e.wifi_syncparas_flag))),
        r
      );
    }
    function r(e) {
      return e || Qi;
    }
    Je(arguments, e, r);
  }
  function ii() {
    function e(e) {
      return {
        goformId: "switchWiFiModule",
        isTest: Ji,
        SwitchOption: "" == e.SwitchOption ? "0" : e.SwitchOption,
      };
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function _i() {
    function e(e) {
      var t = {
        goformId: "setWiFiChipAdvancedInfo24G_5G",
        isTest: Ji,
        ChipIndex: e.ChipIndex,
        WirelessMode: e.WirelessMode,
        CountryCode: e.CountryCode,
        Channel: e.Channel,
        WirelessMode_5G: e.WirelessMode_5G,
        CountryCode_5G: e.CountryCode_5G,
        Channel_5G: e.Channel_5G,
      };
      return (
        n.WIFI_BANDWIDTH_SUPPORT &&
          ((t.BandWidth = e.BandWidth), (t.BandWidth_5G = e.BandWidth_5G)),
        n.WIFI_BAND_SUPPORT && ((t.Band = e.Band), (t.Band_5G = e.Band_5G)),
        (n.WIFI_BAND_SUPPORT && "a" == e.wifiBand) || (t.abg_rate = e.rate),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function si() {
    function e(e) {
      var t = {
        goformId: "setWiFiChipAdvancedInfo",
        isTest: Ji,
        ChipIndex: e.ChipIndex,
        WirelessMode: e.WirelessMode,
        CountryCode: e.CountryCode,
        Channel: e.Channel,
      };
      return (
        n.WIFI_BANDWIDTH_SUPPORT && (t.BandWidth = e.BandWidth),
        n.WIFI_BAND_SUPPORT && (t.Band = e.Band),
        (n.WIFI_BAND_SUPPORT && "a" == e.wifiBand) || (t.abg_rate = e.rate),
        t
      );
    }
    function t(e) {
      return e || Qi;
    }
    Je(arguments, e, t);
  }
  function oi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "startWps"),
        (n.ChipIndex = e.ChipIndex),
        (n.ActiveWpsAccessPointIndex = e.ActiveWpsAccessPointIndex),
        (n.WpsMode = e.WpsMode),
        "PIN" == n.WpsMode && (n.WpsPin = e.WpsPin),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function ai() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.cmd = "queryDeviceAccessControlList"), n;
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.aclMode = e.AclMode),
          (t.wifiMacWhiteList = e.WhiteMacList),
          (t.wifiMacBlackList = e.BlackMacList),
          (t.wifiHostnameWhiteList = e.WhiteNameList),
          (t.wifiHostnameBlackList = e.BlackNameList),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ui() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "wifi_anti_brute_force_attack_func"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.prevent_attack_enable = e.wifi_anti_brute_force_attack_func), t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ci() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "setDeviceAccessControlList"),
        (n.AclMode = e.aclMode),
        (n.WhiteMacList = e.wifiMacWhiteList),
        (n.BlackMacList = e.wifiMacBlackList),
        (n.WhiteNameList = e.wifiHostnameWhiteList),
        (n.BlackNameList = e.wifiHostnameBlackList),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function di() {
    return hr({ nv: ["user_ip_addr"] }, arguments[1], arguments[2]);
  }
  function li() {
    function e(e) {
      return {
        goformId: "setDeviceAccessControlList",
        isTest: Ji,
        AclMode: e.AclMode,
        WhiteMacList: e.WhiteMacList,
        BlackMacList: e.BlackMacList,
        WhiteNameList: e.WhiteNameList,
        BlackNameList: e.BlackNameList,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function pi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "vpn_type,vpn_l2tp_passwd,vpn_account,vpn_passwd,vpn_server_ip,vpn_conn_status,vpn_auto_start"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e
        ? {
            vpn_type: e.vpn_type,
            vpn_l2tp_passwd: e.vpn_l2tp_passwd,
            vpn_account: e.vpn_account,
            vpn_passwd: e.vpn_passwd,
            vpn_server_ip: e.vpn_server_ip,
            vpn_conn_status: e.vpn_conn_status,
            vpn_auto_start: e.vpn_auto_start,
          }
        : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function mi() {
    function e(e, n) {
      var r = {
        goformId: "VPN_CLIENT_SET",
        vpn_type: e.vpn_type,
        vpn_account: e.vpn_account,
        vpn_passwd: e.vpn_passwd,
        vpn_server_ip: e.vpn_server_ip,
        vpn_auto_start: e.vpn_auto_start,
        isTest: Ji,
      };
      return (
        "L2TP" == e.vpn_type &&
          t.extend(r, { vpn_l2tp_passwd: e.vpn_l2tp_passwd }),
        r
      );
    }
    function n(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, n, null, !0);
  }
  function fi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji), (n.notCallback = !0), (n.goformId = "VPN_CONNECT"), n
      );
    }
    function t(e) {
      "success" == e.result
        ? ((i = new Date().getTime()), U(n))
        : r({ result: !1 });
    }
    function n(e) {
      "connecting" == e.vpn_conn_status
        ? (t_.vpn_conn_status = "connecting")
        : checkVpnConnectedStatus(e.vpn_conn_status)
        ? (B(n),
          (t_.vpn_conn_status = "connected"),
          r({ result: !0, status: t_.connectStatus }))
        : new Date().getTime() - i < 1e4
        ? (t_.vpn_conn_status = "connecting")
        : (B(n), r({ result: !1 }));
    }
    var r = arguments[1],
      i = 0;
    return s(arguments, {}, e, t, null, !0);
  }
  function gi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.notCallback = !0),
        (n.goformId = "VPN_DISCONNECT"),
        n
      );
    }
    function t(e) {
      "success" == e.result
        ? ((i = new Date().getTime()), U(n))
        : r({ result: !1 });
    }
    function n(e) {
      "disconnecting" == e.vpn_conn_status
        ? (t_.vpn_conn_status = "disconnecting")
        : "disconnected" == e.vpn_conn_status
        ? (B(n),
          (t_.vpn_conn_status = "disconnected"),
          r({ result: !0, status: t_.vpn_conn_status }))
        : new Date().getTime() - i < 1e4
        ? (t_.vpn_conn_status = "disconnecting")
        : (B(n), r({ result: !1 }));
    }
    var r = arguments[1],
      i = 0;
    return s(arguments, {}, e, t, null, !0);
  }
  function vi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji), (n.cmd = "voice_work_type"), (n.multi_data = 1), n
      );
    }
    function t(e) {
      return e ? { voice_work_type: e.voice_work_type } : Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function wi() {
    function e(e, t) {
      return {
        goformId: "VOIP_VOICE_WORK_TYPE_SET",
        voice_work_type: e.voice_work_type,
        isTest: Ji,
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Si() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "TR069_MODULE_SET"),
        (n.tr069_DataModule = e.tr069_DataModule),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function hi() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "SIGNAL_QUALITY_DETECT_START"), n;
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ti() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "SIGNAL_QUALITY_DETECT_CANCEL"), n;
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Pi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "signal_detect_progress"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.signal_detect_progress = e.signal_detect_progress), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ii() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd = "signal_detect_quality"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.signal_detect_quality = e.signal_detect_quality), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function bi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "signal_detect_record_0,signal_detect_record_1,signal_detect_record_2,signal_detect_record_3,signal_detect_record_4,signal_detect_record_5,signal_detect_record_6,signal_detect_record_7,signal_detect_record_8,signal_detect_record_9"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ai() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SIGNAL_QUALITY_RECORD_ADD"),
        (n.index = e.index),
        (n.date = e.date),
        (n.location = e.location),
        (n.quality = e.quality),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function yi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "SIGNAL_QUALITY_RECORD_DEL"),
        (n.index = e.index),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ei() {
    function e(e, t) {
      var n = {};
      return (n.isTest = Ji), (n.goformId = "SIGNAL_QUALITY_RECORD_CLEAR"), n;
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ri() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "wifi_chip_temp,therm_pa_level,therm_pa_frl_level,therm_tj_level,pm_sensor_pa1,pm_sensor_mdm,pm_modem_5g",
        multi_data: 1,
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Ni() {
    function e(e) {
      var r = {
        goformId: e.goformId,
        isTest: Ji,
        ChipIndex: e.ChipIndex,
        AccessPointIndex: e.AccessPointIndex,
        QrImageShow: e.QrImageShow,
        QrImageShow_5G: e.QrImageShow_5G,
        lan_sec_ssid_control: e.lan_sec_ssid_control,
        wifi_syncparas_flag: e.wifi_syncparas_flag,
      };
      return (
        e.AccessPointSwitchStatus != e.originAccessPointSwitchStatus
          ? (r = t.extend(r, {
              AccessPointSwitchStatus: e.AccessPointSwitchStatus,
            }))
          : ((r = t.extend(r, {
              AccessPointSwitchStatus: e.AccessPointSwitchStatus,
              SSID: e.SSID,
              ApIsolate: e.ApIsolate,
              AuthMode: e.AuthMode,
              ApBroadcastDisabled: e.ApBroadcastDisabled,
            })),
            void 0 !== e.ApMaxStationNumber &&
              (r.ApMaxStationNumber = e.ApMaxStationNumber),
            "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode
              ? ((r.EncrypType = e.cipher),
                (r.Password = n.PASSWORD_ENCODE
                  ? Base64.encode(e.Password)
                  : e.Password))
              : (r.EncrypType = "NONE")),
        e.AccessPointSwitchStatus_5G != e.originAccessPointSwitchStatus_5G
          ? (r = t.extend(r, {
              AccessPointSwitchStatus_5G: e.AccessPointSwitchStatus_5G,
            }))
          : ((r = t.extend(r, {
              AccessPointSwitchStatus_5G: e.AccessPointSwitchStatus_5G,
              SSID_5G: e.SSID_5G,
              ApIsolate_5G: e.ApIsolate_5G,
              AuthMode_5G: e.AuthMode_5G,
              ApBroadcastDisabled_5G: e.ApBroadcastDisabled_5G,
            })),
            void 0 !== e.ApMaxStationNumber_5G &&
              (r.ApMaxStationNumber_5G = e.ApMaxStationNumber_5G),
            "WPAPSKWPA2PSK" == e.AuthMode_5G || "WPA2PSK" == e.AuthMode_5G
              ? ((r.EncrypType_5G = e.cipher_5G),
                (r.Password_5G = n.PASSWORD_ENCODE
                  ? Base64.encode(e.Password_5G)
                  : e.Password_5G))
              : (r.EncrypType_5G = "NONE")),
        r
      );
    }
    function r(e) {
      return e || Qi;
    }
    Je(arguments, e, r);
  }
  function Di() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji), (n.cmd = "ant_switch_enable"), (n.multi_data = 1), n
      );
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.ant_switch_enable = "1" == e.ant_switch_enable ? "1" : "0"), t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Mi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "WAN_ANT_SWITCH_SET"),
        (n.ant_switch_enable = e.ant_switch_enable),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ci() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.cmd =
          "lte_band_lock,operate_mode,zte_voice_debug_ims_set,zte_voice_debug_voice_set,wifi_tputs_test_ip,wifi_tputs_test_mode,rf_mmw_status"),
        (n.multi_data = 1),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Fi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "BAND_SELECT"),
        (n.is_gw_band = e.is_gw_band),
        (n.gw_band_mask = e.gw_band_mask),
        (n.is_lte_band = e.is_lte_band),
        (n.lte_band_mask = e.lte_band_mask),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Wi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "WAN_OPERATE_MODE_SET"),
        (n.operate_mode = e.operate_mode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Li() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "VOICE_DEBUG_IMS_SET"),
        (n.zte_voice_debug_ims_set = e.zte_voice_debug_ims_set),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function xi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "VOICE_DEBUG_VOICE_SET"),
        (n.zte_voice_debug_voice_set = e.zte_voice_debug_voice_set),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Oi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "WLAN_TEST_TPUTS_SET"),
        (n.wifi_tputs_test_ip = e.wifi_tputs_test_ip),
        (n.wifi_tputs_test_mode = e.wifi_tputs_test_mode),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function ki() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "WAN_PERFORM_NR5G_BAND_LOCK"),
        (n.nr5g_band_mask = e.nr5g_band_mask),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ui() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "RF_MMW_DISABLE_SET"),
        (n.rf_mmw_status = e.rf_mmw_status),
        n
      );
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Bi(e, t) {
    function n(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "DEVICE_ODU_MODE_SET"),
        (n.odu_mode = e.odu_mode),
        n
      );
    }
    function r(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, n, r, null, !0);
  }
  function Vi() {
    function e(e, t) {
      return { isTest: Ji, multi_data: 1, cmd: "odu_mode" };
    }
    function t(e) {
      if (e) {
        var t = {};
        return (t.odu_mode = "1" == e.odu_mode ? e.odu_mode : "0"), t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Hi() {
    function e(e, t) {
      return { isTest: Ji, multi_data: 1, cmd: "multi_vlan_pdns_map_tmp" };
    }
    function t(e) {
      var t = {
        cbns: "",
        cbnsSwitch: "",
        tr069: "",
        tr069Switch: "",
        voip: "",
        voipSwitch: "",
      };
      if (e) {
        if (0 == e.multi_vlan_pdns_map_tmp.length) return t;
        for (
          var n = e.multi_vlan_pdns_map_tmp.split(";"), r = 0;
          r < n.length;
          r++
        )
          if ("" != n[r]) {
            var i = n[r].split(",");
            "data" == i[1]
              ? ((t.cbns = i[0]), (t.cbnsSwitch = i[2]))
              : "tr069" == i[1]
              ? ((t.tr069 = i[0]), (t.tr069Switch = i[2]))
              : "voip/volte" == i[1] &&
                ((t.voip = i[0]), (t.voipSwitch = i[2]));
          }
        return t;
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function Gi() {
    function e(e, t) {
      var n = {};
      return (
        (n.isTest = Ji),
        (n.goformId = "MULTI_VLAN_PDNS_MAP_SET"),
        (n.multi_vlan_pdns_map_tmp = e.multi_vlan_pdns_map_tmp),
        n
      );
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function Ki() {
    function e(e, t) {
      return { isTest: Ji, multi_data: 1, cmd: "multi_vlan_pdns_updata" };
    }
    function t(e) {
      if (e) {
        var t = {};
        return (
          (t.multi_vlan_pdns_updata =
            "" == e.multi_vlan_pdns_updata
              ? "checking"
              : e.multi_vlan_pdns_updata),
          t
        );
      }
      return Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function zi(e, t) {
    function n(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "user,admin_password_changed,web_current_account,web_username1,web_username2",
      };
    }
    function r(e) {
      return e
        ? {
            user: e.user,
            admin_password_changed: e.admin_password_changed,
            web_current_account: e.web_current_account,
            web_username1: e.web_username1,
            web_username2: e.web_username2,
          }
        : Qi;
    }
    return s(arguments, {}, n, r, null, !1);
  }
  function Xi() {
    function e(e, t) {
      return {
        isTest: Ji,
        cmd: "lte_band_lock,wcdma_band_lock",
        multi_data: "1",
      };
    }
    function t(e) {
      return e || Qi;
    }
    return s(arguments, {}, e, t, null, !1);
  }
  function ji() {
    function e(e) {
      return {
        isTest: Ji,
        goformId: "BAND_SELECT",
        is_gw_band: "1",
        gw_band_mask: e.gw_band_lock,
        is_lte_band: "1",
        lte_band_mask: e.lockBandType,
      };
    }
    function t(e) {
      return e && "success" == e.result ? e : Qi;
    }
    return s(arguments, {}, e, t, null, !0);
  }
  function qi() {
    function e(e, t) {
      var r = hr({ nv: "LD" }).LD;
      return {
        isTest: Ji,
        goformId: "RESTORE_FACTORY_SETTINGS_WITH_PWD",
        password:
          "2" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(paswordAlgorithmsCookie(e.password) + r)
            : "1" == n.WEB_ATTR_IF_SUPPORT_SHA256
            ? paswordAlgorithmsCookie(Base64.encode(e.password))
            : Base64.encode(e.password),
      };
    }
    function r(e) {
      if (e && "0" == e.result) return { result: !0 };
      var n = {};
      switch (e.result) {
        case "1":
          n = { errorType: "Login Fail" };
          break;
        case "3":
          n = { errorType: "badPassword" };
          break;
        default:
          n = { errorType: "Login Fail" };
      }
      return t.extend(Qi, n);
    }
    return s(arguments, {}, e, r, null, !0);
  }
  function Yi(e, t) {
    function n(e, t) {
      return {
        isTest: Ji,
        multi_data: 1,
        cmd: "reset_pwd_fail_num_str,reset_operate_lock_time",
      };
    }
    function r(e) {
      return e || Qi;
    }
    return s(arguments, {}, n, r, null, !1);
  }
  var Zi = window,
    Qi = {
      errorType: "UnknownError",
      errorId: "123",
      errorText: "UnknownError",
    },
    Ji = n.IS_TEST,
    $i = !0,
    e_ = 0,
    t_ = {
      networkType: "",
      signalImg: "0",
      spn_b1_flag: "1",
      spn_name_data: "",
      spn_b2_flag: "1",
      networkOperator: "",
      connectStatus: "ppp_disconnected",
      attachedDevices: [],
      curr_connected_devices: [],
      wifiSwitchStatus: "",
      data_counter: {
        uploadRate: 0,
        downloadRate: 0,
        totalSent: 0,
        totalReceived: 0,
        totalConnectedTime: 0,
        currentSent: 0,
        currentReceived: 0,
        currentConnectedTime: 0,
        monthlySent: 0,
        monthlyReceived: 0,
        monthlyConnectedTime: 0,
        month: "",
      },
      newSmsReceived: !1,
      smsReportReceived: !1,
      smsUnreadCount: "0",
      isLoggedIn: void 0,
      limitVolumeEnable: !1,
      limitVolumeType: "1",
      limitVolumePercent: "100",
      limitVolumeSize: "0",
      limitVolumeSizeSource: "0",
      allowRoamingUpdate: "0",
      opms_wan_mode: "",
      ap_station_enable: void 0,
      ap_station_mode: void 0,
      dialMode: "",
      is_night_mode: "0",
    },
    n_ = [
      "modem_main_state",
      "pin_status",
      "opms_wan_mode",
      "opms_wan_auto_mode",
      "loginfo",
      "new_version_state",
      "current_upgrade_state",
      "is_mandatory",
      "wifi_dfs_status",
      "battery_value",
      "ppp_dial_conn_fail_counter",
    ],
    r_ = [
      "signalbar",
      "network_type",
      "network_provider",
      "opms_wan_auto_mode",
      "dhcp_wan_status",
      "ppp_status",
      "EX_SSID1",
      "sta_ip_status",
      "EX_wifi_profile",
      "m_ssid_enable",
      "RadioOff",
      "wifi_onoff_state",
      "wifi_chip1_ssid1_ssid",
      "wifi_chip2_ssid1_ssid",
      "simcard_roam",
      "lan_ipaddr",
      "station_mac",
      "wifi_access_sta_num",
      "battery_charging",
      "battery_vol_percent",
      "battery_pers",
      "spn_name_data",
      "spn_b1_flag",
      "spn_b2_flag",
      "realtime_tx_bytes",
      "realtime_rx_bytes",
      "realtime_time",
      "realtime_tx_thrpt",
      "realtime_rx_thrpt",
      "monthly_rx_bytes",
      "monthly_tx_bytes",
      "monthly_time",
      "date_month",
      "data_volume_limit_switch",
      "data_volume_limit_size",
      "data_volume_alert_percent",
      "data_volume_limit_unit",
      "roam_setting_option",
      "upg_roam_switch",
      "cbns_server_enable",
      "app_debug_mode",
      "odu_mode",
      "ssid",
      "wifi_enable",
      "wifi_5g_enable",
      "check_web_conflict",
      "dial_mode",
      "ppp_dial_conn_fail_counter",
      "wan_lte_ca",
      "privacy_read_flag",
      "is_night_mode",
      "pppoe_status",
      "dhcp_wan_status",
      "static_wan_status",
      "vpn_conn_status",
      "rmcc",
      "rmnc",
    ];
  n.HAS_SMS &&
    t.merge(r_, ["sms_received_flag", "sts_received_flag", "sms_unread_num"]);
  var i_ = [],
    __ = [G];
  t(document).ready(function () {
    setTimeout(
      function () {
        L();
      },
      n.IS_TEST ? 1e3 : 0
    );
  });
  var s_ = {
    apn_interface_version: "",
    wifi_coverage: "",
    m_ssid_enable: "",
    imei: "",
    network_type: "",
    rssi: "",
    rscp: "",
    imsi: "",
    sim_imsi: "",
    cr_version: "",
    wa_version: "",
    hardware_version: "",
    web_version: "",
    wa_inner_version: "",
    MAX_Access_num: "",
    SSID1: "",
    AuthMode: "",
    WPAPSK1_encode: "",
    m_SSID: "",
    m_AuthMode: "",
    m_HideSSID: "",
    m_WPAPSK1_encode: "",
    m_MAX_Access_num: "",
    lan_ipaddr: "",
    mac_address: "",
    msisdn: "",
    LocalDomain: "",
    wan_ipaddr: "",
    static_wan_ipaddr: "",
    ipv6_wan_ipaddr: "",
    ipv6_pdp_type: "",
    ipv6_pdp_type_ui: "",
    pdp_type: "",
    pdp_type_ui: "",
    opms_wan_mode: "",
    ppp_status: "",
    wan_lte_ca: "",
    lte_ca_pcell_band: "",
    lte_ca_pcell_bandwidth: "",
    lte_ca_scell_band: "",
    lte_ca_scell_bandwidth: "",
    lte_ca_scell_freq: "",
    cell_id: "",
    lte_snr: "",
    wan_active_band: "",
    lte_ca_pcell_freq: "",
    lte_rsrq: "",
    lte_rsrp: "",
  };
  return {
    getVlanTagInfo: Hi,
    setVlanTagInfo: Gi,
    getVlanTagStatus: Ki,
    setOduLedSwitch: It,
    getSceneMode: Vi,
    setSceneMode: Bi,
    setDeviceAccessControlList: li,
    getUserIPAddr: di,
    setMacFilterStatus: ci,
    getAntiVioCraSetting: ui,
    getMacFilterStatus: ai,
    setWifiWpsStart: oi,
    setWifiChipAdvanceInfo: si,
    setWifiModuleSwitchStatus: ii,
    setWifiAccessPointInfo: ri,
    getWifiWpsStatus: ni,
    getWifiAccessPointInfo: ei,
    getWifiModuleSwitchStatus: $r,
    getSleepModeStatus: Vr,
    setRedirectOff: Br,
    setBindMacIpSwitch: Ur,
    clearRedirectFlag: Pr,
    getRedirectData: Tr,
    getSntpDSTByTimeZone: kr,
    getBindIPInfo: br,
    setBindIPInfo: Ir,
    delStaticAddrRules: Ar,
    addStaticAddress: Nr,
    getStaticMacIpAddressList: yr,
    getStaticIpAddrList: Er,
    getWifiBasic: o,
    setWifiBasicSync: a,
    setWifiBasic: u,
    setWifiBasic4SSID2: c,
    setWifiBasicMultiSSIDSwitch: m,
    getSecurityInfo: f,
    setSecurityInfo: g,
    getCurrentlyAttachedDevicesInfo: v,
    getAttachedCableDevices: w,
    getLanguage: S,
    setLanguage: h,
    getNetSelectInfo: T,
    setBearerPreference: P,
    scanForNetwork: I,
    getConnectionInfo: A,
    getStatusInfo: b,
    connect: N,
    disconnect: D,
    setNetwork: X,
    getCurrentNetwork: j,
    savePhoneBook: q,
    deletePhoneBooks: Z,
    deleteAllPhoneBooks: Q,
    deleteAllPhoneBooksByGroup: J,
    getDevicePhoneBooks: re,
    getSIMPhoneBooks: ie,
    getPhoneBooks: _e,
    getPhoneBookReady: se,
    getPhoneBooksByGroup: ne,
    getConnectionMode: ee,
    setConnectionMode: $,
    getApnSettings: M,
    deleteApn: C,
    setDefaultApn: F,
    addOrEditApn: W,
    getSIMPhoneBookCapacity: ae,
    getDevicePhoneBookCapacity: ue,
    getLoginData: ce,
    login: de,
    logout: ye,
    getLoginStatus: le,
    enterPIN: pe,
    enterPUK: me,
    getSMSReady: Ie,
    getSMSMessages: fe,
    sendSMS: we,
    saveSMS: Se,
    deleteAllMessages: he,
    deleteMessage: Te,
    setSmsRead: be,
    resetNewSmsReceivedVar: y,
    resetSmsReportReceivedVar: E,
    getSMSDeliveryReport: Ae,
    getSmsCapability: R,
    changePassword: Ee,
    getPinData: Re,
    enablePin: Ne,
    disablePin: De,
    changePin: Me,
    getLanInfo: Ce,
    setLanInfo: Fe,
    getSmsSetting: Le,
    setSmsSetting: xe,
    restoreFactorySettings: Oe,
    checkRestoreStatus: ke,
    getWpsInfo: Ue,
    openWps: Be,
    getSleepMode: Ve,
    setSleepMode: He,
    getSysSecurity: Ge,
    setSysSecurity: Ke,
    getPortForward: ze,
    setPortForward: Xe,
    deleteForwardRules: je,
    enableVirtualServer: qe,
    getSDConfiguration: $e,
    setSdCardMode: et,
    checkFileExists: tt,
    getFileList: nt,
    fileRename: rt,
    getSdMemorySizes: it,
    deleteFilesAndFolders: _t,
    createFolder: st,
    checkUploadFileStatus: ot,
    setSdCardSharing: at,
    getQuickSettingInfo: Ye,
    setQuickSetting: Ze,
    setQuickSetting4IPv6: Qe,
    getPortFilter: ut,
    setPortFilterBasic: ct,
    setPortFilter: dt,
    deleteFilterRules: lt,
    getWifiAdvance: pt,
    setWifiAdvance: ft,
    getWifiRange: vt,
    getWifiCoverageInfo: St,
    setWifiRange: wt,
    setWifiCoverageInfo: ht,
    getUpnpSetting: bt,
    setUpnpSetting: At,
    getDmzSetting: yt,
    setDmzSetting: Et,
    getDeviceInfo: gt,
    getPortMap: Rt,
    setPortMap: Nt,
    enablePortMap: Dt,
    deleteMapRules: Mt,
    getTrafficAlertInfo: Ct,
    setTrafficAlertInfo: Ft,
    getDlnaSetting: Ot,
    setDlnaSetting: kt,
    rescanDlna: Ut,
    getUSSDResponse: Wt,
    USSDReplyCancel: xt,
    getNetworkUnlockTimes: Ht,
    unlockNetwork: Vt,
    setUpdateInfoWarning: Gt,
    getUpdateInfoWarning: Kt,
    getAPStationBasic: zt,
    setAPStationBasic: Xt,
    getHotspotList: qt,
    searchHotspot: Yt,
    getSearchHotspotList: Zt,
    saveHotspot: $t,
    deleteHotspot: en,
    connectHotspot: tn,
    disconnectHotspot: nn,
    getOpMode: rn,
    SetOperationMode: _n,
    SendUpgradeMessage: sn,
    getPppoeParams: on,
    setPppoeDialMode: an,
    getSntpParams: un,
    setSntpSetting: dn,
    setSNTPDate: cn,
    addUrlFilterRule: ln,
    getUrlFilterList: pn,
    deleteSelectedRules: mn,
    getWdsInfo: fn,
    setWDS: gn,
    getSyslogInfo: vn,
    setSysLog: wn,
    getTR069Config: Sn,
    setTR069Configuration: hn,
    getVoipSettings: Tn,
    setVoipSettings: Pn,
    getVoipUserDetails: In,
    getVoipUserRegisterStatus: bn,
    setVoipUserDetails: An,
    setVoipAdvancedSettings: En,
    getVoipAdvancedSettings: yn,
    getVoipSupplementaryService: Rn,
    setVoipSupplementaryService: Nn,
    getMacFilterInfo: Dn,
    setMacFilter: Mn,
    getFastbootSetting: Cn,
    setFastbootSetting: Fn,
    restart: Wn,
    shutdown: Ln,
    timerUpdaterEnable: $i,
    clearTraffic: Qn,
    switchPortForLog: Jn,
    childGroupList: $n,
    addChildGroup: er,
    removeChildGroup: tr,
    checkCurrentUserInChildGroup: nr,
    getChildMacRuleInfo: rr,
    removeChildMacRule: ir,
    addChildAccessTimeRule: _r,
    updateChildAccessTimeRule: sr,
    getCurretnMAC: ar,
    editHostName: cr,
    getSiteWhiteList: dr,
    removeSiteWhite: lr,
    saveSiteWhite: pr,
    getTimeLimited: mr,
    saveTimeLimited: fr,
    getHostNameList: ur,
    getTsw: gr,
    saveTsw: vr,
    getSysTimeMode: wr,
    trafficCalibration: Sr,
    getParams: hr,
    getNewVersionState: xn,
    getUpgradeResult: Un,
    getCurrentUpgradeState: Bn,
    dmUpdatePackageExit: Vn,
    setUpgradeSelectOp: Kn,
    addTimerThings: O,
    removeTimerThings: k,
    getPackSizeInfo: Hn,
    getNewVersionInfo: On,
    getMandatory: kn,
    getUserChoice: Gn,
    getOTAUpdateSetting: zn,
    setOTAUpdateSetting: Xn,
    getSignalStrength: Yn,
    getOTAlastCheckTime: jn,
    getOTASuccessTime: qn,
    clearUpdateResult: Zn,
    getSearchHotspotListWithoutScanFinish: Qt,
    setHotspotListSpan: Dr,
    getHotspotListSort: Mr,
    setNV: Cr,
    setWifiBand: Fr,
    refreshAPStationStatus: jt,
    getSTKFlagInfo: Wr,
    getSTKInfo: Lr,
    getSTKMenuInfo: xr,
    setSTKMenuInfo: Or,
    getAutoPowerSave: Tt,
    setAutoPowerSave: Pt,
    getDHCPStaticAddressRules: Rr,
    setMtuMss: We,
    setHaveReadPrivacyNote: Hr,
    setWifiFrequency: p,
    setWifiAdvanceGuest: l,
    setSkipSetting: d,
    setWifiAdvance24G5G: mt,
    diagnosisSettings: Gr,
    getDeviceAccessControlList: Kr,
    getThermalControlSetting: zr,
    setThermalControlSetting: Xr,
    getPinglogInfo: jr,
    setPinglogInfo: qr,
    getsleepProtection: Yr,
    saveSleepProtection: Zr,
    getRebootInfo: Qr,
    setRebootScheduleFixTime: Jr,
    getVPNClientSetting: pi,
    setVPNClientSetting: mi,
    vpnConnect: fi,
    vpnDisconnect: gi,
    setWifiWholeChipAdvanceInfo: _i,
    getVoipVolteSetting: vi,
    setVoipVolteSetting: wi,
    setTr069Module: Si,
    setSuggestedPositionDetect: hi,
    setSuggestedPositionCancel: Ti,
    getSuggestedPositionDetectProgress: Pi,
    getSuggestedPositionDetectResult: Ii,
    getSuggestedPositionDetectRecord: bi,
    addSuggestedPositionRecord: Ai,
    deleteSingleSuggestedPositionRecord: yi,
    deleteAllSuggestedPositionRecord: Ei,
    getTempStatus: Ri,
    setWifiAccessPointInfo_24G5G: Ni,
    getAntennaControlSetting: Di,
    setAntennaControlSetting: Mi,
    getDebugInfo: Ci,
    setBandSelect: Fi,
    setOnlineLpm: Wi,
    setIMS: Li,
    setVOICE: xi,
    setWlanTputs: Oi,
    setNr5gBandSelect: ki,
    setRFMMW: Ui,
    getWiFiGuestLeftTime: ti,
    getUserInfo: zi,
    getLockBandType: Xi,
    setLockBandType: ji,
    restoreFactorySettingsLogin: qi,
    getRestoreFactorySettingsLoginInfo: Yi,
  };
});
//# sourceMappingURL=../sourcemaps/service.js.map
