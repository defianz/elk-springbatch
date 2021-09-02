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
const components_1 = require("../../../components");
const constants_1 = require("../../../constants");
const index_1 = require("../../../index");
const http_1 = require("../../../services/http");
const ui_metric_1 = require("../../../services/ui_metric");
const repository_details_1 = require("./repository_details");
const repository_table_1 = require("./repository_table");
exports.RepositoryList = ({ match: { params: { repositoryName }, }, history, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { error, loading, data: { repositories, managedRepository } = {
        repositories: undefined,
        managedRepository: undefined,
    }, request: reload, } = http_1.loadRepositories();
    const openRepositoryDetailsUrl = (newRepositoryName) => {
        return history.createHref({
            pathname: `${constants_1.BASE_PATH}/repositories/${newRepositoryName}`,
        });
    };
    const closeRepositoryDetails = () => {
        history.push(`${constants_1.BASE_PATH}/repositories`);
    };
    const onRepositoryDeleted = (repositoriesDeleted) => {
        if (repositoryName && repositoriesDeleted.includes(repositoryName)) {
            closeRepositoryDetails();
        }
        if (repositoriesDeleted.length) {
            reload();
        }
    };
    // Track component loaded
    const { trackUiMetric } = ui_metric_1.uiMetricService;
    react_1.useEffect(() => {
        trackUiMetric(constants_1.UIM_REPOSITORY_LIST_LOAD);
    }, []);
    let content;
    if (loading) {
        content = (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.loadingRepositoriesDescription", defaultMessage: "Loading repositories\u2026" })));
    }
    else if (error) {
        content = (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.LoadingRepositoriesErrorMessage", defaultMessage: "Error loading repositories" }), error: error }));
    }
    else if (repositories && repositories.length === 0) {
        content = (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "managementApp", title: react_1.default.createElement("h1", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.emptyPromptTitle", defaultMessage: "You don't have any repositories yet" })), body: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryList.emptyPromptDescription", defaultMessage: "You need a repository to store your snapshots." }))), actions: react_1.default.createElement(eui_1.EuiButton, { href: history.createHref({
                    pathname: `${constants_1.BASE_PATH}/add_repository`,
                }), fill: true, iconType: "plusInCircle", "data-test-subj": "srRepositoriesEmptyPromptAddButton" },
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.addRepositoryButtonLabel", defaultMessage: "Register a repository" })) }));
    }
    else {
        content = (react_1.default.createElement(repository_table_1.RepositoryTable, { repositories: repositories || [], managedRepository: managedRepository, reload: reload, openRepositoryDetailsUrl: openRepositoryDetailsUrl, onRepositoryDeleted: onRepositoryDeleted }));
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        repositoryName ? (react_1.default.createElement(repository_details_1.RepositoryDetails, { repositoryName: repositoryName, onClose: closeRepositoryDetails, onRepositoryDeleted: onRepositoryDeleted })) : null,
        content));
};
