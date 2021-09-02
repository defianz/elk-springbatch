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
exports.RepositoryAdd = ({ history }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const section = 'repositories';
    const [isSaving, setIsSaving] = react_1.useState(false);
    const [saveError, setSaveError] = react_1.useState(null);
    // Set breadcrumb
    react_1.useEffect(() => {
        navigation_1.breadcrumbService.setBreadcrumbs('repositoryAdd');
    }, []);
    const onSave = async (newRepository) => {
        setIsSaving(true);
        setSaveError(null);
        const { name } = newRepository;
        const { error } = await http_1.addRepository(newRepository);
        setIsSaving(false);
        if (error) {
            setSaveError(error);
        }
        else {
            history.push(`${constants_1.BASE_PATH}/${section}/${name}`);
        }
    };
    const emptyRepository = {
        name: '',
        type: null,
        settings: {},
    };
    const renderSaveError = () => {
        return saveError ? (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.addRepository.savingRepositoryErrorTitle", defaultMessage: "Cannot register new repository" }), error: saveError })) : null;
    };
    const clearSaveError = () => {
        setSaveError(null);
    };
    return (react_1.default.createElement(eui_1.EuiPageBody, null,
        react_1.default.createElement(eui_1.EuiPageContent, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_1.default.createElement("h1", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.addRepositoryTitle", defaultMessage: "Register repository" }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(components_1.RepositoryForm, { repository: emptyRepository, isSaving: isSaving, saveError: renderSaveError(), clearSaveError: clearSaveError, onSave: onSave }))));
};
