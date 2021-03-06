"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class RestTagsAdapter {
    constructor(REST) {
        this.REST = REST;
    }
    async getTagsWithIds(tagIds) {
        try {
            return (await this.REST.get(`/api/beats/tags/${lodash_1.uniq(tagIds).join(',')}`)).items;
        }
        catch (e) {
            return [];
        }
    }
    async getAll(ESQuery) {
        try {
            return (await this.REST.get(`/api/beats/tags`, { ESQuery })).list;
        }
        catch (e) {
            return [];
        }
    }
    async delete(tagIds) {
        return (await this.REST.delete(`/api/beats/tags/${lodash_1.uniq(tagIds).join(',')}`)).success;
    }
    async upsertTag(tag) {
        const response = await this.REST.put(`/api/beats/tag/${tag.id}`, {
            color: tag.color,
            name: tag.name,
        });
        return response.success ? tag : null;
    }
    async getAssignable(beats) {
        try {
            return (await this.REST.get(`/api/beats/tags/assignable/${beats.map(beat => beat.id).join(',')}`)).items;
        }
        catch (e) {
            return [];
        }
    }
}
exports.RestTagsAdapter = RestTagsAdapter;
