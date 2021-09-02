"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpConfig = exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

var _ssl_config = require("./ssl_config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const validBasePathRegex = /(^$|^\/.*[^\/]$)/;

const match = (regex, errorMsg) => str => regex.test(str) ? undefined : errorMsg;

const config = {
  path: 'server',
  schema: _configSchema.schema.object({
    autoListen: _configSchema.schema.boolean({
      defaultValue: true
    }),
    basePath: _configSchema.schema.maybe(_configSchema.schema.string({
      validate: match(validBasePathRegex, "must start with a slash, don't end with one")
    })),
    cors: _configSchema.schema.conditional(_configSchema.schema.contextRef('dev'), true, _configSchema.schema.object({
      origin: _configSchema.schema.arrayOf(_configSchema.schema.string())
    }, {
      defaultValue: {
        origin: ['*://localhost:9876'] // karma test server

      }
    }), _configSchema.schema.boolean({
      defaultValue: false
    })),
    host: _configSchema.schema.string({
      defaultValue: 'localhost',
      hostname: true
    }),
    maxPayload: _configSchema.schema.byteSize({
      defaultValue: '1048576b'
    }),
    port: _configSchema.schema.number({
      defaultValue: 5601
    }),
    rewriteBasePath: _configSchema.schema.boolean({
      defaultValue: false
    }),
    ssl: _ssl_config.sslSchema
  }, {
    validate: rawConfig => {
      if (!rawConfig.basePath && rawConfig.rewriteBasePath) {
        return 'cannot use [rewriteBasePath] when [basePath] is not specified';
      }

      if (rawConfig.ssl.enabled && rawConfig.ssl.redirectHttpFromPort !== undefined && rawConfig.ssl.redirectHttpFromPort === rawConfig.port) {
        return 'Kibana does not accept http traffic to [port] when ssl is ' + 'enabled (only https is allowed), so [ssl.redirectHttpFromPort] ' + `cannot be configured to the same value. Both are [${rawConfig.port}].`;
      }
    }
  })
};
exports.config = config;

class HttpConfig {
  /**
   * @internal
   */
  constructor(rawConfig, env) {
    _defineProperty(this, "autoListen", void 0);

    _defineProperty(this, "host", void 0);

    _defineProperty(this, "port", void 0);

    _defineProperty(this, "cors", void 0);

    _defineProperty(this, "maxPayload", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "rewriteBasePath", void 0);

    _defineProperty(this, "publicDir", void 0);

    _defineProperty(this, "ssl", void 0);

    this.autoListen = rawConfig.autoListen;
    this.host = rawConfig.host;
    this.port = rawConfig.port;
    this.cors = rawConfig.cors;
    this.maxPayload = rawConfig.maxPayload;
    this.basePath = rawConfig.basePath;
    this.rewriteBasePath = rawConfig.rewriteBasePath;
    this.publicDir = env.staticFilesDir;
    this.ssl = new _ssl_config.SslConfig(rawConfig.ssl || {});
  }

}

exports.HttpConfig = HttpConfig;