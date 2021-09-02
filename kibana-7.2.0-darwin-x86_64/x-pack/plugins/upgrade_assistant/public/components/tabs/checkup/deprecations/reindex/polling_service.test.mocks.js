"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../../../../common/types");
exports.mockClient = {
    post: jest.fn().mockResolvedValue({
        lastCompletedStep: types_1.ReindexStep.created,
        status: types_1.ReindexStatus.inProgress,
    }),
    get: jest.fn().mockResolvedValue({
        status: 200,
        data: {
            warnings: [],
            reindexOp: null,
        },
    }),
};
jest.mock('axios', () => ({
    create: jest.fn().mockReturnValue(exports.mockClient),
}));
