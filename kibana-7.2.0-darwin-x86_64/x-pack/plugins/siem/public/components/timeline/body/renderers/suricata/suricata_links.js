"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const suricata_sid_db_1 = require("suricata-sid-db");
exports.getLinksFromSignature = (id) => {
    const refs = suricata_sid_db_1.db[id];
    if (refs != null) {
        return fp_1.uniq(refs);
    }
    else {
        return [];
    }
};
const specialTokenRules = ['IPv4', 'IPv6'];
exports.getBeginningTokens = (signature) => {
    const signatureSplit = signature.trim().split(' ');
    return signatureSplit.reduce((accum, curr, index) => {
        if ((accum.length === index && curr === curr.toUpperCase() && curr !== '') ||
            specialTokenRules.includes(curr)) {
            accum = accum.concat(curr);
        }
        return accum;
    }, []);
};
