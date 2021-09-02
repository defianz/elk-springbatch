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
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("../timeline/body/helpers");
const JsonEditor = styled_components_1.default.div `
  width: 100%;
`;
exports.JsonView = recompose_1.pure(({ data }) => (React.createElement(JsonEditor, { "data-test-subj": "jsonView" },
    React.createElement(eui_1.EuiCodeEditor, { isReadOnly: true, mode: "javascript", setOptions: { fontSize: '12px' }, value: JSON.stringify(exports.buildJsonView(data), helpers_1.omitTypenameAndEmpty, 2 // indent level
        ), width: "100%" }))));
exports.buildJsonView = (data) => data.reduce((accumulator, item) => fp_1.set(item.field, item.originalValue, accumulator), {});
