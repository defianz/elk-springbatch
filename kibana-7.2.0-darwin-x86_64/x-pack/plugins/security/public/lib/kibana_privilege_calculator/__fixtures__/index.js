"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var default_privilege_definition_1 = require("./default_privilege_definition");
exports.defaultPrivilegeDefinition = default_privilege_definition_1.defaultPrivilegeDefinition;
var build_role_1 = require("./build_role");
exports.buildRole = build_role_1.buildRole;
tslib_1.__exportStar(require("./common_allowed_privileges"), exports);
