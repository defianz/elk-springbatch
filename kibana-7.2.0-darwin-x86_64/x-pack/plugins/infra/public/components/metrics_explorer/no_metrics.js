"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
const eui_1 = require("@elastic/eui");
exports.MetricsExplorerNoMetrics = react_2.injectI18n(() => {
    return (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "stats", title: react_1.default.createElement("h3", null,
            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.infra.metricsExplorer.noMetrics.title", defaultMessage: "Missing Metric" })), body: react_1.default.createElement("p", null,
            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.infra.metricsExplorer.noMetrics.body", defaultMessage: "Please choose a metric above." })) }));
});
