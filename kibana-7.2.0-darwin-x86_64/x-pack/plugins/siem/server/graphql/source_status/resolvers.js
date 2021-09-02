"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSourceStatusResolvers = (libs) => ({
    SourceStatus: {
        async indicesExist(source, args, { req }) {
            return await libs.sourceStatus.hasIndices(req, args.defaultIndex);
        },
        async indexFields(source, args, { req }) {
            return libs.fields.getFields(req, args.defaultIndex);
        },
    },
});
