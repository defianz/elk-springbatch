"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhraseSuggestor = void 0;

var _react = require("react");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _value_suggestions = require("ui/value_suggestions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var config = _chrome.default.getUiSettingsClient();

/**
 * Since both "phrase" and "phrases" filter inputs suggest values (if enabled and the field is
 * aggregatable), we pull out the common logic for requesting suggestions into this component
 * which both of them extend.
 */
var PhraseSuggestor =
/*#__PURE__*/
function (_Component) {
  _inherits(PhraseSuggestor, _Component);

  function PhraseSuggestor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PhraseSuggestor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PhraseSuggestor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      suggestions: [],
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (value) {
      _this.updateSuggestions("".concat(value));
    });

    return _this;
  }

  _createClass(PhraseSuggestor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSuggestions();
    }
  }, {
    key: "isSuggestingValues",
    value: function isSuggestingValues() {
      var shouldSuggestValues = config.get('filterEditor:suggestValues');
      var field = this.props.field;
      return shouldSuggestValues && field && field.aggregatable && field.type === 'string';
    }
  }, {
    key: "updateSuggestions",
    value: function () {
      var _updateSuggestions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var value,
            _ref,
            indexPattern,
            field,
            suggestions,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
                _ref = this.props, indexPattern = _ref.indexPattern, field = _ref.field;

                if (!(!field || !this.isSuggestingValues())) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                this.setState({
                  isLoading: true
                });
                _context.next = 7;
                return (0, _value_suggestions.getSuggestions)(indexPattern.title, field, value);

              case 7:
                suggestions = _context.sent;
                this.setState({
                  suggestions: suggestions,
                  isLoading: false
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateSuggestions() {
        return _updateSuggestions.apply(this, arguments);
      }

      return updateSuggestions;
    }()
  }]);

  return PhraseSuggestor;
}(_react.Component);

exports.PhraseSuggestor = PhraseSuggestor;