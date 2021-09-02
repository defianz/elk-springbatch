"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.isContainerResizing = () => {
    const [isResizing, setIsResizing] = react_1.useState(false);
    return {
        isResizing,
        setIsResizing,
    };
};
