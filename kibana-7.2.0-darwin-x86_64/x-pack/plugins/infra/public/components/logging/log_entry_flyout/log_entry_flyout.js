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
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const loading_1 = require("../../loading");
const log_entry_actions_menu_1 = require("./log_entry_actions_menu");
exports.LogEntryFlyout = react_1.injectI18n(({ flyoutItem, loading, setFlyoutVisibility, setFilter, setTarget, intl }) => {
    const createFilterHandler = react_2.useCallback((field) => () => {
        const filter = `${field.field}:"${field.value}"`;
        setFilter(filter);
        if (flyoutItem && flyoutItem.key) {
            const timestampMoment = moment_1.default(flyoutItem.key.time);
            if (timestampMoment.isValid()) {
                setTarget({
                    time: timestampMoment.valueOf(),
                    tiebreaker: flyoutItem.key.tiebreaker,
                }, flyoutItem.id);
            }
        }
    }, [flyoutItem, setFilter, setTarget]);
    const closeFlyout = react_2.useCallback(() => setFlyoutVisibility(false), [setFlyoutVisibility]);
    const columns = react_2.useMemo(() => [
        {
            field: 'field',
            name: intl.formatMessage({
                defaultMessage: 'Field',
                id: 'xpack.infra.logFlyout.fieldColumnLabel',
            }),
            sortable: true,
        },
        {
            field: 'value',
            name: intl.formatMessage({
                defaultMessage: 'Value',
                id: 'xpack.infra.logFlyout.valueColumnLabel',
            }),
            sortable: true,
            render: (_name, item) => (react_2.default.createElement("span", null,
                react_2.default.createElement(eui_1.EuiToolTip, { content: intl.formatMessage({
                        id: 'xpack.infra.logFlyout.setFilterTooltip',
                        defaultMessage: 'View event with filter',
                    }) },
                    react_2.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "filter", "aria-label": intl.formatMessage({
                            id: 'xpack.infra.logFlyout.filterAriaLabel',
                            defaultMessage: 'Filter',
                        }), onClick: createFilterHandler(item) })),
                item.value)),
        },
    ], [createFilterHandler, intl.formatMessage]);
    return (react_2.default.createElement(eui_1.EuiFlyout, { onClose: closeFlyout, size: "m" },
        react_2.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
            react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiTitle, { size: "s" },
                        react_2.default.createElement("h3", { id: "flyoutTitle" },
                            react_2.default.createElement(react_1.FormattedMessage, { defaultMessage: "Log event document details", id: "xpack.infra.logFlyout.flyoutTitle" })))),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, flyoutItem !== null ? react_2.default.createElement(log_entry_actions_menu_1.LogEntryActionsMenu, { logItem: flyoutItem }) : null))),
        react_2.default.createElement(eui_1.EuiFlyoutBody, null, loading || flyoutItem === null ? (react_2.default.createElement(exports.InfraFlyoutLoadingPanel, null,
            react_2.default.createElement(loading_1.InfraLoadingPanel, { height: "100%", width: "100%", text: intl.formatMessage({
                    id: 'xpack.infra.logFlyout.loadingMessage',
                    defaultMessage: 'Loading Event',
                }) }))) : (react_2.default.createElement(eui_1.EuiBasicTable, { columns: columns, items: flyoutItem.fields })))));
});
exports.InfraFlyoutLoadingPanel = eui_styled_components_1.default.div `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
