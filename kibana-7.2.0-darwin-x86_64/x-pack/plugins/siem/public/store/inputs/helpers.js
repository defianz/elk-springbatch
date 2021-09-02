"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.updateInputTimerange = (inputId, timerange, state) => {
    const input = fp_1.get(inputId, state);
    if (input != null) {
        return {
            ...[inputId, ...input.linkTo].reduce((acc, linkToId) => ({
                ...acc,
                [linkToId]: {
                    ...fp_1.get(linkToId, state),
                    timerange,
                },
            }), inputId === 'timeline' ? { ...state, global: { ...state.global, linkTo: [] } } : state),
        };
    }
    return state;
};
exports.toggleLockTimeline = (linkToId, state) => {
    const linkToIdAlreadyExist = state.global.linkTo.indexOf(linkToId);
    return {
        ...state,
        global: {
            ...state.global,
            timerange: linkToIdAlreadyExist > -1 ? state.global.timerange : state.timeline.timerange,
            linkTo: linkToIdAlreadyExist > -1
                ? [
                    ...state.global.linkTo.slice(0, linkToIdAlreadyExist),
                    ...state.global.linkTo.slice(linkToIdAlreadyExist + 1),
                ]
                : [...state.global.linkTo, linkToId],
        },
        timeline: {
            ...state.timeline,
            linkTo: linkToIdAlreadyExist > -1 ? [] : ['global'],
        },
    };
};
