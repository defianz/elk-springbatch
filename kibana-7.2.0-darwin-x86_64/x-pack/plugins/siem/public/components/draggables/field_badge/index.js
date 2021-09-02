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
const FieldBadgeFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 38px;
`;
const FieldBadgeFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  font-weight: bold;
`;
/**
 * The name of a (draggable) field
 */
exports.FieldNameContainer = styled_components_1.default.div `
  padding: 5px;
  &:hover {
    transition: background-color 0.7s ease;
    background-color: #000;
    color: #fff;
  }
`;
/**
 * Renders a field (e.g. `event.action`) as a draggable badge
 */
exports.DraggableFieldBadge = recompose_1.pure(({ fieldId }) => (React.createElement(eui_1.EuiBadge, { color: "#000" },
    React.createElement(FieldBadgeFlexGroup, { alignItems: "center", justifyContent: "center", gutterSize: "none" },
        React.createElement(FieldBadgeFlexItem, { "data-test-subj": "field", grow: false }, fieldId)))));
