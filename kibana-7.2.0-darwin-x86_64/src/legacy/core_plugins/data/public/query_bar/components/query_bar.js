"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBar = exports.QueryBarUI = void 0;

var _esQuery = require("@kbn/es-query");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _time_history = require("ui/timefilter/time_history");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _documentation_links = require("ui/documentation_links");

var _notify = require("ui/notify");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _query_bar_input = require("./query_bar_input");

var _get_query_log = require("../lib/get_query_log");

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

var config = _chrome.default.getUiSettingsClient();

var QueryBarUI =
/*#__PURE__*/
function (_Component) {
  _inherits(QueryBarUI, _Component);

  function QueryBarUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueryBarUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueryBarUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      query: {
        query: _this.props.query.query,
        language: _this.props.query.language
      },
      inputIsPristine: true,
      currentProps: _this.props,
      dateRangeFrom: _lodash.default.get(_this.props, 'dateRangeFrom', 'now-15m'),
      dateRangeTo: _lodash.default.get(_this.props, 'dateRangeTo', 'now'),
      isDateRangeInvalid: false
    });

    _defineProperty(_assertThisInitialized(_this), "inputRef", null);

    _defineProperty(_assertThisInitialized(_this), "persistedLog", void 0);

    _defineProperty(_assertThisInitialized(_this), "isDirty", function () {
      if (!_this.props.showDatePicker) {
        return _this.state.query.query !== _this.props.query.query;
      }

      return _this.state.query.query !== _this.props.query.query || _this.state.dateRangeFrom !== _this.props.dateRangeFrom || _this.state.dateRangeTo !== _this.props.dateRangeTo;
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSubmitButton", function (event) {
      if (_this.persistedLog) {
        _this.persistedLog.add(_this.state.query.query);
      }

      _this.onSubmit(function () {
        return event.preventDefault();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (query) {
      _this.setState({
        query: query,
        inputIsPristine: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeChange", function (_ref) {
      var start = _ref.start,
          end = _ref.end,
          isInvalid = _ref.isInvalid,
          isQuickSelection = _ref.isQuickSelection;

      _this.setState({
        dateRangeFrom: start,
        dateRangeTo: end,
        isDateRangeInvalid: isInvalid
      }, function () {
        return isQuickSelection && _this.onSubmit();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (preventDefault) {
      if (preventDefault) {
        preventDefault();
      }

      _this.handleLuceneSyntaxWarning();

      _time_history.timeHistory.add({
        from: _this.state.dateRangeFrom,
        to: _this.state.dateRangeTo
      });

      _this.props.onSubmit({
        query: {
          query: _this.state.query.query,
          language: _this.state.query.language
        },
        dateRange: {
          from: _this.state.dateRangeFrom,
          to: _this.state.dateRangeTo
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputSubmit", function (query) {
      _this.setState({
        query: query
      }, function () {
        _this.onSubmit();
      });
    });

    return _this;
  }

  _createClass(QueryBarUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.persistedLog = (0, _get_query_log.getQueryLog)(this.props.appName, this.props.query.language);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.query.language !== this.props.query.language) {
        this.persistedLog = (0, _get_query_log.getQueryLog)(this.props.appName, this.props.query.language);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = (0, _classnames.default)('kbnQueryBar', {
        'kbnQueryBar--withDatePicker': this.props.showDatePicker
      });
      return _react.default.createElement(_eui.EuiFlexGroup, {
        className: classes,
        responsive: !!this.props.showDatePicker,
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_query_bar_input.QueryBarInput, {
        appName: this.props.appName,
        disableAutoFocus: this.props.disableAutoFocus,
        indexPatterns: this.props.indexPatterns,
        prepend: this.props.prepend,
        query: this.state.query,
        screenTitle: this.props.screenTitle,
        store: this.props.store,
        onChange: this.onChange,
        onSubmit: this.onInputSubmit,
        persistedLog: this.persistedLog
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, this.renderUpdateButton()));
    }
  }, {
    key: "renderUpdateButton",
    value: function renderUpdateButton() {
      var button = this.props.customSubmitButton ? _react.default.cloneElement(this.props.customSubmitButton, {
        onClick: this.onClickSubmitButton
      }) : _react.default.createElement(_eui.EuiSuperUpdateButton, {
        needsUpdate: this.isDirty(),
        isDisabled: this.state.isDateRangeInvalid,
        onClick: this.onClickSubmitButton,
        "data-test-subj": "querySubmitButton"
      });

      if (!this.props.showDatePicker) {
        return button;
      }

      return _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false,
        gutterSize: "s"
      }, this.renderDatePicker(), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, button));
    }
  }, {
    key: "renderDatePicker",
    value: function renderDatePicker() {
      if (!this.props.showDatePicker) {
        return null;
      }

      var recentlyUsedRanges = _time_history.timeHistory.get().map(function (_ref2) {
        var from = _ref2.from,
            to = _ref2.to;
        return {
          start: from,
          end: to
        };
      });

      var commonlyUsedRanges = config.get('timepicker:quickRanges').map(function (_ref3) {
        var from = _ref3.from,
            to = _ref3.to,
            display = _ref3.display;
        return {
          start: from,
          end: to,
          label: display
        };
      });
      return _react.default.createElement(_eui.EuiFlexItem, {
        className: "kbnQueryBar__datePickerWrapper"
      }, _react.default.createElement(_eui.EuiSuperDatePicker, {
        start: this.state.dateRangeFrom,
        end: this.state.dateRangeTo,
        isPaused: this.props.isRefreshPaused,
        refreshInterval: this.props.refreshInterval,
        onTimeChange: this.onTimeChange,
        onRefreshChange: this.props.onRefreshChange,
        showUpdateButton: false,
        recentlyUsedRanges: recentlyUsedRanges,
        commonlyUsedRanges: commonlyUsedRanges,
        dateFormat: config.get('dateFormat'),
        isAutoRefreshOnly: this.props.showAutoRefreshOnly
      }));
    }
  }, {
    key: "handleLuceneSyntaxWarning",
    value: function handleLuceneSyntaxWarning() {
      var _this2 = this;

      var _this$props = this.props,
          intl = _this$props.intl,
          store = _this$props.store;
      var _this$state$query = this.state.query,
          query = _this$state$query.query,
          language = _this$state$query.language;

      if (language === 'kuery' && !store.get('kibana.luceneSyntaxWarningOptOut') && (0, _esQuery.doesKueryExpressionHaveLuceneSyntaxError)(query)) {
        var toast = _notify.toastNotifications.addWarning({
          title: intl.formatMessage({
            id: 'data.query.queryBar.luceneSyntaxWarningTitle',
            defaultMessage: 'Lucene syntax warning'
          }),
          text: _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "data.query.queryBar.luceneSyntaxWarningMessage",
            defaultMessage: "It looks like you may be trying to use Lucene query syntax, although you have Kibana Query Language (KQL) selected. Please review the KQL docs {link}.",
            values: {
              link: _react.default.createElement(_eui.EuiLink, {
                href: _documentation_links.documentationLinks.query.kueryQuerySyntax,
                target: "_blank"
              }, _react.default.createElement(_react2.FormattedMessage, {
                id: "data.query.queryBar.syntaxOptionsDescription.docsLinkText",
                defaultMessage: "here"
              }))
            }
          })), _react.default.createElement(_eui.EuiFlexGroup, {
            justifyContent: "flexEnd",
            gutterSize: "s"
          }, _react.default.createElement(_eui.EuiFlexItem, {
            grow: false
          }, _react.default.createElement(_eui.EuiButton, {
            size: "s",
            onClick: function onClick() {
              return _this2.onLuceneSyntaxWarningOptOut(toast);
            }
          }, "Don't show again"))))
        });
      }
    }
  }, {
    key: "onLuceneSyntaxWarningOptOut",
    value: function onLuceneSyntaxWarningOptOut(toast) {
      this.props.store.set('kibana.luceneSyntaxWarningOptOut', true);

      _notify.toastNotifications.remove(toast);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if ((0, _lodash.isEqual)(prevState.currentProps, nextProps)) {
        return null;
      }

      var nextQuery = null;

      if (nextProps.query.query !== prevState.query.query) {
        nextQuery = {
          query: nextProps.query.query,
          language: nextProps.query.language
        };
      } else if (nextProps.query.language !== prevState.query.language) {
        nextQuery = {
          query: '',
          language: nextProps.query.language
        };
      }

      var nextDateRange = null;

      if (nextProps.dateRangeFrom !== (0, _lodash.get)(prevState, 'currentProps.dateRangeFrom') || nextProps.dateRangeTo !== (0, _lodash.get)(prevState, 'currentProps.dateRangeTo')) {
        nextDateRange = {
          dateRangeFrom: nextProps.dateRangeFrom,
          dateRangeTo: nextProps.dateRangeTo
        };
      }

      var nextState = {
        currentProps: nextProps
      };

      if (nextQuery) {
        nextState.query = nextQuery;
      }

      if (nextDateRange) {
        nextState.dateRangeFrom = nextDateRange.dateRangeFrom;
        nextState.dateRangeTo = nextDateRange.dateRangeTo;
      }

      return nextState;
    }
    /*
     Keep the "draft" value in local state until the user actually submits the query. There are a couple advantages:
       1. Each app doesn't have to maintain its own "draft" value if it wants to put off updating the query in app state
      until the user manually submits their changes. Most apps have watches on the query value in app state so we don't
      want to trigger those on every keypress. Also, some apps (e.g. dashboard) already juggle multiple query values,
      each with slightly different semantics and I'd rather not add yet another variable to the mix.
       2. Changes to the local component state won't trigger an Angular digest cycle. Triggering digest cycles on every
      keypress has been a major source of performance issues for us in previous implementations of the query bar.
      See https://github.com/elastic/kibana/issues/14086
    */

  }]);

  return QueryBarUI;
}(_react.Component); // @ts-ignore


exports.QueryBarUI = QueryBarUI;
var QueryBar = (0, _react2.injectI18n)(QueryBarUI);
exports.QueryBar = QueryBar;