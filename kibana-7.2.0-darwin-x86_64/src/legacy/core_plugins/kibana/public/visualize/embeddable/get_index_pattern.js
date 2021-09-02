"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPattern = getIndexPattern;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _static_utils = require("ui/index_patterns/static_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getIndexPattern(_x) {
  return _getIndexPattern.apply(this, arguments);
}

function _getIndexPattern() {
  _getIndexPattern = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(savedVis) {
    var config, savedObjectsClient, defaultIndex, indexPatternObjects, _indexPatternObjects$, _indexPatternObjects$2, indexPattern, savedObject;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(savedVis.vis.type.name !== 'metrics')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", savedVis.vis.indexPattern);

          case 2:
            config = _chrome.default.getUiSettingsClient();
            savedObjectsClient = _chrome.default.getSavedObjectsClient();
            defaultIndex = config.get('defaultIndex');

            if (!savedVis.vis.params.index_pattern) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return savedObjectsClient.find({
              type: 'index-pattern',
              fields: ['title', 'fields'],
              search: "\"".concat(savedVis.vis.params.index_pattern, "\""),
              searchFields: ['title']
            });

          case 8:
            indexPatternObjects = _context.sent;
            _indexPatternObjects$ = indexPatternObjects.savedObjects.map(_static_utils.getFromSavedObject), _indexPatternObjects$2 = _slicedToArray(_indexPatternObjects$, 1), indexPattern = _indexPatternObjects$2[0];
            return _context.abrupt("return", indexPattern);

          case 11:
            _context.next = 13;
            return savedObjectsClient.get('index-pattern', defaultIndex);

          case 13:
            savedObject = _context.sent;
            return _context.abrupt("return", (0, _static_utils.getFromSavedObject)(savedObject));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getIndexPattern.apply(this, arguments);
}