"""Platform for sensor integration."""
from __future__ import annotations

import logging
import smsutil

from .zte_modem_common import parseSmsDate

from datetime import timedelta
from typing import Any, Dict, Optional

from homeassistant.const import CONF_NAME
from homeassistant.components.sensor import SensorEntity

from .const import (
    ATTR_SMS_DATE,
    ATTR_SMS_ID,
    ATTR_SMS_FROM,
    ATTR_SMS_TO,
    ATTR_SMS_UNREAD,
    ATTR_SMS_DRAFT_GROUP_ID,
    ATTR_SMS_RCVD_ALL_CONCAT_SMS,
    ATTR_SMS_CONCAT_SMS_TOTAL,
    ATTR_SMS_CONCAT_SMS_RCVD,
    ATTR_SMS_CLASS,
)

from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType

from . import DOMAIN

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(seconds=15)

def setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    add_entities: AddEntitiesCallback,
    discovery_info=None):
    # We only want this platform to be set up via discovery.
    #if discovery_info is None:
    #   return
    
    name = config.get(CONF_NAME, "zte_sms_sensor")
    connection = hass.data[DOMAIN]["connection"]
    sensor = SmsSensor(name, connection)

    add_entities([sensor])


class SmsSensor(SensorEntity):

    def __init__(self, name, connection):
        super().__init__()
        self.attrs: Dict[str, Any] = {}
        self._name = name
        self.sensor_id = "zte_sms_sensor"
        self._state = None
        self._available = True
        self.connection = connection

    @property
    def name(self) -> str:
        """Return the name of the entity."""
        return self._name

    @property
    def unique_id(self) -> str:
        """Return the unique ID of the sensor."""
        return self.sensor_id

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return self._available

    @property
    def state(self) -> Optional[str]:
        return self._state

    @property
    def extra_state_attributes(self) -> Dict[str, Any]:
        return self.attrs

    def update(self) -> None:
        """Fetch new state data from the modem API for the sensor.

        """
        try:
            self.connection.manageSession()

            sms = self.connection.fetchSms()

            # Clear attributes before updating
            self.attrs.clear()

            # Check if an SMS was returned:
            if sms != None:
                # SMS attributes mapping:

                self.attrs[ATTR_SMS_ID] = sms['id']
                self.attrs[ATTR_SMS_DATE] = parseSmsDate(sms['date'])
                self.attrs[ATTR_SMS_FROM] = sms['number']
                self.attrs[ATTR_SMS_TO] = "" ## currently not possible to obtain recipient MSISDN (which is the customer own number)
                self.attrs[ATTR_SMS_UNREAD] = sms['tag']
                self.attrs[ATTR_SMS_DRAFT_GROUP_ID] = sms['draft_group_id']
                self.attrs[ATTR_SMS_RCVD_ALL_CONCAT_SMS] = sms['received_all_concat_sms']
                self.attrs[ATTR_SMS_CONCAT_SMS_TOTAL] = sms['concat_sms_total']
                self.attrs[ATTR_SMS_CONCAT_SMS_RCVD] = sms['concat_sms_received']
                self.attrs[ATTR_SMS_CLASS] = sms['sms_class']

                # State holds the actual SMS payload:
                self._state = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')

            self._available = True
        except Exception as ex:
            self._available = False
            _LOGGER.exception("Error retrieving data from ZTE modem: %s", str(ex))
