"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const savedObjects_1 = require("../services/rest/savedObjects");
function useAPMIndexPattern() {
    const [pattern, setPattern] = react_1.useState({});
    async function fetchPattern() {
        const indexPattern = await savedObjects_1.getAPMIndexPattern();
        if (indexPattern) {
            setPattern(indexPattern);
        }
    }
    react_1.useEffect(() => {
        fetchPattern();
    }, []);
    return pattern;
}
exports.useAPMIndexPattern = useAPMIndexPattern;
