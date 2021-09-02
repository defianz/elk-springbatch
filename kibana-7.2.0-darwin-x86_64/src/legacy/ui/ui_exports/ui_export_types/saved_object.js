"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validations = exports.savedObjectsManagement = exports.savedObjectSchemas = exports.migrations = exports.mappings = void 0;

var _reduce = require("./reduce");

var _modify_reduce = require("./modify_reduce");

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
// mapping types
const mappings = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('savedObjectMappings'), (0, _modify_reduce.mapSpec)((spec, type, pluginSpec) => ({
  pluginId: pluginSpec.getId(),
  properties: spec
})), _reduce.flatConcatAtType);
exports.mappings = mappings;

const pluginId = pluginSpec => pluginSpec.id ? pluginSpec.id() : pluginSpec.getId(); // Combines the `migrations` property of each plugin,
// ensuring that properties are unique across plugins
// and has migrations defined where the mappings are defined.
// See saved_objects/migrations for more details.


const migrations = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('savedObjectMigrations'), next => (acc, spec, type, pluginSpec) => {
  const mappings = pluginSpec.getExportSpecs().mappings || {};
  const invalidMigrationTypes = Object.keys(spec).filter(type => !mappings[type]);

  if (invalidMigrationTypes.length) {
    throw new Error('Migrations and mappings must be defined together in the uiExports of a single plugin. ' + `${pluginId(pluginSpec)} defines migrations for types ${invalidMigrationTypes.join(', ')} but does not define their mappings.`);
  }

  return next(acc, spec, type, pluginSpec);
}, (0, _modify_reduce.uniqueKeys)(), _reduce.mergeAtType);
exports.migrations = migrations;
const savedObjectSchemas = (0, _modify_reduce.wrap)((0, _modify_reduce.uniqueKeys)(), _reduce.mergeAtType);
exports.savedObjectSchemas = savedObjectSchemas;
const savedObjectsManagement = (0, _modify_reduce.wrap)((0, _modify_reduce.uniqueKeys)(), _reduce.mergeAtType); // Combines the `validations` property of each plugin,
// ensuring that properties are unique across plugins.
// See saved_objects/validation for more details.

exports.savedObjectsManagement = savedObjectsManagement;
const validations = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('savedObjectValidations'), (0, _modify_reduce.uniqueKeys)(), _reduce.mergeAtType);
exports.validations = validations;