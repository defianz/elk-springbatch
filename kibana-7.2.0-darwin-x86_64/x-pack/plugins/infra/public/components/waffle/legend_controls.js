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
const react_2 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
exports.LegendControls = react_1.injectI18n(({ intl, autoBounds, boundsOverride, onChange, dataBounds }) => {
    const [isPopoverOpen, setPopoverState] = react_2.useState(false);
    const [draftAuto, setDraftAuto] = react_2.useState(autoBounds);
    const [draftBounds, setDraftBounds] = react_2.useState(autoBounds ? dataBounds : boundsOverride); // should come from bounds prop
    const buttonComponent = (react_2.default.createElement(eui_1.EuiButtonIcon, { iconType: "gear", color: "text", "aria-label": intl.formatMessage({
            id: 'xpack.infra.legendControls.buttonLabel',
            defaultMessage: 'configure legend',
        }), onClick: () => setPopoverState(true) }));
    const handleAutoChange = (e) => {
        setDraftAuto(e.currentTarget.checked);
    };
    const createBoundsHandler = (name) => (e) => {
        const value = parseFloat(e.currentTarget.value);
        setDraftBounds({ ...draftBounds, [name]: value });
    };
    const handlePopoverClose = () => {
        setPopoverState(false);
    };
    const handleApplyClick = () => {
        onChange({ auto: draftAuto, bounds: draftBounds });
    };
    const commited = draftAuto === autoBounds &&
        boundsOverride.min === draftBounds.min &&
        boundsOverride.max === draftBounds.max;
    const boundsValidRange = draftBounds.min < draftBounds.max;
    return (react_2.default.createElement(ControlContainer, null,
        react_2.default.createElement(eui_1.EuiPopover, { isOpen: isPopoverOpen, closePopover: handlePopoverClose, id: "legendControls", button: buttonComponent, withTitle: true },
            react_2.default.createElement(eui_1.EuiPopoverTitle, null, "Legend Options"),
            react_2.default.createElement(eui_1.EuiForm, null,
                react_2.default.createElement(eui_1.EuiFormRow, null,
                    react_2.default.createElement(eui_1.EuiSwitch, { name: "bounds", label: intl.formatMessage({
                            id: 'xpack.infra.legendControls.switchLabel',
                            defaultMessage: 'Auto calculate range',
                        }), checked: draftAuto, onChange: handleAutoChange })),
                (!boundsValidRange && (react_2.default.createElement(eui_1.EuiText, { color: "danger", grow: false, size: "s" },
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.legendControls.errorMessage", defaultMessage: "Min should be less than max" }))))) ||
                    null,
                react_2.default.createElement(eui_1.EuiFlexGroup, { style: { marginTop: 0 } },
                    react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                                id: 'xpack.infra.legendControls.minLabel',
                                defaultMessage: 'Min',
                            }), isInvalid: !boundsValidRange },
                            react_2.default.createElement(eui_1.EuiFieldNumber, { disabled: draftAuto, step: 0.1, value: isNaN(draftBounds.min) ? '' : draftBounds.min, isInvalid: !boundsValidRange, name: "legendMin", onChange: createBoundsHandler('min') }))),
                    react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                                id: 'xpack.infra.legendControls.maxLabel',
                                defaultMessage: 'Max',
                            }), isInvalid: !boundsValidRange },
                            react_2.default.createElement(eui_1.EuiFieldNumber, { disabled: draftAuto, step: 0.1, isInvalid: !boundsValidRange, value: isNaN(draftBounds.max) ? '' : draftBounds.max, name: "legendMax", onChange: createBoundsHandler('max') })))),
                react_2.default.createElement(eui_1.EuiButton, { type: "submit", size: "s", fill: true, disabled: commited || !boundsValidRange, onClick: handleApplyClick },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.legendControls.applyButton", defaultMessage: "Apply" }))))));
});
const ControlContainer = eui_styled_components_1.default.div `
  position: absolute;
  top: -20px;
  right: 6px;
  bottom: 0;
`;
