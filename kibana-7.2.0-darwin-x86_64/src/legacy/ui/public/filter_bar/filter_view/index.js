"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterDisplayText = getFilterDisplayText;
exports.FilterView = void 0;

var _eui = require("@elastic/eui");

var _esQuery = require("@kbn/es-query");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _filter_operators = require("ui/filter_bar/filter_editor/lib/filter_operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FilterView = function FilterView(_ref) {
  var filter = _ref.filter,
      rest = _objectWithoutProperties(_ref, ["filter"]);

  var title = "Filter: ".concat(getFilterDisplayText(filter), ". ").concat(_i18n.i18n.translate('common.ui.filterBar.moreFilterActionsMessage', {
    defaultMessage: 'Select for more filter actions.'
  }));

  if ((0, _esQuery.isFilterPinned)(filter)) {
    title = "".concat(_i18n.i18n.translate('common.ui.filterBar.pinnedFilterPrefix', {
      defaultMessage: 'Pinned'
    }), " ").concat(title);
  }

  if (filter.meta.disabled) {
    title = "".concat(_i18n.i18n.translate('common.ui.filterBar.disabledFilterPrefix', {
      defaultMessage: 'Disabled'
    }), " ").concat(title);
  }

  return _react.default.createElement(_eui.EuiBadge, _extends({
    title: title,
    iconType: "cross" // @ts-ignore
    ,
    iconSide: "right",
    closeButtonProps: {
      // Removing tab focus on close button because the same option can be optained through the context menu
      // Also, we may want to add a `DEL` keyboard press functionality
      tabIndex: '-1'
    },
    iconOnClickAriaLabel: _i18n.i18n.translate('common.ui.filterBar.filterItemBadgeIconAriaLabel', {
      defaultMessage: 'Delete'
    }),
    onClickAriaLabel: _i18n.i18n.translate('common.ui.filterBar.filterItemBadgeAriaLabel', {
      defaultMessage: 'Filter actions'
    })
  }, rest), _react.default.createElement("span", null, getFilterDisplayText(filter)));
};

exports.FilterView = FilterView;

function getFilterDisplayText(filter) {
  var prefix = filter.meta.negate ? " ".concat(_i18n.i18n.translate('common.ui.filterBar.negatedFilterPrefix', {
    defaultMessage: 'NOT '
  })) : '';

  if (filter.meta.alias !== null) {
    return "".concat(prefix).concat(filter.meta.alias);
  }

  switch (filter.meta.type) {
    case 'exists':
      return "".concat(prefix).concat(filter.meta.key, " ").concat(_filter_operators.existsOperator.message);

    case 'geo_bounding_box':
      return "".concat(prefix).concat(filter.meta.key, ": ").concat(filter.meta.value);

    case 'geo_polygon':
      return "".concat(prefix).concat(filter.meta.key, ": ").concat(filter.meta.value);

    case 'phrase':
      return "".concat(prefix).concat(filter.meta.key, ": ").concat(filter.meta.value);

    case 'phrases':
      return "".concat(prefix).concat(filter.meta.key, " ").concat(_filter_operators.isOneOfOperator.message, " ").concat(filter.meta.value);

    case 'query_string':
      return "".concat(prefix).concat(filter.meta.value);

    case 'range':
      return "".concat(prefix).concat(filter.meta.key, ": ").concat(filter.meta.value);

    default:
      return "".concat(prefix).concat(JSON.stringify(filter.query));
  }
}