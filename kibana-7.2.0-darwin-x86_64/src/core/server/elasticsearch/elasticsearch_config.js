"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchConfig = exports.config = exports.DEFAULT_API_VERSION = void 0;

var _configSchema = require("@kbn/config-schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const hostURISchema = _configSchema.schema.uri({
  scheme: ['http', 'https']
});

const DEFAULT_API_VERSION = '7.x';
exports.DEFAULT_API_VERSION = DEFAULT_API_VERSION;
const config = {
  path: 'elasticsearch',
  schema: _configSchema.schema.object({
    sniffOnStart: _configSchema.schema.boolean({
      defaultValue: false
    }),
    sniffInterval: _configSchema.schema.oneOf([_configSchema.schema.duration(), _configSchema.schema.literal(false)], {
      defaultValue: false
    }),
    sniffOnConnectionFault: _configSchema.schema.boolean({
      defaultValue: false
    }),
    hosts: _configSchema.schema.oneOf([hostURISchema, _configSchema.schema.arrayOf(hostURISchema, {
      minSize: 1
    })], {
      defaultValue: 'http://localhost:9200'
    }),
    preserveHost: _configSchema.schema.boolean({
      defaultValue: true
    }),
    username: _configSchema.schema.maybe(_configSchema.schema.string()),
    password: _configSchema.schema.maybe(_configSchema.schema.string()),
    requestHeadersWhitelist: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())], {
      defaultValue: ['authorization']
    }),
    customHeaders: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string(), {
      defaultValue: {}
    }),
    shardTimeout: _configSchema.schema.duration({
      defaultValue: '30s'
    }),
    requestTimeout: _configSchema.schema.duration({
      defaultValue: '30s'
    }),
    pingTimeout: _configSchema.schema.duration({
      defaultValue: _configSchema.schema.siblingRef('requestTimeout')
    }),
    startupTimeout: _configSchema.schema.duration({
      defaultValue: '5s'
    }),
    logQueries: _configSchema.schema.boolean({
      defaultValue: false
    }),
    ssl: _configSchema.schema.object({
      verificationMode: _configSchema.schema.oneOf([_configSchema.schema.literal('none'), _configSchema.schema.literal('certificate'), _configSchema.schema.literal('full')], {
        defaultValue: 'full'
      }),
      certificateAuthorities: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        minSize: 1
      })])),
      certificate: _configSchema.schema.maybe(_configSchema.schema.string()),
      key: _configSchema.schema.maybe(_configSchema.schema.string()),
      keyPassphrase: _configSchema.schema.maybe(_configSchema.schema.string()),
      alwaysPresentCertificate: _configSchema.schema.boolean({
        defaultValue: true
      })
    }),
    apiVersion: _configSchema.schema.string({
      defaultValue: DEFAULT_API_VERSION
    }),
    healthCheck: _configSchema.schema.object({
      delay: _configSchema.schema.duration({
        defaultValue: 2500
      })
    })
  })
};
exports.config = config;

class ElasticsearchConfig {
  /**
   * The interval between health check requests Kibana sends to the Elasticsearch.
   */

  /**
   * Version of the Elasticsearch (6.7, 7.1 or `master`) client will be connecting to.
   */

  /**
   * Specifies whether all queries to the client should be logged (status code,
   * method, query etc.).
   */

  /**
   * Hosts that the client will connect to. If sniffing is enabled, this list will
   * be used as seeds to discover the rest of your cluster.
   */

  /**
   * List of Kibana client-side headers to send to Elasticsearch when request
   * scoped cluster client is used. If this is an empty array then *no* client-side
   * will be sent.
   */

  /**
   * Timeout after which PING HTTP request will be aborted and retried.
   */

  /**
   * Timeout after which HTTP request will be aborted and retried.
   */

  /**
   * Timeout for Elasticsearch to wait for responses from shards. Set to 0 to disable.
   */

  /**
   * Specifies whether the client should attempt to detect the rest of the cluster
   * when it is first instantiated.
   */

  /**
   * Interval to perform a sniff operation and make sure the list of nodes is complete.
   * If `false` then sniffing is disabled.
   */

  /**
   * Specifies whether the client should immediately sniff for a more current list
   * of nodes when a connection dies.
   */

  /**
   * If Elasticsearch is protected with basic authentication, this setting provides
   * the username that the Kibana server uses to perform its administrative functions.
   */

  /**
   * If Elasticsearch is protected with basic authentication, this setting provides
   * the password that the Kibana server uses to perform its administrative functions.
   */

  /**
   * Set of settings configure SSL connection between Kibana and Elasticsearch that
   * are required when `xpack.ssl.verification_mode` in Elasticsearch is set to
   * either `certificate` or `full`.
   */

  /**
   * Header names and values to send to Elasticsearch with every request. These
   * headers cannot be overwritten by client-side headers and aren't affected by
   * `requestHeadersWhitelist` configuration.
   */
  constructor(rawConfig) {
    _defineProperty(this, "healthCheckDelay", void 0);

    _defineProperty(this, "apiVersion", void 0);

    _defineProperty(this, "logQueries", void 0);

    _defineProperty(this, "hosts", void 0);

    _defineProperty(this, "requestHeadersWhitelist", void 0);

    _defineProperty(this, "pingTimeout", void 0);

    _defineProperty(this, "requestTimeout", void 0);

    _defineProperty(this, "shardTimeout", void 0);

    _defineProperty(this, "sniffOnStart", void 0);

    _defineProperty(this, "sniffInterval", void 0);

    _defineProperty(this, "sniffOnConnectionFault", void 0);

    _defineProperty(this, "username", void 0);

    _defineProperty(this, "password", void 0);

    _defineProperty(this, "ssl", void 0);

    _defineProperty(this, "customHeaders", void 0);

    this.apiVersion = rawConfig.apiVersion;
    this.logQueries = rawConfig.logQueries;
    this.hosts = Array.isArray(rawConfig.hosts) ? rawConfig.hosts : [rawConfig.hosts];
    this.requestHeadersWhitelist = Array.isArray(rawConfig.requestHeadersWhitelist) ? rawConfig.requestHeadersWhitelist : [rawConfig.requestHeadersWhitelist];
    this.pingTimeout = rawConfig.pingTimeout;
    this.requestTimeout = rawConfig.requestTimeout;
    this.shardTimeout = rawConfig.shardTimeout;
    this.sniffOnStart = rawConfig.sniffOnStart;
    this.sniffOnConnectionFault = rawConfig.sniffOnConnectionFault;
    this.sniffInterval = rawConfig.sniffInterval;
    this.healthCheckDelay = rawConfig.healthCheck.delay;
    this.username = rawConfig.username;
    this.password = rawConfig.password;
    this.customHeaders = rawConfig.customHeaders;
    const certificateAuthorities = Array.isArray(rawConfig.ssl.certificateAuthorities) ? rawConfig.ssl.certificateAuthorities : typeof rawConfig.ssl.certificateAuthorities === 'string' ? [rawConfig.ssl.certificateAuthorities] : undefined;
    this.ssl = { ...rawConfig.ssl,
      certificateAuthorities
    };
  }

}

exports.ElasticsearchConfig = ElasticsearchConfig;