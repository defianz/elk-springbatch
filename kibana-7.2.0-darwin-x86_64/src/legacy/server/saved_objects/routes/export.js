"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExportRoute = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _export = require("../export");

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
const createExportRoute = (prereqs, server, supportedTypes) => ({
  path: '/api/saved_objects/_export',
  method: 'POST',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      payload: _joi.default.object().keys({
        type: _joi.default.array().items(_joi.default.string().valid(supportedTypes)).single().optional(),
        objects: _joi.default.array().items({
          type: _joi.default.string().valid(supportedTypes).required(),
          id: _joi.default.string().required()
        }).max(server.config().get('savedObjects.maxImportExportSize')).optional(),
        includeReferencesDeep: _joi.default.boolean().default(false)
      }).xor('type', 'objects').default()
    },

    async handler(request, h) {
      const {
        savedObjectsClient
      } = request.pre;
      const docsToExport = await (0, _export.getSortedObjectsForExport)({
        savedObjectsClient,
        types: request.payload.type,
        objects: request.payload.objects,
        exportSizeLimit: server.config().get('savedObjects.maxImportExportSize'),
        includeReferencesDeep: request.payload.includeReferencesDeep
      });
      return h.response(docsToExport.map(doc => (0, _jsonStableStringify.default)(doc)).join('\n')).header('Content-Disposition', `attachment; filename="export.ndjson"`).header('Content-Type', 'application/ndjson');
    }

  }
});

exports.createExportRoute = createExportRoute;