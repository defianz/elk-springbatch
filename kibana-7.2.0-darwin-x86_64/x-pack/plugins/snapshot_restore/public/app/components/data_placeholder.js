"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.DataPlaceholder = ({ data, children }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    if (data != null) {
        return children;
    }
    return i18n.translate('xpack.snapshotRestore.dataPlaceholderLabel', {
        defaultMessage: '-',
    });
};
