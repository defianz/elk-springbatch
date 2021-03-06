"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromUser = fromUser;

var _lodash = _interopRequireDefault(require("lodash"));

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

/**
 * Take userInput from the user and make it into a query object
 * @returns {object}
 * @param userInput
 */
function fromUser(userInput) {
  var matchAll = '';

  if (_lodash.default.isObject(userInput)) {
    // If we get an empty object, treat it as a *
    if (!Object.keys(userInput).length) {
      return matchAll;
    }

    return userInput;
  }

  userInput = userInput || '';

  if (typeof userInput === 'string') {
    var trimmedUserInput = userInput.trim();

    if (trimmedUserInput.length === 0) {
      return matchAll;
    }

    if (trimmedUserInput[0] === '{') {
      try {
        return JSON.parse(trimmedUserInput);
      } catch (e) {
        return userInput;
      }
    } else {
      return userInput;
    }
  }
}