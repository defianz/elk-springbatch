"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayService = void 0;

var _flyout = require("./flyout");

var _modal = require("./modal");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var OverlayService =
/*#__PURE__*/
function () {
  function OverlayService() {
    _classCallCheck(this, OverlayService);

    _defineProperty(this, "flyoutService", void 0);

    _defineProperty(this, "modalService", void 0);
  }

  _createClass(OverlayService, [{
    key: "start",
    value: function start(_ref) {
      var i18n = _ref.i18n,
          targetDomElement = _ref.targetDomElement;
      var flyoutElement = document.createElement('div');
      var modalElement = document.createElement('div');
      targetDomElement.appendChild(flyoutElement);
      targetDomElement.appendChild(modalElement);
      this.flyoutService = new _flyout.FlyoutService(flyoutElement);
      this.modalService = new _modal.ModalService(modalElement);
      return {
        openFlyout: this.flyoutService.openFlyout.bind(this.flyoutService, i18n),
        openModal: this.modalService.openModal.bind(this.modalService, i18n)
      };
    }
  }]);

  return OverlayService;
}();
/** @public */


exports.OverlayService = OverlayService;