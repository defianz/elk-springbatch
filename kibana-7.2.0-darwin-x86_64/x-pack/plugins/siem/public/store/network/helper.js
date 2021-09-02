"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
exports.helperUpdateTopNFlowDirection = (flowTarget, flowDirection) => {
    const topNFlowSort = {
        field: types_1.NetworkTopNFlowFields.bytes,
        direction: types_1.Direction.desc,
    };
    if (flowDirection === types_1.FlowDirection.uniDirectional &&
        [types_1.FlowTarget.client, types_1.FlowTarget.server].includes(flowTarget)) {
        return { flowDirection, flowTarget: types_1.FlowTarget.source, topNFlowSort };
    }
    return { flowDirection, topNFlowSort };
};
