"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visualization = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _memoize = require("../../utils/memoize");

var _visualization_chart = require("./visualization_chart");

var _visualization_noresults = require("./visualization_noresults");

var _visualization_requesterror = require("./visualization_requesterror");

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

function shouldShowNoResultsMessage(vis, visData) {
  var requiresSearch = (0, _lodash.get)(vis, 'type.requiresSearch');
  var rows = (0, _lodash.get)(visData, 'rows');
  var isZeroHits = (0, _lodash.get)(visData, 'hits') === 0 || rows && !rows.length;
  var shouldShowMessage = !(0, _lodash.get)(vis, 'type.useCustomNoDataScreen');
  return Boolean(requiresSearch && isZeroHits && shouldShowMessage);
}

function shouldShowRequestErrorMessage(vis, visData) {
  var requestError = (0, _lodash.get)(vis, 'requestError');
  var showRequestError = (0, _lodash.get)(vis, 'showRequestError');
  return Boolean(!visData && requestError && showRequestError);
}

var Visualization =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Visualization, _React$Component);

  function Visualization(props) {
    var _this;

    _classCallCheck(this, Visualization);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Visualization).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showNoResultsMessage", (0, _memoize.memoizeLast)(shouldShowNoResultsMessage));

    props.vis._setUiState(props.uiState);

    return _this;
  }

  _createClass(Visualization, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          vis = _this$props.vis,
          visData = _this$props.visData,
          visParams = _this$props.visParams,
          onInit = _this$props.onInit,
          uiState = _this$props.uiState,
          listenOnChange = _this$props.listenOnChange;
      var noResults = this.showNoResultsMessage(vis, visData);
      var requestError = shouldShowRequestErrorMessage(vis, visData);
      return _react.default.createElement("div", {
        className: "visualization"
      }, requestError ? _react.default.createElement(_visualization_requesterror.VisualizationRequestError, {
        onInit: onInit,
        error: vis.requestError
      }) : noResults ? _react.default.createElement(_visualization_noresults.VisualizationNoResults, {
        onInit: onInit
      }) : _react.default.createElement(_visualization_chart.VisualizationChart, {
        vis: vis,
        visData: visData,
        visParams: visParams,
        onInit: onInit,
        uiState: uiState,
        listenOnChange: listenOnChange
      }));
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.uiState !== this.props.uiState) {
        throw new Error('Changing uiState on <Visualization/> is not supported!');
      }

      return true;
    }
  }]);

  return Visualization;
}(_react.default.Component);

exports.Visualization = Visualization;