"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformStart__ = __newPlatformStart__;
Object.defineProperty(exports, "UICapabilities", {
  enumerable: true,
  get: function get() {
    return _public.Capabilities;
  }
});
exports.capabilities = void 0;

var _public = require("../../../../core/public");

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
var uiCapabilities;

function __newPlatformStart__(capabilities) {
  if (uiCapabilities) {
    throw new Error('ui/capabilities already initialized with new platform apis');
  }

  uiCapabilities = capabilities;
}

var capabilities = {
  get: function get() {
    if (!uiCapabilities) {
      throw new Error("UI Capabilities are only available in the legacy platform once Angular has booted.");
    }

    return uiCapabilities;
  }
};
exports.capabilities = capabilities;