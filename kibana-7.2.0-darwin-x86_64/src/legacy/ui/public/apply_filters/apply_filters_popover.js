"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplyFiltersPopover = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _filter_view = require("../filter_bar/filter_view");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApplyFiltersPopover =
/*#__PURE__*/
function (_Component) {
  _inherits(ApplyFiltersPopover, _Component);

  function ApplyFiltersPopover(props) {
    var _this;

    _classCallCheck(this, ApplyFiltersPopover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplyFiltersPopover).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isFilterSelected", function (i) {
      return _this.state.isFilterSelected[i];
    });

    _defineProperty(_assertThisInitialized(_this), "toggleFilterSelected", function (i) {
      var isFilterSelected = _toConsumableArray(_this.state.isFilterSelected);

      isFilterSelected[i] = !isFilterSelected[i];

      _this.setState({
        isFilterSelected: isFilterSelected
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var selectedFilters = _this.props.filters.filter(function (filter, i) {
        return _this.state.isFilterSelected[i];
      });

      _this.props.onSubmit(selectedFilters);
    });

    _this.state = {
      isFilterSelected: props.filters.map(function () {
        return true;
      })
    };
    return _this;
  }

  _createClass(ApplyFiltersPopover, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.filters.length === 0) {
        return '';
      }

      var form = _react2.default.createElement(_eui.EuiForm, null, this.props.filters.map(function (filter, i) {
        return _react2.default.createElement(_eui.EuiFormRow, {
          key: i
        }, _react2.default.createElement(_eui.EuiSwitch, {
          label: (0, _filter_view.getFilterDisplayText)(filter),
          checked: _this2.isFilterSelected(i),
          onChange: function onChange() {
            return _this2.toggleFilterSelected(i);
          }
        }));
      }));

      return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiModal, {
        onClose: this.props.onCancel
      }, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.applyFilters.popupHeader",
        defaultMessage: "Select filters to apply"
      }))), _react2.default.createElement(_eui.EuiModalBody, null, form), _react2.default.createElement(_eui.EuiModalFooter, null, _react2.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.props.onCancel
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.applyFiltersPopup.cancelButtonLabel",
        defaultMessage: "Cancel"
      })), _react2.default.createElement(_eui.EuiButton, {
        onClick: this.onSubmit,
        fill: true
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.applyFiltersPopup.saveButtonLabel",
        defaultMessage: "Apply"
      })))));
    }
  }]);

  return ApplyFiltersPopover;
}(_react2.Component);

exports.ApplyFiltersPopover = ApplyFiltersPopover;

_defineProperty(ApplyFiltersPopover, "defaultProps", {
  filters: []
});