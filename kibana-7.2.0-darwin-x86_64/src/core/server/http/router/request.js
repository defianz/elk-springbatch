"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaRequest = void 0;

var _headers = require("./headers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @public */
class KibanaRequest {
  /**
   * Factory for creating requests. Validates the request before creating an
   * instance of a KibanaRequest.
   */
  static from(req, routeSchemas) {
    const requestParts = KibanaRequest.validate(req, routeSchemas);
    return new KibanaRequest(req, requestParts.params, requestParts.query, requestParts.body);
  }
  /**
   * Validates the different parts of a request based on the schemas defined for
   * the route. Builds up the actual params, query and body object that will be
   * received in the route handler.
   */


  static validate(req, routeSchemas) {
    if (routeSchemas === undefined) {
      return {
        body: {},
        params: {},
        query: {}
      };
    }

    const params = routeSchemas.params === undefined ? {} : routeSchemas.params.validate(req.params);
    const query = routeSchemas.query === undefined ? {} : routeSchemas.query.validate(req.query);
    const body = routeSchemas.body === undefined ? {} : routeSchemas.body.validate(req.payload);
    return {
      query,
      params,
      body
    };
  }

  constructor(request, params, query, body) {
    this.request = request;
    this.params = params;
    this.query = query;
    this.body = body;

    _defineProperty(this, "headers", void 0);

    _defineProperty(this, "path", void 0);

    this.headers = request.headers;
    this.path = request.path;
  }

  getFilteredHeaders(headersToKeep) {
    return (0, _headers.filterHeaders)(this.headers, headersToKeep);
  } // eslint-disable-next-line @typescript-eslint/camelcase


  unstable_getIncomingMessage() {
    return this.request.raw.req;
  }

}

exports.KibanaRequest = KibanaRequest;