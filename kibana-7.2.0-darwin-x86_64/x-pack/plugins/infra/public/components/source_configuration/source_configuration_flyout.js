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
const source_1 = require("../../containers/source");
const fields_configuration_panel_1 = require("./fields_configuration_panel");
const indices_configuration_panel_1 = require("./indices_configuration_panel");
const name_configuration_panel_1 = require("./name_configuration_panel");
const log_columns_configuration_panel_1 = require("./log_columns_configuration_panel");
const source_configuration_flyout_state_1 = require("./source_configuration_flyout_state");
const source_configuration_form_state_1 = require("./source_configuration_form_state");
const noop = () => undefined;
exports.SourceConfigurationFlyout = react_1.injectI18n(({ intl, shouldAllowEdit }) => {
    const { activeTabId, hide, isVisible, setActiveTab } = react_2.useContext(source_configuration_flyout_state_1.SourceConfigurationFlyoutState.Context);
    const { createSourceConfiguration, source, sourceExists, isLoading, updateSourceConfiguration, } = react_2.useContext(source_1.Source.Context);
    const availableFields = react_2.useMemo(() => (source && source.status ? source.status.indexFields.map(field => field.name) : []), [source]);
    const { addLogColumn, indicesConfigurationProps, logColumnConfigurationProps, errors, resetForm, isFormDirty, isFormValid, formState, formStateChanges, } = source_configuration_form_state_1.useSourceConfigurationFormState(source && source.configuration);
    const persistUpdates = react_2.useCallback(async () => {
        if (sourceExists) {
            await updateSourceConfiguration(formStateChanges);
        }
        else {
            await createSourceConfiguration(formState);
        }
        resetForm();
    }, [
        sourceExists,
        updateSourceConfiguration,
        createSourceConfiguration,
        resetForm,
        formState,
        formStateChanges,
    ]);
    const isWriteable = react_2.useMemo(() => shouldAllowEdit && source && source.origin !== 'internal', [
        shouldAllowEdit,
        source,
    ]);
    const tabs = react_2.useMemo(() => isVisible
        ? [
            {
                id: 'indicesAndFieldsTab',
                name: intl.formatMessage({
                    id: 'xpack.infra.sourceConfiguration.sourceConfigurationIndicesTabTitle',
                    defaultMessage: 'Indices and fields',
                }),
                content: (react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(eui_1.EuiSpacer, null),
                    react_2.default.createElement(name_configuration_panel_1.NameConfigurationPanel, { isLoading: isLoading, nameFieldProps: indicesConfigurationProps.name, readOnly: !isWriteable }),
                    react_2.default.createElement(eui_1.EuiSpacer, null),
                    react_2.default.createElement(indices_configuration_panel_1.IndicesConfigurationPanel, { isLoading: isLoading, logAliasFieldProps: indicesConfigurationProps.logAlias, metricAliasFieldProps: indicesConfigurationProps.metricAlias, readOnly: !isWriteable }),
                    react_2.default.createElement(eui_1.EuiSpacer, null),
                    react_2.default.createElement(fields_configuration_panel_1.FieldsConfigurationPanel, { containerFieldProps: indicesConfigurationProps.containerField, hostFieldProps: indicesConfigurationProps.hostField, isLoading: isLoading, podFieldProps: indicesConfigurationProps.podField, readOnly: !isWriteable, tiebreakerFieldProps: indicesConfigurationProps.tiebreakerField, timestampFieldProps: indicesConfigurationProps.timestampField }))),
            },
            {
                id: 'logsTab',
                name: intl.formatMessage({
                    id: 'xpack.infra.sourceConfiguration.sourceConfigurationLogColumnsTabTitle',
                    defaultMessage: 'Log Columns',
                }),
                content: (react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(eui_1.EuiSpacer, null),
                    react_2.default.createElement(log_columns_configuration_panel_1.LogColumnsConfigurationPanel, { addLogColumn: addLogColumn, availableFields: availableFields, isLoading: isLoading, logColumnConfiguration: logColumnConfigurationProps }))),
            },
        ]
        : [], [
        addLogColumn,
        availableFields,
        indicesConfigurationProps,
        intl.formatMessage,
        isLoading,
        isVisible,
        logColumnConfigurationProps,
        isWriteable,
    ]);
    const activeTab = react_2.useMemo(() => tabs.filter(tab => tab.id === activeTabId)[0] || tabs[0], [
        activeTabId,
        tabs,
    ]);
    const activateTab = react_2.useCallback((tab) => {
        const tabId = tab.id;
        if (source_configuration_flyout_state_1.isValidTabId(tabId)) {
            setActiveTab(tabId);
        }
    }, [setActiveTab, source_configuration_flyout_state_1.isValidTabId]);
    if (!isVisible || !source || !source.configuration) {
        return null;
    }
    return (react_2.default.createElement(eui_1.EuiFlyout, { "aria-labelledby": "sourceConfigurationTitle", "data-test-subj": "sourceConfigurationFlyout", hideCloseButton: true, onClose: noop },
        react_2.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
            react_2.default.createElement(eui_1.EuiTitle, null,
                react_2.default.createElement("h2", { id: "sourceConfigurationTitle" }, isWriteable ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.sourceConfigurationTitle", defaultMessage: "Configure source" })) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.sourceConfigurationReadonlyTitle", defaultMessage: "View source configuration" }))))),
        react_2.default.createElement(eui_1.EuiFlyoutBody, null,
            react_2.default.createElement(eui_1.EuiTabbedContent, { onTabClick: activateTab, selectedTab: activeTab, tabs: tabs })),
        react_2.default.createElement(eui_1.EuiFlyoutFooter, null,
            errors.length > 0 ? (react_2.default.createElement(react_2.default.Fragment, null,
                react_2.default.createElement(eui_1.EuiCallOut, { color: "danger" },
                    react_2.default.createElement("ul", null, errors.map((error, errorIndex) => (react_2.default.createElement("li", { key: errorIndex }, error))))),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }))) : null,
            react_2.default.createElement(eui_1.EuiFlexGroup, null,
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, !isFormDirty ? (react_2.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "closeFlyoutButton", iconType: "cross", isDisabled: isLoading, onClick: () => hide() },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.closeButtonLabel", defaultMessage: "Close" }))) : (react_2.default.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "discardAndCloseFlyoutButton", color: "danger", iconType: "cross", isDisabled: isLoading, onClick: () => {
                        resetForm();
                        hide();
                    } },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.discardAndCloseButtonLabel", defaultMessage: "Discard and Close" })))),
                react_2.default.createElement(eui_1.EuiFlexItem, null),
                isWriteable && (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false }, isLoading ? (react_2.default.createElement(eui_1.EuiButton, { color: "primary", isLoading: true, fill: true }, "Loading")) : (react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "updateSourceConfigurationButton", color: "primary", isDisabled: !isFormDirty || !isFormValid, fill: true, onClick: persistUpdates },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.updateSourceConfigurationButtonLabel", defaultMessage: "Update Source" })))))))));
});
