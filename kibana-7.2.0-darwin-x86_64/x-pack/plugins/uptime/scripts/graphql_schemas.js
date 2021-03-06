"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const graphql_1 = require("../server/graphql");
exports.schemas = [...graphql_1.typeDefs];
// this default export is used to feed the combined types to the gql-gen tool
// which generates the corresponding typescript types
// eslint-disable-next-line import/no-default-export
exports.default = graphql_tools_1.buildSchemaFromTypeDefinitions(exports.schemas);
