"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.seriesStyleToFlot = (seriesStyle) => {
    if (!seriesStyle) {
        return {};
    }
    const lines = lodash_1.get(seriesStyle, 'lines');
    const bars = lodash_1.get(seriesStyle, 'bars');
    const fill = lodash_1.get(seriesStyle, 'fill');
    const color = lodash_1.get(seriesStyle, 'color');
    const stack = lodash_1.get(seriesStyle, 'stack');
    const horizontal = lodash_1.get(seriesStyle, 'horizontalBars', false);
    const flotStyle = {
        numbers: {
            show: true,
        },
        lines: {
            show: lines > 0,
            lineWidth: lines,
            fillColor: color,
            fill: fill / 10,
        },
        bars: {
            show: bars > 0,
            barWidth: bars,
            fill: 1,
            align: 'center',
            horizontal,
        },
        // This is here intentionally even though it is the default.
        // We use the `size` plugins for this and if the user says they want points
        // we just set the size to be static.
        points: { show: false },
        bubbles: {
            show: true,
            fill,
        },
    };
    if (stack) {
        flotStyle.stack = stack;
    }
    if (color) {
        flotStyle.color = color;
    }
    return flotStyle;
};
