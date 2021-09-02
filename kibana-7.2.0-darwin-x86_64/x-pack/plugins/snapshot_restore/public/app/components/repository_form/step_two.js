"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const constants_1 = require("../../../../common/constants");
const index_1 = require("../../index");
const documentation_1 = require("../../services/documentation");
const type_settings_1 = require("./type_settings");
const text_1 = require("../../services/text");
exports.RepositoryFormStepTwo = ({ repository, isManagedRepository, isEditing, isSaving, onSave, updateRepository, validation, saveError, onBack, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const hasValidationErrors = !validation.isValid;
    const { name, type, settings: { delegateType }, } = repository;
    const typeForDocs = type === constants_1.REPOSITORY_TYPES.source ? delegateType : type;
    const renderSettings = () => (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "spaceBetween" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                    react_1.default.createElement("h2", null,
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.settingsTitle", defaultMessage: "{repositoryName} settings", values: {
                                repositoryName: `'${name}'`,
                            } })))),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "s", flush: "right", href: documentation_1.documentationLinksService.getRepositoryTypeDocUrl(typeForDocs), target: "_blank", iconType: "help" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.repositoryTypeDocLink", defaultMessage: "{repositoryType} repository docs", values: {
                            repositoryType: text_1.textService.getRepositoryTypeName(typeForDocs),
                        } })))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
        react_1.default.createElement(type_settings_1.TypeSettings, { repository: repository, updateRepository: updateRepository, settingErrors: hasValidationErrors && validation.errors.settings ? validation.errors.settings : {} })));
    const renderActions = () => {
        const saveLabel = isEditing ? (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.saveButtonLabel", defaultMessage: "Save" })) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.registerButtonLabel", defaultMessage: "Register" }));
        const savingLabel = (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.savingButtonLabel", defaultMessage: "Saving\u2026" }));
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "m", alignItems: "center" },
            isEditing ? null : (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { color: "primary", iconType: "arrowLeft", onClick: onBack, "data-test-subj": "srRepositoryFormSubmitButton" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.backButtonLabel", defaultMessage: "Back" })))),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiButton, { color: isManagedRepository ? 'warning' : 'secondary', iconType: "check", onClick: onSave, fill: isManagedRepository ? false : true, "data-test-subj": "srRepositoryFormSubmitButton", isLoading: isSaving }, isSaving ? savingLabel : saveLabel))));
    };
    const renderFormValidationError = () => {
        if (!hasValidationErrors) {
            return null;
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiCallOut, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.validationErrorTitle", defaultMessage: "Fix errors before continuing." }), color: "danger", iconType: "cross", "data-test-subj": "repositoryFormError" }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" })));
    };
    const renderSaveError = () => {
        if (!saveError) {
            return null;
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            saveError,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" })));
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        renderSettings(),
        renderFormValidationError(),
        renderSaveError(),
        renderActions()));
};
