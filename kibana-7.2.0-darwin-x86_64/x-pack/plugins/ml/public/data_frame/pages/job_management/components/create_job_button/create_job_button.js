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
const react_2 = require("@kbn/i18n/react");
const check_privilege_1 = require("../../../../../privilege/check_privilege");
const common_1 = require("../../../../common");
exports.CreateJobButton = () => {
    const disabled = !check_privilege_1.checkPermission('canCreateDataFrameJob') ||
        !check_privilege_1.checkPermission('canPreviewDataFrameJob') ||
        !check_privilege_1.checkPermission('canStartStopDataFrameJob');
    const button = (react_1.default.createElement(eui_1.EuiButton, { disabled: disabled, fill: true, onClick: common_1.moveToDataFrameWizard, iconType: "plusInCircle", size: "s" },
        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.dataframe.jobsList.createDataFrameButton", defaultMessage: "Create data frame" })));
    if (disabled) {
        return (react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: check_privilege_1.createPermissionFailureMessage('canCreateDataFrameJob') }, button));
    }
    return button;
};
