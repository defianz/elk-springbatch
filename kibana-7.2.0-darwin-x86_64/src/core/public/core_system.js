"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoreSystem = void 0;

require("./core.css");

var _base_path = require("./base_path");

var _chrome = require("./chrome");

var _fatal_errors = require("./fatal_errors");

var _http = require("./http");

var _i18n = require("./i18n");

var _injected_metadata = require("./injected_metadata");

var _legacy = require("./legacy");

var _notifications = require("./notifications");

var _overlays = require("./overlays");

var _plugins = require("./plugins");

var _ui_settings = require("./ui_settings");

var _application = require("./application");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The CoreSystem is the root of the new platform, and setups all parts
 * of Kibana in the UI, including the LegacyPlatform which is managed
 * by the LegacyPlatformService. As we migrate more things to the new
 * platform the CoreSystem will get many more Services.
 *
 * @internal
 */
var CoreSystem =
/*#__PURE__*/
function () {
  function CoreSystem(params) {
    var _this = this;

    _classCallCheck(this, CoreSystem);

    _defineProperty(this, "fatalErrors", void 0);

    _defineProperty(this, "injectedMetadata", void 0);

    _defineProperty(this, "legacyPlatform", void 0);

    _defineProperty(this, "notifications", void 0);

    _defineProperty(this, "http", void 0);

    _defineProperty(this, "uiSettings", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "chrome", void 0);

    _defineProperty(this, "i18n", void 0);

    _defineProperty(this, "overlay", void 0);

    _defineProperty(this, "plugins", void 0);

    _defineProperty(this, "application", void 0);

    _defineProperty(this, "rootDomElement", void 0);

    _defineProperty(this, "fatalErrorsSetup", null);

    var rootDomElement = params.rootDomElement,
        browserSupportsCsp = params.browserSupportsCsp,
        injectedMetadata = params.injectedMetadata,
        requireLegacyFiles = params.requireLegacyFiles,
        useLegacyTestHarness = params.useLegacyTestHarness;
    this.rootDomElement = rootDomElement;
    this.i18n = new _i18n.I18nService();
    this.injectedMetadata = new _injected_metadata.InjectedMetadataService({
      injectedMetadata: injectedMetadata
    });
    this.fatalErrors = new _fatal_errors.FatalErrorsService(rootDomElement, function () {
      // Stop Core before rendering any fatal errors into the DOM
      _this.stop();
    });
    this.notifications = new _notifications.NotificationsService();
    this.http = new _http.HttpService();
    this.basePath = new _base_path.BasePathService();
    this.uiSettings = new _ui_settings.UiSettingsService();
    this.overlay = new _overlays.OverlayService();
    this.application = new _application.ApplicationService();
    this.chrome = new _chrome.ChromeService({
      browserSupportsCsp: browserSupportsCsp
    });
    var core = {};
    this.plugins = new _plugins.PluginsService(core);
    this.legacyPlatform = new _legacy.LegacyPlatformService({
      requireLegacyFiles: requireLegacyFiles,
      useLegacyTestHarness: useLegacyTestHarness
    });
  }

  _createClass(CoreSystem, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var i18n, _injectedMetadata, basePath, http, uiSettings, notifications, application, chrome, core;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // Setup FatalErrorsService and it's dependencies first so that we're
                // able to render any errors.
                i18n = this.i18n.setup();
                _injectedMetadata = this.injectedMetadata.setup();
                this.fatalErrorsSetup = this.fatalErrors.setup({
                  injectedMetadata: _injectedMetadata,
                  i18n: i18n
                });
                basePath = this.basePath.setup({
                  injectedMetadata: _injectedMetadata
                });
                http = this.http.setup({
                  basePath: basePath,
                  injectedMetadata: _injectedMetadata,
                  fatalErrors: this.fatalErrorsSetup
                });
                uiSettings = this.uiSettings.setup({
                  http: http,
                  injectedMetadata: _injectedMetadata,
                  basePath: basePath
                });
                notifications = this.notifications.setup({
                  uiSettings: uiSettings
                });
                application = this.application.setup();
                chrome = this.chrome.setup({
                  injectedMetadata: _injectedMetadata,
                  notifications: notifications
                });
                core = {
                  application: application,
                  basePath: basePath,
                  chrome: chrome,
                  fatalErrors: this.fatalErrorsSetup,
                  http: http,
                  i18n: i18n,
                  injectedMetadata: _injectedMetadata,
                  notifications: notifications,
                  uiSettings: uiSettings
                }; // Services that do not expose contracts at setup

                _context.next = 13;
                return this.plugins.setup(core);

              case 13:
                _context.next = 15;
                return this.legacyPlatform.setup({
                  core: core
                });

              case 15:
                return _context.abrupt("return", {
                  fatalErrors: this.fatalErrorsSetup
                });

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);

                if (this.fatalErrorsSetup) {
                  this.fatalErrorsSetup.add(_context.t0);
                } else {
                  // If the FatalErrorsService has not yet been setup, log error to console
                  // eslint-disable-next-line no-console
                  console.log(_context.t0);
                }

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _injectedMetadata2, basePath, http, i18n, application, chrome, notificationsTargetDomElement, overlayTargetDomElement, legacyPlatformTargetDomElement, notifications, overlays, core;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.injectedMetadata.start();

              case 3:
                _injectedMetadata2 = _context2.sent;
                _context2.next = 6;
                return this.basePath.start({
                  injectedMetadata: _injectedMetadata2
                });

              case 6:
                basePath = _context2.sent;
                _context2.next = 9;
                return this.http.start();

              case 9:
                http = _context2.sent;
                _context2.next = 12;
                return this.i18n.start();

              case 12:
                i18n = _context2.sent;
                _context2.next = 15;
                return this.application.start({
                  basePath: basePath,
                  injectedMetadata: _injectedMetadata2
                });

              case 15:
                application = _context2.sent;
                _context2.next = 18;
                return this.chrome.start({
                  application: application,
                  basePath: basePath
                });

              case 18:
                chrome = _context2.sent;
                notificationsTargetDomElement = document.createElement('div');
                overlayTargetDomElement = document.createElement('div');
                legacyPlatformTargetDomElement = document.createElement('div'); // ensure the rootDomElement is empty

                this.rootDomElement.textContent = '';
                this.rootDomElement.classList.add('coreSystemRootDomElement');
                this.rootDomElement.appendChild(notificationsTargetDomElement);
                this.rootDomElement.appendChild(legacyPlatformTargetDomElement);
                this.rootDomElement.appendChild(overlayTargetDomElement);
                _context2.next = 29;
                return this.notifications.start({
                  i18n: i18n,
                  targetDomElement: notificationsTargetDomElement
                });

              case 29:
                notifications = _context2.sent;
                overlays = this.overlay.start({
                  i18n: i18n,
                  targetDomElement: overlayTargetDomElement
                });
                core = {
                  application: application,
                  basePath: basePath,
                  chrome: chrome,
                  http: http,
                  i18n: i18n,
                  injectedMetadata: _injectedMetadata2,
                  notifications: notifications,
                  overlays: overlays
                };
                _context2.next = 34;
                return this.plugins.start(core);

              case 34:
                _context2.next = 36;
                return this.legacyPlatform.start({
                  core: core,
                  targetDomElement: legacyPlatformTargetDomElement
                });

              case 36:
                _context2.next = 41;
                break;

              case 38:
                _context2.prev = 38;
                _context2.t0 = _context2["catch"](0);

                if (this.fatalErrorsSetup) {
                  this.fatalErrorsSetup.add(_context2.t0);
                } else {
                  // If the FatalErrorsService has not yet been setup, log error to console
                  // eslint-disable-next-line no-console
                  console.error(_context2.t0);
                }

              case 41:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 38]]);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this.legacyPlatform.stop();
      this.plugins.stop();
      this.notifications.stop();
      this.http.stop();
      this.uiSettings.stop();
      this.chrome.stop();
      this.i18n.stop();
      this.rootDomElement.textContent = '';
    }
  }]);

  return CoreSystem;
}();

exports.CoreSystem = CoreSystem;