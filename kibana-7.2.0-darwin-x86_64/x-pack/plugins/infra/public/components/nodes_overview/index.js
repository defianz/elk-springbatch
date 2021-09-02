"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const types_1 = require("../../graphql/types");
const lib_1 = require("../../lib/lib");
const formatters_1 = require("../../utils/formatters");
const empty_states_1 = require("../empty_states");
const loading_1 = require("../loading");
const map_1 = require("../waffle/map");
const view_switcher_1 = require("../waffle/view_switcher");
const table_1 = require("./table");
const METRIC_FORMATTERS = {
    [types_1.InfraSnapshotMetricType.count]: { formatter: lib_1.InfraFormatterType.number, template: '{{value}}' },
    [types_1.InfraSnapshotMetricType.cpu]: {
        formatter: lib_1.InfraFormatterType.percent,
        template: '{{value}}',
    },
    [types_1.InfraSnapshotMetricType.memory]: {
        formatter: lib_1.InfraFormatterType.percent,
        template: '{{value}}',
    },
    [types_1.InfraSnapshotMetricType.rx]: { formatter: lib_1.InfraFormatterType.bits, template: '{{value}}/s' },
    [types_1.InfraSnapshotMetricType.tx]: { formatter: lib_1.InfraFormatterType.bits, template: '{{value}}/s' },
    [types_1.InfraSnapshotMetricType.logRate]: {
        formatter: lib_1.InfraFormatterType.abbreviatedNumber,
        template: '{{value}}/s',
    },
};
const calculateBoundsFromNodes = (nodes) => {
    const maxValues = nodes.map(node => node.metric.max);
    const minValues = nodes.map(node => node.metric.value);
    // if there is only one value then we need to set the bottom range to zero for min
    // otherwise the legend will look silly since both values are the same for top and
    // bottom.
    if (minValues.length === 1) {
        minValues.unshift(0);
    }
    return { min: lodash_1.min(minValues) || 0, max: lodash_1.max(maxValues) || 0 };
};
exports.NodesOverview = react_1.injectI18n((_a = class extends react_2.default.Component {
        constructor() {
            super(...arguments);
            this.handleViewChange = (view) => this.props.onViewChange(view);
            // TODO: Change this to a real implimentation using the tickFormatter from the prototype as an example.
            this.formatter = (val) => {
                const { metric } = this.props.options;
                const metricFormatter = lodash_1.get(METRIC_FORMATTERS, metric.type, METRIC_FORMATTERS[types_1.InfraSnapshotMetricType.count]);
                if (val == null) {
                    return '';
                }
                const formatter = formatters_1.createFormatter(metricFormatter.formatter, metricFormatter.template);
                return formatter(val);
            };
            this.handleDrilldown = (filter) => {
                this.props.onDrilldown({
                    kind: 'kuery',
                    expression: filter,
                });
                return;
            };
        }
        render() {
            const { autoBounds, boundsOverride, loading, nodes, nodeType, reload, intl, view, options, timeRange, } = this.props;
            if (loading) {
                return (react_2.default.createElement(loading_1.InfraLoadingPanel, { height: "100%", width: "100%", text: intl.formatMessage({
                        id: 'xpack.infra.waffle.loadingDataText',
                        defaultMessage: 'Loading data',
                    }) }));
            }
            else if (!loading && nodes && nodes.length === 0) {
                return (react_2.default.createElement(empty_states_1.NoData, { titleText: intl.formatMessage({
                        id: 'xpack.infra.waffle.noDataTitle',
                        defaultMessage: 'There is no data to display.',
                    }), bodyText: intl.formatMessage({
                        id: 'xpack.infra.waffle.noDataDescription',
                        defaultMessage: 'Try adjusting your time or filter.',
                    }), refetchText: intl.formatMessage({
                        id: 'xpack.infra.waffle.checkNewDataButtonLabel',
                        defaultMessage: 'Check for new data',
                    }), onRefetch: () => {
                        reload();
                    }, testString: "noMetricsDataPrompt" }));
            }
            const dataBounds = calculateBoundsFromNodes(nodes);
            const bounds = autoBounds ? dataBounds : boundsOverride;
            return (react_2.default.createElement(MainContainer, null,
                react_2.default.createElement(ViewSwitcherContainer, null,
                    react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(view_switcher_1.ViewSwitcher, { view: view, onChange: this.handleViewChange })),
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiText, { color: "subdued" },
                                react_2.default.createElement("p", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.homePage.toolbar.showingLastOneMinuteDataText", defaultMessage: "Showing the last 1 minute of data from the time period" })))))),
                view === 'table' ? (react_2.default.createElement(TableContainer, null,
                    react_2.default.createElement(table_1.TableView, { nodeType: nodeType, nodes: nodes, options: options, formatter: this.formatter, timeRange: timeRange, onFilter: this.handleDrilldown }))) : (react_2.default.createElement(MapContainer, null,
                    react_2.default.createElement(map_1.Map, { nodeType: nodeType, nodes: nodes, options: options, formatter: this.formatter, timeRange: timeRange, onFilter: this.handleDrilldown, bounds: bounds, dataBounds: dataBounds })))));
        }
    },
    _a.displayName = 'Waffle',
    _a));
const MainContainer = eui_styled_components_1.default.div `
  position: relative;
  flex: 1 1 auto;
`;
const TableContainer = eui_styled_components_1.default.div `
  padding: ${props => props.theme.eui.paddingSizes.l};
`;
const ViewSwitcherContainer = eui_styled_components_1.default.div `
  padding: ${props => props.theme.eui.paddingSizes.l};
`;
const MapContainer = eui_styled_components_1.default.div `
  position: absolute;
  display: flex;
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
`;
