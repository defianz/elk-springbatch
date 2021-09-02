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
const add_log_column_popover_1 = require("./add_log_column_popover");
exports.LogColumnsConfigurationPanel = ({ addLogColumn, availableFields, isLoading, logColumnConfiguration }) => (react_2.default.createElement(eui_1.EuiForm, null,
    react_2.default.createElement(eui_1.EuiFlexGroup, null,
        react_2.default.createElement(eui_1.EuiFlexItem, null,
            react_2.default.createElement(eui_1.EuiTitle, { size: "s", "data-test-subj": "sourceConfigurationLogColumnsSectionTitle" },
                react_2.default.createElement("h3", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.logColumnsSectionTitle", defaultMessage: "Columns" })))),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_2.default.createElement(add_log_column_popover_1.AddLogColumnButtonAndPopover, { addLogColumn: addLogColumn, availableFields: availableFields, isDisabled: isLoading }))),
    logColumnConfiguration.length > 0 ? (logColumnConfiguration.map((column, index) => (react_2.default.createElement(LogColumnConfigurationPanel, { logColumnConfigurationProps: column, key: `logColumnConfigurationPanel-${index}` })))) : (react_2.default.createElement(LogColumnConfigurationEmptyPrompt, null))));
const LogColumnConfigurationPanel = ({ logColumnConfigurationProps, }) => (react_2.default.createElement(react_2.default.Fragment, null,
    react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
    logColumnConfigurationProps.type === 'timestamp' ? (react_2.default.createElement(TimestampLogColumnConfigurationPanel, { logColumnConfigurationProps: logColumnConfigurationProps })) : logColumnConfigurationProps.type === 'message' ? (react_2.default.createElement(MessageLogColumnConfigurationPanel, { logColumnConfigurationProps: logColumnConfigurationProps })) : (react_2.default.createElement(FieldLogColumnConfigurationPanel, { logColumnConfigurationProps: logColumnConfigurationProps }))));
const TimestampLogColumnConfigurationPanel = ({ logColumnConfigurationProps }) => (react_2.default.createElement(ExplainedLogColumnConfigurationPanel, { fieldName: "Timestamp", helpText: react_2.default.createElement(react_1.FormattedMessage, { tagName: "span", id: "xpack.infra.sourceConfiguration.timestampLogColumnDescription", defaultMessage: "This system field shows the log entry's time as determined by the {timestampSetting} field setting.", values: {
            timestampSetting: react_2.default.createElement("code", null, "timestamp"),
        } }), removeColumn: logColumnConfigurationProps.remove }));
const MessageLogColumnConfigurationPanel = ({ logColumnConfigurationProps }) => (react_2.default.createElement(ExplainedLogColumnConfigurationPanel, { fieldName: "Message", helpText: react_2.default.createElement(react_1.FormattedMessage, { tagName: "span", id: "xpack.infra.sourceConfiguration.messageLogColumnDescription", defaultMessage: "This system field shows the log entry message as derived from the document fields." }), removeColumn: logColumnConfigurationProps.remove }));
const FieldLogColumnConfigurationPanel = ({ logColumnConfigurationProps: { logColumnConfiguration: { field }, remove, }, }) => (react_2.default.createElement(eui_1.EuiPanel, { "data-test-subj": `logColumnPanel fieldLogColumnPanel fieldLogColumnPanel:${field}` },
    react_2.default.createElement(eui_1.EuiFlexGroup, null,
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: 1 },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.fieldLogColumnTitle", defaultMessage: "Field" })),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: 3 },
            react_2.default.createElement("code", null, field)),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_2.default.createElement(RemoveLogColumnButton, { onClick: remove })))));
const ExplainedLogColumnConfigurationPanel = ({ fieldName, helpText, removeColumn }) => (react_2.default.createElement(eui_1.EuiPanel, { "data-test-subj": `logColumnPanel systemLogColumnPanel systemLogColumnPanel:${fieldName}` },
    react_2.default.createElement(eui_1.EuiFlexGroup, null,
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: 1 }, fieldName),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: 3 },
            react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" }, helpText)),
        react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_2.default.createElement(RemoveLogColumnButton, { onClick: removeColumn })))));
const RemoveLogColumnButton = react_1.injectI18n(({ intl, onClick }) => {
    const removeColumnLabel = intl.formatMessage({
        id: 'xpack.infra.sourceConfiguration.removeLogColumnButtonLabel',
        defaultMessage: 'Remove this column',
    });
    return (react_2.default.createElement(eui_1.EuiButtonIcon, { "aria-label": removeColumnLabel, color: "danger", "data-test-subj": "removeLogColumnButton", iconType: "trash", onClick: onClick, title: removeColumnLabel }));
});
const LogColumnConfigurationEmptyPrompt = () => (react_2.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "list", title: react_2.default.createElement("h2", null,
        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.noLogColumnsTitle", defaultMessage: "No columns" })), body: react_2.default.createElement("p", null,
        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.noLogColumnsDescription", defaultMessage: "Add a column to this list using the button above." })) }));
