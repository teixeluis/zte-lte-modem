import zte_modem_common

import smsutil
import json

from getpass import getpass

def doGetModemStatus():
    zte_modem_common.login()
    resp = zte_modem_common.getModemStatus()
    print('doGetModemStatus: ', json.dumps(resp.json(), indent=4))

def doGetLteStatus():
    zte_modem_common.login()
    resp = zte_modem_common.getLteStatus()
    print('doGetLteStatus: ', json.dumps(resp.json(), indent=4))

zte_modem_common.PASSWORD = getpass()


def doGetAllSms():
    smsList = zte_modem_common.getSms(False)

    for sms in smsList:
        print('zte_modem_util: doGetAllSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doGetAllSms: SMS content: ', smsText)

def doFetchSms():
    sms = zte_modem_common.fetchSms()

    if sms != None:
        print('zte_modem_util: doFetchSms: SMS fields: ', json.dumps(sms, indent=4))
        smsText = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
        print('zte_modem_util: doFetchSms: SMS content: ', smsText)
    else:
        print('zte_modem_util: no more SMS to read!')

doFetchSms()
