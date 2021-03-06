"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const chance_1 = tslib_1.__importDefault(require("chance")); // eslint-disable-line
// @ts-ignore
const request_1 = tslib_1.__importDefault(require("request"));
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const config_schemas_1 = require("../common/config_schemas");
const scripts_1 = require("../public/lib/compose/scripts");
const args = process.argv.slice(2);
const chance = new chance_1.default();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const enroll = async (kibanaURL, token) => {
    const beatId = v4_1.default();
    await request_1.default({
        url: `${kibanaURL}/api/beats/agent/${beatId}`,
        method: 'POST',
        headers: {
            'kbn-xsrf': 'xxx',
            'kbn-beats-enrollment-token': token,
        },
        body: JSON.stringify({
            type: Math.random() >= 0.5 ? 'filebeat' : 'metricbeat',
            host_name: `${chance.word()}.local`,
            name: chance.word(),
            version: '6.7.0',
        }),
    }, (error, response, body) => {
        const res = JSON.parse(body);
        if (res.message) {
            // eslint-disable-next-line
            console.log(res.message);
        }
    });
};
const start = async (kibanaURL, numberOfBeats = 10, maxNumberOfTagsPerBeat = 2, maxNumberOfConfigsPerTag = 4) => {
    try {
        const libs = scripts_1.compose(kibanaURL);
        // eslint-disable-next-line
        console.error(`Enrolling ${numberOfBeats} fake beats...`);
        const enrollmentTokens = await libs.tokens.createEnrollmentTokens(numberOfBeats);
        process.stdout.write(`enrolling fake beats... 0 of ${numberOfBeats}`);
        let count = 0;
        for (const token of enrollmentTokens) {
            count++;
            // @ts-ignore
            process.stdout.clearLine();
            // @ts-ignore
            process.stdout.cursorTo(0);
            process.stdout.write(`enrolling fake beats... ${count} of ${numberOfBeats}`);
            await enroll(kibanaURL, token);
            await sleep(10);
        }
        process.stdout.write('\n');
        await sleep(2000);
        // eslint-disable-next-line
        console.error(`${numberOfBeats} fake beats are enrolled`);
        const beats = await libs.beats.getAll();
        // eslint-disable-next-line
        console.error(`Creating tags, configs, and assigning them...`);
        process.stdout.write(`creating tags/configs for beat... 0 of ${numberOfBeats}`);
        count = 0;
        for (const beat of beats) {
            count++;
            // @ts-ignore
            process.stdout.clearLine();
            // @ts-ignore
            process.stdout.cursorTo(0);
            process.stdout.write(`creating tags w/configs for beat... ${count} of ${numberOfBeats}`);
            const tags = await Promise.all([...Array(maxNumberOfTagsPerBeat)].map(() => {
                return libs.tags.upsertTag({
                    name: chance.word(),
                    color: getRandomColor(),
                    hasConfigurationBlocksTypes: [],
                });
            }));
            await libs.beats.assignTagsToBeats(tags.map((tag) => ({
                beatId: beat.id,
                tag: tag.id,
            })));
            await Promise.all(tags.map((tag) => {
                return libs.configBlocks.upsert([...Array(maxNumberOfConfigsPerTag)].map(() => ({
                    type: config_schemas_1.configBlockSchemas[Math.floor(Math.random())].id,
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sint ista Graecorum; 
Nihil ad rem! Ne sit sane; Quod quidem nobis non saepe contingit. 
Duo Reges: constructio interrete. Itaque his sapiens semper vacabit.`.substring(0, Math.floor(Math.random() * (0 - 115 + 1))),
                    tag: tag.id,
                    last_updated: new Date(),
                    config: {},
                })));
            }));
        }
    }
    catch (e) {
        if (e.response && e.response.data && e.response.message) {
            // eslint-disable-next-line
            console.error(e.response.data.message);
        }
        else if (e.response && e.response.data && e.response.reason) {
            // eslint-disable-next-line
            console.error(e.response.data.reason);
        }
        else if (e.code) {
            // eslint-disable-next-line
            console.error(e.code);
        }
        else {
            // eslint-disable-next-line
            console.error(e);
        }
    }
};
// @ts-ignore
start(...args);
