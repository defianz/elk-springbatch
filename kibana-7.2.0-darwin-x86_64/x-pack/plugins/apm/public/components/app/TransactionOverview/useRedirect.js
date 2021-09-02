"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useRedirect(history, redirectLocation) {
    react_1.useEffect(() => {
        if (redirectLocation) {
            history.replace(redirectLocation);
        }
    });
}
exports.useRedirect = useRedirect;
