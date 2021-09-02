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
const selectNetworkPage = (state) => state.network.page;
const selectNetworkDetails = (state) => state.network.details;
const selectNetworkByType = (state, networkType) => fp_1.get(networkType, state.network);
// Network Page Selectors
exports.dnsSelector = () => reselect_1.createSelector(selectNetworkPage, network => network.queries.dns);
exports.topNFlowSelector = () => reselect_1.createSelector(selectNetworkPage, network => network.queries.topNFlow);
// Filter Query Selectors
exports.networkFilterQueryAsJson = () => reselect_1.createSelector(selectNetworkByType, network => (network.filterQuery ? network.filterQuery.serializedQuery : null));
exports.networkFilterQueryAsKuery = () => reselect_1.createSelector(selectNetworkByType, network => (network.filterQuery && network.filterQuery.kuery ? network.filterQuery.kuery : null));
exports.networkFilterQueryDraft = () => reselect_1.createSelector(selectNetworkByType, network => network.filterQueryDraft);
exports.isNetworkFilterQueryDraftValid = () => reselect_1.createSelector(selectNetworkByType, network => keury_1.isFromKueryExpressionValid(network.filterQueryDraft));
// IP Details Selectors
exports.ipDetailsFlowTargetSelector = () => reselect_1.createSelector(selectNetworkDetails, network => network.flowTarget);
exports.domainsSelector = () => reselect_1.createSelector(selectNetworkDetails, network => network.queries.domains);
exports.tlsSelector = () => reselect_1.createSelector(selectNetworkDetails, network => network.queries.tls);
exports.usersSelector = () => reselect_1.createSelector(selectNetworkDetails, network => network.queries.users);
