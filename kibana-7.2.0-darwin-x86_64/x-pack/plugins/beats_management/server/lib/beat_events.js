"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PathReporter_1 = require("io-ts/lib/PathReporter");
const domain_types_1 = require("../../common/domain_types");
class BeatEventsLib {
    // @ts-ignore
    constructor(adapter, beats) {
        this.adapter = adapter;
        this.beats = beats;
        this.log = async (user, beatId, events) => {
            return events.map((event, i) => {
                const assertData = domain_types_1.RuntimeBeatEvent.decode(event);
                if (assertData.isLeft()) {
                    if (events.length - 1 === i) {
                        this.beats
                            .update(user, beatId, {
                            status: {
                                ...events[events.length - 2],
                                timestamp: new Date(events[events.length - 2].timestamp),
                            },
                        })
                            .catch(e => {
                            // eslint-disable-next-line
                            console.error('Error inserting event into beats log.', e);
                        });
                    }
                    return {
                        success: false,
                        error: `Error parsing event ${i}, ${PathReporter_1.PathReporter.report(assertData)[0]}`,
                    };
                }
                if (events.length - 1 === i) {
                    this.beats
                        .update(user, beatId, {
                        status: {
                            ...events[events.length - 1],
                            timestamp: new Date(events[events.length - 1].timestamp),
                        },
                    })
                        .catch(e => {
                        // eslint-disable-next-line
                        console.error('Error inserting event into beats log.', e);
                    });
                }
                return { success: true };
            });
        };
    }
}
exports.BeatEventsLib = BeatEventsLib;
