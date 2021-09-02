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
const monitor_sparkline_1 = require("./monitor_sparkline");
const monitor_list_actions_popover_1 = require("./monitor_list_actions_popover");
const monitor_page_link_1 = require("./monitor_page_link");
const MONITOR_LIST_DEFAULT_PAGINATION = 10;
const monitorListPagination = {
    initialPageSize: MONITOR_LIST_DEFAULT_PAGINATION,
    pageSizeOptions: [5, 10, 20, 50],
};
exports.MonitorListComponent = ({ basePath, dangerColor, dateRangeStart, dateRangeEnd, data, linkParameters, loading, }) => {
    return (react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
        react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_2.default.createElement("h5", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.monitorList.monitoringStatusTitle", defaultMessage: "Monitor status" }))),
        react_2.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_2.default.createElement(eui_1.EuiInMemoryTable, { columns: [
                {
                    field: 'ping.monitor.status',
                    width: '150px',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.statusColumnLabel', {
                        defaultMessage: 'Status',
                    }),
                    render: (status, monitor) => (react_2.default.createElement("div", null,
                        react_2.default.createElement(eui_1.EuiHealth, { color: status === 'up' ? 'success' : 'danger', style: { display: 'block' } }, status === 'up'
                            ? i18n_1.i18n.translate('xpack.uptime.monitorList.statusColumn.upLabel', {
                                defaultMessage: 'Up',
                            })
                            : i18n_1.i18n.translate('xpack.uptime.monitorList.statusColumn.downLabel', {
                                defaultMessage: 'Down',
                            })),
                        react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, moment_1.default(lodash_1.get(monitor, 'ping.monitor.timestamp', undefined)).fromNow()))),
                },
                {
                    field: 'ping.monitor.id',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.idColumnLabel', {
                        defaultMessage: 'ID',
                    }),
                    render: (id, monitor) => (react_2.default.createElement(monitor_page_link_1.MonitorPageLink, { id: id, location: lodash_1.get(monitor, 'ping.observer.geo.name'), linkParameters: linkParameters }, monitor.ping && monitor.ping.monitor && monitor.ping.monitor.name
                        ? monitor.ping.monitor.name
                        : id)),
                },
                {
                    field: 'ping.observer.geo.name',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.geoName', {
                        defaultMessage: 'Location',
                        description: 'Users can specify a name for a location',
                    }),
                    render: (locationName) => !!locationName ? (locationName) : (react_2.default.createElement(eui_1.EuiLink, { href: "https://www.elastic.co/guide/en/beats/heartbeat/current/configuration-observer-options.html", target: "_blank" },
                        i18n_1.i18n.translate('xpack.uptime.monitorList.geoName.helpLinkAnnotation', {
                            defaultMessage: 'Add location',
                            description: 'Text that instructs the user to navigate to our docs to add a geographic location to their data',
                        }),
                        "\u00A0",
                        react_2.default.createElement(eui_1.EuiIcon, { size: "s", type: "popout" }))),
                },
                {
                    field: 'ping.url.full',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.urlColumnLabel', {
                        defaultMessage: 'URL',
                    }),
                    render: (url, monitor) => (react_2.default.createElement("div", null,
                        react_2.default.createElement(eui_1.EuiLink, { href: url, target: "_blank", color: "text" },
                            url,
                            " ",
                            react_2.default.createElement(eui_1.EuiIcon, { size: "s", type: "popout", color: "subdued" })),
                        monitor.ping && monitor.ping.monitor && monitor.ping.monitor.ip ? (react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, monitor.ping.monitor.ip)) : null)),
                },
                {
                    field: 'upSeries',
                    width: '180px',
                    align: 'right',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.monitorHistoryColumnLabel', {
                        defaultMessage: 'Downtime history',
                    }),
                    render: (downSeries, monitor) => (react_2.default.createElement(monitor_sparkline_1.MonitorSparkline, { dangerColor: dangerColor, monitor: monitor })),
                },
                {
                    align: 'right',
                    field: 'ping',
                    name: i18n_1.i18n.translate('xpack.uptime.monitorList.observabilityIntegrationsColumnLabel', {
                        defaultMessage: 'Integrations',
                        description: 'The heading column of some action buttons that will take users to other Obsevability apps',
                    }),
                    render: (ping, monitor) => (react_2.default.createElement(monitor_list_actions_popover_1.MonitorListActionsPopover, { monitor: monitor })),
                },
            ], loading: loading, items: (data && data.monitorStatus && data.monitorStatus.monitors) || [], pagination: monitorListPagination })));
};
exports.MonitorList = higher_order_1.withUptimeGraphQL(exports.MonitorListComponent, queries_1.monitorListQuery);
