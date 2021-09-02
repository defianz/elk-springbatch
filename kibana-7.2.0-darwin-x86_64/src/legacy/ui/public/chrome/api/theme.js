"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.initChromeThemeApi = initChromeThemeApi;

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
    throw new Error('ui/chrome/api/theme is already initialized');
  }

  newPlatformChrome = instance;
}

function initChromeThemeApi(chrome) {
  var brandCache$ = new Rx.BehaviorSubject({});
  newPlatformChrome.getBrand$().subscribe(brandCache$);
  var applicationClassesCache$ = new Rx.BehaviorSubject([]);
  newPlatformChrome.getApplicationClasses$().subscribe(applicationClassesCache$);

  chrome.setBrand = function (brand) {
    newPlatformChrome.setBrand(brand);
    return chrome;
  };

  chrome.getBrand = function (key) {
    return brandCache$.getValue()[key];
  };

  chrome.addApplicationClass = function () {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (typeof classNames === 'string') {
      classNames = [classNames];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = classNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;
        newPlatformChrome.addApplicationClass(className);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return chrome;
  };

  chrome.removeApplicationClass = function (classNames) {
    if (typeof classNames === 'string') {
      classNames = [classNames];
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = classNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var className = _step2.value;
        newPlatformChrome.removeApplicationClass(className);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return chrome;
  };

  chrome.getApplicationClasses = function () {
    return applicationClassesCache$.getValue().join(' ');
  };
}