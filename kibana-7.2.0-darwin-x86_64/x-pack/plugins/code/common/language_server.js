"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var LanguageServerStatus;
(function (LanguageServerStatus) {
    LanguageServerStatus[LanguageServerStatus["NOT_INSTALLED"] = 0] = "NOT_INSTALLED";
    LanguageServerStatus[LanguageServerStatus["INSTALLING"] = 1] = "INSTALLING";
    LanguageServerStatus[LanguageServerStatus["READY"] = 2] = "READY";
    LanguageServerStatus[LanguageServerStatus["RUNNING"] = 3] = "RUNNING";
})(LanguageServerStatus = exports.LanguageServerStatus || (exports.LanguageServerStatus = {}));
