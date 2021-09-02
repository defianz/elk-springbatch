"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility to remove empty fields ("") from repository settings
 */
exports.cleanSettings = (settings) => Object.entries(settings).reduce((acc, [key, value]) => {
    if (value !== '') {
        acc[key] = value;
    }
    return acc;
}, {});
