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
const draggables_1 = require("../draggables");
const formatted_field_1 = require("../timeline/body/renderers/formatted_field");
exports.SOURCE_IP_FIELD_NAME = 'source.ip';
exports.DESTINATION_IP_FIELD_NAME = 'destination.ip';
const IP_FIELD_TYPE = 'ip';
/**
 * Renders text containing a draggable IP address (e.g. `source.ip`,
 * `destination.ip`) that contains a hyperlink
 */
exports.Ip = recompose_1.pure(({ contextId, eventId, fieldName, value }) => (React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "ip", field: fieldName, id: `${contextId}-${eventId}-${fieldName}-${value}`, tooltipContent: fieldName, value: value },
    React.createElement(formatted_field_1.FormattedFieldValue, { contextId: contextId, "data-test-subj": "formatted-ip", eventId: eventId, fieldName: fieldName, fieldType: IP_FIELD_TYPE, value: value }))));
