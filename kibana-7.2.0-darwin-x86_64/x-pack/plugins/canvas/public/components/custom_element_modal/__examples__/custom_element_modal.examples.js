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
const custom_element_modal_1 = require("../custom_element_modal");
const elastic_logo_1 = require("../../../lib/elastic_logo");
react_2.storiesOf('components/CustomElementModal', module)
    .add('with title', () => (react_1.default.createElement(custom_element_modal_1.CustomElementModal, { title: "Create new element", onCancel: addon_actions_1.action('onCancel'), onSave: addon_actions_1.action('onSave') })))
    .add('with name', () => (react_1.default.createElement(custom_element_modal_1.CustomElementModal, { title: "Edit custom element", name: "My Chart", description: "", onCancel: addon_actions_1.action('onCancel'), onSave: addon_actions_1.action('onSave') })))
    .add('with description', () => (react_1.default.createElement(custom_element_modal_1.CustomElementModal, { title: "Edit custom element", description: "best element ever", onCancel: addon_actions_1.action('onCancel'), onSave: addon_actions_1.action('onSave') })))
    .add('with image', () => (react_1.default.createElement(custom_element_modal_1.CustomElementModal, { title: "Edit custom element", image: elastic_logo_1.elasticLogo, onCancel: addon_actions_1.action('onCancel'), onSave: addon_actions_1.action('onSave') })));
