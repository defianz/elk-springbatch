"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddedVisualizeHandler = void 0;

var _events = require("events");

var _lodash = require("lodash");

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _notify = require("ui/notify");

var _registries = require("../../../../core_plugins/interpreter/public/registries");

var _inspector = require("../../inspector");

var _render_complete = require("../../render_complete");

var _timefilter = require("../../timefilter");

var _pipeline_data_loader = require("./pipeline_data_loader");

var _visualization_loader = require("./visualization_loader");

var _visualize_data_loader = require("./visualize_data_loader");

var _adapters = require("../../inspector/adapters");

var _utilities = require("./pipeline_helpers/utilities");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RENDER_COMPLETE_EVENT = 'render_complete';
var DATA_SHARED_ITEM = 'data-shared-item';
var LOADING_ATTRIBUTE = 'data-loading';
var RENDERING_COUNT_ATTRIBUTE = 'data-rendering-count';
/**
 * A handler to the embedded visualization. It offers several methods to interact
 * with the visualization.
 */

var EmbeddedVisualizeHandler =
/*#__PURE__*/
function () {
  /**
   * This observable will emit every time new data is loaded for the
   * visualization. The emitted value is the loaded data after it has
   * been transformed by the visualization's response handler.
   * This should not be used by any plugin.
   * @ignore
   */
  function EmbeddedVisualizeHandler(element, savedObject, params) {
    var _this = this;

    _classCallCheck(this, EmbeddedVisualizeHandler);

    this.element = element;

    _defineProperty(this, "data$", void 0);

    _defineProperty(this, "inspectorAdapters", {});

    _defineProperty(this, "vis", void 0);

    _defineProperty(this, "handlers", void 0);

    _defineProperty(this, "loaded", false);

    _defineProperty(this, "destroyed", false);

    _defineProperty(this, "pipelineDataLoader", false);

    _defineProperty(this, "listeners", new _events.EventEmitter());

    _defineProperty(this, "firstRenderComplete", void 0);

    _defineProperty(this, "renderCompleteHelper", void 0);

    _defineProperty(this, "shouldForceNextFetch", false);

    _defineProperty(this, "debouncedFetchAndRender", (0, _lodash.debounce)(function () {
      if (_this.destroyed) {
        return;
      }

      var forceFetch = _this.shouldForceNextFetch;
      _this.shouldForceNextFetch = false;

      _this.fetch(forceFetch).then(_this.render);
    }, 100));

    _defineProperty(this, "dataLoaderParams", void 0);

    _defineProperty(this, "appState", void 0);

    _defineProperty(this, "uiState", void 0);

    _defineProperty(this, "dataLoader", void 0);

    _defineProperty(this, "dataSubject", void 0);

    _defineProperty(this, "actions", {});

    _defineProperty(this, "events$", void 0);

    _defineProperty(this, "autoFetch", void 0);

    _defineProperty(this, "render", function () {
      var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var executeRenderer = _this.rendererProvider(response);

      if (!executeRenderer) {
        return;
      } // TODO: we have this weird situation when we need to render first,
      // and then we call fetch and render... we need to get rid of that.


      executeRenderer().then(function () {
        if (!_this.loaded) {
          _this.loaded = true;

          if (_this.autoFetch) {
            _this.fetchAndRender();
          }
        }
      });
    });

    _defineProperty(this, "openInspector", function () {
      return _inspector.Inspector.open(_this.inspectorAdapters, {
        title: _this.vis.title
      });
    });

    _defineProperty(this, "hasInspector", function () {
      return _inspector.Inspector.isAvailable(_this.inspectorAdapters);
    });

    _defineProperty(this, "reload", function () {
      _this.fetchAndRender(true);
    });

    _defineProperty(this, "incrementRenderingCount", function () {
      var renderingCount = Number(_this.element.getAttribute(RENDERING_COUNT_ATTRIBUTE) || 0);

      _this.element.setAttribute(RENDERING_COUNT_ATTRIBUTE, "".concat(renderingCount + 1));
    });

    _defineProperty(this, "onRenderCompleteListener", function () {
      _this.listeners.emit(RENDER_COMPLETE_EVENT);

      _this.element.removeAttribute(LOADING_ATTRIBUTE);

      _this.incrementRenderingCount();
    });

    _defineProperty(this, "onUiStateChange", function () {
      _this.fetchAndRender();
    });

    _defineProperty(this, "getActiveInspectorAdapters", function () {
      var adapters = {};
      var typeAdapters = _this.vis.type.inspectorAdapters; // Add the requests inspector adapters if the vis type explicitly requested it via
      // inspectorAdapters.requests: true in its definition or if it's using the courier
      // request handler, since that will automatically log its requests.

      if (typeAdapters && typeAdapters.requests || _this.vis.type.requestHandler === 'courier') {
        adapters.requests = new _adapters.RequestAdapter();
      } // Add the data inspector adapter if the vis type requested it or if the
      // vis is using courier, since we know that courier supports logging
      // its data.


      if (typeAdapters && typeAdapters.data || _this.vis.type.requestHandler === 'courier') {
        adapters.data = new _adapters.DataAdapter();
      } // Add all inspectors, that are explicitly registered with this vis type


      if (typeAdapters && typeAdapters.custom) {
        Object.entries(typeAdapters.custom).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              Adapter = _ref2[1];

          adapters[key] = new Adapter();
        });
      }

      return adapters;
    });

    _defineProperty(this, "fetchAndRender", function () {
      var forceFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _this.shouldForceNextFetch = forceFetch || _this.shouldForceNextFetch;

      _this.element.setAttribute(LOADING_ATTRIBUTE, '');

      _this.debouncedFetchAndRender();
    });

    _defineProperty(this, "handleVisUpdate", function () {
      if (_this.appState) {
        _this.appState.vis = _this.vis.getState();

        _this.appState.save();
      }

      _this.fetchAndRender();
    });

    _defineProperty(this, "fetch", function () {
      var forceFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _this.dataLoaderParams.aggs = _this.vis.getAggConfig();
      _this.dataLoaderParams.forceFetch = forceFetch;
      _this.dataLoaderParams.inspectorAdapters = _this.inspectorAdapters;
      _this.vis.filters = {
        timeRange: _this.dataLoaderParams.timeRange
      };
      _this.vis.requestError = undefined;
      _this.vis.showRequestError = false;
      return _this.dataLoader.fetch(_this.dataLoaderParams).then(function (data) {
        // Pipeline responses never throw errors, so we need to check for
        // `type: 'error'`, and then throw so it can be caught below.
        // TODO: We should revisit this after we have fully migrated
        // to the new expression pipeline infrastructure.
        if (data && data.type === 'error') {
          throw data.error;
        }

        if (data && data.value) {
          _this.dataSubject.next(data.value);
        }

        return data;
      }).catch(_this.handleDataLoaderError);
    });

    _defineProperty(this, "handleDataLoaderError", function (error) {
      // TODO: come up with a general way to cancel execution of pipeline expressions.
      if (_this.dataLoaderParams.searchSource && _this.dataLoaderParams.searchSource.cancelQueued) {
        _this.dataLoaderParams.searchSource.cancelQueued();
      }

      _this.vis.requestError = error;
      _this.vis.showRequestError = error.type && ['NO_OP_SEARCH_STRATEGY', 'UNSUPPORTED_QUERY'].includes(error.type);

      _notify.toastNotifications.addDanger({
        title: _i18n.i18n.translate('common.ui.visualize.dataLoaderError', {
          defaultMessage: 'Error in visualization'
        }),
        text: error.message
      });
    });

    _defineProperty(this, "rendererProvider", function (response) {
      var renderer = null;
      var args = [];

      if (_this.pipelineDataLoader) {
        renderer = _registries.registries.renderers.get((0, _lodash.get)(response || {}, 'as', 'visualization'));
        args = [_this.element, (0, _lodash.get)(response, 'value', {
          visType: _this.vis.type.name
        }), _this.handlers];
      } else {
        renderer = _visualization_loader.visualizationLoader;
        args = [_this.element, _this.vis, (0, _lodash.get)(response, 'value.visData', null), (0, _lodash.get)(response, 'value.visConfig', _this.vis.params), _this.uiState, {
          listenOnChange: false
        }];
      }

      if (!renderer) {
        return null;
      }

      return function () {
        var _renderer;

        return (_renderer = renderer).render.apply(_renderer, _toConsumableArray(args));
      };
    });

    var searchSource = savedObject.searchSource,
        vis = savedObject.vis;
    var appState = params.appState,
        uiState = params.uiState,
        queryFilter = params.queryFilter,
        timeRange = params.timeRange,
        filters = params.filters,
        query = params.query,
        _params$autoFetch = params.autoFetch,
        autoFetch = _params$autoFetch === void 0 ? true : _params$autoFetch,
        _params$pipelineDataL = params.pipelineDataLoader,
        pipelineDataLoader = _params$pipelineDataL === void 0 ? false : _params$pipelineDataL,
        Private = params.Private;
    this.dataLoaderParams = {
      searchSource: searchSource,
      timeRange: timeRange,
      query: query,
      queryFilter: queryFilter,
      filters: filters,
      uiState: uiState,
      aggs: vis.getAggConfig(),
      forceFetch: false
    };
    this.pipelineDataLoader = pipelineDataLoader; // Listen to the first RENDER_COMPLETE_EVENT to resolve this promise

    this.firstRenderComplete = new Promise(function (resolve) {
      _this.listeners.once(RENDER_COMPLETE_EVENT, resolve);
    });
    element.setAttribute(LOADING_ATTRIBUTE, '');
    element.setAttribute(DATA_SHARED_ITEM, '');
    element.setAttribute(RENDERING_COUNT_ATTRIBUTE, '0');
    element.addEventListener('renderComplete', this.onRenderCompleteListener);
    this.autoFetch = autoFetch;
    this.appState = appState;
    this.vis = vis;

    if (uiState) {
      vis._setUiState(uiState);
    }

    this.uiState = this.vis.getUiState();
    this.handlers = {
      vis: this.vis,
      uiState: this.uiState,
      onDestroy: function onDestroy(fn) {
        return _this.handlers.destroyFn = fn;
      }
    };
    this.vis.on('update', this.handleVisUpdate);
    this.vis.on('reload', this.reload);
    this.uiState.on('change', this.onUiStateChange);

    if (autoFetch) {
      _timefilter.timefilter.on('autoRefreshFetch', this.reload);
    } // This is a hack to give maps visualizations access to data in the
    // globalState, since they can no longer access it via searchSource.
    // TODO: Remove this as a part of elastic/kibana#30593


    this.vis.API.getGeohashBounds = function () {
      return (0, _utils.queryGeohashBounds)(_this.vis, {
        filters: _this.dataLoaderParams.filters,
        query: _this.dataLoaderParams.query
      });
    };

    this.dataLoader = pipelineDataLoader ? new _pipeline_data_loader.PipelineDataLoader(vis) : new _visualize_data_loader.VisualizeDataLoader(vis, Private);
    this.renderCompleteHelper = new _render_complete.RenderCompleteHelper(element);
    this.inspectorAdapters = this.getActiveInspectorAdapters();
    this.vis.openInspector = this.openInspector;
    this.vis.hasInspector = this.hasInspector; // init default actions

    (0, _lodash.forEach)(this.vis.type.events, function (event, eventName) {
      if (event.disabled || !eventName) {
        return;
      } else {
        _this.actions[eventName] = event.defaultAction;
      }
    });
    this.handlers.eventsSubject = new Rx.Subject();
    this.vis.eventsSubject = this.handlers.eventsSubject;
    this.events$ = this.handlers.eventsSubject.asObservable().pipe((0, _operators.share)());
    this.events$.subscribe(function (event) {
      if (_this.actions[event.name]) {
        event.data.aggConfigs = (0, _utilities.getTableAggs)(_this.vis);

        _this.actions[event.name](event.data);
      }
    });
    this.dataSubject = new Rx.Subject();
    this.data$ = this.dataSubject.asObservable().pipe((0, _operators.share)());
    this.render();
  }
  /**
   * Update properties of the embedded visualization. This method does not allow
   * updating all initial parameters, but only a subset of the ones allowed
   * in {@link VisualizeUpdateParams}.
   *
   * @param params The parameters that should be updated.
   */


  _createClass(EmbeddedVisualizeHandler, [{
    key: "update",
    value: function update() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Apply data- attributes to the element if specified
      var dataAttrs = params.dataAttrs;

      if (dataAttrs) {
        Object.keys(dataAttrs).forEach(function (key) {
          if (dataAttrs[key] === null) {
            _this2.element.removeAttribute("data-".concat(key));

            return;
          }

          _this2.element.setAttribute("data-".concat(key), dataAttrs[key]);
        });
      }

      var fetchRequired = false;

      if (params.hasOwnProperty('timeRange')) {
        fetchRequired = true;
        this.dataLoaderParams.timeRange = params.timeRange;
      }

      if (params.hasOwnProperty('filters')) {
        fetchRequired = true;
        this.dataLoaderParams.filters = params.filters;
      }

      if (params.hasOwnProperty('query')) {
        fetchRequired = true;
        this.dataLoaderParams.query = params.query;
      }

      if (fetchRequired) {
        this.fetchAndRender();
      }
    }
    /**
     * Destroy the underlying Angular scope of the visualization. This should be
     * called whenever you remove the visualization.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this.debouncedFetchAndRender.cancel();

      if (this.autoFetch) {
        _timefilter.timefilter.off('autoRefreshFetch', this.reload);
      }

      this.vis.removeListener('reload', this.reload);
      this.vis.removeListener('update', this.handleVisUpdate);
      this.element.removeEventListener('renderComplete', this.onRenderCompleteListener);
      this.uiState.off('change', this.onUiStateChange);

      _visualization_loader.visualizationLoader.destroy(this.element);

      this.renderCompleteHelper.destroy();

      if (this.handlers.destroyFn) {
        this.handlers.destroyFn();
      }
    }
    /**
     * Return the actual DOM element (wrapped in jQuery) of the rendered visualization.
     * This is especially useful if you used `append: true` in the parameters where
     * the visualization will be appended to the specified container.
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.element;
    }
    /**
     * renders visualization with provided data
     * @param response: visualization data
     */

  }, {
    key: "whenFirstRenderComplete",

    /**
     * Returns a promise, that will resolve (without a value) once the first rendering of
     * the visualization has finished. If you want to listen to consecutive rendering
     * events, look into the `addRenderCompleteListener` method.
     *
     * @returns Promise, that resolves as soon as the visualization is done rendering
     *    for the first time.
     */
    value: function whenFirstRenderComplete() {
      return this.firstRenderComplete;
    }
    /**
     * Adds a listener to be called whenever the visualization finished rendering.
     * This can be called multiple times, when the visualization rerenders, e.g. due
     * to new data.
     *
     * @param {function} listener The listener to be notified about complete renders.
     */

  }, {
    key: "addRenderCompleteListener",
    value: function addRenderCompleteListener(listener) {
      this.listeners.addListener(RENDER_COMPLETE_EVENT, listener);
    }
    /**
     * Removes a previously registered render complete listener from this handler.
     * This listener will no longer be called when the visualization finished rendering.
     *
     * @param {function} listener The listener to remove from this handler.
     */

  }, {
    key: "removeRenderCompleteListener",
    value: function removeRenderCompleteListener(listener) {
      this.listeners.removeListener(RENDER_COMPLETE_EVENT, listener);
    }
    /**
     * Force the fetch of new data and renders the chart again.
     */

  }]);

  return EmbeddedVisualizeHandler;
}();

exports.EmbeddedVisualizeHandler = EmbeddedVisualizeHandler;