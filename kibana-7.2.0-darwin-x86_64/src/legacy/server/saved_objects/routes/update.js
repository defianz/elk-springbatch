"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdateRoute = void 0;

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
const createUpdateRoute = prereqs => {
  return {
    path: '/api/saved_objects/{type}/{id}',
    method: 'PUT',
    config: {
      pre: [prereqs.getSavedObjectsClient],
      validate: {
        params: _joi.default.object().keys({
          type: _joi.default.string().required(),
          id: _joi.default.string().required()
        }).required(),
        payload: _joi.default.object({
          attributes: _joi.default.object().required(),
          version: _joi.default.string(),
          references: _joi.default.array().items(_joi.default.object().keys({
            name: _joi.default.string().required(),
            type: _joi.default.string().required(),
            id: _joi.default.string().required()
          })).default([])
        }).required()
      },

      handler(request) {
        const {
          savedObjectsClient
        } = request.pre;
        const {
          type,
          id
        } = request.params;
        const {
          attributes,
          version,
          references
        } = request.payload;
        const options = {
          version,
          references
        };
        return savedObjectsClient.update(type, id, attributes, options);
      }

    }
  };
};

exports.createUpdateRoute = createUpdateRoute;