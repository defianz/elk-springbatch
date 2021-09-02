"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-empty-interface */
const runtimeTypes = tslib_1.__importStar(require("io-ts"));
const framework_1 = require("../framework");
const types_1 = require("../note/types");
const types_2 = require("../pinned_event/types");
/*
 *  ColumnHeader Types
 */
const SavedColumnHeaderRuntimeType = runtimeTypes.partial({
    aggregatable: framework_1.unionWithNullType(runtimeTypes.boolean),
    category: framework_1.unionWithNullType(runtimeTypes.string),
    columnHeaderType: framework_1.unionWithNullType(runtimeTypes.string),
    description: framework_1.unionWithNullType(runtimeTypes.string),
    example: framework_1.unionWithNullType(runtimeTypes.string),
    indexes: framework_1.unionWithNullType(runtimeTypes.array(runtimeTypes.string)),
    id: framework_1.unionWithNullType(runtimeTypes.string),
    name: framework_1.unionWithNullType(runtimeTypes.string),
    placeholder: framework_1.unionWithNullType(runtimeTypes.string),
    searchable: framework_1.unionWithNullType(runtimeTypes.boolean),
    type: framework_1.unionWithNullType(runtimeTypes.string),
});
/*
 *  DataProvider Types
 */
const SavedDataProviderQueryMatchBasicRuntimeType = runtimeTypes.partial({
    field: framework_1.unionWithNullType(runtimeTypes.string),
    displayField: framework_1.unionWithNullType(runtimeTypes.string),
    value: framework_1.unionWithNullType(runtimeTypes.string),
    displayValue: framework_1.unionWithNullType(runtimeTypes.string),
    operator: framework_1.unionWithNullType(runtimeTypes.string),
});
const SavedDataProviderQueryMatchRuntimeType = runtimeTypes.partial({
    id: framework_1.unionWithNullType(runtimeTypes.string),
    name: framework_1.unionWithNullType(runtimeTypes.string),
    enabled: framework_1.unionWithNullType(runtimeTypes.boolean),
    excluded: framework_1.unionWithNullType(runtimeTypes.boolean),
    kqlQuery: framework_1.unionWithNullType(runtimeTypes.string),
    queryMatch: framework_1.unionWithNullType(SavedDataProviderQueryMatchBasicRuntimeType),
});
const SavedDataProviderRuntimeType = runtimeTypes.partial({
    id: framework_1.unionWithNullType(runtimeTypes.string),
    name: framework_1.unionWithNullType(runtimeTypes.string),
    enabled: framework_1.unionWithNullType(runtimeTypes.boolean),
    excluded: framework_1.unionWithNullType(runtimeTypes.boolean),
    kqlQuery: framework_1.unionWithNullType(runtimeTypes.string),
    queryMatch: framework_1.unionWithNullType(SavedDataProviderQueryMatchBasicRuntimeType),
    and: framework_1.unionWithNullType(runtimeTypes.array(SavedDataProviderQueryMatchRuntimeType)),
});
/*
 *  kqlQuery -> filterQuery Types
 */
const SavedKueryFilterQueryRuntimeType = runtimeTypes.partial({
    kind: framework_1.unionWithNullType(runtimeTypes.string),
    expression: framework_1.unionWithNullType(runtimeTypes.string),
});
const SavedSerializedFilterQueryQueryRuntimeType = runtimeTypes.partial({
    kuery: framework_1.unionWithNullType(SavedKueryFilterQueryRuntimeType),
    serializedQuery: framework_1.unionWithNullType(runtimeTypes.string),
});
const SavedFilterQueryQueryRuntimeType = runtimeTypes.partial({
    filterQuery: framework_1.unionWithNullType(SavedSerializedFilterQueryQueryRuntimeType),
});
/*
 *  DatePicker Range Types
 */
const SavedDateRangePickerRuntimeType = runtimeTypes.partial({
    start: framework_1.unionWithNullType(runtimeTypes.number),
    end: framework_1.unionWithNullType(runtimeTypes.number),
});
/*
 *  Favorite Types
 */
const SavedFavoriteRuntimeType = runtimeTypes.partial({
    keySearch: framework_1.unionWithNullType(runtimeTypes.string),
    favoriteDate: framework_1.unionWithNullType(runtimeTypes.number),
    fullName: framework_1.unionWithNullType(runtimeTypes.string),
    userName: framework_1.unionWithNullType(runtimeTypes.string),
});
/*
 *  Sort Types
 */
const SavedSortRuntimeType = runtimeTypes.partial({
    columnId: framework_1.unionWithNullType(runtimeTypes.string),
    sortDirection: framework_1.unionWithNullType(runtimeTypes.string),
});
/*
 *  Timeline Types
 */
exports.SavedTimelineRuntimeType = runtimeTypes.partial({
    columns: framework_1.unionWithNullType(runtimeTypes.array(SavedColumnHeaderRuntimeType)),
    dataProviders: framework_1.unionWithNullType(runtimeTypes.array(SavedDataProviderRuntimeType)),
    description: framework_1.unionWithNullType(runtimeTypes.string),
    favorite: framework_1.unionWithNullType(runtimeTypes.array(SavedFavoriteRuntimeType)),
    kqlMode: framework_1.unionWithNullType(runtimeTypes.string),
    kqlQuery: framework_1.unionWithNullType(SavedFilterQueryQueryRuntimeType),
    title: framework_1.unionWithNullType(runtimeTypes.string),
    dateRange: framework_1.unionWithNullType(SavedDateRangePickerRuntimeType),
    sort: framework_1.unionWithNullType(SavedSortRuntimeType),
    created: framework_1.unionWithNullType(runtimeTypes.number),
    createdBy: framework_1.unionWithNullType(runtimeTypes.string),
    updated: framework_1.unionWithNullType(runtimeTypes.number),
    updatedBy: framework_1.unionWithNullType(runtimeTypes.string),
});
/**
 * Timeline Saved object type with metadata
 */
exports.TimelineSavedObjectRuntimeType = runtimeTypes.intersection([
    runtimeTypes.type({
        id: runtimeTypes.string,
        attributes: exports.SavedTimelineRuntimeType,
        version: runtimeTypes.string,
    }),
    runtimeTypes.partial({
        savedObjectId: runtimeTypes.string,
    }),
]);
exports.TimelineSavedToReturnObjectRuntimeType = runtimeTypes.intersection([
    exports.SavedTimelineRuntimeType,
    runtimeTypes.type({
        savedObjectId: runtimeTypes.string,
        version: runtimeTypes.string,
    }),
    runtimeTypes.partial({
        eventIdToNoteIds: runtimeTypes.array(types_1.NoteSavedObjectToReturnRuntimeType),
        noteIds: runtimeTypes.array(runtimeTypes.string),
        notes: runtimeTypes.array(types_1.NoteSavedObjectToReturnRuntimeType),
        pinnedEventIds: runtimeTypes.array(runtimeTypes.string),
        pinnedEventsSaveObject: runtimeTypes.array(types_2.PinnedEventToReturnSavedObjectRuntimeType),
    }),
]);
/**
 * All Timeline Saved object type with metadata
 */
exports.AllTimelineSavedObjectRuntimeType = runtimeTypes.type({
    total: runtimeTypes.number,
    data: exports.TimelineSavedToReturnObjectRuntimeType,
});
