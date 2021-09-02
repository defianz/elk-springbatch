"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ReferenceType;
(function (ReferenceType) {
    ReferenceType[ReferenceType["BRANCH"] = 0] = "BRANCH";
    ReferenceType[ReferenceType["TAG"] = 1] = "TAG";
    ReferenceType[ReferenceType["REMOTE_BRANCH"] = 2] = "REMOTE_BRANCH";
    ReferenceType[ReferenceType["OTHER"] = 3] = "OTHER";
})(ReferenceType = exports.ReferenceType || (exports.ReferenceType = {}));
