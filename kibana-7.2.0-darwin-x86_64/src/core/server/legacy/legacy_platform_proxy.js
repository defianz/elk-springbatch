"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyPlatformProxy = void 0;

var _events = require("events");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * List of the server events to be forwarded to the legacy platform.
 */
const ServerEventsToForward = ['clientError', 'close', 'connection', 'error', 'listening', 'upgrade'];
/**
 * Represents "proxy" between legacy and current platform.
 * @internal
 */

class LegacyPlatformProxy extends _events.EventEmitter {
  constructor(log, server) {
    super(); // HapiJS expects that the following events will be generated by `listener`, see:
    // https://github.com/hapijs/hapi/blob/v14.2.0/lib/connection.js.

    this.log = log;
    this.server = server;

    _defineProperty(this, "eventHandlers", void 0);

    this.eventHandlers = new Map(ServerEventsToForward.map(eventName => {
      return [eventName, (...args) => {
        this.log.debug(`Event is being forwarded: ${eventName}`);
        this.emit(eventName, ...args);
      }];
    }));

    for (const [eventName, eventHandler] of this.eventHandlers) {
      this.server.addListener(eventName, eventHandler);
    }
  }
  /**
   * Neither new nor legacy platform should use this method directly.
   */


  address() {
    this.log.debug('"address" has been called.');
    return this.server.address();
  }
  /**
   * Neither new nor legacy platform should use this method directly.
   */


  listen(port, host, callback) {
    this.log.debug(`"listen" has been called (${host}:${port}).`);

    if (callback !== undefined) {
      callback();
    }
  }
  /**
   * Neither new nor legacy platform should use this method directly.
   */


  close(callback) {
    this.log.debug('"close" has been called.');

    if (callback !== undefined) {
      callback();
    }
  }
  /**
   * Neither new nor legacy platform should use this method directly.
   */


  getConnections(callback) {
    // This method is used by `even-better` (before we start platform).
    // It seems that the latest version of parent `good` doesn't use this anymore.
    this.server.getConnections(callback);
  }

}

exports.LegacyPlatformProxy = LegacyPlatformProxy;