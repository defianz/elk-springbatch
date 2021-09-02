"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showShareContextMenu = showShareContextMenu;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _eui = require("@elastic/eui");

var _i18n = require("ui/i18n");

var _share_context_menu = require("./components/share_context_menu");

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
var isOpen = false;
var container = document.createElement('div');

var onClose = function onClose() {
  _reactDom.default.unmountComponentAtNode(container);

  isOpen = false;
};

function showShareContextMenu(_ref) {
  var anchorElement = _ref.anchorElement,
      allowEmbed = _ref.allowEmbed,
      allowShortUrl = _ref.allowShortUrl,
      getUnhashableStates = _ref.getUnhashableStates,
      objectId = _ref.objectId,
      objectType = _ref.objectType,
      shareContextMenuExtensions = _ref.shareContextMenuExtensions,
      sharingData = _ref.sharingData,
      isDirty = _ref.isDirty;

  if (isOpen) {
    onClose();
    return;
  }

  isOpen = true;
  document.body.appendChild(container);

  var element = _react.default.createElement(_i18n.I18nContext, null, _react.default.createElement(_eui.EuiWrappingPopover, {
    id: "sharePopover",
    button: anchorElement,
    isOpen: true,
    closePopover: onClose,
    panelPaddingSize: "none",
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement(_share_context_menu.ShareContextMenu, {
    allowEmbed: allowEmbed,
    allowShortUrl: allowShortUrl,
    getUnhashableStates: getUnhashableStates,
    objectId: objectId,
    objectType: objectType,
    shareContextMenuExtensions: shareContextMenuExtensions,
    sharingData: sharingData,
    isDirty: isDirty,
    onClose: onClose
  })));

  _reactDom.default.render(element, container);
}