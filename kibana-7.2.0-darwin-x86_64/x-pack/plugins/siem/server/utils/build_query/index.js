"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./fields"), exports);
tslib_1.__exportStar(require("./filters"), exports);
tslib_1.__exportStar(require("./merge_fields_with_hits"), exports);
exports.assertUnreachable = (x, message = 'Unknown Field in switch statement') => {
    throw new Error(`${message} ${x}`);
};
