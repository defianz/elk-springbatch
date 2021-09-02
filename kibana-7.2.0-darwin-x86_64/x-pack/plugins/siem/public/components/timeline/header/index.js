"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const data_providers_1 = require("../data_providers");
const search_or_filter_1 = require("../search_or_filter");
const TimelineHeaderContainer = styled_components_1.default.div `
  width: 100%;
`;
exports.TimelineHeader = recompose_1.pure(({ browserFields, id, indexPattern, dataProviders, onChangeDataProviderKqlQuery, onChangeDroppableAndProvider, onDataProviderEdited, onDataProviderRemoved, onToggleDataProviderEnabled, onToggleDataProviderExcluded, show, }) => (React.createElement(TimelineHeaderContainer, { "data-test-subj": "timelineHeader" },
    React.createElement(data_providers_1.DataProviders, { browserFields: browserFields, id: id, dataProviders: dataProviders, onChangeDroppableAndProvider: onChangeDroppableAndProvider, onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery, onDataProviderEdited: onDataProviderEdited, onDataProviderRemoved: onDataProviderRemoved, onToggleDataProviderEnabled: onToggleDataProviderEnabled, onToggleDataProviderExcluded: onToggleDataProviderExcluded, show: show }),
    React.createElement(search_or_filter_1.StatefulSearchOrFilter, { timelineId: id, indexPattern: indexPattern }))));
