"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpService = void 0;

var _operators = require("rxjs/operators");

var _http_config = require("./http_config");

var _http_server = require("./http_server");

var _https_redirect_server = require("./https_redirect_server");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class HttpService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "httpServer", void 0);

    _defineProperty(this, "httpsRedirectServer", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "configSubscription", void 0);

    _defineProperty(this, "log", void 0);

    this.log = coreContext.logger.get('http');
    this.config$ = coreContext.configService.atPath('server').pipe((0, _operators.map)(rawConfig => new _http_config.HttpConfig(rawConfig, coreContext.env)));
    this.httpServer = new _http_server.HttpServer(coreContext.logger.get('http', 'server'));
    this.httpsRedirectServer = new _https_redirect_server.HttpsRedirectServer(coreContext.logger.get('http', 'redirect', 'server'));
  }

  async setup() {
    this.configSubscription = this.config$.subscribe(() => {
      if (this.httpServer.isListening()) {
        // If the server is already running we can't make any config changes
        // to it, so we warn and don't allow the config to pass through.
        this.log.warn('Received new HTTP config after server was started. ' + 'Config will **not** be applied.');
      }
    });
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    return this.httpServer.setup(config);
  }

  async start() {
    const config = await this.config$.pipe((0, _operators.first)()).toPromise(); // We shouldn't set up http service in two cases:`
    // 1. If `server.autoListen` is explicitly set to `false`.
    // 2. When the process is run as dev cluster master in which case cluster manager
    // will fork a dedicated process where http service will be set up instead.

    if (!this.coreContext.env.isDevClusterMaster && config.autoListen) {
      // If a redirect port is specified, we start an HTTP server at this port and
      // redirect all requests to the SSL port.
      if (config.ssl.enabled && config.ssl.redirectHttpFromPort !== undefined) {
        await this.httpsRedirectServer.start(config);
      }

      await this.httpServer.start(config);
    }

    return {
      isListening: () => this.httpServer.isListening()
    };
  }

  async stop() {
    if (this.configSubscription === undefined) {
      return;
    }

    this.configSubscription.unsubscribe();
    this.configSubscription = undefined;
    await this.httpServer.stop();
    await this.httpsRedirectServer.stop();
  }

}

exports.HttpService = HttpService;