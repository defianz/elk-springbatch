"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.parseQueryValue = (value) => {
    if (value == null) {
        return '';
    }
    else if (fp_1.isObject(value)) {
        return JSON.stringify(value);
    }
    else if (fp_1.isNumber(value)) {
        return value;
    }
    return value.toString();
};
