"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewReducer = void 0;

var _lodash = require("lodash");

var _types = require("ui/embeddable/types");

var _actions = require("../actions");

var _dashboard_view_mode = require("../dashboard_view_mode");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var closeContextMenu = function closeContextMenu(view) {
  return _objectSpread({}, view, {
    visibleContextMenuPanelId: undefined
  });
};

var setVisibleContextMenuPanelId = function setVisibleContextMenuPanelId(view, panelId) {
  return _objectSpread({}, view, {
    visibleContextMenuPanelId: panelId
  });
};

var updateHidePanelTitles = function updateHidePanelTitles(view, hidePanelTitles) {
  return _objectSpread({}, view, {
    hidePanelTitles: hidePanelTitles
  });
};

var minimizePanel = function minimizePanel(view) {
  return _objectSpread({}, view, {
    maximizedPanelId: undefined
  });
};

var maximizePanel = function maximizePanel(view, panelId) {
  return _objectSpread({}, view, {
    maximizedPanelId: panelId
  });
};

var updateIsFullScreenMode = function updateIsFullScreenMode(view, isFullScreenMode) {
  return _objectSpread({}, view, {
    isFullScreenMode: isFullScreenMode
  });
};

var updateTimeRange = function updateTimeRange(view, timeRange) {
  return _objectSpread({}, view, {
    timeRange: timeRange
  });
};

var updateRefreshConfig = function updateRefreshConfig(view, refreshConfig) {
  return _objectSpread({}, view, {
    refreshConfig: refreshConfig
  });
};

var updateFilters = function updateFilters(view, filters) {
  return _objectSpread({}, view, {
    filters: (0, _lodash.cloneDeep)(filters)
  });
};

var updateQuery = function updateQuery(view, query) {
  return _objectSpread({}, view, {
    query: query
  });
};

var updateUseMargins = function updateUseMargins(view, useMargins) {
  return _objectSpread({}, view, {
    useMargins: useMargins
  });
};

var updateViewMode = function updateViewMode(view, viewMode) {
  return _objectSpread({}, view, {
    viewMode: viewMode
  });
};

var viewReducer = function viewReducer() {
  var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    filters: [],
    hidePanelTitles: false,
    isFullScreenMode: false,
    query: {
      language: _types.QueryLanguageType.LUCENE,
      query: ''
    },
    timeRange: {
      to: 'now',
      from: 'now-15m'
    },
    refreshConfig: {
      isPaused: true,
      interval: 0
    },
    useMargins: true,
    viewMode: _dashboard_view_mode.DashboardViewMode.VIEW
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.ViewActionTypeKeys.MINIMIZE_PANEL:
      return minimizePanel(view);

    case _actions.ViewActionTypeKeys.MAXIMIZE_PANEL:
      return maximizePanel(view, action.payload);

    case _actions.ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID:
      return setVisibleContextMenuPanelId(view, action.payload);

    case _actions.ViewActionTypeKeys.CLOSE_CONTEXT_MENU:
      return closeContextMenu(view);

    case _actions.ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES:
      return updateHidePanelTitles(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_TIME_RANGE:
      return updateTimeRange(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_REFRESH_CONFIG:
      return updateRefreshConfig(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_USE_MARGINS:
      return updateUseMargins(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_VIEW_MODE:
      return updateViewMode(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE:
      return updateIsFullScreenMode(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_FILTERS:
      return updateFilters(view, action.payload);

    case _actions.ViewActionTypeKeys.UPDATE_QUERY:
      return updateQuery(view, action.payload);

    default:
      return view;
  }
};

exports.viewReducer = viewReducer;