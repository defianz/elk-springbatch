"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewVisModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _visualize_constants = require("../visualize_constants");

var _search_selection = require("./search_selection");

var _type_selection = require("./type_selection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var baseUrl = "#".concat(_visualize_constants.VisualizeConstants.CREATE_PATH, "?");

var NewVisModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewVisModal, _React$Component);

  function NewVisModal(props) {
    var _this;

    _classCallCheck(this, NewVisModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NewVisModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isLabsEnabled", void 0);

    _defineProperty(_assertThisInitialized(_this), "onCloseModal", function () {
      _this.setState({
        showSearchVisModal: false
      });

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onVisTypeSelected", function (visType) {
      if (visType.requiresSearch && visType.options.showIndexSelection) {
        _this.setState({
          showSearchVisModal: true,
          visType: visType
        });
      } else {
        var params = ["type=".concat(encodeURIComponent(visType.name))].concat(_toConsumableArray(_this.props.editorParams));

        _this.props.onClose();

        location.assign("".concat(baseUrl).concat(params.join('&')));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchSelected", function (searchId, searchType) {
      _this.props.onClose();

      var params = ["type=".concat(encodeURIComponent(_this.state.visType.name)), "".concat(searchType === 'search' ? 'savedSearchId' : 'indexPattern', "=").concat(searchId)].concat(_toConsumableArray(_this.props.editorParams));
      location.assign("".concat(baseUrl).concat(params.join('&')));
    });

    _this.isLabsEnabled = _chrome.default.getUiSettingsClient().get('visualize:enableLabs');
    _this.state = {
      showSearchVisModal: false
    };
    return _this;
  }

  _createClass(NewVisModal, [{
    key: "render",
    value: function render() {
      if (!this.props.isOpen) {
        return null;
      }

      var visNewVisDialogAriaLabel = _i18n.i18n.translate('kbn.visualize.newVisWizard.helpTextAriaLabel', {
        defaultMessage: 'Start creating your visualization by selecting a type for that visualization. Hit escape to close this modal. Hit Tab key to go further.'
      });

      var selectionModal = this.state.showSearchVisModal && this.state.visType ? _react.default.createElement(_eui.EuiModal, {
        onClose: this.onCloseModal,
        className: "visNewVisSearchDialog"
      }, _react.default.createElement(_search_selection.SearchSelection, {
        onSearchSelected: this.onSearchSelected,
        visType: this.state.visType
      })) : _react.default.createElement(_eui.EuiModal, {
        onClose: this.onCloseModal,
        className: "visNewVisDialog",
        "aria-label": visNewVisDialogAriaLabel,
        role: "menu"
      }, _react.default.createElement(_type_selection.TypeSelection, {
        showExperimental: this.isLabsEnabled,
        onVisTypeSelected: this.onVisTypeSelected,
        visTypesRegistry: this.props.visTypesRegistry
      }));
      return _react.default.createElement(_eui.EuiOverlayMask, null, selectionModal);
    }
  }]);

  return NewVisModal;
}(_react.default.Component);

exports.NewVisModal = NewVisModal;

_defineProperty(NewVisModal, "defaultProps", {
  editorParams: []
});