"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initChromeNavApi = initChromeNavApi;

var _absolute_to_parsed_url = require("../../url/absolute_to_parsed_url");

var _new_platform = require("../../new_platform");

var _relative_to_absolute = require("../../url/relative_to_absolute");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initChromeNavApi(chrome, internals) {
  var coreNavLinks;
  (0, _new_platform.onStart)(function (_ref) {
    var core = _ref.core;
    return coreNavLinks = core.chrome.navLinks;
  });
  /**
   * Clear last url for deleted saved objects to avoid loading pages with "Could not locate..."
   */

  chrome.untrackNavLinksForDeletedSavedObjects = function (deletedIds) {
    function urlContainsDeletedId(url) {
      var includedId = deletedIds.find(function (deletedId) {
        return url.includes(deletedId);
      });
      return includedId !== undefined;
    }

    coreNavLinks.getAll().forEach(function (link) {
      if (link.linkToLastSubUrl && urlContainsDeletedId(link.url)) {
        setLastUrl(link, link.baseUrl);
      }
    });
  };
  /**
   * Manually sets the last url for the given app. The last url for a given app is updated automatically during
   * normal page navigation, so this should only need to be called to insert a last url that was not actually
   * navigated to. For instance, when saving an object and redirecting to another page, the last url of the app
   * should be the saved instance, but because of the redirect to a different page (e.g. `Save and Add to Dashboard`
   * on visualize tab), it won't be tracked automatically and will need to be inserted manually. See
   * https://github.com/elastic/kibana/pull/11932 for more background on why this was added.
   *
   * @param id {String} - an id that represents the navigation link.
   * @param kibanaParsedUrl {KibanaParsedUrl} the url to track
   */


  chrome.trackSubUrlForApp = function (id, kibanaParsedUrl) {
    var navLink = coreNavLinks.get(id);

    if (navLink) {
      setLastUrl(navLink, kibanaParsedUrl.getAbsoluteUrl());
    }
  };

  internals.trackPossibleSubUrl =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(url) {
      var kibanaParsedUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              kibanaParsedUrl = (0, _absolute_to_parsed_url.absoluteToParsedUrl)(url, chrome.getBasePath());
              coreNavLinks.getAll() // Filter only legacy links
              .filter(function (link) {
                return link.subUrlBase;
              }).forEach(function (link) {
                var active = url.startsWith(link.subUrlBase);
                link = coreNavLinks.update(link.id, {
                  active: active
                });

                if (active) {
                  setLastUrl(link, url);
                  return;
                }

                link = refreshLastUrl(link);
                var newGlobalState = kibanaParsedUrl.getGlobalState();

                if (newGlobalState) {
                  injectNewGlobalState(link, kibanaParsedUrl.appId, newGlobalState);
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  function lastSubUrlKey(link) {
    return "lastSubUrl:".concat(link.baseUrl);
  }

  function getLastUrl(link) {
    return internals.appUrlStore.getItem(lastSubUrlKey(link));
  }

  function setLastUrl(link, url) {
    if (link.linkToLastSubUrl === false) {
      return;
    }

    internals.appUrlStore.setItem(lastSubUrlKey(link), url);
    refreshLastUrl(link);
  }

  function refreshLastUrl(link) {
    var lastSubUrl = getLastUrl(link);
    return coreNavLinks.update(link.id, {
      url: lastSubUrl || link.url || link.baseUrl
    });
  }

  function injectNewGlobalState(link, fromAppId, newGlobalState) {
    var kibanaParsedUrl = (0, _absolute_to_parsed_url.absoluteToParsedUrl)(getLastUrl(link) || link.url || link.baseUrl, chrome.getBasePath()); // don't copy global state if links are for different apps

    if (fromAppId !== kibanaParsedUrl.appId) return;
    kibanaParsedUrl.setGlobalState(newGlobalState);
    coreNavLinks.update(link.id, {
      url: kibanaParsedUrl.getAbsoluteUrl()
    });
  } // simulate a possible change in url to initialize the
  // link.active and link.lastUrl properties


  (0, _new_platform.onStart)(function (_ref3) {
    var core = _ref3.core;
    core.chrome.navLinks.getAll().filter(function (link) {
      return link.subUrlBase;
    }).forEach(function (link) {
      core.chrome.navLinks.update(link.id, {
        subUrlBase: (0, _relative_to_absolute.relativeToAbsolute)(chrome.addBasePath(link.subUrlBase))
      });
    });
    internals.trackPossibleSubUrl(document.location.href);
  });
}