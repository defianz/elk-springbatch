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
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_redux_1 = require("react-redux");
const store_1 = require("../../store");
const helpers_1 = require("./helpers");
const onDragEndHandler = ({ browserFields, dataProviders, dispatch, result, }) => {
    if (helpers_1.providerWasDroppedOnTimeline(result)) {
        helpers_1.addProviderToTimeline({ dataProviders, result, dispatch });
    }
    else if (helpers_1.providerWasDroppedOnTimelineButton(result)) {
        helpers_1.addProviderToTimeline({ dataProviders, result, dispatch });
    }
    else if (helpers_1.fieldWasDroppedOnTimelineColumns(result)) {
        helpers_1.addFieldToTimelineColumns({ browserFields, dispatch, result });
    }
};
/**
 * DragDropContextWrapperComponent handles all drag end events
 */
class DragDropContextWrapperComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.shouldComponentUpdate = ({ children, dataProviders }) => children === this.props.children && dataProviders !== this.props.dataProviders // prevent re-renders when data providers are added or removed, but all other props are the same
            ? false
            : true;
        this.onDragEnd = (result) => {
            const { browserFields, dataProviders, dispatch } = this.props;
            enableScrolling();
            if (dataProviders != null) {
                onDragEndHandler({
                    browserFields,
                    result,
                    dataProviders,
                    dispatch,
                });
            }
        };
    }
    render() {
        const { children } = this.props;
        return (React.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: this.onDragEnd, onDragStart: disableScrolling }, children));
    }
}
exports.DragDropContextWrapperComponent = DragDropContextWrapperComponent;
const emptyDataProviders = {}; // stable reference
const mapStateToProps = (state) => {
    const dataProviders = fp_1.defaultTo(emptyDataProviders, store_1.dragAndDropSelectors.dataProvidersSelector(state));
    return { dataProviders };
};
exports.DragDropContextWrapper = react_redux_1.connect(mapStateToProps)(DragDropContextWrapperComponent);
const disableScrolling = () => {
    const x = window.pageXOffset !== undefined
        ? window.pageXOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const y = window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    window.onscroll = () => window.scrollTo(x, y);
};
const enableScrolling = () => (window.onscroll = () => fp_1.noop);
