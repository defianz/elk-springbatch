"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/siem/local/drag_and_drop');
exports.registerProvider = actionCreator('REGISTER_PROVIDER');
exports.unRegisterProvider = actionCreator('UNREGISTER_PROVIDER');
exports.noProviderFound = actionCreator('NO_PROVIDER_FOUND');
