"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/siem/local/network');
exports.updateDnsLimit = actionCreator('UPDATE_DNS_LIMIT');
exports.updateDnsSort = actionCreator('UPDATE_DNS_SORT');
exports.updateIsPtrIncluded = actionCreator('UPDATE_DNS_IS_PTR_INCLUDED');
exports.updateTopNFlowLimit = actionCreator('UPDATE_TOP_N_FLOW_LIMIT');
exports.updateTopNFlowSort = actionCreator('UPDATE_TOP_N_FLOW_SORT');
exports.updateTopNFlowTarget = actionCreator('UPDATE_TOP_N_FLOW_TARGET');
exports.updateTopNFlowDirection = actionCreator('UPDATE_TOP_N_FLOW_DIRECTION');
exports.setNetworkFilterQueryDraft = actionCreator('SET_NETWORK_FILTER_QUERY_DRAFT');
exports.applyNetworkFilterQuery = actionCreator('APPLY_NETWORK_FILTER_QUERY');
// IP Details Actions
exports.updateIpDetailsFlowTarget = actionCreator('UPDATE_IP_DETAILS_TARGET');
// Domains Table Actions
exports.updateDomainsLimit = actionCreator('UPDATE_DOMAINS_LIMIT');
exports.updateDomainsFlowDirection = actionCreator('UPDATE_DOMAINS_DIRECTION');
exports.updateDomainsSort = actionCreator('UPDATE_DOMAINS_SORT');
// TLS Table Actions
exports.updateTlsSort = actionCreator('UPDATE_TLS_SORT');
exports.updateTlsLimit = actionCreator('UPDATE_TLS_LIMIT');
// Users Table Actions
exports.updateUsersLimit = actionCreator('UPDATE_USERS_LIMIT');
exports.updateUsersSort = actionCreator('UPDATE_USERS_SORT');
