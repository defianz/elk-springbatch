"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const browser_1 = require("./browser");
const location_1 = require("./location");
const markdown_1 = require("./markdown");
const urlparam_1 = require("./urlparam");
exports.functions = [browser_1.browser, location_1.location, markdown_1.markdown, urlparam_1.urlparam, ...common_1.functions];
