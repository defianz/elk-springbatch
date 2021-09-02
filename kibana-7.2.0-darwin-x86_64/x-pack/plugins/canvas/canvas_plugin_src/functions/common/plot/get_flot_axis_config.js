"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("../../types");
exports.getFlotAxisConfig = (axis, argValue, { columns, ticks, font } = {}) => {
    if (!argValue || (types_1.isAxisConfig(argValue) && argValue.show === false)) {
        return { show: false };
    }
    const config = { show: true };
    const axisType = lodash_1.get(columns, `${axis}.type`);
    if (types_1.isAxisConfig(argValue)) {
        const { position, min, max, tickSize } = argValue;
        // first value is used as the default
        const acceptedPositions = axis === 'x' ? ['bottom', 'top'] : ['left', 'right'];
        config.position =
            position && acceptedPositions.includes(position) ? position : acceptedPositions[0];
        if (axisType === 'number' || axisType === 'date') {
            if (min != null) {
                config.min = min;
            }
            if (max != null) {
                config.max = max;
            }
        }
        if (tickSize && axisType === 'number') {
            config.tickSize = tickSize;
        }
    }
    if (axisType === 'string' && ticks) {
        const tickAxis = ticks[axis];
        if (tickAxis) {
            config.ticks = lodash_1.map(tickAxis.hash, (position, name) => [
                position,
                name,
            ]);
        }
    }
    if (axisType === 'date') {
        config.mode = 'time';
    }
    if (typeof font === 'object') {
        config.font = font;
    }
    return config;
};
