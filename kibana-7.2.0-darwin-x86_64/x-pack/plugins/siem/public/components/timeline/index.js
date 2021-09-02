"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const source_1 = require("../../containers/source");
const store_1 = require("../../store");
const actions_1 = require("../../store/actions");
const default_headers_1 = require("./body/column_headers/default_headers");
const timeline_1 = require("./timeline");
class StatefulTimelineComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.shouldComponentUpdate = ({ id, flyoutHeaderHeight, flyoutHeight, activePage, columns, dataProviders, end, isLive, itemsPerPage, itemsPerPageOptions, kqlMode, kqlQueryExpression, pageCount, sort, start, show, }) => id !== this.props.id ||
            flyoutHeaderHeight !== this.props.flyoutHeaderHeight ||
            flyoutHeight !== this.props.flyoutHeight ||
            activePage !== this.props.activePage ||
            !fp_1.isEqual(columns, this.props.columns) ||
            !fp_1.isEqual(dataProviders, this.props.dataProviders) ||
            end !== this.props.end ||
            isLive !== this.props.isLive ||
            itemsPerPage !== this.props.itemsPerPage ||
            !fp_1.isEqual(itemsPerPageOptions, this.props.itemsPerPageOptions) ||
            kqlMode !== this.props.kqlMode ||
            kqlQueryExpression !== this.props.kqlQueryExpression ||
            pageCount !== this.props.pageCount ||
            !fp_1.isEqual(sort, this.props.sort) ||
            start !== this.props.start ||
            show !== this.props.show;
        this.onDataProviderRemoved = (providerId, andProviderId) => this.props.removeProvider({ id: this.props.id, providerId, andProviderId });
        this.onToggleDataProviderEnabled = ({ providerId, enabled, andProviderId, }) => this.props.updateDataProviderEnabled({
            id: this.props.id,
            enabled,
            providerId,
            andProviderId,
        });
        this.onToggleDataProviderExcluded = ({ providerId, excluded, andProviderId, }) => this.props.updateDataProviderExcluded({
            id: this.props.id,
            excluded,
            providerId,
            andProviderId,
        });
        this.onDataProviderEdited = ({ andProviderId, excluded, field, operator, providerId, value, }) => this.props.onDataProviderEdited({
            andProviderId,
            excluded,
            field,
            id: this.props.id,
            operator,
            providerId,
            value,
        });
        this.onChangeDataProviderKqlQuery = ({ providerId, kqlQuery }) => this.props.updateDataProviderKqlQuery({ id: this.props.id, kqlQuery, providerId });
        this.onChangeItemsPerPage = itemsChangedPerPage => this.props.updateItemsPerPage({ id: this.props.id, itemsPerPage: itemsChangedPerPage });
        this.onChangeDroppableAndProvider = providerId => this.props.updateHighlightedDropAndProviderId({ id: this.props.id, providerId });
    }
    componentDidMount() {
        const { createTimeline, id } = this.props;
        if (createTimeline != null) {
            createTimeline({ id, columns: default_headers_1.defaultHeaders, show: false });
        }
    }
    render() {
        const { columns, dataProviders, end, flyoutHeight, flyoutHeaderHeight, id, isLive, itemsPerPage, itemsPerPageOptions, kqlMode, kqlQueryExpression, show, start, sort, } = this.props;
        return (React.createElement(source_1.WithSource, { sourceId: "default" }, ({ indexPattern, browserFields }) => (React.createElement(timeline_1.Timeline, { browserFields: browserFields, columns: columns, id: id, dataProviders: dataProviders, end: end, flyoutHeaderHeight: flyoutHeaderHeight, flyoutHeight: flyoutHeight, indexPattern: indexPattern, isLive: isLive, itemsPerPage: itemsPerPage, itemsPerPageOptions: itemsPerPageOptions, kqlMode: kqlMode, kqlQueryExpression: kqlQueryExpression, onChangeDataProviderKqlQuery: this.onChangeDataProviderKqlQuery, onChangeDroppableAndProvider: this.onChangeDroppableAndProvider, onChangeItemsPerPage: this.onChangeItemsPerPage, onDataProviderEdited: this.onDataProviderEdited, onDataProviderRemoved: this.onDataProviderRemoved, onToggleDataProviderEnabled: this.onToggleDataProviderEnabled, onToggleDataProviderExcluded: this.onToggleDataProviderExcluded, show: show, start: start, sort: sort }))));
    }
}
const makeMapStateToProps = () => {
    const getTimeline = store_1.timelineSelectors.getTimelineByIdSelector();
    const getKqlQueryTimeline = store_1.timelineSelectors.getKqlFilterQuerySelector();
    const getInputsTimeline = store_1.inputsSelectors.getTimelineSelector();
    const mapStateToProps = (state, { id }) => {
        const timeline = getTimeline(state, id);
        const input = getInputsTimeline(state);
        const { columns, dataProviders, itemsPerPage, itemsPerPageOptions, kqlMode, sort, show, } = timeline;
        const kqlQueryExpression = getKqlQueryTimeline(state, id);
        return {
            columns,
            dataProviders,
            end: input.timerange.to,
            id,
            isLive: input.policy.kind === 'interval',
            itemsPerPage,
            itemsPerPageOptions,
            kqlMode,
            kqlQueryExpression,
            sort,
            start: input.timerange.from,
            show,
        };
    };
    return mapStateToProps;
};
exports.StatefulTimeline = react_redux_1.connect(makeMapStateToProps, {
    addProvider: actions_1.timelineActions.addProvider,
    createTimeline: actions_1.timelineActions.createTimeline,
    onDataProviderEdited: actions_1.timelineActions.dataProviderEdited,
    updateColumns: actions_1.timelineActions.updateColumns,
    updateDataProviderEnabled: actions_1.timelineActions.updateDataProviderEnabled,
    updateDataProviderExcluded: actions_1.timelineActions.updateDataProviderExcluded,
    updateDataProviderKqlQuery: actions_1.timelineActions.updateDataProviderKqlQuery,
    updateHighlightedDropAndProviderId: actions_1.timelineActions.updateHighlightedDropAndProviderId,
    updateItemsPerPage: actions_1.timelineActions.updateItemsPerPage,
    updateItemsPerPageOptions: actions_1.timelineActions.updateItemsPerPageOptions,
    updateSort: actions_1.timelineActions.updateSort,
    removeProvider: actions_1.timelineActions.removeProvider,
})(StatefulTimelineComponent);
