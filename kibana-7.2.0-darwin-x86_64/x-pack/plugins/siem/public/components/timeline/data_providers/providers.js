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
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const data_provider_1 = require("./data_provider");
const empty_1 = require("./empty");
const provider_item_and_drag_drop_1 = require("./provider_item_and_drag_drop");
const provider_item_badge_1 = require("./provider_item_badge");
const i18n = tslib_1.__importStar(require("./translations"));
/**
 * This fixed height prevents the timeline's droppable area from growing,
 * (growth causes layout thrashing) when the AND drop target in a row
 * of data providers is revealed.
 */
const ROW_OF_DATA_PROVIDERS_HEIGHT = 43; // px
const PanelProviders = styled_components_1.default.div `
  position: relative
  display: flex;
  flex-direction: row;
  min-height: 100px;
  padding: 5px 10px 15px 0px;
  overflow-y: auto;
  align-items: stretch;
  justify-content: flex-start;
`;
const PanelProvidersGroupContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  position: relative;
  flex-grow: unset;
`;
/** A row of data providers in the timeline drop zone */
const PanelProviderGroupContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: ${ROW_OF_DATA_PROVIDERS_HEIGHT}px;
  margin: 5px 0px;
`;
const PanelProviderItemContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  position: relative;
`;
const TimelineEuiFormHelpText = styled_components_1.default(eui_1.EuiFormHelpText) `
  padding-top: 0px;
  position: absolute;
  bottom: 0px;
  left: 5px;
`;
exports.getDraggableId = ({ id, dataProviderId }) => `draggableId.timeline.${id}.dataProvider.${dataProviderId}`;
/**
 * Renders an interactive card representation of the data providers. It also
 * affords uniform UI controls for the following actions:
 * 1) removing a data provider
 * 2) temporarily disabling a data provider
 * 3) applying boolean negation to the data provider
 */
exports.Providers = recompose_1.pure(({ browserFields, id, dataProviders, onChangeDataProviderKqlQuery, onChangeDroppableAndProvider, onDataProviderEdited, onDataProviderRemoved, onToggleDataProviderEnabled, onToggleDataProviderExcluded, }) => (React.createElement(PanelProviders, { className: "timeline-drop-area", "data-test-subj": "providers" },
    React.createElement(empty_1.Empty, { showSmallMsg: dataProviders.length > 0 }),
    React.createElement(PanelProvidersGroupContainer, { direction: "column", className: "provider-items-container", alignItems: "flexStart", gutterSize: "none" },
        React.createElement(eui_1.EuiFlexItem, { grow: true }, dataProviders.map((dataProvider, i) => {
            const deleteProvider = () => onDataProviderRemoved(dataProvider.id);
            const toggleEnabledProvider = () => onToggleDataProviderEnabled({
                providerId: dataProvider.id,
                enabled: !dataProvider.enabled,
            });
            const toggleExcludedProvider = () => onToggleDataProviderExcluded({
                providerId: dataProvider.id,
                excluded: !dataProvider.excluded,
            });
            return (
            // Providers are a special drop target that can't be drag-and-dropped
            // to another destination, so it doesn't use our DraggableWrapper
            React.createElement(PanelProviderGroupContainer, { key: dataProvider.id, direction: "row", gutterSize: "none", justifyContent: "flexStart", alignItems: "center" },
                React.createElement(PanelProviderItemContainer, { className: "provider-item-filter-container", grow: false },
                    React.createElement(react_beautiful_dnd_1.Draggable, { draggableId: exports.getDraggableId({ id, dataProviderId: dataProvider.id }), index: i }, provided => (React.createElement("div", Object.assign({}, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef, "data-test-subj": "providerContainer" }),
                        React.createElement(provider_item_badge_1.ProviderItemBadge, { browserFields: browserFields, field: dataProvider.queryMatch.displayField || dataProvider.queryMatch.field, kqlQuery: dataProvider.kqlQuery, isEnabled: dataProvider.enabled, isExcluded: dataProvider.excluded, deleteProvider: deleteProvider, operator: dataProvider.queryMatch.operator || data_provider_1.IS_OPERATOR, onDataProviderEdited: onDataProviderEdited, timelineId: id, toggleEnabledProvider: toggleEnabledProvider, toggleExcludedProvider: toggleExcludedProvider, providerId: dataProvider.id, val: dataProvider.queryMatch.displayValue || dataProvider.queryMatch.value }))))),
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(provider_item_and_drag_drop_1.ProviderItemAndDragDrop, { browserFields: browserFields, dataProvider: dataProvider, onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery, onChangeDroppableAndProvider: onChangeDroppableAndProvider, onDataProviderEdited: onDataProviderEdited, onDataProviderRemoved: onDataProviderRemoved, onToggleDataProviderEnabled: onToggleDataProviderEnabled, onToggleDataProviderExcluded: onToggleDataProviderExcluded, timelineId: id }))));
        }))),
    React.createElement(TimelineEuiFormHelpText, null,
        React.createElement("span", null,
            i18n.DROP_HERE,
            " ",
            i18n.TO_BUILD_AN,
            " ",
            i18n.OR.toLocaleUpperCase(),
            " ",
            i18n.QUERY)))));
