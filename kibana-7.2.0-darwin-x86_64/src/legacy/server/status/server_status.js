"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var states = _interopRequireWildcard(require("./states"));

var _status = _interopRequireDefault(require("./status"));

var _package_json = require("../../utils/package_json");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
class ServerStatus {
  constructor(server) {
    this.server = server;
    this._created = {};
  }

  create(id) {
    const status = new _status.default(id, this.server);
    this._created[status.id] = status;
    return status;
  }

  createForPlugin(plugin) {
    if (plugin.version === 'kibana') plugin.version = _package_json.pkg.version;
    const status = this.create(`plugin:${plugin.id}@${plugin.version}`);
    status.plugin = plugin;
    return status;
  }

  each(fn) {
    const self = this;

    _lodash.default.forOwn(self._created, function (status, i, list) {
      if (status.state !== 'disabled') {
        fn.call(self, status, i, list);
      }
    });
  }

  get(id) {
    return this._created[id];
  }

  getForPluginId(pluginId) {
    return _lodash.default.find(this._created, s => s.plugin && s.plugin.id === pluginId);
  }

  getState(id) {
    const status = this.get(id);
    if (!status) return undefined;
    return status.state || 'uninitialized';
  }

  getStateForPluginId(pluginId) {
    const status = this.getForPluginId(pluginId);
    if (!status) return undefined;
    return status.state || 'uninitialized';
  }

  overall() {
    const state = Object // take all created status objects
    .values(this._created) // get the state descriptor for each status
    .map(status => states.get(status.state)) // reduce to the state with the highest severity, defaulting to green
    .reduce((a, b) => a.severity > b.severity ? a : b, states.get('green'));

    const statuses = _lodash.default.where(this._created, {
      state: state.id
    });

    const since = _lodash.default.get(_lodash.default.sortBy(statuses, 'since'), [0, 'since']);

    return {
      state: state.id,
      title: state.title,
      nickname: _lodash.default.sample(state.nicknames),
      icon: state.icon,
      uiColor: states.get(state.id).uiColor,
      since: since
    };
  }

  isGreen() {
    return this.overall().state === 'green';
  }

  notGreen() {
    return !this.isGreen();
  }

  toString() {
    const overall = this.overall();
    return `${overall.title} – ${overall.nickname}`;
  }

  toJSON() {
    return {
      overall: this.overall(),
      statuses: _lodash.default.values(this._created)
    };
  }

}

exports.default = ServerStatus;
module.exports = exports.default;