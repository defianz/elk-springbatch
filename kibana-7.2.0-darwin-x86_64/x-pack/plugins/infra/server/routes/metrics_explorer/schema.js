"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
const lodash_1 = require("lodash");
const color_palette_1 = require("../../../common/color_palette");
const types_1 = require("./types");
exports.metricsExplorerSchema = Joi.object({
    limit: Joi.number()
        .min(1)
        .default(9),
    afterKey: Joi.string().allow(null),
    groupBy: Joi.string().allow(null),
    indexPattern: Joi.string().required(),
    metrics: Joi.array()
        .items(Joi.object().keys({
        aggregation: Joi.string()
            .valid(lodash_1.values(types_1.MetricsExplorerAggregation))
            .required(),
        field: Joi.string(),
        rate: Joi.bool().default(false),
        color: Joi.string().valid(lodash_1.values(color_palette_1.MetricsExplorerColor)),
        label: Joi.string(),
    }))
        .required(),
    filterQuery: Joi.string(),
    timerange: Joi.object()
        .keys({
        field: Joi.string().required(),
        from: Joi.number().required(),
        to: Joi.number().required(),
        interval: Joi.string().required(),
    })
        .required(),
});
