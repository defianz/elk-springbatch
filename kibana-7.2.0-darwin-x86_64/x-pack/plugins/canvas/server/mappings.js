"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore converting /libs/constants to TS breaks CI
const constants_1 = require("../common/lib/constants");
exports.mappings = {
    [constants_1.CANVAS_TYPE]: {
        dynamic: false,
        properties: {
            name: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                    },
                },
            },
            '@timestamp': { type: 'date' },
            '@created': { type: 'date' },
        },
    },
    [constants_1.CUSTOM_ELEMENT_TYPE]: {
        dynamic: false,
        properties: {
            name: {
                type: 'text',
                fields: {
                    keyword: {
                        type: 'keyword',
                    },
                },
            },
            help: { type: 'text' },
            content: { type: 'text' },
            image: { type: 'text' },
            '@timestamp': { type: 'date' },
            '@created': { type: 'date' },
        },
    },
};
