"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
exports.DEFAULT_ARROW_HEIGHT = 1;
exports.MAX_ARROW_HEIGHT = 4;
/** Returns the height of an arrow in pixels based on the specified percent (0-100) */
exports.getArrowHeightFromPercent = d3_scale_1.scaleLinear()
    .domain([0, 100])
    .range([exports.DEFAULT_ARROW_HEIGHT, exports.MAX_ARROW_HEIGHT])
    .clamp(true);
/** Returns a percent, or undefined if the percent cannot be calculated */
exports.getPercent = ({ numerator, denominator, }) => {
    if (Math.abs(denominator) < Number.EPSILON ||
        !Number.isFinite(numerator) ||
        !Number.isFinite(denominator)) {
        return undefined;
    }
    return (numerator / denominator) * 100;
};
/** Returns true if the input is an array that holds one value */
exports.hasOneValue = (array) => Array.isArray(array) && array.length === 1;
