"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElasticsearchProxyConfig = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = require("fs");

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _url = _interopRequireDefault(require("url"));

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
const readFile = file => (0, _fs.readFileSync)(file, 'utf8');

const createAgent = legacyConfig => {
  const target = _url.default.parse(_lodash.default.head(legacyConfig.hosts));

  if (!/^https/.test(target.protocol)) return new _http.default.Agent();
  const agentOptions = {};
  const verificationMode = legacyConfig.ssl && legacyConfig.ssl.verificationMode;

  switch (verificationMode) {
    case 'none':
      agentOptions.rejectUnauthorized = false;
      break;

    case 'certificate':
      agentOptions.rejectUnauthorized = true; // by default, NodeJS is checking the server identify

      agentOptions.checkServerIdentity = _lodash.default.noop;
      break;

    case 'full':
      agentOptions.rejectUnauthorized = true;
      break;

    default:
      throw new Error(`Unknown ssl verificationMode: ${verificationMode}`);
  }

  if (legacyConfig.ssl && Array.isArray(legacyConfig.ssl.certificateAuthorities) && legacyConfig.ssl.certificateAuthorities.length > 0) {
    agentOptions.ca = legacyConfig.ssl.certificateAuthorities.map(readFile);
  }

  if (legacyConfig.ssl && legacyConfig.ssl.alwaysPresentCertificate && legacyConfig.ssl.certificate && legacyConfig.ssl.key) {
    agentOptions.cert = readFile(legacyConfig.ssl.certificate);
    agentOptions.key = readFile(legacyConfig.ssl.key);
    agentOptions.passphrase = legacyConfig.ssl.keyPassphrase;
  }

  return new _https.default.Agent(agentOptions);
};

const getElasticsearchProxyConfig = legacyConfig => {
  return {
    timeout: legacyConfig.requestTimeout.asMilliseconds(),
    agent: createAgent(legacyConfig)
  };
};

exports.getElasticsearchProxyConfig = getElasticsearchProxyConfig;