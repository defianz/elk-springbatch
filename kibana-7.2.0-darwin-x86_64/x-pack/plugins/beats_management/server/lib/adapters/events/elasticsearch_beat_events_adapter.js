"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ElasticsearchBeatEventsAdapter {
    // @ts-ignore
    constructor(database) {
        this.database = database;
        // eslint-disable-next-line
        this.bulkInsert = async (user, beatId, events) => {
            // await this.database.putTemplate(INDEX_NAMES.EVENTS_TODAY, beatsIndexTemplate);
        };
    }
}
exports.ElasticsearchBeatEventsAdapter = ElasticsearchBeatEventsAdapter;
