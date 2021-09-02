"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisualizeLoader = getVisualizeLoader;
exports.VisualizeLoaderProvider = VisualizeLoaderProvider;
exports.VisualizeLoader = void 0;

var _chrome = _interopRequireDefault(require("../../chrome"));

var _query_filter = require("../../filter_bar/query_filter");

var _embedded_visualize_handler = require("./embedded_visualize_handler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VisualizeLoader =
/*#__PURE__*/
function () {
  function VisualizeLoader(savedVisualizations, pipelineDataLoader, Private) {
    _classCallCheck(this, VisualizeLoader);

    this.savedVisualizations = savedVisualizations;
    this.pipelineDataLoader = pipelineDataLoader;
    this.Private = Private;
  }
  /**
   * Renders a saved visualization specified by its id into a DOM element.
   *
   * @param element The DOM element to render the visualization into.
   *    You can alternatively pass a jQuery element instead.
   * @param id The id of the saved visualization. This is the id of the
   *    saved object that is stored in the .kibana index.
   * @param params A list of parameters that will influence rendering.
   *
   * @return A promise that resolves to the
   *    handler for this visualization as soon as the saved object could be found.
   */


  _createClass(VisualizeLoader, [{
    key: "embedVisualizationWithId",
    value: function () {
      var _embedVisualizationWithId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(element, savedVisualizationId, params) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this.savedVisualizations.get(savedVisualizationId).then(function (savedObj) {
                    var handler = _this.renderVis(element, savedObj, params);

                    resolve(handler);
                  }, reject);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function embedVisualizationWithId(_x, _x2, _x3) {
        return _embedVisualizationWithId.apply(this, arguments);
      }

      return embedVisualizationWithId;
    }()
    /**
     * Renders a saved visualization specified by its savedObject into a DOM element.
     * In most of the cases you will need this method, since it allows you to specify
     * filters, handlers, queries, etc. on the savedObject before rendering.
     *
     * We do not encourage you to use this method, since it will most likely be changed
     * or removed in a future version of Kibana. Rather embed a visualization by its id
     * via the {@link #embedVisualizationWithId} method.
     *
     * @deprecated You should rather embed by id, since this method will be removed in the future.
     * @param element The DOM element to render the visualization into.
     *    You can alternatively pass a jQuery element instead.
     * @param savedObj The savedObject as it could be retrieved by the
     *    `savedVisualizations` service.
     * @param params A list of parameters that will influence rendering.
     *
     * @return The handler to the visualization.
     */

  }, {
    key: "embedVisualizationWithSavedObject",
    value: function embedVisualizationWithSavedObject(el, savedObj, params) {
      return this.renderVis(el, savedObj, params);
    }
    /**
     * Returns a promise, that resolves to a list of all saved visualizations.
     *
     * @return Resolves with a list of all saved visualizations as
     *    returned by the `savedVisualizations` service in Kibana.
     */

  }, {
    key: "getVisualizationList",
    value: function getVisualizationList() {
      return this.savedVisualizations.find().then(function (result) {
        return result.hits;
      });
    }
  }, {
    key: "renderVis",
    value: function renderVis(container, savedObj, params) {
      var vis = savedObj.vis,
          description = savedObj.description,
          searchSource = savedObj.searchSource;
      vis.description = description;
      vis.searchSource = searchSource;

      if (!params.append) {
        container.innerHTML = '';
      }

      var element = document.createElement('div');
      element.className = 'visualize';
      element.setAttribute('data-test-subj', 'visualizationLoader');
      container.appendChild(element); // We need the container to have display: flex so visualization will render correctly

      container.style.display = 'flex'; // If params specified cssClass, we will set this to the element.

      if (params.cssClass) {
        params.cssClass.split(' ').forEach(function (cssClass) {
          element.classList.add(cssClass);
        });
      } // Apply data- attributes to the element if specified


      var dataAttrs = params.dataAttrs;

      if (dataAttrs) {
        Object.keys(dataAttrs).forEach(function (key) {
          element.setAttribute("data-".concat(key), dataAttrs[key]);
        });
      }

      var handlerParams = _objectSpread({}, params, {
        // lets add query filter angular service to the params
        queryFilter: this.Private(_query_filter.FilterBarQueryFilterProvider),
        // lets add Private to the params, we'll need to pass it to visualize later
        Private: this.Private,
        pipelineDataLoader: this.pipelineDataLoader
      });

      return new _embedded_visualize_handler.EmbeddedVisualizeHandler(element, savedObj, handlerParams);
    }
  }]);

  return VisualizeLoader;
}();

exports.VisualizeLoader = VisualizeLoader;

function VisualizeLoaderProvider(savedVisualizations, interpreterConfig, Private) {
  return new VisualizeLoader(savedVisualizations, interpreterConfig.enableInVisualize, Private);
}
/**
 * Returns a promise, that resolves with the visualize loader, once it's ready.
 * @return A promise, that resolves to the visualize loader.
 */


function getVisualizeLoader() {
  return _chrome.default.dangerouslyGetActiveInjector().then(function ($injector) {
    var Private = $injector.get('Private');
    return Private(VisualizeLoaderProvider);
  });
}