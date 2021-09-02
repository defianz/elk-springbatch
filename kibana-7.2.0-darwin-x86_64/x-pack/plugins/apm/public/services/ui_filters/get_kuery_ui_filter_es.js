"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kuery_1 = require("../kuery");
async function getKueryUiFilterES(kuery) {
    if (!kuery) {
        return;
    }
    const indexPattern = await kuery_1.getAPMIndexPatternForKuery();
    if (!indexPattern) {
        return;
    }
    return kuery_1.convertKueryToEsQuery(kuery, indexPattern);
}
exports.getKueryUiFilterES = getKueryUiFilterES;
