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
const helpers_1 = require("../../../../event_details/helpers");
const i18n = tslib_1.__importStar(require("../translations"));
const IconType = styled_components_1.default(eui_1.EuiIcon) `
  margin-right: 3px;
  position: relative;
  top: -2px;
`;
const P = styled_components_1.default.p `
  margin-bottom: 5px;
`;
const ToolTipTableMetadata = styled_components_1.default.span `
  margin-right: 5px;
`;
const ToolTipTableValue = styled_components_1.default.span `
  word-wrap: break-word;
`;
exports.HeaderToolTipContent = recompose_1.pure(({ header }) => (React.createElement(React.Fragment, null,
    !fp_1.isEmpty(header.category) ? (React.createElement(P, null,
        React.createElement(ToolTipTableMetadata, { "data-test-subj": "category" },
            i18n.CATEGORY,
            ':'),
        React.createElement(ToolTipTableValue, { "data-test-subj": "category-value" }, header.category))) : null,
    React.createElement(P, null,
        React.createElement(ToolTipTableMetadata, { "data-test-subj": "field" },
            i18n.FIELD,
            ':'),
        React.createElement(ToolTipTableValue, { "data-test-subj": "field-value" }, header.id)),
    React.createElement(P, null,
        React.createElement(ToolTipTableMetadata, { "data-test-subj": "type" },
            i18n.TYPE,
            ':'),
        React.createElement(ToolTipTableValue, null,
            React.createElement(IconType, { "data-test-subj": "type-icon", type: helpers_1.getIconFromType(header.type) }),
            React.createElement("span", { "data-test-subj": "type-value" }, header.type))),
    !fp_1.isEmpty(header.description) ? (React.createElement(P, null,
        React.createElement(ToolTipTableMetadata, { "data-test-subj": "description" },
            i18n.DESCRIPTION,
            ':'),
        React.createElement(ToolTipTableValue, { "data-test-subj": "description-value" }, header.description))) : null)));
