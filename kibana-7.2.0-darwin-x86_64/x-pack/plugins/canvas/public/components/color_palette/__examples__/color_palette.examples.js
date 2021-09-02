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
const color_palette_1 = require("../color_palette");
const THREE_COLORS = ['#fff', '#666', '#000'];
const SIX_COLORS = ['#fff', '#666', '#000', '#abc', '#def', '#abcdef'];
class Interactive extends react_2.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: '',
        };
    }
    render() {
        return (react_2.default.createElement(color_palette_1.ColorPalette, { colors: SIX_COLORS, onChange: value => this.setState({ value }), value: this.state.value }));
    }
}
react_1.storiesOf('components/ColorPalette', module)
    .add('three colors', () => [
    react_2.default.createElement(color_palette_1.ColorPalette, { key: "1", onChange: addon_actions_1.action('onChange'), colors: THREE_COLORS }),
    react_2.default.createElement(color_palette_1.ColorPalette, { key: "2", value: "#fff", onChange: addon_actions_1.action('onChange'), colors: THREE_COLORS }),
])
    .add('six colors', () => [
    react_2.default.createElement(color_palette_1.ColorPalette, { key: "1", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS }),
    react_2.default.createElement(color_palette_1.ColorPalette, { key: "2", value: "#fff", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS }),
])
    .add('six colors, wrap at 4', () => (react_2.default.createElement(color_palette_1.ColorPalette, { value: "#fff", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS, colorsPerRow: 4 })))
    .add('six colors, value missing', () => (react_2.default.createElement(color_palette_1.ColorPalette, { value: "#f00", onChange: addon_actions_1.action('onChange'), colors: SIX_COLORS })))
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
            },
        },
    },
});
