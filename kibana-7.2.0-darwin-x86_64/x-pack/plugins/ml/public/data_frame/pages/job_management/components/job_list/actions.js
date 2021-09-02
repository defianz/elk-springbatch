"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const check_privilege_1 = require("../../../../../privilege/check_privilege");
const common_1 = require("./common");
const job_service_1 = require("./job_service");
const action_start_1 = require("./action_start");
const action_delete_1 = require("./action_delete");
exports.getActions = (getJobs) => {
    const canStartStopDataFrameJob = check_privilege_1.checkPermission('canStartStopDataFrameJob');
    const deleteJob = job_service_1.deleteJobFactory(getJobs);
    const startJob = job_service_1.startJobFactory(getJobs);
    const stopJob = job_service_1.stopJobFactory(getJobs);
    return [
        {
            isPrimary: true,
            render: (item) => {
                if (item.state.task_state !== common_1.DATA_FRAME_RUNNING_STATE.STARTED) {
                    return react_1.default.createElement(action_start_1.StartAction, { startJob: startJob, item: item });
                }
                const buttonStopText = i18n_1.i18n.translate('xpack.ml.dataframe.jobsList.stopActionName', {
                    defaultMessage: 'Stop',
                });
                const stopButton = (react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", color: "text", disabled: !canStartStopDataFrameJob, iconType: "stop", onClick: () => stopJob(item), "aria-label": buttonStopText }, buttonStopText));
                if (!canStartStopDataFrameJob) {
                    return (react_1.default.createElement(eui_1.EuiToolTip, { position: "top", content: check_privilege_1.createPermissionFailureMessage('canStartStopDataFrameJob') }, stopButton));
                }
                return stopButton;
            },
        },
        {
            render: (item) => {
                return react_1.default.createElement(action_delete_1.DeleteAction, { deleteJob: deleteJob, item: item });
            },
        },
    ];
};
