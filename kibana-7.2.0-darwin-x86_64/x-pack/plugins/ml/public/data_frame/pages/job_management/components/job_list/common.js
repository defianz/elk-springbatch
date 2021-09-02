"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var DATA_FRAME_RUNNING_STATE;
(function (DATA_FRAME_RUNNING_STATE) {
    DATA_FRAME_RUNNING_STATE["STARTED"] = "started";
    DATA_FRAME_RUNNING_STATE["STOPPED"] = "stopped";
})(DATA_FRAME_RUNNING_STATE = exports.DATA_FRAME_RUNNING_STATE || (exports.DATA_FRAME_RUNNING_STATE = {}));
// Used to pass on attribute names to table columns
var DataFrameJobListColumn;
(function (DataFrameJobListColumn) {
    DataFrameJobListColumn["configDestIndex"] = "config.dest.index";
    DataFrameJobListColumn["configSourceIndex"] = "config.source.index";
    DataFrameJobListColumn["id"] = "id";
})(DataFrameJobListColumn = exports.DataFrameJobListColumn || (exports.DataFrameJobListColumn = {}));
function isCompletedBatchJob(item) {
    // If `checkpoint=1`, `sync` is missing from the config and state is stopped,
    // then this is a completed batch data frame job.
    return (item.state.checkpoint === 1 &&
        item.config.sync === undefined &&
        item.state.task_state === DATA_FRAME_RUNNING_STATE.STOPPED);
}
exports.isCompletedBatchJob = isCompletedBatchJob;
