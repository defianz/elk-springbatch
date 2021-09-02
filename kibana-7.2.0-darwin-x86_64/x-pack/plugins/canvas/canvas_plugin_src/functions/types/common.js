"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// DATATABLES
// ----------
/**
 * A Utility function that Typescript can use to determine if an object is a Datatable.
 * @param datatable
 */
exports.isDatatable = (datatable) => !!datatable && datatable.type === 'datatable';
var Legend;
(function (Legend) {
    Legend["NORTH_WEST"] = "nw";
    Legend["SOUTH_WEST"] = "sw";
    Legend["NORTH_EAST"] = "ne";
    Legend["SOUTH_EAST"] = "se";
})(Legend = exports.Legend || (exports.Legend = {}));
var Position;
(function (Position) {
    Position["TOP"] = "top";
    Position["BOTTOM"] = "bottom";
    Position["LEFT"] = "left";
    Position["RIGHT"] = "right";
})(Position = exports.Position || (exports.Position = {}));
/**
 * A Utility function that Typescript can use to determine if an object is an AxisConfig.
 * @param axisConfig
 */
exports.isAxisConfig = (axisConfig) => !!axisConfig && axisConfig.type === 'axisConfig';
