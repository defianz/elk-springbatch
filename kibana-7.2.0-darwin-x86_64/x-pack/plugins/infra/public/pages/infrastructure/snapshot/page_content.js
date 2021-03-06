"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const nodes_overview_1 = require("../../../components/nodes_overview");
const page_1 = require("../../../components/page");
const with_waffle_filters_1 = require("../../../containers/waffle/with_waffle_filters");
const with_waffle_nodes_1 = require("../../../containers/waffle/with_waffle_nodes");
const with_waffle_options_1 = require("../../../containers/waffle/with_waffle_options");
const with_waffle_time_1 = require("../../../containers/waffle/with_waffle_time");
const with_options_1 = require("../../../containers/with_options");
const with_source_1 = require("../../../containers/with_source");
exports.SnapshotPageContent = () => (react_1.default.createElement(page_1.PageContent, null,
    react_1.default.createElement(with_source_1.WithSource, null, ({ configuration, derivedIndexPattern, sourceId }) => (react_1.default.createElement(with_options_1.WithOptions, null, ({ wafflemap }) => (react_1.default.createElement(with_waffle_filters_1.WithWaffleFilter, { indexPattern: derivedIndexPattern }, ({ filterQueryAsJson, applyFilterQuery }) => (react_1.default.createElement(with_waffle_time_1.WithWaffleTime, null, ({ currentTimeRange, isAutoReloading }) => (react_1.default.createElement(with_waffle_options_1.WithWaffleOptions, null, ({ metric, groupBy, nodeType, view, changeView, autoBounds, boundsOverride, }) => (react_1.default.createElement(with_waffle_nodes_1.WithWaffleNodes, { filterQuery: filterQueryAsJson, metric: metric, groupBy: groupBy, nodeType: nodeType, sourceId: sourceId, timerange: currentTimeRange }, ({ nodes, loading, refetch }) => (react_1.default.createElement(nodes_overview_1.NodesOverview, { nodes: nodes, loading: nodes.length > 0 && isAutoReloading ? false : loading, nodeType: nodeType, options: {
            ...wafflemap,
            metric,
            fields: configuration && configuration.fields,
            groupBy,
        }, reload: refetch, onDrilldown: applyFilterQuery, timeRange: currentTimeRange, view: view, onViewChange: changeView, autoBounds: autoBounds, boundsOverride: boundsOverride })))))))))))))));
