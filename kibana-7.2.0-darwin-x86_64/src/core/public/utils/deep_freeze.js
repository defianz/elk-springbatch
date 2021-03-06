"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFreeze = deepFreeze;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
// if we define this inside RecursiveReadonly TypeScript complains
// eslint-disable-next-line @typescript-eslint/no-empty-interface
function deepFreeze(object) {
  // for any properties that reference an object, makes sure that object is
  // recursively frozen as well
  var _arr = Object.values(object);

  for (var _i = 0; _i < _arr.length; _i++) {
    var value = _arr[_i];

    if (value !== null && _typeof(value) === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}