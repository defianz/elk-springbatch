"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePathProxyServer = void 0;

var _configSchema = require("@kbn/config-schema");

var _https = require("https");

var _lodash = require("lodash");

var _http_tools = require("./http_tools");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const alphabet = 'abcdefghijklmnopqrztuvwxyz'.split('');

class BasePathProxyServer {
  get basePath() {
    return this.httpConfig.basePath;
  }

  get targetPort() {
    return this.devConfig.basePathProxyTargetPort;
  }

  constructor(log, httpConfig, devConfig) {
    this.log = log;
    this.httpConfig = httpConfig;
    this.devConfig = devConfig;

    _defineProperty(this, "server", void 0);

    _defineProperty(this, "httpsAgent", void 0);

    const ONE_GIGABYTE = 1024 * 1024 * 1024;
    httpConfig.maxPayload = new _configSchema.ByteSizeValue(ONE_GIGABYTE);

    if (!httpConfig.basePath) {
      httpConfig.basePath = `/${(0, _lodash.sample)(alphabet, 3).join('')}`;
    }
  }

  async start(options) {
    this.log.debug('starting basepath proxy server');
    const serverOptions = (0, _http_tools.getServerOptions)(this.httpConfig);
    this.server = (0, _http_tools.createServer)(serverOptions); // Register hapi plugin that adds proxying functionality. It can be configured
    // through the route configuration object (see { handler: { proxy: ... } }).

    await this.server.register({
      plugin: require('h2o2')
    });

    if (this.httpConfig.ssl.enabled) {
      const tlsOptions = serverOptions.tls;
      this.httpsAgent = new _https.Agent({
        ca: tlsOptions.ca,
        cert: tlsOptions.cert,
        key: tlsOptions.key,
        passphrase: tlsOptions.passphrase,
        rejectUnauthorized: false
      });
    }

    this.setupRoutes(options);
    await this.server.start();
    this.log.info(`basepath proxy server running at ${this.server.info.uri}${this.httpConfig.basePath}`);
  }

  async stop() {
    if (this.server === undefined) {
      return;
    }

    this.log.debug('stopping basepath proxy server');
    await this.server.stop();
    this.server = undefined;

    if (this.httpsAgent !== undefined) {
      this.httpsAgent.destroy();
      this.httpsAgent = undefined;
    }
  }

  setupRoutes({
    blockUntil,
    shouldRedirectFromOldBasePath
  }) {
    if (this.server === undefined) {
      throw new Error(`Routes cannot be set up since server is not initialized.`);
    } // Always redirect from root URL to the URL with basepath.


    this.server.route({
      handler: (request, responseToolkit) => {
        return responseToolkit.redirect(this.httpConfig.basePath);
      },
      method: 'GET',
      path: '/'
    });
    this.server.route({
      handler: {
        proxy: {
          agent: this.httpsAgent,
          host: this.server.info.host,
          passThrough: true,
          port: this.devConfig.basePathProxyTargetPort,
          protocol: this.server.info.protocol,
          xforward: true
        }
      },
      method: '*',
      options: {
        pre: [// Before we proxy request to a target port we may want to wait until some
        async (request, responseToolkit) => {
          await blockUntil();
          return responseToolkit.continue;
        }]
      },
      path: `${this.httpConfig.basePath}/{kbnPath*}`
    }); // It may happen that basepath has changed, but user still uses the old one,
    // so we can try to check if that's the case and just redirect user to the
    // same URL, but with valid basepath.

    this.server.route({
      handler: (request, responseToolkit) => {
        const {
          oldBasePath,
          kbnPath = ''
        } = request.params;
        const isGet = request.method === 'get';
        const isBasepathLike = oldBasePath.length === 3;
        return isGet && isBasepathLike && shouldRedirectFromOldBasePath(kbnPath) ? responseToolkit.redirect(`${this.httpConfig.basePath}/${kbnPath}`) : responseToolkit.response('Not Found').code(404);
      },
      method: '*',
      path: `/{oldBasePath}/{kbnPath*}`
    });
  }

}

exports.BasePathProxyServer = BasePathProxyServer;