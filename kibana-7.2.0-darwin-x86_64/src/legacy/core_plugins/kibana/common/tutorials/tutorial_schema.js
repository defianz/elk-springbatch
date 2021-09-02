"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _param_types = require("./param_types");

var _tutorial_category = require("./tutorial_category");

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
const dashboardSchema = _joi.default.object({
  id: _joi.default.string().required(),
  // Dashboard saved object id
  linkLabel: _joi.default.string().when('isOverview', {
    is: true,
    then: _joi.default.required()
  }),
  // Is this an Overview / Entry Point dashboard?
  isOverview: _joi.default.boolean().required()
});

const artifactsSchema = _joi.default.object({
  // Fields present in Elasticsearch documents created by this product.
  exportedFields: _joi.default.object({
    documentationUrl: _joi.default.string().required()
  }),
  // Kibana dashboards created by this product.
  dashboards: _joi.default.array().items(dashboardSchema).required(),
  application: _joi.default.object({
    path: _joi.default.string().required(),
    label: _joi.default.string().required()
  })
});

const statusCheckSchema = _joi.default.object({
  title: _joi.default.string(),
  text: _joi.default.string(),
  btnLabel: _joi.default.string(),
  success: _joi.default.string(),
  error: _joi.default.string(),
  esHitsCheck: _joi.default.object({
    index: _joi.default.string().required(),
    query: _joi.default.object().required()
  }).required()
});

const instructionSchema = _joi.default.object({
  title: _joi.default.string(),
  textPre: _joi.default.string(),
  commands: _joi.default.array().items(_joi.default.string().allow('')),
  textPost: _joi.default.string()
});

const instructionVariantSchema = _joi.default.object({
  id: _joi.default.string().required(),
  instructions: _joi.default.array().items(instructionSchema).required()
});

const instructionSetSchema = _joi.default.object({
  title: _joi.default.string(),
  // Variants (OSes, languages, etc.) for which tutorial instructions are specified.
  instructionVariants: _joi.default.array().items(instructionVariantSchema).required(),
  statusCheck: statusCheckSchema
});

const paramSchema = _joi.default.object({
  defaultValue: _joi.default.required(),
  id: _joi.default.string().regex(/^[a-zA-Z_]+$/).required(),
  label: _joi.default.string().required(),
  type: _joi.default.string().valid(Object.values(_param_types.PARAM_TYPES)).required()
});

const instructionsSchema = _joi.default.object({
  instructionSets: _joi.default.array().items(instructionSetSchema).required(),
  params: _joi.default.array().items(paramSchema)
});

const tutorialSchema = {
  id: _joi.default.string().regex(/^[a-zA-Z0-9-]+$/).required(),
  category: _joi.default.string().valid(Object.values(_tutorial_category.TUTORIAL_CATEGORY)).required(),
  name: _joi.default.string().required(),
  isBeta: _joi.default.boolean().default(false),
  shortDescription: _joi.default.string().required(),
  euiIconType: _joi.default.string(),
  //EUI icon type string, one of https://elastic.github.io/eui/#/icons
  longDescription: _joi.default.string().required(),
  completionTimeMinutes: _joi.default.number().integer(),
  previewImagePath: _joi.default.string(),
  // kibana and elastic cluster running on prem
  onPrem: instructionsSchema.required(),
  // kibana and elastic cluster running in elastic's cloud
  elasticCloud: instructionsSchema,
  // kibana running on prem and elastic cluster running in elastic's cloud
  onPremElasticCloud: instructionsSchema,
  // Elastic stack artifacts produced by product when it is setup and run.
  artifacts: artifactsSchema,
  // saved objects used by data module.
  savedObjects: _joi.default.array().items(),
  savedObjectsInstallMsg: _joi.default.string()
};
exports.tutorialSchema = tutorialSchema;