"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeDataLoader = void 0;

var _lodash = require("lodash");

var _build_pipeline = require("ui/visualize/loader/pipeline_helpers/build_pipeline");

var _vis_request_handlers = require("../../registry/vis_request_handlers");

var _vis_response_handlers = require("../../registry/vis_response_handlers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getHandler(from, type) {
  if (typeof type === 'function') {
    return type;
  }

  var handlerDesc = from.find(function (handler) {
    return handler.name === type;
  });

  if (!handlerDesc) {
    throw new Error("Could not find handler \"".concat(type, "\"."));
  }

  return handlerDesc.handler;
}

var VisualizeDataLoader =
/*#__PURE__*/
function () {
  function VisualizeDataLoader(vis, Private) {
    _classCallCheck(this, VisualizeDataLoader);

    this.vis = vis;

    _defineProperty(this, "requestHandler", void 0);

    _defineProperty(this, "responseHandler", void 0);

    _defineProperty(this, "visData", void 0);

    _defineProperty(this, "previousVisState", void 0);

    _defineProperty(this, "previousRequestHandlerResponse", void 0);

    var _vis$type = vis.type,
        requestHandler = _vis$type.requestHandler,
        responseHandler = _vis$type.responseHandler;
    var requestHandlers = Private(_vis_request_handlers.VisRequestHandlersRegistryProvider);
    var responseHandlers = Private(_vis_response_handlers.VisResponseHandlersRegistryProvider);
    this.requestHandler = getHandler(requestHandlers, requestHandler);
    this.responseHandler = getHandler(responseHandlers, responseHandler);
  }

  _createClass(VisualizeDataLoader, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(params) {
        var visParams, filters, savedFilters, query, requestHandlerResponse, canSkipResponseHandler;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _build_pipeline.getVisParams)(this.vis, {
                  searchSource: params.searchSource,
                  timeRange: params.timeRange
                });

              case 2:
                visParams = _context.sent;
                filters = params.filters || [];
                savedFilters = params.searchSource.getField('filter') || [];
                query = params.query || params.searchSource.getField('query'); // searchSource is only there for courier request handler

                _context.next = 8;
                return this.requestHandler(_objectSpread({
                  partialRows: this.vis.params.partialRows || this.vis.type.requiresPartialRows,
                  metricsAtAllLevels: this.vis.isHierarchical(),
                  visParams: visParams
                }, params, {
                  query: query,
                  filters: filters.concat(savedFilters).filter(function (f) {
                    return !f.meta.disabled;
                  })
                }));

              case 8:
                requestHandlerResponse = _context.sent;
                // No need to call the response handler when there have been no data nor has there been changes
                // in the vis-state (response handler does not depend on uiState)
                canSkipResponseHandler = this.previousRequestHandlerResponse && this.previousRequestHandlerResponse === requestHandlerResponse && this.previousVisState && (0, _lodash.isEqual)(this.previousVisState, this.vis.getState());
                this.previousVisState = this.vis.getState();
                this.previousRequestHandlerResponse = requestHandlerResponse;

                if (canSkipResponseHandler) {
                  _context.next = 16;
                  break;
                }

                _context.next = 15;
                return Promise.resolve(this.responseHandler(requestHandlerResponse, visParams.dimensions));

              case 15:
                this.visData = _context.sent;

              case 16:
                return _context.abrupt("return", {
                  as: 'visualization',
                  value: {
                    visType: this.vis.type.name,
                    visData: this.visData,
                    visConfig: visParams,
                    params: {}
                  }
                });

              case 17:
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

  return VisualizeDataLoader;
}();

exports.VisualizeDataLoader = VisualizeDataLoader;