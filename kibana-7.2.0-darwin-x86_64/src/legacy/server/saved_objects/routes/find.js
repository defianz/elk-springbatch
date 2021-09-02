"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFindRoute = void 0;

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
const createFindRoute = prereqs => ({
  path: '/api/saved_objects/_find',
  method: 'GET',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      query: _joi.default.object().keys({
        per_page: _joi.default.number().min(0).default(20),
        page: _joi.default.number().min(0).default(1),
        type: _joi.default.array().items(_joi.default.string()).single().required(),
        search: _joi.default.string().allow('').optional(),
        default_search_operator: _joi.default.string().valid('OR', 'AND').default('OR'),
        search_fields: _joi.default.array().items(_joi.default.string()).single(),
        sort_field: _joi.default.string(),
        has_reference: _joi.default.object().keys({
          type: _joi.default.string().required(),
          id: _joi.default.string().required()
        }).optional(),
        fields: _joi.default.array().items(_joi.default.string()).single()
      }).default()
    },

    handler(request) {
      const query = request.query;
      return request.pre.savedObjectsClient.find({
        perPage: query.per_page,
        page: query.page,
        type: query.type,
        search: query.search,
        defaultSearchOperator: query.default_search_operator,
        searchFields: query.search_fields,
        sortField: query.sort_field,
        hasReference: query.has_reference,
        fields: query.fields
      });
    }

  }
});

exports.createFindRoute = createFindRoute;