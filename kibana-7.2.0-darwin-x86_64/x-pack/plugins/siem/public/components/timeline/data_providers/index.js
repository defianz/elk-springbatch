"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const droppable_wrapper_1 = require("../../drag_and_drop/droppable_wrapper");
const helpers_1 = require("../../drag_and_drop/helpers");
const timeline_context_1 = require("../timeline_context");
const empty_1 = require("./empty");
const providers_1 = require("./providers");
const DropTargetDataProviders = styled_components_1.default.div `
  position: relative;
  border: 0.2rem dashed ${props => props.theme.eui.euiColorMediumShade};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0 5px 0;
  min-height: 100px;
  overflow-y: auto;
  background-color: ${props => props.theme.eui.euiFormBackgroundColor};
`;
const getDroppableId = (id) => `${helpers_1.droppableTimelineProvidersPrefix}${id}`;
/**
 * Renders the data providers section of the timeline.
 *
 * The data providers section is a drop target where users
 * can drag-and drop new data providers into the timeline.
 *
 * It renders an interactive card representation of the
 * data providers. It also provides uniform
 * UI controls for the following actions:
 * 1) removing a data provider
 * 2) temporarily disabling a data provider
 * 3) applying boolean negation to the data provider
 *
 * Given an empty collection of DataProvider[], it prompts
 * the user to drop anything with a facet count into
 * the data pro section.
 */
exports.DataProviders = recompose_1.pure(({ browserFields, id, dataProviders, onChangeDataProviderKqlQuery, onChangeDroppableAndProvider, onDataProviderEdited, onDataProviderRemoved, onToggleDataProviderEnabled, onToggleDataProviderExcluded, show, }) => (React.createElement(DropTargetDataProviders, { "data-test-subj": "dataProviders" },
    React.createElement(timeline_context_1.TimelineContext.Consumer, null, ({ isLoading }) => (React.createElement(droppable_wrapper_1.DroppableWrapper, { isDropDisabled: !show || isLoading, droppableId: getDroppableId(id) }, dataProviders != null && dataProviders.length ? (React.createElement(providers_1.Providers, { browserFields: browserFields, id: id, dataProviders: dataProviders, onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery, onChangeDroppableAndProvider: onChangeDroppableAndProvider, onDataProviderEdited: onDataProviderEdited, onDataProviderRemoved: onDataProviderRemoved, onToggleDataProviderEnabled: onToggleDataProviderEnabled, onToggleDataProviderExcluded: onToggleDataProviderExcluded })) : (React.createElement(empty_1.Empty, null))))))));
