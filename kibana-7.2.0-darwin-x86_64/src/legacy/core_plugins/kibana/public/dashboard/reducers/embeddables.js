"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embeddablesReducer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var embeddableIsInitializing = function embeddableIsInitializing(embeddables, panelId) {
  return _objectSpread({}, embeddables, _defineProperty({}, panelId, {
    error: undefined,
    initialized: false,
    metadata: {},
    stagedFilter: undefined,
    lastReloadRequestTime: 0
  }));
};

var embeddableIsInitialized = function embeddableIsInitialized(embeddables, _ref) {
  var panelId = _ref.panelId,
      metadata = _ref.metadata;
  return _objectSpread({}, embeddables, _defineProperty({}, panelId, _objectSpread({}, embeddables[panelId], {
    initialized: true,
    metadata: _objectSpread({}, metadata)
  })));
};

var setStagedFilter = function setStagedFilter(embeddables, _ref2) {
  var panelId = _ref2.panelId,
      stagedFilter = _ref2.stagedFilter;
  return _objectSpread({}, embeddables, _defineProperty({}, panelId, _objectSpread({}, embeddables[panelId], {
    stagedFilter: stagedFilter
  })));
};

var embeddableError = function embeddableError(embeddables, payload) {
  return _objectSpread({}, embeddables, _defineProperty({}, payload.panelId, _objectSpread({}, embeddables[payload.panelId], {
    error: payload.error
  })));
};

var clearStagedFilters = function clearStagedFilters(embeddables) {
  var omitStagedFilters = function omitStagedFilters(embeddable) {
    return _lodash.default.omit(_objectSpread({}, embeddable), ['stagedFilter']);
  };

  return _lodash.default.mapValues(embeddables, omitStagedFilters);
};

var deleteEmbeddable = function deleteEmbeddable(embeddables, panelId) {
  var embeddablesCopy = _objectSpread({}, embeddables);

  delete embeddablesCopy[panelId];
  return embeddablesCopy;
};

var setReloadRequestTime = function setReloadRequestTime(embeddables, lastReloadRequestTime) {
  return _lodash.default.mapValues(embeddables, function (embeddable) {
    return _objectSpread({}, embeddable, {
      lastReloadRequestTime: lastReloadRequestTime
    });
  });
};

var embeddablesReducer = function embeddablesReducer() {
  var embeddables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZING:
      return embeddableIsInitializing(embeddables, action.payload);

    case _actions.EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZED:
      return embeddableIsInitialized(embeddables, action.payload);

    case _actions.EmbeddableActionTypeKeys.SET_STAGED_FILTER:
      return setStagedFilter(embeddables, action.payload);

    case _actions.EmbeddableActionTypeKeys.CLEAR_STAGED_FILTERS:
      return clearStagedFilters(embeddables);

    case _actions.EmbeddableActionTypeKeys.EMBEDDABLE_ERROR:
      return embeddableError(embeddables, action.payload);

    case _actions.PanelActionTypeKeys.DELETE_PANEL:
      return deleteEmbeddable(embeddables, action.payload);

    case _actions.EmbeddableActionTypeKeys.REQUEST_RELOAD:
      return setReloadRequestTime(embeddables, new Date().getTime());

    default:
      return embeddables;
  }
};

exports.embeddablesReducer = embeddablesReducer;