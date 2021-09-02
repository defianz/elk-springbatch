"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_2 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
exports.MonitorPageTitleComponent = ({ data }) => data && data.monitorPageTitle ? (react_1.default.createElement(eui_1.EuiTitle, { size: "xxs" },
    react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" },
        react_1.default.createElement("h4", { "data-test-subj": "monitor-page-title" }, data.monitorPageTitle.id)))) : (react_1.default.createElement(eui_2.EuiLoadingSpinner, { size: "xl" }));
exports.MonitorPageTitle = higher_order_1.withUptimeGraphQL(exports.MonitorPageTitleComponent, queries_1.monitorPageTitleQuery);
