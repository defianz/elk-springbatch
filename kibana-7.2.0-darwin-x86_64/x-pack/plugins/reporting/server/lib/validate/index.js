"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const validate_browser_1 = require("./validate_browser");
// @ts-ignore
const validate_config_1 = require("./validate_config");
const validate_max_content_length_1 = require("./validate_max_content_length");
async function runValidations(server, config, logger, browserFactory) {
    try {
        await Promise.all([
            validate_browser_1.validateBrowser(server, browserFactory, logger),
            validate_config_1.validateConfig(config, logger),
            validate_max_content_length_1.validateMaxContentLength(server, logger),
        ]);
        logger.debug(`Reporting plugin self-check ok!`);
    }
    catch (err) {
        logger.warning(`Reporting plugin self-check failed. Please check the Kibana Reporting settings. ${err}`);
    }
}
exports.runValidations = runValidations;
