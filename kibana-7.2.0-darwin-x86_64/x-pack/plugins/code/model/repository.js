"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function sortFileTree(a, b) {
    if (a.type !== b.type) {
        return b.type - a.type;
    }
    else {
        return a.name.localeCompare(b.name);
    }
}
exports.sortFileTree = sortFileTree;
var FileTreeItemType;
(function (FileTreeItemType) {
    FileTreeItemType[FileTreeItemType["File"] = 0] = "File";
    FileTreeItemType[FileTreeItemType["Directory"] = 1] = "Directory";
    FileTreeItemType[FileTreeItemType["Submodule"] = 2] = "Submodule";
    FileTreeItemType[FileTreeItemType["Link"] = 3] = "Link";
})(FileTreeItemType = exports.FileTreeItemType || (exports.FileTreeItemType = {}));
var IndexStatsKey;
(function (IndexStatsKey) {
    IndexStatsKey["File"] = "file-added-count";
    IndexStatsKey["FileDeleted"] = "file-deleted-count";
    IndexStatsKey["Symbol"] = "symbol-added-count";
    IndexStatsKey["SymbolDeleted"] = "symbol-deleted-count";
    IndexStatsKey["Reference"] = "reference-added-count";
    IndexStatsKey["ReferenceDeleted"] = "reference-deleted-count";
})(IndexStatsKey = exports.IndexStatsKey || (exports.IndexStatsKey = {}));
var WorkerReservedProgress;
(function (WorkerReservedProgress) {
    WorkerReservedProgress[WorkerReservedProgress["INIT"] = 0] = "INIT";
    WorkerReservedProgress[WorkerReservedProgress["COMPLETED"] = 100] = "COMPLETED";
    WorkerReservedProgress[WorkerReservedProgress["ERROR"] = -100] = "ERROR";
    WorkerReservedProgress[WorkerReservedProgress["TIMEOUT"] = -200] = "TIMEOUT";
})(WorkerReservedProgress = exports.WorkerReservedProgress || (exports.WorkerReservedProgress = {}));
