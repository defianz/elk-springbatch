"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const default_headers_1 = require("../timeline/body/column_headers/default_headers");
exports.LoadingSpinner = styled_components_1.default(eui_1.EuiLoadingSpinner) `
  cursor: pointer;
  position: relative;
  top: 3px;
`;
exports.CATEGORY_PANE_WIDTH = 200;
exports.DESCRIPTION_COLUMN_WIDTH = 300;
exports.FIELD_COLUMN_WIDTH = 200;
exports.FIELD_BROWSER_WIDTH = 900;
exports.FIELD_BROWSER_HEIGHT = 300;
exports.FIELDS_PANE_WIDTH = 670;
exports.HEADER_HEIGHT = 40;
exports.PANES_FLEX_GROUP_WIDTH = exports.CATEGORY_PANE_WIDTH + exports.FIELDS_PANE_WIDTH + 10;
exports.SEARCH_INPUT_WIDTH = 850;
exports.TABLE_HEIGHT = 260;
exports.TYPE_COLUMN_WIDTH = 50;
/**
 * Returns the CSS class name for the title of a category shown in the left
 * side field browser
 */
exports.getCategoryPaneCategoryClassName = ({ categoryId, timelineId, }) => `field-browser-category-pane-${categoryId}-${timelineId}`;
/**
 * Returns the CSS class name for the title of a category shown in the right
 * side of field browser
 */
exports.getFieldBrowserCategoryTitleClassName = ({ categoryId, timelineId, }) => `field-browser-category-title-${categoryId}-${timelineId}`;
/** Returns the class name for a field browser search input */
exports.getFieldBrowserSearchInputClassName = (timelineId) => `field-browser-search-input-${timelineId}`;
/** Returns true if the specified category has at least one field */
exports.categoryHasFields = (category) => category.fields != null && Object.keys(category.fields).length > 0;
/** Returns the count of fields in the specified category */
exports.getFieldCount = (category) => category != null && category.fields != null ? Object.keys(category.fields).length : 0;
/**
 * Filters the specified `BrowserFields` to return a new collection where every
 * category contains at least one field name that matches the specified substring.
 */
exports.filterBrowserFieldsByFieldName = ({ browserFields, substring, }) => {
    const trimmedSubstring = substring.trim();
    // filter each category such that it only contains fields with field names
    // that contain the specified substring:
    const filteredBrowserFields = Object.keys(browserFields).reduce((filteredCategories, categoryId) => ({
        ...filteredCategories,
        [categoryId]: {
            ...browserFields[categoryId],
            fields: fp_1.filter(f => f.name != null && f.name.includes(trimmedSubstring), browserFields[categoryId].fields),
        },
    }), {});
    // only pick non-empty categories from the filtered browser fields
    const nonEmptyCategories = fp_1.pickBy(category => exports.categoryHasFields(category), filteredBrowserFields);
    return nonEmptyCategories;
};
/**
 * Returns a "virtual" category (e.g. default ECS) from the specified fieldIds
 */
exports.createVirtualCategory = ({ browserFields, fieldIds, }) => ({
    fields: fieldIds.reduce((fields, fieldId) => {
        const splitId = fieldId.split('.'); // source.geo.city_name -> [source, geo, city_name]
        return {
            ...fields,
            [fieldId]: {
                ...fp_1.get([splitId.length > 1 ? splitId[0] : 'base', 'fields', fieldId], browserFields),
                name: fieldId,
            },
        };
    }, {}),
});
/** Merges the specified browser fields with the default category (i.e. `default ECS`) */
exports.mergeBrowserFieldsWithDefaultCategory = (browserFields) => ({
    ...browserFields,
    [default_headers_1.DEFAULT_CATEGORY_NAME]: exports.createVirtualCategory({
        browserFields,
        fieldIds: default_headers_1.defaultHeaders.map(header => header.id),
    }),
});
