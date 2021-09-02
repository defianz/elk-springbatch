"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embeddableStateChanged = embeddableStateChanged;
exports.requestReload = exports.embeddableError = exports.clearStagedFilters = exports.setStagedFilter = exports.embeddableIsInitialized = exports.embeddableIsInitializing = exports.EmbeddableActionTypeKeys = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _reduxActions = require("redux-actions");

var _selectors = require("../../selectors");

var _panels = require("./panels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EmbeddableActionTypeKeys;
exports.EmbeddableActionTypeKeys = EmbeddableActionTypeKeys;

(function (EmbeddableActionTypeKeys) {
  EmbeddableActionTypeKeys["EMBEDDABLE_IS_INITIALIZING"] = "EMBEDDABLE_IS_INITIALIZING";
  EmbeddableActionTypeKeys["EMBEDDABLE_IS_INITIALIZED"] = "EMBEDDABLE_IS_INITIALIZED";
  EmbeddableActionTypeKeys["SET_STAGED_FILTER"] = "SET_STAGED_FILTER";
  EmbeddableActionTypeKeys["CLEAR_STAGED_FILTERS"] = "CLEAR_STAGED_FILTERS";
  EmbeddableActionTypeKeys["EMBEDDABLE_ERROR"] = "EMBEDDABLE_ERROR";
  EmbeddableActionTypeKeys["REQUEST_RELOAD"] = "REQUEST_RELOAD";
})(EmbeddableActionTypeKeys || (exports.EmbeddableActionTypeKeys = EmbeddableActionTypeKeys = {}));

var embeddableIsInitializing = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZING);
exports.embeddableIsInitializing = embeddableIsInitializing;
var embeddableIsInitialized = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZED);
exports.embeddableIsInitialized = embeddableIsInitialized;
var setStagedFilter = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.SET_STAGED_FILTER);
exports.setStagedFilter = setStagedFilter;
var clearStagedFilters = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.CLEAR_STAGED_FILTERS);
exports.clearStagedFilters = clearStagedFilters;
var embeddableError = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.EMBEDDABLE_ERROR);
exports.embeddableError = embeddableError;
var requestReload = (0, _reduxActions.createAction)(EmbeddableActionTypeKeys.REQUEST_RELOAD);
/**
 * The main point of communication from the embeddable to the dashboard. Any time state in the embeddable
 * changes, this function will be called. The data is then extracted from EmbeddableState and stored in
 * redux so the appropriate actions are taken and UI updated.
 *
 * @param changeData.panelId - the id of the panel whose state has changed.
 * @param changeData.embeddableState - the new state of the embeddable.
 */

exports.requestReload = requestReload;

function embeddableStateChanged(changeData) {
  var panelId = changeData.panelId,
      embeddableState = changeData.embeddableState;
  return function (dispatch, getState) {
    // Translate embeddableState to things redux cares about.
    var customization = (0, _selectors.getEmbeddableCustomization)(getState(), panelId);

    if (!_lodash.default.isEqual(embeddableState.customization, customization)) {
      var originalPanelState = (0, _selectors.getPanel)(getState(), panelId);

      var newPanelState = _objectSpread({}, originalPanelState, {
        embeddableConfig: _lodash.default.cloneDeep(embeddableState.customization)
      });

      dispatch((0, _panels.updatePanel)(newPanelState));
    }

    if (embeddableState.stagedFilter) {
      dispatch(setStagedFilter({
        stagedFilter: embeddableState.stagedFilter,
        panelId: panelId
      }));
    }
  };
}