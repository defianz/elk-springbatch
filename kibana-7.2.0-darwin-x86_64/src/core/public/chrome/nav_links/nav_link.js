"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLinkWrapper = void 0;

var _utils = require("../../../utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavLinkWrapper =
/*#__PURE__*/
function () {
  function NavLinkWrapper(properties) {
    _classCallCheck(this, NavLinkWrapper);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "properties", void 0);

    if (!properties || !properties.id) {
      throw new Error('`id` is required.');
    }

    this.id = properties.id;
    this.properties = Object.freeze(properties);
  }

  _createClass(NavLinkWrapper, [{
    key: "update",
    value: function update(newProps) {
      // Enforce limited properties at runtime for JS code
      newProps = (0, _utils.pick)(newProps, ['active', 'disabled', 'hidden', 'url', 'subUrlBase']);
      return new NavLinkWrapper(_objectSpread({}, this.properties, newProps));
    }
  }]);

  return NavLinkWrapper;
}();

exports.NavLinkWrapper = NavLinkWrapper;