"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const stateful_event_details_1 = require("../../event_details/stateful_event_details");
const lazy_accordion_1 = require("../../lazy_accordion");
const ExpandableDetails = styled_components_1.default.div `
  width: ${({ width }) => (width != null ? `${width}px;` : '100%')}
    ${({ hideExpandButton }) => hideExpandButton
    ? `
  .euiAccordion__button svg {
    width: 0px;
    height: 0px;
  }
  `
    : ''};
`;
class ExpandableEvent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderExpandedContent = () => {
            const { browserFields, event, id, isLoading, onUpdateColumns, timelineId } = this.props;
            return (React.createElement(stateful_event_details_1.StatefulEventDetails, { browserFields: browserFields, data: event, id: id, isLoading: isLoading, onUpdateColumns: onUpdateColumns, timelineId: timelineId }));
        };
    }
    render() {
        const { forceExpand = false, id, timelineId, width } = this.props;
        return (React.createElement(ExpandableDetails, { "data-test-subj": "timeline-expandable-details", hideExpandButton: true, width: width },
            React.createElement(lazy_accordion_1.LazyAccordion, { id: `timeline-${timelineId}-row-${id}`, renderExpandedContent: this.renderExpandedContent, forceExpand: forceExpand, paddingSize: "none" })));
    }
}
exports.ExpandableEvent = ExpandableEvent;
