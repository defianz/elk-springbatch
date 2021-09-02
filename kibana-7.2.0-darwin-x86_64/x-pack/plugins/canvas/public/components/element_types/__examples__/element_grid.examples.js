"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const element_grid_1 = require("../element_grid");
const test_elements_1 = require("./fixtures/test_elements");
react_2.storiesOf('components/ElementTypes/ElementGrid', module)
    .addDecorator(story => (react_1.default.createElement("div", { style: {
        width: '1000px',
    } }, story())))
    .add('without controls', () => (react_1.default.createElement(element_grid_1.ElementGrid, { elements: test_elements_1.testElements, handleClick: addon_actions_1.action('addElement') })))
    .add('with controls', () => (react_1.default.createElement(element_grid_1.ElementGrid, { elements: test_elements_1.testCustomElements, handleClick: addon_actions_1.action('addCustomElement'), showControls: true, onDelete: addon_actions_1.action('onDelete'), onEdit: addon_actions_1.action('onEdit') })))
    .add('with text filter', () => (react_1.default.createElement(element_grid_1.ElementGrid, { elements: test_elements_1.testElements, handleClick: addon_actions_1.action('addCustomElement'), filterText: "table" })))
    .add('with tags filter', () => (react_1.default.createElement(element_grid_1.ElementGrid, { elements: test_elements_1.testElements, handleClick: addon_actions_1.action('addCustomElement'), filterTags: ['graphic'] })))
    .add('with controls and filter', () => (react_1.default.createElement(element_grid_1.ElementGrid, { elements: test_elements_1.testCustomElements, handleClick: addon_actions_1.action('addCustomElement'), filterText: "Lorem", showControls: true, onDelete: addon_actions_1.action('onDelete'), onEdit: addon_actions_1.action('onEdit') })));
