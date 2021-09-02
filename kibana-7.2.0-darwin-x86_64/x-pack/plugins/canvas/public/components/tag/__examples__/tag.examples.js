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
const tag_1 = require("../tag");
react_1.storiesOf('components/Tag', module)
    .add('as health', () => react_2.default.createElement(tag_1.Tag, { name: "tag" }))
    .add('as health with color', () => react_2.default.createElement(tag_1.Tag, { name: "tag", color: "#9b3067" }))
    .add('as badge', () => react_2.default.createElement(tag_1.Tag, { name: "tag", type: "badge" }))
    .add('as badge with color', () => react_2.default.createElement(tag_1.Tag, { name: "tag", type: "badge", color: "#327b53" }));
