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
const fonts_1 = require("../../../common/lib/fonts");
const font_picker_1 = require("./font_picker");
react_1.storiesOf('components/FontPicker', module)
    .add('default', () => react_2.default.createElement(font_picker_1.FontPicker, { onSelect: addon_actions_1.action('onSelect') }))
    .add('with value', () => (react_2.default.createElement(font_picker_1.FontPicker, { onSelect: addon_actions_1.action('onSelect'), value: fonts_1.americanTypewriter.value })));
