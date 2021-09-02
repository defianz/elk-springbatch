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
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const repository_utils_1 = require("../../../common/repository_utils");
const actions_1 = require("../../actions");
const icons_1 = require("../shared/icons");
const defaultConfig = {
    disableGo: true,
    disableJava: true,
    disableTypescript: true,
};
class ProjectSettingsModal extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            config: this.props.config,
        };
        this.onSwitchChange = (ls) => (e) => {
            const { checked } = e.target;
            this.setState((prevState) => ({
                config: { ...prevState.config, [`disable${ls}`]: !checked },
            }));
        };
        this.saveChanges = () => {
            this.props.switchLanguageServer({
                repoUri: this.props.repoUri,
                config: this.state.config,
            });
        };
    }
    render() {
        const { repoUri, languageServers, onClose } = this.props;
        const { disableJava, disableTypescript } = this.state.config;
        const org = repository_utils_1.RepositoryUtils.orgNameFromUri(repoUri);
        const repoName = repository_utils_1.RepositoryUtils.repoNameFromUri(repoUri);
        const languageServerSwitches = languageServers.map(ls => {
            const checked = ls.name === 'Java' ? !disableJava : !disableTypescript;
            return (react_1.default.createElement("div", { key: ls.name },
                react_1.default.createElement(eui_1.EuiSwitch, { name: ls.name, label: react_1.default.createElement("span", null,
                        ls.name === 'Java' ? (react_1.default.createElement("div", { className: "codeSettingsPanel__icon" },
                            react_1.default.createElement(icons_1.JavaIcon, null))) : (react_1.default.createElement("div", { className: "codeSettingsPanel__icon" },
                            react_1.default.createElement(icons_1.TypeScriptIcon, null))),
                        ls.name), checked: checked, onChange: this.onSwitchChange(ls.name) })));
        });
        return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiModal, { onClose: onClose },
                react_1.default.createElement(eui_1.EuiModalHeader, null,
                    react_1.default.createElement(eui_1.EuiModalHeaderTitle, null,
                        react_1.default.createElement("h3", null, "Project Settings"),
                        react_1.default.createElement(eui_1.EuiText, null,
                            org,
                            "/",
                            repoName))),
                react_1.default.createElement(eui_1.EuiModalBody, null,
                    react_1.default.createElement(eui_1.EuiTitle, { size: "xxs" },
                        react_1.default.createElement("h5", null, "Language Servers")),
                    languageServerSwitches),
                react_1.default.createElement(eui_1.EuiModalFooter, null,
                    react_1.default.createElement(eui_1.EuiButtonEmpty, null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin?tab=LanguageServers" }, "Manage Language Servers")),
                    react_1.default.createElement(eui_1.EuiButton, { onClick: this.saveChanges }, "Save Changes")))));
    }
}
const mapStateToProps = (state, ownProps) => ({
    languageServers: state.languageServer.languageServers,
    config: state.repository.projectConfigs[ownProps.repoUri] || defaultConfig,
});
const mapDispatchToProps = {
    switchLanguageServer: actions_1.switchLanguageServer,
};
exports.ProjectSettings = react_redux_1.connect(
// @ts-ignore
mapStateToProps, mapDispatchToProps)(ProjectSettingsModal);
