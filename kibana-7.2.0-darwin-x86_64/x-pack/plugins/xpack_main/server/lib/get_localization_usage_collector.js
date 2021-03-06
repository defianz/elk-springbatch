"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
// @ts-ignore
const constants_1 = require("../../common/constants");
const file_integrity_1 = require("./file_integrity");
async function getTranslationCount(loader, locale) {
    const translations = await loader.getTranslationsByLocale(locale);
    return lodash_1.size(translations.messages);
}
exports.getTranslationCount = getTranslationCount;
function createCollectorFetch(server) {
    return async function fetchUsageStats() {
        const config = server.config();
        const locale = config.get('i18n.locale');
        const translationFilePaths = server.getTranslationsFilePaths();
        const [labelsCount, integrities] = await Promise.all([
            getTranslationCount(i18n_1.i18nLoader, locale),
            file_integrity_1.getIntegrityHashes(translationFilePaths),
        ]);
        return {
            locale,
            integrities,
            labelsCount,
        };
    };
}
exports.createCollectorFetch = createCollectorFetch;
/*
 * @param {Object} server
 * @return {Object} kibana usage stats type collection object
 */
function getLocalizationUsageCollector(server) {
    const { collectorSet } = server.usage;
    return collectorSet.makeUsageCollector({
        type: constants_1.KIBANA_LOCALIZATION_STATS_TYPE,
        isReady: () => true,
        fetch: createCollectorFetch(server),
    });
}
exports.getLocalizationUsageCollector = getLocalizationUsageCollector;
