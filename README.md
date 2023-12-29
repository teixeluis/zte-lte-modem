# ZTE MF266 Modem Home Assistant custom integration

## Overview

This integration exposes some of the features of this outdoor LTE modem to Home Assistant. Most notably it provides:

 * SMS sensor - everytime the modem receives an SMS, the event with the SMS content and metadata can be used in Home Assistant;
 * SMS service - allows SMS to be sent via the modem;
 * Modem status sensor - provides realtime information regarding the modem operation and status;

## Packages

```
$ pip install jsonpath-ng smsutil
```

## Sample configuration:

In your configuration.yaml add an entry similar to:

```
sensor:
  - platform: zte_lte_modem
    name: zte_lte_modem_mf266
    protocol: http
    host: 192.168.1.1
    port: 80
    username: admin
    password: 2secure
```

With the correct details for your modem and admin credentials.

## TODO

 * add more sensors for other modem features;
 * add service for sending SMS through the modem;
 * use async library for the http communication (aiohttp or aiohttp_requests);
 * mapping of the remaining fields of the SMS sensor.

## References

 * [4G Outdoor CPE MF266](https://ztedevices.com/en-eu/4g-outdoor-cpe-mf266/)
 * [Building Home Assistant Component](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/)
 * [Creating your first integration](https://developers.home-assistant.io/docs/creating_component_index/)
 * [aiohttp-requests](https://pypi.org/project/aiohttp-requests/)
