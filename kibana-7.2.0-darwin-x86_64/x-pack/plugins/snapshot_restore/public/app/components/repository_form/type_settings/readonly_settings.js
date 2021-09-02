"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const index_1 = require("../../../index");
exports.ReadonlySettings = ({ repository, updateRepositorySettings, settingErrors, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { settings: { url }, } = repository;
    const hasErrors = Boolean(Object.keys(settingErrors).length);
    function getSchemeHelpText(scheme) {
        switch (scheme) {
            case 'http':
            case 'https':
            case 'ftp':
                return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlWhitelistDescription", defaultMessage: "This URL must be registered in the {settingKey} setting.", values: {
                        settingKey: react_1.default.createElement(eui_1.EuiCode, null, "repositories.url.allowed_urls"),
                    } }));
            case 'file':
                return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlFilePathDescription", defaultMessage: "This file location must be registered in the {settingKey} setting.", values: {
                        settingKey: react_1.default.createElement(eui_1.EuiCode, null, "path.repo"),
                    } }));
            default:
                return null;
        }
    }
    const schemeOptions = [
        {
            value: 'http',
            text: 'http://',
        },
        {
            value: 'https',
            text: 'https://',
        },
        {
            value: 'ftp',
            text: 'ftp://',
        },
        {
            value: 'file',
            text: 'file://',
        },
    ];
    const [selectedScheme, selectScheme] = react_1.useState(url ? url.split('://')[0] : 'http');
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlTitle", defaultMessage: "URL" }))), description: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlDescription", defaultMessage: "The location of the snapshots." })), idAria: "readonlyRepositoryUrlDescription", fullWidth: true },
            react_1.default.createElement("div", null,
                react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlSchemeLabel", defaultMessage: "Scheme" }), fullWidth: true, describedByIds: ['readonlyRepositoryUrlDescription'] },
                            react_1.default.createElement(eui_1.EuiSelect, { options: schemeOptions, value: selectedScheme, onChange: e => selectScheme(e.target.value), "aria-controls": "readonlyRepositoryUrlHelp" }))),
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.typeReadonly.urlLabel", defaultMessage: "Path (required)" }), fullWidth: true, describedByIds: ['readonlyRepositoryUrlDescription readonlyRepositoryUrlHelp'], isInvalid: Boolean(hasErrors && settingErrors.url), error: settingErrors.url },
                            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: url ? url.split('://')[1] : '', fullWidth: true, onChange: e => {
                                    updateRepositorySettings({
                                        url: `${selectedScheme}://${e.target.value}`,
                                    });
                                } })))),
                react_1.default.createElement(eui_1.EuiFormHelpText, { id: "readonlyRepositoryUrlHelp", "aria-live": "polite" }, getSchemeHelpText(selectedScheme))))));
};
