"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFind = registerFind;

var _joi = _interopRequireDefault(require("joi"));

var _inject_meta_attributes = require("../../../../lib/management/saved_objects/inject_meta_attributes");

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
 * This file wraps the saved object `_find` API and is designed specifically for the saved object
 * management UI. The main difference is this will inject a root `meta` attribute on each saved object
 * that the UI depends on. The meta fields come from functions within uiExports which can't be
 * injected into the front end when defined within uiExports. There are alternatives to this but have
 * decided to go with this approach at the time of development.
 */
function registerFind(server) {
  server.route({
    path: '/api/kibana/management/saved_objects/_find',
    method: 'GET',
    config: {
      validate: {
        query: _joi.default.object().keys({
          perPage: _joi.default.number().min(0).default(20),
          page: _joi.default.number().min(0).default(1),
          type: _joi.default.array().items(_joi.default.string()).single().required(),
          search: _joi.default.string().allow('').optional(),
          defaultSearchOperator: _joi.default.string().valid('OR', 'AND').default('OR'),
          sortField: _joi.default.string(),
          hasReference: _joi.default.object().keys({
            type: _joi.default.string().required(),
            id: _joi.default.string().required()
          }).optional(),
          fields: _joi.default.array().items(_joi.default.string()).single()
        }).default()
      }
    },

    async handler(request) {
      const searchFields = new Set();
      const searchTypes = request.query.type;
      const savedObjectsClient = request.getSavedObjectsClient();
      const savedObjectsManagement = server.getSavedObjectsManagement();
      const importAndExportableTypes = searchTypes.filter(type => savedObjectsManagement.isImportAndExportable(type)); // Accumulate "defaultSearchField" attributes from savedObjectsManagement. Unfortunately
      // search fields apply to all types of saved objects, the sum of these fields will
      // be searched on for each object.

      for (const type of importAndExportableTypes) {
        const searchField = savedObjectsManagement.getDefaultSearchField(type);

        if (searchField) {
          searchFields.add(searchField);
        }
      }

      const findResponse = await savedObjectsClient.find({ ...request.query,
        fields: undefined,
        searchFields: [...searchFields]
      });
      return { ...findResponse,
        saved_objects: findResponse.saved_objects.map(obj => (0, _inject_meta_attributes.injectMetaAttributes)(obj, savedObjectsManagement)).map(obj => {
          const result = { ...obj,
            attributes: {}
          };

          for (const field of request.query.fields || []) {
            result.attributes[field] = obj.attributes[field];
          }

          return result;
        })
      };
    }

  });
}