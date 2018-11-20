#!/usr/bin/env node
const doh = require('@sagi.io/dns-over-https');
const { parseArgv, parseDohUrl } = require('./utils');

(async () => {
  const cliOptions = parseArgv(process.argv);
  const {
    dohUrl,
    userAgent,
    name,
    method,
    type,
    klass,
    port: userPort,
    verbose,
  } = cliOptions;

  const { protocol, hostname, path } = parseDohUrl(dohUrl);

  const useHttps = protocol === 'https:';
  const port = userPort ? userPort : useHttps ? 443 : 80;

  if (verbose) {
    console.log(JSON.stringify(cliOptions, null, 2));
  }

  const r = await doh.query({
    method,
    hostname,
    path,
    port,
    userAgent,
    name,
    type,
    klass,
    useHttps,
  });
  console.log(JSON.stringify(r, null, 2));
})();
