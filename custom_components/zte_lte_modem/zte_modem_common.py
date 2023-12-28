import hashlib
import requests
import re
import logging
import sys
import urllib.parse

from string import Template
from jsonpath_ng.ext import parse


ZTE_MODEM_HOST = 'localhost:8254'
ZTE_MODEM_URL = 'http://' + ZTE_MODEM_HOST
ZTE_API_BASE = ZTE_MODEM_URL + '/goform/'

GET_CMD = 'goform_get_cmd_process'
SET_CMD = 'goform_set_cmd_process'

LOGIN_BODY = 'isTest=false&goformId=LOGIN_MULTI_USER&user=admin&password=$passwordHash&AD=$ad'
PASSWORD = ''
COOKIE = ''
AD = ''

# TODO change this when using in the integration:
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

_LOGGER = logging.getLogger(__name__)

# Exceptions

class ZteModemException(Exception):
    """Raise for my specific kind of exception"""

# Atomic operations:

def calculatePasswordHash(password, ld):
    prefixHash =  hashlib.sha256(password.encode('utf-8')).hexdigest().upper()

    return hashlib.sha256((prefixHash + ld.upper()).encode('utf-8')).hexdigest().upper()


def calculateAd(crVersion, waInnerVersion, rd):
    prefixHash = hashlib.md5((crVersion + waInnerVersion).encode('utf-8')).hexdigest()

    return hashlib.md5((prefixHash + rd).encode('utf-8')).hexdigest().upper()


def getDeviceVersion():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01" }
    params = {"isTest": "false", "cmd": "Language%2Ccr_version%2Cwa_inner_version", "multi_data": "1" }

    return requests.get(ZTE_API_BASE + GET_CMD, params=params, headers=headers)


def getLd():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01" }
    params = { "isTest": "false", "cmd": "LD" }

    return requests.get(ZTE_API_BASE + GET_CMD, params=params, headers=headers)

def getRd():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01"}
    params = { "isTest": "false", "cmd": "RD" }

    return requests.get(ZTE_API_BASE + GET_CMD, params=params, headers=headers)

def sendLoginCommand(password, crVersion, waInnerVersion, ld, rd):
    headers = { "Origin": ZTE_MODEM_URL, "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01" }
    passwordHash = calculatePasswordHash(password, ld)
    global AD
    AD = calculateAd(crVersion, waInnerVersion, rd)
    data = Template(LOGIN_BODY).substitute(passwordHash=passwordHash, ad=AD)

    return requests.post(ZTE_API_BASE + SET_CMD, data=data, headers=headers)

def getModemStatus():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": COOKIE }
    params = { "multi_data": "1", "isTest": "false", "sms_received_flag_flag": "0", "sts_received_flag_flag": "0", "cmd": "modem_main_state%2Cpin_status%2Copms_wan_mode%2Copms_wan_auto_mode%2Cloginfo%2Cnew_version_state%2Ccurrent_upgrade_state%2Cis_mandatory%2Cwifi_dfs_status%2Cbattery_value%2Cppp_dial_conn_fail_counter%2Csignalbar%2Cnetwork_type%2Cnetwork_provider%2Copms_wan_auto_mode%2Cdhcp_wan_status%2Cppp_status%2CEX_SSID1%2Csta_ip_status%2CEX_wifi_profile%2Cm_ssid_enable%2CRadioOff%2Cwifi_onoff_state%2Cwifi_chip1_ssid1_ssid%2Cwifi_chip2_ssid1_ssid%2Csimcard_roam%2Clan_ipaddr%2Cstation_mac%2Cwifi_access_sta_num%2Cbattery_charging%2Cbattery_vol_percent%2Cbattery_pers%2Cspn_name_data%2Cspn_b1_flag%2Cspn_b2_flag%2Crealtime_tx_bytes%2Crealtime_rx_bytes%2Crealtime_time%2Crealtime_tx_thrpt%2Crealtime_rx_thrpt%2Cmonthly_rx_bytes%2Cmonthly_tx_bytes%2Cmonthly_time%2Cdate_month%2Cdata_volume_limit_switch%2Cdata_volume_limit_size%2Cdata_volume_alert_percent%2Cdata_volume_limit_unit%2Croam_setting_option%2Cupg_roam_switch%2Ccbns_server_enable%2Capp_debug_mode%2Codu_mode%2Cssid%2Cwifi_enable%2Cwifi_5g_enable%2Ccheck_web_conflict%2Cdial_mode%2Cppp_dial_conn_fail_counter%2Cwan_lte_ca%2Cprivacy_read_flag%2Cis_night_mode%2Cpppoe_status%2Cdhcp_wan_status%2Cstatic_wan_status%2Cvpn_conn_status%2Crmcc%2Crmnc%2Csms_received_flag%2Csts_received_flag%2Csms_unread_num" }    

    return requests.get(ZTE_API_BASE + GET_CMD, params=params, headers=headers)

def getLteStatus():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": COOKIE }
    params = { "isTest": "false", "cmd": "network_type%2Crssi%2Crscp%2Clte_rsrp%2CZ5g_snr%2CZ5g_rsrp%2CZCELLINFO_band%2CZ5g_dlEarfcn%2Clte_ca_pcell_arfcn%2Clte_ca_pcell_band%2Clte_ca_scell_band%2Clte_ca_pcell_bandwidth%2Clte_ca_scell_info%2Clte_ca_scell_bandwidth%2Cwan_lte_ca%2Clte_pci%2CZ5g_CELL_ID%2CZ5g_SINR%2Ccell_id%2Cwan_lte_ca%2Clte_ca_pcell_band%2Clte_ca_pcell_bandwidth%2Clte_ca_scell_band%2Clte_ca_scell_bandwidth%2Clte_ca_pcell_arfcn%2Clte_ca_scell_arfcn%2Clte_multi_ca_scell_info%2Cwan_active_band%2Cnr5g_pci%2Cnr5g_action_band%2Cnr5g_cell_id", "multi_data": "1"}

    return requests.get(ZTE_API_BASE + GET_CMD, params=params, headers=headers)

def getSmsList():
    headers = { "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": COOKIE }
    params = { "isTest": "false", "cmd": "sms_data_total", "page": "0", "data_per_page": "500", "mem_store": "1", "tags": "10", "order_by": "order+by+id+desc" }
    params_safe = urllib.parse.urlencode(params, safe='+')

    return requests.get(ZTE_API_BASE + GET_CMD, params=params_safe, headers=headers)

def setMsgRead(msgIds):
    if len(msgIds) == 0:
        return None
    
    msgIdsStr = ''

    for msgId in msgIds:
        msgIdsStr = msgIdsStr + msgId + ";"

    headers = { "Origin": ZTE_MODEM_URL, "Referer": ZTE_MODEM_URL + "/index.html", "Host": ZTE_MODEM_HOST, "Accept": "application/json, text/javascript, */*; q=0.01", "Cookie": COOKIE }
    params = { "isTest": "false", "goformId" : "SET_MSG_READ", "msg_id" : msgIdsStr, "tag": "0", "AD" : AD.lower() }

    return requests.post(ZTE_API_BASE + SET_CMD, data=params, headers=headers)

# Complex operations:

def login():
    resp = getDeviceVersion()

    _LOGGER.debug('login: getDeviceVersion response: ', resp.content)

    query = parse('$.cr_version')
    crVersion = query.find(resp.json())[0].value

    _LOGGER.debug('login: crVersion = ', crVersion)

    query = parse('$.wa_inner_version')
    waInnerVersion = query.find(resp.json())[0].value

    _LOGGER.debug('login: waInnerVersion = ', waInnerVersion)

    resp = getLd()

    query = parse('$.LD')
    ld = query.find(resp.json())[0].value
    
    _LOGGER.debug('login: ld = ', ld, ' resp body = ', resp.content)

    resp = getRd()
    query = parse('$.RD')
    rd = query.find(resp.json())[0].value

    _LOGGER.debug('login: rd = ', rd, ' resp body = ', resp.content)

    resp =  sendLoginCommand(PASSWORD, crVersion, waInnerVersion, ld, rd)

    if ( result := resp.json()['result'] ) != '0':
        raise ZteModemException("Non-successful login result: ", result)
    
    _LOGGER.debug('login: http response: ', resp.status_code, ' body: ', resp.content | str(''))

    cookieHeader = resp.headers.get("Set-Cookie")

    pattern = re.compile('stok\=\".*\"')

    _LOGGER.debug('login: cookieHeader: ', cookieHeader | str(''))

    result = pattern.search(cookieHeader)
    
    global COOKIE
    
    COOKIE = result.group(0)
    _LOGGER.debug('login: cookie: ', COOKIE | str(''))


def getSms(unread):
    """
    getSms returns the list of SMS stored in the modem.

    :param unread: if true, returns only the unread SMS

    :return: the list of SMS, where each is a JSON object containing the respective fields.
    """ 
    login()

    resp = getSmsList()

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


def readAllSms():
    """
    readSms marks the new SMS as read and returns these.

    :return: the list of new SMS, where each is a JSON object containing the respective fields.
    """ 

    login()

    resp = getSmsList()

    # Only return unread SMS:
    query = parse("$.messages[?(@.tag == '1')]")

    matches = [match.value for match in query.find(resp.json())]

    msgIds = []

    for message in matches:
        msgIds.append(message['id'])

    # Set the SMS as read in the modem:
    setMsgRead(msgIds)

    return matches

def fetchSms():
    """
    fetchSms marks the first new SMS as read and returns it.

    :return: the new SMS as a JSON object containing the respective fields.
    """

    login()

    resp = getSmsList()

    # Only return unread SMS:
    query = parse("$.messages[?(@.tag == '1')]")

    matches = [match.value for match in query.find(resp.json())]

    msgIds = []

    if len(matches) > 0:
        # Get the first unread SMS:
        message = matches[0]

        msgIds.append(message['id'])

        # Set the SMS as read in the modem:
        setMsgRead(msgIds)

        return message

    return None

