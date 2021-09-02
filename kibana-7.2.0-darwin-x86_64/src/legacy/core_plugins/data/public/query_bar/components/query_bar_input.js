"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBarInput = exports.QueryBarInputUI = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _autocomplete_providers = require("ui/autocomplete_providers");

var _lodash = require("lodash");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _kfetch = require("ui/kfetch");

var _lib = require("../lib");

var _language_switcher = require("./language_switcher");

var _suggestions_component = require("./typeahead/suggestions_component");

var _get_query_log = require("../lib/get_query_log");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY_CODES = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  TAB: 9,
  HOME: 36,
  END: 35
};

var config = _chrome.default.getUiSettingsClient();

var recentSearchType = 'recentSearch';

var QueryBarInputUI =
/*#__PURE__*/
function (_Component) {
  _inherits(QueryBarInputUI, _Component);

  function QueryBarInputUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueryBarInputUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueryBarInputUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isSuggestionsVisible: false,
      index: null,
      suggestions: [],
      suggestionLimit: 50,
      selectionStart: null,
      selectionEnd: null
    });

    _defineProperty(_assertThisInitialized(_this), "inputRef", null);

    _defineProperty(_assertThisInitialized(_this), "persistedLog", void 0);

    _defineProperty(_assertThisInitialized(_this), "componentIsUnmounting", false);

    _defineProperty(_assertThisInitialized(_this), "getQueryString", function () {
      return (0, _lib.toUser)(_this.props.query.query);
    });

    _defineProperty(_assertThisInitialized(_this), "getSuggestions",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props$query, query, language, recentSearchSuggestions, autocompleteProvider, indexPatterns, getAutocompleteSuggestions, _this$inputRef, selectionStart, selectionEnd, suggestions;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.inputRef) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this$props$query = _this.props.query, query = _this$props$query.query, language = _this$props$query.language;
              recentSearchSuggestions = _this.getRecentSearchSuggestions(query);
              autocompleteProvider = (0, _autocomplete_providers.getAutocompleteProvider)(language);

              if (!(!autocompleteProvider || !Array.isArray(_this.props.indexPatterns) || (0, _lodash.compact)(_this.props.indexPatterns).length === 0)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", recentSearchSuggestions);

            case 7:
              indexPatterns = _this.props.indexPatterns;
              getAutocompleteSuggestions = autocompleteProvider({
                config: config,
                indexPatterns: indexPatterns
              });
              _this$inputRef = _this.inputRef, selectionStart = _this$inputRef.selectionStart, selectionEnd = _this$inputRef.selectionEnd;

              if (!(selectionStart === null || selectionEnd === null)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              _context.next = 14;
              return getAutocompleteSuggestions({
                query: query,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
              });

            case 14:
              suggestions = _context.sent;
              return _context.abrupt("return", [].concat(_toConsumableArray(suggestions), _toConsumableArray(recentSearchSuggestions)));

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "getRecentSearchSuggestions", function (query) {
      if (!_this.persistedLog) {
        return [];
      }

      var recentSearches = _this.persistedLog.get();

      var matchingRecentSearches = recentSearches.filter(function (recentQuery) {
        var recentQueryString = _typeof(recentQuery) === 'object' ? (0, _lib.toUser)(recentQuery) : recentQuery;
        return recentQueryString.includes(query);
      });
      return matchingRecentSearches.map(function (recentSearch) {
        var text = (0, _lib.toUser)(recentSearch);
        var start = 0;
        var end = query.length;
        return {
          type: recentSearchType,
          text: text,
          start: start,
          end: end
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateSuggestions", (0, _lodash.debounce)(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var suggestions;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.getSuggestions();

            case 2:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 5;
                break;
              }

              _context2.t0 = [];

            case 5:
              suggestions = _context2.t0;

              if (!_this.componentIsUnmounting) {
                _this.setState({
                  suggestions: suggestions
                });
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })), 100));

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (query) {
      if (_this.props.onSubmit) {
        if (_this.persistedLog) {
          _this.persistedLog.add(query.query);
        }

        _this.props.onSubmit({
          query: (0, _lib.fromUser)(query.query),
          language: query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (query) {
      _this.updateSuggestions();

      if (_this.props.onChange) {
        _this.props.onChange({
          query: (0, _lib.fromUser)(query.query),
          language: query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryStringChange", function (value) {
      var hasValue = Boolean(value.trim());

      _this.setState({
        isSuggestionsVisible: hasValue,
        index: null,
        suggestionLimit: 50
      });

      _this.onChange({
        query: value,
        language: _this.props.query.language
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      _this.onQueryStringChange(event.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickInput", function (event) {
      if (event.target instanceof HTMLInputElement) {
        _this.onQueryStringChange(event.target.value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      if ([KEY_CODES.LEFT, KEY_CODES.RIGHT, KEY_CODES.HOME, KEY_CODES.END].includes(event.keyCode)) {
        _this.setState({
          isSuggestionsVisible: true
        });

        if (event.target instanceof HTMLInputElement) {
          _this.onQueryStringChange(event.target.value);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (event.target instanceof HTMLInputElement) {
        var _this$state = _this.state,
            _isSuggestionsVisible = _this$state.isSuggestionsVisible,
            _index = _this$state.index;
        var preventDefault = event.preventDefault.bind(event);
        var target = event.target,
            key = event.key,
            metaKey = event.metaKey;
        var value = target.value,
            _selectionStart = target.selectionStart,
            _selectionEnd = target.selectionEnd;

        var updateQuery = function updateQuery(query, newSelectionStart, newSelectionEnd) {
          _this.onQueryStringChange(query);

          _this.setState({
            selectionStart: newSelectionStart,
            selectionEnd: newSelectionEnd
          });
        };

        switch (event.keyCode) {
          case KEY_CODES.DOWN:
            event.preventDefault();

            if (_isSuggestionsVisible && _index !== null) {
              _this.incrementIndex(_index);
            } else {
              _this.setState({
                isSuggestionsVisible: true,
                index: 0
              });
            }

            break;

          case KEY_CODES.UP:
            event.preventDefault();

            if (_isSuggestionsVisible && _index !== null) {
              _this.decrementIndex(_index);
            }

            break;

          case KEY_CODES.ENTER:
            event.preventDefault();

            if (_isSuggestionsVisible && _index !== null && _this.state.suggestions[_index]) {
              _this.selectSuggestion(_this.state.suggestions[_index]);
            } else {
              _this.onSubmit(_this.props.query);

              _this.setState({
                isSuggestionsVisible: false
              });
            }

            break;

          case KEY_CODES.ESC:
            event.preventDefault();

            _this.setState({
              isSuggestionsVisible: false,
              index: null
            });

            break;

          case KEY_CODES.TAB:
            _this.setState({
              isSuggestionsVisible: false,
              index: null
            });

            break;

          default:
            if (_selectionStart !== null && _selectionEnd !== null) {
              (0, _lib.matchPairs)({
                value: value,
                selectionStart: _selectionStart,
                selectionEnd: _selectionEnd,
                key: key,
                metaKey: metaKey,
                updateQuery: updateQuery,
                preventDefault: preventDefault
              });
            }

            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectSuggestion", function (_ref3) {
      var type = _ref3.type,
          text = _ref3.text,
          start = _ref3.start,
          end = _ref3.end;

      if (!_this.inputRef) {
        return;
      }

      var query = _this.getQueryString();

      var _this$inputRef2 = _this.inputRef,
          selectionStart = _this$inputRef2.selectionStart,
          selectionEnd = _this$inputRef2.selectionEnd;

      if (selectionStart === null || selectionEnd === null) {
        return;
      }

      var value = query.substr(0, selectionStart) + query.substr(selectionEnd);
      var newQueryString = value.substr(0, start) + text + value.substr(end);

      _this.onQueryStringChange(newQueryString);

      if (type === recentSearchType) {
        _this.setState({
          isSuggestionsVisible: false,
          index: null
        });

        _this.onSubmit({
          query: newQueryString,
          language: _this.props.query.language
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "increaseLimit", function () {
      _this.setState({
        suggestionLimit: _this.state.suggestionLimit + 50
      });
    });

    _defineProperty(_assertThisInitialized(_this), "incrementIndex", function (currentIndex) {
      var nextIndex = currentIndex + 1;

      if (currentIndex === null || nextIndex >= _this.state.suggestions.length) {
        nextIndex = 0;
      }

      _this.setState({
        index: nextIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decrementIndex", function (currentIndex) {
      var previousIndex = currentIndex - 1;

      if (previousIndex < 0) {
        _this.setState({
          index: _this.state.suggestions.length - 1
        });
      } else {
        _this.setState({
          index: previousIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectLanguage", function (language) {
      // Send telemetry info every time the user opts in or out of kuery
      // As a result it is important this function only ever gets called in the
      // UI component's change handler.
      (0, _kfetch.kfetch)({
        pathname: '/api/kibana/kql_opt_in_telemetry',
        method: 'POST',
        body: JSON.stringify({
          opt_in: language === 'kuery'
        })
      });

      _this.props.store.set('kibana.userQueryLanguage', language);

      var newQuery = {
        query: '',
        language: language
      };

      _this.onChange(newQuery);

      _this.onSubmit(newQuery);
    });

    _defineProperty(_assertThisInitialized(_this), "onOutsideClick", function () {
      if (_this.state.isSuggestionsVisible) {
        _this.setState({
          isSuggestionsVisible: false,
          index: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSuggestion", function (suggestion) {
      if (!_this.inputRef) {
        return;
      }

      _this.selectSuggestion(suggestion);

      _this.inputRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnterSuggestion", function (index) {
      _this.setState({
        index: index
      });
    });

    return _this;
  }

  _createClass(QueryBarInputUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.persistedLog = this.props.persistedLog ? this.props.persistedLog : (0, _get_query_log.getQueryLog)(this.props.appName, this.props.query.language);
      this.updateSuggestions();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.persistedLog = this.props.persistedLog ? this.props.persistedLog : (0, _get_query_log.getQueryLog)(this.props.appName, this.props.query.language);
      this.updateSuggestions();

      if (this.state.selectionStart !== null && this.state.selectionEnd !== null) {
        if (this.inputRef) {
          // For some reason the type guard above does not make the compiler happy
          // @ts-ignore
          this.inputRef.setSelectionRange(this.state.selectionStart, this.state.selectionEnd);
        }

        this.setState({
          selectionStart: null,
          selectionEnd: null
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.updateSuggestions.cancel();
      this.componentIsUnmounting = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_eui.EuiOutsideClickDetector, {
        onOutsideClick: this.onOutsideClick
      }, _react.default.createElement("div", {
        style: {
          position: 'relative'
        },
        role: "combobox",
        "aria-haspopup": "true",
        "aria-expanded": this.state.isSuggestionsVisible,
        "aria-owns": "kbnTypeahead__items",
        "aria-controls": "kbnTypeahead__items"
      }, _react.default.createElement("form", {
        name: "queryBarForm"
      }, _react.default.createElement("div", {
        role: "search"
      }, _react.default.createElement("div", {
        className: "kuiLocalSearchAssistedInput"
      }, _react.default.createElement(_eui.EuiFieldText, {
        placeholder: this.props.intl.formatMessage({
          id: 'data.query.queryBar.searchInputPlaceholder',
          defaultMessage: 'Search'
        }),
        value: this.getQueryString(),
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onChange: this.onInputChange,
        onClick: this.onClickInput,
        fullWidth: true,
        autoFocus: !this.props.disableAutoFocus,
        inputRef: function inputRef(node) {
          if (node) {
            _this2.inputRef = node;
          }
        },
        autoComplete: "off",
        spellCheck: false,
        "aria-label": this.props.intl.formatMessage({
          id: 'data.query.queryBar.searchInputAriaLabel',
          defaultMessage: 'You are on search box of {previouslyTranslatedPageTitle} page. Start typing to search and filter the {pageType}'
        }, {
          previouslyTranslatedPageTitle: this.props.screenTitle,
          pageType: this.props.appName
        }),
        type: "text",
        "data-test-subj": "queryInput",
        "aria-autocomplete": "list",
        "aria-controls": "kbnTypeahead__items",
        "aria-activedescendant": this.state.isSuggestionsVisible ? 'suggestion-' + this.state.index : '',
        role: "textbox",
        prepend: this.props.prepend,
        append: _react.default.createElement(_language_switcher.QueryLanguageSwitcher, {
          language: this.props.query.language,
          onSelectLanguage: this.onSelectLanguage
        })
      })))), _react.default.createElement(_suggestions_component.SuggestionsComponent, {
        show: this.state.isSuggestionsVisible,
        suggestions: this.state.suggestions.slice(0, this.state.suggestionLimit),
        index: this.state.index,
        onClick: this.onClickSuggestion,
        onMouseEnter: this.onMouseEnterSuggestion,
        loadMore: this.increaseLimit
      })));
    }
  }]);

  return QueryBarInputUI;
}(_react.Component);

exports.QueryBarInputUI = QueryBarInputUI;
var QueryBarInput = (0, _react2.injectI18n)(QueryBarInputUI);
exports.QueryBarInput = QueryBarInput;