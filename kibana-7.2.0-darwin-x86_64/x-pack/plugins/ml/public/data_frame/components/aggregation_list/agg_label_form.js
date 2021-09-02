"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const popover_form_1 = require("./popover_form");
exports.AggLabelForm = ({ deleteHandler, item, otherAggNames, onChange, options, }) => {
    const [isPopoverVisible, setPopoverVisibility] = react_1.useState(false);
    function update(updateItem) {
        onChange({ ...updateItem });
        setPopoverVisibility(false);
    }
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "s", responsive: false },
        react_1.default.createElement(eui_1.EuiFlexItem, { className: "mlAggregationLabel--text" },
            react_1.default.createElement("span", { className: "eui-textTruncate" }, item.aggName)),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--button" },
            react_1.default.createElement(eui_1.EuiPopover, { id: "mlFormPopover", ownFocus: true, button: react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.aggLabelForm.editAggAriaLabel', {
                        defaultMessage: 'Edit aggregation',
                    }), size: "s", iconType: "pencil", onClick: () => setPopoverVisibility(!isPopoverVisible) }), isOpen: isPopoverVisible, closePopover: () => setPopoverVisibility(false) },
                react_1.default.createElement(popover_form_1.PopoverForm, { defaultData: item, onChange: update, otherAggNames: otherAggNames, options: options }))),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--button" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.aggLabelForm.deleteItemAriaLabel', {
                    defaultMessage: 'Delete item',
                }), size: "s", iconType: "cross", onClick: () => deleteHandler(item.aggName) }))));
};
