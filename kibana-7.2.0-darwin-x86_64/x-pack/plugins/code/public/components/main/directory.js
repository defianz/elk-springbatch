"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const model_1 = require("../../../model");
const types_1 = require("../../common/types");
const url_1 = require("../../utils/url");
const DirectoryNodes = (props) => {
    const typeIconMap = {
        [model_1.FileTreeItemType.File]: 'document',
        [model_1.FileTreeItemType.Directory]: 'folderClosed',
        [model_1.FileTreeItemType.Link]: 'symlink',
        [model_1.FileTreeItemType.Submodule]: 'submodule',
    };
    const nodes = props.nodes.map(n => (react_1.default.createElement(eui_1.EuiFlexItem, { key: n.path, grow: false },
        react_1.default.createElement(react_router_dom_1.Link, { className: "code-link", to: props.getUrl(n.path), "data-test-subj": `codeFileExplorerNode-${n.name}` },
            react_1.default.createElement("div", { className: "code-directory__node" },
                react_1.default.createElement(eui_1.EuiIcon, { type: typeIconMap[n.type], color: "subdued" }),
                react_1.default.createElement(eui_1.EuiText, { size: "xs", className: "code-fileNodeName eui-textTruncate" }, n.name))))));
    return (react_1.default.createElement(eui_1.EuiFlexItem, { className: "codeContainer__directoryList" },
        react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                    react_1.default.createElement("h3", null, props.title))),
            react_1.default.createElement(eui_1.EuiFlexGroup, { wrap: true, direction: "row", gutterSize: "none", justifyContent: "flexStart" }, nodes))));
};
exports.Directory = react_router_dom_1.withRouter((props) => {
    let files = [];
    let folders = [];
    if (props.node && props.node.children) {
        files = props.node.children.filter(n => n.type === model_1.FileTreeItemType.File || n.type === model_1.FileTreeItemType.Link);
        folders = props.node.children.filter(n => n.type === model_1.FileTreeItemType.Directory || n.type === model_1.FileTreeItemType.Submodule);
    }
    const { resource, org, repo, revision } = props.match.params;
    const getUrl = (pathType) => (path) => `/${resource}/${org}/${repo}/${pathType}/${url_1.encodeRevisionString(revision)}/${path}`;
    const fileList = react_1.default.createElement(DirectoryNodes, { nodes: files, title: "Files", getUrl: getUrl(types_1.PathTypes.blob) });
    const folderList = (react_1.default.createElement(DirectoryNodes, { nodes: folders, title: "Directories", getUrl: getUrl(types_1.PathTypes.tree) }));
    const children = props.loading ? (react_1.default.createElement("div", null,
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
        react_1.default.createElement(eui_1.EuiText, { textAlign: "center" }, "Loading..."),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
        react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
            react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "xl" })))) : (react_1.default.createElement(react_1.default.Fragment, null,
        files.length > 0 && fileList,
        folders.length > 0 && folderList));
    return react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column" }, children);
});
