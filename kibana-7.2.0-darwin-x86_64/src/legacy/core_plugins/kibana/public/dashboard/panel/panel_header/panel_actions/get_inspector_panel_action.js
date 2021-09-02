"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInspectorPanelAction = getInspectorPanelAction;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _embeddable = require("ui/embeddable");

var _inspector = require("ui/inspector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * Returns the dashboard panel action for opening an inspector for a specific panel.
 * This will check if the embeddable inside the panel actually exposes inspector adapters
 * via its embeddable.getInspectorAdapters() method. If so - and if an inspector
 * could be shown for those adapters - the inspector icon will be visible.
 * @return {ContextMenuAction}
 */
function getInspectorPanelAction(_ref) {
  var closeContextMenu = _ref.closeContextMenu,
      panelTitle = _ref.panelTitle;
  return new _embeddable.ContextMenuAction({
    id: 'openInspector',
    parentPanelId: 'mainMenu'
  }, {
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('kbn.dashboard.panel.inspectorPanel.displayName', {
        defaultMessage: 'Inspect'
      });
    },
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "inspect"
    }),
    isVisible: function isVisible(_ref2) {
      var embeddable = _ref2.embeddable;

      if (!embeddable) {
        return false;
      }

      return _inspector.Inspector.isAvailable(embeddable.getInspectorAdapters());
    },
    onClick: function onClick(_ref3) {
      var embeddable = _ref3.embeddable;

      if (!embeddable) {
        return;
      }

      closeContextMenu();
      var adapters = embeddable.getInspectorAdapters();

      if (!adapters) {
        return;
      }

      var session = _inspector.Inspector.open(adapters, {
        title: panelTitle
      }); // Overwrite the embeddables.destroy() function to close the inspector
      // before calling the original destroy method


      var originalDestroy = embeddable.destroy;

      embeddable.destroy = function () {
        session.close();

        if (originalDestroy) {
          originalDestroy.call(embeddable);
        }
      }; // In case the inspector gets closed (otherwise), restore the original destroy function


      session.onClose.finally(function () {
        embeddable.destroy = originalDestroy;
      });
    }
  });
}