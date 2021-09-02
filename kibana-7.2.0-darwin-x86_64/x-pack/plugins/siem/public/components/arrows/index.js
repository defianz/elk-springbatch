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
/** Renders the body (non-pointy part) of an arrow */
exports.ArrowBody = styled_components_1.default.span `
  background-color: ${props => props.theme.eui.euiColorLightShade};
  height: ${({ height }) => `${height}px`};
  width: 25px;
`;
/** Renders the head of an arrow */
exports.ArrowHead = recompose_1.pure(({ direction }) => (React.createElement(eui_1.EuiIcon, { color: "subdued", "data-test-subj": "arrow-icon", size: "s", type: direction })));
