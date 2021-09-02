"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const check_privilege_1 = require("../../../../../privilege/check_privilege");
const common_1 = require("./common");
exports.StartAction = ({ startJob, item }) => {
    const canStartStopDataFrameJob = check_privilege_1.checkPermission('canStartStopDataFrameJob');
    const [isModalVisible, setModalVisible] = react_1.useState(false);
    const closeModal = () => setModalVisible(false);
    const startAndCloseModal = () => {
        setModalVisible(false);
        startJob(item);
    };
    const openModal = () => setModalVisible(true);
    const buttonStartText = i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.startActionName', {
        defaultMessage: 'Start',
    });
    // Disable start for batch jobs which have completed.
    const completedBatchJob = common_1.isCompletedBatchJob(item);
    let startButton = (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", color: "text", disabled: !canStartStopDataFrameJob || completedBatchJob, iconType: "play", onClick: openModal, "aria-label": buttonStartText }, buttonStartText));
    if (!canStartStopDataFrameJob || completedBatchJob) {
        startButton = (react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: !canStartStopDataFrameJob
                ? check_privilege_1.createPermissionFailureMessage('canStartStopDataFrameJob')
                : i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.completeBatchJobToolTip', {
                    defaultMessage: '{jobId} is a completed batch job and cannot be restarted.',
                    values: { jobId: item.config.id },
                }) }, startButton));
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        startButton,
        isModalVisible && (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiConfirmModal, { title: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.startModalTitle', {
                    defaultMessage: 'Start {jobId}',
                    values: { jobId: item.config.id },
                }), onCancel: closeModal, onConfirm: startAndCloseModal, cancelButtonText: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.startModalCancelButton', {
                    defaultMessage: 'Cancel',
                }), confirmButtonText: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.startModalStartButton', {
                    defaultMessage: 'Start',
                }), defaultFocusedButton: eui_1.EUI_MODAL_CONFIRM_BUTTON, buttonColor: "primary" },
                react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.startModalBody', {
                    defaultMessage: 'A data frame job will increase search and indexing load in your cluster. Please stop the job if excessive load is experienced. Are you sure you want to start this job?',
                })))))));
};
