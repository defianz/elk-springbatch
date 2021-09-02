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
const lodash_1 = require("lodash");
const eui_1 = require("@elastic/eui");
const element_controls_1 = require("./element_controls");
const element_card_1 = require("../element_card");
exports.ElementGrid = ({ elements, filterText, filterTags, handleClick, onEdit, onDelete, showControls, }) => {
    filterText = filterText.toLowerCase();
    return (react_1.default.createElement(eui_1.EuiFlexGrid, { gutterSize: "l", columns: 4 }, lodash_1.map(elements, (element, index) => {
        const { name, displayName = '', help = '', image, tags = [] } = element;
        const whenClicked = () => handleClick(element);
        let textMatch = false;
        let tagsMatch = false;
        if (!filterText.length ||
            name.toLowerCase().includes(filterText) ||
            displayName.toLowerCase().includes(filterText) ||
            help.toLowerCase().includes(filterText)) {
            textMatch = true;
        }
        if (!filterTags.length || filterTags.every(tag => tags.includes(tag))) {
            tagsMatch = true;
        }
        if (!textMatch || !tagsMatch) {
            return null;
        }
        return (react_1.default.createElement(eui_1.EuiFlexItem, { key: index, className: "canvasElementCard__wrapper" },
            react_1.default.createElement(element_card_1.ElementCard, { title: displayName || name, description: help, image: image, tags: tags, onClick: whenClicked }),
            showControls && onEdit && onDelete && (react_1.default.createElement(element_controls_1.ElementControls, { onEdit: () => onEdit(element), onDelete: () => onDelete(element) }))));
    })));
};
exports.ElementGrid.propTypes = {
    elements: prop_types_1.default.array.isRequired,
    handleClick: prop_types_1.default.func.isRequired,
    showControls: prop_types_1.default.bool,
};
exports.ElementGrid.defaultProps = {
    showControls: false,
    filterTags: [],
    filterText: '',
};
