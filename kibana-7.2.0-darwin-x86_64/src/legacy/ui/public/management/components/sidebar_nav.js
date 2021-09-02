"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarNav = exports.sideNavItems = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sectionVisible = function sectionVisible(section) {
  return !section.disabled && section.visible;
};

var sectionToNav = function sectionToNav(selectedId) {
  return function (_ref) {
    var display = _ref.display,
        id = _ref.id,
        url = _ref.url,
        icon = _ref.icon;
    return {
      id: id,
      name: display,
      icon: icon ? _react2.default.createElement(_eui.EuiIcon, {
        type: icon
      }) : null,
      isSelected: selectedId === id,
      href: url,
      'data-test-subj': id
    };
  };
};

var sideNavItems = function sideNavItems(sections, selectedId) {
  return sections.filter(sectionVisible).filter(function (section) {
    return section.visibleItems.filter(sectionVisible).length;
  }).map(function (section) {
    return _objectSpread({
      items: section.visibleItems.filter(sectionVisible).map(sectionToNav(selectedId))
    }, sectionToNav(selectedId)(section));
  });
};

exports.sideNavItems = sideNavItems;

var SidebarNav =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SidebarNav, _React$Component);

  function SidebarNav(props) {
    var _this;

    _classCallCheck(this, SidebarNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SidebarNav).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "toggleOpenOnMobile", function () {
      _this.setState({
        isSideNavOpenOnMobile: !_this.state.isSideNavOpenOnMobile
      });
    });

    _this.state = {
      isSideNavOpenOnMobile: false
    };
    return _this;
  }

  _createClass(SidebarNav, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_eui.EuiSideNav, {
        mobileTitle: this.renderMobileTitle(),
        isOpenOnMobile: this.state.isSideNavOpenOnMobile,
        toggleOpenOnMobile: this.toggleOpenOnMobile,
        items: sideNavItems(this.props.sections, this.props.selectedId),
        className: "mgtSideBarNav"
      });
    }
  }, {
    key: "renderMobileTitle",
    value: function renderMobileTitle() {
      return _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.management.nav.menu",
        defaultMessage: "Management menu"
      });
    }
  }]);

  return SidebarNav;
}(_react2.default.Component);

exports.SidebarNav = SidebarNav;