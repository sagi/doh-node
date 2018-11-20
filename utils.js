const url = require('url');
const parseDohUrl = dohUrl => {
  const { protocol, hostname, path } = url.parse(dohUrl);
  if (protocol !== 'https:' && protocol !== 'http:') {
    throw new Error(`Unsupported url protocol: ${protocol}`);
  }
  return { protocol, hostname, path };
};

const types = new Set([
  'txt',
  'a',
  'aaaa',
  'ns',
  'mx',
  'loc',
  'cname',
  'caa',
  'ptr',
  'any',
]);
const helps = new Set(['-h', '--help']);
const classes = new Set(['in', 'ch', 'hs']);

const isDohUrl = arg => arg.trim().startsWith('@');
const isMinusArg = arg => arg.trim().startsWith('-');
const isHelp = arg => helps.has(arg.trim().toLowerCase());
const isType = arg => types.has(arg.trim().toLowerCase());
const isClass = arg => classes.has(arg.trim().toLowerCase());

const usage = () => {
  const msg = `Usage: doh name [type] [class] [@dohUrl] [-p<port>] [-u<userAgent>] [-v] [-g]`;
  return msg;
};

const parseArgv = argv => {
  if (argv.length === 2) {
    console.log(usage());
    process.exit(0);
  }

  const options = {
    dohUrl: 'https://cloudflare-dns.com/dns-query',
    userAgent: `@sagi.io/doh`,
    name: '',
    method: 'POST',
    type: 'A',
    klass: 'IN',
    verbose: false,
    port: 0, // 0 - port is derived from dohUrl protocol (http/s - 80/443).
  };
  argv.forEach(arg => {
    if (isHelp(arg)) {
      console.log(usage());
      process.exit(0);
    } else if (isType(arg)) {
      options.type = arg;
    } else if (isClass(arg)) {
      options.klass = arg;
    } else if (isDohUrl(arg)) {
      options.dohUrl = arg.substring(1);
    } else if (isMinusArg(arg)) {
      switch (arg[1]) {
        case 'p':
          options.port = parseInt(arg.substring(2), 10);
          break;
        case 'u':
          options.userAgent = arg.substring(2);
          break;
        case 'v':
          options.verbose = true;
          break;
        case 'g':
          options.method = 'GET';
          break;
        default:
          console.log(`Unsupported flag: ${arg[1]}`);
          process.exit(1);
      }
    } else {
      options.name = arg;
    }
  });
  return options;
};

module.exports = { usage, parseArgv, parseDohUrl };
