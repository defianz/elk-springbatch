"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chart_1 = require("./chart");
const filter_1 = require("./filter");
const graphic_1 = require("./graphic");
const presentation_1 = require("./presentation");
const proportion_1 = require("./proportion");
const report_1 = require("./report");
const text_1 = require("./text");
// Registry expects a function that returns a spec object
exports.tagSpecs = [chart_1.chart, filter_1.filter, graphic_1.graphic, presentation_1.presentation, proportion_1.proportion, report_1.report, text_1.text];
