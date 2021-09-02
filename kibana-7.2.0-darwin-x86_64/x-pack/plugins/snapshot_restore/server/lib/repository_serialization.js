"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
const lib_1 = require("../../common/lib");
const clean_settings_1 = require("./clean_settings");
const booleanizeValue = (value) => {
    if (value === 'true') {
        return true;
    }
    else if (value === 'false') {
        return false;
    }
    return value;
};
exports.deserializeRepositorySettings = (settings) => {
    // HDFS repositories return settings like:
    // `{ security: { principal: 'some_value'}, conf: { foo: { bar: 'another_value' }}}`
    // Flattening such settings makes it easier to consume in the UI, for both viewing and updating
    const flattenedSettings = lib_1.flatten(settings);
    const deserializedSettings = {};
    Object.entries(flattenedSettings).forEach(([key, value]) => {
        // Avoid camel casing keys that are the result of being flattened, such as `security.principal` and `conf.*`
        if (key.includes('.')) {
            deserializedSettings[key] = booleanizeValue(value);
        }
        else {
            deserializedSettings[lodash_1.camelCase(key)] = booleanizeValue(value);
        }
    });
    return deserializedSettings;
};
exports.serializeRepositorySettings = (settings) => {
    const serializedSettings = {};
    Object.entries(settings).forEach(([key, value]) => {
        // Avoid snake casing keys that are the result of being flattened, such as `security.principal` and `conf.*`
        if (key.includes('.')) {
            serializedSettings[key] = value;
        }
        else {
            serializedSettings[lodash_1.snakeCase(key)] = value;
        }
    });
    return clean_settings_1.cleanSettings(serializedSettings);
};
