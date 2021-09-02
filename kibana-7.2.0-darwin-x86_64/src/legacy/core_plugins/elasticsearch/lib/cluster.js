"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cluster = void 0;

var _elasticsearch = require("elasticsearch");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Cluster {
  constructor(clusterClient) {
    this.clusterClient = clusterClient;

    _defineProperty(this, "errors", _elasticsearch.errors);

    _defineProperty(this, "callWithRequest", async (req = {}, endpoint, clientParams, options) => {
      return await this.clusterClient.asScoped(req).callAsCurrentUser(endpoint, clientParams, options);
    });

    _defineProperty(this, "callWithInternalUser", async (endpoint, clientParams, options) => {
      return await this.clusterClient.callAsInternalUser(endpoint, clientParams, options);
    });
  }

  close() {
    this.clusterClient.close();
  }

}

exports.Cluster = Cluster;