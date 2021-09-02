"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const data_provider_1 = require("./data_provider");
const provider_item_badge_1 = require("./provider_item_badge");
exports.Provider = recompose_1.pure(({ dataProvider }) => (react_1.default.createElement(provider_item_badge_1.ProviderItemBadge, { deleteProvider: fp_1.noop, field: dataProvider.queryMatch.displayField || dataProvider.queryMatch.field, kqlQuery: dataProvider.kqlQuery, isEnabled: dataProvider.enabled, isExcluded: dataProvider.excluded, providerId: dataProvider.id, toggleExcludedProvider: fp_1.noop, toggleEnabledProvider: fp_1.noop, val: dataProvider.queryMatch.displayValue || dataProvider.queryMatch.value, operator: dataProvider.queryMatch.operator || data_provider_1.IS_OPERATOR })));
