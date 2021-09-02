"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchSelection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _saved_object_finder = require("ui/saved_objects/components/saved_object_finder");

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

var SearchSelection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SearchSelection, _React$Component);

  function SearchSelection() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchSelection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchSelection)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "fixedPageSize", 8);

    return _this;
  }

  _createClass(SearchSelection, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "kbn.visualize.newVisWizard.newVisTypeTitle",
        defaultMessage: "New {visTypeName}",
        values: {
          visTypeName: this.props.visType.title
        }
      }), ' ', "/", ' ', _react2.default.createElement(_react.FormattedMessage, {
        id: "kbn.visualize.newVisWizard.chooseSourceTitle",
        defaultMessage: "Choose a source"
      }))), _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_saved_object_finder.SavedObjectFinder, {
        key: "searchSavedObjectFinder",
        onChoose: this.props.onSearchSelected,
        showFilter: true,
        noItemsMessage: _i18n.i18n.translate('kbn.visualize.newVisWizard.searchSelection.notFoundLabel', {
          defaultMessage: 'No matching indices or saved searches found.'
        }),
        savedObjectMetaData: [{
          type: 'search',
          getIconForSavedObject: function getIconForSavedObject() {
            return 'search';
          },
          name: _i18n.i18n.translate('kbn.visualize.newVisWizard.searchSelection.savedObjectType.search', {
            defaultMessage: 'Saved search'
          })
        }, {
          type: 'index-pattern',
          getIconForSavedObject: function getIconForSavedObject() {
            return 'indexPatternApp';
          },
          name: _i18n.i18n.translate('kbn.visualize.newVisWizard.searchSelection.savedObjectType.indexPattern', {
            defaultMessage: 'Index pattern'
          })
        }],
        fixedPageSize: this.fixedPageSize
      })));
    }
  }]);

  return SearchSelection;
}(_react2.default.Component);

exports.SearchSelection = SearchSelection;