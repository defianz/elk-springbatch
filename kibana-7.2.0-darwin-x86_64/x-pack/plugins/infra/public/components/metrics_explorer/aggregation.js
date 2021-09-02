"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const types_1 = require("../../../server/routes/metrics_explorer/types");
const isMetricsExplorerAggregation = (subject) => {
    return Object.keys(types_1.MetricsExplorerAggregation).includes(subject);
};
exports.MetricsExplorerAggregationPicker = react_1.injectI18n(({ intl, options, onChange }) => {
    const AGGREGATION_LABELS = {
        [types_1.MetricsExplorerAggregation.avg]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.avg',
            defaultMessage: 'Average',
        }),
        [types_1.MetricsExplorerAggregation.max]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.max',
            defaultMessage: 'Max',
        }),
        [types_1.MetricsExplorerAggregation.min]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.min',
            defaultMessage: 'Min',
        }),
        [types_1.MetricsExplorerAggregation.cardinality]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.cardinality',
            defaultMessage: 'Cardinality',
        }),
        [types_1.MetricsExplorerAggregation.rate]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.rate',
            defaultMessage: 'Rate',
        }),
        [types_1.MetricsExplorerAggregation.count]: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationLables.count',
            defaultMessage: 'Document Count',
        }),
    };
    const handleChange = react_2.useCallback(e => {
        const aggregation = (isMetricsExplorerAggregation(e.target.value) && e.target.value) ||
            types_1.MetricsExplorerAggregation.avg;
        onChange(aggregation);
    }, [onChange]);
    return (react_2.default.createElement(eui_1.EuiSelect, { placeholder: intl.formatMessage({
            id: 'xpack.infra.metricsExplorer.aggregationSelectLabel',
            defaultMessage: 'Select an aggregation',
        }), fullWidth: true, value: options.aggregation, options: Object.keys(types_1.MetricsExplorerAggregation).map(k => ({
            text: AGGREGATION_LABELS[k],
            value: k,
        })), onChange: handleChange }));
});
