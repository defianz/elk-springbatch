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
const formatted_duration_1 = require("../formatted_duration");
exports.EVENT_DURATION_FIELD_NAME = 'event.duration';
/**
 * Renders draggable text containing the value of a field representing a
 * duration of time, (e.g. `event.duration`)
 */
exports.Duration = recompose_1.pure(({ contextId, eventId, fieldName, value }) => (React.createElement(draggables_1.DefaultDraggable, { id: `${contextId}-${eventId}-${fieldName}-${value}`, name: name, field: fieldName, tooltipContent: null, value: value },
    React.createElement(formatted_duration_1.FormattedDuration, { maybeDurationNanoseconds: value, tooltipTitle: fieldName }))));
