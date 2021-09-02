"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const helpers_1 = require("../drag_and_drop/helpers");
const draggable_wrapper_1 = require("../drag_and_drop/draggable_wrapper");
const data_provider_1 = require("../timeline/data_providers/data_provider");
const provider_1 = require("../timeline/data_providers/provider");
const empty_value_1 = require("../empty_value");
const page_1 = require("../page");
exports.getRowItemDraggable = ({ rowItem, attrName, idPrefix, render, dragDisplayValue, }) => {
    if (rowItem != null) {
        const id = helpers_1.escapeDataProviderId(`${idPrefix}-${attrName}-${rowItem}`);
        return (react_2.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                and: [],
                enabled: true,
                id,
                name: rowItem,
                excluded: false,
                kqlQuery: '',
                queryMatch: {
                    field: attrName,
                    value: rowItem,
                    displayValue: dragDisplayValue || rowItem,
                    operator: data_provider_1.IS_OPERATOR,
                },
            }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_2.default.createElement(draggable_wrapper_1.DragEffects, null,
                react_2.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_2.default.createElement(react_2.default.Fragment, null, render ? render(rowItem) : empty_value_1.defaultToEmptyTag(rowItem))) }));
    }
    else {
        return empty_value_1.getEmptyTagValue();
    }
};
exports.getRowItemDraggables = ({ rowItems, attrName, idPrefix, render, dragDisplayValue, displayCount = 5, maxOverflow = 5, }) => {
    if (rowItems != null && rowItems.length > 0) {
        const draggables = rowItems.slice(0, displayCount).map((rowItem, index) => {
            const id = helpers_1.escapeDataProviderId(`${idPrefix}-${attrName}-${rowItem}`);
            return (react_2.default.createElement(react_2.default.Fragment, { key: id },
                index !== 0 && (react_2.default.createElement(react_2.default.Fragment, null,
                    ',',
                    react_2.default.createElement(page_1.Spacer, null))),
                react_2.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                        and: [],
                        enabled: true,
                        id,
                        name: rowItem,
                        excluded: false,
                        kqlQuery: '',
                        queryMatch: {
                            field: attrName,
                            value: rowItem,
                            displayValue: dragDisplayValue || rowItem,
                            operator: data_provider_1.IS_OPERATOR,
                        },
                    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_2.default.createElement(draggable_wrapper_1.DragEffects, null,
                        react_2.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_2.default.createElement(react_2.default.Fragment, null, render ? render(rowItem) : empty_value_1.defaultToEmptyTag(rowItem))) })));
        });
        return draggables.length > 0 ? (react_2.default.createElement(react_2.default.Fragment, null,
            draggables,
            " ",
            exports.getRowItemOverflow(rowItems, idPrefix, displayCount, maxOverflow))) : (empty_value_1.getEmptyTagValue());
    }
    else {
        return empty_value_1.getEmptyTagValue();
    }
};
exports.getRowItemOverflow = (rowItems, idPrefix, overflowIndexStart = 5, maxOverflowItems = 5) => {
    return (react_2.default.createElement(react_2.default.Fragment, null, rowItems.length > overflowIndexStart && (react_2.default.createElement(eui_1.EuiToolTip, { content: react_2.default.createElement(react_2.default.Fragment, null,
            rowItems
                .slice(overflowIndexStart, overflowIndexStart + maxOverflowItems)
                .map(rowItem => (react_2.default.createElement("span", { key: `${idPrefix}-${rowItem}` },
                empty_value_1.defaultToEmptyTag(rowItem),
                react_2.default.createElement("br", null)))),
            rowItems.length > overflowIndexStart + maxOverflowItems && (react_2.default.createElement("b", null,
                react_2.default.createElement("br", null),
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.tables.rowItemHelper.moreDescription", defaultMessage: "More..." })))) },
        react_2.default.createElement(page_1.MoreRowItems, { type: "boxesHorizontal" })))));
};
exports.OverflowField = react_2.default.memo(({ value, showToolTip = true, overflowLength = 50 }) => (react_2.default.createElement("span", null,
    showToolTip ? (react_2.default.createElement(eui_1.EuiToolTip, { "data-test-subj": 'message-tooltip', content: 'message' },
        react_2.default.createElement(react_2.default.Fragment, null, value.substring(0, overflowLength)))) : (react_2.default.createElement(react_2.default.Fragment, null, value.substring(0, overflowLength))),
    value.length > overflowLength && (react_2.default.createElement(eui_1.EuiToolTip, { content: value },
        react_2.default.createElement(page_1.MoreRowItems, { type: "boxesHorizontal" }))))));
