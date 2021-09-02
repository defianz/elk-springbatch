"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eui_1 = require("@elastic/eui");
const constants_1 = require("../../constants");
const index_1 = require("../../index");
const navigation_1 = require("../../services/navigation");
const repository_list_1 = require("./repository_list");
const snapshot_list_1 = require("./snapshot_list");
const documentation_1 = require("../../services/documentation");
exports.SnapshotRestoreHome = ({ match: { params: { section }, }, history, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    const tabs = [
        {
            id: 'snapshots',
            name: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.home.snapshotsTabTitle", defaultMessage: "Snapshots" })),
            testSubj: 'srSnapshotsTab',
        },
        {
            id: 'repositories',
            name: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.home.repositoriesTabTitle", defaultMessage: "Repositories" })),
            testSubj: 'srRepositoriesTab',
        },
    ];
    const onSectionChange = (newSection) => {
        history.push(`${constants_1.BASE_PATH}/${newSection}`);
    };
    // Set breadcrumb
    react_1.useEffect(() => {
        navigation_1.breadcrumbService.setBreadcrumbs('home');
    }, []);
    return (react_1.default.createElement(eui_1.EuiPageBody, null,
        react_1.default.createElement(eui_1.EuiPageContent, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: true },
                        react_1.default.createElement("h1", null,
                            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.home.snapshotRestoreTitle", defaultMessage: "Snapshot Repositories" }))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButtonEmpty, { href: documentation_1.documentationLinksService.getRepositoryTypeDocUrl(), target: "_blank", iconType: "help" },
                            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.home.snapshotRestoreDocsLinkText", defaultMessage: "Snapshot docs" }))))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement(eui_1.EuiText, { color: "subdued" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.home.snapshotRestoreDescription", defaultMessage: "Use repositories to store backups of your Elasticsearch indices and clusters." }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiTabs, null, tabs.map(tab => (react_1.default.createElement(eui_1.EuiTab, { onClick: () => onSectionChange(tab.id), isSelected: tab.id === section, key: tab.id, "data-test-subject": tab.testSubj }, tab.name)))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/repositories/:repositoryName*`, component: repository_list_1.RepositoryList }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/snapshots`, component: snapshot_list_1.SnapshotList }),
                react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/snapshots/:repositoryName*/:snapshotId`, component: snapshot_list_1.SnapshotList })))));
};
