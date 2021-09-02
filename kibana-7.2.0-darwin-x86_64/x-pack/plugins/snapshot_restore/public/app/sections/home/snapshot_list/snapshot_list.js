"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const querystring_1 = require("querystring");
const eui_1 = require("@elastic/eui");
const components_1 = require("../../../components");
const constants_1 = require("../../../constants");
const index_1 = require("../../../index");
const documentation_1 = require("../../../services/documentation");
const http_1 = require("../../../services/http");
const navigation_1 = require("../../../services/navigation");
const ui_metric_1 = require("../../../services/ui_metric");
const snapshot_details_1 = require("./snapshot_details");
const snapshot_table_1 = require("./snapshot_table");
exports.SnapshotList = ({ match: { params: { repositoryName, snapshotId }, }, location: { search }, history, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const { error, loading, data: { snapshots = [], repositories = [], errors = {} }, request: reload, } = http_1.loadSnapshots();
    const openSnapshotDetailsUrl = (repositoryNameToOpen, snapshotIdToOpen) => {
        return history.createHref({
            pathname: `${constants_1.BASE_PATH}/snapshots/${encodeURIComponent(repositoryNameToOpen)}/${encodeURIComponent(snapshotIdToOpen)}`,
        });
    };
    const closeSnapshotDetails = () => {
        history.push(`${constants_1.BASE_PATH}/snapshots`);
    };
    // Allow deeplinking to list pre-filtered by repository name
    const [filteredRepository, setFilteredRepository] = react_1.useState(undefined);
    react_1.useEffect(() => {
        if (search) {
            const parsedParams = querystring_1.parse(search.replace(/^\?/, ''));
            if (parsedParams.repository && parsedParams.repository !== filteredRepository) {
                setFilteredRepository(String(parsedParams.repository));
                history.replace(`${constants_1.BASE_PATH}/snapshots`);
            }
        }
    }, []);
    // Track component loaded
    const { trackUiMetric } = ui_metric_1.uiMetricService;
    react_1.useEffect(() => {
        trackUiMetric(constants_1.UIM_SNAPSHOT_LIST_LOAD);
    }, []);
    let content;
    if (loading) {
        content = (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.loadingSnapshotsDescription", defaultMessage: "Loading snapshots\u2026" })));
    }
    else if (error) {
        content = (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.loadingSnapshotsErrorMessage", defaultMessage: "Error loading snapshots" }), error: error }));
    }
    else if (Object.keys(errors).length && repositories.length === 0) {
        content = (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "managementApp", title: react_1.default.createElement("h1", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.errorRepositoriesTitle", defaultMessage: "Some repositories contain errors" })), body: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.repositoryWarningDescription", defaultMessage: "Go to {repositoryLink} to fix the errors.", values: {
                            repositoryLink: (react_1.default.createElement(eui_1.EuiLink, { href: navigation_1.linkToRepositories() },
                                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryWarningLinkText", defaultMessage: "Repositories" }))),
                        } })),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(eui_1.EuiLink, { href: documentation_1.documentationLinksService.getSnapshotDocUrl(), target: "_blank", "data-test-subj": "srSnapshotsEmptyPromptDocLink" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.emptyPrompt.noSnapshotsDocLinkText", defaultMessage: "Learn how to create a snapshot" }),
                        ' ',
                        react_1.default.createElement(eui_1.EuiIcon, { type: "link" })))) }));
    }
    else if (repositories.length === 0) {
        content = (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "managementApp", title: react_1.default.createElement("h1", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesTitle", defaultMessage: "You don't have any snapshots or repositories yet" })), body: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesDescription", defaultMessage: "Start by registering a repository for your snapshots." })),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(eui_1.EuiButton, { href: history.createHref({
                            pathname: `${constants_1.BASE_PATH}/add_repository`,
                        }), fill: true, iconType: "plusInCircle", "data-test-subj": "srSnapshotsEmptyPromptAddRepositoryButton" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noRepositoriesAddButtonLabel", defaultMessage: "Register a repository" })))) }));
    }
    else if (snapshots.length === 0) {
        content = (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "managementApp", title: react_1.default.createElement("h1", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noSnapshotsTitle", defaultMessage: "You don't have any snapshots yet" })), body: react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotList.emptyPrompt.noSnapshotsDescription", defaultMessage: "Create a snapshot using the Elasticsearch API." })),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(eui_1.EuiLink, { href: documentation_1.documentationLinksService.getSnapshotDocUrl(), target: "_blank", "data-test-subj": "srSnapshotsEmptyPromptDocLink" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.emptyPrompt.noSnapshotsDocLinkText", defaultMessage: "Learn how to create a snapshot" }),
                        ' ',
                        react_1.default.createElement(eui_1.EuiIcon, { type: "link" })))) }));
    }
    else {
        const repositoryErrorsWarning = Object.keys(errors).length ? (react_1.default.createElement(eui_1.EuiCallOut, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryWarningTitle", defaultMessage: "Some repositories contain errors" }), color: "warning", iconType: "alert" },
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryWarningDescription", defaultMessage: "Snapshots might load slowly. Go to {repositoryLink} to fix the errors.", values: {
                    repositoryLink: (react_1.default.createElement(eui_1.EuiLink, { href: navigation_1.linkToRepositories() },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryWarningLinkText", defaultMessage: "Repositories" }))),
                } }))) : null;
        content = (react_1.default.createElement(react_1.Fragment, null,
            repositoryErrorsWarning,
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(snapshot_table_1.SnapshotTable, { snapshots: snapshots, repositories: repositories, reload: reload, openSnapshotDetailsUrl: openSnapshotDetailsUrl, repositoryFilter: filteredRepository })));
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        repositoryName && snapshotId ? (react_1.default.createElement(snapshot_details_1.SnapshotDetails, { repositoryName: repositoryName, snapshotId: snapshotId, onClose: closeSnapshotDetails })) : null,
        content));
};
