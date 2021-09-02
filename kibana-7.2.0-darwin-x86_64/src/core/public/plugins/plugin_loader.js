"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPluginBundle = exports.LOAD_TIMEOUT = void 0;

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

/**
 * Unknown variant for internal use only for when plugins are not known.
 * @internal
 */

/**
 * Custom window type for loading bundles. Do not extend global Window to avoid leaking these types.
 * @internal
 */

/**
 * Timeout for loading a single script in milliseconds.
 * @internal
 */
var LOAD_TIMEOUT = 120 * 1000; // 2 minutes

/**
 * Loads the bundle for a plugin onto the page and returns their PluginInitializer. This should
 * be called for all plugins (once per plugin) in parallel using Promise.all.
 *
 * If this is slowing down browser load time, there are some ways we could make this faster:
 *    - Add these bundles in the generated bootstrap.js file so they're loaded immediately
 *    - Concatenate all the bundles files on the backend and serve them in single request.
 *    - Use HTTP/2 to load these bundles without having to open new connections for each.
 *
 * This may not be much of an issue since these should be cached by the browser after the first
 * page load.
 *
 * @param basePath
 * @param plugins
 * @internal
 */

exports.LOAD_TIMEOUT = LOAD_TIMEOUT;

var loadPluginBundle = function loadPluginBundle(addBasePath, pluginName) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$timeoutMs = _ref.timeoutMs,
      timeoutMs = _ref$timeoutMs === void 0 ? LOAD_TIMEOUT : _ref$timeoutMs;

  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    var coreWindow = window; // Assumes that all plugin bundles get put into the bundles/plugins subdirectory

    var bundlePath = addBasePath("/bundles/plugin/".concat(pluginName, ".bundle.js"));
    script.setAttribute('src', bundlePath);
    script.setAttribute('id', "kbn-plugin-".concat(pluginName));
    script.setAttribute('async', ''); // Add kbnNonce for CSP

    script.setAttribute('nonce', coreWindow.__kbnNonce__);

    var cleanupTag = function cleanupTag() {
      clearTimeout(timeout); // Set to null for IE memory leak issue. Webpack does the same thing.
      // @ts-ignore

      script.onload = script.onerror = null;
    }; // Wire up resolve and reject


    script.onload = function () {
      cleanupTag();

      var initializer = coreWindow.__kbnBundles__["plugin/".concat(pluginName)];

      if (!initializer || typeof initializer !== 'function') {
        reject(new Error("Definition of plugin \"".concat(pluginName, "\" should be a function (").concat(bundlePath, ").")));
      } else {
        resolve(initializer);
      }
    };

    script.onerror = function () {
      cleanupTag();
      reject(new Error("Failed to load \"".concat(pluginName, "\" bundle (").concat(bundlePath, ")")));
    };

    var timeout = setTimeout(function () {
      cleanupTag();
      reject(new Error("Timeout reached when loading \"".concat(pluginName, "\" bundle (").concat(bundlePath, ")")));
    }, timeoutMs); // Add the script tag to the end of the body to start downloading

    document.body.appendChild(script);
  });
};
/**
 * @internal
 */


exports.loadPluginBundle = loadPluginBundle;