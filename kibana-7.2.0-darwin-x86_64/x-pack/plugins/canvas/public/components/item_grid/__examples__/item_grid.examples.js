"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const readable_color_1 = require("../../../lib/readable_color");
const color_dot_1 = require("../../color_dot");
const item_grid_1 = require("../item_grid");
react_1.storiesOf('components/ItemGrid', module)
    .add('simple grid', () => (react_2.default.createElement(item_grid_1.ItemGrid, { items: ['a', 'b', 'c'], children: item => react_2.default.createElement("div", { key: item }, item) })))
    .add('icon grid', () => (react_2.default.createElement(item_grid_1.ItemGrid, { items: ['plusInCircle', 'minusInCircle', 'check'], children: (item) => react_2.default.createElement(eui_1.EuiIcon, { key: item, type: item }) })))
    .add('color dot grid', () => (react_2.default.createElement(item_grid_1.ItemGrid, { items: ['#fff', '#666', '#000'] }, item => react_2.default.createElement(color_dot_1.ColorDot, { key: item, value: item }))))
    .add('complex grid', () => (react_2.default.createElement(item_grid_1.ItemGrid, { items: [
        { color: '#fff', icon: 'plusInCircle' },
        { color: '#666', icon: 'minusInCircle' },
        { color: '#000', icon: 'check' },
    ] }, item => (react_2.default.createElement(color_dot_1.ColorDot, { key: item.color, value: item.color },
    react_2.default.createElement(eui_1.EuiIcon, { type: item.icon, color: readable_color_1.readableColor(item.color) }))))));
