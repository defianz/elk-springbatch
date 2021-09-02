"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__reset__ = __reset__;
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.__newPlatformStart__ = __newPlatformStart__;
exports.getNewPlatform = getNewPlatform;
exports.onSetup = onSetup;
exports.onStart = onStart;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var runtimeContext = {
  setup: {
    core: null,
    plugins: {}
  },
  start: {
    core: null,
    plugins: {}
  }
};
/**
 * Only used by unit tests
 * @internal
 */

function __reset__() {
  runtimeContext.setup.core = null;
  runtimeContext.start.core = null;
}

function __newPlatformSetup__(_x) {
  return _newPlatformSetup__.apply(this, arguments);
}

function _newPlatformSetup__() {
  _newPlatformSetup__ = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(core) {
    var cb;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!runtimeContext.setup.core) {
              _context.next = 2;
              break;
            }

            throw new Error('New platform core api was already set up');

          case 2:
            runtimeContext.setup.core = core; // Process any pending onSetup callbacks

          case 3:
            if (!onSetupCallbacks.length) {
              _context.next = 9;
              break;
            }

            cb = onSetupCallbacks.shift();
            _context.next = 7;
            return cb(runtimeContext.setup);

          case 7:
            _context.next = 3;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _newPlatformSetup__.apply(this, arguments);
}

function __newPlatformStart__(_x2) {
  return _newPlatformStart__.apply(this, arguments);
}

function _newPlatformStart__() {
  _newPlatformStart__ = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(core) {
    var cb;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!runtimeContext.start.core) {
              _context2.next = 2;
              break;
            }

            throw new Error('New platform core api was already started');

          case 2:
            runtimeContext.start.core = core; // Process any pending onStart callbacks

          case 3:
            if (!onStartCallbacks.length) {
              _context2.next = 9;
              break;
            }

            cb = onStartCallbacks.shift();
            _context2.next = 7;
            return cb(runtimeContext.start);

          case 7:
            _context2.next = 3;
            break;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _newPlatformStart__.apply(this, arguments);
}

function getNewPlatform() {
  if (runtimeContext.setup.core === null || runtimeContext.start.core === null) {
    throw new Error('runtimeContext is not initialized yet');
  }

  return runtimeContext;
}

var onSetupCallbacks = [];
var onStartCallbacks = [];
/**
 * Register a callback to be called once the new platform is in the
 * `setup` lifecycle event. Resolves to the return value of the callback.
 */

function onSetup(_x3) {
  return _onSetup.apply(this, arguments);
}
/**
 * Register a callback to be called once the new platform is in the
 * `start` lifecycle event. Resolves to the return value of the callback.
 */


function _onSetup() {
  _onSetup = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(callback) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(runtimeContext.setup.core !== null)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", callback(runtimeContext.setup));

          case 2:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              onSetupCallbacks.push(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(setupContext) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.prev = 0;
                          _context3.t0 = resolve;
                          _context3.next = 4;
                          return callback(setupContext);

                        case 4:
                          _context3.t1 = _context3.sent;
                          (0, _context3.t0)(_context3.t1);
                          _context3.next = 11;
                          break;

                        case 8:
                          _context3.prev = 8;
                          _context3.t2 = _context3["catch"](0);
                          reject(_context3.t2);

                        case 11:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, null, [[0, 8]]);
                }));

                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _onSetup.apply(this, arguments);
}

function onStart(_x4) {
  return _onStart.apply(this, arguments);
}

function _onStart() {
  _onStart = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(callback) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(runtimeContext.start.core !== null)) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", callback(runtimeContext.start));

          case 2:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              onStartCallbacks.push(
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5(startContext) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.prev = 0;
                          _context5.t0 = resolve;
                          _context5.next = 4;
                          return callback(startContext);

                        case 4:
                          _context5.t1 = _context5.sent;
                          (0, _context5.t0)(_context5.t1);
                          _context5.next = 11;
                          break;

                        case 8:
                          _context5.prev = 8;
                          _context5.t2 = _context5["catch"](0);
                          reject(_context5.t2);

                        case 11:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, null, [[0, 8]]);
                }));

                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _onStart.apply(this, arguments);
}