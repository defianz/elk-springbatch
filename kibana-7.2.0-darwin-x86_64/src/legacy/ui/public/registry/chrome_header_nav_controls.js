"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromeHeaderNavControlsRegistry = void 0;

var _registry = require("./_registry");

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
var chromeHeaderNavControlsRegistry = (0, _registry.uiRegistry)({
  name: 'chromeHeaderNavControls',
  order: ['order'],
  group: ['side']
});
exports.chromeHeaderNavControlsRegistry = chromeHeaderNavControlsRegistry;