"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const PathReporter_1 = require("io-ts/lib/PathReporter");
const sources_1 = require("../../lib/sources");
const usage_collector_1 = require("../../usage/usage_collector");
const serialized_query_1 = require("../../utils/serialized_query");
exports.createLogEntriesResolvers = (libs) => ({
    InfraSource: {
        async logEntriesAround(source, args, { req }) {
            const countBefore = args.countBefore || 0;
            const countAfter = args.countAfter || 0;
            const { entriesBefore, entriesAfter } = await libs.logEntries.getLogEntriesAround(req, source.id, args.key, countBefore + 1, countAfter + 1, serialized_query_1.parseFilterQuery(args.filterQuery), args.highlightQuery || undefined);
            const hasMoreBefore = entriesBefore.length > countBefore;
            const hasMoreAfter = entriesAfter.length > countAfter;
            const entries = [
                ...(hasMoreBefore ? entriesBefore.slice(1) : entriesBefore),
                ...(hasMoreAfter ? entriesAfter.slice(0, -1) : entriesAfter),
            ];
            return {
                start: entries.length > 0 ? entries[0].key : null,
                end: entries.length > 0 ? entries[entries.length - 1].key : null,
                hasMoreBefore,
                hasMoreAfter,
                filterQuery: args.filterQuery,
                highlightQuery: args.highlightQuery,
                entries,
            };
        },
        async logEntriesBetween(source, args, { req }) {
            const entries = await libs.logEntries.getLogEntriesBetween(req, source.id, args.startKey, args.endKey, serialized_query_1.parseFilterQuery(args.filterQuery), args.highlightQuery || undefined);
            return {
                start: entries.length > 0 ? entries[0].key : null,
                end: entries.length > 0 ? entries[entries.length - 1].key : null,
                hasMoreBefore: true,
                hasMoreAfter: true,
                filterQuery: args.filterQuery,
                highlightQuery: args.highlightQuery,
                entries,
            };
        },
        async logSummaryBetween(source, args, { req }) {
            usage_collector_1.UsageCollector.countLogs();
            const buckets = await libs.logEntries.getLogSummaryBucketsBetween(req, source.id, args.start, args.end, args.bucketSize, serialized_query_1.parseFilterQuery(args.filterQuery));
            return {
                start: buckets.length > 0 ? buckets[0].start : null,
                end: buckets.length > 0 ? buckets[buckets.length - 1].end : null,
                buckets,
            };
        },
        async logItem(source, args, { req }) {
            const sourceConfiguration = sources_1.SourceConfigurationRuntimeType.decode(source.configuration).getOrElseL(errors => {
                throw new Error(PathReporter_1.failure(errors).join('\n'));
            });
            return await libs.logEntries.getLogItem(req, args.id, sourceConfiguration);
        },
    },
    InfraLogEntryColumn: {
        __resolveType(logEntryColumn) {
            if (isTimestampColumn(logEntryColumn)) {
                return 'InfraLogEntryTimestampColumn';
            }
            if (isMessageColumn(logEntryColumn)) {
                return 'InfraLogEntryMessageColumn';
            }
            if (isFieldColumn(logEntryColumn)) {
                return 'InfraLogEntryFieldColumn';
            }
            return null;
        },
    },
    InfraLogMessageSegment: {
        __resolveType(messageSegment) {
            if (isConstantSegment(messageSegment)) {
                return 'InfraLogMessageConstantSegment';
            }
            if (isFieldSegment(messageSegment)) {
                return 'InfraLogMessageFieldSegment';
            }
            return null;
        },
    },
});
const isTimestampColumn = (column) => 'timestamp' in column;
const isMessageColumn = (column) => 'message' in column;
const isFieldColumn = (column) => 'field' in column && 'value' in column;
const isConstantSegment = (segment) => 'constant' in segment;
const isFieldSegment = (segment) => 'field' in segment && 'value' in segment && 'highlights' in segment;
