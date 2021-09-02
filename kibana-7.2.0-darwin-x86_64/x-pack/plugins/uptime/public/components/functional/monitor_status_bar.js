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
const react_1 = require("@kbn/i18n/react");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importDefault(require("react"));
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
const empty_status_bar_1 = require("./empty_status_bar");
const helper_1 = require("../../lib/helper");
exports.MonitorStatusBarComponent = ({ data, monitorId }) => {
    if (data && data.monitorStatus && data.monitorStatus.length) {
        const { monitor, observer, timestamp } = data.monitorStatus[0];
        const duration = lodash_1.get(monitor, 'duration.us', undefined);
        const status = lodash_1.get(monitor, 'status', 'down');
        const full = lodash_1.get(data.monitorStatus[0], 'url.full');
        const location = lodash_1.get(observer, 'geo.name');
        return (react_2.default.createElement(eui_1.EuiPanel, null,
            react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "l" },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiHealth, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessageAriaLabel', {
                            defaultMessage: 'Monitor status',
                        }), color: status === 'up' ? 'success' : 'danger', style: { lineHeight: 'inherit' } }, status === 'up'
                        ? i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessage.upLabel', {
                            defaultMessage: 'Up',
                        })
                        : i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessage.downLabel', {
                            defaultMessage: 'Down',
                        }))),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiLink, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.monitorUrlLinkAriaLabel', {
                                defaultMessage: 'Monitor URL link',
                            }), href: full, target: "_blank" }, full))),
                !!duration && (react_2.default.createElement(eui_1.EuiFlexItem, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.durationTextAriaLabel', {
                        defaultMessage: 'Monitor duration in milliseconds',
                    }), grow: false },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.monitorStatusBar.healthStatus.durationInMillisecondsMessage", values: { duration: helper_1.convertMicrosecondsToMilliseconds(duration) }, defaultMessage: "{duration}ms", description: "The 'ms' is an abbreviation for 'milliseconds'." }))),
                react_2.default.createElement(eui_1.EuiFlexItem, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.timestampFromNowTextAriaLabel', {
                        defaultMessage: 'Time since last check',
                    }), grow: false }, moment_1.default(new Date(timestamp).valueOf()).fromNow()),
                !!location && (react_2.default.createElement(eui_1.EuiFlexItem, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.locationName', {
                        defaultMessage: 'Location',
                    }), grow: false }, location)))));
    }
    return (react_2.default.createElement(empty_status_bar_1.EmptyStatusBar, { message: i18n_1.i18n.translate('xpack.uptime.monitorStatusBar.loadingMessage', {
            defaultMessage: 'Loading…',
        }), monitorId: monitorId }));
};
exports.MonitorStatusBar = higher_order_1.withUptimeGraphQL(exports.MonitorStatusBarComponent, queries_1.monitorStatusBarQuery);
