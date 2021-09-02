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
const components_1 = require("../../components");
const constants_1 = require("../../constants");
const index_1 = require("../../index");
const navigation_1 = require("../../services/navigation");
const http_1 = require("../../services/http");
exports.RepositoryEdit = ({ match: { params: { name }, }, history, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const section = 'repositories';
    // Set breadcrumb
    react_1.useEffect(() => {
        navigation_1.breadcrumbService.setBreadcrumbs('repositoryEdit');
    }, []);
    // Repository state with default empty repository
    const [repository, setRepository] = react_1.useState({
        name: '',
        type: null,
        settings: {},
    });
    // Load repository
    const { error: repositoryError, loading: loadingRepository, data: repositoryData, } = http_1.loadRepository(name);
    // Update repository state when data is loaded
    react_1.useEffect(() => {
        if (repositoryData && repositoryData.repository) {
            setRepository(repositoryData.repository);
        }
    }, [repositoryData]);
    // Saving repository states
    const [isSaving, setIsSaving] = react_1.useState(false);
    const [saveError, setSaveError] = react_1.useState(null);
    // Save repository
    const onSave = async (editedRepository) => {
        setIsSaving(true);
        setSaveError(null);
        const { error } = await http_1.editRepository(editedRepository);
        setIsSaving(false);
        if (error) {
            setSaveError(error);
        }
        else {
            history.push(`${constants_1.BASE_PATH}/${section}/${name}`);
        }
    };
    const renderLoading = () => {
        return (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.editRepository.loadingRepositoryDescription", defaultMessage: "Loading repository details\u2026" })));
    };
    const renderError = () => {
        const notFound = repositoryError.status === 404;
        const errorObject = notFound
            ? {
                data: {
                    error: i18n.translate('xpack.snapshotRestore.editRepository.repositoryNotFoundErrorMessage', {
                        defaultMessage: `The repository '{name}' does not exist.`,
                        values: {
                            name,
                        },
                    }),
                },
            }
            : repositoryError;
        return (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.editRepository.loadingRepositoryErrorTitle", defaultMessage: "Error loading repository details" }), error: errorObject }));
    };
    const renderSaveError = () => {
        return saveError ? (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.editRepository.savingRepositoryErrorTitle", defaultMessage: "Cannot save repository" }), error: saveError })) : null;
    };
    const clearSaveError = () => {
        setSaveError(null);
    };
    const renderContent = () => {
        if (loadingRepository) {
            return renderLoading();
        }
        if (repositoryError) {
            return renderError();
        }
        const { isManagedRepository } = repositoryData;
        return (react_1.default.createElement(react_1.Fragment, null,
            isManagedRepository ? (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiCallOut, { size: "m", color: "warning", iconType: "iInCircle", title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.editRepository.managedRepositoryWarningTitle", defaultMessage: "This is a managed repository. Changing this repository might affect other systems that use it. Proceed with caution." }) }),
                react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }))) : null,
            react_1.default.createElement(components_1.RepositoryForm, { repository: repository, isManagedRepository: isManagedRepository, isEditing: true, isSaving: isSaving, saveError: renderSaveError(), clearSaveError: clearSaveError, onSave: onSave })));
    };
    return (react_1.default.createElement(eui_1.EuiPageBody, null,
        react_1.default.createElement(eui_1.EuiPageContent, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_1.default.createElement("h1", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.editRepositoryTitle", defaultMessage: "Edit repository" }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            renderContent())));
};
