"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const event_details_1 = require("./event_details");
class StatefulEventDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onViewSelected = (view) => {
            this.setState({ view });
        };
        this.state = { view: 'table-view' };
    }
    render() {
        const { browserFields, data, id, isLoading, onUpdateColumns, timelineId } = this.props;
        return (React.createElement(event_details_1.EventDetails, { browserFields: browserFields, data: data, id: id, isLoading: isLoading, view: this.state.view, onUpdateColumns: onUpdateColumns, onViewSelected: this.onViewSelected, timelineId: timelineId }));
    }
}
exports.StatefulEventDetails = StatefulEventDetails;
