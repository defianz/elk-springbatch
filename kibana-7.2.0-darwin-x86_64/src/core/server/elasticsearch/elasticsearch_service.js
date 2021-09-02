"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchService = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _cluster_client = require("./cluster_client");

var _elasticsearch_config = require("./elasticsearch_config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
class ElasticsearchService {
  constructor(coreContext) {
    this.coreContext = coreContext;

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "config$", void 0);

    _defineProperty(this, "subscription", void 0);

    this.log = coreContext.logger.get('elasticsearch-service');
    this.config$ = coreContext.configService.atPath('elasticsearch').pipe((0, _operators.map)(rawConfig => new _elasticsearch_config.ElasticsearchConfig(rawConfig)));
  }

  async setup() {
    this.log.debug('Setting up elasticsearch service');
    const clients$ = this.config$.pipe((0, _operators.filter)(() => {
      if (this.subscription !== undefined) {
        this.log.error('Clients cannot be changed after they are created');
        return false;
      }

      return true;
    }), (0, _operators.switchMap)(config => new _rxjs.Observable(subscriber => {
      this.log.debug(`Creating elasticsearch clients`);
      const coreClients = {
        config,
        adminClient: this.createClusterClient('admin', config),
        dataClient: this.createClusterClient('data', config)
      };
      subscriber.next(coreClients);
      return () => {
        this.log.debug(`Closing elasticsearch clients`);
        coreClients.adminClient.close();
        coreClients.dataClient.close();
      };
    })), (0, _operators.publishReplay)(1));
    this.subscription = clients$.connect();
    return {
      legacy: {
        config$: clients$.pipe((0, _operators.map)(clients => clients.config))
      },
      adminClient$: clients$.pipe((0, _operators.map)(clients => clients.adminClient)),
      dataClient$: clients$.pipe((0, _operators.map)(clients => clients.dataClient)),
      createClient: (type, clientConfig) => {
        return this.createClusterClient(type, clientConfig);
      }
    };
  }

  async start() {}

  async stop() {
    this.log.debug('Stopping elasticsearch service');

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  createClusterClient(type, config) {
    return new _cluster_client.ClusterClient(config, this.coreContext.logger.get('elasticsearch', type));
  }

}

exports.ElasticsearchService = ElasticsearchService;