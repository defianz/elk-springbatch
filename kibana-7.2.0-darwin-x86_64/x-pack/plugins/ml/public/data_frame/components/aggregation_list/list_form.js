"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const agg_label_form_1 = require("./agg_label_form");
exports.AggListForm = ({ deleteHandler, list, onChange, options }) => {
    const listKeys = Object.keys(list);
    return (react_1.default.createElement(react_1.Fragment, null, listKeys.map((aggName) => {
        const otherAggNames = listKeys.filter(k => k !== aggName);
        return (react_1.default.createElement(react_1.Fragment, { key: aggName },
            react_1.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
                react_1.default.createElement(agg_label_form_1.AggLabelForm, { deleteHandler: deleteHandler, item: list[aggName], onChange: item => onChange(aggName, item), otherAggNames: otherAggNames, options: options })),
            listKeys.length > 0 && react_1.default.createElement(eui_1.EuiSpacer, { size: "s" })));
    })));
};
