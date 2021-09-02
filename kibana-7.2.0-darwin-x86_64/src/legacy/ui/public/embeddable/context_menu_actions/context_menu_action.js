"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuAction = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var ContextMenuAction =
/*#__PURE__*/
function () {
  /**
   * Optional icon to display to the left of the action.
   */

  /**
   * Optional child context menu to open when the action is clicked.
   */

  /**
   * Determines which ContextMenuPanel this action is displayed on.
   */

  /**
   * @param {PanelActionAPI} panelActionAPI
   */

  /**
   * @param {PanelActionAPI} panelActionAPI
   */

  /**
   * @param {PanelActionAPI} panelActionAPI
   */

  /**
   *
   * @param {string} config.id
   * @param {string} config.parentPanelId - set if this action belongs on a nested child panel
   * @param {function} options.onClick
   * @param {ContextMenuPanel} options.childContextMenuPanel - optional child panel to open when clicked.
   * @param {function} options.isDisabled - optionally set a custom disabled function
   * @param {function} options.isVisible - optionally set a custom isVisible function
   * @param {function} options.getHref
   * @param {function} options.getDisplayName
   * @param {Element} options.icon
   */
  function ContextMenuAction(config, options) {
    _classCallCheck(this, ContextMenuAction);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "icon", void 0);

    _defineProperty(this, "childContextMenuPanel", void 0);

    _defineProperty(this, "parentPanelId", void 0);

    _defineProperty(this, "onClick", void 0);

    _defineProperty(this, "getHref", void 0);

    _defineProperty(this, "getDisplayName", void 0);

    this.id = config.id;
    this.parentPanelId = config.parentPanelId;
    this.icon = options.icon;
    this.childContextMenuPanel = options.childContextMenuPanel;
    this.getDisplayName = options.getDisplayName;

    if ('onClick' in options) {
      this.onClick = options.onClick;
    }

    if (options.isDisabled) {
      this.isDisabled = options.isDisabled;
    }

    if (options.isVisible) {
      this.isVisible = options.isVisible;
    }

    if ('getHref' in options) {
      this.getHref = options.getHref;
    }
  }
  /**
   * Whether this action should be visible based on the parameters given.  Defaults to always visible.
   * @param {PanelActionAPI} panelActionAPI
   * @return {boolean}
   */


  _createClass(ContextMenuAction, [{
    key: "isVisible",
    value: function isVisible(panelActionAPI) {
      return true;
    }
    /**
     * Whether this action should be disabled based on the parameters given. Defaults to always enabled.
     * @param {PanelActionAPI} panelActionAPI
     */

  }, {
    key: "isDisabled",
    value: function isDisabled(panelActionAPI) {
      return false;
    }
  }]);

  return ContextMenuAction;
}();

exports.ContextMenuAction = ContextMenuAction;