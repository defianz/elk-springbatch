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
const helpers_1 = require("./helpers");
const tooltip_1 = require("./tooltip");
exports.FormattedDuration = recompose_1.pure(({ maybeDurationNanoseconds, tooltipTitle }) => (React.createElement(tooltip_1.FormattedDurationTooltip, { maybeDurationNanoseconds: maybeDurationNanoseconds, tooltipTitle: tooltipTitle },
    React.createElement("div", { "data-test-subj": "formatted-duration" }, helpers_1.getFormattedDurationString(maybeDurationNanoseconds)))));
