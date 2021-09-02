"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const enzyme_to_json_1 = tslib_1.__importDefault(require("enzyme-to-json"));
require("jest-styled-components");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_testing_library_1 = require("react-testing-library");
const react_router_dom_1 = require("react-router-dom");
const LocationContext_1 = require("../context/LocationContext");
function toJson(wrapper) {
    return enzyme_to_json_1.default(wrapper, {
        noKey: true,
        mode: 'deep'
    });
}
exports.toJson = toJson;
function mockMoment() {
    // avoid timezone issues
    jest
        .spyOn(moment_1.default.prototype, 'format')
        .mockImplementation(function () {
        return `1st of January (mocking ${this.unix()})`;
    });
    // convert relative time to absolute time to avoid timing issues
    jest
        .spyOn(moment_1.default.prototype, 'fromNow')
        .mockImplementation(function () {
        return `1337 minutes ago (mocking ${this.unix()})`;
    });
}
exports.mockMoment = mockMoment;
// Useful for getting the rendered href from any kind of link component
async function getRenderedHref(Component, location) {
    const el = react_testing_library_1.render(react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: [location] },
        react_1.default.createElement(LocationContext_1.LocationProvider, null,
            react_1.default.createElement(Component, null))));
    await exports.tick();
    await react_testing_library_1.waitForElement(() => el.container.querySelector('a'));
    const a = el.container.querySelector('a');
    return a ? a.getAttribute('href') : '';
}
exports.getRenderedHref = getRenderedHref;
function mockNow(date) {
    const fakeNow = new Date(date).getTime();
    return jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
}
exports.mockNow = mockNow;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
// Await this when you need to "flush" promises to immediately resolve or throw in tests
exports.tick = () => new Promise(resolve => setImmediate(resolve, 0));
function expectTextsNotInDocument(output, texts) {
    texts.forEach(text => {
        try {
            output.getByText(text);
        }
        catch (err) {
            if (err.message.startsWith('Unable to find an element with the text:')) {
                return;
            }
            else {
                throw err;
            }
        }
        throw new Error(`Unexpected text found: ${text}`);
    });
}
exports.expectTextsNotInDocument = expectTextsNotInDocument;
function expectTextsInDocument(output, texts) {
    texts.forEach(text => {
        expect(output.getByText(text)).toBeInTheDocument();
    });
}
exports.expectTextsInDocument = expectTextsInDocument;
