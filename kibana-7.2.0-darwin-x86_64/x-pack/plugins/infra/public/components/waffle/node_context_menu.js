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
const react_2 = tslib_1.__importDefault(require("react"));
const react_3 = require("ui/capabilities/react");
const types_1 = require("../../graphql/types");
const link_to_1 = require("../../pages/link_to");
const create_uptime_link_1 = require("./lib/create_uptime_link");
exports.NodeContextMenu = react_3.injectUICapabilities(react_1.injectI18n(({ options, timeRange, children, node, isPopoverOpen, closePopover, nodeType, intl, uiCapabilities, popoverPosition, }) => {
    // Due to the changing nature of the fields between APM and this UI,
    // We need to have some exceptions until 7.0 & ECS is finalized. Reference
    // #26620 for the details for these fields.
    // TODO: This is tech debt, remove it after 7.0 & ECS migration.
    const APM_FIELDS = {
        [types_1.InfraNodeType.host]: 'host.hostname',
        [types_1.InfraNodeType.container]: 'container.id',
        [types_1.InfraNodeType.pod]: 'kubernetes.pod.uid',
    };
    const nodeLogsMenuItem = {
        name: intl.formatMessage({
            id: 'xpack.infra.nodeContextMenu.viewLogsName',
            defaultMessage: 'View logs',
        }),
        href: link_to_1.getNodeLogsUrl({
            nodeType,
            nodeId: node.id,
            time: timeRange.to,
        }),
        'data-test-subj': 'viewLogsContextMenuItem',
    };
    const nodeDetailMenuItem = {
        name: intl.formatMessage({
            id: 'xpack.infra.nodeContextMenu.viewMetricsName',
            defaultMessage: 'View metrics',
        }),
        href: link_to_1.getNodeDetailUrl({
            nodeType,
            nodeId: node.id,
            from: timeRange.from,
            to: timeRange.to,
        }),
    };
    const apmTracesMenuItem = {
        name: intl.formatMessage({
            id: 'xpack.infra.nodeContextMenu.viewAPMTraces',
            defaultMessage: 'View {nodeType} APM traces',
        }, { nodeType }),
        href: `../app/apm#/traces?_g=()&kuery=${APM_FIELDS[nodeType]}~20~3A~20~22${node.id}~22`,
        'data-test-subj': 'viewApmTracesContextMenuItem',
    };
    const uptimeMenuItem = {
        name: intl.formatMessage({
            id: 'xpack.infra.nodeContextMenu.viewUptimeLink',
            defaultMessage: 'View {nodeType} in Uptime',
        }, { nodeType }),
        href: create_uptime_link_1.createUptimeLink(options, nodeType, node),
    };
    const showLogsLink = node.id && uiCapabilities.logs.show;
    const showAPMTraceLink = uiCapabilities.apm && uiCapabilities.apm.show;
    const showUptimeLink = [types_1.InfraNodeType.pod, types_1.InfraNodeType.container].includes(nodeType) || node.ip;
    const panels = [
        {
            id: 0,
            title: '',
            items: [
                ...(showLogsLink ? [nodeLogsMenuItem] : []),
                nodeDetailMenuItem,
                ...(showAPMTraceLink ? [apmTracesMenuItem] : []),
                ...(showUptimeLink ? [uptimeMenuItem] : []),
            ],
        },
    ];
    return (react_2.default.createElement(eui_1.EuiPopover, { closePopover: closePopover, id: `${node.pathId}-popover`, isOpen: isPopoverOpen, button: children, panelPaddingSize: "none", anchorPosition: popoverPosition },
        react_2.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: panels, "data-test-subj": "nodeContextMenu" })));
}));
