"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const recompose_1 = require("recompose");
const timelines_page_1 = require("./timelines_page");
exports.Timelines = recompose_1.pure(() => (react_1.default.createElement(react_apollo_1.ApolloConsumer, null, client => react_1.default.createElement(timelines_page_1.TimelinesPage, { apolloClient: client }))));
