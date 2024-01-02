# ZTE MF266 Modem Home Assistant custom integration

## Overview

The motivation for implementing this integration came from the need for checking the SMS sent directly 
to the LTE cellular modem that provides me with Internet access in a rural area. 

The modem in question is a ZTE MF266 and is normally installed on top of the customer roof by the telecom carrier. 
It works like a regular 4G modem, with the difference that it is rugged and built for permanent outdoor use.
Also its antennas are directional, providing more gain than the omnidirectional antennas installed in
smartphones and 4G USB sticks. The technician installing the modem will normally care for aiming it towards
the strongest cellular tower, for increased signal strength, performance and reliability.

Because the data only plan associated to this service also includes SMS and a regular MSISDN (phone
number), there are effectively text messages sent by the telecom carrier or other entities (e.g. safety
authorities) sent to this number which can be useful or important to know. 

The only method available to the user is to visualize these SMS through the modem web management UI. This is both 
cumbersome and (by default) only accessible via the local network where the modem is connected to.

By analyzing the client side javascript code the web UI uses for sending commands to the modem, I
was able to understand the various steps needed for the authentication, and the queries to be
done in order to obtain the SMS data.

## Protocol

The modem accepts API requests on the same host and port as the web interface. In my setup the modem exposes
the local IP 192.168.254.1 and listens for requests in port 80.

The API structure is loosely REST based, with JSON responses, but with request payloads encoded as form data.

### Structure

There are two (known) command endpoints:


1. Query endpoint:

```
GET /goform/goform_get_cmd_process
```

This endpoint accepts at least the following query parameters:

* `isTest` - always sent with value set to false. Not sure what is the effect of true;
* `cmd` - this parameter behaves as a field selector, accepting the names of the fields we want to see in the respond. Each field is comma separated and obviously URL encoded.
* `multi_data` - this parameter is used in some requests. Not sure what it does;

Depending on the command (selected fields), there are other parameters that can occur as well. For example 
when obtaining the SMS list (cmd=sms_data_total), the following parameters are also present:

* `page` - the page to show;
* `data_per_page` - the number of SMS to display in each page;
* `mem_store` - always 1. To be confirmed but it is possible that is used to select between internal memory and the SIM card as the data source of SMS messages;
* `tags` - each unread SMS is marked with "tag": "1". Possibly used to filter how many unread SMS to include in the response, but to be confirmed.

2. Action endpoint:

```
POST /goform/goform_set_cmd_process
```

This endpoint is used to execute actions on the modem and it accepts at least the following form data parameters (URL encoded parameters sent in the request body):

 * `isTest` - always sent with value set to false. Not sure what is the effect of true;
 * `goformId` - the action to execute. Some of the actions are:
   * `LOGIN_MULTI_USER` - used to authenticate with the modem
   * `LOGOUT` - logout and invalidate the session cookie
   * `SET_MSG_READ` - mark a given SMS as read
   * `SEND_SMS` - send an SMS

 * `AD` - required for some of the actions (e.g. LOGIN_MULTI_USER, LOGOUT and SET_MSG_READ). Described with further detail below, it is a key derived from crVersion, waInnerVersion and RD.

There are many possible fields than be specified in the cmd parameter. Below is a list of several of those:

 * [list of known cmd fields](./cmd_fields.md)

### Authentication

The authentication process is a bit convoluted and is required for several but not all of the types of queries
or operations. First the client performs a query to obtain version data:

```
GET /goform/goform_get_cmd_process?isTest=false&cmd=Language%2Ccr_version%2Cwa_inner_version"
```

The device then responds with the a payload containing the requested fields: Language, cr_version and wa_inner_version:

```
HTTP/1.1 200 OK
Server: WebServer-Webs
Pragma: no-cache
Cache-Control: no-store
Content-Type: text/html
X-Frame-Options: sameorigin
X-XSS-Protection: 1; mode=block

{"Language":"pt","cr_version":"","wa_inner_version":"BD_MEOPTMF266V1.0.0B06"}
```

Then via a separate request the parameter LD is obtained:

```
GET /goform/goform_get_cmd_process?isTest=false&cmd=LD"
```

```
HTTP/1.1 200 OK
Server: WebServer-Webs
Pragma: no-cache
Cache-Control: no-store
Content-Type: text/html
X-Frame-Options: sameorigin
X-XSS-Protection: 1; mode=block

{"LD":"0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"}
```

It is a 64 character string that contains a 32 byte hex encoded value (alpha digits in uppercase).

Right after this, the RD parameter is requested:

```
GET /goform/goform_get_cmd_process?isTest=false&cmd=RD
```

And similarly, a json response containing the RD parameter is returned:

HTTP/1.1 200 OK
Server: WebServer-Webs
Pragma: no-cache
Cache-Control: no-store
Content-Type: text/html
X-Frame-Options: sameorigin
X-XSS-Protection: 1; mode=block

{"RD":"0123456789abcdef0123456789abcdef"}

This is a smaller string, only 32 characters long. It also hex encodes an array of bytes. In this case
the alpha digits are in lowercase.

Then, after having all these parameters provided by the modem itself, the login command is prepared.

First, the password hash is prepared. It consists of:

```
    prefixHash =  hashlib.sha256(password.encode('utf-8')).hexdigest().upper()

    return hashlib.sha256((prefixHash + ld.upper()).encode('utf-8')).hexdigest().upper()
```

Which means a SHA256 digest of the password is calculated, converted to an hex string, and then concatenated
with LD. The resulting string is then converted to a SHA256 digest which is also converted to a hex string.

This last string is the password digest that will be used in the login command.


The login command itself is based on the action endpoint described early in this document:

```
POST /goform/goform_set_cmd_process
```

It takes the form data parameters:

```
isTest=false&goformId=LOGIN_MULTI_USER&user=<username>&password=<passwordHash>&AD=<ad>
```

The normal username will be "admin". The passwordHash is what we have calculated above.

The AD parameter is calculated as follows:

```
    prefixHash = hashlib.md5((crVersion + waInnerVersion).encode('utf-8')).hexdigest()

    return hashlib.md5((prefixHash + rd).encode('utf-8')).hexdigest().upper()
```

So basically the *cr_version* and *wa_inner_version* parameters obtained from the modem are concatenated,
and the resulting string is used to calculate a MD5 hash. The latter is then converted to 
an hex string. This is then concatenated to RD (also obtained from the modem in previous request),
which is also again used to calculate a final MD5 hash. This has is then converted to hex
(uppercase) and constitutes the AD parameter which besides the login is also used in other
operations.

Finally the login command is sent, and if successful, a response similar to the following is obtained:

```
HTTP/1.1 200 OK
Server: WebServer-Webs
Pragma: no-cache
Cache-control: no-cache
Content-Type: text/html
X-Frame-Options: sameorigin
X-XSS-Protection: 1; mode=block
Set-Cookie: stok="22D683012C615063AC6F49B5";path=/;HttpOnly

{"result":"0"}
```

The value 0 denotes a successful login. The cookie value (e.g. stok="22D683012C615063AC6F49B5) 
in the "Set-Cookie" header shall be used in all the subsequent requests requiring authentication.

It needs to be present in the "Cookie" header of these requests. For example:

```
Cookie: lang_redirect=en-US; ProductId=EW11; iottitle=EW11; stok="22D683012C615063AC6F49B5"
```


## Integration



### Features

This integration exposes some of the features of this modem to Home Assistant. Most notably it provides:

 * **SMS sensor** - everytime the modem receives an SMS, the event with the SMS content and metadata can be used in Home Assistant;
 * **SMS service** - allows SMS to be sent via the modem;
 * **Modem status sensor** - provides realtime information regarding the modem operation and status;

### Packages

Check the requirements.txt file for the packages needed by this project.

### Configure the integration:

In your configuration.yaml add an entry similar to:

```
zte_lte_modem:
  protocol: http
  host: 192.168.1.1
  port: 80
  username: admin
  password: 2secure
```

With the correct details for your modem and admin credentials. After this is added and HA is restarted, the
entities will be automatically created.

### Configure the sensors:

Sensors are created with default configurations if you don't specify any. But you may want to customize some
settings. Here are examples for each sensor:


#### SMS Sensor

```
sensors:
  - platform: zte_lte_modem
    name: zte_sms_sensor
  
  - platform: zte_lte_modem
    name: zte_state_sensor
    enabled_attributes: cell_id,lte_rsrp,signalbar,wan_active_band,spn_name_data
```

## TODO

 * add more entities for other modem features;
 * add service for sending SMS through the modem;
 * use async library for the http communication (aiohttp or aiohttp_requests);
 * understand and document the purpose of some of the modem API query parameters.

## References

 * [4G Outdoor CPE MF266](https://ztedevices.com/en-eu/4g-outdoor-cpe-mf266/)
 * [Building Home Assistant Component](https://aarongodfrey.dev/home%20automation/building_a_home_assistant_custom_component_part_1/)
 * [Creating your first integration](https://developers.home-assistant.io/docs/creating_component_index/)
 * [aiohttp-requests](https://pypi.org/project/aiohttp-requests/)
 * [Example Platform](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_load_platform)
 * [Component Generic Discovery](https://home-assistant-china.github.io/developers/component_generic_discovery/)