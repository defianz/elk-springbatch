"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n = tslib_1.__importStar(require("./translations"));
const EmptyString = styled_components_1.default.span `
  color: ${({ theme: { eui: { euiColorMediumShade }, }, }) => euiColorMediumShade};
`;
exports.getEmptyValue = () => '--';
exports.getEmptyString = () => `(${i18n.EMPTY_STRING})`;
exports.getEmptyTagValue = () => react_1.default.createElement(react_1.default.Fragment, null, exports.getEmptyValue());
exports.getEmptyStringTag = () => react_1.default.createElement(EmptyString, null, exports.getEmptyString());
exports.defaultToEmptyTag = (item) => {
    if (item == null) {
        return exports.getEmptyTagValue();
    }
    else if (fp_1.isString(item) && item === '') {
        return exports.getEmptyStringTag();
    }
    else {
        return react_1.default.createElement(react_1.default.Fragment, null, item);
    }
};
exports.getOrEmptyTag = (path, item) => {
    const text = fp_1.get(path, item);
    return exports.getOrEmptyTagFromValue(text);
};
exports.getOrEmptyTagFromValue = (value) => {
    if (value == null) {
        return exports.getEmptyTagValue();
    }
    else if (value === '') {
        return exports.getEmptyStringTag();
    }
    else {
        return react_1.default.createElement(react_1.default.Fragment, null, value);
    }
};
