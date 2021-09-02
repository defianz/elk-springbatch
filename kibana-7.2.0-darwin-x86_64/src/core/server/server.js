"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;

var _config = require("./config");

var _elasticsearch = require("./elasticsearch");

var _http = require("./http");

var _legacy = require("./legacy");

var _plugins = require("./plugins");

var _logging = require("./logging");

var _dev = require("./dev");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Server {
  constructor(config$, env, logger) {
    this.config$ = config$;
    this.env = env;
    this.logger = logger;

    _defineProperty(this, "configService", void 0);

    _defineProperty(this, "elasticsearch", void 0);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "plugins", void 0);

    _defineProperty(this, "legacy", void 0);

    _defineProperty(this, "log", void 0);

    this.log = this.logger.get('server');
    this.configService = new _config.ConfigService(config$, env, logger);
    const core = {
      configService: this.configService,
      env,
      logger
    };
    this.http = new _http.HttpService(core);
    this.plugins = new _plugins.PluginsService(core);
    this.legacy = new _legacy.LegacyService(core);
    this.elasticsearch = new _elasticsearch.ElasticsearchService(core);
  }

  async setup() {
    this.log.debug('setting up server');
    const httpSetup = await this.http.setup();
    this.registerDefaultRoute(httpSetup);
    const elasticsearchServiceSetup = await this.elasticsearch.setup();
    const pluginsSetup = await this.plugins.setup({
      elasticsearch: elasticsearchServiceSetup,
      http: httpSetup
    });
    const coreSetup = {
      elasticsearch: elasticsearchServiceSetup,
      http: httpSetup,
      plugins: pluginsSetup
    };
    await this.legacy.setup(coreSetup);
    return coreSetup;
  }

  async start() {
    const httpStart = await this.http.start();
    const plugins = await this.plugins.start({});
    const startDeps = {
      http: httpStart,
      plugins
    };
    await this.legacy.start(startDeps);
    return startDeps;
  }

  async stop() {
    this.log.debug('stopping server');
    await this.legacy.stop();
    await this.plugins.stop();
    await this.elasticsearch.stop();
    await this.http.stop();
  }

  registerDefaultRoute(httpSetup) {
    const router = new _http.Router('/core');
    router.get({
      path: '/',
      validate: false
    }, async (req, res) => res.ok({
      version: '0.0.1'
    }));
    httpSetup.registerRouter(router);
  }

  async setupConfigSchemas() {
    const schemas = [[_elasticsearch.config.path, _elasticsearch.config.schema], [_logging.config.path, _logging.config.schema], [_http.config.path, _http.config.schema], [_plugins.config.path, _plugins.config.schema], [_dev.config.path, _dev.config.schema]];

    for (const [path, schema] of schemas) {
      await this.configService.setSchema(path, schema);
    }
  }

}

exports.Server = Server;