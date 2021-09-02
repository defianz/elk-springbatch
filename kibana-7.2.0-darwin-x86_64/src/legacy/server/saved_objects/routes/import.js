"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImportRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

var _path = require("path");

var _import = require("../import");

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
const createImportRoute = (prereqs, server, supportedTypes) => ({
  path: '/api/saved_objects/_import',
  method: 'POST',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    payload: {
      maxBytes: server.config().get('savedObjects.maxImportPayloadBytes'),
      output: 'stream',
      allow: 'multipart/form-data'
    },
    validate: {
      query: _joi.default.object().keys({
        overwrite: _joi.default.boolean().default(false)
      }).default(),
      payload: _joi.default.object({
        file: _joi.default.object().required()
      }).default()
    }
  },

  async handler(request, h) {
    const {
      savedObjectsClient
    } = request.pre;
    const {
      filename
    } = request.payload.file.hapi;
    const fileExtension = (0, _path.extname)(filename).toLowerCase();

    if (fileExtension !== '.ndjson') {
      return _boom.default.badRequest(`Invalid file extension ${fileExtension}`);
    }

    return await (0, _import.importSavedObjects)({
      supportedTypes,
      savedObjectsClient,
      readStream: request.payload.file,
      objectLimit: request.server.config().get('savedObjects.maxImportExportSize'),
      overwrite: request.query.overwrite
    });
  }

});

exports.createImportRoute = createImportRoute;