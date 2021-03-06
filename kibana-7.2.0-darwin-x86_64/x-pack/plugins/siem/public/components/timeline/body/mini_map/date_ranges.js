"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const unitsToIncrements = {
    day: 'hours',
    month: 'weeks',
    week: 'days',
    year: 'quarters',
};
/**
 * A pure function that given a unit (e.g. `'year' | 'month' | 'week'...`) and
 * a date range, returns a range of `Date`s with a granularity appropriate
 * to the unit.
 *
 * @example
 * test('given a unit of "year", it returns the four quarters of the year', () => {
 *   const unit: MomentUnit = 'year';
 *   const end = moment.utc('Mon, 31 Dec 2018 23:59:59 -0700');
 *   const current = moment.utc('Mon, 01 Jan 2018 00:00:00 -0700');
 *
 *   expect(getDates({ unit, end, current })).toEqual(
 *     [
 *       '2018-01-01T07:00:00.000Z',
 *       '2018-04-01T06:00:00.000Z',
 *       '2018-07-01T06:00:00.000Z',
 *       '2018-10-01T06:00:00.000Z'
 *     ].map(d => new Date(d))
 *   );
 * });
 */
exports.getDates = ({ unit, end, current }) => current <= end
    ? [
        current.toDate(),
        ...exports.getDates({
            current: current.clone().add(1, unitsToIncrements[unit]),
            end,
            unit,
        }),
    ]
    : [];
/**
 * An impure function (it performs IO to get the current `Date`) that,
 * given a unit (e.g. `'year' | 'month' | 'week'...`), it
 * returns range of `Date`s with a granularity appropriate to the unit.
 */
function getDateRange(unit) {
    const current = moment_1.default()
        .utc()
        .startOf(unit);
    const end = moment_1.default()
        .utc()
        .endOf(unit);
    return exports.getDates({
        current,
        end,
        unit,
    });
}
exports.getDateRange = getDateRange;
