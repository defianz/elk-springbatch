"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectDefaultVars = exports.replaceInjectedVars = void 0;

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
const replaceInjectedVars = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('injectedVarsReplacers'), _reduce.flatConcatAtType);
exports.replaceInjectedVars = replaceInjectedVars;
const injectDefaultVars = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('defaultInjectedVarProviders'), (0, _modify_reduce.mapSpec)((spec, type, pluginSpec) => ({
  pluginSpec,
  fn: spec
})), _reduce.flatConcatAtType);
exports.injectDefaultVars = injectDefaultVars;