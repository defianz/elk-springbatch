"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const and_or_badge_1 = require("../../and_or_badge");
const provider_item_and_1 = require("./provider_item_and");
const i18n = tslib_1.__importStar(require("./translations"));
const DropAndTargetDataProvidersContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  margin: 0px 8px;
`;
const DropAndTargetDataProviders = styled_components_1.default.div `
  min-width: 230px;
  width: auto;
  border: 0.1rem dashed ${props => props.theme.eui.euiColorMediumShade};
  border-radius: 5px;
  text-align: center;
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.hasAndItem
    ? `&:hover {
    transition: background-color 0.7s ease;
    background-color: ${props.theme.eui.euiColorEmptyShade};
  }`
    : ''};
  cursor: ${({ hasAndItem }) => (!hasAndItem ? `default` : 'inherit')};
`;
const NumberProviderAndBadge = styled_components_1.default(eui_1.EuiBadge) `
  margin: 0px 5px;
`;
exports.ProviderItemAndDragDrop = recompose_1.pure(({ browserFields, dataProvider, onChangeDataProviderKqlQuery, onChangeDroppableAndProvider, onDataProviderEdited, onDataProviderRemoved, onToggleDataProviderEnabled, onToggleDataProviderExcluded, timelineId, }) => {
    const onMouseEnter = () => onChangeDroppableAndProvider(dataProvider.id);
    const onMouseLeave = () => onChangeDroppableAndProvider('');
    const hasAndItem = dataProvider.and.length > 0;
    return (React.createElement(eui_1.EuiFlexGroup, { direction: "row", gutterSize: "none", justifyContent: "flexStart", alignItems: "center" },
        React.createElement(DropAndTargetDataProvidersContainer, { className: "drop-and-provider-timeline" },
            React.createElement(DropAndTargetDataProviders, { hasAndItem: hasAndItem, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                hasAndItem && (React.createElement(NumberProviderAndBadge, { color: "primary" }, dataProvider.and.length)),
                React.createElement(eui_1.EuiText, { color: "subdued", size: "xs" }, i18n.DROP_HERE_TO_ADD_AN),
                React.createElement(and_or_badge_1.AndOrBadge, { type: "and" }))),
        React.createElement(provider_item_and_1.ProviderItemAnd, { browserFields: browserFields, dataProvidersAnd: dataProvider.and, providerId: dataProvider.id, onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery, onDataProviderEdited: onDataProviderEdited, onDataProviderRemoved: onDataProviderRemoved, onToggleDataProviderEnabled: onToggleDataProviderEnabled, onToggleDataProviderExcluded: onToggleDataProviderExcluded, timelineId: timelineId })));
});
