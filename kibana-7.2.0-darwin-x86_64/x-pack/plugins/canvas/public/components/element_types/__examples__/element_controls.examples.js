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
const element_controls_1 = require("../element_controls");
react_2.storiesOf('components/ElementTypes/ElementControls', module)
    .addDecorator(story => (react_1.default.createElement("div", { style: {
        width: '50px',
    } }, story())))
    .add('has two buttons', () => (react_1.default.createElement(element_controls_1.ElementControls, { onDelete: addon_actions_1.action('onDelete'), onEdit: addon_actions_1.action('onEdit') })));
