"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const variables_1 = require("../../../../../../../style/variables");
const Icons_1 = require("../../../../../../shared/Icons");
const ToggleButtonContainer = styled_components_1.default.div `
  margin-top: ${variables_1.px(variables_1.units.half)};
  user-select: none;
`;
exports.TruncateHeightSection = ({ children, previewHeight }) => {
    const contentContainerEl = react_1.useRef(null);
    const [showToggle, setShowToggle] = react_1.useState(true);
    const [isOpen, setIsOpen] = react_1.useState(false);
    react_1.useEffect(() => {
        if (contentContainerEl.current) {
            const shouldShow = contentContainerEl.current.scrollHeight > previewHeight;
            setShowToggle(shouldShow);
        }
    }, [children, previewHeight]);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("div", { ref: contentContainerEl, style: {
                overflow: 'hidden',
                maxHeight: isOpen ? 'initial' : variables_1.px(previewHeight)
            } }, children),
        showToggle ? (react_1.default.createElement(ToggleButtonContainer, null,
            react_1.default.createElement(eui_1.EuiLink, { onClick: () => {
                    setIsOpen(!isOpen);
                } },
                react_1.default.createElement(Icons_1.Ellipsis, { horizontal: !isOpen }),
                ' ',
                isOpen
                    ? i18n_1.i18n.translate('xpack.apm.toggleHeight.showMoreButtonLabel', {
                        defaultMessage: 'Show more lines'
                    })
                    : i18n_1.i18n.translate('xpack.apm.toggleHeight.showLessButtonLabel', {
                        defaultMessage: 'Show fewer lines'
                    })))) : null));
};
