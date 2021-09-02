"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveApi = resolveApi;

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
const KNOWN_APIS = ['es_6_0'];

function resolveApi(senseVersion, apis, h) {
  const result = {};

  _lodash.default.each(apis, function (name) {
    {
      if (KNOWN_APIS.includes(name)) {
        // for now we ignore sense_version. might add it in the api name later
        const api = require('./' + name); // eslint-disable-line import/no-dynamic-require


        result[name] = api.asJson();
      }
    }
  });

  return h.response(result).type('application/json');
}