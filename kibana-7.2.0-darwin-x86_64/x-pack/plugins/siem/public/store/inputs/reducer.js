"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const fp_1 = require("lodash/fp");
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const actions_1 = require("./actions");
const helpers_1 = require("./helpers");
const momentDate = datemath_1.default.parse('now-24h');
exports.initialInputsState = {
    global: {
        timerange: {
            kind: 'relative',
            fromStr: 'now-24h',
            toStr: 'now',
            from: momentDate ? momentDate.valueOf() : 0,
            to: Date.now(),
        },
        query: [],
        policy: {
            kind: 'manual',
            duration: 300000,
        },
        linkTo: ['timeline'],
    },
    timeline: {
        timerange: {
            kind: 'relative',
            fromStr: 'now-24h',
            toStr: 'now',
            from: momentDate ? momentDate.valueOf() : 0,
            to: Date.now(),
        },
        query: [],
        policy: {
            kind: 'manual',
            duration: 300000,
        },
        linkTo: ['global'],
    },
};
exports.inputsReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialInputsState)
    .case(actions_1.setTimelineRangeDatePicker, (state, { from, to }) => {
    return {
        ...state,
        global: {
            ...state.global,
            linkTo: [],
        },
        timeline: {
            ...state.timeline,
            timerange: {
                kind: 'absolute',
                fromStr: undefined,
                toStr: undefined,
                from,
                to,
            },
            linkTo: [],
        },
    };
})
    .case(actions_1.setAbsoluteRangeDatePicker, (state, { id, from, to }) => {
    const timerange = {
        kind: 'absolute',
        fromStr: undefined,
        toStr: undefined,
        from,
        to,
    };
    return helpers_1.updateInputTimerange(id, timerange, state);
})
    .case(actions_1.setRelativeRangeDatePicker, (state, { id, fromStr, from, to, toStr }) => {
    const timerange = {
        kind: 'relative',
        fromStr,
        toStr,
        from,
        to,
    };
    return helpers_1.updateInputTimerange(id, timerange, state);
})
    .case(actions_1.deleteAllQuery, (state, { id }) => ({
    ...state,
    [id]: {
        ...fp_1.get(id, state),
        query: state.global.query.slice(state.global.query.length),
    },
}))
    .case(actions_1.setQuery, (state, { inputId, id, loading, refetch }) => ({
    ...state,
    [inputId]: {
        ...fp_1.get(inputId, state),
        query: fp_1.unionBy('id', [{ id, loading, refetch }], state[inputId].query),
    },
}))
    .case(actions_1.setDuration, (state, { id, duration }) => ({
    ...state,
    [id]: {
        ...fp_1.get(id, state),
        policy: {
            ...fp_1.get(`${id}.policy`, state),
            duration,
        },
    },
}))
    .case(actions_1.startAutoReload, (state, { id }) => ({
    ...state,
    [id]: {
        ...fp_1.get(id, state),
        policy: {
            ...fp_1.get(`${id}.policy`, state),
            kind: 'interval',
        },
    },
}))
    .case(actions_1.stopAutoReload, (state, { id }) => ({
    ...state,
    [id]: {
        ...fp_1.get(id, state),
        policy: {
            ...fp_1.get(`${id}.policy`, state),
            kind: 'manual',
        },
    },
}))
    .case(actions_1.toggleTimelineLinkTo, (state, { linkToId }) => helpers_1.toggleLockTimeline(linkToId, state))
    .build();
