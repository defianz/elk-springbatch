"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const helpers_1 = require("../timeline/body/helpers");
const i18n = tslib_1.__importStar(require("./translations"));
/**
 * Defines the behavior of the search input that appears above the table of data
 */
exports.search = {
    box: {
        incremental: true,
        placeholder: i18n.PLACEHOLDER,
        schema: {
            fieldId: {
                type: 'string',
            },
            valuesFlattened: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
        },
    },
};
exports.getColumnHeaderFromBrowserField = ({ browserField, width = helpers_1.DEFAULT_COLUMN_MIN_WIDTH, }) => ({
    category: browserField.category,
    columnHeaderType: 'not-filtered',
    description: browserField.description != null ? browserField.description : undefined,
    example: browserField.example != null ? `${browserField.example}` : undefined,
    id: browserField.name || '',
    type: browserField.type,
    aggregatable: browserField.aggregatable,
    width,
});
/**
 * Returns a collection of columns, where the first column in the collection
 * is a timestamp, and the remaining columns are all the columns in the
 * specified category
 */
exports.getColumnsWithTimestamp = ({ browserFields, category, }) => {
    const emptyFields = {};
    const timestamp = fp_1.get('base.fields.@timestamp', browserFields);
    const categoryFields = [
        ...Object.values(fp_1.getOr(emptyFields, `${category}.fields`, browserFields)),
    ];
    return timestamp != null && categoryFields.length
        ? fp_1.uniqBy('id', [
            exports.getColumnHeaderFromBrowserField({
                browserField: timestamp,
                width: helpers_1.DEFAULT_DATE_COLUMN_MIN_WIDTH,
            }),
            ...categoryFields.map(f => exports.getColumnHeaderFromBrowserField({ browserField: f })),
        ])
        : [];
};
/** Returns example text, or an empty string if the field does not have an example */
exports.getExampleText = (example) => !fp_1.isEmpty(example) ? `Example: ${example}` : '';
exports.getIconFromType = (type) => {
    switch (type) {
        case 'string': // fall through
        case 'keyword':
            return 'string';
        case 'number': // fall through
        case 'long':
            return 'number';
        case 'date':
            return 'clock';
        case 'ip':
            return 'globe';
        case 'object':
            return 'questionInCircle';
        case 'float':
            return 'number';
        default:
            return 'questionInCircle';
    }
};
