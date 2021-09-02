"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const PathReporter_1 = require("io-ts/lib/PathReporter");
const sources_1 = require("../../lib/sources");
exports.createSourcesResolvers = (libs) => ({
    Query: {
        async source(root, args, { req }) {
            const requestedSourceConfiguration = await libs.sources.getSourceConfiguration(req, args.id);
            return requestedSourceConfiguration;
        },
        async allSources(root, args, { req }) {
            const sourceConfigurations = await libs.sources.getAllSourceConfigurations(req);
            return sourceConfigurations;
        },
    },
    InfraSource: {
        async status(source) {
            return source;
        },
    },
    InfraSourceLogColumn: {
        __resolveType(logColumn) {
            if (sources_1.SavedSourceConfigurationTimestampColumnRuntimeType.is(logColumn)) {
                return 'InfraSourceTimestampLogColumn';
            }
            if (sources_1.SavedSourceConfigurationMessageColumnRuntimeType.is(logColumn)) {
                return 'InfraSourceMessageLogColumn';
            }
            if (sources_1.SavedSourceConfigurationFieldColumnRuntimeType.is(logColumn)) {
                return 'InfraSourceFieldLogColumn';
            }
            return null;
        },
    },
    Mutation: {
        async createSource(root, args, { req }) {
            const sourceConfiguration = await libs.sources.createSourceConfiguration(req, args.id, compactObject({
                ...args.sourceProperties,
                fields: args.sourceProperties.fields
                    ? compactObject(args.sourceProperties.fields)
                    : undefined,
                logColumns: decodeLogColumns(args.sourceProperties.logColumns),
            }));
            return {
                source: sourceConfiguration,
            };
        },
        async deleteSource(root, args, { req }) {
            await libs.sources.deleteSourceConfiguration(req, args.id);
            return {
                id: args.id,
            };
        },
        async updateSource(root, args, { req }) {
            const updatedSourceConfiguration = await libs.sources.updateSourceConfiguration(req, args.id, compactObject({
                ...args.sourceProperties,
                fields: args.sourceProperties.fields
                    ? compactObject(args.sourceProperties.fields)
                    : undefined,
                logColumns: decodeLogColumns(args.sourceProperties.logColumns),
            }));
            return {
                source: updatedSourceConfiguration,
            };
        },
    },
});
const compactObject = (obj) => Object.entries(obj).reduce((accumulatedObj, [key, value]) => typeof value === 'undefined' || value === null
    ? accumulatedObj
    : {
        ...accumulatedObj,
        [key]: value,
    }, {});
const decodeLogColumns = (logColumns) => logColumns
    ? logColumns.map(logColumn => sources_1.SavedSourceConfigurationColumnRuntimeType.decode(logColumn).getOrElseL(errors => {
        throw new apollo_server_errors_1.UserInputError(PathReporter_1.failure(errors).join('\n'));
    }))
    : undefined;
