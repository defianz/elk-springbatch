"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationsService = void 0;

var _i18n = require("@kbn/i18n");

var _toasts = require("./toasts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @public */
var NotificationsService =
/*#__PURE__*/
function () {
  function NotificationsService() {
    _classCallCheck(this, NotificationsService);

    _defineProperty(this, "toasts", void 0);

    _defineProperty(this, "uiSettingsErrorSubscription", void 0);

    _defineProperty(this, "targetDomElement", void 0);

    this.toasts = new _toasts.ToastsService();
  }

  _createClass(NotificationsService, [{
    key: "setup",
    value: function setup(_ref) {
      var uiSettings = _ref.uiSettings;
      var notificationSetup = {
        toasts: this.toasts.setup()
      };
      this.uiSettingsErrorSubscription = uiSettings.getUpdateErrors$().subscribe(function (error) {
        notificationSetup.toasts.addDanger({
          title: _i18n.i18n.translate('core.notifications.unableUpdateUISettingNotificationMessageTitle', {
            defaultMessage: 'Unable to update UI setting'
          }),
          text: error.message
        });
      });
      return notificationSetup;
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var i18nDep = _ref2.i18n,
          targetDomElement = _ref2.targetDomElement;
      this.targetDomElement = targetDomElement;
      var toastsContainer = document.createElement('div');
      targetDomElement.appendChild(toastsContainer);
      return {
        toasts: this.toasts.start({
          i18n: i18nDep,
          targetDomElement: toastsContainer
        })
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.toasts.stop();

      if (this.targetDomElement) {
        this.targetDomElement.textContent = '';
      }

      if (this.uiSettingsErrorSubscription) {
        this.uiSettingsErrorSubscription.unsubscribe();
      }
    }
  }]);

  return NotificationsService;
}();
/** @public */


exports.NotificationsService = NotificationsService;