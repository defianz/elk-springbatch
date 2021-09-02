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
exports.DeleteAction = ({ deleteJob, item }) => {
    const disabled = item.state.task_state === common_1.DATA_FRAME_RUNNING_STATE.STARTED;
    const canDeleteDataFrameJob = check_privilege_1.checkPermission('canDeleteDataFrameJob');
    const [isModalVisible, setModalVisible] = react_1.useState(false);
    const closeModal = () => setModalVisible(false);
    const deleteAndCloseModal = () => {
        setModalVisible(false);
        deleteJob(item);
    };
    const openModal = () => setModalVisible(true);
    const buttonDeleteText = i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteActionName', {
        defaultMessage: 'Delete',
    });
    let deleteButton = (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", color: "text", disabled: disabled || !canDeleteDataFrameJob, iconType: "trash", onClick: openModal, "aria-label": buttonDeleteText }, buttonDeleteText));
    if (disabled || !canDeleteDataFrameJob) {
        deleteButton = (react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: disabled
                ? i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteActionDisabledToolTipContent', {
                    defaultMessage: 'Stop the data frame job in order to delete it.',
                })
                : check_privilege_1.createPermissionFailureMessage('canStartStopDataFrameJob') }, deleteButton));
    }
    return (react_1.default.createElement(react_1.Fragment, null,
        deleteButton,
        isModalVisible && (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiConfirmModal, { title: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteModalTitle', {
                    defaultMessage: 'Delete {jobId}',
                    values: { jobId: item.config.id },
                }), onCancel: closeModal, onConfirm: deleteAndCloseModal, cancelButtonText: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteModalCancelButton', {
                    defaultMessage: 'Cancel',
                }), confirmButtonText: i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteModalDeleteButton', {
                    defaultMessage: 'Delete',
                }), defaultFocusedButton: eui_1.EUI_MODAL_CONFIRM_BUTTON, buttonColor: "danger" },
                react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.deleteModalBody', {
                    defaultMessage: `Are you sure you want to delete this job? The job's target index and optional Kibana index pattern will not be deleted.`,
                })))))));
};
