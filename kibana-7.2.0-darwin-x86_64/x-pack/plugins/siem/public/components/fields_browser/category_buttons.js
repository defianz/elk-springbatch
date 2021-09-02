"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const default_headers_1 = require("../timeline/body/column_headers/default_headers");
const i18n = tslib_1.__importStar(require("./translations"));
/**
 * The default category button allows the user to reset the fields shown in
 * the timeline with a single click
 */
exports.DefaultCategoryButton = recompose_1.pure(({ isLoading, onUpdateColumns }) => (React.createElement(eui_1.EuiToolTip, { content: i18n.VIEW_CATEGORY(default_headers_1.DEFAULT_CATEGORY_NAME) },
    React.createElement(eui_1.EuiButton, { color: "primary", "data-test-subj": "quick-select-default-category", isLoading: isLoading, onClick: () => {
            onUpdateColumns(default_headers_1.defaultHeaders);
        }, size: "s" }, default_headers_1.DEFAULT_CATEGORY_NAME))));
