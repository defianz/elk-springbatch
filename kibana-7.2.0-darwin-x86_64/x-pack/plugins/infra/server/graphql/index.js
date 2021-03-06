"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_gql_1 = require("../../common/graphql/root/schema.gql");
const schema_gql_2 = require("../../common/graphql/shared/schema.gql");
const schema_gql_3 = require("./log_entries/schema.gql");
const schema_gql_4 = require("./metadata/schema.gql");
const schema_gql_5 = require("./metrics/schema.gql");
const schema_gql_6 = require("./snapshot/schema.gql");
const schema_gql_7 = require("./source_status/schema.gql");
const schema_gql_8 = require("./sources/schema.gql");
exports.schemas = [
    schema_gql_1.rootSchema,
    schema_gql_2.sharedSchema,
    schema_gql_4.metadataSchema,
    schema_gql_3.logEntriesSchema,
    schema_gql_6.snapshotSchema,
    schema_gql_8.sourcesSchema,
    schema_gql_7.sourceStatusSchema,
    schema_gql_5.metricsSchema,
];
