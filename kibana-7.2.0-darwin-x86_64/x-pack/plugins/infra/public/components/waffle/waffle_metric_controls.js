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
const react_2 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../graphql/types");
let OPTIONS;
const getOptions = (nodeType, intl) => {
    if (!OPTIONS) {
        const CPUUsage = intl.formatMessage({
            id: 'xpack.infra.waffle.metricOptions.cpuUsageText',
            defaultMessage: 'CPU Usage',
        });
        const MemoryUsage = intl.formatMessage({
            id: 'xpack.infra.waffle.metricOptions.memoryUsageText',
            defaultMessage: 'Memory Usage',
        });
        const InboundTraffic = intl.formatMessage({
            id: 'xpack.infra.waffle.metricOptions.inboundTrafficText',
            defaultMessage: 'Inbound Traffic',
        });
        const OutboundTraffic = intl.formatMessage({
            id: 'xpack.infra.waffle.metricOptions.outboundTrafficText',
            defaultMessage: 'Outbound Traffic',
        });
        OPTIONS = {
            [types_1.InfraNodeType.pod]: [
                {
                    text: CPUUsage,
                    value: types_1.InfraSnapshotMetricType.cpu,
                },
                {
                    text: MemoryUsage,
                    value: types_1.InfraSnapshotMetricType.memory,
                },
                {
                    text: InboundTraffic,
                    value: types_1.InfraSnapshotMetricType.rx,
                },
                {
                    text: OutboundTraffic,
                    value: types_1.InfraSnapshotMetricType.tx,
                },
            ],
            [types_1.InfraNodeType.container]: [
                {
                    text: CPUUsage,
                    value: types_1.InfraSnapshotMetricType.cpu,
                },
                {
                    text: MemoryUsage,
                    value: types_1.InfraSnapshotMetricType.memory,
                },
                {
                    text: InboundTraffic,
                    value: types_1.InfraSnapshotMetricType.rx,
                },
                {
                    text: OutboundTraffic,
                    value: types_1.InfraSnapshotMetricType.tx,
                },
            ],
            [types_1.InfraNodeType.host]: [
                {
                    text: CPUUsage,
                    value: types_1.InfraSnapshotMetricType.cpu,
                },
                {
                    text: MemoryUsage,
                    value: types_1.InfraSnapshotMetricType.memory,
                },
                {
                    text: intl.formatMessage({
                        id: 'xpack.infra.waffle.metricOptions.loadText',
                        defaultMessage: 'Load',
                    }),
                    value: types_1.InfraSnapshotMetricType.load,
                },
                {
                    text: InboundTraffic,
                    value: types_1.InfraSnapshotMetricType.rx,
                },
                {
                    text: OutboundTraffic,
                    value: types_1.InfraSnapshotMetricType.tx,
                },
                {
                    text: intl.formatMessage({
                        id: 'xpack.infra.waffle.metricOptions.hostLogRateText',
                        defaultMessage: 'Log Rate',
                    }),
                    value: types_1.InfraSnapshotMetricType.logRate,
                },
            ],
        };
    }
    return OPTIONS[nodeType];
};
const initialState = {
    isPopoverOpen: false,
};
exports.WaffleMetricControls = react_1.injectI18n((_a = class extends react_2.default.PureComponent {
        constructor() {
            super(...arguments);
            this.state = initialState;
            this.handleClose = () => {
                this.setState({ isPopoverOpen: false });
            };
            this.handleToggle = () => {
                this.setState(state => ({ isPopoverOpen: !state.isPopoverOpen }));
            };
            this.handleClick = (value) => () => {
                this.props.onChange({ type: value });
                this.handleClose();
            };
        }
        render() {
            const { metric, nodeType, intl } = this.props;
            const options = getOptions(nodeType, intl);
            const value = metric.type;
            if (!options.length || !value) {
                throw Error(intl.formatMessage({
                    id: 'xpack.infra.waffle.unableToSelectMetricErrorTitle',
                    defaultMessage: 'Unable to select options or value for metric.',
                }));
            }
            const currentLabel = options.find(o => o.value === metric.type);
            if (!currentLabel) {
                return 'null';
            }
            const panels = [
                {
                    id: 0,
                    title: '',
                    items: options.map(o => {
                        const icon = o.value === metric.type ? 'check' : 'empty';
                        const panel = { name: o.text, onClick: this.handleClick(o.value), icon };
                        return panel;
                    }),
                },
            ];
            const button = (react_2.default.createElement(eui_1.EuiFilterButton, { iconType: "arrowDown", onClick: this.handleToggle },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.waffle.metricButtonLabel", defaultMessage: "Metric: {selectedMetric}", values: { selectedMetric: currentLabel.text } })));
            return (react_2.default.createElement(eui_1.EuiFilterGroup, null,
                react_2.default.createElement(eui_1.EuiPopover, { isOpen: this.state.isPopoverOpen, id: "metricsPanel", button: button, panelPaddingSize: "none", closePopover: this.handleClose },
                    react_2.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: panels }))));
        }
    },
    _a.displayName = 'WaffleMetricControls',
    _a));
