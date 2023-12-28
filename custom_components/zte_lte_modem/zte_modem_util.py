import zte_modem_common

import re
import smsutil
import json

from jsonpath_ng import jsonpath, parse
from getpass import getpass

def doGetModemStatus():
    zte_modem_common.login()
    resp = zte_modem_common.getModemStatus()
    print('doGetModemStatus: ', json.dumps(resp.json(), indent=4))

def doGetLteStatus():
    zte_modem_common.login()
    resp = zte_modem_common.getLteStatus()
    print('doGetLteStatus: ', json.dumps(resp.json(), indent=4))

def getLastSms():
    zte_modem_common.login()

    resp = zte_modem_common.getSmsList()

    print('getSmsList: sms list', json.dumps(resp.json(), indent=4))

    contentQuery = parse('$.messages[*].content')

    smsContent = contentQuery.find(resp.json())[0].value
    smsText = smsutil.decode(bytes.fromhex(smsContent), encoding='utf_16_be')
    
    #print('getSmsList: first SMS raw: ', smsContent)
    #print('getSmsList: first SMS content: ', smsText)
    
    return smsText


zte_modem_common.PASSWORD = getpass()

smsText = getLastSms()

print('zte_modem_util: last SMS content: ', smsText)
