"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const LinkIcon = styled_components_1.default(eui_1.EuiIcon) `
  position: relative;
  top: -2px;
`;
const LinkIconWithMargin = styled_components_1.default(LinkIcon) `
  margin-left: 5px;
`;
const color = 'subdued';
const iconSize = 's';
const iconType = 'popout';
/**
 * Renders an icon that indicates following the hyperlink will navigate to
 * content external to the app
 */
exports.ExternalLinkIcon = recompose_1.pure(({ leftMargin = true }) => leftMargin ? (React.createElement(LinkIconWithMargin, { color: color, "data-test-subj": "external-link-icon", size: iconSize, type: iconType })) : (React.createElement(LinkIcon, { color: color, "data-test-subj": "external-link-icon", size: iconSize, type: iconType })));
