"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
class ConfirmAlterActiveSpaceModalUI extends react_2.Component {
    render() {
        return (react_2.default.createElement(eui_1.EuiOverlayMask, null,
            react_2.default.createElement(eui_1.EuiConfirmModal, { onConfirm: this.props.onConfirm, onCancel: this.props.onCancel, title: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.confirmAlterActiveSpaceModal.title", defaultMessage: "Confirm update space" }), defaultFocusedButton: 'confirm', cancelButtonText: this.props.intl.formatMessage({
                    id: 'xpack.spaces.management.confirmAlterActiveSpaceModal.cancelButton',
                    defaultMessage: 'Cancel',
                }), confirmButtonText: this.props.intl.formatMessage({
                    id: 'xpack.spaces.management.confirmAlterActiveSpaceModal.updateSpaceButton',
                    defaultMessage: 'Update space',
                }) },
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.confirmAlterActiveSpaceModal.reloadWarningMessage", defaultMessage: "You have updated the visible features in this space. Your page will reload after saving." })))));
    }
}
exports.ConfirmAlterActiveSpaceModal = react_1.injectI18n(ConfirmAlterActiveSpaceModalUI);
