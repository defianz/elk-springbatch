"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChromeService = void 0;

var Url = _interopRequireWildcard(require("url"));

var _i18n = require("@kbn/i18n");

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _nav_links_service = require("./nav_links/nav_links_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IS_COLLAPSED_KEY = 'core.chrome.isCollapsed';

function isEmbedParamInHash() {
  var _Url$parse = Url.parse(String(window.location.hash).slice(1), true),
      query = _Url$parse.query;

  return Boolean(query.embed);
}
/** @public */


/** @internal */
var ChromeService =
/*#__PURE__*/
function () {
  function ChromeService(_ref) {
    var browserSupportsCsp = _ref.browserSupportsCsp;

    _classCallCheck(this, ChromeService);

    _defineProperty(this, "stop$", new Rx.ReplaySubject(1));

    _defineProperty(this, "browserSupportsCsp", void 0);

    _defineProperty(this, "navLinks", new _nav_links_service.NavLinksService());

    this.browserSupportsCsp = browserSupportsCsp;
  }

  _createClass(ChromeService, [{
    key: "setup",
    value: function setup(_ref2) {
      var _this = this;

      var injectedMetadata = _ref2.injectedMetadata,
          notifications = _ref2.notifications;
      var FORCE_HIDDEN = isEmbedParamInHash();
      var brand$ = new Rx.BehaviorSubject({});
      var isVisible$ = new Rx.BehaviorSubject(true);
      var isCollapsed$ = new Rx.BehaviorSubject(!!localStorage.getItem(IS_COLLAPSED_KEY));
      var applicationClasses$ = new Rx.BehaviorSubject(new Set());
      var helpExtension$ = new Rx.BehaviorSubject(undefined);
      var breadcrumbs$ = new Rx.BehaviorSubject([]);
      var badge$ = new Rx.BehaviorSubject(undefined);

      if (!this.browserSupportsCsp && injectedMetadata.getCspConfig().warnLegacyBrowsers) {
        notifications.toasts.addWarning(_i18n.i18n.translate('core.chrome.legacyBrowserWarning', {
          defaultMessage: 'Your browser does not meet the security requirements for Kibana.'
        }));
      }

      return {
        /**
         * Set the brand configuration. Normally the `logo` property will be rendered as the
         * CSS background for the home link in the chrome navigation, but when the page is
         * rendered in a small window the `smallLogo` will be used and rendered at about
         * 45px wide.
         *
         * example:
         *
         *    chrome.setBrand({
         *      logo: 'url(/plugins/app/logo.png) center no-repeat'
         *      smallLogo: 'url(/plugins/app/logo-small.png) center no-repeat'
         *    })
         *
         */
        setBrand: function setBrand(brand) {
          brand$.next(Object.freeze({
            logo: brand.logo,
            smallLogo: brand.smallLogo
          }));
        },

        /**
         * Get an observable of the current brand information.
         */
        getBrand$: function getBrand$() {
          return brand$.pipe((0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Set the temporary visibility for the chrome. This does nothing if the chrome is hidden
         * by default and should be used to hide the chrome for things like full-screen modes
         * with an exit button.
         */
        setIsVisible: function setIsVisible(visibility) {
          isVisible$.next(visibility);
        },

        /**
         * Get an observable of the current visibility state of the chrome.
         */
        getIsVisible$: function getIsVisible$() {
          return isVisible$.pipe((0, _operators.map)(function (visibility) {
            return FORCE_HIDDEN ? false : visibility;
          }), (0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Set the collapsed state of the chrome navigation.
         */
        setIsCollapsed: function setIsCollapsed(isCollapsed) {
          isCollapsed$.next(isCollapsed);

          if (isCollapsed) {
            localStorage.setItem(IS_COLLAPSED_KEY, 'true');
          } else {
            localStorage.removeItem(IS_COLLAPSED_KEY);
          }
        },

        /**
         * Get an observable of the current collapsed state of the chrome.
         */
        getIsCollapsed$: function getIsCollapsed$() {
          return isCollapsed$.pipe((0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Add a className that should be set on the application container.
         */
        addApplicationClass: function addApplicationClass(className) {
          var update = new Set(_toConsumableArray(applicationClasses$.getValue()));
          update.add(className);
          applicationClasses$.next(update);
        },

        /**
         * Remove a className added with `addApplicationClass()`. If className is unknown it is ignored.
         */
        removeApplicationClass: function removeApplicationClass(className) {
          var update = new Set(_toConsumableArray(applicationClasses$.getValue()));
          update.delete(className);
          applicationClasses$.next(update);
        },

        /**
         * Get the current set of classNames that will be set on the application container.
         */
        getApplicationClasses$: function getApplicationClasses$() {
          return applicationClasses$.pipe((0, _operators.map)(function (set) {
            return _toConsumableArray(set);
          }), (0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Get an observable of the current badge
         */
        getBadge$: function getBadge$() {
          return badge$.pipe((0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Override the current badge
         */
        setBadge: function setBadge(badge) {
          badge$.next(badge);
        },

        /**
         * Get an observable of the current list of breadcrumbs
         */
        getBreadcrumbs$: function getBreadcrumbs$() {
          return breadcrumbs$.pipe((0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Override the current set of breadcrumbs
         */
        setBreadcrumbs: function setBreadcrumbs(newBreadcrumbs) {
          breadcrumbs$.next(newBreadcrumbs);
        },

        /**
         * Get an observable of the current custom help conttent
         */
        getHelpExtension$: function getHelpExtension$() {
          return helpExtension$.pipe((0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Override the current set of breadcrumbs
         */
        setHelpExtension: function setHelpExtension(helpExtension) {
          helpExtension$.next(helpExtension);
        }
      };
    }
  }, {
    key: "start",
    value: function start(_ref3) {
      var application = _ref3.application,
          basePath = _ref3.basePath;
      return {
        navLinks: this.navLinks.start({
          application: application,
          basePath: basePath
        })
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.navLinks.stop();
      this.stop$.next();
    }
  }]);

  return ChromeService;
}();
/** @public */


exports.ChromeService = ChromeService;