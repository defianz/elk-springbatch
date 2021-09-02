"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLinksService = void 0;

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _nav_link = require("./nav_link");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavLinksService =
/*#__PURE__*/
function () {
  function NavLinksService() {
    _classCallCheck(this, NavLinksService);

    _defineProperty(this, "stop$", new _rxjs.ReplaySubject(1));
  }

  _createClass(NavLinksService, [{
    key: "start",
    value: function start(_ref) {
      var _this = this;

      var application = _ref.application,
          basePath = _ref.basePath;
      var navLinks$ = new _rxjs.BehaviorSubject(new Map(application.availableApps.map(function (app) {
        return [app.id, new _nav_link.NavLinkWrapper(_objectSpread({}, app, {
          // Either rootRoute or appUrl must be defined.
          baseUrl: relativeToAbsolute(basePath.addToPath(app.rootRoute || app.appUrl))
        }))];
      })));
      var forceAppSwitcherNavigation$ = new _rxjs.BehaviorSubject(false);
      return {
        /**
         * Get an observable for a sorted list of navlinks.
         */
        getNavLinks$: function getNavLinks$() {
          return navLinks$.pipe((0, _operators.map)(sortNavLinks), (0, _operators.takeUntil)(_this.stop$));
        },

        /**
         * Get the state of a navlink at this point in time.
         * @param id
         */
        get: function get(id) {
          var link = navLinks$.value.get(id);
          return link && link.properties;
        },

        /**
         * Get the current state of all navlinks.
         */
        getAll: function getAll() {
          return sortNavLinks(navLinks$.value);
        },

        /**
         * Check whether or not a navlink exists.
         * @param id
         */
        has: function has(id) {
          return navLinks$.value.has(id);
        },

        /**
         * Remove all navlinks except the one matching the given id.
         * NOTE: this is not reversible.
         * @param id
         */
        showOnly: function showOnly(id) {
          if (!this.has(id)) {
            return;
          }

          navLinks$.next(new Map(_toConsumableArray(navLinks$.value.entries()).filter(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 1),
                linkId = _ref3[0];

            return linkId === id;
          })));
        },

        /**
         * Update the navlink for the given id with the updated attributes.
         * Returns the updated navlink or `undefined` if it does not exist.
         * @param id
         * @param values
         */
        update: function update(id, values) {
          if (!this.has(id)) {
            return;
          }

          navLinks$.next(new Map(_toConsumableArray(navLinks$.value.entries()).map(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                linkId = _ref5[0],
                link = _ref5[1];

            return [linkId, link.id === id ? link.update(values) : link];
          })));
          return this.get(id);
        },

        /**
         * Enable forced navigation mode, which will trigger a page refresh
         * when a nav link is clicked and only the hash is updated. This is only
         * necessary when rendering the status page in place of another app, as
         * links to that app will set the current URL and change the hash, but
         * the routes for the correct are not loaded so nothing will happen.
         * https://github.com/elastic/kibana/pull/29770
         *
         * Used only by status_page plugin
         */
        enableForcedAppSwitcherNavigation: function enableForcedAppSwitcherNavigation() {
          forceAppSwitcherNavigation$.next(true);
        },

        /**
         * An observable of the forced app switcher state.
         */
        getForceAppSwitcherNavigation$: function getForceAppSwitcherNavigation$() {
          return forceAppSwitcherNavigation$.asObservable();
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
    }
  }]);

  return NavLinksService;
}();

exports.NavLinksService = NavLinksService;

function sortNavLinks(navLinks) {
  return (0, _lodash.sortBy)(_toConsumableArray(navLinks.values()).map(function (link) {
    return link.properties;
  }), 'order');
}

function relativeToAbsolute(url) {
  // convert all link urls to absolute urls
  var a = document.createElement('a');
  a.setAttribute('href', url);
  return a.href;
}