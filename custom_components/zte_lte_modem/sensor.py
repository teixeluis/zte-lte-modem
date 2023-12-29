"""Platform for sensor integration."""
from __future__ import annotations

import logging
import smsutil

import zte_modem_common

import voluptuous as vol
import homeassistant.helpers.config_validation as cv

from datetime import timedelta
from typing import Any, Dict, Optional

from homeassistant.components.sensor import (
    PLATFORM_SCHEMA,
    SensorEntity,
)

from homeassistant.const import (
    CONF_NAME,
    CONF_PROTOCOL,
    CONF_HOST,
    CONF_PORT,
    CONF_USERNAME,
    CONF_PASSWORD,
)

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


_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(minutes=10)

# Validation of the user's configuration
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_NAME): cv.string,
    vol.Required(CONF_PROTOCOL): cv.string,
    vol.Required(CONF_HOST): cv.string,
    vol.Required(CONF_PORT): cv.string,
    vol.Required(CONF_USERNAME, default='admin'): cv.string,
    vol.Required(CONF_PASSWORD): cv.string,
})

def setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None
) -> None:
    """Set up the sensor platform."""
    sensor_name = config[CONF_NAME]
    protocol = config[CONF_PROTOCOL]
    host =  config[CONF_HOST]
    port = config[CONF_PORT]
    username = config[CONF_USERNAME]
    password = config[CONF_PASSWORD]
    sensor = SmsSensor(sensor_name, protocol, host, port, username, password)
    add_entities([sensor])


class SmsSensor(SensorEntity):
    _attr_name = "ZTE Modem SMS sensor"

    def __init__(self, sensor_name, protocol, host, port, username, password):
        super().__init__()
        self.attrs: Dict[str, Any] = {}
        self._name = sensor_name
        self._state = None
        self._available = True
        self.connection = zte_modem_common.ZteModemConnection(protocol, host, port, username, password)

    @property
    def name(self) -> str:
        """Return the name of the entity."""
        return self._name

    @property
    def unique_id(self) -> str:
        """Return the unique ID of the sensor."""
        return self._name

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return self._available

    @property
    def state(self) -> Optional[str]:
        return self._state

    @property
    def device_state_attributes(self) -> Dict[str, Any]:
        return self.attrs

    def update(self) -> None:
        """Fetch new state data for the sensor.

        This is the only method that should fetch new data for Home Assistant.
        """
        try:
            sms = self.connection.fetchSms()

            self.attrs[ATTR_SMS_ID] = sms['id']
            # TODO map remaining attributes...

            self._state = smsutil.decode(bytes.fromhex(sms['content']), encoding='utf_16_be')
            self._available = True
        except (zte_modem_common.ZteModemException):
            self._available = False
            _LOGGER.exception("Error retrieving data from ZTE modem.")
