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
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importDefault(require("react"));
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
const monitor_page_link_1 = require("./monitor_page_link");
exports.ErrorListComponent = ({ data, linkParameters, loading }) => (react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
    react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
        react_2.default.createElement("h5", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.errorList.title", defaultMessage: "Errors" }))),
    react_2.default.createElement(eui_1.EuiInMemoryTable, { loading: loading, items: (data && data.errorList) || undefined, columns: [
            {
                field: 'count',
                width: '200px',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.CountColumnLabel', {
                    defaultMessage: 'Frequency',
                }),
                render: (count, item) => (react_2.default.createElement("div", null,
                    react_2.default.createElement(eui_1.EuiText, { size: "s" },
                        react_2.default.createElement(eui_1.EuiTextColor, { color: "danger" }, count),
                        " errors"),
                    react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" },
                        "Latest was ",
                        moment_1.default(item.timestamp).fromNow()))),
            },
            {
                field: 'type',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.errorTypeColumnLabel', {
                    defaultMessage: 'Error type',
                }),
            },
            {
                field: 'monitorId',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.monitorIdColumnLabel', {
                    defaultMessage: 'Monitor ID',
                }),
                render: (id, { name, location }) => (react_2.default.createElement(monitor_page_link_1.MonitorPageLink, { id: id, location: location || undefined, linkParameters: linkParameters }, name || id)),
                width: '12.5%',
            },
            {
                field: 'location',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.location', {
                    defaultMessage: 'Location',
                    description: "The heading of a column that displays the location of a Heartbeat instance's host machine.",
                }),
                width: '12.5%',
            },
            {
                field: 'statusCode',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.statusCodeColumnLabel', {
                    defaultMessage: 'Status code',
                }),
                render: (statusCode) => (statusCode ? react_2.default.createElement(eui_1.EuiBadge, null, statusCode) : null),
            },
            {
                field: 'latestMessage',
                name: i18n_1.i18n.translate('xpack.uptime.errorList.latestMessageColumnLabel', {
                    defaultMessage: 'Latest message',
                }),
                width: '40%',
                render: (message) => (react_2.default.createElement("div", null, 
                // TODO: remove this ignore when prop is defined on type
                // @ts-ignore size is not currently defined on the type for EuiCodeBlock
                react_2.default.createElement(eui_1.EuiCodeBlock, { transparentBackground: true, size: "xs", paddingSize: "none" }, message))),
            },
        ], pagination: { initialPageSize: 10, pageSizeOptions: [5, 10, 20, 50] } })));
exports.ErrorList = higher_order_1.withUptimeGraphQL(exports.ErrorListComponent, queries_1.errorListQuery);
