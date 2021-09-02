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
const color_picker_popover_1 = require("../color_picker_popover");
const THREE_COLORS = ['#fff', '#666', '#000'];
const SIX_COLORS = ['#fff', '#666', '#000', '#abc', '#def', '#abcdef'];
class Interactive extends react_2.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: '',
            colors: SIX_COLORS,
            hasButtons: true,
        };
    }
    render() {
        return (react_2.default.createElement("div", null,
            react_2.default.createElement(color_picker_popover_1.ColorPickerPopover, { colors: this.state.colors, onChange: value => this.setState({ value }), onAddColor: addon_actions_1.action('onAddColor'), onRemoveColor: addon_actions_1.action('onRemoveColor'), value: this.state.value, anchorPosition: "downCenter", hasButtons: this.state.hasButtons }),
            react_2.default.createElement("p", { style: { marginTop: 20 } },
                react_2.default.createElement("label", null,
                    react_2.default.createElement("input", { "aria-checked": this.state.hasButtons, type: "checkbox", checked: this.state.hasButtons, onChange: () => this.setState({ hasButtons: !this.state.hasButtons }) }),
                    '  ',
                    react_2.default.createElement("span", null, "Show Buttons?")))));
    }
}
react_1.storiesOf('components/ColorPickerPopover', module)
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
    .add('three colors', () => (react_2.default.createElement(color_picker_popover_1.ColorPickerPopover, { value: "#fff", anchorPosition: "downCenter", onChange: addon_actions_1.action('onChange'), colors: THREE_COLORS })))
    .add('six colors', () => (react_2.default.createElement(color_picker_popover_1.ColorPickerPopover, { value: "#fff", anchorPosition: "downCenter", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS })))
    .add('six colors, value missing', () => (react_2.default.createElement(color_picker_popover_1.ColorPickerPopover, { value: "#a1b2c3", anchorPosition: "downCenter", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS })))
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
