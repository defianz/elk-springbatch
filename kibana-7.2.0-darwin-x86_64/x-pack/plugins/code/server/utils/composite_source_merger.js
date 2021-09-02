"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LINE_NUMBER_PLACEHOLDER = '..';
/**
 * expand ranges of lines, eg:
 * expand 2 lines of [[3,4], [9,9]] with value 2 becomes [(1,7), (7,12)]
 * @param lines the array of line numbers
 * @param expand the expand range
 */
function expandRanges(lines, expand) {
    return lines.map(line => ({
        startLine: Math.max(0, line.startLine - expand),
        endLine: line.endLine + expand + 1,
    }));
}
exports.expandRanges = expandRanges;
/**
 * merge the ranges that overlap each other into one, eg:
 * [(1,3), (2,5)] => [(1,5)]
 * @param ranges
 */
function mergeRanges(ranges) {
    const sortedRanges = ranges.sort((a, b) => a.startLine - b.startLine);
    const results = [];
    const mergeIfOverlap = (a, b) => {
        // a <= b is always true here because sorting above
        if (b.startLine >= a.startLine && b.startLine <= a.endLine) {
            // overlap
            if (b.endLine > a.endLine) {
                a.endLine = b.endLine; // extend previous range
            }
            return true;
        }
        return false;
    };
    for (const range of sortedRanges) {
        if (results.length > 0) {
            const last = results[results.length - 1];
            if (mergeIfOverlap(last, range)) {
                continue;
            }
        }
        results.push(range);
    }
    return results;
}
exports.mergeRanges = mergeRanges;
/**
 * extract content from source by ranges
 * @param ranges the partials ranges of contents
 * @param source the source content
 * @param mapper a line mapper object which contains the relationship between source content and partial content
 * @return the extracted partial contents
 * #todo To support server side render for grammar highlights, we could change the source parameter to HighlightedCode[].
 * #todo interface HighlightedCode { text: string, highlights: ... };
 */
function extractSourceContent(ranges, source, mapper) {
    const sortedRanges = ranges.sort((a, b) => a.startLine - b.startLine);
    let results = [];
    const pushPlaceholder = () => {
        results.push('');
        mapper.addPlaceholder();
    };
    for (const range of sortedRanges) {
        if (!(results.length === 0 && range.startLine === 0)) {
            pushPlaceholder();
        }
        const slicedContent = source.slice(range.startLine, range.endLine);
        results = results.concat(slicedContent);
        mapper.addMapping(range.startLine, range.startLine + slicedContent.length);
    }
    const lastRange = sortedRanges[sortedRanges.length - 1];
    if (lastRange.endLine < source.length) {
        pushPlaceholder();
    }
    return results;
}
exports.extractSourceContent = extractSourceContent;
class LineMapping {
    constructor() {
        this.lines = [];
        this.reverseMap = new Map();
    }
    toStringArray(placeHolder = exports.DEFAULT_LINE_NUMBER_PLACEHOLDER, startAtLine = 1) {
        return this.lines.map(v => {
            if (Number.isNaN(v)) {
                return placeHolder;
            }
            else {
                return (v + startAtLine).toString();
            }
        });
    }
    addPlaceholder() {
        this.lines.push(Number.NaN);
    }
    addMapping(start, end) {
        for (let i = start; i < end; i++) {
            this.lines.push(i);
            this.reverseMap.set(i, this.lines.length - 1);
        }
    }
    lineNumber(originLineNumber, startAtLine = 1) {
        const n = this.reverseMap.get(originLineNumber);
        if (n === undefined) {
            return Number.NaN;
        }
        else {
            return n + startAtLine;
        }
    }
    hasLine(line) {
        return this.reverseMap.has(line);
    }
}
exports.LineMapping = LineMapping;
