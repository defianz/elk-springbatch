"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterItem = void 0;

var _eui = require("@elastic/eui");

var _esQuery = require("@kbn/es-query");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _filter_editor = require("./filter_editor");

var _filter_view = require("./filter_view");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FilterItemUI =
/*#__PURE__*/
function (_Component) {
  _inherits(FilterItemUI, _Component);

  function FilterItemUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FilterItemUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FilterItemUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (filter) {
      _this.closePopover();

      _this.props.onUpdate(filter);
    });

    _defineProperty(_assertThisInitialized(_this), "onTogglePinned", function () {
      var filter = (0, _esQuery.toggleFilterPinned)(_this.props.filter);

      _this.props.onUpdate(filter);
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleNegated", function () {
      var filter = (0, _esQuery.toggleFilterNegated)(_this.props.filter);

      _this.props.onUpdate(filter);
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleDisabled", function () {
      var filter = (0, _esQuery.toggleFilterDisabled)(_this.props.filter);

      _this.props.onUpdate(filter);
    });

    return _this;
  }

  _createClass(FilterItemUI, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          filter = _this$props.filter,
          id = _this$props.id;
      var _filter$meta = filter.meta,
          negate = _filter$meta.negate,
          disabled = _filter$meta.disabled;
      var classes = (0, _classnames.default)('globalFilterItem', {
        'globalFilterItem-isDisabled': disabled,
        'globalFilterItem-isPinned': (0, _esQuery.isFilterPinned)(filter),
        'globalFilterItem-isExcluded': negate
      }, this.props.className);
      var dataTestSubjKey = filter.meta.key ? "filter-key-".concat(filter.meta.key) : '';
      var dataTestSubjValue = filter.meta.value ? "filter-value-".concat(filter.meta.value) : '';
      var dataTestSubjDisabled = "filter-".concat(this.props.filter.meta.disabled ? 'disabled' : 'enabled');

      var badge = _react2.default.createElement(_filter_view.FilterView, {
        filter: filter,
        className: classes,
        iconOnClick: function iconOnClick() {
          return _this2.props.onRemove();
        },
        onClick: this.togglePopover,
        "data-test-subj": "filter ".concat(dataTestSubjDisabled, " ").concat(dataTestSubjKey, " ").concat(dataTestSubjValue)
      });

      var panelTree = [{
        id: 0,
        items: [{
          name: (0, _esQuery.isFilterPinned)(filter) ? this.props.intl.formatMessage({
            id: 'common.ui.filterBar.unpinFilterButtonLabel',
            defaultMessage: 'Unpin'
          }) : this.props.intl.formatMessage({
            id: 'common.ui.filterBar.pinFilterButtonLabel',
            defaultMessage: 'Pin across all apps'
          }),
          icon: 'pin',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.onTogglePinned();
          },
          'data-test-subj': 'pinFilter'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.filterBar.editFilterButtonLabel',
            defaultMessage: 'Edit filter'
          }),
          icon: 'pencil',
          panel: 1,
          'data-test-subj': 'editFilter'
        }, {
          name: negate ? this.props.intl.formatMessage({
            id: 'common.ui.filterBar.includeFilterButtonLabel',
            defaultMessage: 'Include results'
          }) : this.props.intl.formatMessage({
            id: 'common.ui.filterBar.excludeFilterButtonLabel',
            defaultMessage: 'Exclude results'
          }),
          icon: negate ? 'plusInCircle' : 'minusInCircle',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.onToggleNegated();
          },
          'data-test-subj': 'negateFilter'
        }, {
          name: disabled ? this.props.intl.formatMessage({
            id: 'common.ui.filterBar.enableFilterButtonLabel',
            defaultMessage: 'Re-enable'
          }) : this.props.intl.formatMessage({
            id: 'common.ui.filterBar.disableFilterButtonLabel',
            defaultMessage: 'Temporarily disable'
          }),
          icon: "".concat(disabled ? 'eye' : 'eyeClosed'),
          onClick: function onClick() {
            _this2.closePopover();

            _this2.onToggleDisabled();
          },
          'data-test-subj': 'disableFilter'
        }, {
          name: this.props.intl.formatMessage({
            id: 'common.ui.filterBar.deleteFilterButtonLabel',
            defaultMessage: 'Delete'
          }),
          icon: 'trash',
          onClick: function onClick() {
            _this2.closePopover();

            _this2.props.onRemove();
          },
          'data-test-subj': 'deleteFilter'
        }]
      }, {
        id: 1,
        width: 400,
        content: _react2.default.createElement("div", null, _react2.default.createElement(_filter_editor.FilterEditor, {
          filter: filter,
          indexPatterns: this.props.indexPatterns,
          onSubmit: this.onSubmit,
          onCancel: this.closePopover
        }))
      }];
      return _react2.default.createElement(_eui.EuiPopover, {
        id: "popoverFor_filter".concat(id),
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        button: badge,
        anchorPosition: "downLeft",
        withTitle: true,
        panelPaddingSize: "none"
      }, _react2.default.createElement(_eui.EuiContextMenu, {
        initialPanelId: 0,
        panels: panelTree
      }));
    }
  }]);

  return FilterItemUI;
}(_react2.Component);

var FilterItem = (0, _react.injectI18n)(FilterItemUI);
exports.FilterItem = FilterItem;