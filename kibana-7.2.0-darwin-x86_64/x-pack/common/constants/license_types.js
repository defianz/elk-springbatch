"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LICENSE_TYPE_BASIC = 'basic';
exports.LICENSE_TYPE_STANDARD = 'standard';
exports.LICENSE_TYPE_GOLD = 'gold';
exports.LICENSE_TYPE_PLATINUM = 'platinum';
exports.LICENSE_TYPE_TRIAL = 'trial';
// These are ordered from least featureful to most featureful, so we can assume that someone holding
// a license at a particular index cannot access any features unlocked by the licenses that follow it.
exports.RANKED_LICENSE_TYPES = [
    exports.LICENSE_TYPE_BASIC,
    exports.LICENSE_TYPE_STANDARD,
    exports.LICENSE_TYPE_GOLD,
    exports.LICENSE_TYPE_PLATINUM,
    exports.LICENSE_TYPE_TRIAL,
];
