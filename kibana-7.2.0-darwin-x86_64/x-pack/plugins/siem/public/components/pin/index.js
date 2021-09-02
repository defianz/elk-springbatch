"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.getPinRotation = (pinned) => pinned ? 'rotate(0)' : 'rotate(45)';
const PinIcon = styled_components_1.default(eui_1.EuiIcon) `
  overflow: hidden;
  transform: ${({ transform }) => transform};
`;
exports.Pin = recompose_1.pure(({ allowUnpinning, pinned, onClick = fp_1.noop }) => (React.createElement(PinIcon, { cursor: allowUnpinning ? 'pointer' : 'not-allowed', color: pinned ? 'primary' : 'subdued', "data-test-subj": "pin", onClick: onClick, role: "button", size: "l", transform: exports.getPinRotation(pinned), type: "pin" })));
