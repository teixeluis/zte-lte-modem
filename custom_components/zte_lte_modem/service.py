import datetime
import logging

from .zte_modem_common import ZteModemException

from .const import (
    ATTR_SMS_TO,
    ATTR_SMS_PAYLOAD,
)

DOMAIN = "zte_lte_modem"
SERVICE = "zte_send_sms"

_LOGGER = logging.getLogger(__name__)

def handle_send_sms(call, connection):
    """
    Handle the zte_send_sms service call.
    """

    sms_to = call.data.get(ATTR_SMS_TO)
    sms_payload = call.data.get(ATTR_SMS_PAYLOAD)
    date = datetime.datetime.now()

    #hass.states.set(DOMAIN + "." + SERVICE, sms_to, sms_payload)

    #connection.manageSession()
    connection.login()

    resp = connection.sendSms(sms_to, date, sms_payload)

    if resp.json()['result'] == 'success':
        _LOGGER.debug('zte_modem_util: doSendSms: SMS successfully sent.')
    else:
        raise ZteModemException('zte_modem_util: doSendSms: failed to send sms: ', resp.json()['result'])
