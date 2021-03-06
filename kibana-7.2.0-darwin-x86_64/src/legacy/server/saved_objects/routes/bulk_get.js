"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBulkGetRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

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
const createBulkGetRoute = prereqs => ({
  path: '/api/saved_objects/_bulk_get',
  method: 'POST',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      payload: _joi.default.array().items(_joi.default.object({
        type: _joi.default.string().required(),
        id: _joi.default.string().required(),
        fields: _joi.default.array().items(_joi.default.string())
      }).required())
    },

    handler(request) {
      const {
        savedObjectsClient
      } = request.pre;
      return savedObjectsClient.bulkGet(request.payload);
    }

  }
});

exports.createBulkGetRoute = createBulkGetRoute;