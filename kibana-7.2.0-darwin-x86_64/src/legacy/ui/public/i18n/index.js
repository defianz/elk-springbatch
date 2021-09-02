"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.wrapInI18nContext = wrapInI18nContext;
exports.I18nContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _angular = require("@kbn/i18n/angular");

var _modules = require("ui/modules");

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
// @ts-ignore
var I18nContext = null;
exports.I18nContext = I18nContext;

function __newPlatformSetup__(context) {
  if (I18nContext) {
    throw new Error('ui/i18n already initialized with new platform apis');
  }

  exports.I18nContext = I18nContext = context;
}

function wrapInI18nContext(ComponentToWrap) {
  var ContextWrapper = function ContextWrapper(props) {
    return _react.default.createElement(I18nContext, null, _react.default.createElement(ComponentToWrap, props));
  }; // Original propTypes from the wrapped component should be re-exposed
  // since it will be used by reactDirective Angular service
  // that will rely on propTypes to watch attributes with these names


  ContextWrapper.propTypes = ComponentToWrap.propTypes;
  return ContextWrapper;
}

_modules.uiModules.get('i18n').provider('i18n', _angular.I18nProvider).filter('i18n', _angular.i18nFilter).directive('i18nId', _angular.i18nDirective);