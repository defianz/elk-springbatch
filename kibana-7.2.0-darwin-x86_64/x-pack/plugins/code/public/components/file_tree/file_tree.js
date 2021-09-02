"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const model_1 = require("../../../model");
const actions_1 = require("../../actions");
const types_1 = require("../../common/types");
const url_1 = require("../../utils/url");
class CodeFileTree extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.onClick = (node) => {
            const { resource, org, repo, revision, path } = this.props.match.params;
            if (!(path === node.path)) {
                let pathType;
                if (node.type === model_1.FileTreeItemType.Link || node.type === model_1.FileTreeItemType.File) {
                    pathType = types_1.PathTypes.blob;
                }
                else {
                    pathType = types_1.PathTypes.tree;
                }
                this.props.history.push(`/${resource}/${org}/${repo}/${pathType}/${url_1.encodeRevisionString(revision)}/${node.path}`);
            }
        };
        this.toggleTree = (path) => {
            if (this.isPathOpen(path)) {
                this.props.closeTreePath(path);
            }
            else {
                this.props.openTreePath(path);
            }
        };
        this.flattenDirectory = (node) => {
            if (node.childrenCount === 1 && node.children[0].type === model_1.FileTreeItemType.Directory) {
                return [node, ...this.flattenDirectory(node.children[0])];
            }
            else {
                return [node];
            }
        };
        this.getItemRenderer = (node, forceOpen, flattenFrom) => () => {
            const className = 'codeFileTree__item kbn-resetFocusState';
            let bg = null;
            if (this.props.match.params.path === node.path) {
                bg = react_1.default.createElement("div", { ref: el => this.scrollIntoView(el), className: "codeFileTree__node--fullWidth" });
            }
            const onClick = () => {
                const path = flattenFrom ? flattenFrom.path : node.path;
                this.toggleTree(path);
                this.onClick(node);
            };
            switch (node.type) {
                case model_1.FileTreeItemType.Directory: {
                    return (react_1.default.createElement("div", { className: "codeFileTree__node" },
                        react_1.default.createElement("div", { "data-test-subj": `codeFileTreeNode-Directory-${node.path}`, className: className, role: "button", tabIndex: 0, onKeyDown: onClick, onClick: onClick },
                            forceOpen ? (react_1.default.createElement(eui_1.EuiIcon, { type: "arrowDown", size: "s", className: "codeFileTree__icon" })) : (react_1.default.createElement(eui_1.EuiIcon, { type: "arrowRight", size: "s", className: "codeFileTree__icon" })),
                            react_1.default.createElement(eui_1.EuiIcon, { type: forceOpen ? 'folderOpen' : 'folderClosed', "data-test-subj": `codeFileTreeNode-Directory-Icon-${node.path}-${forceOpen ? 'open' : 'closed'}` }),
                            react_1.default.createElement("span", { className: "codeFileTree__directory" },
                                react_1.default.createElement(eui_1.EuiText, { size: "xs", grow: false, className: "eui-displayInlineBlock" }, node.name))),
                        bg));
                }
                case model_1.FileTreeItemType.Submodule: {
                    return (react_1.default.createElement("div", { className: "codeFileTree__node" },
                        react_1.default.createElement("div", { "data-test-subj": `codeFileTreeNode-Submodule-${node.path}`, tabIndex: 0, onKeyDown: onClick, onClick: onClick, className: classnames_1.default(className, 'codeFileTree__file'), role: "button" },
                            react_1.default.createElement(eui_1.EuiIcon, { type: "submodule" }),
                            react_1.default.createElement("span", { className: "codeFileTree__directory" },
                                react_1.default.createElement(eui_1.EuiText, { size: "xs", grow: false, color: "default", className: "eui-displayInlineBlock" }, node.name))),
                        bg));
                }
                case model_1.FileTreeItemType.Link: {
                    return (react_1.default.createElement("div", { className: "codeFileTree__node" },
                        react_1.default.createElement("div", { "data-test-subj": `codeFileTreeNode-Link-${node.path}`, tabIndex: 0, onKeyDown: onClick, onClick: onClick, className: classnames_1.default(className, 'codeFileTree__file'), role: "button" },
                            react_1.default.createElement(eui_1.EuiIcon, { type: "symlink" }),
                            react_1.default.createElement("span", { className: "codeFileTree__directory" },
                                react_1.default.createElement(eui_1.EuiText, { size: "xs", grow: false, color: "default", className: "eui-displayInlineBlock" }, node.name))),
                        bg));
                }
                case model_1.FileTreeItemType.File: {
                    return (react_1.default.createElement("div", { className: "codeFileTree__node" },
                        react_1.default.createElement("div", { "data-test-subj": `codeFileTreeNode-File-${node.path}`, tabIndex: 0, onKeyDown: onClick, onClick: onClick, className: classnames_1.default(className, 'codeFileTree__file'), role: "button" },
                            react_1.default.createElement(eui_1.EuiIcon, { type: "document" }),
                            react_1.default.createElement("span", { className: "codeFileTree__directory" },
                                react_1.default.createElement(eui_1.EuiText, { size: "xs", grow: false, color: "default", className: "eui-displayInlineBlock" }, node.name))),
                        bg));
                }
            }
        };
        this.treeToItems = (node) => {
            const forceOpen = node.type === model_1.FileTreeItemType.Directory ? this.isPathOpen(node.path) : false;
            const data = {
                id: node.name,
                name: node.name,
                isSelected: false,
                renderItem: this.getItemRenderer(node, forceOpen),
                forceOpen,
                onClick: () => void 0,
            };
            if (node.type === model_1.FileTreeItemType.Directory && Number(node.childrenCount) > 0) {
                const nodes = this.flattenDirectory(node);
                const length = nodes.length;
                if (length > 1 && !(this.props.match.params.path === node.path)) {
                    data.name = nodes.map(n => n.name).join('/');
                    data.id = data.name;
                    const lastNode = nodes[length - 1];
                    const flattenNode = {
                        ...lastNode,
                        name: data.name,
                        id: data.id,
                    };
                    data.forceOpen = this.isPathOpen(node.path);
                    data.renderItem = this.getItemRenderer(flattenNode, data.forceOpen, node);
                    if (data.forceOpen && Number(flattenNode.childrenCount) > 0) {
                        data.items = flattenNode.children.map(this.treeToItems);
                    }
                }
                else if (forceOpen && node.children) {
                    data.items = node.children.map(this.treeToItems);
                }
            }
            return data;
        };
    }
    componentDidMount() {
        const { path } = this.props.match.params;
        if (path) {
            this.props.openTreePath(path);
        }
    }
    scrollIntoView(el) {
        if (el) {
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
            if (!isVisible) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }
    }
    render() {
        const items = [
            {
                name: '',
                id: '',
                items: (this.props.node.children || []).map(this.treeToItems),
            },
        ];
        return (this.props.node && (react_1.default.createElement(eui_1.EuiSideNav, { items: items, isOpenOnMobile: true, className: "codeContainer__sideTabTree" })));
    }
    isPathOpen(path) {
        return this.props.openedPaths.includes(path);
    }
}
exports.CodeFileTree = CodeFileTree;
const mapStateToProps = (state) => ({
    node: state.file.tree,
    openedPaths: state.file.openedPaths,
});
const mapDispatchToProps = {
    closeTreePath: actions_1.closeTreePath,
    openTreePath: actions_1.openTreePath,
};
exports.FileTree = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CodeFileTree));
