"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const recompose_1 = require("recompose");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("./helpers");
const page_1 = require("../page");
const CountBadgeContainer = styled_components_1.default.div `
  position: relative;
  top: -3px;
`;
exports.CategoryTitle = recompose_1.pure(({ filteredBrowserFields, categoryId, timelineId }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", "data-test-subj": "category-title-container", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiTitle, { className: helpers_1.getFieldBrowserCategoryTitleClassName({ categoryId, timelineId }), "data-test-subj": "category-title", size: "xxs" },
            React.createElement("h5", null, categoryId))),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(CountBadgeContainer, null,
            React.createElement(page_1.CountBadge, { color: "hollow" }, helpers_1.getFieldCount(filteredBrowserFields[categoryId])))))));
