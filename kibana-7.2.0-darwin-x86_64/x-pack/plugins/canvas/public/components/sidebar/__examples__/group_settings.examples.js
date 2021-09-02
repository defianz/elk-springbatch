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
const group_settings_1 = require("../group_settings");
react_2.storiesOf('components/Sidebar/GroupSettings', module).add('default', () => react_1.default.createElement(group_settings_1.GroupSettings, null));
