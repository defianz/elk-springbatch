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
const actions_1 = require("../../actions");
const url_1 = require("../../utils/url");
class CodeImportProject extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            value: '',
            isInvalid: false,
        };
        this.onChange = (e) => {
            this.setState({
                value: e.target.value,
                isInvalid: url_1.isImportRepositoryURLInvalid(e.target.value),
            });
        };
        this.submitImportProject = () => {
            if (!url_1.isImportRepositoryURLInvalid(this.state.value)) {
                this.props.importRepo(this.state.value);
            }
            else if (!this.state.isInvalid) {
                this.setState({ isInvalid: true });
            }
        };
        this.updateIsInvalid = () => {
            this.setState({ isInvalid: url_1.isImportRepositoryURLInvalid(this.state.value) });
        };
    }
    render() {
        const { importLoading, toastMessage, showToast, toastType } = this.props;
        return (react_1.default.createElement("div", { className: "codeContainer__import" },
            showToast && (react_1.default.createElement(eui_1.EuiGlobalToastList, { toasts: [{ title: '', color: toastType, text: toastMessage, id: toastMessage || '' }], dismissToast: this.props.closeToast, toastLifeTimeMs: 6000 })),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiFlexGroup, null,
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiFormRow, { label: "Repository URL", helpText: "e.g. https://github.com/Microsoft/TypeScript-Node-Starter", fullWidth: true, isInvalid: this.state.isInvalid, error: "The URL shouldn't be empty." },
                        react_1.default.createElement(eui_1.EuiFieldText, { value: this.state.value, onChange: this.onChange, "aria-label": "input project url", "data-test-subj": "importRepositoryUrlInputBox", isLoading: importLoading, fullWidth: true, onBlur: this.updateIsInvalid, isInvalid: this.state.isInvalid }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiButton, { className: "codeButton__projectImport", onClick: this.submitImportProject, "data-test-subj": "importRepositoryButton" }, "Import")))));
    }
}
const mapStateToProps = (state) => ({
    importLoading: state.repository.importLoading,
    toastMessage: state.repository.toastMessage,
    toastType: state.repository.toastType,
    showToast: state.repository.showToast,
});
const mapDispatchToProps = {
    importRepo: actions_1.importRepo,
    closeToast: actions_1.closeToast,
};
exports.ImportProject = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CodeImportProject);
