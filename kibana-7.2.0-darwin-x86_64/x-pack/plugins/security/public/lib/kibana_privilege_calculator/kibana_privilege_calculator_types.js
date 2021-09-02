"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Describes the source of a privilege.
 */
var PRIVILEGE_SOURCE;
(function (PRIVILEGE_SOURCE) {
    /** Privilege is assigned directly to the entity */
    PRIVILEGE_SOURCE[PRIVILEGE_SOURCE["SPACE_FEATURE"] = 10] = "SPACE_FEATURE";
    /** Privilege is derived from space base privilege */
    PRIVILEGE_SOURCE[PRIVILEGE_SOURCE["SPACE_BASE"] = 20] = "SPACE_BASE";
    /** Privilege is derived from global feature privilege */
    PRIVILEGE_SOURCE[PRIVILEGE_SOURCE["GLOBAL_FEATURE"] = 30] = "GLOBAL_FEATURE";
    /** Privilege is derived from global base privilege */
    PRIVILEGE_SOURCE[PRIVILEGE_SOURCE["GLOBAL_BASE"] = 40] = "GLOBAL_BASE";
})(PRIVILEGE_SOURCE = exports.PRIVILEGE_SOURCE || (exports.PRIVILEGE_SOURCE = {}));
