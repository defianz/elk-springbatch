"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginsService = void 0;

var _plugin = require("./plugin");

var _plugin_context = require("./plugin_context");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Service responsible for loading plugin bundles, initializing plugins, and managing the lifecycle
 * of all plugins.
 *
 * @internal
 */
var PluginsService =
/*#__PURE__*/
function () {
  /** Plugin wrappers in topological order. */
  function PluginsService(coreContext) {
    _classCallCheck(this, PluginsService);

    this.coreContext = coreContext;

    _defineProperty(this, "plugins", new Map());

    _defineProperty(this, "satupPlugins", []);
  }

  _createClass(PluginsService, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(deps) {
        var _this = this;

        var contracts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, pluginName, plugin, pluginDeps, pluginDepContracts;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Construct plugin wrappers, depending on the topological order set by the server.
                deps.injectedMetadata.getPlugins().forEach(function (_ref) {
                  var id = _ref.id,
                      plugin = _ref.plugin;
                  return _this.plugins.set(id, new _plugin.PluginWrapper(plugin, (0, _plugin_context.createPluginInitializerContext)(deps, plugin)));
                }); // Load plugin bundles

                _context.next = 3;
                return this.loadPluginBundles(deps.basePath.addToPath);

              case 3:
                // Setup each plugin with required and optional plugin contracts
                contracts = new Map();
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 7;
                _iterator = this.plugins.entries()[Symbol.iterator]();

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 23;
                  break;
                }

                _step$value = _slicedToArray(_step.value, 2), pluginName = _step$value[0], plugin = _step$value[1];
                pluginDeps = new Set([].concat(_toConsumableArray(plugin.requiredPlugins), _toConsumableArray(plugin.optionalPlugins.filter(function (optPlugin) {
                  return _this.plugins.get(optPlugin);
                }))));
                pluginDepContracts = _toConsumableArray(pluginDeps.keys()).reduce(function (depContracts, dependencyName) {
                  // Only set if present. Could be absent if plugin does not have client-side code or is a
                  // missing optional plugin.
                  if (contracts.has(dependencyName)) {
                    depContracts[dependencyName] = contracts.get(dependencyName);
                  }

                  return depContracts;
                }, {});
                _context.t0 = contracts;
                _context.t1 = pluginName;
                _context.next = 17;
                return plugin.setup((0, _plugin_context.createPluginSetupContext)(this.coreContext, deps, plugin), pluginDepContracts);

              case 17:
                _context.t2 = _context.sent;

                _context.t0.set.call(_context.t0, _context.t1, _context.t2);

                this.satupPlugins.push(pluginName);

              case 20:
                _iteratorNormalCompletion = true;
                _context.next = 9;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t3 = _context["catch"](7);
                _didIteratorError = true;
                _iteratorError = _context.t3;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:
                return _context.abrupt("return", {
                  contracts: contracts
                });

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 25, 29, 37], [30,, 32, 36]]);
      }));

      function setup(_x) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(deps) {
        var _this2 = this;

        var contracts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, pluginName, plugin, pluginDeps, pluginDepContracts;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Setup each plugin with required and optional plugin contracts
                contracts = new Map();
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 4;
                _iterator2 = this.plugins.entries()[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 19;
                  break;
                }

                _step2$value = _slicedToArray(_step2.value, 2), pluginName = _step2$value[0], plugin = _step2$value[1];
                pluginDeps = new Set([].concat(_toConsumableArray(plugin.requiredPlugins), _toConsumableArray(plugin.optionalPlugins.filter(function (optPlugin) {
                  return _this2.plugins.get(optPlugin);
                }))));
                pluginDepContracts = _toConsumableArray(pluginDeps.keys()).reduce(function (depContracts, dependencyName) {
                  // Only set if present. Could be absent if plugin does not have client-side code or is a
                  // missing optional plugin.
                  if (contracts.has(dependencyName)) {
                    depContracts[dependencyName] = contracts.get(dependencyName);
                  }

                  return depContracts;
                }, {});
                _context2.t0 = contracts;
                _context2.t1 = pluginName;
                _context2.next = 14;
                return plugin.start((0, _plugin_context.createPluginStartContext)(this.coreContext, deps, plugin), pluginDepContracts);

              case 14:
                _context2.t2 = _context2.sent;

                _context2.t0.set.call(_context2.t0, _context2.t1, _context2.t2);

              case 16:
                _iteratorNormalCompletion2 = true;
                _context2.next = 6;
                break;

              case 19:
                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t3 = _context2["catch"](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t3;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError2) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError2;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                return _context2.abrupt("return", {
                  contracts: contracts
                });

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 21, 25, 33], [26,, 28, 32]]);
      }));

      function start(_x2) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, pluginName;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Stop plugins in reverse topological order.
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 3;

                for (_iterator3 = this.satupPlugins.reverse()[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  pluginName = _step3.value;
                  this.plugins.get(pluginName).stop();
                }

                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 11:
                _context3.prev = 11;
                _context3.prev = 12;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 14:
                _context3.prev = 14;

                if (!_didIteratorError3) {
                  _context3.next = 17;
                  break;
                }

                throw _iteratorError3;

              case 17:
                return _context3.finish(14);

              case 18:
                return _context3.finish(11);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 7, 11, 19], [12,, 14, 18]]);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "loadPluginBundles",
    value: function loadPluginBundles(addBasePath) {
      // Load all bundles in parallel
      return Promise.all(_toConsumableArray(this.plugins.values()).map(function (plugin) {
        return plugin.load(addBasePath);
      }));
    }
  }]);

  return PluginsService;
}();

exports.PluginsService = PluginsService;