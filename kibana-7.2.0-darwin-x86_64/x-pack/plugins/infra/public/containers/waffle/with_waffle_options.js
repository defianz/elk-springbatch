"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const reselect_1 = require("reselect");
const lodash_1 = require("lodash");
const types_1 = require("../../graphql/types");
const store_1 = require("../../store");
const typed_react_1 = require("../../utils/typed_react");
const typed_redux_1 = require("../../utils/typed_redux");
const url_state_1 = require("../../utils/url_state");
const selectOptionsUrlState = reselect_1.createSelector(store_1.waffleOptionsSelectors.selectMetric, store_1.waffleOptionsSelectors.selectView, store_1.waffleOptionsSelectors.selectGroupBy, store_1.waffleOptionsSelectors.selectNodeType, store_1.waffleOptionsSelectors.selectCustomOptions, store_1.waffleOptionsSelectors.selectBoundsOverride, store_1.waffleOptionsSelectors.selectAutoBounds, (metric, view, groupBy, nodeType, customOptions, boundsOverride, autoBounds) => ({
    metric,
    groupBy,
    nodeType,
    view,
    customOptions,
    boundsOverride,
    autoBounds,
}));
exports.withWaffleOptions = react_redux_1.connect((state) => ({
    metric: store_1.waffleOptionsSelectors.selectMetric(state),
    groupBy: store_1.waffleOptionsSelectors.selectGroupBy(state),
    nodeType: store_1.waffleOptionsSelectors.selectNodeType(state),
    view: store_1.waffleOptionsSelectors.selectView(state),
    customOptions: store_1.waffleOptionsSelectors.selectCustomOptions(state),
    boundsOverride: store_1.waffleOptionsSelectors.selectBoundsOverride(state),
    autoBounds: store_1.waffleOptionsSelectors.selectAutoBounds(state),
    urlState: selectOptionsUrlState(state),
}), typed_redux_1.bindPlainActionCreators({
    changeMetric: store_1.waffleOptionsActions.changeMetric,
    changeGroupBy: store_1.waffleOptionsActions.changeGroupBy,
    changeNodeType: store_1.waffleOptionsActions.changeNodeType,
    changeView: store_1.waffleOptionsActions.changeView,
    changeCustomOptions: store_1.waffleOptionsActions.changeCustomOptions,
    changeBoundsOverride: store_1.waffleOptionsActions.changeBoundsOverride,
    changeAutoBounds: store_1.waffleOptionsActions.changeAutoBounds,
}));
exports.WithWaffleOptions = typed_react_1.asChildFunctionRenderer(exports.withWaffleOptions);
exports.WithWaffleOptionsUrlState = () => (react_1.default.createElement(exports.WithWaffleOptions, null, ({ changeMetric, urlState, changeGroupBy, changeNodeType, changeView, changeCustomOptions, changeAutoBounds, changeBoundsOverride, }) => (react_1.default.createElement(url_state_1.UrlStateContainer, { urlState: urlState, urlStateKey: "waffleOptions", mapToUrlState: mapToUrlState, onChange: newUrlState => {
        if (newUrlState && newUrlState.metric) {
            changeMetric(newUrlState.metric);
        }
        if (newUrlState && newUrlState.groupBy) {
            changeGroupBy(newUrlState.groupBy);
        }
        if (newUrlState && newUrlState.nodeType) {
            changeNodeType(newUrlState.nodeType);
        }
        if (newUrlState && newUrlState.view) {
            changeView(newUrlState.view);
        }
        if (newUrlState && newUrlState.customOptions) {
            changeCustomOptions(newUrlState.customOptions);
        }
        if (newUrlState && newUrlState.bounds) {
            changeBoundsOverride(newUrlState.bounds);
        }
        if (newUrlState && newUrlState.auto) {
            changeAutoBounds(newUrlState.auto);
        }
    }, onInitialize: initialUrlState => {
        if (initialUrlState && initialUrlState.metric) {
            changeMetric(initialUrlState.metric);
        }
        if (initialUrlState && initialUrlState.groupBy) {
            changeGroupBy(initialUrlState.groupBy);
        }
        if (initialUrlState && initialUrlState.nodeType) {
            changeNodeType(initialUrlState.nodeType);
        }
        if (initialUrlState && initialUrlState.view) {
            changeView(initialUrlState.view);
        }
        if (initialUrlState && initialUrlState.customOptions) {
            changeCustomOptions(initialUrlState.customOptions);
        }
        if (initialUrlState && initialUrlState.bounds) {
            changeBoundsOverride(initialUrlState.bounds);
        }
        if (initialUrlState && initialUrlState.auto) {
            changeAutoBounds(initialUrlState.auto);
        }
    } }))));
const mapToUrlState = (value) => value
    ? {
        metric: mapToMetricUrlState(value.metric),
        groupBy: mapToGroupByUrlState(value.groupBy),
        nodeType: mapToNodeTypeUrlState(value.nodeType),
        view: mapToViewUrlState(value.view),
        customOptions: mapToCustomOptionsUrlState(value.customOptions),
        bounds: mapToBoundsOverideUrlState(value.boundsOverride),
        auto: mapToAutoBoundsUrlState(value.autoBounds),
    }
    : undefined;
const isInfraSnapshotMetricInput = (subject) => {
    return subject != null && subject.type != null && types_1.InfraSnapshotMetricType[subject.type] != null;
};
const isInfraSnapshotGroupbyInput = (subject) => {
    return subject != null && subject.type != null;
};
const isInfraGroupByOption = (subject) => {
    return subject != null && subject.text != null && subject.field != null;
};
const mapToMetricUrlState = (subject) => {
    return subject && isInfraSnapshotMetricInput(subject) ? subject : undefined;
};
const mapToGroupByUrlState = (subject) => {
    return subject && Array.isArray(subject) && subject.every(isInfraSnapshotGroupbyInput)
        ? subject
        : undefined;
};
const mapToNodeTypeUrlState = (subject) => {
    return subject && types_1.InfraNodeType[subject] ? subject : undefined;
};
const mapToViewUrlState = (subject) => {
    return subject && ['map', 'table'].includes(subject) ? subject : undefined;
};
const mapToCustomOptionsUrlState = (subject) => {
    return subject && Array.isArray(subject) && subject.every(isInfraGroupByOption)
        ? subject
        : undefined;
};
const mapToBoundsOverideUrlState = (subject) => {
    return subject != null && lodash_1.isNumber(subject.max) && lodash_1.isNumber(subject.min) ? subject : undefined;
};
const mapToAutoBoundsUrlState = (subject) => {
    return subject != null && lodash_1.isBoolean(subject) ? subject : undefined;
};
