"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionsComponent = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _suggestion_component = require("./suggestion_component");

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

var SuggestionsComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(SuggestionsComponent, _Component);

  function SuggestionsComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SuggestionsComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SuggestionsComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "childNodes", []);

    _defineProperty(_assertThisInitialized(_this), "parentNode", null);

    _defineProperty(_assertThisInitialized(_this), "scrollIntoView", function () {
      if (_this.props.index === null) {
        return;
      }

      var parent = _this.parentNode;
      var child = _this.childNodes[_this.props.index];

      if (_this.props.index == null || !parent || !child) {
        return;
      }

      var scrollTop = Math.max(Math.min(parent.scrollTop, child.offsetTop), child.offsetTop + child.offsetHeight - parent.offsetHeight);
      parent.scrollTop = scrollTop;
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      if (!_this.props.loadMore || !_this.parentNode) {
        return;
      }

      var position = _this.parentNode.scrollTop + _this.parentNode.offsetHeight;
      var height = _this.parentNode.scrollHeight;
      var remaining = height - position;
      var margin = 50;

      if (!height || !position) {
        return;
      }

      if (remaining <= margin) {
        _this.props.loadMore();
      }
    });

    return _this;
  }

  _createClass(SuggestionsComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.show || (0, _lodash.isEmpty)(this.props.suggestions)) {
        return null;
      }

      var suggestions = this.props.suggestions.map(function (suggestion, index) {
        return _react.default.createElement(_suggestion_component.SuggestionComponent, {
          innerRef: function innerRef(node) {
            return _this2.childNodes[index] = node;
          },
          selected: index === _this2.props.index,
          suggestion: suggestion,
          onClick: _this2.props.onClick,
          onMouseEnter: function onMouseEnter() {
            return _this2.props.onMouseEnter(index);
          },
          ariaId: 'suggestion-' + index,
          key: "".concat(suggestion.type, " - ").concat(suggestion.text)
        });
      });
      return _react.default.createElement("div", {
        className: "reactSuggestionTypeahead"
      }, _react.default.createElement("div", {
        className: "kbnTypeahead"
      }, _react.default.createElement("div", {
        className: "kbnTypeahead__popover"
      }, _react.default.createElement("div", {
        id: "kbnTypeahead__items",
        className: "kbnTypeahead__items",
        role: "listbox",
        ref: function ref(node) {
          return _this2.parentNode = node;
        },
        onScroll: this.handleScroll
      }, suggestions))));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.index !== this.props.index) {
        this.scrollIntoView();
      }
    }
  }]);

  return SuggestionsComponent;
}(_react.Component);

exports.SuggestionsComponent = SuggestionsComponent;