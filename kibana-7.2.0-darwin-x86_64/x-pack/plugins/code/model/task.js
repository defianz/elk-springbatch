"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var TaskType;
(function (TaskType) {
    TaskType[TaskType["Import"] = 0] = "Import";
    TaskType[TaskType["Update"] = 1] = "Update";
    TaskType[TaskType["Delete"] = 2] = "Delete";
    TaskType[TaskType["Index"] = 3] = "Index";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
