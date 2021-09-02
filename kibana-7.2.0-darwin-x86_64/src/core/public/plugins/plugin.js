"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginWrapper = void 0;

var _plugin_loader = require("./plugin_loader");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Lightweight wrapper around discovered plugin that is responsible for instantiating
 * plugin and dispatching proper context and dependencies into plugin's lifecycle hooks.
 *
 * @internal
 */
var PluginWrapper =
/*#__PURE__*/
function () {
  function PluginWrapper(discoveredPlugin, initializerContext) {
    _classCallCheck(this, PluginWrapper);

    this.discoveredPlugin = discoveredPlugin;
    this.initializerContext = initializerContext;

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "configPath", void 0);

    _defineProperty(this, "requiredPlugins", void 0);

    _defineProperty(this, "optionalPlugins", void 0);

    _defineProperty(this, "initializer", void 0);

    _defineProperty(this, "instance", void 0);

    this.name = discoveredPlugin.id;
    this.configPath = discoveredPlugin.configPath;
    this.requiredPlugins = discoveredPlugin.requiredPlugins;
    this.optionalPlugins = discoveredPlugin.optionalPlugins;
  }
  /**
   * Loads the plugin's bundle into the browser. Should be called in parallel with all plugins
   * using `Promise.all`. Must be called before `setup`.
   * @param addBasePath Function that adds the base path to a string for plugin bundle path.
   */


  _createClass(PluginWrapper, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(addBasePath) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _plugin_loader.loadPluginBundle)(addBasePath, this.name);

              case 2:
                this.initializer = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
    /**
     * Instantiates plugin and calls `setup` function exposed by the plugin initializer.
     * @param setupContext Context that consists of various core services tailored specifically
     * for the `setup` lifecycle event.
     * @param plugins The dictionary where the key is the dependency name and the value
     * is the contract returned by the dependency's `setup` function.
     */

  }, {
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(setupContext, plugins) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.createPluginInstance();

              case 2:
                this.instance = _context2.sent;
                _context2.next = 5;
                return this.instance.setup(setupContext, plugins);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup(_x2, _x3) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
    /**
     * Calls `setup` function exposed by the initialized plugin.
     * @param startContext Context that consists of various core services tailored specifically
     * for the `start` lifecycle event.
     * @param plugins The dictionary where the key is the dependency name and the value
     * is the contract returned by the dependency's `start` function.
     */

  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(startContext, plugins) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.instance === undefined)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("Plugin \"".concat(this.name, "\" can't be started since it isn't set up."));

              case 2:
                _context3.next = 4;
                return this.instance.start(startContext, plugins);

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start(_x4, _x5) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
    /**
     * Calls optional `stop` function exposed by the plugin initializer.
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.instance === undefined) {
        throw new Error("Plugin \"".concat(this.name, "\" can't be stopped since it isn't set up."));
      }

      if (typeof this.instance.stop === 'function') {
        this.instance.stop();
      }

      this.instance = undefined;
    }
  }, {
    key: "createPluginInstance",
    value: function () {
      var _createPluginInstance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var instance;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.initializer === undefined)) {
                  _context4.next = 2;
                  break;
                }

                throw new Error("Plugin \"".concat(this.name, "\" can't be setup since its bundle isn't loaded."));

              case 2:
                instance = this.initializer(this.initializerContext);

                if (!(typeof instance.setup !== 'function')) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Instance of plugin \"".concat(this.name, "\" does not define \"setup\" function."));

              case 7:
                if (!(typeof instance.start !== 'function')) {
                  _context4.next = 9;
                  break;
                }

                throw new Error("Instance of plugin \"".concat(this.name, "\" does not define \"start\" function."));

              case 9:
                return _context4.abrupt("return", instance);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createPluginInstance() {
        return _createPluginInstance.apply(this, arguments);
      }

      return createPluginInstance;
    }()
  }]);

  return PluginWrapper;
}();

exports.PluginWrapper = PluginWrapper;