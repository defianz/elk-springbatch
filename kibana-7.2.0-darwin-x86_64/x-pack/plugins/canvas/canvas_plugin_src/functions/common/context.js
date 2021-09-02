"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
function context() {
    const { help } = strings_1.getFunctionHelp().context;
    return {
        name: 'context',
        help,
        args: {},
        fn: obj => obj,
    };
}
exports.context = context;
