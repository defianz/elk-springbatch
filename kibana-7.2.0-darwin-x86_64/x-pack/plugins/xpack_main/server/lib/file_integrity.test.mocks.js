"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
jest.doMock('fs', () => ({
    createReadStream(filepath) {
        if (filepath === 'ERROR') {
            throw new Error('MOCK ERROR - Invalid Path');
        }
        const readableStream = new stream_1.Readable();
        const streamData = filepath.split('');
        let cursor = 0;
        readableStream._read = function (size) {
            const current = streamData[cursor++];
            if (typeof current === 'undefined') {
                return this.push(null);
            }
            this.push(current);
        };
        return readableStream;
    },
}));
