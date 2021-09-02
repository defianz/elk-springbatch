"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeChecker = void 0;

var _events = require("events");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = require("lodash");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

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

function validateElArg(el) {
  // the ResizeChecker historically accepted jquery elements,
  // so we wrap in jQuery then extract the element
  var $el = (0, _jquery.default)(el);

  if ($el.length !== 1) {
    throw new TypeError('ResizeChecker must be constructed with a single DOM element.');
  }

  return $el.get(0);
}

function getSize(el) {
  return [el.clientWidth, el.clientHeight];
}
/**
 *  ResizeChecker receives an element and emits a "resize" event every time it changes size.
 */


var ResizeChecker =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(ResizeChecker, _EventEmitter);

  function ResizeChecker(el) {
    var _this;

    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ResizeChecker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResizeChecker).call(this));

    _defineProperty(_assertThisInitialized(_this), "destroyed", false);

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "observer", void 0);

    _defineProperty(_assertThisInitialized(_this), "expectedSize", null);

    _this.el = validateElArg(el);
    _this.observer = new _resizeObserverPolyfill.default(function () {
      if (_this.expectedSize) {
        var sameSize = (0, _lodash.isEqual)(getSize(el), _this.expectedSize);
        _this.expectedSize = null;

        if (sameSize) {
          // don't trigger resize notification if the size is what we expect
          return;
        }
      }

      _this.emit('resize');
    }); // Only enable the checker immediately if args.disabled wasn't set to true

    if (!args.disabled) {
      _this.enable();
    }

    return _this;
  }

  _createClass(ResizeChecker, [{
    key: "enable",
    value: function enable() {
      if (this.destroyed) {
        // Don't allow enabling an already destroyed resize checker
        return;
      } // the width and height of the element that we expect to see
      // on the next resize notification. If it matches the size at
      // the time of starting observing then it we will be ignored.
      // We know that observer and el are not null since we are not yet destroyed.


      this.expectedSize = getSize(this.el);
      this.observer.observe(this.el);
    }
    /**
     *  Run a function and ignore all resizes that occur
     *  while it's running.
     */

  }, {
    key: "modifySizeWithoutTriggeringResize",
    value: function modifySizeWithoutTriggeringResize(block) {
      try {
        block();
      } finally {
        if (this.el) {
          this.expectedSize = getSize(this.el);
        }
      }
    }
    /**
     * Tell the ResizeChecker to shutdown, stop listenings, and never
     * emit another resize event.
     *
     * Cleans up it's listeners and timers.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.destroyed) {
        return;
      }

      this.destroyed = true;
      this.observer.disconnect();
      this.observer = null;
      this.expectedSize = null;
      this.el = null;
      this.removeAllListeners();
    }
  }]);

  return ResizeChecker;
}(_events.EventEmitter);

exports.ResizeChecker = ResizeChecker;