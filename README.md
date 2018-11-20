# DoH (DNS over HTTPS) Command Line Client, RFC-8484 Compatible

[`@sagi.io/doh`](https://www.npmjs.com/package/@sagi.io/doh) is an RFC-8484 compliant  Node.js [DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) command line tool.

[![CircleCI](https://circleci.com/gh/sagi/doh-node.svg?style=svg)](https://circleci.com/gh/sagi/doh-node)
[![Coverage Status](https://coveralls.io/repos/github/sagi/doh-node/badge.svg?branch=master)](https://coveralls.io/github/sagi/doh-node?branch=master)
[![MIT License](https://img.shields.io/npm/l/@sagi.io/doh.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![version](https://img.shields.io/npm/v/@sagi.io/doh.svg?style=flat-square)](http://npm.im/@sagi.io/doh)

## Installation:
~~~
$ npm i -g @sagi.io/doh
~~~

Usage:
~~~
Usage: doh name [type] [class] [@dohUrl] [-p<port>] [-u<userAgent>] [-v] [-g];
~~~

If only `name` (domain name) is provided, it defaults to using Cloudflare's DNS-over-HTTPS server
(`@cloudflare-dns.com/dns-query`).

## Examples

~~~
$ doh sagi.io
~~~

Output:
~~~json
{
  "id": 9013,
  "type": "response",
  "flags": 384,
  "flag_qr": true,
  "opcode": "QUERY",
  "flag_aa": false,
  "flag_tc": false,
  "flag_rd": true,
  "flag_ra": true,
  "flag_z": false,
  "flag_ad": false,
  "flag_cd": false,
  "rcode": "NOERROR",
  "questions": [
    {
      "name": "sagi.io",
      "type": "A",
      "class": "IN"
    }
  ],
  "answers": [
    {
      "name": "sagi.io",
      "type": "A",
      "ttl": 300,
      "class": "IN",
      "flush": false,
      "data": "151.101.1.195"
    },
    {
      "name": "sagi.io",
      "type": "A",
      "ttl": 300,
      "class": "IN",
      "flush": false,
      "data": "151.101.65.195"
    }
  ],
  "authorities": [],
  "additionals": []
}
~~~

~~~
$  doh mx sagi.io @https://dns.google.com/experimental
~~~

Output:
~~~json
{
  "id": 0,
  "type": "response",
  "flags": 384,
  "flag_qr": true,
  "opcode": "QUERY",
  "flag_aa": false,
  "flag_tc": false,
  "flag_rd": true,
  "flag_ra": true,
  "flag_z": false,
  "flag_ad": false,
  "flag_cd": false,
  "rcode": "NOERROR",
  "questions": [
    {
      "name": "sagi.io",
      "type": "MX",
      "class": "IN"
    }
  ],
  "answers": [
    {
      "name": "sagi.io",
      "type": "MX",
      "ttl": 299,
      "class": "IN",
      "flush": false,
      "data": {
        "preference": 10,
        "exchange": "mxa.mailgun.org"
      }
    },
    {
      "name": "sagi.io",
      "type": "MX",
      "ttl": 299,
      "class": "IN",
      "flush": false,
      "data": {
        "preference": 10,
        "exchange": "mxb.mailgun.org"
      }
    }
  ],
  "authorities": [],
  "additionals": []
}
~~~

Probably some time the future we'll add a `DiG`-like output.

## License
MIT
