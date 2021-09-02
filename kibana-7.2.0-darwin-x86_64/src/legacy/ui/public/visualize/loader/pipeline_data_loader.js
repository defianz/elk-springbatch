"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineDataLoader = void 0;

var _pipeline_helpers = require("./pipeline_helpers");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PipelineDataLoader =
/*#__PURE__*/
function () {
  function PipelineDataLoader(vis) {
    _classCallCheck(this, PipelineDataLoader);

    this.vis = vis;
  }

  _createClass(PipelineDataLoader, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _pipeline_helpers.buildPipeline)(this.vis, params);

              case 2:
                this.vis.pipelineExpression = _context.sent;
                _context.next = 5;
                return (0, _pipeline_helpers.runPipeline)(this.vis.pipelineExpression, {}, {
                  getInitialContext: function getInitialContext() {
                    return {
                      query: params.query,
                      timeRange: params.timeRange,
                      filters: params.filters ? params.filters.filter(function (filter) {
                        return !filter.meta.disabled;
                      }) : undefined
                    };
                  },
                  inspectorAdapters: params.inspectorAdapters
                });

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }]);

  return PipelineDataLoader;
}();

exports.PipelineDataLoader = PipelineDataLoader;