"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n_1 = require("../../../../common/i18n");
const EmptyValue = styled_components_1.default.span `
  color: ${eui_theme_light_json_1.default.euiColorMediumShade};
  text-align: left;
`;
function FormattedKey({ k, value }) {
    if (value == null) {
        return react_1.default.createElement(EmptyValue, null, k);
    }
    return react_1.default.createElement(react_1.default.Fragment, null, k);
}
exports.FormattedKey = FormattedKey;
function FormattedValue({ value }) {
    if (lodash_1.isObject(value)) {
        return react_1.default.createElement("pre", null, JSON.stringify(value, null, 4));
    }
    else if (lodash_1.isBoolean(value) || lodash_1.isNumber(value)) {
        return react_1.default.createElement(react_1.default.Fragment, null, String(value));
    }
    else if (!value) {
        return react_1.default.createElement(EmptyValue, null, i18n_1.NOT_AVAILABLE_LABEL);
    }
    return react_1.default.createElement(react_1.default.Fragment, null, value);
}
exports.FormattedValue = FormattedValue;
