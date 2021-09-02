"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.initChromeControlsApi = initChromeControlsApi;

var Rx = _interopRequireWildcard(require("rxjs"));

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
var newPlatformChrome;

function __newPlatformSetup__(instance) {
  if (newPlatformChrome) {
    throw new Error('ui/chrome/api/controls is already initialized');
  }

  newPlatformChrome = instance;
}

function initChromeControlsApi(chrome) {
  // cache of chrome visibility state
  var visible$ = new Rx.BehaviorSubject(false);
  newPlatformChrome.getIsVisible$().subscribe(visible$);
  /**
   * Set the temporary visibility for the chrome. This does nothing if the chrome is hidden
   * by default and should be used to hide the chrome for things like full-screen modes
   * with an exit button.
   */

  chrome.setVisible = function (visibility) {
    newPlatformChrome.setIsVisible(visibility);
    return chrome;
  };
  /**
   * Get the current visibility state of the chrome. Note that this drives the UI so it
   * might be incorrect in the moments just before the UI is updated.
   */


  chrome.getVisible = function () {
    return visible$.getValue();
  };
}