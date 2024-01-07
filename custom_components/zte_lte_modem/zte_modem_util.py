from zte_modem_common import ZteModemConnection, parseSmsDate

import smsutil
import json
import datetime

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

def doSendSms(connection):
    recipient = input("Recipient number: \n")
    message = input("Message to send: \n")
    date = datetime.datetime.now()

    resp = connection.sendSms(recipient, date, message)

    if resp.json()['result'] == 'success':
        print('zte_modem_util: doSendSms: SMS successfully sent.')
    else:
        print('zte_modem_util: doSendSms: failed to send sms: ', resp.json()['result'])

def doCheckUser(connection):
    resp = connection.checkLoginStatus()
    print('zte_modem_util: doCheckUser: ', json.dumps(resp.json(), indent=4))

def doSendQuery(connection):
    isTest = True if input("Is Test (y/n)? \n") == "y" else False
    multiData = input("Multidata (0,1): \n")
    cmd = input("Cmd (fields): \n")

    resp = connection.sendQueryCommand(isTest, multiData, cmd)
    print('zte_modem_util: doSendQuery: ', json.dumps(resp.json(), indent=4))


connection = ZteModemConnection('http', 'localhost', '8254', 'admin', getpass())

#doFetchSms(connection)
#doGetAllSms(connection)
#doGetModemStatus(connection, "cell_id,lte_rsrp,signalbar,wan_active_band,spn_name_data")
#doCheckUser(connection)
#doSendSms(connection)

while True:
    print("Select Operation: \n\n")
    print("1. Send Query")
    print("2. List SMS")
    print("3. Send SMS")
    print("0. Exit")
    print("\n")
    operation = input("Operation? \n")

    connection.manageSession()

    if operation == "1":
        doSendQuery(connection)
    elif operation == "2":
        doGetAllSms(connection)
    elif operation == "3":
        doSendSms(connection)
    else:
        print("Unknown option!")

