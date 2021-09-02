"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER_OPERATORS = exports.doesNotExistOperator = exports.existsOperator = exports.isNotBetweenOperator = exports.isBetweenOperator = exports.isNotOneOfOperator = exports.isOneOfOperator = exports.isNotOperator = exports.isOperator = void 0;

var _i18n = require("@kbn/i18n");

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
var isOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isOperatorOptionLabel', {
    defaultMessage: 'is'
  }),
  type: 'phrase',
  negate: false
};
exports.isOperator = isOperator;
var isNotOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isNotOperatorOptionLabel', {
    defaultMessage: 'is not'
  }),
  type: 'phrase',
  negate: true
};
exports.isNotOperator = isNotOperator;
var isOneOfOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isOneOfOperatorOptionLabel', {
    defaultMessage: 'is one of'
  }),
  type: 'phrases',
  negate: false,
  fieldTypes: ['string', 'number', 'date', 'ip', 'geo_point', 'geo_shape']
};
exports.isOneOfOperator = isOneOfOperator;
var isNotOneOfOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isNotOneOfOperatorOptionLabel', {
    defaultMessage: 'is not one of'
  }),
  type: 'phrases',
  negate: true,
  fieldTypes: ['string', 'number', 'date', 'ip', 'geo_point', 'geo_shape']
};
exports.isNotOneOfOperator = isNotOneOfOperator;
var isBetweenOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isBetweenOperatorOptionLabel', {
    defaultMessage: 'is between'
  }),
  type: 'range',
  negate: false,
  fieldTypes: ['number', 'date', 'ip']
};
exports.isBetweenOperator = isBetweenOperator;
var isNotBetweenOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.isNotBetweenOperatorOptionLabel', {
    defaultMessage: 'is not between'
  }),
  type: 'range',
  negate: true,
  fieldTypes: ['number', 'date', 'ip']
};
exports.isNotBetweenOperator = isNotBetweenOperator;
var existsOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.existsOperatorOptionLabel', {
    defaultMessage: 'exists'
  }),
  type: 'exists',
  negate: false
};
exports.existsOperator = existsOperator;
var doesNotExistOperator = {
  message: _i18n.i18n.translate('common.ui.filterEditor.doesNotExistOperatorOptionLabel', {
    defaultMessage: 'does not exist'
  }),
  type: 'exists',
  negate: true
};
exports.doesNotExistOperator = doesNotExistOperator;
var FILTER_OPERATORS = [isOperator, isNotOperator, isOneOfOperator, isNotOneOfOperator, isBetweenOperator, isNotBetweenOperator, existsOperator, doesNotExistOperator];
exports.FILTER_OPERATORS = FILTER_OPERATORS;