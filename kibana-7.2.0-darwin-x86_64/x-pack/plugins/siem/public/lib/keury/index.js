"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const es_query_1 = require("@kbn/es-query");
const fp_1 = require("lodash/fp");
exports.convertKueryToElasticSearchQuery = (kueryExpression, indexPattern) => {
    try {
        return kueryExpression
            ? JSON.stringify(es_query_1.toElasticsearchQuery(es_query_1.fromKueryExpression(kueryExpression), indexPattern))
            : '';
    }
    catch (err) {
        return '';
    }
};
exports.escapeQueryValue = (val = '') => {
    if (fp_1.isString(val)) {
        if (fp_1.isEmpty(val)) {
            return '""';
        }
        return exports.escapeKuery(val);
    }
    return val;
};
exports.isFromKueryExpressionValid = (kqlFilterQuery) => {
    if (kqlFilterQuery && kqlFilterQuery.kind === 'kuery') {
        try {
            es_query_1.fromKueryExpression(kqlFilterQuery.expression);
        }
        catch (err) {
            return false;
        }
    }
    return true;
};
const escapeWhitespace = (val) => val
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n');
// See the SpecialCharacter rule in kuery.peg
const escapeSpecialCharacters = (val) => val.replace(/[\\():<>"*]/g, '\\$&'); // $& means the whole matched string
// See the Keyword rule in kuery.peg
const escapeAndOr = (val) => val.replace(/(\s+)(and|or)(\s+)/gi, '$1\\$2$3');
const escapeNot = (val) => val.replace(/not(\s+)/gi, '\\$&');
exports.escapeKuery = fp_1.flow(escapeSpecialCharacters, escapeAndOr, escapeNot, escapeWhitespace);
