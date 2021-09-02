"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const addon_actions_1 = require("@storybook/addon-actions");
const addon_knobs_1 = require("@storybook/addon-knobs");
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const color_picker_1 = require("../color_picker");
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
            react_2.default.createElement(color_picker_1.ColorPicker, { colors: this.state.colors, onAddColor: value => this.setState({ colors: this.state.colors.concat(value) }), onRemoveColor: value => this.setState({ colors: this.state.colors.filter(color => color !== value) }), onChange: value => this.setState({ value }), hasButtons: this.state.hasButtons, value: this.state.value }),
            react_2.default.createElement("p", { style: { marginTop: 20 } },
                react_2.default.createElement("label", null,
                    react_2.default.createElement("input", { "aria-checked": this.state.hasButtons, type: "checkbox", checked: this.state.hasButtons, onChange: () => this.setState({ hasButtons: !this.state.hasButtons }) }),
                    '  ',
                    react_2.default.createElement("span", null, "Show Buttons?")))));
    }
}
react_1.storiesOf('components/ColorPicker', module)
    .addDecorator(addon_knobs_1.withKnobs)
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
    .add('three colors', () => (react_2.default.createElement(color_picker_1.ColorPicker, { value: "#fff", onAddColor: addon_actions_1.action('onAddColor'), onRemoveColor: addon_actions_1.action('onRemoveColor'), onChange: addon_actions_1.action('onChange'), colors: THREE_COLORS, hasButtons: addon_knobs_1.boolean('Has Buttons', true) })))
    .add('six colors', () => (react_2.default.createElement(color_picker_1.ColorPicker, { value: "#fff", onAddColor: addon_actions_1.action('onAddColor'), onRemoveColor: addon_actions_1.action('onRemoveColor'), onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS, hasButtons: addon_knobs_1.boolean('Has Buttons', true) })))
    .add('six colors, value missing', () => (react_2.default.createElement(color_picker_1.ColorPicker, { value: "#a1b2c3", onAddColor: addon_actions_1.action('onAddColor'), onRemoveColor: addon_actions_1.action('onRemoveColor'), onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS, hasButtons: addon_knobs_1.boolean('Has Buttons', true) })))
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
