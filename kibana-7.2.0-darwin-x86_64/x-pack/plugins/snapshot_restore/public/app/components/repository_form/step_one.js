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
const http_1 = require("../../services/http");
const text_1 = require("../../services/text");
const __1 = require("../");
exports.RepositoryFormStepOne = ({ repository, onNext, updateRepository, validation, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    // Load repository types
    const { error: repositoryTypesError, loading: repositoryTypesLoading, data: repositoryTypes = [], } = http_1.loadRepositoryTypes();
    const hasValidationErrors = !validation.isValid;
    const onTypeChange = (newType) => {
        if (repository.type === constants_1.REPOSITORY_TYPES.source) {
            updateRepository({
                settings: {
                    delegateType: newType,
                },
            });
        }
        else {
            updateRepository({
                type: newType,
                settings: {},
            });
        }
    };
    const pluginDocLink = (react_1.default.createElement(eui_1.EuiLink, { href: documentation_1.documentationLinksService.getRepositoryPluginDocUrl(), target: "_blank" },
        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.typePluginsDocLinkText", defaultMessage: "Learn more about plugins." })));
    const renderNameField = () => (react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.nameDescriptionTitle", defaultMessage: "Repository name" }))), description: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.nameDescription", defaultMessage: "A unique name for the repository." }), idAria: "repositoryNameDescription", fullWidth: true },
        react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.nameLabel", defaultMessage: "Name" }), describedByIds: ['repositoryNameDescription'], isInvalid: Boolean(hasValidationErrors && validation.errors.name), error: validation.errors.name, fullWidth: true },
            react_1.default.createElement(eui_1.EuiFieldText, { defaultValue: repository.name, fullWidth: true, onChange: e => {
                    updateRepository({
                        name: e.target.value,
                    });
                } }))));
    const renderTypeCard = (type, index) => {
        const isSelectedType = (repository.type === constants_1.REPOSITORY_TYPES.source
            ? repository.settings.delegateType
            : repository.type) === type;
        const displayName = text_1.textService.getRepositoryTypeName(type);
        return (react_1.default.createElement(eui_1.EuiFlexItem, { key: index },
            react_1.default.createElement(eui_1.EuiCard, { title: displayName, icon: react_1.default.createElement(__1.RepositoryTypeLogo, { type: type, size: "l" }), footer: react_1.default.createElement(eui_1.EuiButtonEmpty, { href: documentation_1.documentationLinksService.getRepositoryTypeDocUrl(type), target: "_blank", size: "xs", iconType: "iInCircle" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.typeDocsLinkText", defaultMessage: "Learn more" })), selectable: {
                    onClick: () => onTypeChange(type),
                    isSelected: isSelectedType,
                } })));
    };
    const renderTypes = () => {
        if (repositoryTypesError) {
            return (react_1.default.createElement(__1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.loadingRepositoryTypesErrorMessage", defaultMessage: "Error loading repository types" }), error: repositoryTypesError }));
        }
        if (repositoryTypesLoading) {
            return (react_1.default.createElement(__1.SectionLoading, null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.loadingRepositoryTypesDescription", defaultMessage: "Loading repository types\u2026" })));
        }
        if (!repositoryTypes.length) {
            return (react_1.default.createElement(eui_1.EuiCallOut, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.noRepositoryTypesErrorTitle", defaultMessage: "No repository types available" }), color: "warning", "data-test-subj": "noRepositoryTypesError" },
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.noRepositoryTypesErrorMessage", defaultMessage: "You can install plugins to enable different repository types. {docLink}", values: {
                        docLink: pluginDocLink,
                    } })));
        }
        return (react_1.default.createElement(eui_1.EuiFlexGrid, { columns: 4 }, repositoryTypes.map((type, index) => renderTypeCard(type, index))));
    };
    const renderTypeField = () => {
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.typeDescriptionTitle", defaultMessage: "Repository type" }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiText, { id: "repositoryTypeDescription", size: "s", color: "subdued" }, repositoryTypes.includes(constants_1.REPOSITORY_TYPES.fs) &&
                repositoryTypes.includes(constants_1.REPOSITORY_TYPES.url) ? (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.defaultTypeDescription", defaultMessage: "Elasticsearch supports file system and read-only URL repositories.\n                Additional types require plugins. {docLink}", values: {
                    docLink: pluginDocLink,
                } })) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.cloudTypeDescription", defaultMessage: "Elasticsearch provides core plugins for custom repositories. {docLink}", values: {
                    docLink: pluginDocLink,
                } }))),
            react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, describedByIds: ['repositoryTypeDescription'], fullWidth: true, isInvalid: Boolean(hasValidationErrors && validation.errors.type), error: validation.errors.type }, renderTypes()),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" })));
    };
    const renderSourceOnlyToggle = () => (react_1.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDescriptionTitle", defaultMessage: "Source-only snapshots" }))), description: react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDescription", defaultMessage: "Creates source-only snapshots that take up to 50% less space. {docLink}", values: {
                    docLink: (react_1.default.createElement(eui_1.EuiLink, { href: documentation_1.documentationLinksService.getRepositoryTypeDocUrl(constants_1.REPOSITORY_TYPES.source), target: "_blank" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyDocLinkText", defaultMessage: "Learn more about source-only repositories." }))),
                } })), idAria: "sourceOnlyDescription", fullWidth: true },
        react_1.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true, fullWidth: true, describedByIds: ['sourceOnlyDescription'] },
            react_1.default.createElement(eui_1.EuiSwitch, { label: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.fields.sourceOnlyLabel", defaultMessage: "Source-only snapshots" }), checked: repository.type === constants_1.REPOSITORY_TYPES.source, onChange: e => {
                    if (e.target.checked) {
                        updateRepository({
                            type: constants_1.REPOSITORY_TYPES.source,
                            settings: {
                                ...repository.settings,
                                delegateType: repository.type,
                            },
                        });
                    }
                    else {
                        const { settings: { delegateType, ...rest }, } = repository;
                        updateRepository({
                            type: delegateType || null,
                            settings: rest,
                        });
                    }
                } }))));
    const renderActions = () => (react_1.default.createElement(eui_1.EuiButton, { color: "primary", onClick: onNext, fill: true, iconType: "arrowRight", iconSide: "right", "data-test-subj": "srRepositoryFormNextButton" },
        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.nextButtonLabel", defaultMessage: "Next" })));
    const renderFormValidationError = () => {
        if (!hasValidationErrors) {
            return null;
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiCallOut, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryForm.validationErrorTitle", defaultMessage: "Fix errors before continuing." }), color: "danger", "data-test-subj": "repositoryFormError" }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" })));
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        renderNameField(),
        renderTypeField(),
        renderSourceOnlyToggle(),
        renderFormValidationError(),
        renderActions()));
};
