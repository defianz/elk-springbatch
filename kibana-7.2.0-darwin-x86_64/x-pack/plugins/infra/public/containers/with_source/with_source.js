"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const source_1 = require("../source");
exports.WithSource = ({ children }) => {
    const { createSourceConfiguration, derivedIndexPattern, source, sourceExists, sourceId, metricIndicesExist, logIndicesExist, isLoading, loadSource, hasFailedLoadingSource, loadSourceFailureMessage, updateSourceConfiguration, version, } = react_1.useContext(source_1.Source.Context);
    return children({
        create: createSourceConfiguration,
        configuration: source && source.configuration,
        derivedIndexPattern,
        exists: sourceExists,
        hasFailed: hasFailedLoadingSource,
        isLoading,
        lastFailureMessage: loadSourceFailureMessage,
        load: loadSource,
        logIndicesExist,
        metricIndicesExist,
        sourceId,
        update: updateSourceConfiguration,
        version,
    });
};
