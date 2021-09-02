"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalService = exports.ModalRef = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A ModalRef is a reference to an opened modal. It offers methods to
 * close the modal.
 *
 * @public
 */
var ModalRef =
/*#__PURE__*/
function () {
  function ModalRef() {
    _classCallCheck(this, ModalRef);

    _defineProperty(this, "onClose", void 0);

    _defineProperty(this, "closeSubject", new _rxjs.Subject());

    this.onClose = this.closeSubject.toPromise();
  }
  /**
   * Closes the referenced modal if it's still open which in turn will
   * resolve the `onClose` Promise. If the modal had already been
   * closed this method does nothing.
   */


  _createClass(ModalRef, [{
    key: "close",
    value: function close() {
      if (!this.closeSubject.closed) {
        this.closeSubject.next();
        this.closeSubject.complete();
      }

      return this.onClose;
    }
  }]);

  return ModalRef;
}();
/** @internal */


exports.ModalRef = ModalRef;

var ModalService =
/*#__PURE__*/
function () {
  function ModalService(targetDomElement) {
    var _this = this;

    _classCallCheck(this, ModalService);

    this.targetDomElement = targetDomElement;

    _defineProperty(this, "activeModal", null);

    _defineProperty(this, "openModal", function (i18n, modalChildren) {
      var modalProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // If there is an active flyout session close it before opening a new one.
      if (_this.activeModal) {
        _this.activeModal.close();

        _this.cleanupDom();
      }

      var modal = new ModalRef(); // If a modal gets closed through it's ModalRef, remove it from the dom

      modal.onClose.then(function () {
        if (_this.activeModal === modal) {
          _this.cleanupDom();
        }
      });
      _this.activeModal = modal;
      (0, _reactDom.render)(_react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(i18n.Context, null, _react.default.createElement(_eui.EuiModal, _extends({}, modalProps, {
        onClose: function onClose() {
          return modal.close();
        }
      }), modalChildren))), _this.targetDomElement);
      return modal;
    });
  }
  /**
   * Opens a flyout panel with the given component inside. You can use
   * `close()` on the returned FlyoutRef to close the flyout.
   *
   * @param flyoutChildren - Mounts the children inside a flyout panel
   * @return {FlyoutRef} A reference to the opened flyout panel.
   */


  _createClass(ModalService, [{
    key: "cleanupDom",

    /**
     * Using React.Render to re-render into a target DOM element will replace
     * the content of the target but won't call unmountComponent on any
     * components inside the target or any of their children. So we properly
     * cleanup the DOM here to prevent subtle bugs in child components which
     * depend on unmounting for cleanup behaviour.
     */
    value: function cleanupDom() {
      (0, _reactDom.unmountComponentAtNode)(this.targetDomElement);
      this.targetDomElement.innerHTML = '';
      this.activeModal = null;
    }
  }]);

  return ModalService;
}();

exports.ModalService = ModalService;