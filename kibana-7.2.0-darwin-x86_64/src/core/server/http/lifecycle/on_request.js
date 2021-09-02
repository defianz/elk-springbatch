"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adoptToHapiOnRequestFormat = adoptToHapiOnRequestFormat;

var _boom = _interopRequireDefault(require("boom"));

var _router = require("../router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var ResultType;
/** @internal */

(function (ResultType) {
  ResultType["next"] = "next";
  ResultType["redirected"] = "redirected";
  ResultType["rejected"] = "rejected";
})(ResultType || (ResultType = {}));

class OnRequestResult {
  static next() {
    return new OnRequestResult(ResultType.next);
  }

  static redirected(url) {
    return new OnRequestResult(ResultType.redirected, url);
  }

  static rejected(error, options = {}) {
    return new OnRequestResult(ResultType.rejected, {
      error,
      statusCode: options.statusCode
    });
  }

  static isValidResult(candidate) {
    return candidate instanceof OnRequestResult;
  }

  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }

  isNext() {
    return this.type === ResultType.next;
  }

  isRedirected() {
    return this.type === ResultType.redirected;
  }

  isRejected() {
    return this.type === ResultType.rejected;
  }

}
/**
 * @public
 * A tool set defining an outcome of OnRequest interceptor for incoming request.
 */


/**
 * @public
 * Adopt custom request interceptor to Hapi lifecycle system.
 * @param fn - an extension point allowing to perform custom logic for
 * incoming HTTP requests.
 */
function adoptToHapiOnRequestFormat(fn) {
  return async function interceptRequest(request, h) {
    try {
      const result = await fn(_router.KibanaRequest.from(request, undefined), {
        next: OnRequestResult.next,
        redirected: OnRequestResult.redirected,
        rejected: OnRequestResult.rejected,
        setUrl: newUrl => {
          request.setUrl(newUrl); // We should update raw request as well since it can be proxied to the old platform

          request.raw.req.url = typeof newUrl === 'string' ? newUrl : newUrl.href;
        }
      });

      if (OnRequestResult.isValidResult(result)) {
        if (result.isNext()) {
          return h.continue;
        }

        if (result.isRedirected()) {
          return h.redirect(result.payload).takeover();
        }

        if (result.isRejected()) {
          const {
            error,
            statusCode
          } = result.payload;
          return _boom.default.boomify(error, {
            statusCode
          });
        }
      }

      throw new Error(`Unexpected result from OnRequest. Expected OnRequestResult, but given: ${result}.`);
    } catch (error) {
      return _boom.default.internal(error.message, {
        statusCode: 500
      });
    }
  };
}