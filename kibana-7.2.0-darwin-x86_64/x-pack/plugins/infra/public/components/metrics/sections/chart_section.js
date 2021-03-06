"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const experimental_1 = require("@elastic/eui/lib/experimental");
const react_1 = require("@kbn/i18n/react");
const color_1 = tslib_1.__importDefault(require("color"));
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importDefault(require("react"));
const lib_1 = require("../../../lib/lib");
const types_1 = require("../../../pages/metrics/layouts/types");
const formatters_1 = require("../../../utils/formatters");
const MARGIN_LEFT = 60;
const chartComponentsByType = {
    [types_1.InfraMetricLayoutVisualizationType.line]: experimental_1.EuiLineSeries,
    [types_1.InfraMetricLayoutVisualizationType.area]: experimental_1.EuiAreaSeries,
    [types_1.InfraMetricLayoutVisualizationType.bar]: experimental_1.EuiBarSeries,
};
const isInfraMetricLayoutVisualizationType = (subject) => {
    return types_1.InfraMetricLayoutVisualizationType[subject] != null;
};
const getChartName = (section, seriesId) => {
    return lodash_1.get(section, ['visConfig', 'seriesOverrides', seriesId, 'name'], seriesId);
};
const getChartColor = (section, seriesId) => {
    const color = new color_1.default(lodash_1.get(section, ['visConfig', 'seriesOverrides', seriesId, 'color'], '#999'));
    return color.hex().toString();
};
const getChartType = (section, seriesId) => {
    const value = lodash_1.get(section, ['visConfig', 'type']);
    const overrideValue = lodash_1.get(section, ['visConfig', 'seriesOverrides', seriesId, 'type']);
    if (isInfraMetricLayoutVisualizationType(overrideValue)) {
        return overrideValue;
    }
    if (isInfraMetricLayoutVisualizationType(value)) {
        return value;
    }
    return types_1.InfraMetricLayoutVisualizationType.line;
};
const getFormatter = (formatter, formatterTemplate) => (val) => {
    if (val == null) {
        return '';
    }
    return formatters_1.createFormatter(formatter, formatterTemplate)(val);
};
const titleFormatter = (dataPoints) => {
    if (dataPoints.length > 0) {
        const [firstDataPoint] = dataPoints;
        const { originalValues } = firstDataPoint;
        return {
            title: react_2.default.createElement(eui_1.EuiIcon, { type: "clock" }),
            value: moment_1.default(originalValues.x).format('lll'),
        };
    }
};
const createItemsFormatter = (formatter, labels, seriesColors) => (dataPoints) => {
    return dataPoints.map(d => {
        return {
            title: (react_2.default.createElement("span", null,
                react_2.default.createElement(eui_1.EuiIcon, { type: "dot", style: { color: seriesColors[d.seriesIndex] } }),
                labels[d.seriesIndex])),
            value: formatter(d.y),
        };
    });
};
const seriesHasLessThen2DataPoints = (series) => {
    return series.data.length < 2;
};
exports.ChartSection = react_1.injectI18n((_a = class extends react_2.default.PureComponent {
        constructor() {
            super(...arguments);
            this.handleSelectionBrushEnd = (area) => {
                const { onChangeRangeTime, isLiveStreaming, stopLiveStreaming } = this.props;
                const { startX, endX } = area.domainArea;
                if (onChangeRangeTime) {
                    if (isLiveStreaming && stopLiveStreaming) {
                        stopLiveStreaming();
                    }
                    onChangeRangeTime({
                        to: endX.valueOf(),
                        from: startX.valueOf(),
                        interval: '>=1m',
                    });
                }
            };
        }
        render() {
            const { crosshairValue, section, metric, onCrosshairUpdate, intl } = this.props;
            const { visConfig } = section;
            const crossHairProps = {
                crosshairValue,
                onCrosshairUpdate,
            };
            const chartProps = {
                xType: 'time',
                showCrosshair: false,
                showDefaultAxis: false,
                enableSelectionBrush: true,
                onSelectionBrushEnd: this.handleSelectionBrushEnd,
            };
            const stacked = visConfig && visConfig.stacked;
            if (stacked) {
                chartProps.stackBy = 'y';
            }
            const bounds = visConfig && visConfig.bounds;
            if (bounds) {
                chartProps.yDomain = [bounds.min, bounds.max];
            }
            if (!metric) {
                chartProps.statusText = intl.formatMessage({
                    id: 'xpack.infra.chartSection.missingMetricDataText',
                    defaultMessage: 'Missing data',
                });
            }
            if (metric.series.some(seriesHasLessThen2DataPoints)) {
                chartProps.statusText = intl.formatMessage({
                    id: 'xpack.infra.chartSection.notEnoughDataPointsToRenderText',
                    defaultMessage: 'Not enough data points to render chart, try increasing the time range.',
                });
            }
            const formatter = lodash_1.get(visConfig, 'formatter', lib_1.InfraFormatterType.number);
            const formatterTemplate = lodash_1.get(visConfig, 'formatterTemplate', '{{value}}');
            const formatterFunction = getFormatter(formatter, formatterTemplate);
            const seriesLabels = lodash_1.get(metric, 'series', []).map(s => getChartName(section, s.id));
            const seriesColors = lodash_1.get(metric, 'series', []).map(s => getChartColor(section, s.id) || '');
            const itemsFormatter = createItemsFormatter(formatterFunction, seriesLabels, seriesColors);
            return (react_2.default.createElement(eui_1.EuiPageContentBody, null,
                react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                    react_2.default.createElement("h3", { id: section.id }, section.label)),
                react_2.default.createElement("div", { style: { height: 200 } },
                    react_2.default.createElement(experimental_1.EuiSeriesChart, Object.assign({}, chartProps),
                        react_2.default.createElement(experimental_1.EuiXAxis, { marginLeft: MARGIN_LEFT }),
                        react_2.default.createElement(experimental_1.EuiYAxis, { tickFormat: formatterFunction, marginLeft: MARGIN_LEFT }),
                        react_2.default.createElement(experimental_1.EuiCrosshairX, Object.assign({ marginLeft: MARGIN_LEFT, seriesNames: seriesLabels, itemsFormat: itemsFormatter, titleFormat: titleFormatter }, crossHairProps)),
                        metric &&
                            metric.series.map(series => {
                                if (!series || series.data.length < 2) {
                                    return null;
                                }
                                const data = series.data.map(d => {
                                    return { x: d.timestamp, y: d.value || 0, y0: 0 };
                                });
                                const chartType = getChartType(section, series.id);
                                const name = getChartName(section, series.id);
                                const seriesProps = {
                                    data,
                                    name,
                                    lineSize: 2,
                                };
                                const color = getChartColor(section, series.id);
                                if (color) {
                                    seriesProps.color = color;
                                }
                                const EuiChartComponent = chartComponentsByType[chartType];
                                return (react_2.default.createElement(EuiChartComponent, Object.assign({ key: `${section.id}-${series.id}` }, seriesProps, { marginLeft: MARGIN_LEFT })));
                            })))));
        }
    },
    _a.displayName = 'ChartSection',
    _a));
