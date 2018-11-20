const utils = require('./utils');

global.console.log = jest.fn();
const exit = jest.spyOn(process, 'exit');
const log = jest.spyOn(console, 'log');

log.mockImplementation(() => {});
exit.mockImplementation(() => {});

describe('utils tests', () => {
  test('parseDohUrl', () => {
    const dohUrl = 'https://cloudflare-dns.com/dns-query';
    expect(utils.parseDohUrl(dohUrl)).toEqual({
      protocol: 'https:',
      hostname: 'cloudflare-dns.com',
      path: '/dns-query',
    });
    const dohUrl2 = 'htppp://cloudflare-dns.com/dns-query';
    expect(() => utils.parseDohUrl(dohUrl2)).toThrow(
      'Unsupported url protocol: htppp:'
    );
  });

  test('usage', () => {
    expect(utils.usage()).toEqual(
      `Usage: doh name [type] [class] [@dohUrl] [-p<port>] [-u<userAgent>] [-v] [-g]`
    );
  });

  test('parseArgv', () => {
    const cmd1 = 'example.com';
    const expectedOptions1 = {
      dohUrl: 'https://cloudflare-dns.com/dns-query',
      userAgent: `@sagi.io/doh`,
      name: 'example.com',
      method: 'POST',
      type: 'A',
      klass: 'IN',
      verbose: false,
      port: 0,
    };
    expect(utils.parseArgv(cmd1.split(' '))).toEqual(expectedOptions1);

    const cmd2 = 'sagi.io IN AAAA @https://dns.google.com/experimental -g -v';
    const expectedOptions2 = {
      dohUrl: 'https://dns.google.com/experimental',
      userAgent: `@sagi.io/doh`,
      name: 'sagi.io',
      method: 'GET',
      type: 'AAAA',
      klass: 'IN',
      verbose: true,
      port: 0,
    };
    expect(utils.parseArgv(cmd2.split(' '))).toEqual(expectedOptions2);
  });

  test('parseArgv, help', () => {
    const cmd = '-h';
    utils.parseArgv(cmd.split(' '));
    expect(log).toHaveBeenCalledWith(utils.usage());
    expect(exit).toHaveBeenCalledWith(0);

    exit.mockClear();
    log.mockClear();
  });

  test('parseArgv, no args', () => {
    utils.parseArgv(['one', 'two']);
    expect(log).toHaveBeenCalledWith(utils.usage());
    expect(exit).toHaveBeenCalledWith(0);

    exit.mockClear();
    log.mockClear();
  });

  test('parseArgv, unsupported flag', () => {
    const cmd = 'sagi.io -v -g -p1234 -uCoolUserAgent -F';
    utils.parseArgv(cmd.split(' '));

    expect(log).toHaveBeenCalledWith('Unsupported flag: F');
    expect(exit).toHaveBeenCalledWith(1);

    exit.mockClear();
    log.mockClear();
  });
});
