"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopedSavedObjectsClientProvider = void 0;

var _priority_collection = require("./priority_collection");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provider for the Scoped Saved Object Client.
 */
class ScopedSavedObjectsClientProvider {
  constructor({
    defaultClientFactory
  }) {
    _defineProperty(this, "_wrapperFactories", new _priority_collection.PriorityCollection());

    this._originalClientFactory = this._clientFactory = defaultClientFactory;
  }

  addClientWrapperFactory(priority, wrapperFactory) {
    this._wrapperFactories.add(priority, wrapperFactory);
  }

  setClientFactory(customClientFactory) {
    if (this._clientFactory !== this._originalClientFactory) {
      throw new Error(`custom client factory is already set, unable to replace the current one`);
    }

    this._clientFactory = customClientFactory;
  }

  getClient(request) {
    const client = this._clientFactory({
      request
    });

    return this._wrapperFactories.toPrioritizedArray().reduceRight((clientToWrap, wrapperFactory) => {
      return wrapperFactory({
        request,
        client: clientToWrap
      });
    }, client);
  }

}

exports.ScopedSavedObjectsClientProvider = ScopedSavedObjectsClientProvider;