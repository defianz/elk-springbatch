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
const color_manager_1 = require("../color_manager");
class Interactive extends react_2.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasButtons: true,
            value: '',
        };
    }
    render() {
        return (react_2.default.createElement("div", null,
            react_2.default.createElement(color_manager_1.ColorManager, { hasButtons: this.state.hasButtons, onAddColor: addon_actions_1.action('onAddColor'), onRemoveColor: addon_actions_1.action('onRemoveColor'), onChange: value => this.setState({ value }), value: this.state.value }),
            react_2.default.createElement("p", { style: { marginTop: 20 } },
                react_2.default.createElement("label", null,
                    react_2.default.createElement("input", { "aria-checked": this.state.hasButtons, type: "checkbox", checked: this.state.hasButtons, onChange: () => this.setState({ hasButtons: !this.state.hasButtons }) }),
                    '  ',
                    react_2.default.createElement("span", null, "Show Buttons?")))));
    }
}
react_1.storiesOf('components/ColorManager', module)
    .addParameters({
    info: {
        inline: true,
        styles: {
            infoBody: {
                margin: 20,
            },
            infoStory: {
                margin: '40px 60px',
                width: '320px',
            },
        },
    },
})
    .add('default', () => [
    react_2.default.createElement(color_manager_1.ColorManager, { key: "1", onChange: addon_actions_1.action('onChange'), value: "#abcdef" }),
    react_2.default.createElement(color_manager_1.ColorManager, { key: "2", onChange: addon_actions_1.action('onChange'), value: "#abc" }),
    react_2.default.createElement(color_manager_1.ColorManager, { key: "3", onChange: addon_actions_1.action('onChange'), value: "rgba(50, 100, 150, .5)" }),
])
    .add('invalid colors', () => [
    react_2.default.createElement(color_manager_1.ColorManager, { key: "1", onChange: addon_actions_1.action('onChange'), value: "#abcd" }),
    react_2.default.createElement(color_manager_1.ColorManager, { key: "2", onChange: addon_actions_1.action('onChange'), value: "canvas" }),
])
    .add('with buttons', () => [
    react_2.default.createElement(color_manager_1.ColorManager, { hasButtons: true, key: "1", onAddColor: addon_actions_1.action('onAddColor'), onChange: addon_actions_1.action('onChange'), value: "#abcdef" }),
    react_2.default.createElement(color_manager_1.ColorManager, { hasButtons: true, key: "2", onChange: addon_actions_1.action('onChange'), onRemoveColor: addon_actions_1.action('onRemoveColor'), value: "#abcdef" }),
    react_2.default.createElement(color_manager_1.ColorManager, { hasButtons: true, key: "3", onAddColor: addon_actions_1.action('onAddColor'), onChange: addon_actions_1.action('onChange'), onRemoveColor: addon_actions_1.action('onRemoveColor'), value: "#abcdef" }),
])
    .add('interactive', () => react_2.default.createElement(Interactive, null), {
    info: {
        inline: true,
        source: false,
        propTablesExclude: [Interactive],
        styles: {
            infoBody: {
                margin: 20,
            },
            infoStory: {
                margin: '40px 60px',
                width: '320px',
            },
        },
    },
});
