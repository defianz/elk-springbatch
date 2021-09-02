"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notInNodeModules = notInNodeModules;
exports.notInNodeModulesOrWebpackShims = notInNodeModulesOrWebpackShims;
exports.inPluginNodeModules = inPluginNodeModules;
exports.inDllPluginPublic = inDllPluginPublic;

var _path = _interopRequireDefault(require("path"));

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
function notInNodeModules(checkPath) {
  return !checkPath.includes(`${_path.default.sep}node_modules${_path.default.sep}`);
}

function notInNodeModulesOrWebpackShims(checkPath) {
  return notInNodeModules(checkPath) && !checkPath.includes(`${_path.default.sep}webpackShims${_path.default.sep}`);
}

function inPluginNodeModules(checkPath) {
  return checkPath.match(/[\/\\]plugins.*[\/\\]node_modules/);
}

function inDllPluginPublic(checkPath) {
  return checkPath.includes(`${_path.default.sep}dynamic_dll_plugin${_path.default.sep}public${_path.default.sep}`);
}