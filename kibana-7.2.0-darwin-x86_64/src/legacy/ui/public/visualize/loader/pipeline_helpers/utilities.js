"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableAggs = exports.getFormat = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _field_format = require("../../../../field_formats/field_format");

var _get_columns = require("../../../agg_response/tabify/_get_columns");

var _chrome = _interopRequireDefault(require("../../../chrome"));

var _field_formats = require("../../../registry/field_formats");

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
// @ts-ignore
// @ts-ignore
var config = _chrome.default.getUiSettingsClient();

var getConfig = function getConfig() {
  return config.get.apply(config, arguments);
};

var getDefaultFieldFormat = function getDefaultFieldFormat() {
  return {
    convert: _lodash.identity
  };
};

var getFieldFormat = function getFieldFormat(id, params) {
  var Format = _field_formats.fieldFormats.byId[id];

  if (Format) {
    return new Format(params, getConfig);
  } else {
    return getDefaultFieldFormat();
  }
};

var getFormat = function getFormat(mapping) {
  if (!mapping) {
    return getDefaultFieldFormat();
  }

  var id = mapping.id;

  if (id === 'range') {
    var RangeFormat = _field_format.FieldFormat.from(function (range) {
      var format = getFieldFormat(id, mapping.params);
      return _i18n.i18n.translate('common.ui.aggTypes.buckets.ranges.rangesFormatMessage', {
        defaultMessage: '{from} to {to}',
        values: {
          from: format.convert(range.gte),
          to: format.convert(range.lt)
        }
      });
    });

    return new RangeFormat();
  } else if (id === 'terms') {
    return {
      getConverterFor: function getConverterFor(type) {
        var format = getFieldFormat(mapping.params.id, mapping.params);
        return function (val) {
          if (val === '__other__') {
            return mapping.params.otherBucketLabel;
          }

          if (val === '__missing__') {
            return mapping.params.missingBucketLabel;
          }

          var parsedUrl = {
            origin: window.location.origin,
            pathname: window.location.pathname,
            basePath: _chrome.default.getBasePath()
          };
          return format.convert(val, undefined, undefined, parsedUrl);
        };
      },
      convert: function convert(val, type) {
        var format = getFieldFormat(mapping.params.id, mapping.params);

        if (val === '__other__') {
          return mapping.params.otherBucketLabel;
        }

        if (val === '__missing__') {
          return mapping.params.missingBucketLabel;
        }

        var parsedUrl = {
          origin: window.location.origin,
          pathname: window.location.pathname,
          basePath: _chrome.default.getBasePath()
        };
        return format.convert(val, type, undefined, parsedUrl);
      }
    };
  } else {
    return getFieldFormat(id, mapping.params);
  }
};

exports.getFormat = getFormat;

var getTableAggs = function getTableAggs(vis) {
  if (!vis.aggs || !vis.aggs.getResponseAggs) {
    return [];
  }

  var columns = (0, _get_columns.tabifyGetColumns)(vis.aggs.getResponseAggs(), !vis.isHierarchical());
  return columns.map(function (c) {
    return c.aggConfig;
  });
};

exports.getTableAggs = getTableAggs;