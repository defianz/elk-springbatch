"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const Header = styled_components_1.default.header `
  ${props => `
    margin-bottom: ${props.theme.eui.euiSizeL};

    ${props.border &&
    `
      border-bottom: ${props.theme.eui.euiBorderThin};
      padding-bottom: ${props.theme.eui.euiSizeL};
    `}
  `}
`;
exports.HeaderPanel = recompose_1.pure(({ border, children, subtitle, title, tooltip }) => (react_1.default.createElement(Header, { border: border },
    react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiTitle, null,
                react_1.default.createElement("h2", { "data-test-subj": "page_headline_title" },
                    title,
                    ' ',
                    tooltip && react_1.default.createElement(eui_1.EuiIconTip, { color: "subdued", content: tooltip, position: "top", size: "l" }))),
            react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, subtitle)),
        children && react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, children)))));
