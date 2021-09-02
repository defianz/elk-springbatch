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
const color_dot_1 = require("../color_dot");
react_1.storiesOf('components/ColorDot', module)
    .addParameters({ info: { propTablesExclude: [eui_1.EuiIcon] } })
    .add('color dots', () => [
    react_2.default.createElement(color_dot_1.ColorDot, { key: "1", value: "white" }),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "2", value: "rgb(100, 150, 250)" }),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "3", value: "rgba(100, 150, 250, .5)" }),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "4", value: "#000" }),
])
    .add('invalid dots', () => [
    react_2.default.createElement(color_dot_1.ColorDot, { key: "1", value: "elastic" }),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "2", value: "#canvas" }),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "3", value: "#abcd" }),
])
    .add('color dots with children', () => [
    react_2.default.createElement(color_dot_1.ColorDot, { key: "1", value: "#FFF" },
        react_2.default.createElement(eui_1.EuiIcon, { type: "plusInCircle", color: "#000" })),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "2", value: "#666" },
        react_2.default.createElement(eui_1.EuiIcon, { type: "minusInCircle", color: "#fff" })),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "3", value: "rgba(100, 150, 250, .5)" },
        react_2.default.createElement(eui_1.EuiIcon, { type: "alert", color: "#fff" })),
    react_2.default.createElement(color_dot_1.ColorDot, { key: "4", value: "#000" },
        react_2.default.createElement(eui_1.EuiIcon, { type: "check", color: "#fff" })),
]);
