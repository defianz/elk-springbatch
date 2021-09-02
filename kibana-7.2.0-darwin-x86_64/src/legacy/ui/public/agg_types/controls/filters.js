"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiltersParamEditor = FiltersParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _data = require("plugins/data");

var _filter = require("./filter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _data$query$helpers = _data.data.query.helpers,
    toUser = _data$query$helpers.toUser,
    fromUser = _data$query$helpers.fromUser;
var generateId = (0, _eui.htmlIdGenerator)();

function FiltersParamEditor(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      setValue = _ref.setValue;

  var _useState = (0, _react.useState)(function () {
    return value.map(function (filter) {
      return _objectSpread({}, filter, {
        id: generateId()
      });
    });
  }),
      _useState2 = _slicedToArray(_useState, 2),
      filters = _useState2[0],
      setFilters = _useState2[1];

  (0, _react.useEffect)(function () {
    // set parsed values into model after initialization
    setValue(filters.map(function (filter) {
      return (0, _lodash.omit)(_objectSpread({}, filter, {
        input: {
          query: fromUser(filter.input.query)
        }
      }), 'id');
    }));
  }, []);
  (0, _react.useEffect)(function () {
    // responsible for discarding changes
    if (value.length !== filters.length || value.some(function (filter, index) {
      return !(0, _lodash.isEqual)(filter, (0, _lodash.omit)(filters[index], 'id'));
    })) {
      setFilters(value.map(function (filter) {
        return _objectSpread({}, filter, {
          id: generateId()
        });
      }));
    }
  }, [value]);

  var updateFilters = function updateFilters(updatedFilters) {
    // do not set internal id parameter into saved object
    setValue(updatedFilters.map(function (filter) {
      return (0, _lodash.omit)(filter, 'id');
    }));
    setFilters(updatedFilters);
  };

  var onAddFilter = function onAddFilter() {
    return updateFilters([].concat(_toConsumableArray(filters), [{
      input: {
        query: ''
      },
      label: '',
      id: generateId()
    }]));
  };

  var onRemoveFilter = function onRemoveFilter(id) {
    return updateFilters(filters.filter(function (filter) {
      return filter.id !== id;
    }));
  };

  var onChangeValue = function onChangeValue(id, query, label) {
    return updateFilters(filters.map(function (filter) {
      return filter.id === id ? _objectSpread({}, filter, {
        input: {
          query: fromUser(query)
        },
        label: label
      }) : filter;
    }));
  };

  return _react.default.createElement(_react.default.Fragment, null, filters.map(function (_ref2, arrayIndex) {
    var input = _ref2.input,
        label = _ref2.label,
        id = _ref2.id;
    return _react.default.createElement(_filter.FilterRow, {
      key: id,
      id: id,
      arrayIndex: arrayIndex,
      customLabel: label,
      value: toUser(input.query),
      autoFocus: arrayIndex === filters.length - 1,
      disableRemove: arrayIndex === 0 && filters.length === 1,
      dataTestSubj: "visEditorFilterInput_".concat(agg.id, "_").concat(arrayIndex),
      onChangeValue: onChangeValue,
      onRemoveFilter: onRemoveFilter
    });
  }), _react.default.createElement(_eui.EuiButton, {
    iconType: "plusInCircle",
    fill: true,
    fullWidth: true,
    onClick: onAddFilter,
    size: "s",
    "data-test-subj": "visEditorAddFilterButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.filters.addFilterButtonLabel",
    defaultMessage: "Add filter"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}