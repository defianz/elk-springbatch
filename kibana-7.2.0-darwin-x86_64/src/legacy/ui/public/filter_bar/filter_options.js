"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterOptions = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterOptionsUI =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterOptionsUI, _Component);

  function FilterOptionsUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterOptionsUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterOptionsUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState(function (prevState) {
        return {
          isPopoverOpen: !prevState.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    return _this;
  }

  _createClass(FilterOptionsUI, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var panelTree = {
        id: 0,
        items: [{
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.enableAllFiltersButtonLabel',
            defaultMessage: 'Enable all'
          }),
          icon: 'eye',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onEnableAll();
          },
          'data-test-subj': 'enableAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.disableAllFiltersButtonLabel',
            defaultMessage: 'Disable all'
          }),
          icon: 'eyeClosed',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onDisableAll();
          },
          'data-test-subj': 'disableAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.pinAllFiltersButtonLabel',
            defaultMessage: 'Pin all'
          }),
          icon: 'pin',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onPinAll();
          },
          'data-test-subj': 'pinAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.unpinAllFiltersButtonLabel',
            defaultMessage: 'Unpin all'
          }),
          icon: 'pin',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onUnpinAll();
          },
          'data-test-subj': 'unpinAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.invertNegatedFiltersButtonLabel',
            defaultMessage: 'Invert inclusion'
          }),
          icon: 'invert',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onToggleAllNegated();
          },
          'data-test-subj': 'invertInclusionAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.invertDisabledFiltersButtonLabel',
            defaultMessage: 'Invert enabled/disabled'
          }),
          icon: 'eye',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onToggleAllDisabled();
          },
          'data-test-subj': 'invertEnableDisableAllFilters'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.deleteAllFiltersButtonLabel',
            defaultMessage: 'Remove all'
          }),
          icon: 'trash',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onRemoveAll();
          },
          'data-test-subj': 'removeAllFilters'
        }]
      };
      return _react2.default.createElement(_eui.EuiPopover, {
        id: "popoverForAllFilters",
        className: "globalFilterGroup__allFiltersPopover",
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        button: _react2.default.createElement(_eui.EuiButtonIcon, {
          onClick: this.togglePopover,
          color: "text",
          iconType: "gear",
          "aria-label": this.props.intl.formatMessage({
            id: 'common.ui.searchBar.changeAllFiltersButtonLabel',
            defaultMessage: 'Change all filters'
          }),
          title: this.props.intl.formatMessage({
            id: 'common.ui.searchBar.changeAllFiltersButtonLabel',
            defaultMessage: 'Change all filters'
          }),
          "data-test-subj": "showFilterActions"
        }),
        anchorPosition: "rightUp",
        panelPaddingSize: "none",
        withTitle: true
      }, _react2.default.createElement(_eui.EuiPopoverTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.searchBar.changeAllFiltersTitle",
        defaultMessage: "Change all filters"
      })), _react2.default.createElement(_eui.EuiContextMenu, {
        initialPanelId: 0,
        panels: [panelTree]
      }));
    }
  }]);

  return FilterOptionsUI;
}(_react2.Component);

var FilterOptions = (0, _react.injectI18n)(FilterOptionsUI);
exports.FilterOptions = FilterOptions;