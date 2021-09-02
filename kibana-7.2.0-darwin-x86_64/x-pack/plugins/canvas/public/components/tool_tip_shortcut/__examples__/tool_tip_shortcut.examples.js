"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const tool_tip_shortcut_1 = require("../tool_tip_shortcut");
react_1.storiesOf('components/ToolTipShortcut', module)
    .addDecorator(story => (react_2.default.createElement("div", { style: { width: '100px', backgroundColor: '#343741', padding: '5px' } }, story())))
    .add('with shortcut', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "G" }))
    .add('with cmd', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2318 + D" }))
    .add('with alt', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2325 + P" }))
    .add('with left arrow', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2190" }))
    .add('with right arrow', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2192" }))
    .add('with up arrow', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2318 + SHIFT + \u2191" }))
    .add('with down arrow', () => react_2.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { shortcut: "\u2318 + SHIFT + \u2193" }));
