"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
const React = tslib_1.__importStar(require("react"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const i18n = tslib_1.__importStar(require("./translations"));
const getSuccessToast = ({ titleSummary }) => ({
    id: `copy-success-${uuid_1.default.v4()}`,
    color: 'success',
    iconType: 'copyClipboard',
    title: `${i18n.COPIED} ${titleSummary} ${i18n.TO_THE_CLIPBOARD}`,
});
class Clipboard extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = (event) => {
            const { content, onCopy, titleSummary } = this.props;
            event.preventDefault();
            event.stopPropagation();
            const isSuccess = copy_to_clipboard_1.default(`${content}`, { debug: true });
            if (onCopy != null) {
                onCopy({ content, isSuccess });
            }
            if (isSuccess) {
                this.setState(prevState => ({
                    toasts: [...prevState.toasts, getSuccessToast({ titleSummary })],
                }));
            }
        };
        this.removeToast = (removedToast) => {
            this.setState(prevState => ({
                toasts: prevState.toasts.filter(toast => toast.id !== removedToast.id),
            }));
        };
        this.state = {
            toasts: [],
        };
    }
    render() {
        const { toastLifeTimeMs = 5000 } = this.props;
        // TODO: 1 error is: Visible, non-interactive elements with click handlers must have at least one keyboard listener
        // TODO: 2 error is: Elements with the 'button' interactive role must be focusable
        // TODO: Investigate this error
        /* eslint-disable */
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { role: "button", "data-test-subj": "clipboard", onClick: this.onClick }, this.props.children),
            React.createElement(eui_1.EuiGlobalToastList, { toasts: this.state.toasts, dismissToast: this.removeToast, toastLifeTimeMs: toastLifeTimeMs })));
        /* eslint-enable */
    }
}
exports.Clipboard = Clipboard;
