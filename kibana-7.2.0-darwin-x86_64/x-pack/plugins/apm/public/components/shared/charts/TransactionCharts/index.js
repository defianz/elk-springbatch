"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const lodash_1 = require("lodash");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const formatters_1 = require("../../../../utils/formatters");
const MLJobLink_1 = require("../../Links/MachineLearningLinks/MLJobLink");
// @ts-ignore
const CustomPlot_1 = tslib_1.__importDefault(require("../CustomPlot"));
const SyncChartGroup_1 = require("../SyncChartGroup");
const LicenseContext_1 = require("../../../../context/LicenseContext");
const getEmptySeries_1 = require("../CustomPlot/getEmptySeries");
const ShiftedIconWrapper = styled_components_1.default.span `
  padding-right: 5px;
  position: relative;
  top: -1px;
  display: inline-block;
`;
const ShiftedEuiText = styled_components_1.default(eui_1.EuiText) `
  position: relative;
  top: 5px;
`;
const msTimeUnitLabel = i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.msTimeUnitLabel', {
    defaultMessage: 'ms'
});
class TransactionCharts extends react_1.Component {
    constructor() {
        super(...arguments);
        this.getResponseTimeTickFormatter = (t) => {
            return this.props.charts.noHits ? `- ${msTimeUnitLabel}` : formatters_1.asMillis(t);
        };
        this.getResponseTimeTooltipFormatter = (p) => {
            return this.props.charts.noHits || !p
                ? `- ${msTimeUnitLabel}`
                : formatters_1.asMillis(p.y);
        };
        this.getTPMFormatter = (t) => {
            const { urlParams, charts } = this.props;
            const unit = formatters_1.tpmUnit(urlParams.transactionType);
            return charts.noHits || t === null
                ? `- ${unit}`
                : `${formatters_1.asInteger(t)} ${unit}`;
        };
        this.getTPMTooltipFormatter = (p) => {
            return this.getTPMFormatter(p.y);
        };
    }
    renderMLHeader(hasValidMlLicense) {
        const { hasMLJob } = this.props;
        if (!hasValidMlLicense || !hasMLJob) {
            return null;
        }
        const { serviceName, transactionType, kuery } = this.props.urlParams;
        if (!serviceName) {
            return null;
        }
        const hasKuery = !lodash_1.isEmpty(kuery);
        const icon = hasKuery ? (react_1.default.createElement(eui_1.EuiIconTip, { "aria-label": "Warning", type: "alert", color: "warning", content: "The Machine learning results are hidden when the search bar is used for filtering" })) : (react_1.default.createElement(eui_1.EuiIconTip, { content: i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.machineLearningTooltip', {
                defaultMessage: 'The stream around the average duration shows the expected bounds. An annotation is shown for anomaly scores >= 75.'
            }) }));
        return (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(ShiftedEuiText, { size: "xs" },
                react_1.default.createElement(ShiftedIconWrapper, null, icon),
                react_1.default.createElement("span", null,
                    i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.machineLearningLabel', {
                        defaultMessage: 'Machine learning:'
                    }),
                    ' '),
                react_1.default.createElement(MLJobLink_1.MLJobLink, { serviceName: serviceName, transactionType: transactionType }, "View Job"))));
    }
    render() {
        const { charts, urlParams } = this.props;
        const { noHits, responseTimeSeries, tpmSeries } = charts;
        const { transactionType, start, end } = urlParams;
        return (react_1.default.createElement(SyncChartGroup_1.SyncChartGroup, { render: hoverXHandlers => (react_1.default.createElement(eui_1.EuiFlexGrid, { columns: 2, gutterSize: "s" },
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiPanel, null,
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                                react_1.default.createElement(eui_1.EuiFlexItem, null,
                                    react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                                        react_1.default.createElement("span", null, responseTimeLabel(transactionType)))),
                                react_1.default.createElement(LicenseContext_1.LicenseContext.Consumer, null, license => this.renderMLHeader(license.features.ml.is_available))),
                            react_1.default.createElement(CustomPlot_1.default, Object.assign({ noHits: noHits, series: noHits ? getEmptySeries_1.getEmptySeries(start, end) : responseTimeSeries }, hoverXHandlers, { tickFormatY: this.getResponseTimeTickFormatter, formatTooltipValue: this.getResponseTimeTooltipFormatter }))))),
                react_1.default.createElement(eui_1.EuiFlexItem, { style: { flexShrink: 1 } },
                    react_1.default.createElement(eui_1.EuiPanel, null,
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                                react_1.default.createElement("span", null, tpmLabel(transactionType))),
                            react_1.default.createElement(CustomPlot_1.default, Object.assign({ noHits: noHits, series: noHits ? getEmptySeries_1.getEmptySeries(start, end) : tpmSeries }, hoverXHandlers, { tickFormatY: this.getTPMFormatter, formatTooltipValue: this.getTPMTooltipFormatter, truncateLegends: true }))))))) }));
    }
}
exports.TransactionCharts = TransactionCharts;
function tpmLabel(type) {
    return type === 'request'
        ? i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.requestsPerMinuteLabel', {
            defaultMessage: 'Requests per minute'
        })
        : i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.transactionsPerMinuteLabel', {
            defaultMessage: 'Transactions per minute'
        });
}
function responseTimeLabel(type) {
    switch (type) {
        case 'page-load':
            return i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.pageLoadTimesLabel', {
                defaultMessage: 'Page load times'
            });
        case 'route-change':
            return i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.routeChangeTimesLabel', {
                defaultMessage: 'Route change times'
            });
        default:
            return i18n_1.i18n.translate('xpack.apm.metrics.transactionChart.transactionDurationLabel', {
                defaultMessage: 'Transaction duration'
            });
    }
}
