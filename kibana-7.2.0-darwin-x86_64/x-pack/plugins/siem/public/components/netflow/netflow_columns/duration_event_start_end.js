"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggables_1 = require("../../draggables");
const duration_1 = require("../../duration");
const formatted_date_1 = require("../../formatted_date");
const formatted_duration_1 = require("../../formatted_duration");
exports.EVENT_START_FIELD_NAME = 'event.start';
exports.EVENT_END_FIELD_NAME = 'event.end';
const TimeIcon = styled_components_1.default(eui_1.EuiIcon) `
  margin-right: 3px;
  position: relative;
  top: -1px;
`;
/**
 * Renders a column of draggable badges containing:
 * - `event.duration`
 * - `event.start`
 * - `event.end`
 */
exports.DurationEventStartEnd = recompose_1.pure(({ contextId, eventDuration, eventId, eventEnd, eventStart }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "flexStart", "data-test-subj": "duration-and-start-group", direction: "column", justifyContent: "center", gutterSize: "none" },
    eventDuration != null
        ? fp_1.uniq(eventDuration).map(duration => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: duration },
            React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "event-duration", field: duration_1.EVENT_DURATION_FIELD_NAME, id: `${contextId}-${eventId}-${duration_1.EVENT_DURATION_FIELD_NAME}-${duration}`, name: name, tooltipContent: null, value: duration },
                React.createElement(eui_1.EuiText, { size: "xs" },
                    React.createElement(TimeIcon, { size: "m", type: "clock" }),
                    React.createElement(formatted_duration_1.FormattedDuration, { maybeDurationNanoseconds: duration, tooltipTitle: duration_1.EVENT_DURATION_FIELD_NAME }))))))
        : null,
    eventStart != null
        ? fp_1.uniq(eventStart).map(start => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: start },
            React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "event-start", field: exports.EVENT_START_FIELD_NAME, id: `${contextId}-${eventId}-${exports.EVENT_START_FIELD_NAME}-${start}`, tooltipContent: null, value: start },
                React.createElement(eui_1.EuiText, { size: "xs" },
                    React.createElement(TimeIcon, { size: "m", type: "clock" }),
                    React.createElement(formatted_date_1.FormattedDate, { fieldName: exports.EVENT_START_FIELD_NAME, value: start }))))))
        : null,
    eventEnd != null
        ? fp_1.uniq(eventEnd).map(end => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: end },
            React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "event-end", field: exports.EVENT_END_FIELD_NAME, id: `${contextId}-${eventId}-${exports.EVENT_END_FIELD_NAME}-${end}`, tooltipContent: null, value: end },
                React.createElement(eui_1.EuiText, { size: "xs" },
                    React.createElement(TimeIcon, { size: "m", type: "clock" }),
                    React.createElement(formatted_date_1.FormattedDate, { fieldName: exports.EVENT_END_FIELD_NAME, value: end }))))))
        : null)));
