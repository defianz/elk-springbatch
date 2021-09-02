"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireWildcard(require("react"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _filter_bar = require("ui/filter_bar");

var _query_bar = require("../../query_bar");

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

var SearchBarUI =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchBarUI, _Component);

  function SearchBarUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchBarUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchBarUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "filterBarRef", null);

    _defineProperty(_assertThisInitialized(_this), "filterBarWrapperRef", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFiltersVisible: true
    });

    _defineProperty(_assertThisInitialized(_this), "setFilterBarHeight", function () {
      requestAnimationFrame(function () {
        var height = _this.filterBarRef && _this.state.isFiltersVisible ? _this.filterBarRef.clientHeight : 0;

        if (_this.filterBarWrapperRef) {
          _this.filterBarWrapperRef.setAttribute('style', "height: ".concat(height, "px"));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "ro", new _resizeObserverPolyfill.default(_this.setFilterBarHeight));

    _defineProperty(_assertThisInitialized(_this), "toggleFiltersVisible", function () {
      _this.setState({
        isFiltersVisible: !_this.state.isFiltersVisible
      });
    });

    return _this;
  }

  _createClass(SearchBarUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.filterBarRef) {
        this.setFilterBarHeight();
        this.ro.observe(this.filterBarRef);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.filterBarRef) {
        this.setFilterBarHeight();
        this.ro.unobserve(this.filterBarRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var filtersAppliedText = this.props.intl.formatMessage({
        id: 'data.search.searchBar.filtersButtonFiltersAppliedTitle',
        defaultMessage: 'filters applied.'
      });
      var clickToShowOrHideText = this.state.isFiltersVisible ? this.props.intl.formatMessage({
        id: 'data.search.searchBar.filtersButtonClickToShowTitle',
        defaultMessage: 'Select to hide'
      }) : this.props.intl.formatMessage({
        id: 'data.search.searchBar.filtersButtonClickToHideTitle',
        defaultMessage: 'Select to show'
      });

      var filterTriggerButton = _react2.default.createElement(_eui.EuiFilterButton, {
        onClick: this.toggleFiltersVisible,
        isSelected: this.state.isFiltersVisible,
        hasActiveFilters: this.state.isFiltersVisible,
        numFilters: this.props.filters.length > 0 ? this.props.filters.length : undefined,
        "aria-controls": "GlobalFilterGroup",
        "aria-expanded": !!this.state.isFiltersVisible,
        title: "".concat(this.props.filters.length, " ").concat(filtersAppliedText, " ").concat(clickToShowOrHideText)
      }, "Filters");

      var classes = (0, _classnames.default)('globalFilterGroup__wrapper', {
        'globalFilterGroup__wrapper-isVisible': this.state.isFiltersVisible
      });
      return _react2.default.createElement("div", {
        className: "globalQueryBar"
      }, this.props.showQueryBar ? _react2.default.createElement(_query_bar.QueryBar, {
        query: this.props.query,
        screenTitle: this.props.screenTitle,
        onSubmit: this.props.onQuerySubmit,
        appName: this.props.appName,
        indexPatterns: this.props.indexPatterns,
        store: this.props.store,
        prepend: this.props.showFilterBar ? filterTriggerButton : '',
        showDatePicker: this.props.showDatePicker,
        dateRangeFrom: this.props.dateRangeFrom,
        dateRangeTo: this.props.dateRangeTo,
        isRefreshPaused: this.props.isRefreshPaused,
        refreshInterval: this.props.refreshInterval,
        showAutoRefreshOnly: this.props.showAutoRefreshOnly,
        onRefreshChange: this.props.onRefreshChange
      }) : '', this.props.showFilterBar ? _react2.default.createElement("div", {
        id: "GlobalFilterGroup",
        ref: function ref(node) {
          _this2.filterBarWrapperRef = node;
        },
        className: classes
      }, _react2.default.createElement("div", {
        ref: function ref(node) {
          _this2.filterBarRef = node;
        }
      }, _react2.default.createElement(_filter_bar.FilterBar, {
        className: "globalFilterGroup__filterBar",
        filters: this.props.filters,
        onFiltersUpdated: this.props.onFiltersUpdated,
        indexPatterns: this.props.indexPatterns
      }))) : '');
    }
  }]);

  return SearchBarUI;
}(_react2.Component);

_defineProperty(SearchBarUI, "defaultProps", {
  showQueryBar: true,
  showFilterBar: true
});

var SearchBar = (0, _react.injectI18n)(SearchBarUI);
exports.SearchBar = SearchBar;