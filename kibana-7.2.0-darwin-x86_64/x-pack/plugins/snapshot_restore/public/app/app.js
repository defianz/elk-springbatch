"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eui_1 = require("@elastic/eui");
const components_1 = require("./components");
const constants_1 = require("./constants");
const sections_1 = require("./sections");
const http_1 = require("./services/http");
const index_1 = require("./index");
exports.App = () => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    // Load permissions
    const { error: permissionsError, loading: loadingPermissions, data: { hasPermission, missingClusterPrivileges } = {
        hasPermission: true,
        missingClusterPrivileges: [],
    }, } = http_1.loadPermissions();
    if (loadingPermissions) {
        return (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.app.checkingPermissionsDescription", defaultMessage: "Checking permissions\u2026" })));
    }
    if (permissionsError) {
        return (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.app.checkingPermissionsErrorMessage", defaultMessage: "Error checking permissions" }), error: permissionsError }));
    }
    if (!hasPermission) {
        return (react_1.default.createElement(eui_1.EuiPageContent, { horizontalPosition: "center" },
            react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "securityApp", title: react_1.default.createElement("h2", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.app.deniedPermissionTitle", defaultMessage: "You're missing cluster privileges" })), body: react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.app.deniedPermissionDescription", defaultMessage: "To use Snapshot Repositories, you must have {clusterPrivilegesCount,\n                  plural, one {this cluster privilege} other {these cluster privileges}}: {clusterPrivileges}.", values: {
                            clusterPrivileges: missingClusterPrivileges.join(', '),
                            clusterPrivilegesCount: missingClusterPrivileges.length,
                        } })) })));
    }
    const sections = ['repositories', 'snapshots'];
    const sectionsRegex = sections.join('|');
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/add_repository`, component: sections_1.RepositoryAdd }),
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/edit_repository/:name*`, component: sections_1.RepositoryEdit }),
            react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: `${constants_1.BASE_PATH}/:section(${sectionsRegex})/:repositoryName?/:snapshotId*`, component: sections_1.SnapshotRestoreHome }),
            react_1.default.createElement(react_router_dom_1.Redirect, { from: `${constants_1.BASE_PATH}`, to: `${constants_1.BASE_PATH}/${constants_1.DEFAULT_SECTION}` }))));
};
