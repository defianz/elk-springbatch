"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultSearchStrategy = void 0;

var _abstract_search_strategy = require("./abstract_search_strategy");

var _search_request = require("../searh_requests/search_request");

var _default_search_capabilities = require("../default_search_capabilities");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const callWithRequestFactory = (server, request) => {
  const {
    callWithRequest
  } = request.server.plugins.elasticsearch.getCluster('data');
  return callWithRequest;
};

class DefaultSearchStrategy extends _abstract_search_strategy.AbstractSearchStrategy {
  constructor(server) {
    super(server, callWithRequestFactory, _search_request.SearchRequest);

    _defineProperty(this, "name", 'default');
  }

  checkForViability(req) {
    return {
      isViable: true,
      capabilities: new _default_search_capabilities.DefaultSearchCapabilities(req)
    };
  }

}

exports.DefaultSearchStrategy = DefaultSearchStrategy;