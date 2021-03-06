"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RestBeatsAdapter {
    constructor(REST) {
        this.REST = REST;
    }
    async get(id) {
        try {
            return (await this.REST.get(`/api/beats/agent/${id}`)).item;
        }
        catch (e) {
            return null;
        }
    }
    async getBeatWithToken(enrollmentToken) {
        try {
            return (await this.REST.get(`/api/beats/agent/unknown/${enrollmentToken}`)).item;
        }
        catch (e) {
            return null;
        }
    }
    async getAll(ESQuery) {
        try {
            return (await this.REST.get('/api/beats/agents/all', { ESQuery }))
                .list;
        }
        catch (e) {
            return [];
        }
    }
    async getBeatsWithTag(tagId) {
        try {
            return (await this.REST.get(`/api/beats/agents/tag/${tagId}`)).list;
        }
        catch (e) {
            return [];
        }
    }
    async update(id, beatData) {
        await this.REST.put(`/api/beats/agent/${id}`, beatData);
        return true;
    }
    async removeTagsFromBeats(removals) {
        return (await this.REST.post(`/api/beats/agents_tags/removals`, {
            removals,
        })).results;
    }
    async assignTagsToBeats(assignments) {
        return (await this.REST.post(`/api/beats/agents_tags/assignments`, {
            assignments,
        })).results;
    }
}
exports.RestBeatsAdapter = RestBeatsAdapter;
