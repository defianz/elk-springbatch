"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_observable_1 = require("redux-observable");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const __1 = require("../..");
const time_1 = require("../../../../common/time");
const actions_1 = require("./actions");
const load_1 = require("./operations/load");
const load_more_1 = require("./operations/load_more");
const LOAD_CHUNK_SIZE = 200;
const DESIRED_BUFFER_PAGES = 2;
exports.createLogEntriesEpic = () => redux_observable_1.combineEpics(exports.createEntriesEffectsEpic(), load_1.loadEntriesEpic, load_more_1.loadMoreEntriesEpic);
exports.createEntriesEffectsEpic = () => (action$, state$, { selectLogEntriesStart, selectLogEntriesEnd, selectHasMoreLogEntriesBeforeStart, selectHasMoreLogEntriesAfterEnd, selectIsAutoReloadingLogEntries, selectIsLoadingLogEntries, selectLogFilterQueryAsJson, selectVisibleLogMidpointOrTarget, }) => {
    const filterQuery$ = state$.pipe(operators_1.map(selectLogFilterQueryAsJson));
    const visibleMidpointOrTarget$ = state$.pipe(operators_1.map(selectVisibleLogMidpointOrTarget), operators_1.filter(isNotNull), operators_1.map(time_1.pickTimeKey));
    const sourceId$ = action$.pipe(operators_1.filter(actions_1.setSourceId.match), operators_1.map(({ payload }) => payload));
    const shouldLoadAroundNewPosition$ = action$.pipe(operators_1.filter(__1.logPositionActions.jumpToTargetPosition.match), operators_1.withLatestFrom(state$), operators_1.filter(([{ payload }, state]) => {
        const entriesStart = selectLogEntriesStart(state);
        const entriesEnd = selectLogEntriesEnd(state);
        return entriesStart && entriesEnd
            ? !time_1.timeKeyIsBetween(entriesStart, entriesEnd, payload)
            : true;
    }), operators_1.map(([{ payload }]) => time_1.pickTimeKey(payload)));
    const shouldLoadWithNewFilter$ = action$.pipe(operators_1.filter(__1.logFilterActions.applyLogFilterQuery.match), operators_1.withLatestFrom(filterQuery$, (filterQuery, filterQueryString) => filterQueryString));
    const shouldReload$ = rxjs_1.merge(action$.pipe(operators_1.filter(actions_1.reloadEntries.match)), sourceId$);
    const shouldLoadMoreBefore$ = action$.pipe(operators_1.filter(__1.logPositionActions.reportVisiblePositions.match), operators_1.filter(({ payload: { pagesBeforeStart } }) => pagesBeforeStart < DESIRED_BUFFER_PAGES), operators_1.withLatestFrom(state$), operators_1.filter(([action, state]) => !selectIsAutoReloadingLogEntries(state) &&
        !selectIsLoadingLogEntries(state) &&
        selectHasMoreLogEntriesBeforeStart(state)), operators_1.map(([action, state]) => selectLogEntriesStart(state)), operators_1.filter(isNotNull), operators_1.map(time_1.pickTimeKey));
    const shouldLoadMoreAfter$ = rxjs_1.merge(action$.pipe(operators_1.filter(__1.logPositionActions.reportVisiblePositions.match), operators_1.filter(({ payload: { pagesAfterEnd } }) => pagesAfterEnd < DESIRED_BUFFER_PAGES), operators_1.withLatestFrom(state$, (action, state) => state), operators_1.filter(state => !selectIsAutoReloadingLogEntries(state) &&
        !selectIsLoadingLogEntries(state) &&
        selectHasMoreLogEntriesAfterEnd(state))), action$.pipe(operators_1.filter(actions_1.loadNewerEntries.match), operators_1.withLatestFrom(state$, (action, state) => state))).pipe(operators_1.map(state => selectLogEntriesEnd(state)), operators_1.filter(isNotNull), operators_1.map(time_1.pickTimeKey));
    return rxjs_1.merge(shouldLoadAroundNewPosition$.pipe(operators_1.withLatestFrom(filterQuery$, sourceId$), operators_1.exhaustMap(([timeKey, filterQuery, sourceId]) => [
        actions_1.loadEntries({
            sourceId,
            timeKey,
            countBefore: LOAD_CHUNK_SIZE,
            countAfter: LOAD_CHUNK_SIZE,
            filterQuery,
        }),
    ])), shouldLoadWithNewFilter$.pipe(operators_1.withLatestFrom(visibleMidpointOrTarget$, sourceId$), operators_1.exhaustMap(([filterQuery, timeKey, sourceId]) => [
        actions_1.loadEntries({
            sourceId,
            timeKey,
            countBefore: LOAD_CHUNK_SIZE,
            countAfter: LOAD_CHUNK_SIZE,
            filterQuery,
        }),
    ])), shouldReload$.pipe(operators_1.withLatestFrom(visibleMidpointOrTarget$, filterQuery$, sourceId$), operators_1.exhaustMap(([_, timeKey, filterQuery, sourceId]) => [
        actions_1.loadEntries({
            sourceId,
            timeKey,
            countBefore: LOAD_CHUNK_SIZE,
            countAfter: LOAD_CHUNK_SIZE,
            filterQuery,
        }),
    ])), shouldLoadMoreAfter$.pipe(operators_1.withLatestFrom(filterQuery$, sourceId$), operators_1.exhaustMap(([timeKey, filterQuery, sourceId]) => [
        actions_1.loadMoreEntries({
            sourceId,
            timeKey,
            countBefore: 0,
            countAfter: LOAD_CHUNK_SIZE,
            filterQuery,
        }),
    ])), shouldLoadMoreBefore$.pipe(operators_1.withLatestFrom(filterQuery$, sourceId$), operators_1.exhaustMap(([timeKey, filterQuery, sourceId]) => [
        actions_1.loadMoreEntries({
            sourceId,
            timeKey,
            countBefore: LOAD_CHUNK_SIZE,
            countAfter: 0,
            filterQuery,
        }),
    ])));
};
const isNotNull = (value) => value !== null;
