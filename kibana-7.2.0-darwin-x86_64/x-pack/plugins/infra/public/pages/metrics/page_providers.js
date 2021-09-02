"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const source_configuration_1 = require("../../components/source_configuration");
const with_metrics_time_1 = require("../../containers/metrics/with_metrics_time");
const source_1 = require("../../containers/source");
exports.MetricDetailPageProviders = ({ children }) => (react_1.default.createElement(source_1.Source.Provider, { sourceId: "default" },
    react_1.default.createElement(source_configuration_1.SourceConfigurationFlyoutState.Provider, null,
        react_1.default.createElement(with_metrics_time_1.MetricsTimeContainer.Provider, null, children))));
