"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.initBreadcrumbsApi = initBreadcrumbsApi;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    throw new Error('ui/chrome/api/breadcrumbs is already initialized');
  }

  newPlatformChrome = instance;
}

function createBreadcrumbsApi(chrome) {
  var currentBreadcrumbs = []; // reset breadcrumbSetSinceRouteChange any time the breadcrumbs change, even
  // if it was done directly through the new platform

  newPlatformChrome.getBreadcrumbs$().subscribe({
    next: function next(nextBreadcrumbs) {
      currentBreadcrumbs = nextBreadcrumbs;
    }
  });
  return {
    breadcrumbs: {
      /**
       * Get an observerable that emits the current list of breadcrumbs
       * and emits each update to the breadcrumbs
       */
      get$: function get$() {
        return newPlatformChrome.getBreadcrumbs$();
      },

      /**
       * Replace the set of breadcrumbs with a new set
       */
      set: function set(newBreadcrumbs) {
        newPlatformChrome.setBreadcrumbs(newBreadcrumbs);
      },

      /**
       * Add a breadcrumb to the end of the list of breadcrumbs
       */
      push: function push(breadcrumb) {
        newPlatformChrome.setBreadcrumbs([].concat(_toConsumableArray(currentBreadcrumbs), [breadcrumb]));
      },

      /**
       * Filter the current set of breadcrumbs with a function. Works like Array#filter()
       */
      filter: function filter(fn) {
        newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.filter(fn));
      },

      /**
       * Remove last element of the breadcrumb
       */
      pop: function pop() {
        newPlatformChrome.setBreadcrumbs(currentBreadcrumbs.slice(0, -1));
      }
    }
  };
}

function initBreadcrumbsApi(chrome, internals) {
  var _createBreadcrumbsApi = createBreadcrumbsApi(chrome),
      breadcrumbs = _createBreadcrumbsApi.breadcrumbs;

  chrome.breadcrumbs = breadcrumbs;
}