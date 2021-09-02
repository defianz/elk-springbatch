"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBar = void 0;

var _eui = require("@elastic/eui");

var _esQuery = require("@kbn/es-query");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _filter_editor = require("./filter_editor");

var _filter_item = require("./filter_item");

var _filter_options = require("./filter_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var config = _chrome.default.getUiSettingsClient();

var FilterBarUI =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterBarUI, _Component);

  function FilterBarUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterBarUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterBarUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isAddFilterPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "onAdd", function (filter) {
      _this.onCloseAddFilterPopover();

      var filters = [].concat(_toConsumableArray(_this.props.filters), [filter]);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (i) {
      var filters = _toConsumableArray(_this.props.filters);

      filters.splice(i, 1);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onUpdate", function (i, filter) {
      var filters = _toConsumableArray(_this.props.filters);

      filters[i] = filter;

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnableAll", function () {
      var filters = _this.props.filters.map(_esQuery.enableFilter);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onDisableAll", function () {
      var filters = _this.props.filters.map(_esQuery.disableFilter);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onPinAll", function () {
      var filters = _this.props.filters.map(_esQuery.pinFilter);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onUnpinAll", function () {
      var filters = _this.props.filters.map(_esQuery.unpinFilter);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleAllNegated", function () {
      var filters = _this.props.filters.map(_esQuery.toggleFilterNegated);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleAllDisabled", function () {
      var filters = _this.props.filters.map(_esQuery.toggleFilterDisabled);

      _this.props.onFiltersUpdated(filters);
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveAll", function () {
      _this.props.onFiltersUpdated([]);
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenAddFilterPopover", function () {
      _this.setState({
        isAddFilterPopoverOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCloseAddFilterPopover", function () {
      _this.setState({
        isAddFilterPopoverOpen: false
      });
    });

    return _this;
  }

  _createClass(FilterBarUI, [{
    key: "render",
    value: function render() {
      var classes = (0, _classnames.default)('globalFilterBar', this.props.className);
      return _react2.default.createElement(_eui.EuiFlexGroup, {
        className: "globalFilterGroup",
        gutterSize: "none",
        alignItems: "flexStart",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        className: "globalFilterGroup__branch",
        grow: false
      }, _react2.default.createElement(_filter_options.FilterOptions, {
        onEnableAll: this.onEnableAll,
        onDisableAll: this.onDisableAll,
        onPinAll: this.onPinAll,
        onUnpinAll: this.onUnpinAll,
        onToggleAllNegated: this.onToggleAllNegated,
        onToggleAllDisabled: this.onToggleAllDisabled,
        onRemoveAll: this.onRemoveAll
      })), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        className: classes,
        wrap: true,
        responsive: false,
        gutterSize: "xs",
        alignItems: "center"
      }, this.renderItems(), this.renderAddFilter())));
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      return this.props.filters.map(function (filter, i) {
        return _react2.default.createElement(_eui.EuiFlexItem, {
          key: i,
          grow: false
        }, _react2.default.createElement(_filter_item.FilterItem, {
          id: "".concat(i),
          filter: filter,
          onUpdate: function onUpdate(newFilter) {
            return _this2.onUpdate(i, newFilter);
          },
          onRemove: function onRemove() {
            return _this2.onRemove(i);
          },
          indexPatterns: _this2.props.indexPatterns
        }));
      });
    }
  }, {
    key: "renderAddFilter",
    value: function renderAddFilter() {
      var isPinned = config.get('filters:pinnedByDefault');

      var _this$props$indexPatt = _slicedToArray(this.props.indexPatterns, 1),
          indexPattern = _this$props$indexPatt[0];

      var index = indexPattern && indexPattern.id;
      var newFilter = (0, _esQuery.buildEmptyFilter)(isPinned, index);

      var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        onClick: this.onOpenAddFilterPopover,
        "data-test-subj": "addFilter"
      }, "+", ' ', _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterBar.addFilterButtonLabel",
        defaultMessage: "Add filter"
      }));

      return _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiPopover, {
        id: "addFilterPopover",
        button: button,
        isOpen: this.state.isAddFilterPopoverOpen,
        closePopover: this.onCloseAddFilterPopover,
        anchorPosition: "downLeft",
        withTitle: true,
        panelPaddingSize: "none",
        ownFocus: true
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement("div", {
        style: {
          width: 400
        }
      }, _react2.default.createElement(_filter_editor.FilterEditor, {
        filter: newFilter,
        indexPatterns: this.props.indexPatterns,
        onSubmit: this.onAdd,
        onCancel: this.onCloseAddFilterPopover,
        key: JSON.stringify(newFilter)
      })))));
    }
  }]);

  return FilterBarUI;
}(_react2.Component);

var FilterBar = (0, _react.injectI18n)(FilterBarUI);
exports.FilterBar = FilterBar;