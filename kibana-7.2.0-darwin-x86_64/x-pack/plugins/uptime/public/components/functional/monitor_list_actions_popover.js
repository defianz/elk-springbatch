"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const integration_group_1 = require("./integration_group");
const contexts_1 = require("../../contexts");
exports.MonitorListActionsPopover = ({ monitor }) => {
    const popoverId = `${monitor.id.key}_popover`;
    const [popoverIsVisible, setPopoverIsVisible] = react_1.useState(false);
    const { basePath, dateRangeStart, dateRangeEnd, isApmAvailable, isInfraAvailable, isLogsAvailable, } = react_1.useContext(contexts_1.UptimeSettingsContext);
    return (react_1.default.createElement(eui_1.EuiPopover, { button: react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.uptime.monitorList.observabilityIntegrationsColumn.popoverIconButton.ariaLabel', {
                defaultMessage: 'Opens integrations popover for monitor with url {monitorUrl}',
                description: 'A message explaining that this button opens a popover with links to other apps for a given monitor',
                values: { monitorUrl: monitor.id.url },
            }), color: "subdued", iconType: "boxesHorizontal", onClick: () => setPopoverIsVisible(true) }), closePopover: () => setPopoverIsVisible(false), id: popoverId, isOpen: popoverIsVisible },
        react_1.default.createElement(integration_group_1.IntegrationGroup, { basePath: basePath, dateRangeStart: dateRangeStart, dateRangeEnd: dateRangeEnd, isApmAvailable: isApmAvailable, isInfraAvailable: isInfraAvailable, isLogsAvailable: isLogsAvailable, monitor: monitor })));
};
