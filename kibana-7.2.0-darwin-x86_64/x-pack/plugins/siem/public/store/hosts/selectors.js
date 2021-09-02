"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const reselect_1 = require("reselect");
const keury_1 = require("../../lib/keury");
const selectHosts = (state, hostsType) => fp_1.get(hostsType, state.hosts);
exports.authenticationsSelector = () => reselect_1.createSelector(selectHosts, hosts => hosts.queries.authentications);
exports.hostsSelector = () => reselect_1.createSelector(selectHosts, hosts => hosts.queries.hosts);
exports.eventsSelector = () => reselect_1.createSelector(selectHosts, hosts => hosts.queries.events);
exports.uncommonProcessesSelector = () => reselect_1.createSelector(selectHosts, hosts => hosts.queries.uncommonProcesses);
exports.hostsFilterQueryExpression = () => reselect_1.createSelector(selectHosts, hosts => hosts.filterQuery && hosts.filterQuery.kuery ? hosts.filterQuery.kuery.expression : null);
exports.hostsFilterQueryAsKuery = () => reselect_1.createSelector(selectHosts, hosts => (hosts.filterQuery && hosts.filterQuery.kuery ? hosts.filterQuery.kuery : null));
exports.hostsFilterQueryAsJson = () => reselect_1.createSelector(selectHosts, hosts => (hosts.filterQuery ? hosts.filterQuery.serializedQuery : null));
exports.hostsFilterQueryDraft = () => reselect_1.createSelector(selectHosts, hosts => hosts.filterQueryDraft);
exports.isHostFilterQueryDraftValid = () => reselect_1.createSelector(selectHosts, hosts => keury_1.isFromKueryExpressionValid(hosts.filterQueryDraft));
