"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ANNOTATION_TYPE;
(function (ANNOTATION_TYPE) {
    ANNOTATION_TYPE["ANNOTATION"] = "annotation";
    ANNOTATION_TYPE["COMMENT"] = "comment";
})(ANNOTATION_TYPE = exports.ANNOTATION_TYPE || (exports.ANNOTATION_TYPE = {}));
exports.ANNOTATION_USER_UNKNOWN = '<user unknown>';
// UI enforced limit to the maximum number of characters that can be entered for an annotation.
exports.ANNOTATION_MAX_LENGTH_CHARS = 1000;
