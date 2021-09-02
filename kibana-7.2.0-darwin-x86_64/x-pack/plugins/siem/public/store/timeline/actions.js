"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/siem/local/timeline');
exports.addHistory = actionCreator('ADD_HISTORY');
exports.addNote = actionCreator('ADD_NOTE');
exports.addNoteToEvent = actionCreator('ADD_NOTE_TO_EVENT');
exports.upsertColumn = actionCreator('UPSERT_COLUMN');
exports.addProvider = actionCreator('ADD_PROVIDER');
exports.applyDeltaToWidth = actionCreator('APPLY_DELTA_TO_WIDTH');
exports.applyDeltaToColumnWidth = actionCreator('APPLY_DELTA_TO_COLUMN_WIDTH');
exports.createTimeline = actionCreator('CREATE_TIMELINE');
exports.pinEvent = actionCreator('PIN_EVENT');
exports.removeColumn = actionCreator('REMOVE_COLUMN');
exports.removeProvider = actionCreator('REMOVE_PROVIDER');
exports.showTimeline = actionCreator('SHOW_TIMELINE');
exports.unPinEvent = actionCreator('UN_PIN_EVENT');
exports.updateTimeline = actionCreator('UPDATE_TIMELINE');
exports.addTimeline = actionCreator('ADD_TIMELINE');
exports.startTimelineSaving = actionCreator('START_TIMELINE_SAVING');
exports.endTimelineSaving = actionCreator('END_TIMELINE_SAVING');
exports.updateIsLoading = actionCreator('UPDATE_LOADING');
exports.updateColumns = actionCreator('UPDATE_COLUMNS');
exports.updateDataProviderEnabled = actionCreator('TOGGLE_PROVIDER_ENABLED');
exports.updateDataProviderExcluded = actionCreator('TOGGLE_PROVIDER_EXCLUDED');
exports.dataProviderEdited = actionCreator('DATA_PROVIDER_EDITED');
exports.updateDataProviderKqlQuery = actionCreator('PROVIDER_EDIT_KQL_QUERY');
exports.updateHighlightedDropAndProviderId = actionCreator('UPDATE_DROP_AND_PROVIDER');
exports.updateDescription = actionCreator('UPDATE_DESCRIPTION');
exports.updateKqlMode = actionCreator('UPDATE_KQL_MODE');
exports.setKqlFilterQueryDraft = actionCreator('SET_KQL_FILTER_QUERY_DRAFT');
exports.applyKqlFilterQuery = actionCreator('APPLY_KQL_FILTER_QUERY');
exports.updateIsFavorite = actionCreator('UPDATE_IS_FAVORITE');
exports.updateIsLive = actionCreator('UPDATE_IS_LIVE');
exports.updateItemsPerPage = actionCreator('UPDATE_ITEMS_PER_PAGE');
exports.updateItemsPerPageOptions = actionCreator('UPDATE_ITEMS_PER_PAGE_OPTIONS');
exports.updateTitle = actionCreator('UPDATE_TITLE');
exports.updatePageIndex = actionCreator('UPDATE_PAGE_INDEX');
exports.updateProviders = actionCreator('UPDATE_PROVIDERS');
exports.updateRange = actionCreator('UPDATE_RANGE');
exports.updateSort = actionCreator('UPDATE_SORT');
exports.updateAutoSaveMsg = actionCreator('UPDATE_AUTO_SAVE');
