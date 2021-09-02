"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rem = 14;
function px(value) {
    return `${value}px`;
}
exports.px = px;
function percent(value) {
    return `${value}%`;
}
exports.percent = percent;
function pxToRem(value) {
    return `${value / exports.rem}rem`;
}
exports.pxToRem = pxToRem;
exports.colors = {
    textBlue: '#0079A5',
    borderGrey: '#D9D9D9',
    white: '#fff',
    textGrey: '#3F3F3F',
};
exports.fontSizes = {
    small: '10px',
    normal: '1rem',
    large: '18px',
    xlarge: '2rem',
};
exports.fontFamily = 'SFProText-Regular';
