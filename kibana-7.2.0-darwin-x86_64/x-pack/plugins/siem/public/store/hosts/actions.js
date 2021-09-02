"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/siem/local/hosts');
exports.updateAuthenticationsLimit = actionCreator('UPDATE_AUTHENTICATIONS_LIMIT');
exports.updateHostsLimit = actionCreator('UPDATE_HOSTS_LIMIT');
exports.updateHostsSort = actionCreator('UPDATE_HOSTS_SORT');
exports.updateEventsLimit = actionCreator('UPDATE_EVENTS_LIMIT');
exports.updateUncommonProcessesLimit = actionCreator('UPDATE_UNCOMMONPROCESSES_LIMIT');
exports.setHostsFilterQueryDraft = actionCreator('SET_HOSTS_FILTER_QUERY_DRAFT');
exports.applyHostsFilterQuery = actionCreator('APPLY_HOSTS_FILTER_QUERY');
