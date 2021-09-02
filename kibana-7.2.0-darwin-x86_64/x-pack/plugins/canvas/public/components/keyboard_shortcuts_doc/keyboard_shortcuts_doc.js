"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
const keymap_1 = require("../../lib/keymap");
const get_client_platform_1 = require("../../lib/get_client_platform");
const get_id_1 = require("../../lib/get_id");
const get_pretty_shortcut_1 = require("../../lib/get_pretty_shortcut");
const os = get_client_platform_1.getClientPlatform();
const getDescriptionListItems = (shortcuts) => shortcuts.map((shortcutKeyMap) => {
    const osShortcuts = shortcutKeyMap[os];
    return {
        title: shortcutKeyMap.help,
        description: osShortcuts.reduce((acc, shortcut, i) => {
            if (i !== 0) {
                acc.push(react_1.default.createElement("span", { key: get_id_1.getId('span') }, " or "));
            }
            acc.push(react_1.default.createElement("span", { key: get_id_1.getId('span') }, get_pretty_shortcut_1.getPrettyShortcut(shortcut)
                .split(/(\+)/g) // splits the array by '+' and keeps the '+'s as elements in the array
                .map(key => (key === '+' ? ` ` : react_1.default.createElement(eui_1.EuiCode, { key: get_id_1.getId('shortcut') }, key)))));
            return acc;
        }, []),
    };
});
exports.KeyboardShortcutsDoc = ({ onClose }) => (react_1.default.createElement(eui_1.EuiFlyout, { closeButtonAriaLabel: "Closes keyboard shortcuts reference", size: "s", onClose: onClose },
    react_1.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h2", null, "Keyboard Shortcuts"))),
    react_1.default.createElement(eui_1.EuiFlyoutBody, null, Object.values(keymap_1.keymap).map((namespace) => {
        const { displayName, ...shortcuts } = namespace;
        return (react_1.default.createElement("div", { key: get_id_1.getId('shortcuts'), className: "canvasKeyboardShortcut" },
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h4", null, displayName)),
            react_1.default.createElement(eui_1.EuiHorizontalRule, { margin: "s" }),
            react_1.default.createElement(eui_1.EuiDescriptionList, { textStyle: "reverse", type: "column", listItems: getDescriptionListItems(Object.values(shortcuts)), compressed: true }),
            react_1.default.createElement(eui_1.EuiSpacer, null)));
    }))));
exports.KeyboardShortcutsDoc.propTypes = {
    onClose: prop_types_1.default.func.isRequired,
};
