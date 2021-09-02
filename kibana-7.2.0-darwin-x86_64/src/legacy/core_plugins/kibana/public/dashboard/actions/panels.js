"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPanels = exports.updatePanels = exports.setPanelTitle = exports.resetPanelTitle = exports.updatePanel = exports.deletePanel = exports.PanelActionTypeKeys = void 0;

var _reduxActions = require("redux-actions");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
var PanelActionTypeKeys;
exports.PanelActionTypeKeys = PanelActionTypeKeys;

(function (PanelActionTypeKeys) {
  PanelActionTypeKeys["DELETE_PANEL"] = "DELETE_PANEL";
  PanelActionTypeKeys["UPDATE_PANEL"] = "UPDATE_PANEL";
  PanelActionTypeKeys["RESET_PANEL_TITLE"] = "RESET_PANEL_TITLE";
  PanelActionTypeKeys["SET_PANEL_TITLE"] = "SET_PANEL_TITLE";
  PanelActionTypeKeys["UPDATE_PANELS"] = "UPDATE_PANELS";
  PanelActionTypeKeys["SET_PANELS"] = "SET_PANELS";
})(PanelActionTypeKeys || (exports.PanelActionTypeKeys = PanelActionTypeKeys = {}));

var deletePanel = (0, _reduxActions.createAction)(PanelActionTypeKeys.DELETE_PANEL);
exports.deletePanel = deletePanel;
var updatePanel = (0, _reduxActions.createAction)(PanelActionTypeKeys.UPDATE_PANEL);
exports.updatePanel = updatePanel;
var resetPanelTitle = (0, _reduxActions.createAction)(PanelActionTypeKeys.RESET_PANEL_TITLE);
exports.resetPanelTitle = resetPanelTitle;
var setPanelTitle = (0, _reduxActions.createAction)(PanelActionTypeKeys.SET_PANEL_TITLE);
exports.setPanelTitle = setPanelTitle;
var updatePanels = (0, _reduxActions.createAction)(PanelActionTypeKeys.UPDATE_PANELS);
exports.updatePanels = updatePanels;
var setPanels = (0, _reduxActions.createAction)(PanelActionTypeKeys.SET_PANELS);
exports.setPanels = setPanels;