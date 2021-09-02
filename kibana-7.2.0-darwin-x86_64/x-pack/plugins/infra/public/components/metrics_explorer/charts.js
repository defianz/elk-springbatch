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
const react_2 = tslib_1.__importDefault(require("react"));
const loading_1 = require("../loading");
const no_data_1 = require("../empty_states/no_data");
const chart_1 = require("./chart");
exports.MetricsExplorerCharts = react_1.injectI18n(({ loading, data, onLoadMore, options, onRefetch, intl, onFilter, source, timeRange, onTimeChange, }) => {
    if (!data && loading) {
        return (react_2.default.createElement(loading_1.InfraLoadingPanel, { height: 800, width: "100%", text: intl.formatMessage({
                defaultMessage: 'Loading charts',
                id: 'xpack.infra.metricsExplorer.loadingCharts',
            }) }));
    }
    if (!data || data.series.length === 0) {
        return (react_2.default.createElement(no_data_1.NoData, { titleText: intl.formatMessage({
                id: 'xpack.infra.metricsExplorer.noDataTitle',
                defaultMessage: 'There is no data to display.',
            }), bodyText: intl.formatMessage({
                id: 'xpack.infra.metricsExplorer.noDataBodyText',
                defaultMessage: 'Try adjusting your time, filters or group by settings.',
            }), refetchText: intl.formatMessage({
                id: 'xpack.infra.metricsExplorer.noDataRefetchText',
                defaultMessage: 'Check for new data',
            }), testString: "metrics-explorer-no-data", onRefetch: onRefetch }));
    }
    return (react_2.default.createElement("div", null,
        react_2.default.createElement(eui_1.EuiFlexGrid, { gutterSize: "s", columns: data.series.length === 1 ? 1 : 3 }, data.series.map(series => (react_2.default.createElement(eui_1.EuiFlexItem, { key: series.id, style: { padding: 16, minWidth: 0 } },
            react_2.default.createElement(chart_1.MetricsExplorerChart, { key: `chart-${series.id}`, onFilter: onFilter, options: options, title: options.groupBy ? series.id : null, height: data.series.length > 1 ? 200 : 400, series: series, source: source, timeRange: timeRange, onTimeChange: onTimeChange }))))),
        data.series.length > 1 ? (react_2.default.createElement("div", { style: { textAlign: 'center', marginBottom: 16 } },
            react_2.default.createElement(eui_1.EuiHorizontalRule, null),
            react_2.default.createElement(eui_1.EuiText, { color: "subdued" },
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metricsExplorer.footerPaginationMessage", defaultMessage: 'Displaying {length} of {total} charts grouped by "{groupBy}".', values: {
                            length: data.series.length,
                            total: data.pageInfo.total,
                            groupBy: options.groupBy,
                        } }))),
            data.pageInfo.afterKey ? (react_2.default.createElement("div", { style: { margin: '16px 0' } },
                react_2.default.createElement(eui_1.EuiButton, { isLoading: loading, size: "s", onClick: () => onLoadMore(data.pageInfo.afterKey || null) },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metricsExplorer.loadMoreChartsButton", defaultMessage: "Load More Charts" })))) : null)) : null));
});
