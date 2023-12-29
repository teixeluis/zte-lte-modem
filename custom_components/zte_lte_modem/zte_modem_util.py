from zte_modem_common import ZteModemConnection, parseSmsDate

import smsutil
import json

from getpass import getpass

"""
Utility module for testing the zte_modem_common library functions.
"""

def doGetModemStatus(connection, attributeList):
    connection.login()
    resp = connection.getModemStatus(attributeList)
    print('zte_modem_util: doGetModemStatus: ', json.dumps(resp.json(), indent=4))

def doGetLteStatus(connection):
    connection.login()
    resp = connection.getLteStatus()
    print('zte_modem_util: doGetLteStatus: ', json.dumps(resp.json(), indent=4))

def doGetAllSms(connection):
    smsList = connection.getSms(False)

    for sms in smsList:
        print('zte_modem_util: doGetAllSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doGetAllSms: SMS content: ', smsText)

        smsDate = parseSmsDate(sms['date'])
        print('zte_modem_util: doGetAllSms: SMS parsed date: ', smsDate)

def doFetchSms(connection):
    sms = connection.fetchSms()

    if sms != None:
        print('zte_modem_util: doFetchSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doFetchSms: SMS content: ', smsText)
    else:
        print('zte_modem_util: no more SMS to read!')

def doCheckUser(connection):
    resp = connection.checkLoginStatus()
    print('zte_modem_util: doCheckUser: ', json.dumps(resp.json(), indent=4))


connection = ZteModemConnection('http', 'localhost', '8254', 'admin', getpass())

connection.login()

#doFetchSms(connection)
#doGetAllSms(connection)
#doGetModemStatus(connection, "cell_id,lte_rsrp,signalbar,wan_active_band,spn_name_data")

doCheckUser(connection)
