"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const capabilities_1 = require("ui/capabilities");
exports.getIntegratedAppAvailability = (integratedApps) => {
    const capabilities = capabilities_1.capabilities.get();
    return integratedApps.reduce((supportedSolutions, solutionName) => {
        supportedSolutions[solutionName] =
            capabilities[solutionName] && capabilities[solutionName].show === true;
        return supportedSolutions;
    }, {});
};
