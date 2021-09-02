"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const new_platform_1 = require("ui/new_platform");
new_platform_1.onStart(({ core }) => {
    const apmUiEnabled = core.injectedMetadata.getInjectedVar('apmUiEnabled');
    if (apmUiEnabled === false) {
        core.chrome.navLinks.update('apm', { hidden: true });
    }
});
