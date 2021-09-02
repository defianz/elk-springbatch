"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidNode = async (search, indexPattern, field, id) => {
    const params = {
        index: indexPattern,
        terminateAfter: 1,
        body: {
            size: 0,
            query: {
                match: {
                    [field]: id,
                },
            },
        },
    };
    const response = await search(params);
    return response.hits.total.value > 0;
};
