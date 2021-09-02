"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../../strings");
const noop = () => { };
function location() {
    const { help } = strings_1.getFunctionHelp().location;
    return {
        name: 'location',
        type: 'datatable',
        context: {
            types: ['null'],
        },
        args: {},
        help,
        fn: () => {
            return new Promise(resolve => {
                function createLocation(geoposition) {
                    const { latitude, longitude } = geoposition.coords;
                    return resolve({
                        type: 'datatable',
                        columns: [{ name: 'latitude', type: 'number' }, { name: 'longitude', type: 'number' }],
                        rows: [{ latitude, longitude }],
                    });
                }
                return navigator.geolocation.getCurrentPosition(createLocation, noop, {
                    maximumAge: 5000,
                });
            });
        },
    };
}
exports.location = location;
