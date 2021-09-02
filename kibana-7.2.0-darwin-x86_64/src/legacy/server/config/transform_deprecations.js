"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDeprecations = void 0;

var _lodash = _interopRequireWildcard(require("lodash"));

var _deprecation = require("../../deprecation");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
const {
  rename,
  unused
} = _deprecation.Deprecations;

const savedObjectsIndexCheckTimeout = (settings, log) => {
  if (_lodash.default.has(settings, 'savedObjects.indexCheckTimeout')) {
    log('savedObjects.indexCheckTimeout is no longer necessary.');

    if (Object.keys(settings.savedObjects).length > 1) {
      delete settings.savedObjects.indexCheckTimeout;
    } else {
      delete settings.savedObjects;
    }
  }
};

const rewriteBasePath = (settings, log) => {
  if (_lodash.default.has(settings, 'server.basePath') && !_lodash.default.has(settings, 'server.rewriteBasePath')) {
    log('You should set server.basePath along with server.rewriteBasePath. Starting in 7.0, Kibana ' + 'will expect that all requests start with server.basePath rather than expecting you to rewrite ' + 'the requests in your reverse proxy. Set server.rewriteBasePath to false to preserve the ' + 'current behavior and silence this warning.');
  }
};

const loggingTimezone = (settings, log) => {
  if (_lodash.default.has(settings, 'logging.useUTC')) {
    const timezone = settings.logging.useUTC ? 'UTC' : false;
    (0, _lodash.set)('logging.timezone', timezone);
    (0, _utils.unset)(settings, 'logging.useUTC');
    log(`Config key "logging.useUTC" is deprecated. It has been replaced with "logging.timezone"`);
  }
};

const configPath = (settings, log) => {
  if (_lodash.default.has(process, 'env.CONFIG_PATH')) {
    log(`Environment variable CONFIG_PATH is deprecated. It has been replaced with KIBANA_PATH_CONF pointing to a config folder`);
  }
};

const dataPath = (settings, log) => {
  if (_lodash.default.has(process, 'env.DATA_PATH')) {
    log(`Environment variable "DATA_PATH" will be removed.  It has been replaced with kibana.yml setting "path.data"`);
  }
};

const deprecations = [//server
unused('server.xsrf.token'), unused('uiSettings.enabled'), rename('optimize.lazy', 'optimize.watch'), rename('optimize.lazyPort', 'optimize.watchPort'), rename('optimize.lazyHost', 'optimize.watchHost'), rename('optimize.lazyPrebuild', 'optimize.watchPrebuild'), rename('optimize.lazyProxyTimeout', 'optimize.watchProxyTimeout'), savedObjectsIndexCheckTimeout, rewriteBasePath, loggingTimezone, configPath, dataPath];
const transformDeprecations = (0, _deprecation.createTransform)(deprecations);
exports.transformDeprecations = transformDeprecations;