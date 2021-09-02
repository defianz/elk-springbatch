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
const capabilities_1 = require("ui/capabilities");
const actions_1 = require("../../actions");
const url_1 = require("../../utils/url");
const project_item_1 = require("./project_item");
const project_settings_1 = require("./project_settings");
var SortOptionsValue;
(function (SortOptionsValue) {
    SortOptionsValue["AlphabeticalAsc"] = "alphabetical_asc";
    SortOptionsValue["AlphabeticalDesc"] = "alphabetical_desc";
    SortOptionsValue["UpdatedAsc"] = "updated_asc";
    SortOptionsValue["UpdatedDesc"] = "updated_desc";
    SortOptionsValue["RecentlyAdded"] = "recently_added";
})(SortOptionsValue || (SortOptionsValue = {}));
const sortFunctionsFactory = (status) => {
    const sortFunctions = {
        [SortOptionsValue.AlphabeticalAsc]: (a, b) => a.name.localeCompare(b.name),
        [SortOptionsValue.AlphabeticalDesc]: (a, b) => b.name.localeCompare(a.name),
        [SortOptionsValue.UpdatedAsc]: (a, b) => moment_1.default(status[b.uri].timestamp).diff(moment_1.default(status[a.uri].timestamp)),
        [SortOptionsValue.UpdatedDesc]: (a, b) => moment_1.default(status[a.uri].timestamp).diff(moment_1.default(status[b.uri].timestamp)),
        [SortOptionsValue.RecentlyAdded]: () => {
            return -1;
        },
    };
    return sortFunctions;
};
const sortOptions = [
    { value: SortOptionsValue.AlphabeticalAsc, inputDisplay: 'A to Z' },
    { value: SortOptionsValue.AlphabeticalDesc, inputDisplay: 'Z to A' },
    { value: SortOptionsValue.UpdatedAsc, inputDisplay: 'Last Updated ASC' },
    { value: SortOptionsValue.UpdatedDesc, inputDisplay: 'Last Updated DESC' },
];
class CodeProjectTab extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.closeModal = () => {
            this.setState({ showImportProjectModal: false, repoURL: '', isInvalid: false });
        };
        this.openModal = () => {
            this.setState({ showImportProjectModal: true });
        };
        this.openSettingModal = (uri, url) => {
            this.setState({ settingModal: { uri, url, show: true } });
        };
        this.closeSettingModal = () => {
            this.setState({ settingModal: { show: false } });
        };
        this.onChange = (e) => {
            this.setState({
                repoURL: e.target.value,
                isInvalid: url_1.isImportRepositoryURLInvalid(e.target.value),
            });
        };
        this.submitImportProject = () => {
            if (!url_1.isImportRepositoryURLInvalid(this.state.repoURL)) {
                this.props.importRepo(this.state.repoURL);
            }
            else if (!this.state.isInvalid) {
                this.setState({ isInvalid: true });
            }
        };
        this.updateIsInvalid = () => {
            this.setState({ isInvalid: url_1.isImportRepositoryURLInvalid(this.state.repoURL) });
        };
        this.renderImportModal = () => {
            return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
                react_1.default.createElement(eui_1.EuiModal, { onClose: this.closeModal },
                    react_1.default.createElement(eui_1.EuiModalHeader, null,
                        react_1.default.createElement(eui_1.EuiModalHeaderTitle, null, "Import a new repo")),
                    react_1.default.createElement(eui_1.EuiModalBody, null,
                        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                            react_1.default.createElement("h3", null, "Repository URL")),
                        react_1.default.createElement(eui_1.EuiForm, null,
                            react_1.default.createElement(eui_1.EuiFormRow, { isInvalid: this.state.isInvalid, error: "The URL shouldn't be empty." },
                                react_1.default.createElement(eui_1.EuiFieldText, { value: this.state.repoURL, onChange: this.onChange, onBlur: this.updateIsInvalid, placeholder: "https://github.com/Microsoft/TypeScript-Node-Starter", "aria-label": "input project url", "data-test-subj": "importRepositoryUrlInputBox", isLoading: this.props.importLoading, fullWidth: true, isInvalid: this.state.isInvalid })))),
                    react_1.default.createElement(eui_1.EuiModalFooter, null,
                        react_1.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.closeModal }, "Cancel"),
                        react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: this.submitImportProject, disabled: this.props.importLoading }, "Import project")))));
        };
        this.setSortOption = (value) => {
            this.setState({ sortOption: value });
        };
        this.state = {
            importLoading: false,
            showImportProjectModal: false,
            settingModal: { show: false },
            repoURL: '',
            sortOption: SortOptionsValue.AlphabeticalAsc,
            isInvalid: false,
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.importLoading && !props.importLoading) {
            return { showImportProjectModal: false, importLoading: props.importLoading, repoURL: '' };
        }
        return { importLoading: props.importLoading };
    }
    render() {
        const { projects, status, toastMessage, showToast, toastType } = this.props;
        const projectsCount = projects.length;
        const modal = this.state.showImportProjectModal && this.renderImportModal();
        const sortedProjects = projects.sort(sortFunctionsFactory(status)[this.state.sortOption]);
        const repoList = sortedProjects.map((repo) => (react_1.default.createElement(project_item_1.ProjectItem, { openSettings: this.openSettingModal, key: repo.uri, project: repo, showStatus: true, status: status[repo.uri], enableManagement: capabilities_1.capabilities.get().code.admin })));
        let settings = null;
        if (this.state.settingModal.show) {
            settings = (react_1.default.createElement(project_settings_1.ProjectSettings, { onClose: this.closeSettingModal, repoUri: this.state.settingModal.uri, url: this.state.settingModal.url }));
        }
        return (react_1.default.createElement("div", { className: "code-sidebar", "data-test-subj": "codeRepositoryList" },
            showToast && (react_1.default.createElement(eui_1.EuiGlobalToastList, { toasts: [{ title: '', color: toastType, text: toastMessage, id: toastMessage || '' }], dismissToast: this.props.closeToast, toastLifeTimeMs: 6000 })),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiFlexGroup, null,
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiFormRow, { label: "Sort By" },
                        react_1.default.createElement(eui_1.EuiSuperSelect, { options: sortOptions, valueOfSelected: this.state.sortOption, onChange: this.setSortOption }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: true }),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: true }),
                react_1.default.createElement(eui_1.EuiFlexItem, null, capabilities_1.capabilities.get().code.admin && (
                // @ts-ignore
                react_1.default.createElement(eui_1.EuiButton, { className: "codeButton__projectImport", onClick: this.openModal, "data-test-subj": "newProjectButton" }, "Import a new repo")))),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, null,
                react_1.default.createElement("h3", null,
                    projectsCount,
                    projectsCount === 1 ? react_1.default.createElement("span", null, " Repo") : react_1.default.createElement("span", null, " Repos"))),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            repoList,
            modal,
            settings));
    }
}
const mapStateToProps = (state) => ({
    projects: state.repository.repositories,
    status: state.status.status,
    importLoading: state.repository.importLoading,
    toastMessage: state.repository.toastMessage,
    toastType: state.repository.toastType,
    showToast: state.repository.showToast,
});
const mapDispatchToProps = {
    importRepo: actions_1.importRepo,
    closeToast: actions_1.closeToast,
};
exports.ProjectTab = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CodeProjectTab);
