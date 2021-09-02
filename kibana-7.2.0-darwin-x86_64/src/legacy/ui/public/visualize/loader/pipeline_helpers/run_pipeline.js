"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runPipeline = void 0;

var _common = require("@kbn/interpreter/common");

var _interpreter = require("plugins/interpreter/interpreter");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var runPipeline =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(expression, context, handlers) {
    var ast, _ref2, interpreter, pipelineResponse;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ast = (0, _common.fromExpression)(expression);
            _context.next = 3;
            return (0, _interpreter.getInterpreter)();

          case 3:
            _ref2 = _context.sent;
            interpreter = _ref2.interpreter;
            _context.next = 7;
            return interpreter.interpretAst(ast, context, handlers);

          case 7:
            pipelineResponse = _context.sent;
            return _context.abrupt("return", pipelineResponse);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function runPipeline(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.runPipeline = runPipeline;