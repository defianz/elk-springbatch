"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const url_1 = tslib_1.__importDefault(require("url"));
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const elastic_idx_1 = require("@kbn/elastic-idx");
const lodash_1 = require("lodash");
const DiscoverTransactionLink_1 = require("../Links/DiscoverLinks/DiscoverTransactionLink");
const InfraLink_1 = require("../Links/InfraLink");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const url_helpers_1 = require("../Links/url_helpers");
function getInfraMetricsQuery(transaction) {
    const plus5 = new Date(transaction['@timestamp']);
    const minus5 = new Date(plus5.getTime());
    plus5.setMinutes(plus5.getMinutes() + 5);
    minus5.setMinutes(minus5.getMinutes() - 5);
    return {
        from: minus5.getTime(),
        to: plus5.getTime()
    };
}
function ActionMenuButton({ onClick }) {
    return (react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "arrowDown", iconSide: "right", onClick: onClick }, i18n_1.i18n.translate('xpack.apm.transactionActionMenu.actionsButtonLabel', {
        defaultMessage: 'Actions'
    })));
}
exports.TransactionActionMenu = (props) => {
    const { transaction } = props;
    const [isOpen, setIsOpen] = react_1.useState(false);
    const { urlParams } = useUrlParams_1.useUrlParams();
    const hostName = elastic_idx_1.idx(transaction, _ => _.host.hostname);
    const podId = elastic_idx_1.idx(transaction, _ => _.kubernetes.pod.uid);
    const containerId = elastic_idx_1.idx(transaction, _ => _.container.id);
    const time = Math.round(transaction.timestamp.us / 1000);
    const infraMetricsQuery = getInfraMetricsQuery(transaction);
    const infraItems = [
        {
            icon: 'loggingApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showPodLogsLinkLabel', { defaultMessage: 'Show pod logs' }),
            condition: podId,
            path: `/link-to/pod-logs/${podId}`,
            query: { time }
        },
        {
            icon: 'loggingApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showContainerLogsLinkLabel', { defaultMessage: 'Show container logs' }),
            condition: containerId,
            path: `/link-to/container-logs/${containerId}`,
            query: { time }
        },
        {
            icon: 'loggingApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showHostLogsLinkLabel', { defaultMessage: 'Show host logs' }),
            condition: hostName,
            path: `/link-to/host-logs/${hostName}`,
            query: { time }
        },
        {
            icon: 'loggingApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showTraceLogsLinkLabel', { defaultMessage: 'Show trace logs' }),
            condition: true,
            hash: `/link-to/logs`,
            query: { time, filter: `trace.id:${transaction.trace.id}` }
        },
        {
            icon: 'infraApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showPodMetricsLinkLabel', { defaultMessage: 'Show pod metrics' }),
            condition: podId,
            path: `/link-to/pod-detail/${podId}`,
            query: infraMetricsQuery
        },
        {
            icon: 'infraApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showContainerMetricsLinkLabel', { defaultMessage: 'Show container metrics' }),
            condition: containerId,
            path: `/link-to/container-detail/${containerId}`,
            query: infraMetricsQuery
        },
        {
            icon: 'infraApp',
            label: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.showHostMetricsLinkLabel', { defaultMessage: 'Show host metrics' }),
            condition: hostName,
            path: `/link-to/host-detail/${hostName}`,
            query: infraMetricsQuery
        }
    ].map(({ icon, label, condition, path, query }, index) => ({
        icon,
        key: `infra-link-${index}`,
        child: (react_1.default.createElement(InfraLink_1.InfraLink, { path: path, query: query }, label)),
        condition
    }));
    const uptimeLink = url_1.default.format({
        pathname: chrome_1.default.addBasePath('/app/uptime'),
        hash: `/?${url_helpers_1.fromQuery(lodash_1.pick({
            dateRangeStart: urlParams.rangeFrom,
            dateRangeEnd: urlParams.rangeTo,
            search: `url.domain:${elastic_idx_1.idx(transaction, t => t.url.domain)}`
        }, (val) => !!val))}`
    });
    const menuItems = [
        ...infraItems,
        {
            icon: 'discoverApp',
            key: 'discover-transaction',
            condition: true,
            child: (react_1.default.createElement(DiscoverTransactionLink_1.DiscoverTransactionLink, { transaction: transaction }, i18n_1.i18n.translate('xpack.apm.transactionActionMenu.viewSampleDocumentLinkLabel', {
                defaultMessage: 'View sample document'
            })))
        },
        {
            icon: 'uptimeApp',
            key: 'uptime',
            child: (react_1.default.createElement(eui_1.EuiLink, { href: uptimeLink }, i18n_1.i18n.translate('xpack.apm.transactionActionMenu.viewInUptime', {
                defaultMessage: 'View monitor status'
            }))),
            condition: elastic_idx_1.idx(transaction, _ => _.url.domain)
        }
    ]
        .filter(({ condition }) => condition)
        .map(({ icon, key, child, condition }) => condition ? (react_1.default.createElement(eui_1.EuiContextMenuItem, { icon: icon, key: key },
        react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
            react_1.default.createElement(eui_1.EuiFlexItem, null, child),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiIcon, { type: "popout" }))))) : null);
    return (react_1.default.createElement(eui_1.EuiPopover, { id: "transactionActionMenu", button: react_1.default.createElement(ActionMenuButton, { onClick: () => setIsOpen(!isOpen) }), isOpen: isOpen, closePopover: () => setIsOpen(false), anchorPosition: "downRight", panelPaddingSize: "none" },
        react_1.default.createElement(eui_1.EuiContextMenuPanel, { items: menuItems, title: i18n_1.i18n.translate('xpack.apm.transactionActionMenu.actionsLabel', {
                defaultMessage: 'Actions'
            }) })));
};
