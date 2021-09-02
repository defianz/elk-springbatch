"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dispatchRenderComplete: true,
  dispatchRenderStart: true
};
exports.dispatchRenderComplete = dispatchRenderComplete;
exports.dispatchRenderStart = dispatchRenderStart;

require("./directive");

var _render_complete_helper = require("./render_complete_helper");

Object.keys(_render_complete_helper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _render_complete_helper[key];
    }
  });
});

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
var dispatchCustomEvent = function dispatchCustomEvent(el, eventName) {
  // we're using the native events so that we aren't tied to the jQuery custom events,
  // otherwise we have to use jQuery(element).on(...) because jQuery's events sit on top
  // of the native events per https://github.com/jquery/jquery/issues/2476
  el.dispatchEvent(new CustomEvent(eventName, {
    bubbles: true
  }));
};

function dispatchRenderComplete(el) {
  dispatchCustomEvent(el, 'renderComplete');
}

function dispatchRenderStart(el) {
  dispatchCustomEvent(el, 'renderStart');
}