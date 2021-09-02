"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_1 = require("./resolvers");
exports.createEsValueResolvers = resolvers_1.createEsValueResolvers;
exports.createEventsResolvers = resolvers_1.createEventsResolvers;
var schema_gql_1 = require("./schema.gql");
exports.eventsSchema = schema_gql_1.eventsSchema;
