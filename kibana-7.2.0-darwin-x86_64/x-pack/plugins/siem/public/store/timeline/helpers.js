"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fp_1 = require("lodash/fp");
const helpers_1 = require("../../components/timeline/body/helpers");
const model_1 = require("./model");
const EMPTY_TIMELINE_BY_ID = {}; // stable reference
exports.isNotNull = (value) => value !== null;
exports.initialTimelineState = {
    timelineById: EMPTY_TIMELINE_BY_ID,
    autoSavedWarningMsg: {
        timelineId: null,
        newTimelineModel: null,
    },
};
exports.addTimelineHistory = ({ id, historyId, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            historyIds: fp_1.uniq([...timeline.historyIds, historyId]),
        },
    };
};
exports.addTimelineNote = ({ id, noteId, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            noteIds: [...timeline.noteIds, noteId],
        },
    };
};
exports.addTimelineNoteToEvent = ({ id, noteId, eventId, timelineById, }) => {
    const timeline = timelineById[id];
    const existingNoteIds = fp_1.getOr([], `eventIdToNoteIds.${eventId}`, timeline);
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            eventIdToNoteIds: {
                ...timeline.eventIdToNoteIds,
                ...{ [eventId]: fp_1.uniq([...existingNoteIds, noteId]) },
            },
        },
    };
};
/** Adds a new `Timeline` to the provided collection of `TimelineById` */
exports.addNewTimeline = ({ columns, id, show = false, timelineById, }) => ({
    ...timelineById,
    [id]: {
        id,
        ...model_1.timelineDefaults,
        columns,
        show,
        savedObjectId: null,
        version: null,
        isSaving: false,
        isLoading: false,
    },
});
exports.pinTimelineEvent = ({ id, eventId, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            pinnedEventIds: {
                ...timeline.pinnedEventIds,
                ...{ [eventId]: true },
            },
        },
    };
};
exports.updateTimelineShowTimeline = ({ id, show, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            show,
        },
    };
};
exports.applyDeltaToCurrentWidth = ({ id, delta, bodyClientWidthPixels, minWidthPixels, maxWidthPercent, timelineById, }) => {
    const timeline = timelineById[id];
    const requestedWidth = timeline.width + delta * -1; // raw change in width
    const maxWidthPixels = (maxWidthPercent / 100) * bodyClientWidthPixels;
    const clampedWidth = Math.min(requestedWidth, maxWidthPixels);
    const width = Math.max(minWidthPixels, clampedWidth); // if the clamped width is smaller than the min, use the min
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            width,
        },
    };
};
const queryMatchCustomizer = (dp1, dp2) => {
    if (dp1.field === dp2.field && dp1.value === dp2.value && dp1.operator === dp2.operator) {
        return true;
    }
    return false;
};
const addAndToProviderInTimeline = (id, provider, timeline, timelineById) => {
    const alreadyExistsProviderIndex = timeline.dataProviders.findIndex(p => p.id === timeline.highlightedDropAndProviderId);
    const newProvider = timeline.dataProviders[alreadyExistsProviderIndex];
    const alreadyExistsAndProviderIndex = newProvider.and.findIndex(p => p.id === provider.id);
    const { and, ...andProvider } = provider;
    if (fp_1.isEqualWith(queryMatchCustomizer, newProvider.queryMatch, andProvider.queryMatch) ||
        (alreadyExistsAndProviderIndex === -1 &&
            newProvider.and.filter(itemAndProvider => fp_1.isEqualWith(queryMatchCustomizer, itemAndProvider.queryMatch, andProvider.queryMatch)).length > 0)) {
        return timelineById;
    }
    const dataProviders = [
        ...timeline.dataProviders.slice(0, alreadyExistsProviderIndex),
        {
            ...timeline.dataProviders[alreadyExistsProviderIndex],
            and: alreadyExistsAndProviderIndex > -1
                ? [
                    ...newProvider.and.slice(0, alreadyExistsAndProviderIndex),
                    andProvider,
                    ...newProvider.and.slice(alreadyExistsAndProviderIndex + 1),
                ]
                : [...newProvider.and, andProvider],
        },
        ...timeline.dataProviders.slice(alreadyExistsProviderIndex + 1),
    ];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders,
        },
    };
};
const addProviderToTimeline = (id, provider, timeline, timelineById) => {
    const alreadyExistsAtIndex = timeline.dataProviders.findIndex(p => p.id === provider.id);
    if (alreadyExistsAtIndex > -1 && !fp_1.isEmpty(timeline.dataProviders[alreadyExistsAtIndex].and)) {
        provider.id = `${provider.id}-${timeline.dataProviders.filter(p => p.id === provider.id).length}`;
    }
    const dataProviders = alreadyExistsAtIndex > -1 && fp_1.isEmpty(timeline.dataProviders[alreadyExistsAtIndex].and)
        ? [
            ...timeline.dataProviders.slice(0, alreadyExistsAtIndex),
            provider,
            ...timeline.dataProviders.slice(alreadyExistsAtIndex + 1),
        ]
        : [...timeline.dataProviders, provider];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders,
        },
    };
};
/**
 * Adds or updates a column. When updating a column, it will be moved to the
 * new index
 */
exports.upsertTimelineColumn = ({ column, id, index, timelineById, }) => {
    const timeline = timelineById[id];
    const alreadyExistsAtIndex = timeline.columns.findIndex(c => c.id === column.id);
    if (alreadyExistsAtIndex !== -1) {
        // remove the existing entry and add the new one at the specified index
        const reordered = timeline.columns.filter(c => c.id !== column.id);
        reordered.splice(index, 0, column); // ⚠️ mutation
        return {
            ...timelineById,
            [id]: {
                ...timeline,
                columns: reordered,
            },
        };
    }
    // add the new entry at the specified index
    const columns = [...timeline.columns];
    columns.splice(index, 0, column); // ⚠️ mutation
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            columns,
        },
    };
};
exports.removeTimelineColumn = ({ id, columnId, timelineById, }) => {
    const timeline = timelineById[id];
    const columns = timeline.columns.filter(c => c.id !== columnId);
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            columns,
        },
    };
};
exports.applyDeltaToTimelineColumnWidth = ({ id, columnId, delta, timelineById, }) => {
    const timeline = timelineById[id];
    const columnIndex = timeline.columns.findIndex(c => c.id === columnId);
    if (columnIndex === -1) {
        // the column was not found
        return {
            ...timelineById,
            [id]: {
                ...timeline,
            },
        };
    }
    const minWidthPixels = helpers_1.getColumnWidthFromType(timeline.columns[columnIndex].type);
    const requestedWidth = timeline.columns[columnIndex].width + delta; // raw change in width
    const width = Math.max(minWidthPixels, requestedWidth); // if the requested width is smaller than the min, use the min
    const columnWithNewWidth = {
        ...timeline.columns[columnIndex],
        width,
    };
    const columns = [
        ...timeline.columns.slice(0, columnIndex),
        columnWithNewWidth,
        ...timeline.columns.slice(columnIndex + 1),
    ];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            columns,
        },
    };
};
exports.addTimelineProvider = ({ id, provider, timelineById, }) => {
    const timeline = timelineById[id];
    if (timeline.highlightedDropAndProviderId !== '') {
        return addAndToProviderInTimeline(id, provider, timeline, timelineById);
    }
    else {
        return addProviderToTimeline(id, provider, timeline, timelineById);
    }
};
exports.applyKqlFilterQueryDraft = ({ id, filterQuery, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            kqlQuery: {
                ...timeline.kqlQuery,
                filterQuery,
            },
        },
    };
};
exports.updateTimelineKqlMode = ({ id, kqlMode, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            kqlMode,
        },
    };
};
exports.updateKqlFilterQueryDraft = ({ id, filterQueryDraft, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            kqlQuery: {
                ...timeline.kqlQuery,
                filterQueryDraft,
            },
        },
    };
};
exports.updateTimelineColumns = ({ id, columns, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            columns,
        },
    };
};
exports.updateTimelineDescription = ({ id, description, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            description: description.endsWith(' ') ? `${description.trim()} ` : description.trim(),
        },
    };
};
exports.updateTimelineTitle = ({ id, title, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            title: title.endsWith(' ') ? `${title.trim()} ` : title.trim(),
        },
    };
};
exports.updateTimelineIsFavorite = ({ id, isFavorite, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            isFavorite,
        },
    };
};
exports.updateTimelineIsLive = ({ id, isLive, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            isLive,
        },
    };
};
exports.updateTimelineProviders = ({ id, providers, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: providers,
        },
    };
};
exports.updateTimelineRange = ({ id, start, end, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dateRange: {
                start,
                end,
            },
        },
    };
};
exports.updateTimelineSort = ({ id, sort, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            sort,
        },
    };
};
const updateEnabledAndProvider = (andProviderId, enabled, providerId, timeline) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        and: provider.and.map(andProvider => andProvider.id === andProviderId ? { ...andProvider, enabled } : andProvider),
    }
    : provider);
const updateEnabledProvider = (enabled, providerId, timeline) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        enabled,
    }
    : provider);
exports.updateTimelineProviderEnabled = ({ id, providerId, enabled, timelineById, andProviderId, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: andProviderId
                ? updateEnabledAndProvider(andProviderId, enabled, providerId, timeline)
                : updateEnabledProvider(enabled, providerId, timeline),
        },
    };
};
const updateExcludedAndProvider = (andProviderId, excluded, providerId, timeline) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        and: provider.and.map(andProvider => andProvider.id === andProviderId ? { ...andProvider, excluded } : andProvider),
    }
    : provider);
const updateExcludedProvider = (excluded, providerId, timeline) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        excluded,
    }
    : provider);
exports.updateTimelineProviderExcluded = ({ id, providerId, excluded, timelineById, andProviderId, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: andProviderId
                ? updateExcludedAndProvider(andProviderId, excluded, providerId, timeline)
                : updateExcludedProvider(excluded, providerId, timeline),
        },
    };
};
const updateProviderProperties = ({ excluded, field, operator, providerId, timeline, value, }) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        excluded,
        queryMatch: {
            ...provider.queryMatch,
            field,
            displayField: field,
            value,
            displayValue: value,
            operator,
        },
    }
    : provider);
const updateAndProviderProperties = ({ andProviderId, excluded, field, operator, providerId, timeline, value, }) => timeline.dataProviders.map(provider => provider.id === providerId
    ? {
        ...provider,
        and: provider.and.map(andProvider => andProvider.id === andProviderId
            ? {
                ...andProvider,
                excluded,
                queryMatch: {
                    ...andProvider.queryMatch,
                    field,
                    displayField: field,
                    value,
                    displayValue: value,
                    operator,
                },
            }
            : andProvider),
    }
    : provider);
exports.updateTimelineProviderProperties = ({ andProviderId, excluded, field, id, operator, providerId, timelineById, value, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: andProviderId
                ? updateAndProviderProperties({
                    andProviderId,
                    excluded,
                    field,
                    operator,
                    providerId,
                    timeline,
                    value,
                })
                : updateProviderProperties({
                    excluded,
                    field,
                    operator,
                    providerId,
                    timeline,
                    value,
                }),
        },
    };
};
exports.updateTimelineProviderKqlQuery = ({ id, providerId, kqlQuery, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: timeline.dataProviders.map(provider => provider.id === providerId ? { ...provider, ...{ kqlQuery } } : provider),
        },
    };
};
exports.updateTimelineItemsPerPage = ({ id, itemsPerPage, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            itemsPerPage,
        },
    };
};
exports.updateTimelinePageIndex = ({ id, activePage, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            activePage,
        },
    };
};
exports.updateTimelinePerPageOptions = ({ id, itemsPerPageOptions, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            itemsPerPageOptions,
        },
    };
};
const removeAndProvider = (andProviderId, providerId, timeline) => {
    const providerIndex = timeline.dataProviders.findIndex(p => p.id === providerId);
    const providerAndIndex = timeline.dataProviders[providerIndex].and.findIndex(p => p.id === andProviderId);
    return [
        ...timeline.dataProviders.slice(0, providerIndex),
        {
            ...timeline.dataProviders[providerIndex],
            and: [
                ...timeline.dataProviders[providerIndex].and.slice(0, providerAndIndex),
                ...timeline.dataProviders[providerIndex].and.slice(providerAndIndex + 1),
            ],
        },
        ...timeline.dataProviders.slice(providerIndex + 1),
    ];
};
const removeProvider = (providerId, timeline) => {
    const providerIndex = timeline.dataProviders.findIndex(p => p.id === providerId);
    return [
        ...timeline.dataProviders.slice(0, providerIndex),
        ...(timeline.dataProviders[providerIndex].and.length
            ? [
                {
                    ...timeline.dataProviders[providerIndex].and.slice(0, 1)[0],
                    and: [...timeline.dataProviders[providerIndex].and.slice(1)],
                },
            ]
            : []),
        ...timeline.dataProviders.slice(providerIndex + 1),
    ];
};
exports.removeTimelineProvider = ({ id, providerId, timelineById, andProviderId, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            dataProviders: andProviderId
                ? removeAndProvider(andProviderId, providerId, timeline)
                : removeProvider(providerId, timeline),
        },
    };
};
exports.unPinTimelineEvent = ({ id, eventId, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            pinnedEventIds: fp_1.omit(eventId, timeline.pinnedEventIds),
        },
    };
};
exports.updateHighlightedDropAndProvider = ({ id, providerId, timelineById, }) => {
    const timeline = timelineById[id];
    return {
        ...timelineById,
        [id]: {
            ...timeline,
            highlightedDropAndProviderId: providerId,
        },
    };
};
