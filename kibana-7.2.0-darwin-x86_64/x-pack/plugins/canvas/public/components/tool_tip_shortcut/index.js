"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const recompose_1 = require("recompose");
const tool_tip_shortcut_1 = require("./tool_tip_shortcut");
const get_client_platform_1 = require("../../lib/get_client_platform");
const keymap_1 = require("../../lib/keymap");
const get_pretty_shortcut_1 = require("../../lib/get_pretty_shortcut");
const os = get_client_platform_1.getClientPlatform();
exports.ToolTipShortcut = recompose_1.compose(recompose_1.mapProps(({ namespace, action }) => {
    const shortcutMap = keymap_1.keymap[namespace][action];
    if (typeof shortcutMap === 'string') {
        return { shortcut: '' };
    }
    const shortcuts = shortcutMap[os] || [];
    return { shortcut: get_pretty_shortcut_1.getPrettyShortcut(shortcuts[0]) };
}))(tool_tip_shortcut_1.ToolTipShortcut);
