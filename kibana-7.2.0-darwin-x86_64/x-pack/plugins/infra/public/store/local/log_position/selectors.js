"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
exports.selectTargetPosition = (state) => state.targetPosition;
exports.selectIsAutoReloading = (state) => state.updatePolicy.policy === 'interval';
exports.selectFirstVisiblePosition = (state) => state.visiblePositions.startKey ? state.visiblePositions.startKey : null;
exports.selectMiddleVisiblePosition = (state) => state.visiblePositions.middleKey ? state.visiblePositions.middleKey : null;
exports.selectLastVisiblePosition = (state) => state.visiblePositions.endKey ? state.visiblePositions.endKey : null;
exports.selectVisibleMidpointOrTarget = reselect_1.createSelector(exports.selectMiddleVisiblePosition, exports.selectTargetPosition, (middleVisiblePosition, targetPosition) => {
    if (middleVisiblePosition) {
        return middleVisiblePosition;
    }
    else if (targetPosition) {
        return targetPosition;
    }
    else {
        return null;
    }
});
exports.selectVisibleMidpointOrTargetTime = reselect_1.createSelector(exports.selectVisibleMidpointOrTarget, visibleMidpointOrTarget => (visibleMidpointOrTarget ? visibleMidpointOrTarget.time : null));
exports.selectVisibleTimeInterval = reselect_1.createSelector(exports.selectFirstVisiblePosition, exports.selectLastVisiblePosition, (firstVisiblePosition, lastVisiblePosition) => firstVisiblePosition && lastVisiblePosition
    ? {
        start: firstVisiblePosition.time,
        end: lastVisiblePosition.time,
    }
    : null);
