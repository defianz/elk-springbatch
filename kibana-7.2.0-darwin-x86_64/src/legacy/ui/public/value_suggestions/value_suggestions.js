"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestionsProvider = getSuggestionsProvider;

var _lodash = require("lodash");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getSuggestionsProvider(config, fetch) {
  var requestSuggestions = (0, _lodash.memoize)(function (index, field, query) {
    var boolFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return fetch({
      pathname: "/api/kibana/suggestions/values/".concat(index),
      method: 'POST',
      body: JSON.stringify({
        query: query,
        field: field.name,
        boolFilter: boolFilter
      })
    });
  }, resolver);
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(index, field, query, boolFilter) {
        var shouldSuggestValues;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                shouldSuggestValues = config.get('filterEditor:suggestValues');

                if (!(field.type === 'boolean')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", [true, false]);

              case 5:
                if (!(!shouldSuggestValues || !field.aggregatable || field.type !== 'string')) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", []);

              case 7:
                _context.next = 9;
                return requestSuggestions(index, field, query, boolFilter);

              case 9:
                return _context.abrupt("return", _context.sent);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

function resolver(index, field, query, boolFilter) {
  // Only cache results for a minute
  var ttl = Math.floor(Date.now() / 1000 / 60);
  return [ttl, query, index, field.name, JSON.stringify(boolFilter)].join('|');
}