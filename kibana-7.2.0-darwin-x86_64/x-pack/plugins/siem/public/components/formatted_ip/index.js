"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggable_wrapper_1 = require("../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../drag_and_drop/helpers");
const empty_value_1 = require("../empty_value");
const links_1 = require("../links");
const data_provider_1 = require("../timeline/data_providers/data_provider");
const provider_1 = require("../timeline/data_providers/provider");
const truncatable_text_1 = require("../truncatable_text");
const parse_query_value_1 = require("../timeline/body/renderers/parse_query_value");
const getUniqueId = ({ contextId, eventId, fieldName, address, }) => `id-${contextId}-${fieldName}-${address}-for-event-${eventId}`;
const tryStringify = (value) => {
    try {
        return JSON.stringify(value);
    }
    catch (_) {
        return `${value}`;
    }
};
const getDataProvider = ({ contextId, eventId, fieldName, address, }) => ({
    enabled: true,
    id: helpers_1.escapeDataProviderId(getUniqueId({ contextId, eventId, fieldName, address })),
    name: `${fieldName}: ${parse_query_value_1.parseQueryValue(address)}`,
    queryMatch: {
        field: fieldName,
        value: parse_query_value_1.parseQueryValue(address),
        operator: data_provider_1.IS_OPERATOR,
    },
    excluded: false,
    kqlQuery: '',
    and: [],
});
const NonDecoratedIp = recompose_1.pure(({ contextId, eventId, fieldName, value, width }) => (React.createElement(draggable_wrapper_1.DraggableWrapper, { key: getUniqueId({ contextId, eventId, fieldName, address: value }), dataProvider: getDataProvider({ contextId, eventId, fieldName, address: value }), render: (dataProvider, _, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
        React.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : typeof value !== 'object' ? (empty_value_1.getOrEmptyTagFromValue(value)) : (empty_value_1.getOrEmptyTagFromValue(tryStringify(value))), width: width })));
const AddressLinks = recompose_1.pure(({ addresses, eventId, contextId, fieldName, width }) => (React.createElement(React.Fragment, null, fp_1.uniq(addresses).map(address => (React.createElement(draggable_wrapper_1.DraggableWrapper, { key: getUniqueId({ contextId, eventId, fieldName, address }), dataProvider: getDataProvider({ contextId, eventId, fieldName, address }), render: (_, __, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
        React.createElement(provider_1.Provider, { dataProvider: getDataProvider({ contextId, eventId, fieldName, address }) }))) : width != null ? (React.createElement(links_1.IPDetailsLink, { "data-test-sub": "truncatable-ip-details-link", ip: address },
        React.createElement(truncatable_text_1.TruncatableText, { "data-test-sub": "truncatable-ip-details-text", width: width }, address))) : (React.createElement(links_1.IPDetailsLink, { "data-test-sub": "ip-details", ip: address })), width: width }))))));
exports.FormattedIp = recompose_1.pure(({ eventId, contextId, fieldName, value, width }) => {
    if (fp_1.isString(value) && !fp_1.isEmpty(value)) {
        try {
            const addresses = JSON.parse(value);
            if (fp_1.isArray(addresses)) {
                return (React.createElement(AddressLinks, { addresses: addresses, eventId: eventId, contextId: contextId, fieldName: fieldName, width: width }));
            }
        }
        catch (_) {
            // fall back to formatting it as a single link
        }
        // return a single draggable link
        return (React.createElement(AddressLinks, { addresses: [value], eventId: eventId, contextId: contextId, fieldName: fieldName, width: width }));
    }
    else {
        return (React.createElement(NonDecoratedIp, { eventId: eventId, contextId: contextId, fieldName: fieldName, value: value, width: width }));
    }
});
