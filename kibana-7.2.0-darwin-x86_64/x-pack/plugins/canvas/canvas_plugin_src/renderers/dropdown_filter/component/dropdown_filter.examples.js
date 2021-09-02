"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const addon_actions_1 = require("@storybook/addon-actions");
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const dropdown_filter_1 = require("./dropdown_filter");
const choices = ['Item One', 'Item Two', 'Item Three'];
react_1.storiesOf('renderers/DropdownFilter', module)
    .add('default', () => react_2.default.createElement(dropdown_filter_1.DropdownFilter, { onChange: addon_actions_1.action('onChange'), commit: addon_actions_1.action('commit') }))
    .add('with new value', () => (react_2.default.createElement(dropdown_filter_1.DropdownFilter, { onChange: addon_actions_1.action('onChange'), commit: addon_actions_1.action('commit'), value: "selectedValue" })))
    .add('with choices', () => (react_2.default.createElement(dropdown_filter_1.DropdownFilter, { onChange: addon_actions_1.action('onChange'), commit: addon_actions_1.action('commit'), choices: choices })))
    .add('with choices and value', () => (react_2.default.createElement(dropdown_filter_1.DropdownFilter, { onChange: addon_actions_1.action('onChange'), commit: addon_actions_1.action('commit'), choices: choices, value: "Item Two" })))
    .add('with choices and new value', () => (react_2.default.createElement(dropdown_filter_1.DropdownFilter, { onChange: addon_actions_1.action('onChange'), commit: addon_actions_1.action('commit'), choices: choices, value: "selectedValue" })));
