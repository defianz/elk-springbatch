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
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
const snapshot_histogram_1 = require("./snapshot_histogram");
const snapshot_loading_1 = require("./snapshot_loading");
exports.SnapshotComponent = ({ colors: { danger, success }, data }) => data && data.snapshot ? (react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
    react_2.default.createElement(eui_1.EuiFlexItem, { grow: 4 },
        react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
            react_2.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_2.default.createElement("h5", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.snapshot.endpointStatusTitle", defaultMessage: "Current status" }))),
                    react_2.default.createElement(eui_2.EuiSpacer, { size: "s" })),
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceEvenly", gutterSize: "s" },
                        react_2.default.createElement(eui_1.EuiFlexItem, null,
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.upDescription', {
                                    defaultMessage: 'Up',
                                }), textAlign: "center", title: data.snapshot.up, titleColor: "secondary" })),
                        react_2.default.createElement(eui_1.EuiFlexItem, null,
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.downDescription', {
                                    defaultMessage: 'Down',
                                }), textAlign: "center", title: data.snapshot.down, titleColor: "danger" })),
                        react_2.default.createElement(eui_1.EuiFlexItem, null,
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.totalDescription', {
                                    defaultMessage: 'Total',
                                }), textAlign: "center", title: data.snapshot.total, titleColor: "subdued" }))))))),
    react_2.default.createElement(eui_1.EuiFlexItem, { grow: 8 },
        react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s", style: { height: 170 } },
            react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_2.default.createElement("h5", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.snapshot.statusOverTimeTitle", defaultMessage: "Status over time" }))),
            react_2.default.createElement(eui_2.EuiSpacer, { size: "s" }),
            data.snapshot.histogram && (react_2.default.createElement(snapshot_histogram_1.SnapshotHistogram, { dangerColor: danger, histogram: data.snapshot.histogram, successColor: success })),
            !data.snapshot.histogram && (react_2.default.createElement(eui_1.EuiEmptyPrompt, { title: react_2.default.createElement(eui_1.EuiTitle, null,
                    react_2.default.createElement("h5", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.snapshot.noDataTitle", defaultMessage: "No histogram data available" }))), body: react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.snapshot.noDataDescription", defaultMessage: "Sorry, there is no data available for the histogram" })) })))))) : (react_2.default.createElement(snapshot_loading_1.SnapshotLoading, null));
exports.Snapshot = higher_order_1.withUptimeGraphQL(exports.SnapshotComponent, queries_1.snapshotQuery);
