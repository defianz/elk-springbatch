"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const json_stable_stringify_1 = tslib_1.__importDefault(require("json-stable-stringify"));
const lodash_1 = require("lodash");
const sources_1 = require("../../sources");
const builtin_rules_1 = require("./builtin_rules");
const convert_document_source_to_log_item_fields_1 = require("./convert_document_source_to_log_item_fields");
const message_1 = require("./message");
class InfraLogEntriesDomain {
    constructor(adapter, libs) {
        this.adapter = adapter;
        this.libs = libs;
    }
    async getLogEntriesAround(request, sourceId, key, maxCountBefore, maxCountAfter, filterQuery, highlightQuery) {
        if (maxCountBefore <= 0 && maxCountAfter <= 0) {
            return {
                entriesBefore: [],
                entriesAfter: [],
            };
        }
        const { configuration } = await this.libs.sources.getSourceConfiguration(request, sourceId);
        const messageFormattingRules = message_1.compileFormattingRules(builtin_rules_1.getBuiltinRules(configuration.fields.message));
        const requiredFields = getRequiredFields(configuration, messageFormattingRules);
        const documentsBefore = await this.adapter.getAdjacentLogEntryDocuments(request, configuration, requiredFields, key, 'desc', Math.max(maxCountBefore, 1), filterQuery, highlightQuery);
        const lastKeyBefore = documentsBefore.length > 0
            ? documentsBefore[documentsBefore.length - 1].key
            : {
                time: key.time - 1,
                tiebreaker: 0,
            };
        const documentsAfter = await this.adapter.getAdjacentLogEntryDocuments(request, configuration, requiredFields, lastKeyBefore, 'asc', maxCountAfter, filterQuery, highlightQuery);
        return {
            entriesBefore: (maxCountBefore > 0 ? documentsBefore : []).map(convertLogDocumentToEntry(sourceId, configuration.logColumns, messageFormattingRules.format)),
            entriesAfter: documentsAfter.map(convertLogDocumentToEntry(sourceId, configuration.logColumns, messageFormattingRules.format)),
        };
    }
    async getLogEntriesBetween(request, sourceId, startKey, endKey, filterQuery, highlightQuery) {
        const { configuration } = await this.libs.sources.getSourceConfiguration(request, sourceId);
        const messageFormattingRules = message_1.compileFormattingRules(builtin_rules_1.getBuiltinRules(configuration.fields.message));
        const requiredFields = getRequiredFields(configuration, messageFormattingRules);
        const documents = await this.adapter.getContainedLogEntryDocuments(request, configuration, requiredFields, startKey, endKey, filterQuery, highlightQuery);
        const entries = documents.map(convertLogDocumentToEntry(sourceId, configuration.logColumns, messageFormattingRules.format));
        return entries;
    }
    async getLogSummaryBucketsBetween(request, sourceId, start, end, bucketSize, filterQuery) {
        const { configuration } = await this.libs.sources.getSourceConfiguration(request, sourceId);
        const dateRangeBuckets = await this.adapter.getContainedLogSummaryBuckets(request, configuration, start, end, bucketSize, filterQuery);
        const buckets = dateRangeBuckets.map(convertDateRangeBucketToSummaryBucket);
        return buckets;
    }
    async getLogItem(request, id, sourceConfiguration) {
        const document = await this.adapter.getLogItem(request, id, sourceConfiguration);
        const defaultFields = [
            { field: '_index', value: document._index },
            { field: '_id', value: document._id },
        ];
        return {
            id: document._id,
            index: document._index,
            key: {
                time: document.sort[0],
                tiebreaker: document.sort[1],
            },
            fields: lodash_1.sortBy([...defaultFields, ...convert_document_source_to_log_item_fields_1.convertDocumentSourceToLogItemFields(document._source)], 'field'),
        };
    }
}
exports.InfraLogEntriesDomain = InfraLogEntriesDomain;
const convertLogDocumentToEntry = (sourceId, logColumns, formatLogMessage) => (document) => ({
    key: document.key,
    gid: document.gid,
    source: sourceId,
    columns: logColumns.map(logColumn => {
        if (sources_1.SavedSourceConfigurationTimestampColumnRuntimeType.is(logColumn)) {
            return {
                timestamp: document.key.time,
            };
        }
        else if (sources_1.SavedSourceConfigurationMessageColumnRuntimeType.is(logColumn)) {
            return {
                message: formatLogMessage(document.fields),
            };
        }
        else {
            return {
                field: logColumn.fieldColumn.field,
                value: json_stable_stringify_1.default(document.fields[logColumn.fieldColumn.field] || null),
            };
        }
    }),
});
const convertDateRangeBucketToSummaryBucket = (bucket) => ({
    entriesCount: bucket.doc_count,
    start: bucket.from || 0,
    end: bucket.to || 0,
});
const getRequiredFields = (configuration, messageFormattingRules) => {
    const fieldsFromCustomColumns = configuration.logColumns.reduce((accumulatedFields, logColumn) => {
        if (sources_1.SavedSourceConfigurationFieldColumnRuntimeType.is(logColumn)) {
            return [...accumulatedFields, logColumn.fieldColumn.field];
        }
        return accumulatedFields;
    }, []);
    const fieldsFromFormattingRules = messageFormattingRules.requiredFields;
    return Array.from(new Set([...fieldsFromCustomColumns, ...fieldsFromFormattingRules]));
};
