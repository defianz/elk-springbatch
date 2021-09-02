"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n = tslib_1.__importStar(require("./translations"));
/** Enables runtime enumeration of valid `Range`s */
exports.Ranges = [i18n.ONE_DAY, i18n.ONE_WEEK, i18n.ONE_MONTH, i18n.ONE_YEAR];
