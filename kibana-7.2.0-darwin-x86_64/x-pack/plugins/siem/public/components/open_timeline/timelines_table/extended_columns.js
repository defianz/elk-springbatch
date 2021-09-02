"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const empty_value_1 = require("../../empty_value");
const i18n = tslib_1.__importStar(require("../translations"));
/**
 * Returns the extended columns that are specific to the `All Timelines` view
 * of the `Timelines` page
 */
exports.getExtendedColumns = () => [
    {
        dataType: 'string',
        field: 'updatedBy',
        name: i18n.MODIFIED_BY,
        render: (updatedBy) => (React.createElement("div", { "data-test-subj": "username" }, empty_value_1.defaultToEmptyTag(updatedBy))),
        sortable: false,
    },
];
