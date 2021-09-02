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
exports.EmptyIndex = ({ basePath }) => (react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "center" },
    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_2.default.createElement(eui_1.EuiSpacer, { size: "xs" }),
        react_2.default.createElement(eui_1.EuiPanel, null,
            react_2.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "uptimeApp", title: react_2.default.createElement(eui_1.EuiTitle, { size: "l" },
                    react_2.default.createElement("h3", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.emptyState.noDataTitle", defaultMessage: "No uptime data available" }))), body: react_2.default.createElement(react_2.Fragment, null,
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.emptyState.configureHeartbeatToGetStartedMessage", defaultMessage: "{configureHeartbeatLink} to start collecting uptime data.", values: {
                                configureHeartbeatLink: (react_2.default.createElement(eui_1.EuiLink, { target: "_blank", href: `${basePath}/app/kibana#/home/tutorial/uptimeMonitors` },
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.emptyState.configureHeartbeatLinkText", defaultMessage: "Configure Heartbeat" }))),
                            } }))) })))));
