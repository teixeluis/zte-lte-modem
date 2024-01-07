import hashlib
import requests
import re
import logging
import sys
import urllib.parse
import datetime
import dateutil.tz
import smsutil

from jsonpath_ng.ext import parse

ZTE_API_BASE = '/goform/'

GET_CMD = 'goform_get_cmd_process'
SET_CMD = 'goform_set_cmd_process'

# TODO comment this when using in the integration:
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

_LOGGER = logging.getLogger(__name__)


"""
ZTE modem connection management class
"""

class ZteModemConnection:
    def __init__(self, protocol, host, port, username, password):
        self.protocol = protocol
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.url = protocol + '://' + host + ':' + port
        self.cookie = ''

    def getDeviceVersion(self):
        
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01" }
        params = {"isTest": "false", "cmd": "Language%2Ccr_version%2Cwa_inner_version", "multi_data": "1" }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getLd(self):
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01" }
        params = { "isTest": "false", "cmd": "LD" }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getRd(self):
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01"}
        params = { "isTest": "false", "cmd": "RD" }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def sendLoginCommand(self, crVersion, waInnerVersion, ld, rd):
        headers = { "Origin": self.url, "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01" }
        passwordHash = calculatePasswordHash(self.password, ld)
        self.ad = calculateAd(crVersion, waInnerVersion, rd)

        params = { "isTest": "false", "goformId": "LOGIN_MULTI_USER", "user": self.username, "password": passwordHash, "AD": self.ad}

        return requests.post(self.url + ZTE_API_BASE + SET_CMD, data=params, headers=headers)

    def sendQueryCommand(self, isTest, multiData, cmd):
        """
        sendQueryCommand sends a generic query command to the modem, expecting a json response with a result according to the provided fields, and attributes in the cmd field.

        :isTest: test related field required by the modem.
        :multiData: 
        :cmd: the field containing the list of fields to be processed by the command.
        """

        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }     
        if multiData != None:
            params = { "multi_data": multiData, "isTest": "true" if isTest else "false", "cmd": cmd }
        else:
            params = { "isTest": "true" if isTest else "false", "cmd": cmd }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getModemStatus(self, attributeList):
        """
        getModemStatus returns the response containing the modem status information.

        :attributeList: the attributes to be represented in the response. A complete attribute list as sent by the javascript client would be: "modem_main_state,pin_status,opms_wan_mode,opms_wan_auto_mode,loginfo,new_version_state,current_upgrade_state,is_mandatory,wifi_dfs_status,battery_value,ppp_dial_conn_fail_counter,signalbar,network_type,network_provider,opms_wan_auto_mode,dhcp_wan_status,ppp_status,EX_SSID1,sta_ip_status,EX_wifi_profile%,m_ssid_enable,RadioOff,wifi_onoff_state,wifi_chip1_ssid1_ssid,wifi_chip2_ssid1_ssid,simcard_roam,lan_ipaddr,station_mac,wifi_access_sta_num,battery_charging,battery_vol_percent,battery_pers,spn_name_data,spn_b1_flag,spn_b2_flag,realtime_tx_bytes,realtime_rx_bytes,realtime_time,realtime_tx_thrpt,realtime_rx_thrpt,monthly_rx_bytes,monthly_tx_bytes,monthly_time,date_month,data_volume_limit_switch,data_volume_limit_size,data_volume_alert_percent,data_volume_limit_unit,roam_setting_option,upg_roam_switch,cbns_server_enable,app_debug_mode,odu_mode,ssid,wifi_enable,wifi_5g_enable,check_web_conflict,dial_mode,ppp_dial_conn_fail_counter,wan_lte_ca,privacy_read_flag,is_night_mode,pppoe_status,dhcp_wan_status,static_wan_status,vpn_conn_status,rmcc,rmnc,sms_received_flag,sts_received_flag,sms_unread_num"
        """ 

        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }     
        params = { "multi_data": "1", "isTest": "false", "cmd": attributeList }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getLteStatus(self):
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }
        params = { "isTest": "false", "cmd": "network_type,rssi,rscp,lte_rsrp,Z5g_snr,Z5g_rsrp,ZCELLINFO_band,Z5g_dlEarfcn,lte_ca_pcell_arfcn,lte_ca_pcell_band,lte_ca_scell_band,lte_ca_pcell_bandwidth,lte_ca_scell_info,lte_ca_scell_bandwidth,wan_lte_ca,lte_pci,Z5g_CELL_ID,Z5g_SINR,cell_id,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,lte_multi_ca_scell_info,wan_active_band,nr5g_pci,nr5g_action_band,nr5g_cell_id", "multi_data": "1"}

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getSmsList(self, page, num_entries):
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }
        params = { "isTest": "false", "cmd": "sms_data_total", "page": page, "data_per_page": num_entries, "mem_store": "1", "tags": "10", "order_by": "order+by+id+desc" }
        params_safe = urllib.parse.urlencode(params, safe='+')

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params_safe, headers=headers)

    def setMsgRead(self, msgIds):
        if len(msgIds) == 0:
            return None
        
        msgIdsStr = ''

        for msgId in msgIds:
            msgIdsStr = msgIdsStr + msgId + ";"

        headers = { "Origin": self.url, "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }
        params = { "isTest": "false", "goformId" : "SET_MSG_READ", "msg_id" : msgIdsStr, "tag": "0", "AD" : self.ad.lower() }

        return requests.post(self.url + ZTE_API_BASE + SET_CMD, data=params, headers=headers)

    def sendSms(self, recipient, date, message):
        """
        sendSms sends an SMS through the modem

        :recipient: the recipient number (MSISDN)
        :message: the message payload
        """
        
        encoding = determineSmsEncoding(message)
        hexMessage = encodeSms(message, encoding)
        smsDate = encodeSmsDate(date)
        headers = { "Origin": self.url, "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }
        params = { "isTest": "false", "goformId": "SEND_SMS", "notCallback": "true", "Number": recipient, "sms_time": smsDate, "MessageBody": hexMessage, "ID": "-1", "encode_type": encoding, "AD": self.ad.lower() }

        return requests.post(self.url + ZTE_API_BASE + SET_CMD, data=params, headers=headers)

    def login(self):
        resp = self.getDeviceVersion()

        _LOGGER.debug('login: getDeviceVersion response: %s', str(resp.content))

        query = parse('$.cr_version')
        crVersion = query.find(resp.json())[0].value

        _LOGGER.debug('login: crVersion = %s', str(crVersion))

        query = parse('$.wa_inner_version')
        waInnerVersion = query.find(resp.json())[0].value

        _LOGGER.debug('login: waInnerVersion = %s', str(waInnerVersion))

        resp = self.getLd()

        query = parse('$.LD')
        ld = query.find(resp.json())[0].value
        
        _LOGGER.debug('login: ld = %s', str(ld))

        resp = self.getRd()
        query = parse('$.RD')
        rd = query.find(resp.json())[0].value

        _LOGGER.debug('login: rd = %s', str(rd))

        resp =  self.sendLoginCommand(crVersion, waInnerVersion, ld, rd)

        if ( result := resp.json()['result'] ) != '0':
            raise ZteModemException("Non-successful login result: ", result)
        
        _LOGGER.debug('login: http response: %s, body: %s', str(resp.status_code), str(resp.content))

        cookieHeader = resp.headers.get("Set-Cookie")

        pattern = re.compile('stok\=\".*\"')

        _LOGGER.debug('login: cookieHeader: %s', str(cookieHeader))

        result = pattern.search(cookieHeader)
        
        self.cookie = result.group(0)
        _LOGGER.debug('login: cookie: %s', str(self.cookie))


    def logout(self):
        """
        logout closes the session with the modem, invalidating the session cookie.

        :return: a json payload containing "result": "success" in case of a successful logout.
        """
        headers = { "Origin": self.url, "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01" }
        params = { "isTest": "false", "goformId": "LOGOUT", "AD": self.ad}

        return requests.post(self.url + ZTE_API_BASE + SET_CMD, data=params, headers=headers)

    def checkLoginStatus(self):
        headers = { "Referer": self.url + "/index.html", "Host": self.host + ":" + self.port, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": self.cookie }
        params = { "multi_data": "1", "isTest": "false", "cmd": "user" }

        return requests.get(self.url + ZTE_API_BASE + GET_CMD, params=params, headers=headers)

    def getSms(self, unread):
        """
        getSms returns the list of SMS stored in the modem.

        :param unread: if true, returns only the unread SMS

        :return: the list of SMS, where each is a JSON object containing the respective fields.
        """ 
        
        resp = self.getSmsList(0, 500)

        # Only return unread SMS:

        if unread:
            query = parse("$.messages[?(@.tag == '1')]")
        else:          
            query = parse("$.messages[*]")

        matches = [match.value for match in query.find(resp.json())]

        msgIds = []

        for message in matches:
            msgIds.append(message['id'])

        return matches


    def readAllSms(self, ):
        """
        readSms marks the new SMS as read and returns these.

        :return: the list of new SMS, where each is a JSON object containing the respective fields.
        """ 

        resp = self.getSmsList(0, 500)

        # Only return unread SMS:
        query = parse("$.messages[?(@.tag == '1')]")

        matches = [match.value for match in query.find(resp.json())]

        msgIds = []

        for message in matches:
            msgIds.append(message['id'])

        # Set the SMS as read in the modem:
        self.setMsgRead(msgIds)

        return matches

    def fetchSms(self):
        """
        fetchSms marks the first new SMS as read and returns it.

        :return: the new SMS as a JSON object containing the respective fields.
        """

        # Because we are only reading (and marking as read) one SMS, we limit the query size to 1:
        resp = self.getSmsList(0, 1)

        # Only return unread SMS:
        query = parse("$.messages[?(@.tag == '1')]")

        matches = [match.value for match in query.find(resp.json())]

        if len(matches) > 0:
            # Get the first unread SMS:
            message = matches[0]

            # Set the SMS as read in the modem:
            self.setMsgRead([message['id']])

            return message

        return None

    def manageSession(self):
        loginStatus = self.checkLoginStatus()

        # If there isn't a valid session, try to login:
        if loginStatus.json()['user'] != self.username:
            self.login()
            loginStatus = self.checkLoginStatus()

        if loginStatus.json()['user'] != self.username:
            raise ZteModemException("Unsucessful login or modem busy with another user.")

# Exceptions

class ZteModemException(Exception):
    """Raise for my specific kind of exception"""

# Utility operations:

def calculatePasswordHash(password, ld):
    prefixHash =  hashlib.sha256(password.encode('utf-8')).hexdigest().upper()

    return hashlib.sha256((prefixHash + ld.upper()).encode('utf-8')).hexdigest().upper()


def calculateAd(crVersion, waInnerVersion, rd):
    prefixHash = hashlib.md5((crVersion + waInnerVersion).encode('utf-8')).hexdigest()

    return hashlib.md5((prefixHash + rd).encode('utf-8')).hexdigest().upper()

def parseSmsDate(smsDate):
    dateFields = smsDate.split(",")

    year = dateFields[0]
    month = dateFields[1]
    day = dateFields[2]
    hours = dateFields[3]
    minutes = dateFields[4]
    seconds = dateFields[5]
    timezone = dateFields[6]

    return datetime.datetime(2000 + int(year), int(month), int(day), int(hours), int(minutes), int(seconds), tzinfo=dateutil.tz.tzoffset(None, 3600 * int(timezone)))

def encodeSmsDate(date):
    # Obtain the year last two digits:
    year = str(date.year)[2:4]

    month = f'{date.month:02}'
    day = f'{date.day:02}'
    hours = f'{date.hour:02}'
    minutes = f'{date.minute:02}'
    seconds = f'{date.second:02}'
    tzinfo = '0'
    
    if date.tzinfo != None:
        tzinfo = str(int(date.tzinfo) / 3600)

    return year + ";" + month + ";" + day + ";" + hours + ";" + minutes + ";" + seconds + ";" + tzinfo

def encodeSms(message, encoding):
    if encoding == "UNICODE":
        message_sms = smsutil.encode(message)
    else:  
        message_sms = message.encode("utf_16_be")

    return bytes.hex(message_sms).upper()

def decodeSms(encodedMessage):
    return smsutil.decode(bytes.fromhex(encodedMessage), encoding='utf_16_be')

def determineSmsEncoding(message):
    sms = smsutil.split(message)

    if sms.encoding == "gsm0338":
        return "GSM7_default"
    
    return "UNICODE"
