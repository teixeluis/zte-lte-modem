from zte_modem_common import ZteModemConnection

import smsutil
import json

from getpass import getpass

"""
Utility module for testing the zte_modem_common library functions.
"""

def doGetModemStatus(connection):
    connection.login()
    resp = connection.getModemStatus()
    print('doGetModemStatus: ', json.dumps(resp.json(), indent=4))

def doGetLteStatus(connection):
    connection.login()
    resp = connection.getLteStatus()
    print('doGetLteStatus: ', json.dumps(resp.json(), indent=4))

def doGetAllSms(connection):
    smsList = connection.getSms(False)

    for sms in smsList:
        print('zte_modem_util: doGetAllSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doGetAllSms: SMS content: ', smsText)

def doFetchSms(connection):
    sms = connection.fetchSms()

    if sms != None:
        print('zte_modem_util: doFetchSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doFetchSms: SMS content: ', smsText)
    else:
        print('zte_modem_util: no more SMS to read!')


USERNAME = 'admin'
PASSWORD = getpass()
PROTOCOL = 'http'
HOST = 'localhost'
PORT = '8254'

#doFetchSms()

connection = ZteModemConnection(PROTOCOL, HOST, PORT, USERNAME, PASSWORD)

doGetAllSms(connection)
