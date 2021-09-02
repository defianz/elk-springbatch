"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importStar(require("react"));
const helper_1 = require("../../lib/helper");
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
exports.PingListComponent = ({ data, loading, onSelectedStatusUpdate, onUpdateApp, selectedOption, }) => {
    const statusOptions = [
        {
            label: i18n_1.i18n.translate('xpack.uptime.pingList.statusOptions.allStatusOptionLabel', {
                defaultMessage: 'All',
            }),
            value: '',
        },
        {
            label: i18n_1.i18n.translate('xpack.uptime.pingList.statusOptions.upStatusOptionLabel', {
                defaultMessage: 'Up',
            }),
            value: 'up',
        },
        {
            label: i18n_1.i18n.translate('xpack.uptime.pingList.statusOptions.downStatusOptionLabel', {
                defaultMessage: 'Down',
            }),
            value: 'down',
        },
    ];
    const columns = [
        {
            field: 'monitor.status',
            name: i18n_1.i18n.translate('xpack.uptime.pingList.statusColumnLabel', {
                defaultMessage: 'Status',
            }),
            render: (pingStatus, item) => (react_2.default.createElement("div", null,
                react_2.default.createElement(eui_1.EuiHealth, { color: pingStatus === 'up' ? 'success' : 'danger' }, pingStatus === 'up'
                    ? i18n_1.i18n.translate('xpack.uptime.pingList.statusColumnHealthUpLabel', {
                        defaultMessage: 'Up',
                    })
                    : i18n_1.i18n.translate('xpack.uptime.pingList.statusColumnHealthDownLabel', {
                        defaultMessage: 'Down',
                    })),
                react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, i18n_1.i18n.translate('xpack.uptime.pingList.recencyMessage', {
                    values: { fromNow: moment_1.default(item.timestamp).fromNow() },
                    defaultMessage: 'Checked {fromNow}',
                    description: 'A string used to inform our users how long ago Heartbeat pinged the selected host.',
                })))),
        },
        {
            field: 'monitor.ip',
            dataType: 'number',
            name: i18n_1.i18n.translate('xpack.uptime.pingList.ipAddressColumnLabel', {
                defaultMessage: 'IP',
            }),
        },
        {
            field: 'monitor.duration.us',
            name: i18n_1.i18n.translate('xpack.uptime.pingList.durationMsColumnLabel', {
                defaultMessage: 'Duration',
            }),
            render: (duration) => helper_1.convertMicrosecondsToMilliseconds(duration),
        },
        {
            field: 'error.type',
            name: i18n_1.i18n.translate('xpack.uptime.pingList.errorTypeColumnLabel', {
                defaultMessage: 'Error type',
            }),
        },
        {
            field: 'error.message',
            name: i18n_1.i18n.translate('xpack.uptime.pingList.errorMessageColumnLabel', {
                defaultMessage: 'Error message',
            }),
            render: (message) => message && message.length > 25 ? (react_2.default.createElement(eui_1.EuiToolTip, { position: "top", title: i18n_1.i18n.translate('xpack.uptime.pingList.columns.errorMessageTooltipTitle', {
                    defaultMessage: 'Error message',
                }), content: react_2.default.createElement("p", null, message) },
                react_2.default.createElement("code", null,
                    message.slice(0, 24),
                    "\u2026"))) : (react_2.default.createElement(eui_1.EuiText, { size: "s" },
                react_2.default.createElement("code", null, message))),
        },
    ];
    react_2.useEffect(() => {
        onUpdateApp();
    }, [selectedOption]);
    let pings = [];
    let total = 0;
    if (data && data.allPings && data.allPings.pings) {
        pings = data.allPings.pings;
        total = data.allPings.total;
        const hasStatus = pings.reduce((hasHttpStatus, currentPing) => hasHttpStatus || !!lodash_1.get(currentPing, 'http.response.status_code'), false);
        if (hasStatus) {
            columns.push({
                field: 'http.response.status_code',
                // @ts-ignore "align" property missing on type definition for column type
                align: 'right',
                name: i18n_1.i18n.translate('xpack.uptime.pingList.responseCodeColumnLabel', {
                    defaultMessage: 'Response code',
                }),
                render: (statusCode) => react_2.default.createElement(eui_1.EuiBadge, null, statusCode),
            });
        }
    }
    return (react_2.default.createElement(react_2.Fragment, null,
        react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
            react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiFlexGroup, { responsive: false, gutterSize: "s", alignItems: "center" },
                        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                                react_2.default.createElement("h4", null,
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.pingList.checkHistoryTitle", defaultMessage: "History" })))),
                        !!total && (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_2.default.createElement(eui_1.EuiBadge, { color: "hollow" }, total))))),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiFlexGroup, null,
                        react_2.default.createElement(eui_1.EuiFlexItem, { style: { minWidth: 200 } },
                            react_2.default.createElement(eui_1.EuiComboBox, { isClearable: false, singleSelection: { asPlainText: true }, selectedOptions: [
                                    statusOptions.find(({ value }) => value === selectedOption) || statusOptions[2],
                                ], options: statusOptions, "aria-label": i18n_1.i18n.translate('xpack.uptime.pingList.statusLabel', {
                                    defaultMessage: 'Status',
                                }), onChange: (selectedOptions) => {
                                    if (typeof selectedOptions[0].value === 'string') {
                                        onSelectedStatusUpdate(
                                        // @ts-ignore it's definitely a string
                                        selectedOptions[0].value !== '' ? selectedOptions[0].value : null);
                                    }
                                } }))))),
            react_2.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_2.default.createElement(eui_1.EuiInMemoryTable, { loading: loading, columns: columns, items: pings, pagination: { initialPageSize: 20, pageSizeOptions: [5, 10, 20, 100] } }))));
};
exports.PingList = higher_order_1.withUptimeGraphQL(exports.PingListComponent, queries_1.pingsQuery);
