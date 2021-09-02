"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const types_1 = require("../../graphql/types");
const i18n = tslib_1.__importStar(require("./translations"));
exports.FlowDirectionSelect = recompose_1.pure(({ onChangeDirection, selectedDirection }) => (react_1.default.createElement(eui_1.EuiFilterGroup, null,
    react_1.default.createElement(eui_1.EuiFilterButton, { withNext: true, hasActiveFilters: selectedDirection === types_1.FlowDirection.uniDirectional, onClick: () => onChangeDirection(types_1.FlowDirection.uniDirectional), "data-test-subj": types_1.FlowDirection.uniDirectional }, i18n.UNIDIRECTIONAL),
    react_1.default.createElement(eui_1.EuiFilterButton, { hasActiveFilters: selectedDirection === types_1.FlowDirection.biDirectional, onClick: () => onChangeDirection(types_1.FlowDirection.biDirectional), "data-test-subj": types_1.FlowDirection.biDirectional }, i18n.BIDIRECTIONAL))));
