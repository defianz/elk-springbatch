"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchema = getSchema;
exports.getStubSchema = getStubSchema;

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
const STUB_CONFIG_SCHEMA = _joi.default.object().keys({
  enabled: _joi.default.valid(false).default(false)
}).default();

const DEFAULT_CONFIG_SCHEMA = _joi.default.object().keys({
  enabled: _joi.default.boolean().default(true)
}).default();
/**
 *  Get the config schema for a plugin spec
 *  @param  {PluginSpec} spec
 *  @return {Promise<Joi>}
 */


async function getSchema(spec) {
  const provider = spec.getConfigSchemaProvider();
  return provider && (await provider(_joi.default)) || DEFAULT_CONFIG_SCHEMA;
}

function getStubSchema() {
  return STUB_CONFIG_SCHEMA;
}