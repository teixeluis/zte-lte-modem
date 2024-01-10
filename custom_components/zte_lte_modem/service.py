import datetime
import logging

from .zte_modem_common import ZteModemException, ServiceException

from .const import (
    ATTR_SMS_TO,
    ATTR_SMS_PAYLOAD,
    SENSOR_STATE_RUNNING,
    SENSOR_STATE_PAUSED,
    ATTR_SENSORS_STATE,
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

    #connection.manageSession()
    connection.login()

    resp = connection.sendSms(sms_to, date, sms_payload)

    if resp.json()['result'] == 'success':
        _LOGGER.debug('handle_send_sms: SMS successfully sent.')
    else:
        raise ZteModemException('handle_send_sms: failed to send sms: ', resp.json()['result'])

def handle_sensors_state_control(call, hass):
    """
    Handle the sensor state control service call.
    """
    sensors_state = call.data.get(ATTR_SENSORS_STATE)

    if sensors_state != SENSOR_STATE_RUNNING or sensors_state != SENSOR_STATE_PAUSED:
        raise ServiceException("handle_sensors_state_control: unknown state value: ", sensors_state)
    
    hass.data[DOMAIN]["sensors_state"] = call.data.get(ATTR_SENSORS_STATE)