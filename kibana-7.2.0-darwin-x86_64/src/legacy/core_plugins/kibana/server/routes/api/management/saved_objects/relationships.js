"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRelationships = registerRelationships;

var _joi = _interopRequireDefault(require("joi"));

var _relationships = require("../../../../lib/management/saved_objects/relationships");

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
function registerRelationships(server) {
  server.route({
    path: '/api/kibana/management/saved_objects/relationships/{type}/{id}',
    method: ['GET'],
    config: {
      validate: {
        params: _joi.default.object().keys({
          type: _joi.default.string(),
          id: _joi.default.string()
        }),
        query: _joi.default.object().keys({
          size: _joi.default.number().default(10000),
          savedObjectTypes: _joi.default.array().single().items(_joi.default.string()).required()
        })
      }
    },
    handler: async req => {
      const type = req.params.type;
      const id = req.params.id;
      const size = req.query.size;
      const savedObjectTypes = req.query.savedObjectTypes;
      const savedObjectsClient = req.getSavedObjectsClient();
      const savedObjectsManagement = req.server.getSavedObjectsManagement();
      return await (0, _relationships.findRelationships)(type, id, {
        size,
        savedObjectsClient,
        savedObjectsManagement,
        savedObjectTypes
      });
    }
  });
}