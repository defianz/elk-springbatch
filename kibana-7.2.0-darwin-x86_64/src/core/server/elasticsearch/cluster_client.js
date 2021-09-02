"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClusterClient = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _elasticsearch = require("elasticsearch");

var _lodash = require("lodash");

var _router = require("../http/router");

var _elasticsearch_client_config = require("./elasticsearch_client_config");

var _scoped_cluster_client = require("./scoped_cluster_client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Calls the Elasticsearch API endpoint with the specified parameters.
 * @param client Raw Elasticsearch JS client instance to use.
 * @param endpoint Name of the API endpoint to call.
 * @param clientParams Parameters that will be directly passed to the
 * Elasticsearch JS client.
 * @param options Options that affect the way we call the API and process the result.
 */
async function callAPI(client, endpoint, clientParams = {}, options = {
  wrap401Errors: true
}) {
  const clientPath = endpoint.split('.');
  const api = (0, _lodash.get)(client, clientPath);

  if (!api) {
    throw new Error(`called with an invalid endpoint: ${endpoint}`);
  }

  const apiContext = clientPath.length === 1 ? client : (0, _lodash.get)(client, clientPath.slice(0, -1));

  try {
    return await api.call(apiContext, clientParams);
  } catch (err) {
    if (!options.wrap401Errors || err.statusCode !== 401) {
      throw err;
    }

    const boomError = _boom.default.boomify(err, {
      statusCode: err.statusCode
    });

    const wwwAuthHeader = (0, _lodash.get)(err, 'body.error.header[WWW-Authenticate]');
    boomError.output.headers['WWW-Authenticate'] = wwwAuthHeader || 'Basic realm="Authorization Required"';
    throw boomError;
  }
}
/**
 * Represents an Elasticsearch cluster API client and allows to call API on behalf
 * of the internal Kibana user and the actual user that is derived from the request
 * headers (via `asScoped(...)`).
 *
 * @public
 */


class ClusterClient {
  /**
   * Raw Elasticsearch JS client that acts on behalf of the Kibana internal user.
   */

  /**
   * Optional raw Elasticsearch JS client that is shared between all the scoped clients created
   * from this cluster client. Every API call is attributed by the wh
   */

  /**
   * Indicates whether this cluster client (and all internal raw Elasticsearch JS clients) has been closed.
   */
  constructor(config, log) {
    this.config = config;
    this.log = log;

    _defineProperty(this, "client", void 0);

    _defineProperty(this, "scopedClient", void 0);

    _defineProperty(this, "isClosed", false);

    _defineProperty(this, "callAsInternalUser", async (endpoint, clientParams = {}, options) => {
      this.assertIsNotClosed();
      return await callAPI(this.client, endpoint, clientParams, options);
    });

    _defineProperty(this, "callAsCurrentUser", async (endpoint, clientParams = {}, options) => {
      this.assertIsNotClosed();
      return await callAPI(this.scopedClient, endpoint, clientParams, options);
    });

    this.client = new _elasticsearch.Client((0, _elasticsearch_client_config.parseElasticsearchClientConfig)(config, log));
  }
  /**
   * Calls specified endpoint with provided clientParams on behalf of the
   * Kibana internal user.
   * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
   * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
   * @param options - Options that affect the way we call the API and process the result.
   */


  /**
   * Closes the cluster client. After that client cannot be used and one should
   * create a new client instance to be able to interact with Elasticsearch API.
   */
  close() {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.client.close();

    if (this.scopedClient !== undefined) {
      this.scopedClient.close();
    }
  }
  /**
   * Creates an instance of `ScopedClusterClient` based on the configuration the
   * current cluster client that exposes additional `callAsCurrentUser` method
   * scoped to the provided req. Consumers shouldn't worry about closing
   * scoped client instances, these will be automatically closed as soon as the
   * original cluster client isn't needed anymore and closed.
   * @param req - Request the `ScopedClusterClient` instance will be scoped to.
   */


  asScoped(req = {}) {
    // It'd have been quite expensive to create and configure client for every incoming
    // request since it involves parsing of the config, reading of the SSL certificate and
    // key files etc. Moreover scoped client needs two Elasticsearch JS clients at the same
    // time: one to support `callAsInternalUser` and another one for `callAsCurrentUser`.
    // To reduce that overhead we create one scoped client per cluster client and share it
    // between all scoped client instances.
    if (this.scopedClient === undefined) {
      this.scopedClient = new _elasticsearch.Client((0, _elasticsearch_client_config.parseElasticsearchClientConfig)(this.config, this.log, {
        auth: false,
        ignoreCertAndKey: !this.config.ssl || !this.config.ssl.alwaysPresentCertificate
      }));
    }

    const headers = req.headers ? (0, _router.filterHeaders)(req.headers, this.config.requestHeadersWhitelist) : req.headers;
    return new _scoped_cluster_client.ScopedClusterClient(this.callAsInternalUser, this.callAsCurrentUser, headers);
  }
  /**
   * Calls specified endpoint with provided clientParams on behalf of the
   * user initiated request to the Kibana server (via HTTP request headers).
   * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
   * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
   * @param options - Options that affect the way we call the API and process the result.
   */


  assertIsNotClosed() {
    if (this.isClosed) {
      throw new Error('Cluster client cannot be used after it has been closed.');
    }
  }

}

exports.ClusterClient = ClusterClient;