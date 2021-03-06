"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const find_non_existent_items_1 = require("../utils/find_non_existent_items");
const types_1 = require("./types");
class CMBeatsDomain {
    constructor(adapter, libs) {
        this.adapter = adapter;
        this.adapter = adapter;
        this.tags = libs.tags;
        this.tokens = libs.tokens;
        this.framework = libs.framework;
    }
    async getById(user, beatId) {
        const beat = await this.adapter.get(user, beatId);
        return beat && beat.active ? beat : null;
    }
    async getByIds(user, beatIds) {
        const beats = await this.adapter.getWithIds(user, beatIds);
        return beats.filter(beat => beat.active);
    }
    async getAll(user, ESQuery) {
        return (await this.adapter.getAll(user, ESQuery)).filter((beat) => beat.active === true);
    }
    async getAllWithTag(user, tagId) {
        return (await this.adapter.getAllWithTags(user, [tagId])).filter((beat) => beat.active === true);
    }
    async getByEnrollmentToken(user, enrollmentToken) {
        const beat = await this.adapter.getBeatWithToken(user, enrollmentToken);
        return beat && beat.active ? beat : null;
    }
    async update(userOrToken, beatId, beatData) {
        const beat = await this.adapter.get(this.framework.internalUser, beatId);
        // FIXME make return type enum
        if (beat === null) {
            return 'beat-not-found';
        }
        if (typeof userOrToken === 'string') {
            const { verified: isAccessTokenValid } = this.tokens.verifyToken(beat ? beat.access_token : '', userOrToken);
            if (!isAccessTokenValid) {
                return 'invalid-access-token';
            }
        }
        const user = typeof userOrToken === 'string' ? this.framework.internalUser : userOrToken;
        await this.adapter.update(user, {
            ...beat,
            ...beatData,
        });
    }
    async enrollBeat(enrollmentToken, beatId, remoteAddress, beat) {
        const { token, expires_on } = await this.tokens.getEnrollmentToken(enrollmentToken);
        // eslint-disable-next-line @typescript-eslint/camelcase
        if (expires_on && moment_1.default(expires_on).isBefore(moment_1.default())) {
            return { status: types_1.BeatEnrollmentStatus.ExpiredEnrollmentToken };
        }
        if (!token) {
            return { status: types_1.BeatEnrollmentStatus.InvalidEnrollmentToken };
        }
        const existingBeat = await this.getById(this.framework.internalUser, beatId);
        if (existingBeat) {
            return { status: types_1.BeatEnrollmentStatus.Success };
        }
        const accessToken = this.tokens.generateAccessToken();
        const verifiedOn = moment_1.default().toJSON();
        await this.adapter.insert(this.framework.internalUser, {
            tags: [],
            ...beat,
            active: true,
            enrollment_token: enrollmentToken,
            verified_on: verifiedOn,
            access_token: accessToken,
            host_ip: remoteAddress,
            id: beatId,
        });
        await this.tokens.deleteEnrollmentToken(enrollmentToken);
        return { status: types_1.BeatEnrollmentStatus.Success, accessToken };
    }
    async removeTagsFromBeats(user, removals) {
        const beatIds = lodash_1.uniq(removals.map(removal => removal.beatId));
        const tagIds = lodash_1.uniq(removals.map(removal => removal.tag));
        const response = {
            removals: removals.map(() => ({ status: null })),
        };
        const beats = await this.adapter.getWithIds(user, beatIds);
        const tags = await this.tags.getWithIds(user, tagIds);
        // Handle assignments containing non-existing beat IDs or tags
        const nonExistentBeatIds = find_non_existent_items_1.findNonExistentItems(beats, beatIds);
        const nonExistentTags = await find_non_existent_items_1.findNonExistentItems(tags, tagIds);
        addNonExistentItemToResponse(response, removals, nonExistentBeatIds, nonExistentTags, 'removals');
        // FIXME abstract this
        const validRemovals = removals
            .map((removal, idxInRequest) => ({
            beatId: removal.beatId,
            idxInRequest,
            tag: removal.tag,
        }))
            .filter((removal, idx) => response.removals[idx].status === null);
        if (validRemovals.length > 0) {
            const removalResults = await this.adapter.removeTagsFromBeats(user, validRemovals);
            return addToResultsToResponse('removals', response, removalResults);
        }
        return response;
    }
    async assignTagsToBeats(user, assignments) {
        const beatIds = lodash_1.uniq(assignments.map(assignment => assignment.beatId));
        const tagIds = lodash_1.uniq(assignments.map(assignment => assignment.tag));
        const response = {
            assignments: assignments.map(() => ({ status: null })),
        };
        const beats = await this.adapter.getWithIds(user, beatIds);
        const tags = await this.tags.getWithIds(user, tagIds);
        // Handle assignments containing non-existing beat IDs or tags
        const nonExistentBeatIds = find_non_existent_items_1.findNonExistentItems(beats, beatIds);
        const nonExistentTags = find_non_existent_items_1.findNonExistentItems(tags, tagIds);
        // FIXME break out back into route / function response
        // FIXME causes function to error if a beat or tag does not exist
        addNonExistentItemToResponse(response, assignments, nonExistentBeatIds, nonExistentTags, 'assignments');
        // FIXME abstract this
        const validAssignments = assignments
            .map((assignment, idxInRequest) => ({
            beatId: assignment.beatId,
            idxInRequest,
            tag: assignment.tag,
        }))
            .filter((assignment, idx) => response.assignments[idx].status === null);
        if (validAssignments.length > 0) {
            const assignmentResults = await this.adapter.assignTagsToBeats(user, validAssignments);
            // TODO This should prob not mutate
            return addToResultsToResponse('assignments', response, assignmentResults);
        }
        return response;
    }
}
exports.CMBeatsDomain = CMBeatsDomain;
// FIXME abstract to the route, also the key arg is a temp fix
function addNonExistentItemToResponse(response, assignments, nonExistentBeatIds, nonExistentTags, key) {
    assignments.forEach(({ beatId, tag }, idx) => {
        const isBeatNonExistent = nonExistentBeatIds.includes(beatId);
        const isTagNonExistent = nonExistentTags.includes(tag);
        if (isBeatNonExistent && isTagNonExistent) {
            response[key][idx].status = 404;
            response[key][idx].result = `Beat ${beatId} and tag ${tag} not found`;
        }
        else if (isBeatNonExistent) {
            response[key][idx].status = 404;
            response[key][idx].result = `Beat ${beatId} not found`;
        }
        else if (isTagNonExistent) {
            response[key][idx].status = 404;
            response[key][idx].result = `Tag ${tag} not found`;
        }
    });
}
// TODO dont mutate response
function addToResultsToResponse(key, response, assignmentResults) {
    assignmentResults.forEach((assignmentResult) => {
        const { idxInRequest, status, result } = assignmentResult;
        response[key][idxInRequest].status = status;
        response[key][idxInRequest].result = result;
    });
    return response;
}
