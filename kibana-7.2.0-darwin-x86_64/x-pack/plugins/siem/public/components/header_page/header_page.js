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
  ${({ theme }) => `
    border-bottom: ${theme.eui.euiBorderThin};
    padding-bottom: ${theme.eui.euiSizeL};
    margin: ${theme.eui.euiSizeL} 0;
  `}
`;
exports.HeaderPage = recompose_1.pure(({ badgeLabel, badgeTooltip, children, subtitle, title, ...rest }) => (react_1.default.createElement(Header, Object.assign({}, rest),
    react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_1.default.createElement("h1", { "data-test-subj": "page_headline_title" },
                    title,
                    badgeLabel && (react_1.default.createElement(react_1.default.Fragment, null,
                        ' ',
                        react_1.default.createElement(eui_1.EuiBetaBadge, { label: badgeLabel, tooltipContent: badgeTooltip, tooltipPosition: "bottom" }))))),
            react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, subtitle)),
        children && react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, children)))));
