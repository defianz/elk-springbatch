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
const file_upload_1 = require("./file_upload");
react_1.storiesOf('components/FileUpload', module).add('default', () => (react_2.default.createElement(file_upload_1.FileUpload, { onUpload: addon_actions_1.action('onUpload') })));
