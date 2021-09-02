"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panelsReducer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var deletePanel = function deletePanel(panels, panelId) {
  var panelsCopy = _objectSpread({}, panels);

  delete panelsCopy[panelId];
  return panelsCopy;
};

var updatePanel = function updatePanel(panels, panelState) {
  return _objectSpread({}, panels, _defineProperty({}, panelState.panelIndex, panelState));
};

var updatePanels = function updatePanels(panels, updatedPanels) {
  var panelsCopy = _objectSpread({}, panels);

  Object.values(updatedPanels).forEach(function (panel) {
    panelsCopy[panel.panelIndex] = panel;
  });
  return panelsCopy;
};

var resetPanelTitle = function resetPanelTitle(panels, panelId) {
  return _objectSpread({}, panels, _defineProperty({}, panelId, _objectSpread({}, panels[panelId], {
    title: undefined
  })));
};

var setPanelTitle = function setPanelTitle(panels, payload) {
  return _objectSpread({}, panels, _defineProperty({}, payload.panelId, _objectSpread({}, panels[payload.panelId], {
    title: payload.title
  })));
};

var setPanels = function setPanels(panels, newPanels) {
  return _lodash.default.cloneDeep(newPanels);
};

var panelsReducer = function panelsReducer() {
  var panels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.PanelActionTypeKeys.DELETE_PANEL:
      return deletePanel(panels, action.payload);

    case _actions.PanelActionTypeKeys.UPDATE_PANEL:
      return updatePanel(panels, action.payload);

    case _actions.PanelActionTypeKeys.UPDATE_PANELS:
      return updatePanels(panels, action.payload);

    case _actions.PanelActionTypeKeys.RESET_PANEL_TITLE:
      return resetPanelTitle(panels, action.payload);

    case _actions.PanelActionTypeKeys.SET_PANEL_TITLE:
      return setPanelTitle(panels, action.payload);

    case _actions.PanelActionTypeKeys.SET_PANELS:
      return setPanels(panels, action.payload);

    default:
      return panels;
  }
};

exports.panelsReducer = panelsReducer;