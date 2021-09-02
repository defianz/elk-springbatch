"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const model_1 = require("../../../model");
const actions_1 = require("../../actions");
const status_1 = require("../../reducers/status");
const stateColor = {
    [status_1.RepoState.CLONING]: 'secondary',
    [status_1.RepoState.DELETING]: 'accent',
    [status_1.RepoState.INDEXING]: 'primary',
};
class CodeProjectItem extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            showDeleteConfirmModal: false,
            showReindexConfirmModal: false,
        };
        this.openReindexModal = () => {
            this.setState({ showReindexConfirmModal: true });
        };
        this.closeReindexModal = () => {
            this.setState({ showReindexConfirmModal: false });
        };
        this.openDeleteModal = () => {
            this.setState({ showDeleteConfirmModal: true });
        };
        this.closeDeleteModal = () => {
            this.setState({ showDeleteConfirmModal: false });
        };
        this.confirmDelete = () => {
            if (this.props.deleteRepo) {
                this.props.deleteRepo(this.props.project.uri);
                this.closeDeleteModal();
            }
        };
        this.confirmReindex = () => {
            if (this.props.indexRepo) {
                this.props.indexRepo(this.props.project.uri);
                this.closeReindexModal();
            }
        };
        this.renderReindexConfirmModal = () => {
            return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
                react_1.default.createElement(eui_1.EuiConfirmModal, { title: "Reindex this repository?", onCancel: this.closeReindexModal, onConfirm: this.confirmReindex, cancelButtonText: "No, don't do it", confirmButtonText: "Yes, do it", defaultFocusedButton: eui_1.EUI_MODAL_CONFIRM_BUTTON })));
        };
        this.renderDeleteConfirmModal = () => {
            return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
                react_1.default.createElement(eui_1.EuiConfirmModal, { title: "Delete this repository?", onCancel: this.closeDeleteModal, onConfirm: this.confirmDelete, cancelButtonText: "No, don't do it", confirmButtonText: "Yes, do it", buttonColor: "danger", defaultFocusedButton: eui_1.EUI_MODAL_CONFIRM_BUTTON })));
        };
    }
    render() {
        const { project, showStatus, status, enableManagement } = this.props;
        const { name, org, uri, url } = project;
        const onClickSettings = () => this.props.openSettings && this.props.openSettings(uri, url);
        let footer = null;
        let disableRepoLink = false;
        let hasError = false;
        if (!status) {
            footer = react_1.default.createElement("div", { className: "codeFooter" }, "INIT...");
        }
        else if (status.state === status_1.RepoState.READY) {
            footer = (react_1.default.createElement("div", { className: "codeFooter", "data-test-subj": "repositoryIndexDone" },
                "LAST UPDATED: ",
                moment_1.default(status.timestamp).fromNow()));
        }
        else if (status.state === status_1.RepoState.DELETING) {
            footer = react_1.default.createElement("div", { className: "codeFooter" }, "DELETING...");
        }
        else if (status.state === status_1.RepoState.INDEXING) {
            footer = (react_1.default.createElement("div", { className: "codeFooter", "data-test-subj": "repositoryIndexOngoing" }, "INDEXING..."));
        }
        else if (status.state === status_1.RepoState.CLONING) {
            footer = react_1.default.createElement("div", { className: "codeFooter" }, "CLONING...");
        }
        else if (status.state === status_1.RepoState.DELETE_ERROR) {
            footer = react_1.default.createElement("div", { className: "codeFooter codeFooter--error" }, "ERROR DELETE REPO");
            hasError = true;
        }
        else if (status.state === status_1.RepoState.INDEX_ERROR) {
            footer = react_1.default.createElement("div", { className: "codeFooter codeFooter--error" }, "ERROR INDEX REPO");
            hasError = true;
        }
        else if (status.state === status_1.RepoState.CLONE_ERROR) {
            footer = (react_1.default.createElement("div", { className: "codeFooter codeFooter--error" },
                "ERROR CLONING REPO\u00A0",
                react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: status.errorMessage },
                    react_1.default.createElement(eui_1.EuiIcon, { type: "iInCircle" }))));
            // Disable repo link is clone failed.
            disableRepoLink = true;
            hasError = true;
        }
        const repoTitle = (react_1.default.createElement(eui_1.EuiText, { "data-test-subj": "codeRepositoryItem" },
            react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" }, org),
            "/",
            react_1.default.createElement("strong", null, name)));
        const settingsShow = status && status.state !== status_1.RepoState.CLONING && status.state !== status_1.RepoState.DELETING;
        const settingsVisibility = settingsShow ? 'visible' : 'hidden';
        const indexShow = status &&
            status.state !== status_1.RepoState.CLONING &&
            status.state !== status_1.RepoState.DELETING &&
            status.state !== status_1.RepoState.INDEXING &&
            status.state !== status_1.RepoState.CLONE_ERROR;
        const indexVisibility = indexShow ? 'visible' : 'hidden';
        const deleteShow = status && status.state !== status_1.RepoState.DELETING;
        const deleteVisibility = deleteShow ? 'visible' : 'hidden';
        const projectManagement = (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: { display: 'none' } },
                    react_1.default.createElement("div", { className: "codeButton__project", "data-test-subj": "settingsRepositoryButton", tabIndex: 0, onKeyPress: onClickSettings, onClick: onClickSettings, role: "button", style: { visibility: settingsVisibility } },
                        react_1.default.createElement(eui_1.EuiIcon, { type: "gear" }),
                        react_1.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, "Settings"))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement("div", { className: "codeButton__project", "data-test-subj": "indexRepositoryButton", tabIndex: 0, onKeyPress: this.openReindexModal, onClick: this.openReindexModal, role: "button", style: { visibility: indexVisibility } },
                        react_1.default.createElement(eui_1.EuiIcon, { type: "indexSettings" }),
                        react_1.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, "Reindex"))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement("div", { className: "codeButton__project", "data-test-subj": "deleteRepositoryButton", tabIndex: 0, onKeyPress: this.openDeleteModal, onClick: this.openDeleteModal, role: "button", style: { visibility: deleteVisibility } },
                        react_1.default.createElement(eui_1.EuiIcon, { type: "trash", color: "danger" }),
                        react_1.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, "Delete"))))));
        const repoStatus = (react_1.default.createElement(eui_1.EuiText, null,
            react_1.default.createElement("h6", null,
                react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" }, footer))));
        return (react_1.default.createElement(eui_1.EuiPanel, { className: hasError ? 'codePanel__project codePanel__project--error' : 'codePanel__project' },
            this.renderProgress(),
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "flexStart" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: 3 },
                    disableRepoLink ? (repoTitle) : (react_1.default.createElement(react_router_dom_1.Link, { to: `/${uri}`, "data-test-subj": `adminLinkTo${name}` }, repoTitle)),
                    showStatus ? repoStatus : null),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: 3 },
                    react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                        react_1.default.createElement(eui_1.EuiLink, { href: 'https://' + uri, target: "_blank" }, uri))),
                enableManagement && projectManagement),
            this.state.showDeleteConfirmModal && this.renderDeleteConfirmModal(),
            this.state.showReindexConfirmModal && this.renderReindexConfirmModal()));
    }
    renderProgress() {
        const { status } = this.props;
        if (status &&
            (status.state === status_1.RepoState.CLONING ||
                status.state === status_1.RepoState.DELETING ||
                status.state === status_1.RepoState.INDEXING)) {
            const color = stateColor[status.state];
            if (status.progress === model_1.WorkerReservedProgress.COMPLETED) {
                return null;
            }
            else if (status.progress > model_1.WorkerReservedProgress.INIT) {
                return (react_1.default.createElement(eui_1.EuiProgress, { max: 100, value: status.progress, size: "s", color: color, position: "absolute" }));
            }
            else {
                return react_1.default.createElement(eui_1.EuiProgress, { size: "s", color: color, position: "absolute" });
            }
        }
    }
}
const mapDispatchToProps = {
    deleteRepo: actions_1.deleteRepo,
    indexRepo: actions_1.indexRepo,
    initRepoCommand: actions_1.initRepoCommand,
};
exports.ProjectItem = react_redux_1.connect(null, mapDispatchToProps)(CodeProjectItem);
