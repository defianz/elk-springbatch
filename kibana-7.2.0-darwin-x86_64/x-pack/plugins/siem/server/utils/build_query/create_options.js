"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const serialized_query_1 = require("../serialized_query");
const _1 = require(".");
exports.createOptions = (source, args, info, fieldReplacement = 'edges.node.') => {
    const fields = _1.getFields(fp_1.getOr([], 'fieldNodes[0]', info));
    return {
        defaultIndex: args.defaultIndex,
        sourceConfiguration: source.configuration,
        timerange: args.timerange,
        pagination: args.pagination,
        sortField: args.sortField,
        filterQuery: serialized_query_1.parseFilterQuery(args.filterQuery || ''),
        fields: fields
            .filter(field => !field.includes('__typename'))
            .map(field => field.replace(fieldReplacement, '')),
    };
};
