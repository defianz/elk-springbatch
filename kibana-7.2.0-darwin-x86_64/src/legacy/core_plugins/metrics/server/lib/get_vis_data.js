"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _get_panel_data = _interopRequireDefault(require("./vis_data/get_panel_data"));

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
function getVisData(req) {
  const promises = req.payload.panels.map((0, _get_panel_data.default)(req));
  return Promise.all(promises).then(res => {
    return res.reduce((acc, data) => {
      return _lodash.default.assign(acc, data);
    }, {});
  });
}

var _default = getVisData;
exports.default = _default;
module.exports = exports.default;