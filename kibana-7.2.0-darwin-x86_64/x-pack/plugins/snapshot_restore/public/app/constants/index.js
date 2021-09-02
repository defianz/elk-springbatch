"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_PATH = '/management/elasticsearch/snapshot_restore';
exports.DEFAULT_SECTION = 'repositories';
// Set a minimum request duration to avoid strange UI flickers
exports.MINIMUM_TIMEOUT_MS = 300;
var REPOSITORY_DOC_PATHS;
(function (REPOSITORY_DOC_PATHS) {
    REPOSITORY_DOC_PATHS["default"] = "modules-snapshots.html";
    REPOSITORY_DOC_PATHS["fs"] = "modules-snapshots.html#_shared_file_system_repository";
    REPOSITORY_DOC_PATHS["url"] = "modules-snapshots.html#_read_only_url_repository";
    REPOSITORY_DOC_PATHS["source"] = "modules-snapshots.html#_source_only_repository";
    REPOSITORY_DOC_PATHS["s3"] = "repository-s3.html";
    REPOSITORY_DOC_PATHS["hdfs"] = "repository-hdfs.html";
    REPOSITORY_DOC_PATHS["azure"] = "repository-azure.html";
    REPOSITORY_DOC_PATHS["gcs"] = "repository-gcs.html";
    REPOSITORY_DOC_PATHS["plugins"] = "repository.html";
})(REPOSITORY_DOC_PATHS = exports.REPOSITORY_DOC_PATHS || (exports.REPOSITORY_DOC_PATHS = {}));
var SNAPSHOT_STATE;
(function (SNAPSHOT_STATE) {
    SNAPSHOT_STATE["IN_PROGRESS"] = "IN_PROGRESS";
    SNAPSHOT_STATE["SUCCESS"] = "SUCCESS";
    SNAPSHOT_STATE["FAILED"] = "FAILED";
    SNAPSHOT_STATE["PARTIAL"] = "PARTIAL";
    SNAPSHOT_STATE["INCOMPATIBLE"] = "INCOMPATIBLE";
})(SNAPSHOT_STATE = exports.SNAPSHOT_STATE || (exports.SNAPSHOT_STATE = {}));
// UI Metric constants
exports.UIM_APP_NAME = 'snapshot_restore';
exports.UIM_REPOSITORY_LIST_LOAD = 'repository_list_load';
exports.UIM_REPOSITORY_CREATE = 'repository_create';
exports.UIM_REPOSITORY_UPDATE = 'repository_update';
exports.UIM_REPOSITORY_DELETE = 'repository_delete';
exports.UIM_REPOSITORY_DELETE_MANY = 'repository_delete_many';
exports.UIM_REPOSITORY_SHOW_DETAILS_CLICK = 'repository_show_details_click';
exports.UIM_REPOSITORY_DETAIL_PANEL_VERIFY = 'repository_detail_panel_verify';
exports.UIM_SNAPSHOT_LIST_LOAD = 'snapshot_list_load';
exports.UIM_SNAPSHOT_SHOW_DETAILS_CLICK = 'snapshot_show_details_click';
exports.UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB = 'snapshot_detail_panel_summary_tab';
exports.UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB = 'snapshot_detail_panel_failed_indices_tab';
