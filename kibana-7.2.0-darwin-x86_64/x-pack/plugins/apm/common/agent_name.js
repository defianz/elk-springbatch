"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const agentNames = {
    python: 'python',
    java: 'java',
    nodejs: 'nodejs',
    'js-base': 'js-base',
    'rum-js': 'rum-js',
    dotnet: 'dotnet',
    ruby: 'ruby',
    go: 'go'
};
function isAgentName(agentName) {
    return Object.values(agentNames).includes(agentName);
}
exports.isAgentName = isAgentName;
function isRumAgentName(agentName) {
    if (!agentName) {
        return false;
    }
    return [agentNames['js-base'], agentNames['rum-js']].includes(agentName);
}
exports.isRumAgentName = isRumAgentName;
