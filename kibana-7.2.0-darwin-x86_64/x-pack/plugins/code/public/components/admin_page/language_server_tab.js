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
const installation_1 = require("../../../common/installation");
const language_server_1 = require("../../../common/language_server");
const language_server_2 = require("../../actions/language_server");
const icons_1 = require("../shared/icons");
const LanguageServerLi = (props) => {
    const { status, name } = props.languageServer;
    const languageIcon = () => {
        if (name === 'TypeScript') {
            return react_1.default.createElement(icons_1.TypeScriptIcon, null);
        }
        else if (name === 'Java') {
            return react_1.default.createElement(icons_1.JavaIcon, null);
        }
        else if (name === 'Go') {
            return react_1.default.createElement(icons_1.GoIcon, null);
        }
    };
    const onInstallClick = () => props.requestInstallLanguageServer(name);
    let button = null;
    let state = null;
    if (status === language_server_1.LanguageServerStatus.RUNNING) {
        state = react_1.default.createElement(eui_1.EuiText, { size: "xs" }, "Running ...");
    }
    else if (status === language_server_1.LanguageServerStatus.NOT_INSTALLED) {
        state = (react_1.default.createElement(eui_1.EuiText, { size: "xs", color: 'subdued' }, "Not Installed"));
    }
    else if (status === language_server_1.LanguageServerStatus.READY) {
        state = (react_1.default.createElement(eui_1.EuiText, { size: "xs", color: 'subdued' }, "Installed"));
    }
    if (props.languageServer.installationType === installation_1.InstallationType.Plugin) {
        button = (react_1.default.createElement(eui_1.EuiButton, { size: "s", color: "secondary", onClick: onInstallClick }, "Setup"));
    }
    return (react_1.default.createElement(eui_1.EuiFlexItem, null,
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiFlexGroup, null,
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            " ",
                            languageIcon(),
                            " "),
                        react_1.default.createElement(eui_1.EuiFlexItem, null,
                            react_1.default.createElement(eui_1.EuiText, null,
                                react_1.default.createElement("strong", null, name)),
                            react_1.default.createElement(eui_1.EuiText, { size: "s" },
                                react_1.default.createElement("h6", null,
                                    " ",
                                    state,
                                    " "))))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    " ",
                    button,
                    " ")))));
};
class AdminLanguageSever extends react_1.default.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.toggleInstruction = (showingInstruction, name, url, pluginName) => {
            this.setState({ showingInstruction, name, url, pluginName });
        };
        this.state = { showingInstruction: false };
    }
    render() {
        const languageServers = this.props.languageServers.map(ls => (react_1.default.createElement(LanguageServerLi, { languageServer: ls, key: ls.name, requestInstallLanguageServer: () => this.toggleInstruction(true, ls.name, ls.downloadUrl, ls.pluginName), loading: this.props.installLoading[ls.name] })));
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, null,
                react_1.default.createElement("h3", null,
                    this.props.languageServers.length,
                    this.props.languageServers.length > 1 ? (react_1.default.createElement("span", null, " Language servers")) : (react_1.default.createElement("span", null, " Language server")))),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column", gutterSize: "s" }, languageServers),
            react_1.default.createElement(LanguageServerInstruction, { show: this.state.showingInstruction, name: this.state.name, pluginName: this.state.pluginName, url: this.state.url, close: () => this.toggleInstruction(false) })));
    }
}
const SupportedOS = [
    { id: 'windows', name: 'Windows' },
    { id: 'linux', name: 'Linux' },
    { id: 'darwin', name: 'macOS' },
];
const LanguageServerInstruction = (props) => {
    const tabs = SupportedOS.map(({ id, name }) => {
        const url = props.url ? props.url.replace('$OS', id) : '';
        const installCode = `bin/kibana-plugin install ${url}`;
        return {
            id,
            name,
            content: (react_1.default.createElement("div", null,
                react_1.default.createElement(eui_1.EuiSpacer, null),
                react_1.default.createElement(eui_1.EuiText, { grow: false },
                    react_1.default.createElement("h3", null, "Install"),
                    react_1.default.createElement("ol", null,
                        react_1.default.createElement("li", null, "Stop your kibana Code node."),
                        react_1.default.createElement("li", null,
                            "Use the following command to install the ",
                            props.name,
                            " language server.")),
                    react_1.default.createElement(eui_1.EuiCodeBlock, { language: "shell" }, installCode),
                    react_1.default.createElement("h3", null, "Uninstall"),
                    react_1.default.createElement("ol", null,
                        react_1.default.createElement("li", null, "Stop your kibana Code node."),
                        react_1.default.createElement("li", null,
                            "Use the following command to remove the ",
                            props.name,
                            " language server.")),
                    react_1.default.createElement(eui_1.EuiCodeBlock, { language: "shell" },
                        "bin/kibana-plugin remove ",
                        props.pluginName)))),
        };
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        ' ',
        props.show && (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiModal, { onClose: props.close, maxWidth: false },
                react_1.default.createElement(eui_1.EuiModalHeader, null,
                    react_1.default.createElement(eui_1.EuiModalHeaderTitle, null, "Installation Instructions")),
                react_1.default.createElement(eui_1.EuiModalBody, null,
                    react_1.default.createElement(eui_1.EuiTabbedContent, { tabs: tabs, initialSelectedTab: tabs[1], size: 'm' })),
                react_1.default.createElement(eui_1.EuiModalFooter, null,
                    react_1.default.createElement(eui_1.EuiButton, { onClick: props.close, fill: true }, "Close")))))));
};
const mapStateToProps = (state) => ({
    languageServers: state.languageServer.languageServers,
    installLoading: state.languageServer.installServerLoading,
});
const mapDispatchToProps = {
    requestInstallLanguageServer: language_server_2.requestInstallLanguageServer,
};
exports.LanguageSeverTab = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdminLanguageSever);
