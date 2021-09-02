"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
exports.ElementControls = ({ onDelete, onEdit }) => (react_1.default.createElement(eui_1.EuiFlexGroup, { className: "canvasElementCard__controls", gutterSize: "xs", justifyContent: "spaceBetween" },
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Edit" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { iconType: "pencil", "aria-label": "Edit element", onClick: onEdit }))),
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Delete" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { color: "danger", iconType: "trash", "aria-label": "Delete element", onClick: onDelete })))));
exports.ElementControls.propTypes = {
    onDelete: prop_types_1.default.func.isRequired,
    onEdit: prop_types_1.default.func.isRequired,
};
