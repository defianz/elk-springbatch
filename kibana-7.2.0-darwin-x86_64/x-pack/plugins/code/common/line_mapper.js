"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class LineMapper {
    constructor(content) {
        this.lines = content.split('\n');
        this.acc = [0];
        this.getLocation = this.getLocation.bind(this);
        for (let i = 0; i < this.lines.length - 1; i++) {
            this.acc[i + 1] = this.acc[i] + this.lines[i].length + 1;
        }
    }
    getLocation(offset) {
        let line = lodash_1.default.sortedIndex(this.acc, offset);
        if (offset !== this.acc[line]) {
            line -= 1;
        }
        const column = offset - this.acc[line];
        return { line, column, offset };
    }
    getLines() {
        return this.lines;
    }
}
exports.LineMapper = LineMapper;
