"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizeEmbeddable = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _embeddable = require("ui/embeddable");

var _persisted_state = require("ui/persisted_state");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VisualizeEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(VisualizeEmbeddable, _Embeddable);

  function VisualizeEmbeddable(_ref) {
    var _this;

    var onEmbeddableStateChanged = _ref.onEmbeddableStateChanged,
        savedVisualization = _ref.savedVisualization,
        indexPatterns = _ref.indexPatterns,
        editUrl = _ref.editUrl,
        editable = _ref.editable,
        loader = _ref.loader;

    _classCallCheck(this, VisualizeEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualizeEmbeddable).call(this, {
      title: savedVisualization.title,
      editUrl: editUrl,
      editLabel: _i18n.i18n.translate('kbn.embeddable.visualize.editLabel', {
        defaultMessage: 'Edit visualization'
      }),
      editable: editable,
      indexPatterns: indexPatterns
    }));

    _defineProperty(_assertThisInitialized(_this), "onEmbeddableStateChanged", void 0);

    _defineProperty(_assertThisInitialized(_this), "savedVisualization", void 0);

    _defineProperty(_assertThisInitialized(_this), "loader", void 0);

    _defineProperty(_assertThisInitialized(_this), "uiState", void 0);

    _defineProperty(_assertThisInitialized(_this), "handler", void 0);

    _defineProperty(_assertThisInitialized(_this), "customization", void 0);

    _defineProperty(_assertThisInitialized(_this), "panelTitle", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeRange", void 0);

    _defineProperty(_assertThisInitialized(_this), "query", void 0);

    _defineProperty(_assertThisInitialized(_this), "filters", void 0);

    _defineProperty(_assertThisInitialized(_this), "uiStateChangeHandler", function () {
      _this.customization = _this.uiState.toJSON();

      _this.onEmbeddableStateChanged(_this.getEmbeddableState());
    });

    _this.onEmbeddableStateChanged = onEmbeddableStateChanged;
    _this.savedVisualization = savedVisualization;
    _this.loader = loader;
    var parsedUiState = savedVisualization.uiStateJSON ? JSON.parse(savedVisualization.uiStateJSON) : {};
    _this.uiState = new _persisted_state.PersistedState(parsedUiState);

    _this.uiState.on('change', _this.uiStateChangeHandler);

    return _this;
  }

  _createClass(VisualizeEmbeddable, [{
    key: "getInspectorAdapters",
    value: function getInspectorAdapters() {
      if (!this.handler) {
        return undefined;
      }

      return this.handler.inspectorAdapters;
    }
  }, {
    key: "getEmbeddableState",
    value: function getEmbeddableState() {
      return {
        customization: this.customization
      };
    }
    /**
     * Transfers all changes in the containerState.embeddableCustomization into
     * the uiState of this visualization.
     */

  }, {
    key: "transferCustomizationsToUiState",
    value: function transferCustomizationsToUiState(containerState) {
      var _this2 = this;

      // Check for changes that need to be forwarded to the uiState
      // Since the vis has an own listener on the uiState we don't need to
      // pass anything from here to the handler.update method
      var customization = containerState.embeddableCustomization;

      if (customization && !_lodash.default.isEqual(this.customization, customization)) {
        // Turn this off or the uiStateChangeHandler will fire for every modification.
        this.uiState.off('change', this.uiStateChangeHandler);
        this.uiState.clearAllKeys();
        Object.getOwnPropertyNames(customization).forEach(function (key) {
          _this2.uiState.set(key, customization[key]);
        });
        this.customization = customization;
        this.uiState.on('change', this.uiStateChangeHandler);
      }
    }
  }, {
    key: "onContainerStateChanged",
    value: function onContainerStateChanged(containerState) {
      this.transferCustomizationsToUiState(containerState);
      var updatedParams = {}; // Check if timerange has changed

      if (containerState.timeRange !== this.timeRange) {
        updatedParams.timeRange = containerState.timeRange;
        this.timeRange = containerState.timeRange;
      } // Check if filters has changed


      if (containerState.filters !== this.filters) {
        updatedParams.filters = containerState.filters;
        this.filters = containerState.filters;
      } // Check if query has changed


      if (containerState.query !== this.query) {
        updatedParams.query = containerState.query;
        this.query = containerState.query;
      }

      var derivedPanelTitle = this.getPanelTitle(containerState);

      if (this.panelTitle !== derivedPanelTitle) {
        updatedParams.dataAttrs = {
          title: derivedPanelTitle
        };
        this.panelTitle = derivedPanelTitle;
      }

      if (this.handler && !_lodash.default.isEmpty(updatedParams)) {
        this.handler.update(updatedParams);
      }
    }
    /**
     *
     * @param {Element} domNode
     * @param {ContainerState} containerState
     */

  }, {
    key: "render",
    value: function render(domNode, containerState) {
      this.panelTitle = this.getPanelTitle(containerState);
      this.timeRange = containerState.timeRange;
      this.query = containerState.query;
      this.filters = containerState.filters;
      this.transferCustomizationsToUiState(containerState);
      var dataAttrs = {
        'shared-item': '',
        title: this.panelTitle
      };

      if (this.savedVisualization.description) {
        dataAttrs.description = this.savedVisualization.description;
      }

      var handlerParams = {
        uiState: this.uiState,
        // Append visualization to container instead of replacing its content
        append: true,
        timeRange: containerState.timeRange,
        query: containerState.query,
        filters: containerState.filters,
        cssClass: "panel-content panel-content--fullWidth",
        dataAttrs: dataAttrs
      };
      this.handler = this.loader.embedVisualizationWithSavedObject(domNode, this.savedVisualization, handlerParams);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.uiState.off('change', this.uiStateChangeHandler);
      this.savedVisualization.destroy();

      if (this.handler) {
        this.handler.destroy();
        this.handler.getElement().remove();
      }
    }
  }, {
    key: "reload",
    value: function reload() {
      if (this.handler) {
        this.handler.reload();
      }
    }
    /**
     * Retrieve the panel title for this panel from the container state.
     * This will either return the overwritten panel title or the visualization title.
     */

  }, {
    key: "getPanelTitle",
    value: function getPanelTitle(containerState) {
      var derivedPanelTitle = '';

      if (!containerState.hidePanelTitles) {
        derivedPanelTitle = containerState.customTitle !== undefined ? containerState.customTitle : this.savedVisualization.title;
      }

      return derivedPanelTitle;
    }
  }]);

  return VisualizeEmbeddable;
}(_embeddable.Embeddable);

exports.VisualizeEmbeddable = VisualizeEmbeddable;