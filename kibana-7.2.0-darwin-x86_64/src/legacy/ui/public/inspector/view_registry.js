"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "InspectorViewDescription", {
  enumerable: true,
  get: function get() {
    return _types.InspectorViewDescription;
  }
});
exports.InspectorViewRegistry = exports.viewRegistry = void 0;

var _events = require("events");

var _types = require("./types");

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

/**
 * @callback viewShouldShowFunc
 * @param {object} adapters - A list of adapters to check whether or not this view
 *    should be shown for.
 * @returns {boolean} true - if this view should be shown for the given adapters.
 */

/**
 * A registry that will hold inspector views.
 */
var InspectorViewRegistry =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(InspectorViewRegistry, _EventEmitter);

  function InspectorViewRegistry() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InspectorViewRegistry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InspectorViewRegistry)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "views", []);

    return _this;
  }

  _createClass(InspectorViewRegistry, [{
    key: "register",

    /**
     * Register a new inspector view to the registry. Check the README.md in the
     * inspector directory for more information of the object format to register
     * here. This will also emit a 'change' event on the registry itself.
     *
     * @param {InspectorViewDescription} view - The view description to add to the registry.
     */
    value: function register(view) {
      if (!view) {
        return;
      }

      this.views.push(view); // Keep registry sorted by the order property

      this.views.sort(function (a, b) {
        return (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE);
      });
      this.emit('change');
    }
    /**
     * Retrieve all views currently registered with the registry.
     * @returns {InspectorViewDescription[]} A by `order` sorted list of all registered
     *    inspector views.
     */

  }, {
    key: "getAll",
    value: function getAll() {
      return this.views;
    }
    /**
     * Retrieve all registered views, that want to be visible for the specified adapters.
     * @param {object} adapters - an adapter configuration
     * @returns {InspectorViewDescription[]} All inespector view descriptions visible
     *    for the specific adapters.
     */

  }, {
    key: "getVisible",
    value: function getVisible(adapters) {
      if (!adapters) {
        return [];
      }

      return this.views.filter(function (view) {
        return !view.shouldShow || view.shouldShow(adapters);
      });
    }
  }]);

  return InspectorViewRegistry;
}(_events.EventEmitter);
/**
 * The global view registry. In the long run this should be solved by a registry
 * system introduced by the new platform instead, to not keep global state like that.
 */


exports.InspectorViewRegistry = InspectorViewRegistry;
var viewRegistry = new InspectorViewRegistry();
exports.viewRegistry = viewRegistry;