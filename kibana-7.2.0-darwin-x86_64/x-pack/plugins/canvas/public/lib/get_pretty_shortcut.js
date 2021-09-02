"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrettyShortcut = (shortcut) => {
    if (!shortcut) {
        return '';
    }
    let result = shortcut.toUpperCase();
    result = result.replace(/command/i, '⌘');
    result = result.replace(/option/i, '⌥');
    result = result.replace(/left/i, '←');
    result = result.replace(/right/i, '→');
    result = result.replace(/up/i, '↑');
    result = result.replace(/down/i, '↓');
    return result;
};
