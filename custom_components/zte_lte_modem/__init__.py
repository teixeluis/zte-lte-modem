from __future__ import annotations

import homeassistant.helpers.config_validation as cv

import voluptuous as vol
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.discovery import load_platform
from homeassistant.const import (
    CONF_PROTOCOL,
    CONF_HOST,
    CONF_PORT,
    CONF_USERNAME,
    CONF_PASSWORD,
)

from .const import (
    SENSOR_STATE_RUNNING,
)

from .zte_modem_common import ZteModemConnection
from .service import handle_send_sms, handle_sensors_state_control

_LOGGER = logging.getLogger(__name__)

DOMAIN = "zte_lte_modem"
PLATFORMS = ["sensor"]

CONFIG_SCHEMA =  vol.Schema(
    {
        DOMAIN: {
            vol.Required(CONF_PROTOCOL): cv.string,
            vol.Required(CONF_HOST): cv.string,
            vol.Required(CONF_PORT): cv.string,
            vol.Required(CONF_USERNAME): cv.string,
            vol.Required(CONF_PASSWORD): cv.string,
        }
    },
    extra=vol.ALLOW_EXTRA,
)

def setup(hass: HomeAssistant, config: ConfigType) -> bool:
    if DOMAIN not in config:
        _LOGGER.debug("setup: domain not in config!")
        return True
    
    protocol = config[DOMAIN].get(CONF_PROTOCOL)
    host =  config[DOMAIN].get(CONF_HOST)
    port = config[DOMAIN].get(CONF_PORT)
    username = config[DOMAIN].get(CONF_USERNAME)
    password = config[DOMAIN].get(CONF_PASSWORD)

    connection = ZteModemConnection(protocol, host, port, username, password)

    _LOGGER.debug("setup: created modem connection object.")

    hass.data[DOMAIN] = {"connection": connection, "sensors_state": SENSOR_STATE_RUNNING }
    
    def handle_zte_send_sms(call):
        handle_send_sms(call, connection)

    def handle_zte_sensors_state_control(call):
        handle_sensors_state_control(call, hass)

    load_platform(hass, 'sensor', DOMAIN, {}, hass_config=config)
    hass.services.register(DOMAIN, "zte_send_sms", handle_zte_send_sms)
    hass.services.register(DOMAIN, "zte_sensors_state_control", handle_zte_sensors_state_control)

    return True
