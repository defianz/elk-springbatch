"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexPatternTable = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _create_button = require("../create_button");

var _create_index_pattern_prompt = require("../create_index_pattern_prompt");

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

var columns = [{
  field: 'title',
  name: 'Pattern',
  render: function render(name, _ref) {
    var id = _ref.id;
    return _react2.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      href: "#/management/kibana/index_patterns/".concat(id)
    }, name);
  },
  dataType: 'string',
  sortable: true
}];
var pagination = {
  initialPageSize: 10,
  pageSizeOptions: [5, 10, 25, 50]
};
var sorting = {
  sort: {
    field: 'title',
    direction: 'desc'
  }
};
var search = {
  box: {
    incremental: true,
    schema: {
      fields: {
        title: {
          type: 'string'
        }
      }
    }
  }
};

var IndexPatternTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IndexPatternTable, _React$Component);

  function IndexPatternTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, IndexPatternTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(IndexPatternTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showFlyout: _this.props.indexPatterns.length === 0
    });

    return _this;
  }

  _createClass(IndexPatternTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_eui.EuiPanel, {
        paddingSize: "l",
        "data-test-subj": "indexPatternTable"
      }, this.state.showFlyout && _react2.default.createElement(_create_index_pattern_prompt.CreateIndexPatternPrompt, {
        onClose: function onClose() {
          return _this2.setState({
            showFlyout: false
          });
        }
      }), _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "euiIEFlexWrapFix"
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "s"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "kbn.management.indexPatternTable.title",
        defaultMessage: "Index patterns"
      })))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonIcon, {
        iconSize: "l",
        iconType: "questionInCircle",
        onClick: function onClick() {
          return _this2.setState({
            showFlyout: true
          });
        },
        "aria-label": "Help"
      })))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_create_button.CreateButton, {
        options: this.props.indexPatternCreationOptions
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "kbn.management.indexPatternTable.createBtn",
        defaultMessage: "Create index pattern"
      })))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiInMemoryTable, {
        itemId: "id",
        isSelectable: false,
        items: this.props.indexPatterns,
        columns: columns,
        pagination: pagination,
        sorting: sorting,
        search: search
      }));
    }
  }]);

  return IndexPatternTable;
}(_react2.default.Component);

exports.IndexPatternTable = IndexPatternTable;