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
const fp_1 = require("lodash/fp");
const eui_1 = require("@elastic/eui");
const duration_1 = require("../../../duration");
const empty_value_1 = require("../../../empty_value");
const formatted_date_1 = require("../../../formatted_date");
const formatted_ip_1 = require("../../../formatted_ip");
const port_1 = require("../../../port");
const constants_1 = require("./constants");
exports.FormattedFieldValue = recompose_1.pure(({ eventId, contextId, fieldName, fieldType, value }) => {
    if (fieldType === constants_1.IP_FIELD_TYPE) {
        return (React.createElement(formatted_ip_1.FormattedIp, { eventId: eventId, contextId: contextId, fieldName: fieldName, value: !fp_1.isNumber(value) ? value : String(value) }));
    }
    else if (fieldType === constants_1.DATE_FIELD_TYPE) {
        return React.createElement(formatted_date_1.FormattedDate, { fieldName: fieldName, value: value });
    }
    else if (port_1.PORT_NAMES.some(portName => fieldName === portName)) {
        return (React.createElement(port_1.Port, { contextId: contextId, eventId: eventId, fieldName: fieldName, value: `${value}` }));
    }
    else if (fieldName === duration_1.EVENT_DURATION_FIELD_NAME) {
        return (React.createElement(duration_1.Duration, { contextId: contextId, eventId: eventId, fieldName: fieldName, value: `${value}` }));
    }
    else if (fieldName === constants_1.MESSAGE_FIELD_NAME && value != null && value !== '') {
        return (React.createElement(eui_1.EuiToolTip, { position: "left", "data-test-subj": "message-tool-tip", content: React.createElement(eui_1.EuiFlexGroup, { direction: "column", gutterSize: "none" },
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement("span", null, fieldName)),
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement("span", null, value))) },
            React.createElement(React.Fragment, null, value)));
    }
    else {
        return empty_value_1.getOrEmptyTagFromValue(value);
    }
});
