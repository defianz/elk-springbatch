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
const common_1 = require("../../common");
const popover_form_1 = require("./popover_form");
exports.GroupByLabelForm = ({ deleteHandler, item, otherAggNames, onChange, options, }) => {
    const [isPopoverVisible, setPopoverVisibility] = react_1.useState(false);
    function update(updateItem) {
        onChange({ ...updateItem });
        setPopoverVisibility(false);
    }
    let interval;
    if (common_1.isGroupByDateHistogram(item)) {
        interval = item.calendar_interval;
    }
    else if (common_1.isGroupByHistogram(item)) {
        interval = item.interval;
    }
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "s", responsive: false },
        react_1.default.createElement(eui_1.EuiFlexItem, { className: "mlGroupByLabel--text" },
            react_1.default.createElement("span", { className: "eui-textTruncate" }, item.aggName)),
        interval !== undefined && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--text mlGroupByLabel--interval" },
            react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued", className: "eui-textTruncate" }, interval))),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--button" },
            react_1.default.createElement(eui_1.EuiPopover, { id: "mlIntervalFormPopover", ownFocus: true, button: react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.groupByLabelForm.editIntervalAriaLabel', {
                        defaultMessage: 'Edit interval',
                    }), size: "s", iconType: "pencil", onClick: () => setPopoverVisibility(!isPopoverVisible) }), isOpen: isPopoverVisible, closePopover: () => setPopoverVisibility(false) },
                react_1.default.createElement(popover_form_1.PopoverForm, { defaultData: item, onChange: update, otherAggNames: otherAggNames, options: options }))),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--button" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.groupByLabelForm.deleteItemAriaLabel', {
                    defaultMessage: 'Delete item',
                }), size: "s", iconType: "cross", onClick: () => deleteHandler(item.aggName) }))));
};
