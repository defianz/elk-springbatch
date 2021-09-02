"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeIntervalParamEditor = TimeIntervalParamEditor;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _utils = require("../utils");

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
function TimeIntervalParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      editorConfig = _ref.editorConfig,
      value = _ref.value,
      setValue = _ref.setValue,
      showValidation = _ref.showValidation,
      setValidity = _ref.setValidity;
  var timeBase = (0, _lodash.get)(editorConfig, 'interval.timeBase');
  var options = timeBase ? [] : (aggParam.options || []).reduce(function (filtered, option) {
    if (option.enabled ? option.enabled(agg) : true) {
      filtered.push({
        label: option.display,
        key: option.val
      });
    }

    return filtered;
  }, []);
  var selectedOptions = [];
  var definedOption;
  var isValid = false;

  if (value) {
    definedOption = (0, _lodash.find)(options, {
      key: value
    });
    selectedOptions = definedOption ? [definedOption] : [{
      label: value,
      key: 'custom'
    }];
    isValid = !!(definedOption || (0, _utils.isValidInterval)(value, timeBase));
  }

  var interval = (0, _lodash.get)(agg, 'buckets.getInterval') && agg.buckets.getInterval();
  var scaledHelpText = interval && interval.scaled && isValid ? _react.default.createElement("strong", {
    className: "eui-displayBlock"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.timeInterval.scaledHelpText",
    defaultMessage: "Currently scaled to {bucketDescription}",
    values: {
      bucketDescription: (0, _lodash.get)(interval, 'description') || ''
    }
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    type: "questionInCircle",
    content: interval.scale <= 1 ? tooManyBucketsTooltip : tooLargeBucketsTooltip
  })) : null;

  var helpText = _react.default.createElement(_react.default.Fragment, null, scaledHelpText, (0, _lodash.get)(editorConfig, 'interval.help') || selectOptionHelpText);

  var errors = [];

  if (!isValid && value) {
    errors.push(_i18n.i18n.translate('common.ui.aggTypes.timeInterval.invalidFormatErrorMessage', {
      defaultMessage: 'Invalid interval format.'
    }));
  }

  var onCustomInterval = function onCustomInterval(customValue) {
    var normalizedCustomValue = customValue.trim();
    setValue(normalizedCustomValue);

    if (normalizedCustomValue && (0, _utils.isValidInterval)(normalizedCustomValue, timeBase)) {
      agg.write();
    }
  };

  var onChange = function onChange(opts) {
    var selectedOpt = (0, _lodash.get)(opts, '0');
    setValue(selectedOpt ? selectedOpt.key : selectedOpt);

    if (selectedOpt) {
      agg.write();
    }
  };

  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  return _react.default.createElement(_eui.EuiFormRow, {
    className: "visEditorSidebar__aggParamFormRow",
    error: errors,
    fullWidth: true,
    helpText: helpText,
    isInvalid: showValidation ? !isValid : false,
    label: _i18n.i18n.translate('common.ui.aggTypes.timeInterval.minimumIntervalLabel', {
      defaultMessage: 'Minimum interval'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    "data-test-subj": "visEditorInterval",
    isInvalid: showValidation ? !isValid : false,
    noSuggestions: !!timeBase,
    onChange: onChange,
    onCreateOption: onCustomInterval,
    options: options,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.timeInterval.selectIntervalPlaceholder', {
      defaultMessage: 'Select an interval'
    })
  }));
}

var tooManyBucketsTooltip = _react.default.createElement(_react2.FormattedMessage, {
  id: "common.ui.aggTypes.timeInterval.createsTooManyBucketsTooltip",
  defaultMessage: "This interval creates too many buckets to show in the selected time range, so it has been scaled up."
});

var tooLargeBucketsTooltip = _react.default.createElement(_react2.FormattedMessage, {
  id: "common.ui.aggTypes.timeInterval.createsTooLargeBucketsTooltip",
  defaultMessage: "This interval creates buckets that are too large to show in the selected time range, so it has been scaled down."
});

var selectOptionHelpText = _react.default.createElement(_react2.FormattedMessage, {
  id: "common.ui.aggTypes.timeInterval.selectOptionHelpText",
  defaultMessage: "Select an option or create a custom value. Examples: 30s, 20m, 24h, 2d, 1w, 1M"
});