"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeWithScope = subscribeWithScope;

var _fatal_error = require("ui/notify/fatal_error");

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
function callInDigest($scope, fn) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  try {
    // this is terrible, but necessary to synchronously deliver subscription values
    // to angular scopes. This is required by some APIs, like the `config` service,
    // and beneficial for root level directives where additional digest cycles make
    // kibana sluggish to load.
    //
    // If you copy this code elsewhere you better have a good reason :)
    if ($scope.$root.$$phase) {
      fn.apply(void 0, args);
    } else {
      $scope.$apply(function () {
        return fn.apply(void 0, args);
      });
    }
  } catch (error) {
    (0, _fatal_error.fatalError)(error);
  }
}
/**
 * Subscribe to an observable at a $scope, ensuring that the digest cycle
 * is run for subscriber hooks and routing errors to fatalError if not handled.
 */


function subscribeWithScope($scope, observable, observer) {
  return observable.subscribe({
    next: function next(value) {
      if (observer && observer.next) {
        callInDigest($scope, observer.next, value);
      }
    },
    error: function error(_error) {
      callInDigest($scope, function () {
        if (observer && observer.error) {
          observer.error(_error);
        } else {
          throw new Error("Uncaught error in subscribeWithScope(): ".concat(_error ? _error.stack || _error.message : _error));
        }
      });
    },
    complete: function complete() {
      if (observer && observer.complete) {
        callInDigest($scope, observer.complete);
      }
    }
  });
}