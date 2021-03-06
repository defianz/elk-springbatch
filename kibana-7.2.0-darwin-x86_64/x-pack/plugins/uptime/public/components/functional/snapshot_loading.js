"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore missing typings for EuiStat
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
exports.SnapshotLoading = () => (react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
    react_2.default.createElement(eui_1.EuiFlexItem, { grow: 4 },
        react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s", style: { height: 170 } },
            react_2.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_2.default.createElement("h5", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.snapshot.endpointStatusLoadingTitle", defaultMessage: "Current status" })))),
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "xl" },
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.upDescription', {
                                    defaultMessage: 'Up',
                                }), textAlign: "center", title: "-", titleColor: "secondary" })),
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.downDescription', {
                                    defaultMessage: 'Down',
                                }), textAlign: "center", title: "-", titleColor: "danger" })),
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiStat, { description: i18n_1.i18n.translate('xpack.uptime.snapshot.stats.totalDescription', {
                                    defaultMessage: 'Total',
                                }), textAlign: "center", title: "-", titleColor: "subdued" })))))))));
