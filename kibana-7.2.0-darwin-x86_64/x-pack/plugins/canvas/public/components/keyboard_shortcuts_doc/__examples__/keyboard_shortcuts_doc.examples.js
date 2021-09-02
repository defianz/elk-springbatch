"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = require("@storybook/react");
const react_2 = tslib_1.__importDefault(require("react"));
const addon_actions_1 = require("@storybook/addon-actions");
const keyboard_shortcuts_doc_1 = require("../keyboard_shortcuts_doc");
react_1.storiesOf('components/KeyboardShortcutsDoc', module).add('default', () => (react_2.default.createElement(keyboard_shortcuts_doc_1.KeyboardShortcutsDoc, { onClose: addon_actions_1.action('onClose') })));
