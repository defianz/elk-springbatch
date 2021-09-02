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
const draggable_wrapper_1 = require("../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../drag_and_drop/helpers");
const empty_value_1 = require("../empty_value");
const data_provider_1 = require("../timeline/data_providers/data_provider");
const provider_1 = require("../timeline/data_providers/provider");
/**
 * Only returns true if the specified tooltipContent is exactly `null`.
 * Example input / output:
 * `bob -> false`
 * `undefined -> false`
 * `<span>thing</span> -> false`
 * `null -> true`
 */
exports.tooltipContentIsExplicitlyNull = (tooltipContent) => tooltipContent === null; // an explicit / exact null check
/**
 * Derives the tooltip content from the field name if no tooltip was specified
 */
exports.getDefaultWhenTooltipIsUnspecified = ({ field, tooltipContent, }) => (tooltipContent != null ? tooltipContent : field);
/**
 * Renders the content of the draggable, wrapped in a tooltip
 */
const Content = recompose_1.pure(({ children, field, tooltipContent, value }) => !exports.tooltipContentIsExplicitlyNull(tooltipContent) ? (React.createElement(eui_1.EuiToolTip, { "data-test-subj": `${field}-tooltip`, content: exports.getDefaultWhenTooltipIsUnspecified({ tooltipContent, field }) },
    React.createElement(React.Fragment, null, children ? children : value))) : (React.createElement(React.Fragment, null, children ? children : value)));
/**
 * Draggable text (or an arbitrary visualization specified by `children`)
 * that's only displayed when the specified value is non-`null`.
 *
 * @param id - a unique draggable id, which typically follows the format `${contextId}-${eventId}-${field}-${value}`
 * @param field - the name of the field, e.g. `network.transport`
 * @param value - value of the field e.g. `tcp`
 * @param name - defaulting to `field`, this optional human readable name is used by the `DataProvider` that represents the data
 * @param children - defaults to displaying `value`, this allows an arbitrary visualization to be displayed in lieu of the default behavior
 * @param tooltipContent - defaults to displaying `field`, pass `null` to
 * prevent a tooltip from being displayed, or pass arbitrary content
 * @param queryValue - defaults to `value`, this query overrides the `queryMatch.value` used by the `DataProvider` that represents the data
 */
exports.DefaultDraggable = recompose_1.pure(({ id, field, value, name, children, tooltipContent, queryValue }) => value != null ? (React.createElement(draggable_wrapper_1.DraggableWrapper, { dataProvider: {
        and: [],
        enabled: true,
        id: helpers_1.escapeDataProviderId(id),
        name: name ? name : value,
        excluded: false,
        kqlQuery: '',
        queryMatch: {
            field,
            value: queryValue ? queryValue : value,
            operator: data_provider_1.IS_OPERATOR,
        },
    }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
        React.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (React.createElement(Content, { children: children, field: field, tooltipContent: tooltipContent, value: value })) })) : null);
const Badge = styled_components_1.default(eui_1.EuiBadge) `
  vertical-align: top;
`;
/**
 * A draggable badge that's only displayed when the specified value is non-`null`.
 *
 * @param contextId - used as part of the formula to derive a unique draggable id, this describes the context e.g. `event-fields-browser` in which the badge is displayed
 * @param eventId - uniquely identifies an event, as specified in the `_id` field of the document
 * @param field - the name of the field, e.g. `network.transport`
 * @param value - value of the field e.g. `tcp`
 * @param iconType -the (optional) type of icon e.g. `snowflake` to display on the badge
 * @param name - defaulting to `field`, this optional human readable name is used by the `DataProvider` that represents the data
 * @param color - defaults to `hollow`, optionally overwrite the color of the badge icon
 * @param children - defaults to displaying `value`, this allows an arbitrary visualization to be displayed in lieu of the default behavior
 * @param tooltipContent - defaults to displaying `field`, pass `null` to
 * prevent a tooltip from being displayed, or pass arbitrary content
 * @param queryValue - defaults to `value`, this query overrides the `queryMatch.value` used by the `DataProvider` that represents the data
 */
exports.DraggableBadge = recompose_1.pure(({ contextId, eventId, field, value, iconType, name, color = 'hollow', children, tooltipContent, queryValue, }) => value != null ? (React.createElement(exports.DefaultDraggable, { id: `${contextId}-${eventId}-${field}-${value}`, field: field, name: name, value: value, tooltipContent: tooltipContent, queryValue: queryValue },
    React.createElement(Badge, { iconType: iconType, color: color }, children ? children : value !== '' ? value : empty_value_1.getEmptyStringTag()))) : null);
