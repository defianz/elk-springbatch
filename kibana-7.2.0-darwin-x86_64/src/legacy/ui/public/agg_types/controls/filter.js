"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterRow = FilterRow;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FilterRow(_ref) {
  var id = _ref.id,
      arrayIndex = _ref.arrayIndex,
      customLabel = _ref.customLabel,
      value = _ref.value,
      autoFocus = _ref.autoFocus,
      disableRemove = _ref.disableRemove,
      dataTestSubj = _ref.dataTestSubj,
      onChangeValue = _ref.onChangeValue,
      onRemoveFilter = _ref.onRemoveFilter;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showCustomLabel = _useState2[0],
      setShowCustomLabel = _useState2[1];

  var filterLabel = _i18n.i18n.translate('common.ui.aggTypes.filters.filterLabel', {
    defaultMessage: 'Filter {index}',
    values: {
      index: arrayIndex + 1
    }
  });

  var FilterControl = _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "tag",
    "aria-label": _i18n.i18n.translate('common.ui.aggTypes.filters.toggleFilterButtonAriaLabel', {
      defaultMessage: 'Toggle filter label'
    }),
    "aria-expanded": showCustomLabel,
    "aria-controls": "visEditorFilterLabel".concat(arrayIndex),
    onClick: function onClick() {
      return setShowCustomLabel(!showCustomLabel);
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "trash",
    color: "danger",
    disabled: disableRemove,
    "aria-label": _i18n.i18n.translate('common.ui.aggTypes.filters.removeFilterButtonAriaLabel', {
      defaultMessage: 'Remove this filter'
    }),
    onClick: function onClick() {
      return onRemoveFilter(id);
    }
  })));

  return _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    label: "".concat(filterLabel).concat(customLabel ? " - ".concat(customLabel) : ''),
    labelAppend: FilterControl,
    fullWidth: true,
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: value,
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.filters.filterPlaceholder', {
      defaultMessage: 'Lucene or Query DSL'
    }),
    "data-test-subj": dataTestSubj,
    onChange: function onChange(ev) {
      return onChangeValue(id, ev.target.value, customLabel);
    },
    fullWidth: true,
    autoFocus: autoFocus
  })), showCustomLabel ? _react.default.createElement(_eui.EuiFormRow, {
    id: "visEditorFilterLabel".concat(arrayIndex),
    label: _i18n.i18n.translate('common.ui.aggTypes.filters.definiteFilterLabel', {
      defaultMessage: 'Filter {index} label',
      description: "'Filter {index}' represents the name of the filter as a noun, similar to 'label for filter 1'.",
      values: {
        index: arrayIndex + 1
      }
    }),
    fullWidth: true,
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: customLabel,
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.filters.labelPlaceholder', {
      defaultMessage: 'Label'
    }),
    onChange: function onChange(ev) {
      return onChangeValue(id, value, ev.target.value);
    },
    fullWidth: true
  })) : null);
}