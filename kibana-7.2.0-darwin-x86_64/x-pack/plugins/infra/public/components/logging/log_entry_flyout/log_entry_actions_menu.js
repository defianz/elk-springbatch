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
const url_1 = tslib_1.__importDefault(require("url"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const UPTIME_FIELDS = ['container.id', 'host.ip', 'kubernetes.pod.uid'];
exports.LogEntryActionsMenu = ({ logItem }) => {
    const { hide, isVisible, show } = useVisibility();
    const uptimeLink = react_2.useMemo(() => getUptimeLink(logItem), [logItem]);
    const menuItems = react_2.useMemo(() => [
        react_2.default.createElement(eui_1.EuiContextMenuItem, { "data-test-subj": "logEntryActionsMenuItem uptimeLogEntryActionsMenuItem", disabled: !uptimeLink, href: uptimeLink, icon: "uptimeApp", key: "uptimeLink" },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.logEntryActionsMenu.uptimeActionLabel", defaultMessage: "View monitor status" })),
    ], [uptimeLink]);
    const hasMenuItems = react_2.useMemo(() => menuItems.length > 0, [menuItems]);
    return (react_2.default.createElement(eui_1.EuiPopover, { anchorPosition: "downRight", button: react_2.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "logEntryActionsMenuButton", disabled: !hasMenuItems, iconSide: "right", iconType: "arrowDown", onClick: show },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.logEntryActionsMenu.buttonLabel", defaultMessage: "Actions" })), closePopover: hide, id: "logEntryActionsMenu", isOpen: isVisible, panelPaddingSize: "none" },
        react_2.default.createElement(eui_1.EuiContextMenuPanel, { items: menuItems })));
};
const useVisibility = (initialVisibility = false) => {
    const [isVisible, setIsVisible] = react_2.useState(initialVisibility);
    const hide = react_2.useCallback(() => setIsVisible(false), [setIsVisible]);
    const show = react_2.useCallback(() => setIsVisible(true), [setIsVisible]);
    return { hide, isVisible, show };
};
const getUptimeLink = (logItem) => {
    const searchExpressions = logItem.fields
        .filter(({ field, value }) => value != null && UPTIME_FIELDS.includes(field))
        .map(({ field, value }) => `${field}:${value}`);
    if (searchExpressions.length === 0) {
        return undefined;
    }
    return url_1.default.format({
        pathname: chrome_1.default.addBasePath('/app/uptime'),
        hash: `/?search=(${searchExpressions.join(' OR ')})`,
    });
};
