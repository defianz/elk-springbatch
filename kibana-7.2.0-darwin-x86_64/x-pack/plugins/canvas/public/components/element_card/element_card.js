"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
const tag_list_1 = require("../tag_list/");
const tagType = 'badge';
exports.ElementCard = ({ title, description, image, tags = [], onClick, ...rest }) => (react_1.default.createElement(eui_1.EuiCard, Object.assign({ className: image ? 'canvasElementCard' : 'canvasElementCard canvasElementCard--hasIcon', textAlign: "left", title: title, description: description, footer: react_1.default.createElement(tag_list_1.TagList, { tags: tags, tagType: tagType }), image: image, icon: image ? null : react_1.default.createElement(eui_1.EuiIcon, { type: "canvasApp", size: "xxl" }), onClick: onClick }, rest)));
exports.ElementCard.propTypes = {
    title: prop_types_1.default.string.isRequired,
    description: prop_types_1.default.string.isRequired,
    image: prop_types_1.default.string,
    onClick: prop_types_1.default.func,
};
