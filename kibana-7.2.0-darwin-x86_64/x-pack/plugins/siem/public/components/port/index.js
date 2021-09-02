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
const draggables_1 = require("../draggables");
const empty_value_1 = require("../empty_value");
const external_link_icon_1 = require("../external_link_icon");
const links_1 = require("../links");
exports.CLIENT_PORT_FIELD_NAME = 'client.port';
exports.DESTINATION_PORT_FIELD_NAME = 'destination.port';
exports.SERVER_PORT_FIELD_NAME = 'server.port';
exports.SOURCE_PORT_FIELD_NAME = 'source.port';
exports.URL_PORT_FIELD_NAME = 'url.port';
exports.PORT_NAMES = [
    exports.CLIENT_PORT_FIELD_NAME,
    exports.DESTINATION_PORT_FIELD_NAME,
    exports.SERVER_PORT_FIELD_NAME,
    exports.SOURCE_PORT_FIELD_NAME,
    exports.URL_PORT_FIELD_NAME,
];
exports.Port = recompose_1.pure(({ contextId, eventId, fieldName, value }) => (React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "port", field: fieldName, id: `${contextId}-${eventId}-${fieldName}-${value}`, tooltipContent: fieldName, value: value },
    React.createElement(links_1.PortOrServiceNameLink, { portOrServiceName: value || empty_value_1.getEmptyValue() }),
    React.createElement(external_link_icon_1.ExternalLinkIcon, null))));
