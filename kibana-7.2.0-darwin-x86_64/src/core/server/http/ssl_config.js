"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SslConfig = exports.sslSchema = void 0;

var _configSchema = require("@kbn/config-schema");

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// `crypto` type definitions doesn't currently include `crypto.constants`, see
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fa5baf1733f49cf26228a4e509914572c1b74adf/types/node/v6/index.d.ts#L3412
const cryptoConstants = _crypto.default.constants;
const protocolMap = new Map([['TLSv1', cryptoConstants.SSL_OP_NO_TLSv1], ['TLSv1.1', cryptoConstants.SSL_OP_NO_TLSv1_1], ['TLSv1.2', cryptoConstants.SSL_OP_NO_TLSv1_2]]);

const sslSchema = _configSchema.schema.object({
  certificate: _configSchema.schema.maybe(_configSchema.schema.string()),
  certificateAuthorities: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()])),
  cipherSuites: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: cryptoConstants.defaultCoreCipherList.split(':')
  }),
  enabled: _configSchema.schema.boolean({
    defaultValue: false
  }),
  key: _configSchema.schema.maybe(_configSchema.schema.string()),
  keyPassphrase: _configSchema.schema.maybe(_configSchema.schema.string()),
  redirectHttpFromPort: _configSchema.schema.maybe(_configSchema.schema.number()),
  supportedProtocols: _configSchema.schema.arrayOf(_configSchema.schema.oneOf([_configSchema.schema.literal('TLSv1'), _configSchema.schema.literal('TLSv1.1'), _configSchema.schema.literal('TLSv1.2')]), {
    defaultValue: ['TLSv1.1', 'TLSv1.2'],
    minSize: 1
  })
}, {
  validate: ssl => {
    if (ssl.enabled && (!ssl.key || !ssl.certificate)) {
      return 'must specify [certificate] and [key] when ssl is enabled';
    }
  }
});

exports.sslSchema = sslSchema;

class SslConfig {
  /**
   * @internal
   */
  constructor(config) {
    _defineProperty(this, "enabled", void 0);

    _defineProperty(this, "redirectHttpFromPort", void 0);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "certificate", void 0);

    _defineProperty(this, "certificateAuthorities", void 0);

    _defineProperty(this, "keyPassphrase", void 0);

    _defineProperty(this, "cipherSuites", void 0);

    _defineProperty(this, "supportedProtocols", void 0);

    this.enabled = config.enabled;
    this.redirectHttpFromPort = config.redirectHttpFromPort;
    this.key = config.key;
    this.certificate = config.certificate;
    this.certificateAuthorities = this.initCertificateAuthorities(config.certificateAuthorities);
    this.keyPassphrase = config.keyPassphrase;
    this.cipherSuites = config.cipherSuites;
    this.supportedProtocols = config.supportedProtocols;
  }
  /**
   * Options that affect the OpenSSL protocol behavior via numeric bitmask of the SSL_OP_* options from OpenSSL Options.
   */


  getSecureOptions() {
    // our validation should ensure that this.supportedProtocols is at least an empty array,
    // which the following logic depends upon.
    if (this.supportedProtocols == null || this.supportedProtocols.length === 0) {
      throw new Error(`supportedProtocols should be specified`);
    }

    const supportedProtocols = this.supportedProtocols;
    return Array.from(protocolMap).reduce((secureOptions, [protocolAlias, secureOption]) => {
      // `secureOption` is the option that turns *off* support for a particular protocol,
      // so if protocol is supported, we should not enable this option.
      return supportedProtocols.includes(protocolAlias) ? secureOptions : secureOptions | secureOption; // eslint-disable-line no-bitwise
    }, 0);
  }

  initCertificateAuthorities(certificateAuthorities) {
    if (certificateAuthorities === undefined || Array.isArray(certificateAuthorities)) {
      return certificateAuthorities;
    }

    return [certificateAuthorities];
  }

}

exports.SslConfig = SslConfig;