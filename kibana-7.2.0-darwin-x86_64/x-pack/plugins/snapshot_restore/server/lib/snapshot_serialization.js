"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function deserializeSnapshotDetails(repository, snapshotDetailsEs) {
    if (!snapshotDetailsEs || typeof snapshotDetailsEs !== 'object') {
        throw new Error('Unable to deserialize snapshot details');
    }
    const { snapshot, uuid, version_id: versionId, version, indices = [], include_global_state: includeGlobalState, state, start_time: startTime, start_time_in_millis: startTimeInMillis, end_time: endTime, end_time_in_millis: endTimeInMillis, duration_in_millis: durationInMillis, failures = [], shards, } = snapshotDetailsEs;
    // If an index has multiple failures, we'll want to see them grouped together.
    const indexToFailuresMap = failures.reduce((map, failure) => {
        const { index, ...rest } = failure;
        if (!map[index]) {
            map[index] = {
                index,
                failures: [],
            };
        }
        map[index].failures.push(rest);
        return map;
    }, {});
    // Sort all failures by their shard.
    Object.keys(indexToFailuresMap).forEach(index => {
        indexToFailuresMap[index].failures = lodash_1.sortBy(indexToFailuresMap[index].failures, ({ shard }) => shard);
    });
    // Sort by index name.
    const indexFailures = lodash_1.sortBy(Object.values(indexToFailuresMap), ({ index }) => index);
    return {
        repository,
        snapshot,
        uuid,
        versionId,
        version,
        indices: [...indices].sort(),
        includeGlobalState: Boolean(includeGlobalState) ? 1 : 0,
        state,
        startTime,
        startTimeInMillis,
        endTime,
        endTimeInMillis,
        durationInMillis,
        indexFailures,
        shards,
    };
}
exports.deserializeSnapshotDetails = deserializeSnapshotDetails;
